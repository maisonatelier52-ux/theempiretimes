with open('src/data/articles.ts', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = re.findall(r'"id":\s*"(art-2026-11-25-[^"]+)".*?"categoryId":\s*"([^"]+)"', text, re.DOTALL)
for m in matches:
    print(m[0], '->', m[1])
