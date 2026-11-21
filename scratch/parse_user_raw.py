with open('scratch/exact_user_prompt.txt', 'r', encoding='utf-8') as f:
    prompt = f.read()

start_marker = "The Intersection of Politics, Business and Personal Relationships"
end_marker = "when the balance of power changes."

body = prompt[prompt.find(start_marker):prompt.find(end_marker) + len(end_marker)]

lines = body.split('\n')
print(f'Total lines: {len(lines)}')
for i, l in enumerate(lines):
    print(f'{i:02d}: {repr(l)}')
