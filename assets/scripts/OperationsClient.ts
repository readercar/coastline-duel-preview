import {sys} from 'cc';
import type {GameApp} from './GameApp';
import {APP_VERSION,Policy,validatePolicy} from './core/LiveOps';
import {Game,Save} from './core/Game';
import {MailView,diagnostic} from './core/Operations';
/** One queue owns restore, save and mail grants. A revision conflict stops progression. */
export class OperationsClient {
 ready=false; busy=false; conflict=false; version=0; reads:string[]=[]; mails:MailView[]=[];
 useCloud=sys.localStorage.getItem('tapwar-login-method')==='google';
 private uid=''; private queue:Promise<unknown>=Promise.resolve(); private revision=-1;private elapsed=0;
 constructor(private a:GameApp){}
 get local(){return !this.useCloud&&!sys.isNative&&typeof window!=='undefined'&&['localhost','127.0.0.1'].includes(window.location.hostname);}
 private request(path:string,data?:Record<string,unknown>){return this.local?this.a.onlineService.request(path,data):this.a.cloud.operationsRequest(path,data);}
 async policy():Promise<Policy>{return validatePolicy(this.local?await this.request('/operations'):await this.a.cloud.policy());}
 private serial<T>(work:()=>Promise<T>):Promise<T>{const job=this.queue.then(work);this.queue=job.catch(()=>{});return job;}
 async start(useCloud?:boolean):Promise<void>{if(useCloud!==undefined)this.useCloud=useCloud;return this.serial(async()=>{
  this.busy=true;try{if(this.local)await this.a.onlineService.connect(this.a.tr('online.defaultName'));else await this.a.cloud.connect();
   const uid=this.local?this.a.onlineService.accountId:this.a.cloud.uid,last=sys.localStorage.getItem('outrun-server-uid');this.uid=uid;this.ready=false;const saved=await this.request('/account/save');this.version=saved.version;
   const locale=this.a.game.s.locale;
   if(!saved.state&&last&&last!==uid){this.a.game.s=new Game().s;this.a.game.s.locale=locale;this.a.game.persist();}
   if(saved.state){this.a.game.migrate(saved.state);this.a.game.validate(saved.state);const restored=new Game({getItem:key=>key==='ember-ascent-v1'?JSON.stringify(saved.state):null,setItem:()=>{}},this.a.game.now);if(!this.a.extensions.restore(restored.s))throw Error('error.save');}
   this.a.game.s.locale=locale;
   if(!saved.state){await this.request('/account/save',{state:this.a.game.s,version:0,key:this.a.id('initial-save')});this.version=1;}
   this.reads=await this.request('/operations/reads');this.mails=await this.request('/operations/mail');this.revision=this.a.game.revision;this.ready=true;this.conflict=false;sys.localStorage.setItem('outrun-server-uid',uid);this.a.draw();
  }finally{this.busy=false;}
 });}
 save():Promise<void>{return this.serial(async()=>{
  if(this.conflict)throw Error('online.saveConflict');if(!this.ready)throw Error('online.unreachable');if(this.uid!==(this.local?this.a.onlineService.accountId:this.a.cloud.uid)){this.conflict=true;throw Error('online.auth');}this.busy=true;const revision=this.a.game.revision,state=JSON.parse(JSON.stringify(this.a.game.s));
  try{const r=await this.request('/account/save',{state,version:this.version,key:this.a.id('auto-save')});this.version=r.version;this.revision=revision;}
  catch(e){if(['online.saveConflict','online.unreachable'].includes((e as Error).message))this.conflict=true;throw e;}finally{this.busy=false;}
 });}
 get identity(){return this.local?this.a.onlineService.accountId:this.a.cloud.uid;}
 replaceProgress(state:Save):Promise<void>{return this.serial(async()=>{
  if(this.conflict)throw Error('online.saveConflict');if(!this.ready||this.uid!==this.identity)throw Error('online.auth');
  this.a.game.validate(state);this.busy=true;const payload=JSON.parse(JSON.stringify(state)),version=this.version;
  try{
   let next:number;
   try{const result=await this.request('/account/save',{state:payload,version,key:this.a.id('prototype-replace')});next=result.version;}
   catch(error){
    // A lost response may follow a committed write. Verify before considering it a failure.
    const stored=await this.request('/account/save');
    if(stored.version!==version+1||JSON.stringify(stored.state)!==JSON.stringify(payload))throw error;
    next=stored.version;
   }
   this.version=next;this.a.game.s=payload;this.a.game.revision++;this.revision=this.a.game.revision;this.elapsed=0;
   if(!this.a.game.persist())throw Error('error.storage');
  }catch(error){if((error as Error).message==='online.saveConflict')this.conflict=true;throw error;}finally{this.busy=false;}
 });}
 async read(id:string){await this.serial(()=>this.request('/operations/read',{id,key:this.a.id('notice-read')}));if(!this.reads.includes(id))this.reads.push(id);}
 async inbox(){if(!this.ready)throw Error('online.unreachable');this.mails=await this.request('/operations/mail');return this.mails;}
 async claim(id:string){await this.save();return this.serial(async()=>{
  if(this.conflict)throw Error('online.saveConflict');this.busy=true;try{const result=await this.request('/operations/mail/claim',{id,version:this.version,key:'mail-claim-'+id});
   if(!this.a.extensions.restore(result.state))throw Error('error.save');this.version=result.version;this.revision=this.a.game.revision;await this.inbox();this.a.draw();
  }catch(e){if(['online.saveConflict','online.unreachable'].includes((e as Error).message))this.conflict=true;throw e;}finally{this.busy=false;}
 });}
 async delete(id:string){await this.serial(()=>this.request('/operations/mail/delete',{id,key:this.a.id('mail-delete')}));await this.inbox();}
 tick(dt:number){this.elapsed+=dt;if(this.ready&&this.elapsed>10&&!this.busy&&!this.conflict){this.elapsed=0;void this.save().catch(()=>{});}}
 report(code:string,error:unknown){const data={id:this.a.id('err').replace(/:/g,'-'),...diagnostic({code,message:(error as Error)?.message,version:APP_VERSION,platform:this.a.liveOps.platform})};
  let queue:any[]=[];try{queue=JSON.parse(sys.localStorage.getItem('outrun-errors')||'[]');}catch{}queue.push(data);sys.localStorage.setItem('outrun-errors',JSON.stringify(queue.slice(-20)));if(this.ready)void this.flushErrors();}
 async flushErrors(){let entries:any[]=[];try{entries=JSON.parse(sys.localStorage.getItem('outrun-errors')||'[]');}catch{}for(const item of entries){try{await this.request('/operations/error',item);entries=entries.filter(e=>e.id!==item.id);sys.localStorage.setItem('outrun-errors',JSON.stringify(entries));}catch{return;}}}
}
