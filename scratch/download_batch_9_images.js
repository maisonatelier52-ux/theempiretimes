const https = require('https');
const fs = require('fs');
const path = require('path');

const targetFiles = [
  {
    category: 'politics',
    fileTitle: 'File:Jim Jordan official photo, 114th Congress (cropped)(b).jpg',
    dest: 'jim-jordan-house-minority-leader-gop-2026.jpg'
  },
  {
    category: 'technology',
    fileTitle: 'File:NVIDIA Headquarters.jpg',
    dest: 'nvidia-headquarters-board-harvey-jones-2026.jpg'
  },
  {
    category: 'business',
    fileTitle: 'File:Wall Street - New York Stock Exchange.jpg',
    dest: 'wall-street-nyse-stock-rally-buyback-2026.jpg'
  },
  {
    category: 'world',
    fileTitle: 'File:Skyline in Shenzhen (20250327).jpg',
    dest: 'shenzhen-skyline-trilateral-summit-trump-xi-putin-2026.jpg'
  },
  {
    category: 'us',
    fileTitle: 'File:Atmospheric River Soaks California (46422297914).jpg',
    dest: 'atmospheric-river-pacific-northwest-california-2026.jpg'
  },
  {
    category: 'science',
    fileTitle: 'File:Rocky Exoplanet TRAPPIST-1 c (Artist Concept).jpg',
    dest: 'nasa-jwst-rocky-exoplanets-atmospheric-data-2026.jpg'
  },
  {
    category: 'health',
    fileTitle: 'File:HPV-vaccine- Gardasil2016JAPAN.jpg',
    dest: 'hpv-vaccine-cervical-cancer-elimination-day-2026.jpg'
  },
  {
    category: 'culture',
    fileTitle: 'File:Kyle MacLachlan by Gage Skidmore.jpg',
    dest: 'kyle-maclachlan-national-book-awards-2026.jpg'
  },
  {
    category: 'sports',
    fileTitle: 'File:Sanford Stadium- University of Georgia.jpg',
    dest: 'sanford-stadium-georgia-bulldogs-cfp-rankings-2026.jpg'
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
