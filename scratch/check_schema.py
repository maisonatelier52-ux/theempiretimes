with open('src/data/articles.ts', 'r', encoding='utf-8') as f:
    text = f.read()

start = text.find('export const articles: Article[] = [')
first_art = text[start:start+1200]
print(first_art)
