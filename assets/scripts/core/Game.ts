import { ARTIFACT_DISCOVERY_COSTS, GrowthStat, GrowthContribution, gemstoneBonus, routedBonus } from './Balance';
import { ZERO, amount, add, sub, mul } from './Amount';
import { Expansion, ExpansionState, newExpansion } from './Expansion';
import { CONFIG, HEROES, SPELLS, SKILLS } from './Config';
export interface Item {
    id: number;
    slot: number;
    rarity: number;
    level: number;
    power: number;
    locked: boolean;
    set: number;
}
export interface Run {
    stage: number;
    kills: number;
    boss: boolean;
    bossLeft: number;
    bossFailed: boolean;
    hp: number;
    gold: number;
    master: number;
    heroes: number[];
    mana: number;
    spells: number[];
    cooldowns: number[];
    spellLevels: number[];
    stacks: number[];
    elapsed: number;
}
export interface Save {
    extra:ExpansionState;
    fairyAt: number;
    version: number;
    created: number;
    lastSeen: number;
    locale: 'ko' | 'en';
    run: Run;
    maxStage: number;
    prestiges: number;
    gems: number;
    relics: number;
    shards: number;
    spellSlots: number[];
    artifactInvested: number[];
    salvaged: number[];
    enchanted: number[];
    achievements: number[];
    appearance: number[];
    sp: number;
    spMilestone: number;
    skills: number[];
    artifacts: number[];
    pets: number[];
    activePet: number;
    eggAt: number;
    equipment: Item[];
    equipped: number[];
    nextItem: number;
    setHistory: number[];
    crafted: number;
    totalKills: number;
    totalTaps: number;
    day: number;
    dayKills: number;
    dayTaps: number;
    dayPrestiges: number;
    claims: string[];
    dust: number;
    cards: number[];
    fragments: number[];
    deck: number[];
    portal: number;
    souls: number;
    titans: number[];
    research: number[];
    geodes: number;
    stones: number[];
    mementos: number;
    monuments: number[];
    eventTokens: number;
    board: number[];
    perks: number[];
    perkUntil: number[];
    weapons: number[];
    scrolls: number[];
    transactions: string[];
    rng: number;
    offline: number;
    audio: boolean;
}
export interface Storage {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
}
export interface Raid {
    expiresAt:number;
    portal: number;
    deck: number[];
    seconds: number;
    hp: number[];
    armor: number[];
    damage: number;
    hits: number;
    cardDamage: number[];
    ended: boolean;
    claimed: boolean;
}
export class Game {
    s: Save;
    get raid():Raid|null{return this.s.extra.soloRaid;}
    set raid(value:Raid|null){this.s.extra.soloRaid=value;}
    notice = '';
    revision = 0;
    saveError = false;
    constructor(public storage?: Storage, public now = () => Date.now()) {
        this.s = this.fresh();
        const raw = storage?.getItem('ember-ascent-v1');
        if (raw) {
            try {
                const parsed = JSON.parse(raw);
                this.migrate(parsed);
                this.validate(parsed);
                this.s = parsed;
            }
            catch {
                this.notice = 'error.save';
                try {
                    storage?.setItem('ember-ascent-corrupt-' + this.now(), raw);
                }
                catch {
                    this.saveError = true;
                }
            }
        }
        const elapsed = Math.min(CONFIG.maxOfflineSeconds, Math.max(0, (this.now() - this.s.lastSeen) / 1000));
        if (elapsed > 60 && this.dps() > ZERO)
            this.s.offline = add(this.s.offline, mul(this.goldReward(), elapsed * 0.15));
        if(this.raid&&!this.raid.ended){this.raid.seconds=Math.max(0,this.raid.seconds-elapsed);this.raid.ended=this.raid.seconds<=0;}
        this.s.lastSeen = this.now();
        this.dailyReset();
        new Expansion(this).sync();
        this.persist();
    }
    fresh(): Save {
        const now = this.now();
        return {
            extra:newExpansion(now), fairyAt: now, version: 1, created: now, lastSeen: now, locale: 'ko', run: this.newRun(), maxStage: 1,
            spellSlots: [0, 1, 2, 3, 4, 5], artifactInvested: Array(30).fill(ZERO), salvaged: [], enchanted: Array(30).fill(0), achievements: Array(4).fill(0), appearance: Array(5).fill(-1),
            prestiges: 0, gems: 100, relics: ZERO, shards: 15, sp: 0, spMilestone: 0,
            skills: Array(18).fill(0), artifacts: Array(30).fill(0), pets: Array(12).fill(0), activePet: 0,
            eggAt: now, equipment: [], equipped: Array(5).fill(-1), nextItem: 1, setHistory: [], crafted: 0,
            totalKills: 0, totalTaps: 0, day: Math.floor(now / 86400000), dayKills: 0, dayTaps: 0, dayPrestiges: 0, claims: [],
            dust: 0, cards: Array(18).fill(1), fragments: Array(18).fill(0), deck: [0, 1, 2], portal: 1,
            souls: 0, titans: Array(120).fill(0), research: Array(12).fill(0), geodes: 0, stones: Array(24).fill(0),
            mementos: ZERO, monuments: Array(12).fill(0), eventTokens: 0, board: Array(16).fill(0),
            perks: Array(6).fill(2), perkUntil: Array(6).fill(0), weapons: Array(24).fill(0), scrolls: Array(24).fill(0),
            transactions: [], rng: (now >>> 0) || 12345678, offline: ZERO, audio: true
        };
    }
    newRun(stage = 1): Run { return {
        stage, kills: 0, boss: false, bossLeft: 30, bossFailed: false, hp: this.maxHP(stage, false), gold: amount(25), master: 1, heroes: Array(24).fill(0), mana: 120, spells: Array(10).fill(0), cooldowns: Array(10).fill(0), spellLevels: Array(10).fill(1), stacks: Array(10).fill(0), elapsed: 0
    }; }
    migrate(s: Save): void {
        const defaults = this.fresh();
        if(!s.extra){s.extra=defaults.extra;s.extra.summonCount=s.titans.reduce((a,b)=>a+b,0);}
        if(s.extra.unlocked===undefined)s.extra.unlocked=[8,15,60,100,1000,100000,180000].filter(stage=>s.maxStage>=stage);
        if(s.extra.lastEquipmentStage===undefined)s.extra.lastEquipmentStage=Math.floor(s.maxStage/5)*5;
        for(const key of Object.keys(defaults.extra))if(!(key in s.extra))(s.extra as any)[key]=(defaults.extra as any)[key];
        if(s.extra.soloRaid&&!s.extra.soloRaid.expiresAt)s.extra.soloRaid.expiresAt=s.lastSeen+s.extra.soloRaid.seconds*1000;
        for (const key of ['fairyAt', 'spellSlots', 'artifactInvested', 'salvaged', 'enchanted', 'achievements', 'appearance'] as const)
            if (!(key in s))
                (s as any)[key] = defaults[key];
        if (s.run) {
            if (!s.run.spellLevels)
                s.run.spellLevels = Array(10).fill(1);
            if (!s.run.stacks)
                s.run.stacks = Array(10).fill(0);
            if (s.run.spells?.length === 6)
                s.run.spells.push(0, 0, 0, 0);
            if (s.run.cooldowns?.length === 6)
                s.run.cooldowns.push(0, 0, 0, 0);
        }
    }
    validate(s: Save): void {
        if (!s || s.version !== 1 || !s.run || !['ko', 'en'].includes(s.locale))
            throw Error('schema');
        for (const [key, length] of Object.entries({
            spellSlots: 6, artifactInvested: 30, enchanted: 30, achievements: 4, appearance: 5, skills: 18, artifacts: 30, pets: 12, equipped: 5, cards: 18, fragments: 18, deck: 3, titans: 120, research: 12, stones: 24, monuments: 12, board: 16, perks: 6, perkUntil: 6, weapons: 24, scrolls: 24
        })) {
            const a = (s as any)[key];
            if (!Array.isArray(a) || a.length !== length || a.some((v: unknown) => typeof v !== 'number' || !Number.isFinite(v)))
                throw Error(key);
        }
        for(const [key,length] of Object.entries({perkSlots:6,extraPerks:4,ascensions:24,heroSkills:24,petBoard:16,monumentInvested:12,monumentEnchanted:12,crystal:3,titanLevels:120,mysticResearch:12,cosmetics:3,notifications:6})){
            if(!Array.isArray((s.extra as any)[key])||(s.extra as any)[key].length!==length)throw Error('extra.'+key);
        }
        const validDeck=(d:any)=>Array.isArray(d)&&d.length===3&&new Set(d).size===3&&d.every((n:any)=>Number.isInteger(n)&&n>=0&&n<18);
        if(!validDeck(s.deck)||!Array.isArray(s.extra.deckPresets)||s.extra.deckPresets.length!==3||!s.extra.deckPresets.every(validDeck))throw Error('deck');
        if(!Array.isArray(s.extra.rewardNotices)||s.extra.rewardNotices.some(r=>!['milestone','weapon','scroll','weaponSet','equipmentSet'].includes(r.kind)||!Number.isInteger(r.value)||r.value<0||!Number.isInteger(r.count)||r.count<1))throw Error('rewardNotices');
        const raid=s.extra.soloRaid;
        if(raid&&(!validDeck(raid.deck)||!Number.isInteger(raid.portal)||raid.portal<1||raid.portal>1000||raid.hp.length!==8||raid.armor.length!==8||raid.cardDamage.length!==3||raid.seconds<0||raid.seconds>30))throw Error('raid');
        const scan = (o: any): void => { for (const v of Object.values(o)) {
            if (typeof v === 'number' && !Number.isFinite(v))
                throw Error('number');
            if (v && typeof v === 'object')
                scan(v);
        } };
        scan(s);
        if (s.run.stage < 1 || s.run.stage > 1000000 || s.run.master < 1 || s.gems < 0 || s.shards < 0 || !Array.isArray(s.transactions) || !Array.isArray(s.equipment))
            throw Error('range');
        if (s.run.heroes.length !== 24 || s.run.spells.length !== 10 || s.run.cooldowns.length !== 10 || s.run.spellLevels.length !== 10 || s.run.stacks.length !== 10)
            throw Error('run');
    }
    persist(): boolean {
        if (!this.storage)
            return true;
        try {
            this.storage.setItem('ember-ascent-v1', JSON.stringify(this.s));
            this.saveError = false;
            return true;
        }
        catch {
            this.saveError = true;
            this.notice = 'error.storage';
            return false;
        }
    }
    transaction(id: string, action: () => void): boolean {
        if (this.s.transactions.includes(id))
            return false;
        const before = JSON.stringify(this.s);
        try {
            action();
            this.s.transactions.push(id);
            this.s.transactions = this.s.transactions.slice(-512);
            this.validate(this.s);
            if (!this.persist())
                throw Error('error.storage');
            this.revision++;
            return true;
        }
        catch (e) {
            this.s = JSON.parse(before);
            this.notice = (e as Error).message.startsWith('error.') ? (e as Error).message : 'error.invalid';
            return false;
        }
    }
    require(v: boolean, key = 'error.currency'): void { if (!v)
        throw Error(key); }
    random(): number { let x = this.s.rng; x ^= x << 13; x ^= x >>> 17; x ^= x << 5; this.s.rng = x >>> 0; return this.s.rng / 4294967296; }
    maxHP(stage = this.s.run.stage, boss = this.s.run.boss): number { return Math.log10(CONFIG.stageBaseHP) + (stage - 1) * Math.log10(CONFIG.stageGrowth) + (boss ? Math.log10(CONFIG.bossMultiplier) : 0); }
    bonus(kind: number): number {
        let b = kind!==3&&this.s.extra.commerce.boostUntil>this.now()?Math.log10(2):0;
        if((kind===3?this.s.extra.commerce.goldSpreeUntil:this.s.extra.commerce.damageSpreeUntil)>this.now())b+=1;
        this.s.artifacts.forEach((l, i) => { if (i % 4 === kind || i % 4 === 0)
            b += Math.log10(1 + l * 0.22) + (this.s.enchanted[i] ? 1 : 0); });
        this.s.pets.forEach((l, i) => { if (i % 3 === kind % 3)
            b += Math.log10(1 + l * .025 * (i === this.s.activePet ? 1 : Math.min(1, l / 100))); });
        this.s.equipped.forEach(id => { const e = this.s.equipment.find(e => e.id === id); if (e)
            b += Math.log10(e.power); });
        b += this.s.skills.filter((_, i) => Math.floor(i / 3) % 3 === kind % 3).reduce((a, l) => a + l * .06, 0);
        b += Math.log10(1 + this.s.extra.summonCount * .02);
        b += this.growthContributions(kind===3?'gold':kind===2?'hero':'tap').reduce((sum,row)=>sum+row.log,0);
        b += Math.log10(1+this.s.crafted*.001);

        if (this.s.setHistory.length >= 5)
            b += Array.from(new Set(this.s.setHistory.map(p=>Math.floor(p/5)))).filter(set=>[0,1,2,3,4].every(slot=>this.s.setHistory.includes(set*5+slot))).length*.2;
        if (this.s.extra.perkSlots.some((id,slot)=>(id%4===0||id%4===kind%4)&&this.s.perkUntil[slot]>this.now()))
            b += Math.log10(2);
        return b;
    }
    growthContributions(stat:GrowthStat):GrowthContribution[] {return [
        {source:'stones',log:this.s.stones.reduce((sum,level,id)=>sum+gemstoneBonus(id,level,stat),0)},
        {source:'monuments',log:routedBonus(this.s.monuments,stat,.2,true)+routedBonus(this.s.extra.monumentEnchanted,stat,1)},
        {source:'titans',log:routedBonus(this.s.extra.titanLevels,stat,.03,true)},
        {source:'mystic',log:routedBonus(this.s.extra.mysticResearch,stat,.02)},
        {source:'research',log:routedBonus(this.s.research,stat,.015)}
    ];}
    tapDamage(): number { return amount(4) + this.s.run.master * .055 + this.bonus(1) + this.spellBonus(3, 10) + this.spellBonus(7, 3); }
    heroDamage(i: number): number { const l = this.s.run.heroes[i]; return l ? amount(HEROES[i].damage) + Math.log10(l) + Math.floor(l / 25) * Math.log10(2) + this.bonus(2) + this.s.extra.ascensions[i]*16 + this.s.extra.heroSkills[i]*Math.log10(1.5) + Math.log10(1 + this.s.weapons[i] + this.s.scrolls[i] * .5) : ZERO; }
    dps(): number { let result = this.s.run.heroes.reduce((sum, _, i) => add(sum, this.heroDamage(i)), ZERO); if (this.s.run.spells[4] > 0)
        result += this.spellBonus(4, 5); if (this.s.run.spells[6] > 0)
        result = add(result, mul(this.tapDamage(), 6)); if (this.s.run.spells[8] > 0)
        result = add(result, mul(this.tapDamage(), 8)); if (this.s.run.spells[5] > 0)
        result = add(result, mul(this.tapDamage(), 12)); return result; }
    goldReward(): number { return amount(CONFIG.goldBase) + (this.s.run.stage - 1) * Math.log10(CONFIG.stageGrowth) + this.bonus(3) + (this.s.run.boss ? Math.log10(5) : 0) + this.spellBonus(2, 10) + this.spellBonus(9, 3); }
    tick(dt: number): void {
        if (!Number.isFinite(dt) || dt <= 0)
            return;
        dt = Math.min(dt, 1);
        const r = this.s.run;
        r.elapsed += dt;
        r.mana = Math.min(CONFIG.manaMax, r.mana + CONFIG.manaRegen * dt);
        for (let i = 0; i < 10; i++) {
            r.spells[i] = Math.max(0, r.spells[i] - dt);
            r.cooldowns[i] = Math.max(0, r.cooldowns[i] - dt);
            if (r.spells[i] === 0)
                r.stacks[i] = 0;
        }
        if (r.boss) {
            r.bossLeft -= dt;
            if (r.bossLeft <= 0) {
                r.boss = false;
                r.bossFailed = true;
                r.hp = this.maxHP();
                this.notice = 'battle.failed';
                this.revision++;
            }
        }
        this.damage(mul(this.dps(), dt));
        if (this.raid && !this.raid.ended) {
            this.raid.seconds = Math.max(0, Math.min(this.raid.seconds - dt,(this.raid.expiresAt-this.now())/1000));
            if (this.raid.seconds <= 0)
                this.raid.ended = true;
        }
        this.s.lastSeen = this.now();
        this.dailyReset();
        new Expansion(this).sync();
    }
    tap(): number { this.s.totalTaps++; this.s.dayTaps++; const crit = this.random() < (this.s.run.spells[1] > 0 ? .7 : .06); const damage = mul(this.tapDamage(), crit ? 5 : 1); this.damage(damage); return damage; }
    damage(value: number): void {
        if (value === ZERO)
            return;
        const r = this.s.run;
        if (value < r.hp - 1e-10) {
            r.hp = sub(r.hp, value);
            return;
        }
        r.gold = add(r.gold, this.goldReward());
        this.s.totalKills++;this.s.extra.eventEarned++;
        this.s.dayKills++;
        this.s.eventTokens++;
        if (r.boss) {
            r.stage++;
            r.kills = 0;
            r.boss = false;
            r.bossFailed = false;
            this.s.maxStage = Math.max(this.s.maxStage, r.stage);
            this.unlock();
        }
        else {
            r.kills = Math.min(CONFIG.titansPerStage, r.kills + 1);
            if (r.kills >= CONFIG.titansPerStage && !r.bossFailed) {
                r.boss = true;
                r.bossLeft = CONFIG.bossSeconds;
            }
        }
        r.hp = this.maxHP();
        this.revision++;
    }
    unlock(): void {
        const s = this.s;
        for(const stage of [8,15,60,100,1000,100000,180000])if(s.maxStage>=stage&&!s.extra.unlocked.includes(stage)){s.extra.unlocked.push(stage);s.extra.unlockNotices.push(stage);}
        if (s.maxStage >= 8 && !s.pets.some(Boolean)) {
            s.pets[0] = 1;
            this.notice = 'unlock.pet';
        }
        if (s.maxStage >= 15 && s.maxStage % 5 === 0 && s.maxStage>s.extra.lastEquipmentStage && s.equipment.length < CONFIG.inventoryCap){
            this.drop();s.extra.lastEquipmentStage=s.maxStage;
        }
        const milestone = Math.floor(s.maxStage / 50);
        if (milestone > s.spMilestone) {
            this.rewardNotice('milestone',s.maxStage,milestone-s.spMilestone);
            s.sp += milestone - s.spMilestone;
            s.spMilestone = milestone;
        }
    }
    toggleBoss(): void { const r = this.s.run; if (r.boss) {
        r.boss = false;
        r.bossFailed = true;
    }
    else if (r.kills >= CONFIG.titansPerStage) {
        r.boss = true;
        r.bossFailed = false;
        r.bossLeft = 30;
    } r.hp = this.maxHP(); this.revision++; }
    upgradeCost(hero: number, count = 1): number { const level = hero < 0 ? this.s.run.master : this.s.run.heroes[hero]; const growth = hero < 0 ? 1.072 : 1.075; const base = hero < 0 ? 4 : HEROES[hero].cost; return (this.s.extra.commerce.discountUntil>this.now()?-1:0) + amount(base) + level * Math.log10(growth) + Math.log10((Math.pow(growth, count) - 1) / (growth - 1)); }
    buy(hero: number, requested: number): boolean {
        if (hero >= 0 && this.s.maxStage < HEROES[hero].unlock) {
            this.notice = 'error.locked';
            return false;
        }
        let count = requested;
        if (count === -1) {
            count = 0;
            while (count < 1000 && this.upgradeCost(hero, count + 1) <= this.s.run.gold + 1e-10)
                count++;
        }
        if (count <= 0 || this.upgradeCost(hero, count) > this.s.run.gold + 1e-10) {
            this.notice = 'error.currency';
            return false;
        }
        this.s.run.gold = sub(this.s.run.gold, this.upgradeCost(hero, count));
        if (hero < 0)
            this.s.run.master += count;
        else
            this.s.run.heroes[hero] += count;
        this.revision++;
        return true;
    }
    spellBonus(i: number, base: number): number { return this.s.run.spells[i] > 0 ? Math.log10(base * (1 + (this.s.run.spellLevels[i] - 1) * .15) * Math.max(1, this.s.run.stacks[i])) : 0; }
    cast(i: number): boolean { const r = this.s.run, c = SPELLS[i]; if (!c || r.master < c.unlock) {
        this.notice = 'error.locked';
        return false;
    } const multicast = r.spells[i] > 0 && r.master >= 500 && r.stacks[i] < 3; const cost = c.mana * (multicast ? r.stacks[i] + 1 : 1); if (r.mana < cost || (r.cooldowns[i] > 0 && !multicast)) {
        this.notice = 'error.mana';
        return false;
    } r.mana -= cost; r.cooldowns[i] = c.cooldown; r.spells[i] = c.duration; r.stacks[i] = multicast ? r.stacks[i] + 1 : 1; if (i === 0)
        this.damage(mul(this.tapDamage(), 100 * r.spellLevels[i])); this.revision++; return true; }
    upgradeSpell(i: number): boolean { const r = this.s.run, cost = amount(100) + r.spellLevels[i] * Math.log10(2); if (r.master < SPELLS[i].unlock) {
        this.notice = 'error.locked';
        return false;
    } if (r.gold < cost) {
        this.notice = 'error.currency';
        return false;
    } r.gold = sub(r.gold, cost); r.spellLevels[i]++; this.persist(); this.revision++; return true; }
    selectSpell(slot: number, i: number): boolean { if (this.s.spellSlots.includes(i)) {
        this.notice = 'error.invalid';
        return false;
    } const old = this.s.spellSlots[slot]; this.s.run.spells[old] = 0; this.s.run.stacks[old] = 0; this.s.spellSlots[slot] = i; this.persist(); this.revision++; return true; }
    prestigeReward(): number { return this.s.run.stage < 60 ? ZERO : amount(Math.max(1, Math.floor(Math.pow(this.s.run.stage / 60, 2.1)))); }
    prestige(id: string): boolean { return this.transaction(id, () => { this.require(this.s.run.stage >= 60, 'error.locked'); this.s.relics = add(this.s.relics, this.prestigeReward()); this.s.prestiges++; this.s.dayPrestiges++;this.s.extra.towerKeys+=3;this.s.extra.ascensions.fill(0);this.s.extra.heroSkills.fill(0); if (this.s.maxStage >= 100000)
        this.s.souls += 100; if (this.s.maxStage >= 180000)
        this.s.mementos = add(this.s.mementos, amount(10)); this.s.run = this.newRun(Math.max(1, Math.floor(this.s.maxStage * .05))); }); }
    discoverCost(): number { const discovered=this.s.artifacts.filter(Boolean).length+this.s.salvaged.length; return amount(ARTIFACT_DISCOVERY_COSTS[Math.min(discovered,ARTIFACT_DISCOVERY_COSTS.length-1)]); }
    discover(id: string): boolean { return this.transaction(id, () => { const c = this.discoverCost(), options = this.s.artifacts.map((l, i) => l === 0 && !this.s.salvaged.includes(i) ? i : -1).filter(i => i >= 0); this.require(options.length > 0, 'error.complete'); this.require(this.s.relics >= c); this.s.relics = sub(this.s.relics, c); this.s.artifacts[options[Math.floor(this.random() * options.length)]] = 1; }); }
    artifactCost(i: number): number { return amount(Math.pow(this.s.artifacts[i] + 1, 1.4)); }
    upgradeArtifact(i: number, id: string): boolean { return this.transaction(id, () => { this.require(this.s.artifacts[i] > 0, 'error.locked'); const c = this.artifactCost(i); this.require(this.s.relics >= c); this.s.relics = sub(this.s.relics, c); this.s.artifacts[i]++; this.s.artifactInvested[i] = add(this.s.artifactInvested[i], c); }); }
    salvageArtifact(i: number, id: string): boolean { return this.transaction(id, () => { this.require(this.s.artifacts[i] > 0 && !this.s.enchanted[i], 'error.protected'); this.require(this.s.gems >= 20); this.s.gems -= 20; this.s.relics = add(this.s.relics, mul(this.s.artifactInvested[i], .8)); this.s.artifactInvested[i] = ZERO; this.s.artifacts[i] = 0; this.s.salvaged.push(i); }); }
    rebuyArtifact(i: number, id: string): boolean { return this.transaction(id, () => { this.require(this.s.salvaged.includes(i), 'error.invalid'); this.require(this.s.gems >= 25); this.s.gems -= 25; this.s.salvaged = this.s.salvaged.filter(x => x !== i); this.s.artifacts[i] = 1; }); }
    enchantArtifact(i: number, id: string): boolean { return this.transaction(id, () => { this.require(this.s.artifacts.every(l => l > 0), 'error.locked'); this.require(!this.s.enchanted[i], 'error.claimed'); this.require(this.s.relics >= amount(1000)); this.s.relics = sub(this.s.relics, amount(1000)); this.s.enchanted[i] = 1; }); }
    transmog(slot: number, item: number, id: string): boolean { return this.transaction(id, () => { const e = this.s.equipment.find(e => e.id === item); this.require(!!e && e.slot === slot, 'error.invalid'); this.s.appearance[slot] = item; }); }
    achievementProgress(i: number): number { return [this.s.totalTaps, this.s.totalKills, this.s.maxStage, this.s.prestiges][i]; }
    achievementGoal(i: number): number { return [100, 100, 50, 1][i] * Math.pow(2, this.s.achievements[i]); }
    claimAchievement(i: number, id: string): boolean { return this.transaction(id, () => { this.require(this.achievementProgress(i) >= this.achievementGoal(i), 'error.locked'); this.s.achievements[i]++; this.s.gems += 10; }); }
    applySkills(draft: number[], id: string): boolean { return this.transaction(id, () => { this.require(draft.length === 18, 'error.invalid'); const available = this.s.sp + this.s.skills.reduce((a, l) => a + l * (l + 1) / 2, 0); let cost = 0; draft.forEach((l, i) => { const c = SKILLS[i]; this.require(Number.isInteger(l) && l >= 0 && l <= c.max, 'error.invalid'); if (l > 0 && c.prerequisite >= 0)
        this.require(draft[c.prerequisite] >= 3, 'error.prerequisite'); cost += l * (l + 1) / 2; }); this.require(cost <= available); this.s.sp = available - cost; this.s.skills = [...draft]; }); }
    drop(slot = Math.floor(this.random() * 5), rarity = Math.floor(this.random() * 3), set = -1): Item { const item = {
        id: this.s.nextItem++, slot, rarity, level: Math.max(1, Math.floor(this.s.maxStage * (.8 + this.random() * .4))), power: 1 + this.s.maxStage * .003 * (rarity + 1), locked: false, set
    }; this.s.equipment.push(item);this.s.extra.unseenEquipment.push(item.id);this.s.extra.dailyEquipment++; return item; }
    nextCraft():number{let part=0;while(this.s.setHistory.includes(part))part++;return part;}
    rewardNotice(kind:string,value:number,count=1):void{this.s.extra.rewardNotices.push({kind,value,count});this.s.extra.rewardNotices=this.s.extra.rewardNotices.slice(-50);}
    craftCost(set=Math.floor(this.nextCraft()/5),slot=this.nextCraft()%5):number{return 5+slot;}
    craft(id:string,set=Math.floor(this.nextCraft()/5),slot=this.nextCraft()%5):boolean{return this.transaction(id,()=>{
        this.require(Number.isInteger(set)&&set>=0&&set<200&&Number.isInteger(slot)&&slot>=0&&slot<5,'error.invalid');
        this.require(!this.s.setHistory.includes(set*5+slot),'error.claimed');this.require(this.s.equipment.length<CONFIG.inventoryCap,'error.full');
        const cost=this.craftCost(set,slot);this.require(this.s.shards>=cost);this.s.shards-=cost;this.drop(slot,2,set);this.s.setHistory.push(set*5+slot);this.s.crafted+=cost;if([0,1,2,3,4].every(part=>this.s.setHistory.includes(set*5+part)))this.rewardNotice('equipmentSet',set+1);
    });}
    equip(id: number): void { const e = this.s.equipment.find(e => e.id === id); if (e) {
        this.s.equipped[e.slot] = id;
        this.revision++;
        this.persist();
    } }
    lock(id: number): void { const e = this.s.equipment.find(e => e.id === id); if (e) {
        e.locked = !e.locked;
        this.persist();
        this.revision++;
    } }
    sell(items: number[], id: string): boolean { return this.transaction(id, () => { this.require(items.length > 0, 'error.invalid'); const targets = this.s.equipment.filter(e => items.includes(e.id)); this.require(targets.length === new Set(items).size && targets.every(e => !e.locked && !this.s.equipped.includes(e.id)), 'error.protected'); this.s.gems += targets.reduce((a, e) => a + e.rarity + 1, 0); this.s.equipment = this.s.equipment.filter(e => !items.includes(e.id));this.s.extra.unseenEquipment=this.s.extra.unseenEquipment.filter(id=>!items.includes(id)); }); }
    hatch(id: string): boolean { return this.transaction(id, () => { this.require(this.s.maxStage >= 8, 'error.locked'); this.require(this.now() >= this.s.eggAt, 'error.timer'); this.s.pets[Math.floor(this.random() * 12)]++; this.s.extra.dailyEggs++;this.s.eggAt = this.now() + CONFIG.eggSeconds * 1000; }); }
    usePerk(i: number, id: string): boolean { return this.transaction(id, () => { this.require(this.s.perks[i] > 0); this.s.perks[i]--; this.s.perkUntil[i] = this.now() + 300000; }); }
    dailyReset(): void { const day = Math.floor(this.now() / 86400000); if (day > this.s.day) {
        this.s.day = day;
        this.s.dayKills = 0;
        this.s.dayTaps = 0;
        this.s.dayPrestiges = 0;
        this.s.claims = this.s.claims.filter(k => !k.startsWith('daily.'));
    } }
    dailyProgress(i: number): number { return [1, this.s.dayTaps, this.s.dayKills, this.s.dayPrestiges][i]; }
    dailyGoal(i: number): number { return [1, 100, 50, 1][i]; }
    claimFairy(id: string): boolean { return this.transaction(id, () => { this.require(this.now() >= this.s.fairyAt, 'error.timer'); this.s.run.gold = add(this.s.run.gold, mul(this.goldReward(), 20)); this.s.extra.dailyFairies++;this.s.fairyAt = this.now() + 60000; }); }
    claimDaily(i: number): boolean { return this.transaction(`daily.${this.s.day}.${i}`, () => { const key = `daily.${i}`; this.require(!this.s.claims.includes(key), 'error.claimed'); this.require(this.dailyProgress(i) >= this.dailyGoal(i), 'error.locked'); this.s.claims.push(key); this.s.gems += [25, 10, 15, 25][i]; if (i === 2)
        this.s.geodes++; if (i === 3)
        this.s.shards += 5; }); }
    claimMilestone(stage: number): boolean { return this.transaction(`milestone.${stage}`, () => { const key = `milestone.${stage}`;this.require([8,15,60,100,500,1000,100000,180000].includes(stage),'error.invalid'); this.require(!this.s.claims.includes(key), 'error.claimed'); this.require(this.s.maxStage >= stage, 'error.locked'); this.s.claims.push(key); this.s.gems += 25; this.s.shards += 5; }); }
    collectOffline(id: string): boolean { return this.transaction(id, () => { this.require(this.s.offline > ZERO, 'error.claimed'); this.s.run.gold = add(this.s.run.gold, this.s.offline); this.s.offline = ZERO; }); }
    buyDeal(kind: number, id: string): boolean { return this.transaction(id, () => { const costs = [30, 60, 100], c = costs[kind]; this.require(c !== undefined, 'error.invalid'); this.require(this.s.gems >= c); this.s.gems -= c; if (kind === 0)
        this.s.pets[Math.floor(this.random() * 12)] += 3; if (kind === 1)
        this.s.shards += 10; if (kind === 2) {
        this.s.shards += 10;
        this.s.geodes++;
        const hero=Math.floor(this.random()*24),before=Math.min(...this.s.weapons);this.s.weapons[hero]++;this.rewardNotice('weapon',hero);if(Math.min(...this.s.weapons)>before)this.rewardNotice('weaponSet',Math.min(...this.s.weapons));
    } }); }
    summon(id: string): boolean { return this.transaction(id, () => { this.require(this.s.maxStage >= 100000 || this.now() - this.s.created >= 30 * 86400000, 'error.locked'); this.require(this.s.souls >= 10); this.s.souls -= 10; this.s.titans[Math.floor(this.random() * 120)]++;this.s.extra.summonCount++; }); }
    crack(id: string): boolean { return this.transaction(id, () => { this.require(this.s.geodes > 0); this.s.geodes--;this.s.extra.geodesOpened++; this.s.stones[Math.floor(this.random() * 24)]++; }); }
    upgradeResearch(i: number, id: string): boolean { return this.transaction(id, () => { this.require(Number.isInteger(i)&&i>=0&&i<this.s.research.length,'error.invalid'); const points = Math.floor(this.s.extra.summonCount / 5); const spent = this.s.research.reduce((a, b) => a + b, 0); this.require(points > spent); if (i % 3)
        this.require(this.s.research[i - 1] >= 3, 'error.prerequisite'); this.s.research[i]++; }); }
    monument(i: number, id: string): boolean { return this.transaction(id, () => { this.require(Number.isInteger(i)&&i>=0&&i<this.s.monuments.length,'error.invalid'); this.require(this.s.maxStage >= 180000, 'error.locked'); const cost = amount(Math.pow(2, i) * (this.s.monuments[i] + 1)); this.require(this.s.mementos >= cost); this.s.mementos = sub(this.s.mementos, cost); this.s.monuments[i]++;this.s.extra.monumentInvested[i]=add(this.s.extra.monumentInvested[i],cost); }); }
    claimEvent(i: number): boolean { return this.transaction(`event.path.${this.s.extra.eventSeason}.${i}`, () => { this.require(Number.isInteger(i)&&i>=0&&i<10,'error.invalid'); const key = `event.${i}`; this.require(!this.s.claims.includes(key), 'error.claimed'); this.require(Math.max(this.s.extra.eventEarned,this.s.eventTokens) >= (i + 1) * 100, 'error.locked'); this.s.claims.push(key); this.s.shards += 5; this.s.gems += 15; }); }
    revealTile(i: number, id: string): boolean { return this.transaction(id, () => { this.require(Number.isInteger(i)&&i>=0&&i<this.s.board.length,'error.invalid');this.require(!this.s.board[i], 'error.claimed'); this.require(this.s.eventTokens >= 20); this.s.eventTokens -= 20; this.s.board[i] = Math.floor(this.random() * 3) + 1; this.s.gems += this.s.board[i] * 5; }); }
    upgradeCard(i: number, id: string): boolean { return this.transaction(id, () => { this.require(!this.raid||this.raid.claimed,'error.protected'); const c = this.s.cards[i] * 10; this.require(this.s.dust >= c && this.s.fragments[i] >= this.s.cards[i]); this.s.dust -= c; this.s.fragments[i] -= this.s.cards[i]; this.s.cards[i]++; }); }
    setDeck(i: number): void { if (this.raid && !this.raid.claimed)
        return; if (Number.isInteger(i)&&i>=0&&i<18&&!this.s.deck.includes(i)) {
        this.s.deck.shift();
        this.s.deck.push(i);
        this.persist();
        this.revision++;
    } }
    startRaid(portal=this.s.portal): boolean {
        if(this.s.maxStage<100){this.notice='error.locked';return false;}
        if(this.raid&&!this.raid.claimed){this.notice='error.protected';return false;}
        return this.transaction(`solo-start-${this.now()}-${this.revision}`,()=>{
            this.require(Number.isInteger(portal)&&portal>=1&&portal<=Math.min(1000,this.s.portal),'error.locked');
            const hp=1000*Math.pow(1.2,portal-1);
            this.raid={expiresAt:this.now()+30000,portal,deck:this.s.deck.slice(),seconds:30,hp:Array(8).fill(hp),armor:Array(8).fill(portal>2?hp*.5:0),damage:0,hits:0,cardDamage:[0,0,0],ended:false,claimed:false};
        });
    }
    raidTap(part: number): void { const r = this.raid;if(r&&this.now()>=r.expiresAt){r.seconds=0;r.ended=true;} if (!r || r.ended || part < 0 || part > 7 || r.hp[part] <= 0)
        return; let damage = 12; r.hits++; r.deck.forEach((card, i) => { const level = new Expansion(this).boostedLevel(card); let proc = card % 3 === 0 ? (r.hits % 4 === 0 ? 30 * level : 0) : card % 3 === 1 ? level * Math.min(20, r.hits) : 5 * level; damage += proc; r.cardDamage[i] += proc; }); const armor = Math.min(r.armor[part], damage); r.armor[part] -= armor; damage -= armor; const dealt = Math.min(r.hp[part], damage); r.hp[part] -= dealt; r.damage += dealt + armor; if (r.hp.every(h => h === 0))
        r.ended = true; }
    claimRaid(id:string):boolean{return this.transaction(id,()=>{
        const r=this.raid;this.require(!!r&&r.ended&&!r.claimed,'error.claimed');if(!r)return;
        r.claimed=true;this.s.dust+=Math.floor(r.damage/100);r.deck.forEach(i=>this.s.fragments[i]++);
        if(r.hp.every(h=>h===0)){
            this.s.portal=Math.max(this.s.portal,Math.min(1000,r.portal+1));
            if(!this.s.extra.soloCleared.includes(r.portal)){this.s.extra.soloCleared.push(r.portal);const hero=Math.floor(this.random()*24);this.s.scrolls[hero]++;this.rewardNotice('scroll',hero);}
        }
    });}
}
