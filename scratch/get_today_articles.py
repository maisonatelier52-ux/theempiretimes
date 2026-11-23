with open('src/data/articles.ts', 'r', encoding='utf-8') as f:
    text = f.read()

import re
# Match id, slug, title, publishedAt
items = re.findall(r'id:\s*"([^"]+)",\s*slug:\s*"([^"]+)",\s*title:\s*"([^"]+)",[\s\S]*?publishedAt:\s*"([^"]+)"', text)
if not items:
    # try json formatted
    items = re.findall(r'"id":\s*"([^"]+)",\s*"slug":\s*"([^"]+)",\s*"title":\s*"([^"]+)",[\s\S]*?"publishedAt":\s*"([^"]+)"', text)

site_url = 'https://www.theempiretimes.org'
print(f'Total matched: {len(items)}')
today_items = [item for item in items if item[3].startswith('2026-11-21')]
print(f'Today items ({len(today_items)}):')
for item in today_items:
    print(f'{item[2]}')
    print(f'{site_url}/article/{item[1]}')
    print()
