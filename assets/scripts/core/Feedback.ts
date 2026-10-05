import type {Game} from './Game';
import {sub,ZERO} from './Amount';
export interface FeedbackEntry { key:string; icon:string; value:number; log?:boolean; args?:Record<string,string|number>; }
export interface FeedbackSnapshot { rewards:Record<string,FeedbackEntry>; levels:Record<string,FeedbackEntry>; tap:number; dps:number; }
export function feedbackSnapshot(g:Game):FeedbackSnapshot {
 const s=g.s,rewards:Record<string,FeedbackEntry>={},levels:Record<string,FeedbackEntry>={};
 const currency:Record<string,string>={gems:'face:gems',shards:'face:compass',dust:'sparkle',sp:'scroll',souls:'heart',geodes:'face:aura',eventTokens:'flag'};
 for(const [key,icon] of Object.entries(currency))rewards[key]={key:'feedback.'+key,icon:icon==='sparkle'?'face:laurel':icon,value:(s as any)[key]};
 rewards.gold={key:'feedback.gold',icon:'symbol:coin',value:s.run.gold,log:true};
 rewards.relics={key:'feedback.relics',icon:'heart',value:s.relics,log:true};
 rewards.mementos={key:'feedback.mementos',icon:'trophy',value:s.mementos,log:true};
 const arrays=['pets','artifacts','cards','fragments','titans','stones','perks','weapons','scrolls'];
 for(const key of arrays)((s as any)[key] as number[]).forEach((value,i)=>{rewards[key+':'+i]={key:'feedback.'+key,icon:{pets:'fox',artifacts:'heart',cards:'cards',fragments:'cards',titans:'adventurer',stones:'face:aura',perks:'lightning',weapons:'sword',scrolls:'scroll'}[key]!,value,args:{index:i+1}};});
 for(const e of s.equipment)rewards['item:'+e.id]={key:'equipment.item',icon:'face:'+['blade','helmet','breastplate','aura','compass'][e.slot],value:1,args:{slot:e.slot,rarity:e.rarity,level:e.level}};
 levels.master={key:'master.title',icon:'face:guardian',value:s.run.master};
 const levelArray=(name:string,values:number[],key:string,icon:string)=>values.forEach((value,i)=>levels[name+':'+i]={key:key==='hero'?'hero.'+i:key,icon,value,args:{index:i+1}});
 levelArray('heroes',s.run.heroes,'hero','adventurer');
 for(const key of ['skills','artifacts','cards','pets','research','stones','monuments'])levelArray(key,(s as any)[key],'feedback.'+key,{skills:'scroll',artifacts:'heart',cards:'cards',pets:'fox',research:'scroll',stones:'face:aura',monuments:'trophy'}[key]!);
 for(const key of ['ascensions','heroSkills','titanLevels','mysticResearch','monumentEnchanted'])levelArray(key,(s.extra as any)[key],'feedback.'+key,'symbol:up');
 levelArray('spells',s.run.spellLevels,'spell.title','lightning');
 return {rewards,levels,tap:g.tapDamage(),dps:g.dps()};
}
export function feedbackDiff(before:FeedbackSnapshot,after:FeedbackSnapshot,includeGold=true){
 const rewards:FeedbackEntry[]=[],growth:FeedbackEntry[]=[];
 for(const [id,e] of Object.entries(after.rewards)){if(id==='gold'&&!includeGold)continue;const previous=before.rewards[id]?.value??(e.log?ZERO:0);if(e.value<=previous+1e-9)continue;const delta=e.log?sub(e.value,previous):e.value-previous;rewards.push({...e,value:delta});}
 for(const [id,e] of Object.entries(after.levels)){const old=before.levels[id]?.value??0;if(e.value>old)growth.push({...e,args:{...e.args,before:old,after:e.value},value:e.value-old});}
 return {rewards,growth,tap:after.tap>before.tap+1e-9?[before.tap,after.tap]:null,dps:after.dps>before.dps+1e-9?[before.dps,after.dps]:null};
}
