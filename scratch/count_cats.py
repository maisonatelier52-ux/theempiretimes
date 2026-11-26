with open('src/data/articles.ts', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = re.findall(r'"categoryId":\s*"([^"]+)"', text)
from collections import Counter
print(Counter(matches))
