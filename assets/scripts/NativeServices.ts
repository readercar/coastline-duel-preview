import {native,sys} from 'cc';
import type {AdPlacement,RewardedAdAdapter} from './core/Monetization';
import {Online} from './core/Online';
import type {Storage} from './core/Game';
// Enable after Functions deployment and end-to-end SSV validation, never by a client reward callback.
export const FIREBASE_COMMERCE_ENABLED=false;
const endpoint='https://asia-northeast3-ttsofts-tapwar.cloudfunctions.net/commerce';
let sequence=0;
const pending=new Map<string,{resolve:(data:any)=>void;reject:(e:Error)=>void;timer:ReturnType<typeof setTimeout>}>();
const root=globalThis as any;
root.tapWarNativeResult=(id:string,data:any)=>{const p=pending.get(id);if(!p)return;clearTimeout(p.timer);pending.delete(id);if(data.error)p.reject(Error(data.error));else p.resolve(data);};
export function nativeCall(method:string,payload:Record<string,unknown>,timeout=180000):Promise<any>{
 if(!sys.isNative||sys.os!==sys.OS.ANDROID)return Promise.reject(Error('money.adsUnavailable'));
 return new Promise((resolve,reject)=>{const id='native-'+(++sequence);const timer=setTimeout(()=>{pending.delete(id);reject(Error('online.unreachable'));},timeout);pending.set(id,{resolve,reject,timer});
  try{native.reflection.callStaticMethod('com/cocos/game/TapWarServices',method,'(Ljava/lang/String;Ljava/lang/String;)V',id,JSON.stringify(payload));}
  catch{clearTimeout(timer);pending.delete(id);reject(Error('money.adsUnavailable'));}
 });
}
export class FirebaseCommerce extends Online {
 uid='';
 constructor(storage:Storage){super(storage);this.base=FIREBASE_COMMERCE_ENABLED?endpoint:'';}
 async connect():Promise<any>{if(!this.base)throw Error('online.unconfigured');const auth=await nativeCall('authenticate',{});this.uid=auth.uid;this.accountId=auth.uid;return {profile:{id:auth.uid}};}
 async request(path:string,data?:Record<string,unknown>):Promise<any>{
  if(!this.base)throw Error('online.unconfigured');const auth=await nativeCall('authenticate',{},30000);this.uid=auth.uid;this.accountId=auth.uid;
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),10000);
  try{const r=await fetch(this.base+path,{method:data?'POST':'GET',headers:{'Content-Type':'application/json',Authorization:'Bearer '+auth.token},...(data?{body:JSON.stringify(data)}:{}),signal:controller.signal});const body=await r.json();if(!r.ok)throw Error(body.error||'online.serverError');return body;}
  catch(e){if(/^(money|error|online)\./.test((e as Error).message))throw e;throw Error('online.unreachable');}finally{clearTimeout(timer);}
 }
}
export class AdMobRewarded implements RewardedAdAdapter {
 constructor(private commerce:FirebaseCommerce){}
 async show(placement:AdPlacement,ticket:string):Promise<{status:'completed'|'cancelled'|'no-fill';proof?:string}>{
  const result=await nativeCall('showRewarded',{uid:this.commerce.uid,ticket,placement});
  if(result.status!=='completed'){await this.commerce.request('/commerce/ad/cancel',{ticket});return {status:result.status==='cancelled'?'cancelled':'no-fill'};}
  // SDK completion is not proof. The endpoint below checks the Google-signed callback ledger.
  for(let n=0;n<15;n++){
   try{await this.commerce.request('/commerce/ad/complete',{ticket,proof:ticket});return {status:'completed',proof:ticket};}
   catch(e){if((e as Error).message!=='money.verification')throw e;}
   await new Promise<void>(resolve=>setTimeout(resolve,2000));
  }
  throw Error('money.verification');
 }
}
