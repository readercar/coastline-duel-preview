const {createServer}=require('node:http'),fs=require('node:fs'),path=require('node:path'),{randomBytes,createHash}=require('node:crypto');
const {validatePolicy}=require('../.server-output/assets/scripts/core/LiveOps.js');
const {validateMail,validId}=require('../.server-output/assets/scripts/core/Operations.js');
const token=randomBytes(32).toString('hex'),port=Number(process.env.TT_ADMIN_PORT||9040),target=process.env.TT_OPS_TARGET||'local';
let db,ops;if(target==='firebase'){
 const {initializeApp}=require('./firebase-admin.cjs')('firebase-admin/app');
 if(process.env.TT_FIREBASE_PROJECT!=='ttsofts-tapwar')throw Error('Set TT_FIREBASE_PROJECT=ttsofts-tapwar explicitly');
 initializeApp({credential:require('./firebase-credential.cjs').credential(),projectId:process.env.TT_FIREBASE_PROJECT});db=require('./firebase-credential.cjs').firestore(process.env.TT_FIREBASE_PROJECT);
}else if(target==='local'){
 const {Service}=require('../.server-output/server/Service.js'),{Operations}=require('../.server-output/server/Operations.js');const data=process.env.EMBER_DATA_DIR||'.local-server';fs.mkdirSync(data,{recursive:true});ops=new Operations(new Service(path.join(data,'development.sqlite')));
}else throw Error('Invalid target');
const policyPath=path.resolve(process.env.EMBER_OPERATIONS_FILE||'config/operations.json');
async function policy(){return validatePolicy(db?(await db.doc('operations/live').get()).data():JSON.parse(fs.readFileSync(policyPath,'utf8')));}
async function snapshot(){return {target,project:db?'ttsofts-tapwar':'local',policy:await policy(),mails:db?(await db.collection('mailRewards').get()).docs.map(d=>d.data()):ops.service.all('SELECT payload FROM operations_mail').map(r=>JSON.parse(r.payload)),errors:db?(await db.collection('clientErrors').orderBy('createdAt','desc').limit(100).get()).docs.map(d=>({id:d.id,...d.data()})):ops.errors()};}
async function push(v){if(!db)throw Error('Push is unavailable in local prototype mode');const p=await policy(),n=p.notices.find(n=>n.id===v.noticeId),locale=v.locale;if(!n||!['ko','en'].includes(locale)||typeof v.title!=='string'||!v.title.trim()||v.title.length>60||typeof v.body!=='string'||!v.body.trim()||v.body.length>500)throw Error('Invalid push');
 const hash=createHash('sha256').update(JSON.stringify({noticeId:n.id,locale,title:v.title,body:v.body})).digest('hex'),ref=db.doc('pushBroadcasts/'+n.id+'-'+hash);
 const send=await db.runTransaction(async t=>{const s=await t.get(ref);if(s.data()?.status==='sent')return false;if(s.data()?.status==='sending')throw Error('Already sending: inspect dispatch before retry');t.set(ref,{noticeId:n.id,locale,title:v.title,body:v.body,status:'sending',startedAt:Date.now()});return true;});if(!send)return {duplicate:true};
 try{const {getMessaging}=require('./firebase-admin.cjs')('firebase-admin/messaging');const id=await getMessaging().send({topic:'tapwar_notices_'+locale,notification:{title:v.title,body:v.body},data:{kind:'notice',noticeId:n.id},android:{ttl:86400000,notification:{channelId:'tapwar_notices',icon:'ic_stat_tapwar'}}});await ref.update({status:'sent',messageId:id,sentAt:Date.now()});return {sent:true};}catch(e){await ref.update({status:'failed',error:String(e.code||'send-failed').slice(0,100)});throw e;}
}
createServer(async(req,res)=>{
 res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','no-referrer');
 const expected='127.0.0.1:'+port;if(req.headers.host!==expected||req.headers.origin&&req.headers.origin!=='http://'+expected){res.writeHead(403);res.end();return;}
 try{if(req.url==='/'&&req.method==='GET'){res.setHeader('Content-Type','text/html;charset=utf-8');res.end(fs.readFileSync(path.join(__dirname,'admin.html'),'utf8').replace('__TOKEN__',token));return;}
 if(req.headers['x-admin-token']!==token){res.writeHead(403);res.end();return;}
 let raw='';for await(const chunk of req){raw+=chunk;if(raw.length>150000)throw Error('Request too large');}const value=raw?JSON.parse(raw):{};let result;
 if(req.method==='GET'&&req.url==='/state')result=await snapshot();
 else if(req.method==='POST'&&req.url==='/policy'){const p=validatePolicy(value);if(db)await db.doc('operations/live').set(p);else {fs.writeFileSync(policyPath+'.tmp',JSON.stringify(p,null,2)+'\n');fs.renameSync(policyPath+'.tmp',policyPath);}result=await policy();}
 else if(req.method==='POST'&&req.url==='/mail'){const m=validateMail(value);if(db)await db.runTransaction(async t=>{const r=db.doc('mailRewards/'+m.id),s=await t.get(r);if(s.exists&&!require('node:util').isDeepStrictEqual(s.data(),m))throw Error('Mail ID content conflict');if(!s.exists)t.create(r,m);});else ops.publish(m);result=m;}
 else if(req.method==='POST'&&req.url==='/revoke'){if(!validId(value.id))throw Error('Invalid ID');if(db)await db.doc('mailRewards/'+value.id).update({revoked:true});else ops.revoke(value.id);result={ok:true};}
 else if(req.method==='POST'&&req.url==='/push')result=await push(value);
 else {res.writeHead(404);res.end();return;}res.setHeader('Content-Type','application/json');res.end(JSON.stringify(result));
 }catch(e){res.writeHead(400,{'Content-Type':'application/json'});res.end(JSON.stringify({error:e.message}));}
}).listen(port,'127.0.0.1',()=>console.log('OutRun operations admin: http://127.0.0.1:'+port+' · '+target));
