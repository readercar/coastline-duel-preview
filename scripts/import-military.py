from PIL import Image
from pathlib import Path
import json
root=Path('assets/resources/ui/military')
def save(im,path):
 path.parent.mkdir(parents=True,exist_ok=True); im.save(path)
source=Path('art/military/source')
im=Image.open(source/'actors.png').convert('RGBA')
for i,name in enumerate(['riflewoman','sniper','officer','mercenary','drone','heavy']):
 col=i%3; row=i//3
 cell=im.crop((col*512,0 if row==0 else 530,(col+1)*512,526 if row==0 else 1024))
 bbox=cell.getchannel('A').point(lambda x:255 if x>100 else 0).getbbox(); cell=cell.crop(bbox)
 cell.thumbnail((184,178),Image.Resampling.NEAREST)
 out=Image.new('RGBA',(192,192));out.alpha_composite(cell,((192-cell.width)//2,186-cell.height));save(out,root/'actors'/f'{name}.png')
for i in range(3):
 face=im.crop((i*512+105,20,i*512+415,235));face.thumbnail((128,128),Image.Resampling.NEAREST);out=Image.new('RGBA',(128,128));out.alpha_composite(face,((128-face.width)//2,(128-face.height)//2));save(out,root/'faces'/f'{i}.png')
if (source/'world.png').exists():
 im=Image.open(source/'world.png').convert('RGB');w,h=im.size
 for i in range(4):save(im.crop((i%2*w//2,i//2*h//2,(i%2+1)*w//2,(i//2+1)*h//2)),root/'world'/f'{i}.png')
if (source/'icons.png').exists():
 im=Image.open(source/'icons.png').convert('RGBA');w,h=im.size
 for i in range(18):
  cell=im.crop((i%6*w//6,i//6*h//3,(i%6+1)*w//6,(i//6+1)*h//3));bbox=cell.getchannel('A').point(lambda x:255 if x>100 else 0).getbbox();cell=cell.crop(bbox);cell.thumbnail((84,84),Image.Resampling.NEAREST)
  out=Image.new('RGBA',(96,96));out.alpha_composite(cell,((96-cell.width)//2,(96-cell.height)//2));save(out,root/'icons'/f'{i}.png')
print('Imported military originals without replacing their source files.')
