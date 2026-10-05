"""Slice the downloaded ChatGPT original; retain alpha, use nearest sampling only."""
from pathlib import Path
from PIL import Image
import hashlib,json,uuid
ROOT=Path(__file__).resolve().parents[1]
SRC=ROOT/'art/pastel/source/combat-fx-original.png'
DST=ROOT/'assets/resources/ui/pastel/effects'
NAMES=['slash','impact','sparkle','arrow','orb','shard','defeat','wisp','ring']
im=Image.open(SRC).convert('RGBA')
assert im.size==(1254,1254) and im.getchannel('A').getextrema()==(0,255)
DST.mkdir(parents=True,exist_ok=True)
records=[]
for i,name in enumerate(NAMES):
 x,y=i%3,i//3; bounds=(x*418,y*418,(x+1)*418,(y+1)*418)
 cell=im.crop(bounds);tight=cell.getchannel('A').point(lambda a:255 if a>32 else 0).getbbox()
 assert tight,name
 # All margins remain truly transparent. No backgrounds or alpha removal painted in.
 cell=cell.crop(tight);scale=116/max(cell.size)
 cell=cell.resize((round(cell.width*scale),round(cell.height*scale)),Image.Resampling.NEAREST)
 out=Image.new('RGBA',(128,128));out.alpha_composite(cell,((128-cell.width)//2,(128-cell.height)//2))
 path=DST/(name+'.png');out.save(path)
 meta=path.with_suffix('.png.meta')
 if not meta.exists():
  u=str(uuid.uuid4());meta.write_text(json.dumps({'ver':'1.0.27','importer':'image','imported':True,'uuid':u,'files':['.json','.png'],'subMetas':{'6c48a':{'importer':'texture','uuid':u+'@6c48a','displayName':name,'id':'6c48a','name':'texture','userData':{'wrapModeS':'clamp-to-edge','wrapModeT':'clamp-to-edge','minfilter':'nearest','magfilter':'nearest','mipfilter':'none','anisotropy':0,'isUuid':True,'imageUuidOrDatabaseUri':u,'visible':False},'ver':'1.0.22','imported':True,'files':['.json'],'subMetas':{}}},'userData':{'type':'texture','fixAlphaTransparencyArtifacts':False,'hasAlpha':True,'redirect':u+'@6c48a'}},indent=2)+'\n')
 records.append({'file':str(path.relative_to(ROOT)),'crop':bounds,'visibleCrop':tight,'dimensions':[128,128],'sha256':hashlib.sha256(path.read_bytes()).hexdigest()})
meta=DST.with_suffix('.meta')
if not meta.exists():meta.write_text(json.dumps({'ver':'1.2.0','importer':'directory','imported':True,'uuid':str(uuid.uuid4()),'files':[],'subMetas':{},'userData':{}},indent=2)+'\n')
manifest={'original':str(SRC.relative_to(ROOT)),'originalDimensions':list(im.size),'originalSha256':hashlib.sha256(SRC.read_bytes()).hexdigest(),'transforms':'3x3 cell crop, alpha-visible bounds, centered padding, nearest resize; original retained unchanged','sprites':records}
(ROOT/'art/pastel/combat-fx-import-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
print('Imported',len(records),'transparent static effect sprites')
