import {onRequest} from 'firebase-functions/v2/https';
import {getAuth} from 'firebase-admin/auth';
import {getFirestore,FieldValue} from 'firebase-admin/firestore';
import {validatePolicy,mailExpiry} from './shared/LiveOps';
import {validId,diagnostic,Mail,validateMail} from './shared/Operations';
const db=getFirestore();
export const operations=onRequest({region:'asia-northeast3',maxInstances:2,timeoutSeconds:30,cors:['https://readercar.github.io',/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/]},async(req,res)=>{
 try{
  const path=req.path,body=req.body||{};
  if(path==='/operations'&&req.method==='GET'){const s=await db.doc('operations/live').get();res.json(validatePolicy(s.data()));return;}
  const token=req.headers.authorization?.match(/^Bearer (.+)$/)?.[1];if(!token){res.status(401).json({error:'online.auth'});return;}const {uid}=await getAuth().verifyIdToken(token),root=db.doc('players/'+uid),backup=root.collection('backups').doc('main'),receipts=root.collection('mailReceipts');
  const saved=(data:any)=>({version:data?.version||0,state:data?.payload?JSON.parse(data.payload):null});
  if(path==='/account/save'&&req.method==='GET'){res.json(saved((await backup.get()).data()));return;}
  if(path==='/account/save'&&req.method==='POST'){
   const payload=JSON.stringify(body.state);if(!payload||Buffer.byteLength(payload)>900000||!body.state?.run||!Array.isArray(body.state?.pets))throw Error('error.save');
   const result=await db.runTransaction(async t=>{const snap=await t.get(backup),version=snap.data()?.version||0;if(version!==body.version)throw Error('online.saveConflict');t.set(backup,{version:version+1,payload,updatedAt:FieldValue.serverTimestamp()});return {version:version+1};});res.json(result);return;
  }
  if(path==='/operations/reads'&&req.method==='GET'){const r=await root.collection('messageReads').get();res.json(r.docs.map(d=>d.id));return;}
  if(path==='/operations/read'&&req.method==='POST'){if(!validId(body.id))throw Error('error.invalid');await root.collection('messageReads').doc(body.id).set({readAt:FieldValue.serverTimestamp()});res.json({ok:true});return;}
  if(path==='/operations/mail'&&req.method==='GET'){
   const [all,own,read]=await Promise.all([db.collection('mailRewards').where('recipient','==','all').get(),db.collection('mailRewards').where('recipient','==',uid).get(),receipts.get()]),flags=new Map(read.docs.map(d=>[d.id,d.data()]));
   res.json([...all.docs,...own.docs].map(d=>({...d.data(),id:d.id} as Mail)).filter(m=>!m.revoked&&mailExpiry(m)>Date.now()&&!flags.get(m.id)?.deleted).sort((a,b)=>b.created-a.created).map(m=>({...m,claimed:!!flags.get(m.id)?.claimed,deleted:false})));return;
  }
  if(path==='/operations/mail/claim'&&req.method==='POST'){
   if(!validId(body.id))throw Error('error.invalid');const ref=db.doc('mailRewards/'+body.id),receipt=receipts.doc(body.id);
   const result=await db.runTransaction(async t=>{const [mail,seen,snap]=await Promise.all([t.get(ref),t.get(receipt),t.get(backup)]),current=saved(snap.data());if(seen.data()?.claimed)return current;
    if(!mail.exists)throw Error('online.notFound');const m=validateMail({...mail.data(),id:mail.id});if(m.revoked||mailExpiry(m)<=Date.now()||!(m.recipient==='all'||m.recipient===uid))throw Error('online.notFound');if(current.version!==body.version||!current.state)throw Error('online.saveConflict');
    const s=current.state,r=m.rewards;for(const k of ['gems','shards','dust'] as const){if(!Number.isSafeInteger(r[k])||!Number.isSafeInteger(s[k]))throw Error('error.save');s[k]+=r[k];}if(!Array.isArray(s.pets)||!Number.isSafeInteger(s.pets[r.pet]))throw Error('error.save');s.pets[r.pet]+=r.petLevels;
    t.set(backup,{version:current.version+1,payload:JSON.stringify(s),updatedAt:FieldValue.serverTimestamp()});t.set(receipt,{claimed:true,deleted:false,claimedAt:FieldValue.serverTimestamp()});return {version:current.version+1,state:s};
   });res.json(result);return;
  }
  if(path==='/operations/mail/delete'&&req.method==='POST'){if(!validId(body.id))throw Error('error.invalid');const ref=receipts.doc(body.id);await db.runTransaction(async t=>{const s=await t.get(ref);if(!s.data()?.claimed)throw Error('online.notFound');t.update(ref,{deleted:true});});res.json({ok:true});return;}
  if(path==='/operations/error'&&req.method==='POST'){if(!validId(body.id))throw Error('error.invalid');const ref=db.collection('clientErrors').doc(uid+'-'+body.id),quota=root.collection('opsQuotas').doc('errors');await db.runTransaction(async t=>{const [s,q]=await Promise.all([t.get(ref),t.get(quota)]);if(s.exists)return;const now=Date.now(),old=q.data(),count=old&&now-old.started<3600000?old.count:0;if(count>=20)throw Error('online.rateLimit');t.create(ref,{uid,...diagnostic(body),createdAt:FieldValue.serverTimestamp()});t.set(quota,{started:count?old!.started:now,count:count+1});});res.json({ok:true});return;}
  res.status(404).json({error:'online.notFound'});
 }catch(e){const key=(e as Error).message;res.status(key==='online.saveConflict'?409:400).json({error:/^(online|error)\./.test(key)?key:'online.serverError'});}
});
