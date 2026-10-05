import {build} from 'esbuild';
await build({stdin:{contents:`export {initializeApp,getApps} from 'firebase/app';
export {getAuth,signInAnonymously,signInWithPopup,GoogleAuthProvider,linkWithPopup} from 'firebase/auth';
export {getFirestore,doc,runTransaction,getDocFromServer,serverTimestamp} from 'firebase/firestore';`,resolveDir:process.cwd()},outfile:'assets/scripts/vendor/firebase-sdk.js',bundle:true,platform:'browser',format:'esm',target:'es2020',minify:true,legalComments:'inline'});
