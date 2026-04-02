import os
from PIL import Image

folder = '/Users/mnstr/Desktop/aligned-itp/public/images/partners'

for filename in os.listdir(folder):
    if not filename.endswith('.png'):
        continue
    
    filepath = os.path.join(folder, filename)
    try:
        img = Image.open(filepath).convert("RGBA")
        datas = img.getdata()
        
        newData = []
        for item in datas:
            # item is (R, G, B, A)
            r, g, b, a = item
            
            # If the pixel is already transparent, keep it 
            if a < 10:
                newData.append(item)
                continue
                
            # If pixel is whitish/greyish noise near white
            if r > 180 and g > 180 and b > 180 and abs(r-g) < 20 and abs(g-b) < 20:
                # Completely transparent
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)
                
        img.putdata(newData)
        
        # Save as PNG
        img.save(filepath, "PNG")
        print(f"Aggressively processed {filename}")
    except Exception as e:
        print(f"Failed {filename}: {e}")
