import {Graphics,isValid,Label,Mask,Node,tween,UIOpacity,UITransform,Vec3} from 'cc';
import type {GameApp} from './GameApp';
import {tutorialAdvance,TUTORIAL_DONE,TAB_STAGES,tabUnlocked,tutorialComplete,tutorialSeen} from './core/EntryPolicy';
import {UI} from './UITheme';
import {translations} from './core/I18n';
import {SPELLS} from './core/Config';
export class TutorialUI {
 private shown='';
 private focusTargets=new Map<Node,{guide:Node;key:string;x:number;y:number;w:number;h:number;arrow:boolean}>();
 private shapeKey(node:Node){return JSON.stringify(this.a.ui.contours.get(node.getChildByName('selected-tab')||node));}
 private refreshFocus(){for(const [node,record] of this.focusTargets){if(!isValid(node,true)||!isValid(record.guide,true)){this.focusTargets.delete(node);continue;}if(record.key!==this.shapeKey(node)){this.a.stopTweens(record.guide);record.guide.destroy();this.focus(node,record.x,record.y,record.w,record.h,record.arrow);}}}
 private popupTitle='';
 private popupCandidates:{node:Node;key:string;caption:string}[]=[];
 private popupHint:Label|null=null;
 private popupTarget:Node|null=null;
 private buttons=new WeakMap<Node,string>();
 currentAction:string|undefined;
 private deferredSave=false;
 private postponed=new Set<string>();
 complete(key:string){if(tutorialComplete(this.a.game.s,key)){this.a.game.revision++;this.a.game.persist();this.deferredSave=true;}}
 beforeAction(n:Node){this.currentAction=this.buttons.get(n);return {key:this.currentAction,revision:this.a.game.revision,modal:this.a.modal,root:this.a.root};}
 afterAction(before:ReturnType<TutorialUI['beforeAction']>){this.currentAction=undefined;if(before.key&&(this.a.game.revision>before.revision||this.a.modal!==before.modal||this.a.root!==before.root))this.complete(before.key);}
 popup(title:string,heading:Node){
  this.popupCandidates=[];this.popupHint=null;this.popupTarget=null;
  const table=translations[this.a.game.s.locale];this.popupTitle=Object.keys(table).find(k=>table[k]===title)||'';
  if(this.active||!this.popupTitle||/^(cheat|tutorial|entry|consent|ops\.|error|unlock)/.test(this.popupTitle))return false;
  this.a.label(heading,title,0,12,322,24,19,UI.ink);
  this.popupHint=this.a.label(heading,this.a.tr('guide.inspect'),0,-15,334,23,13,'#222222');
  return true;
 }
 register(n:Node,text:string,hint:string,style:string){
  if(!this.a.modal||this.active||!this.popupHint||!this.popupTitle||style==='disabled'||text==='×')return;
  const table=translations[this.a.game.s.locale],key=Object.keys(table).find(k=>table[k]===(hint||text))||Object.keys(table).find(k=>table[k]===text);
  if(!key||key.startsWith('locale.')||['action.close','action.back','action.cancel','action.locked','action.claimed','action.equipped'].includes(key))return;
  const id='use:'+this.popupTitle+':'+key;
  this.buttons.set(n,id);this.popupCandidates.push({node:n,key:id,caption:hint||text});
 }
 visible(n:Node):boolean {
  const box=n.getComponent(UITransform)!.getBoundingBoxToWorld();
  for(let p=n.parent;p;p=p.parent)if(p.getComponent(Mask)){const area=p.getComponent(UITransform)!.getBoundingBoxToWorld();if(box.yMin<area.yMin||box.yMax>area.yMax||box.xMin<area.xMin||box.xMax>area.xMax)return false;}
  return true;
 }
 popupTick(){
  if(!this.a.modal||!this.popupHint||!isValid(this.popupHint.node,true))return;
  const candidate=this.popupCandidates.find(c=>isValid(c.node,true)&&c.node.activeInHierarchy&&this.visible(c.node)&&!tutorialSeen(this.a.game.s,c.key));
  if(this.popupTarget===candidate?.node)return;
  if(this.popupTarget&&isValid(this.popupTarget,true)){const old=this.popupTarget.getChildByName('guide-focus');if(old){this.a.stopTweens(old);old.destroy();}}
  this.popupTarget=candidate?.node||null;
  this.popupHint.string=candidate?this.a.tr('guide.action',{action:candidate.caption}):this.a.tr('guide.inspect');
  if(candidate){const size=candidate.node.getComponent(UITransform)!.contentSize;this.focus(candidate.node,0,0,size.width+6,size.height+6,false);}
 }

 constructor(private a:GameApp){}
 get active(){return this.a.game.s.tutorial.step<TUTORIAL_DONE;}
 event(kind:string){if(tutorialAdvance(this.a.game.s,kind)){this.a.game.revision++;this.a.game.persist();this.a.draw();void this.a.operations.save().catch(e=>this.a.operations.report('tutorial.save',e));if(!this.active)this.a.toast(this.a.tr('tutorial.complete'));}}
 get firstBoss(){return !this.active&&this.a.game.s.maxStage<2&&(this.a.game.s.run.boss||this.a.game.s.run.bossFailed);}
 get signature(){return this.a.game.s.tutorial.step+':'+this.firstBoss+':'+this.a.tab+':'+this.a.folded+':'+this.followup()?.id;}
 tick(){this.refreshFocus();this.event('progress');this.popupTick();if(this.deferredSave&&!this.a.operations.busy){this.deferredSave=false;void this.a.operations.save().catch(e=>this.a.operations.report('tutorial.save',e));}if(this.shown!==this.signature&&!this.a.modal)this.a.draw();}

 skip(){const a=this.a;a.confirm(a.tr('tutorial.skipTitle'),a.tr('tutorial.skipBody'),()=>{a.game.s.tutorial.step=TUTORIAL_DONE;a.game.revision++;a.game.persist();a.draw();void a.operations.save().catch(e=>a.operations.report('tutorial.save',e));});}
 draw(){const a=this.a,step=a.game.s.tutorial.step;this.shown=this.signature;if(step>=TUTORIAL_DONE){const next=this.followup();if(next){this.guide(a.tr(next.body),'!',true);if(next.target)this.outline(...next.target);const p=a.root.children.find(n=>n.name==='tutorial-guide-root');if(p)a.button(p,'×',70,32,30,26,()=>{this.postponed.add(next.id);a.draw();},false,{style:'quiet',hint:a.tr('guide.later')});}return;}if(step<1){this.guide(a.tr('guide.begin'),'0/6',true);const p=a.root.getChildByName('tutorial-guide-root');if(p)a.button(p,a.tr('tutorial.begin'),53,32,65,26,()=>this.event('begin'),true,{hint:a.tr('tutorial.begin')});return;}
  if(step===2&&a.tab!==0){this.guide(a.tr('guide.master'),step+'/6');this.outline(-200,-452-a.heightExtra,76,56);return;}
  if(step===4&&a.tab!==1){this.guide(a.tr('tutorial.step3'),step+'/6');this.outline(-120,-452-a.heightExtra,76,56);return;}
  this.guide(a.tr('tutorial.step'+step),step+'/6');
  if(step===1)this.outline(120,85-a.heightExtra,184,150);
  if(step===2)this.outline(164,-171-a.heightExtra,138,64);
  if(step===3)this.outline(-120,-452-a.heightExtra,76,56);
  if(step===4)this.outline(164,-224-a.heightExtra,115,52);
  if(step===5||step===6)this.outline(171,(a.folded?-337:-39)-a.heightExtra,128,32);
 }
 // Keep the compact caption against the upper-right edge below the HUD.
 guide(body:string,progress:string,boss=false){
  const a=this.a,w=194,h=boss?116:106,x=240-w/2-8,y=287+a.heightExtra-a.safeTop;
  const wrap=a.nodeAt(a.root,'tutorial-guide-root',x,y,w,h),p=a.nodeAt(wrap,'ink-surface',0,0,w,h);
  a.ui.polygon(p,[[-w/2,h/2],[w/2-15,h/2],[w/2,h/2-15],[w/2,-h/2+13],[w/2-23,-h/2],[-w/2,-h/2]],'#111114',240);
  a.polygon(p,-w/2+3,0,6,h,[[-.5,-.5],[.5,-.5],[.5,.5],[-.5,.5]],'#ffe000');
  a.ui.icon(a.nodeAt(p,'guide-mark',-77,31,19,19),'symbol:next','#ffe000');
  a.label(p,progress,-40,31,49,21,14,'#ffe000',Label.HorizontalAlign.LEFT);
  a.label(p,body,3,-12,w-26,h-35,15,'#ffffff',Label.HorizontalAlign.LEFT);
  if(!boss)a.button(p,'×',70,32,30,26,()=>this.skip(),false,{style:'quiet',hint:a.tr('tutorial.skip')});
 }
 outline(x:number,y:number,w:number,h:number){
  const a=this.a,point=new Vec3(x,y+a.safeBottom,0),rootTransform=a.root.getComponent(UITransform)!;
  let target:Node|null=null,best=Infinity;
  const search=(parent:Node)=>{for(const child of parent.children){
   if(!child.activeInHierarchy||child.name.startsWith('guide-')||child.name==='tutorial-guide-root')continue;
   if(child.name==='ui-button'||/^tab-\d+$/.test(child.name)){
    const pos=rootTransform.convertToNodeSpaceAR(child.worldPosition),size=child.getComponent(UITransform)!;
    const distance=Math.hypot(pos.x-point.x,pos.y-point.y);
    if(distance<Math.min(w,h)/2&&size.width<w*1.8&&size.height<h*1.8&&distance<best){target=child;best=distance;}
   }search(child);
  }};search(a.root);
  if(target){const node=target as Node,size=node.getComponent(UITransform)!;this.focus(node,0,0,size.width,size.height,true);}
  else this.focus(a.root,point.x,point.y,w,h,true);
 }
 focus(parent:Node,x:number,y:number,w:number,h:number,arrowVisible:boolean){
  const a=this.a,selected=parent.getChildByName('selected-tab'),shape=selected||parent;
  const contour=a.ui.contours.get(shape);
  const points=contour?contour.map(p=>[p[0]+(selected?.position.x||0),p[1]+(selected?.position.y||0)]):[[-w/2,-h/2],[w/2,-h/2],[w/2,h/2],[-w/2,h/2]];
  const n=a.nodeAt(parent,'guide-focus',x,y,w,h),animated=a.game.s.extra.effects;
  if(parent!==a.root)this.focusTargets.set(parent,{guide:n,key:this.shapeKey(parent),x,y,w,h,arrow:arrowVisible});
  // The guide reuses the rendered surface vertices; no rectangular bounding-box brackets.
  const line=a.nodeAt(n,'guide-contour',0,0,w,h),g=line.addComponent(Graphics);
  g.strokeColor=a.color('#ffe000');g.lineWidth=3;g.moveTo(points[0][0],points[0][1]);points.slice(1).forEach(p=>g.lineTo(p[0],p[1]));g.close();g.stroke();
  if(animated){
   const opacity=line.addComponent(UIOpacity);tween(opacity).to(.45,{opacity:120}).to(.45,{opacity:255}).union().repeatForever().start();
   const lengths=points.map((p,i)=>Math.hypot(points[(i+1)%points.length][0]-p[0],points[(i+1)%points.length][1]-p[1]));
   const speed=lengths.reduce((sum,length)=>sum+length,0)/1.8;
   for(let i=0;i<2;i++){
    const glint=a.nodeAt(n,'guide-running-glint',points[0][0],points[0][1],9,9);
    a.ui.polygon(glint,[[0,4],[4,0],[0,-4],[-4,0]],i?'#ffe000':'#ffffff');
    let motion=tween(glint).delay(i*.9);
    for(let j=0;j<points.length;j++){const next=points[(j+1)%points.length];motion=motion.to(lengths[j]/speed,{position:new Vec3(next[0],next[1],0)});}
    motion.union().repeatForever().start();
   }
  }
  const rootY=a.root.getComponent(UITransform)!.convertToNodeSpaceAR(n.worldPosition).y;
  const above=rootY+h/2+50<a.designH/2,arrowY=above?h/2+20:-h/2-20;
  const arrow=a.nodeAt(n,'guide-moving-arrow',0,arrowY,30,30);arrow.active=arrowVisible;
  a.ui.icon(arrow,'symbol:down','#ffe000');if(!above)arrow.angle=180;
  if(animated)tween(arrow).by(.38,{position:new Vec3(0,above?10:-10,0)},{easing:'sineInOut'}).by(.38,{position:new Vec3(0,above?-10:10,0)},{easing:'sineInOut'}).union().repeatForever().start();
 }
 followup():{id:string;body:string;target?:[number,number,number,number]}|undefined {
  const a=this.a,s=a.game.s,extra=a.heightExtra;
  const offer=(id:string,body:string,target?:[number,number,number,number])=>!tutorialSeen(s,id)&&!this.postponed.has(id)?{id,body,target}:undefined;
  if(this.firstBoss&&!tutorialSeen(s,'first:boss')&&!this.postponed.has('first:boss'))return offer('first:boss','guide.boss',s.run.bossFailed?[180,442+extra-a.safeTop-a.safeBottom,111,44]:[0,95-extra,276,236]);
  if(!s.claims.includes('daily.0')){const next=offer('first:daily','guide.daily',[-164,451+extra-a.safeTop-a.safeBottom,38,38]);if(next)return next;}
  const tab=[5,3,2,4].find(tab=>tabUnlocked(s,tab)&&!tutorialSeen(s,'tab:'+tab)&&!this.postponed.has('tab:'+tab));
  if(tab!==undefined&&tab!==a.tab)return offer('tab:'+tab,'guide.tab'+tab,[-200+80*tab,-452-extra,76,56]);
  const feature=[15,50,60,100,1000,100000,180000].find(stage=>s.maxStage>=stage&&!tutorialSeen(s,'feature:'+stage)&&!this.postponed.has('feature:'+stage));
  if(feature!==undefined)return offer('feature:'+feature,'guide.feature'+feature,[-164,451+extra-a.safeTop-a.safeBottom,38,38]);
  if(a.tab===0&&SPELLS.some(sp=>s.run.master>=sp.unlock)&&!tutorialSeen(s,'first:spell')&&!this.postponed.has('first:spell')){
   if(!a.folded)return offer('first:spell','guide.spell',[171,-39-extra,128,32]);
   const next=s.spellSlots.find(id=>s.run.master<SPELLS[id].unlock),shown=s.spellSlots.filter(id=>s.run.master>=SPELLS[id].unlock||id===next),index=shown.findIndex(id=>s.run.master>=SPELLS[id].unlock);
   if(index>=0)return offer('first:spell','guide.spellCast',[(index-(shown.length-1)/2)*80,-400-extra,73,60]);
  }
  if(a.folded)return;
  if(a.tab===5&&!s.claims.includes('daily.0'))return offer('first:free','guide.free');
  if(a.tab===3){if(!s.pets.some(v=>v>0))return offer('first:egg','guide.egg',[143,-156-extra,164,36]);return offer('first:pet','guide.pet');}
  if(a.tab===2)return offer('first:gear','guide.gear');
  if(a.tab===0&&s.run.stage>=60&&!s.prestiges)return offer('first:prestige','guide.prestige',[164,-270-extra,135,60]);
  if(a.tab===4){if(!s.prestiges)return offer('first:relics','guide.relics');if(!s.artifacts.some(v=>v>0))return offer('first:discover','guide.discover',[149,-156-extra,154,36]);return offer('first:artifact','guide.artifact');}
 }
 locked(tab:number){this.a.info(this.a.tr('unlock.title'),this.a.tr('unlock.stage',{name:this.a.tr(['nav.master','nav.heroes','nav.equipment','nav.pets','nav.artifacts','nav.shop'][tab]),stage:TAB_STAGES[tab]}));}
 tab(tab:number){if(!tabUnlocked(this.a.game.s,tab)){this.locked(tab);return;}this.complete('tab:'+tab);this.a.tab=tab;this.a.filter=-1;this.a.folded=false;this.event(tab===1?'heroes':'tab');this.a.draw();}
 unlock(stage:number){this.a.draw();}
}
