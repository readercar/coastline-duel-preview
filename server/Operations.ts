import {createHash} from 'node:crypto';
import {Service,ServiceError} from './Service';
import {Game} from '../assets/scripts/core/Game';
import {Mail,validateMail,diagnostic,validId} from '../assets/scripts/core/Operations';
import {mailExpiry} from '../assets/scripts/core/LiveOps';
export class Operations {
 constructor(public service:Service){service.db.exec(`CREATE TABLE IF NOT EXISTS operations_mail(id TEXT PRIMARY KEY,payload TEXT NOT NULL);
 CREATE TABLE IF NOT EXISTS message_reads(account TEXT NOT NULL,id TEXT NOT NULL,PRIMARY KEY(account,id));
 CREATE TABLE IF NOT EXISTS mail_receipts(account TEXT NOT NULL,id TEXT NOT NULL,claimed INTEGER NOT NULL,deleted INTEGER NOT NULL DEFAULT 0,PRIMARY KEY(account,id));
 CREATE TABLE IF NOT EXISTS client_errors(id TEXT PRIMARY KEY,account TEXT NOT NULL,payload TEXT NOT NULL,created INTEGER NOT NULL);`);}
 reads(account:string):string[]{return this.service.all('SELECT id FROM message_reads WHERE account=?',account).map(x=>x.id);}
 read(account:string,id:unknown):any{if(!validId(id))throw new ServiceError(400,'error.invalid');this.service.run('INSERT OR IGNORE INTO message_reads VALUES(?,?)',account,id);return {ok:true};}
 mail(account:string):any[]{const s=this.service;return s.all('SELECT payload FROM operations_mail ORDER BY rowid DESC').map(x=>JSON.parse(x.payload) as Mail).filter(m=>!m.revoked&&mailExpiry(m)>s.now()&&(m.recipient==='all'||m.recipient===account)).map(m=>{const r=s.one('SELECT claimed,deleted FROM mail_receipts WHERE account=? AND id=?',account,m.id);return {...m,claimed:!!r?.claimed,deleted:!!r?.deleted};}).filter(m=>!m.deleted);}
 publish(value:unknown):Mail{const m=validateMail(value),s=this.service,old=s.one('SELECT payload FROM operations_mail WHERE id=?',m.id),raw=JSON.stringify(m);if(old&&old.payload!==raw)throw new ServiceError(409,'online.saveConflict');s.run('INSERT OR IGNORE INTO operations_mail VALUES(?,?)',m.id,raw);return m;}
 revoke(id:unknown):any{if(!validId(id))throw new ServiceError(400,'error.invalid');const s=this.service,m=s.one('SELECT payload FROM operations_mail WHERE id=?',id);if(!m)throw new ServiceError(404,'online.notFound');const v=JSON.parse(m.payload);v.revoked=true;s.run('UPDATE operations_mail SET payload=? WHERE id=?',JSON.stringify(v),id);return {ok:true};}
 claim(account:string,id:unknown,version:unknown,key:unknown):any{const s=this.service;if(validId(id)&&s.one('SELECT claimed FROM mail_receipts WHERE account=? AND id=? AND claimed=1',account,id))return s.cloudSave(account);return s.tx(account,key,()=>{
  if(!validId(id))throw new ServiceError(400,'error.invalid');const saved=s.cloudSave(account),receipt=s.one('SELECT claimed FROM mail_receipts WHERE account=? AND id=?',account,id);
  if(receipt?.claimed)return saved;
  const row=s.one('SELECT payload FROM operations_mail WHERE id=?',id),m=row&&JSON.parse(row.payload) as Mail;if(!m||m.revoked||mailExpiry(m)<=s.now()||!(m.recipient==='all'||m.recipient===account))throw new ServiceError(404,'online.notFound');
  if(!saved.state||saved.version!==version)throw new ServiceError(409,'online.saveConflict');
  const g=new Game(undefined,s.now);g.s=saved.state;const r=m.rewards;g.s.gems+=r.gems;g.s.shards+=r.shards;g.s.dust+=r.dust;g.s.pets[r.pet]+=r.petLevels;g.validate(g.s);
  s.run('UPDATE cloud_saves SET state=?,version=?,updated=? WHERE account=?',JSON.stringify(g.s),saved.version+1,s.now(),account);s.run('INSERT INTO mail_receipts(account,id,claimed) VALUES(?,?,1) ON CONFLICT(account,id) DO UPDATE SET claimed=1',account,id);return {state:g.s,version:saved.version+1};
 });}
 delete(account:string,id:unknown):any{if(!validId(id)||!this.service.one('SELECT claimed FROM mail_receipts WHERE account=? AND id=? AND claimed=1',account,id))throw new ServiceError(404,'online.notFound');this.service.run('UPDATE mail_receipts SET deleted=1 WHERE account=? AND id=?',account,id);return {ok:true};}
 error(account:string,id:unknown,value:unknown):any{if(!validId(id))throw new ServiceError(400,'error.invalid');const s=this.service;if(s.one('SELECT COUNT(*) AS n FROM client_errors WHERE account=? AND created>?',account,s.now()-3600000).n>=20)throw new ServiceError(429,'online.rateLimit');s.run('INSERT OR IGNORE INTO client_errors VALUES(?,?,?,?)',id,account,JSON.stringify(diagnostic(value)),s.now());return {ok:true};}
 errors():any[]{return this.service.all('SELECT * FROM client_errors ORDER BY created DESC LIMIT 100').map(x=>({...x,payload:JSON.parse(x.payload)}));}
}
