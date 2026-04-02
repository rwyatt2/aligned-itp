import os
from PIL import Image

folder = '/Users/mnstr/Desktop/aligned-itp/public/images/partners'

for filename in os.listdir(folder):
    if not (filename.endswith('.jpg') or filename.endswith('.png')):
        continue
    
    filepath = os.path.join(folder, filename)
    try:
        img = Image.open(filepath).convert("RGBA")
        datas = img.getdata()
        
        newData = []
        for item in datas:
            # item is (R, G, B, A)
            # Threshold for "white-ish" background
            if item[0] > 230 and item[1] > 230 and item[2] > 230:
                # white becomes transparent
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)
                
        img.putdata(newData)
        
        # Save as PNG
        name_no_ext = os.path.splitext(filename)[0]
        outpath = os.path.join(folder, f"{name_no_ext}.png")
        img.save(outpath, "PNG")
        if filename.endswith('.jpg'):
            os.remove(filepath)
            
        print(f"Processed {filename}")
    except Exception as e:
        print(f"Failed {filename}: {e}")
