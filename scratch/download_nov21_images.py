import urllib.request
import os
from PIL import Image

headers = {'User-Agent': 'TheEmpireTimesBot/1.0 (https://www.theempiretimes.org; desk@theempiretimes.org)'}

images_to_download = [
    {
        "cat": "cat-1",
        "url": "https://upload.wikimedia.org/wikipedia/commons/0/0c/Pam_Bondi_official_photo_%28cropped%29.jpg",
        "filename": "pam-bondi-attorney-general-nomination-2026.jpg",
        "crop_top": True
    },
    {
        "cat": "cat-2",
        "url": "https://upload.wikimedia.org/wikipedia/commons/d/d2/Bitcoin_on_Laptop_Keyboard.jpg",
        "filename": "bitcoin-99k-record-crypto-rally-2026.jpg",
        "crop_top": False
    },
    {
        "cat": "cat-3",
        "url": "https://upload.wikimedia.org/wikipedia/commons/e/ed/United_States_Treasury_Washington_DC_5383075936_o.jpg",
        "filename": "us-treasury-sanctions-gazprombank-russia-2026.jpg",
        "crop_top": False
    },
    {
        "cat": "cat-4",
        "url": "https://upload.wikimedia.org/wikipedia/commons/a/a5/International_Criminal_Court_building_%282019%29_in_The_Hague_02.jpg",
        "filename": "icc-the-hague-arrest-warrants-netanyahu-2026.jpg",
        "crop_top": False
    },
    {
        "cat": "cat-5",
        "url": "https://upload.wikimedia.org/wikipedia/commons/a/ad/Percival_Everett%2C_author%2C_at_the_2024_National_Book_Awards_finalist_reading_9.jpg",
        "filename": "national-book-awards-percival-everett-2026.jpg",
        "crop_top": False
    },
    {
        "cat": "cat-6",
        "url": "https://upload.wikimedia.org/wikipedia/commons/c/cc/US_Navy_110319-N-9465P-104_The_Arleigh_Burke-class_guided-missile_destroyer_USS_Stout_%28DDG_55%29_launches_a_Tomahawk_missile_in_support_of_Operation.jpg",
        "filename": "oreshnik-hypersonic-ballistic-missile-launch-2026.jpg",
        "crop_top": False
    },
    {
        "cat": "cat-7",
        "url": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Cleveland_Browns_Stadium_%287207572094%29.jpg",
        "filename": "cleveland-browns-steelers-snow-football-2026.jpg",
        "crop_top": False
    },
    {
        "cat": "cat-8",
        "url": "https://upload.wikimedia.org/wikipedia/commons/8/85/FDA_Unit_Mobilizes_for_Emergency_Response_-_Emergency_Operations_Center_%28EOC%29_%286992808696%29.jpg",
        "filename": "fda-psychiatric-drug-approval-mental-health-2026.jpg",
        "crop_top": False
    },
    {
        "cat": "cat-9",
        "url": "https://upload.wikimedia.org/wikipedia/commons/8/8b/Fukuoka_Airport_International_Terminal_Departure_Floor.jpg",
        "filename": "thanksgiving-travel-airports-highways-2026.jpg",
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
        
        with Image.open(raw_tmp) as img:
            img = img.convert("RGB")
            w, h = img.size
            
            if item.get("crop_top") and h > w:
                new_h = int(w * 0.75)
                top = int(h * 0.1)
                img = img.crop((0, top, w, min(h, top + new_h)))
                w, h = img.size

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

print("\nAll 9 images successfully downloaded and optimized!")
