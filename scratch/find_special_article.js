const fs = require('fs');
const content = fs.readFileSync('src/data/articles.ts', 'utf8');

const idMatch = 'id": "art-special-alina-habba-mildon-2026';
const idx = content.indexOf(idMatch);
console.log('Found at:', idx);

// Find the closing brace of this first article object
// We know articles is `export const articles: Article[] = [\n  {\n ... \n  },`
const firstArticleEnd = content.indexOf('\n  },', idx);
console.log('firstArticleEnd:', firstArticleEnd);
if (firstArticleEnd !== -1) {
  console.log('Snippet around end:');
  console.log(content.slice(firstArticleEnd - 100, firstArticleEnd + 50));
}
