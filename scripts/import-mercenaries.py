"""Slice original ChatGPT downloads; preserve source PNGs and alpha unchanged."""
from PIL import Image
from pathlib import Path
import json
root=Path('assets/resources/ui/military');src=Path('art/military/source')
rosters={'a':[0,1,2,3,21,14],'b':[4,5,6,7,8,9],'c':[10,11,12,13,15,16],'d':[17,18,19,20,22,23],'e':[24,25,26,27,28,29]}
heads={'a':[260,755,1240,245,745,1250],'b':[270,752,1275,255,750,1280],'c':[257,745,1260,264,748,1255],'d':[250,750,1250,250,750,1250],'e':[240,755,1240,250,750,1250]}
def silhouettes(im):
 # Alpha-connected components separate even weapons crossing nominal grid cells.
 w,h=im.size;mask=bytearray(im.getchannel('A').point(lambda v:255 if v>100 else 0).tobytes());parts=[]
 for pos in range(w*h):
  if not mask[pos]:continue
  todo=[pos];mask[pos]=0;pixels=[]
  while todo:
   p=todo.pop();pixels.append(p);x=p%w
   for n in (p-w,p+w,p-1 if x else -1,p+1 if x<w-1 else -1):
    if 0<=n<w*h and mask[n]:mask[n]=0;todo.append(n)
  if len(pixels)>100:parts.append(pixels)
 parts=sorted(parts,key=len,reverse=True)[:6]
 def location(ps):
  return (sum(p//w for p in ps)/len(ps),sum(p%w for p in ps)/len(ps))
 parts=sorted(parts,key=lambda ps:location(ps)[0]);parts=sorted(parts[:3],key=lambda ps:location(ps)[1])+sorted(parts[3:],key=lambda ps:location(ps)[1])
 result=[]
 for ps in parts:
  alpha=bytearray(w*h)
  for p in ps:alpha[p]=255
  isolated=im.copy();isolated.putalpha(Image.frombytes('L',(w,h),bytes(alpha)));result.append(isolated)
 return result

def save(im,folder,id):
 p=root/folder/f'{id}.png';p.parent.mkdir(parents=True,exist_ok=True);im.save(p)
for batch,ids in rosters.items():
 path=src/f'mercenaries-{batch}.png'
 if not path.exists():continue
 im=Image.open(path).convert('RGBA');w,h=im.size;parts=silhouettes(im)
 for cell,id in enumerate(ids):
  r=cell//3;isolated=parts[cell];bounds=isolated.getchannel('A').getbbox();art=isolated.crop(bounds)
  cut=art.copy();cut.thumbnail((372,500),Image.Resampling.NEAREST);out=Image.new('RGBA',(384,512));out.alpha_composite(cut,((384-cut.width)//2,512-cut.height));save(out,'cutins',id)
  actor=art.copy();actor.thumbnail((184,([174,142,178,155,169,182][cell] if batch=='e' else 178)),Image.Resampling.NEAREST);out=Image.new('RGBA',(192,192));out.alpha_composite(actor,((192-actor.width)//2,186-actor.height));save(out,'mercenaries',id)
  cx=heads[batch][cell];top=r*h//2
  face=isolated.crop((cx-110,top,cx+110,top+230));face.thumbnail((128,128),Image.Resampling.NEAREST);out=Image.new('RGBA',(128,128));out.alpha_composite(face,((128-face.width)//2,0));save(out,'profiles',id)
im=Image.open(src/'battlefield.png').convert('RGB');w,h=im.size
for i in range(4):save(im.crop((i%2*w//2,i//2*h//2,(i%2+1)*w//2,(i//2+1)*h//2)),'battlefield',i)
print('Imported separate actors, cut-ins, profiles and battlefield tiles.')
