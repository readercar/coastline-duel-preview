const fs=require('node:fs');for(const name of ['LiveOps','Operations'])fs.copyFileSync('assets/scripts/core/'+name+'.ts','firebase/functions/src/shared/'+name+'.ts');
