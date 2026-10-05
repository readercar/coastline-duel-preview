const {spawnSync}=require('node:child_process');
const path=require('node:path');
const tsc='/Applications/CocosCreator/Creator/3.8.8/CocosCreator.app/Contents/Resources/app.asar.unpacked/node_modules/typescript/bin/tsc';
function run(args){const r=spawnSync(process.execPath,args,{stdio:'inherit'});if(r.status)process.exit(r.status);}
run([tsc,'--project','tsconfig.json']);
run([tsc,'--target','ES2020','--module','commonjs','--strict','--skipLibCheck','--outDir','.test-output','assets/scripts/core/Game.ts','assets/scripts/core/Feedback.ts','assets/scripts/core/BattleFormation.ts','assets/scripts/core/PrototypeCheats.ts','assets/scripts/core/I18n.ts','assets/scripts/core/Online.ts']);
run(['--test','tests/core.test.cjs']);
run(['scripts/server.cjs','--compile-only']);
run(['--test','tests/server.test.cjs']);
