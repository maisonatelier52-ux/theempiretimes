import urllib.request
import urllib.parse
import json
import os
from PIL import Image
import io

image_mapping = {
    'politics': {
        'wiki_file': 'File:Jack Smith 2023.png',
        'out_base': 'public/uploads/news/jack-smith-dismisses-trump-charges-2026'
    },
    'business': {
        'wiki_file': 'File:Cargo containers (5945899601).jpg',
        'out_base': 'public/uploads/news/trump-tariffs-mexico-canada-china-trade-2026'
    },
    'world': {
        'wiki_file': 'File:President Joe Biden delivers remarks to the nation after the results of the 2024 presidential election on November 7, 2024, in the White House Rose Garden.jpg',
        'out_base': 'public/uploads/news/israel-hezbollah-lebanon-ceasefire-accord-2026'
    },
    'technology': {
        'wiki_file': 'File:TikTok app.jpg',
        'out_base': 'public/uploads/news/tiktok-federal-appeals-court-ban-challenge-2026'
    },
    'sports': {
        'wiki_file': 'File:Lamar Jackson 2021.jpg',
        'out_base': 'public/uploads/news/ravens-chargers-harbaugh-bowl-monday-night-2026'
    },
    'health': {
        'wiki_file': 'File:Organic Carrot.jpg',
        'out_base': 'public/uploads/news/cdc-fda-organic-carrots-ecoli-recall-2026'
    },
    'culture': {
        'wiki_file': "File:Macy's parade balloon inflation (11678).jpg",
        'out_base': 'public/uploads/news/macys-thanksgiving-day-parade-98th-edition-2026'
    },
    'science': {
        'wiki_file': 'File:Europa Clipper Team Deploys Magnetometer Boom.jpg',
        'out_base': 'public/uploads/news/nasa-europa-clipper-instrument-checkouts-2026'
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
                # too wide, crop width
                new_w = int(h * target_ratio)
                left = (w - new_w) // 2
                img_cropped = img.crop((left, 0, left + new_w, h))
            else:
                # too tall, crop height
                new_h = int(w / target_ratio)
                top = (h - new_h) // 2
                img_cropped = img.crop((0, top, w, top + new_h))
            
            # Resize to max 1280x720
            img_final = img_cropped.resize((1280, 720), Image.Resampling.LANCZOS)
            
            jpg_path = f"{out_base}.jpg"
            webp_path = f"{out_base}.webp"
            img_final.save(jpg_path, 'JPEG', quality=90, optimize=True)
            img_final.save(webp_path, 'WEBP', quality=88)
            print(f"  SUCCESS! Saved {jpg_path} and {webp_path}")
    except Exception as e:
        print(f"  ERROR for {cat}: {e}")
