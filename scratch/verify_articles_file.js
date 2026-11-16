const fs = require('fs');

// Simple verification by requiring through ts-node or transpiling
const content = fs.readFileSync('src/data/articles.ts', 'utf8');
console.log('Total file length:', content.length);

// Count occurrences of "id":
const matches = content.match(/"id":/g);
console.log('Total articles count:', matches ? matches.length : 0);

// Check first 3 articles
const idList = [];
const idRegex = /"id":\s*"([^"]+)"/g;
let m;
while ((m = idRegex.exec(content)) !== null) {
  idList.push(m[1]);
}
console.log('First 12 article IDs:');
console.log(idList.slice(0, 12));
