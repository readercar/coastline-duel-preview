import {createPublicKey,verify} from 'node:crypto';
let cached:{at:number;keys:Record<string,string>}|null=null;
export function verifySignature(raw:string,keys:Record<string,string>):URLSearchParams {
    const match=/^(.*)&signature=([^&]+)&key_id=(\d+)$/.exec(raw);
    if(!match||!keys[match[3]])throw Error('money.verification');
    const params=new URLSearchParams(match[1]);
    for(const key of params.keys())if(params.getAll(key).length!==1)throw Error('money.verification');
    const key=createPublicKey({key:Buffer.from(keys[match[3]],'base64'),format:'der',type:'spki'});
    if(!verify('sha256',Buffer.from(match[1]),key,Buffer.from(decodeURIComponent(match[2]),'base64url')))throw Error('money.verification');
    return params;
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
