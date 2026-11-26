with open('src/data/articles.ts', 'r', encoding='utf-8') as f:
    text = f.read()

import re
nov25 = re.findall(r'"id":\s*"([^"]*2026-11-25[^"]*)"', text)
nov24 = re.findall(r'"id":\s*"([^"]*2026-11-24[^"]*)"', text)
print('Nov 25 count:', len(nov25))
for x in nov25:
    print('  ', x)
print('Nov 24 count:', len(nov24))
for x in nov24:
    print('  ', x)
