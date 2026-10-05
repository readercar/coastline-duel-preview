const fs=require('node:fs');
if(!fs.existsSync('build/web-mobile/index.html'))throw Error('Build web-mobile first');
const api=process.env.EMBER_PUBLIC_API_BASE||'';
if(api){const u=new URL(api);if(u.protocol!=='https:'||u.username||u.password||u.hash||u.search)throw Error('Use a public HTTPS API endpoint without credentials');}
// Remove only this generated directory, so obsolete hashed bundles cannot linger.
fs.rmSync('docs/web',{recursive:true,force:true});
fs.cpSync('build/web-mobile','docs/web',{recursive:true});
// Public previews contain executable build assets, without source maps.
function cleanPublicBuild(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
 const file=require('node:path').join(dir,entry.name);
 if(entry.isDirectory()){cleanPublicBuild(file);continue;}
 if(entry.name.endsWith('.map')){fs.unlinkSync(file);continue;}
 if(/\.(js|css)$/.test(entry.name)){
  const source=fs.readFileSync(file,'utf8');
  const cleaned=source.replace(/^\s*\/\/[#@]\s*sourceMappingURL=.*$/gm,'').replace(/\/\*[#@]\s*sourceMappingURL=[\s\S]*?\*\//g,'').replace(/\s+$/,'')+'\n';
  if(source!==cleaned)fs.writeFileSync(file,cleaned);
 }
}}
cleanPublicBuild('docs/web');
fs.writeFileSync('docs/web/runtime-config.js','window.EMBER_API_BASE='+JSON.stringify(api)+';\n');
fs.writeFileSync('docs/web/build-info.json',JSON.stringify({name:'tapWar',version:require('../package.json').version,builtAt:new Date().toISOString(),engine:'Cocos Creator 3.8.8'},null,2)+'\n');
const path='docs/web/index.html';fs.writeFileSync(path,fs.readFileSync(path,'utf8').replace('<head>','<head>\n<script src="runtime-config.js"></script>'));
console.log('Updated docs/web for GitHub Pages; online service '+(api?'configured':'disabled; Firebase backups use the registered app configuration'));
