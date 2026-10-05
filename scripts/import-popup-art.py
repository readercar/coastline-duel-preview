"""Crop the actual ChatGPT PNG download; retain its pixels and native alpha."""
from pathlib import Path
from PIL import Image
import hashlib
import json

ROOT = Path(__file__).resolve().parents[1]
original = ROOT / 'art/ui/source/popup-v2-original.png'
image = Image.open(original)
assert image.mode == 'RGBA' and image.getchannel('A').getextrema() == (0, 255)
names = ['primary', 'secondary', 'quiet', 'selected', 'disabled', 'danger', 'panel', 'card']
records = []
for col in range(2):
    left, right = col * image.width // 2, (col + 1) * image.width // 2
    alpha = image.getchannel('A').crop((left, 0, right, image.height))
    bands, start = [], None
    for y in range(image.height):
        occupied = sum(v > 128 for v in alpha.crop((0, y, right-left, y+1)).get_flattened_data()) > image.width * .17
        if occupied and start is None:
            start = y
        elif not occupied and start is not None:
            bands.append((start, y)); start = None
    if start is not None:
        bands.append((start, image.height))
    assert len(bands) == 4, bands
    for row, (top, bottom) in enumerate(bands):
        # The generated atlas has uneven gutters. Crop each actual asset independently.
        band_top, band_bottom = max(0, top-8), min(image.height, bottom+8)
        mask = alpha.crop((0, band_top, right-left, band_bottom)).point(lambda v: 255 if v > 200 else 0)
        x0, y0, x1, y1 = mask.getbbox()
        bounds = (max(left, left+x0-2), max(0, band_top+y0-2), min(right, left+x1+2), min(image.height, band_top+y1+2))
        crop = image.crop(bounds)
        size = (128, round(128 * crop.height / crop.width))
        crop = crop.resize(size, Image.Resampling.LANCZOS)
        name = names[row*2+col]
        path = ROOT / 'assets/resources/ui/crumble/popup' / (name+'.png')
        path.parent.mkdir(parents=True, exist_ok=True)
        crop.save(path)
        records.append({'name':name,'file':str(path.relative_to(ROOT)), 'original':str(original.relative_to(ROOT)), 'crop':bounds,'size':size,'alpha_extrema':crop.getchannel('A').getextrema(),'sha256':hashlib.sha256(path.read_bytes()).hexdigest()})
records.sort(key=lambda r:names.index(r['name']))
(ROOT / 'art/ui/popup-v2-import-manifest.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n')
print('Imported 8 popup surfaces from the actual original PNG. Crop/resize only; alpha preserved.')

corrected = ROOT / 'art/ui/source/popup-v3-original.png'
if corrected.exists():
    image = Image.open(corrected)
    assert image.mode == 'RGBA' and image.getchannel('A').getextrema() == (0, 255)
    records = []
    for index, name in enumerate(['panel', 'card', 'quiet', 'slate']):
        col, row = index % 2, index // 2
        cell_bounds = (col*image.width//2, row*image.height//2, (col+1)*image.width//2, (row+1)*image.height//2)
        cell = image.crop(cell_bounds)
        alpha = cell.getchannel('A')
        ys = [y for y in range(cell.height) if sum(v>128 for v in alpha.crop((0,y,cell.width,y+1)).get_flattened_data()) > cell.width*.2]
        xs = [x for x in range(cell.width) if sum(v>128 for v in alpha.crop((x,0,x+1,cell.height)).get_flattened_data()) > cell.height*.2]
        x0,y0,x1,y1 = max(0,min(xs)-2),max(0,min(ys)-2),min(cell.width,max(xs)+3),min(cell.height,max(ys)+3)
        bounds = (cell_bounds[0]+x0,cell_bounds[1]+y0,cell_bounds[0]+x1,cell_bounds[1]+y1)
        crop = image.crop(bounds).resize((128,128),Image.Resampling.LANCZOS)
        path = ROOT / 'assets/resources/ui/crumble/popup-v3' / (name+'.png')
        path.parent.mkdir(parents=True,exist_ok=True);crop.save(path)
        records.append({'name':name,'file':str(path.relative_to(ROOT)),'original':str(corrected.relative_to(ROOT)),'crop':bounds,'size':[128,128],'alpha_extrema':crop.getchannel('A').getextrema(),'sha256':hashlib.sha256(path.read_bytes()).hexdigest()})
    (ROOT / 'art/ui/popup-v3-import-manifest.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n')
    print('Imported 4 corrected deep teal / slate surfaces. Original alpha preserved.')
