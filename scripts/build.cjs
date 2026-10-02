const {spawnSync}=require('node:child_process');
const editor='/Applications/CocosCreator/Creator/3.8.8/CocosCreator.app/Contents/MacOS/CocosCreator';
const r=spawnSync(editor,['--project',process.cwd(),'--build','configPath='+process.cwd()+'/config/build-web.json'],{stdio:'inherit'});
// Creator exits with code 36 for successful CLI builds; verify the output as well.
const fs=require('node:fs');if(![0,36].includes(r.status)||!fs.existsSync('build/web-mobile/index.html'))process.exit(r.status||1);
