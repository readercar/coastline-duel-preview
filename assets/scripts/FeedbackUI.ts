import {Node,Vec3,tween,UIOpacity,isValid,BlockInputEvents,Graphics} from 'cc';
import type {GameApp} from './GameApp';
import {feedbackSnapshot,feedbackDiff,FeedbackSnapshot,FeedbackEntry} from './core/Feedback';
import {UI} from './UITheme';
import {PETS,ARTIFACTS,CARDS} from './core/Config';
import {display} from './core/Amount';
export class FeedbackUI {
 private queue:FeedbackEntry[][]=[];private knownItems:Set<number>|null=null;private overlay:Node|null=null;private banner:Node|null=null;
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
 tick(){if(this.a.remoteBusy||this.asyncPending||this.a.operations.busy)return;const equipment=this.a.game.s.equipment;if(!this.knownItems)this.knownItems=new Set(equipment.map(e=>e.id));else{const found=equipment.filter(e=>!this.knownItems!.has(e.id));this.knownItems=new Set(equipment.map(e=>e.id));if(found.length)this.queue.push(found.map(e=>({key:'equipment.item',icon:'face:'+['blade','helmet','breastplate','aura','compass'][e.slot],value:1,args:{slot:e.slot,rarity:e.rarity,level:e.level}})));}if(this.overlay&&!isValid(this.overlay,true))this.overlay=null;if(!this.overlay&&this.queue.length&&!this.a.remoteBusy&&!this.a.operations.busy)this.showNext();}
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
 private growth(diff:ReturnType<typeof feedbackDiff>){const a=this.a;if(this.banner&&isValid(this.banner,true))this.banner.destroy();
  const n=a.nodeAt(a.root,'growth-feedback',0,a.modal?180:20,370,104);this.banner=n;a.ui.surface(n,UI.bg,'slant');
  const first=diff.growth[0],title=first?a.tr('feedback.level',{name:this.name(first),before:first.args!.before,after:first.args!.after}):a.tr('feedback.power');
  a.label(n,title,0,23,340,40,20,UI.gold);
  const stats=diff.tap||diff.dps;a.label(n,stats?a.tr(diff.tap?'feedback.tap':'feedback.dps',{before:a.format(stats[0]),after:a.format(stats[1])}):a.tr('feedback.improved'),0,-20,340,35,16,UI.text);
  if(a.game.s.extra.effects){this.particles(n,0,0);n.setScale(.88,.88,1);tween(n).to(.18,{scale:new Vec3(1,1,1)},{easing:'backOut'}).start();}
  if(a.game.s.extra.effects){const opacity=n.addComponent(UIOpacity);tween(opacity).delay(1.5).to(.25,{opacity:0}).call(()=>{if(isValid(n,true))n.destroy();}).start();}else a.scheduleOnce(()=>{if(isValid(n,true))n.destroy();},1.75);this.chime();
 }
 private particles(parent:Node,x:number,y:number){const a=this.a;for(let i=0;i<22;i++){const p=a.nodeAt(parent,'reward-sparkle',x,y,12,12),g=p.addComponent(Graphics);g.fillColor=a.color(i%3===0?UI.text:UI.gold);g.rect(-1,-6,2,12);g.rect(-6,-1,12,2);g.fill();const angle=i*Math.PI*2/22,r=50+i%5*19,opacity=p.addComponent(UIOpacity);p.setScale(.2,.2,1);tween(p).delay(i%4*.025).to(.45,{position:new Vec3(x+Math.cos(angle)*r,y+Math.sin(angle)*r+36,0),scale:new Vec3(1,1,1)}).to(.4,{position:new Vec3(x+Math.cos(angle)*r,y+Math.sin(angle)*r+70,0),scale:new Vec3(.15,.15,1)}).call(()=>{if(isValid(p,true))p.destroy();}).start();tween(opacity).delay(.4).to(.45,{opacity:0}).start();}}
 private chime(){[660,880,1100].forEach((hz,i)=>this.a.scheduleOnce(()=>this.a.sound(hz),i*.09));}
}
