import { Color, Font, Graphics, Node, resources, Sprite, SpriteFrame, Texture2D, UITransform } from 'cc';

export const UI = {
    bg:'#10130e', panel:'#242a21', raised:'#687444', line:'#5e6068',
    text:'#ffffff', muted:'#c6c7cc', gold:'#ffd83d', ember:'#d88338',
    mint:'#8e9d53', violet:'#d5ac65', blue:'#ffffff', light:'#101114',
    brightGold:'#ffe04c', ink:'#111114', sand:'#303136', tealDark:'#18191d', danger:'#ef2144',
    paper:'#f5f5f2', paperMuted:'#dbdcde'
};
export type UISkin = 'panel' | 'teal' | 'orange' | 'neutral';
export type PopupButtonStyle = 'primary' | 'secondary' | 'quiet' | 'selected' | 'disabled' | 'danger';
export interface UIButtonOptions { unavailable?: () => string | null; style?: PopupButtonStyle; icon?: string; fontSize?: number; iconOnly?: boolean; hint?: string; tone?:string; }
export const POPUP_SKINS = ['primary', 'secondary', 'quiet', 'selected', 'disabled', 'danger', 'panel', 'card', 'slate'];
export const UI_ICONS = ['upgrade-plus', 'sword', 'adventurer', 'armor', 'fox', 'heart', 'chest', 'cards', 'lightning', 'trophy', 'mail', 'settings', 'rebirth', 'egg', 'scroll', 'flag', 'lock'];
export const UI_FACES = ['guardian', 'rowen', 'kael', 'sera', 'blade', 'helmet', 'breastplate', 'aura', 'ember-fox', 'stone-hawk', 'shade-wolf', 'crown', 'compass', 'gems', 'supplies', 'laurel'];

const LEGACY:Record<string,string>={
 '#101b28':UI.bg,'#192838':UI.panel,'#24384a':UI.raised,'#3c5362':UI.line,
 '#f2e6cf':UI.text,'#a3b7bb':UI.muted,'#ecc071':UI.gold,'#f48960':UI.ember,
 '#8bd3b8':UI.mint,'#b99ee9':UI.violet,'#82bcdd':UI.blue,
 '#333538':UI.panel,'#1b2934':UI.bg,'#122131':UI.bg,'#292a37':UI.tealDark,
 '#664839':UI.ember,'#e87e12':UI.ember,'#794528':'#e09323','#54545b':UI.sand,
 '#39383e':UI.panel,'#24232c':UI.tealDark,'#49494e':UI.bg,'#696b70':UI.bg,
 '#e98436':UI.ember,'#30343b':UI.line,'#334754':UI.tealDark,
 '#14202b':'#172e39','#ee762e':'#ef6c78','#507b7b':'#227e8a',
 '#dce9e4':UI.tealDark,'#d7dce6':UI.line,'#a290b8':UI.gold,
 '#2e8694':UI.blue,'#175960':UI.text,'#38696b':UI.muted,'#d5dedb':UI.line,
 '#c7ded7':UI.panel,'#c7dee4':UI.tealDark,'#e1e8ed':UI.bg,'#63b18b':UI.mint
};
export const GROUND_SURFACE_Y = [0.259724, 0.108209, 0.233232, 0.23109] as const;
export const LEDGE_SURFACE_Y = [0.134062, 0.089126, 0.158871, 0.161133] as const;
export const COMBAT_EFFECTS=['slash','impact','sparkle','arrow','orb','shard','defeat','wisp','ring'] as const;
export type CombatEffect = typeof COMBAT_EFFECTS[number];
export const ACTORS=['guardian','rowen','kael','sera','golem','forest-wolf','spectral-knight','flame-spirit','ember-fox','stone-hawk','shade-wolf','fairy','skeleton','tree-boss','ice-boss','crystal-boss'];

export class UITheme {
    readonly contours=new WeakMap<Node,number[][]>();
    font: Font | null = null;
    frames = new Map<string, SpriteFrame>();
    missing: string[] = [];

    async load(): Promise<void> {
        await Promise.all([
            new Promise<void>(resolve => resources.load('ui/fonts/RixYeoljeongdo-Regular', Font, (error, font) => {
                if (error) this.missing.push('RixYeoljeongdo-Regular'); else this.font = font;
                resolve();
            })),
            ...(['panel','teal','orange','neutral'] as const).map(key=>this.loadFrame(`skins/${key}`,2)),
            ...UI_ICONS.map(key=>this.loadFrame(`icons/${key}`)),
            ...UI_FACES.map(key=>this.loadFrame(`faces/${key}`)),
            ...ACTORS.map(key=>this.loadFrame(`actors/${key}`)),
            ...COMBAT_EFFECTS.map(key=>this.loadFrame(`effects/${key}`)),
            ...[0,1,2,3].map(key=>this.loadFrame(`world/${key}`)),
            ...[0,1,2,3].map(key=>this.loadFrame(`terrain/ledge-${key}`)),
            ...[0,1,2,3].map(key=>this.loadFrame(`terrain/ground-${key}`)),
            ...POPUP_SKINS.map(key=>this.loadFrame(`popup/${key}`,2)),this.loadFrame('branding',0,true,'branding')
        ]);
        const militaryActors:Record<string,string>={guardian:'riflewoman',rowen:'sniper',kael:'officer',sera:'riflewoman',golem:'heavy', 'forest-wolf':'mercenary','spectral-knight':'mercenary','flame-spirit':'drone',skeleton:'mercenary','tree-boss':'heavy','ice-boss':'heavy','crystal-boss':'heavy','ember-fox':'drone','stone-hawk':'drone','shade-wolf':'drone',fairy:'drone'};
        await Promise.all([
            ...Object.entries(militaryActors).map(([key,source])=>this.loadFrame('actors/'+key,0,false,'military/actors/'+source)),
            ...[0,1,2,3].map(key=>this.loadFrame('world/'+key,0,false,'military/world/'+key)),
            ...UI_ICONS.map((key,i)=>this.loadFrame('icons/'+key,0,false,'military/icons/'+i)),
            ...UI_FACES.map((key,i)=>this.loadFrame('faces/'+key,0,false,i<4?'military/faces/'+[0,1,2,0][i]:'military/icons/'+(i%UI_ICONS.length)))
        ]);
        await Promise.all(['ember-fox','stone-hawk','shade-wolf','fairy'].map(key=>this.loadFrame('actors/'+key,0,false,'military/icons/4')));
        if (this.missing.length) console.warn('[UIArt] Missing assets:', this.missing.join(', '));
    }

    private loadFrame(key: string, inset = 0, smooth = false, source = key): Promise<void> {
        return new Promise(resolve => resources.load(source==='branding'?'branding/tt-softs-ci/texture':`ui/${source.startsWith('military/')?source:'pastel/'+source}/texture`, Texture2D, (error, texture) => {
            if (error) this.missing.push(key);
            else {
                texture.setFilters(smooth ? Texture2D.Filter.LINEAR : Texture2D.Filter.NEAREST, smooth ? Texture2D.Filter.LINEAR : Texture2D.Filter.NEAREST);
                texture.setWrapMode(Texture2D.WrapMode.CLAMP_TO_EDGE, Texture2D.WrapMode.CLAMP_TO_EDGE);
                const frame = new SpriteFrame();
                frame.texture = texture;
                frame.insetLeft = frame.insetRight = frame.insetTop = frame.insetBottom = inset;
                if (smooth) { frame.insetLeft = frame.insetRight = 14; frame.insetTop = frame.insetBottom = 12; }
                this.frames.set(key, frame);
            }
            resolve();
        }));
    }

    map(hex: string): string { return LEGACY[hex.toLowerCase()] || hex; }
    polygon(node:Node,points:number[][],hex:string,alpha=255):void {
        const g=node.addComponent(Graphics),color=new Color();Color.fromHEX(color,hex);color.a=alpha;g.fillColor=color;
        const path=(vertices:number[][])=>{if(vertices.length<3)return;g.moveTo(vertices[0][0],vertices[0][1]);vertices.slice(1).forEach(p=>g.lineTo(p[0],p[1]));g.close();g.fill();};
        const left=Math.min(...points.map(p=>p[0])),right=Math.max(...points.map(p=>p[0]));
        // White-to-neutral-gray horizontal shading, clipped to the existing angular silhouette.
        // Keep small icon plates flat and preserve all foreground art and text colors.
        if(hex.toLowerCase()===UI.paper&&right-left>=120){
            const clip=(vertices:number[][],x:number,keepRight:boolean)=>{
                const result:number[][]=[];let previous=vertices[vertices.length-1];
                for(const current of vertices){const a=keepRight?previous[0]>=x:previous[0]<=x,b=keepRight?current[0]>=x:current[0]<=x;
                    if(a!==b){const t=(x-previous[0])/(current[0]-previous[0]);result.push([x,previous[1]+t*(current[1]-previous[1])]);}if(b)result.push(current);previous=current;
                }return result;
            };
            const bands=64,step=(right-left)/bands;
            for(let i=0;i<bands;i++){const t=i/(bands-1);g.fillColor=new Color(Math.round(255-67*t),Math.round(255-67*t),Math.round(255-67*t),alpha);path(clip(clip(points,left+i*step,true),Math.min(right,left+(i+1)*step+.02),false));}
        }else path(points);
    }
    /** Flat vector silhouettes retain crisp edges at every device ratio. */
    surface(node:Node,fill:string,kind:'panel'|'cut'|'slant'='cut',alpha=255):void {
        const {width:w,height:h}=node.getComponent(UITransform)!.contentSize,c=Math.min(kind==='panel'?18:10,h/3,w/5),l=-w/2,r=w/2,b=-h/2,t=h/2;
        const old=node.getChildByName('ui-surface');if(old){old.removeFromParent();old.destroy();}
        const face=new Node('ui-surface');face.layer=node.layer;face.parent=node;face.addComponent(UITransform).setContentSize(w,h);face.setSiblingIndex(0);
        const points=kind==='slant'?[[l+c,b],[r,b],[r-c,t],[l,t]]:kind==='panel'?[[l,b+c],[l+c,b],[r,b],[r,t-c],[r-c,t],[l,t]]:[[l,b],[r-c,b],[r,b+c],[r,t],[l+c,t],[l,t-c]];
        this.contours.set(node,points);
        this.polygon(face,points,fill,alpha);
        const edge=face.getComponent(Graphics)!;edge.lineWidth=1.5;const ink=new Color();
        Color.fromHEX(ink,[UI.ember,UI.raised,UI.danger,UI.mint].includes(fill)?'#ffacb9':[UI.paper,UI.paperMuted,UI.text].includes(fill)?'#515563':'#939aa9');ink.a=alpha;edge.strokeColor=ink;
        edge.moveTo(points[0][0]*((w-2)/w),points[0][1]*((h-2)/h));points.slice(1).forEach(p=>edge.lineTo(p[0]*((w-2)/w),p[1]*((h-2)/h)));edge.close();edge.stroke();
    }
    inPopup(node: Node): boolean {
        for (let n: Node | null = node; n; n = n.parent) if (n.name === 'modal' || n.name === 'modal-panel') return true;
        return false;
    }
    popupSurface(parent: Node, fill: string, w: number, h: number): string | null {
        if (!this.inPopup(parent) || w < 28 || h < 28) return null;
        const color = this.map(fill);
        if (color === UI.bg) return 'popup/panel';
        if (color === UI.panel) return 'popup/card';
        return null;
    }
    textColor(parent:Node,color:string):string {
        let mapped=this.map(color);if(['#ffffff','#fff2d2','#ffda7a','#f0fff6','#e1f6ef','#bedbd9','#ffe078','#78ebc5','#97e1ee','#ceb7ff','#ffc277'].includes(mapped.toLowerCase()))mapped=UI.text;
        for(let n:Node|null=parent;n;n=n.parent){
            if(n.name==='ui-button'||n.name==='ink-surface')return mapped;
            if(n.name==='paper-menu')return ({[UI.text]:UI.ink,[UI.muted]:'#52535b',[UI.gold]:'#755400',[UI.mint]:'#c91331',[UI.violet]:'#b01437',[UI.blue]:UI.ink} as Record<string,string>)[mapped]||mapped;
        }return mapped;
    }
    skin(fill: string, border: string | undefined, w: number, h: number): UISkin | null {
        if (w < 28 || h < 28) return null;
        const color = this.map(fill);
        if (color === UI.ember) return 'orange';
        if (color === UI.raised || color === UI.tealDark) return 'teal';
        if (color === UI.sand) return 'neutral';
        if (color === UI.bg || color === UI.panel) return 'panel';
        return null;
    }

    paint(node: Node, key: string, sliced = false, alpha = 255, tone?: string): boolean {
        const surfaces:Record<string,string>={'skins/panel':UI.panel,'skins/teal':UI.tealDark,'skins/orange':UI.gold,'skins/neutral':UI.sand,'popup/panel':UI.bg,'popup/card':UI.panel,'popup/slate':UI.panel,'popup/primary':UI.ember,'popup/secondary':UI.sand,'popup/quiet':UI.panel,'popup/selected':UI.mint,'popup/disabled':UI.panel,'popup/danger':UI.danger};
        if(surfaces[key]){this.surface(node,tone||surfaces[key],key.endsWith('/primary')?'slant':key.endsWith('/panel')||key.endsWith('/slate')?'panel':'cut',alpha);return true;}
        const frame = this.frames.get(key);
        if (!frame) return false;
        const transform = node.getComponent(UITransform)!;
        const size = transform.contentSize.clone();
        const sprite = node.getComponent(Sprite)||node.addComponent(Sprite);
        sprite.sizeMode = Sprite.SizeMode.CUSTOM;
        sprite.spriteFrame = frame;
        sprite.type = sliced ? Sprite.Type.SLICED : Sprite.Type.SIMPLE;
        const tint=new Color(255,255,255,alpha);if(tone||surfaces[key])Color.fromHEX(tint,tone||surfaces[key]);tint.a=alpha;sprite.color=tint;
        transform.setContentSize(size);
        return true;
    }

    actor(node:Node,key:string):boolean{return this.paint(node,`actors/${key}`);}
    icon(node: Node, key: string, color=UI.text): boolean {
        if(key==='symbol:plus'&&this.paint(node,'icons/upgrade-plus'))return true;
        if(key.startsWith('face:'))return this.face(node,key.slice(5));
        if(!key.startsWith('symbol:'))return this.paint(node, `icons/${key}`);
        const patterns:Record<string,string[]>={
            play:['0100000','0110000','0111000','0111100','0111000','0110000','0100000'],
            plus:['0001000','0001000','0001000','1111111','0001000','0001000','0001000'],
            check:['0000001','0000011','0000110','1001100','1111000','0110000','0000000'],
            close:['1100011','0110110','0011100','0001000','0011100','0110110','1100011'],
            up:['0001000','0011100','0111110','1101011','0001000','0001000','0001000'],
            down:['0001000','0001000','0001000','1101011','0111110','0011100','0001000'],
            next:['0010000','0011000','0001100','0000110','0001100','0011000','0010000'],
            back:['0000100','0001100','0011000','0110000','0011000','0001100','0000100'],
            info:['0001100','0001100','0000000','0011100','0001100','0001100','0011110'],
            hand:['0010100','0010110','1010110','1111110','0111110','0111110','0011100'],
            hammer:['0111110','0111110','0001100','0011000','0110000','1100000','1000000'],
            eye:['0000000','0011100','0110110','1101011','0110110','0011100','0000000'],
            bag:['0011100','0010100','0111110','1111111','1101011','1111111','0111110'],
            clock:['0011100','0101010','1001001','1001101','1000001','0100010','0011100']
            ,coin:['0011100','0111110','1101011','1100011','1101011','0111110','0011100']
        };
        const rows=patterns[key.slice(7)];if(!rows)return false;
        const size=node.getComponent(UITransform)!.contentSize,step=Math.floor(Math.min(size.width,size.height)/7),g=node.addComponent(Graphics),ink=new Color();Color.fromHEX(ink,color);g.fillColor=ink;
        rows.forEach((row,y)=>row.split('').forEach((bit,x)=>{if(bit==='1'){g.rect((x-3.5)*step,(2.5-y)*step,step,step);g.fill();}}));return true;
    }
    face(node: Node, key: string): boolean { return this.paint(node, `faces/${key}`); }

    // Sprite dimensions are controlled by UITransform, retaining the original touch bounds.
    resize(node: Node, w: number, h: number): void { node.getComponent(UITransform)!.setContentSize(w, h); }
}
