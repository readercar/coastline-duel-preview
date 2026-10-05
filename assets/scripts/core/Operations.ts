import {Notice,mailExpiry} from './LiveOps';
export interface Mail extends Notice {recipient:string;created:number;expires:number;revoked:boolean;rewards:{gems:number;shards:number;dust:number;pet:number;petLevels:number};}
export interface MailView extends Mail {claimed:boolean;deleted:boolean;}
export const validId=(id:unknown):id is string=>typeof id==='string'&&/^[-a-zA-Z0-9]{1,80}$/.test(id);
export function localized(n:Notice,locale:string):{title:string;body:string}{return n.localizations?.[locale]||n.localizations?.en||n;}
export function validateMail(v:any):Mail {
 if(!v||!validId(v.id)||typeof v.title!=='string'||!v.title.trim()||v.title.length>60||typeof v.body!=='string'||v.body.length>3000||typeof v.recipient!=='string'||!(v.recipient==='all'||validId(v.recipient)))throw Error('error.invalid');
 for(const n of Object.values(v.localizations||{}) as any[])if(!n||typeof n.title!=='string'||!n.title.trim()||n.title.length>60||typeof n.body!=='string'||n.body.length>3000)throw Error('error.invalid');
 if(!Number.isSafeInteger(v.created)||v.created<0||!Number.isSafeInteger(v.expires)||v.expires<=v.created||mailExpiry(v)!==v.expires)throw Error('error.invalid');
 const r=v.rewards;if(!r||['gems','shards','dust','petLevels'].some(k=>!Number.isSafeInteger(r[k])||r[k]<0||r[k]>1000000)||!Number.isInteger(r.pet)||r.pet<0||r.pet>11)throw Error('error.invalid');
 return {id:v.id,title:v.title,body:v.body,...(v.localizations?{localizations:v.localizations}:{}),recipient:v.recipient,created:v.created,expires:v.expires,revoked:!!v.revoked,rewards:{gems:r.gems,shards:r.shards,dust:r.dust,pet:r.pet,petLevels:r.petLevels}};
}
/** Stores only a scrubbed diagnostic; never attach saves, receipts, tokens, email or URLs. */
export function diagnostic(v:any):{code:string;message:string;version:string;platform:string}{
 const scrub=(s:unknown,n:number)=>String(s||'').replace(/Bearer\s+\S+|https?:\/\/\S+|[\w.+-]+@[\w.-]+\.[a-z]+/gi,'[redacted]').replace(/[A-Za-z0-9_-]{32,}/g,'[redacted]').slice(0,n);
 return {code:scrub(v?.code,80),message:scrub(v?.message,1000),version:scrub(v?.version,24),platform:['web','android','ios'].includes(v?.platform)?v.platform:'web'};
}
