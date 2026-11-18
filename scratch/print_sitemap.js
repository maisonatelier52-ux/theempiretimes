const http = require('http');

http.get('http://localhost:3000/sitemap.xml', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Sitemap length:', data.length);
    console.log('First 500 chars:');
    console.log(data.slice(0, 500));
    console.log('Last 500 chars:');
    console.log(data.slice(-500));
  });
});
