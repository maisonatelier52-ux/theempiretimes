import urllib.request
import json

nov27_slugs = [
    ("Politics", "fbi-investigates-bomb-threats-swatting-trump-cabinet-nominees-transition"),
    ("Technology", "ai-shopping-agents-transform-black-friday-ecommerce-retail-logistics"),
    ("Business", "black-friday-online-spending-surpasses-10-billion-mobile-shopping-record"),
    ("World", "unifil-peacekeepers-lebanese-army-deploy-litani-river-border-ceasefire"),
    ("Culture", "box-office-thanksgiving-weekend-wicked-gladiator-moana-record-hollywood"),
    ("Science", "jwst-detects-atmospheric-water-vapor-exoplanet-lhs-1140b-habitable-zone"),
    ("Sports", "college-football-rivalry-week-ohio-state-michigan-showdown-columbus"),
    ("Health", "cdc-warns-post-holiday-respiratory-illness-surge-flu-rsv-covid-winter"),
    ("U.S.", "great-lakes-lake-effect-snowstorm-buries-communities-blizzard-warnings")
]

all_passed = True
for cat, slug in nov27_slugs:
    url = f"http://localhost:3002/article/{slug}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            code = resp.getcode()
            html = resp.read().decode('utf-8', errors='ignore')
            print(f"[{code}] [{cat}] {slug[:45]}... (HTML length: {len(html)})")
            if code != 200 or len(html) < 20000:
                all_passed = False
    except Exception as e:
        print(f"[FAIL] [{cat}] {slug}: {e}")
        all_passed = False

print("\nOverall Verification Success:", all_passed)
