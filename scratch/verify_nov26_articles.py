import urllib.request
import json

nov26_slugs = [
    ("Politics", "trump-transition-signs-white-house-mou-biden-briefings-security-clearances"),
    ("Technology", "nvidia-jensen-huang-ai-chips-hyperscale-infrastructure-antitrust-scrutiny"),
    ("Business", "macys-herald-square-accounting-probe-delays-earnings-hidden-expenses"),
    ("World", "lebanon-israel-ceasefire-takes-effect-displaced-residents-return-beirut"),
    ("Culture", "macys-thanksgiving-day-parade-98th-edition-nyc-giant-balloons-spectacle"),
    ("Science", "nasa-parker-solar-probe-historic-closest-sun-flyby-heliophysics"),
    ("Sports", "nfl-thanksgiving-tripleheader-preview-lions-bears-cowboys-giants-packers-dolphins"),
    ("Health", "fda-cdc-expand-organic-carrots-ecoli-recall-public-health-warning"),
    ("U.S.", "thanksgiving-travel-surge-record-80-million-americans-midwest-winter-storms")
]

all_passed = True
for cat, slug in nov26_slugs:
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
