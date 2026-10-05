import {initializeApp,getApps,getAuth,signOut,signInAnonymously,signInWithPopup,GoogleAuthProvider,linkWithPopup,getFirestore,doc,runTransaction,getDocFromServer,serverTimestamp} from './vendor/firebase-sdk.js';
import {sys} from 'cc';
import {nativeCall} from './NativeServices';
import {FIREBASE_CONFIG} from './FirebaseConfig';
import {validatePolicy} from './core/LiveOps';
export interface CloudSnapshot {version:number;state:any|null;}
/** Private backups only: competitive scores and commerce grants remain server-authoritative. */
export class FirebaseCloud {
    private auth:any;
    private db:any;
    private connecting:Promise<string>|null=null;
    uid='';
    private prepareAuth(){const app=getApps().find(a=>a.name==='tapWar')||initializeApp(FIREBASE_CONFIG,'tapWar');this.auth=getAuth(app);this.db=getFirestore(app);}
    /** Restore only an existing Firebase user; never create an account or open OAuth here. */
    async resume():Promise<'google'|'guest'|null>{
        if(sys.isNative&&sys.os===sys.OS.ANDROID){const user=await nativeCall('resumeSession',{},30000);if(!user.uid)return null;this.uid=user.uid;this.connecting=Promise.resolve(this.uid);return user.method;}
        this.prepareAuth();await this.auth.authStateReady();const user=this.auth.currentUser;if(!user)return null;
        this.uid=user.uid;this.connecting=Promise.resolve(this.uid);return user.isAnonymous?'guest':'google';
    }
    async logout():Promise<void>{
        if(sys.isNative&&sys.os===sys.OS.ANDROID)await nativeCall('logout',{},30000);
        else{this.prepareAuth();await signOut(this.auth);}
        this.uid='';this.connecting=null;
    }
    async loginGuest():Promise<void>{await this.connect();}
    async loginGoogle(allowSwitch=false):Promise<void>{
        try {
            if(sys.isNative&&sys.os===sys.OS.ANDROID){const user=await nativeCall('googleLogin',{allowSwitch},180000);this.uid=user.uid;this.connecting=Promise.resolve(this.uid);return;}
            this.prepareAuth();await this.auth.authStateReady();const current=this.auth.currentUser,provider=new GoogleAuthProvider();
            const result=current?.isAnonymous&&!allowSwitch?await linkWithPopup(current,provider):await signInWithPopup(this.auth,provider);
            this.uid=result.user.uid;this.connecting=Promise.resolve(this.uid);
        }catch(e){if((e as any)?.code==='auth/credential-already-in-use')throw Error('ops.googleCollision');throw this.error(e);}
    }
    private async connectOnce():Promise<string>{
        if(sys.isNative&&sys.os===sys.OS.ANDROID){const auth=await nativeCall('authenticate',{},30000);this.uid=auth.uid;return this.uid;}
        this.prepareAuth();
        await this.auth.authStateReady();
        const user=this.auth.currentUser||(await signInAnonymously(this.auth)).user;
        this.uid=user.uid;return this.uid;
    }
    async connect():Promise<string>{
        if(!this.connecting)this.connecting=this.connectOnce().catch(e=>{this.connecting=null;throw this.error(e);});
        return this.connecting;
    }
    private error(e:any):Error{return /^(online|error|ops|entry)\./.test(e?.message||'')?e:Error(['auth/popup-closed-by-user','auth/cancelled-popup-request'].includes(e?.code)?'entry.cancelled':e?.code==='auth/popup-blocked'?'entry.popupBlocked':e?.code==='auth/unauthorized-domain'?'entry.domainBlocked':e?.code==='auth/operation-not-allowed'?'ops.googleUnconfigured':e?.code==='permission-denied'?'online.auth':'online.unreachable');}
    async load():Promise<CloudSnapshot>{
        try{await this.connect();if(sys.isNative){const data=await nativeCall('cloudLoad',{},30000);return {version:data.version,state:data.payload?JSON.parse(data.payload):null};}const snap=await getDocFromServer(doc(this.db,'players',this.uid,'backups','main'));const data=snap.data();
            return {version:data?.version||0,state:data?.payload?JSON.parse(data.payload):null};
        }catch(e){throw this.error(e);}
    }
    async linkGoogle():Promise<void>{await this.connect();try{if(sys.isNative){await nativeCall('linkGoogle',{},180000);return;}const uid=this.uid;await linkWithPopup(this.auth.currentUser,new GoogleAuthProvider());if(this.auth.currentUser.uid!==uid)throw Error('online.auth');}catch(e){if((e as any)?.code==='auth/credential-already-in-use')throw Error('ops.googleCollision');throw this.error(e);}}
    private operationsBridge():string {
        if(typeof window==='undefined')return '';
        const bridge=(window as unknown as {TAPWAR_OPERATIONS_BASE?:string}).TAPWAR_OPERATIONS_BASE;
        return bridge===window.location.origin+'/firebase-operations'?bridge:'';
    }
    async policy(){await this.connect();if(sys.isNative||this.operationsBridge())return validatePolicy(await this.operationsRequest('/operations'));const snap=await getDocFromServer(doc(this.db,'operations','live'));if(!snap.exists())throw Error('online.unconfigured');return validatePolicy(snap.data());}
    async operationsRequest(path:string,data?:Record<string,unknown>):Promise<any>{
        if(sys.isNative&&sys.os===sys.OS.ANDROID){await this.connect();return (await nativeCall('operationsRequest',{path,...(data?{data}:{})},30000)).result;}
        await this.connect();const token=sys.isNative?(await nativeCall('authenticate',{},30000)).token:await this.auth.currentUser.getIdToken();
        // LAN HTML may opt into a same-origin bridge; never send an auth token to a configured third-party host.
        const bridge=this.operationsBridge();
        // The bridge gives its upstream 15 seconds; let it return before aborting on slower devices.
        const abort=new AbortController(),timer=setTimeout(()=>abort.abort(),bridge?20000:10000);
        const base=bridge||'https://asia-northeast3-ttsofts-tapwar.cloudfunctions.net/operations';
        try{const r=await fetch(base+path,{method:data?'POST':'GET',headers:{'Content-Type':'application/json',Authorization:'Bearer '+token},...(data?{body:JSON.stringify(data)}:{}),signal:abort.signal});const body=await r.json();if(!r.ok)throw Error(body.error||'online.serverError');return body;}
        catch(e){throw this.error(e);}finally{clearTimeout(timer);}
    }
    async save(state:unknown,expectedVersion:number):Promise<void>{
        const payload=JSON.stringify(state);
        if((typeof TextEncoder!=='undefined'?new TextEncoder().encode(payload).length:payload.length*3)>900000)throw Error('error.full');
        // Snapshot captured before awaits; a second device cannot silently overwrite a newer backup.
        try{await this.connect();if(sys.isNative){await nativeCall('cloudSave',{payload,version:expectedVersion},30000);return;}const ref=doc(this.db,'players',this.uid,'backups','main');
            await runTransaction(this.db,async tx=>{const snap=await tx.get(ref),version=snap.data()?.version||0;
                if(version!==expectedVersion)throw Error('online.saveConflict');
                tx.set(ref,{version:version+1,payload,updatedAt:serverTimestamp()});
            });
        }catch(e){throw this.error(e);}
    }
}
