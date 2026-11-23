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
            return [r['title'] for r in results[:5]]
    except Exception as e:
        return [str(e)]

queries = {
    'AI_Chip': 'Nvidia GPU chip semiconductor',
    'Dept_Commerce': 'Herbert C. Hoover Building Department of Commerce',
    'NYSE_Building': 'New York Stock Exchange facade Broad Street',
    'Wicked_Cinema': 'Gershwin Theatre Wicked',
    'Listeria': 'Listeria monocytogenes scanning electron microscope'
}

for k, q in queries.items():
    print(k, ':', search_commons(q))
