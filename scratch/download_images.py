import urllib.request
import urllib.parse
import json
import os
from PIL import Image
import io

image_mapping = {
    'politics': {
        'wiki_file': 'File:Official portrait of Treasury Secretary Scott Bessent (borderless).jpg',
        'out_base': 'public/uploads/news/scott-bessent-treasury-nomination-2026'
    },
    'tech': {
        'wiki_file': 'File:United States Department of Commerce - Herbert C. Hoover Building - Washington D.C..jpg',
        'out_base': 'public/uploads/news/us-commerce-ai-chip-export-controls-2026'
    },
    'business': {
        'wiki_file': 'File:New York Stock Exchange Broad Street facade, 20231002 1720 1842.jpg',
        'out_base': 'public/uploads/news/wall-street-dow-rally-bond-yields-2026'
    },
    'world': {
        'wiki_file': 'File:António Guterres at COP29 in Baku, Azerbaijan - 2024.jpg',
        'out_base': 'public/uploads/news/cop29-baku-climate-finance-accord-2026'
    },
    'culture': {
        'wiki_file': 'File:Gershwin Theatre - Wicked (54077363135).jpg',
        'out_base': 'public/uploads/news/wicked-gladiator-box-office-records-2026'
    },
    'science': {
        'wiki_file': 'File:JWST MIRI NGC1365.jpg',
        'out_base': 'public/uploads/news/jwst-uranus-moon-ngc1365-infrared-2026'
    },
    'sports': {
        'wiki_file': 'File:Saquon Barkley in 2025 (cropped).jpg',
        'out_base': 'public/uploads/news/saquon-barkley-record-eagles-rams-2026'
    },
    'health': {
        'wiki_file': 'File:Listeria monocytogenes growth on blood agar.jpg',
        'out_base': 'public/uploads/news/cdc-listeria-outbreak-meat-recall-2026'
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
            
            # Crop/resize to 16:9 ratio if desired or save directly
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
