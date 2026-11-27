import urllib.request
import json
import os
from PIL import Image

images_to_fetch = [
    {
        "file": "File:J-Edgar-Hoover-FBI-Building-Washington-DC-2014-A.jpg",
        "fallback": "File:J. Edgar Hoover Building - from street - 2706.jpg",
        "out_base": "fbi-headquarters-threats-cabinet-nominees-2026"
    },
    {
        "file": "File:Amazon fulfillment center (14544646554).jpg",
        "fallback": "File:Amazon fulfillment center, Macon.jpg",
        "out_base": "amazon-fulfillment-ai-shopping-surge-2026"
    },
    {
        "file": "File:Black Friday Shopping.jpg",
        "fallback": "File:Early Black Friday shopper.jpg",
        "out_base": "black-friday-retail-spending-surge-2026"
    },
    {
        "file": 'File:"Unifil" Lebanon Naqoura.jpg',
        "fallback": "File:Panhard AML-20 UNIFIL1.jpg",
        "out_base": "unifil-lebanon-border-peacekeeping-patrol-2026"
    },
    {
        "file": "File:El capitan theatre.jpg",
        "fallback": "File:El Capitan Theater (3715408910).jpg",
        "out_base": "box-office-holiday-weekend-wicked-gladiator-2026"
    },
    {
        "file": "File:Oceanworld.jpg",
        "fallback": "File:Parker Solar Probe.jpg",
        "out_base": "jwst-lhs-1140b-water-world-exoplanet-2026"
    },
    {
        "file": "File:Ohio State Stadium 2021.jpg",
        "fallback": "File:OSU Ohio Stadium.JPG",
        "out_base": "college-football-rivalry-week-ohio-state-michigan-2026"
    },
    {
        "file": "File:Fluzone vaccine extracting.jpg",
        "fallback": "File:Fight the flu 151005-D-RT812-014.jpg",
        "out_base": "cdc-winter-respiratory-illness-vaccine-warning-2026"
    },
    {
        "file": "File:Historic Lake Effect Snow Hits Buffalo New York Area (15668722309).jpg",
        "fallback": "File:Whiteout on Ontario Highway 404.jpg",
        "out_base": "great-lakes-lake-effect-snowstorm-thanksgiving-2026"
    }
]

headers = {'User-Agent': 'EmpireTimesNewsBot/1.0 (contact@theempiretimes.org)'}

def get_wikimedia_url(filename):
    clean_title = filename if filename.startswith("File:") else f"File:{filename}"
    api_url = f"https://commons.wikimedia.org/w/api.php?action=query&titles={urllib.parse.quote(clean_title)}&prop=imageinfo&iiprop=url&format=json"
    req = urllib.request.Request(api_url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=12) as response:
            data = json.loads(response.read().decode('utf-8'))
            pages = data['query']['pages']
            for k, v in pages.items():
                if 'imageinfo' in v and len(v['imageinfo']) > 0:
                    return v['imageinfo'][0]['url']
    except Exception as e:
        print(f"Error fetching API for {filename}: {e}")
    return None

os.makedirs('public/uploads/news', exist_ok=True)
os.makedirs('scratch/temp_images', exist_ok=True)

for item in images_to_fetch:
    url = get_wikimedia_url(item['file'])
    if not url and 'fallback' in item:
        print(f"Trying fallback for {item['file']} -> {item['fallback']}")
        url = get_wikimedia_url(item['fallback'])
    
    if not url:
        print(f"FAILED to find URL for {item['file']}")
        continue
    
    print(f"Downloading: {item['out_base']} from {url}")
    temp_path = f"scratch/temp_images/{item['out_base']}.tmp"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=25) as resp, open(temp_path, 'wb') as out_f:
            out_f.write(resp.read())
        
        # Process with PIL to 16:9 (1280x720)
        img = Image.open(temp_path).convert('RGB')
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
        
        img_resized = img_cropped.resize((1280, 720), Image.Resampling.LANCZOS)
        
        jpg_out = f"public/uploads/news/{item['out_base']}.jpg"
        webp_out = f"public/uploads/news/{item['out_base']}.webp"
        
        img_resized.save(jpg_out, 'JPEG', quality=88, optimize=True)
        img_resized.save(webp_out, 'WEBP', quality=85)
        print(f"SAVED: {jpg_out} and {webp_out} ({os.path.getsize(jpg_out)} bytes)")
    except Exception as e:
        print(f"Error processing {item['out_base']}: {e}")
