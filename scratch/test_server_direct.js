const http = require('http');

http.get('http://localhost:3000/sitemap.xml', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Sitemap status:', res.statusCode);
    console.log('Includes Jordan?', data.includes('jordan'));
    console.log('Includes Nvidia?', data.includes('nvidia-q3-earnings'));
    console.log('Includes Habba?', data.includes('alina-habba'));
  });
}).on('error', (e) => console.log('Error:', e.message));
