from PIL import Image
from pathlib import Path
from collections import deque
import json
src=Image.open('art/crimson/source/actors.png').convert('RGBA');w,h=src.size;mask=bytearray(1 if x>64 else 0 for x in src.getchannel('A').getdata());parts=[]
for k in range(w*h):
 if not mask[k]:continue
 mask[k]=0;q=deque([k]);pixels=[];x0=w;y0=h;x1=y1=0
 while q:
  v=q.popleft();pixels.append(v);x=v%w;y=v//w;x0=min(x0,x);y0=min(y0,y);x1=max(x1,x);y1=max(y1,y)
  for t in (v-1 if x else -1,v+1 if x+1<w else -1,v-w if y else -1,v+w if y+1<h else -1):
   if t>=0 and mask[t]:mask[t]=0;q.append(t)
 if len(pixels)>15000:parts.append((x0,y0,x1+1,y1+1,pixels))
assert len(parts)==16,len(parts)
names=['guardian','rowen','kael','sera','golem','forest-wolf','spectral-knight','flame-spirit','ember-fox','stone-hawk','shade-wolf','fairy','skeleton','tree-boss','ice-boss','crystal-boss'];records=[]
for b in parts:
 x0,y0,x1,y1,pixels=b;col=min(3,int((x0+x1)/2/(w/4)));row=min(3,int((y0+y1)/2/(h/4)));name=names[row*4+col]
 # Extract a connected sprite without recoloring or synthesizing any source pixel.
 out=Image.new('RGBA',(x1-x0,y1-y0));dst=out.load();original=src.load()
 for v in pixels:x=v%w;y=v//w;dst[x-x0,y-y0]=original[x,y]
 ratio=180/max(out.size);out=out.resize((round(out.width*ratio),round(out.height*ratio)),Image.Resampling.NEAREST);canvas=Image.new('RGBA',(192,192));canvas.alpha_composite(out,((192-out.width)//2,186-out.height));path=Path('assets/resources/ui/pastel/actors')/(name+'.png');canvas.save(path)
 records.append({'name':name,'sourceBounds':[x0,y0,x1,y1],'sourcePixels':len(pixels),'file':str(path)})
assert len({r['name'] for r in records})==16
Path('art/crimson/actor-extraction.json').write_text(json.dumps({'source':'art/crimson/source/actors.png','method':'Extract each of 16 connected alpha sprites, keeping original RGBA pixels; nearest resize and foot-aligned padding. Removes neighboring atlas sprites from overlapping rectangular crops.','sprites':records},indent=2)+'\n')
print('Extracted 16 intact actors')
