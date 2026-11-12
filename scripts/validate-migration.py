"""Verify rendered source text against export-derived checksums, and route/anchor integrity."""
import json,re,hashlib
from html.parser import HTMLParser
from pathlib import Path
VOID={'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}
class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True);self.depth=0;self.capture=None;self.skip=None;self.prose=[];self.ids=[];self.fragments=[];self.h1=0
    def handle_starttag(self,t,a):
        a=dict(a)
        if 'id' in a:self.ids.append(a['id'])
        if t=='h1':self.h1+=1
        if t=='a' and a.get('href','').startswith('#'):self.fragments.append(a['href'][1:])
        if 'data-migrated-body' in a:self.capture=self.depth
        if self.capture is not None and 'media-pending' in a.get('class','').split():self.skip=self.depth
        if t not in VOID:self.depth+=1
    def handle_endtag(self,t):
        if t in VOID:return
        self.depth-=1
        if self.skip is not None and self.depth==self.skip:self.skip=None
        if self.capture is not None and self.depth==self.capture:self.capture=None
    def handle_startendtag(self,t,a):
        self.handle_starttag(t,a)
        if t not in VOID:self.handle_endtag(t)
    def handle_data(self,d):
        if self.capture is not None and self.skip is None:self.prose.append(d)
manifest=json.loads(Path('docs/migration/manifest.json').read_text())
assert len([p for p in manifest['imported'] if p['type']=='post'])==14
assert len([p for p in manifest['imported'] if p['type']=='page'])==11
for entry in manifest['imported']:
    path=Path('dist')/entry['path'].strip('/')/'index.html'
    assert path.exists(),f'Missing original route: {entry["path"]}'
    p=Page();p.feed(path.read_text())
    norm=re.sub(r'[\s#]+','',''.join(p.prose))
    actual=hashlib.sha256(norm.encode()).hexdigest()
    assert actual==entry['proseSha256'],f'Rendered prose mismatch: {entry["path"]}'
    assert p.h1==1,f'Expected one h1: {entry["path"]}'
    assert len(p.ids)==len(set(p.ids)),f'Duplicate heading/element ID: {entry["path"]}'
    assert all(i in p.ids for i in p.fragments),f'Broken same-page anchor: {entry["path"]}'
    assert not re.search(r'<(?:script|form)[^>]+(?:wp-admin|wpforms)',path.read_text()),f'Legacy executable markup: {entry["path"]}'
assert not manifest['unresolvedInternalLinks'],manifest['unresolvedInternalLinks']
print('PASS: 14 article and 11 page routes; rendered prose matches export-derived checksums; h1/IDs/anchors; legacy form removed; internal links mapped.')

# Uploaded media must remain byte-for-byte intact and appear on every original usage page.
received=json.loads(Path('docs/migration/received-media.json').read_text())
batches=json.loads(Path('docs/migration/media-batches.json').read_text())
class Images(HTMLParser):
    def __init__(self):super().__init__(convert_charrefs=True);self.alts=[]
    def handle_starttag(self,t,a):
        if t=='img':self.alts.append(dict(a).get('alt',''))
for filename,item in received.items():
    assert hashlib.sha256(Path('src/assets/wordpress',filename).read_bytes()).hexdigest()==item['sha256'],f'Received file changed: {filename}'
    expected=next((f for b in batches for f in b['files'] if f['filename']==filename),None)
    assert expected,f'Received file not in original checklist: {filename}'
    for route in expected['usedBy']:
        parser=Images();parser.feed((Path('dist')/route.strip('/')/'index.html').read_text())
        assert item['alt'] in parser.alts,f'Received image missing from {route}: {filename}'
missing=json.loads(Path('docs/migration/missing-media.json').read_text())
assert not any(item['filename'] in received for item in missing),'Received image still listed as missing'
checklist=Path('dist/migration-review/media/index.html').read_text()
for b in batches:
    assert f'id="batch-{b["number"]}"' in checklist,'Unstable batch numbering'
print(f'PASS: {len(received)} received image checksums, rendered uses/alt text, checklist receipts and original batch numbers.')
