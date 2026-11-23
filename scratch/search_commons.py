import urllib.request
import urllib.parse
import json

def search_commons(query):
    url = f"https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(query)}&srnamespace=6&format=json"
    req = urllib.request.Request(url, headers={'User-Agent': 'NewsBot/1.0 (contact@theempiretimes.org)'})
    try:
        with urllib.request.urlopen(req) as res:
            data = json.loads(res.read().decode('utf-8'))
            results = data['query']['search']
            return [r['title'] for r in results[:3]]
    except Exception as e:
        return [str(e)]

queries = {
    'Bessent': 'Scott Bessent official portrait',
    'AI_Chip': 'Nvidia AI chip data center',
    'NYSE': 'New York Stock Exchange trading floor',
    'COP29': 'COP29 Baku Azerbaijan',
    'Wicked': 'Wicked movie musical premiere Broadway',
    'JWST_NGC1365': 'JWST NGC 1365 James Webb',
    'Barkley': 'Saquon Barkley Philadelphia Eagles',
    'Food_Safety': 'Food safety inspection USDA CDC'
}

for k, q in queries.items():
    print(k, ':', search_commons(q))
