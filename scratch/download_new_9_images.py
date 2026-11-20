import urllib.request
import os
from PIL import Image

headers = {'User-Agent': 'TheEmpireTimesBot/1.0 (https://www.theempiretimes.org; desk@theempiretimes.org)'}

images_to_download = [
    {
        "cat": "cat-1",
        "url": "https://upload.wikimedia.org/wikipedia/commons/4/41/Linda_McMahon_official_photo.jpg",
        "filename": "linda-mcmahon-education-dr-oz-cabinet-2026.jpg",
        "crop_top": True
    },
    {
        "cat": "cat-2",
        "url": "https://upload.wikimedia.org/wikipedia/commons/f/f9/2014-04-04-Robert-F-Kennedy-Department-of-Justice-Building-Washington.jpg",
        "filename": "doj-google-chrome-antitrust-divestment-2026.jpg",
        "crop_top": False
    },
    {
        "cat": "cat-3",
        "url": "https://upload.wikimedia.org/wikipedia/commons/0/0e/Gautam_Adani_Net_Worth.jpg",
        "filename": "gautam-adani-indictment-brooklyn-court-2026.jpg",
        "crop_top": False
    },
    {
        "cat": "cat-4",
        "url": "https://upload.wikimedia.org/wikipedia/commons/d/dd/Ambassador_Brink_at_the_United_States_Embassy_Kyiv%2C_Ukraine_on_22_February_2024.jpg",
        "filename": "kyiv-us-embassy-storm-shadow-strike-2026.jpg",
        "crop_top": False
    },
    {
        "cat": "cat-5",
        "url": "https://upload.wikimedia.org/wikipedia/commons/a/a2/Chris_Stapleton_%2849627461537%29.jpg",
        "filename": "cma-awards-chris-stapleton-morgan-wallen-2026.jpg",
        "crop_top": False
    },
    {
        "cat": "cat-6",
        "url": "https://upload.wikimedia.org/wikipedia/commons/1/1d/October_2021_Northeast_Pacific_bomb_cyclone_3_on_10-24-2021.jpg",
        "filename": "bomb-cyclone-pacific-northwest-atmospheric-river-2026.jpg",
        "crop_top": False
    },
    {
        "cat": "cat-7",
        "url": "https://upload.wikimedia.org/wikipedia/commons/c/ca/Rafael_Nadal_Roland_Garros_2008.jpg",
        "filename": "rafael-nadal-davis-cup-malaga-retirement-2026.jpg",
        "crop_top": False
    },
    {
        "cat": "cat-8",
        "url": "https://upload.wikimedia.org/wikipedia/commons/0/05/Graphs_measles_Australia_1991-2009.jpg",
        "filename": "who-cdc-global-measles-outbreak-report-2026.jpg",
        "crop_top": False
    },
    {
        "cat": "cat-9",
        "url": "https://upload.wikimedia.org/wikipedia/commons/7/7d/Georgia_State_Capitol%2C_Atlanta%2C_Georgia.jpg",
        "filename": "jose-ibarra-laken-riley-verdict-georgia-2026.jpg",
        "crop_top": False
    }
]

out_dir = os.path.join("public", "uploads", "news")
os.makedirs(out_dir, exist_ok=True)

for item in images_to_download:
    dest_path = os.path.join(out_dir, item["filename"])
    raw_tmp = dest_path + ".tmp"
    print(f"Downloading {item['filename']} for {item['cat']}...")
    req = urllib.request.Request(item["url"], headers=headers)
    try:
        with urllib.request.urlopen(req) as resp, open(raw_tmp, "wb") as f:
            f.write(resp.read())
        
        # Process and optimize with PIL
        with Image.open(raw_tmp) as img:
            img = img.convert("RGB")
            w, h = img.size
            
            # If image is very portrait or tall (like Linda McMahon official photo), crop around upper center
            if item.get("crop_top") and h > w:
                # crop to 16:10 or 4:3 from upper area
                new_h = int(w * 0.75)
                top = int(h * 0.1)
                img = img.crop((0, top, w, min(h, top + new_h)))
                w, h = img.size

            # Target width max 1400px
            if w > 1400:
                new_w = 1400
                new_h = int(h * (1400 / w))
                img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
            
            img.save(dest_path, "JPEG", quality=85, optimize=True)
            print(f"  Saved {dest_path} ({img.size[0]}x{img.size[1]}, {os.path.getsize(dest_path)} bytes)")
        
        if os.path.exists(raw_tmp):
            os.remove(raw_tmp)
            
    except Exception as e:
        print(f"Error downloading {item['filename']}: {e}")
        if os.path.exists(raw_tmp):
            os.remove(raw_tmp)

print("\nFinished downloading and optimizing images!")
