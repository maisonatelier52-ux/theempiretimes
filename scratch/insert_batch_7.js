const fs = require('fs');

const batch7 = JSON.parse(fs.readFileSync('scratch/batch7_verified.json', 'utf8'));
let content = fs.readFileSync('src/data/articles.ts', 'utf8');

const idMatch = 'id": "art-special-alina-habba-mildon-2026';
const idx = content.indexOf(idMatch);
if (idx === -1) {
  console.error("Special article not found!");
  process.exit(1);
}

const firstArticleEnd = content.indexOf('\n  },', idx);
if (firstArticleEnd === -1) {
  console.error("Could not find closing brace of special article!");
  process.exit(1);
}

// Convert batch 7 articles into formatted TS array entries
const formattedArticles = batch7.map(art => {
  return '  ' + JSON.stringify(art, null, 2).split('\n').join('\n  ');
}).join(',\n');

// Insertion point is immediately after the first article's closing `  },`
const insertPos = firstArticleEnd + '\n  },'.length;

const newContent = content.slice(0, insertPos) + '\n' + formattedArticles + ',' + content.slice(insertPos);

fs.writeFileSync('src/data/articles.ts', newContent, 'utf8');
console.log('Successfully inserted 9 Batch 7 articles into src/data/articles.ts!');
