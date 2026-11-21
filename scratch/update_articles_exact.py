import json

with open('scratch/exact_user_prompt.txt', 'r', encoding='utf-8') as f:
    prompt = f.read()

start_marker = "The Intersection of Politics, Business and Personal Relationships"
end_marker = "when the balance of power changes."

body = prompt[prompt.find(start_marker):prompt.find(end_marker) + len(end_marker)]
lines = [l.strip() for l in body.split('\n') if l.strip()]

headers = [
    'The Intersection of Politics, Business and Personal Relationships',
    'From Venezuela’s Political Environment to Washington',
    'Alina Habba’s Position in Trump’s Political Circle',
    'A Marriage That Drew Washington’s Attention',
    'The Venezuelan Cement Contracts at the Centre of the Questions',
    'From the Democratic Republic of Congo to Venezuela',
    'Questions That Remain Unanswered',
    'Conclusion: When Personal Relationships Meet International Business'
]

text_paras = [l for l in lines if l not in headers]
assert len(text_paras) == 59, f"Expected 59 paragraphs, got {len(text_paras)}"

with open('src/data/articles.ts', 'r', encoding='utf-8') as f:
    ts = f.read()

idx = ts.find('art-special-alina-habba-turhan-mildon-venezuela-2026')
content_start = ts.find('"content": [', idx) + len('"content": [') - 1
content_end = ts.find('],\n    "categoryId": "cat-1"', content_start) + 1

new_content_json = json.dumps(text_paras, indent=6, ensure_ascii=False)

new_ts = ts[:content_start] + new_content_json + ts[content_end:]

with open('src/data/articles.ts', 'w', encoding='utf-8') as f:
    f.write(new_ts)

print("Updated articles.ts with exact 59 paragraphs!")
