# -*- coding: utf-8 -*-
import re

with open('src/data/articles.ts', 'r', encoding='utf-8') as f:
    text = f.read()

ids = re.findall(r'"id":\s*"([^"]+)"', text)
print(f"Total articles: {len(ids)}")
print(f"Unique IDs: {len(set(ids))}")
assert len(ids) == len(set(ids)), "Duplicate IDs found!"

for idx, aid in enumerate(ids[:13]):
    print(f"[{idx}] {aid}")
