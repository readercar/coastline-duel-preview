import {Node,Vec3,tween,UIOpacity,isValid,BlockInputEvents,Graphics} from 'cc';
import type {GameApp} from './GameApp';
import {feedbackSnapshot,feedbackDiff,FeedbackSnapshot,FeedbackEntry} from './core/Feedback';
import {UI} from './UITheme';
import {GrowthGate,mercenaryArt,attackSeconds} from './core/Mercenaries';
import {PETS,ARTIFACTS,CARDS,HEROES} from './core/Config';
import {display} from './core/Amount';
export class FeedbackUI {
 private queue:FeedbackEntry[][]=[];private knownItems:Set<number>|null=null;private overlay:Node|null=null;private banner:Node|null=null;
 private growthGate=new GrowthGate();
 asyncPending=0;
 constructor(private a:GameApp){}
 snapshot(){if(!this.knownItems)this.knownItems=new Set(this.a.game.s.equipment.map(e=>e.id));return feedbackSnapshot(this.a.game);}
 get showing(){return !!this.overlay&&isValid(this.overlay,true);}
 notice(key:string,args:Record<string,string|number>){this.queue.push([{key,args,icon:"trophy",value:1}]);}
 finish(before:FeedbackSnapshot,includeGold=true){
  const diff=feedbackDiff(before,this.snapshot(),includeGold);this.knownItems=new Set(this.a.game.s.equipment.map(e=>e.id));
  // Levels on owned objects are growth, while newly acquired objects are rewards.
  const rewards=diff.rewards.filter(e=>!['feedback.weapons','feedback.scrolls'].includes(e.key)).filter(e=>!['feedback.artifacts','feedback.cards','feedback.pets','feedback.stones'].includes(e.key)||Object.values(before.rewards).some(old=>old.key===e.key&&old.args?.index===e.args?.index&&old.value===0));
  if(diff.growth.length||diff.tap||diff.dps||rewards.length){const toast=this.a.root.children.find(n=>n===this.a.toastNode);if(toast){toast.destroy();this.a.toastNode=null;}}
  if(diff.growth.length||diff.tap||diff.dps)this.growth(diff);
  if(rewards.length){this.queue.push(rewards);this.a.scheduleOnce(()=>this.showNext(),0);}
 }
 tick(){if(this.a.remoteBusy||this.asyncPending||this.a.operations.busy)return;const equipment=this.a.game.s.equipment;if(!this.knownItems)this.knownItems=new Set(equipment.map(e=>e.id));else{const found=equipment.filter(e=>!this.knownItems!.has(e.id));this.knownItems=new Set(equipment.map(e=>e.id));if(found.length)this.queue.push(found.map(e=>({key:'equipment.item',icon:'face:'+['blade','helmet','breastplate','aura','compass'][e.slot],value:1,args:{slot:e.slot,rarity:e.rarity,level:e.level}})));}if(this.overlay&&!isValid(this.overlay,true))this.overlay=null;if(!this.overlay&&this.queue.length&&!this.a.remoteBusy&&!this.a.operations.busy)this.showNext();this.unlockMercenary();}
 private name(e:FeedbackEntry){const args={...e.args};const index=Number(args.index)-1;const catalog=e.key==='feedback.pets'?PETS:e.key==='feedback.artifacts'?ARTIFACTS:e.key==='feedback.cards'||e.key==='feedback.fragments'?CARDS:null;if(catalog&&catalog[index])return this.a.tr(catalog[index].name); if(e.key==='equipment.item'){args.slot=this.a.tr('slot.'+args.slot);args.rarity=this.a.tr('rarity.'+args.rarity);}return this.a.tr(e.key,args);}
 private showNext(){const a=this.a;if(this.overlay&&isValid(this.overlay,true)||!this.queue.length||a.liveOps.blocked)return;
  const entries=this.queue.shift()!,layer=a.nodeAt(a.root,'reward-overlay',0,0,480,a.designH);this.overlay=layer;layer.addComponent(BlockInputEvents);
  a.rect(layer,0,0,480,a.designH,'#000000',undefined,128);
  const h=Math.min(620,Math.max(320,220+entries.length*77),a.designH-100),panel=a.nodeAt(layer,'modal-panel',0,0,414,h);a.ui.surface(panel,UI.bg,'panel');
  a.label(panel,a.tr('feedback.received'),0,h/2-47,370,55,30,UI.gold);
  a.scroll(panel,0,6,382,h-190,entries.map(e=>({title:this.name(e),metrics:[{icon:e.icon,value:'+'+(e.log?a.format(e.value):display(e.value))}],icon:1,art:e.icon,tint:UI.gold})));
  a.button(panel,a.tr('action.confirm'),0,-h/2+49,320,50,()=>{layer.removeFromParent();layer.destroy();this.overlay=null;this.showNext();},true,{tone:UI.gold});
  if(a.game.s.extra.effects){panel.setScale(.7,.7,1);tween(panel).to(.22,{scale:new Vec3(1,1,1)},{easing:'backOut'}).start();this.particles(panel,0,h/2-80);}
  this.chime();
 }
 private comic(parent:Node,x:number,y:number,w:number,h:number){
  const n=this.a.nodeAt(parent,'comic-speech',x,y,w,h),points=[[-w/2+10,h/2-6],[-w/2+35,h/2+1],[-w/2+48,h/2-5],[w/2-12,h/2],[w/2-2,h/2-15],[w/2,h/2-30],[w/2-7,-h/2+8],[20,-h/2],[0,-h/2-16],[-4,-h/2+2],[-w/2+8,-h/2+7],[-w/2,-8]];
  this.a.ui.polygon(n,points,UI.paper);const g=n.addComponent(Graphics);g.lineWidth=2;g.strokeColor=this.a.color(UI.ink);g.moveTo(points[0][0],points[0][1]);points.slice(1).forEach(p=>g.lineTo(p[0],p[1]));g.close();g.stroke();return n;
 }
 private unlockMercenary(){const a=this.a;if(!a.entry.playing||this.showing||a.modal||a.liveOps.blocked||!a.operations.ready||a.operations.busy||a.operations.conflict)return;
  const h=HEROES.find(h=>a.game.s.maxStage>=h.unlock&&!a.game.s.extra.mercenarySeen.includes(h.id));
  if(h&&(a.game.s.tutorial.step>=7||(h.id===0&&a.game.s.tutorial.step>=3)))this.showMercenary(h.id);
 }
 showMercenary(id:number,preview=false){const a=this.a;if(this.showing)return;
  const layer=a.nodeAt(a.root,'mercenary-cutin',0,0,480,a.designH);this.overlay=layer;layer.addComponent(BlockInputEvents);a.rect(layer,0,0,480,a.designH,'#000000',undefined,128);
  const h=Math.min(640,a.designH-90),panel=a.nodeAt(layer,'mercenary-panel',0,0,420,h);a.ui.surface(panel,UI.bg,'panel');
  a.ui.polygon(a.nodeAt(panel,'cutin-backdrop',0,0,420,h),[[-204,h/2-72],[183,h/2-48],[204,-h/2+120],[-178,-h/2+80]],UI.raised);
  a.label(panel,a.tr(preview?'merc.gallery':'merc.unlocked'),0,h/2-30,380,40,26,UI.gold);
  a.label(panel,a.tr('merc.ready',{name:a.tr('hero.'+id)}),0,h/2-67,380,34,21,UI.text);
  a.ui.paint(a.nodeAt(panel,'mercenary-illustration',0,30,320,h-236),'cutin/'+mercenaryArt(id));
  const bubble=this.comic(panel,0,-h/2+139,366,68);a.label(bubble,a.tr('merc.intro.'+id),0,1,330,62,22,UI.ink);
  a.label(panel,a.tr('merc.cadence',{weapon:a.tr('merc.weapon.'+id),seconds:attackSeconds(id)}),0,-h/2+80,380,36,15,UI.muted);
  a.button(panel,a.tr('action.confirm'),0,-h/2+35,290,44,()=>{if(!preview&&!a.game.s.extra.mercenarySeen.includes(id)){a.game.s.extra.mercenarySeen.push(id);a.game.revision++;a.game.persist();void a.operations.save().catch(e=>a.operations.report('mercenary.seen',e));}layer.removeFromParent();layer.destroy();this.overlay=null;},true,{tone:UI.gold});
  if(a.game.s.extra.effects){panel.setScale(.72,.72,1);tween(panel).to(.23,{scale:new Vec3(1,1,1)},{easing:'backOut'}).start();this.particles(panel,0,30);}this.chime();
 }
 private growth(diff:ReturnType<typeof feedbackDiff>){const a=this.a;
  // Keep the current two-second bubble unchanged under repeated upgrades.
  if(!this.growthGate.request(Date.now()))return;
  if(this.banner&&isValid(this.banner,true))this.banner.destroy();
  const n=a.nodeAt(a.root,'growth-feedback',-122,a.designH/2-195-a.safeTop,216,124);this.banner=n;a.ui.surface(a.nodeAt(n,'growth-header',0,31,216,72),UI.bg,'slant');
  const first=diff.growth[0],soldier=first?.key.startsWith('hero.')?Number(first.key.slice(5)):-1;
  a.ui.surface(a.nodeAt(n,'portrait-plate',-73,32,60,62),UI.gold,'cut');
  a.ui.icon(a.nodeAt(n,'growth-portrait',-73,32,56,58),soldier>=0?'face:merc-'+mercenaryArt(soldier):'face:guardian');
  a.label(n,first?a.tr('merc.level',{before:first.args!.before,after:first.args!.after}):a.tr('feedback.power'),29,45,150,30,17,UI.gold);
  const stats=diff.tap||diff.dps;a.label(n,stats?a.tr(diff.tap?'feedback.tap':'feedback.dps',{before:a.format(stats[0]),after:a.format(stats[1])}):a.tr('feedback.improved'),29,16,150,28,11,UI.text);
  const bubble=this.comic(n,0,-33,210,52);a.label(bubble,a.tr(soldier>=0?'merc.growth.'+soldier:'merc.captain'),0,0,185,46,16,UI.ink);
  if(a.game.s.extra.effects){this.particles(n,-73,32);n.setScale(.88,.88,1);tween(n).to(.18,{scale:new Vec3(1,1,1)},{easing:'backOut'}).start();}
  a.scheduleOnce(()=>{if(isValid(n,true))n.destroy();},2);this.chime();
 }
 private particles(parent:Node,x:number,y:number){const a=this.a;for(let i=0;i<22;i++){const p=a.nodeAt(parent,'reward-sparkle',x,y,12,12),g=p.addComponent(Graphics);g.fillColor=a.color(i%3===0?UI.text:UI.gold);g.rect(-1,-6,2,12);g.rect(-6,-1,12,2);g.fill();const angle=i*Math.PI*2/22,r=50+i%5*19,opacity=p.addComponent(UIOpacity);p.setScale(.2,.2,1);tween(p).delay(i%4*.025).to(.45,{position:new Vec3(x+Math.cos(angle)*r,y+Math.sin(angle)*r+36,0),scale:new Vec3(1,1,1)}).to(.4,{position:new Vec3(x+Math.cos(angle)*r,y+Math.sin(angle)*r+70,0),scale:new Vec3(.15,.15,1)}).call(()=>{if(isValid(p,true))p.destroy();}).start();tween(opacity).delay(.4).to(.45,{opacity:0}).start();}}
 private chime(){[660,880,1100].forEach((hz,i)=>this.a.scheduleOnce(()=>this.a.sound(hz),i*.09));}
}
