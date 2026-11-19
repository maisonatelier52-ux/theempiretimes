# -*- coding: utf-8 -*-
import urllib.request

urls = [
    'http://localhost:3000/',
    'http://localhost:3000/article/why-mark-rossini-acceptance-filing-became-key-step-puerto-rico-case',
    'http://localhost:3000/article/pentagon-fails-ninth-consecutive-audit-4-trillion-liabilities-congressional-oversight-ndaa',
    'http://localhost:3000/article/openai-unveils-gpt-6-2-astra-sol-models-price-cuts-autonomous-coding-agents',
    'http://localhost:3000/article/wall-street-calibrates-fed-easing-odds-treasury-yields-surge-post-election-rally',
    'http://localhost:3000/article/g20-leaders-conclude-rio-summit-fragile-consensus-ukraine-climate-finance',
    'http://localhost:3000/article/glicked-box-office-tracking-stuns-hollywood-wicked-gladiator-ii-270m-global-debut',
    'http://localhost:3000/article/spacex-starship-flight-6-achieves-ocean-splashdown-trump-musk-boca-chica-faa',
    'http://localhost:3000/article/nba-cup-drama-escalates-hawks-edge-thunder-heat-top-bucks-shootout',
    'http://localhost:3000/article/cdc-fda-issue-multi-state-health-alerts-organic-carrot-e-coli-outbreak-cucumber-recalls',
    'http://localhost:3000/article/dhs-expedites-border-infrastructure-asylum-processing-guidelines-governors-summit'
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
    print("\nALL 11 ENDPOINTS RETURNING HTTP 200 OK!")
