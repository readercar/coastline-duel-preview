import type {Save} from './Game';

export const CONSENT_KEY='tapwar-consent-v2';
export const CONSENT_VERSION='2026-10-04';
export type ConsentKind='terms'|'privacy';
export interface ConsentReceipt {version:string;acceptedAt:number;terms:true;privacy:true;}
export function parseConsent(raw:string|null):ConsentReceipt|null {
 try {const r=JSON.parse(raw||'null');return r?.version===CONSENT_VERSION&&r.terms===true&&r.privacy===true&&Number.isSafeInteger(r.acceptedAt)&&r.acceptedAt>0?r:null;} catch {return null;}
}
export function consentReceipt(now=Date.now()):ConsentReceipt {return {version:CONSENT_VERSION,acceptedAt:now,terms:true,privacy:true};}
export interface TutorialState {version:1;step:number;tapBaseline?:number;masterBaseline?:number;heroBaseline?:number;completed?:string[];}
export const TUTORIAL_DONE=7;
export function migrateTutorial(s:Save):void {
 if(!s.tutorial)s.tutorial={version:1,step:s.totalTaps>0||s.totalKills>0||s.maxStage>1?TUTORIAL_DONE:0};
}
export function tutorialAdvance(s:Save,event:string):boolean {
 const step=s.tutorial.step;
 if(step===0&&event==='begin'||step===1&&s.totalTaps>=(s.tutorial.tapBaseline||0)+3||step===2&&s.run.master>(s.tutorial.masterBaseline||1)||step===3&&event==='heroes'||step===4&&s.run.heroes[0]>(s.tutorial.heroBaseline||0)||step===5&&event==='fold'||step===6&&event==='unfold')s.tutorial.step++;
 return step!==s.tutorial.step;
}
export const TAB_STAGES=[1,1,15,8,60,3] as const;
export function tabUnlocked(s:Save,tab:number):boolean {return tab>=0&&tab<TAB_STAGES.length&&s.maxStage>=TAB_STAGES[tab];}
export function tutorialProgress(s:Save):number {return Math.min(TUTORIAL_DONE,Math.max(0,s.tutorial.step));}
export function replayTutorial(s:Save):void {s.tutorial={version:1,step:0,tapBaseline:s.totalTaps,masterBaseline:s.run.master,heroBaseline:s.run.heroes[0],completed:[]};}
const FEATURE_STAGES:Record<string,number>={
 'menu.raid':100,'menu.cards':100,'menu.clan':100,'menu.tournament':60,'menu.event':15,'menu.meta':1000,
 'money.store':3,'money.adPoints':3,'balance.title':15,'extra.build':60,'extra.talents':50,'extra.perks':15,
 'extra.petPuzzle':8,'extra.petMilestones':8,'extra.dustShop':100,'extra.crystal':100,'extra.souls':100000,
 'extra.gems':1000,'extra.monuments':180000,'extra.collectibles':15,'extra.cosmetics':15,
 'complete.serverCards':100,'extra.guildTools':100,'extra.eventModes':15,'extra.limited':15
};
export function featureUnlocked(s:Save,key:string,now=Date.now()):boolean {return key==='extra.souls'&&now-s.created>=30*86400000||s.maxStage>=(FEATURE_STAGES[key]||1);}
export function designHeight(width:number,height:number):number {return width>=height?960:Math.round(Math.max(854,Math.min(1120,480*height/Math.max(1,width))));}

/** Stable first-use receipts travel with the game save, independently of daily rewards. */
export function tutorialSeen(s:Save,key:string):boolean{return !!s.tutorial.completed?.includes(key);}
export function tutorialComplete(s:Save,key:string):boolean {
 if(!/^[a-zA-Z0-9_.:-]{1,120}$/.test(key)||tutorialSeen(s,key))return false;
 s.tutorial.completed=(s.tutorial.completed||[]).concat(key).slice(-1024);return true;
}
export const FIRST_USE_TABS=[5,3,2,4] as const;
export function nextTutorialTab(s:Save):number|undefined{return FIRST_USE_TABS.find(tab=>tabUnlocked(s,tab)&&!tutorialSeen(s,'tab:'+tab));}
