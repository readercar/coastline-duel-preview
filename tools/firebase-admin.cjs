// Resolve package exports from the isolated Functions dependency installation.
module.exports=require('node:module').createRequire(require('node:path').resolve(__dirname,'../firebase/functions/package.json'));
