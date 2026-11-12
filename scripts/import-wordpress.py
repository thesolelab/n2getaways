"""Import published WordPress posts/pages into review-only Astro collections.
Usage: python scripts/import-wordpress.py /path/to/export.xml
Never copies raw exports, comments, authors, tokens or private metadata into Git.
"""
import sys, re, json, html, math, hashlib
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse, urlunparse
import xml.etree.ElementTree as ET
NS={'wp':'http://wordpress.org/export/1.2/','content':'http://purl.org/rss/1.0/modules/content/'}
PILOT={'/48-hours-in-asheville/','/48-hours-in-san-francisco-the-perfect-quick-city-guide/'}
DESTINATIONS=[('san-francisco','San Francisco'),('wailea','Maui'),('maui','Maui'),('asheville','Asheville'),('santorini','Santorini'),('costa-rica','Costa Rica'),('waikiki','Waikiki')]
def text(s):return html.unescape(re.sub('<[^>]+>','',s))
def normalized(s):return re.sub(r'[\s#]+','',text(s))
def write_json(path,obj):Path(path).write_text(json.dumps(obj,indent=2,ensure_ascii=False)+'\n')
def brief(s):
    s=re.sub(r'\s+',' ',s).strip()
    return s if len(s)<=180 else s[:177].rsplit(' ',1)[0]+'…'
def resolve_media(filename,received):
    if filename in received:return received[filename]
    # Reuse a received original for WordPress-generated size variants of the same file.
    family=lambda name:re.sub(r'-(?:[0-9]+x[0-9]+|scaled)(?=\.[^.]+$)','',name).lower()
    matches=[v for k,v in received.items() if family(k)==family(filename)]
    return matches[0] if len(matches)==1 else None
class Clean(HTMLParser):
    allowed={'p','a','strong','em','b','i','ul','ol','li','br','hr','h1','h2','h3','h4','h5','h6','blockquote','figcaption','table','thead','tbody','tr','th','td','sup','sub'}
    def __init__(self,routes,known_first=None,received=None,retired=None):
        super().__init__(convert_charrefs=True);self.parts=[];self.skip=0;self.routes=routes;self.images=[];self.links=[];self.known_first=known_first;self.received=received or {};self.retired=retired or set()
    def handle_starttag(self,t,attrs):
        if t in {'script','style','iframe','form','button','noscript'}:self.skip+=1
        if self.skip:return
        attrs=dict(attrs)
        if t=='img':
            src=attrs.get('src','');alt=attrs.get('alt','');self.images.append({'url':src,'alt':alt})
            if src in self.retired:return
            if len(self.images)==1 and self.known_first:return
            filename=Path(urlparse(src).path).name
            local=resolve_media(filename,self.received)
            if local:
                alt=local['alt'].replace('\\','\\\\').replace('[','\\[').replace(']','\\]')
                self.parts.append('\n\n!['+alt+'](<../../assets/wordpress/'+local['filename']+'>)\n\n')
                return
            self.parts.append('<figure class="media-pending"><figcaption>Original photo pending transfer'+(': '+html.escape(alt) if alt else '')+'.</figcaption></figure>')
        if t in self.allowed:
            a=''
            if t=='a':
                href=attrs.get('href','');u=urlparse(href);path=u.path or '/'
                canonical=path if path.endswith('/') else path+'/'
                if u.hostname in {'n2getaways.com','www.n2getaways.com'} and canonical in self.routes:
                    href=canonical+('?' +u.query if u.query else '')+('#'+u.fragment if u.fragment else '')
                if urlparse(href).scheme in {'http','https','mailto'} or href.startswith(('/','#')):
                    a=' href="'+html.escape(href,quote=True)+'"';self.links.append(href)
            if t in {'td','th'}:
                for k in ['colspan','rowspan']:
                    if attrs.get(k,'').isdigit():a+=' '+k+'="'+attrs[k]+'"'
            self.parts.append('<'+t+a+'>')
    def handle_endtag(self,t):
        if t in {'script','style','iframe','form','button','noscript'}:self.skip=max(0,self.skip-1);return
        if not self.skip and t in self.allowed and t not in {'br','hr'}:self.parts.append('</'+t+'>')
    def handle_startendtag(self,t,attrs):
        self.handle_starttag(t,attrs)
        if t not in {'img','br','hr','input'}:self.handle_endtag(t)
    def handle_data(self,d):
        if not self.skip:self.parts.append(html.escape(d))
def main(path):
    raw=Path(path).read_bytes();items=ET.fromstring(raw).findall('channel/item')
    eligible=[i for i in items if i.findtext('wp:post_type',namespaces=NS) in {'post','page'} and i.findtext('wp:status',namespaces=NS)=='publish']
    routes={urlparse(i.findtext('link')).path or '/' for i in eligible}
    media=json.loads(Path('docs/migration/media.json').read_text())
    received=json.loads(Path('docs/migration/received-media.json').read_text())
    retired=json.loads(Path('docs/migration/retired-media.json').read_text())
    inv=[];migrated=[];missing={};unresolved=set()
    for i in eligible:
        kind=i.findtext('wp:post_type',namespaces=NS);url=i.findtext('link');route=urlparse(url).path or '/';title=html.unescape(i.findtext('title') or '')
        content=i.findtext('content:encoded',default='',namespaces=NS)
        if re.search(r'<!-- wp:(?:block|shortcode|embed)\b',content):raise ValueError('Unsupported reusable block/shortcode/embed: '+route)
        known=media.get(route)
        if known and not Path('src/assets',known['file']).is_file():raise ValueError('Missing mapped photo '+route)
        retired_urls={m['url'] for m in retired if m['path']==route}
        parser=Clean(routes,known,received,retired_urls);parser.feed(content)
        body=''.join(parser.parts);body=re.sub(r'<a[^>]*>\s*</a>','',body);body=re.sub(r'<figure>\s*</figure>','',body)
        # Original h1s become h2s: the Astro template provides the only document h1.
        body=re.sub(r'<h([1-6])>(.*?)</h\1>',lambda m:'\n\n'+'#'*max(2,int(m[1]))+' '+text(m[2]).strip()+'\n\n' if text(m[2]).strip() else '',body,flags=re.S)
        body=re.sub(r'^[ \t]+','',body,flags=re.M)
        body=re.sub(r'\n{3,}','\n\n',body)
        # Compare all source prose outside legacy forms/scripts/buttons with the converted body.
        source=re.sub(r'<(form|script|style|iframe|button|noscript)\b[^>]*>.*?</\1>','',content,flags=re.S|re.I)
        converted=re.sub(r'<figure class="media-pending">.*?</figure>','',body,flags=re.S)
        converted=re.sub(r'!\[[^\]]*\]\(<[^>]*>\)','',converted)
        if normalized(source)!=normalized(converted):raise ValueError('Prose fidelity mismatch: '+route)
        first=re.search(r'<p>(.*?)</p>',body,re.S);description=brief(text(first[1])) if first else title
        display=re.search(r'<h1[^>]*>(.*?)</h1>',content,re.S)
        meta={'title':title,'description':description,'permalink':route,'sourceUrl':url,'migrationReview':True}
        flags=[]
        if kind=='post':
            destination=next((v for k,v in DESTINATIONS if k in route),'Travel tips')
            category='Itinerary' if '48-hours' in route or 'itinerary' in route else 'Review' if any(x in route for x in ['lunch-','breakfast-','luxury-escape']) else 'Travel guide'
            if 'tsa' in route:flags.append('Time-sensitive airport-security reporting: verify dates, shutdown claims and current official guidance before publication.')
            if route in PILOT:flags.append('Pilot review findings remain recorded in the migration report.')
            meta.update(destination=destination,category=category,imageAlt='',readTime=max(1,math.ceil(len(text(source).split())/220)),placeholder=False,draft=False,publishDate=i.findtext('wp:post_date_gmt',namespaces=NS).replace(' ','T')+'Z',reviewNotes=flags)
            if known:meta.update(image=known['key'],imageAlt=known['alt'])
            out=Path('src/content/articles')/('wp-'+route.strip('/')+'.md')
        else:
            if route=='/privacy-policy/':flags.append('Imported policy describes the original WordPress site. Analytics, cookie-banner and affiliate-program claims require owner verification; these integrations are not enabled in this preview.')
            if not content.strip():flags.append('The WordPress export contains no body content for this page.')
            meta.update(displayTitle=text(display[1]) if display else title,reviewNotes=flags)
            out=Path('src/content/pages')/('home.md' if route=='/' else route.strip('/').replace('/','--')+'.md')
        out.parent.mkdir(parents=True,exist_ok=True)
        out.write_text('---\n'+'\n'.join(k+': '+json.dumps(v,ensure_ascii=False) for k,v in meta.items())+'\n---\n\n'+body.strip()+'\n')
        row={'title':title,'url':url,'path':route,'type':kind,'status':'publish','contentCharacters':len(content),'imported':True,'pilotImported':route in PILOT}
        inv.append(row)
        migrated.append({'path':route,'type':kind,'sourceImages':[p['url'] for p in parser.images],'proseFidelity':'passed','proseSha256':hashlib.sha256(normalized(source).encode()).hexdigest(),'headings':len(re.findall(r'^#{2,6} ',body,re.M)),'reviewNotes':flags,'legacyFormRemoved':bool(re.search('<form',content)),'legacyLoadMoreRemoved':bool(re.search('<button',content))})
        for index,img in enumerate(parser.images):
            if img['url'] in retired_urls:continue
            if known and index==0:continue
            u=urlparse(img['url']);filename=Path(u.path).name
            if not filename or resolve_media(filename,received):continue
            # Group identical filenames; keep all source locations for disambiguation.
            row=missing.setdefault(filename,{'filename':filename,'folder':str(Path(u.path).parent).replace('/wp-content/uploads/',''),'urls':[],'usedBy':[],'articlePhoto':False,'external':u.hostname not in {'n2getaways.com','www.n2getaways.com'}})
            if img['url'] not in row['urls']:row['urls'].append(img['url'])
            if route not in row['usedBy']:row['usedBy'].append(route)
            row['articlePhoto']|=kind=='post'
        for href in parser.links:
            u=urlparse(href)
            if u.hostname in {'n2getaways.com','www.n2getaways.com'}:unresolved.add(href)
    write_json('docs/migration/inventory.json',inv)
    manifest={'exportSha256':hashlib.sha256(raw).hexdigest(),'imported':migrated,'unresolvedInternalLinks':sorted(unresolved)}
    write_json('docs/migration/manifest.json',manifest)
    write_json('docs/migration/pilot.json',{'exportSha256':manifest['exportSha256'],'imported':[r for r in migrated if r['path'] in PILOT]})
    rows=sorted(missing.values(),key=lambda x:(not x['articlePhoto'],x['folder'],x['filename']))
    write_json('docs/migration/missing-media.json',rows)
    print(f'Imported {len(inv)} published posts/pages. Prose fidelity passed for every entry. Missing image files: {len(rows)}.')
if __name__=='__main__':main(sys.argv[1])
