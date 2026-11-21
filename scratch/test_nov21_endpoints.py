# -*- coding: utf-8 -*-
import urllib.request

urls = [
    'http://localhost:3000/',
    'http://localhost:3000/latest',
    'http://localhost:3000/article/matt-gaetz-withdraws-attorney-general-bid-trump-nominates-pam-bondi-doj',
    'http://localhost:3000/article/bitcoin-breaches-historic-99k-milestone-etf-inflows-crypto-market-cap-3-trillion',
    'http://localhost:3000/article/us-treasury-slams-gazprombank-50-russian-banks-sanctions-severing-energy-revenue',
    'http://localhost:3000/article/international-criminal-court-issues-arrest-warrants-netanyahu-gallant-deif-war-crimes',
    'http://localhost:3000/article/75th-national-book-awards-percival-everett-wins-fiction-james-american-literature',
    'http://localhost:3000/article/russia-launches-experimental-oreshnik-hypersonic-ballistic-missile-dnipro-nato',
    'http://localhost:3000/article/nick-chubb-powers-browns-snowstorm-upset-over-steelers-thursday-night-football',
    'http://localhost:3000/article/fda-mental-health-regulators-expand-access-guidelines-karxt-cobenfy-schizophrenia',
    'http://localhost:3000/article/aaa-projects-record-80-million-americans-traveling-thanksgiving-holiday-storm-threats',
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
