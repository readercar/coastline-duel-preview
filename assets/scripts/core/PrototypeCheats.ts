import {Game,Save} from './Game';
import {amount,add,ZERO} from './Amount';
import {HEROES} from './Config';
import {replayTutorial,TUTORIAL_DONE} from './EntryPolicy';
export function freshPrototype(locale:Save['locale'],now=Date.now()):Save {const g=new Game(undefined,()=>now);g.s.locale=locale;return g.s;}
export function prototypeCheat(current:Save,action:'funds'|'squad'|'stage'|'tutorial',stage=1,now=Date.now()):Save {
 const g=new Game(undefined,()=>now);g.s=JSON.parse(JSON.stringify(current));
 if(action==='funds')g.s.run.gold=add(g.s.run.gold,amount(1000000));
 if(action==='squad'){for(let i=0;i<8;i++)g.s.run.heroes[i]=Math.max(10,g.s.run.heroes[i]);g.s.maxStage=Math.max(g.s.maxStage,HEROES[7].unlock);}
 if(action==='stage'){
  if(![1,30,200,400].includes(stage))throw Error('error.invalid');
  const r=g.s.run;r.stage=stage;r.boss=false;r.kills=0;r.bossLeft=30;r.bossFailed=false;r.hp=g.maxHP(stage,false);g.s.maxStage=Math.max(g.s.maxStage,stage);g.s.tutorial.step=TUTORIAL_DONE;
 }
 if(action==='tutorial')replayTutorial(g.s);
 g.s.lastSeen=now;g.s.offline=ZERO;g.validate(g.s);return g.s;
}
