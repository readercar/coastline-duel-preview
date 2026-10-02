const {spawnSync,spawn}=require('node:child_process');
const tsc='/Applications/CocosCreator/Creator/3.8.8/CocosCreator.app/Contents/Resources/app.asar.unpacked/node_modules/typescript/bin/tsc';
const args=[tsc,'--target','ES2020','--module','commonjs','--moduleResolution','node','--strict','--skipLibCheck','--types','node','--typeRoots','/Users/dhlee/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@types','--outDir','.server-output','server/main.ts'];
const r=spawnSync(process.execPath,args,{stdio:'inherit'});if(r.status)process.exit(r.status);
if(process.argv.includes('--compile-only'))process.exit(0);
const child=spawn(process.execPath,['.server-output/server/main.js'],{stdio:'inherit'});process.on('SIGINT',()=>child.kill('SIGINT'));child.on('exit',code=>process.exit(code||0));
