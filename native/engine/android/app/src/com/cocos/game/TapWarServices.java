package com.cocos.game;
import android.app.Activity;
import org.json.JSONObject;
import com.cocos.lib.CocosHelper;
import com.cocos.lib.CocosJavascriptJavaBridge;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.FullScreenContentCallback;
import com.google.android.gms.ads.rewarded.RewardedAd;
import com.google.android.gms.ads.rewarded.RewardedAdLoadCallback;
import com.google.android.gms.ads.rewarded.ServerSideVerificationOptions;
import com.google.android.ump.UserMessagingPlatform;
import com.google.android.ump.ConsentRequestParameters;

public final class TapWarServices {
 private static Activity activity;
 private static boolean busy=false;
 private static final boolean LIVE_ADS_VERIFIED=false;
 private static final String TEST_UNIT="ca-app-pub-3940256099942544/5224354917";
 private static final String LIVE_UNIT="ca-app-pub-5359581077506683/9191178394";
 public static void attach(Activity a){activity=a; if(com.google.firebase.FirebaseApp.getApps(a).isEmpty())com.google.firebase.FirebaseApp.initializeApp(a,new com.google.firebase.FirebaseOptions.Builder().setApplicationId("1:721865585447:android:ff69e920f98bb3e2a6af02").setApiKey("AIzaSyB0M3fm_M1v_iNynkE5VkPXSrAfNcj9ohU").setProjectId("ttsofts-tapwar").build());}
 public static void detach(Activity a){if(activity==a)activity=null;}
 private static void reply(String id,JSONObject data){
  CocosHelper.runOnGameThread(()->CocosJavascriptJavaBridge.evalString("globalThis.tapWarNativeResult("+JSONObject.quote(id)+","+data.toString()+");"));
 }
 private static JSONObject data(String... values){JSONObject d=new JSONObject();try{for(int i=0;i<values.length;i+=2)d.put(values[i],values[i+1]);}catch(Exception ignored){}return d;}
 public static void authenticate(String id,String ignored){
  if(activity==null){reply(id,data("error","online.unreachable"));return;}
  activity.runOnUiThread(()->{FirebaseAuth auth=FirebaseAuth.getInstance();FirebaseUser u=auth.getCurrentUser();
   if(u!=null){token(id,u);return;}
   auth.signInAnonymously().addOnCompleteListener(task->{if(task.isSuccessful())token(id,auth.getCurrentUser());else reply(id,data("error","online.auth"));});
  });
 }
 private static void token(String id,FirebaseUser user){user.getIdToken(false).addOnCompleteListener(task->{if(task.isSuccessful())reply(id,data("uid",user.getUid(),"token",task.getResult().getToken()));else reply(id,data("error","online.auth"));});}
 public static void cloudLoad(String id,String ignored){
  FirebaseUser user=FirebaseAuth.getInstance().getCurrentUser();if(user==null){reply(id,data("error","online.auth"));return;}
  com.google.firebase.firestore.FirebaseFirestore.getInstance().document("players/"+user.getUid()+"/backups/main").get(com.google.firebase.firestore.Source.SERVER).addOnCompleteListener(task->{
   if(!task.isSuccessful()){reply(id,data("error","online.unreachable"));return;}
   backupReply(id,task.getResult().exists()?task.getResult().getLong("version"):0L,task.getResult().getString("payload"));
  });
 }
 private static void backupReply(String id,Long version,String payload){JSONObject d=new JSONObject();try{d.put("version",version==null?0:version);d.put("payload",payload==null?"":payload);}catch(Exception ignored){}reply(id,d);}
 public static void cloudSave(String id,String json){
  FirebaseUser user=FirebaseAuth.getInstance().getCurrentUser();if(user==null){reply(id,data("error","online.auth"));return;}
  final JSONObject p;try{p=new JSONObject(json);}catch(Exception e){reply(id,data("error","error.invalid"));return;}
  com.google.firebase.firestore.FirebaseFirestore db=com.google.firebase.firestore.FirebaseFirestore.getInstance();
  com.google.firebase.firestore.DocumentReference ref=db.document("players/"+user.getUid()+"/backups/main");
  db.runTransaction(tx->{com.google.firebase.firestore.DocumentSnapshot snap=tx.get(ref);Long version=snap.getLong("version");long current=version==null?0:version;
   if(current!=p.optLong("version"))throw new com.google.firebase.firestore.FirebaseFirestoreException("online.saveConflict",com.google.firebase.firestore.FirebaseFirestoreException.Code.ABORTED);
   java.util.Map<String,Object> backup=new java.util.HashMap<>();backup.put("version",current+1);backup.put("payload",p.optString("payload"));backup.put("updatedAt",com.google.firebase.firestore.FieldValue.serverTimestamp());tx.set(ref,backup);return null;
  }).addOnCompleteListener(task->{if(task.isSuccessful())reply(id,data("status","saved"));else reply(id,data("error",task.getException()!=null&&"online.saveConflict".equals(task.getException().getMessage())?"online.saveConflict":"online.unreachable"));});
 }
 public static void showRewarded(String id,String json){
  if(activity==null){reply(id,data("status","no-fill"));return;}
  activity.runOnUiThread(()->{
   if(busy){reply(id,data("error","money.busy"));return;}
   final JSONObject p;try{p=new JSONObject(json);if(p.getString("uid").isEmpty()||!p.getString("ticket").matches("[a-f0-9]{64}"))throw new Exception();}catch(Exception e){reply(id,data("error","money.verification"));return;}
   busy=true;
   com.google.android.ump.ConsentInformation consent=UserMessagingPlatform.getConsentInformation(activity);
   consent.requestConsentInfoUpdate(activity,new ConsentRequestParameters.Builder().build(),()->{
    UserMessagingPlatform.loadAndShowConsentFormIfRequired(activity,error->{if(!consent.canRequestAds()){finish(id,"no-fill");return;}MobileAds.initialize(activity,status->activity.runOnUiThread(()->load(id,p)));});
   },error->{if(consent.canRequestAds())MobileAds.initialize(activity,status->activity.runOnUiThread(()->load(id,p)));else finish(id,"no-fill");});
  });
 }
 private static void load(String id,JSONObject p){
  // Release remains disabled until live SSV and consent configuration have been verified.
  RewardedAd.load(activity,LIVE_ADS_VERIFIED?LIVE_UNIT:TEST_UNIT,new AdRequest.Builder().build(),new RewardedAdLoadCallback(){
   @Override public void onAdFailedToLoad(LoadAdError error){finish(id,"no-fill");}
   @Override public void onAdLoaded(RewardedAd ad){
    ad.setServerSideVerificationOptions(new ServerSideVerificationOptions.Builder().setUserId(p.optString("uid")).setCustomData(p.optString("ticket")).build());
    final boolean[] earned={false};
    ad.setFullScreenContentCallback(new FullScreenContentCallback(){
     @Override public void onAdDismissedFullScreenContent(){finish(id,earned[0]?"completed":"cancelled");}
     @Override public void onAdFailedToShowFullScreenContent(AdError error){finish(id,"no-fill");}
    });
    ad.show(activity,reward->earned[0]=true);
   }
  });
 }
 private static void finish(String id,String status){busy=false;reply(id,data("status",status));}
}
