import {initializeApp,getApps,getAuth,signInAnonymously,getFirestore,doc,runTransaction,getDocFromServer,serverTimestamp} from './vendor/firebase-sdk.js';
import {sys} from 'cc';
import {nativeCall} from './NativeServices';
import {FIREBASE_CONFIG} from './FirebaseConfig';
export interface CloudSnapshot {version:number;state:any|null;}
/** Private backups only: competitive scores and commerce grants remain server-authoritative. */
export class FirebaseCloud {
    private auth:any;
    private db:any;
    private connecting:Promise<string>|null=null;
    uid='';
    private async connectOnce():Promise<string>{
        if(sys.isNative&&sys.os===sys.OS.ANDROID){const auth=await nativeCall('authenticate',{},30000);this.uid=auth.uid;return this.uid;}
        const app=getApps().find(a=>a.name==='tapWar')||initializeApp(FIREBASE_CONFIG,'tapWar');
        this.auth=getAuth(app);this.db=getFirestore(app);
        await this.auth.authStateReady();
        const user=this.auth.currentUser||(await signInAnonymously(this.auth)).user;
        this.uid=user.uid;return this.uid;
    }
    async connect():Promise<string>{
        if(!this.connecting)this.connecting=this.connectOnce().catch(e=>{this.connecting=null;throw this.error(e);});
        return this.connecting;
    }
    private error(e:any):Error{return e?.message?.startsWith('online.')?e:Error(e?.code==='permission-denied'?'online.auth':'online.unreachable');}
    async load():Promise<CloudSnapshot>{
        try{await this.connect();if(sys.isNative){const data=await nativeCall('cloudLoad',{},30000);return {version:data.version,state:data.payload?JSON.parse(data.payload):null};}const snap=await getDocFromServer(doc(this.db,'players',this.uid,'backups','main'));const data=snap.data();
            return {version:data?.version||0,state:data?.payload?JSON.parse(data.payload):null};
        }catch(e){throw this.error(e);}
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
