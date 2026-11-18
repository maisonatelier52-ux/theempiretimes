const https = require('https');
const fs = require('fs');
const path = require('path');

const targetFiles = [
  {
    category: 'politics',
    fileTitle: 'File:View of Oval Office in 2017.jpg',
    dest: 'white-house-west-wing-scharf-testimony-memo-2026.jpg'
  },
  {
    category: 'us',
    fileTitle: 'File:John Joseph Moakley United States Courthouse September 2024.jpg',
    dest: 'moakley-federal-courthouse-boston-visa-ruling-2026.jpg'
  },
  {
    category: 'world',
    fileTitle: 'File:Manila skyline, Philippines.jpg',
    dest: 'manila-east-asia-summit-south-china-sea-2026.jpg'
  },
  {
    category: 'business',
    fileTitle: "File:Macy's Herald Square August 2017 01.jpg",
    dest: 'us-retail-holiday-shopping-macys-2026.jpg'
  },
  {
    category: 'technology',
    fileTitle: 'File:IBM Quantum Computer Demo at ITUWTSA 2024, Delhi.jpg',
    dest: 'ibm-quantum-computer-post-quantum-encryption-2026.jpg'
  },
  {
    category: 'science',
    fileTitle: 'File:James Webb Space Telescope Mirrors Will Piece Together Cosmic Puzzles (30108124923).jpg',
    dest: 'james-webb-space-telescope-quasars-cosmic-dawn-2026.jpg'
  },
  {
    category: 'health',
    fileTitle: 'File:FDA Building 66 - CDRH (5160772175).jpg',
    dest: 'fda-white-oak-building-drug-approvals-2026.jpg'
  },
  {
    category: 'culture',
    fileTitle: 'File:Skirball Center for the Performing Arts November 2024.jpg',
    dest: 'nyu-skirball-national-book-awards-2026.jpg'
  },
  {
    category: 'sports',
    fileTitle: 'File:M&T Bank Stadium DoD.jpg',
    dest: 'mt-bank-stadium-ravens-chargers-derrick-henry-2026.jpg'
  }
];

function getFileDirectUrl(fileTitle) {
  return new Promise((resolve, reject) => {
    const url = 'https://commons.wikimedia.org/w/api.php?action=query&titles=' + encodeURIComponent(fileTitle) + '&prop=imageinfo&iiprop=url&format=json';
    https.get(url, { headers: { 'User-Agent': 'EmpireTimesNews/1.0 (contact@theempiretimes.org)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          const imgInfo = pages[pageId].imageinfo;
          if (imgInfo && imgInfo.length > 0) {
            resolve(imgInfo[0].url);
          } else {
            reject(new Error('No imageinfo for ' + fileTitle));
          }
        } catch(e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'EmpireTimesNews/1.0 (contact@theempiretimes.org)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadImage(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error('Failed to download, status: ' + res.statusCode));
      }
      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close(resolve);
      });
    }).on('error', reject);
  });
}

async function run() {
  const uploadsDir = path.join('public', 'uploads', 'news');
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

  for (const item of targetFiles) {
    try {
      console.log(`Resolving URL for: ${item.fileTitle}...`);
      const directUrl = await getFileDirectUrl(item.fileTitle);
      console.log(`Downloading to: ${item.dest}...`);
      const destPath = path.join(uploadsDir, item.dest);
      await downloadImage(directUrl, destPath);
      const stat = fs.statSync(destPath);
      console.log(`-> SUCCESS: ${item.dest} (${stat.size} bytes)`);
    } catch (err) {
      console.error(`-> ERROR for ${item.dest}:`, err.message);
    }
  }
}

run();
