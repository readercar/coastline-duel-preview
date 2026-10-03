import { _decorator, Component, Node, UITransform, Graphics, Color, Label, Vec3, Layers, Mask, ScrollView, EventTouch, tween, Tween, UIOpacity, sys, view, ResolutionPolicy, resources, Sprite, SpriteFrame, BlockInputEvents, Input, input, EventKeyboard, KeyCode, profiler, EditBox, Texture2D } from 'cc';
import { Game, Item } from './core/Game';
import { fmt, display, ratio, ZERO, add, mul } from './core/Amount';
import { HEROES, PETS, ARTIFACTS, SPELLS, SKILLS, CARDS } from './core/Config';
import { t } from './core/I18n';
import { ExpansionUI } from './ExpansionUI';
import { Monetization } from './core/Monetization';
import { MonetizationUI } from './MonetizationUI';
import { LiveOpsUI } from './LiveOpsUI';
import { Online } from './core/Online';
import { FirebaseCloud } from './FirebaseCloud';
import { FirebaseCommerce, AdMobRewarded } from './NativeServices';
const { ccclass } = _decorator;
const C = {
    bg: '#101b28', panel: '#192838', raised: '#24384a', line: '#3c5362', text: '#f2e6cf', muted: '#a3b7bb', gold: '#ecc071', ember: '#f48960', mint: '#8bd3b8', violet: '#b99ee9', blue: '#82bcdd'
};
interface Row {
    title: string;
    sub?: string;
    detail?: () => void;
    action?: string;
    click?: () => void;
    icon?: number;
    tint?: string;
}
@ccclass('GameApp')
export class GameApp extends Component {
    cloud = new FirebaseCloud();
    liveOps!: LiveOpsUI;
    onlineService!: Online;
    payments!:MonetizationUI;
    remoteBusy = false;
    folded=false;
    battleCast!:Node;
    enemyLook = "";
    seenKills = 0;
    enemyTransition = 0;
    allies!: Node;
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
    particles!: Node;
    bossButton!: Node;
    fairy!: Node;
    equipmentPile!:Node;
    modalRefresh: (() => void) | null = null;
    draft: number[] = [];
    audioContext: any = null;
    tr(key: string, args: Record<string, string | number> = {}): string { return t(this.game.s.locale, key, args); }
    id(kind: string): string { return `${kind}:${Date.now()}:${++this.tx}`; }
    onLoad(): void {
        view.setDesignResolutionSize(480, 960, ResolutionPolicy.SHOW_ALL);
        profiler.hideStats();
        this.game = new Game(sys.localStorage);this.extensions=new ExpansionUI(this);
        this.onlineService = new Online(sys.localStorage);this.payments=new MonetizationUI(this,new Monetization(this.game,sys.isNative&&sys.os===sys.OS.ANDROID?new FirebaseCommerce(sys.localStorage):this.onlineService));
        if(sys.isNative&&sys.os===sys.OS.ANDROID)this.payments.model.ads=new AdMobRewarded(this.payments.model.online as FirebaseCommerce);
        this.liveOps=new LiveOpsUI(this);
        this.draw();void this.liveOps.refresh();
        input.on(Input.EventType.KEY_DOWN, this.key, this);
        if (this.game.s.offline > ZERO)
            this.offline();
    }
    onDestroy(): void { input.off(Input.EventType.KEY_DOWN, this.key, this); this.game.persist(); }
    key(e: EventKeyboard): void { if (e.keyCode === KeyCode.ESCAPE)
        this.close(); if (e.keyCode === KeyCode.SPACE && !this.modal)
        this.attack(); }
    color(hex: string, alpha = 255): Color { const c = new Color(); Color.fromHEX(c, hex); c.a = alpha; return c; }
    nodeAt(parent: Node, name: string, x: number, y: number, w: number, h: number): Node { const n = new Node(name); n.layer = Layers.Enum.UI_2D; n.parent = parent; n.setPosition(x, y); n.addComponent(UITransform).setContentSize(w, h); return n; }
    rect(parent: Node, x: number, y: number, w: number, h: number, fill: string, border?: string, alpha = 255): Node { const n = this.nodeAt(parent, 'shape', x, y, w, h), g = n.addComponent(Graphics); g.fillColor = this.color(fill, alpha); g.rect(-w / 2, -h / 2, w, h); g.fill(); if (border) {
        g.strokeColor = this.color(border);
        g.lineWidth = 2;
        g.rect(-w / 2 + 1, -h / 2 + 1, w - 2, h - 2);
        g.stroke();
    } return n; }
    label(parent: Node, text: string, x: number, y: number, w: number, h: number, size = 18, color = C.text, align = Label.HorizontalAlign.CENTER): Label { const n = this.nodeAt(parent, 'text', x, y, w, h), l = n.addComponent(Label); l.string = text; l.fontFamily = 'Arial'; l.fontSize = size; l.lineHeight = size * 1.35; l.color = this.color(color); l.horizontalAlign = align; l.verticalAlign = Label.VerticalAlign.CENTER; l.overflow = Label.Overflow.SHRINK; l.enableWrapText = true; return l; }
    button(parent: Node, text: string, x: number, y: number, w: number, h: number, action: () => void, accent = false): Node { const n = this.rect(parent, x, y, w, h, accent ? '#664839' : C.raised, accent ? C.gold : C.line); this.label(n, text, 0, 0, w - 12, h - 8, 16, accent ? C.gold : C.text); n.on(Node.EventType.TOUCH_END, (e: EventTouch) => { e.propagationStopped = true; action(); }); return n; }
    draw():void {
        this.node.children.filter(n=>n.name==='EmberRoot').forEach(n=>{n.removeFromParent();n.destroy();});
        this.root=this.nodeAt(this.node,'EmberRoot',0,0,480,960);this.rect(this.root,0,0,480,960,C.bg);
        this.seenKills=this.game.s.totalKills;this.enemyTransition=0;this.allySignature='';this.world();
        const settings=this.button(this.root,'⚙',-210,451,38,38,()=>this.settings());const gear=settings.getComponentInChildren(Label)!;gear.fontSize=30;gear.lineHeight=30;
        this.stageNeighbors=[];[-1,1].forEach((offset,i)=>{const n=this.circle(this.root,i?76:-76,447,18,'#69808c');this.stageNeighbors.push(this.label(n,String(Math.max(1,this.game.s.run.stage+offset)),0,0,32,30,17));});
        this.circle(this.root,0,447,22,'#5aaa8c');this.stageLabel=this.label(this.root,'',0,447,42,38,20);
        this.bossButton=this.button(this.root,this.tr('battle.fight'),180,442,111,44,()=>this.game.toggleBoss());
        this.rect(this.root,0,405,284,20,'#14202b');this.hpFill=this.nodeAt(this.root,'health',-140,405,280,16);this.hpFill.getComponent(UITransform)!.setAnchorPoint(0,.5);this.rect(this.hpFill,140,0,280,16,'#ee762e');
        this.enemyLabel=this.label(this.root,'',-30,405,206,19,13,C.text,Label.HorizontalAlign.LEFT);
        this.hpLabel=this.label(this.root,'',116,405,74,19,12,C.text);
        this.progressLabel=this.label(this.root,'',-113,381,110,20,12,C.ember);
        this.goldLabel=this.label(this.root,'',15,375,180,32,27,C.gold);this.coin(this.root,-35,375,11);
        this.battleCast=this.nodeAt(this.root,'battle-cast',0,this.folded?-300:0,480,600);
        this.enemy=this.nodeAt(this.battleCast,'sentinel',0,95,272,224);this.sentinel(this.nodeAt(this.enemy,'enemy-art',0,0,272,224));this.enemy.addComponent(UIOpacity);
        this.allies=this.nodeAt(this.battleCast,'allies',0,30,480,500);this.syncAllies();
        this.actor=this.nodeAt(this.battleCast,'guardian',-8,0,76,82);this.guardian(this.actor);this.actor.setScale(.78,.78,1);
        const target=this.nodeAt(this.root,'battle-input',0,this.folded?0:143,470,this.folded?740:350);target.on(Node.EventType.TOUCH_END,()=>{if(!this.modal)this.attack();});
        this.fairy=this.button(this.root,'✦',-211,135,36,36,()=>this.payments.fairy(),true);
        this.equipmentPile=this.button(this.root,'',-206,76,58,40,()=>this.extensions.equipmentDrops());
        const edge=this.folded?-337:-39;
        this.rect(this.root,0,edge,480,20,'#54545b');this.button(this.root,this.folded?'▾':'▴',144,edge,65,20,()=>{this.folded=!this.folded;this.draw();});this.button(this.root,this.folded?'＋':'×',211,edge,65,20,()=>{this.folded=!this.folded;this.draw();});
        this.rect(this.root,0,edge-26,480,28,'#39383e');this.damageLabel=this.label(this.root,'',-120,edge-26,226,22,14,C.muted,Label.HorizontalAlign.LEFT);this.gemsLabel=this.label(this.root,'',199,edge-26,67,22,14,C.gold);this.coin(this.root,157,edge-26,7);
        this.manaLabel=this.label(this.root,'',0,-313,220,22,13,C.blue);this.manaLabel.node.active=this.folded;
        this.spellLabels=[];
        if(this.folded){for(let i=0;i<6;i++){const n=this.button(this.root,'',-200+i*80,-400,73,60,()=>{if(this.game.cast(this.game.s.spellSlots[i]))this.spark(0,95,C.violet);this.flushNotice();});this.label(n,['✦','◆','◈','╱','⚑','☾'][i],0,9,65,30,25,C.gold);this.spellLabels.push(this.label(n,'',0,-20,70,22,10));}}
        else {
            this.rect(this.root,0,-105,480,56,'#24232c');
            const actions=[()=>this.cards(),()=>this.skills(),()=>this.achievements(),()=>this.extensions.inbox()];
            ['menu.cards','master.skills','menu.achievements','menu.inbox'].forEach((key,i)=>{const n=this.nodeAt(this.root,'shortcut',-195+i*80,-105,76,54);n.on(Node.EventType.TOUCH_END,actions[i]);this.hudIcon(this.nodeAt(n,'quick-icon',0,8,36,32),i+6,[C.blue,C.ember,C.gold,C.text][i]);this.label(n,this.tr(key),0,-17,75,18,10);});
            this.button(this.root,this.tr('master.buyMode',{count:this.mode===-1?this.tr('action.max'):this.mode}),164,-105,134,40,()=>{this.mode=[1,10,100,-1][([1,10,100,-1].indexOf(this.mode)+1)%4];this.draw();});
        }
        this.panel=this.nodeAt(this.root,'panel',0,-283,480,300);this.panel.active=!this.folded;
        this.particles=this.nodeAt(this.root,'effects',0,this.folded?-300:0,480,960);
        this.drawPanel();this.drawNav();this.updateHUD();
    }
    worldKey = -1;
    world(): void {
        const prior=this.root.getChildByName('world-art');if(prior){prior.removeFromParent();prior.destroy();}
        const world=this.nodeAt(this.root,'world-art',0,0,480,960);world.setSiblingIndex(1);
        const zone=Math.floor((this.game.s.run.stage-1)/25)%4;this.worldKey=zone;
        const palette=[{sky:'#213d50',far:'#2c4f60',near:'#27454d',floor:'#263b39',edge:'#5b6651'},{sky:'#392634',far:'#643b3c',near:'#472f35',floor:'#352932',edge:'#c07447'},{sky:'#24364e',far:'#45617b',near:'#324960',floor:'#2c4559',edge:'#a3c8d0'},{sky:'#292438',far:'#4a3c60',near:'#373049',floor:'#2b283d',edge:'#8974a5'}][zone];
        this.rect(world, 0, 0, 480, 960, this.game.s.extra.cosmetics[2]?['#213d50','#3b304c','#264943','#493731','#283450','#453f28'][this.game.s.extra.cosmetics[2]]:palette.sky);
        const g = this.nodeAt(world, 'landscape', 0, 0, 480, 960).addComponent(Graphics);
        const poly = (points: number[][], color: string) => { g.fillColor = this.color(color); g.moveTo(points[0][0], points[0][1]); for (const p of points.slice(1))
            g.lineTo(p[0], p[1]); g.close(); g.fill(); };
        poly([[-240, 150], [-240, 270], [-190, 270], [-190, 294], [-150, 294], [-150, 309], [-105, 309], [-105, 275], [-50, 275], [-50, 253], [20, 253], [20, 281], [70, 281], [70, 310], [98, 310], [98, 283], [150, 283], [150, 251], [200, 251], [200, 295], [240, 295], [240, 100]], palette.far);
        poly([[-240, 130], [-240, 216], [-211, 216], [-211, 244], [-169, 244], [-169, 221], [-100, 221], [-100, 184], [-35, 184], [-35, 214], [0, 214], [0, 173], [55, 173], [55, 232], [88, 232], [88, 248], [110, 248], [110, 232], [151, 232], [151, 205], [200, 205], [200, 235], [240, 235], [240, 70]], palette.near);
        this.rect(world, -180, 157, 29, 118, '#182f36');
        this.rect(world, -180, 218, 43, 13, '#345255');
        this.rect(world, 154, 128, 35, 150, '#182f36');
        this.rect(world, 154, 210, 54, 16, '#3b5a59');
        for(let i=0;i<6;i++){
            const x=-225+i*85,base=this.folded?-260:20;
            if(zone===0){this.rect(world,x,base+80,12,120,palette.near);poly([[x-35,base+100],[x,base+200],[x+35,base+100]],palette.far);}
            else if(zone===1){poly([[x-30,base],[x-15,base+65+i%2*30],[x+28,base]],palette.near);this.rect(world,x,base+4,30,4,palette.edge);}
            else if(zone===2){poly([[x-25,base],[x-10,base+88],[x+10,base+115],[x+27,base]],palette.far);poly([[x-10,base+88],[x+10,base+115],[x+6,base+15]],palette.edge);}
            else {this.rect(world,x,base+55,24,110,palette.near);this.rect(world,x,base+110,36,10,palette.far);this.rect(world,x,base+75,6,14,palette.edge);}
        }
        const ground=this.nodeAt(world,'ground',0,this.folded?-300:0,480,100);this.rect(ground,0,-32,480,28,palette.floor);
        this.rect(ground, 0, -21, 480, 6, palette.edge);
        for (let i = 0; i < 20; i++)
            this.rect(ground, -230 + i * 25, -27 - (i % 3) * 3, 18 + (i % 3) * 3, 4, '#3e5045');
        this.rect(world, -90, 294, 30, 4, '#62808a');
        this.rect(world, -120, 304, 48, 4, '#62808a');
        this.rect(world, 113, 350, 21, 21, '#b8c3a0');
        this.rect(world, 120, 354, 16, 21, palette.sky);
    }
    pixels(parent: Node, rows: string[], palette: Record<string, string>, scale: number): void { const g = parent.addComponent(Graphics), w = rows[0].length, h = rows.length; rows.forEach((row, y) => row.split('').forEach((c, x) => { if (palette[c]) {
        g.fillColor = this.color(palette[c]);
        g.rect((x - w / 2) * scale, (h - y) * scale - h * scale / 2, scale, scale);
        g.fill();
    } })); }
    sentinel(parent: Node): void {
        // Frontal titan: broad shoulders, long arms, small head. The player's back
        // overlaps its lower silhouette, placing the camera behind the guardian.
        const silhouette=[
            '   aa                      aa   ',
            '   aab                    baa   ',
            '    aabb      aaaa      bbaa    ',
            '     aabbbaaaabbbbaaaabbbaa     ',
            '      abbbbccccccccbbbba        ',
            '       abbccddddddccbba         ',
            '       abcceddccddeccba         ',
            '      aabcccdffffdcccb aa       ',
            '    aaabbbccddddddccbbbaaa      ',
            '  aaabbbbbbbccccccbbbbbbb aaa   ',
            ' aabccbbbbbbbbbbbbbbbbbbccbaa   ',
            ' abccccbbbbbeeeebbbbbbccccba    ',
            'abcccccbbbbeffffebbbbcccccba    ',
            'abcccbbabbbbeeeebbbbab bcc cba  ',
            'abbccbaabbbbccccbbbbaaabcccba   ',
            'abbccbaaabbbccccbbbaaaabcccba   ',
            'abcccba aabbbbbbbbaa  abcccba   ',
            'abcccba  abbbggbbba   abcccba   ',
            'aabbbaa  abbbbbbbba   aabbbaa   ',
            ' aaaa    abbb  bbba    aaaa     ',
            '         abbb  bbba             ',
            '        abccb  bccba            ',
            '        abccb  bccba            ',
            '       aabbbb  bbbbaa           ',
            '      aaabbbb  bbbbaaa          ',
        ];
        const species=this.game.s.run.boss?3:this.game.s.totalKills%3;
        if(species===1){silhouette[0]='       aa              aa       ';silhouette[1]='       aaa            aaa       ';silhouette[2]='        aa    aaaa    aa        ';for(let y=10;y<19;y++)silhouette[y]='aa'+silhouette[y].slice(2,-2)+'aa';}
        if(species===2){silhouette[0]='              aaaa              ';silhouette[1]='             aabbaa             ';silhouette[2]='            aabbbbaa            ';silhouette[6]='       abccddffffddccba         ';silhouette[7]='      aabcccddddddccbaa         ';}
        if(species===3){silhouette[0]='    ff      ff  ff      ff      ';silhouette[1]='    aaf    faaffaaf    faa      ';silhouette[2]='     aabbaaabbbbaaabbaa         ';}
        this.pixels(parent,silhouette, {a:'#172a31',b:['#3c5860','#5b435f','#674633','#35565c','#4f5c37','#584854'][(this.game.s.totalKills+Math.floor(this.game.s.run.stage/25))%6],c:['#73908b','#9982a2','#b28a60','#80adbd','#a0ae73','#aa8398'][(this.game.s.totalKills+Math.floor(this.game.s.run.stage/25))%6],d:'#a5b9a0',e:'#6f342f',f:this.game.s.run.boss?'#ff6655':'#ffc176',g:'#ba8050'},8);
    }
    guardian(parent: Node): void {
        // Back view: dark hair/helmet and cape, no face or eyes.
        this.pixels(parent, [
            '       aaa         ',
            '      aabba        ',
            '      abbbba       ',
            '      aabbba    f  ',
            '       aaa      f  ',
            '    aaddddaa    f  ',
            '   abddddddba   f  ',
            '   abdeeeddbac  f  ',
            '   abdeeeddbacc f  ',
            '    bdeeeedb  fffff',
            '    ddeeedd    f   ',
            '   dddeeeddd       ',
            '   ddddddddd       ',
            '    aa  aa         ',
            '    aa  aa         ',
            '   aaa  aaa        ',
        ], {a:this.appearanceTint(4,'#152630'),b:this.appearanceTint(1,'#728592'),c:'#cc9c79',d:this.appearanceTint(2,['#aa4e40',C.gold,C.blue,C.violet,C.mint,'#d9d7cc'][this.game.s.extra.cosmetics[0]]),e:this.appearanceTint(3,'#d77750'),f:this.appearanceTint(0,'#edcc8d')},4.5);
    }
    appearanceTint(slot:number,fallback:string):string{const value=this.game.s.appearance[slot];return value<0?fallback:[C.gold,C.ember,C.blue,C.violet,C.mint][value%5];}
    enemyKey():string{return `${this.game.s.totalKills}:${this.game.s.run.boss}:${Math.floor((this.game.s.run.stage-1)/25)}`;}
    syncEnemyDeath():void {
        if(this.game.s.totalKills===this.seenKills)return;
        this.seenKills=this.game.s.totalKills;this.enemyTransition=.65;
        for(const missile of [...this.particles.children])if(missile.name==='ally-projectile'){Tween.stopAllByTarget(missile);missile.destroy();}
        const defeated=this.enemy;Tween.stopAllByTarget(defeated);const opacity=defeated.getComponent(UIOpacity)!;Tween.stopAllByTarget(opacity);
        tween(defeated).to(.14,{scale:new Vec3(1.45,.55,1)}).call(()=>{if(defeated.isValid)defeated.active=false;}).start();
        tween(opacity).to(.14,{opacity:0}).start();
        for(let i=0;i<18;i++){const angle=i*Math.PI*2/18,n=this.rect(this.particles,0,95,8+(i%3)*3,8+(i%3)*3,i%3?C.gold:C.ember);tween(n).to(.32,{position:new Vec3(Math.cos(angle)*(85+i%4*16),95+Math.sin(angle)*105,0),scale:new Vec3(.1,.1,1),angle:i*35}).call(()=>n.destroy()).start();}
        this.sound(95);this.updateHUD();
    }
    spawnEnemy():void {
        Tween.stopAllByTarget(this.enemy);this.clear(this.enemy);this.enemy.active=true;this.enemy.setPosition(0,95);
        const opacity=this.enemy.getComponent(UIOpacity)!;Tween.stopAllByTarget(opacity);opacity.opacity=255;
        this.sentinel(this.nodeAt(this.enemy,'enemy-art',0,0,272,224));this.enemyLook=this.enemyKey();
        this.enemy.setScale(.65,.65,1);tween(this.enemy).to(.18,{scale:new Vec3(1,1,1)},{easing:'backOut'}).start();
    }
    syncAllies():void {
        const ids=this.game.s.run.heroes.map((level,i)=>level>0?i:-1).filter(i=>i>=0),key=ids.join(',');if(this.allySignature===key)return;this.allySignature=key;this.clear(this.allies);
        ids.forEach((id,index)=>{const side=index%2?-1:1,x=side*(178-(index>=12?42:0)),y=-39+Math.floor(index%12/2)*46;
            this.rect(this.allies,x,y-25,66,6,'#516455');const actor=this.nodeAt(this.allies,`hero-${id}`,x,y,58,54),body=this.nodeAt(actor,'body',0,0,32,48);
            const tint=[C.ember,C.mint,C.blue,C.violet,C.gold,'#bd8473'][id%6];
            this.pixels(body,[
                '    aaaa    ','   abbbba   ','   abbbba   ','    acca    ','    adda    ','  aaddddaa  ',' aaddddddaa ',' aaddddddaa ',' aeaddddaea ',' aeaddddaea ',' aeaddddaea ',' aeaddddaea ','  aaddddaa  ','   aaaa aa  ','   affa fa  ','   affa fa  ','   affa fa  ','  aaaa aaaa '
            ],{a:'#14232e',b:'#8a9aa4',c:'#c99d75',d:tint,e:'#c8c4a5',f:'#455464'},ids.length>12?1.8:2.5);
            const weapon=this.nodeAt(actor,'weapon',-side*13,0,20,40);
            if(id%3===0){this.rect(weapon,0,5,3,27,'#e9d6a0');this.rect(weapon,0,-5,13,3,C.gold);}
            else if(id%3===1){const bow=weapon.addComponent(Graphics);bow.strokeColor=this.color(C.gold);bow.lineWidth=3;bow.moveTo(0,18);bow.lineTo(-side*8,0);bow.lineTo(0,-18);bow.stroke();bow.lineWidth=1;bow.moveTo(0,18);bow.lineTo(0,-18);bow.stroke();}
            else {this.rect(weapon,0,2,3,35,'#a47f65');this.rect(weapon,0,21,9,9,C.violet);}
            body.setScale(-side,1,1);this.label(actor,this.tr(`hero.${id}`),0,-33,72,16,11,C.text);
        });
    }
    animateAlly(id:number):void {
        const ally=this.allies.getChildByName('hero-'+id);if(!ally)return;const body=ally.getChildByName('body')!;
        Tween.stopAllByTarget(body);body.angle=0;
        tween(body).to(.1,{angle:ally.position.x>0?18:-18}).to(.18,{angle:0}).start();
        const role=Number(ally.name.slice(5))%3;const missile=this.rect(this.particles,ally.position.x,ally.position.y,role===2?9:16,role===2?9:3,role===2?C.violet:C.gold);missile.name='ally-projectile';tween(missile).to(.24,{position:new Vec3(0,100,0)}).call(()=>missile.destroy()).start();
    }
    circle(parent:Node,x:number,y:number,radius:number,color:string):Node{const n=this.nodeAt(parent,'circle',x,y,radius*2,radius*2),g=n.addComponent(Graphics);g.fillColor=this.color(color);g.circle(0,0,radius);g.fill();g.strokeColor=this.color('#d5dedb');g.lineWidth=2;g.stroke();return n;}
    coin(parent:Node,x:number,y:number,r:number):void{const n=this.circle(parent,x,y,r,'#e9b82b');this.rect(n,0,0,2,r*1.25,'#fff2a2');}
    hudIcon(n:Node,kind:number,color:string):void{
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
    drawNav():void {const old=this.root.getChildByName('navigation');if(old){old.removeFromParent();old.destroy();}const nav=this.nodeAt(this.root,'navigation',0,-456,480,48);this.rect(nav,0,0,480,48,'#49494e');for(let i=0;i<6;i++){const n=this.rect(nav,-200+i*80,0,78,46,i===this.tab?'#e98436':'#696b70','#30343b');n.on(Node.EventType.TOUCH_END,()=>{this.tab=i;this.filter=-1;this.folded=false;this.draw();});this.hudIcon(this.nodeAt(n,'tab-icon',0,0,48,44),i,i===this.tab?C.text:'#151b24');if(i===3&&this.game.s.maxStage>=8&&Date.now()>=this.game.s.eggAt)this.rect(n,28,17,6,6,C.ember);}}
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
            const card = this.rect(content, 0, yy, w - 8, 70, C.panel, C.line);
            if (r.icon !== undefined)
                this.glyph(card, -w / 2 + 35, 0, r.icon, r.tint || C.gold);
            const hasIcon = r.icon !== undefined, hasAction = !!r.action;
            const left = -w / 2 + (hasIcon ? 66 : 16), right = w / 2 - (hasAction ? 125 : 16), width = right - left;
            this.label(card, r.title, left + width / 2, r.sub ? 11 : 0, width, 27, 16, C.text, Label.HorizontalAlign.LEFT);
            if (r.sub)
                this.label(card, r.sub, left + width / 2, -15, width, 34, 12, C.muted, Label.HorizontalAlign.LEFT);
            if(r.detail){const target=this.nodeAt(card,"details",-w/2+120,0,210,65);target.on(Node.EventType.TOUCH_END,r.detail);}
            if (r.action)
                this.button(card, r.action, w / 2 - 65, 0, 112, 48, r.click || (() => { }), true);
            else if (r.click)
                card.on(Node.EventType.TOUCH_END, r.click);
        });
    }
    glyph(parent: Node, x: number, y: number, id: number, color: string): void { const n = this.rect(parent, x, y, 42, 44, '#122131', color), g = this.nodeAt(n, 'glyph', 0, 0, 40, 40).addComponent(Graphics); g.fillColor = this.color(color); if (id % 3 === 0) {
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
        const g = this.game, s = g.s, r = s.run;
        this.rect(this.panel, 0, 0, 480, 300, C.bg);
        if(this.tab===0){
            this.rect(this.panel,0,112,470,65,'#333538',C.line);this.rect(this.panel,-201,113,54,59,'#1b2934',C.line);this.hudIcon(this.nodeAt(this.panel,'master-portrait',-201,113,50,54),0,C.blue);
            this.label(this.panel,this.tr('layout.masterName'),-64,131,228,22,16,C.text,Label.HorizontalAlign.LEFT);
            this.label(this.panel,this.tr('master.level',{level:r.master,damage:this.format(g.tapDamage())}),-64,106,228,31,12,C.muted,Label.HorizontalAlign.LEFT);
            const up=this.rect(this.panel,164,112,135,60,'#e87e12',C.gold);this.rect(up,0,21,131,16,'#794528');this.label(up,this.format(g.upgradeCost(-1,this.mode===-1?1:this.mode)),0,21,127,16,12,C.gold);this.label(up,this.tr('layout.upgrade'),0,-6,125,35,18);up.on(Node.EventType.TOUCH_END,()=>{g.buy(-1,this.mode);this.drawPanel();this.flushNotice();});
            this.rect(this.panel,0,62,470,26,'#292a37');this.label(this.panel,this.tr('master.prestige'),0,62,430,24,18);
            this.rect(this.panel,0,13,470,68,'#333538',C.line);this.glyph(this.panel,-201,13,1,C.blue);
            this.label(this.panel,this.tr('layout.prestigeDesc'),-64,13,228,60,13,C.text,Label.HorizontalAlign.LEFT);
            this.button(this.panel,this.tr(r.stage>=60?'prestige.reward':'prestige.locked',{value:this.format(g.prestigeReward())}),164,13,135,60,()=>this.prestige(),r.stage>=60);
            this.rect(this.panel,0,-36,470,26,'#292a37');this.label(this.panel,this.tr('spell.title'),0,-36,430,24,18);
            this.scroll(this.panel,0,-100,474,99,SPELLS.map(sp=>({title:this.tr(`spell.${sp.id}`),sub:this.tr('spell.detail',{level:r.spellLevels[sp.id],unlock:sp.unlock,mana:sp.mana}),icon:sp.id,action:this.tr(r.master<sp.unlock?'action.level':'action.details',{level:sp.unlock}),click:()=>this.spells(this.game.s.spellSlots.indexOf(sp.id)<0?0:this.game.s.spellSlots.indexOf(sp.id))})));
        }
        else if (this.tab === 1) {
            this.label(this.panel, this.tr('hero.title'), -133, 127, 190, 29, 21, C.gold, Label.HorizontalAlign.LEFT);
            this.button(this.panel, this.tr('master.buyMode', {
                count: this.mode === -1 ? this.tr('action.max') : this.mode
            }), 80, 127, 127, 34, () => { this.mode = [1, 10, 100, -1][([1, 10, 100, -1].indexOf(this.mode) + 1) % 4]; this.drawPanel(); });
            this.button(this.panel, '◈', 200, 127, 49, 34, () => this.mastery());
            this.scroll(this.panel, 0, -24, 458, 244, HEROES.map(h => ({
                title: this.tr(h.name), sub: s.maxStage < h.unlock ? this.tr('hero.locked', {
                    stage: h.unlock
                }) : this.tr('hero.stats', {
                    level: r.heroes[h.id], damage: this.format(g.heroDamage(h.id))
                }), detail:()=>this.extensions.hero(h.id), icon: h.id, tint: [C.ember, C.mint, C.blue, C.violet][h.id % 4], action: this.format(g.upgradeCost(h.id, this.mode === -1 ? 1 : this.mode)), click: () => { g.buy(h.id, this.mode); this.drawPanel(); this.flushNotice(); }
            })));
        }
        else if (this.tab === 2) {
            this.label(this.panel, this.tr('equipment.summary', {
                shards: s.shards, count: s.equipment.length
            }), -112, 127, 230, 28, 17, C.gold, Label.HorizontalAlign.LEFT);
            this.button(this.panel, '⋯', 44, 127, 48, 34, () => this.equipmentTools());
            this.button(this.panel, this.tr('equipment.craft'), 172, 127, 110, 34, () => this.craft());
            for (let i = 0; i < 5; i++)
                this.button(this.panel, this.tr(`slot.${i}`), -180 + i * 90, 82, 84, 32, () => { this.filter = this.filter === i ? -1 : i; this.drawPanel(); }, this.filter === i);
            const items = s.equipment.filter(e => this.filter < 0 || e.slot === this.filter).sort((a, b) => b.power - a.power);
            this.scroll(this.panel, 0, -46, 458, 204, items.map(e => ({
                title: this.itemName(e), sub: this.tr('equipment.power', {
                    power: e.power.toFixed(2)
                }), action: s.equipped.includes(e.id) ? this.tr('action.equipped') : this.tr('action.details'), icon: e.slot, tint: e.rarity > 1 ? C.gold : C.blue, click: () => this.item(e)
            })));
            if (!items.length)
                this.label(this.panel, this.tr('equipment.empty'), 0, -22, 410, 60, 16, C.muted);
        }
        else if (this.tab === 3) {
            this.label(this.panel, this.tr('pet.title'), -112, 127, 220, 28, 21, C.gold, Label.HorizontalAlign.LEFT);
            this.button(this.panel, Date.now() >= s.eggAt ? this.tr('pet.hatch') : this.tr('action.remaining', {
                seconds: Math.ceil((s.eggAt - Date.now()) / 1000)
            }), 143, 127, 164, 36, () => this.act(() => g.hatch(this.id('egg')), () => this.drawPanel()));
            this.scroll(this.panel, 0, -24, 458, 244, PETS.map(p => ({
                title: this.tr(p.name), sub: this.tr('pet.bonus', {
                    level: s.pets[p.id], bonus: this.tr(`effect.${p.effect}`)
                }), detail:()=>this.extensions.petDetail(p.id), icon: p.id, tint: C.mint, action: s.activePet === p.id && s.pets[p.id] > 0 ? this.tr('action.equipped') : this.tr('action.equip'), click: () => { if (!s.pets[p.id])
                    this.toast(this.tr('error.locked'));
                else {
                    s.activePet = p.id;
                    g.persist();
                    this.drawPanel();
                } }
            })));
        }
        else if (this.tab === 4) {
            this.label(this.panel, this.tr('artifact.balance', {
                value: this.format(s.relics)
            }), -89, 127, 273, 26, 17, C.gold, Label.HorizontalAlign.LEFT);
            this.button(this.panel, this.tr('artifact.discover', {
                cost: this.format(g.discoverCost())
            }), 149, 127, 154, 36, () => this.act(() => g.discover(this.id('discover')), () => this.drawPanel()), true);
            const owned = ARTIFACTS.filter(a => s.artifacts[a.id]);
            this.button(this.panel, '⋯', -208, 89, 40, 26, () => this.salvaged());
            this.scroll(this.panel, 0, -37, 458, 221, owned.map(a => ({
                title: this.tr(a.name), sub: this.tr('artifact.stats', {
                    level: s.artifacts[a.id], effect: this.tr(`effect.${a.effect}`)
                }), icon: a.id, tint: C.violet, action: this.tr('action.details'), click: () => this.artifactDetail(a.id)
            })));
            if (!owned.length) {
                this.glyph(this.panel, 0, 28, 1, C.violet);
                this.label(this.panel, this.tr('artifact.empty'), 0, -45, 365, 70, 17, C.muted);
            }
        }
        else {
            [0, 1, 2].forEach(i => this.button(this.panel, this.tr(['shop.regular', 'shop.progression', 'shop.limited'][i]), -151 + i * 151, 127, 142, 38, () => { this.shopTab = i; this.drawPanel(); }, this.shopTab === i));
            const rows: Row[] = this.shopTab === 0 ? [{
                    title: this.tr('shop.free'), sub: this.tr('daily.reward', {
                        gems: 25
                    }), action: this.tr('action.claim'), click: () => this.act(() => g.claimDaily(0), () => this.drawPanel())
                }, ...[0, 1, 2].map(i => ({
                    title: this.tr(['shop.pet', 'shop.shards', 'shop.chest'][i]), sub: this.tr('action.cost', {
                        cost: [30, 60, 100][i]
                    }), icon: i, tint: C.gold, action: this.tr('action.buy'), click: () => this.confirm(this.tr(['shop.pet', 'shop.shards', 'shop.chest'][i]), this.tr('shop.confirm', {
                        cost: [30, 60, 100][i]
                    }) + (i === 2 ? '\n' + this.tr('shop.chestInfo') : ''), () => this.act(() => g.buyDeal(i, this.id('deal')), () => { this.close(); this.drawPanel(); }))
                }))] : this.shopTab === 1 ? [60, 100, 500, 1000].map(stage => ({
                title: this.tr('milestone.row', {
                    stage
                }), action: this.tr(s.claims.includes(`milestone.${stage}`) ? 'action.claimed' : 'action.claim'), click: () => this.act(() => g.claimMilestone(stage), () => this.drawPanel())
            })) : [{
                    title:this.tr('extra.limitedOffer'),sub:this.tr('extra.limitedInfo'),action:this.tr('action.open'),click:()=>this.extensions.limited()
                }];
            rows.unshift({title:this.tr('money.store'),sub:this.tr('money.balance',{count:s.gems}),action:this.tr('action.open'),click:()=>this.payments.store()});
            if(this.shopTab===0)rows.splice(1,0,{title:this.tr('money.ad.shop_chest'),sub:this.tr('money.adReward.shop_chest'),action:this.tr('money.watch'),click:()=>this.payments.ads('shop')});
            if(this.shopTab===2)rows.unshift({title:this.tr('money.pass'),action:this.payments.price('season_pass'),click:()=>this.payments.product('season_pass')});
            this.scroll(this.panel, 0, -24, 458, 244, rows);
        }
    }
    itemName(e: Item): string { return this.tr('equipment.item', {
        slot: this.tr(`slot.${e.slot}`), rarity: this.tr(`rarity.${e.rarity}`), level: e.level
    }); }
    open(title: string, height = 600, closable = true): Node {
        this.close();
        this.modal = this.nodeAt(this.root, 'modal', 0, 0, 480, 960);
        this.modal.addComponent(BlockInputEvents);
        this.rect(this.modal, 0, 0, 480, 960, '#000000', undefined, 128);
        const box = this.rect(this.modal, 0, 0, 432, height, C.bg, [C.line,C.gold,C.blue,C.violet,C.mint,C.ember][this.game.s.extra.cosmetics[1]]);
        box.name = 'modal-panel';
        this.rect(box, 0, height / 2 - 4, 432, 6, C.gold);
        this.label(box, title, -17, height / 2 - 38, 350, 44, 23, C.gold);
        if(closable)this.button(box, '×', 181, height / 2 - 36, 42, 38, () => this.close());
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
    menu(): void { const p = this.open(this.tr('menu.title'), 706); const actions: [
        string,
        () => void
    ][] = [['daily', () => this.daily()], ['milestones', () => this.milestones()], ['raid', () => this.raidLobby()], ['cards', () => this.cards()], ['event', () => this.events()], ['meta', () => this.meta()], ['clan', () => this.guild()], ['tournament', () => this.competition()], ['profile', () => this.profile()], ['settings', () => this.settings()], ['inbox', () => this.extensions.inbox()], ['achievements', () => this.achievements()]]; actions.forEach(([key, f], i) => this.button(p, this.tr(`menu.${key}`), i % 2 ? -101 : 101, 245 - Math.floor(i / 2) * 91, 184, 70, f));this.button(p,this.tr('extra.hub'),0,-304,380,44,()=>this.extensions.hub()); }
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
    item(e: Item): void { const current = this.game.s.equipment.find(x => x.id === this.game.s.equipped[e.slot]); const p = this.open(this.itemName(e), 470); this.glyph(p, 0, 100, e.slot, C.gold); this.label(p, this.tr('equipment.compare', {
        current: (current?.power || 1).toFixed(2), next: e.power.toFixed(2)
    }), 0, 33, 370, 50, 20); this.label(p, e.locked ? this.tr('equipment.protected') : '', 0, -4, 370, 24, 14, C.ember); this.button(p, this.tr('action.equip'), 0, -54, 360, 46, () => { this.game.equip(e.id); this.close(); this.drawPanel(); }, true); this.button(p, this.tr('action.lock'), -93, -113, 175, 44, () => { this.game.lock(e.id); this.item(e); }); this.button(p, this.tr('action.sell'), 93, -113, 175, 44, () => this.confirm(this.itemName(e), this.tr('equipment.sellConfirm'), () => this.act(() => this.game.sell([e.id], this.id('sell')), () => { this.close(); this.drawPanel(); }))); this.button(p, this.tr('equipment.sets'), 0, -173, 360, 42, () => this.sets()); }
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
        this.label(p, this.tr('skills.info'), 0, 221, 382, 80, 13, C.muted);
        for (let branch = 0; branch < 6; branch++) {
            const x = -132 + branch % 3 * 132, y = 112 - Math.floor(branch / 3) * 172;
            this.label(p, this.tr(`branch.${branch}`), x, y + 28, 125, 28, 16, C.gold);
            for (let tier = 0; tier < 3; tier++) {
                const i = branch * 3 + tier;
                this.button(p, this.tr('action.level', {
                    level: this.draft[i]
                }), x, y - 12 - tier * 39, 123, 34, () => this.skillNode(i), true);
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
        }), icon: i, tint: C.mint, action: this.tr(this.game.s.claims.includes(`daily.${i}`) ? 'action.claimed' : 'action.claim'), click: () => this.act(() => this.game.claimDaily(i), () => this.daily())
    }))); }
    milestones(): void { const p = this.open(this.tr('milestone.title'), 630); this.scroll(p, 0, -28, 400, 514, [8, 15, 60, 100, 500, 1000, 100000, 180000].map(stage => ({
        title: this.tr('hud.stage', {
            stage
        }), sub: this.tr('milestone.row', {
            stage
        }), action: this.tr(this.game.s.claims.includes(`milestone.${stage}`) ? 'action.claimed' : 'action.claim'), click: () => this.act(() => this.game.claimMilestone(stage), () => this.milestones())
    }))); }
    offline(): void { const p = this.open(this.tr('offline.title'), 380); this.label(p, this.tr('offline.reward', {
        gold: this.format(this.game.s.offline)
    }), 0, 40, 370, 65, 24, C.gold); this.label(p, this.tr('offline.info'), 0, -26, 370, 56, 17, C.muted); this.button(p, this.tr('action.claim'), 0, -126, 310, 50, () => this.act(() => this.game.collectOffline(this.id('offline')), () => this.close()), true); }
    online(): void { this.info(this.tr('online.title'), this.tr('online.unavailable')); }
    profile(): void { const s = this.game.s; this.info(this.tr('menu.profile'), this.tr('profile.stats', {
        stage: s.maxStage, prestiges: s.prestiges, kills: s.totalKills, taps: s.totalTaps, artifacts: s.artifacts.filter(Boolean).length, pets: s.pets.reduce((a, b) => a + b, 0)
    })); }
    settings(): void { const p = this.open(this.tr('menu.settings'), 700); this.label(p, this.tr('settings.language'), 0, 183, 340, 30, 17, C.muted); this.button(p, this.tr('locale.ko'), -94, 134, 175, 46, () => { this.game.s.locale = 'ko'; this.game.persist(); this.close(); this.draw(); this.settings(); }, this.game.s.locale === 'ko'); this.button(p, this.tr('locale.en'), 94, 134, 175, 46, () => { this.game.s.locale = 'en'; this.game.persist(); this.close(); this.draw(); this.settings(); }, this.game.s.locale === 'en'); this.button(p, this.tr('settings.audio', {
        state: this.tr(this.game.s.audio ? 'settings.on' : 'settings.off')
    }), 0, 60, 365, 48, () => { this.game.s.audio = !this.game.s.audio; this.game.persist(); this.settings(); }); this.button(p, this.tr('settings.saveButton'), 0, -4, 365, 48, () => { if (this.game.persist())
        this.toast(this.tr('settings.save'));
    else
        this.flushNotice(); }); this.button(p,this.tr('live.17'),0,-66,365,40,()=>this.liveOps.hub());this.button(p,this.tr('complete.display'),-124,-290,116,48,()=>this.extensions.displaySettings());this.button(p,this.tr('complete.account'),0,-290,116,48,()=>this.extensions.account());this.button(p,this.tr('complete.support'),124,-290,116,48,()=>this.extensions.support());this.label(p, this.tr('settings.about'), 0, -132, 375, 64, 15, C.muted); resources.load('branding/tt-softs-ci/texture', Texture2D, (err, texture) => { if (err || !p.isValid)
        return; const n = this.nodeAt(p, 'company-ci', 0, -203, 120, 120 * texture.height / texture.width); const sp = n.addComponent(Sprite); const frame = new SpriteFrame(); frame.texture = texture; sp.spriteFrame = frame; sp.sizeMode = Sprite.SizeMode.CUSTOM; n.getComponent(UITransform)!.setContentSize(120,120 * texture.height / texture.width); }); }
    cards(): void { const s = this.game.s, p = this.open(this.tr('menu.cards'), 720); this.label(p, this.tr('raid.deck', {
        a: this.tr(`card.${s.deck[0]}`), b: this.tr(`card.${s.deck[1]}`), c: this.tr(`card.${s.deck[2]}`)
    }), 0, 270, 385, 50, 16, C.mint); this.label(p, this.tr('raid.dust', {
        dust: s.dust
    }), 0, 225, 385, 26, 15, C.gold); this.scroll(p, 0, -47, 400, 505, CARDS.map(c => ({
        title: this.tr(c.name), sub: this.tr('raid.card', {
            level: s.cards[c.id], fragments: s.fragments[c.id]
        }), icon: c.id, tint: [C.ember, C.violet, C.mint][c.type], action: this.tr(s.deck.includes(c.id) ? 'action.selected' : 'action.select'), click: () => { this.game.setDeck(c.id); this.cardDetail(c.id); }
    }))); }
    cardDetail(i: number): void { const s = this.game.s, p = this.open(this.tr(`card.${i}`), 490);this.label(p,this.tr('complete.cardProc.'+i%3),0,140,370,85,18); this.label(p, this.tr('raid.card', {
        level: s.cards[i], fragments: s.fragments[i]
    }), 0, 40, 360, 60, 22); this.button(p, this.tr('raid.upgrade', {
        cost: s.cards[i] * 10
    }), 0, -33, 360, 48, () => this.act(() => this.game.upgradeCard(i, this.id('card')), () => this.cardDetail(i)), true); this.button(p, this.tr('action.back'), 0, -112, 360, 44, () => this.cards()); }
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
        }), action: this.tr(this.game.s.claims.includes(`event.${i}`) ? 'action.claimed' : 'action.claim'), click: () => this.act(() => this.game.claimEvent(i), () => this.events())
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
        return; this.remoteBusy = true; try {
        await work();
    }
    catch (e) {
        const key = (e as Error).message;
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
        this.button(p, String(j + 1), -165 + j * 66, 260, 60, 40, () => this.spells(j), j === slot); this.scroll(p, 0, -24, 400, 490, SPELLS.map(c => ({
        title: this.tr(`spell.${c.id}`), sub: this.tr('spell.detail', {
            level: s.run.spellLevels[c.id], unlock: c.unlock, mana: c.mana
        }), icon: c.id, tint: C.violet, action: this.tr(s.spellSlots.includes(c.id) ? 'action.details' : 'action.select'), click: () => { if (s.spellSlots.includes(c.id)) {
            const box = this.open(this.tr(`spell.${c.id}`), 400);
            this.label(box, this.tr('spell.detail', {
                level: s.run.spellLevels[c.id], unlock: c.unlock, mana: c.mana
            }), 0, 70, 375, 70, 20);
            this.label(box, this.tr('spell.multicast'), 0, 0, 375, 60, 16, C.muted);
            this.button(box, this.tr('action.upgrade'), 0, -106, 360, 50, () => { if (this.game.upgradeSpell(c.id)) {
                this.close();
                this.drawPanel();
                this.spells(slot);
            }
            else
                this.flushNotice(); }, true);
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
    skillNode(i: number): void { const p = this.open(this.tr('skills.node', {
        branch: this.tr(`branch.${Math.floor(i / 3)}`), tier: i % 3 + 1, level: this.draft[i]
    }), 400); this.label(p, this.tr('skills.info'), 0, 50, 372, 126, 17, C.muted); this.button(p, '−', -90, -57, 160, 54, () => { this.draft[i] = Math.max(0, this.draft[i] - 1); this.skillNode(i); }); this.button(p, '+', 90, -57, 160, 54, () => { this.draft[i] = Math.min(SKILLS[i].max, this.draft[i] + 1); this.skillNode(i); }, true); this.button(p, this.tr('action.back'), 0, -132, 350, 44, () => this.skills(false)); }
    artifactDetail(i: number): void { const s = this.game.s, p = this.open(this.tr(`artifact.${i}`), 550); this.glyph(p, 0, 153, i, C.violet); this.label(p, this.tr('artifact.stats', {
        level: s.artifacts[i], effect: this.tr(`effect.${i % 4}`)
    }), 0, 96, 380, 50, 20); this.button(p, this.tr('artifact.cost', {
        cost: this.format(this.game.artifactCost(i))
    }), 0, 23, 375, 50, () => this.act(() => this.game.upgradeArtifact(i, this.id('artifact')), () => { this.drawPanel(); this.artifactDetail(i); }), true); this.button(p, this.tr('artifact.salvage'), 0, -50, 375, 50, () => this.confirm(this.tr('artifact.salvage'), this.tr('artifact.salvageInfo'), () => this.act(() => this.game.salvageArtifact(i, this.id('salvage')), () => { this.close(); this.drawPanel(); }))); this.button(p, this.tr('artifact.enchant'), 0, -123, 375, 50, () => this.act(() => this.game.enchantArtifact(i, this.id('enchant')), () => this.artifactDetail(i))); this.label(p, this.tr('artifact.enchantInfo'), 0, -200, 375, 60, 14, C.muted); }
    salvaged(): void { const p = this.open(this.tr('artifact.salvaged'), 600); this.scroll(p, 0, -24, 400, 480, this.game.s.salvaged.map(i => ({
        title: this.tr(`artifact.${i}`), sub: this.tr('artifact.rebuyInfo'), icon: i, action: this.tr('action.buy'), click: () => this.act(() => this.game.rebuyArtifact(i, this.id('rebuy')), () => { this.drawPanel(); this.salvaged(); })
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
    updateHUD(): void { const g = this.game, r = g.s.run;this.equipmentPile.active=g.s.extra.unseenEquipment.length>0;this.equipmentPile.getComponentInChildren(Label)!.string=this.tr('complete.pile',{count:g.s.extra.unseenEquipment.length}); this.fairy.active = Date.now() >= g.s.fairyAt; this.stageLabel.string = String(r.stage);this.stageNeighbors.forEach((l,i)=>l.string=String(Math.max(1,r.stage+(i?1:-1)))); this.enemyLabel.string = this.tr(r.boss ? 'hud.boss' : 'art.enemy.'+(this.game.s.totalKills%3)); this.goldLabel.string = this.format(r.gold); this.gemsLabel.string = this.format(r.gold); this.damageLabel.string = this.tr('layout.tapDamage',{value:this.format(g.tapDamage())}); this.manaLabel.string = this.tr('hud.mana', {
        value: Math.floor(r.mana)
    }); this.hpFill.setScale(this.enemyTransition>.2?0:Math.max(.001,ratio(r.hp,g.maxHP())),1,1);this.hpLabel.string=this.enemyTransition>.2?this.tr('battle.defeated'):this.format(r.hp); this.progressLabel.string = this.tr(r.boss ? 'hud.timer' : 'hud.progress', {
        seconds: Math.ceil(r.bossLeft), count: r.kills
    }); this.bossButton.active = r.kills >= 5; const l = this.bossButton.getComponentInChildren(Label); if (l)
        l.string = this.tr(r.boss ? 'battle.leave' : 'battle.fight'); this.spellLabels.forEach((l, slot) => { const i = g.s.spellSlots[slot]; l.string = r.master < SPELLS[i].unlock ? this.tr('action.level', {
        level: SPELLS[i].unlock
    }) : r.cooldowns[i] > 0 ? this.tr('action.remaining', {
        seconds: Math.ceil(r.cooldowns[i])
    }) : this.tr(`spell.${i}`); }); }
    attack(): void { if(this.enemyTransition>0)return;if(!this.game.s.extra.effects){this.game.tap();this.syncEnemyDeath();this.sound(180);return;}Tween.stopAllByTarget(this.actor);this.actor.angle=-9;tween(this.actor).to(.16,{angle:7}).to(.14,{angle:0}).start();const slash=this.nodeAt(this.particles,'slash',0,120,160,100),line=slash.addComponent(Graphics);line.strokeColor=this.color(C.gold);line.lineWidth=6;line.moveTo(-65,-30);line.lineTo(10,20);line.lineTo(65,40);line.stroke();tween(slash).delay(.12).call(()=>slash.destroy()).start();const damage = this.game.tap(); this.sound(170 + Math.random() * 50); const n = this.label(this.particles, this.format(damage), (Math.random() - .5) * 110, 135, 180, 40, 25, C.gold).node; n.addComponent(UIOpacity); tween(n).by(.6, {
        position: new Vec3(0, 70, 0)
    }).call(() => n.destroy()).start(); this.spark(0, 135, C.gold); this.enemy.setPosition(4, 95); tween(this.enemy).to(.08, {
        position: new Vec3(0, 95, 0)
    }).start(); this.syncEnemyDeath();this.updateHUD(); }
    spark(x: number, y: number, color: string): void { for (let i = 0; i < 5; i++) {
        const n = this.rect(this.particles, x, y, 5, 5, color);
        tween(n).by(.25, {
            position: new Vec3((Math.random() - .5) * 105, (Math.random() - .5) * 95, 0)
        }).call(() => n.destroy()).start();
    } }
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
    toast(text: string): void { if (this.toastNode) {
        this.toastNode.removeFromParent();
        this.toastNode.destroy();
    } const n = this.rect(this.root, 0, -345, 434, 50, '#334754', C.gold); this.toastNode = n; this.label(n, text, 0, 0, 410, 43, 16, C.text); tween(n).delay(2.2).call(() => { if (n.isValid)
        n.destroy(); if (this.toastNode === n)
        this.toastNode = null; }).start(); }
    flushNotice(): void { if(!this.modal&&this.game.s.extra.unlockNotices.length){const stage=this.game.s.extra.unlockNotices.shift()!;this.game.persist();this.info(this.tr('complete.unlocked'),this.tr('complete.unlock.'+stage));return;} if(!this.modal&&this.game.s.extra.rewardNotices.length){const reward=this.game.s.extra.rewardNotices.shift()!;this.game.persist();this.info(this.tr('reward.done'),this.tr('complete.reward.'+reward.kind,{value:reward.value,count:reward.count,hero:['weapon','scroll'].includes(reward.kind)?this.tr('hero.'+reward.value):''}));return;} if (this.game.notice) {
        this.toast(this.tr(this.game.notice));
        this.game.notice = '';
    } }
    update(dt:number):void {
        if(!this.game)return;
        this.liveOps.tick(dt);if(this.liveOps.blocked)return;
        if(this.particles)this.particles.active=this.game.s.extra.effects;
        if(this.enemyTransition>0){const old=this.enemyTransition;this.enemyTransition=Math.max(0,old-dt);this.game.tick(0);if(old>.2&&this.enemyTransition<=.2)this.spawnEnemy();}
        else {this.syncAllies();this.game.tick(dt);
            for(const event of this.game.heroEvents){
                if(event.phase==='attack')this.animateAlly(event.hero);
                else {this.spark(0,100,C.ember);this.sound(120);const hit=this.label(this.particles,this.format(event.damage),0,140,180,30,20,C.gold).node;tween(hit).by(.45,{position:new Vec3(0,45,0)}).call(()=>hit.destroy()).start();}
            }
            this.syncEnemyDeath();}
        if(!this.enemyTransition){const look=this.enemyKey();if(this.enemyLook!==look)this.spawnEnemy();this.enemy.setScale(1+Math.sin(this.age*2)*.014,1+Math.sin(this.age*2)*.014,1);}
        if(this.worldKey!==Math.floor((this.game.s.run.stage-1)/25)%4)this.world();
        this.age+=dt;this.refresh+=dt;this.saveClock+=dt;this.actor.setPosition(-8,0+Math.sin(this.age*3)*1.4);
        this.syncAllies();
        if(this.refresh>.15){this.refresh=0;this.updateHUD();if(this.modalRefresh)this.modalRefresh();this.flushNotice();}
        if(this.saveClock>=5){this.saveClock=0;this.extensions.notifyReady();this.game.persist();}
    }
}
