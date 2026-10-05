import {sys} from 'cc';
import type {GameApp} from './GameApp';
import {Save} from './core/Game';
import {freshPrototype,prototypeCheat} from './core/PrototypeCheats';
import {FeedbackUI} from './FeedbackUI';
import {TutorialUI} from './TutorialUI';
import {UI} from './UITheme';
/** Prototype-only controls. Writes use the normal account/version queue. */
export class CheatUI {
 constructor(private a:GameApp){}
 private get backupKey(){return 'outrun-military-reset-backup:'+this.a.operations.identity;}
 private backup():Save|null {try{const raw=sys.localStorage.getItem(this.backupKey);if(!raw)return null;const state=JSON.parse(raw);this.a.game.validate(state);return state;}catch{return null;}}
 open(){const a=this.a,p=a.open(a.tr('cheat.title'),650);
  a.label(p,a.tr('cheat.description'),0,211,365,82,16,UI.muted);
  [1,30,200,400].forEach((stage,i)=>a.button(p,a.tr('cheat.stage',{stage}),-144+i*96,125,90,50,()=>void this.change(prototypeCheat(a.game.s,'stage',stage)),false,{fontSize:15}));
  a.button(p,a.tr('cheat.funds'),0,54,366,48,()=>void this.change(prototypeCheat(a.game.s,'funds')),false,{icon:'symbol:coin'});
  a.button(p,a.tr('cheat.squad'),0,-8,366,48,()=>void this.change(prototypeCheat(a.game.s,'squad')),false,{icon:'adventurer'});
  a.button(p,a.tr('tutorial.replay'),0,-70,366,48,()=>void this.change(prototypeCheat(a.game.s,'tutorial')),false,{icon:'symbol:play'});
  a.button(p,a.tr('cheat.reset'),0,-145,366,54,()=>a.confirm(a.tr('cheat.reset'),a.tr('cheat.resetBody'),()=>void this.reset()),true,{style:'danger'});
  a.button(p,a.tr('cheat.restore'),0,-214,366,45,()=>a.confirm(a.tr('cheat.restore'),a.tr('cheat.restoreBody'),()=>{const state=this.backup();if(state)void this.change(state);}),false,{style:'quiet',unavailable:()=>this.backup()?null:a.tr('cheat.noBackup')});
  a.label(p,a.tr('cheat.scope'),0,-277,365,42,13,UI.muted);
 }
 async reset(){const a=this.a;if(a.remoteBusy||a.operations.busy)return;
  try{sys.localStorage.setItem(this.backupKey,JSON.stringify(a.game.s));}catch{a.toast(a.tr('error.storage'));return;}
  await this.change(freshPrototype(a.game.s.locale,a.game.now()));
 }
 private async change(state:Save){const a=this.a;if(a.remoteBusy||a.operations.busy)return;a.remoteBusy=true;
  try{
   await a.operations.replaceProgress(state);
   // Drop old reward queues, deferred tutorial saves and first-use display state.
   a.feedback=new FeedbackUI(a);a.tutorial=new TutorialUI(a);a.enemyTransition=0;a.tab=0;a.mode=1;a.folded=false;a.filter=-1;a.draw();
  }catch(error){const key=(error as Error).message;a.toast(a.tr(/^(error|online)\./.test(key)?key:'online.serverError'));}
  finally{a.remoteBusy=false;}
 }
}
