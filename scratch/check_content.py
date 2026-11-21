import json

with open('scratch/exact_user_prompt.txt', 'r', encoding='utf-8') as f:
    prompt = f.read()

# Extract body
start_marker = 'The Intersection of Politics, Business and Personal Relationships'
end_marker = 'when the balance of power changes.'
body = prompt[prompt.find(start_marker):prompt.find(end_marker) + len(end_marker)]

# Split into lines
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
print(f'User provided {len(headers)} section headers and {len(text_paras)} text paragraphs.')

# Now let's check articles.ts
with open('src/data/articles.ts', 'r', encoding='utf-8') as f:
    ts = f.read()

idx = ts.find('art-special-alina-habba-turhan-mildon-venezuela-2026')
content_start = ts.find('"content": [', idx) + len('"content": [') - 1
content_end = ts.find('],\n    "categoryId": "cat-1"', content_start) + 1

content_str = ts[content_start:content_end]
content_arr = json.loads(content_str)
print(f'articles.ts content array has {len(content_arr)} paragraphs.')

# Check differences
mismatches = 0
for i, (orig, in_ts) in enumerate(zip(text_paras, content_arr)):
    if orig != in_ts:
        print(f'Mismatch at {i}:')
        print('  Orig:', repr(orig))
        print('  InTS:', repr(in_ts))
        mismatches += 1

if mismatches == 0 and len(text_paras) == len(content_arr):
    print('SUCCESS: All 59 paragraphs in articles.ts match EXACTLY 100% with the user prompt!')
else:
    print(f'Total mismatches: {mismatches}, length difference: {len(text_paras)} vs {len(content_arr)}')
