const http = require('http');

setTimeout(() => {
  http.get('http://localhost:3000/article/house-republicans-elect-jim-jordan-minority-leader-jeffries-speakership-bid', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('Status code:', res.statusCode);
      console.log('HTML Length:', data.length);
      console.log('Title included:', data.includes('Jim Jordan'));
    });
  }).on('error', (e) => console.log('Error:', e.message));
}, 3000);
