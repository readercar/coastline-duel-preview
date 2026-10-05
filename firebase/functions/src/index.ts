import {onRequest} from 'firebase-functions/v2/https';
import {initializeApp} from 'firebase-admin/app';
import {getAuth} from 'firebase-admin/auth';
import {getFirestore} from 'firebase-admin/firestore';
import {createHash} from 'node:crypto';
import {isConsoleProbe,verifyGoogle} from './ssv';
initializeApp();const db=getFirestore();
const unit='ca-app-pub-5359581077506683/9191178394';
const rules:Record<string,{group:string;limit:number;period:number;cooldown:number}>={
 fairy_diamond:{group:'fairy',limit:5,period:86400000,cooldown:120000},
 fairy_mana:{group:'fairy',limit:0,period:86400000,cooldown:120000},
 fairy_gold:{group:'fairy',limit:0,period:86400000,cooldown:120000},
 fairy_skills:{group:'fairy',limit:0,period:86400000,cooldown:300000},
 fairy_gold_spree:{group:'fairy',limit:0,period:86400000,cooldown:300000},
 fairy_damage_spree:{group:'fairy',limit:0,period:86400000,cooldown:300000},
 fairy_equipment:{group:'fairy',limit:0,period:86400000,cooldown:120000},
 mega_boost:{group:'boost',limit:0,period:86400000,cooldown:14400000},
 shop_chest:{group:'shop',limit:3,period:43200000,cooldown:300000}
};
const opts={region:'asia-northeast3',maxInstances:2,memory:'256MiB' as const,timeoutSeconds:30};
export const commerce=onRequest({...opts,cors:['https://readercar.github.io',/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/]},async(req,res)=>{
 try{
  const token=req.headers.authorization?.match(/^Bearer (.+)$/)?.[1];if(!token){res.status(401).json({error:'online.auth'});return;}
  const {uid}=await getAuth().verifyIdToken(token);const path=req.path,now=Date.now(),body=req.body||{};
  const root=db.doc('adAccounts/'+uid),grants=root.collection('grants');
  if(path==='/commerce/status'){
   const s=(await root.get()).data()||{};
   res.json({tier:0,vipPoints:0,passUntil:0,placements:Object.entries(rules).map(([id,r])=>{const c=s[id]||{};return {id,...r,skip:false,used:c.bucket===Math.floor(now/r.period)?c.used:0,readyAt:Math.max(c.next||0,r.group==='fairy'?s.fairyNext||0:0)};})});return;
  }
  if(path==='/commerce/grants'){const s=await grants.where('acked','==',false).limit(100).get();res.json(s.docs.map(d=>{const {acked,...g}=d.data();return g;}));return;}
  if(path==='/commerce/ack'&&req.method==='POST'){
   if(typeof body.id!=='string'||!/^[a-zA-Z0-9-]{1,100}$/.test(body.id))throw Error('error.invalid');
   const ref=grants.doc(body.id);await db.runTransaction(async t=>{const s=await t.get(ref);if(!s.exists)throw Error('error.invalid');t.update(ref,{acked:true});});res.json({ok:true});return;
  }
  if(path==='/commerce/ad/start'&&req.method==='POST'){
   const r=rules[body.placement];if(!r||typeof body.key!=='string'||body.key.length>200)throw Error('error.invalid');
   const id=createHash('sha256').update(uid+':'+body.key).digest('hex'),ref=db.doc('adTickets/'+id);
   await db.runTransaction(async t=>{const [ticket,account]=await Promise.all([t.get(ref),t.get(root)]);if(ticket.exists){if(ticket.data()!.placement!==body.placement)throw Error('error.invalid');return;}
    const s=account.data()||{},c=s[body.placement]||{},used=c.bucket===Math.floor(now/r.period)?c.used:0;
    if((s.pendingUntil||0)>now||(c.next||0)>now||(r.group==='fairy'&&(s.fairyNext||0)>now))throw Error('money.cooldown');
    if(r.limit&&used>=r.limit)throw Error('money.limit');
    t.create(ref,{uid,placement:body.placement,created:now,expires:now+900000,unit,verified:false});t.set(root,{pending:id,pendingUntil:now+900000},{merge:true});
   });res.json({id,skip:false});return;
  }
  if(path==='/commerce/ad/cancel'&&req.method==='POST'){
   if(typeof body.ticket!=='string'||!/^[a-f0-9]{64}$/.test(body.ticket))throw Error('error.invalid');
   const ref=db.doc('adTickets/'+body.ticket);await db.runTransaction(async t=>{const [ticket,account]=await Promise.all([t.get(ref),t.get(root)]);if(!ticket.exists||ticket.data()!.uid!==uid)throw Error('online.auth');if(account.data()?.pending===body.ticket)t.set(root,{pending:'',pendingUntil:0},{merge:true});});res.json({ok:true});return;
  }
  if(path==='/commerce/ad/complete'&&req.method==='POST'){
   if(typeof body.ticket!=='string'||!/^[a-f0-9]{64}$/.test(body.ticket)||body.proof!==body.ticket)throw Error('money.verification');
   const s=await db.doc('adTickets/'+body.ticket).get();if(!s.exists||s.data()!.uid!==uid||!s.data()!.verified)throw Error('money.verification');res.json({ok:true});return;
  }
  res.status(503).json({error:'money.storeUnavailable'});
 }catch(e){const key=(e as Error).message;res.status(400).json({error:/^(money|error|online)\./.test(key)?key:'online.serverError'});}
});
export const admobReward=onRequest(opts,async(req,res)=>{
 try{
  if(req.method!=='GET')throw Error('money.verification');
  const raw=req.originalUrl.split('?')[1]||'',p=await verifyGoogle(raw);
  const id=p.get('custom_data')||'',uid=p.get('user_id')||'',event=p.get('transaction_id')||'',timestamp=Number(p.get('timestamp'));
  if(isConsoleProbe(p)&&Number.isFinite(timestamp)&&Math.abs(Date.now()-timestamp)<300000){res.status(200).send('Verified console probe; no reward');return;}
  if(!/^[a-f0-9]{64}$/.test(id)||!uid||uid.includes('/')||!event||event.length>256||!Number.isFinite(timestamp)||Math.abs(Date.now()-timestamp)>86400000||![unit,unit.split('/')[1]].includes(p.get('ad_unit')||'')||Number(p.get('reward_amount'))!==1||p.get('reward_item')!=='Game reward')throw Error('money.verification');
  const ref=db.doc('adTickets/'+id),root=db.doc('adAccounts/'+uid),eventRef=db.doc('adEvents/'+createHash('sha256').update(event).digest('hex'));
  await db.runTransaction(async t=>{
   const [ticket,account,prior]=await Promise.all([t.get(ref),t.get(root),t.get(eventRef)]);
   if(prior.exists){if(prior.data()!.ticket!==id)throw Error('money.verification');return;}
   const s=ticket.data();if(!s||s.uid!==uid||s.unit!==unit||s.verified||timestamp<s.created-60000||timestamp>s.expires)throw Error('money.verification');
   const rule=rules[s.placement];if(!rule)throw Error('money.verification');const a=account.data()||{},c=a[s.placement]||{},bucket=Math.floor(timestamp/rule.period),used=c.bucket===bucket?c.used:0;
   if(rule.limit&&used>=rule.limit)throw Error('money.limit');
   const grant={id:'ad-'+id,kind:'ad',placement:s.placement,gems:s.placement==='fairy_diamond'?10:0,vipPoints:0,passUntil:0,boostUntil:s.placement==='mega_boost'?timestamp+14400000:0,goldSpreeUntil:s.placement==='fairy_gold_spree'?timestamp+300000:0,damageSpreeUntil:s.placement==='fairy_damage_spree'?timestamp+300000:0,acked:false};
   t.create(root.collection('grants').doc(grant.id),grant);t.create(eventRef,{ticket:id,uid,timestamp});t.update(ref,{verified:true,event});
   const update:any={[s.placement]:{bucket,used:used+1,next:timestamp+rule.cooldown}};
   if(a.pending===id){update.pending='';update.pendingUntil=0;}if(rule.group==='fairy')update.fairyNext=timestamp+rule.cooldown;t.set(root,update,{merge:true});
  });res.status(200).send('OK');
 }catch{res.status(403).send('Invalid reward');}
});
export {operations} from './operations';
