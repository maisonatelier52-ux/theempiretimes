with open('src/data/articles.ts', 'r', encoding='utf-8') as f:
    text = f.read()

marker = '"id": "art-2026-11-26-trump-transition-signs-white-house-mou-biden-briefings"'
idx = text.find(marker)
insert_idx = text.rfind('{', 0, idx)
print("text[insert_idx-10:insert_idx+20]:")
print(repr(text[insert_idx-10:insert_idx+20]))
