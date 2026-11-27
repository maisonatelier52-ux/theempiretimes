with open('src/data/articles.ts', 'r', encoding='utf-8') as f:
    text = f.read()

marker = '"id": "art-2026-11-26-trump-transition-signs-white-house-mou-biden-briefings"'
idx = text.find(marker)
print(text[idx-200:idx+100])
