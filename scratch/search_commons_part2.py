import urllib.request, urllib.parse, json

def search(q):
    url = f"https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(q)}&srnamespace=6&format=json"
    req = urllib.request.Request(url, headers={'User-Agent': 'NewsBot/1.0 (contact@theempiretimes.org)'})
    with urllib.request.urlopen(req) as res:
        data = json.loads(res.read().decode('utf-8'))
        return [r['title'] for r in data['query']['search'][:4]]

print('Hassett:', search('Kevin Hassett'))
print('Blinken:', search('Antony Blinken official portrait'))
print('Shopping:', search('retail store shopping Black Friday'))
print('Stadium:', search('Ohio Stadium Columbus'))
