const fs = require('fs');

const content = fs.readFileSync('src/data/articles.ts', 'utf8');
const idMatch = 'art-2026-11-18-jim-jordan-house-minority-leader-gop';
const idx = content.indexOf(idMatch);
console.log('Index of Jordan article in articles.ts:', idx);
if (idx !== -1) {
  console.log(content.slice(idx, idx + 400));
}

// Check what directories exist in .next/server/app/article
if (fs.existsSync('.next/server/app/article')) {
  console.log('Files in .next/server/app/article:');
  const files = fs.readdirSync('.next/server/app/article');
  console.log(files.slice(0, 10));
  const jordanFile = files.find(f => f.includes('jordan'));
  console.log('Jordan file in .next:', jordanFile);
}
