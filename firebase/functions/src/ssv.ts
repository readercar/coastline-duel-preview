import {createPublicKey,verify} from 'node:crypto';
let cached:{at:number;keys:Record<string,string>}|null=null;
export function verifySignature(raw:string,keys:Record<string,string>):URLSearchParams {
    const match=/^(.*)&signature=([^&]+)&key_id=(\d+)$/.exec(raw);
    if(!match||!keys[match[3]])throw Error('money.verification');
    const params=new URLSearchParams(match[1]);
    for(const key of params.keys())if(params.getAll(key).length!==1)throw Error('money.verification');
    const key=createPublicKey({key:Buffer.from(keys[match[3]],'base64'),format:'der',type:'spki'});
    // AdMob signs the percent-decoded query (Google's URI.getQuery example),
    // preserving its parameter order. Parse values from the original query.
    if(!verify('sha256',Buffer.from(decodeURIComponent(match[1])),key,Buffer.from(decodeURIComponent(match[2]),'base64url')))throw Error('money.verification');
    return params;
}
export function isConsoleProbe(p:URLSearchParams):boolean {
    // AdMob's console verifier uses these dummy identifiers. A probe checks
    // reachability/signature only and must never enter the reward ledger.
    return p.get('ad_unit')==='1234567890'&&p.get('transaction_id')==='123456789'&&p.get('ad_network')==='5450213213286189855';
}
export async function verifyGoogle(raw:string):Promise<URLSearchParams>{
    if(!cached||Date.now()-cached.at>12*3600000){
        const r=await fetch('https://www.gstatic.com/admob/reward/verifier-keys.json',{signal:AbortSignal.timeout(5000)});
        if(!r.ok)throw Error('money.verification');
        const body=await r.json() as {keys:{keyId:number;base64:string}[]};
        cached={at:Date.now(),keys:Object.fromEntries(body.keys.map(k=>[String(k.keyId),k.base64]))};
    }
    return verifySignature(raw,cached.keys);
}
