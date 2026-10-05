import { _decorator, Component, Node, UITransform, Graphics, Color, Label, isValid, Vec3, Layers, Mask, ScrollView, EventTouch, tween, Tween, UIOpacity, sys, view, screen, ResolutionPolicy, resources, Sprite, SpriteFrame, BlockInputEvents, Input, input, EventKeyboard, KeyCode, profiler, EditBox, Texture2D } from 'cc';
import {allyPosition,enemyPosition,waveSize,survivingEnemies,SOLDIER_SIZE} from './core/BattleFormation';
import {CheatUI} from './CheatUI';
import {FeedbackUI} from './FeedbackUI';
import { Game, Item } from './core/Game';
import { fmt, display, ratio, ZERO, add, mul } from './core/Amount';
import { HEROES, PETS, ARTIFACTS, SPELLS, SKILLS, CARDS } from './core/Config';
import { t } from './core/I18n';
import { ExpansionUI } from './ExpansionUI';
import { Monetization } from './core/Monetization';
import { MonetizationUI } from './MonetizationUI';
import { OperationsClient } from './OperationsClient';
import { LiveOpsUI } from './LiveOpsUI';
import {EntryUI} from './EntryUI';
import {TutorialUI} from './TutorialUI';
import {designHeight,tabUnlocked,TAB_STAGES,featureUnlocked,replayTutorial} from './core/EntryPolicy';
import { Online } from './core/Online';
import { FirebaseCloud } from './FirebaseCloud';
import { FirebaseCommerce, AdMobRewarded } from './NativeServices';
import { UI, UITheme, UIButtonOptions, CombatEffect, LEDGE_SURFACE_Y, GROUND_SURFACE_Y } from './UITheme';
const { ccclass } = _decorator;
const C = UI;
interface Row {
    unavailable?:()=>string|null;
    title: string;
    sub?: string;
    detail?: () => void;
    action?: string;
    click?: () => void;
    icon?: number;
    tint?: string;
    art?: string;
    locked?:boolean;
    buttonStyle?: UIButtonOptions['style'];
    metrics?: {icon:string;value:string;hint?:string}[];
    actionIcon?:string;
    actionHint?:string;
}
@ccclass('GameApp')
export class GameApp extends Component {
    ui = new UITheme();
    feedback = new FeedbackUI(this);
    private buttonStates:{node:Node;refresh:()=>void}[]=[];
    cloud = new FirebaseCloud();
    liveOps!: LiveOpsUI;
    operations!:OperationsClient;
    onlineService!: Online;
    payments!:MonetizationUI;
    remoteBusy = false;
    folded=false;
    entry!:EntryUI;
    tutorial!:TutorialUI;
    designH=960;
    safeTop=0;safeBottom=0;
    get heightExtra(){return (this.designH-960)/2;}
    resize=()=>{const size=screen.windowSize;this.designH=designHeight(size.width,size.height);view.setDesignResolutionSize(480,this.designH,ResolutionPolicy.SHOW_ALL);if(sys.isNative){const r=sys.getSafeAreaRect(false);this.safeBottom=Math.max(0,r.y);this.safeTop=Math.max(0,this.designH-r.y-r.height);}if(this.entry)this.draw();};
    battleCast!:Node;
    enemyLook = "";
    seenKills = 0;
    enemyTransition = 0;
    allies!: Node;
    footholds!: Node;
    allySignature = '';

    competitionId = 0;
    extensions!:ExpansionUI;
    game!: Game;
    root!: Node;
    panel!: Node;
    modal: Node | null = null;
    toastNode: Node | null = null;
    tab = 0;
    mode = 1;
    shopTab = 0;
    filter = -1;
    refresh = 0;
    saveClock = 0;
    lastRevision = -1;
    tx = 0;
    age = 0;
    hpFill!: Node;
    hpLabel!: Label;
    stageLabel!: Label;
    stageNeighbors:Label[]=[];
    goldLabel!: Label;
    gemsLabel!: Label;
    damageLabel!: Label;
    manaLabel!: Label;
    progressLabel!: Label;
    enemyLabel!: Label;
    enemy!: Node;
    actor!: Node;
    spellLabels: Label[] = [];
    spellShown:number[]=[];
    particles!: Node;
    bossButton!: Node;
    fairy!: Node;
    equipmentPile!:Node;
    modalRefresh: (() => void) | null = null;
    draft: number[] = [];
    audioContext: any = null;
    private browserError=(event:ErrorEvent)=>this.operations?.report('runtime',Error(event.message));
    private browserRejection=(event:PromiseRejectionEvent)=>this.operations?.report('promise',event.reason);
    tr(key: string, args: Record<string, string | number> = {}): string { return t(this.game.s.locale, key, args); }
    id(kind: string): string { return `${kind}:${Date.now()}:${++this.tx}`; }
    cheats=new CheatUI(this);
    async onLoad(): Promise<void> {
        this.resize();view.setResizeCallback(this.resize);
        profiler.hideStats();
        await this.ui.load();
        if (!this.isValid) return;
        this.game = new Game(sys.localStorage);this.extensions=new ExpansionUI(this);
        this.onlineService = new Online(sys.localStorage);this.payments=new MonetizationUI(this,new Monetization(this.game,sys.isNative&&sys.os===sys.OS.ANDROID?new FirebaseCommerce(sys.localStorage):this.onlineService));
        if(sys.isNative&&sys.os===sys.OS.ANDROID)this.payments.model.ads=new AdMobRewarded(this.payments.model.online as FirebaseCommerce);
        this.operations=new OperationsClient(this);this.liveOps=new LiveOpsUI(this);
        this.entry=new EntryUI(this);this.tutorial=new TutorialUI(this);this.draw();
        input.on(Input.EventType.KEY_DOWN, this.key, this);if(typeof window!=='undefined'){window.addEventListener('error',this.browserError);window.addEventListener('unhandledrejection',this.browserRejection);}

    }
    onDestroy(): void { view.setResizeCallback(()=>{}); if(typeof window!=='undefined'){window.removeEventListener('error',this.browserError);window.removeEventListener('unhandledrejection',this.browserRejection);}input.off(Input.EventType.KEY_DOWN, this.key, this); this.game?.persist(); }
    key(e: EventKeyboard): void { if(!this.entry.playing){if(e.keyCode===KeyCode.ESCAPE)this.entry.back();return;}if (e.keyCode === KeyCode.ESCAPE)
        this.close(); if (e.keyCode === KeyCode.SPACE && !this.modal)
        this.attack(); }
    color(hex: string, alpha = 255): Color { const c = new Color(); Color.fromHEX(c, hex); c.a = alpha; return c; }
    nodeAt(parent: Node, name: string, x: number, y: number, w: number, h: number): Node { const n = new Node(name); n.layer = Layers.Enum.UI_2D; n.parent = parent; n.setPosition(x, y); n.addComponent(UITransform).setContentSize(w, h); return n; }
    polygon(parent:Node,x:number,y:number,w:number,h:number,points:number[][],fill:string,alpha=255):Node {
        const n=this.nodeAt(parent,'ink-surface',x,y,w,h);this.ui.polygon(n,points.map(p=>[p[0]*w,p[1]*h]),fill,alpha);return n;
    }
    get tabTone():string{return [C.ember,C.blue,C.violet,C.mint,C.violet,C.gold][this.tab];}
    rect(parent:Node,x:number,y:number,w:number,h:number,fill:string,border?:string,alpha=255):Node {
        const n=this.nodeAt(parent,'shape',x,y,w,h),popup=alpha===255?this.ui.popupSurface(parent,fill,w,h):null,skin=alpha===255?this.ui.skin(fill,border,w,h):null;
        const painted=popup?this.ui.paint(n,popup,true,255,this.ui.map(fill)):skin?this.ui.paint(n,'skins/'+skin,true,255,this.ui.map(fill)):false;
        if(!painted)this.ui.polygon(n,[[-w/2,-h/2],[w/2,-h/2],[w/2,h/2],[-w/2,h/2]],this.ui.map(fill),alpha);
        if(border){const edge=this.nodeAt(n,'contrast-edge',0,0,w,h).addComponent(Graphics);edge.strokeColor=this.color(this.ui.map(border),alpha);edge.lineWidth=1;edge.rect(-w/2+.5,-h/2+.5,w-1,h-1);edge.stroke();}
        return n;
    }
    label(parent: Node, text: string, x: number, y: number, w: number, h: number, size = 18, color = C.text, align = Label.HorizontalAlign.CENTER): Label {
        const n = this.nodeAt(parent, 'text', x, y, w, h), l = n.addComponent(Label);
        // Font assignment updates Cocos text immediately; constrain it before changing the font.
        l.overflow = Label.Overflow.SHRINK;
        l.useSystemFont=true;l.fontFamily='Arial, sans-serif';l.isBold=true;
        // Keep the display face for the large title; compact UI needs clear counters and Hangul.
        if(size>=36&&this.ui.font){l.font=this.ui.font;l.useSystemFont=false;}
        l.fontSize = Math.max(14,size); l.lineHeight = Math.round(Math.max(14,size) * 1.25); l.color = this.color(this.ui.textColor(parent,color));
        l.horizontalAlign = align; l.verticalAlign = Label.VerticalAlign.CENTER; l.enableWrapText = true; l.string = text;
        n.getComponent(UITransform)!.setContentSize(w,h);
        return l;
    }
    button(parent: Node, text: string, x: number, y: number, w: number, h: number, action: () => void, accent = false, options: UIButtonOptions = {}): Node {
        const quiet = ['action.cancel','action.back','action.close','action.reset','action.revert'].some(key => text === this.tr(key)) || text === '×';
        const style = options.style || (quiet ? 'quiet' : accent ? 'primary' : 'secondary');
        const symbols:Record<string,string>={'action.confirm':'symbol:check','action.cancel':'symbol:close','action.close':'symbol:close','action.back':'symbol:back','action.next':'symbol:next','action.previous':'symbol:back','action.upgrade':'symbol:plus','action.equip':'symbol:check','action.equipped':'symbol:check','action.selected':'symbol:check','action.select':'symbol:check','action.sell':'face:gems','action.lock':'lock','action.locked':'lock','action.claim':'chest','action.claimed':'symbol:check','action.open':'symbol:next','action.details':'symbol:info','action.apply':'symbol:check','action.buy':'symbol:bag','action.attack':'sword','equipment.craft':'symbol:hammer','equipment.sets':'armor','equipment.bulk':'face:gems','equipment.transmog':'symbol:eye','pet.hatch':'egg','artifact.salvage':'symbol:hammer','extra.heroSkill':'lightning','extra.ascend':'symbol:up','layout.collapse':'symbol:down','layout.expand':'symbol:up','layout.upgrade':'symbol:plus','money.watch':'symbol:play'};
        const key=Object.keys(symbols).find(key=>this.tr(key)===text),icon=options.icon||(text==='×'?'symbol:close':key?symbols[key]:undefined),iconOnly=options.iconOnly??(text==='×'||key==='layout.collapse'||key==='layout.expand');
        const claimable=text===this.tr('action.claim');
        if(claimable)options={...options,tone:C.gold};
        const n = this.nodeAt(parent,'ui-button',x,y,w,h);
        n.name = 'ui-button';
        this.ui.paint(n,'popup/' + style,true,255,options.tone);
        const bright=['primary','selected','danger'].includes(style),ink=options.tone?[C.ember,C.mint,C.violet,C.danger,C.bg,C.panel,C.sand].includes(options.tone)?C.text:C.ink:style==='disabled'?C.muted:C.text;
        if(style==='secondary')this.polygon(n,-w/2+6,0,3,h-12,[[-.5,-.5],[.5,-.35],[.5,.5],[-.5,.35]],this.tabTone);
        const stacked=!!icon&&!iconOnly&&w<140&&h>=48,iconSize=iconOnly?Math.min(36,h-12):stacked?20:24;
        if(icon)this.ui.icon(this.nodeAt(n,'button-art-icon',iconOnly||stacked?0:-w/2+24,stacked?10:0,iconSize,iconSize),icon,ink);
        const label = this.label(n,iconOnly?'':text===this.tr('action.claim')?this.tr('action.claimReady'):text,icon&&!iconOnly&&!stacked?17:0,stacked?-13:0,
            w-(icon&&!iconOnly&&!stacked?60:20),stacked?23:h-10,stacked?14:(options.fontSize||18),ink);
        label.node.name = 'button-label';
        const edge=this.nodeAt(n,'button-outline',0,0,w,h).addComponent(Graphics);edge.lineWidth=1.5;edge.strokeColor=this.color(claimable?C.gold:'#929889');edge.moveTo(-w/2+8,-h/2+2);edge.lineTo(w/2-2,-h/2+2);edge.lineTo(w/2-8,h/2-2);edge.lineTo(-w/2+2,h/2-2);edge.close();edge.stroke();
        const unavailable=options.unavailable||(text===this.tr('action.claimed')?()=>this.tr('action.alreadyClaimed'):style==='disabled'?()=>text===this.tr('action.sell')?this.tr('equipment.protected'):options.hint||this.tr('error.locked'):null);
        if(unavailable){
            let last:boolean|null=null;const refresh=()=>{const blocked=!!unavailable();if(last===blocked)return;last=blocked;this.ui.paint(n,'popup/'+(blocked?'disabled':style==='disabled'&&options.unavailable?'primary':style),true,255,blocked?'#444852':options.tone);if(text===this.tr('action.claim'))label.string=this.tr(blocked?'action.notReady':'action.claimReady');label.color=this.color(blocked?'#c2c5cc':style==='disabled'?C.text:ink);const art=n.getChildByName('button-art-icon');if(art){const opacity=art.getComponent(UIOpacity)||art.addComponent(UIOpacity);opacity.opacity=blocked?115:255;}};
            this.buttonStates.push({node:n,refresh});refresh();
        }
        this.touchAction(n,()=>{const reason=unavailable?.();if(reason){this.denied(n,reason);return;}action();},options.hint||(iconOnly?text:''));
        this.tutorial?.register(n,text,options.hint||'',style);
        return n;
    }
    denied(node:Node,reason:string):void {
        this.toast(reason);this.sound(110);
        if(this.game.s.extra.effects&&isValid(node,true)){const origin=node.position.clone();Tween.stopAllByTarget(node);tween(node).by(.045,{position:new Vec3(-5,0,0)}).by(.06,{position:new Vec3(9,0,0)}).to(.08,{position:origin}).start();}
    }
    needReason(name:string,owned:number,cost:number):string|null {return owned>=cost?null:this.tr('action.insufficient',{currency:name,owned:display(owned),cost:display(cost)});}
    costReason(currency:'gold'|'gems'|'relics'|'shards'|'dust'|'souls'|'geodes'|'mementos',cost:number):string|null {
        const owned=currency==='gold'?this.game.s.run.gold:this.game.s[currency];if(owned+1e-10>=cost)return null;
        const log=currency==='gold'||currency==='relics'||currency==='mementos';return this.tr('action.insufficient',{currency:this.tr('feedback.'+currency),owned:log?this.format(owned):display(owned),cost:log?this.format(cost):display(cost)});
    }
    spellReason(id:number):string|null {
        const r=this.game.s.run,c=SPELLS[id];if(r.master<c.unlock)return this.tr('action.needLevel',{level:c.unlock});
        const multi=id!==0&&r.spells[id]>0&&r.master>=500&&r.stacks[id]<3;
        if(r.cooldowns[id]>0&&!multi)return this.tr('action.waitSeconds',{seconds:Math.ceil(r.cooldowns[id])});
        const cost=this.game.spellMana(id)*(multi?r.stacks[id]+1:1);return r.mana<cost?this.tr('action.insufficient',{currency:this.tr('action.mana'),owned:Math.floor(r.mana),cost}):null;
    }
    levelReason(hero:number):string|null {
        if(hero>=0&&this.game.s.maxStage<HEROES[hero].unlock)return this.tr('hero.locked',{stage:HEROES[hero].unlock});
        return this.costReason('gold',this.game.upgradeCost(hero,this.mode===-1?1:this.mode));
    }
    touchAction(n:Node,action:()=>void,hint=''):void {
        let held=false;const reveal=()=>{if(isValid(n,true)&&hint){held=true;this.toast(hint);}};
        const rest=n.position.clone(),press=()=>{if(n.name==='ui-button'){Tween.stopAllByTarget(n);tween(n).to(.07,{position:new Vec3(rest.x+1,rest.y-2,rest.z)}).start();}},release=()=>{if(n.name==='ui-button'){Tween.stopAllByTarget(n);n.setPosition(rest);}};
        n.on(Node.EventType.TOUCH_START,()=>{held=false;press();if(hint)this.scheduleOnce(reveal,.55);});
        n.on(Node.EventType.TOUCH_CANCEL,()=>{this.unschedule(reveal);release();});
        n.on(Node.EventType.TOUCH_END,(e:EventTouch)=>{this.unschedule(reveal);release();e.propagationStopped=true;if(!held&&!this.operations?.busy){const receipt=this.tutorial?.beforeAction(n),before=this.feedback.snapshot();action();if(this.game.notice)this.flushNotice();if(receipt)this.tutorial.afterAction(receipt);if(!this.remoteBusy&&!this.feedback.asyncPending)this.feedback.finish(before);}});
    }
    metric(parent:Node,icon:string,value:string,x:number,y:number,w=110,hint=''):Node {
        const n=this.nodeAt(parent,'metric',x,y,w,30);this.ui.icon(this.nodeAt(n,'metric-icon',-w/2+14,0,22,22),icon,this.ui.textColor(parent,C.muted));this.label(n,value,11,0,w-32,28,18,C.text,Label.HorizontalAlign.LEFT);
        if(hint)this.touchAction(n,()=>this.toast(hint),hint);return n;
    }
    stopTweens(n:Node):void {Tween.stopAllByTarget(n);for(const child of n.children)this.stopTweens(child);}
    draw():void {
        this.modal=null;this.modalRefresh=null;this.toastNode=null;
        this.node.children.filter(n=>n.name==='EmberRoot').forEach(n=>{this.stopTweens(n);n.removeFromParent();if(isValid(n,true))n.destroy();});
        if(!this.entry.playing){this.entry.draw();return;}
        this.root=this.nodeAt(this.node,'EmberRoot',0,0,480,this.designH);this.rect(this.root,0,0,480,this.designH,C.bg);
        const hud=this.nodeAt(this.root,'hud',0,this.heightExtra-this.safeTop,480,156),lower=this.nodeAt(this.root,'lower-ui',0,-this.heightExtra+this.safeBottom,480,550);
        this.seenKills=this.game.s.totalKills;this.enemyTransition=0;this.allySignature='';this.world();
        this.polygon(hud,0,414,480,132,[[-.5,.5],[.5,.5],[.5,-.35],[.18,-.5],[-.5,-.32]],C.bg,245);
        const settings=this.button(hud,'',-210,451,38,38,()=>this.settings(),false,{style:'quiet'});this.ui.icon(this.nodeAt(settings,'settings-icon',0,0,30,30),'settings');
        const menu=this.button(hud,'',-164,451,38,38,()=>this.menu(),false,{style:'quiet',hint:this.tr('menu.title')});this.ui.icon(this.nodeAt(menu,'menu-icon',0,0,26,26),'symbol:bag',C.text);
        this.button(hud,this.tr('cheat.short'),-115,451,48,32,()=>this.cheats.open(),false,{style:'quiet',fontSize:13});
        this.stageNeighbors=[];[-1,1].forEach((offset,i)=>{const n=this.nodeAt(hud,'nearby-stage',i?66:-66,447,40,32);this.stageNeighbors.push(this.label(n,String(Math.max(1,this.game.s.run.stage+offset)),0,0,32,30,16,C.muted));});
        this.polygon(hud,-35,447,8,16,[[-.5,-.5],[.5,0],[-.5,.5]],C.blue);this.polygon(hud,35,447,8,16,[[-.5,-.5],[.5,0],[-.5,.5]],C.blue);
        const stage=this.polygon(hud,0,447,51,47,[[0,-.5],[.5,0],[0,.5],[-.5,0]],C.paper);this.stageLabel=this.label(stage,'',0,0,42,38,21,C.ink);
        this.bossButton=this.button(hud,this.tr('battle.fight'),180,442,111,44,()=>this.game.toggleBoss(),false,{style:'danger'});
        this.rect(hud,0,400,284,10,C.sand);this.hpFill=this.nodeAt(hud,'health',-140,400,280,8);this.hpFill.getComponent(UITransform)!.setAnchorPoint(0,.5);this.rect(this.hpFill,140,0,280,8,C.danger);
        this.enemyLabel=this.label(hud,'',-30,415,206,18,14,C.text,Label.HorizontalAlign.LEFT);
        this.hpLabel=this.label(hud,'',116,415,74,18,14,C.text);
        this.progressLabel=this.label(hud,'',-113,381,110,20,12,C.text);
        this.goldLabel=this.label(hud,'',118,375,148,30,24,UI.brightGold);this.coin(hud,34,375,11);
        this.battleCast=this.nodeAt(this.root,'battle-cast',0,(this.folded?-300:0)-this.heightExtra+this.safeBottom,480,600);this.battleCast.setSiblingIndex(2);
        this.enemy=this.nodeAt(this.battleCast,'sentinel',0,0,480,350);this.enemy.addComponent(UIOpacity);this.populateEnemies();
        this.footholds=this.nodeAt(this.battleCast,'ally-footholds',0,30,480,500);
        this.footholds.getComponent(UITransform)!.setAnchorPoint(.5,53/500);this.footholds.addComponent(Mask);this.footholds.setSiblingIndex(0);
        this.allies=this.nodeAt(this.battleCast,'allies',0,0,480,500);this.syncAllies();
        this.actor=this.nodeAt(this.battleCast,'guardian',-64,12,SOLDIER_SIZE,SOLDIER_SIZE);this.guardian(this.actor);this.actor.getComponent(UITransform)!.setAnchorPoint(.5,6/192);this.actor.setScale(1,1,1);
        const battleBottom=(this.folded?-337:-39)-this.heightExtra+this.safeBottom+16;
        const target=this.nodeAt(this.root,'battle-input',0,(this.designH/2-120+battleBottom)/2,470,this.designH/2-battleBottom-120);target.on(Node.EventType.TOUCH_END,()=>{if(!this.modal)this.attack();});
        this.fairy=this.button(lower,this.tr('action.claimReady'),-172,308,120,34,()=>this.payments.fairy(),true,{icon:'chest',fontSize:14,tone:C.gold});
        this.equipmentPile=this.button(lower,'',-172,264,120,34,()=>this.extensions.equipmentDrops(),true,{tone:C.gold});
        const edge=this.folded?-337:-39;
        this.polygon(lower,0,edge,480,32,[[-.5,.15],[.2,.15],[.24,.5],[.5,.5],[.5,-.5],[-.5,-.5]],C.bg);this.button(lower,this.tr(this.folded?'layout.expand':'layout.collapse'),171,edge,128,30,()=>this.setFolded(!this.folded),false,{fontSize:12,style:'secondary',tone:C.paper});
        this.rect(lower,0,edge-26,480,28,C.bg);this.ui.icon(this.nodeAt(lower,'tap-icon',-216,edge-26,22,22),'symbol:hand',C.mint);this.damageLabel=this.label(lower,'',-130,edge-26,139,24,18,C.text,Label.HorizontalAlign.LEFT);this.gemsLabel=this.label(lower,'',199,edge-26,67,24,18,C.violet);this.ui.face(this.nodeAt(lower,'gems-icon',157,edge-26,24,24),'gems');
        this.manaLabel=this.label(lower,'',70,edge-26,146,24,16,C.text);this.manaLabel.node.active=this.folded;
        this.spellLabels=[];this.spellShown=[];
        if(this.folded){const next=this.game.s.spellSlots.find(id=>this.game.s.run.master<SPELLS[id].unlock),shown=this.game.s.spellSlots.filter(id=>this.game.s.run.master>=SPELLS[id].unlock||id===next);shown.forEach((id,i)=>{const ready=this.game.s.run.master>=SPELLS[id].unlock,n=this.button(lower,'', (i-(shown.length-1)/2)*80,-400,73,60,()=>{if(!ready){this.info(this.tr('unlock.title'),this.tr('spell.detail',{level:this.game.s.run.spellLevels[id],unlock:SPELLS[id].unlock,mana:this.game.spellMana(id)}));return;}if(this.game.cast(id))this.spark(0,95,C.violet);this.flushNotice();},false,{unavailable:()=>this.spellReason(id)});const art=this.nodeAt(n,'spell-art',0,9,28,28);this.ui.icon(art,['lightning','heart','adventurer','sword','flag','scroll'][i]);if(!ready){art.addComponent(UIOpacity).opacity=65;this.lockIcon(n,24,15);}this.spellShown.push(id);this.spellLabels.push(this.label(n,'',0,-20,70,22,10));});}
        else {
            this.rect(lower,0,-105,480,56,C.bg);
            const actions=[()=>this.cards(),()=>this.skills(),()=>this.achievements(),()=>this.extensions.inbox()];
            ['menu.cards','master.skills','menu.achievements','menu.inbox'].map((key,i)=>({key,i})).filter(({i})=>this.game.s.maxStage>=[100,50,1,1][i]).forEach(({key,i},j)=>{const n=this.nodeAt(lower,'shortcut',-195+j*80,-105,76,54);this.ui.surface(n,C.panel,'cut');this.touchAction(n,actions[i],this.tr(key));this.hudIcon(this.nodeAt(n,'quick-icon',0,0,40,40),i+6,[C.blue,C.ember,C.gold,C.text][i]);});
            this.button(lower,'×'+(this.mode===-1?'∞':this.mode),164,-105,134,40,()=>{this.mode=[1,10,100,-1][([1,10,100,-1].indexOf(this.mode)+1)%4];this.draw();},false,{style:'quiet',hint:this.tr('master.buyMode',{count:this.mode===-1?this.tr('action.max'):this.mode})});
        }
        this.panel=this.nodeAt(lower,'paper-menu',0,-283,480,300);this.panel.active=!this.folded;
        this.particles=this.nodeAt(this.root,'effects',0,(this.folded?-300:0)-this.heightExtra+this.safeBottom,480,this.designH);
        this.drawPanel();this.drawNav();this.updateHUD();this.tutorial.draw();
    }
    worldKey = -1;
    world():void {this.worldKey=Math.floor((this.game.s.run.stage-1)/25)%4;const old=this.root.getChildByName('world-art');if(old){old.removeFromParent();if(isValid(old,true))old.destroy();}const bottom=(this.folded?-337:-39)-this.heightExtra+this.safeBottom,h=this.designH/2-bottom,n=this.nodeAt(this.root,'world-art',0,(this.designH/2+bottom)/2,480,h);n.setSiblingIndex(1);n.addComponent(Mask);const size=Math.max(480,h);this.ui.paint(this.nodeAt(n,'world-cover',0,(size-h)/2,size,size),'world/'+this.worldKey);}
    setFolded(value:boolean):void {if(value===this.folded)return;this.folded=value;this.draw();const end=this.battleCast.position.y;this.battleCast.setPosition(0,(value?0:-300)-this.heightExtra+this.safeBottom);tween(this.battleCast).to(.22,{position:new Vec3(0,end,0)}).start();this.tutorial.event(value?'fold':'unfold');}
    lockIcon(parent:Node,x=0,y=0):void {const n=this.nodeAt(parent,'lock',x,y,16,20),g=n.addComponent(Graphics);g.strokeColor=this.color(C.muted);g.fillColor=this.color(C.muted);g.lineWidth=2;g.rect(-4,2,8,7);g.stroke();g.rect(-7,-9,14,13);g.fill();g.fillColor=this.color(C.panel);g.rect(-1,-6,2,6);g.fill();}
    pixels(parent: Node, rows: string[], palette: Record<string, string>, scale: number): void { const g = parent.addComponent(Graphics), w = rows[0].length, h = rows.length; rows.forEach((row, y) => row.split('').forEach((c, x) => { if (palette[c]) {
        g.fillColor = this.color(palette[c]);
        g.rect((x - w / 2) * scale, (h - y) * scale - h * scale / 2, scale, scale);
        g.fill();
    } })); }
    enemyArt():string {const keys=this.game.s.run.boss?['tree-boss','ice-boss','crystal-boss','golem']:['forest-wolf','spectral-knight','skeleton','flame-spirit'];return keys[this.game.s.totalKills%keys.length];}
    sentinel(parent:Node):void {this.ui.resize(parent,this.game.s.run.boss?76:40,this.game.s.run.boss?76:40);parent.getComponent(UITransform)!.setAnchorPoint(.5,6/192);this.ui.actor(parent,this.enemyArt());}
    guardian(parent:Node):void {this.ui.resize(parent,SOLDIER_SIZE,SOLDIER_SIZE);this.ui.actor(parent,'guardian');}
    appearanceTint(slot:number,fallback:string):string{const value=this.game.s.appearance[slot];return value<0?fallback:[C.gold,C.ember,C.blue,C.violet,C.mint][value%5];}
    enemyKey():string{return `${this.game.s.totalKills}:${this.game.s.run.boss}:${Math.floor((this.game.s.run.stage-1)/25)}`;}
    syncEnemyDeath():void {
        if(this.game.s.totalKills===this.seenKills)return;
        this.seenKills=this.game.s.totalKills;this.enemyTransition=.65;
        for(const missile of [...this.particles.children])if(missile.name==='ally-projectile'){Tween.stopAllByTarget(missile);if(isValid(missile,true))missile.destroy();}
        const defeated=this.enemy;Tween.stopAllByTarget(defeated);const opacity=defeated.getComponent(UIOpacity)!;Tween.stopAllByTarget(opacity);
        tween(defeated).delay(.14).call(()=>{if(defeated.isValid)defeated.active=false;}).start();
        tween(opacity).to(.14,{opacity:0}).start();
        this.enemy.children.filter(n=>n.active).forEach(n=>this.bulletImpact(n.position.x,n.position.y+20));
        this.sound(95);this.updateHUD();
    }
    populateEnemies():void {
        const count=waveSize(this.game.s.run.stage,this.game.s.run.boss);
        // A wave shares the existing combat HP/reward budget; no extra currency is minted by the visuals.
        for(let i=count-1;i>=0;i--){const pos=enemyPosition(i,count),unit=this.nodeAt(this.enemy,'hostile-'+i,pos.x,pos.y,40,40);this.sentinel(unit);}
    }
    syncWave():void {
        if(this.enemyTransition)return;
        const count=waveSize(this.game.s.run.stage,this.game.s.run.boss),alive=survivingEnemies(count,ratio(this.game.s.run.hp,this.game.maxHP()));
        this.enemy.children.forEach(unit=>{const index=Number(unit.name.split('-')[1]);if(index<alive||!unit.active)return;
            if(this.game.s.extra.effects){this.bulletImpact(unit.position.x,unit.position.y+20);}
            unit.active=false;
        });
    }
    shotTarget():Vec3 {const units=this.enemy.children.filter(n=>n.active);const unit=units[Math.floor(Math.random()*units.length)];return unit?new Vec3(unit.position.x,unit.position.y+24,0):new Vec3(138,48,0);}
    spawnEnemy():void {
        Tween.stopAllByTarget(this.enemy);this.clear(this.enemy);this.enemy.active=true;this.enemy.setPosition(0,0);
        const opacity=this.enemy.getComponent(UIOpacity)!;Tween.stopAllByTarget(opacity);opacity.opacity=255;
        this.populateEnemies();this.enemyLook=this.enemyKey();this.enemy.setScale(1,1,1);
        if(this.game.s.extra.effects)this.enemy.children.forEach((unit,i)=>{const rest=unit.position.clone();unit.setPosition(rest.x+220,rest.y);tween(unit).delay(i*.012).to(.35,{position:rest},{easing:'quadOut'}).start();});
    }
    syncAllies():void {
        const ids=this.game.s.run.heroes.map((level,i)=>level>0?i:-1).filter(i=>i>=0),key=ids.join(',');
        if(this.allySignature===key)return;this.allySignature=key;this.clear(this.allies);this.clear(this.footholds);
        ids.slice(0,8).forEach((id,index)=>{
            const {x,y}=allyPosition(index+1),actor=this.nodeAt(this.allies,`hero-${id}`,x,y,SOLDIER_SIZE,SOLDIER_SIZE),body=this.nodeAt(actor,'body',0,0,SOLDIER_SIZE,SOLDIER_SIZE);
            body.getComponent(UITransform)!.setAnchorPoint(.5,6/192);this.ui.actor(body,['rowen','kael','sera'][id%3]);
        });
    }
    gunshot(x:number,y:number):void {
        if(!this.game.s.extra.effects||!isValid(this.particles,true))return;
        const target=this.shotTarget(),muzzle=this.nodeAt(this.particles,'muzzle-flash',x+24,y,18,14);
        this.ui.polygon(muzzle,[[-8,0],[-2,3],[2,7],[4,2],[12,0],[3,-2],[1,-6],[-2,-2]],'#ffe04c');
        tween(muzzle).to(.07,{scale:new Vec3(.1,.1,1)}).call(()=>{if(isValid(muzzle,true))muzzle.destroy();}).start();
        this.scheduleOnce(()=>{if(isValid(this.particles,true))this.bulletImpact(target.x,target.y);},.06);
    }
    bulletImpact(x:number,y:number):void {
        if(!this.game.s.extra.effects||!isValid(this.particles,true)||this.particles.children.length>180)return;
        for(let i=0;i<3;i++){const p=this.nodeAt(this.particles,'bullet-impact',x,y,3,3);this.rect(p,0,0,3,3,i===0?'#ffffff':'#ffd83d');const angle=i*2.1;tween(p).to(.14,{position:new Vec3(x+Math.cos(angle)*10,y+Math.sin(angle)*10,0),scale:new Vec3(.15,.15,1)}).call(()=>{if(isValid(p,true))p.destroy();}).start();}
    }
    fireBurst(x:number,y:number):void {const layer=this.particles;[0,.065,.13].forEach(delay=>this.scheduleOnce(()=>{if(this.particles===layer&&isValid(layer,true)&&!this.enemyTransition)this.gunshot(x,y);},delay));}
    animateAlly(id:number,duration=.24):void {
        if(!this.game.s.extra.effects)return;
        const ally=this.allies.getChildByName('hero-'+id);if(!ally)return;
        const body=ally.getChildByName('body')!;Tween.stopAllByTarget(body);body.setPosition(0,0);
        tween(body).by(.05,{position:new Vec3(-3,0,0)}).to(duration,{position:new Vec3(0,0,0)}).start();this.fireBurst(ally.position.x,ally.position.y+39);
    }
    circle(parent:Node,x:number,y:number,radius:number,color:string):Node{const n=this.nodeAt(parent,'circle',x,y,radius*2,radius*2),g=n.addComponent(Graphics);g.fillColor=this.color(color);g.circle(0,0,radius);g.fill();g.strokeColor=this.color('#d5dedb');g.lineWidth=2;g.stroke();return n;}
    coin(parent:Node,x:number,y:number,r:number):void{this.ui.icon(this.nodeAt(parent,'gold-art',x,y,r*2,r*2),'symbol:coin',C.gold);}
    artifactMultiplier(id:number):string {const factor=(1+this.game.s.artifacts[id]*.22)*(this.game.s.enchanted[id]?10:1);return '×'+(factor<1000?factor.toFixed(2):this.format(Math.log10(factor)));}
    hudIcon(n:Node,kind:number,color:string):void{
        if(this.ui.icon(n,['sword','adventurer','armor','fox','heart','chest','cards','lightning','trophy','mail'][kind]||'scroll'))return;
        const g=n.addComponent(Graphics);g.fillColor=this.color(color);g.strokeColor=this.color(color);g.lineWidth=3;
        const poly=(points:number[][])=>{g.moveTo(points[0][0],points[0][1]);points.slice(1).forEach(p=>g.lineTo(p[0],p[1]));g.close();g.fill();};
        if(kind===0){poly([[-13,-16],[-8,-20],[17,12],[19,23],[8,17]]);g.moveTo(-17,-8);g.lineTo(-3,-18);g.stroke();}
        else if(kind===1){g.circle(0,12,7);g.fill();poly([[-6,5],[6,5],[11,-12],[5,-12],[5,-22],[-5,-22],[-5,-12],[-11,-12]]);}
        else if(kind===2)poly([[-8,18],[-22,10],[-15,-1],[-9,2],[-9,-19],[9,-19],[9,2],[15,-1],[22,10],[8,18],[4,12],[-4,12]]);
        else if(kind===3){poly([[-14,-18],[-14,9],[-20,19],[-5,15],[7,14],[15,21],[17,-18]]);g.fillColor=this.color('#26303a');g.circle(-5,4,2);g.circle(7,4,2);g.fill();}
        else if(kind===4)poly([[0,-21],[-21,2],[-21,12],[-13,19],[-5,19],[0,12],[5,19],[13,19],[21,12],[21,2]]);
        else if(kind===5){g.rect(-20,-17,40,29);g.fill();g.fillColor=this.color('#162330');g.rect(-20,0,40,4);g.fill();g.fillColor=this.color(color);g.rect(-17,15,34,5);g.fill();}
        else if(kind===6){g.rect(-14,-15,23,29);g.stroke();g.rect(-9,-11,23,29);g.stroke();g.circle(2,4,6);g.stroke();}
        else if(kind===7){g.rect(-14,-18,28,36);g.fill();g.fillColor=this.color('#f4d174');poly([[-9,0],[0,12],[9,0],[4,0],[4,-10],[-4,-10],[-4,0]]);}
        else if(kind===8){poly([[-12,15],[12,15],[9,-2],[3,-7],[3,-14],[11,-18],[-11,-18],[-3,-14],[-3,-7],[-9,-2]]);g.moveTo(-12,10);g.lineTo(-19,10);g.lineTo(-16,0);g.lineTo(-8,-5);g.moveTo(12,10);g.lineTo(19,10);g.lineTo(16,0);g.lineTo(8,-5);g.stroke();}
        else {g.rect(-19,-13,38,26);g.fill();g.strokeColor=this.color('#7e8490');g.lineWidth=2;g.moveTo(-18,12);g.lineTo(0,-2);g.lineTo(18,12);g.stroke();}
    }
    drawNav():void {
        const old=this.root.getChildByName('navigation');if(old){old.removeFromParent();old.destroy();}
        const nav=this.nodeAt(this.root,'navigation',0,-452-this.heightExtra+this.safeBottom,480,56);this.rect(nav,0,0,480,56,C.bg);this.rect(nav,0,27,480,2,'#9da3af');
        for(let i=0;i<6;i++){
            const unlocked=tabUnlocked(this.game.s,i),n=this.nodeAt(nav,'tab-'+i,-200+i*80,0,80,56),title=this.tr(['nav.master','nav.heroes','nav.equipment','nav.pets','nav.artifacts','nav.shop'][i]);
            if(i>0)this.rect(n,-40,0,1,40,'#626978');
            if(i===this.tab){const selected=this.nodeAt(n,'selected-tab',0,3,76,62);this.ui.surface(selected,this.tabTone,'slant');}
            this.touchAction(n,()=>this.tutorial.tab(i),title);const icon=this.nodeAt(n,'tab-icon',0,i===this.tab?5:1,i===this.tab?44:37,i===this.tab?44:37);this.hudIcon(icon,i,C.text);
            if(i!==this.tab)icon.addComponent(UIOpacity).opacity=unlocked?210:60;if(!unlocked)this.lockIcon(n,23,12);
            if(i===3&&unlocked&&Date.now()>=this.game.s.eggAt)this.rect(n,25,18,6,6,C.danger);
        }
    }
    scroll(parent: Node, x: number, y: number, w: number, h: number, rows: Row[]): void {
        const viewport = this.nodeAt(parent, 'scroll', x, y, w, h);
        viewport.addComponent(Mask);
        const sv = viewport.addComponent(ScrollView);
        sv.horizontal = false;
        sv.vertical = true;
        sv.inertia = true;
        sv.brake = .7;
        const content = this.nodeAt(viewport, 'content', 0, h / 2, w, Math.max(h, rows.length * 77));
        content.getComponent(UITransform)!.setAnchorPoint(.5, 1);
        sv.content = content;
        rows.forEach((r, i) => {
            const yy = -39 - i * 77;
            const card = this.nodeAt(content,'list-row',0,yy,w-8,70);
            if(r.action===this.tr('action.claim')&&!r.locked&&!r.unavailable?.())this.rect(card,-w/2+9,0,4,54,C.gold);
            this.rect(card,0,-36,w-24,1,this.ui.inPopup(card)?'#777e8c':'#a4a8b1');if(r.locked){card.addComponent(UIOpacity).opacity=155;this.lockIcon(card,-w/2+35,0);}
            if(r.tint&&!r.locked)this.polygon(card,-w/2+33,0,48,48,[[0,-.5],[.5,0],[0,.5],[-.5,0]],r.tint,90);
            if (r.icon !== undefined&&!r.locked)
                this.glyph(card, -w / 2 + 35, 0, r.icon, r.tint || C.gold, r.art);
            const hasIcon = r.icon !== undefined, hasAction = !!r.action;
            const left = -w / 2 + (hasIcon ? 66 : 16), right = w / 2 - (hasAction ? 106 : 16), width = right - left;
            this.label(card, r.title, left + width / 2, r.sub||r.metrics ? 15 : 0, width, 28, 17, C.text, Label.HorizontalAlign.LEFT);
            if(r.metrics)r.metrics.forEach((m,j)=>this.metric(card,m.icon,m.value,left+(j+.5)*width/r.metrics!.length,-16,width/r.metrics!.length,m.hint));
            else if (r.sub)this.label(card, r.sub, left + width / 2, -16, width, 31, 14, C.muted, Label.HorizontalAlign.LEFT);
            if(r.detail){const target=this.nodeAt(card,"details",-w/2+120,0,210,65);target.on(Node.EventType.TOUCH_END,r.detail);}
            if (r.action) {
                const settled = [this.tr('action.equipped'), this.tr('action.claimed'), this.tr('action.selected')].includes(r.action);
                const browse = ['action.details','action.open','action.back'].some(key => r.action === this.tr(key));
                this.button(card, r.action, w / 2 - 54, 0, 90, 50, r.click || (() => { }), !settled && (!this.ui.inPopup(card) || !browse),
                    { style: r.buttonStyle || (r.locked?'disabled':settled ? 'selected' : browse ? 'secondary' : 'primary'), fontSize: 18,icon:r.actionIcon,iconOnly:false,hint:r.actionHint,unavailable:r.unavailable||(r.action===this.tr('action.claimed')?()=>this.tr('action.alreadyClaimed'):r.locked?()=>r.sub||r.metrics?.find(m=>m.hint)?.hint||this.tr('error.locked'):undefined) });
            }
            else if (r.click)
                card.on(Node.EventType.TOUCH_END, r.click);
        });
    }
    glyph(parent: Node, x: number, y: number, id: number, color: string, art?: string): void { const n = this.nodeAt(parent,'item-art',x,y,44,44);this.ui.surface(n,this.ui.inPopup(parent)?C.panel:C.paper,'cut');const icon = this.nodeAt(n,'glyph',0,0,34,34);
        if(art?.startsWith('face:') ? this.ui.face(icon,art.slice(5)) : this.ui.icon(icon,art||['sword','heart','scroll','chest','egg','trophy','rebirth','lightning'][id%8]))return;
        const g = icon.addComponent(Graphics); g.fillColor = this.color(color); if (id % 3 === 0) {
        g.rect(-3, -13, 6, 26);
        g.rect(-11, -5, 22, 5);
    }
    else if (id % 3 === 1) {
        g.moveTo(0, 15);
        g.lineTo(13, 0);
        g.lineTo(0, -15);
        g.lineTo(-13, 0);
        g.close();
    }
    else {
        g.rect(-11, -11, 22, 22);
        g.rect(-5, 11, 10, 4);
    } g.fill(); }
    clear(n: Node): void { for (const c of [...n.children]) {
        c.removeFromParent();
        c.destroy();
    } }
    drawPanel(): void {
        this.clear(this.panel);
        if(!tabUnlocked(this.game.s,this.tab)){this.tab=0;this.drawNav();}
        const g = this.game, s = g.s, r = s.run;
        this.rect(this.panel,0,0,480,300,C.paper);this.rect(this.panel,-239,0,2,300,'#939aa9');this.rect(this.panel,239,0,2,300,'#939aa9');
        this.polygon(this.panel,-112,147,256,6,[[-.5,-.5],[.46,-.5],[.5,.5],[-.5,.5]],this.tabTone);
        this.polygon(this.panel,176,147,128,6,[[-.5,-.5],[.5,-.5],[.5,.5],[-.46,.5]],C.paperMuted);
        if(this.tab===0){
            this.polygon(this.panel,-201,113,61,64,[[-.5,-.5],[.34,-.5],[.5,.5],[-.34,.5]],C.ember);this.ui.face(this.nodeAt(this.panel,'master-portrait',-201,113,48,51),'guardian');
            this.label(this.panel,this.tr('layout.masterName'),-64,129,228,24,18,C.ink,Label.HorizontalAlign.LEFT);
            this.metric(this.panel,'symbol:up',String(r.master),-114,102,100,this.tr('action.level',{level:r.master}));this.metric(this.panel,'symbol:hand',this.format(g.tapDamage()),-6,102,112,this.tr('layout.tapDamage',{value:this.format(g.tapDamage())}));
            this.button(this.panel,this.format(g.upgradeCost(-1,this.mode===-1?1:this.mode)),164,112,135,60,()=>{g.buy(-1,this.mode);this.drawPanel();this.flushNotice();},true,{icon:'symbol:plus',iconOnly:false,hint:this.tr('layout.upgrade'),unavailable:()=>this.levelReason(-1)});
            this.polygon(this.panel,-6,62,468,26,[[-.5,-.5],[.48,-.5],[.5,.5],[-.5,.5]],C.paperMuted);this.label(this.panel,this.tr(s.maxStage<15?'unlock.nextTitle':'master.prestige'),-103,62,242,24,15,C.ink,Label.HorizontalAlign.LEFT);
            this.glyph(this.panel,-201,13,1,C.blue,s.maxStage<15?'face:ember-fox':'rebirth');
            this.metric(this.panel,'flag',String(s.maxStage<15?(s.maxStage<8?8:15):60),-106,13,110,this.tr(s.maxStage<15?'unlock.stage':'prestige.locked',{name:this.tr(s.maxStage<8?'nav.pets':'nav.equipment'),stage:s.maxStage<8?8:15}));this.metric(this.panel,s.maxStage<15?'lock':'scroll',s.maxStage<15?'':this.format(g.prestigeReward()),11,13,116,this.tr('prestige.desc'));
            if(s.maxStage<15){this.lockIcon(this.panel,164,13);}else this.button(this.panel,r.stage>=60?this.format(g.prestigeReward()):'60',164,13,135,60,()=>{if(r.stage<60){this.info(this.tr('unlock.title'),this.tr('prestige.locked'));return;}this.prestige();},r.stage>=60,{icon:r.stage>=60?'rebirth':'lock',hint:this.tr('prestige.title'),unavailable:()=>this.game.s.run.stage<60?this.tr('prestige.locked'):null});
            this.polygon(this.panel,-6,-36,468,26,[[-.5,-.5],[.48,-.5],[.5,.5],[-.5,.5]],C.paperMuted);this.label(this.panel,this.tr('spell.title'),-103,-36,242,24,15,C.ink,Label.HorizontalAlign.LEFT);
            this.scroll(this.panel,0,-100,474,99,SPELLS.filter(sp=>r.master>=sp.unlock||sp.id===SPELLS.find(sp=>r.master<sp.unlock)?.id).map(sp=>({locked:r.master<sp.unlock,title:this.tr(`spell.${sp.id}`),metrics:[{icon:r.master<sp.unlock?'lock':'symbol:up',value:String(r.master<sp.unlock?sp.unlock:r.spellLevels[sp.id]),hint:this.tr('spell.detail',{level:r.spellLevels[sp.id],unlock:sp.unlock,mana:this.game.spellMana(sp.id)})},{icon:'lightning',value:String(this.game.spellMana(sp.id)),hint:this.tr('hud.mana',{value:this.game.spellMana(sp.id)})}],icon:sp.id,action:this.tr(r.master<sp.unlock?'action.level':'action.details',{level:sp.unlock}),click:()=>this.spells(this.game.s.spellSlots.indexOf(sp.id)<0?0:this.game.s.spellSlots.indexOf(sp.id))})));
        }
        else if (this.tab === 1) {
            this.label(this.panel, this.tr('hero.title'), -133, 127, 190, 29, 21, C.gold, Label.HorizontalAlign.LEFT);
            this.button(this.panel, '×'+(this.mode===-1?'∞':this.mode), 80, 127, 127, 34, () => { this.mode = [1, 10, 100, -1][([1, 10, 100, -1].indexOf(this.mode) + 1) % 4]; this.drawPanel(); });
            if(s.maxStage>=15)this.button(this.panel, '◈', 200, 127, 49, 34, () => this.mastery());
            this.scroll(this.panel, 0, -24, 458, 244, HEROES.filter(h=>s.maxStage>=h.unlock||h.id===HEROES.find(h=>s.maxStage<h.unlock)?.id).map(h => ({
                locked:s.maxStage<h.unlock,unavailable:()=>this.levelReason(h.id),
                title: this.tr(h.name), sub: s.maxStage < h.unlock ? this.tr('hero.locked', {
                    stage: h.unlock
                }) : undefined,metrics:s.maxStage<h.unlock?[{icon:'flag',value:String(h.unlock),hint:this.tr('hero.locked',{stage:h.unlock})}]:[{icon:'symbol:up',value:String(r.heroes[h.id]),hint:this.tr('action.level',{level:r.heroes[h.id]})},{icon:'sword',value:this.format(g.heroDamage(h.id)),hint:this.tr('hero.stats',{level:r.heroes[h.id],damage:this.format(g.heroDamage(h.id))})}], detail:()=>this.extensions.hero(h.id), icon: h.id, art:'face:'+['rowen','kael','sera','guardian'][h.id%4], tint: [C.ember, C.mint, C.blue, C.violet][h.id % 4], action:s.maxStage<h.unlock?this.tr('action.locked'):r.heroes[h.id]===0?this.tr('action.recruitCost',{cost:this.format(g.upgradeCost(h.id,1))}):this.format(g.upgradeCost(h.id, this.mode === -1 ? 1 : this.mode)), click: () => { if(s.maxStage<h.unlock){this.info(this.tr('unlock.title'),this.tr('hero.locked',{stage:h.unlock}));return;}g.buy(h.id, this.mode);this.drawPanel();this.tutorial.event('progress');this.flushNotice(); }
            })));
        }
        else if (this.tab === 2) {
            this.metric(this.panel,'face:compass',String(s.shards),-158,127,130,this.tr('equipment.craft'));this.metric(this.panel,'symbol:bag',s.equipment.length+'/100',-25,127,120,this.tr('equipment.title'));
            this.button(this.panel, '⋯', 73, 127, 40, 34, () => this.equipmentTools());
            this.button(this.panel, this.tr('equipment.craft'), 172, 127, 110, 34, () => this.craft(),false,{unavailable:()=>s.equipment.length>=100?this.tr('error.full'):this.costReason('shards',g.craftCost())});
            for (let i = 0; i < 5; i++)
                this.button(this.panel, this.tr(`slot.${i}`), -180+i*90,80,84,40,()=>{this.filter=this.filter===i?-1:i;this.drawPanel();},this.filter===i,{style:this.filter===i?'selected':'quiet',tone:this.filter===i?C.violet:C.paperMuted,icon:'face:'+['blade','helmet','breastplate','aura','compass'][i],iconOnly:true});
            const items = s.equipment.filter(e => this.filter < 0 || e.slot === this.filter).sort((a, b) => b.power - a.power);
            this.scroll(this.panel, 0, -46, 458, 204, items.map(e => ({
                title: '★'.repeat(e.rarity+1)+'  +'+e.level,metrics:[{icon:'sword',value:'×'+e.power.toFixed(2),hint:this.tr('equipment.power',{power:e.power.toFixed(2)})}],actionHint:this.itemName(e), action: s.equipped.includes(e.id) ? this.tr('action.equipped') : this.tr('action.details'), icon: e.slot, art:'face:'+['blade','helmet','breastplate','aura','compass'][e.slot], tint: e.rarity > 1 ? C.gold : C.blue, click: () => this.item(e)
            })));
            if (!items.length)
                this.label(this.panel, this.tr('equipment.empty'), 0, -22, 410, 60, 16, C.muted);
        }
        else if (this.tab === 3) {
            this.label(this.panel, this.tr('pet.title'), -112, 127, 220, 28, 21, C.gold, Label.HorizontalAlign.LEFT);
            this.button(this.panel, Date.now() >= s.eggAt ? this.tr('pet.hatch') : this.tr('action.remaining', {
                seconds: Math.ceil((s.eggAt - Date.now()) / 1000)
            }), 143, 127, 164, 36, () => this.act(() => g.hatch(this.id('egg')), () => this.drawPanel()),false,{unavailable:()=>this.game.now()<this.game.s.eggAt?this.tr('action.waitSeconds',{seconds:Math.ceil((this.game.s.eggAt-this.game.now())/1000)}):null});
            this.scroll(this.panel, 0, -24, 458, 244, PETS.map(p => ({
                locked:s.pets[p.id]===0, title:this.tr(p.name),metrics:[{icon:'symbol:up',value:String(s.pets[p.id]),hint:this.tr('action.level',{level:s.pets[p.id]})},{icon:['sword','symbol:hand','face:gems'][p.effect],value:'×'+(1+s.pets[p.id]*.025).toFixed(2),hint:this.tr('effect.'+p.effect)}],detail:()=>this.extensions.petDetail(p.id), icon: p.id, art:'face:'+['ember-fox','stone-hawk','shade-wolf'][p.id%3], tint: C.mint, action:!s.pets[p.id]?this.tr('action.locked'):s.activePet===p.id?this.tr('action.equipped'):this.tr('action.equip'), click: () => { if (!s.pets[p.id])
                    this.toast(this.tr('error.locked'));
                else {
                    s.activePet = p.id;
                    this.tutorial.complete('first:pet');
                    g.persist();
                    this.drawPanel();
                } }
            })));
        }
        else if (this.tab === 4) {
            this.metric(this.panel,'scroll',this.format(s.relics),-94,127,260,this.tr('artifact.balance',{value:this.format(s.relics)}));
            this.button(this.panel,this.format(g.discoverCost()),149,127,154,36,()=>this.act(()=>g.discover(this.id('discover')),()=>this.drawPanel()),true,{icon:'chest',hint:this.tr('artifact.discover',{cost:this.format(g.discoverCost())}),unavailable:()=>s.artifacts.every(v=>v>0)?this.tr('error.complete'):this.costReason('relics',g.discoverCost())});
            const owned = ARTIFACTS.filter(a => s.artifacts[a.id]);
            this.button(this.panel, '⋯', -208, 89, 40, 26, () => this.salvaged());
            this.scroll(this.panel, 0, -37, 458, 221, owned.map(a => ({
                title:this.tr(a.name),metrics:[{icon:'symbol:up',value:String(s.artifacts[a.id]),hint:this.tr('action.level',{level:s.artifacts[a.id]})},{icon:['sword','symbol:hand','adventurer','symbol:coin'][a.effect],value:this.artifactMultiplier(a.id),hint:this.tr('effect.'+a.effect)}], icon: a.id, art:'face:'+['blade','crown','compass','aura','gems','supplies'][a.id%6], tint: C.violet, action: this.tr('action.details'), click: () => this.artifactDetail(a.id)
            })));
            if (!owned.length) {
                this.glyph(this.panel, 0, 28, 1, C.violet);
                this.label(this.panel, this.tr('artifact.empty'), 0, -45, 365, 70, 17, C.muted);
            }
        }
        else {
            [0, 1, 2].forEach(i => this.button(this.panel, this.tr(['shop.regular', 'shop.progression', 'shop.limited'][i]), -151 + i * 151, 127, 142, 38, () => { this.shopTab = i; this.drawPanel(); }, this.shopTab === i,{style:this.shopTab===i?'selected':'quiet',tone:this.shopTab===i?C.gold:C.paperMuted,icon:['chest','symbol:up','symbol:clock'][i],iconOnly:true}));
            const rows: Row[] = this.shopTab === 0 ? [{
                    title:this.tr('shop.free'),locked:s.claims.includes('daily.0'),metrics:[{icon:'face:gems',value:'+25',hint:this.tr('daily.reward',{gems:25})}],action: this.tr(s.claims.includes('daily.0')?'action.claimed':'action.claim'), click: () => this.act(() => g.claimDaily(0), () => this.drawPanel())
                }, ...[0, 1, 2].map(i => ({
                    unavailable:()=>this.costReason('gems',[30,60,100][i])||(i===2&&s.equipment.length>=100?this.tr('error.full'):null),title:this.tr(['shop.pet','shop.shards','shop.chest'][i]),metrics:[{icon:'face:gems',value:String([30,60,100][i]),hint:this.tr('action.cost',{cost:[30,60,100][i]})}],icon: i, tint: C.gold, action: this.tr('action.buy'), click: () => this.confirm(this.tr(['shop.pet', 'shop.shards', 'shop.chest'][i]), this.tr('shop.confirm', {
                        cost: [30, 60, 100][i]
                    }) + (i === 2 ? '\n' + this.tr('shop.chestInfo') : ''), () => this.act(() => g.buyDeal(i, this.id('deal')), () => { this.close(); this.drawPanel(); }))
                }))] : this.shopTab === 1 ? [60,100,500,1000].filter(stage=>s.maxStage>=stage||stage===[60,100,500,1000].find(next=>s.maxStage<next)).map(stage => ({locked:s.maxStage<stage,
                title: this.tr('milestone.row', {
                    stage
                }), action:this.tr(s.maxStage<stage?'action.locked':s.claims.includes(`milestone.${stage}`)?'action.claimed':'action.claim'), click: () => this.act(() => g.claimMilestone(stage), () => this.drawPanel())
            })) : [{
                    title:this.tr('extra.limitedOffer'),sub:this.tr('extra.limitedInfo'),action:this.tr('action.open'),click:()=>this.extensions.limited()
                }];
            rows.unshift({title:this.tr('money.store'),metrics:[{icon:'face:gems',value:String(s.gems),hint:this.tr('money.balance',{count:s.gems})}],action:this.tr('action.open'),click:()=>this.payments.store()});
            if(this.shopTab===0)rows.splice(1,0,{title:this.tr('money.ad.shop_chest'),metrics:[{icon:'armor',value:'1',hint:this.tr('money.adReward.shop_chest')},{icon:'symbol:clock',value:'12×3',hint:this.tr('money.adReward.shop_chest')}],action:this.tr('money.watch'),click:()=>this.payments.ads('shop')});
            if(this.shopTab===2)rows.unshift({title:this.tr('money.pass'),action:this.payments.price('season_pass'),click:()=>this.payments.product('season_pass')});
            this.scroll(this.panel, 0, -24, 458, 244, rows);
        }
    }
    itemName(e: Item): string { return this.tr('equipment.item', {
        slot: this.tr(`slot.${e.slot}`), rarity: this.tr(`rarity.${e.rarity}`), level: e.level
    }); }
    open(title: string, height = 600, closable = true, surface: 'teal' | 'slate' = 'teal'): Node {
        this.close();
        this.modal = this.nodeAt(this.root, 'modal', 0, 0, 480, this.designH);
        this.modal.addComponent(BlockInputEvents);
        this.rect(this.modal, 0, 0, 480, this.designH, '#000000', undefined, 128);
        height=Math.min(height,this.designH-this.safeTop-this.safeBottom-70);
        const box = this.nodeAt(this.modal,'modal-panel',0,(this.safeBottom-this.safeTop)/2,432,height);
        this.ui.paint(box,surface === 'slate' ? 'popup/slate' : 'popup/panel',true);
        const panelAccent=this.game.s.extra.cosmetics[1]>0?[C.line,C.gold,C.blue,C.violet,C.mint,C.ember][this.game.s.extra.cosmetics[1]]:this.tabTone;
        const heading=this.polygon(box,-17,height/2-38,398,60,[[-.5,-.5],[.43,-.5],[.5,.5],[-.5,.5]],C.paper);
        this.polygon(box,-199,height/2-38,34,60,[[-.5,-.5],[.15,-.5],[.5,.5],[-.5,.5]],panelAccent);
        if(!this.tutorial?.popup(title,heading))this.label(heading,title,0,0,322,44,23,C.ink);
        if(closable)this.button(box, '×', 181, height / 2 - 36, 38, 36, () => this.close(),false,{style:'quiet',tone:panelAccent,fontSize:21});
        return box;
    }
    close(): void { if(this.liveOps?.blocked)return; this.modalRefresh = null; if (this.modal) {
        this.modal.removeFromParent();
        this.modal.destroy();
        this.modal = null;
    } }
    confirm(title: string, body: string, yes: () => void): void { const p = this.open(title, 370); this.label(p, body, 0, 10, 372, 195, 19, C.text); this.button(p, this.tr('action.cancel'), -103, -132, 178, 48, () => this.close()); this.button(p, this.tr('action.confirm'), 103, -132, 178, 48, yes, true); }
    info(title: string, body: string): void { const p = this.open(title, 390); this.label(p, body, 0, 0, 375, 245, 18, C.text); this.button(p, this.tr('action.close'), 0, -145, 260, 45, () => this.close()); }
    act(action: () => boolean, done?: () => void): void { if (action()) {
        this.sound(600);
        if (done)
            done();
        this.toast(this.tr('complete.applied'));
        this.updateHUD();
    }
    else
        this.flushNotice(); }
    menu(): void { for(const stage of [15,50,60,100,1000,100000,180000])if(this.game.s.maxStage>=stage)this.tutorial.complete('feature:'+stage);const p = this.open(this.tr('menu.title'), 706); const actions: [
        string,
        () => void
    ][] = [['daily', () => this.daily()], ['milestones', () => this.milestones()], ['raid', () => this.raidLobby()], ['cards', () => this.cards()], ['event', () => this.events()], ['meta', () => this.meta()], ['clan', () => this.guild()], ['tournament', () => this.competition()], ['profile', () => this.profile()], ['settings', () => this.settings()], ['inbox', () => this.extensions.inbox()], ['achievements', () => this.achievements()]];
        const icons = ['chest','flag','sword','cards','trophy','scroll','flag','trophy','adventurer','settings','mail','trophy'];
        actions.filter(([key])=>featureUnlocked(this.game.s,'menu.'+key)).forEach(([key,f],i) => this.button(p,this.tr(`menu.${key}`),i % 2 ? 101 : -101,245-Math.floor(i/2)*91,184,70,f,false,{style:'secondary',icon:icons[i],iconOnly:false,fontSize:15}));
        this.button(p,this.tr('extra.hub'),0,-304,380,44,()=>this.extensions.hub(),false,{style:'quiet'});
    }
    prestige(): void { const g = this.game; this.confirm(this.tr('prestige.title'), this.tr('prestige.desc') + '\n\n' + this.tr('prestige.reward', {
        value: this.format(g.prestigeReward())
    }) + '\n' + this.tr('prestige.start', {
        stage: Math.max(1, Math.floor(g.s.maxStage * .05))
    }), () => { if (g.prestige(this.id('prestige'))) {
        this.close();
        this.drawPanel();
        this.toast(this.tr('prestige.done'));
    }
    else
        this.flushNotice(); }); }
    item(e:Item):void {
        this.tutorial.complete('first:gear');
        const current=this.game.s.equipment.find(x=>x.id===this.game.s.equipped[e.slot]),equipped=current?.id===e.id,p=this.open(this.tr(`slot.${e.slot}`),480,true,'slate');
        this.polygon(p,0,102,116,104,[[0,-.5],[.5,0],[0,.5],[-.5,0]],C.violet,60);this.ui.face(this.nodeAt(p,'equipment-art',0,103,92,92),['blade','helmet','breastplate','aura','compass'][e.slot]);
        this.label(p,'★'.repeat(e.rarity+1)+'  +'+e.level,0,46,330,30,22,C.gold);
        this.metric(p,'sword','×'+(current?.power||1).toFixed(2),-110,-10,162,this.tr('equipment.compare',{current:(current?.power||1).toFixed(2),next:e.power.toFixed(2)}));
        this.ui.icon(this.nodeAt(p,'compare-arrow',0,-10,28,28),'symbol:next');
        this.metric(p,'sword','×'+e.power.toFixed(2),110,-10,162,this.tr('equipment.power',{power:e.power.toFixed(2)}));
        const gain=(e.power/(current?.power||1)-1)*100;this.label(p,(gain>=0?'+':'')+gain.toFixed(1)+'%',0,-47,230,26,20,gain>=0?C.mint:C.danger);
        this.button(p,this.tr(equipped?'action.equipped':'action.equip'),-128,-103,112,58,()=>{this.game.equip(e.id);this.close();this.drawPanel();},true,{style:equipped?'selected':'primary'});
        this.button(p,this.tr('action.lock'),0,-103,112,58,()=>{this.game.lock(e.id);this.item(e);},false,{style:e.locked?'selected':'secondary'});
        this.button(p,this.tr('action.sell'),128,-103,112,58,()=>{if(e.locked||equipped){this.toast(this.tr('equipment.protected'));return;}this.confirm(this.itemName(e),this.tr('equipment.sellConfirm'),()=>this.act(()=>this.game.sell([e.id],this.id('sell')),()=>{this.close();this.drawPanel();}));},false,{style:e.locked||equipped?'disabled':'danger',hint:this.tr('action.sell')+' · '+(e.rarity+1)});
        this.button(p,this.tr('equipment.sets'),-98,-186,174,44,()=>this.sets());
        this.button(p,this.tr('ui.iconHelp'),98,-186,174,44,()=>this.info(this.itemName(e),this.tr('ui.equipmentHelp')),false,{icon:'symbol:info',iconOnly:true});
    }
    craft(): void { this.confirm(this.tr('equipment.craft'), this.tr('equipment.craftDesc', {
        cost: this.game.craftCost(), shards: this.game.s.shards
    }), () => this.act(() => this.game.craft(this.id('craft')), () => { this.close(); this.drawPanel(); const last = this.game.s.equipment[this.game.s.equipment.length - 1]; this.item(last); })); }
    sets(): void {this.extensions.equipmentSets();}
    oldSets(): void { const s = this.game.s; this.info(this.tr('equipment.sets'), this.tr('equipment.setInfo', {
        count: s.setHistory.length, sets: Math.floor(s.setHistory.length / 5), spent: s.crafted
    })); }
    skills(fresh = true): void {
        if (fresh)
            this.draft = [...this.game.s.skills];
        const s = this.game.s, p = this.open(this.tr('skills.title'), 718);
        const total = s.sp + s.skills.reduce((a, l) => a + l * (l + 1) / 2, 0), cost = this.draft.reduce((a, l) => a + l * (l + 1) / 2, 0);
        this.label(p, this.tr('skills.points', {
            points: total - cost, cost
        }), 0, 281, 382, 32, 17, C.mint);
        this.label(p, this.tr('skills.info'), 0, 226, 382, 64, 13, C.muted);
        const icons = ['sword','fox','flag','lightning','adventurer','scroll'];
        for (let branch = 0; branch < 6; branch++) {
            const x = -132 + branch % 3 * 132, y = 111 - Math.floor(branch / 3) * 191;
            const group = this.rect(p,x,y-36,126,174,C.panel,C.line);
            this.label(group,this.tr(`branch.${branch}`),0,69,114,24,16,'#175960');
            for (let tier = 0; tier < 3; tier++) {
                const i = branch * 3 + tier;
                if(tier < 2) this.rect(group,0,14-tier*45,2,14,'#8fbfb5');
                const unlocked = tier === 0 || this.draft[i-1] >= 3;
                this.button(group,this.tr('action.level',{level:this.draft[i]}),0,36-tier*45,112,38,()=>this.skillNode(i),false,
                    {style:this.draft[i] > 0 ? 'selected' : unlocked ? 'secondary' : 'disabled',icon:icons[branch],fontSize:13});
            }
        }
        this.button(p, this.tr('action.revert'), -137, -285, 124, 46, () => this.skills());
        this.button(p, this.tr('action.reset'), 0, -285, 124, 46, () => { this.draft = Array(18).fill(0); this.skills(false); });
        this.button(p, this.tr('action.apply'), 137, -285, 124, 46, () => this.act(() => this.game.applySkills(this.draft, this.id('skills')), () => this.skills()), true);
    }
    perks(): void { const p = this.open(this.tr('perks.title'), 650); this.label(p, this.tr('perks.info'), 0, 242, 370, 50, 16, C.muted); this.scroll(p, 0, -25, 400, 450, Array.from({
        length: 6
    }, (_, i) => ({
        title: this.tr('perks.row', {
            name: this.tr(`branch.${i}`), count: this.game.s.perks[i]
        }), sub: Date.now() < this.game.s.perkUntil[i] ? this.tr('action.remaining', {
            seconds: Math.ceil((this.game.s.perkUntil[i] - Date.now()) / 1000)
        }) : '', icon: i, action: this.tr('action.apply'), click: () => this.act(() => this.game.usePerk(i, this.id('perk')), () => this.extensions.perks())
    }))); }
    mastery():void {this.extensions.heroMastery();}
    oldMastery(): void { const s = this.game.s; this.info(this.tr('hero.mastery'), this.tr('hero.masteryInfo', {
        weapons: s.weapons.reduce((a, b) => a + b, 0), scrolls: s.scrolls.reduce((a, b) => a + b, 0)
    })); }
    daily(): void { const p = this.open(this.tr('daily.title'), 570); this.scroll(p, 0, -24, 400, 450, [0, 1, 2, 3].map(i => ({
        title: this.tr(`daily.${i}`), sub: this.tr('daily.progress', {
            current: this.game.dailyProgress(i), goal: this.game.dailyGoal(i)
        }), locked:this.game.dailyProgress(i)<this.game.dailyGoal(i), icon: i, tint: C.mint, action: this.tr(this.game.s.claims.includes(`daily.${i}`) ? 'action.claimed' : 'action.claim'), click: () => this.act(() => this.game.claimDaily(i), () => this.daily())
    }))); }
    milestones(): void { const p = this.open(this.tr('milestone.title'), 630); this.scroll(p, 0, -28, 400, 514, [8, 15, 60, 100, 500, 1000, 100000, 180000].map(stage => ({
        title: this.tr('hud.stage', {
            stage
        }), sub: this.tr('milestone.row', {
            stage
        }), locked:this.game.s.maxStage<stage, action: this.tr(this.game.s.claims.includes(`milestone.${stage}`) ? 'action.claimed' : 'action.claim'), click: () => this.act(() => this.game.claimMilestone(stage), () => this.milestones())
    }))); }
    offline(): void { const p = this.open(this.tr('offline.title'), 380); this.label(p, this.tr('offline.reward', {
        gold: this.format(this.game.s.offline)
    }), 0, 40, 370, 65, 24, C.gold); this.label(p, this.tr('offline.info'), 0, -26, 370, 56, 17, C.muted); this.button(p, this.tr('action.claim'), 0, -126, 310, 50, () => this.act(() => this.game.collectOffline(this.id('offline')), () => this.close()), true); }
    online(): void { this.info(this.tr('online.title'), this.tr('online.unavailable')); }
    profile(): void { const s = this.game.s; this.info(this.tr('menu.profile'), this.tr('profile.stats', {
        stage: s.maxStage, prestiges: s.prestiges, kills: s.totalKills, taps: s.totalTaps, artifacts: s.artifacts.filter(Boolean).length, pets: s.pets.reduce((a, b) => a + b, 0)
    })); }
    settings(): void {
        const p = this.open(this.tr('menu.settings'),700);
        this.label(p,this.tr('settings.language'),0,239,340,30,16,'#38696b');
        const language = (locale: 'ko' | 'en') => { this.game.s.locale=locale; this.game.persist(); if(this.liveOps.push.supported&&this.liveOps.push.choice==='on')void this.liveOps.push.set(true,locale).catch(e=>this.operations.report('push.locale',e)); this.close(); this.draw(); this.settings(); };
        this.button(p,this.tr('locale.ko'),-94,192,175,46,()=>language('ko'),false,{style:this.game.s.locale==='ko'?'selected':'quiet'});
        this.button(p,this.tr('locale.en'),94,192,175,46,()=>language('en'),false,{style:this.game.s.locale==='en'?'selected':'quiet'});
        this.button(p,this.tr('settings.audio',{state:this.tr(this.game.s.audio?'settings.on':'settings.off')}),0,120,365,48,
            ()=>{this.game.s.audio=!this.game.s.audio;this.game.persist();this.settings();},false,{icon:'heart'});
        this.button(p,this.tr('settings.saveButton'),0,57,365,48,()=>{
            if(this.game.persist())void this.remote(async()=>{await this.operations.save();this.toast(this.tr('settings.save'));});else this.flushNotice();
        },true,{icon:'scroll'});
        this.button(p,this.tr('live.17'),0,-6,365,46,()=>this.liveOps.hub(),false,{icon:'mail'});
        this.button(p,this.tr('tutorial.replay'),0,-66,365,38,()=>this.confirm(this.tr('tutorial.replay'),this.tr('tutorial.replayBody'),()=>{replayTutorial(this.game.s);this.game.revision++;this.game.persist();void this.operations.save().catch(e=>this.operations.report('tutorial.replay',e));this.tab=0;this.folded=false;this.draw();}),false,{style:'quiet',fontSize:14});
        this.button(p,this.tr('cheat.title'),0,-120,365,38,()=>this.cheats.open(),false,{style:'quiet',icon:'settings',fontSize:15});
        resources.load('branding/tt-softs-ci/texture',Texture2D,(err,texture)=>{
            if(err||!p.isValid)return;
            const n=this.nodeAt(p,'company-ci',0,-188,120,120*texture.height/texture.width),sp=n.addComponent(Sprite),frame=new SpriteFrame();
            frame.texture=texture;sp.sizeMode=Sprite.SizeMode.CUSTOM;sp.spriteFrame=frame;
            n.getComponent(UITransform)!.setContentSize(120,120*texture.height/texture.width);
        });
        this.button(p,this.tr('complete.display'),-124,-270,116,68,()=>this.extensions.displaySettings(),false,{style:'quiet',icon:'settings'});
        this.button(p,this.tr('complete.account'),0,-270,116,68,()=>this.extensions.account(),false,{style:'quiet',icon:'adventurer'});
        this.button(p,this.tr('complete.support'),124,-270,116,68,()=>this.extensions.support(),false,{style:'quiet',icon:'mail'});
    }
    cards(): void { const s = this.game.s, p = this.open(this.tr('menu.cards'), 720); this.label(p, this.tr('raid.deck', {
        a: this.tr(`card.${s.deck[0]}`), b: this.tr(`card.${s.deck[1]}`), c: this.tr(`card.${s.deck[2]}`)
    }), 0, 270, 385, 50, 16, C.mint); this.label(p, this.tr('raid.dust', {
        dust: s.dust
    }), 0, 225, 385, 26, 15, C.gold); this.scroll(p, 0, -25, 400, 450, CARDS.map(c => ({
        title: this.tr(c.name), sub: this.tr('raid.card', {
            level: s.cards[c.id], fragments: s.fragments[c.id]
        }), icon: c.id, tint: [C.ember, C.violet, C.mint][c.type], action: this.tr(s.deck.includes(c.id) ? 'action.selected' : 'action.select'), click: () => { this.game.setDeck(c.id); this.cardDetail(c.id); }
    })));
        this.button(p,this.tr('extra.dustShop'),-101,-306,190,44,()=>this.extensions.dustShop());
        this.button(p,this.tr('extra.crystal'),101,-306,190,44,()=>this.extensions.crystal());
    }
    cardDetail(i: number): void { const s = this.game.s, p = this.open(this.tr(`card.${i}`), 490);this.label(p,this.tr('complete.cardProc.'+i%3),0,140,370,85,18); this.label(p, this.tr('raid.card', {
        level: s.cards[i], fragments: s.fragments[i]
    }), 0, 40, 360, 60, 22); this.button(p, this.tr('raid.upgrade', {
        cost: s.cards[i] * 10
    }), 0, -33, 360, 48, () => this.act(() => this.game.upgradeCard(i, this.id('card')), () => this.cardDetail(i)), true,{unavailable:()=>this.game.raid&&!this.game.raid.claimed?this.tr('error.protected'):this.costReason('dust',s.cards[i]*10)||this.needReason(this.tr('feedback.fragments',{index:i+1}),s.fragments[i],s.cards[i])}); this.button(p, this.tr('action.back'), 0, -112, 360, 44, () => this.cards()); }
    format(value:number):string{return fmt(value,this.game.s.extra.scientific);}
    raidLobby():void{this.extensions.solo();}
    raidView(): void { const p = this.open(this.tr('raid.title'), 700), r = this.game.raid!; const status = this.label(p, '', 0, 266, 375, 32, 20, C.gold); const parts: Label[] = []; for (let i = 0; i < 8; i++) {
        const x = i % 2 ? -94 : 94, y = 178 - Math.floor(i / 2) * 88;
        const b = this.button(p, '', x, y, 170, 70, () => { this.game.raidTap(i); this.sound(170 + i * 30); });
        parts.push(this.label(b, '', 0, 0, 156, 61, 16, C.text));
    } const done = this.button(p, this.tr('action.claim'), 0, -243, 365, 51, () => { if (!r.ended)
        return; this.act(() => this.game.claimRaid(this.id('raid')), () => this.info(this.tr('raid.result'), this.tr('raid.reward', {
        damage: display(r.damage), dust: Math.floor(r.damage / 100)
    }))); }, true); this.modalRefresh = () => { status.string = this.tr('raid.damage', {
        damage: display(r.damage), seconds: Math.ceil(r.seconds)
    }); parts.forEach((l, i) => l.string = this.tr('raid.part', {
        part: i + 1
    }) + '\n' + display(r.hp[i] + r.armor[i])); done.active = r.ended && !r.claimed; }; this.modalRefresh(); }
    events(): void { const p = this.open(this.tr('event.title'), 670); this.label(p, this.tr('event.balance', {
        tokens: this.game.s.eventTokens
    }), 0, 246, 380, 35, 22, C.gold); this.label(p, this.tr('event.rule'), 0, 158, 380, 116, 17, C.muted); this.button(p, this.tr('event.board'), -99, 57, 182, 50, () => this.board()); this.button(p,this.tr('extra.eventModes'),99,57,182,50,()=>this.extensions.eventHub()); this.scroll(p, 0, -140, 400, 270, Array.from({
        length: 10
    }, (_, i) => ({
        title: this.tr('event.reward', {
            tokens: (i + 1) * 100
        }), locked:Math.max(this.game.s.extra.eventEarned,this.game.s.eventTokens)<(i+1)*100, action: this.tr(this.game.s.claims.includes(`event.${i}`) ? 'action.claimed' : 'action.claim'), click: () => this.act(() => this.game.claimEvent(i), () => this.events())
    }))); }
    board(): void { const p = this.open(this.tr('event.board'), 610); this.label(p, this.tr('event.balance', {
        tokens: this.game.s.eventTokens
    }), 0, 215, 375, 40, 20, C.gold); for (let i = 0; i < 16; i++) {
        const v = this.game.s.board[i];
        this.button(p, v ? this.tr('event.found', {
            gems: v * 5
        }) : this.tr('event.tile', {
            index: i + 1
        }), -147 + i % 4 * 98, 123 - Math.floor(i / 4) * 85, 88, 70, () => this.act(() => this.game.revealTile(i, this.id('tile')), () => this.board()), !!v);
    } this.button(p, this.tr('action.back'), 0, -244, 365, 43, () => this.events()); }
    meta(): void { const p = this.open(this.tr('meta.title'), 540); [['meta.souls', () => this.extensions.souls()], ['meta.gems', () => this.extensions.gems()], ['meta.research', () => this.research()], ['meta.monuments', () => this.extensions.monuments()]].forEach((v, i) => this.button(p, this.tr(v[0] as string), 0, 139 - i * 91, 372, 70, v[1] as () => void)); }
    souls(): void { const s = this.game.s, p = this.open(this.tr('meta.souls'), 440); this.label(p, this.tr('meta.soulInfo', {
        souls: s.souls, count: s.titans.filter(Boolean).length
    }), 0, 60, 380, 160, 20); this.button(p, this.tr('meta.summon'), 0, -105, 370, 55, () => this.act(() => this.game.summon(this.id('summon')), () => this.souls()), true); }
    stones(): void { const s = this.game.s, p = this.open(this.tr('meta.gems'), 680); this.label(p, this.tr('meta.gemInfo', {
        geodes: s.geodes, count: s.stones.filter(Boolean).length
    }), 0, 251, 375, 42, 19, C.gold); this.button(p, this.tr('meta.crack'), 0, 190, 375, 46, () => this.act(() => this.game.crack(this.id('geode')), () => this.stones()), true); this.scroll(p, 0, -74, 400, 440, s.stones.map((level, i) => ({
        title: this.tr('meta.stone', {
            index: i + 1, level
        }), icon: i, tint: C.violet
    }))); }
    research(): void { const s = this.game.s, p = this.open(this.tr('meta.research'), 650); this.scroll(p, 0, -25, 400, 520, s.research.map((level, i) => ({
        title: this.tr('meta.researchNode', {
            index: i + 1, level
        }), action: this.tr('action.upgrade'), click: () => this.act(() => this.game.upgradeResearch(i, this.id('research')), () => this.research())
    }))); }
    monuments(): void { const s = this.game.s, p = this.open(this.tr('meta.monuments'), 670); this.label(p, this.tr('meta.monumentInfo', {
        value: this.format(s.mementos)
    }), 0, 225, 380, 80, 19, C.gold); this.scroll(p, 0, -66, 400, 460, s.monuments.map((level, i) => ({
        title: this.tr('meta.monument', {
            index: i + 1, level
        }), action: this.tr('action.upgrade'), icon: i, click: () => this.act(() => this.game.monument(i, this.id('monument')), () => this.monuments())
    }))); }
    async remote(work: () => Promise<void>): Promise<void> { if (this.remoteBusy)
        return; const firstUseKey=this.tutorial?.currentAction,before=this.feedback.snapshot();this.remoteBusy = true; try {
        await work();
        this.feedback.finish(before);
        if(firstUseKey)this.tutorial.complete(firstUseKey);
    }
    catch (e) {
        this.operations?.report('action',e);const key = (e as Error).message;
        if(key==='online.unreachable'){this.confirm(this.tr('extra.retry'),this.tr(key),()=>{void this.remote(work);});}else this.toast(this.tr(key.startsWith('online.') || key.startsWith('error.') || key.startsWith('extra.') ? key : 'online.serverError'));
    }
    finally {
        this.remoteBusy = false;
    } }
    edit(parent: Node, x: number, y: number, w: number, h: number, placeholder: string): EditBox {
        this.label(parent,placeholder,x,y+h/2+13,w,18,12,C.muted,Label.HorizontalAlign.LEFT);
        const border=this.rect(parent,x,y,w,h,C.panel,C.line);
        const n=this.nodeAt(border,'input',0,0,w-12,h-8);
        n.active=false;
        const field=n.addComponent(EditBox);
        field.textLabel=this.label(n,'',0,0,w-20,h-10,18,C.text,Label.HorizontalAlign.LEFT);
        field.placeholderLabel=this.label(n,placeholder,0,0,w-20,h-10,16,C.muted,Label.HorizontalAlign.LEFT);
        field.maxLength=240;
        field.inputMode=EditBox.InputMode.SINGLE_LINE;
        field.placeholder=placeholder;
        n.active=true;
        return field;
    }

    guild(): void {
        void this.remote(async () => {
            const boot = await this.onlineService.connect(this.tr('online.defaultName'));
            if (!boot.membership) {
                const guilds = await this.onlineService.request('/guilds');
                const p = this.open(this.tr('menu.clan'), 690);
                const name = this.edit(p, 0, 230, 375, 48, this.tr('online.guildName'));
                name.maxLength = 24;
                this.button(p, this.tr('online.create'), 0, 163, 375, 46, () => { const value = name.string; void this.remote(async () => { await this.onlineService.command('/guild/create', {
                    name: value
                }); this.remoteBusy = false; this.guild(); }); }, true);
                this.scroll(p, 0, -80, 400, 400, guilds.map((g: any) => ({
                    title: g.name, sub: this.tr('online.members', {
                        count: g.members
                    }), action: this.tr('online.join'), click: () => this.extensions.joinGuild(g.id,g.name)
                })));
                return;
            }
            const data = await this.onlineService.request('/guild'), p = this.open(data.guild.name, 710);
            this.label(p, this.tr('online.members', {
                count: data.members.length
            }), -60, 271, 250, 30, 18, C.gold);this.button(p,'⋯',164,271,55,34,()=>this.extensions.guildTools());
            this.button(p, this.tr('online.roster'), -101, 221, 185, 43, () => this.guildMembers(data));
            this.button(p, this.tr('online.guildRaid'), 101, 221, 185, 43, () => this.guildRaid(data));
            this.scroll(p, 0, 10, 400, 355, data.messages.map((m: any) => ({
                title: m.name, sub: /^\[sticker:[0-5]\]$/.test(m.body)?this.tr('extra.sticker.'+m.body[9]):m.body
            })));
            const message = this.edit(p, -35, -216, 303, 46, this.tr('online.message'));
            this.button(p, this.tr('online.send'), 161, -216, 70, 46, () => { const value = message.string; void this.remote(async () => { await this.onlineService.command('/guild/chat', {
                body: value
            }); this.remoteBusy = false; this.guild(); }); }, true);
            this.button(p, this.tr('online.refresh'), -101, -281, 185, 44, () => this.guild());
            this.button(p, this.tr('online.leave'), 101, -281, 185, 44, () => this.confirm(this.tr('online.leave'), this.tr('online.leaveConfirm'), () => { void this.remote(async () => { await this.onlineService.command('/guild/leave'); this.remoteBusy = false; this.guild(); }); }));
        });
    }
    guildMembers(data: any): void { const p = this.open(this.tr('online.roster'), 650); this.scroll(p, 0, -28, 400, 520, data.members.map((m: any) => ({
        title: m.name, detail:()=>this.extensions.member(m.id), sub: this.tr(m.role === 'leader' ? 'online.leader' : 'online.member'), action: data.role === 'leader' && m.id !== this.onlineService.accountId ? this.tr('action.details') : undefined, click: () => { if (data.role !== 'leader' || m.id === this.onlineService.accountId)
            return; const box = this.open(m.name, 350); ['transfer', 'kick'].forEach((action, i) => this.button(box, this.tr(`online.${action}`), 0, 30 - i * 86, 360, 55, () => this.confirm(this.tr(`online.${action}`), m.name, () => { void this.remote(async () => { await this.onlineService.command('/guild/role', {
            target: m.id, action
        }); this.remoteBusy = false; this.guild(); }); }))); }
    }))); }
    guildRaid(data: any): void { const p = this.open(this.tr('online.guildRaid'), 440); this.label(p, this.tr('online.guildHP', {
        hp: display(data.guild.raid_hp)
    }), 0, 90, 380, 60, 24, C.ember); this.label(p, this.tr('online.guildRaidInfo'), 0, 9, 380, 90, 18, C.muted); this.button(p, this.tr('action.attack'), 0, -124, 370, 55, () => { this.extensions.guildBattle(); }, true); }
    competition():void{this.extensions.tournaments();}
    competitionBattle(state: any): void { const p = this.open(this.tr(this.competitionId<0?'complete.regular':'online.abyss'), 680); this.label(p, this.tr('hud.stage', {
        stage: state.run.stage
    }), 0, 247, 380, 45, 28, C.gold); this.label(p, this.tr('hud.gold', {
        value: this.format(state.run.gold)
    }), 0, 196, 375, 30, 19, C.gold); this.label(p, this.format(state.run.hp), 0, 145, 375, 30, 18, C.ember); const command = (action: string, hero = -1) => { void this.remote(async () => { const result = await this.onlineService.command('/competition/action', {
        id: this.competitionId, action, hero
    }); this.competitionBattle(result.state); }); }; this.button(p, this.tr('action.attack'), 0, 50, 375, 120, () => command('tap'), true); this.button(p,this.tr('extra.abyssShop'),0,-203,375,44,()=>command('shop'));this.button(p, this.tr('online.upgradeMaster', {
        level: state.run.master
    }), 0, -70, 375, 50, () => command('upgrade')); this.button(p, this.tr('nav.heroes'), -100, -140, 180, 50, () => command('upgrade', 0)); this.button(p, this.tr(state.run.boss ? 'battle.leave' : 'battle.fight'), 100, -140, 180, 50, () => command('boss')); this.button(p, this.tr('online.backMain'), 0, -270, 375, 50, () => { this.close(); this.drawPanel(); }); }
    spells(slot = 0): void { const s = this.game.s, p = this.open(this.tr('spell.title'), 715); for (let j = 0; j < 6; j++)
        this.button(p, String(j + 1), -165 + j * 66, 260, 60, 40, () => this.spells(j), j === slot); this.scroll(p, 0, -24, 400, 490, SPELLS.filter(c=>s.run.master>=c.unlock||c.id===SPELLS.find(c=>s.run.master<c.unlock)?.id).map(c => ({locked:s.run.master<c.unlock,
        title: this.tr(`spell.${c.id}`), sub: this.tr('spell.detail', {
            level: s.run.spellLevels[c.id], unlock: c.unlock, mana: this.game.spellMana(c.id)
        }), icon: c.id, tint: C.violet, action: this.tr(s.spellSlots.includes(c.id) ? 'action.details' : 'action.select'), click: () => { if (s.spellSlots.includes(c.id)) {
            const box = this.open(this.tr(`spell.${c.id}`), 400);
            this.label(box, this.tr('spell.detail', {
                level: s.run.spellLevels[c.id], unlock: c.unlock, mana: this.game.spellMana(c.id)
            }), 0, 70, 375, 70, 20);
            this.label(box, this.tr('spell.multicast'), 0, 0, 375, 60, 16, C.muted);
            this.button(box, this.tr('action.upgrade'), 0, -106, 360, 50, () => { if (this.game.upgradeSpell(c.id)) {
                this.close();
                this.drawPanel();
                this.spells(slot);
            }
            else
                this.flushNotice(); }, true,{unavailable:()=>s.run.spellLevels[c.id]>=c.cap?this.tr('action.maxReached'):s.run.master<c.unlock?this.tr('action.needLevel',{level:c.unlock}):this.costReason('gold',this.game.spellUpgradeCost(c.id))});
        }
        else
            this.confirm(this.tr('spell.title'), this.tr('spell.swap'), () => { if (this.game.selectSpell(slot, c.id)) {
                this.close();
                this.draw();
                this.spells(slot);
            }
            else
                this.flushNotice(); }); }
    }))); }
    skillNode(i: number): void {
        const branch=Math.floor(i/3),p=this.open(this.tr('skills.node',{branch:this.tr(`branch.${branch}`),tier:i%3+1,level:this.draft[i]}),440);
        const card=this.rect(p,0,64,372,120,C.panel,C.line);
        this.ui.icon(this.nodeAt(card,'skill-art',-136,0,64,64),['sword','fox','flag','lightning','adventurer','scroll'][branch]);
        this.label(card,this.tr('skills.info'),39,0,254,100,14,'#38696b');
        this.button(p,'−',-90,-57,160,54,()=>{this.draft[i]=Math.max(0,this.draft[i]-1);this.skillNode(i);},false,{style:'quiet',fontSize:23});
        this.button(p,'+',90,-57,160,54,()=>{this.draft[i]=Math.min(SKILLS[i].max,this.draft[i]+1);this.skillNode(i);},true,{fontSize:23});
        this.button(p,this.tr('action.back'),0,-157,350,44,()=>this.skills(false));
    }
    artifactDetail(i:number):void {
        this.tutorial.complete('first:artifact');
        const s=this.game.s,p=this.open(this.tr(`artifact.${i}`),530);this.glyph(p,0,135,i,C.violet);
        this.metric(p,'symbol:up',String(s.artifacts[i]),-96,69,164,this.tr('action.level',{level:s.artifacts[i]}));
        this.metric(p,['sword','symbol:hand','adventurer','symbol:coin'][i%4],this.artifactMultiplier(i),96,69,164,this.tr(`effect.${i%4}`));
        this.button(p,this.format(this.game.artifactCost(i)),0,-9,370,54,()=>this.act(()=>this.game.upgradeArtifact(i,this.id('artifact')),()=>{this.drawPanel();this.artifactDetail(i);}),true,{icon:'symbol:plus',hint:this.tr('action.upgrade'),unavailable:()=>this.costReason('relics',this.game.artifactCost(i))});
        this.button(p,this.tr('artifact.salvage'),-96,-91,178,54,()=>this.confirm(this.tr('artifact.salvage'),this.tr('artifact.salvageInfo'),()=>this.act(()=>this.game.salvageArtifact(i,this.id('salvage')),()=>{this.close();this.drawPanel();})),false,{style:'danger',unavailable:()=>s.enchanted[i]?this.tr('error.protected'):this.costReason('gems',20)});
        this.button(p,this.tr('ui.enchantCost',{cost:1000}),96,-91,178,54,()=>this.act(()=>this.game.enchantArtifact(i,this.id('enchant')),()=>this.artifactDetail(i)),false,{icon:'lightning',hint:this.tr('artifact.enchantInfo'),unavailable:()=>s.enchanted[i]?this.tr('action.alreadyApplied'):!s.artifacts.every(v=>v>0)?this.tr('artifact.enchantInfo'):this.costReason('relics',3)});
        this.button(p,this.tr('ui.iconHelp'),0,-193,370,44,()=>this.info(this.tr(`artifact.${i}`),this.tr(`effect.${i%4}`)+'\n'+this.tr('artifact.enchantInfo')),false,{icon:'symbol:info',iconOnly:true});
    }
    salvaged(): void { const p = this.open(this.tr('artifact.salvaged'), 600); this.scroll(p, 0, -24, 400, 480, this.game.s.salvaged.map(i => ({
        title: this.tr(`artifact.${i}`), sub: this.tr('artifact.rebuyInfo'), unavailable:()=>this.costReason('gems',25), icon: i, action: this.tr('action.buy'), click: () => this.act(() => this.game.rebuyArtifact(i, this.id('rebuy')), () => { this.drawPanel(); this.salvaged(); })
    }))); }
    equipmentTools(): void { const p = this.open(this.tr('nav.equipment'), 460); [['equipment.sets', () => this.sets()], ['equipment.bulk', () => this.confirm(this.tr('equipment.bulk'), this.tr('equipment.bulkInfo'), () => this.act(() => this.game.sell(this.game.s.equipment.filter(e => !e.locked && !this.game.s.equipped.includes(e.id)).map(e => e.id), this.id('bulk')), () => { this.close(); this.drawPanel(); }))], ['equipment.transmog', () => this.transmog()]].forEach((v, i) => this.button(p, this.tr(v[0] as string), 0, 114 - i * 96, 375, 60, v[1] as () => void)); }
    transmog(): void { const p = this.open(this.tr('equipment.transmog'), 650); this.scroll(p, 0, -24, 400, 520, this.game.s.equipment.map(e => ({
        title: this.itemName(e), icon: e.slot, action: this.tr('action.apply'), click: () => this.act(() => this.game.transmog(e.slot, e.id, this.id('transmog')), () => { this.close(); this.draw(); })
    }))); }
    achievements(): void { const p = this.open(this.tr('achievement.title'), 570); this.scroll(p, 0, -24, 400, 450, [0, 1, 2, 3].map(i => ({
        title: this.tr(`achievement.${i}`), sub: this.tr('daily.progress', {
            current: this.game.achievementProgress(i), goal: this.game.achievementGoal(i)
        }), icon: i, tint: C.gold, action: this.tr('action.claim'), click: () => this.act(() => this.game.claimAchievement(i, this.id('achievement')), () => this.achievements())
    }))); }
    globalRaid():void {void this.remote(async()=>{await this.onlineService.connect(this.tr('online.defaultName'));const data=await this.onlineService.request('/global');this.globalRaidPanel(data);});}
    globalRaidPanel(data:any):void {const p=this.open(this.tr('extra.globalRaid'),450);this.label(p,this.tr('online.guildHP',{hp:display(data.hp)}),0,90,375,70,24);this.button(p,this.tr('action.attack'),0,-65,375,60,()=>{void this.remote(async()=>{const next=await this.onlineService.command('/global/attack');this.globalRaidPanel(next);});},true);}
    eventRanks():void {void this.remote(async()=>{await this.onlineService.connect(this.tr('online.defaultName'));const rows=await this.onlineService.request('/global/ranks');const p=this.open(this.tr('extra.eventRanks'),660);this.scroll(p,0,-25,400,530,rows.map((r:any,i:number)=>({title:this.tr('online.rank',{rank:i+1,name:r.name}),sub:this.tr('extra.contribution',{value:r.damage})})));});}
    updateHUD(): void { this.buttonStates=this.buttonStates.filter(b=>isValid(b.node,true));this.buttonStates.forEach(b=>b.refresh());const g = this.game, r = g.s.run;this.equipmentPile.active=g.s.extra.unseenEquipment.length>0;this.equipmentPile.getComponentInChildren(Label)!.string=this.tr('complete.pile',{count:g.s.extra.unseenEquipment.length}); this.fairy.active = g.s.maxStage>=3&&Date.now()>=g.s.fairyAt; this.stageLabel.string = String(r.stage);this.stageNeighbors.forEach((l,i)=>l.string=String(Math.max(1,r.stage+(i?1:-1)))); this.enemyLabel.string = this.tr('battle.wave',{count:survivingEnemies(waveSize(r.stage,r.boss),ratio(r.hp,g.maxHP()))}); this.goldLabel.string = this.format(r.gold); this.gemsLabel.string = String(g.s.gems); this.damageLabel.string = this.format(g.tapDamage()); this.manaLabel.string = Math.floor(r.mana)+'/120'; this.hpFill.setScale(this.enemyTransition>.2?0:Math.max(.001,ratio(r.hp,g.maxHP())),1,1);this.hpLabel.string=this.enemyTransition>.2?this.tr('battle.defeated'):this.format(r.hp); this.progressLabel.string = this.tr(r.boss ? 'hud.timer' : 'hud.progress', {
        seconds: Math.ceil(r.bossLeft), count: r.kills
    }); this.bossButton.active = r.kills >= 5; const l = this.bossButton.getComponentInChildren(Label); if (l)
        l.string = this.tr(r.boss ? 'battle.leave' : 'battle.fight'); this.spellLabels.forEach((l, slot) => { const i = this.spellShown[slot]; l.string = r.master<SPELLS[i].unlock?String(SPELLS[i].unlock):r.cooldowns[i]>0?String(Math.ceil(r.cooldowns[i])):'✓'; }); }
    attack(): void { if(!this.entry.playing||this.liveOps.blocked||this.enemyTransition>0||!this.operations.ready||this.operations.busy||this.operations.conflict||this.remoteBusy||this.feedback.asyncPending||this.feedback.showing)return;if(!this.game.s.extra.effects){this.game.tap();this.syncEnemyDeath();this.sound(180);return;}Tween.stopAllByTarget(this.actor);this.actor.setPosition(-67,12);tween(this.actor).to(.12,{position:new Vec3(-64,12,0)}).start();this.fireBurst(-64,51);const damage = this.game.tap(); this.sound(170 + Math.random() * 50); const n = this.label(this.particles, this.format(damage), 138+(Math.random() - .5) * 40, 155, 180, 40, 25, UI.brightGold).node; n.addComponent(UIOpacity); tween(n).by(.6, {
        position: new Vec3(0, 70, 0)
    }).call(() => {if(isValid(n,true))n.destroy();}).start(); this.bulletImpact(138,48); this.enemy.setPosition(2, 0); tween(this.enemy).to(.08, {
        position: new Vec3(0, 0, 0)
    }).start(); this.syncEnemyDeath();this.updateHUD(); }
    combatSprite(key:CombatEffect,name:string,x:number,y:number,size:number):Node|null {
        if(!this.game.s.extra.effects||!this.particles||!isValid(this.particles,true))return null;
        // Bound concurrent sprites during rapid taps; preserve unrelated damage labels.
        const effects=this.particles.children.filter(n=>n.getComponent(Sprite));
        if(effects.length>=72){const oldest=effects[0];Tween.stopAllByTarget(oldest);const opacity=oldest.getComponent(UIOpacity);if(opacity)Tween.stopAllByTarget(opacity);oldest.removeFromParent();oldest.destroy();}
        const n=this.nodeAt(this.particles,name,x,y,size,size);
        if(!this.ui.paint(n,`effects/${key}`)){n.destroy();return null;}
        return n;
    }
    burst(key:CombatEffect,x:number,y:number,size:number,seconds:number):void {
        const n=this.combatSprite(key,`fx-${key}`,x,y,size);if(!n)return;
        const opacity=n.addComponent(UIOpacity);n.setScale(.72,.72,1);
        tween(n).to(seconds*.35,{scale:new Vec3(1,1,1)}).to(seconds*.65,{scale:new Vec3(1.12,1.12,1)}).call(()=>{if(isValid(n,true))n.destroy();}).start();
        tween(opacity).delay(seconds*.3).to(seconds*.7,{opacity:0}).start();
    }
    spark(x:number,y:number,color:string):void {
        const magic=color===C.violet;this.burst(magic?'ring':'impact',x,y,magic?92:66,magic?.3:.2);
        for(let i=0;i<6;i++){
            const n=this.combatSprite(magic?'shard':'sparkle','hit-particle',x,y,12+i%3*3);if(!n)continue;
            const angle=i*Math.PI/3+Math.random()*.3,opacity=n.addComponent(UIOpacity);
            tween(n).by(.28,{position:new Vec3(Math.cos(angle)*(30+i%3*9),Math.sin(angle)*(27+i%2*10),0)}).call(()=>{if(isValid(n,true))n.destroy();}).start();
            tween(opacity).to(.28,{opacity:0}).start();
        }
    }
    sound(frequency: number): void { if (!this.game.s.audio)
        return; try {
        const w = globalThis as any;
        const A = w.AudioContext || w.webkitAudioContext;
        if (!A)
            return;
        if (!this.audioContext)
            this.audioContext = new A();
        const ctx = this.audioContext;
        if (ctx.state === 'suspended')
            void ctx.resume();
        const o = ctx.createOscillator(), gain = ctx.createGain();
        o.type = 'triangle';
        o.frequency.setValueAtTime(frequency, ctx.currentTime);
        o.frequency.exponentialRampToValueAtTime(frequency * .55, ctx.currentTime + .075);
        gain.gain.setValueAtTime(.035, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .09);
        o.connect(gain);
        gain.connect(ctx.destination);
        o.start();
        o.stop(ctx.currentTime + .1);
    }
    catch { } }
    toast(text: string): void { if (this.toastNode && isValid(this.toastNode,true)) {
        this.toastNode.removeFromParent();
        this.toastNode.destroy();
    } const n = this.rect(this.root, 0, -302, 434, 82, '#334754', C.gold); this.toastNode = n; this.label(n, text, 0, 0, 404, 72, 16, C.text); tween(n).delay(3.2).call(() => { if (isValid(n,true))
        n.destroy(); if (this.toastNode === n)
        this.toastNode = null; }).start(); }
    flushNotice(): void { if(!this.modal&&!this.tutorial.active&&this.game.s.extra.unlockNotices.length){const stage=this.game.s.extra.unlockNotices.shift()!;this.game.persist();this.tutorial.unlock(stage);return;} if(!this.modal&&!this.feedback.showing&&!this.tutorial.active&&this.game.s.extra.rewardNotices.length){const reward=this.game.s.extra.rewardNotices.shift()!;this.game.persist();this.feedback.notice('complete.reward.'+reward.kind,{value:reward.value,count:reward.count,hero:['weapon','scroll'].includes(reward.kind)?this.tr('hero.'+reward.value):''});return;} if (this.game.notice) {
        this.toast(this.tr(this.game.notice));
        this.game.notice = '';
    } }
    update(dt:number):void {
        if(!this.game||!this.entry?.playing)return;
        this.feedback.tick();this.tutorial.tick();
        this.liveOps.tick(dt);if(this.liveOps.blocked||!this.operations.ready||this.operations.busy||this.operations.conflict||this.remoteBusy||this.feedback.asyncPending||this.feedback.showing)return;
        if(this.particles)this.particles.active=this.game.s.extra.effects;
        if(this.enemyTransition>0){const old=this.enemyTransition;this.enemyTransition=Math.max(0,old-dt);this.game.tick(0);if(old>.2&&this.enemyTransition<=.2)this.spawnEnemy();}
        else {this.syncAllies();this.game.tick(dt);
            for(const event of this.game.heroEvents){
                if(event.phase==='attack')this.animateAlly(event.hero,event.windup);
                else {const target=this.shotTarget();this.bulletImpact(target.x,target.y);this.sound(120);}
            }
            this.syncEnemyDeath();}
        if(!this.enemyTransition){const look=this.enemyKey();if(this.enemyLook!==look)this.spawnEnemy();this.syncWave();}
        if(this.worldKey!==Math.floor((this.game.s.run.stage-1)/25)%4)this.world();
        this.age+=dt;this.refresh+=dt;this.saveClock+=dt;
        this.syncAllies();
        if(this.refresh>.15){this.refresh=0;this.updateHUD();if(this.modalRefresh)this.modalRefresh();this.flushNotice();}
        if(this.saveClock>=5){this.saveClock=0;this.extensions.notifyReady();this.game.persist();}
    }
}
