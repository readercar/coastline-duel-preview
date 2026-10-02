import { DatabaseSync } from 'node:sqlite';
import { randomBytes, createHash } from 'node:crypto';
import { Game, Save } from '../assets/scripts/core/Game';
import { amount } from '../assets/scripts/core/Amount';
export class ServiceError extends Error {
    constructor(public status: number, message: string) { super(message); }
}
export class Service {
    db: DatabaseSync;
    constructor(path: string, public now = () => Date.now()) {
        this.db = new DatabaseSync(path);
        this.db.exec(`PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON;
      CREATE TABLE IF NOT EXISTS reward_deliveries(id TEXT PRIMARY KEY,account TEXT NOT NULL,payload TEXT NOT NULL,acked INTEGER NOT NULL DEFAULT 0);
      CREATE TABLE IF NOT EXISTS player_blocks(account TEXT NOT NULL,target TEXT NOT NULL,PRIMARY KEY(account,target));
      CREATE TABLE IF NOT EXISTS player_reports(id INTEGER PRIMARY KEY AUTOINCREMENT,account TEXT NOT NULL,message INTEGER NOT NULL,reason TEXT NOT NULL,created INTEGER NOT NULL,UNIQUE(account,message));
      CREATE TABLE IF NOT EXISTS competition_groups(account TEXT NOT NULL,tournament INTEGER NOT NULL,bracket INTEGER NOT NULL,pool INTEGER NOT NULL,PRIMARY KEY(account,tournament));
      CREATE TABLE IF NOT EXISTS cloud_saves(account TEXT PRIMARY KEY,state TEXT NOT NULL,version INTEGER NOT NULL,updated INTEGER NOT NULL);
      CREATE TABLE IF NOT EXISTS raid_wallets(account TEXT PRIMARY KEY,state TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS accounts(id TEXT PRIMARY KEY, token_hash TEXT UNIQUE NOT NULL, name TEXT NOT NULL, created INTEGER NOT NULL);
      CREATE TABLE IF NOT EXISTS guilds(id TEXT PRIMARY KEY,name TEXT NOT NULL,owner TEXT NOT NULL,created INTEGER NOT NULL,raid_hp REAL NOT NULL DEFAULT 100000,raid_cycle INTEGER NOT NULL DEFAULT 0);
      CREATE TABLE IF NOT EXISTS members(account TEXT PRIMARY KEY REFERENCES accounts(id),guild TEXT NOT NULL REFERENCES guilds(id),role TEXT NOT NULL DEFAULT 'member');
      CREATE TABLE IF NOT EXISTS messages(id INTEGER PRIMARY KEY AUTOINCREMENT,guild TEXT NOT NULL REFERENCES guilds(id),account TEXT NOT NULL REFERENCES accounts(id),body TEXT NOT NULL,created INTEGER NOT NULL);
      CREATE TABLE IF NOT EXISTS transactions(account TEXT NOT NULL,key TEXT NOT NULL,result TEXT NOT NULL,PRIMARY KEY(account,key));
      CREATE TABLE IF NOT EXISTS tournaments(id INTEGER PRIMARY KEY,start INTEGER NOT NULL,end INTEGER NOT NULL);
      CREATE TABLE IF NOT EXISTS entries(account TEXT NOT NULL REFERENCES accounts(id),tournament INTEGER NOT NULL REFERENCES tournaments(id),state TEXT NOT NULL,updated INTEGER NOT NULL,score INTEGER NOT NULL DEFAULT 1,claimed INTEGER NOT NULL DEFAULT 0,PRIMARY KEY(account,tournament));
      CREATE TABLE IF NOT EXISTS raid_sessions(id TEXT PRIMARY KEY,account TEXT NOT NULL,guild TEXT NOT NULL,state TEXT NOT NULL,started INTEGER NOT NULL,last_hit INTEGER NOT NULL,finished INTEGER NOT NULL DEFAULT 0);
      CREATE TABLE IF NOT EXISTS global_hits(account TEXT NOT NULL,season INTEGER NOT NULL,damage INTEGER NOT NULL DEFAULT 0,last INTEGER NOT NULL DEFAULT 0,PRIMARY KEY(account,season));
      CREATE TABLE IF NOT EXISTS guild_settings(guild TEXT PRIMARY KEY,description TEXT NOT NULL DEFAULT '',badge INTEGER NOT NULL DEFAULT 0);
      CREATE TABLE IF NOT EXISTS guild_logs(id INTEGER PRIMARY KEY AUTOINCREMENT,guild TEXT NOT NULL,account TEXT NOT NULL,damage INTEGER NOT NULL,created INTEGER NOT NULL);
      CREATE TABLE IF NOT EXISTS vault_claims(account TEXT NOT NULL,guild TEXT NOT NULL,cycle INTEGER NOT NULL,PRIMARY KEY(account,guild,cycle));
      CREATE TABLE IF NOT EXISTS raid_attacks(account TEXT NOT NULL,guild TEXT NOT NULL,cycle INTEGER NOT NULL,count INTEGER NOT NULL DEFAULT 0,PRIMARY KEY(account,guild,cycle));
    `);
        for(const entry of this.all('SELECT account,tournament,score FROM entries ORDER BY rowid'))this.assignGroup(entry.account,entry.tournament,entry.score);
        for(const tx of this.all("SELECT account,result FROM transactions WHERE result LIKE '%claimId%'")){try{const r=JSON.parse(tx.result);if(typeof r.claimId==='string'&&/^(tournament:|vault:)/.test(r.claimId)&&Number.isInteger(r.gems)&&Number.isInteger(r.shards))this.queueReward(tx.account,r);}catch{}}
    }
    pendingRewards(account:string):any[]{return this.all('SELECT payload FROM reward_deliveries WHERE account=? AND acked=0 ORDER BY rowid',account).map(r=>JSON.parse(r.payload));}
    queueReward(account:string,reward:any):any{this.run('INSERT OR IGNORE INTO reward_deliveries(id,account,payload) VALUES(?,?,?)',reward.claimId,account,JSON.stringify(reward));return reward;}
    acknowledgeReward(account:string,id:unknown,key:unknown):any{return this.tx(account,key,()=>{const value=this.text(id,1,200);if(!this.one('SELECT id FROM reward_deliveries WHERE id=? AND account=?',value,account))throw new ServiceError(404,'online.notFound');this.run('UPDATE reward_deliveries SET acked=1 WHERE id=?',value);return {acked:true};});}
    blocks(account:string):any[]{return this.all('SELECT a.id,a.name FROM player_blocks b JOIN accounts a ON a.id=b.target WHERE b.account=?',account);}
    block(account:string,target:unknown,enabled:unknown,key:unknown):any{return this.tx(account,key,()=>{const id=this.text(target,24,24);if(typeof enabled!=='boolean'||id===account||!this.one('SELECT id FROM accounts WHERE id=?',id))throw new ServiceError(400,'error.invalid');if(enabled)this.run('INSERT OR IGNORE INTO player_blocks VALUES(?,?)',account,id);else this.run('DELETE FROM player_blocks WHERE account=? AND target=?',account,id);return {blocked:enabled};});}
    report(account:string,message:unknown,reason:unknown,key:unknown):any{return this.tx(account,key,()=>{if(!Number.isInteger(message))throw new ServiceError(400,'error.invalid');const m=this.needMember(account),row=this.one('SELECT * FROM messages WHERE id=? AND guild=?',message as number,m.guild);if(!row||row.account===account)throw new ServiceError(404,'online.notFound');this.run('INSERT OR IGNORE INTO player_reports(account,message,reason,created) VALUES(?,?,?,?)',account,message as number,this.text(reason,3,240),this.now());return {reported:true};});}
    assignGroup(account:string,id:number,score:number):void{if(this.one('SELECT account FROM competition_groups WHERE account=? AND tournament=?',account,id))return;const bracket=Math.floor(Math.log10(Math.max(1,score))),count=this.one('SELECT COUNT(*) AS n FROM competition_groups WHERE tournament=? AND bracket=?',id,bracket).n;this.run('INSERT INTO competition_groups VALUES(?,?,?,?)',account,id,bracket,Math.floor(count/50));}
    ranked(account:string,id:number):any[]{const group=this.one('SELECT bracket,pool FROM competition_groups WHERE account=? AND tournament=?',account,id);if(!group)return [];return this.all('SELECT a.id,a.name,e.score,e.updated FROM entries e JOIN accounts a ON a.id=e.account JOIN competition_groups g ON g.account=e.account AND g.tournament=e.tournament WHERE e.tournament=? AND g.bracket=? AND g.pool=? ORDER BY e.score DESC,e.updated ASC,e.account ASC',id,group.bracket,group.pool);}
    one(sql: string, ...args: (string | number)[]): any { return this.db.prepare(sql).get(...args); }
    all(sql: string, ...args: (string | number)[]): any[] { return this.db.prepare(sql).all(...args); }
    run(sql: string, ...args: (string | number)[]): void { this.db.prepare(sql).run(...args); }
    text(value: unknown, min = 1, max = 240): string { if (typeof value !== 'string' || value.trim().length < min || value.length > max)
        throw new ServiceError(400, 'error.invalid'); return value.trim(); }
    account(name: unknown): any { const token = randomBytes(32).toString('hex'), id = randomBytes(12).toString('hex'); this.run('INSERT INTO accounts VALUES (?,?,?,?)', id, createHash('sha256').update(token).digest('hex'), this.text(name, 2, 24), this.now()); return {
        id, token
    }; }
    auth(token: string): string { const a = this.one('SELECT id FROM accounts WHERE token_hash=?', createHash('sha256').update(token).digest('hex')); if (!a)
        throw new ServiceError(401, 'online.auth'); return a.id; }
    tx(account: string, key: unknown, action: () => any): any { const id = this.text(key, 8, 120); this.db.exec('BEGIN IMMEDIATE'); try {
        const old = this.one('SELECT result FROM transactions WHERE account=? AND key=?', account, id);
        if (old) {
            this.db.exec('COMMIT');
            return JSON.parse(old.result);
        }
        const result = action();
        this.run('INSERT INTO transactions VALUES (?,?,?)', account, id, JSON.stringify(result));
        this.db.exec('COMMIT');
        return result;
    }
    catch (e) {
        this.db.exec('ROLLBACK');
        throw e;
    } }
    cloudSave(account:string):any{const row=this.one('SELECT * FROM cloud_saves WHERE account=?',account);return row?{version:row.version,updated:row.updated,state:JSON.parse(row.state)}:{version:0,updated:0,state:null};}
    saveCloud(account:string,state:unknown,version:unknown,key:unknown):any{return this.tx(account,key,()=>{const current=this.cloudSave(account);if(!Number.isInteger(version)||version!==current.version)throw new ServiceError(409,'online.saveConflict');const g=new Game(undefined,this.now);try{g.migrate(state as Save);g.validate(state as Save);}catch{throw new ServiceError(400,'error.save');}const raw=JSON.stringify(state);if(raw.length>1000000)throw new ServiceError(413,'error.save');this.run('INSERT INTO cloud_saves VALUES(?,?,?,?) ON CONFLICT(account) DO UPDATE SET state=excluded.state,version=excluded.version,updated=excluded.updated',account,raw,current.version+1,this.now());return {version:current.version+1};});}
    rename(account:string,name:unknown,key:unknown):any{return this.tx(account,key,()=>{const value=this.text(name,2,24);this.run('UPDATE accounts SET name=? WHERE id=?',value,account);return {name:value};});}
    raidWallet(account:string):any{const row=this.one('SELECT state FROM raid_wallets WHERE account=?',account);return row?JSON.parse(row.state):{dust:50,cards:Array(18).fill(1),fragments:Array(18).fill(1)};}
    writeWallet(account:string,wallet:any):void{this.run('INSERT INTO raid_wallets VALUES(?,?) ON CONFLICT(account) DO UPDATE SET state=excluded.state',account,JSON.stringify(wallet));}
    upgradeRaidCard(account:string,card:unknown,key:unknown):any{return this.tx(account,key,()=>{if(!Number.isInteger(card)||(card as number)<0||(card as number)>17)throw new ServiceError(400,'error.invalid');const i=card as number,w=this.raidWallet(account),level=w.cards[i];if(w.dust<level*10||w.fragments[i]<level)throw new ServiceError(409,'error.currency');w.dust-=level*10;w.fragments[i]-=level;w.cards[i]++;this.writeWallet(account,w);return w;});}
    buyRaidCard(account:string,card:unknown,key:unknown):any{return this.tx(account,key,()=>{const cycle=Math.floor(this.now()/21600000),offers=[cycle%18,(cycle+7)%18,(cycle+13)%18];if(!offers.includes(card as number))throw new ServiceError(400,'error.invalid');const w=this.raidWallet(account);if(w.dust<20)throw new ServiceError(409,'error.currency');w.dust-=20;w.fragments[card as number]+=5;this.writeWallet(account,w);return w;});}
    membership(account: string): any { return this.one('SELECT * FROM members WHERE account=?', account); }
    needMember(account: string): any { const m = this.membership(account); if (!m)
        throw new ServiceError(409, 'online.noGuild'); return m; }
    bootstrap(account: string): any { return {
        serverNow: this.now(), profile: this.one('SELECT id,name,created FROM accounts WHERE id=?', account), membership: this.membership(account) || null, tournament: this.currentTournament(), regular:this.currentTournament('regular')
    }; }
    guilds(): any[] { return this.all('SELECT g.id,g.name,COUNT(m.account) AS members FROM guilds g LEFT JOIN members m ON m.guild=g.id GROUP BY g.id ORDER BY g.created DESC LIMIT 50'); }
    createGuild(account: string, name: unknown, key: unknown): any { return this.tx(account, key, () => { if (this.membership(account))
        throw new ServiceError(409, 'online.alreadyGuild'); const id = randomBytes(8).toString('hex'); this.run('INSERT INTO guilds(id,name,owner,created) VALUES(?,?,?,?)', id, this.text(name, 2, 24), account, this.now()); this.run('INSERT INTO members VALUES(?,?,?)', account, id, 'leader'); return {
        id
    }; }); }
    join(account: string, guild: unknown, key: unknown): any { return this.tx(account, key, () => { if (this.membership(account))
        throw new ServiceError(409, 'online.alreadyGuild'); const id = this.text(guild, 1, 64); if (!this.one('SELECT id FROM guilds WHERE id=?', id))
        throw new ServiceError(404, 'online.notFound'); if (this.one('SELECT COUNT(*) AS n FROM members WHERE guild=?', id).n >= 50)
        throw new ServiceError(409, 'online.full'); this.run('INSERT INTO members VALUES(?,?,?)', account, id, 'member'); return {
        id
    }; }); }
    guild(account: string): any { const m = this.needMember(account); return {
        guild: this.one('SELECT id,name,owner,raid_hp,raid_cycle FROM guilds WHERE id=?', m.guild), role: m.role, members: this.all('SELECT a.id,a.name,m.role FROM members m JOIN accounts a ON a.id=m.account WHERE m.guild=?', m.guild), messages: this.all('SELECT m.id,m.account,a.name,m.body,m.created FROM messages m JOIN accounts a ON a.id=m.account WHERE m.guild=? AND NOT EXISTS(SELECT 1 FROM player_blocks b WHERE b.account=? AND b.target=m.account) ORDER BY m.id DESC LIMIT 50', m.guild,account).reverse()
    }; }
    chat(account: string, body: unknown, key: unknown): any { return this.tx(account, key, () => { const m = this.needMember(account); this.run('INSERT INTO messages(guild,account,body,created) VALUES(?,?,?,?)', m.guild, account, this.text(body, 1, 240), this.now()); return {
        sent: true
    }; }); }
    leave(account: string, key: unknown): any { return this.tx(account, key, () => { const m = this.needMember(account); const others = this.all('SELECT account FROM members WHERE guild=? AND account<>?', m.guild, account); if (m.role === 'leader' && others.length)
        throw new ServiceError(409, 'online.transferFirst'); this.run('UPDATE raid_sessions SET finished=1 WHERE account=? AND finished=0',account);this.run('DELETE FROM members WHERE account=?', account); if (!others.length) {
        this.run('DELETE FROM messages WHERE guild=?', m.guild);
        this.run('DELETE FROM guilds WHERE id=?', m.guild);
    } return {
        left: true
    }; }); }
    role(account: string, target: unknown, action: unknown, key: unknown): any { return this.tx(account, key, () => { const m = this.needMember(account); if (m.role !== 'leader')
        throw new ServiceError(403, 'online.permission'); const id = this.text(target, 1, 64), other = this.needMember(id); if (other.guild !== m.guild || id === account)
        throw new ServiceError(400, 'error.invalid'); if (action === 'transfer') {
        this.run("UPDATE members SET role='member' WHERE account=?", account);
        this.run("UPDATE members SET role='leader' WHERE account=?", id);
        this.run('UPDATE guilds SET owner=? WHERE id=?', id, m.guild);
    }
    else if (action === 'kick')
        this.run('DELETE FROM members WHERE account=?', id);
    else
        throw new ServiceError(400, 'error.invalid'); return {
        updated: true
    }; }); }
    attackGuild(account: string, key: unknown): any { return this.tx(account, key, () => { const m = this.needMember(account), g = this.one('SELECT * FROM guilds WHERE id=?', m.guild), cycle = Math.floor(this.now() / 43200000), prior = this.one('SELECT count FROM raid_attacks WHERE account=? AND guild=? AND cycle=?', account, m.guild, cycle); if (prior && prior.count >= 3)
        throw new ServiceError(409, 'online.noAttacks'); if (g.raid_hp <= 0)
        throw new ServiceError(409, 'online.raidComplete'); const damage = Math.min(500,g.raid_hp);this.run('INSERT INTO guild_logs(guild,account,damage,created) VALUES(?,?,?,?)',m.guild,account,damage,this.now()); this.run('UPDATE guilds SET raid_hp=MAX(0,raid_hp-?) WHERE id=?', damage, m.guild); this.run('INSERT INTO raid_attacks(account,guild,cycle,count) VALUES(?,?,?,1) ON CONFLICT(account,guild,cycle) DO UPDATE SET count=count+1', account, m.guild, cycle); return {
        damage, hp: Math.max(0, g.raid_hp - damage), remaining: 2 - (prior?.count || 0)
    }; }); }


    beginGuildRaid(account:string,deck:unknown,key:unknown):any{return this.tx(account,key,()=>{const m=this.needMember(account),guild=this.one('SELECT raid_hp FROM guilds WHERE id=?',m.guild),cycle=Math.floor(this.now()/43200000),prior=this.one('SELECT count FROM raid_attacks WHERE account=? AND guild=? AND cycle=?',account,m.guild,cycle);if(!guild.raid_hp)throw new ServiceError(409,'online.raidComplete');if(prior&&prior.count>=3)throw new ServiceError(409,'online.noAttacks');if(!Array.isArray(deck)||deck.length!==3||new Set(deck).size!==3||!deck.every(i=>Number.isInteger(i)&&i>=0&&i<18))throw new ServiceError(400,'error.invalid');const active=this.one('SELECT id,started FROM raid_sessions WHERE account=? AND finished=0 ORDER BY started DESC LIMIT 1',account);if(active)throw new ServiceError(409,'extra.raidPending');const g=new Game(undefined,this.now);g.s.maxStage=100;g.s.deck=deck;const wallet=this.raidWallet(account);g.s.cards=wallet.cards.slice();g.startRaid();const id=randomBytes(12).toString('hex');this.run('INSERT INTO raid_sessions VALUES(?,?,?,?,?,?,0)',id,account,m.guild,JSON.stringify({raid:g.raid,deck,cards:wallet.cards}),this.now(),0);this.run('INSERT INTO raid_attacks VALUES(?,?,?,1) ON CONFLICT(account,guild,cycle) DO UPDATE SET count=count+1',account,m.guild,cycle);return {id,raid:g.raid};});}
    guildRaidSession(account:string):any{const row=this.one('SELECT * FROM raid_sessions WHERE account=? AND finished=0 ORDER BY started DESC LIMIT 1',account);if(!row)return null;const state=JSON.parse(row.state);state.raid.seconds=Math.max(0,30-(this.now()-row.started)/1000);return {id:row.id,raid:state.raid};}
    hitGuildRaid(account:string,id:unknown,part:unknown,key:unknown):any{return this.tx(account,key,()=>{const row=this.one('SELECT * FROM raid_sessions WHERE id=? AND account=?',this.text(id,1,64),account);if(!row||row.finished)throw new ServiceError(409,'error.claimed');if(this.needMember(account).guild!==row.guild)throw new ServiceError(403,'online.permission');if(this.now()-row.started>=30000)throw new ServiceError(409,'online.ended');if(this.now()-row.last_hit<80)throw new ServiceError(429,'online.rateLimit');if(!Number.isInteger(part)||(part as number)<0||(part as number)>7)throw new ServiceError(400,'error.invalid');const state=JSON.parse(row.state),g=new Game(undefined,this.now);g.s.deck=state.deck;g.s.cards=state.cards||Array(18).fill(1);g.raid={...state.raid,expiresAt:row.started+30000,portal:state.raid.portal||1,deck:state.deck};g.raidTap(part as number);g.raid!.seconds=Math.max(0,30-(this.now()-row.started)/1000);this.run('UPDATE raid_sessions SET state=?,last_hit=? WHERE id=?',JSON.stringify({raid:g.raid,deck:state.deck,cards:g.s.cards}),this.now(),row.id);return {id:row.id,raid:g.raid};});}
    finishGuildRaid(account:string,id:unknown,key:unknown):any{return this.tx(account,key,()=>{const row=this.one('SELECT * FROM raid_sessions WHERE id=? AND account=?',this.text(id,1,64),account);if(!row||row.finished)throw new ServiceError(409,'error.claimed');if(this.needMember(account).guild!==row.guild)throw new ServiceError(403,'online.permission');const state=JSON.parse(row.state);if(this.now()-row.started<30000&&!state.raid.ended)throw new ServiceError(409,'online.notEnded');const guild=this.one('SELECT raid_hp FROM guilds WHERE id=?',row.guild);if(!guild)throw new ServiceError(404,'online.notFound');const damage=Math.min(guild.raid_hp,state.raid.damage);this.run('UPDATE guilds SET raid_hp=MAX(0,raid_hp-?) WHERE id=?',damage,row.guild);this.run('INSERT INTO guild_logs(guild,account,damage,created) VALUES(?,?,?,?)',row.guild,account,damage,this.now());this.run('UPDATE raid_sessions SET finished=1 WHERE id=?',row.id);const wallet=this.raidWallet(account);wallet.dust+=Math.max(1,Math.floor(damage/100));state.deck.forEach((i:number)=>wallet.fragments[i]++);this.writeWallet(account,wallet);return {damage,hp:guild.raid_hp-damage,cardDamage:state.raid.cardDamage};});}
    global():any { const season=Math.floor(this.now()/86400000),total=this.one('SELECT COALESCE(SUM(damage),0) AS total FROM global_hits WHERE season=?',season).total;return {season,hp:Math.max(0,1000000-total),ends:(season+1)*86400000}; }
    globalRanks():any[]{return this.all('SELECT a.name,h.damage FROM global_hits h JOIN accounts a ON a.id=h.account WHERE h.season=? ORDER BY h.damage DESC,a.id LIMIT 50',this.global().season);}
    globalAttack(account:string,key:unknown):any{return this.tx(account,key,()=>{const state=this.global(),prior=this.one('SELECT * FROM global_hits WHERE account=? AND season=?',account,state.season);if(prior&&this.now()-prior.last<1000)throw new ServiceError(429,'online.rateLimit');if(!state.hp)throw new ServiceError(409,'online.raidComplete');const damage=Math.min(100,state.hp);this.run('INSERT INTO global_hits VALUES(?,?,?,?) ON CONFLICT(account,season) DO UPDATE SET damage=damage+excluded.damage,last=excluded.last',account,state.season,damage,this.now());return {...this.global(),damage};});}
    searchGuilds(query:string):any[]{return this.guilds().filter(g=>g.name.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));}
    guildInfo(account:string):any{const m=this.needMember(account);return {settings:this.one('SELECT description,badge FROM guild_settings WHERE guild=?',m.guild)||{description:'',badge:0},logs:this.all('SELECT a.name,l.damage,l.created FROM guild_logs l JOIN accounts a ON a.id=l.account WHERE l.guild=? ORDER BY l.id DESC LIMIT 50',m.guild),vault:this.one('SELECT COALESCE(SUM(damage),0) AS damage FROM guild_logs WHERE guild=?',m.guild).damage};}
    editGuild(account:string,name:unknown,description:unknown,badge:unknown,key:unknown):any{return this.tx(account,key,()=>{const m=this.needMember(account);if(m.role!=='leader')throw new ServiceError(403,'online.permission');if(!Number.isInteger(badge)||(badge as number)<0||(badge as number)>5)throw new ServiceError(400,'error.invalid');const desc=typeof description==='string'?description:'';if(desc.length>240)throw new ServiceError(400,'error.invalid');this.run('UPDATE guilds SET name=? WHERE id=?',this.text(name,2,24),m.guild);this.run('INSERT INTO guild_settings VALUES(?,?,?) ON CONFLICT(guild) DO UPDATE SET description=excluded.description,badge=excluded.badge',m.guild,desc,badge as number);return {updated:true};});}
    memberProfile(account:string,target:string):any{const m=this.needMember(account),other=this.needMember(target);if(m.guild!==other.guild)throw new ServiceError(403,'online.permission');return {...this.one('SELECT name,created FROM accounts WHERE id=?',target),role:other.role,damage:this.one('SELECT COALESCE(SUM(damage),0) AS damage FROM guild_logs WHERE account=? AND guild=?',target,m.guild).damage};}
    vault(account:string,key:unknown):any{return this.tx(account,key,()=>{const m=this.needMember(account),cycle=Math.floor(this.now()/43200000),damage=this.one('SELECT COALESCE(SUM(damage),0) AS total FROM guild_logs WHERE guild=? AND created>=?',m.guild,cycle*43200000).total;if(damage<1000)throw new ServiceError(409,'error.locked');if(this.one('SELECT account FROM vault_claims WHERE account=? AND guild=? AND cycle=?',account,m.guild,cycle))throw new ServiceError(409,'error.claimed');this.run('INSERT INTO vault_claims VALUES(?,?,?)',account,m.guild,cycle);return this.queueReward(account,{claimId:`vault:${m.guild}:${cycle}:${account}`,gems:20,shards:5});});}
    retireRaid(account:string,key:unknown):any{return this.tx(account,key,()=>{const m=this.needMember(account);if(m.role!=='leader')throw new ServiceError(403,'online.permission');this.run('UPDATE raid_sessions SET finished=1 WHERE guild=? AND finished=0',m.guild);this.run('UPDATE guilds SET raid_hp=100000,raid_cycle=raid_cycle+1 WHERE id=?',m.guild);return {retired:true};});}
    currentTournament(mode='abyss'): any { const regular=mode==='regular',period=regular?172800000:86400000,cycle=Math.floor(this.now()/period),id=regular?-(cycle+1):cycle,start=cycle*period,end=start+period; this.run('INSERT OR IGNORE INTO tournaments VALUES(?,?,?)', id, start, end); return {
        id, start, end
    }; }
    joinTournament(account: string, key: unknown, mode='abyss'): any { return this.tx(account, key, () => { if(!['abyss','regular'].includes(mode))throw new ServiceError(400,'error.invalid');const t = this.currentTournament(mode); const old = this.one('SELECT state FROM entries WHERE account=? AND tournament=?', account, t.id); if (old){this.assignGroup(account,t.id,JSON.parse(old.state).maxStage);return {
            id: t.id, state: JSON.parse(old.state)
        };} const g = new Game(undefined, this.now);if(mode==='regular'){const previous=this.one('SELECT state FROM entries WHERE account=? AND tournament<0 ORDER BY tournament ASC LIMIT 1',account);if(previous){g.s=JSON.parse(previous.state);g.migrate(g.s);g.validate(g.s);}}else { g.s.run.master = 100; g.s.run.gold = amount(100000); g.s.gems = 1000;} this.run('INSERT INTO entries(account,tournament,state,updated,score) VALUES(?,?,?,?,?)', account, t.id, JSON.stringify(g.s), this.now(),g.s.maxStage);this.assignGroup(account,t.id,g.s.maxStage); return {
        id: t.id, state: g.s
    }; }); }
    tournamentHistory(account:string):any[]{return this.all('SELECT t.id,t.start,t.end,e.score,e.claimed FROM entries e JOIN tournaments t ON t.id=e.tournament WHERE e.account=? ORDER BY t.start DESC LIMIT 30',account);}
    advance(account: string, id: number): Game { const entry = this.one('SELECT * FROM entries WHERE account=? AND tournament=?', account, id); if (!entry)
        throw new ServiceError(404, 'online.notJoined'); const g = new Game(undefined, this.now); g.s = JSON.parse(entry.state) as Save; g.migrate(g.s); g.validate(g.s); const elapsed = Math.min(300, Math.max(0, (this.now() - entry.updated) / 1000)); for (let seconds = 0; seconds < elapsed; seconds++)
        g.tick(Math.min(1, elapsed - seconds)); return g; }
    competition(account: string, id: number): any { const tournament = this.one('SELECT * FROM tournaments WHERE id=?', id); if (!tournament)
        throw new ServiceError(404, 'online.notFound'); const entry = this.one('SELECT * FROM entries WHERE account=? AND tournament=?', account, id); return {
        tournament, state: entry ? JSON.parse(entry.state) : null, claimed: entry?.claimed === 1, leaderboard: this.ranked(account,id),group:this.one('SELECT bracket,pool FROM competition_groups WHERE account=? AND tournament=?',account,id),serverNow:this.now()
    }; }
    competitionAction(account: string, id: number, action: unknown, hero: unknown, key: unknown): any { return this.tx(account, key, () => { const tournament = this.one('SELECT * FROM tournaments WHERE id=?', id); if (!tournament || this.now() >= tournament.end)
        throw new ServiceError(409, 'online.ended'); const g = this.advance(account, id); if (action === 'tap') {
        g.tap();
    }
    else if (action === 'upgrade') {
        if (!Number.isInteger(hero) || (hero as number) < -1 || (hero as number) > 23)
            throw new ServiceError(400, 'error.invalid');
        if (!g.buy(hero as number, 1))
            throw new ServiceError(409, g.notice);
    }
    else if(action==='shop'){if(!g.buyDeal(2,String(key)))throw new ServiceError(409,g.notice);}
    else if (action === 'boss')
        g.toggleBoss();
    else if (action === 'prestige') {
        if (!g.prestige(String(key)))
            throw new ServiceError(409, g.notice);
    }
    else
        throw new ServiceError(400, 'error.invalid'); this.run('UPDATE entries SET state=?,updated=?,score=? WHERE account=? AND tournament=?', JSON.stringify(g.s), this.now(), g.s.maxStage, account, id); return {
        state: g.s
    }; }); }
    claimTournament(account: string, id: number, key: unknown): any { return this.tx(account, key, () => { const t = this.one('SELECT * FROM tournaments WHERE id=?', id), entry = this.one('SELECT * FROM entries WHERE account=? AND tournament=?', account, id); if (!entry || !t)
        throw new ServiceError(404, 'online.notJoined'); if (this.now() < t.end)
        throw new ServiceError(409, 'online.notEnded'); if (entry.claimed)
        throw new ServiceError(409, 'error.claimed'); this.assignGroup(account,id,entry.score);const ranks=this.ranked(account,id);const rank=ranks.findIndex(r=>r.id===account)+1; this.run('UPDATE entries SET claimed=1 WHERE account=? AND tournament=?', account, id); return this.queueReward(account,{
        claimId: `tournament:${id}:${account}`, rank, gems: Math.max(25, 200 - (rank - 1) * 10), shards: 10
    }); }); }
}
