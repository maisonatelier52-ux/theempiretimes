import urllib.request
import json
import os
from PIL import Image

images_to_fetch = [
    {
        "file": "File:P20241113CS-0503.jpg",
        "fallback": "File:P20210120AS-0016 (50882315891).jpg",
        "out_base": "trump-biden-white-house-transition-mou-2026"
    },
    {
        "file": "File:Jensen Huang 20231109 (cropped2).jpg",
        "fallback": "File:JensenHuangSC18.jpg",
        "out_base": "nvidia-jensen-huang-ai-chips-infrastructure-2026"
    },
    {
        "file": "File:Manhattan - Macy's Herald Square - 20180821135302.jpg",
        "fallback": "File:Macys dep store.JPG",
        "out_base": "macys-herald-square-accounting-investigation-2026"
    },
    {
        "file": "File:Beirut Skyline.jpg",
        "fallback": "File:Beirut skyline, Beirut, Lebanon.jpg",
        "out_base": "lebanon-israel-ceasefire-beirut-accord-2026"
    },
    {
        "file": "File:Macy's Thanksgiving Day Parade 2022 New York City (52523112564).jpg",
        "fallback": "File:Macys Thanksgiving Parade (37733875745).jpg",
        "out_base": "macys-thanksgiving-day-parade-98th-edition-nyc-2026"
    },
    {
        "file": "File:Parker Solar Probe.jpg",
        "fallback": "File:Solar Probe + Design.jpg",
        "out_base": "nasa-parker-solar-probe-sun-flyby-2026"
    },
    {
        "file": "File:Ford Field.jpg",
        "fallback": "File:Ford Field (1).jpg",
        "out_base": "nfl-thanksgiving-ford-field-lions-bears-2026"
    },
    {
        "file": "File:FDA Sign & Bldg 21 at Entrance (5204602349).jpg",
        "fallback": "File:FDA Entrance (16792957331).jpg",
        "out_base": "fda-cdc-organic-carrots-ecoli-recall-2026"
    },
    {
        "file": "File:Security Screening at the Denver Airport.jpg",
        "fallback": "File:TSA Security Checkpoing_at_Airport.jpg",
        "out_base": "thanksgiving-travel-tsa-airport-storm-delays-2026"
    }
]

headers = {'User-Agent': 'EmpireTimesNewsBot/1.0 (contact@theempiretimes.org)'}

def get_wikimedia_url(filename):
    clean_title = filename if filename.startswith("File:") else f"File:{filename}"
    api_url = f"https://commons.wikimedia.org/w/api.php?action=query&titles={urllib.parse.quote(clean_title)}&prop=imageinfo&iiprop=url&format=json"
    req = urllib.request.Request(api_url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
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
        with urllib.request.urlopen(req, timeout=20) as resp, open(temp_path, 'wb') as out_f:
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
