import fs from 'node:fs';
const c=JSON.parse(fs.readFileSync('config/firebase-web.json'));
async function signup(){const r=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+c.apiKey,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({returnSecureToken:true})});if(!r.ok)throw Error('Auth '+r.status);return r.json();}
const a=await signup(),b=await signup();
const root=`https://firestore.googleapis.com/v1/projects/${c.projectId}/databases/(default)/documents`;
const path=`players/${a.localId}/backups/main`;
async function call(user,url,method='GET',body){return fetch(root+url,{method,headers:{Authorization:'Bearer '+user.idToken,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})});}
const commit={writes:[{update:{name:`projects/${c.projectId}/databases/(default)/documents/${path}`,fields:{version:{integerValue:'1'},payload:{stringValue:'{"smoke":true}'}}},updateTransforms:[{fieldPath:'updatedAt',setToServerValue:'REQUEST_TIME'}],currentDocument:{exists:false}}]};
let r=await call(a,':commit','POST',commit);if(!r.ok)throw Error('Own write '+r.status+': '+await r.text());
r=await call(a,'/'+path);if(!r.ok)throw Error('Own read '+r.status);
r=await call(b,'/'+path);if(r.status!==403)throw Error('Foreign read accepted');
r=await call(a,'/commerce/forged','PATCH',{fields:{gems:{integerValue:'999'}}});if(r.status!==403)throw Error('Forged commerce accepted');
// Only delete our two disposable auth identities; private smoke backup remains as verification evidence.
for(const u of [a,b]){r=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:delete?key='+c.apiKey,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({idToken:u.idToken})});if(!r.ok)throw Error('Test identity cleanup failed');}
console.log('PASS Firebase: anonymous auth, owner write/read, foreign read denied, commerce forgery denied.');
