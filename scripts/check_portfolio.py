from pathlib import Path
from lxml import html
import json,pymupdf,urllib.request,concurrent.futures
b=Path(__file__).resolve().parents[1];r=html.fromstring((b/'index.html').read_text(encoding='utf8'));ids=r.xpath('//@id');assert len(ids)==len(set(ids))
tr=json.loads((b/'assets/translations.json').read_text(encoding='utf8'));embedded=json.loads(r.xpath('//script[@id="translations"]')[0].text);assert tr==embedded
for e in r.xpath('//*[@data-i18n]'):assert set(tr[e.get('data-i18n')])=={'es','en'};assert e.text==tr[e.get('data-i18n')]['es']
for url in r.xpath('//@href | //@src'):
    if url.startswith('#'):assert url[1:] in ids,url
    elif not url.startswith(('http:','https:','mailto:','tel:')):assert (b/url.split('?' )[0]).is_file(),url
for a in r.xpath('//a[@target="_blank"]'):assert {'noopener','noreferrer'}<=set(a.get('rel','').split())
assert len(r.xpath('//main//h1'))==1
assert len(r.xpath('//main//*[contains(@class,"education-primary")]'))==1
for f in b.glob('*.pdf'):
    d=pymupdf.open(f);assert len(d)==2;txt='\n'.join(p.get_text(sort=True) for p in d);assert '\ufffd' not in txt;assert '2026' in txt and '2023' in txt and 'Amazon' in txt;assert not any(p.get_images() for p in d)
    normalized=' '.join(txt.split())
    official='MAESTRÍA PROFESIONAL EN CIENCIAS DE LA EDUCACIÓN CON ÉNFASIS EN DOCENCIA'
    assert official in normalized
    bachelor='Bachelor' if 'Education' in txt else 'Bachillerato'
    assert normalized.index(official)<normalized.index(bachelor)
    print(f.name,': 2 pages; selectable text; no images; education order verified')
print('PASS: IDs, links, ES/EN keys, secure external links, one web heading, no duplicate master degree')
if '--links' in __import__('sys').argv:
    urls=sorted(set(r.xpath('//a[starts-with(@href,"https:")]/@href')))
    def check(url):
        try:
            req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'});resp=urllib.request.urlopen(req,timeout=25);return url,resp.status,resp.url
        except Exception as e:return url,str(e)
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as ex:
        for result in ex.map(check,urls):print(result)

