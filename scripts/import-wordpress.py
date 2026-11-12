"""Import the reviewed two-post pilot. Usage: python scripts/import-wordpress.py /path/to/export.xml
Raw exports, comments, authors and post metadata are never copied into the repository.
"""
import sys, re, json, html, math, hashlib
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse
import xml.etree.ElementTree as ET
NS={'wp':'http://wordpress.org/export/1.2/','content':'http://purl.org/rss/1.0/modules/content/'}
PILOT={'/48-hours-in-asheville/':'Asheville','/48-hours-in-san-francisco-the-perfect-quick-city-guide/':'San Francisco'}
class Clean(HTMLParser):
    allowed={'p','a','strong','em','ul','ol','li','br','hr','h2','h3','h4','blockquote','figure','figcaption'}
    def __init__(self): super().__init__(convert_charrefs=True);self.parts=[];self.skip=0
    def handle_starttag(self,t,attrs):
        if t in {'script','style','iframe','form'}: self.skip+=1
        if self.skip:return
        if t in self.allowed:
            a=''
            if t=='a':
                href=dict(attrs).get('href','')
                if urlparse(href).scheme in {'http','https','mailto'} or href.startswith(('/','#')):
                    a=' href="'+html.escape(href,quote=True)+'"'
            self.parts.append('<'+t+a+'>')
    def handle_endtag(self,t):
        if t in {'script','style','iframe','form'}:self.skip=max(0,self.skip-1);return
        if not self.skip and t in self.allowed and t not in {'br','hr'}:self.parts.append('</'+t+'>')
    def handle_data(self,d):
        if not self.skip:self.parts.append(html.escape(d))
def text(s):return html.unescape(re.sub('<[^>]+>','',s))
def main(path):
    raw=Path(path).read_bytes(); items=ET.fromstring(raw).findall('channel/item'); inv=[];migrated=[]
    for i in items:
        kind=i.findtext('wp:post_type',namespaces=NS); status=i.findtext('wp:status',namespaces=NS)
        if kind not in {'post','page'} or status!='publish':continue
        url=i.findtext('link'); route=urlparse(url).path;title=html.unescape(i.findtext('title') or '')
        content=i.findtext('content:encoded',default='',namespaces=NS)
        inv.append({'title':title,'url':url,'path':route,'type':kind,'status':status,'contentCharacters':len(content),'pilotImported':route in PILOT})
        if route not in PILOT:continue
        source_images=re.findall(r'<img[^>]+src="([^"]+)"',content)
        parser=Clean();parser.feed(content);body=''.join(parser.parts)
        body=re.sub(r'<figure>\s*</figure>','',body)
        # Markdown headings make Astro's automatic TOC work; prose and links retain original text.
        body=re.sub(r'<h([234])>(.*?)</h\1>',lambda m:'\n\n'+'#'*int(m[1])+' '+text(m[2])+'\n\n',body,flags=re.S)
        original=text(content); converted=text(body)
        # Heading syntax changes only formatting. Confirm no original prose was lost.
        normalize=lambda s:re.sub(r'[\s#]+','',s)
        if normalize(original)!=normalize(converted):raise ValueError('Content fidelity mismatch: '+route)
        first=re.search(r'<p>(.*?)</p>',body,re.S)
        description=text(first[1]) if first else title
        meta={'title':title,'description':description,'destination':PILOT[route],'category':'Itinerary','imageAlt':'','readTime':max(1,math.ceil(len(original.split())/220)),'placeholder':False,'draft':False,'publishDate':i.findtext('wp:post_date_gmt',namespaces=NS).replace(' ','T')+'Z','permalink':route,'sourceUrl':url,'migrationReview':True}
        media_path=Path('docs/migration/media.json')
        media=json.loads(media_path.read_text()).get(route) if media_path.exists() else None
        if media and Path('src/assets',media['file']).is_file():
            meta.update(image=media['key'],imageAlt=media['alt'])
        out=Path('src/content/articles')/('wp-'+route.strip('/')+'.md')
        out.write_text('---\n'+'\n'.join(k+': '+json.dumps(v,ensure_ascii=False) for k,v in meta.items())+'\n---\n\n'+body.strip()+'\n')
        migrated.append({'path':route,'sourceImages':source_images,'proseFidelity':'passed','headings':len(re.findall(r'^#{2,4} ',body,re.M))})
    Path('docs/migration/inventory.json').write_text(json.dumps(inv,indent=2,ensure_ascii=False)+'\n')
    Path('docs/migration/pilot.json').write_text(json.dumps({'exportSha256':hashlib.sha256(raw).hexdigest(),'imported':migrated},indent=2)+'\n')
    print(f'Inventoried {len(inv)} published posts/pages; imported {len(migrated)} articles. Prose fidelity passed.')
if __name__=='__main__':main(sys.argv[1])
