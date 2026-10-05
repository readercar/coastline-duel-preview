// Real project integration test using disposable private QA identities and data.
const assert=require('node:assert/strict'),fs=require('node:fs');
const {initializeApp}=require('../tools/firebase-admin.cjs')('firebase-admin/app');
const {getFirestore}=require('../tools/firebase-admin.cjs')('firebase-admin/firestore');
const {Game}=require('../.server-output/assets/scripts/core/Game.js');
const config=JSON.parse(fs.readFileSync('config/firebase-web.json'));
assert.equal(config.projectId,'ttsofts-tapwar');
initializeApp({credential:require('../tools/firebase-credential.cjs').credential(),projectId:config.projectId});
const db=require('../tools/firebase-credential.cjs').firestore(config.projectId),origin='https://asia-northeast3-ttsofts-tapwar.cloudfunctions.net/operations',users=[],mailIds=[];
async function signup(){const r=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+config.apiKey,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({returnSecureToken:true})});assert.equal(r.status,200);const value=await r.json();users.push(value);return value;}
async function request(user,path,data){const r=await fetch(origin+path,{method:data?'POST':'GET',headers:{'Content-Type':'application/json',...(user?{Authorization:'Bearer '+user.idToken}:{})},...(data?{body:JSON.stringify(data)}:{})});return {status:r.status,value:await r.json()};}
async function firestore(user,path,method='GET',data){return fetch(`https://firestore.googleapis.com/v1/projects/${config.projectId}/databases/(default)/documents/`+path,{method,headers:{Authorization:'Bearer '+user.idToken,'Content-Type':'application/json'},...(data?{body:JSON.stringify(data)}:{})});}
(async()=>{try{
 const policy=db.doc('operations/live');if(!(await policy.get()).exists)await policy.create(JSON.parse(fs.readFileSync('config/operations.json')));
 assert.equal((await request(null,'/operations')).status,200);assert.equal((await request(null,'/account/save')).status,401);
 const a=await signup(),b=await signup(),state=new Game().s;
 assert.equal((await request(a,'/account/save',{state,version:0,key:'qa-initial'})).value.version,1);
 assert.equal((await request(a,'/account/save',{state,version:0,key:'qa-stale'})).status,409);
 assert.equal((await firestore(b,'players/'+a.localId+'/backups/main')).status,403);
 assert.equal((await firestore(a,'operations/live','PATCH',{fields:{notices:{arrayValue:{values:[]}}}})).status,403);
 await request(a,'/operations/read',{id:'qa-private-notice'});await request(a,'/operations/read',{id:'qa-private-notice'});
 assert.deepEqual((await request(a,'/operations/reads')).value,['qa-private-notice']);assert.deepEqual((await request(b,'/operations/reads')).value,[]);
 const id='qa-private-'+Date.now();mailIds.push(id);const created=Date.now(),mail={id,recipient:a.localId,title:'Private QA',body:'Disposable integration fixture',created,expires:created+30*86400000,revoked:false,rewards:{gems:11,shards:3,dust:2,pet:0,petLevels:1}};await db.doc('mailRewards/'+id).create(mail);
 assert.equal((await request(b,'/operations/mail')).value.length,0);assert.equal((await request(b,'/operations/mail/claim',{id,version:0})).status,400);
 const claims=await Promise.all([request(a,'/operations/mail/claim',{id,version:1}),request(a,'/operations/mail/claim',{id,version:1})]);for(const c of claims){assert.equal(c.status,200);assert.equal(c.value.version,2);assert.equal(c.value.state.gems,state.gems+11);}
 const next=claims[0].value.state;next.gems+=1;await request(a,'/account/save',{state:next,version:2,key:'qa-later-save'});
 const retry=await request(a,'/operations/mail/claim',{id,version:1});assert.equal(retry.value.version,3);assert.equal(retry.value.state.gems,state.gems+12);
 await request(a,'/operations/mail/delete',{id});assert.equal((await request(a,'/operations/mail')).value.length,0);
 await request(a,'/operations/error',{id:'qa-redaction',code:'qa',message:'Bearer secret test@example.com https://example.com/secret',version:'0.1.0',platform:'web'});
 const error=await db.doc('clientErrors/'+a.localId+'-qa-redaction').get();assert.equal(error.data().message,'[redacted] [redacted] [redacted]');
 assert.equal((await firestore(b,'clientErrors/'+a.localId+'-qa-redaction')).status,403);assert.equal((await firestore(a,'clientErrors')).status,403);
 console.log('PASS Firebase: live policy, authentication, restore/save revision, UID isolation, notices, simultaneous single mail grant, retry current save, private deletion, diagnostic redaction.');
 fs.writeFileSync('docs/qa/pastel/firebase-verification.json',JSON.stringify({verifiedAt:new Date().toISOString(),project:config.projectId,function:origin,checks:['public policy','authenticated save','stale revision rejected','foreign save denied','policy writes denied','account notice receipts','private mail','simultaneous claim once','retry returns latest save','private delete','diagnostic scrub','foreign diagnostic denied','diagnostic list denied'],policy:(await policy.get()).data()},null,2)+'\n');
 }finally{
  for(const id of mailIds)await db.doc('mailRewards/'+id).delete();
  for(const u of users){await db.recursiveDelete(db.doc('players/'+u.localId));const errors=await db.collection('clientErrors').where('uid','==',u.localId).get();for(const d of errors.docs)await d.ref.delete();await fetch('https://identitytoolkit.googleapis.com/v1/accounts:delete?key='+config.apiKey,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({idToken:u.idToken})});}
 }
})().catch(e=>{console.error(e.message);process.exitCode=1;});
