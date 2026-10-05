"""Crop downloaded static terrain sprites, retaining original alpha and pixel sampling."""
from pathlib import Path
from PIL import Image
import json,uuid,hashlib
ROOT=Path(__file__).resolve().parents[1];SRC=ROOT/'art/pastel/source/ground-original.png';DST=ROOT/'assets/resources/ui/pastel/terrain';DST.mkdir(parents=True,exist_ok=True)
im=Image.open(SRC).convert('RGBA');assert im.size==(1254,1254) and im.getchannel('A').getextrema()==(0,255)
records=[];surfaces=[350,350,930,930]
for i in range(4):
 x,y=i%2,i//2;bounds=(627*x,627*y,627*(x+1),627*(y+1));cell=im.crop(bounds)
 tight=cell.getchannel('A').point(lambda a:255 if a>32 else 0).getbbox();cell=cell.crop(tight)
 scale=min(500/cell.width,210/cell.height);size=(round(cell.width*scale),round(cell.height*scale));cell=cell.resize(size,Image.Resampling.NEAREST)
 offset=((512-size[0])//2,(224-size[1])//2);out=Image.new('RGBA',(512,224));out.alpha_composite(cell,offset)
 contact=offset[1]+(surfaces[i]-627*y-tight[1])*size[1]/(tight[3]-tight[1]);normalized=.5-contact/224
 path=DST/f'ground-{i}.png';out.save(path);meta=path.with_suffix('.png.meta')
 if not meta.exists():
  u=str(uuid.uuid4());meta.write_text(json.dumps({'ver':'1.0.27','importer':'image','imported':True,'uuid':u,'files':['.json','.png'],'subMetas':{'6c48a':{'importer':'texture','uuid':u+'@6c48a','displayName':f'ground-{i}','id':'6c48a','name':'texture','userData':{'wrapModeS':'clamp-to-edge','wrapModeT':'clamp-to-edge','minfilter':'nearest','magfilter':'nearest','mipfilter':'none','anisotropy':0,'isUuid':True,'imageUuidOrDatabaseUri':u,'visible':False},'ver':'1.0.22','imported':True,'files':['.json'],'subMetas':{}}},'userData':{'type':'texture','fixAlphaTransparencyArtifacts':False,'hasAlpha':True,'redirect':u+'@6c48a'}},indent=2)+'\n')
 records.append({'file':str(path.relative_to(ROOT)),'crop':bounds,'visibleCrop':tight,'size':[512,224],'walkingSurfaceNormalizedY':round(normalized,6),'sourceWalkingY':surfaces[i],'sha256':hashlib.sha256(path.read_bytes()).hexdigest()})
meta=DST.with_suffix('.meta')
if not meta.exists():meta.write_text(json.dumps({'ver':'1.2.0','importer':'directory','imported':True,'uuid':str(uuid.uuid4()),'files':[],'subMetas':{},'userData':{}},indent=2)+'\n')
(ROOT/'art/pastel/ground-import-manifest.json').write_text(json.dumps({'original':str(SRC.relative_to(ROOT)),'sha256':hashlib.sha256(SRC.read_bytes()).hexdigest(),'dimensions':list(im.size),'transforms':'Cell crop, alpha-visible bounds, padding, nearest resize only; original retained unchanged.','sprites':records},indent=2)+'\n')
print('Surface Y offsets:',[r['walkingSurfaceNormalizedY'] for r in records])
