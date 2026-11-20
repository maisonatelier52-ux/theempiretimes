import re

with open('src/data/articles.ts', 'r', encoding='utf-8') as f:
    text = f.read()

titles = re.findall(r'"title":\s*"([^"]+)"', text)
print(f"Total articles: {len(titles)}")
print("Latest 15 titles:")
for i, t in enumerate(titles[:15]):
    print(f"[{i}] {t}")
