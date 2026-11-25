import urllib.request
import urllib.parse
import json
import os
from PIL import Image
import io

image_mapping = {
    'politics': {
        'wiki_file': 'File:Kevin Hassett official photo.jpg',
        'out_base': 'public/uploads/news/trump-greer-hassett-economic-cabinet-2026'
    },
    'technology': {
        'wiki_file': 'File:The Apex Building, headquarters of the Federal Trade Commission, on Constitution Avenue and 7th Streets in Washington, D.C.jpg',
        'out_base': 'public/uploads/news/ftc-investigates-microsoft-cloud-ai-2026'
    },
    'business': {
        'wiki_file': 'File:Early Black Friday shopper.jpg',
        'out_base': 'public/uploads/news/consumer-confidence-index-surge-november-2026'
    },
    'world': {
        'wiki_file': "File:Secretary Blinken's Official Department Photo (cropped).jpg",
        'out_base': 'public/uploads/news/g7-foreign-ministers-fiuggi-declaration-2026'
    },
    'culture': {
        'wiki_file': 'File:El Capitan Theatre, Hollywood, California (2997200450).jpg',
        'out_base': 'public/uploads/news/moana-2-box-office-thanksgiving-record-2026'
    },
    'science': {
        'wiki_file': 'File:Falcon 9 Starlink 6-38 Launch (8215018).jpg',
        'out_base': 'public/uploads/news/spacex-falcon-9-400th-flight-starlink-2026'
    },
    'sports': {
        'wiki_file': 'File:Ohio Stadium Overhead.jpg',
        'out_base': 'public/uploads/news/college-football-playoff-rankings-oregon-rivalry-2026'
    },
    'health': {
        'wiki_file': 'File:Cows on their way for milking, Wood Dairy Farm - geograph.org.uk - 4487265.jpg',
        'out_base': 'public/uploads/news/california-raw-milk-bird-flu-h5n1-recall-2026'
    }
}

def get_direct_url(file_name):
    url = f"https://commons.wikimedia.org/w/api.php?action=query&titles={urllib.parse.quote(file_name)}&prop=imageinfo&iiprop=url&format=json"
    req = urllib.request.Request(url, headers={'User-Agent': 'NewsBot/1.0 (contact@theempiretimes.org)'})
    with urllib.request.urlopen(req) as res:
        data = json.loads(res.read().decode('utf-8'))
        pages = data['query']['pages']
        for k, v in pages.items():
            if 'imageinfo' in v:
                return v['imageinfo'][0]['url']
    return None

os.makedirs('public/uploads/news', exist_ok=True)

for cat, info in image_mapping.items():
    file_name = info['wiki_file']
    out_base = info['out_base']
    print(f"Processing {cat}: {file_name}...")
    direct_url = get_direct_url(file_name)
    if not direct_url:
        print(f"  FAILED to find url for {file_name}")
        continue
    
    print(f"  Downloading from: {direct_url[:80]}...")
    req = urllib.request.Request(direct_url, headers={'User-Agent': 'NewsBot/1.0 (contact@theempiretimes.org)'})
    try:
        with urllib.request.urlopen(req) as res:
            img_data = res.read()
            img = Image.open(io.BytesIO(img_data))
            if img.mode != 'RGB':
                img = img.convert('RGB')
            
            # Crop to 16:9 ratio
            w, h = img.size
            target_ratio = 16.0 / 9.0
            current_ratio = w / h
            
            if current_ratio > target_ratio:
                new_w = int(h * target_ratio)
                left = (w - new_w) // 2
                img_cropped = img.crop((left, 0, left + new_w, h))
            else:
                new_h = int(w / target_ratio)
                top = (h - new_h) // 2
                img_cropped = img.crop((0, top, w, top + new_h))
            
            # Resize to 1280x720
            img_final = img_cropped.resize((1280, 720), Image.Resampling.LANCZOS)
            
            jpg_path = f"{out_base}.jpg"
            webp_path = f"{out_base}.webp"
            img_final.save(jpg_path, 'JPEG', quality=90, optimize=True)
            img_final.save(webp_path, 'WEBP', quality=88)
            print(f"  SUCCESS! Saved {jpg_path} and {webp_path}")
    except Exception as e:
        print(f"  ERROR for {cat}: {e}")
