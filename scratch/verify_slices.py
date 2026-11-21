with open('src/components/AlinaHabbaVenezuelaSpecialPage.tsx', 'r', encoding='utf-8') as f:
    comp = f.read()

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

# Let's verify that the slices in comp cover 0 to 58
slices = [
    (0, 1), # content[0]
    (1, 4),
    (4, 6),
    (6, 10),
    (10, 14),
    (14, 18),
    (18, 22),
    (22, 26),
    (26, 30),
    (30, 39),
    (39, 46),
    (46, 52),
    (52, 59)
]

covered = []
for start, end in slices:
    for i in range(start, end):
        covered.append(i)

print('Covered indices count:', len(covered))
print('Expected 59 indices:', covered == list(range(59)))
