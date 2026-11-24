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
            return [r['title'] for r in results[:4]]
    except Exception as e:
        return [str(e)]

queries = {
    'Jack_Smith': 'Jack Smith special counsel',
    'Trump_Tariffs': 'Shipping containers port trade cargo',
    'Ceasefire': 'White House Rose Garden podium Biden',
    'TikTok': 'TikTok smartphone app logo',
    'Harbaugh': 'Lamar Jackson Baltimore Ravens',
    'Carrots_EColi': 'Carrots organic fresh produce',
    'Macys_Parade': "Macy's Thanksgiving Day Parade balloon",
    'Europa_Clipper': 'Europa Clipper spacecraft NASA'
}

for k, q in queries.items():
    print(k, ':', search_commons(q))
