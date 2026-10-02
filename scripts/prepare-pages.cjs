const fs=require('node:fs');
if(!fs.existsSync('build/web-mobile/index.html'))throw Error('Build web-mobile first');
fs.cpSync('build/web-mobile','docs/web',{recursive:true});
console.log('Updated docs/web for GitHub Pages');
