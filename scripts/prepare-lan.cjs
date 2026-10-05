// Publish completed assets first and switch the entry page last. Keep old hashed
// assets so an already-open client can finish loading during the next publish.
const fs=require('node:fs'),path=require('node:path');
const src=path.resolve(process.argv[2]||'build/web-mobile');
const dst=path.resolve('.reference/lan-preview');
if(!fs.existsSync(path.join(src,'index.html')))throw Error('Complete a web build before publishing');
fs.mkdirSync(dst,{recursive:true});
for(const entry of fs.readdirSync(src))if(entry!=='index.html')fs.cpSync(path.join(src,entry),path.join(dst,entry),{recursive:true});
fs.copyFileSync(path.join(src,'index.html'),path.join(dst,'index.html.next'));
fs.renameSync(path.join(dst,'index.html.next'),path.join(dst,'index.html'));
console.log('LAN snapshot ready: '+dst);
