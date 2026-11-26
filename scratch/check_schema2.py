with open('src/data/articles.ts', 'r', encoding='utf-8') as f:
    text = f.read()

start = text.find('"categoryId":')
print(text[start-100:start+300])
