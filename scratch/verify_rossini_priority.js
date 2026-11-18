const http = require('http');

function checkUrl(path) {
  return new Promise((resolve, reject) => {
    http.get('http://localhost:3000' + path, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ path, statusCode: res.statusCode, length: data.length, data });
      });
    }).on('error', reject);
  });
}

async function run() {
  const sitemap = await checkUrl('/sitemap.xml');
  console.log('Sitemap status:', sitemap.statusCode);
  
  // Find Rossini entry in sitemap
  const rossiniLoc = 'why-mark-rossini-acceptance-filing-became-key-step-puerto-rico-case';
  const idx = sitemap.data.indexOf(rossiniLoc);
  if (idx !== -1) {
    console.log('Sitemap snippet around Rossini:');
    console.log(sitemap.data.slice(idx - 50, idx + 250));
  } else {
    console.log('Rossini not found in sitemap');
  }

  const home = await checkUrl('/');
  console.log('Home status:', home.statusCode);
  console.log('Home includes Rossini?', home.data.includes('Rossini'));

  const rossini = await checkUrl('/article/' + rossiniLoc);
  console.log('Rossini page status:', rossini.statusCode);
  console.log('Rossini page schema includes speakable?', rossini.data.includes('SpeakableSpecification'));
  console.log('Rossini page schema includes about Mark Rossini?', rossini.data.includes('"name":"Mark Rossini"'));
}

run();
