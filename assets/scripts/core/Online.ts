import { Storage } from './Game';
/** Development online service. Local-only endpoint; no production credentials. */
export class Online {
    base = 'http://127.0.0.1:8788/api';
    token = '';
    accountId = '';
    constructor(private storage: Storage) { this.token = storage.getItem('ember-online-token') || ''; this.accountId = storage.getItem('ember-online-id') || ''; }
    async request(path: string, data?: Record<string, unknown>): Promise<any> {
        const controller = new AbortController(), timer = setTimeout(() => controller.abort(), 8000);
        try {
            const r = await fetch(this.base + path, {
                method: data ? 'POST' : 'GET', headers: {
                    'Content-Type': 'application/json', ...(this.token ? {
                        Authorization: `Bearer ${this.token}`
                    } : {})
                }, ...(data ? {
                    body: JSON.stringify(data)
                } : {}), signal: controller.signal
            });
            const result = await r.json();
            if (!r.ok)
                throw Error(result.error || 'online.serverError');
            return result;
        }
        catch (e) {
            if ((e as Error).message.startsWith('online.') || (e as Error).message.startsWith('error.') || (e as Error).message.startsWith('extra.') || (e as Error).message.startsWith('money.'))
                throw e;
            throw Error('online.unreachable');
        }
        finally {
            clearTimeout(timer);
        }
    }
    async recover(token:string,accountId:string):Promise<void>{const previous=this.token;this.token=token;try{const boot=await this.request('/bootstrap');if(boot.profile.id!==accountId)throw Error('online.auth');this.storage.setItem('ember-online-token',token);this.storage.setItem('ember-online-id',accountId);this.accountId=accountId;this.storage.setItem('ember-online-pending','{}');}catch(e){this.token=previous;throw e;}}
    async connect(name: string): Promise<any> { if (!this.token) {
        const account = await this.request('/account', {
            name
        });
        this.token = account.token;
        this.accountId = account.id;
        this.storage.setItem('ember-online-token', this.token);
        this.storage.setItem('ember-online-id', this.accountId);
    } return this.request('/bootstrap'); }
    async command(path: string, data: Record<string, unknown> = {}, explicitKey?:string): Promise<any> {
        const fingerprint=path+JSON.stringify(data);let pending:Record<string,string>={};try{const saved=JSON.parse(this.storage.getItem('ember-online-pending')||'{}');if(saved&&typeof saved==='object'&&!Array.isArray(saved))pending=saved;}catch{};
        const key=explicitKey||pending[fingerprint]||`tx-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        pending[fingerprint]=key;this.storage.setItem('ember-online-pending',JSON.stringify(pending));
        try{const result=await this.request(path,{...data,key});delete pending[fingerprint];this.storage.setItem('ember-online-pending',JSON.stringify(pending));return result;}
        catch(e){if((e as Error).message!=='online.unreachable'){delete pending[fingerprint];this.storage.setItem('ember-online-pending',JSON.stringify(pending));}throw e;}
    }
}
