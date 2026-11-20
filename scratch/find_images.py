import urllib.request
import urllib.parse
import json

headers = {'User-Agent': 'TheEmpireTimesBot/1.0 (https://www.theempiretimes.org; desk@theempiretimes.org)'}

queries = [
    ('Linda McMahon', 'cat-1'),
    ('Robert F. Kennedy Department of Justice', 'cat-2'),
    ('Gautam Adani', 'cat-3'),
    ('Embassy of the United States, Kyiv', 'cat-4'),
    ('Chris Stapleton', 'cat-5'),
    ('Cyclone Pacific satellite', 'cat-6'),
    ('Rafael Nadal', 'cat-7'),
    ('Vaccination child measles', 'cat-8'),
    ('Georgia State Capitol', 'cat-9')
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
