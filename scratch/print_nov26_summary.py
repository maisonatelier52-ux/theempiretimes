with open('scratch/add_nov26_articles.py', 'r', encoding='utf-8') as f:
    text = f.read()

scope = {}
code_section = text[:text.find('print(f"Total articles')]
exec(code_section, scope)
nov26_articles = scope['nov26_articles']

categories_map = {
    'cat-1': 'Politics',
    'cat-2': 'Technology',
    'cat-3': 'Business',
    'cat-4': 'World',
    'cat-5': 'Culture',
    'cat-6': 'Science',
    'cat-7': 'Sports',
    'cat-8': 'Health',
    'cat-9': 'U.S.'
}

for i, a in enumerate(nov26_articles, 1):
    total_chars = sum(len(p) for p in a['content'])
    cat = categories_map.get(a.get('categoryId'), 'News')
    print(f"Article {i}:")
    print(f"  Category: {cat}")
    print(f"  Title: {a['title']}")
    print(f"  Image: {a['image']}")
    print(f"  Image Caption: {a.get('imageCaption', '')}")
    print(f"  Character Count: {total_chars}")
    print(f"  Production URL: https://www.theempiretimes.org/article/{a['slug']}")
    print(f"  Local URL: http://localhost:3002/article/{a['slug']}")
    print(f"  SEO Keywords: {', '.join(a['tags'])}")
    print()
