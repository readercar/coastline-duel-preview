"""Crop and resize downloaded originals for Cocos. No generated pixels or background editing."""
from pathlib import Path
from PIL import Image
import hashlib
import json

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'art/ui/source'
TARGET = ROOT / 'assets/resources/ui/crumble'
ICONS = ['sword', 'adventurer', 'armor', 'fox', 'heart', 'chest', 'cards', 'lightning', 'trophy', 'mail', 'settings', 'rebirth', 'egg', 'scroll', 'flag', 'lock']
FACES = ['guardian', 'rowen', 'kael', 'sera', 'blade', 'helmet', 'breastplate', 'aura', 'ember-fox', 'stone-hawk', 'shade-wolf', 'crown', 'compass', 'gems', 'supplies', 'laurel']
records = []

def split(filename, folder, names, columns, size):
    original = SOURCE / filename
    image = Image.open(original)
    rows = (len(names) + columns - 1) // columns
    for index, name in enumerate(names):
        col, row = index % columns, index // columns
        bounds = (round(col * image.width / columns), round(row * image.height / rows), round((col + 1) * image.width / columns), round((row + 1) * image.height / rows))
        crop = image.crop(bounds).resize((size, size), Image.Resampling.LANCZOS)
        path = TARGET / folder / (name + '.png')
        path.parent.mkdir(parents=True, exist_ok=True)
        crop.save(path)
        records.append({'file': str(path.relative_to(ROOT)), 'original': str(original.relative_to(ROOT)), 'crop': bounds, 'size': [size, size], 'mode': crop.mode, 'sha256': hashlib.sha256(path.read_bytes()).hexdigest()})

split('ui-skins-original.png', 'skins', ['panel', 'teal', 'orange', 'neutral'], 2, 128)
split('portraits-original.png', 'faces', FACES, 4, 128)
split('ui-icons-original.png', 'icons', ICONS, 4, 96)
(ROOT / 'art/ui/import-manifest.json').write_text(json.dumps(records, ensure_ascii=False, indent=2) + '\n')
print(f'Imported {len(records)} sprites from actual ChatGPT downloads.')
