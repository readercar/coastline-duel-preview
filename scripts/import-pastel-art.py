"""Import actual ChatGPT downloads by cropping and nearest resizing only."""
from pathlib import Path
from PIL import Image
import json,hashlib,uuid
ROOT=Path(__file__).resolve().parents[1];SRC=ROOT/'art/pastel/source';DST=ROOT/'assets/resources/ui/pastel';records=[]
ICONS=['sword','adventurer','armor','fox','heart','chest','cards','lightning','trophy','mail','settings','rebirth','egg','scroll','flag','lock']
ACTORS=['guardian','rowen','kael','sera','golem','forest-wolf','spectral-knight','flame-spirit','ember-fox','stone-hawk','shade-wolf','fairy','skeleton','tree-boss','ice-boss','crystal-boss']
FACES=['guardian','rowen','kael','sera','blade','helmet','breastplate','aura','ember-fox','stone-hawk','shade-wolf','crown','compass','gems','supplies','laurel']
POPUP=['primary','secondary','quiet','selected','disabled','danger','panel','card','slate']
def save(im,folder,name,source,bounds,size,pad=False):
 im=im.convert('RGBA');tight=None
 if pad:
  tight=im.getchannel('A').point(lambda a:255 if a>32 else 0).getbbox()
  if not tight:raise ValueError(name+' has no visible pixels')
  im=im.crop(tight);scale=(size-12)/max(im.size);im=im.resize((round(im.width*scale),round(im.height*scale)),Image.Resampling.NEAREST)
  canvas=Image.new('RGBA',(size,size));canvas.alpha_composite(im,((size-im.width)//2,size-im.height-6 if folder=='actors' else (size-im.height)//2));im=canvas
 else:im=im.resize((size,size),Image.Resampling.NEAREST)
 path=DST/folder/(name+'.png');path.parent.mkdir(parents=True,exist_ok=True);im.save(path)
 meta=path.with_suffix('.png.meta')
 if not meta.exists():
  u=str(uuid.uuid4());meta.write_text(json.dumps({'ver':'1.0.27','importer':'image','imported':True,'uuid':u,'files':['.json','.png'],'subMetas':{'6c48a':{'importer':'texture','uuid':u+'@6c48a','displayName':name,'id':'6c48a','name':'texture','userData':{'wrapModeS':'clamp-to-edge','wrapModeT':'clamp-to-edge','minfilter':'nearest','magfilter':'nearest','mipfilter':'none','anisotropy':0,'isUuid':True,'imageUuidOrDatabaseUri':u,'visible':False},'ver':'1.0.22','imported':True,'files':['.json'],'subMetas':{}}},'userData':{'type':'texture','fixAlphaTransparencyArtifacts':False,'hasAlpha':im.getchannel('A').getextrema()[0]<255,'redirect':u+'@6c48a'}},indent=2)+'\n')
 records.append({'file':str(path.relative_to(ROOT)),'source':source,'crop':bounds,'visibleCrop':tight,'size':size,'sha256':hashlib.sha256(path.read_bytes()).hexdigest()})
def split(source,folder,names,xs,ys,size,pad=False):
 im=Image.open(SRC/source)
 for i,name in enumerate(names):
  x,y=i%(len(xs)-1),i//(len(xs)-1);bounds=(xs[x],ys[y],xs[x+1],ys[y+1]);save(im.crop(bounds),folder,name,source,bounds,size,pad)
split('actors.png','actors',ACTORS,[0,330,637,955,1254],[0,320,630,909,1254],192,True)
split('icons.png','icons',ICONS,[0,319,630,956,1254],[0,357,640,916,1254],96,True)
split('surfaces-flat.png','popup',POPUP,[0,418,836,1254],[0,418,836,1254],128)
split('world.png','world',[str(i) for i in range(4)],[0,627,1254],[0,627,1254],480)
if (SRC/'faces.png').exists():split('faces.png','faces',FACES,[0,314,627,941,1254],[0,350,630,930,1254],96,True)
for name,source in {'panel':'card','teal':'secondary','orange':'primary','neutral':'disabled'}.items():
 im=Image.open(DST/'popup'/(source+'.png'));save(im,'skins',name,'surfaces-flat.png',None,128)
for directory in [DST,*[d for d in DST.rglob('*') if d.is_dir()]]:
 meta=directory.with_suffix('.meta')
 if not meta.exists():meta.write_text(json.dumps({'ver':'1.2.0','importer':'directory','imported':True,'uuid':str(uuid.uuid4()),'files':[],'subMetas':{},'userData':{}},indent=2)+'\n')
(ROOT/'art/pastel/import-manifest.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n')
print('Imported',len(records),'assets from downloaded originals')
