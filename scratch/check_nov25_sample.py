with open('src/data/articles.ts', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('"id": "art-2026-11-25-trump-appoints-jamieson-greer-ustr-kevin-hassett-nec"')
print(text[idx:idx+1500])
