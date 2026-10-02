import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, extname, join } from 'node:path';
import { CommerceService } from './Commerce';
import { Service, ServiceError } from './Service';
const root = process.cwd();
mkdirSync(join(root, '.local-server'), {
    recursive: true
});
const service = new Service(join(root, '.local-server', 'development.sqlite'));
const commerce=new CommerceService(service);
const windows = new Map<string, {
    since: number;
    count: number;
}>();
function send(res: ServerResponse, status: number, value: any): void { res.writeHead(status, {
    'Content-Type': 'application/json', 'Cache-Control': 'no-store'
}); res.end(JSON.stringify(value)); }
async function body(req: IncomingMessage): Promise<any> { let raw = ''; for await (const chunk of req) {
    raw += chunk;
    if (raw.length > (req.url==='/api/account/save'?1000000:8192))
        throw new ServiceError(413, 'error.invalid');
} try {
    return raw ? JSON.parse(raw) : {};
}
catch {
    throw new ServiceError(400, 'error.invalid');
} }
createServer(async (req, res) => {
    const origin = req.headers.origin;
    if (origin && /^http:\/\/(127\.0\.0\.1|localhost):(8765|8788)$/.test(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Vary', 'Origin');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    }
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }
    try {
        const url = new URL(req.url || '/', 'http://127.0.0.1:8788'), path = url.pathname;
        if (!path.startsWith('/api/')) {
            const file = resolve(root, 'build/web-mobile', '.' + (path === '/' ? '/index.html' : path));
            const base = resolve(root, 'build/web-mobile') + '/';
            if (!file.startsWith(base) || !existsSync(file)) {
                res.writeHead(404);
                res.end();
                return;
            }
            const types: Record<string, string> = {
                '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.wasm': 'application/wasm'
            };
            res.writeHead(200, {
                'Content-Type': types[extname(file)] || 'application/octet-stream'
            });
            res.end(readFileSync(file));
            return;
        }
        if (req.method === 'GET' && path === '/api/health') {
            send(res, 200, {
                status: 'ok', version:'0.2.0', maintenance:process.env.EMBER_MAINTENANCE==='1', serverNow: service.now()
            });
            return;
        }
        if(process.env.EMBER_MAINTENANCE==='1')throw new ServiceError(503,'online.maintenance');
        const data = req.method === 'POST' ? await body(req) : {};
        const rateKey = String(req.headers.authorization || req.socket.remoteAddress) + (path === '/api/competition/action' ? ':battle' : ':api'), now = Date.now(), window = windows.get(rateKey);
        if (!window || now - window.since > 1000)
            windows.set(rateKey, {
                since: now, count: 1
            });
        else if (++window.count > (path === '/api/competition/action' ? 12 : 40))
            throw new ServiceError(429, 'online.rateLimit');
        if (path === '/api/account' && req.method === 'POST') {
            send(res, 201, service.account(data.name));
            return;
        }
        const token = String(req.headers.authorization || '').replace(/^Bearer /, '');
        const account = service.auth(token);
        let result: any;
        if (req.method === 'GET') {
            if (path === '/api/bootstrap')
                result = service.bootstrap(account);
            else if (path === '/api/guilds')
                result = service.searchGuilds(url.searchParams.get('q')||'');
            else if (path === '/api/guild')
                result = service.guild(account);
            else if(path==='/api/commerce/status')result=commerce.status(account);
            else if(path==='/api/commerce/grants')result=commerce.grants(account);
            else if(path==='/api/account/save')result=service.cloudSave(account);
            else if(path==='/api/competition/history')result=service.tournamentHistory(account);
            else if(path==='/api/raid/cards')result=service.raidWallet(account);
            else if(path==='/api/global') result=service.global();
            else if(path==='/api/global/ranks')result=service.globalRanks();
            else if(path==='/api/guild/raid')result=service.guildRaidSession(account);
            else if(path==='/api/guild/info')result=service.guildInfo(account);
            else if(path==='/api/guild/member')result=service.memberProfile(account,url.searchParams.get('id')||'');
            else if (path === '/api/competition')
                result = service.competition(account, Number(url.searchParams.get('id')));
            else
                throw new ServiceError(404, 'online.notFound');
        }
        else if (req.method === 'POST') {
            switch (path) {
                case '/api/commerce/purchase':result=await commerce.purchase(account,data.receipt,data.key,data.product);break;
                case '/api/commerce/restore':result=await commerce.purchase(account,data.receipt,data.key);break;
                case '/api/commerce/ad/start':result=commerce.startAd(account,data.placement,data.key);break;
                case '/api/commerce/ad/complete':result=await commerce.completeAd(account,data.ticket,data.proof,data.key);break;
                case '/api/commerce/ack':result=commerce.ack(account,data.id,data.key);break;
                case '/api/account/save':result=service.saveCloud(account,data.state,data.version,data.key);break;
                case '/api/account/name':result=service.rename(account,data.name,data.key);break;
                case '/api/raid/cards/upgrade':result=service.upgradeRaidCard(account,data.card,data.key);break;
                case '/api/raid/cards/buy':result=service.buyRaidCard(account,data.card,data.key);break;
                case '/api/guild/raid/start':result=service.beginGuildRaid(account,data.deck,data.key);break;
                case '/api/guild/raid/hit':result=service.hitGuildRaid(account,data.id,data.part,data.key);break;
                case '/api/guild/raid/finish':result=service.finishGuildRaid(account,data.id,data.key);break;
                case '/api/global/attack':result=service.globalAttack(account,data.key);break;
                case '/api/guild/edit':result=service.editGuild(account,data.name,data.description,data.badge,data.key);break;
                case '/api/guild/vault':result=service.vault(account,data.key);break;
                case '/api/guild/retire':result=service.retireRaid(account,data.key);break;
                case '/api/guild/create':
                    result = service.createGuild(account, data.name, data.key);
                    break;
                case '/api/guild/join':
                    result = service.join(account, data.guild, data.key);
                    break;
                case '/api/guild/chat':
                    result = service.chat(account, data.body, data.key);
                    break;
                case '/api/guild/leave':
                    result = service.leave(account, data.key);
                    break;
                case '/api/guild/role':
                    result = service.role(account, data.target, data.action, data.key);
                    break;
                case '/api/guild/attack':
                    result = service.attackGuild(account, data.key);
                    break;
                case '/api/competition/join':
                    result = service.joinTournament(account, data.key,data.mode||'abyss');
                    break;
                case '/api/competition/action':
                    result = service.competitionAction(account, data.id, data.action, data.hero, data.key);
                    break;
                case '/api/competition/claim':
                    result = service.claimTournament(account, data.id, data.key);
                    break;
                default: throw new ServiceError(404, 'online.notFound');
            }
        }
        else
            throw new ServiceError(405, 'error.invalid');
        send(res, 200, result);
    }
    catch (e) {
        send(res, e instanceof ServiceError ? e.status : 500, {
            error: e instanceof ServiceError ? e.message : 'online.serverError'
        });
    }
}).listen(8788, '127.0.0.1', () => console.log('Ember Ascent development server: http://127.0.0.1:8788'));
