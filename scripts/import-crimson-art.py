"""Import reviewed ChatGPT originals using crop, alpha bounds and nearest scaling only."""
from pathlib import Path
from PIL import Image
import json, hashlib
ROOT=Path(__file__).resolve().parents[1]
SRC=ROOT/'art/crimson/source'; DST=ROOT/'assets/resources/ui/pastel'
FACES=['guardian','rowen','kael','sera','blade','helmet','breastplate','aura','ember-fox','stone-hawk','shade-wolf','crown','compass','gems','supplies','laurel']
ACTORS=['guardian','rowen','kael','sera','golem','forest-wolf','spectral-knight','flame-spirit','ember-fox','stone-hawk','shade-wolf','fairy','skeleton','tree-boss','ice-boss','crystal-boss']
ICONS=['sword','adventurer','armor','fox','heart','chest','cards','lightning','trophy','mail','settings','rebirth','egg','scroll','flag','lock']
records=[]
def split(file,folder,names,xs,ys,size,pad=True,custom=None):
 source=SRC/file
 if not source.exists():return
 im=Image.open(source).convert('RGBA')
 if pad:assert im.getchannel('A').getextrema()==(0,255),file+' requires real alpha'
 for i,name in enumerate(names):
  col=i%(len(xs)-1);row=i//(len(xs)-1);bounds=custom[i] if custom else (xs[col],ys[row],xs[col+1],ys[row+1]);cell=im.crop(bounds);visible=None
  if pad:
   visible=cell.getchannel('A').point(lambda a:255 if a>32 else 0).getbbox();assert visible
   cell=cell.crop(visible);ratio=(size-12)/max(cell.size);cell=cell.resize((round(cell.width*ratio),round(cell.height*ratio)),Image.Resampling.NEAREST)
   result=Image.new('RGBA',(size,size));result.alpha_composite(cell,((size-cell.width)//2,size-cell.height-6 if folder=='actors' else (size-cell.height)//2))
  else:result=cell.resize((size,size),Image.Resampling.NEAREST)
  target=DST/folder/(name+'.png');assert target.with_suffix('.png.meta').exists();result.save(target)
  records.append({'source':str(source.relative_to(ROOT)),'file':str(target.relative_to(ROOT)),'crop':bounds,'visibleCrop':visible,'size':size,'sha256':hashlib.sha256(target.read_bytes()).hexdigest()})
split('world.png','world',[str(i) for i in range(4)],[0,627,1254],[0,627,1254],480,False)
split('faces.png','faces',FACES,[0,314,627,941,1254],[0,350,630,930,1254],96)
split('icons.png','icons',ICONS,[0,314,627,941,1254],[0,314,627,941,1254],96)
(ROOT/'art/crimson/import-manifest.json').write_text(json.dumps({'transforms':'Cell crop, alpha-visible bounds, padding and nearest resize only. Original downloads preserved.','assets':records},ensure_ascii=False,indent=2)+'\n')
print('Imported',len(records),'reviewed crimson assets')

import runpy
runpy.run_path(str(ROOT/'scripts/extract-crimson-actors.py'))
