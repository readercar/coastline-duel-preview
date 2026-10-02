const {DatabaseSync,backup}=require('node:sqlite');
const fs=require('node:fs'),path=require('node:path');
const source=path.resolve(process.env.EMBER_DATA_DIR||'.local-server','development.sqlite');
const dir=path.resolve(process.env.EMBER_BACKUP_DIR||'.server-backups');
if(!fs.existsSync(source))throw Error('Database not found');
fs.mkdirSync(dir,{recursive:true,mode:0o700});
const destination=path.join(dir,'ember-'+new Date().toISOString().replace(/[:.]/g,'-')+'.sqlite');
const db=new DatabaseSync(source,{readOnly:true});
backup(db,destination).then(()=>{db.close();fs.chmodSync(destination,0o600);console.log('Database backup created:',destination);}).catch(e=>{db.close();console.error(e.message);process.exit(1);});
