const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const os=require('node:os');
// Serve an immutable prepared snapshot when rebuilding the project in parallel.
const snapshot=path.resolve(__dirname,'../.reference/lan-preview');
const root=path.resolve(process.env.TAPWAR_LAN_ROOT||(fs.existsSync(path.join(snapshot,'index.html'))?snapshot:path.resolve(__dirname,'../build/web-mobile')));
const port=Number(process.env.PORT||8880);
if(!fs.existsSync(path.join(root,'index.html')))throw Error('Run npm run build before sharing');
const mime={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.wasm':'application/wasm','.ttf':'font/ttf','.woff':'font/woff','.woff2':'font/woff2'};
const operationsPaths=new Set(['/account/save','/operations','/operations/reads','/operations/read','/operations/mail','/operations/mail/claim','/operations/mail/delete','/operations/error']);
http.createServer(async(req,res)=>{
 let name;try{name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400);res.end();return;}
 if(name.startsWith('/firebase-operations/')){
  const operation=name.slice('/firebase-operations'.length);
  if(!operationsPaths.has(operation)||!['GET','POST'].includes(req.method)){res.writeHead(404);res.end();return;}
  // Fixed upstream preserves Firebase authorization, UID and production save validation.
  // No browser cookies, arbitrary URL, API credentials or user-supplied forwarding headers.
  try{
   let data='';for await(const part of req){data+=part;if(Buffer.byteLength(data)>1000000){res.writeHead(413);res.end();return;}}
   const upstream=await fetch('https://asia-northeast3-ttsofts-tapwar.cloudfunctions.net/operations'+operation,{method:req.method,headers:{'Content-Type':'application/json',Authorization:String(req.headers.authorization||'')},...(req.method==='POST'?{body:data}:{}),signal:AbortSignal.timeout(15000)});
   res.writeHead(upstream.status,{'Content-Type':'application/json','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(await upstream.text());
  }catch{res.writeHead(502,{'Content-Type':'application/json'});res.end(JSON.stringify({error:'online.unreachable'}));}return;
 }
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return;}
 const file=path.resolve(root,'.'+(name==='/'?'/index.html':name));
 if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()||file.endsWith('.map')){res.writeHead(404);res.end();return;}
 res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
 if(req.method==='HEAD'){res.end();return;}
 let body=fs.readFileSync(file);if(file.endsWith('.js'))body=Buffer.from(body.toString().replace(/^\s*\/\/[#@]\s*sourceMappingURL=.*$/gm,''));
 if(file.endsWith('index.html'))body=Buffer.from(body.toString().replace('<head>','<head>\n<script>window.TAPWAR_OPERATIONS_BASE=window.location.origin+"/firebase-operations";</script>'));
 res.end(body);
}).listen(port,'0.0.0.0',()=>{
 console.log('tapWar LAN preview on port '+port);
 for(const [name,addresses] of Object.entries(os.networkInterfaces()))for(const address of addresses||[])if(address.family==='IPv4'&&!address.internal)console.log(name+': http://'+address.address+':'+port+'/');
});
