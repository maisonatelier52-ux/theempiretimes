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
    'Greer_Hassett': 'Kevin Hassett White House or USTR',
    'FTC_Microsoft': 'Federal Trade Commission building Washington DC',
    'Consumer_Confidence': 'Shopping mall retail shoppers consumer',
    'G7_Blinken': 'Antony Blinken official portrait or G7',
    'Moana2_Disney': 'El Capitan Theatre Hollywood Disney',
    'SpaceX_400': 'Falcon 9 launch LC-39A or Starlink',
    'CFP_Football': 'Autzen Stadium Oregon Ducks or Ohio Stadium',
    'Raw_Milk_H5N1': 'Dairy cows milk farm agriculture'
}

for k, q in queries.items():
    print(k, ':', search_commons(q))
