// Reuse an existing local login. Never create or print a service-account key.
const {applicationDefault}=require('./firebase-admin.cjs')('firebase-admin/app');
exports.credential=()=>({async getAccessToken(){
 try{return await applicationDefault().getAccessToken();}
 catch(adcError){
  const auth=require('firebase-tools/lib/auth');
  const account=auth.getGlobalDefaultAccount();
  if(!account?.tokens?.refresh_token)throw Error('Firebase admin requires ADC or an existing firebase login');
  const value=await auth.getAccessToken(account.tokens.refresh_token,['https://www.googleapis.com/auth/cloud-platform','https://www.googleapis.com/auth/firebase']);
  return {access_token:value.access_token,expires_in:Math.max(60,Math.floor((value.expires_at-Date.now())/1000))||3600};
 }
}});
exports.firestore=projectId=>{
 const requireAdmin=require('./firebase-admin.cjs'),{Firestore}=requireAdmin('@google-cloud/firestore');
 const account=require('firebase-tools/lib/auth').getGlobalDefaultAccount();
 if(!account?.tokens?.refresh_token)return new Firestore({projectId});
 const {GoogleAuth,OAuth2Client}=requireAdmin('google-auth-library'),api=require('firebase-tools/lib/api');
 const client=new OAuth2Client(api.clientId(),api.clientSecret());
 client.setCredentials({refresh_token:account.tokens.refresh_token});
 return new Firestore({projectId,auth:new GoogleAuth({authClient:client})});
};
