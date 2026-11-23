import re

with open('src/data/articles.ts', 'r', encoding='utf-8') as f:
    text = f.read()

items = re.findall(r'"id":\s*"([^"]+)",\s*"slug":\s*"([^"]+)",\s*"title":\s*"([^"]+)",[\s\S]*?"publishedAt":\s*"([^"]+)"', text)
print(f'Total articles: {len(items)}')
print('Top 20 most recent articles:')
for i, item in enumerate(items[:20]):
    print(f'{i+1}. [{item[3]}] ({item[0]}) {item[2]}')
