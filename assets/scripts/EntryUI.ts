import {Node,Mask,ScrollView,UITransform,Label,sys} from 'cc';
import type {GameApp} from './GameApp';
import {UI} from './UITheme';
import {CONSENT_KEY,ConsentKind,consentReceipt,parseConsent} from './core/EntryPolicy';
import {FeedbackUI} from './FeedbackUI';
import {TutorialUI} from './TutorialUI';
import {requiresUpdate} from './core/LiveOps';

type Screen='title'|'consent'|'document'|'push'|'login'|'loading'|'error'|'game';
/** Entry owns authentication; no gameplay or account request runs before consent. */
export class EntryUI {
 screen:Screen='title'; document:ConsentKind='terms';read={terms:false,privacy:false};busy=false;progress=0;status='entry.loadAuth';error='';private reviewing=false;
 constructor(private a:GameApp){}
 get playing(){return this.screen==='game';}
 get accepted(){return !!parseConsent(sys.localStorage.getItem(CONSENT_KEY));}
 back(){if(this.reviewing){this.reviewing=false;this.a.close();return;}if(this.busy||this.playing)return;if(this.screen==='document'){this.screen='consent';this.a.draw();}else{this.screen='title';this.a.draw();}}
 reviewDocument(kind:ConsentKind){this.reviewing=true;this.document=kind;this.documentPanel();}
 language(locale:'ko'|'en'){this.a.game.s.locale=locale;this.a.game.persist();this.a.draw();}
 begin(){if(this.busy)return;if(!this.accepted){this.screen='consent';this.a.draw();}else this.afterConsent();}
 afterConsent(){if(this.a.liveOps.push.choice===null){this.screen='push';this.a.draw();}else void this.login('guest',false,true);}
 draw(){const a=this.a,H=a.designH;
  a.root=a.nodeAt(a.node,'EmberRoot',0,0,480,H);a.rect(a.root,0,0,480,H,UI.bg);
  const backdrop=a.nodeAt(a.root,'entry-world',0,0,480,H);backdrop.addComponent(Mask);a.ui.paint(a.nodeAt(backdrop,'forest',0,(H-Math.max(H,480))/2,Math.max(H,480),Math.max(H,480)),'world/0');
  a.polygon(a.root,0,H/2-151,480,260,[[-.5,.5],[.5,.5],[.5,-.18],[-.18,-.5],[-.5,-.33]],UI.bg,238);
  a.polygon(a.root,166,H/2-245,148,8,[[-.5,-.5],[.45,-.5],[.5,.5],[-.45,.5]],UI.violet);
  a.label(a.root,a.tr('game.name'),0,H/2-140,430,100,62,UI.text);a.label(a.root,a.tr('entry.subtitle'),0,H/2-207,426,40,18,UI.muted);
  a.ui.actor(a.nodeAt(a.root,'title-guardian',-18,-H/2+a.safeBottom+400,220,220),'guardian');a.ui.actor(a.nodeAt(a.root,'title-ally',148,-H/2+a.safeBottom+401,124,124),'rowen');a.ui.actor(a.nodeAt(a.root,'title-spirit',-145,-H/2+a.safeBottom+370,82,82),'ember-fox');
  a.polygon(a.root,0,-H/2+a.safeBottom+95,480,190,[[-.5,-.5],[.5,-.5],[.5,.28],[.12,.5],[-.5,.34]],UI.bg,242);
  a.ui.paint(a.nodeAt(a.root,'company-ci',0,-H/2+a.safeBottom+60,165,82.5),'branding');
  a.label(a.root,a.tr('entry.version',{version:a.liveOps.version}),0,-H/2+a.safeBottom+23,440,22,12,UI.text);
  const langs=a.nodeAt(a.root,'entry-language',0,H/2-37-a.safeTop,220,34);(['ko','en'] as const).forEach((l,i)=>a.button(langs,a.tr('locale.'+l),i?65:-65,0,120,32,()=>this.language(l),a.game.s.locale===l));
  if(this.screen==='title'){a.button(a.root,a.tr('entry.start'),0,-H/2+a.safeBottom+236,368,62,()=>this.begin(),true,{icon:'symbol:play',iconOnly:false,fontSize:22});a.label(a.root,a.tr('entry.titleHint'),0,-H/2+a.safeBottom+163,382,56,17,UI.text);return;}
  if(this.screen==='document'){this.documentPanel();return;}
  const height=this.screen==='consent'?590:this.screen==='push'?460:this.screen==='login'?500:390;
  const p=a.open(a.tr('entry.'+this.screen+'Title'),height,false);
  if(this.screen==='consent'){
   a.label(p,a.tr('entry.consentIntro'),0,159,372,90,18);
   (['terms','privacy'] as const).forEach((kind,i)=>{const n=a.button(p,a.tr('entry.required',{mark:this.read[kind]?'✓':'□',title:a.tr('consent.'+kind+'.title')}),0,54-i*102,370,60,()=>{this.document=kind;this.screen='document';a.draw();},this.read[kind]);n.name='consent-'+kind;a.label(p,a.tr('consent.'+kind+'.summary'),0,10-i*102,365,32,13,UI.muted);});
   const ready=this.read.terms&&this.read.privacy;
   a.button(p,a.tr(ready?'entry.agree':'entry.readBoth'),0,-181,370,56,()=>{if(!ready)return;try{sys.localStorage.setItem(CONSENT_KEY,JSON.stringify(consentReceipt()));this.afterConsent();}catch{a.toast(a.tr('error.storage'));}},ready,{style:ready?'primary':'disabled'});
   a.label(p,a.tr('entry.readHint'),0,-247,370,48,13,UI.muted);
  }else if(this.screen==='push'){
   a.ui.icon(a.nodeAt(p,'push-art',0,111,52,52),'mail');a.label(p,a.tr('entry.pushBody'),0,16,370,148,18);
   a.button(p,a.tr('ops.pushDecline'),-96,-143,178,54,()=>void this.choosePush(false));a.button(p,a.tr('ops.pushAllow'),96,-143,178,54,()=>void this.choosePush(true),true);
  }else if(this.screen==='login'){
   a.label(p,a.tr('entry.loginBody'),0,113,367,88,18);
   a.button(p,a.tr('entry.google'),0,17,370,58,()=>void this.login('google'),true);
   a.button(p,a.tr('entry.guest'),0,-61,370,58,()=>void this.login('guest'));
   a.label(p,a.tr('entry.guestWarning'),0,-161,368,97,14,UI.muted);
  }else if(this.screen==='loading'){
   a.label(p,a.tr(this.status),0,59,370,85,18);a.rect(p,0,-30,360,16,UI.line);if(this.progress>0)a.rect(p,-180+180*this.progress,-30,360*this.progress,16,UI.mint);a.label(p,a.tr('entry.percent',{value:Math.round(this.progress*100)}),0,-77,340,35,18);
  }else if(this.screen==='error'){
   a.label(p,a.tr(this.error),0,33,368,154,18);a.button(p,a.tr('entry.backLogin'),0,-123,370,54,()=>{this.screen='login';a.draw();},true);
  }
 }
 documentPanel(){const a=this.a,p=a.open(a.tr('consent.'+this.document+'.title'),Math.min(a.designH-70,840),false),h=p.getComponent(UITransform)!.height;
  const viewportH=h-210,view=a.nodeAt(p,'consent-scroll',0,18,388,viewportH);view.addComponent(Mask);
  const body=a.tr('consent.'+this.document+'.body'),bodyH=Math.max(viewportH,body.split('\n').reduce((sum,line)=>sum+Math.max(1,Math.ceil(line.length/(a.game.s.locale==='ko'?23:40)))*26,0)+38),content=a.nodeAt(view,'consent-content',0,viewportH/2,388,bodyH);content.getComponent(UITransform)!.setAnchorPoint(.5,1);
  const label=a.label(content,body,0,-14,362,bodyH-20,20,UI.text,Label.HorizontalAlign.LEFT);label.useSystemFont=true;label.fontFamily='sans-serif';label.isBold=false;label.lineHeight=29;label.verticalAlign=Label.VerticalAlign.TOP;label.overflow=Label.Overflow.RESIZE_HEIGHT;label.node.getComponent(UITransform)!.setAnchorPoint(.5,1);label.updateRenderData(true);
  const sv=view.addComponent(ScrollView);sv.content=content;sv.horizontal=false;let end=this.reviewing;
  const action=a.button(p,a.tr(this.reviewing?'action.close':'entry.readToEnd'),0,-h/2+51,370,54,()=>{if(!end)return;if(this.reviewing){this.back();return;}this.read[this.document]=true;this.screen='consent';a.draw();},false,{style:this.reviewing?'secondary':'disabled'});
  const caption=action.getComponentInChildren(Label)!;const check=()=>{if(this.reviewing)return;if(sv.getMaxScrollOffset().y<=1||sv.getScrollOffset().y>=sv.getMaxScrollOffset().y-18){end=true;caption.string=a.tr('entry.documentAgree');caption.color=a.color(UI.ink);a.ui.paint(action,'popup/primary',true);}};
  sv.node.on('scrolling',check);sv.node.on('scroll-ended',check);a.scheduleOnce(()=>{if(!p.isValid)return;label.updateRenderData(true);content.getComponent(UITransform)!.setContentSize(388,Math.max(viewportH,label.node.getComponent(UITransform)!.height+38));sv.scrollToTop(0);check();},0);a.button(p,a.tr('action.back'),161,h/2-37,60,38,()=>this.back(),false,{style:'quiet',fontSize:12});
 }
 async logout(){
  if(this.busy||this.a.operations.busy||this.a.remoteBusy||this.a.liveOps.checking){this.a.toast(this.a.tr('money.busy'));return;}
  this.busy=true;this.screen='loading';this.stage(.1,'entry.loadSave');
  try{
   await this.a.operations.save();
   await this.a.operations.endSession();
   sys.localStorage.removeItem('tapwar-login-method');
   this.screen='title';this.a.close();this.a.draw();
  }catch(e){this.screen='game';this.a.draw();this.a.toast(this.a.tr(/^(online|entry|error)\./.test((e as Error).message)?(e as Error).message:'online.unreachable'));}
  finally{this.busy=false;}
 }
 async choosePush(enabled:boolean){if(this.busy)return;this.busy=true;let selected=false;try{await this.a.liveOps.push.set(enabled,this.a.game.s.locale);selected=true;}catch{this.a.toast(this.a.tr('online.unreachable'));}finally{this.busy=false;}if(selected)this.afterConsent();}
 stage(progress:number,status:string){this.progress=progress;this.status=status;if(this.a.isValid)this.a.draw();}
 frame(){return new Promise<void>(resolve=>this.a.scheduleOnce(()=>resolve(),.1));}
 async login(method:'google'|'guest',allowSwitch=false,resume=false){if(this.busy||!this.accepted||this.a.liveOps.push.choice===null)return;this.busy=true;this.screen='loading';this.error='';this.stage(.08,'entry.loadAuth');
  try{
   await this.frame();
   if(resume){
    this.a.operations.useCloud=sys.localStorage.getItem('tapwar-login-method')==='google';
    const session=this.a.operations.local?(this.a.onlineService.token&&this.a.onlineService.accountId?'guest':null):await this.a.cloud.resume();
    if(!session){this.screen='login';this.a.draw();return;}method=session;
   }
   this.a.operations.useCloud=method==='google';
   if(!resume&&method==='google')await this.a.cloud.loginGoogle(allowSwitch);else if(this.a.operations.local)await this.a.onlineService.connect(this.a.tr('online.defaultName'));else if(!resume)await this.a.cloud.loginGuest();
   this.stage(.32,'entry.loadPolicy');await this.frame();const policy=await this.a.operations.policy();this.a.liveOps.policy=policy;
   if(requiresUpdate(policy,this.a.liveOps.platform,this.a.liveOps.version)){this.busy=false;this.screen='login';this.a.draw();this.a.liveOps.updatePanel();return;}
   this.stage(.54,'entry.loadSave');await this.frame();await this.a.operations.start(method==='google');
   this.stage(.88,'entry.loadReady');await this.frame();await this.a.operations.flushErrors();
   sys.localStorage.setItem('tapwar-login-method',method);this.a.feedback=new FeedbackUI(this.a);this.a.tutorial=new TutorialUI(this.a);this.a.enemyTransition=0;this.a.tab=0;this.a.folded=false;this.progress=1;this.screen='game';this.a.draw();
  }catch(e){const key=(e as Error).message;
   if(key==='ops.googleCollision'){this.busy=false;this.screen='login';this.a.draw();this.a.confirm(this.a.tr('entry.switchTitle'),this.a.tr('entry.switchBody'),()=>{this.a.close();void this.login('google',true);});return;}
   this.error=/^(ops|online|entry|error)\./.test(key)?key:'online.unreachable';this.screen='error';this.a.draw();
  }finally{this.busy=false;}
 }
}
