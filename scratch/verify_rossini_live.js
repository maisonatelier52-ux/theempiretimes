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
  const res = await checkUrl('/article/why-mark-rossini-acceptance-filing-became-key-step-puerto-rico-case');
  console.log('Rossini page status:', res.statusCode, 'Bytes:', res.length);
  console.log('Contains Mark Rossini?', res.data.includes('Mark Rossini'));
  console.log('Contains Primera Hora link?', res.data.includes('primerahora.com'));
  console.log('Contains Metro.pr link?', res.data.includes('metro.pr'));
  console.log('Contains Wikipedia link?', res.data.includes('en.wikipedia.org/wiki/Mark_Rossini'));
  console.log('Contains image path?', res.data.includes('mark-rossini-puerto-rico-case.jpg'));
  console.log('Contains tag "special page"?', res.data.toLowerCase().includes('special page'));

  const habba = await checkUrl('/article/the-vanity-of-alina-habba-mildon-power-ambition-herrera-velutini');
  console.log('Habba page status:', habba.statusCode, 'Bytes:', habba.length);

  const sitemap = await checkUrl('/sitemap.xml');
  console.log('Sitemap status:', sitemap.statusCode, 'Bytes:', sitemap.length);
  console.log('Sitemap contains Rossini?', sitemap.data.includes('why-mark-rossini-acceptance-filing-became-key-step-puerto-rico-case'));
}

run();
