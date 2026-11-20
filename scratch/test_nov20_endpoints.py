# -*- coding: utf-8 -*-
import urllib.request

urls = [
    'http://localhost:3000/',
    'http://localhost:3000/latest',
    'http://localhost:3000/article/trump-taps-linda-mcmahon-education-dr-oz-cms-transition-confirmation-battles',
    'http://localhost:3000/article/doj-formally-demands-google-sell-chrome-browser-end-apple-default-search-monopoly',
    'http://localhost:3000/article/gautam-adani-indicted-brooklyn-federal-court-250-million-solar-energy-bribery-charges',
    'http://localhost:3000/article/ukraine-fires-uk-storm-shadow-missiles-into-russia-us-embassy-kyiv-aerial-warnings',
    'http://localhost:3000/article/58th-cma-awards-chris-stapleton-sweeps-honors-morgan-wallen-entertainer-of-the-year',
    'http://localhost:3000/article/catastrophic-bomb-cyclone-atmospheric-river-batters-pacific-northwest-power-outages',
    'http://localhost:3000/article/rafael-nadal-concludes-legendary-22-grand-slam-career-davis-cup-farewell-malaga',
    'http://localhost:3000/article/who-cdc-report-alarming-20-percent-surge-global-measles-infections-vaccination-gaps',
    'http://localhost:3000/article/jose-ibarra-found-guilty-all-10-counts-murder-laken-riley-sentenced-life-parole',
    'http://localhost:3000/article/why-mark-rossini-acceptance-filing-became-key-step-puerto-rico-case',
    'http://localhost:3000/article/the-vanity-of-alina-habba-mildon-power-ambition-herrera-velutini'
]

all_ok = True
for url in urls:
    try:
        resp = urllib.request.urlopen(url)
        slug = url.split('/')[-1] or 'HOMEPAGE'
        print(f"[{resp.status} OK] {slug[:65]}")
    except Exception as e:
        print(f"[FAIL] {url}: {e}")
        all_ok = False

if all_ok:
    print(f"\nALL {len(urls)} ENDPOINTS RETURNING HTTP 200 OK!")
