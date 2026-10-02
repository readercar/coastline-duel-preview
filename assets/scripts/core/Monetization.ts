import type { Game } from './Game';
import type { Online } from './Online';
import { add, mul } from './Amount';
import { CONFIG, SPELLS } from './Config';

/** Prices observed on the Korean iOS listing, 2026-10-02. Never use these as a store charge quote. */
export const PRODUCTS = [
    ...[180,500,1200,3100,6500,14000].map((gems,i)=>({id:`diamonds_${gems}`,name:'money.diamonds',gems,krw:[3300,7700,17000,44000,77000,149000][i],kind:'consumable',configured:true})),
    {id:'season_pass',name:'money.pass',gems:0,krw:17000,kind:'season',configured:true},
    {id:'starter_bundle',name:'money.starter',gems:0,krw:4400,kind:'bundle',configured:false},
    {id:'special_small',name:'money.special',gems:0,krw:7700,kind:'bundle',configured:false},
    {id:'special_large',name:'money.special',gems:0,krw:44000,kind:'bundle',configured:false},
] as const;
export const VIP_THRESHOLDS=[250,625,1250,1875,2500];
export const AD_PLACEMENTS = [
    {id:'fairy_diamond',group:'fairy',limit:5,period:86400000,cooldown:120000},
    {id:'fairy_mana',group:'fairy',limit:0,period:86400000,cooldown:120000},
    {id:'fairy_gold',group:'fairy',limit:0,period:86400000,cooldown:120000},
    {id:'fairy_discount',group:'legacy',limit:0,period:86400000,cooldown:120000},
    {id:'fairy_skills',group:'fairy',limit:0,period:86400000,cooldown:300000},
    {id:'fairy_gold_spree',group:'fairy',limit:0,period:86400000,cooldown:300000},
    {id:'fairy_damage_spree',group:'fairy',limit:0,period:86400000,cooldown:300000},
    {id:'fairy_equipment',group:'fairy',limit:0,period:86400000,cooldown:120000},
    {id:'mega_boost',group:'boost',limit:0,period:86400000,cooldown:14400000},
    {id:'shop_chest',group:'shop',limit:3,period:43200000,cooldown:300000},
] as const;
export type AdPlacement=typeof AD_PLACEMENTS[number]['id'];
export interface CommerceState { vipPoints:number; passUntil:number; discountUntil:number; boostUntil:number; goldSpreeUntil:number; damageSpreeUntil:number; fairyAds:boolean; pending:{path:string;data:Record<string,unknown>}[]; }
export const newCommerce=():CommerceState=>({vipPoints:0,passUntil:0,discountUntil:0,boostUntil:0,goldSpreeUntil:0,damageSpreeUntil:0,fairyAds:true,pending:[]});
export interface StoreQuote { id:string; price:string; currency:string; amountMinor:number; }
/** A native StoreKit/Play Billing adapter must return actual store metadata and opaque receipts. */
export interface BillingAdapter { catalog(ids:string[]):Promise<StoreQuote[]>; purchase(id:string):Promise<{status:'cancelled'|'pending'|'purchased';receipt?:string}>; restore():Promise<string[]>; }
export interface RewardedAdAdapter { show(placement:AdPlacement,ticket:string):Promise<{status:'completed'|'cancelled'|'no-fill';proof?:string}>; }
export interface CommerceGrant { id:string;kind:'purchase'|'ad';product?:string;placement?:AdPlacement;gems:number;vipPoints:number;passUntil:number;boostUntil?:number;discountUntil?:number;goldSpreeUntil?:number;damageSpreeUntil?:number; }
export class Monetization {
    billing:BillingAdapter|null=null;
    ads:RewardedAdAdapter|null=null;
    busy=false;
    constructor(public g:Game,public online:Online){}
    tier():number{return this.g.s.extra.commerce.passUntil>this.g.now()?5:VIP_THRESHOLDS.filter(p=>this.g.s.extra.commerce.vipPoints>=p).length;}
    apply(grant:CommerceGrant):boolean{
        return this.g.transaction('commerce:'+grant.id,()=>{
            this.g.require(!this.g.s.claims.includes('commerce:'+grant.id),'error.claimed');
            this.g.require(Number.isInteger(grant.gems)&&grant.gems>=0&&Number.isInteger(grant.vipPoints)&&grant.vipPoints>=0,'error.invalid');
            const x=this.g.s.extra.commerce;
            if(grant.kind==='ad'){
                this.g.require(AD_PLACEMENTS.some(p=>p.id===grant.placement),'error.invalid');
                switch(grant.placement){
                    case 'fairy_diamond':this.g.s.eventTokens+=15;this.g.s.extra.eventEarned+=15;break;
                    case 'fairy_mana':this.g.s.run.mana=Math.min(CONFIG.manaMax,this.g.s.run.mana+CONFIG.manaMax*.25);break;
                    case 'fairy_gold_spree':x.goldSpreeUntil=Math.max(x.goldSpreeUntil||0,grant.goldSpreeUntil||0);break;
                    case 'fairy_damage_spree':x.damageSpreeUntil=Math.max(x.damageSpreeUntil||0,grant.damageSpreeUntil||0);break;
                    case 'fairy_equipment':{this.g.require(this.g.s.maxStage<5000,'error.locked');this.g.require(this.g.s.equipment.length<CONFIG.inventoryCap,'error.full');const item=this.g.drop(undefined,1),equipped=this.g.s.equipment.find(e=>e.id===this.g.s.equipped[item.slot]);if(equipped){item.power=Math.max(item.power,equipped.power*1.01);item.level=Math.max(item.level,equipped.level+1);}break;}
                    case 'fairy_gold':this.g.s.run.gold=add(this.g.s.run.gold,mul(this.g.goldReward(),50));break;
                    case 'fairy_discount':x.discountUntil=Math.max(x.discountUntil,grant.discountUntil||0);break;
                    case 'fairy_skills':this.g.s.spellSlots.forEach(i=>{if(this.g.s.run.master>=SPELLS[i].unlock){this.g.s.run.spells[i]=Math.max(this.g.s.run.spells[i],SPELLS[i].duration);this.g.s.run.stacks[i]=Math.max(1,this.g.s.run.stacks[i]);if(i===0)this.g.damage(mul(this.g.tapDamage(),100*this.g.s.run.spellLevels[i]));}});break;
                    case 'mega_boost':x.boostUntil=Math.max(x.boostUntil,grant.boostUntil||0);break;
                    case 'shop_chest':this.g.require(this.g.s.equipment.length<CONFIG.inventoryCap,'error.full');this.g.drop();break;
                }
            }
            this.g.s.gems+=grant.gems;x.vipPoints+=grant.vipPoints;x.passUntil=Math.max(x.passUntil,grant.passUntil);
            this.g.s.claims.push('commerce:'+grant.id);
        });
    }
    async deliver():Promise<number>{const grants:CommerceGrant[]=await this.online.request('/commerce/grants');let count=0;for(const grant of grants){if(!this.g.s.claims.includes('commerce:'+grant.id)){if(!this.apply(grant))throw Error(this.g.notice);count++;}await this.online.command('/commerce/ack',{id:grant.id},'commerce-ack-'+grant.id);}return count;}
    async submit(path:string,data:Record<string,unknown>):Promise<void>{const x=this.g.s.extra.commerce,entry={path,data};x.pending.push(entry);if(!this.g.persist()){x.pending.pop();throw Error('error.storage');}await this.retryPending();}
    async retryPending():Promise<void>{for(const entry of this.g.s.extra.commerce.pending.slice()){await this.online.command(entry.path,entry.data);this.g.s.extra.commerce.pending=this.g.s.extra.commerce.pending.filter(p=>p!==entry);this.g.persist();}await this.deliver();}
    async purchase(id:string):Promise<string>{if(this.busy)throw Error('money.busy');if(!PRODUCTS.some(p=>p.id===id&&p.configured))throw Error('money.bundleUnknown');if(!this.billing)throw Error('money.storeUnavailable');this.busy=true;try{const result=await this.billing.purchase(id);if(result.status!=='purchased')return result.status;if(!result.receipt)throw Error('money.verification');await this.submit('/commerce/purchase',{product:id,receipt:result.receipt});return 'purchased';}finally{this.busy=false;}}
    async watch(placement:AdPlacement):Promise<string>{if(this.busy)throw Error('money.busy');if(placement==='fairy_diamond'&&this.g.s.run.stage>=this.g.s.maxStage*.99)throw Error('money.diamondStage');if(placement==='fairy_equipment'&&this.g.s.maxStage>=5000)throw Error('error.locked');this.busy=true;try{const ticket=await this.online.command('/commerce/ad/start',{placement});if(ticket.skip){await this.deliver();return 'completed';}if(!this.ads)throw Error('money.adsUnavailable');const result=await this.ads.show(placement,ticket.id);if(result.status!=='completed')return result.status;if(!result.proof)throw Error('money.verification');await this.submit('/commerce/ad/complete',{ticket:ticket.id,proof:result.proof});return 'completed';}finally{this.busy=false;}}
    async restore():Promise<void>{if(this.busy)throw Error('money.busy');if(!this.billing)throw Error('money.storeUnavailable');this.busy=true;try{for(const receipt of await this.billing.restore())await this.submit('/commerce/restore',{receipt});await this.retryPending();}finally{this.busy=false;}}
}
