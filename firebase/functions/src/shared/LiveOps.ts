export const APP_VERSION = '0.1.0';
export const DEVELOPMENT_VERSION=APP_VERSION;
export const STORE_VERSION='1.0';
export type Platform = 'web'|'android'|'ios';
export interface Notice { id:string; title:string; body:string; localizations?:Record<string,{title:string;body:string}>; }
export interface Policy { notices:Notice[]; minimumVersion:Record<Platform,string>; requiredVersion?:Partial<Record<Platform,string>>; storeUrls:Record<Platform,string>; }
export function compareVersions(a:string,b:string):number {
 const parse=(s:string)=>{if(typeof s!=='string'||!/^\d+(\.\d+){0,3}$/.test(s))throw Error('error.invalid');const v=s.split('.').map(Number);if(v.some(n=>!Number.isSafeInteger(n)))throw Error('error.invalid');return v;};
 const x=parse(a),y=parse(b);for(let i=0;i<Math.max(x.length,y.length);i++){const d=(x[i]||0)-(y[i]||0);if(d)return Math.sign(d);}return 0;
}
export function validatePolicy(v:any):Policy {
 if(!v||!Array.isArray(v.notices)||v.notices.length>30||!v.minimumVersion||!v.storeUrls)throw Error('error.invalid');
 const ids=new Set<string>();const validText=(n:any)=>{if(!n||typeof n.title!=='string'||!n.title.trim()||n.title.length>60||typeof n.body!=='string'||n.body.length>3000)throw Error('error.invalid');};
 for(const n of v.notices){validText(n);if(typeof n.id!=='string'||!/^[-a-zA-Z0-9]{1,80}$/.test(n.id)||ids.has(n.id))throw Error('error.invalid');ids.add(n.id);if(n.localizations)Object.values(n.localizations).forEach(validText);}
 for(const p of ['web','android','ios'] as Platform[]){compareVersions(v.minimumVersion[p],'0');const target=v.requiredVersion?.[p];if(target!==undefined)compareVersions(target,'0');const url=v.storeUrls[p];if(typeof url!=='string')throw Error('error.invalid');if(url){const u=new URL(url);if(u.protocol!=='https:'||u.username||u.password)throw Error('error.invalid');}if((compareVersions(v.minimumVersion[p],'0')>0||(target&&compareVersions(target,'0')>0))&&!url)throw Error('error.invalid');}
 return v;
}
export function requiresUpdate(p:Policy,platform:Platform,version=APP_VERSION):boolean {const target=p.requiredVersion?.[platform];return target&&compareVersions(target,'0')>0?compareVersions(version,target)!==0:compareVersions(version,p.minimumVersion[platform])<0;}
export const MAIL_LIFETIME=30*86400000;
export function mailExpiry(m:{expires:number;created?:number}):number{return Math.min(m.expires,m.created===undefined?m.expires:m.created+MAIL_LIFETIME);}
