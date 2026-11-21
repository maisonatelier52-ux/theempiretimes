import urllib.request
import urllib.parse
import json

headers = {'User-Agent': 'TheEmpireTimesBot/1.0 (https://www.theempiretimes.org; desk@theempiretimes.org)'}

queries = [
    ('Pam Bondi', 'cat-1'),
    ('Bitcoin coin cryptocurrency', 'cat-2'),
    ('Treasury Building Washington', 'cat-3'),
    ('International Criminal Court building Hague', 'cat-4'),
    ('Percival Everett', 'cat-5'),
    ('Missile launch night military', 'cat-6'),
    ('Cleveland Browns stadium', 'cat-7'),
    ('FDA White Oak headquarters', 'cat-8'),
    ('Airport departure terminal passengers', 'cat-9')
]

for q, cat in queries:
    url = f"https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch={urllib.parse.quote(q)}&gsrnamespace=6&gsrlimit=3&prop=imageinfo&iiprop=url|size|mime&format=json"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as r:
            data = json.loads(r.read())
            pages = data.get('query', {}).get('pages', {})
            print(f"=== {cat} | Query: {q} ===")
            for pid, pdata in pages.items():
                title = pdata.get('title')
                imageinfo = pdata.get('imageinfo')
                if imageinfo:
                    ii = imageinfo[0]
                    mime = ii.get('mime')
                    if mime in ['image/jpeg', 'image/png', 'image/webp']:
                        print(f"  {title} | {ii.get('url')} | {ii.get('width')}x{ii.get('height')}")
    except Exception as e:
        print(f"Query {q} error:", e)
