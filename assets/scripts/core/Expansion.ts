import {mailExpiry,MAIL_LIFETIME} from './LiveOps';
import { gemstoneRarity } from './Balance';
import type { Game, Raid } from './Game';
import { CommerceState, newCommerce } from './Monetization';
import { ZERO, amount, add, sub, mul } from './Amount';
export interface Mail { id:string; title:string; created?:number; body?:string; expires:number; gems:number; shards:number; claimed:boolean; }
export interface ExpansionState {
  commerce:CommerceState;
  rewardNotices:{kind:string;value:number;count:number}[];
  unseenEquipment:number[]; unlockNotices:number[]; unlocked:number[];
  soloRaid:Raid|null; soloCleared:number[]; soloRewardDay:number; deckPresets:number[][]; lastEquipmentStage:number;
  perkSlots:number[]; extraPerks:number[]; ascensions:number[]; heroSkills:number[];
  petBoard:number[]; petMatched:number[]; petFace:number[]; petEnergy:number; petMilestones:number[];
  monumentInvested:number[]; monumentEnchanted:number[]; season:number; seasonBest:number;
  crystal:number[]; summonCount:number; titanLevels:number[]; banner:number;
  geodesOpened:number; mysticResearch:number[]; gemMilestones:string[];
  mails:Mail[]; cosmetics:number[]; scientific:boolean; effects:boolean; notifications:boolean[];
  dailyFairies:number; dailyEquipment:number; dailyEggs:number; day:number;
  eventEarned:number; eventSeason:number; eventEndClaims:number[]; recipes:number[];
  towerFloor:number; towerKeys:number; dropHistory:number[]; collectionClaims:string[];
}
export const seasonAt=(time:number)=>Math.floor(time/(28*86400000));
export function newExpansion(now:number):ExpansionState {
 return {commerce:newCommerce(),rewardNotices:[],unseenEquipment:[],unlockNotices:[],unlocked:[],soloRaid:null,soloCleared:[],soloRewardDay:-1,deckPresets:[[0,1,2],[3,4,5],[6,7,8]],lastEquipmentStage:0,perkSlots:[0,1,2,3,4,5],extraPerks:[2,2,2,2],ascensions:Array(24).fill(0),heroSkills:Array(24).fill(0),
 petBoard:[0,3,5,1,7,2,6,4,3,6,1,7,4,0,2,5],petMatched:[],petFace:[],petEnergy:16,petMilestones:[],
 monumentInvested:Array(12).fill(ZERO),monumentEnchanted:Array(12).fill(0),season:seasonAt(now),seasonBest:0,
 crystal:[-1,-1,-1],summonCount:0,titanLevels:Array(120).fill(0),banner:0,geodesOpened:0,mysticResearch:Array(12).fill(0),gemMilestones:[],
 mails:[{id:'welcome',title:'extra.mail.welcome',created:now,expires:now+MAIL_LIFETIME,gems:25,shards:5,claimed:false}],cosmetics:[0,0,0],scientific:false,effects:true,notifications:Array(6).fill(false),
 dailyFairies:0,dailyEquipment:0,dailyEggs:0,day:Math.floor(now/86400000),eventEarned:0,eventSeason:seasonAt(now),eventEndClaims:[],recipes:[],towerFloor:1,towerKeys:5,dropHistory:[],collectionClaims:[]};
}
export class Expansion {
 constructor(public g:Game){}
 get x():ExpansionState{return this.g.s.extra;}
 tx(key:string,action:()=>void):boolean{return this.g.transaction(key,action);}
 sync():void {
  const g=this.g,x=this.x,now=g.now(),day=Math.floor(now/86400000),season=seasonAt(now);
  if(day>x.day){x.day=day;x.soloCleared=[];x.dailyFairies=x.dailyEquipment=x.dailyEggs=0;x.petEnergy=16;x.towerKeys=5;x.petMatched=[];x.petFace=[];x.collectionClaims=[];}
  x.mails=x.mails.filter(m=>mailExpiry(m)>now);
  x.eventEarned=Math.max(x.eventEarned,g.s.eventTokens);
  x.seasonBest=Math.max(x.seasonBest,g.s.run.stage);
  if(season>x.season){const old=x.season;const reward=Math.floor(x.seasonBest/1000);x.mails.push({id:`season-${old}`,title:'extra.mail.season',created:now,expires:now+MAIL_LIFETIME,gems:reward,shards:Math.min(100,reward),claimed:false});x.season=season;x.seasonBest=0;g.s.monuments.fill(0);g.s.mementos=ZERO;x.monumentInvested.fill(ZERO);x.monumentEnchanted.fill(0);}
  if(season>x.eventSeason){const old=x.eventSeason,unclaimed=Array.from({length:10},(_,i)=>i).filter(i=>x.eventEarned>=(i+1)*100&&!g.s.claims.includes(`event.${i}`)).length;x.mails.push({id:`event-${old}`,title:'extra.mail.event',created:now,expires:now+MAIL_LIFETIME,gems:Math.floor(g.s.eventTokens/100)+15*unclaimed,shards:5*unclaimed,claimed:false});x.eventSeason=season;x.eventEarned=0;g.s.eventTokens=0;g.s.board.fill(0);g.s.claims=g.s.claims.filter(k=>!k.startsWith('event.'));}
 }
 discoverMonument(key:string):boolean{return this.tx(key,()=>{this.g.require(this.g.s.maxStage>=180000,'error.locked');const candidates=this.g.s.monuments.map((level,i)=>level? -1:i).filter(i=>i>=0);this.g.require(candidates.length>0,'error.full');const cost=amount(Math.pow(2,12-candidates.length));this.g.require(this.g.s.mementos>=cost);const i=candidates[Math.floor(this.g.random()*candidates.length)];this.g.s.mementos=sub(this.g.s.mementos,cost);this.g.s.monuments[i]=1;this.x.monumentInvested[i]=cost;});}
 saveDeck(slot:number,key:string):boolean{return this.tx(key,()=>{this.g.require(Number.isInteger(slot)&&slot>=0&&slot<3,'error.invalid');this.x.deckPresets[slot]=this.g.s.deck.slice();});}
 loadDeck(slot:number,key:string):boolean{return this.tx(key,()=>{this.g.require(!this.g.raid||this.g.raid.claimed,'error.protected');this.g.require(Number.isInteger(slot)&&slot>=0&&slot<3,'error.invalid');this.g.s.deck=this.x.deckPresets[slot].slice();});}
 dailyPortal(key:string):boolean{return this.tx(key,()=>{this.g.require(this.x.soloRewardDay!==this.x.day,'error.claimed');this.g.require(this.x.soloCleared.length>=3,'error.locked');this.x.soloRewardDay=this.x.day;this.g.s.dust+=50;this.fortune(10);});}
 perkCount(id:number):number{return id<6?this.g.s.perks[id]:this.x.extraPerks[id-6];}
 swapPerk(slot:number,id:number,key:string):boolean{return this.tx(key,()=>{this.g.require(slot>=0&&slot<6&&id>=0&&id<10&&!this.x.perkSlots.includes(id),'error.invalid');this.g.s.perkUntil[slot]=0;this.x.perkSlots[slot]=id;});}
 usePerk(slot:number,key:string):boolean{return this.tx(key,()=>{const id=this.x.perkSlots[slot];this.g.require(this.perkCount(id)>0);if(id<6)this.g.s.perks[id]--;else this.x.extraPerks[id-6]--;this.g.s.perkUntil[slot]=this.g.now()+300000;});}
 ascend(hero:number,key:string):boolean{return this.tx(key,()=>{this.g.require(this.g.s.run.heroes[hero]>=1000,'error.locked');this.g.s.run.heroes[hero]=1;this.x.ascensions[hero]++;});}
 heroSkill(hero:number,key:string):boolean{return this.tx(key,()=>{const tier=this.x.heroSkills[hero],target=[10,25,50,100,200,400,800][tier];this.g.require(!!target&&this.g.s.run.heroes[hero]>=target,'error.locked');const cost=this.g.upgradeCost(hero,5);this.g.require(this.g.s.run.gold>=cost);this.g.s.run.gold=sub(this.g.s.run.gold,cost);this.x.heroSkills[hero]++;});}
 petTile(tile:number,key:string):boolean{return this.tx(key,()=>{const x=this.x;this.g.require(this.g.s.maxStage>=8,'error.locked');this.g.require(tile>=0&&tile<16&&!x.petMatched.includes(tile),'error.invalid');if(x.petFace.length===2)x.petFace=[];this.g.require(!x.petFace.includes(tile),'error.invalid');if(!x.petFace.length){this.g.require(x.petEnergy>0);x.petEnergy--;}x.petFace.push(tile);if(x.petFace.length===2&&x.petBoard[x.petFace[0]]===x.petBoard[x.petFace[1]]){x.petMatched.push(...x.petFace);this.g.s.pets[this.g.s.activePet]++;if(x.petMatched.length===16)this.g.s.shards+=5;}});}
 petMilestone(target:number,key:string):boolean{return this.tx(key,()=>{this.g.require([10,25,50,100,250,500,1000].includes(target),'error.invalid');this.g.require(!this.x.petMilestones.includes(target),'error.claimed');this.g.require(this.g.s.pets.reduce((a,b)=>a+b,0)>=target,'error.locked');this.x.petMilestones.push(target);this.g.s.gems+=25;});}
 salvageMonument(i:number,key:string):boolean{return this.tx(key,()=>{this.g.require(this.g.s.monuments[i]>0&&!this.x.monumentEnchanted[i],'error.protected');this.g.s.mementos=add(this.g.s.mementos,mul(this.x.monumentInvested[i],.8));this.g.s.monuments[i]=0;this.x.monumentInvested[i]=ZERO;});}
 enchantCandidates():number[]{return this.g.s.monuments.map((l,i)=>l&&!this.x.monumentEnchanted[i]?i:-1).filter(i=>i>=0).slice(0,3);}
 enchantMonument(i:number,key:string):boolean{return this.tx(key,()=>{this.g.require(this.g.s.monuments.every(l=>l>0)&&this.enchantCandidates().includes(i),'error.locked');this.g.require(this.g.s.mementos>=amount(1000));this.g.s.mementos=sub(this.g.s.mementos,amount(1000));this.x.monumentEnchanted[i]=1;});}
 dustOffers():number[]{const cycle=Math.floor(this.g.now()/21600000);return [cycle%18,(cycle+7)%18,(cycle+13)%18];}
 dustBuy(i:number,key:string):boolean{return this.tx(key,()=>{this.g.require(this.dustOffers().includes(i),'error.invalid');this.g.require(this.g.s.dust>=20);this.g.s.dust-=20;this.g.s.fragments[i]+=5;});}
 crystal(slot:number,card:number,key:string):boolean{return this.tx(key,()=>{this.g.require(this.g.s.cards.reduce((a,b)=>a+b,0)>=1000,'error.locked');this.g.require(!this.g.raid||this.g.raid.ended,'error.protected');this.g.require(card%3===slot,'error.invalid');this.x.crystal[slot]=card;});}
 boostedLevel(card:number):number {if(!this.x.crystal.includes(card))return this.g.s.cards[card];const levels=this.g.s.cards.slice().sort((a,b)=>b-a);return Math.max(this.g.s.cards[card],levels[5]||1);}
 fortune(count:number):void{for(let n=0;n<count;n++){const weights=this.g.s.cards.map((l,i)=>l*100000+this.g.s.fragments[i]),min=Math.min(...weights),i=weights.indexOf(min);this.g.s.fragments[i]++;}}
 summon(count:number,banner:number,key:string):boolean{return this.tx(key,()=>{this.g.require([1,10].includes(count)&&banner>=0&&banner<7,'error.invalid');this.g.require(this.g.s.maxStage>=100000||this.g.now()-this.g.s.created>=30*86400000,'error.locked');this.g.require(this.g.s.souls>=10*count);this.g.s.souls-=10*count;this.x.banner=banner;for(let n=0;n<count;n++){let i=Math.floor(this.g.random()*120);if(banner&&this.g.random()<.7)i=(i%20)*6+(banner-1);this.g.s.titans[i]++;this.x.summonCount++;}});}
 titanCost(i:number):number{return Math.pow(2,Math.min(20,this.x.titanLevels[i]));}
 levelTitans(ids:number[],key:string):boolean{return this.tx(key,()=>{this.g.require(ids.length>0&&new Set(ids).size===ids.length,'error.invalid');let changed=false;for(const i of ids){this.g.require(i>=0&&i<120,'error.invalid');const cost=this.titanCost(i);if(this.g.s.titans[i]>=cost){this.g.s.titans[i]-=cost;this.x.titanLevels[i]++;changed=true;}}this.g.require(changed);});}
 gemstoneRarity(i:number):number{return gemstoneRarity(this.g.s.stones[i]);}
 mysticNode(i:number,key:string):boolean{return this.tx(key,()=>{this.g.require(Number.isInteger(i)&&i>=0&&i<this.x.mysticResearch.length,'error.invalid');const cost=this.x.mysticResearch[i]+1,spent=this.x.mysticResearch.reduce((a,l)=>a+l*(l+1)/2,0);this.g.require(this.x.geodesOpened-spent>=cost);if(i%3)this.g.require(this.x.mysticResearch[i-1]>=3,'error.prerequisite');this.x.mysticResearch[i]++;});}
 gemMilestone(i:number,level:number,key:string):boolean{return this.tx(key,()=>{this.g.require(Number.isInteger(i)&&i>=0&&i<this.g.s.stones.length,'error.invalid');const id=`${i}:${level}`;this.g.require([100,200,400,500].includes(level),'error.invalid');this.g.require(this.g.s.stones[i]>=level,'error.locked');this.g.require(!this.x.gemMilestones.includes(id),'error.claimed');this.x.gemMilestones.push(id);this.g.s.shards+=5;});}
 collectible(i:number,key:string):boolean{return this.tx(key,()=>{const progress=[this.x.dailyFairies,this.x.dailyEquipment,this.x.dailyEggs][i],goal=[3,3,1][i];this.g.require(progress>=goal,'error.locked');this.g.require(!this.x.collectionClaims.includes(String(i)),'error.claimed');this.x.collectionClaims.push(String(i));this.g.s.gems+=10;if(i===1)this.g.s.geodes++;});}
 claimMail(id:string,key:string):boolean{return this.tx(key,()=>{const mail=this.x.mails.find(m=>m.id===id);this.g.require(!!mail&&!mail.claimed&&mailExpiry(mail)>this.g.now(),'error.claimed');if(!mail)return;mail.claimed=true;this.g.s.gems+=mail.gems;this.g.s.shards+=mail.shards;});}
 deleteMail(id:string,key:string):boolean{return this.tx(key,()=>{const mail=this.x.mails.find(m=>m.id===id);this.g.require(!!mail&&(mail.claimed||mail.expires<=this.g.now()),'error.protected');this.x.mails=this.x.mails.filter(m=>m.id!==id);});}
 cosmetic(slot:number,value:number,key:string):boolean{return this.tx(key,()=>{this.g.require(slot>=0&&slot<3&&value>=0&&value<6,'error.invalid');this.g.require(this.g.s.maxStage>=value*50,'error.locked');this.x.cosmetics[slot]=value;});}
 eventShop(item:number,key:string):boolean{return this.tx(key,()=>{const cost=[50,100,75][item];this.g.require(!!cost,'error.invalid');this.g.require(this.g.s.eventTokens>=cost);this.g.s.eventTokens-=cost;if(item===0)this.g.s.shards+=5;if(item===1)this.g.s.pets[this.g.s.activePet]+=3;if(item===2)this.g.s.geodes++;});}
 alchemy(a:number,b:number,key:string):boolean{return this.tx(key,()=>{this.g.require([a,b].every(n=>n>=0&&n<4&&Number.isInteger(n)),'error.invalid');this.g.require(this.g.s.eventTokens>=30);this.g.s.eventTokens-=30;const recipe=Math.min(a,b)*4+Math.max(a,b);if(!this.x.recipes.includes(recipe))this.x.recipes.push(recipe);if(recipe%3===0)this.g.s.shards+=3;else if(recipe%3===1)this.g.s.gems+=12;else this.g.s.pets[this.g.s.activePet]++;});}
 drop(key:string):boolean{return this.tx(key,()=>{this.g.require(this.g.s.eventTokens>=25);this.g.s.eventTokens-=25;const path=[];let right=0;for(let i=0;i<8;i++){const bit=this.g.random()<.5?0:1;path.push(bit);right+=bit;}this.x.dropHistory=path;this.g.s.gems+=[2,4,8,12,25,12,8,4,2][right];});}
 tower(door:number,key:string):boolean{return this.tx(key,()=>{this.g.require(door>=0&&door<3,'error.invalid');this.g.require(this.x.towerKeys>0);this.x.towerKeys--;if(Math.floor(this.g.random()*3)===door){this.g.s.gems+=5;}else{this.x.towerFloor++;if(this.x.towerFloor%5===0)this.g.s.shards+=5;}});}
}
