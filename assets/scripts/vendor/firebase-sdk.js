var qE=Object.defineProperty;var jE=(n,e,t)=>e in n?qE(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var M=(n,e,t)=>jE(n,typeof e!="symbol"?e+"":e,t);var _f=()=>{};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var yf=function(n){let e=[],t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},KE=function(n){let e=[],t=0,r=0;for(;t<n.length;){let s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){let i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){let i=n[t++],a=n[t++],u=n[t++],c=((s&7)<<18|(i&63)<<12|(a&63)<<6|u&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{let i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},wf={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();let t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){let i=n[s],a=s+1<n.length,u=a?n[s+1]:0,c=s+2<n.length,l=c?n[s+2]:0,d=i>>2,f=(i&3)<<4|u>>4,m=(u&15)<<2|l>>6,v=l&63;c||(v=64,a||(m=64)),r.push(t[d],t[f],t[m],t[v])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(yf(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):KE(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();let t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){let i=t[n.charAt(s++)],u=s<n.length?t[n.charAt(s)]:0;++s;let l=s<n.length?t[n.charAt(s)]:64;++s;let f=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||u==null||l==null||f==null)throw new Ju;let m=i<<2|u>>4;if(r.push(m),l!==64){let v=u<<4&240|l>>2;if(r.push(v),f!==64){let R=l<<6&192|f;r.push(R)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}},Ju=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},JE=function(n){let e=yf(n);return wf.encodeByteArray(e,!0)},Hs=function(n){return JE(n).replace(/\./g,"")},Da=function(n){try{return wf.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function If(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var zE=()=>If().__FIREBASE_DEFAULTS__,WE=()=>{if(typeof process>"u"||typeof process.env>"u")return;let n=process.env.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},QE=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let e=n&&Da(n[1]);return e&&JSON.parse(e)},ya=()=>{try{return _f()||zE()||WE()||QE()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Wu=n=>ya()?.emulatorHosts?.[n],Tf=n=>{let e=Wu(n);if(!e)return;let t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);let r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Qu=()=>ya()?.config,$u=n=>ya()?.[`_${n}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Nr=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Af(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");let a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Hs(JSON.stringify(t)),Hs(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ge(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function vf(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ge())}function $E(){let n=ya()?.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function bf(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Sf(){let n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Rf(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Pf(){let n=Ge();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Nf(){return!$E()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Yu(){try{return typeof indexedDB=="object"}catch{return!1}}function Of(){return new Promise((n,e)=>{try{let t=!0,r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var YE="FirebaseError",lt=class n extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=YE,Object.setPrototypeOf(this,n.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,jt.prototype.create)}},jt=class{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){let r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?XE(i,r):"Error",u=`${this.serviceName}: ${a} (${s}).`;return new lt(s,u,r)}};function XE(n,e){try{let t=0,r="";for(;t<n.length;){let s=n.indexOf("{$",t);if(s===-1){r+=n.substring(t);break}let i=n.indexOf("}",s+2);if(i===-1){r+=n.substring(t);break}let a=n.substring(s+2,i),u=e[a];r+=n.substring(t,s)+(u!=null?String(u):`<${a}?>`),t=i+1}return r}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ff(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function It(n,e){if(n===e)return!0;let t=Object.keys(n),r=Object.keys(e);for(let s of t){if(!r.includes(s))return!1;let i=n[s],a=e[s];if(Df(i)&&Df(a)){if(!It(i,a))return!1}else if(i!==a)return!1}for(let s of r)if(!t.includes(s))return!1;return!0}function Df(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Or(n){let e=[];for(let[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Fr(n){let e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){let[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function Lr(n){let e=n.indexOf("?");if(!e)return"";let t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lf(n,e){let t=new zu(n,e);return t.subscribe.bind(t)}var zu=class{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");ZE(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Ku),s.error===void 0&&(s.error=Ku),s.complete===void 0&&(s.complete=Ku);let i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}};function ZE(n,e){if(typeof n!="object"||n===null)return!1;for(let t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Ku(){}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var HT=14400*1e3;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Le(n){return n&&n._delegate?n._delegate:n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function wa(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var mt=class{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var zn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Xu=class{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let r=new Nr;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{let s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){let t=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(t_(e))try{this.getOrInitializeService({instanceIdentifier:zn})}catch{}for(let[t,r]of this.instancesDeferred.entries()){let s=this.normalizeInstanceIdentifier(t);try{let i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=zn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=zn){return this.instances.has(e)}getOptions(e=zn){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(let[i,a]of this.instancesDeferred.entries()){let u=this.normalizeInstanceIdentifier(i);r===u&&a.resolve(s)}return s}onInit(e,t){let r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);let i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){let r=this.onInitCallbacks.get(t);if(r)for(let s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:e_(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=zn){return this.component?this.component.multipleInstances?e:zn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function e_(n){return n===zn?void 0:n}function t_(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ia=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new Xu(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var n_=[],re;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(re||(re={}));var r_={debug:re.DEBUG,verbose:re.VERBOSE,info:re.INFO,warn:re.WARN,error:re.ERROR,silent:re.SILENT},s_=re.INFO,i_={[re.DEBUG]:"log",[re.VERBOSE]:"log",[re.INFO]:"info",[re.WARN]:"warn",[re.ERROR]:"error"},a_=(n,e,...t)=>{if(e<n.logLevel)return;let r=new Date().toISOString(),s=i_[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},En=class{constructor(e){this.name=e,this._logLevel=s_,this._logHandler=a_,this._userLogHandler=null,n_.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in re))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?r_[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,re.DEBUG,...e),this._logHandler(this,re.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,re.VERBOSE,...e),this._logHandler(this,re.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,re.INFO,...e),this._logHandler(this,re.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,re.WARN,...e),this._logHandler(this,re.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,re.ERROR,...e),this._logHandler(this,re.ERROR,...e)}};var o_=(n,e)=>e.some(t=>n instanceof t),xf,kf;function u_(){return xf||(xf=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function c_(){return kf||(kf=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var Vf=new WeakMap,ec=new WeakMap,Mf=new WeakMap,Zu=new WeakMap,nc=new WeakMap;function l_(n){let e=new Promise((t,r)=>{let s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t(Ft(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Vf.set(t,n)}).catch(()=>{}),nc.set(e,n),e}function B_(n){if(ec.has(n))return;let e=new Promise((t,r)=>{let s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});ec.set(n,e)}var tc={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return ec.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Mf.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Ft(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Gf(n){tc=n(tc)}function h_(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){let r=n.call(Ta(this),e,...t);return Mf.set(r,e.sort?e.sort():[e]),Ft(r)}:c_().includes(n)?function(...e){return n.apply(Ta(this),e),Ft(Vf.get(this))}:function(...e){return Ft(n.apply(Ta(this),e))}}function d_(n){return typeof n=="function"?h_(n):(n instanceof IDBTransaction&&B_(n),o_(n,u_())?new Proxy(n,tc):n)}function Ft(n){if(n instanceof IDBRequest)return l_(n);if(Zu.has(n))return Zu.get(n);let e=d_(n);return e!==n&&(Zu.set(n,e),nc.set(e,n)),e}var Ta=n=>nc.get(n);function Hf(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){let a=indexedDB.open(n,e),u=Ft(a);return r&&a.addEventListener("upgradeneeded",c=>{r(Ft(a.result),c.oldVersion,c.newVersion,Ft(a.transaction),c)}),t&&a.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),u.then(c=>{i&&c.addEventListener("close",()=>i()),s&&c.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),u}var f_=["get","getKey","getAll","getAllKeys","count"],p_=["put","add","delete","clear"],rc=new Map;function Uf(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(rc.get(e))return rc.get(e);let t=e.replace(/FromIndex$/,""),r=e!==t,s=p_.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||f_.includes(t)))return;let i=async function(a,...u){let c=this.transaction(a,s?"readwrite":"readonly"),l=c.store;return r&&(l=l.index(u.shift())),(await Promise.all([l[t](...u),s&&c.done]))[0]};return rc.set(e,i),i}Gf(n=>({...n,get:(e,t,r)=>Uf(e,t)||n.get(e,t,r),has:(e,t)=>!!Uf(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ic=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(C_(t)){let r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}};function C_(n){return n.getComponent()?.type==="VERSION"}var ac="@firebase/app",qf="0.16.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Jt=new En("@firebase/app"),g_="@firebase/app-compat",m_="@firebase/analytics-compat",E_="@firebase/analytics",__="@firebase/app-check-compat",D_="@firebase/app-check",y_="@firebase/auth",w_="@firebase/auth-compat",I_="@firebase/database",T_="@firebase/data-connect",A_="@firebase/database-compat",v_="@firebase/functions",b_="@firebase/functions-compat",S_="@firebase/installations",R_="@firebase/installations-compat",P_="@firebase/messaging",N_="@firebase/messaging-compat",O_="@firebase/performance",F_="@firebase/performance-compat",L_="@firebase/remote-config",x_="@firebase/remote-config-compat",k_="@firebase/storage",V_="@firebase/storage-compat",M_="@firebase/firestore",G_="@firebase/ai",U_="@firebase/firestore-compat",H_="firebase",q_="12.19.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var oc="[DEFAULT]",j_={[ac]:"fire-core",[g_]:"fire-core-compat",[E_]:"fire-analytics",[m_]:"fire-analytics-compat",[D_]:"fire-app-check",[__]:"fire-app-check-compat",[y_]:"fire-auth",[w_]:"fire-auth-compat",[I_]:"fire-rtdb",[T_]:"fire-data-connect",[A_]:"fire-rtdb-compat",[v_]:"fire-fn",[b_]:"fire-fn-compat",[S_]:"fire-iid",[R_]:"fire-iid-compat",[P_]:"fire-fcm",[N_]:"fire-fcm-compat",[O_]:"fire-perf",[F_]:"fire-perf-compat",[L_]:"fire-rc",[x_]:"fire-rc-compat",[k_]:"fire-gcs",[V_]:"fire-gcs-compat",[M_]:"fire-fst",[U_]:"fire-fst-compat",[G_]:"fire-vertex","fire-js":"fire-js",[H_]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var qs=new Map,K_=new Map,uc=new Map;function jf(n,e){try{n.container.addComponent(e)}catch(t){Jt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function _n(n){let e=n.name;if(uc.has(e))return Jt.debug(`There were multiple attempts to register component ${e}.`),!1;uc.set(e,n);for(let t of qs.values())jf(t,n);for(let t of K_.values())jf(t,n);return!0}function Ks(n,e){let t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function nt(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var J_={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different {$mismatchedParam}. Existing: '{$oldValue}'. New: '{$newValue}'.","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Kt=new jt("app","Firebase",J_);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var cc=class{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new mt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Kt.create("app-deleted",{appName:this._name})}};/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Dn=q_;function Wf(n,e={}){let t=n;typeof e!="object"&&(e={name:e});let r={name:oc,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw Kt.create("bad-app-name",{appName:String(s)});if(t||(t=Qu()),!t)throw Kt.create("no-options");let i=qs.get(s);if(i)if(It(t,i.options)){if(It(r,i.config))return i;throw Kt.create("duplicate-app",{appName:s,mismatchedParam:"config",oldValue:JSON.stringify(i.config),newValue:JSON.stringify(r)})}else throw Kt.create("duplicate-app",{appName:s,mismatchedParam:"options",oldValue:JSON.stringify(i.options),newValue:JSON.stringify(t)});let a=new Ia(s);for(let c of uc.values())a.addComponent(c);let u=new cc(t,r,a);return qs.set(s,u),u}function Aa(n=oc){let e=qs.get(n);if(!e&&n===oc&&Qu())return Wf();if(!e)throw Kt.create("no-app",{appName:n});return e}function z_(){return Array.from(qs.values())}function Tt(n,e,t){let r=j_[n]??n;t&&(r+=`-${t}`);let s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){let a=[`Unable to register library "${r}" with version "${e}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&a.push("and"),i&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Jt.warn(a.join(" "));return}_n(new mt(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var W_="firebase-heartbeat-database",Q_=1,js="firebase-heartbeat-store",sc=null;function Qf(){return sc||(sc=Hf(W_,Q_,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(js)}catch(t){console.warn(t)}}}}).catch(n=>{throw Kt.create("idb-open",{originalErrorMessage:n.message})})),sc}async function $_(n){try{let t=(await Qf()).transaction(js),r=await t.objectStore(js).get($f(n));return await t.done,r}catch(e){if(e instanceof lt)Jt.warn(e.message);else{let t=Kt.create("idb-get",{originalErrorMessage:e?.message});Jt.warn(t.message)}}}async function Kf(n,e){try{let r=(await Qf()).transaction(js,"readwrite");await r.objectStore(js).put(e,$f(n)),await r.done}catch(t){if(t instanceof lt)Jt.warn(t.message);else{let r=Kt.create("idb-set",{originalErrorMessage:t?.message});Jt.warn(r.message)}}}function $f(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Y_=1024,X_=30,lc=class{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new Bc(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{let t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Jf();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:t}),this._heartbeatsCache.heartbeats.length>X_){let s=eD(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Jt.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";let e=Jf(),{heartbeatsToSend:t,unsentEntries:r}=Z_(this._heartbeatsCache.heartbeats),s=Hs(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return Jt.warn(e),""}}};function Jf(){return new Date().toISOString().substring(0,10)}function Z_(n,e=Y_){let t=[],r=n.slice();for(let s of n){let i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),zf(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),zf(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}var Bc=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Yu()?Of().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let t=await $_(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){let r=await this.read();return Kf(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){let r=await this.read();return Kf(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}};function zf(n){return Hs(JSON.stringify({version:2,heartbeats:n})).length}function eD(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tD(n){_n(new mt("platform-logger",e=>new ic(e),"PRIVATE")),_n(new mt("heartbeat",e=>new lc(e),"PRIVATE")),Tt(ac,qf,n),Tt(ac,qf,"esm2020"),Tt("fire-js","")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */tD("");var nD="firebase",rD="12.19.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Tt(nD,rD,"app");/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cp(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}var gp=Cp,mp=new jt("auth","Firebase",Cp());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Fa=new En("@firebase/auth");function ba(n,...e){Fa.logLevel<=re.WARN&&Fa.warn(`Auth (${Dn}): ${n}`,...e)}function Sa(n,...e){Fa.logLevel<=re.ERROR&&Fa.error(`Auth (${Dn}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Et(n,...e){throw Fc(n,...e)}function At(n,...e){return Fc(n,...e)}function no(n,e,t){let r={...gp(),[e]:t};return new jt("auth","Firebase",r).create(e,{appName:n.name})}function In(n){return no(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Ep(n,e,t){let r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&Et(n,"argument-error"),no(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Fc(n,...e){if(typeof n!="string"){let t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return mp.create(n,...e)}function $(n,e,...t){if(!n)throw Fc(e,...t)}function Lt(n){let e="INTERNAL ASSERTION FAILED: "+n;throw Sa(e),new Error(e)}function Wt(n,e){n||Lt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gc(){return typeof self<"u"&&self.location?.href||""}function sD(){return Yf()==="http:"||Yf()==="https:"}function Yf(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iD(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(sD()||Sf()||"connection"in navigator)?navigator.onLine:!0}function aD(){if(typeof navigator>"u")return null;let n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Wn=class{constructor(e,t){this.shortDelay=e,this.longDelay=t,Wt(t>e,"Short delay should be less than long delay!"),this.isMobile=vf()||Rf()}get(){return iD()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lc(n,e){Wt(n.emulator,"Emulator should always be set here");let{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var La=class{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Lt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Lt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Lt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var oD={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var uD=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],cD=new Wn(3e4,6e4);function xe(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function Je(n,e,t,r,s={}){return _p(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});let u=Or({...a,key:n.config.apiKey}).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);let l={method:e,headers:c,...i};return bf()||(l.referrerPolicy="strict-origin-when-cross-origin"),n.emulatorConfig&&Jn(n.emulatorConfig.host)&&(l.credentials="include"),La.fetch()(await Dp(n,n.config.apiHost,t,u),l)})}async function _p(n,e,t){n._canInitEmulator=!1;let r={...oD,...e};try{let s=new mc(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();let a=await i.json();if("needConfirmation"in a)throw zs(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{let u=i.ok?a.errorMessage:a.error.message,[c,l]=u.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw zs(n,"credential-already-in-use",a);if(c==="EMAIL_EXISTS")throw zs(n,"email-already-in-use",a);if(c==="USER_DISABLED")throw zs(n,"user-disabled",a);let d=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw no(n,d,l);Et(n,d)}}catch(s){if(s instanceof lt)throw s;Et(n,"network-request-failed",{message:String(s)})}}async function Tn(n,e,t,r,s={}){let i=await Je(n,e,t,r,s);return"mfaPendingCredential"in i&&Et(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function Dp(n,e,t,r){let s=`${e}${t}?${r}`,i=n,a=i.config.emulator?Lc(n.config,s):`${n.config.apiScheme}://${s}`;return uD.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}function lD(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}var mc=class{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(At(this.auth,"network-request-failed")),cD.get())})}};function zs(n,e,t){let r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);let s=At(n,e,r);return s.customData._tokenResponse=t,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xf(n){return n!==void 0&&n.enterprise!==void 0}var xa=class{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(let t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return lD(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yp(n,e){return Je(n,"GET","/v2/recaptchaConfig",xe(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function BD(n,e){return Je(n,"POST","/v1/accounts:delete",e)}async function ka(n,e){return Je(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ws(n){if(n)try{let e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wp(n,e=!1){let t=Le(n),r=await t.getIdToken(e),s=xc(r);$(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");let i=typeof s.firebase=="object"?s.firebase:void 0,a=i?.sign_in_provider;return{claims:s,token:r,authTime:Ws(hc(s.auth_time)),issuedAtTime:Ws(hc(s.iat)),expirationTime:Ws(hc(s.exp)),signInProvider:a||null,signInSecondFactor:i?.sign_in_second_factor||null}}function hc(n){return Number(n)*1e3}function xc(n){let[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Sa("JWT malformed, contained fewer than 3 sections"),null;try{let s=Da(t);return s?JSON.parse(s):(Sa("Failed to decode base64 JWT payload"),null)}catch(s){return Sa("Caught error parsing JWT payload as JSON",s?.toString()),null}}function Zf(n){let e=xc(n);return $(e,"internal-error"),$(typeof e.exp<"u","internal-error"),$(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zs(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof lt&&hD(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function hD({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ec=class{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){let t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;let r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ei=class{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ws(this.lastLoginAt),this.creationTime=Ws(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Va(n){let e=n.auth,t=await n.getIdToken(),r=await Zs(n,ka(e,{idToken:t}));$(r?.users.length,e,"internal-error");let s=r.users[0];n._notifyReloadListener(s);let i=s.providerUserInfo?.length?Tp(s.providerUserInfo):[],a=dD(n.providerData,i),u=n.isAnonymous,c=!(n.email&&s.passwordHash)&&!a?.length,l=u?c:!1,d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new ei(s.createdAt,s.lastLoginAt),isAnonymous:l};Object.assign(n,d)}async function Ip(n){let e=Le(n);await Va(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function dD(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Tp(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fD(n,e){let t=await _p(n,{},async()=>{let r=Or({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=await Dp(n,s,"/v1/token",`key=${i}`),u=await n._getAdditionalHeaders();u["Content-Type"]="application/x-www-form-urlencoded";let c={method:"POST",headers:u,body:r};return n.emulatorConfig&&Jn(n.emulatorConfig.host)&&(c.credentials="include"),La.fetch()(a,c)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function pD(n,e){return Je(n,"POST","/v2/accounts:revokeToken",xe(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Qs=class n{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){$(e.idToken,"internal-error"),$(typeof e.idToken<"u","internal-error"),$(typeof e.refreshToken<"u","internal-error");let t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Zf(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){$(e.length!==0,"internal-error");let t=Zf(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:($(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:r,refreshToken:s,expiresIn:i}=await fD(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){let{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new n;return r&&($(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&($(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&($(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new n,this.toJSON())}_performRefresh(){return Lt("not implemented")}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yn(n,e){$(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}var wn=class n{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new Ec(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new ei(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){let t=await Zs(this,this.stsTokenManager.getToken(this.auth,e));return $(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return wp(this,e)}reload(){return Ip(this)}_assign(e){this!==e&&($(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){let t=new n({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){$(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Va(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(nt(this.auth.app))return Promise.reject(In(this.auth));let e=await this.getIdToken();return await Zs(this,BD(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){let r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,a=t.photoURL??void 0,u=t.tenantId??void 0,c=t._redirectEventId??void 0,l=t.createdAt??void 0,d=t.lastLoginAt??void 0,{uid:f,emailVerified:m,isAnonymous:v,providerData:R,stsTokenManager:V}=t;$(f&&V,e,"internal-error");let H=Qs.fromJSON(this.name,V);$(typeof f=="string",e,"internal-error"),yn(r,e.name),yn(s,e.name),$(typeof m=="boolean",e,"internal-error"),$(typeof v=="boolean",e,"internal-error"),yn(i,e.name),yn(a,e.name),yn(u,e.name),yn(c,e.name),yn(l,e.name),yn(d,e.name);let z=new n({uid:f,auth:e,email:s,emailVerified:m,displayName:r,isAnonymous:v,photoURL:a,phoneNumber:i,tenantId:u,stsTokenManager:H,createdAt:l,lastLoginAt:d});return R&&Array.isArray(R)&&(z.providerData=R.map(Be=>({...Be}))),c&&(z._redirectEventId=c),z}static async _fromIdTokenResponse(e,t,r=!1){let s=new Qs;s.updateFromServerResponse(t);let i=new n({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Va(i),i}static async _fromGetAccountInfoResponse(e,t,r){let s=t.users[0];$(s.localId!==void 0,"internal-error");let i=s.providerUserInfo!==void 0?Tp(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!i?.length,u=new Qs;u.updateFromIdToken(r);let c=new n({uid:s.localId,auth:e,stsTokenManager:u,isAnonymous:a}),l={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new ei(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(c,l),c}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ep=new Map;function zt(n){Wt(n instanceof Function,"Expected a class definition");let e=ep.get(n);return e?(Wt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,ep.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ma=class{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}};Ma.type="NONE";var _c=Ma;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ra(n,e,t){return`firebase:${n}:${e}:${t}`}var $s=class n{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;let{config:s,name:i}=this.auth;this.fullUserKey=Ra(this.userKey,s.apiKey,i),this.fullPersistenceKey=Ra("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t);try{this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}catch{}}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){let t=await ka(this.auth,{idToken:e}).catch(()=>{});return t?wn._fromGetAccountInfoResponse(this.auth,t,e):null}return wn._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){try{this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}catch{}}static async create(e,t,r="authUser"){if(!t.length)return new n(zt(_c),e,r);let s=(await Promise.all(t.map(async l=>{try{if(await l._isAvailable())return l}catch{return}}))).filter(l=>l),i=s[0]||zt(_c),a=Ra(r,e.config.apiKey,e.name),u=null;for(let l of t)try{let d=await l._get(a);if(d){let f;if(typeof d=="string"){let m=await ka(e,{idToken:d}).catch(()=>{});if(!m)break;f=await wn._fromGetAccountInfoResponse(e,m,d)}else f=wn._fromJSON(e,d);l!==i&&(u=f),i=l;break}}catch{}let c=s.filter(l=>l._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new n(i,e,r):(i=c[0],u&&await i._set(a,u.toJSON()),await Promise.all(t.map(async l=>{if(l!==i)try{await l._remove(a)}catch{}})),new n(i,e,r))}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tp(n){let e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Sp(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Ap(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Pp(e))return"Blackberry";if(Np(e))return"Webos";if(vp(e))return"Safari";if((e.includes("chrome/")||bp(e))&&!e.includes("edge/"))return"Chrome";if(Rp(e))return"Android";{let t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function Ap(n=Ge()){return/firefox\//i.test(n)}function vp(n=Ge()){let e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function bp(n=Ge()){return/crios\//i.test(n)}function Sp(n=Ge()){return/iemobile/i.test(n)}function Rp(n=Ge()){return/android/i.test(n)}function Pp(n=Ge()){return/blackberry/i.test(n)}function Np(n=Ge()){return/webos/i.test(n)}function kc(n=Ge()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function CD(n=Ge()){return kc(n)&&!!window.navigator?.standalone}function gD(){return Pf()&&document.documentMode===10}function Op(n=Ge()){return kc(n)||Rp(n)||Np(n)||Pp(n)||/windows phone/i.test(n)||Sp(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fp(n,e=[]){let t;switch(n){case"Browser":t=tp(Ge());break;case"Worker":t=`${tp(Ge())}-${n}`;break;default:t=n}let r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Dn}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Dc=class{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let r=i=>new Promise((a,u)=>{try{let c=e(i);a(c)}catch(c){u(c)}});r.onAbort=t,this.queue.push(r);let s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(let s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}};/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mD(n,e={}){return Je(n,"GET","/v2/passwordPolicy",xe(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ED=6,yc=class{constructor(e){let t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??ED,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){let t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){let r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var wc=class{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Ga(this),this.idTokenSubscription=new Ga(this),this.beforeStateQueue=new Dc(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=mp,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=zt(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted){try{this.persistenceManager=await $s.create(this,e)}catch(r){ba(`Failed to initialize persistence: ${r}`),this.persistenceManager=await $s.create(this,[])}finally{this._resolvePersistenceManagerAvailable?.()}if(!this._deleted){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}try{await this.initializeCurrentUser(t)}catch(r){ba(`Failed to initialize current user: ${r}`),await this.directlySetCurrentUser(null).catch(()=>{})}this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{let t=await ka(this,{idToken:e}),r=await wn._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(nt(this.app)){let i=this.app.settings.authIdToken;return i?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(a,a))}):this.directlySetCurrentUser(null)}let t=await this.assertedPersistence.getCurrentUser(),r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let i=this.redirectUser?._redirectEventId,a=r?._redirectEventId,u=await this.tryRedirectSignIn(e);(!i||i===a)&&u?.user&&(r=u.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(i){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return $(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Va(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=aD()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(nt(this.app))return Promise.reject(In(this));let t=e?Le(e):null;return t&&$(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&$(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return nt(this.app)?Promise.reject(In(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return nt(this.app)?Promise.reject(In(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(zt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=await mD(this),t=new yc(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new jt("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){let t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await pD(this,r)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){let r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&zt(e)||this._popupRedirectResolver;$(t,this,"argument-error"),this.redirectPersistenceManager=await $s.create(this,[zt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};let i=typeof t=="function"?t:t.next.bind(t),a=!1,u=this._isInitialized?Promise.resolve():this._initializationPromise;if($(u,this,"internal-error"),u.then(()=>{a||i(this.currentUser)}).catch(c=>{if(!a)if(typeof t!="function"&&t.error)t.error(c);else if(r)r(c);else throw c}),typeof t=="function"){let c=e.addObserver(t,r,s);return()=>{a=!0,c()}}else{let c=e.addObserver(t);return()=>{a=!0,c()}}}async directlySetCurrentUser(e){if(this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,this.persistenceManager)try{e?await this.persistenceManager.setCurrentUser(e):await this.persistenceManager.removeCurrentUser()}catch(t){let r=t?.message||String(t),s=no(this,"internal-error",`An internal AuthError has occurred: ${r}`);throw s.customData={originalError:t},s}}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return $(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Fp(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){let e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);let t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);let r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){if(nt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;let e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&ba(`Error while retrieving App Check token: ${e.error}`),e?.token}};function An(n){return Le(n)}var Ga=class{constructor(e){this.auth=e,this.observer=null,this.addObserver=Lf(t=>this.observer=t)}get next(){return $(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ro={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function _D(n){ro=n}function Lp(n){return ro.loadJS(n)}function DD(){return ro.recaptchaEnterpriseScript}function yD(){return ro.gapiScript}function xp(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ic=class{constructor(){this.enterprise=new Tc}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}},Tc=class{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var wD="recaptcha-enterprise",Ys="NO_RECAPTCHA",np="onFirebaseAuthREInstanceReady",ti=class n{constructor(e){this.type=wD,this.auth=An(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(a,u)=>{yp(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)u(new Error("recaptcha Enterprise site key undefined"));else{let l=new xa(c);return i.tenantId==null?i._agentRecaptchaConfig=l:i._tenantRecaptchaConfigs[i.tenantId]=l,a(l.siteKey)}}).catch(c=>{u(c)})})}function s(i,a,u){let c=window.grecaptcha;Xf(c)?c.enterprise.ready(()=>{c.enterprise.execute(i,{action:e}).then(l=>{a(l)}).catch(()=>{a(Ys)})}):u(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new Ic().execute("siteKey",{action:"verify"}):new Promise((i,a)=>{r(this.auth).then(async u=>{if(!t&&Xf(window.grecaptcha)&&n.scriptInjectionDeferred)await n.scriptInjectionDeferred.promise,s(u,i,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let c=DD();c.length!==0&&(c+=u+`&onload=${np}`),n.scriptInjectionDeferred=new Nr,window[np]=()=>{n.scriptInjectionDeferred?.resolve()},Lp(c).then(()=>n.scriptInjectionDeferred?.promise).then(()=>{s(u,i,a)}).catch(l=>{a(l)})}}).catch(u=>{a(u)})})}};ti.scriptInjectionDeferred=null;async function Js(n,e,t,r=!1,s=!1){let i=new ti(n),a;if(s)a=Ys;else try{a=await i.verify(t)}catch{a=await i.verify(t,!0)}let u={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in u){let c=u.phoneEnrollmentInfo.phoneNumber,l=u.phoneEnrollmentInfo.recaptchaToken;Object.assign(u,{phoneEnrollmentInfo:{phoneNumber:c,recaptchaToken:l,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in u){let c=u.phoneSignInInfo.recaptchaToken;Object.assign(u,{phoneSignInInfo:{recaptchaToken:c,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return u}return r?Object.assign(u,{captchaResp:a}):Object.assign(u,{captchaResponse:a}),Object.assign(u,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(u,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),u}async function Xs(n,e,t,r,s){if(s==="EMAIL_PASSWORD_PROVIDER")if(n._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){let i=await Js(n,e,t,t==="getOobCode");return r(n,i)}else return r(n,e).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);let a=await Js(n,e,t,t==="getOobCode");return r(n,a)}else return Promise.reject(i)});else if(s==="PHONE_PROVIDER")if(n._getRecaptchaConfig()?.isProviderEnabled("PHONE_PROVIDER")){let i=await Js(n,e,t);return r(n,i).catch(async a=>{if(n._getRecaptchaConfig()?.getProviderEnforcementState("PHONE_PROVIDER")==="AUDIT"&&(a.code==="auth/missing-recaptcha-token"||a.code==="auth/invalid-app-credential")){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${t} flow.`);let u=await Js(n,e,t,!1,!0);return r(n,u)}return Promise.reject(a)})}else{let i=await Js(n,e,t,!1,!0);return r(n,i)}else return Promise.reject(s+" provider is not supported.")}async function ID(n){let e=An(n),t=await yp(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),r=new xa(t);e.tenantId==null?e._agentRecaptchaConfig=r:e._tenantRecaptchaConfigs[e.tenantId]=r,r.isAnyProviderEnabled()&&new ti(e).verify()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kp(n,e){let t=Ks(n,"auth");if(t.isInitialized()){let s=t.getImmediate(),i=t.getOptions();if(It(i,e??{}))return s;Et(s,"already-initialized")}return t.initialize({options:e})}function TD(n,e){let t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(zt);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function Vp(n,e,t){let r=An(n);$(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");let s=!!t?.disableWarnings,i=Mp(e),{host:a,port:u}=AD(e),c=u===null?"":`:${u}`,l={url:`${i}//${a}${c}/`},d=Object.freeze({host:a,port:u,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){$(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),$(It(l,r.config.emulator)&&It(d,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=l,r.emulatorConfig=d,r.settings.appVerificationDisabledForTesting=!0,Jn(a)?wa(`${i}//${a}${c}`):s||vD()}function Mp(n){let e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function AD(n){let e=Mp(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};let r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){let i=s[1];return{host:i,port:rp(r.substr(i.length+1))}}else{let[i,a]=r.split(":");return{host:i,port:rp(a)}}}function rp(n){if(!n)return null;let e=Number(n);return isNaN(e)?null:e}function vD(){function n(){let e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Qn=class{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Lt("not implemented")}_getIdTokenResponse(e){return Lt("not implemented")}_linkToIdToken(e,t){return Lt("not implemented")}_getReauthenticationResolver(e){return Lt("not implemented")}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bD(n,e){return Je(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function SD(n,e){return Tn(n,"POST","/v1/accounts:signInWithPassword",xe(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function RD(n,e){return Tn(n,"POST","/v1/accounts:signInWithEmailLink",xe(n,e))}async function PD(n,e){return Tn(n,"POST","/v1/accounts:signInWithEmailLink",xe(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ni=class n extends Qn{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new n(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new n(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":let t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Xs(e,t,"signInWithPassword",SD,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return RD(e,{email:this._email,oobCode:this._password});default:Et(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":let r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Xs(e,r,"signUpPassword",bD,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return PD(e,{idToken:t,email:this._email,oobCode:this._password});default:Et(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xr(n,e){return Tn(n,"POST","/v1/accounts:signInWithIdp",xe(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ND="http://localhost",$n=class n extends Qn{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){let t=new n(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Et("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;let a=new n(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){let t=this.buildRequest();return xr(e,t)}_linkToIdToken(e,t){let r=this.buildRequest();return r.idToken=t,xr(e,r)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,xr(e,t)}buildRequest(){let e={requestUri:ND,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Or(t)}return e}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sp(n,e){return Je(n,"POST","/v1/accounts:sendVerificationCode",xe(n,e))}async function OD(n,e){return Tn(n,"POST","/v1/accounts:signInWithPhoneNumber",xe(n,e))}async function FD(n,e){let t=await Tn(n,"POST","/v1/accounts:signInWithPhoneNumber",xe(n,e));if(t.temporaryProof)throw zs(n,"account-exists-with-different-credential",t);return t}var LD={USER_NOT_FOUND:"user-not-found"};async function xD(n,e){let t={...e,operation:"REAUTH"};return Tn(n,"POST","/v1/accounts:signInWithPhoneNumber",xe(n,t),LD)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ri=class n extends Qn{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new n({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new n({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return OD(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return FD(e,{idToken:t,...this._makeVerificationRequest()})}_getReauthenticationResolver(e){return xD(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:s}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:s}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));let{verificationId:t,verificationCode:r,phoneNumber:s,temporaryProof:i}=e;return!r&&!t&&!s&&!i?null:new n({verificationId:t,verificationCode:r,phoneNumber:s,temporaryProof:i})}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kD(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function VD(n){let e=Fr(Lr(n)).link,t=e?Fr(Lr(e)).deep_link_id:null,r=Fr(Lr(n)).deep_link_id;return(r?Fr(Lr(r)).link:null)||r||t||e||n}var Ua=class n{constructor(e){let t=Fr(Lr(e)),r=t.apiKey??null,s=t.oobCode??null,i=kD(t.mode??null);$(r&&s&&i,"argument-error"),this.apiKey=r,this.operation=i,this.code=s,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){let t=VD(e);try{return new n(t)}catch{return null}}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var kr=class n{constructor(){this.providerId=n.PROVIDER_ID}static credential(e,t){return ni._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let r=Ua.parseLink(t);return $(r,"argument-error"),ni._fromEmailAndCode(e,r.code,r.tenantId)}};kr.PROVIDER_ID="password";kr.EMAIL_PASSWORD_SIGN_IN_METHOD="password";kr.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Vr=class{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Yn=class extends Vr{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var si=class n extends Yn{constructor(){super("facebook.com")}static credential(e){return $n._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};si.FACEBOOK_SIGN_IN_METHOD="facebook.com";si.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Mr=class n extends Yn{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return $n._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return n.credential(t,r)}catch{return null}}};Mr.GOOGLE_SIGN_IN_METHOD="google.com";Mr.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ii=class n extends Yn{constructor(){super("github.com")}static credential(e){return $n._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};ii.GITHUB_SIGN_IN_METHOD="github.com";ii.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ai=class n extends Yn{constructor(){super("twitter.com")}static credential(e,t){return $n._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return n.credential(t,r)}catch{return null}}};ai.TWITTER_SIGN_IN_METHOD="twitter.com";ai.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function MD(n,e){return Tn(n,"POST","/v1/accounts:signUp",xe(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Xn=class n{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){let i=await wn._fromIdTokenResponse(e,r,s),a=ip(r);return new n({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);let s=ip(r);return new n({user:e,providerId:s,_tokenResponse:r,operationType:t})}};function ip(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gp(n){if(nt(n.app))return Promise.reject(In(n));let e=An(n);if(await e._initializationPromise,e.currentUser?.isAnonymous)return new Xn({user:e.currentUser,providerId:null,operationType:"signIn"});let t=await MD(e,{returnSecureToken:!0}),r=await Xn._fromIdTokenResponse(e,"signIn",t,!0);return await e._updateCurrentUser(r.user),r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ac=class n extends lt{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,n.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new n(e,t,r,s)}};function Up(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Ac._fromErrorAndOperation(n,i,e,r):i})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function GD(n,e,t=!1){let r=await Zs(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Xn._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function UD(n,e,t=!1){let{auth:r}=n;if(nt(r.app))return Promise.reject(In(r));let s="reauthenticate";try{let i=await Zs(n,Up(r,s,e,n),t);$(i.idToken,r,"internal-error");let a=xc(i.idToken);$(a,r,"internal-error");let{sub:u}=a;return $(n.uid===u,r,"user-mismatch"),Xn._forOperation(n,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&Et(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function HD(n,e,t=!1){if(nt(n.app))return Promise.reject(In(n));let r="signIn",s=await Up(n,r,e),i=await Xn._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hp(n,e,t,r){return Le(n).onIdTokenChanged(e,t,r)}function qp(n,e,t){return Le(n).beforeAuthStateChanged(e,t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ap(n,e){return Je(n,"POST","/v2/accounts/mfaEnrollment:start",xe(n,e))}function qD(n,e){return Je(n,"POST","/v2/accounts/mfaEnrollment:finalize",xe(n,e))}function jD(n,e){return Je(n,"POST","/v2/accounts/mfaEnrollment:start",xe(n,e))}function KD(n,e){return Je(n,"POST","/v2/accounts/mfaEnrollment:finalize",xe(n,e))}var Ha="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var qa=class{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Ha,"1"),this.storage.removeItem(Ha),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var JD=1e3,zD=10,ja=class extends qa{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Op(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,u,c)=>{this.notifyListeners(a,c)});return}let r=e.key;t?this.detachListener():this.stopPolling();let s=()=>{let a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);gD()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,zD):s()}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},JD)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}};ja.type="LOCAL";var jp=ja;/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var WD=1e3;function dc(n){let e=n.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),t=RegExp(`${e}=([^;]+)`);return document.cookie.match(t)?.[1]??null}function fc(n){return`${window.location.protocol==="http:"?"__dev_":"__HOST-"}FIREBASE_${n.split(":")[3]}`}var vc=class{constructor(){this.type="COOKIE",this.listenerUnsubscribes=new Map}_getFinalTarget(e){if(typeof window===void 0)return e;let t=new URL(`${window.location.origin}/__cookies__`);return t.searchParams.set("finalTarget",e),t}async _isAvailable(){return typeof isSecureContext=="boolean"&&!isSecureContext||typeof navigator>"u"||typeof document>"u"?!1:navigator.cookieEnabled??!0}async _set(e,t){}async _get(e){if(!this._isAvailable())return null;let t=fc(e);return window.cookieStore?(await window.cookieStore.get(t))?.value:dc(t)}async _remove(e){if(!this._isAvailable()||!await this._get(e))return;let r=fc(e);document.cookie=`${r}=;Max-Age=34560000;Partitioned;Secure;SameSite=Strict;Path=/;Priority=High`,await fetch("/__cookies__",{method:"DELETE"}).catch(()=>{})}_addListener(e,t){if(!this._isAvailable())return;let r=fc(e);if(window.cookieStore){let u=(l=>{let d=l.changed.find(m=>m.name===r);d&&t(d.value),l.deleted.find(m=>m.name===r)&&t(null)}),c=()=>window.cookieStore.removeEventListener("change",u);return this.listenerUnsubscribes.set(t,c),window.cookieStore.addEventListener("change",u)}let s=dc(r),i=setInterval(()=>{let u=dc(r);u!==s&&(t(u),s=u)},WD),a=()=>clearInterval(i);this.listenerUnsubscribes.set(t,a)}_removeListener(e,t){let r=this.listenerUnsubscribes.get(t);r&&(r(),this.listenerUnsubscribes.delete(t))}};vc.type="COOKIE";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ka=class extends qa{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}};Ka.type="SESSION";var Vc=Ka;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function QD(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ja=class n{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){let t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;let r=new n(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!a?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});let u=Array.from(a).map(async l=>l(t.origin,i)),c=await QD(u);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}};Ja.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mc(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var bc=class{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){let s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((u,c)=>{let l=Mc("",20);s.port1.start();let d=setTimeout(()=>{c(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(f){let m=f;if(m.data.eventId===l)switch(m.data.status){case"ack":clearTimeout(d),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),u(m.data.response);break;default:clearTimeout(d),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xt(){return window}function $D(n){xt().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kp(){return typeof xt().WorkerGlobalScope<"u"&&typeof xt().importScripts=="function"}async function YD(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function XD(){return navigator?.serviceWorker?.controller||null}function ZD(){return Kp()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Jp="firebaseLocalStorageDb",ey=1,za="firebaseLocalStorage",zp="fbase_key",Zn=class{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}};function so(n,e){return n.transaction([za],e?"readwrite":"readonly").objectStore(za)}function ty(){let n=indexedDB.deleteDatabase(Jp);return new Zn(n).toPromise()}function Wp(){let n=indexedDB.open(Jp,ey);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{let r=n.result;try{r.createObjectStore(za,{keyPath:zp})}catch(s){t(s)}}),n.addEventListener("success",async()=>{let r=n.result;r.objectStoreNames.contains(za)?e(r):(r.close(),await ty(),e(await Wp()))})})}async function op(n,e,t){let r=so(n,!0).put({[zp]:e,value:t});return new Zn(r).toPromise()}async function ny(n,e){let t=so(n,!1).get(e),r=await new Zn(t).toPromise();return r===void 0?null:r.value}function up(n,e){let t=so(n,!0).delete(e);return new Zn(t).toPromise()}var ry=800,sy=3,Wa=class{registerLifecycleListeners(){typeof window<"u"&&typeof window.addEventListener=="function"&&(window.addEventListener("pagehide",this.onPageHide),window.addEventListener("pageshow",this.onPageShow))}unregisterLifecycleListeners(){typeof window<"u"&&typeof window.removeEventListener=="function"&&(window.removeEventListener("pagehide",this.onPageHide),window.removeEventListener("pageshow",this.onPageShow))}constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.isClosing=!1,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this.onPageHide=()=>{this.isClosing=!0,this.stopPolling(),this.dbPromise&&(this.dbPromise.then(e=>e.close()).catch(()=>{}),this.dbPromise=null)},this.onPageShow=()=>{this.isClosing&&(this.isClosing=!1,Object.keys(this.listeners).length>0&&this.startPolling())},this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.dbPromise?this.dbPromise:(this.dbPromise=Wp(),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async _withRetries(e){let t=0;for(;;)try{let r=await this._openDb();return await e(r)}catch(r){if(t++>sy)throw r;if(this.dbPromise){let s=this.dbPromise;this.dbPromise=null;try{(await s).close()}catch{}}}}async initializeServiceWorkerMessaging(){return Kp()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ja._getInstance(ZD()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await YD(),!this.activeServiceWorker)return;this.sender=new bc(this.activeServiceWorker);let e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||XD()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return indexedDB?(await this._withRetries(async e=>{await op(e,Ha,"1"),await up(e,Ha)}),!0):!1}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>op(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(r=>ny(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>up(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){if(this.isClosing)return[];try{let e=await this._withRetries(s=>{let i=so(s,!1).getAll();return new Zn(i).toPromise()});if(this.isClosing)return[];if(!e)return[];if(this.pendingWrites!==0)return[];let t=[],r=new Set;if(e.length!==0)for(let{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(let s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}catch(e){return this.isClosing||ba(`Firebase Auth cross-tab polling failed with error: ${e}`),[]}}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),ry)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.startPolling(),this.registerLifecycleListeners()),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.stopPolling(),this.unregisterLifecycleListeners())}};Wa.type="LOCAL";var Qp=Wa;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cp(n,e){return Je(n,"POST","/v2/accounts/mfaSignIn:start",xe(n,e))}function iy(n,e){return Je(n,"POST","/v2/accounts/mfaSignIn:finalize",xe(n,e))}function ay(n,e){return Je(n,"POST","/v2/accounts/mfaSignIn:finalize",xe(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var fA=xp("rcb"),pA=new Wn(3e4,6e4);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Pa="recaptcha";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function oy(n,e,t){if(!n._getRecaptchaConfig())try{await ID(n)}catch{console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let r;if(typeof e=="string"?r={phoneNumber:e}:r=e,"session"in r){let s=r.session;if("phoneNumber"in r){$(s.type==="enroll",n,"internal-error");let i={idToken:s.credential,phoneEnrollmentInfo:{phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"}};return(await Xs(n,i,"mfaSmsEnrollment",async(l,d)=>{if(d.phoneEnrollmentInfo.captchaResponse===Ys){$(t?.type===Pa,l,"argument-error");let f=await pc(l,d,t);return ap(l,f)}return ap(l,d)},"PHONE_PROVIDER").catch(l=>Promise.reject(l))).phoneSessionInfo.sessionInfo}else{$(s.type==="signin",n,"internal-error");let i=r.multiFactorHint?.uid||r.multiFactorUid;$(i,n,"missing-multi-factor-info");let a={mfaPendingCredential:s.credential,mfaEnrollmentId:i,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}};return(await Xs(n,a,"mfaSmsSignIn",async(d,f)=>{if(f.phoneSignInInfo.captchaResponse===Ys){$(t?.type===Pa,d,"argument-error");let m=await pc(d,f,t);return cp(d,m)}return cp(d,f)},"PHONE_PROVIDER").catch(d=>Promise.reject(d))).phoneResponseInfo.sessionInfo}}else{let s={phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"};return(await Xs(n,s,"sendVerificationCode",async(c,l)=>{if(l.captchaResponse===Ys){$(t?.type===Pa,c,"argument-error");let d=await pc(c,l,t);return sp(c,d)}return sp(c,l)},"PHONE_PROVIDER").catch(c=>Promise.reject(c))).sessionInfo}}finally{t?._reset()}}async function pc(n,e,t){$(t.type===Pa,n,"argument-error");let r=await t.verify();$(typeof r=="string",n,"argument-error");let s={...e};if("phoneEnrollmentInfo"in s){let i=s.phoneEnrollmentInfo.phoneNumber,a=s.phoneEnrollmentInfo.captchaResponse,u=s.phoneEnrollmentInfo.clientType,c=s.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(s,{phoneEnrollmentInfo:{phoneNumber:i,recaptchaToken:r,captchaResponse:a,clientType:u,recaptchaVersion:c}}),s}else if("phoneSignInInfo"in s){let i=s.phoneSignInInfo.captchaResponse,a=s.phoneSignInInfo.clientType,u=s.phoneSignInInfo.recaptchaVersion;return Object.assign(s,{phoneSignInInfo:{recaptchaToken:r,captchaResponse:i,clientType:a,recaptchaVersion:u}}),s}else return Object.assign(s,{recaptchaToken:r}),s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var oi=class n{constructor(e){this.providerId=n.PROVIDER_ID,this.auth=An(e)}verifyPhoneNumber(e,t){return oy(this.auth,e,Le(t))}static credential(e,t){return ri._fromVerification(e,t)}static credentialFromResult(e){let t=e;return n.credentialFromTaggedObject(t)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:r}=e;return t&&r?ri._fromTokenResponse(t,r):null}};oi.PROVIDER_ID="phone";oi.PHONE_SIGN_IN_METHOD="phone";/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gc(n,e){return e?zt(e):($(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ui=class extends Qn{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return xr(e,this._buildIdpRequest())}_linkToIdToken(e,t){return xr(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return xr(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}};function uy(n){return HD(n.auth,new ui(n),n.bypassAuthState)}function cy(n){let{auth:e,user:t}=n;return $(t,e,"internal-error"),UD(t,new ui(n),n.bypassAuthState)}async function ly(n){let{auth:e,user:t}=n;return $(t,e,"internal-error"),GD(t,new ui(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Qa=class{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:u}=e;if(a){this.reject(a);return}let c={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(u)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return uy;case"linkViaPopup":case"linkViaRedirect":return ly;case"reauthViaPopup":case"reauthViaRedirect":return cy;default:Et(this.auth,"internal-error")}}resolve(e){Wt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Wt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var By=new Wn(2e3,1e4);async function $p(n,e,t){if(nt(n.app))return Promise.reject(At(n,"operation-not-supported-in-this-environment"));let r=An(n);Ep(n,e,Vr);let s=Gc(r,t);return new ci(r,"signInViaPopup",e,s).executeNotNull()}async function Yp(n,e,t){let r=Le(n);Ep(r.auth,e,Vr);let s=Gc(r.auth,t);return new ci(r.auth,"linkViaPopup",e,s,r).executeNotNull()}var ci=class n extends Qa{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,n.currentPopupAction&&n.currentPopupAction.cancel(),n.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return $(e,this.auth,"internal-error"),e}async onExecution(){Wt(this.filter.length===1,"Popup operations only handle one event");let e=Mc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(At(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(At(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,n.currentPopupAction=null}pollUserCancellation(){let e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(At(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,By.get())};e()}};ci.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var hy="pendingRedirect",Na=new Map,Sc=class extends Qa{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Na.get(this.auth._key());if(!e){try{let r=await dy(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Na.set(this.auth._key(),e)}return this.bypassAuthState||Na.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}};async function dy(n,e){let t=Cy(e),r=py(n);if(!await r._isAvailable())return!1;let s=await r._get(t)==="true";return await r._remove(t),s}function fy(n,e){Na.set(n._key(),e)}function py(n){return zt(n._redirectPersistence)}function Cy(n){return Ra(hy,n.config.apiKey,n.name)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gy(n,e,t=!1){if(nt(n.app))return Promise.reject(In(n));let r=An(n),s=Gc(r,e),a=await new Sc(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var my=600*1e3,Rc=class{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Ey(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!Xp(e)){let r=e.error.code?.split("auth/")[1]||"internal-error";t.onError(At(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=my&&this.cachedEventUids.clear(),this.cachedEventUids.has(lp(e))}saveEventToCache(e){this.cachedEventUids.add(lp(e)),this.lastProcessedEventTime=Date.now()}};function lp(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Xp({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function Ey(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Xp(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _y(n,e={}){return Je(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Dy=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,yy=/^https?/;async function wy(n){if(n.config.emulator)return;let{authorizedDomains:e}=await _y(n);for(let t of e)try{if(Iy(t))return}catch{}Et(n,"unauthorized-domain")}function Iy(n){let e=gc(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){let a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!yy.test(t))return!1;if(Dy.test(n))return r===n;let s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ty=new Wn(3e4,6e4);function Bp(){let n=xt().___jsl;if(n?.H){for(let e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Ay(n){return new Promise((e,t)=>{function r(){Bp(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Bp(),t(At(n,"network-request-failed"))},timeout:Ty.get()})}if(xt().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(xt().gapi?.load)r();else{let s=xp("iframefcb");return xt()[s]=()=>{gapi.load?r():t(At(n,"network-request-failed"))},Lp(`${yD()}?onload=${s}`).catch(i=>t(i))}}).catch(e=>{throw Oa=null,e})}var Oa=null;function vy(n){return Oa=Oa||Ay(n),Oa}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var by=new Wn(5e3,15e3),Sy="__/auth/iframe",Ry="emulator/auth/iframe",Py={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Ny=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Oy(n){let e=n.config;$(e.authDomain,n,"auth-domain-config-required");let t=e.emulator?Lc(e,Ry):`https://${n.config.authDomain}/${Sy}`,r={apiKey:e.apiKey,appName:n.name,v:Dn},s=Ny.get(n.config.apiHost);s&&(r.eid=s);let i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${Or(r).slice(1)}`}async function Fy(n){let e=await vy(n),t=xt().gapi;return $(t,n,"internal-error"),e.open({where:document.body,url:Oy(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Py,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});let a=At(n,"network-request-failed"),u=xt().setTimeout(()=>{i(a)},by.get());function c(){xt().clearTimeout(u),s(r)}r.ping(c).then(c,()=>{i(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ly={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},xy=500,ky=600,Vy="_blank",My="http://localhost",$a=class{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}};function Gy(n,e,t,r=xy,s=ky){let i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString(),u="",c={...Ly,width:r.toString(),height:s.toString(),top:i,left:a},l=Ge().toLowerCase();t&&(u=bp(l)?Vy:t),Ap(l)&&(e=e||My,c.scrollbars="yes");let d=Object.entries(c).reduce((m,[v,R])=>`${m}${v}=${R},`,"");if(CD(l)&&u!=="_self")return Uy(e||"",u),new $a(null);let f=window.open(e||"",u,d);$(f,n,"popup-blocked");try{f.focus()}catch{}return new $a(f)}function Uy(n,e){let t=document.createElement("a");t.href=n,t.target=e;let r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Hy="__/auth/handler",qy="emulator/auth/handler",jy=encodeURIComponent("fac");async function hp(n,e,t,r,s,i){$(n.config.authDomain,n,"auth-domain-config-required"),$(n.config.apiKey,n,"invalid-api-key");let a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Dn,eventId:s};if(e instanceof Vr){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",Ff(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(let[d,f]of Object.entries(i||{}))a[d]=f}if(e instanceof Yn){let d=e.getScopes().filter(f=>f!=="");d.length>0&&(a.scopes=d.join(","))}n.tenantId&&(a.tid=n.tenantId);let u=a;for(let d of Object.keys(u))u[d]===void 0&&delete u[d];let c=await n._getAppCheckToken(),l=c?`#${jy}=${encodeURIComponent(c)}`:"";return`${Ky(n)}?${Or(u).slice(1)}${l}`}function Ky({config:n}){return n.emulator?Lc(n,qy):`https://${n.authDomain}/${Hy}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Cc="webStorageSupport",Pc=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Vc,this._completeRedirectFn=gy,this._overrideRedirectResult=fy}async _openPopup(e,t,r,s){Wt(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");let i=await hp(e,t,r,gc(),s);return Gy(e,i,Mc())}async _openRedirect(e,t,r,s){await this._originValidation(e);let i=await hp(e,t,r,gc(),s);return $D(i),new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){let{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(Wt(i,"If manager is not set, promise should be"),i)}let r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){let t=await Fy(e),r=new Rc(e);return t.register("authEvent",s=>($(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Cc,{type:Cc},s=>{let i=s?.[0]?.[Cc];i!==void 0&&t(!!i),Et(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=wy(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Op()||vp()||kc()}},Zp=Pc,Ya=class{constructor(e){this.factorId=e}_process(e,t,r){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,r);case"signin":return this._finalizeSignIn(e,t.credential);default:return Lt("unexpected MultiFactorSessionType")}}},Nc=class n extends Ya{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new n(e)}_finalizeEnroll(e,t,r){return qD(e,{idToken:t,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return iy(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}},Xa=class{constructor(){}static assertion(e){return Nc._fromCredential(e)}};Xa.FACTOR_ID="phone";var Za=class{static assertionForEnrollment(e,t){return eo._fromSecret(e,t)}static assertionForSignIn(e,t){return eo._fromEnrollmentId(e,t)}static async generateSecret(e){let t=e;$(typeof t.user?.auth<"u","internal-error");let r=await jD(t.user.auth,{idToken:t.credential,totpEnrollmentInfo:{}});return to._fromStartTotpMfaEnrollmentResponse(r,t.user.auth)}};Za.FACTOR_ID="totp";var eo=class n extends Ya{constructor(e,t,r){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=r}static _fromSecret(e,t){return new n(t,void 0,e)}static _fromEnrollmentId(e,t){return new n(t,e)}async _finalizeEnroll(e,t,r){return $(typeof this.secret<"u",e,"argument-error"),KD(e,{idToken:t,displayName:r,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){$(this.enrollmentId!==void 0&&this.otp!==void 0,e,"argument-error");let r={verificationCode:this.otp};return ay(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:r})}},to=class n{constructor(e,t,r,s,i,a,u){this.sessionInfo=a,this.auth=u,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=r,this.codeIntervalSeconds=s,this.enrollmentCompletionDeadline=i}static _fromStartTotpMfaEnrollmentResponse(e,t){return new n(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){let r=!1;return(va(e)||va(t))&&(r=!0),r&&(va(e)&&(e=this.auth.currentUser?.email||"unknownuser"),va(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}};function va(n){return typeof n>"u"||n?.length===0}var dp="@firebase/auth",fp="1.13.6";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Oc=class{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){$(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jy(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function zy(n){_n(new mt("auth",(e,{options:t})=>{let r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:u}=r.options;$(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});let c={apiKey:a,authDomain:u,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Fp(n)},l=new wc(r,s,i,c);return TD(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),_n(new mt("auth-internal",e=>{let t=An(e.getProvider("auth").getImmediate());return(r=>new Oc(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Tt(dp,fp,Jy(n)),Tt(dp,fp,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Wy=300,Qy=$u("authIdTokenMaxAge")||Wy,pp=null,$y=n=>async e=>{let t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>Qy)return;let s=t?.token;pp!==s&&(pp=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function eC(n=Aa()){let e=Ks(n,"auth");if(e.isInitialized())return e.getImmediate();let t=kp(n,{popupRedirectResolver:Zp,persistence:[Qp,jp,Vc]}),r=$u("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){let i=new URL(r,location.origin);if(location.origin===i.origin){let a=$y(i.toString());qp(t,a,()=>a(t.currentUser)),Hp(t,u=>a(u))}}let s=Wu("auth");return s&&Vp(t,`http://${s}`),t}function Yy(){return document.getElementsByTagName("head")?.[0]??document}_D({loadJS(n){return new Promise((e,t)=>{let r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{let i=At("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",Yy().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});zy("Browser");var tC=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},nC={};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Qt,Uc;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(I,E){function D(){}D.prototype=E.prototype,I.F=E.prototype,I.prototype=new D,I.prototype.constructor=I,I.D=function(A,w,S){for(var _=Array(arguments.length-2),tt=2;tt<arguments.length;tt++)_[tt-2]=arguments[tt];return E.prototype[w].apply(A,_)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(I,E,D){D||(D=0);let A=Array(16);if(typeof E=="string")for(var w=0;w<16;++w)A[w]=E.charCodeAt(D++)|E.charCodeAt(D++)<<8|E.charCodeAt(D++)<<16|E.charCodeAt(D++)<<24;else for(w=0;w<16;++w)A[w]=E[D++]|E[D++]<<8|E[D++]<<16|E[D++]<<24;E=I.g[0],D=I.g[1],w=I.g[2];let S=I.g[3],_;_=E+(S^D&(w^S))+A[0]+3614090360&4294967295,E=D+(_<<7&4294967295|_>>>25),_=S+(w^E&(D^w))+A[1]+3905402710&4294967295,S=E+(_<<12&4294967295|_>>>20),_=w+(D^S&(E^D))+A[2]+606105819&4294967295,w=S+(_<<17&4294967295|_>>>15),_=D+(E^w&(S^E))+A[3]+3250441966&4294967295,D=w+(_<<22&4294967295|_>>>10),_=E+(S^D&(w^S))+A[4]+4118548399&4294967295,E=D+(_<<7&4294967295|_>>>25),_=S+(w^E&(D^w))+A[5]+1200080426&4294967295,S=E+(_<<12&4294967295|_>>>20),_=w+(D^S&(E^D))+A[6]+2821735955&4294967295,w=S+(_<<17&4294967295|_>>>15),_=D+(E^w&(S^E))+A[7]+4249261313&4294967295,D=w+(_<<22&4294967295|_>>>10),_=E+(S^D&(w^S))+A[8]+1770035416&4294967295,E=D+(_<<7&4294967295|_>>>25),_=S+(w^E&(D^w))+A[9]+2336552879&4294967295,S=E+(_<<12&4294967295|_>>>20),_=w+(D^S&(E^D))+A[10]+4294925233&4294967295,w=S+(_<<17&4294967295|_>>>15),_=D+(E^w&(S^E))+A[11]+2304563134&4294967295,D=w+(_<<22&4294967295|_>>>10),_=E+(S^D&(w^S))+A[12]+1804603682&4294967295,E=D+(_<<7&4294967295|_>>>25),_=S+(w^E&(D^w))+A[13]+4254626195&4294967295,S=E+(_<<12&4294967295|_>>>20),_=w+(D^S&(E^D))+A[14]+2792965006&4294967295,w=S+(_<<17&4294967295|_>>>15),_=D+(E^w&(S^E))+A[15]+1236535329&4294967295,D=w+(_<<22&4294967295|_>>>10),_=E+(w^S&(D^w))+A[1]+4129170786&4294967295,E=D+(_<<5&4294967295|_>>>27),_=S+(D^w&(E^D))+A[6]+3225465664&4294967295,S=E+(_<<9&4294967295|_>>>23),_=w+(E^D&(S^E))+A[11]+643717713&4294967295,w=S+(_<<14&4294967295|_>>>18),_=D+(S^E&(w^S))+A[0]+3921069994&4294967295,D=w+(_<<20&4294967295|_>>>12),_=E+(w^S&(D^w))+A[5]+3593408605&4294967295,E=D+(_<<5&4294967295|_>>>27),_=S+(D^w&(E^D))+A[10]+38016083&4294967295,S=E+(_<<9&4294967295|_>>>23),_=w+(E^D&(S^E))+A[15]+3634488961&4294967295,w=S+(_<<14&4294967295|_>>>18),_=D+(S^E&(w^S))+A[4]+3889429448&4294967295,D=w+(_<<20&4294967295|_>>>12),_=E+(w^S&(D^w))+A[9]+568446438&4294967295,E=D+(_<<5&4294967295|_>>>27),_=S+(D^w&(E^D))+A[14]+3275163606&4294967295,S=E+(_<<9&4294967295|_>>>23),_=w+(E^D&(S^E))+A[3]+4107603335&4294967295,w=S+(_<<14&4294967295|_>>>18),_=D+(S^E&(w^S))+A[8]+1163531501&4294967295,D=w+(_<<20&4294967295|_>>>12),_=E+(w^S&(D^w))+A[13]+2850285829&4294967295,E=D+(_<<5&4294967295|_>>>27),_=S+(D^w&(E^D))+A[2]+4243563512&4294967295,S=E+(_<<9&4294967295|_>>>23),_=w+(E^D&(S^E))+A[7]+1735328473&4294967295,w=S+(_<<14&4294967295|_>>>18),_=D+(S^E&(w^S))+A[12]+2368359562&4294967295,D=w+(_<<20&4294967295|_>>>12),_=E+(D^w^S)+A[5]+4294588738&4294967295,E=D+(_<<4&4294967295|_>>>28),_=S+(E^D^w)+A[8]+2272392833&4294967295,S=E+(_<<11&4294967295|_>>>21),_=w+(S^E^D)+A[11]+1839030562&4294967295,w=S+(_<<16&4294967295|_>>>16),_=D+(w^S^E)+A[14]+4259657740&4294967295,D=w+(_<<23&4294967295|_>>>9),_=E+(D^w^S)+A[1]+2763975236&4294967295,E=D+(_<<4&4294967295|_>>>28),_=S+(E^D^w)+A[4]+1272893353&4294967295,S=E+(_<<11&4294967295|_>>>21),_=w+(S^E^D)+A[7]+4139469664&4294967295,w=S+(_<<16&4294967295|_>>>16),_=D+(w^S^E)+A[10]+3200236656&4294967295,D=w+(_<<23&4294967295|_>>>9),_=E+(D^w^S)+A[13]+681279174&4294967295,E=D+(_<<4&4294967295|_>>>28),_=S+(E^D^w)+A[0]+3936430074&4294967295,S=E+(_<<11&4294967295|_>>>21),_=w+(S^E^D)+A[3]+3572445317&4294967295,w=S+(_<<16&4294967295|_>>>16),_=D+(w^S^E)+A[6]+76029189&4294967295,D=w+(_<<23&4294967295|_>>>9),_=E+(D^w^S)+A[9]+3654602809&4294967295,E=D+(_<<4&4294967295|_>>>28),_=S+(E^D^w)+A[12]+3873151461&4294967295,S=E+(_<<11&4294967295|_>>>21),_=w+(S^E^D)+A[15]+530742520&4294967295,w=S+(_<<16&4294967295|_>>>16),_=D+(w^S^E)+A[2]+3299628645&4294967295,D=w+(_<<23&4294967295|_>>>9),_=E+(w^(D|~S))+A[0]+4096336452&4294967295,E=D+(_<<6&4294967295|_>>>26),_=S+(D^(E|~w))+A[7]+1126891415&4294967295,S=E+(_<<10&4294967295|_>>>22),_=w+(E^(S|~D))+A[14]+2878612391&4294967295,w=S+(_<<15&4294967295|_>>>17),_=D+(S^(w|~E))+A[5]+4237533241&4294967295,D=w+(_<<21&4294967295|_>>>11),_=E+(w^(D|~S))+A[12]+1700485571&4294967295,E=D+(_<<6&4294967295|_>>>26),_=S+(D^(E|~w))+A[3]+2399980690&4294967295,S=E+(_<<10&4294967295|_>>>22),_=w+(E^(S|~D))+A[10]+4293915773&4294967295,w=S+(_<<15&4294967295|_>>>17),_=D+(S^(w|~E))+A[1]+2240044497&4294967295,D=w+(_<<21&4294967295|_>>>11),_=E+(w^(D|~S))+A[8]+1873313359&4294967295,E=D+(_<<6&4294967295|_>>>26),_=S+(D^(E|~w))+A[15]+4264355552&4294967295,S=E+(_<<10&4294967295|_>>>22),_=w+(E^(S|~D))+A[6]+2734768916&4294967295,w=S+(_<<15&4294967295|_>>>17),_=D+(S^(w|~E))+A[13]+1309151649&4294967295,D=w+(_<<21&4294967295|_>>>11),_=E+(w^(D|~S))+A[4]+4149444226&4294967295,E=D+(_<<6&4294967295|_>>>26),_=S+(D^(E|~w))+A[11]+3174756917&4294967295,S=E+(_<<10&4294967295|_>>>22),_=w+(E^(S|~D))+A[2]+718787259&4294967295,w=S+(_<<15&4294967295|_>>>17),_=D+(S^(w|~E))+A[9]+3951481745&4294967295,I.g[0]=I.g[0]+E&4294967295,I.g[1]=I.g[1]+(w+(_<<21&4294967295|_>>>11))&4294967295,I.g[2]=I.g[2]+w&4294967295,I.g[3]=I.g[3]+S&4294967295}r.prototype.v=function(I,E){E===void 0&&(E=I.length);let D=E-this.blockSize,A=this.C,w=this.h,S=0;for(;S<E;){if(w==0)for(;S<=D;)s(this,I,S),S+=this.blockSize;if(typeof I=="string"){for(;S<E;)if(A[w++]=I.charCodeAt(S++),w==this.blockSize){s(this,A),w=0;break}}else for(;S<E;)if(A[w++]=I[S++],w==this.blockSize){s(this,A),w=0;break}}this.h=w,this.o+=E},r.prototype.A=function(){var I=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);I[0]=128;for(var E=1;E<I.length-8;++E)I[E]=0;E=this.o*8;for(var D=I.length-8;D<I.length;++D)I[D]=E&255,E/=256;for(this.v(I),I=Array(16),E=0,D=0;D<4;++D)for(let A=0;A<32;A+=8)I[E++]=this.g[D]>>>A&255;return I};function i(I,E){var D=u;return Object.prototype.hasOwnProperty.call(D,I)?D[I]:D[I]=E(I)}function a(I,E){this.h=E;let D=[],A=!0;for(let w=I.length-1;w>=0;w--){let S=I[w]|0;A&&S==E||(D[w]=S,A=!1)}this.g=D}var u={};function c(I){return-128<=I&&I<128?i(I,function(E){return new a([E|0],E<0?-1:0)}):new a([I|0],I<0?-1:0)}function l(I){if(isNaN(I)||!isFinite(I))return f;if(I<0)return H(l(-I));let E=[],D=1;for(let A=0;I>=D;A++)E[A]=I/D|0,D*=4294967296;return new a(E,0)}function d(I,E){if(I.length==0)throw Error("number format error: empty string");if(E=E||10,E<2||36<E)throw Error("radix out of range: "+E);if(I.charAt(0)=="-")return H(d(I.substring(1),E));if(I.indexOf("-")>=0)throw Error('number format error: interior "-" character');let D=l(Math.pow(E,8)),A=f;for(let S=0;S<I.length;S+=8){var w=Math.min(8,I.length-S);let _=parseInt(I.substring(S,S+w),E);w<8?(w=l(Math.pow(E,w)),A=A.j(w).add(l(_))):(A=A.j(D),A=A.add(l(_)))}return A}var f=c(0),m=c(1),v=c(16777216);n=a.prototype,n.m=function(){if(V(this))return-H(this).m();let I=0,E=1;for(let D=0;D<this.g.length;D++){let A=this.i(D);I+=(A>=0?A:4294967296+A)*E,E*=4294967296}return I},n.toString=function(I){if(I=I||10,I<2||36<I)throw Error("radix out of range: "+I);if(R(this))return"0";if(V(this))return"-"+H(this).toString(I);let E=l(Math.pow(I,6));var D=this;let A="";for(;;){let w=ve(D,E).g;D=z(D,w.j(E));let S=((D.g.length>0?D.g[0]:D.h)>>>0).toString(I);if(D=w,R(D))return S+A;for(;S.length<6;)S="0"+S;A=S+A}},n.i=function(I){return I<0?0:I<this.g.length?this.g[I]:this.h};function R(I){if(I.h!=0)return!1;for(let E=0;E<I.g.length;E++)if(I.g[E]!=0)return!1;return!0}function V(I){return I.h==-1}n.l=function(I){return I=z(this,I),V(I)?-1:R(I)?0:1};function H(I){let E=I.g.length,D=[];for(let A=0;A<E;A++)D[A]=~I.g[A];return new a(D,~I.h).add(m)}n.abs=function(){return V(this)?H(this):this},n.add=function(I){let E=Math.max(this.g.length,I.g.length),D=[],A=0;for(let w=0;w<=E;w++){let S=A+(this.i(w)&65535)+(I.i(w)&65535),_=(S>>>16)+(this.i(w)>>>16)+(I.i(w)>>>16);A=_>>>16,S&=65535,_&=65535,D[w]=_<<16|S}return new a(D,D[D.length-1]&-2147483648?-1:0)};function z(I,E){return I.add(H(E))}n.j=function(I){if(R(this)||R(I))return f;if(V(this))return V(I)?H(this).j(H(I)):H(H(this).j(I));if(V(I))return H(this.j(H(I)));if(this.l(v)<0&&I.l(v)<0)return l(this.m()*I.m());let E=this.g.length+I.g.length,D=[];for(var A=0;A<2*E;A++)D[A]=0;for(A=0;A<this.g.length;A++)for(let w=0;w<I.g.length;w++){let S=this.i(A)>>>16,_=this.i(A)&65535,tt=I.i(w)>>>16,Gn=I.i(w)&65535;D[2*A+2*w]+=_*Gn,Be(D,2*A+2*w),D[2*A+2*w+1]+=S*Gn,Be(D,2*A+2*w+1),D[2*A+2*w+1]+=_*tt,Be(D,2*A+2*w+1),D[2*A+2*w+2]+=S*tt,Be(D,2*A+2*w+2)}for(I=0;I<E;I++)D[I]=D[2*I+1]<<16|D[2*I];for(I=E;I<2*E;I++)D[I]=0;return new a(D,0)};function Be(I,E){for(;(I[E]&65535)!=I[E];)I[E+1]+=I[E]>>>16,I[E]&=65535,E++}function Ae(I,E){this.g=I,this.h=E}function ve(I,E){if(R(E))throw Error("division by zero");if(R(I))return new Ae(f,f);if(V(I))return E=ve(H(I),E),new Ae(H(E.g),H(E.h));if(V(E))return E=ve(I,H(E)),new Ae(H(E.g),E.h);if(I.g.length>30){if(V(I)||V(E))throw Error("slowDivide_ only works with positive integers.");for(var D=m,A=E;A.l(I)<=0;)D=ut(D),A=ut(A);var w=ye(D,1),S=ye(A,1);for(A=ye(A,2),D=ye(D,2);!R(A);){var _=S.add(A);_.l(I)<=0&&(w=w.add(D),S=_),A=ye(A,1),D=ye(D,1)}return E=z(I,w.j(E)),new Ae(w,E)}for(w=f;I.l(E)>=0;){for(D=Math.max(1,Math.floor(I.m()/E.m())),A=Math.ceil(Math.log(D)/Math.LN2),A=A<=48?1:Math.pow(2,A-48),S=l(D),_=S.j(E);V(_)||_.l(I)>0;)D-=A,S=l(D),_=S.j(E);R(S)&&(S=m),w=w.add(S),I=z(I,_)}return new Ae(w,I)}n.B=function(I){return ve(this,I).h},n.and=function(I){let E=Math.max(this.g.length,I.g.length),D=[];for(let A=0;A<E;A++)D[A]=this.i(A)&I.i(A);return new a(D,this.h&I.h)},n.or=function(I){let E=Math.max(this.g.length,I.g.length),D=[];for(let A=0;A<E;A++)D[A]=this.i(A)|I.i(A);return new a(D,this.h|I.h)},n.xor=function(I){let E=Math.max(this.g.length,I.g.length),D=[];for(let A=0;A<E;A++)D[A]=this.i(A)^I.i(A);return new a(D,this.h^I.h)};function ut(I){let E=I.g.length+1,D=[];for(let A=0;A<E;A++)D[A]=I.i(A)<<1|I.i(A-1)>>>31;return new a(D,I.h)}function ye(I,E){let D=E>>5;E%=32;let A=I.g.length-D,w=[];for(let S=0;S<A;S++)w[S]=E>0?I.i(S+D)>>>E|I.i(S+D+1)<<32-E:I.i(S+D);return new a(w,I.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,Uc=nC.Md5=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=l,a.fromString=d,Qt=nC.Integer=a}).apply(typeof tC<"u"?tC:typeof self<"u"?self:typeof window<"u"?window:{});var io=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},$t={};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Hc,Xy,Gr,qc,li,ao,jc,Kc,Jc;(function(){var n,e=Object.defineProperty;function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof io=="object"&&io];for(var B=0;B<o.length;++B){var h=o[B];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var r=t(this);function s(o,B){if(B)e:{var h=r;o=o.split(".");for(var p=0;p<o.length-1;p++){var b=o[p];if(!(b in h))break e;h=h[b]}o=o[o.length-1],p=h[o],B=B(p),B!=p&&B!=null&&e(h,o,{configurable:!0,writable:!0,value:B})}}s("Symbol.dispose",function(o){return o||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(o){return o||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(o){return o||function(B){var h=[],p;for(p in B)Object.prototype.hasOwnProperty.call(B,p)&&h.push([p,B[p]]);return h}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},a=this||self;function u(o){var B=typeof o;return B=="object"&&o!=null||B=="function"}function c(o,B,h){return o.call.apply(o.bind,arguments)}function l(o,B,h){return l=c,l.apply(null,arguments)}function d(o,B){var h=Array.prototype.slice.call(arguments,1);return function(){var p=h.slice();return p.push.apply(p,arguments),o.apply(this,p)}}function f(o,B){function h(){}h.prototype=B.prototype,o.Z=B.prototype,o.prototype=new h,o.prototype.constructor=o,o.Ob=function(p,b,P){for(var q=Array(arguments.length-2),ne=2;ne<arguments.length;ne++)q[ne-2]=arguments[ne];return B.prototype[b].apply(p,q)}}var m=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?o=>o&&AsyncContext.Snapshot.wrap(o):o=>o;function v(o){let B=o.length;if(B>0){let h=Array(B);for(let p=0;p<B;p++)h[p]=o[p];return h}return[]}function R(o,B){for(let p=1;p<arguments.length;p++){let b=arguments[p];var h=typeof b;if(h=h!="object"?h:b?Array.isArray(b)?"array":h:"null",h=="array"||h=="object"&&typeof b.length=="number"){h=o.length||0;let P=b.length||0;o.length=h+P;for(let q=0;q<P;q++)o[h+q]=b[q]}else o.push(b)}}class V{constructor(B,h){this.i=B,this.j=h,this.h=0,this.g=null}get(){let B;return this.h>0?(this.h--,B=this.g,this.g=B.next,B.next=null):B=this.i(),B}}function H(o){a.setTimeout(()=>{throw o},0)}function z(){var o=I;let B=null;return o.g&&(B=o.g,o.g=o.g.next,o.g||(o.h=null),B.next=null),B}class Be{constructor(){this.h=this.g=null}add(B,h){let p=Ae.get();p.set(B,h),this.h?this.h.next=p:this.g=p,this.h=p}}var Ae=new V(()=>new ve,o=>o.reset());class ve{constructor(){this.next=this.g=this.h=null}set(B,h){this.h=B,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let ut,ye=!1,I=new Be,E=()=>{let o=Promise.resolve(void 0);ut=()=>{o.then(D)}};function D(){for(var o;o=z();){try{o.h.call(o.g)}catch(h){H(h)}var B=Ae;B.j(o),B.h<100&&(B.h++,o.next=B.g,B.g=o)}ye=!1}function A(){this.u=this.u,this.C=this.C}A.prototype.u=!1,A.prototype.dispose=function(){this.u||(this.u=!0,this.N())},A.prototype[Symbol.dispose]=function(){this.dispose()},A.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function w(o,B){this.type=o,this.g=this.target=B,this.defaultPrevented=!1}w.prototype.h=function(){this.defaultPrevented=!0};var S=(function(){if(!a.addEventListener||!Object.defineProperty)return!1;var o=!1,B=Object.defineProperty({},"passive",{get:function(){o=!0}});try{let h=()=>{};a.addEventListener("test",h,B),a.removeEventListener("test",h,B)}catch{}return o})();function _(o){return/^[\s\xa0]*$/.test(o)}function tt(o,B){w.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o&&this.init(o,B)}f(tt,w),tt.prototype.init=function(o,B){let h=this.type=o.type,p=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;this.target=o.target||o.srcElement,this.g=B,B=o.relatedTarget,B||(h=="mouseover"?B=o.fromElement:h=="mouseout"&&(B=o.toElement)),this.relatedTarget=B,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=o.pointerType,this.state=o.state,this.i=o,o.defaultPrevented&&tt.Z.h.call(this)},tt.prototype.h=function(){tt.Z.h.call(this);let o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var Gn="closure_listenable_"+(Math.random()*1e6|0),BE=0;function hE(o,B,h,p,b){this.listener=o,this.proxy=null,this.src=B,this.type=h,this.capture=!!p,this.ha=b,this.key=++BE,this.da=this.fa=!1}function ia(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function aa(o,B,h){for(let p in o)B.call(h,o[p],p,o)}function dE(o,B){for(let h in o)B.call(void 0,o[h],h,o)}function md(o){let B={};for(let h in o)B[h]=o[h];return B}let Ed="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function _d(o,B){let h,p;for(let b=1;b<arguments.length;b++){p=arguments[b];for(h in p)o[h]=p[h];for(let P=0;P<Ed.length;P++)h=Ed[P],Object.prototype.hasOwnProperty.call(p,h)&&(o[h]=p[h])}}function oa(o){this.src=o,this.g={},this.h=0}oa.prototype.add=function(o,B,h,p,b){let P=o.toString();o=this.g[P],o||(o=this.g[P]=[],this.h++);let q=wu(o,B,p,b);return q>-1?(B=o[q],h||(B.fa=!1)):(B=new hE(B,this.src,P,!!p,b),B.fa=h,o.push(B)),B};function yu(o,B){let h=B.type;if(h in o.g){var p=o.g[h],b=Array.prototype.indexOf.call(p,B,void 0),P;(P=b>=0)&&Array.prototype.splice.call(p,b,1),P&&(ia(B),o.g[h].length==0&&(delete o.g[h],o.h--))}}function wu(o,B,h,p){for(let b=0;b<o.length;++b){let P=o[b];if(!P.da&&P.listener==B&&P.capture==!!h&&P.ha==p)return b}return-1}var Iu="closure_lm_"+(Math.random()*1e6|0),Tu={};function Dd(o,B,h,p,b){if(Array.isArray(B)){for(let P=0;P<B.length;P++)Dd(o,B[P],h,p,b);return null}return h=Id(h),o&&o[Gn]?o.J(B,h,u(p)?!!p.capture:!1,b):fE(o,B,h,!1,p,b)}function fE(o,B,h,p,b,P){if(!B)throw Error("Invalid event type");let q=u(b)?!!b.capture:!!b,ne=vu(o);if(ne||(o[Iu]=ne=new oa(o)),h=ne.add(B,h,p,q,P),h.proxy)return h;if(p=pE(),h.proxy=p,p.src=o,p.listener=h,o.addEventListener)S||(b=q),b===void 0&&(b=!1),o.addEventListener(B.toString(),p,b);else if(o.attachEvent)o.attachEvent(wd(B.toString()),p);else if(o.addListener&&o.removeListener)o.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return h}function pE(){function o(h){return B.call(o.src,o.listener,h)}let B=CE;return o}function yd(o,B,h,p,b){if(Array.isArray(B))for(var P=0;P<B.length;P++)yd(o,B[P],h,p,b);else p=u(p)?!!p.capture:!!p,h=Id(h),o&&o[Gn]?(o=o.i,P=String(B).toString(),P in o.g&&(B=o.g[P],h=wu(B,h,p,b),h>-1&&(ia(B[h]),Array.prototype.splice.call(B,h,1),B.length==0&&(delete o.g[P],o.h--)))):o&&(o=vu(o))&&(B=o.g[B.toString()],o=-1,B&&(o=wu(B,h,p,b)),(h=o>-1?B[o]:null)&&Au(h))}function Au(o){if(typeof o!="number"&&o&&!o.da){var B=o.src;if(B&&B[Gn])yu(B.i,o);else{var h=o.type,p=o.proxy;B.removeEventListener?B.removeEventListener(h,p,o.capture):B.detachEvent?B.detachEvent(wd(h),p):B.addListener&&B.removeListener&&B.removeListener(p),(h=vu(B))?(yu(h,o),h.h==0&&(h.src=null,B[Iu]=null)):ia(o)}}}function wd(o){return o in Tu?Tu[o]:Tu[o]="on"+o}function CE(o,B){if(o.da)o=!0;else{B=new tt(B,this);let h=o.listener,p=o.ha||o.src;o.fa&&Au(o),o=h.call(p,B)}return o}function vu(o){return o=o[Iu],o instanceof oa?o:null}var bu="__closure_events_fn_"+(Math.random()*1e9>>>0);function Id(o){return typeof o=="function"?o:(o[bu]||(o[bu]=function(B){return o.handleEvent(B)}),o[bu])}function Ke(){A.call(this),this.i=new oa(this),this.M=this,this.G=null}f(Ke,A),Ke.prototype[Gn]=!0,Ke.prototype.removeEventListener=function(o,B,h,p){yd(this,o,B,h,p)};function $e(o,B){var h,p=o.G;if(p)for(h=[];p;p=p.G)h.push(p);if(o=o.M,p=B.type||B,typeof B=="string")B=new w(B,o);else if(B instanceof w)B.target=B.target||o;else{var b=B;B=new w(p,o),_d(B,b)}b=!0;let P,q;if(h)for(q=h.length-1;q>=0;q--)P=B.g=h[q],b=ua(P,p,!0,B)&&b;if(P=B.g=o,b=ua(P,p,!0,B)&&b,b=ua(P,p,!1,B)&&b,h)for(q=0;q<h.length;q++)P=B.g=h[q],b=ua(P,p,!1,B)&&b}Ke.prototype.N=function(){if(Ke.Z.N.call(this),this.i){var o=this.i;for(let B in o.g){let h=o.g[B];for(let p=0;p<h.length;p++)ia(h[p]);delete o.g[B],o.h--}}this.G=null},Ke.prototype.J=function(o,B,h,p){return this.i.add(String(o),B,!1,h,p)},Ke.prototype.K=function(o,B,h,p){return this.i.add(String(o),B,!0,h,p)};function ua(o,B,h,p){if(B=o.i.g[String(B)],!B)return!0;B=B.concat();let b=!0;for(let P=0;P<B.length;++P){let q=B[P];if(q&&!q.da&&q.capture==h){let ne=q.listener,Fe=q.ha||q.src;q.fa&&yu(o.i,q),b=ne.call(Fe,p)!==!1&&b}}return b&&!p.defaultPrevented}function gE(o,B){if(typeof o!="function")if(o&&typeof o.handleEvent=="function")o=l(o.handleEvent,o);else throw Error("Invalid listener argument");return Number(B)>2147483647?-1:a.setTimeout(o,B||0)}function Td(o){o.g=gE(()=>{o.g=null,o.i&&(o.i=!1,Td(o))},o.l);let B=o.h;o.h=null,o.m.apply(null,B)}class mE extends A{constructor(B,h){super(),this.m=B,this.l=h,this.h=null,this.i=!1,this.g=null}j(B){this.h=arguments,this.g?this.i=!0:Td(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function As(o){A.call(this),this.h=o,this.g={}}f(As,A);var Ad=[];function vd(o){aa(o.g,function(B,h){this.g.hasOwnProperty(h)&&Au(B)},o),o.g={}}As.prototype.N=function(){As.Z.N.call(this),vd(this)},As.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Su=a.JSON.stringify,EE=a.JSON.parse,_E=class{stringify(o){return a.JSON.stringify(o,void 0)}parse(o){return a.JSON.parse(o,void 0)}};function bd(){}function Sd(){}var vs={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Ru(){w.call(this,"d")}f(Ru,w);function Pu(){w.call(this,"c")}f(Pu,w);var Un={},Rd=null;function ca(){return Rd=Rd||new Ke}Un.Ia="serverreachability";function Pd(o){w.call(this,Un.Ia,o)}f(Pd,w);function bs(o){let B=ca();$e(B,new Pd(B))}Un.STAT_EVENT="statevent";function Nd(o,B){w.call(this,Un.STAT_EVENT,o),this.stat=B}f(Nd,w);function Ye(o){let B=ca();$e(B,new Nd(B,o))}Un.Ja="timingevent";function Od(o,B){w.call(this,Un.Ja,o),this.size=B}f(Od,w);function Ss(o,B){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){o()},B)}function Rs(){this.g=!0}Rs.prototype.ua=function(){this.g=!1};function DE(o,B,h,p,b,P){o.info(function(){if(o.g)if(P){var q="",ne=P.split("&");for(let de=0;de<ne.length;de++){var Fe=ne[de].split("=");if(Fe.length>1){let Me=Fe[0];Fe=Fe[1];let Ot=Me.split("_");q=Ot.length>=2&&Ot[1]=="type"?q+(Me+"="+Fe+"&"):q+(Me+"=redacted&")}}}else q=null;else q=P;return"XMLHTTP REQ ("+p+") [attempt "+b+"]: "+B+`
`+h+`
`+q})}function yE(o,B,h,p,b,P,q){o.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+b+"]: "+B+`
`+h+`
`+P+" "+q})}function Sr(o,B,h,p){o.info(function(){return"XMLHTTP TEXT ("+B+"): "+IE(o,h)+(p?" "+p:"")})}function wE(o,B){o.info(function(){return"TIMEOUT: "+B})}Rs.prototype.info=function(){};function IE(o,B){if(!o.g)return B;if(!B)return null;try{let P=JSON.parse(B);if(P){for(o=0;o<P.length;o++)if(Array.isArray(P[o])){var h=P[o];if(!(h.length<2)){var p=h[1];if(Array.isArray(p)&&!(p.length<1)){var b=p[0];if(b!="noop"&&b!="stop"&&b!="close")for(let q=1;q<p.length;q++)p[q]=""}}}}return Su(P)}catch{return B}}var la={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Fd={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Ld;function Nu(){}f(Nu,bd),Nu.prototype.g=function(){return new XMLHttpRequest},Ld=new Nu;function Ps(o){return encodeURIComponent(String(o))}function TE(o){var B=1;o=o.split(":");let h=[];for(;B>0&&o.length;)h.push(o.shift()),B--;return o.length&&h.push(o.join(":")),h}function dn(o,B,h,p){this.j=o,this.i=B,this.l=h,this.S=p||1,this.V=new As(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new xd}function xd(){this.i=null,this.g="",this.h=!1}var kd={},Ou={};function Fu(o,B,h){o.M=1,o.A=ha(Nt(B)),o.u=h,o.R=!0,Vd(o,null)}function Vd(o,B){o.F=Date.now(),Ba(o),o.B=Nt(o.A);var h=o.B,p=o.S;Array.isArray(p)||(p=[String(p)]),Yd(h.i,"t",p),o.C=0,h=o.j.L,o.h=new xd,o.g=Cf(o.j,h?B:null,!o.u),o.P>0&&(o.O=new mE(l(o.Y,o,o.g),o.P)),B=o.V,h=o.g,p=o.ba;var b="readystatechange";Array.isArray(b)||(b&&(Ad[0]=b.toString()),b=Ad);for(let P=0;P<b.length;P++){let q=Dd(h,b[P],p||B.handleEvent,!1,B.h||B);if(!q)break;B.g[q.key]=q}B=o.J?md(o.J):{},o.u?(o.v||(o.v="POST"),B["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.B,o.v,o.u,B)):(o.v="GET",o.g.ea(o.B,o.v,null,B)),bs(),DE(o.i,o.v,o.B,o.l,o.S,o.u)}dn.prototype.ba=function(o){o=o.target;let B=this.O;B&&Cn(o)==3?B.j():this.Y(o)},dn.prototype.Y=function(o){try{if(o==this.g)e:{let ne=Cn(this.g),Fe=this.g.ya(),de=this.g.ca();if(!(ne<3)&&(ne!=3||this.g&&(this.h.h||this.g.la()||sf(this.g)))){this.K||ne!=4||Fe==7||(Fe==8||de<=0?bs(3):bs(2)),Lu(this);var B=this.g.ca();this.X=B;var h=AE(this);if(this.o=B==200,yE(this.i,this.v,this.B,this.l,this.S,ne,B),this.o){if(this.U&&!this.L){t:{if(this.g){var p,b=this.g;if((p=b.g?b.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!_(p)){var P=p;break t}}P=null}if(o=P)Sr(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,xu(this,o);else{this.o=!1,this.m=3,Ye(12),Hn(this),Ns(this);break e}}if(this.R){o=!0;let Me;for(;!this.K&&this.C<h.length;)if(Me=vE(this,h),Me==Ou){ne==4&&(this.m=4,Ye(14),o=!1),Sr(this.i,this.l,null,"[Incomplete Response]");break}else if(Me==kd){this.m=4,Ye(15),Sr(this.i,this.l,h,"[Invalid Chunk]"),o=!1;break}else Sr(this.i,this.l,Me,null),xu(this,Me);if(Md(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),ne!=4||h.length!=0||this.h.h||(this.m=1,Ye(16),o=!1),this.o=this.o&&o,!o)Sr(this.i,this.l,h,"[Invalid Chunked Response]"),Hn(this),Ns(this);else if(h.length>0&&!this.W){this.W=!0;var q=this.j;q.g==this&&q.aa&&!q.P&&(q.j.info("Great, no buffering proxy detected. Bytes received: "+h.length),qu(q),q.P=!0,Ye(11))}}else Sr(this.i,this.l,h,null),xu(this,h);ne==4&&Hn(this),this.o&&!this.K&&(ne==4?hf(this.j,this):(this.o=!1,Ba(this)))}else UE(this.g),B==400&&h.indexOf("Unknown SID")>0?(this.m=3,Ye(12)):(this.m=0,Ye(13)),Hn(this),Ns(this)}}}catch{}};function AE(o){if(!Md(o))return o.g.la();let B=sf(o.g);if(B==="")return"";let h="",p=B.length,b=Cn(o.g)==4;if(!o.h.i){if(typeof TextDecoder>"u")return Hn(o),Ns(o),"";o.h.i=new a.TextDecoder}for(let P=0;P<p;P++)o.h.h=!0,h+=o.h.i.decode(B[P],{stream:!(b&&P==p-1)});return B.length=0,o.h.g+=h,o.C=0,o.h.g}function Md(o){return o.g?o.v=="GET"&&o.M!=2&&o.j.Aa:!1}function vE(o,B){var h=o.C,p=B.indexOf(`
`,h);return p==-1?Ou:(h=Number(B.substring(h,p)),isNaN(h)?kd:(p+=1,p+h>B.length?Ou:(B=B.slice(p,p+h),o.C=p+h,B)))}dn.prototype.cancel=function(){this.K=!0,Hn(this)};function Ba(o){o.T=Date.now()+o.H,Gd(o,o.H)}function Gd(o,B){if(o.D!=null)throw Error("WatchDog timer not null");o.D=Ss(l(o.aa,o),B)}function Lu(o){o.D&&(a.clearTimeout(o.D),o.D=null)}dn.prototype.aa=function(){this.D=null;let o=Date.now();o-this.T>=0?(wE(this.i,this.B),this.M!=2&&(bs(),Ye(17)),Hn(this),this.m=2,Ns(this)):Gd(this,this.T-o)};function Ns(o){o.j.I==0||o.K||hf(o.j,o)}function Hn(o){Lu(o);var B=o.O;B&&typeof B.dispose=="function"&&B.dispose(),o.O=null,vd(o.V),o.g&&(B=o.g,o.g=null,B.abort(),B.dispose())}function xu(o,B){try{var h=o.j;if(h.I!=0&&(h.g==o||ku(h.h,o))){if(!o.L&&ku(h.h,o)&&h.I==3){try{var p=h.Ba.g.parse(B)}catch{p=null}if(Array.isArray(p)&&p.length==3){var b=p;if(b[0]==0){e:if(!h.v){if(h.g)if(h.g.F+3e3<o.F)ma(h),Ca(h);else break e;Hu(h),Ye(18)}}else h.xa=b[1],0<h.xa-h.K&&b[2]<37500&&h.F&&h.A==0&&!h.C&&(h.C=Ss(l(h.Va,h),6e3));qd(h.h)<=1&&h.ta&&(h.ta=void 0)}else jn(h,11)}else if((o.L||h.g==o)&&ma(h),!_(B))for(b=h.Ba.g.parse(B),B=0;B<b.length;B++){let de=b[B],Me=de[0];if(!(Me<=h.K))if(h.K=Me,de=de[1],h.I==2)if(de[0]=="c"){h.M=de[1],h.ba=de[2];let Ot=de[3];Ot!=null&&(h.ka=Ot,h.j.info("VER="+h.ka));let Kn=de[4];Kn!=null&&(h.za=Kn,h.j.info("SVER="+h.za));let gn=de[5];gn!=null&&typeof gn=="number"&&gn>0&&(p=1.5*gn,h.O=p,h.j.info("backChannelRequestTimeoutMs_="+p)),p=h;let mn=o.g;if(mn){let _a=mn.g?mn.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(_a){var P=p.h;P.g||_a.indexOf("spdy")==-1&&_a.indexOf("quic")==-1&&_a.indexOf("h2")==-1||(P.j=P.l,P.g=new Set,P.h&&(Vu(P,P.h),P.h=null))}if(p.G){let ju=mn.g?mn.g.getResponseHeader("X-HTTP-Session-Id"):null;ju&&(p.wa=ju,_e(p.J,p.G,ju))}}h.I=3,h.l&&h.l.ra(),h.aa&&(h.T=Date.now()-o.F,h.j.info("Handshake RTT: "+h.T+"ms")),p=h;var q=o;if(p.na=pf(p,p.L?p.ba:null,p.W),q.L){jd(p.h,q);var ne=q,Fe=p.O;Fe&&(ne.H=Fe),ne.D&&(Lu(ne),Ba(ne)),p.g=q}else lf(p);h.i.length>0&&ga(h)}else de[0]!="stop"&&de[0]!="close"||jn(h,7);else h.I==3&&(de[0]=="stop"||de[0]=="close"?de[0]=="stop"?jn(h,7):Uu(h):de[0]!="noop"&&h.l&&h.l.qa(de),h.A=0)}}bs(4)}catch{}}var bE=class{constructor(o,B){this.g=o,this.map=B}};function Ud(o){this.l=o||10,a.PerformanceNavigationTiming?(o=a.performance.getEntriesByType("navigation"),o=o.length>0&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Hd(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function qd(o){return o.h?1:o.g?o.g.size:0}function ku(o,B){return o.h?o.h==B:o.g?o.g.has(B):!1}function Vu(o,B){o.g?o.g.add(B):o.h=B}function jd(o,B){o.h&&o.h==B?o.h=null:o.g&&o.g.has(B)&&o.g.delete(B)}Ud.prototype.cancel=function(){if(this.i=Kd(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(let o of this.g.values())o.cancel();this.g.clear()}};function Kd(o){if(o.h!=null)return o.i.concat(o.h.G);if(o.g!=null&&o.g.size!==0){let B=o.i;for(let h of o.g.values())B=B.concat(h.G);return B}return v(o.i)}var Jd=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function SE(o,B){if(o){o=o.split("&");for(let h=0;h<o.length;h++){let p=o[h].indexOf("="),b,P=null;p>=0?(b=o[h].substring(0,p),P=o[h].substring(p+1)):b=o[h],B(b,P?decodeURIComponent(P.replace(/\+/g," ")):"")}}}function fn(o){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let B;o instanceof fn?(this.l=o.l,Os(this,o.j),this.o=o.o,this.g=o.g,Fs(this,o.u),this.h=o.h,Mu(this,Xd(o.i)),this.m=o.m):o&&(B=String(o).match(Jd))?(this.l=!1,Os(this,B[1]||"",!0),this.o=Ls(B[2]||""),this.g=Ls(B[3]||"",!0),Fs(this,B[4]),this.h=Ls(B[5]||"",!0),Mu(this,B[6]||"",!0),this.m=Ls(B[7]||"")):(this.l=!1,this.i=new ks(null,this.l))}fn.prototype.toString=function(){let o=[];var B=this.j;B&&o.push(xs(B,zd,!0),":");var h=this.g;return(h||B=="file")&&(o.push("//"),(B=this.o)&&o.push(xs(B,zd,!0),"@"),o.push(Ps(h).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.u,h!=null&&o.push(":",String(h))),(h=this.h)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(xs(h,h.charAt(0)=="/"?NE:PE,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",xs(h,FE)),o.join("")},fn.prototype.resolve=function(o){let B=Nt(this),h=!!o.j;h?Os(B,o.j):h=!!o.o,h?B.o=o.o:h=!!o.g,h?B.g=o.g:h=o.u!=null;var p=o.h;if(h)Fs(B,o.u);else if(h=!!o.h){if(p.charAt(0)!="/")if(this.g&&!this.h)p="/"+p;else{var b=B.h.lastIndexOf("/");b!=-1&&(p=B.h.slice(0,b+1)+p)}if(b=p,b==".."||b==".")p="";else if(b.indexOf("./")!=-1||b.indexOf("/.")!=-1){p=b.lastIndexOf("/",0)==0,b=b.split("/");let P=[];for(let q=0;q<b.length;){let ne=b[q++];ne=="."?p&&q==b.length&&P.push(""):ne==".."?((P.length>1||P.length==1&&P[0]!="")&&P.pop(),p&&q==b.length&&P.push("")):(P.push(ne),p=!0)}p=P.join("/")}else p=b}return h?B.h=p:h=o.i.toString()!=="",h?Mu(B,Xd(o.i)):h=!!o.m,h&&(B.m=o.m),B};function Nt(o){return new fn(o)}function Os(o,B,h){o.j=h?Ls(B,!0):B,o.j&&(o.j=o.j.replace(/:$/,""))}function Fs(o,B){if(B){if(B=Number(B),isNaN(B)||B<0)throw Error("Bad port number "+B);o.u=B}else o.u=null}function Mu(o,B,h){B instanceof ks?(o.i=B,LE(o.i,o.l)):(h||(B=xs(B,OE)),o.i=new ks(B,o.l))}function _e(o,B,h){o.i.set(B,h)}function ha(o){return _e(o,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),o}function Ls(o,B){return o?B?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function xs(o,B,h){return typeof o=="string"?(o=encodeURI(o).replace(B,RE),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function RE(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var zd=/[#\/\?@]/g,PE=/[#\?:]/g,NE=/[#\?]/g,OE=/[#\?@]/g,FE=/#/g;function ks(o,B){this.h=this.g=null,this.i=o||null,this.j=!!B}function qn(o){o.g||(o.g=new Map,o.h=0,o.i&&SE(o.i,function(B,h){o.add(decodeURIComponent(B.replace(/\+/g," ")),h)}))}n=ks.prototype,n.add=function(o,B){qn(this),this.i=null,o=Rr(this,o);let h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(B),this.h+=1,this};function Wd(o,B){qn(o),B=Rr(o,B),o.g.has(B)&&(o.i=null,o.h-=o.g.get(B).length,o.g.delete(B))}function Qd(o,B){return qn(o),B=Rr(o,B),o.g.has(B)}n.forEach=function(o,B){qn(this),this.g.forEach(function(h,p){h.forEach(function(b){o.call(B,b,p,this)},this)},this)};function $d(o,B){qn(o);let h=[];if(typeof B=="string")Qd(o,B)&&(h=h.concat(o.g.get(Rr(o,B))));else for(o=Array.from(o.g.values()),B=0;B<o.length;B++)h=h.concat(o[B]);return h}n.set=function(o,B){return qn(this),this.i=null,o=Rr(this,o),Qd(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[B]),this.h+=1,this},n.get=function(o,B){return o?(o=$d(this,o),o.length>0?String(o[0]):B):B};function Yd(o,B,h){Wd(o,B),h.length>0&&(o.i=null,o.g.set(Rr(o,B),v(h)),o.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";let o=[],B=Array.from(this.g.keys());for(let p=0;p<B.length;p++){var h=B[p];let b=Ps(h);h=$d(this,h);for(let P=0;P<h.length;P++){let q=b;h[P]!==""&&(q+="="+Ps(h[P])),o.push(q)}}return this.i=o.join("&")};function Xd(o){let B=new ks;return B.i=o.i,o.g&&(B.g=new Map(o.g),B.h=o.h),B}function Rr(o,B){return B=String(B),o.j&&(B=B.toLowerCase()),B}function LE(o,B){B&&!o.j&&(qn(o),o.i=null,o.g.forEach(function(h,p){let b=p.toLowerCase();p!=b&&(Wd(this,p),Yd(this,b,h))},o)),o.j=B}function xE(o,B){let h=new Rs;if(a.Image){let p=new Image;p.onload=d(pn,h,"TestLoadImage: loaded",!0,B,p),p.onerror=d(pn,h,"TestLoadImage: error",!1,B,p),p.onabort=d(pn,h,"TestLoadImage: abort",!1,B,p),p.ontimeout=d(pn,h,"TestLoadImage: timeout",!1,B,p),a.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=o}else B(!1)}function kE(o,B){let h=new Rs,p=new AbortController,b=setTimeout(()=>{p.abort(),pn(h,"TestPingServer: timeout",!1,B)},1e4);fetch(o,{signal:p.signal}).then(P=>{clearTimeout(b),P.ok?pn(h,"TestPingServer: ok",!0,B):pn(h,"TestPingServer: server error",!1,B)}).catch(()=>{clearTimeout(b),pn(h,"TestPingServer: error",!1,B)})}function pn(o,B,h,p,b){try{b&&(b.onload=null,b.onerror=null,b.onabort=null,b.ontimeout=null),p(h)}catch{}}function VE(){this.g=new _E}function da(o){this.i=o.Sb||null,this.h=o.ab||!1}f(da,bd),da.prototype.g=function(){return new fa(this.i,this.h)};function fa(o,B){Ke.call(this),this.H=o,this.o=B,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}f(fa,Ke),n=fa.prototype,n.open=function(o,B){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=o,this.D=B,this.readyState=1,Ms(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;let B={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};o&&(B.body=o),(this.H||a).fetch(new Request(this.D,B)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Vs(this)),this.readyState=0},n.Pa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Ms(this)),this.g&&(this.readyState=3,Ms(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Zd(this)}else o.text().then(this.Oa.bind(this),this.ga.bind(this))};function Zd(o){o.j.read().then(o.Ma.bind(o)).catch(o.ga.bind(o))}n.Ma=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var B=o.value?o.value:new Uint8Array(0);(B=this.B.decode(B,{stream:!o.done}))&&(this.response=this.responseText+=B)}o.done?Vs(this):Ms(this),this.readyState==3&&Zd(this)}},n.Oa=function(o){this.g&&(this.response=this.responseText=o,Vs(this))},n.Na=function(o){this.g&&(this.response=o,Vs(this))},n.ga=function(){this.g&&Vs(this)};function Vs(o){o.readyState=4,o.l=null,o.j=null,o.B=null,Ms(o)}n.setRequestHeader=function(o,B){this.A.append(o,B)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";let o=[],B=this.h.entries();for(var h=B.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=B.next();return o.join(`\r
`)};function Ms(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(fa.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function ef(o){let B="";return aa(o,function(h,p){B+=p,B+=":",B+=h,B+=`\r
`}),B}function Gu(o,B,h){e:{for(p in h){var p=!1;break e}p=!0}p||(h=ef(h),typeof o=="string"?h!=null&&Ps(h):_e(o,B,h))}function we(o){Ke.call(this),this.headers=new Map,this.L=o||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}f(we,Ke);var ME=/^https?$/i,GE=["POST","PUT"];n=we.prototype,n.Fa=function(o){this.H=o},n.ea=function(o,B,h,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);B=B?B.toUpperCase():"GET",this.D=o,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Ld.g(),this.g.onreadystatechange=m(l(this.Ca,this));try{this.B=!0,this.g.open(B,String(o),!0),this.B=!1}catch(P){tf(this,P);return}if(o=h||"",h=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var b in p)h.set(b,p[b]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(let P of p.keys())h.set(P,p.get(P));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(h.keys()).find(P=>P.toLowerCase()=="content-type"),b=a.FormData&&o instanceof a.FormData,!(Array.prototype.indexOf.call(GE,B,void 0)>=0)||p||b||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(let[P,q]of h)this.g.setRequestHeader(P,q);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(o),this.v=!1}catch(P){tf(this,P)}};function tf(o,B){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=B,o.o=5,nf(o),pa(o)}function nf(o){o.A||(o.A=!0,$e(o,"complete"),$e(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=o||7,$e(this,"complete"),$e(this,"abort"),pa(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),pa(this,!0)),we.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?rf(this):this.Xa())},n.Xa=function(){rf(this)};function rf(o){if(o.h&&typeof i<"u"){if(o.v&&Cn(o)==4)setTimeout(o.Ca.bind(o),0);else if($e(o,"readystatechange"),Cn(o)==4){o.h=!1;try{let P=o.ca();e:switch(P){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var B=!0;break e;default:B=!1}var h;if(!(h=B)){var p;if(p=P===0){let q=String(o.D).match(Jd)[1]||null;!q&&a.self&&a.self.location&&(q=a.self.location.protocol.slice(0,-1)),p=!ME.test(q?q.toLowerCase():"")}h=p}if(h)$e(o,"complete"),$e(o,"success");else{o.o=6;try{var b=Cn(o)>2?o.g.statusText:""}catch{b=""}o.l=b+" ["+o.ca()+"]",nf(o)}}finally{pa(o)}}}}function pa(o,B){if(o.g){o.m&&(clearTimeout(o.m),o.m=null);let h=o.g;o.g=null,B||$e(o,"ready");try{h.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function Cn(o){return o.g?o.g.readyState:0}n.ca=function(){try{return Cn(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(o){if(this.g){var B=this.g.responseText;return o&&B.indexOf(o)==0&&(B=B.substring(o.length)),EE(B)}};function sf(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.F){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function UE(o){let B={};o=(o.g&&Cn(o)>=2&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<o.length;p++){if(_(o[p]))continue;var h=TE(o[p]);let b=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();let P=B[b]||[];B[b]=P,P.push(h)}dE(B,function(p){return p.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Gs(o,B,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||B}function af(o){this.za=0,this.i=[],this.j=new Rs,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Gs("failFast",!1,o),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Gs("baseRetryDelayMs",5e3,o),this.Za=Gs("retryDelaySeedMs",1e4,o),this.Ta=Gs("forwardChannelMaxRetries",2,o),this.va=Gs("forwardChannelRequestTimeoutMs",2e4,o),this.ma=o&&o.xmlHttpFactory||void 0,this.Ua=o&&o.Rb||void 0,this.Aa=o&&o.useFetchStreams||!1,this.O=void 0,this.L=o&&o.supportsCrossDomainXhr||!1,this.M="",this.h=new Ud(o&&o.concurrentRequestLimit),this.Ba=new VE,this.S=o&&o.fastHandshake||!1,this.R=o&&o.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=o&&o.Pb||!1,o&&o.ua&&this.j.ua(),o&&o.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&o&&o.detectBufferingProxy||!1,this.ia=void 0,o&&o.longPollingTimeout&&o.longPollingTimeout>0&&(this.ia=o.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=af.prototype,n.ka=8,n.I=1,n.connect=function(o,B,h,p){Ye(0),this.W=o,this.H=B||{},h&&p!==void 0&&(this.H.OSID=h,this.H.OAID=p),this.F=this.X,this.J=pf(this,null,this.W),ga(this)};function Uu(o){if(of(o),o.I==3){var B=o.V++,h=Nt(o.J);if(_e(h,"SID",o.M),_e(h,"RID",B),_e(h,"TYPE","terminate"),Us(o,h),B=new dn(o,o.j,B),B.M=2,B.A=ha(Nt(h)),h=!1,a.navigator&&a.navigator.sendBeacon)try{h=a.navigator.sendBeacon(B.A.toString(),"")}catch{}!h&&a.Image&&(new Image().src=B.A,h=!0),h||(B.g=Cf(B.j,null),B.g.ea(B.A)),B.F=Date.now(),Ba(B)}ff(o)}function Ca(o){o.g&&(qu(o),o.g.cancel(),o.g=null)}function of(o){Ca(o),o.v&&(a.clearTimeout(o.v),o.v=null),ma(o),o.h.cancel(),o.m&&(typeof o.m=="number"&&a.clearTimeout(o.m),o.m=null)}function ga(o){if(!Hd(o.h)&&!o.m){o.m=!0;var B=o.Ea;ut||E(),ye||(ut(),ye=!0),I.add(B,o),o.D=0}}function HE(o,B){return qd(o.h)>=o.h.j-(o.m?1:0)?!1:o.m?(o.i=B.G.concat(o.i),!0):o.I==1||o.I==2||o.D>=(o.Sa?0:o.Ta)?!1:(o.m=Ss(l(o.Ea,o,B),df(o,o.D)),o.D++,!0)}n.Ea=function(o){if(this.m)if(this.m=null,this.I==1){if(!o){this.V=Math.floor(Math.random()*1e5),o=this.V++;let b=new dn(this,this.j,o),P=this.o;if(this.U&&(P?(P=md(P),_d(P,this.U)):P=this.U),this.u!==null||this.R||(b.J=P,P=null),this.S)e:{for(var B=0,h=0;h<this.i.length;h++){t:{var p=this.i[h];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(B+=p,B>4096){B=h;break e}if(B===4096||h===this.i.length-1){B=h+1;break e}}B=1e3}else B=1e3;B=cf(this,b,B),h=Nt(this.J),_e(h,"RID",o),_e(h,"CVER",22),this.G&&_e(h,"X-HTTP-Session-Id",this.G),Us(this,h),P&&(this.R?B="headers="+Ps(ef(P))+"&"+B:this.u&&Gu(h,this.u,P)),Vu(this.h,b),this.Ra&&_e(h,"TYPE","init"),this.S?(_e(h,"$req",B),_e(h,"SID","null"),b.U=!0,Fu(b,h,null)):Fu(b,h,B),this.I=2}}else this.I==3&&(o?uf(this,o):this.i.length==0||Hd(this.h)||uf(this))};function uf(o,B){var h;B?h=B.l:h=o.V++;let p=Nt(o.J);_e(p,"SID",o.M),_e(p,"RID",h),_e(p,"AID",o.K),Us(o,p),o.u&&o.o&&Gu(p,o.u,o.o),h=new dn(o,o.j,h,o.D+1),o.u===null&&(h.J=o.o),B&&(o.i=B.G.concat(o.i)),B=cf(o,h,1e3),h.H=Math.round(o.va*.5)+Math.round(o.va*.5*Math.random()),Vu(o.h,h),Fu(h,p,B)}function Us(o,B){o.H&&aa(o.H,function(h,p){_e(B,p,h)}),o.l&&aa({},function(h,p){_e(B,p,h)})}function cf(o,B,h){h=Math.min(o.i.length,h);let p=o.l?l(o.l.Ka,o.l,o):null;e:{var b=o.i;let ne=-1;for(;;){let Fe=["count="+h];ne==-1?h>0?(ne=b[0].g,Fe.push("ofs="+ne)):ne=0:Fe.push("ofs="+ne);let de=!0;for(let Me=0;Me<h;Me++){var P=b[Me].g;let Ot=b[Me].map;if(P-=ne,P<0)ne=Math.max(0,b[Me].g-100),de=!1;else try{P="req"+P+"_"||"";try{var q=Ot instanceof Map?Ot:Object.entries(Ot);for(let[Kn,gn]of q){let mn=gn;u(gn)&&(mn=Su(gn)),Fe.push(P+Kn+"="+encodeURIComponent(mn))}}catch(Kn){throw Fe.push(P+"type="+encodeURIComponent("_badmap")),Kn}}catch{p&&p(Ot)}}if(de){q=Fe.join("&");break e}}q=void 0}return o=o.i.splice(0,h),B.G=o,q}function lf(o){if(!o.g&&!o.v){o.Y=1;var B=o.Da;ut||E(),ye||(ut(),ye=!0),I.add(B,o),o.A=0}}function Hu(o){return o.g||o.v||o.A>=3?!1:(o.Y++,o.v=Ss(l(o.Da,o),df(o,o.A)),o.A++,!0)}n.Da=function(){if(this.v=null,Bf(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var o=4*this.T;this.j.info("BP detection timer enabled: "+o),this.B=Ss(l(this.Wa,this),o)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Ye(10),Ca(this),Bf(this))};function qu(o){o.B!=null&&(a.clearTimeout(o.B),o.B=null)}function Bf(o){o.g=new dn(o,o.j,"rpc",o.Y),o.u===null&&(o.g.J=o.o),o.g.P=0;var B=Nt(o.na);_e(B,"RID","rpc"),_e(B,"SID",o.M),_e(B,"AID",o.K),_e(B,"CI",o.F?"0":"1"),!o.F&&o.ia&&_e(B,"TO",o.ia),_e(B,"TYPE","xmlhttp"),Us(o,B),o.u&&o.o&&Gu(B,o.u,o.o),o.O&&(o.g.H=o.O);var h=o.g;o=o.ba,h.M=1,h.A=ha(Nt(B)),h.u=null,h.R=!0,Vd(h,o)}n.Va=function(){this.C!=null&&(this.C=null,Ca(this),Hu(this),Ye(19))};function ma(o){o.C!=null&&(a.clearTimeout(o.C),o.C=null)}function hf(o,B){var h=null;if(o.g==B){ma(o),qu(o),o.g=null;var p=2}else if(ku(o.h,B))h=B.G,jd(o.h,B),p=1;else return;if(o.I!=0){if(B.o)if(p==1){h=B.u?B.u.length:0,B=Date.now()-B.F;var b=o.D;p=ca(),$e(p,new Od(p,h)),ga(o)}else lf(o);else if(b=B.m,b==3||b==0&&B.X>0||!(p==1&&HE(o,B)||p==2&&Hu(o)))switch(h&&h.length>0&&(B=o.h,B.i=B.i.concat(h)),b){case 1:jn(o,5);break;case 4:jn(o,10);break;case 3:jn(o,6);break;default:jn(o,2)}}}function df(o,B){let h=o.Qa+Math.floor(Math.random()*o.Za);return o.isActive()||(h*=2),h*B}function jn(o,B){if(o.j.info("Error code "+B),B==2){var h=l(o.bb,o),p=o.Ua;let b=!p;p=new fn(p||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||Os(p,"https"),ha(p),b?xE(p.toString(),h):kE(p.toString(),h)}else Ye(2);o.I=0,o.l&&o.l.pa(B),ff(o),of(o)}n.bb=function(o){o?(this.j.info("Successfully pinged google.com"),Ye(2)):(this.j.info("Failed to ping google.com"),Ye(1))};function ff(o){if(o.I=0,o.ja=[],o.l){let B=Kd(o.h);(B.length!=0||o.i.length!=0)&&(R(o.ja,B),R(o.ja,o.i),o.h.i.length=0,v(o.i),o.i.length=0),o.l.oa()}}function pf(o,B,h){var p=h instanceof fn?Nt(h):new fn(h);if(p.g!="")B&&(p.g=B+"."+p.g),Fs(p,p.u);else{var b=a.location;p=b.protocol,B=B?B+"."+b.hostname:b.hostname,b=+b.port;let P=new fn(null);p&&Os(P,p),B&&(P.g=B),b&&Fs(P,b),h&&(P.h=h),p=P}return h=o.G,B=o.wa,h&&B&&_e(p,h,B),_e(p,"VER",o.ka),Us(o,p),p}function Cf(o,B,h){if(B&&!o.L)throw Error("Can't create secondary domain capable XhrIo object.");return B=o.Aa&&!o.ma?new we(new da({ab:h})):new we(o.ma),B.Fa(o.L),B}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function gf(){}n=gf.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function Ea(){}Ea.prototype.g=function(o,B){return new ct(o,B)};function ct(o,B){Ke.call(this),this.g=new af(B),this.l=o,this.h=B&&B.messageUrlParams||null,o=B&&B.messageHeaders||null,B&&B.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=B&&B.initMessageHeaders||null,B&&B.messageContentType&&(o?o["X-WebChannel-Content-Type"]=B.messageContentType:o={"X-WebChannel-Content-Type":B.messageContentType}),B&&B.sa&&(o?o["X-WebChannel-Client-Profile"]=B.sa:o={"X-WebChannel-Client-Profile":B.sa}),this.g.U=o,(o=B&&B.Qb)&&!_(o)&&(this.g.u=o),this.A=B&&B.supportsCrossDomainXhr||!1,this.v=B&&B.sendRawJson||!1,(B=B&&B.httpSessionIdParam)&&!_(B)&&(this.g.G=B,o=this.h,o!==null&&B in o&&(o=this.h,B in o&&delete o[B])),this.j=new Pr(this)}f(ct,Ke),ct.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},ct.prototype.close=function(){Uu(this.g)},ct.prototype.o=function(o){var B=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.v&&(h={},h.__data__=Su(o),o=h);B.i.push(new bE(B.Ya++,o)),B.I==3&&ga(B)},ct.prototype.N=function(){this.g.l=null,delete this.j,Uu(this.g),delete this.g,ct.Z.N.call(this)};function mf(o){Ru.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var B=o.__sm__;if(B){e:{for(let h in B){o=h;break e}o=void 0}(this.i=o)&&(o=this.i,B=B!==null&&o in B?B[o]:void 0),this.data=B}else this.data=o}f(mf,Ru);function Ef(){Pu.call(this),this.status=1}f(Ef,Pu);function Pr(o){this.g=o}f(Pr,gf),Pr.prototype.ra=function(){$e(this.g,"a")},Pr.prototype.qa=function(o){$e(this.g,new mf(o))},Pr.prototype.pa=function(o){$e(this.g,new Ef)},Pr.prototype.oa=function(){$e(this.g,"b")},Ea.prototype.createWebChannel=Ea.prototype.g,ct.prototype.send=ct.prototype.o,ct.prototype.open=ct.prototype.m,ct.prototype.close=ct.prototype.close,Jc=$t.createWebChannelTransport=function(){return new Ea},Kc=$t.getStatEventTarget=function(){return ca()},jc=$t.Event=Un,ao=$t.Stat={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},la.NO_ERROR=0,la.TIMEOUT=8,la.HTTP_ERROR=6,li=$t.ErrorCode=la,Fd.COMPLETE="complete",qc=$t.EventType=Fd,Sd.EventType=vs,vs.OPEN="a",vs.CLOSE="b",vs.ERROR="c",vs.MESSAGE="d",Ke.prototype.listen=Ke.prototype.J,Gr=$t.WebChannel=Sd,Xy=$t.FetchXmlHttpFactory=da,we.prototype.listenOnce=we.prototype.K,we.prototype.getLastError=we.prototype.Ha,we.prototype.getLastErrorCode=we.prototype.ya,we.prototype.getStatus=we.prototype.ca,we.prototype.getResponseJson=we.prototype.La,we.prototype.getResponseText=we.prototype.la,we.prototype.send=we.prototype.ea,we.prototype.setWithCredentials=we.prototype.Fa,Hc=$t.XhrIo=we}).apply(typeof io<"u"?io:typeof self<"u"?self:typeof window<"u"?window:{});/*!
* re2js
* RE2JS is the JavaScript port of RE2, a regular expression engine that provides linear time matching
*
* @version v2.8.6
* @author Oleksii Vasyliev
* @homepage https://github.com/le0pard/re2js#readme
* @repository github:le0pard/re2js
* @license MIT
*/var pe,L=(pe=class{},M(pe,"FOLD_CASE",1),M(pe,"LITERAL",2),M(pe,"CLASS_NL",4),M(pe,"DOT_NL",8),M(pe,"ONE_LINE",16),M(pe,"NON_GREEDY",32),M(pe,"PERL_X",64),M(pe,"UNICODE_GROUPS",128),M(pe,"WAS_DOLLAR",256),M(pe,"LOOKBEHIND",512),M(pe,"MATCH_NL",pe.CLASS_NL|pe.DOT_NL),M(pe,"PERL",pe.CLASS_NL|pe.ONE_LINE|pe.PERL_X|pe.UNICODE_GROUPS),M(pe,"POSIX",0),M(pe,"UNANCHORED",0),M(pe,"ANCHOR_START",1),M(pe,"ANCHOR_BOTH",2),pe),vt={CASE_INSENSITIVE:1,DOTALL:2,MULTILINE:4,DISABLE_UNICODE_GROUPS:8,LONGEST_MATCH:16,LOOKBEHINDS:512},hi=128,Yc=new Int32Array(hi),Xc=new Int32Array(hi),oo=65535;for(let n=0;n<hi;n++)n>=97&&n<=122?Yc[n]=n-32:Yc[n]=n,n>=65&&n<=90?Xc[n]=n+32:Xc[n]=n;var $c,N=($c=class{static toUpperCase(n){if(n<hi)return Yc[n];let e=String.fromCodePoint(n).toUpperCase(),t=e.codePointAt(0)>oo?2:1;if(e.length>t)return n;let r=String.fromCodePoint(e.codePointAt(0)).toLowerCase(),s=r.codePointAt(0)>oo?2:1;return r.length>s||r.codePointAt(0)!==n?n:e.codePointAt(0)}static toLowerCase(n){if(n<hi)return Xc[n];let e=String.fromCodePoint(n).toLowerCase(),t=e.codePointAt(0)>oo?2:1;if(e.length>t)return n;let r=String.fromCodePoint(e.codePointAt(0)).toUpperCase(),s=r.codePointAt(0)>oo?2:1;return r.length>s||r.codePointAt(0)!==n?n:e.codePointAt(0)}},M($c,"CODES",new Map([["\x07",7],["\b",8],["	",9],[`
`,10],["\v",11],["\f",12],["\r",13],[" ",32],['"',34],["$",36],["&",38],["'",39],["(",40],[")",41],["*",42],["+",43],["-",45],[".",46],["0",48],["1",49],["2",50],["3",51],["4",52],["5",53],["6",54],["7",55],["8",56],["9",57],[":",58],["<",60],[">",62],["?",63],["A",65],["B",66],["C",67],["F",70],["P",80],["Q",81],["U",85],["Z",90],["[",91],["\\",92],["]",93],["^",94],["_",95],["`",96],["a",97],["b",98],["f",102],["i",105],["m",109],["n",110],["r",114],["s",115],["t",116],["v",118],["x",120],["z",122],["{",123],["|",124],["}",125]])),$c),C=class{constructor(n,e=!1){this.data=n,this.isStride1=e,this.SIZE=e?2:3}getLo(n){return this.data[n*this.SIZE]}getHi(n){return this.data[n*this.SIZE+1]}getStride(n){return this.isStride1?1:this.data[n*this.SIZE+2]}get length(){return this.data.length/this.SIZE}},SC=new Uint8Array(256);for(let n=0,e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-";n<64;n++)SC[e.charCodeAt(n)]=n;var RC=n=>{let e=[],t=0,r=0;for(let s=0;s<n.length;s++){let i=SC[n.charCodeAt(s)];t|=(i&31)<<r,(i&32)===0?(e.push(t),t=0,r=0):r+=5}return e},g=(n,e)=>{let t=RC(n),r=e?t.length/2:t.length/3,s=new Uint32Array(r*3),i=0,a=0;for(let u=0;u<r;u++)i+=t[a++],s[u*3]=i,i+=t[a++],s[u*3+1]=i,s[u*3+2]=e?1:t[a++];return s},Zy=n=>{let e=RC(n),t=new Map,r=0;for(let s=0;s<e.length;s+=2){r+=e[s];let i=e[s+1],a=i>>>1^-(i&1);t.set(r,r+a)}return t},uo=class{constructor(n){this.initializer=n,this.cache=new Map}has(n){return n in this.initializer}get(n){if(this.cache.has(n))return this.cache.get(n);let e=this.initializer[n],t=e?e():null;return this.cache.set(n,t),t}},bn,st=(bn=class{static get CASE_ORBIT(){return this._CASE_ORBIT||(this._CASE_ORBIT=Zy("rCgCIgCY+rQI4QiCuuBLgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCCgCBgCBgCBgCBgCBgCBgCB+7OB-BB-BB-BB-BB-BBskQB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BC-BB-BB-BB-BB-BB-BB-BByHBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBDCBBBCBBBCBBCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBxHBCBBBCBBBCBBB3SBmMBkNBCBBBCBBB8MBCBBB6MB6MBCBBC+EB0MB2MBCBBB6MB+MBiGBmNBiNBCBBBmKBikzCBmNBqNBkIBsNBCBBBCBBBCBBB0NBCBBB0NDCBBB0NBCBBByNByNBCBBBCBBB2NBCBBDCBBCwDFCBCBDBCBCBDBCBCBDBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBB9EBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBCCBCBDBCBBBhGBvDBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBjICCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBH2iVBCBBBlKBwiVB+jVB+jVBCBBBlMBqEBuEBCBBBCBBBCBBBCBBBCBBB+hVB4hVB8hVBjNB7MC5MB5MCzMC1MB+0yCE5MB20yCC9MBu2yCBwyyCBo0yCChNBlNBo0yCBu-UBi0yCDlNC6-UBpNDrNIu+UDzNCm0yCBzNE0yyCBzNBpEBxNBxNBtEG1NLqxyCBkxyCnFoFrBCBBBCBBDCBBEkIBkIBkICoHHsCCqCBqCBqCCgEC+DB+DBmkOBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCC+BBgCBgCBgCBgCBgCBgCBgCBgCBrCBpCBpCBpCBmjOB-BB8BB-BB-BBgEB-BB-BByBBqgOBsDB-BBtwBB-BB-BB-BBsBBgDBCB-BB-BB-BBeB-BB-BB61OB-BB-BB-DB9DB9DBQB7DBmCE9CBrDBPBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBrFB-EBOBnHB3FB-FCCBBBNBCBBCjIBjIBjIBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCB-BB-BB8kMB-BB6kMB-BB-BB-BB-BB-BB-BB-BB-BB-BBokMB-BB-BBkkMBkkMB-BB-BB-BB-BB-BB-BB-BB4jMB-BB-BB-BB-BB-BB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EBCBBBCBoiMBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBJCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBeBCBBBCBBBCBBBCBBBCBBBCBBBCBBBdBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBCgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDL-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-C64CgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOCgmOGgmODg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FDg8FBg8FBg8FhVg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBQBQBQBQBQBQDPBPBPBPBPBPjkC7mMB5mMBnmMBjmMBCBlmMB3lMBpiMBk8kCBCBBG-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FD-7FB-7FB-7F6FoglCEsuHRwjlCyDCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCB0DBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBG1DD97OCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQDPBPBPBPBPBPDQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQDPBPBPBPBPBPEQCQCQCQCPCPCPCPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPB0EB0EBsFBsFBsFBsFBoGBoGBgIBgIBgHBgHB8HB8HDQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQCSFPBPBzEBzEBRCxnOFSFrFBrFBrFBrFBREQBQClkOFPBPBnGBnGFQBQCljOCODPBPB-GB-GBNHSF-HB-HB7HB7HBRqJ53OE9tQBrmQH4Bc3BSgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBfBfBfBfBfBfBfBfBfBfBfBfBfBfBfBfECBByZ0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzB34BgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CBCBBBt-UBruHBt+UB1iVBviVBCBBBCBBBCBBB3hVB5-UB9hVB7hVCCBBCCBBI9jVB9jVBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBICBBBCBBECBBN-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOC-lOG-lOzoeCBBBCBBBCBBBCBBBCBBBCBl8kCBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBTCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBnECBBBCBBBCBBBCBBBCBBBCBBBCBBDCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBKCBBBCBBBnglCBCBBBCBBBCBBBCBBBCBBECBBBvyyCDCBBBCBBBgDCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBn0yCB90yCB10yCBh0yCBn0yCCjxyCBzyyCBpxyCBg6BBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBB-CBl0yCBvjlCBCBBBCBBBt2yCBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBhkzCZCBB9a-5Bd-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCm6TCBB7gBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCH-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BmlBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvChDwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCFvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvC1DuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCCuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCCuCBuCBuCBuCBuCBuCBuCCuCBuCCtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCCtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCCtCBtCBtCBtCBtCBtCBtCCtCBtCk2BgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEO-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-D+CgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCL-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-B74CgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BhrVgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BhB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BD1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BtxekCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjC")),this._CASE_ORBIT}static get Print(){return this._Print||(this._Print=new C(g("hB9CBjBLBCpWBDFBFGBCCCBSBCsMBClBBDxBBDCBC2BBJaBFFBSVBC-FBCvBBD6BBDkDBP6BBDwBBDOBCbBDCCBJBGfBIqCBCgFBCHBDBBDVBCGBCEEBCBDIBDBBDDBJFFBCCBDBDYBDCBCFBFBBDVBCGBCBBCBBCBBDCCBDBFBBDCBEIIBCBCIIBPBLCBCIBCCBCVBCGBCBBCEBDJBCCBCCBDQQBCBDLBIGBCCBCHBDBBDVBCGBCBBCEBDIBDBBDCBICBFBBCEBDRBLBBCFBECBCDBEBBCCCBEEBEEBBBELBFEBECBCDBDHHPUBGMBCCBCWBCPBDIBCCBCDBIBBCCBCBBDDBDJBIVBCCBCWBCJBCEBDIBCCBCDBIBBGCBCDBDJBCCBNMBCCBCyBBCCBCFBFPBDZBCCBCRBEXBCIBCDDBFBEFFBEBCCCBGBHJBDCBN5BBFcBmBBBCCCBDBCXBCCCBVBDEBCCCBFBCJBDDBhBnCBCjBBFmBBCjBBCOBCMBmBlGBCGGD4LBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBDfBEZBH1CBDFBD-TBCbBE4CBIVBKXBKTBNMBCCBCBBN9CBDJBHJBHNBCKBH4CBIqBBGlCBLeBCLBFLBFEEBoBBDEBMrBBFZBHKBE9BBDgCBCcBDKBHJBHNBDtBBDLBVsCBClFBJ7BBEOBE9BBGqBBDKBJqBBG1QBDFBDlBBDFBDHBCGCBdBD0BBCOBCNBDFBCSBDCBCIBSXBJuBBSBBDaBCMBEhBBPgBBQrEBF5UBXKBWz4BBD9LBGsBBCGGD3BBIBBPXBKGBCGBCGBCGBCGBCGBCGBCGBC9DBjBZBC4CBN1GBbPBC+BBC1CBDmDBGqBBC9CBC1CBKvBBCszcBE2BBK7KBV3FBJ8GBV7BBEJBH3BBJlCBJLBHzDBMdBEtCBCKBFgBBC2BBKNBDJBDmDBZbBLFBDFBDFBKGBCGBC7BBF9DBDJBHj9KBNWBFwBBloItLBDpDBnBGBNEBGZBCEBCCCBCCBCCBoUBhBpBBHyBBCSBCDBFEBCmEBF9FBEFBDFBDFBDCBEGBCGBOBBDLBCZBCSBCBBCOBDNBjB6DBGCBFsBBE3CBCMBEwBwBBsBBjEcBEwBBQbBFjBBKdBGqBBGdBCkBBFNBrB9EBDJBHjBBFjBBFnBBJzBBMLBCOBCGBCBBCKBCOBCGBCBBEzBBN2JBKVBLHBZFBCpBBCIBmCFBDCCBqBBCBBEDDBVBCnCBJIBxBSBCBBGgBBEaBGaBnB3BBFTBDxBBCBBGHBCCBCcBDCBFJBIIBI-BBhBmBBFLBK1BBEcBDaBGZBIDBNGBxCoCB4ByBBOyBBItBBJJBHlBBEcBJBBxGeBCpBBCCBDBBRFBJIBiBtBBJpBBXZBnBbBVWBKtCBFjBBK9BBCEBOYBIJBH0BBCRBJmBBK-CBCTBMRBCuBB-BGBCCCBCBCOBCKBH6BBGJBHDBCHBDBBDVBCGBCBBCEBCJBDBBDCBDHHGGBDGBEEBMJBCDDClBBCJBCDDCDBCJBCBBJBBe7CBCEBfnCBJJBnF1BBDlBBjBkCBMJBHMBU5BBHJBHTBdaBDOBFWB6F7BBlDyCBNHBDDDBGBCBBCdBCBBDLBKJBnCHBDtBBDKBcnCBJyCBOoCBIJB3CHB5ChBBPJBHIBCsBBCNBLcBEfBDVBCNBqCGBCBBCrBBECCBCCBHBJJBHFBCBBCkBBCBBCFBIJBHrBBFJB3HYBIQBCoBBEcB2CQQBwBBO6cBnDuDBCEBMjGBtyCiDBOvhBBRVBL68DBGmSB61G5BBn2B4RBIeBCJBFwCBCJBHdBDFBLlCBLJBCGBCUBGSBxN5BBnG6CBGYBDYBtBqCBF4BBIQBhCEBMGBK1mHBqBfBiDyDB+vIDBCGBCBBCiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBDDBh7D8HBEzNBHWBQQBQtBBDWBKzDB9B1HBLmBBDpCBJvDBWlCB7DTBNTBN2CBKYBoE0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDjJBD9VBQEBCOBxiBeBHFB2GGBCQBDGBCBBCEBG9BBiBxDxDBrBBENBDJBFBBhKeBS5BBGxOxOBoBB3GqBBFhGhGBdBCVBJBBhHGBCDBCBBCOBCkGBDPBqBrCBFJBFBByYjCBtC8BBjGDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1BBBvIrBBFjDBNOBDOBCOBCkBBLtFB5BcBOrBBFIBIBBPFB7E4eBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBBPIBoB3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBCmDBmgB-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIBnkzVvHB",!1))),this._Print}static get Upper(){return this.CATEGORIES.get("Lu")}},M(bn,"_CASE_ORBIT",null),M(bn,"_Print",null),M(bn,"CATEGORIES",new uo({C:()=>new C(g("AfBgDgBBOrWrWBHHBCBICCVuMuMnBBBzBBBE4B4BBGBcDBHQBXhGhGxBBB8BBBmDNB8BBByBBBQddBCCMEBhBGBsCiFiFJBBDBBXIICCBFBBKBBDBBFHBCDBDGGBaaBEEHDBDBBXIIDGDBCCGDBDBBECBCGBFCCBFBSJBEKKEXXIDDGBBLIEBCCBNBFBBNGBIEEJBBDBBXIIDGGBKKBDDBEEBFBEDBDGGBTTBIBDHHBBBEFFBBBDCCDCBDCBECBNDBGCBEFFBCCBEBCNBWEBOEEYRRBKKEFFBFBDEEDBBFBBLGBXEEYLLGBBKEEFGBDEBEFFBLLELBOEE0BEEHDBRBBbEETCBZKKCBBICBCDBHCCJFBLBBELB7BDBekBBDCCGZZCYYBGGCIILBBFfBpClBlBBCBoBlBlBQOOBjBBnGCCBDBCBB6LFFBIICFFBqBqBFBBiBFFBIICFFBQQ6BFFBkCkCBhBhBBBBbFB3CBBHBB+UCB6CGBXIBZIBVLBOEEDLB-CBBLFBLFBPMMBEB6CGBsBEBnCJBgBNNBCBNDBCCBrBBBGKBtBDBbFBMCB-BBBiCeeBMMBEBLFBPBBvBBBNTBuCnFnFBGB9BCBQCB-BEBsBBBMHBsBEB3QBBHBBnBBBHBBJGCgBBB2BQQPBBHUUBEEKMMBDBbEByBPBDBBcOOBBBjBNBiBOBtEDB7UVBMUB14BBB-LEBuBCCBDBCBB5BGBDNBZIBI4BI-DhBBb6C6CBKB3GZBxC3C3CBoDoDBDBsB-C-C3CIBxBuzcuzcBBB4BIB9KTB5FHB+GTB9BCBLFB5BHBnCHBNFB1DKBfCBvCMMBCBiB4B4BBHBPBBLBBoDXBdJBHBBHBBHIBIII9BDB-DBBLFBl9KLBYDByBjoIBvLBBrDlBBILBGEBbGGCGDrUfBrBFB0BUUFDBGoEoEBCB-FCBHBBHBBHBBECBIIIBLBDBBNbbUDDQBBPhBB8DEBEDBuBCB5COOBBBCuBBvBhEBeCByBOBdDBlBIBfEBsBEBfmBmBBCBPpBB-EBBLFBlBDBlBDBpBHB1BKBNQQIDDMQQIDDBBB1BLB4JIBXJBJXBHrBrBKkCBHBBCtBtBDCBCBBYpCpCBGBKvBBUDDBDBiBCBcEBclBB5BDBVBBzBDDBDBJEEeBBEDBLGBKGBhCfBoBDBNIB3BCBeBBcEBbGBFLBIvCBqC2BB0BMB0BGBvBHBLFBnBCBeHBDvGBgBrBrBEBBDPBHHBKgBBvBHBrBVBblBBdTBYIBvCDBlBIB-BGGBLBaGBLFB2BTTBGBoBIBhDVVBJBTwBwBB8BBICCFQQMFB8BEBLFBFJJBDDBXXIDDGLLBDDBEEBCCBEBCEBIBBICBGKBLCCBCCnBLLCBBCFFLDDBGBDcB9CGGBcBpCHBLlFB3BBBnBhBBmCKBLFBOSB7BFBLFBVbBcBBQDBY4FB9BjDB0CLBJBBCBBJDDfDDBNNBHBLlCBJBBvBBBMaBpCHB0CMBqCGBL1CBJ3CBjBNBLFBKuBuBPJBeCBhBBBXPPBnCBIDDtBCBCDDKHBLFBHDDmBDDHGBLFBtBDBL1HBaGBSqBqBBBBe0CBCOBzBMB8clDBwDGGBJBlGryCBkDMBxhBPBXJB88DEBoS41GB7Bl2BB6RGBgBLLBCByCLLBEBfBBHJBnCJBLIIWEBUvNB7BlGB8CEBaBBarBBsCDB6BGBS-BBGKBIIB3mHoBBhBgDB0D8vIBFIIDkJkJBNBCcBEBBCNBFHBtMjoCBsDEBOCBKGBLBBF-6DB+HCB1NFBYOBSOBvBBBYIB1D7BB3HJBoBBBrCHBxDUBnC5DBVLBVLB4CIBamEB2CoCoCDBBCBBDBBFNNCIIiCFFBJJIddFGGCCBI1K1KBlJlJB-V-VBNBGQQBuiBBgBFBH0GBISSBIIDGGBDB-BgBBCvDBuBCBPBBLDBD-JBgBQB7BEBCvOBrB1GBsBDBC-FBgBXXBGBD-GBIFFDQQmGBBRoBBtCDBLDBDwYBlCrCB+BhGBFccDCCBCCLFFCCCBEBCDBCECEDDCBBCICDCCBFFIKFCLLSEBEGGSzBBDtIBtBDBlDLBQBBQQQmBJBvF3BBeMBtBDBKGBDNBH5EB6eCBSCBOCB7GFBNDBCOBNDB5BHBLFBpBHBfBBNDBDNBKmBB5KHBPBBOCBMCB6BCCBCBRBBNDBLGB0EoDoDBjgBBh3pBfB-oEBBv0FBBypHOBvThtCB-QhvBBs6EEBrpIlkzVBxHvw-FB",!1)),Cc:()=>new C(g("AfgDgB",!0)),Cf:()=>new C(g("tFzqBzqBBEBXhGhGyBhMhMBxCxCs5D9-B9-BBDBbEByBEBCJBw03B6H6HBBBimEQQj7IPBhjiBDBwmFHBn0rYffB+CB",!1)),Cn:()=>new C(g("4bBBHDBICCVuMuMnBBBzBBBE4B4BBGBcDBHKBvI9B9BBmDmDBMB8BBByBBBQddBCCMEBjBEBuHJJBDDBXXICCBBBFBBKBBDBBFHBCDBDGGBaaBEEHDBDBBXIIDGDBCCGDBDBBECBCGBFCCBFBSJBEKKEXXIDDGBBLIEBCCBNBFBBNGBIEEJBBDBBXIIDGGBKKBDDBEEBFBEDBDGGBTTBIBDHHBBBEFFBBBDCCDCBDCBECBNDBGCBEFFBCCBEBCNBWEBOEEYRRBKKEFFBFBDEEDBBFBBLGBXEEYLLGBBKEEFGBDEBEFFBLLELBOEE0BEEHDBRBBbEETCBZKKCBBICBCDBHCCJFBLBBELB7BDBekBBDCCGZZCYYBGGCIILBBFfBpClBlBBCBoBlBlBQOOBjBBnGCCBDBCBB6LFFBIICFFBqBqBFBBiBFFBIICFFBQQ6BFFBkCkCBhBhBBBBbFB3CBBHBB+UCB6CGBXIBZIBVLBOEEDLB-CBBLFBLFBbFB6CGBsBEBnCJBgBNNBCBNDBCCBrBBBGKBtBDBbFBMCB-BBBiCeeBMMBEBLFBPBBvBBBNTBuCnFnFBGB9BCBQCB-BEBsBBBMHBsBEB3QBBHBBnBBBHBBJGCgBBB2BQQPBBHUUBEEKmDmDNBBcOOBBBjBNBiBOBtEDB7UVBMUB14BBB-LEBuBCCBDBCBB5BGBDNBZIBI4BI-DhBBb6C6CBKB3GZBxC3C3CBoDoDBDBsB-C-C3CIBxBuzcuzcBBB4BIB9KTB5FHB+GTB9BCBLFB5BHBnCHBNFB1DKBfCBvCMMBCBiB4B4BBHBPBBLBBoDXBdJBHBBHBBHIBIII9BDB-DBBLFBl9KLBYDByBDBvzIBBrDlBBILBGEBbGGCGDrUfBrBFB0BUUFDBGoEoEBCC-FCBHBBHBBHBBECBIIIBIBGBBNbbUDDQBBPhBB8DEBEDBuBCB5COOBBBCuBBvBhEBeCByBOBdDBlBIBfEBsBEBfmBmBBCBPpBB-EBBLFBlBDBlBDBpBHB1BKBNQQIDDMQQIDDBBB1BLB4JIBXJBJXBHrBrBKkCBHBBCtBtBDCBCBBYpCpCBGBKvBBUDDBDBiBCBcEBclBB5BDBVBBzBDDBDBJEEeBBEDBLGBKGBhCfBoBDBNIB3BCBeBBcEBbGBFLBIvCBqC2BB0BMB0BGBvBHBLFBnBCBeHBDvGBgBrBrBEBBDPBHHBKgBBvBHBrBVBblBBdTBYIBvCDBlBIBlCJBCBBaGBLFB2BTTBGBoBIBhDVVBJBTwBwBB8BBICCFQQMFB8BEBLFBFJJBDDBXXIDDGLLBDDBEEBCCBEBCEBIBBICBGKBLCCBCCnBLLCBBCFFLDDBGBDcB9CGGBcBpCHBLlFB3BBBnBhBBmCKBLFBOSB7BFBLFBVbBcBBQDBY4FB9BjDB0CLBJBBCBBJDDfDDBNNBHBLlCBJBBvBBBMaBpCHB0CMBqCGBL1CBJ3CBjBNBLFBKuBuBPJBeCBhBBBXPPBnCBIDDtBCBCDDKHBLFBHDDmBDDHGBLFBtBDBL1HBaGBSqBqBBBBe0CBCOBzBMB8clDBwDGGBJBlGryCBkDMB3iBJB88DEBoS41GB7Bl2BB6RGBgBLLBCByCLLBEBfBBHJBnCJBLIIWEBUvNB7BlGB8CEBaBBarBBsCDB6BGBS-BBGKBIIB3mHoBBhBgDB0D8vIBFIIDkJkJBNBCcBEBBCNBFHBtMjoCBsDEBOCBKGBLBBJ76DB+HCB1NFBYOBSOBvBBBYIB1D7BB3HJBoBBBjGUBnC5DBVLBVLB4CIBamEB2CoCoCDBBCBBDBBFNNCIIiCFFBJJIddFGGCCBI1K1KBlJlJB-V-VBNBGQQBuiBBgBFBH0GBISSBIIDGGBDB-BgBBCvDBuBCBPBBLDBD-JBgBQB7BEBCvOBrB1GBsBDBC-FBgBXXBGBD-GBIFFDQQmGBBRoBBtCDBLDBDwYBlCrCB+BhGBFccDCCBCCLFFCCCBEBCDBCECEDDCBBCICDCCBFFIKFCLLSEBEGGSzBBDtIBtBDBlDLBQBBQQQmBJBvF3BBeMBtBDBKGBDNBH5EB6eCBSCBOCB7GFBNDBCOBNDB5BHBLFBpBHBfBBNDBDNBKmBB5KHBPBBOCBMCB6BCCBCBRBBNDBLGB0EoDoDBjgBBh3pBfB-oEBBv0FBBypHOBvThtCB-QhvBBs6EEBrpIm8yVBCdBhD-DBxHvw-BB---BBB---BBB",!1)),Co:()=>new C(g("gg4B-nGh4hc9--BD9--B",!0)),Cs:()=>new C(g("gg2B--B",!0)),L:()=>new C(g("hCZBHZBwBLLFGGBVBCeBCpOBFLBPEBICCiEEBCBBDDBCHHCCBCCCBSBCyCBCqEBJlFBClBBDHHBnBBoCaBFDBuBqBBkBBBCiDBCQQBIIBLLBBBDRRCdBe4CBMZZBfBKBBFGGBUBFKKEYYBXBIKBGXBCGBRpBB7B1BBETTIJBQPBFHBDBBDVBCGBCEEBCBERROBBCCBPBBLJJBEBFBBDVBCGBCBBCBBCBBgBDBCUUBBBRIBCCBCVBCGBCBBCEBETTQBBYMMBGBDBBDVBCGBCBBCEBEffBCCBBBQSSCFBECBCDBEBBCCCBEEBEEBBBELBX1B1BBGBCCBCWBCPBEbbBBBCBBDBBfFFBGBCCBCWBCJBCEBEffBBBCBBQBBSIBCCBCoBBDRRGCBJCBZFBGRBEXBCIBCDDBFB7BvBBCBBNGB7BBBCCCBDBCXBCCCBIBCBBKDDBDBCWWBCBhBgCgCBGBCjBBcEB0DqBBVRRBEBFDBEEEBIIBBBFMBNSSBkBBCGGDqBBCsKBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBmBPBR1CBDFBErTBDQBCZBGqCBHHBIRBOSBPRBPMBCCBQzBBkBFFkC4CBIEBDhBBCGGBkCBLeByBdBDEBMrBBFZB3BWBK0BBzC+C+CBtBBSHB3BdBOBBLrBBbjBBqBCBLjBBDKBGqBBDCBqBDBCFBCBBEGGB+FBhC1IBDFBDlBBDFBDHBCGCBdBD0BBCGBCEEBBBCGBEDBDFBFMBGCBCGB1DOORMBmDFFDJBCEEBDBHGCBCBCKBDDBGEBF1B1BB8zC8zCBjHBHDBEBBNlBBCGGD3BBIRRBVBKGBCGBCGBCGBCGBCGBCGBCGBxC2O2OBrBrBBDBGBBF1CBHCBC5CBCDBGqBBC9CBSfBxBPBhQ-tGBhCs0VBkCtBBDsIBEPBLBBVuBBReBDlCByBIBDmDBDxCBVQBCCBCDBCWBezBBPxBB-BFBECCBMMBaBLWBacBIuBBdRRBDBCJBLEBCoBBYCBCHBVWBEEEBwBBCEEBDDBDBDCCZCBDKBICBNFBDFBDFBKGBCGBCqBBCNBHyDBej9KBNWBFwBBloItLBDpDBnBGBNEBGCCBIBCMBCEBCCCBCCBCCBqDBiBqLBT-BBD1BBpBLB1DEBCmEBlBZBHZBM4CBEFBDFBDFBDCBkBLBCZBCSBCBBCOBDNBjB6DBmMcBEwBBwBfBOTBCHBHlBBLdBDjBBFHBxB9EBTjBBFjBBFnBBJzBBNKBCOBCGBCBBCKBCOBCGBCBBEzBBN2JBKVBLHBZFBCpBBCIBmCFBDCCBqBBCBBEDDBVBLWBKeBiCSBCBBLVBLZBHZBnB3BBHBBhCQQBCBCCBCcBrBcBEcBkBHBCbBc1BBLVBLSBORBvDoCB4ByBBOyBBOjBBnBbBKWB7HpBBHBBRFB5BcBLJJBUBrBRBvBUBcWBN0BB6BBBDOOBrBBhBYBbjBBeDDJiBBENNBuBBPDBWCCkBRBCYBUBBgCGBCCCBCBCOBCJBIuBBnBHBDBBDVBCGBCBBCEBETTNEBfJBCDDClBBCaaCtBtBBzBBTDBVCBfvBBVBBC5F5FBtBBqBDBlBvBBV8B8BBpBBOoCoCBZBmBGB6FrBB1D-BBgBHBDDDBGBCBBCXBQCC-CHBDmBBRCCdLLBmBBIWWMtBBUTTBnCBoGgBBgBIBCkBBSyByBBcBxDGBCBBClBBWaaBEBCBBCfBPYYBqBBlISBQCCBLBChBB9DwCwCB4cBnHjGBtyCgDBQvhBBSFBa68DBGmSB61GdBj3B4RBIeBSuCBSdBTvBBRDBgBUBGSBxNsBB0G-BBhBYBDYBtBqCBGjCjCBLBhCBBCPPBNNB0mHBqBfBiDyDB+vIDBCGBCBBCiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBn7F0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDYBCYBCeBCYBCeBCYBCeBCYBCeBCYBCHB15BeBHFBmI9BBzEsBBLGBRiKiKBcBTrBBlPbBlHdBDwGwGBdBCCBCBBCGBDEBKBBhHGBCDBCBBCOBCkGB8BjCBI1lB1lBBCBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQBlqE-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB",!1)),LC:()=>new C(g("hCZBHZB7BLLBVBCeBCiGBCDBFvGBDZBhGDBDBBECBCHHCCBCCCBSBCyCBCqEBJlFBClBBKoBB44ClBBCGGDqBBDCBhV1CBDFBjkCKBGqBBDCBhCrBBgCMBChBBmD1IBDFBDlBBDFBDHBCGCBdBD0BBCGBCEEBBBCGBEDBDFBFMBGCBCGBmIFFDJBCEEBDBHGCBCBCFBFDDBCBGEBF1B1BB8zC8zCB6DBDmDBHDBEBBNlBBCGGzoetBBTbBnEtCBCWBEDBCsCBZBBE2Z2ZBpBBGIBIvCBh6TGBNEBqgBZBHZBmlBvCBhDjBBFjBB1DKBCOBCGBCBBCKBCOBCGBCBBk2ByBBOyBB+CVBLVB74C-BBhrV-BBhBYBDYBtpZ0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDYBCYBCeBCYBCeBCYBCeBCYBCeBCYBCHB15BJBCTBHFB2uCjCB",!1)),Ll:()=>new C(g("hDZB7BqBqBBWBCHBC2BCBQCBuBCDECBBBDCCDEEBFFDEEBBBDDDCCCDCCBCCDEECDDBDDBBBHGDCOCBSCBDDCEEC4BCBFBDDDBCCFICBjCBDZBiGCCEEEBBBTccBhBBCBBECBCWCBDBCGDB0B0BBuBBCgBCK0BCDMCBgDCxBoBBo6CqBBDCB5XFBjkCIBC2D2DBqBBgCMBChBBnD0ECBHBCgDCBHBJFBLHBJHBJFBLHBJHBJNBDHBJHBJHBJEBCBBHEEBBBCBBJDBDBBJHBLCBCBBzIEEBEEcKFDBBJDBF2B2Bs1CvBBCEEBGCFCCBCCBEBGiDCBIICFFNlBBCGG0oesBCUaCoEMCBBBC+BCBGBCCCDICFCCDCCBBBCSCGGGCMCFCCDOCbEE2ZqBBGIBIvCBh6TGBNEBqhBZBumBnBBpEjBB8EKBCOBCGBCBBk4ByBB+DVB75CfBhsVfB8BYBnqZZBbGBCRBbZBbDBCCCBFBCKBbZBbZBbZBbZBbZBbZBbZBbZBbbBdYBCFBbYBCFBbYBCFBbYBCFBbYBCFBC15B15BBIBCTBHFB4vChBB",!1)),Lm:()=>new C(g("wVRBFLBPEBICCmEGG-OnHnHlFBBuIBBFgBgBKEEhFoFoF1mBgEgE2R72B72BsDkTkTxOFBvF+BBOjBjBBjBByVOORMBg-CBByHgGgG2OsBsBBDBGiDiDB+C+CBBB34bjnBjnBBEBvIzDzDdBB6DIBxCYYpDDBEBB2OXXqEtDtDWBBoDDBKngVngVuBBBh-BFBCpBBCIB0sBhBhB2K04D04DnrTDB9PCBpBBBnRMBhCBBCPPB9-P9-PBCBCGBCBByhM9BBqGGBud0Q0QsSAB",!1)),Lo:()=>new C(g("qFQQhIFFBCBxGBB7ZaBFDBuBfBCJBkBBBCiDBCZZBLLBBBDRRCdBe4CBMZZBfBWVBrBYBIKBGXBCGBRoBB8B1BBETTIJBROBFHBDBBDVBCGBCEEBCBERROBBCCBPBBLJJBEBFBBDVBCGBCBBCBBCBBgBDBCUUBBBRIBCCBCVBCGBCBBCEBETTQBBYMMBGBDBBDVBCGBCBBCEBEffBCCBBBQSSCFBECBCDBEBBCCCBEEBEEBBBELBX1B1BBGBCCBCWBCPBEbbBBBCBBDBBfFFBGBCCBCWBCJBCEBEffBBBCBBQBBSIBCCBCoBBDRRGCBJCBZFBGRBEXBCIBCDDBFB7BvBBCBBNFB8BBBCCCBDBCXBCCCBIBCBBKDDBDBYDBhBgCgCBGBCjBBcEB0DqBBVRRBEBFDBEEEBIIBBBFMBNyDyDBnKBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBmBPByDrTBDQBCZBGqCBHHBIRBOSBPRBPMBCCBQzBBpBkCkCBhBBC0BBIEBDhBBCGGBkCBLeByBdBDEBMrBBFZB3BWBK0BBxFuBBSHB3BdBOBBLrBBbjBBqBCBLdByDDBCFBCBBE7hB7hBBCB4-C3BBZWBKGBCGBCGBCGBCGBCGBCGBCGBoR2B2BF1CBJCCB4CBFGGBpBBC9CBSfBxBPBhQ-tGBhC0wUBC2jBBkCnBBJrIBFPBLBBjCyByBBkCBqFoDoDEGBCCBCDBCWBezBBPxBB-BFBECCBMMBaBLWBacBIuBBuBEBDIBLEBCoBBYCBCHBVPBCFBEEEBwBBCEEBDDBDBDCCZBBEKBIPPBEBDFBDFBKGBCGByEiBBej9KBNWBFwBBloItLBDpDBkCCCBIBCMBCEBCCCBCCBCCBqDBiBqLBT-BBD1BBpBLB1DEBCmEBqDJBCsBBDeBEFBDFBDFBDCBkBLBCZBCSBCBBCOBDNBjB6DBmMcBEwBBwBfBOTBCHBHlBBLdBDjBBFHBhEtCBjDnBBJzBB9CzBBN2JBKVBLHB5EFBDCCBqBBCBBEDDBVBLWBKeBiCSBCBBLVBLZBHZBnB3BBHBBhCQQBCBCCBCcBrBcBEcBkBHBCbBc1BBLVBLSBORBvDoCB4FjBBnBDBCxJxJBoBBHBBRCBCBB5BcBLJJBUBrBRBvBUBcWBN0BB6BBBDOOBrBBhBYBbjBBeDDJiBBENNBuBBPDBWCCkBRBCYBUBBgCGBCCCBCBCOBCJBIuBBnBHBDBBDVBCGBCBBCEBETTNEBfJBCDDClBBCaaCtBtBBzBBTDBVCBfvBBVBBC5F5FBtBBqBDBlBvBBV8B8BBpBBOoCoCBZBmBGB6FrBB0GHBDDDBGBCBBCXBQCC-CHBDmBBRCCdLLBmBBIWWMtBBUTTBnCBoGgBBgBIBCkBBSyByBBcBxDGBCBBClBBWaaBEBCBBCfBPYYBnBBCBBlISBQCCBLBChBB9DwCwCB4cBnHjGBtyCgDBQvhBBSFBa68DBGmSB61GdBj3B4RBIeBSuCBSdBTvBB0BUBGSB0NnBB2MqCBGwFwFB0mHBqBfBiDyDBuwIiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBxzI2P2PBrBBiBiKiKBcBTrBBlPaBmHdBDwGwGBdBCCBCBBCGBDEBKiHiHBFBCDBCBBCOBCkGB8pBDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQBlqE-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB",!1)),Lt:()=>new C(g("lOGDnB2sH2sHBGBJHBJHBNQQwBAB",!1)),Lu:()=>new C(g("hCZBmDWBCGBiB2BCDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIJDCMCDQCDDDCCBC4BCIBBCBBDCCBCBCGCiJCCEJJHCCBBBCCCBCCBPBCIBkBDDBBBEWCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBpCDBNDBNDBNEBMDBnIFFECBDCBDEEBDBHGCBCBDDBLBBG+B+B9zCvBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoqZZBbZBbZBbCCBGDBDDBCBCHBbZBbBBCDBDHBCGBcBBCDBCEBCEEBFBcZBbZBbZBbZBbZBbZBfYBiBYBiBYBiBYBiBYBiB2pE2pEBgBB",!1)),M:()=>new C(g("gYvDB0IGBoIsBBCCCBCCBCCpCKBxBUBRmDmDBFBDFBDBBCDBkBffBZB8CKB7BIBKZZBCBCIBCCBCEBsBCB8BIBrBXBCgBB3BCBCRBCGBLBBeCB5BCCBFBDBBDCBKLLBbbDCB5BCCBDBFBBDCBEffBEEMCB5BCCBGBCCBCCBVBBXFBCCB5BCCBFBDBBDCBICBLBBf8B8BBDBECBCDBKpBpBBDB4BCCBFBCCBCDBIBBMBBeCB5BCCBFBCCBCDBIBBMBBQNNBCB4BBBCGBCCBCDBKLLBeeBBBnCFFBEBCCCBGBTBB+BDDBFBNHBjDDDBHBMGBqCBBcECFBByBTBCBBGKBCjBBKlDlDBSBYDBFCBCCBDGBEDBOLBCLLBCBgWCBzdDBdCBeBBfBBhCfBKuBuBBBBC2D2DBjBjB3DLBFLB8GEB6BJBCcBDxBxBBsBBDLBVEBwBQBnBIBNCBfMB5BNBxBTB5ECBCUBFHHDCBnG-BBxWgBB--CCBuEhDhDBeBrRFBqDBB1udDBCJBhBBBxCBBxIEEFYYBDBF0C0CBzBzBBQBbRBOnBnBBGBaMBtBDBwBNBlBkCkCBMBNJJBuBuBBBBzBCCBBBDBBGBBCqBqBBDBGBBtHHBCBBx5TiXiXBOBRPBuejHjH2EEBn0BCBCBBGDBpBCBFmFmFB+R+RBCBiCEB+JBBuCFBnCKByBDB7DCB2BOBqBDDBLLBCBuBKBI+B+BBBBlBNBRBBtBNNBBBxBNBJDBCBB9CLBHDD+ELBWDB4BBBCGBDBBDCBKLLBDDBFBEEBkCIBCDDCDBCEBCPPBzCzCBQBYyCyCBSBsHGBDIBcBBzCQBrDMBmDOBhIOB2HFBCBBDDBCCCBuEuEBFBDGBEddBIBpBGBCDBJKKBJBvBPBnGHBoGHBCHBzCVBCNB7DFBECCBCCBFBCjCjCBDBCBBCEB8KDBKBBCxBxBBFBEEBYmnFmnFHOBpmLRBhuCEB8BGB5gBCCB1BBIDByCMMBslTslTBizEizEBsBBDWB-QEBEFBJHBDGBfDB1ECB89B2BBFxBBJPPXEBCOBxqBGBCQBDGBCBBCEBlDhFhFBFB4L+B+BBCB9PDB-HBB0HDDIBBG7O7OBFBuDGB29lYvHB",!1)),Mc:()=>new C(g("joC4B4BDCBJDBCBBzBBB7BCBHBBDBBLsBsB7BCBjC7B7BBBBJCCB2B2BB7B7BCHHBDDBLLnDBBCBBECBCCBLqBqBBBB+BDB+BBB7BCCBDBDBBCBBKBBdPPB7B7BBBBGCBCCBLrBrBBsCsCBBBHHBTBBrKBBgCsFsFBFFHDDBaaBLLBBBDGBWBBDFBDLLBBB5zBffiEIIBGBCBB7KDBDCBFBBCFBhHBB7BCCKCCBJJBEByExBxBGCCBDBCBB+BffFBBD9B9BDCBCEEBxBxBBGBJBBsFWW35EBB0-dBBD5C5CBzBzBBOBvEBBwBxBxBBFFBDDBBBvDBBDBBZuBuBCuDuDDBBGuHuHBCCBCCBCC0gZCCgEuBuBBBBFBB0DZZB8B8BxBCBKBBO+C+CBBBEBBCrFrFBBBgBBB7BBBCDBDBBDCBKLLB1C1CBBBIDDCDBCBBCmDmDBBBJBBErDrDBBBHCCBCBDuHuHBBBHDBDyDyDBBBJBBCuDuDCBBHoDoDCBBFmImIBBBK4H4HBEBCBBFDDCvEvEBBBJDBF1C1CeBB-BqGqGECCoGPPrDIID2G2GBDBFBBC-K-KBNNxBBBJBBCpvQpvQBBBlxD2BBpDBB0rYBBHFB",!1)),Me:()=>new C(g("okBBB1xF-wB-wBBCBCCBsshBCB",!1)),Mn:()=>new C(g("gYvDB0IEBqIsBBCCCBCCBCCpCKBxBUBRmDmDBFBDFBDBBCDBkBffBZB8CKB7BIBKZZBCBCIBCCBCEBsBCB8BIBrBXBCfB4BCCFHBFEEBFBLBBe7B7BFDBJVVBbbDBB6BFFBFFBDDBBBEffBEEMBB6BFFBDBCBBFVVBXXBEBC7B7BDCCBCBJIIBMMBff+BNNzBEE4BCCBBBGCBCDBIBBMBBe7B7BDHHGBBVBBdBB6BBBFDBJVVBeepCIIBBBC7C7CDGBNHBjDDDBHBMGBqCBBcEC4BNBCEBCBBGKBCjBBKnDnDBCBCFBCBBDBBaBBFCBRDBODDBHHQgWgWBBBzdCBeBBfBBfBBhCBBCGBJDDBJBKuBuBBBBC2D2DBjBjB3DCBFBBKHHBBB8GBBD7B7BCGBCCCDHBHJBDxBxBBMBCeBDLBVDBxBCCBDBCGGpBIBNBBhBDBDBBCCB5BCCBEECCB7BHBDBB5ECBCMBCGBFHHEBBnG-BBxWMBFEEBKB--CCBuEhDhDBeBrRDBsDBB1udFFBIBhBBBxCBBxIEEFaaBGG4EBBbRBOnBnBBGBaKBvBCBxBDDBCBDBBoBkCkCBEBDBBDBBNJJwB0B0BCCBDBBGBBCrBrBBJJvHDDFx5Tx5TiXPBRPBuejHjH2EEBn0BCBCBBGDBpBCBFmFmFB+R+RBCBiCEB+JBBuCFBnCKByBDB8D3B3BBNBqBDDBLLBBByBDBDBBI+B+BBBBlBEBCHB-BNNB1B1BBHBLDBDgDgDBBBDCCBHHD+E+EEHBWBB6BBBEmBmBBFBEEBnCFBOECPBB2CHBDCBCYY1CFBCFFBCCBvHvHBCBHBBCBBcBB2CHBDCCBrDrDCDDBEBCmDmDCDDBCBCEBkIIBCBBhIBBCFFxEDBDBBFhBhBBIBpBFBDDBJKKBEBDCBvBMBCBBnGCCBBBCqGqGBFBCFBCzCzCBUBDGBCBBCBB7DFBECCBCCBFBCpCpCBEEC8K8KBMMB1B1BBDBGCCYmnFmnFHOBpmLLBECBhuCEB8BGB5gBgCgCBCByC5lT5lTBizEizEBsBBDWBhRCBSHBDGBfDB1ECB89B2BBFxBBJPPXEBCOBxqBGBCQBDGBCBBCEBlDhFhFBFB4L+B+BBCB9PDB-HBB0HDDIBBG7O7OBFBuDGB29lYvHB",!1)),N:()=>new C(g("wBJB5DBBGDDBBBitBJBnEJBnGJB9MJB3DJBFFBtDJB3DJB3DJBDFBvDMB0DJBJGBoDJBpDGBISBuDJBhDJB3DJBnCTBtIJBnCJBwWTBybCBwHJBHJBXJBtJJBhEKBmFJBHJB3FJB3CJBnEJBHJB3gBEEBEBHJBnGyBBDEB3W7BBvCVB3TdBqrBqYqYaIBPCB4KDBrEJBfHBCOBhBJBoBOBh7cJB9FJBhKFB7EJBnBJBnGJBXJB3CJB3MJB34UJBuPsBBN4BBSBB2KaBlBDBeJJnEEBrGJBvdHBaGBoBIBsCEBXFBhFBBDPBDtBBhCIB1BBBfCBsCEBpDHBZHBqBGBrKFBxBJBHJB3IeB-EJBrBDBxDGBnEdBhEJB9BJBxEJBITB8HJB3KJB3DJB3LJBnDJBHTBtCLBlNSB+CJB3UJB3CcBkHJBnCJB3BJBnLJBnDUBshBuDBimPJBnpCJB3CJBnEJBCGBvQJBnIWB+KCB6nXJBnuBTBNTBtDYB2iBxBBhqCJBnNJB3PJB4HJBtWIBhEJB4Y6BBCCBCDBtCsBBCOBjeMBk3CJB",!1)),Nd:()=>new C(g("wBJnxBJnEJnGJ9MJ3DJ3DJ3DJ3DJ3DJ3DJ3DJ3DJ3DJhDJ3DJnCJ3IJnCJn6BJnBJtJJhEJnFJHJ3FJ3CJnEJHJnuiBJnVJnBJnGJXJ3CJ3MJ34UJnsBJnkCJHJ9YJhEJ9BJxEJ3IJ3KJ3DJ3LJnDJHTtCJnNJnDJ3UJ3CJ3HJnCJ3BJnLJ3uQJnpCJ3CJnEJ3QJ37XJ12CxBhqCJnNJ3PJ4HJ2aJ30EJ",!0)),Nl:()=>new C(g("u3FCBwzCiBBDDB-zDaaBHBPCBs1dJBxyW0BBtOJJnEEBrhIuDBm8SCB",!1)),No:()=>new C(g("yFBBGDDBBB2pCFB5LFB5DCBmEGB6GGBSIByNJB2hBTB0jBJBhP20B20BEFBHJBnGPBqB3W3WB6BBvCVB3TdBqrB1kB1kBBCBrEJBfHBCOBhBJBoBOBxrdFBymWsBBiCDBSBB2KaBlBDB1pBHBaGBoBIBsCEBXFBhFBBDPBDtBBhCIB1BBBfCBsCEBpDHBZHBqBGBrKFBhLeB-EJBrBDBxDGBnETB8LTBmqBBBvNIBobSB0aUBn8SGB-YWBqhZTBNTBtDYBvqFIBid6BBCCBCDBtCsBBCOBjeMB",!1)),P:()=>new C(g("hBCBCFBCDBLBBEBBbCBCccCkBkBGEELBBEEE-VJJzOFBqBBB0BCCDDDtBBBVBBCBBOCCBBBrCDBnDsBsBBMBqHCB3BOBgBmImIBLLtE5D5D6DnMnMNwLwL7CLLBpFpFBNBCmBmBBCBoCrCrCBDBFBBwDFBsFlTlTBHB4EuTuTtBBBvCCBoCBB+ECBCCBmBKB6JBB5GBBhEGBCFBhFBBLGBdCB9DDB8BEB-BBBhCHBM9Z9ZBWBJTBCMBCLBfBBPBB6TDBeBB+hBNBwCBBgBJB0MVBgCDBhBBB8XDBCBBxDwEwEBtBBCfBDLBkNCBFJBDLBRNNjD7C7CjgdBBuICBkDLL0DFB9LDB3CBBpBCBCyByBBwBwBiDMBRBB9DDB-DBBRBB6HzqUzqUBxGxGBIBXiBBCNBCFFCBB2ECBCFBCDBLBBEBBbCBCccCCCBFB7MCB9UxBxB-MoXoXoGgBgBxIIBnBxDxDBFBjCGB6CDByO-J-JjBlElEBDBtBDB+FGBuDBBCDB-DDBxBBBwCDBFOOCCB5CFBsDrJrJBCCBzDzDBDBLBBCpDpD7HWBqDCBdMBtCjEjEBBB9HpIpIBBB8E9C9CBGB0CCBCEB+CJB4GgDgDBDBrBBBmUBBrCMBwFxjBxjBBDB97CBB8zOBBmEiCiCBDBJpRpRBBBoJDBoK9lT9lTovHEB07C-a-aBAB",!1)),Pc:()=>new C(g("-Cg-Hg-HBUU-u3BBBZCBwHAB",!1)),Pd:()=>new C(g("tB9qB9qB0BiyDiyDmgBqgCqgCBEBiwDDDgBBBFdd-NUUwDxszBxszBBmBmBLqFqFhzD-J-J",!1)),Pe:()=>new C(g("pB0B0BgB+1D+1DC-6B-6BqtC4B4BQ7T7TCff-hBMCxChBhBCGC1MUChCCCiBmhBmhBCECtBGCtNICEGCDBB-ozB6G6GeOCESSCCCrF0B0BgBGD",!1)),Pf:()=>new C(g("7F+6H+6HEddpuDCCFDDQEE",!1)),Pi:()=>new C(g("rFt7Ht7HDBBDaapuDCCFDDQEE",!1)),Po:()=>new C(g("hBCBCCBDECBLLBEEBcclCGGPBBI-V-VJzOzOBEBqB3B3BDDDtBBBVBBCBBOCCBBBrCDBnDsBsBBMBqHCB3BOBgBmImIBLLtE5D5D6DnMnMNwLwL7CLLBpFpFBNBCxDxDrCEBFBBwDFBsFlTlTBHBmY9D9DBBBoCBB+ECBCCBmBFBCDB6JBB5GBBhEGBCFBhFBBLGBdCB9DDB8BEB-BBBhCHBMjajaBJJBGBJIBDDBDCBEKBCCCBIB7kDDBCBBxDwEwEBFFBBBDDDBHBCBBCDDBLLBDBCJBDDBCCCBLBDCBtNCB6B+F+FjgdBBuICBkDLL0DFB9LDB3CBBpBCBCyByBBwBwBiDMBRBB9DDB-DBBRBB6HlxUlxUBFBDXXVBBDDBECBCDBICBHCCB2E2EBBBCCBDECBLLBEEBcclBDDB7M7MBBB9UxBxB-MoXoXoGgBgBxIIBnBxDxDBFBjCGB6CDB0ZlElEBDBtBDB+FGBuDBBCDB-DDBxBBBwCDBFOOCCB5CFBsDrJrJBCCBzDzDBDBLBBCpDpD7HWBqDCBdMBtCjEjEBBB9HpIpIBBB8E9C9CBGB0CCBCEB+CJB4GgDgDBDBrBBBmUBBrCMBwFxjBxjBBDB97CBB8zOBBmEiCiCBDBJpRpRBBBoJDBoK9lT9lTovHEB07C-a-aBAB",!1)),Ps:()=>new C(g("oBzBzBgB-1D-1DC-6B-6B-rCEEnB4B4BQ7T7TCff-hBMCxChBhBCGC1MUChCCCiBmhBmhBCECaTTCECtNICEGCDipzBipzB4GeeCMCESSCCCrFzBzBgBEEDAB",!1)),S:()=>new C(g("kBHHRCBgBCCcCCkBEBCBBDCCBCBDEEfgBgBrODBNNBGGBCCCBPB2DPPBxDxDsErIrIBBB3DCBDDDBvGvGLUUB4H4HIBBpEqLqLBHHB2H2H-DjEjEBGBlEwGwGqBmGmGiGCBQCCBBBDFBVECmEHBCFBCBBGDBmGBBxXJB0WuLuLlL+E+EBgBBiLJBKIBhiBCCBBBMCBOCBOCBOBBmCOOoBCBOCBUhBB-BBBCDBCBBLCCBBBGFBCECFMMBFFBDBGDBC7B7BBFFB2LBFcBD+HBXKByCtCBXnTBtBwBBDeBLyMBX+BBFfBD1LBDpEBmHFBmLBBvBZBC4CBN1GBbPBFOOBNNWBBHBB8CBB0HBBFJBhBlBBKRRBdBMdBJQQBeBLmBBQ-JBhuG-BBx0V2BB6RWBKBBoDBB+EDBLDB+RCBiHPPB+9T+9TpEgBBuLPBhCBB3BHBtBDBjDCCBBBD7E7EHRRBBBgBCCcCCiEGBCGBOBB6JIB6BQBDCBCMBEwBwBBrBB7zBBBwSmWmWBiKiKBGBnjC2kC2kCBbBr6SDBG3qU3qUk7DvHBLCBEzNBHWBQQBgDzDB9B1HBLmBBD7BBGCBXBBIdBF8BBWhCBE7F7FB1CBrbaagBaagBaagBaagBaa9B-PB4BDBzBHBCNBCBBp2BwNwNttCEE+DiOiOBvIvIBqBBFjDBNOBDOBCOBCkBBYgFB5BcBOrBBFIBIBBPFB7E4eBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBBPIBoB3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBC7CBLAB",!1)),Sc:()=>new C(g("kB+D+DBCBqnB8D8DzPBBzPBBI2H2HoImSmS8sClmClmCBgBB37hBkuVkuVtD7E7E8GBBEBB3-HDB-4wBxtCxtC",!1)),Sk:()=>new C(g("+CCCoCHHFEEqQDBNNBGGBCCCBPB2DPPBjoBjoB15FCCBBBMCBOCBOCBOBB9kEBBkzdWBKBBoDBBxePPBniUniUBPB8bCCjF4g9B4g9BBDB",!1)),Sm:()=>new C(g("rBRRBBB+BCCuBFFmBgBgB-XwQwQBBB8xGOOoBCBOCBsEoBoBBDBHlClCBDBGBBFGDIgBgBBDDCgBgBBqIBhBBB7CffBXBpBFB2OKK3BHBwDxKxKBDBDeBLPBhIiEBX+BBFfBDhIBxBUBDFB9+zB5Z5ZCCBlFRRBBB+BCCkEHHBCBitDBBhrwBx+Bx+BagBgBagBgBagBgBagBgBat5Ft5FB-uC-uCBHB",!1)),So:()=>new C(g("mFDDFCCyerIrIBgEgEBvGvGLUUB4H4HkQ2L2LjEFBClElEwGqBqBoMCBQCCBBBDFBVECmEHBCFBCBBGDBmGBBxXJB0WzWzW+EhBBiLJBKIBksBBBCDBCBBLCCBHHBEBCECFMMBPPCBBC7B7BBKKBDBDDBCBBCBBCGBCeBDBBCCCBdBtIHBFTBDGBDwCBCdBanBBHnCBXKByCtCBX2FBCIBC1BBJuDBC3HBtBrBBhC-HBhQvBBWBBHmBBDpEBmHFBmLBBvBZBC4CBN1GBbPBFOOBNNWBBHBBxKBBFJBhBlBBKRRBdBMdBJQQBeBLmBBQ-JBhuG-BBx0V2BBibDBLBBC+R+RBBBqqUPBuLPBhCBB3BHBuBCBlPEEFBBOBB6JIB6BQBDCBCMBEwBwBBrBB7zBBBwSpgBpgBBGBnjC2kC2kCBGBFQBr6SDBG3qU3qUk7DvHBLCBEzNBHWBQPBhDzDB9B1HBLmBBD7BBGCBXBBIdBF8BBWhCBE7F7FB1CBqlB-PB4BDBzBHBCNBCBBp2B96C96CiEyWyWBqBBFjDBNOBDOBCOBCkBBYgFB5BcBOrBBFIBIBBPFB7E6HBG4WBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBB-B3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBC7CBLAB",!1)),Z:()=>new C(g("gBgEgEgvFgsCgsCBJBeBBGwBwBh9DAB",!1)),Zl:()=>new C(g("ohIA",!0)),Zp:()=>new C(g("phIA",!0)),Zs:()=>new C(g("gBgEgEgvFgsCgsCBJBlBwBwBh9DAB",!1)),ASCII_Hex_Digit:()=>new C(g("wBJIFbF",!0)),Alphabetic:()=>new C(g("hCZBHZBwBLLFGGBVBCeBCpOBFLBPEBICC3CeeBQBCBBDDBCHHCCBCCCBSBCyCBCqEBJlFBClBBDHHBnBBoBNBCCCBCCBCCJaBFDBeKBG3BBCGBPlDBCHBFHBFCBLCBDRRBuBBOkDBZgBBKBBFGGBWBDSBUYBIKBGXBCGBIJJBoBBLLBEGBHrCBCPBCCBFOBOSBCHBDBBDVBCGBCEEBCBEHBDBBDBBCJJFBBCEBNBBLFFBBBCFBFBBDVBCGBCBBCBBCBBFEBFBBDBBFIIBCBCSSBEBMCBCIBCCBCVBCGBCBBCEBEIBCCBCBBEQQBCBWDBFCBCHBDBBDVBCGBCBBCEBEHBDBBDBBKBBFBBCEBORRBCCBEBECBCDBEBBCCCBEEBEEBBBELBFEBECBCCBEHHpBMBCCBCWBCPBEHBCCBCCBJBBCCBCBBDDBdDBCHBCCBCWBCJBCEBEHBCCBCCBJBBGCBCDBOCBNMBCCBCoBBDHBCCBCCBCGGBCBIEBXFBCCBCRBEXBCIBCDDBFBJFBCCCBGBTBBO5BBGGBH0B0BBECBDBCXBCCCBRBCCBDEBCHHPDBhBgCgCBGBCjBBFSBFPBCjBBkC2BBCDDBDBR-BBLDBDlBBCGGDqBBCsKBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBmBPBR1CBDFBErTBDQBCZBGqCBEKBITBMUBNTBNMBCCBCBBNzBBDSBPFFkC4CBIqBBGlCBLeBCLBFIBYdBDEBMrBBFZB3BbBF+BBDTBzBYYBMMBBByBzBBCOBCHB0BpBBDDBLrBBCKBP2BBXCBLjBBDKBGqBBDCBqBDBCFBCBBEGGB+FBUhBBM1IBDFBDlBBDFBDHBCGCBdBD0BBCGBCEEBBBCGBEDBDFBFMBGCBCGB1DOORMBmDFFDJBCEEBDBHGCBCBCKBDDBGEBFSSBnBBuZzBB34BkHBHDBEBBNlBBCGGD3BBIRRBVBKGBCGBCGBCGBCGBCGBCGBCGBCfBwB2O2OBBBaIBIEBDEBF1CBHCBC5CBCDBGqBBC9CBSfBxBPBhQ-tGBhCs0VBkCtBBDsIBEPBLBBVuBBGHBEwDBoBIBDmDBDxCBVUBCgBBZzBBNjCBCtBtBBEBECCBBBLgBBGiBBOcBEyBBCLBQRRBOBLEBC2BBKNBTWBEkCBCCCZCBDPBDDBMFBDFBDFBKGBCGBCqBBCNBH6DBWj9KBNWBFwBBloItLBDpDBnBGBNEBGLBCMBCEBCCCBCCBCCBqDBiBqLBT-BBD1BBpBLB1DEBCmEBlBZBHZBM4CBEFBDFBDFBDCBkBLBCZBCSBCBBCOBDNBjB6DBmC0BBsIcBEwBBwBfBOdBGqBBGdBDjBBFHBCEBrB9EBTjBBFjBBFnBBJzBBNKBCOBCGBCBBCKBCOBCGBCBBEzBBN2JBKVBLHBZFBCpBBCIBmCFBDCCBqBBCBBEDDBVBLWBKeBiCSBCBBLVBLZBHZBnB3BBHBBhCDBCBBGHBCCBCcBrBcBEcBkBHBCbBc1BBLVBLSBORBvDoCB4ByBBOyBBOnBBjBbBEGGBVB7HpBBCBBEBBRFBzBCBEcBLJJBUBrBRBvBUBcWBKlCBsBEBL4BBKOOBXBYyBBSDBJiBBEKKB+BBCDBKBBLCCkBRBChBBDHHBCB-BGBCCCBCBCOBCJBI4BBYDBCHBDBBDVBCGBCBBCEBEHBDBBDBBEHHGGBdJBCDDClBBCJBCDDCDBCBBECCtBhCBCCBCDBVCBfhCBDBBC5F5FB0BBDGBaFBjB+BBCEE8B1BBDoCoCBZBDNBWGB6F4BBoD-BBgBHBDDDBGBCBBCdBCBBDBBDDB+CHBDtBBDFBCCCBccBxBBDJBSnCBGTTBnCBoDHB5CgBBgBIBCsBBCGBCyByBBcBDVBCNBqCGBCBBCrBBECCBCCBBBCDDBZZBEBCBBCkBBCBBCDBCYYBqBBlIWBKQBCoBBECBwDwCwCB4cBnDuDBSjGBtyCgDBQvhBBSFBa68DBGmSB61GuBBy2B4RBIeBSuCBSdBTvBBRDBgBUBGSBxNsBB0G-BBhBYBDYBtBqCBF4BBIQBhCBBCNNBFBK1mHBqBfBiDyDB+vIDBCGBCBBCiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBFi7Fi7FBzCBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDYBCYBCeBCYBCeBCYBCeBCYBCeBCYBCHB15BeBHFB2GGBCQBDGBCBBCEBG9BBiBxDxDBrBBLGBRiKiKBcBTrBBlPbBlHdBDwGwGBdBCVBJBBhHGBCDBCBBCOBCkGB8BjCBEEE1lBDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1TZBHZBHZB3zD-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB",!1)),Dash:()=>new C(g("tB9qB9qB0BiyDiyDmgBqgCqgCBEB+BoBoBQnMnMlgDDDgBBBFdd-NUUwDxszBxszBBmBmBLqFqFhzD-J-J",!1)),Emoji:()=>new C(g("jBHHGJBwDFFu8HNN5GXX7CFBQBBwLBBNnFnFaKBFCBoGoHoHBLLK7B7BBCBCEBKGDBDDFDDCBBDIEBJJBBBGCCGLBMBBDCCBCCTDDBTTBEBCCCBEEBGGDBBFBBMBBGBBDGGBECBVVBGGBEBCDBDFFDDDBEBCDDCCCHEEHLLBQQDFFCFFBBBCMMBxBxBBBBKeP1LBBwOCBUBB0BFF7mBNN6SCCrrvDrGrGhFBBNBBPDDBIBsCZBCBBYVVDIBWBBvFhBBDvDBDBBCCBDyCBDCBCmIBC+BBMFBCXBIBBDHBNDDBCBDFFBOOBDDJBBKGGBBBNCBJCBDCCFHHEHHB0CBxBlCBGHBDDBEJBECCBEEDJBkHLBF8I8IBtBBCJBC4FBxDMBEKBE4BBCFFBOBDLBFJB",!1)),Emoji_Component:()=>new C(g("jBHHGJB0+H2G2Gsp3B3+8B3+8BBYB8PEBxtBDBtzhY-CB",!1)),Emoji_Modifier:()=>new C(g("7-8DE",!0)),Emoji_Modifier_Base:()=>new C(g("9wJ8G8GRDB4jzD9B9BBBBDDDBBB2DBBDKBWSBEFFBBBCCBICCZqGqGBFFWFFBvFvFBBBEEB0CRRBBBKMMgSDDJHBHKKBIBDCB5B+B+BBCCBCCSCBCMBmHCBrBIB",!1)),Emoji_Presentation:()=>new C(g("64IBBuGDBEDDqQBBWBBzBLBsBUUOJJBSSBGGBJJGWWIBBCFFDIIFBBdkBkBCFFBBBC+B+BBBBZPP8aBB0BFFvlxDrGrG-FDDBIBsCZBCZZVDDBDBCCBWBBvFgBBNIBClCBCVBNqBBFEBNQBEEEBlCBCCCB5FBD+BBODBCXBTbbBOO3C0CBxBlCBHEEBBBDDBEDBMBBIIBkHLBF8I8IBtBBCJBC4FBxDMBEKBE4BBCFFBOBDLBFJB",!1)),Extended_Pictographic:()=>new C(g("pFFFu8HNN5GXX7CFBQBBwLBBNnFnFaKBFCBoGoHoHBLLK7B7BBCBCEBKGDBDDFDDCBBDIEBJJBBBGCCGLBMBBDCCBCCTDDBTTBEBCCCBEEBGGDBBFBBMBBGBBDGGBECBVVBGGBEBCDBDFFDDDBEBCDDCCCHEEHLLBQQDFFCFFBBBCMMBxBxBBBBKeP1LBBwOCBUBB0BFF7mBNN6SCCrrvDoBoBBCBlDLBQBBQPPBmBmBBIBxDBBNBBPDDBIBU3BBcOBLVVDIBCDBKWBH7FBDvDBDBBCCBDyCBDCBCDBG9HBC+BBMFBCXBIBBDHBNDDBCBDFFBOOBDDJBBKGGBBBNCBJCBDCCFHHEHHB0CBxBlCBGHBDQBECCBEBDMB7GlBBNDB5BHBLFBpBHBfBBNDBDNBKmBBNuBBCJBC4FB5CHBPxEBhI9fB",!1)),Hex_Digit:()=>new C(g("wBJIFbFq1-BJIFbF",!0)),Lowercase:()=>new C(g("hDZBwBLLFlBlBBWBCHBC2BCBQCBuBCDECBBBDCCDEEBFFDEEBBBDDDCCCDCCBCCDEECDDBDDBBBHGDCOCBSCBDDCEEC4BCBFBDDDBCCFICBjCBDiBBIBBfEBhDsBsBCEEDDBTccBhBBCBBECBCWCBDBCGDB0B0BBuBBCgBCK0BCDMCBgDCxBoBBo6CqBBCDB5XFBjkCIBC2D2DB+FBiC0ECBHBCgDCBHBJFBLHBJHBJFBLHBJHBJNBDHBJHBJHBJEBCBBHEEBBBCBBJDBDBBJHBLCBCBB6DOORMBuDEEBEEcKFDBBJDBFiBiBBOBFsasaBYBn6BvBBCEEBGCFCCBCCBGBEiDCBIICFFNlBBCGG0oesBCUaCBBBmEMCBBBC8BCBIBCCCDICFCCDCCBBBCSCGGGCMCFCCDOCWDBCCCBBB2ZqBBCNBHvCBh6TGBNEBqhBZBumBnBBpEjBB8EKBCOBCGBCBBkODDBBBCpBBCIBmoByBB+DVB75CfBhsVfB8BYBnqZZBbGBCRBbZBbDBCCCBFBCKBbZBbZBbZBbZBbZBbZBbZBbZBbbBdYBCFBbYBCFBbYBCFBbYBCFBbYBCFBC15B15BBIBCTBHFBmI9BB1lChBB",!1)),Math:()=>new C(g("rBRRBBBgBeeCuBuBFmBmBgB5W5WBBBDbbBDDBBBwQCBuwGccBBBMEEOPPBCBWEBMEBiCMBFEEBFFBDBTFFDJBCDDBEBHEEBDDBCCBBBCFBENBClClCBWBCFBCBBFBBFfBCHHBPPBqIBJDBVBB7CffBZBCZZMGB+NBBNJBFFBFBBDBBEEBPCCDFBMHBGBB6BCCeDBKCBxK-BBhI-PBxBUBDFB9+zB4Z4ZBEBCjFjFRCBeCCeCCkEHHBCBitDBBhrwBwoBwoBBzCBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDjJBDxBBhwFDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1BBB-uCIB",!1)),Quotation_Mark:()=>new C(g("iBFFkEQQ96HHBaBBowDqOqOBCBOCBixzBDB+FFF7CBB",!1)),Terminal_Punctuation:()=>new C(g("hBLLCMMBEE-ZJJiQ6B6BpCPPCCB1FsBsBBJBCsHsHB3B3BBEBCHBgBmImIB1nB1nBBtFtFFFB4JBB2YHBmY9D9DBBBoCBB+ECBEoBoBBCBDBB7JBBjLDBjFBBLBBCCBeCB8FEB-BBBldYYBKKBBBwlDCBzJOOFLLCBBEBBtNBB8ndBBuICBkHEB-LBB3CBBgD4E4EBBB0ECBgERRB6H6HnxUDDB6B6BBBBCDBqFLLCMMBEEiCDD7hBxBxBnkBoGoG3JBB5EFBlCFB6CDB5dEBtBDB+FGBxDDBgECBiEBBHRRB5C5CBDBtDrJrJB2D2DBBBNBBnLDBEOBqDBB6HCBmQCC8HBB4CBBFBB-MCBuBmUmUBrCrCBspBspBBDB6vRBBmEiCiCBBBLqRqRBoJoJBnwTnwTovHDB",!1)),Uppercase:()=>new C(g("hCZBmDWBCGBiB2BCDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIJDCMCDQCDDDCCBC4BCIBBCBBDCCBCBCGCiJCCEJJHCCBBBCCCBCCBPBCIBkBDDBBBEWCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBpCDBNDBNDBNEBMDBnIFFECBDCBDEEBDBHGCBCBDDBLBBGbbBOBUzZzZBYBx5BvBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoqZZBbZBbZBbCCBGDBDDBCBCHBbZBbBBCDBDHBCGBcBBCDBCEBCEEBFBcZBbZBbZBbZBbZBbZBfYBiBYBiBYBiBYBiBYBiB2pE2pEBgBBvgCZBHZBHZB",!1)),White_Space:()=>new C(g("JEBTlDlDbgvFgvFgsCKBeBBGwBwBh9DAB",!1))})),M(bn,"SCRIPTS",new uo({Adlam:()=>new C(g("go6DrCFJFB",!0)),Ahom:()=>new C(g("g4lCaDOFW",!0)),Anatolian_Hieroglyphs:()=>new C(g("ggxCmS",!0)),Arabic:()=>new C(g("gwBEBCFBCNBCCBCfBCJBMZBCrDBChBBxCvBBxHhBBGqCBCcBxy8BtPBDvEBhBPBxDEBCmEBk7DeBkCFBJIBiBFBh43BDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1BBB",!1)),Armenian:()=>new C(g("xpBlBDxBDCks9BE",!0)),Avestan:()=>new C(g("g4iC1BEG",!0)),Balinese:()=>new C(g("g4GsCCxB",!0)),Bamum:()=>new C(g("g1pB3CpowB4R",!0)),Bassa_Vah:()=>new C(g("w26CdDF",!0)),Batak:()=>new C(g("g+GzBJD",!0)),Bengali:()=>new C(g("gsCDBCHBDBBDVBCGBCEEBCBDIBDBBDDBJFFBCCBDBDYB",!1)),Beria_Erfe:()=>new C(g("g17CYDY",!0)),Bhaiksuki:()=>new C(g("ggnCICsBCNLc",!0)),Bopomofo:()=>new C(g("qXB6wLqBxDf",!0)),Brahmi:()=>new C(g("ggkCtCFjBKA",!0)),Braille:()=>new C(g("ggK-H",!0)),Buginese:()=>new C(g("gwGbDB",!0)),Buhid:()=>new C(g("g6FT",!0)),Canadian_Aboriginal:()=>new C(g("ggF-TxRlC7tgCP",!0)),Carian:()=>new C(g("g1gCwB",!0)),Caucasian_Albanian:()=>new C(g("wphCzBMA",!0)),Chakma:()=>new C(g("gokC0BCR",!0)),Cham:()=>new C(g("gwqB2BKNDJDD",!0)),Cherokee:()=>new C(g("g9E1CDFz7lBvC",!0)),Chorasmian:()=>new C(g("w9jCb",!0)),Common:()=>new C(g("AgCBbFBbuBBCOBCEBYgBgBiOmBBGEBDTB1DKKHCC+THHPEEhB9E9ElQiEiEB6mB6mB2MDBjJwvBwvBBBBoCBBsGBBCumBumBOIIBCBCFBCCBDmYmYBKBD2CBCKBEKBCOBShBB-BlBBCCBDFBCaBCQBqBCBF5UBXKBW-cBhIzTBDpEBhQ9CBzMUBCCCBXBQHBFDB8CBBE7C7CB0E0EBOBhBlBBKxBxBB+BBgBwCBwB5C5CBmFBhuG-BBhoWhBBnDCBmFJB1HhFhFsMPPBzuUzuUBxGxGBIBXiBBCSBCDB0ECCBeBbFBbKBLuBuBBhChCBFBCGBLEBjICBFsBBEIBxCMB0BsBBlHaBltuBDB96D8HBEzNBHWBQQBgDzDB9B1HBLmBBD9BBEQBJBBIdBF8BB2GTBNTBN2CBKYBoE0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDjJBDxBByjFjCBtC8BBjWrBBFjDBNOBDOBCOBCkBBLtFB5BZBCBBOrBBFIBIBBPFB7E4eBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBBPIBoB3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBCmDBnghYffB+CB",!1)),Coptic:()=>new C(g("ifNxkKzDGG",!0)),Cuneiform:()=>new C(g("ggoC5cnDuDCEMjG",!0)),Cypriot:()=>new C(g("ggiCFBDCCBqBBCBBEDD",!1)),Cypro_Minoan:()=>new C(g("w8rCiD",!0)),Cyrillic:()=>new C(g("ggBkEBDoFBx6FKBhFtCtCojEfBhie-CBv8VBBhw4B9BBiBAB",!1)),Deseret:()=>new C(g("gghCvC",!0)),Devanagari:()=>new C(g("goCwCFODZh7nBfhwcJ",!0)),Dives_Akuru:()=>new C(g("gomCGBDDDBGBCBBCdBCBBDLBKJB",!1)),Dogra:()=>new C(g("ggmC7B",!0)),Duployan:()=>new C(g("ggvDqDGMEIIJDD",!0)),Egyptian_Hieroglyphs:()=>new C(g("ggsC1iBL68D",!0)),Elbasan:()=>new C(g("gohCnB",!0)),Elymaic:()=>new C(g("g-jCW",!0)),Ethiopic:()=>new C(g("gwEoCBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBDfBEZBnvGWBKGBCGBCGBCGBCGBCGBCGBCGBjpfFBDFBDFBKGBCGBylvCGBCDBCBBCOB",!1)),Garay:()=>new C(g("gqjClBEcJB",!0)),Georgian:()=>new C(g("glElBBCGGDqBBCDBx8CqBBDCBhiElBBCGG",!1)),Glagolitic:()=>new C(g("ggL-Ch9sDGCQDGCBCE",!0)),Gothic:()=>new C(g("w5gCa",!0)),Grantha:()=>new C(g("g4kCDBCHBDBBDVBCGBCBBCEBDIBDBBDCBDHHGGBDGBEEB",!1)),Greek:()=>new C(g("wbDBCCBDDBCFFCCCBBBCCCBSBC+BBPPBnpGEBzBEBFEB1ChKhKBUBDFBDlBBDFBDHBCGCBdBD0BBCOBCNBDFBCSBDCBCIBoJ-xiB-xiB7uVuCBSgj0Bgj0BBkCB",!1)),Gujarati:()=>new C(g("h0CCBCIBCCBCVBCGBCBBCEBDJBCCBCCBDQQBCBDLBIGB",!1)),Gunjala_Gondi:()=>new C(g("grnCFCBCkBCBCFIJ",!0)),Gurmukhi:()=>new C(g("hwCCBCFBFBBDVBCGBCBBCBBCBBDCCBDBFBBDCBEIIBCBCIIBPB",!1)),Gurung_Khema:()=>new C(g("go4C5B",!0)),Han:()=>new C(g("g0LZBC4CBN1GBwBCCaIBPDBle-tGBhC-vUBhoWtLBDpDBpodBBNGBqgkB-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB",!1)),Hangul:()=>new C(g("goE-HvxHBiI9CyDeiCei3dckUj9KNWFwBl9JeEFDFDFDC",!0)),Hanifi_Rohingya:()=>new C(g("gojCnBJJ",!0)),Hanunoo:()=>new C(g("g5FU",!0)),Hatran:()=>new C(g("gniCSCBGE",!0)),Hebrew:()=>new C(g("xsB2BBJaBFFBpp9BZBCEBCCCBCCBCCBIB",!1)),Hiragana:()=>new C(g("hiM1CBHCBi7-C+IBTeeBBBulQAB",!1)),Imperial_Aramaic:()=>new C(g("giiCVCI",!0)),Inherited:()=>new C(g("gYvDB2IBBlOKBbhXhXBCB8qEtBBDLBlPCBCMBCGBFHHEBBnG-BBtQBBjGgBB65DDBsDBBmrzBPBRNBwejHjH7iEl+uBl+uBBsBBDWBhRCBSHBDGBfDBz6rYvHB",!1)),Inscriptional_Pahlavi:()=>new C(g("g7iCSGH",!0)),Inscriptional_Parthian:()=>new C(g("g6iCVDH",!0)),Javanese:()=>new C(g("gsqBtCDJFB",!0)),Kaithi:()=>new C(g("gkkCiCLA",!0)),Kannada:()=>new C(g("gkDMCCCWCJCEDICCCDIBGCCDDJCC",!0)),Katakana:()=>new C(g("hlM5CBDCBxHPBxGuBBC3CBvgzBJBCsBBzisBDBCGBCBBCgJgJBBBzBPPBCB",!1)),Kawi:()=>new C(g("g4nCQCoBEc",!0)),Kayah_Li:()=>new C(g("goqBtBCA",!0)),Kharoshthi:()=>new C(g("gwiCDCBGHCCCcDCFJII",!0)),Khitan_Small_Script:()=>new C(g("k-7C84G84GB0OBqBAB",!1)),Khmer:()=>new C(g("g8F9CDJHJnPf",!0)),Khojki:()=>new C(g("gwkCRCuB",!0)),Khudawadi:()=>new C(g("w1kC6BGJ",!0)),Kirat_Rai:()=>new C(g("gq7C5B",!0)),Lao:()=>new C(g("h0DBBCCCBDBCXBCCCBVBDEBCCCBFBCJBDDB",!1)),Latin:()=>new C(g("hCZBHZBwBQQGWBCeBCgOBoBEB8wGlBBHwBBGDBGMBClCBiC-HByLOORMBuEBBHccSoBB42CfBj1elDBExCBVOBxZqBBCIBCDB38TGB7gBZBHZBmhCFBCpBBCIBm61BeBHFB",!1)),Lepcha:()=>new C(g("ggH3BEOEC",!0)),Limbu:()=>new C(g("goGeBCLBFLBFEEBKB",!1)),Linear_A:()=>new C(g("gwhC2JKVLH",!0)),Linear_B:()=>new C(g("gggCLCZCSCBCODNjB6D",!0)),Lisu:()=>new C(g("wmpBvBx1eA",!0)),Lycian:()=>new C(g("g0gCc",!0)),Lydian:()=>new C(g("gpiCZGA",!0)),Mahajani:()=>new C(g("wqkCmB",!0)),Makasar:()=>new C(g("g3nCY",!0)),Malayalam:()=>new C(g("goDMCCCyBCCCFFPDZ",!0)),Mandaic:()=>new C(g("giCbDA",!0)),Manichaean:()=>new C(g("g2iCmBFL",!0)),Marchen:()=>new C(g("wjnCfDVCN",!0)),Masaram_Gondi:()=>new C(g("gonCGBCBBCrBBECCBCCBHBJJB",!1)),Medefaidrin:()=>new C(g("gy7C6C",!0)),Meetei_Mayek:()=>new C(g("g3qBWqGtBDJ",!0)),Mende_Kikakui:()=>new C(g("gg6DkGDP",!0)),Meroitic_Cursive:()=>new C(g("gtiCXFTDtB",!0)),Meroitic_Hieroglyphs:()=>new C(g("gsiCf",!0)),Miao:()=>new C(g("g47CqCF4BIQ",!0)),Modi:()=>new C(g("gwlCkCMJ",!0)),Mongolian:()=>new C(g("ggGBBDCCBSBH4CBIqBB2t-BMB",!1)),Mro:()=>new C(g("gy6CeCJFB",!0)),Multani:()=>new C(g("g0kCGBCCCBCBCOBCKB",!1)),Myanmar:()=>new C(g("ggE-EhqmBeiDfxibT",!0)),Nabataean:()=>new C(g("gkiCeJI",!0)),Nag_Mundari:()=>new C(g("wm5DpB",!0)),Nandinagari:()=>new C(g("gtmCHDtBDK",!0)),New_Tai_Lue:()=>new C(g("gsGrBFZHKEB",!0)),Newa:()=>new C(g("gglC7CCE",!0)),Nko:()=>new C(g("g+B6BDC",!0)),Nushu:()=>new C(g("h-7CvsQvsQBqMB",!1)),Nyiakeng_Puachue_Hmong:()=>new C(g("go4DsBENDJFB",!0)),Ogham:()=>new C(g("g0Fc",!0)),Ol_Chiki:()=>new C(g("wiHvB",!0)),Ol_Onal:()=>new C(g("wu5DqBFA",!0)),Old_Hungarian:()=>new C(g("gkjCyBOyBIF",!0)),Old_Italic:()=>new C(g("g4gCjBKC",!0)),Old_North_Arabian:()=>new C(g("g0iCf",!0)),Old_Permic:()=>new C(g("w6gCqB",!0)),Old_Persian:()=>new C(g("g9gCjBFN",!0)),Old_Sogdian:()=>new C(g("g4jCnB",!0)),Old_South_Arabian:()=>new C(g("gziCf",!0)),Old_Turkic:()=>new C(g("ggjCoC",!0)),Old_Uyghur:()=>new C(g("w7jCZ",!0)),Oriya:()=>new C(g("h4CCCHDBDVCGCBCEDIDBDCICFBCEDR",!0)),Osage:()=>new C(g("wlhCjBFjB",!0)),Osmanya:()=>new C(g("gkhCdDJ",!0)),Pahawh_Hmong:()=>new C(g("g46ClCLJCGCUGS",!0)),Palmyrene:()=>new C(g("gjiCf",!0)),Pau_Cin_Hau:()=>new C(g("g2mC4B",!0)),Phags_Pa:()=>new C(g("giqB3B",!0)),Phoenician:()=>new C(g("goiCbEA",!0)),Psalter_Pahlavi:()=>new C(g("g8iCRIDNG",!0)),Rejang:()=>new C(g("wpqBjBMA",!0)),Runic:()=>new C(g("g1FqCEK",!0)),Samaritan:()=>new C(g("ggCtBDO",!0)),Saurashtra:()=>new C(g("gkqBlCJL",!0)),Sharada:()=>new C(g("gskC-ChsCH",!0)),Shavian:()=>new C(g("wihCvB",!0)),Siddham:()=>new C(g("gslC1BDlB",!0)),Sidetic:()=>new C(g("gqiCZ",!0)),SignWriting:()=>new C(g("gg2DrUQECO",!0)),Sinhala:()=>new C(g("hsDCBCRBEXBCIBCDDBFBEFFBEBCCCBGBHJBDCBt-gCTB",!1)),Sogdian:()=>new C(g("w5jCpB",!0)),Sora_Sompeng:()=>new C(g("wmkCYIJ",!0)),Soyombo:()=>new C(g("wymCyC",!0)),Sundanese:()=>new C(g("g8G-BhIH",!0)),Sunuwar:()=>new C(g("g+mChBPJ",!0)),Syloti_Nagri:()=>new C(g("ggqBsB",!0)),Syriac:()=>new C(g("g4BNC7BDCxIK",!0)),Tagalog:()=>new C(g("g4FVKA",!0)),Tagbanwa:()=>new C(g("g7FMCCCB",!0)),Tai_Le:()=>new C(g("wqGdDE",!0)),Tai_Tham:()=>new C(g("gxG+BCcDKHJHN",!0)),Tai_Viet:()=>new C(g("g0qBiCZE",!0)),Tai_Yo:()=>new C(g("g25DeCVJB",!0)),Takri:()=>new C(g("g0lC5BHJ",!0)),Tamil:()=>new C(g("i8CBBCFBECBCDBEBBCCCBEEBEEBBBELBFEBECBCDBDHHPUBm+kCxBBOAB",!1)),Tangsa:()=>new C(g("wz6CuCCJ",!0)),Tangut:()=>new C(g("g-7CgBgBB+3GBhQeBiDyDB",!1)),Telugu:()=>new C(g("ggDMCCCWCPDICCCDIBCCCBDDDJII",!0)),Thaana:()=>new C(g("g8BxB",!0)),Thai:()=>new C(g("hwD5BGb",!0)),Tibetan:()=>new C(g("g4DnCCjBFmBCjBCOCGFB",!0)),Tifinagh:()=>new C(g("wpL3BIBPA",!0)),Tirhuta:()=>new C(g("gklCnCJJ",!0)),Todhri:()=>new C(g("guhCzB",!0)),Tolong_Siki:()=>new C(g("wtnCrBFJ",!0)),Toto:()=>new C(g("w04De",!0)),Tulu_Tigalari:()=>new C(g("g8kCJBCDDClBBCJBCDDCDBCJBCBBJBB",!1)),Ugaritic:()=>new C(g("g8gCdCA",!0)),Unknown:()=>new C(g("4bBBHDBICCVuMuMnBBBzBBBE4B4BBGBcDBHKBvI9B9BBmDmDBMB8BBByBBBQddBCCMEBjBEBuHJJBDDBXXICCBBBFBBKBBDBBFHBCDBDGGBaaBEEHDBDBBXIIDGDBCCGDBDBBECBCGBFCCBFBSJBEKKEXXIDDGBBLIEBCCBNBFBBNGBIEEJBBDBBXIIDGGBKKBDDBEEBFBEDBDGGBTTBIBDHHBBBEFFBBBDCCDCBDCBECBNDBGCBEFFBCCBEBCNBWEBOEEYRRBKKEFFBFBDEEDBBFBBLGBXEEYLLGBBKEEFGBDEBEFFBLLELBOEE0BEEHDBRBBbEETCBZKKCBBICBCDBHCCJFBLBBELB7BDBekBBDCCGZZCYYBGGCIILBBFfBpClBlBBCBoBlBlBQOOBjBBnGCCBDBCBB6LFFBIICFFBqBqBFBBiBFFBIICFFBQQ6BFFBkCkCBhBhBBBBbFB3CBBHBB+UCB6CGBXIBZIBVLBOEEDLB-CBBLFBLFBbFB6CGBsBEBnCJBgBNNBCBNDBCCBrBBBGKBtBDBbFBMCB-BBBiCeeBMMBEBLFBPBBvBBBNTBuCnFnFBGB9BCBQCB-BEBsBBBMHBsBEB3QBBHBBnBBBHBBJGCgBBB2BQQPBBHUUBEEKmDmDNBBcOOBBBjBNBiBOBtEDB7UVBMUB14BBB-LEBuBCCBDBCBB5BGBDNBZIBI4BI-DhBBb6C6CBKB3GZBxC3C3CBoDoDBDBsB-C-C3CIBxBuzcuzcBBB4BIB9KTB5FHB+GTB9BCBLFB5BHBnCHBNFB1DKBfCBvCMMBCBiB4B4BBHBPBBLBBoDXBdJBHBBHBBHIBIII9BDB-DBBLFBl9KLBYDByBjoIBvLBBrDlBBILBGEBbGGCGDrUfBrBFB0BUUFDBGoEoEBCC-FCBHBBHBBHBBECBIIIBIBGBBNbbUDDQBBPhBB8DEBEDBuBCB5COOBBBCuBBvBhEBeCByBOBdDBlBIBfEBsBEBfmBmBBCBPpBB-EBBLFBlBDBlBDBpBHB1BKBNQQIDDMQQIDDBBB1BLB4JIBXJBJXBHrBrBKkCBHBBCtBtBDCBCBBYpCpCBGBKvBBUDDBDBiBCBcEBclBB5BDBVBBzBDDBDBJEEeBBEDBLGBKGBhCfBoBDBNIB3BCBeBBcEBbGBFLBIvCBqC2BB0BMB0BGBvBHBLFBnBCBeHBDvGBgBrBrBEBBDPBHHBKgBBvBHBrBVBblBBdTBYIBvCDBlBIBlCJBCBBaGBLFB2BTTBGBoBIBhDVVBJBTwBwBB8BBICCFQQMFB8BEBLFBFJJBDDBXXIDDGLLBDDBEEBCCBEBCEBIBBICBGKBLCCBCCnBLLCBBCFFLDDBGBDcB9CGGBcBpCHBLlFB3BBBnBhBBmCKBLFBOSB7BFBLFBVbBcBBQDBY4FB9BjDB0CLBJBBCBBJDDfDDBNNBHBLlCBJBBvBBBMaBpCHB0CMBqCGBL1CBJ3CBjBNBLFBKuBuBPJBeCBhBBBXPPBnCBIDDtBCBCDDKHBLFBHDDmBDDHGBLFBtBDBL1HBaGBSqBqBBBBe0CBCOBzBMB8clDBwDGGBJBlGryCBkDMB3iBJB88DEBoS41GB7Bl2BB6RGBgBLLBCByCLLBEBfBBHJBnCJBLIIWEBUvNB7BlGB8CEBaBBarBBsCDB6BGBS-BBGKBIIB3mHoBBhBgDB0D8vIBFIIDkJkJBNBCcBEBBCNBFHBtMjoCBsDEBOCBKGBLBBJ76DB+HCB1NFBYOBSOBvBBBYIB1D7BB3HJBoBBBjGUBnC5DBVLBVLB4CIBamEB2CoCoCDBBCBBDBBFNNCIIiCFFBJJIddFGGCCBI1K1KBlJlJB-V-VBNBGQQBuiBBgBFBH0GBISSBIIDGGBDB-BgBBCvDBuBCBPBBLDBD-JBgBQB7BEBCvOBrB1GBsBDBC-FBgBXXBGBD-GBIFFDQQmGBBRoBBtCDBLDBDwYBlCrCB+BhGBFccDCCBCCLFFCCCBEBCDBCECEDDCBBCICDCCBFFIKFCLLSEBEGGSzBBDtIBtBDBlDLBQBBQQQmBJBvF3BBeMBtBDBKGBDNBH5EB6eCBSCBOCB7GFBNDBCOBNDB5BHBLFBpBHBfBBNDBDNBKmBB5KHBPBBOCBMCB6BCCBCBRBBNDBLGB0EoDoDBjgBBh3pBfB-oEBBv0FBBypHOBvThtCB-QhvBBs6EEBrpIm8yVBCdBhD-DBxHvw-FB",!1)),Vai:()=>new C(g("gopBrJ",!0)),Vithkuqi:()=>new C(g("wrhCKCOCGCBCKCOCGCB",!0)),Wancho:()=>new C(g("g24D5BGA",!0)),Warang_Citi:()=>new C(g("glmCyCNA",!0)),Yezidi:()=>new C(g("g0jCpBCCDB",!0)),Yi:()=>new C(g("ggoBskBE2B",!0)),Zanabazar_Square:()=>new C(g("gwmCnC",!0))})),M(bn,"FOLD_CATEGORIES",new uo({L:()=>new C(g("laA",!0)),LC:()=>new C(g("laA",!0)),Ll:()=>new C(g("hCZBmDWBCGBiBuBCEECDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIBBCBBCBBCOCDQCDBBCCCBBBC4BCIBBCBBDCCBCBCGC3HrBrBCEEJHHCCBCCCBCCBPBCIBkBJJCUCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBZHBJHBJHBJEBMEBMDBNEBMEBqJEEBHHxC9zC9zCBuBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoyehBB",!1)),Lt:()=>new C(g("kOCCBCCBCClBCCtsHHBJHBJHBMQQwBAB",!1)),Lu:()=>new C(g("hDZB7BqBqBBWBCHBCuBCEECDOCDsBCDECBBBDCCDEEGDDECBDDDCCCDFFDEECDDECCGBBCBBCBBCOCBSCDBBCEECkBCEQCJDDBCCFICBEBCBBCCCBEEBCCBCBCEBDCCBDDIDDCBBEFBGLLBnFnFsBCCEEEBBBvBDBCdBCBBECBCWCBDBCGD1BvBBCgBCK0BCDMCBgDCyBlBBq6CqBBDCB5XFBjkCIBCvHvHERRzD0ECGGGC8CCBHBJFBLHBJHBJFBMGCJHBJNBzBBBNSSBPPBEEpL2B2Bs1CvBBCEEBGCHDDLiDCJCCFNNBkBBCGG0oesBCUaCoEMCE8BCLCCDICFFFCBBDSCMOCFCCDOCb9a9advCBi8UZBumBnBBpEjBB8EKBCOBCGBCBBk4ByBB+DVB75CfBhsVfB8BYBvyehBB",!1)),M:()=>new C(g("5cgBgBlgHAB",!1)),Mn:()=>new C(g("5cgBgBlgHAB",!1)),Emoji:()=>new C(g("8mJA",!0)),Extended_Pictographic:()=>new C(g("8mJA",!0)),Lowercase:()=>new C(g("hCZBmDWBCGBiBuBCEECDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIBBCBBCBBCOCDQCDBBCCCBBBC4BCIBBCBBDCCBCBCGCiJCCEJJHCCBBBCCCBCCBPBCIBkBJJCUCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBZHBJHBJHBJEBMEBMDBNEBMEBqJEEBHHuBPBUzZzZBYBx5BvBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoyehBB",!1)),Math:()=>new C(g("ycGDCHHFMMDDDCHHFAB",!1)),Uppercase:()=>new C(g("hDZB7BqBqBBWBCHBCuBCEECDOCDsBCDECBBBDCCDEEGDDECBDDDCCCDFFDEECDDECCGBBCBBCBBCOCBSCDBBCEECkBCEQCJDDBCCFICBEBCBBCCCBEEBCCBCBCEBDCCBDDIDDCBBEFBGLLBnFnFsBCCEEEBBBvBDBCdBCBBECBCWCBDBCGD1BvBBCgBCK0BCDMCBgDCyBlBBq6CqBBDCB5XFBjkCIBCvHvHERRzD0ECGGGC8CCBHBJFBLHBJHBJFBMGCJHBJNBzBBBNSSBPPBEEpLiBiBBOBFsasaBYBn6BvBBCEEBGCHDDLiDCJCCFNNBkBBCGG0oesBCUaCoEMCE8BCLCCDICFFFCBBDSCMOCFCCDOCb9a9advCBi8UZBumBnBBpEjBB8EKBCOBCGBCBBk4ByBB+DVB75CfBhsVfB8BYBvyehBB",!1))})),M(bn,"FOLD_SCRIPT",new uo({Common:()=>new C(g("8cgBgB",!1)),Greek:()=>new C(g("1FwUwU",!1)),Inherited:()=>new C(g("5cgBgBlgHAB",!1))})),bn),Ce,J=(Ce=class{static is32(e,t){let r=0,s=e.length;for(;r<s;){let i=r+Math.floor((s-r)/2),a=e.getLo(i),u=e.getHi(i);if(a<=t&&t<=u){let c=e.getStride(i);return(t-a)%c===0}t<a?s=i:r=i+1}return!1}static is(e,t){if(t<=Ce.MAX_LATIN1){for(let r=0;r<e.length;r++){if(t>e.getHi(r))continue;let s=e.getLo(r);if(t<s)return!1;let i=e.getStride(r);return(t-s)%i===0}return!1}return e.length>0&&t>=e.getLo(0)&&Ce.is32(e,t)}static isUpper(e){if(e<=Ce.MAX_LATIN1){let t=String.fromCodePoint(e);return t.toUpperCase()===t&&t.toLowerCase()!==t}return Ce.is(st.Upper,e)}static isPrint(e){return e<=Ce.MAX_LATIN1?e>=32&&e<Ce.MAX_ASCII||e>=161&&e!==173:Ce.is(st.Print,e)}static simpleFold(e){if(st.CASE_ORBIT.has(e))return st.CASE_ORBIT.get(e);let t=N.toLowerCase(e);return t!==e?t:N.toUpperCase(e)}static equalsIgnoreCase(e,t){if(e===t)return!0;if(e<0||t<0)return!1;if(e<=Ce.MAX_ASCII&&t<=Ce.MAX_ASCII)return 65<=e&&e<=90&&(e|=32),65<=t&&t<=90&&(t|=32),e===t;for(let r=Ce.simpleFold(e);r!==e;r=Ce.simpleFold(r))if(r===t)return!0;return!1}},M(Ce,"MAX_RUNE",1114111),M(Ce,"MAX_ASCII",127),M(Ce,"MAX_LATIN1",255),M(Ce,"MAX_BMP",65535),M(Ce,"MIN_FOLD",65),M(Ce,"MAX_FOLD",125251),M(Ce,"MIN_HIGH_SURROGATE",55296),M(Ce,"MAX_HIGH_SURROGATE",56319),M(Ce,"MIN_LOW_SURROGATE",56320),M(Ce,"MAX_LOW_SURROGATE",57343),M(Ce,"MIN_SUPPLEMENTARY_CODE_POINT",65536),Ce),el=256,PC=new Uint8Array(el);for(let n=0;n<el;n++)PC[n]=97<=n&&n<=122||65<=n&&n<=90||48<=n&&n<=57||n===95?1:0;var zc=null,Wc=null,De,W=(De=class{static emptyInts(){return[]}static isByteArray(e){return Array.isArray(e)||e instanceof Uint8Array}static isalnum(e){return N.CODES.get("0")<=e&&e<=N.CODES.get("9")||N.CODES.get("a")<=e&&e<=N.CODES.get("z")||N.CODES.get("A")<=e&&e<=N.CODES.get("Z")}static unhex(e){return N.CODES.get("0")<=e&&e<=N.CODES.get("9")?e-N.CODES.get("0"):N.CODES.get("a")<=e&&e<=N.CODES.get("f")?e-N.CODES.get("a")+10:N.CODES.get("A")<=e&&e<=N.CODES.get("F")?e-N.CODES.get("A")+10:-1}static escapeRune(e){let t="";if(J.isPrint(e))De.METACHARACTERS.indexOf(String.fromCodePoint(e))>=0&&(t+="\\"),t+=String.fromCodePoint(e);else switch(e){case N.CODES.get('"'):t+='\\"';break;case N.CODES.get("\\"):t+="\\\\";break;case N.CODES.get("	"):t+="\\t";break;case N.CODES.get(`
`):t+="\\n";break;case N.CODES.get("\r"):t+="\\r";break;case N.CODES.get("\b"):t+="\\b";break;case N.CODES.get("\f"):t+="\\f";break;default:{let r=e.toString(16);e<256?(t+="\\x",r.length===1&&(t+="0"),t+=r):t+=`\\x{${r}}`;break}}return t}static stringToRunes(e){let t=String(e),r=[],s=0;for(;s<t.length;){let i=t.codePointAt(s);r.push(i),s+=i>J.MAX_BMP?2:1}return r}static runeToString(e){return String.fromCodePoint(e)}static isWordRune(e){return e<el?PC[e]===1:!1}static emptyOpContext(e,t){let r=0;return e<0&&(r|=De.EMPTY_BEGIN_TEXT|De.EMPTY_BEGIN_LINE),e===10&&(r|=De.EMPTY_BEGIN_LINE),t<0&&(r|=De.EMPTY_END_TEXT|De.EMPTY_END_LINE),t===10&&(r|=De.EMPTY_END_LINE),De.isWordRune(e)!==De.isWordRune(t)?r|=De.EMPTY_WORD_BOUNDARY:r|=De.EMPTY_NO_WORD_BOUNDARY,r}static quoteMeta(e){return e.split("").map(t=>De.METACHARACTERS.indexOf(t)>=0?`\\${t}`:t).join("")}static charCount(e){return e>J.MAX_BMP?2:1}static toArray(e){let t=e.length,r=new Array(t);for(let s=0;s<t;s++)r[s]=e[s];return r}static stringToUtf8ByteArray(e){if(globalThis.TextEncoder)return zc||(zc=new TextEncoder),zc.encode(e);{let t=[],r=0;for(let s=0;s<e.length;s++){let i=e.charCodeAt(s);i<128?t[r++]=i:i<2048?(t[r++]=i>>6|192,t[r++]=i&63|128):(i&64512)===J.MIN_HIGH_SURROGATE&&s+1<e.length&&(e.charCodeAt(s+1)&64512)===J.MIN_LOW_SURROGATE?(i=J.MIN_SUPPLEMENTARY_CODE_POINT+((i&1023)<<10)+(e.charCodeAt(++s)&1023),t[r++]=i>>18|240,t[r++]=i>>12&63|128,t[r++]=i>>6&63|128,t[r++]=i&63|128):(t[r++]=i>>12|224,t[r++]=i>>6&63|128,t[r++]=i&63|128)}return t}}static utf8ByteArrayToString(e){if(globalThis.TextDecoder){Wc||(Wc=new TextDecoder("utf-8"));let t=e instanceof Uint8Array?e:new Uint8Array(e);return Wc.decode(t)}else{let t=[],r=0,s=0;for(;r<e.length;){let i=e[r++];if(i<128)t[s++]=String.fromCharCode(i);else if(i>191&&i<224){let a=e[r++];t[s++]=String.fromCharCode((i&31)<<6|a&63)}else if(i>239&&i<365){let a=e[r++],u=e[r++],c=e[r++],l=((i&7)<<18|(a&63)<<12|(u&63)<<6|c&63)-J.MIN_SUPPLEMENTARY_CODE_POINT;t[s++]=String.fromCharCode(J.MIN_HIGH_SURROGATE+(l>>10)),t[s++]=String.fromCharCode(J.MIN_LOW_SURROGATE+(l&1023))}else{let a=e[r++],u=e[r++];t[s++]=String.fromCharCode((i&15)<<12|(a&63)<<6|u&63)}}return t.join("")}}},M(De,"METACHARACTERS","\\.+*?()|[]{}^$"),M(De,"EMPTY_BEGIN_LINE",1),M(De,"EMPTY_END_LINE",2),M(De,"EMPTY_BEGIN_TEXT",4),M(De,"EMPTY_END_TEXT",8),M(De,"EMPTY_WORD_BOUNDARY",16),M(De,"EMPTY_NO_WORD_BOUNDARY",32),M(De,"EMPTY_ALL",-1),De),NC=(n=[],e=0)=>{let t=Object.create(null);for(let r=0;r<n.length;r++){let s=n[r],i=e+r;t[s]=i,t[i]=s}return Object.freeze(t)},Rn,rr=(Rn=class{getEncoding(){throw Error("not implemented")}asCharSequence(){throw Error("not implemented")}asBytes(){throw Error("not implemented")}length(){throw Error("not implemented")}isUTF8Encoding(){return this.getEncoding()===Rn.Encoding.UTF_8}isUTF16Encoding(){return this.getEncoding()===Rn.Encoding.UTF_16}},M(Rn,"Encoding",NC(["UTF_16","UTF_8"])),Rn),rC=class extends rr{constructor(n=null){super(),this.bytes=n}getEncoding(){return rr.Encoding.UTF_8}asCharSequence(){return W.utf8ByteArrayToString(this.bytes)}asBytes(){return this.bytes}length(){return this.bytes.length}},ew=class extends rr{constructor(n=null){super(),this.charSequence=n}getEncoding(){return rr.Encoding.UTF_16}asCharSequence(){return this.charSequence}asBytes(){return W.stringToUtf8ByteArray(this.charSequence.toString())}length(){return this.charSequence.length}},tr=class{static utf16(n){return new ew(n)}static utf8(n){return W.isByteArray(n)?new rC(n):new rC(W.stringToUtf8ByteArray(n))}},Xe=class{static EOF(){return-8}constructor(){this.end=0}canCheckPrefix(){return!0}endPos(){return this.end}hasString(){return!1}hasAnyString(){return!1}prefixLength(){return 0}},tw=class extends Xe{constructor(n,e=0,t=n.length){super(),this.bytes=n,this.start=e,this.end=t}hasString(n,e){let t=n.bytes;if(t.length===0)return!0;let r=this.indexOf(this.bytes,t,this.start+e);return r!==-1&&r<=this.end-t.length}hasAnyString(n,e){return n.ac8?n.ac8.searchUTF8(this.bytes,this.start+e,this.end):!1}step(n){if(n+=this.start,n>=this.end)return Xe.EOF();let e=this.bytes[n]&255;if(e<128)return e<<3|1;if(e>=194&&e<=223&&n+1<this.end){let t=this.bytes[n+1]&255;return(t&192)!==128?e<<3|1:((e&31)<<6|t&63)<<3|2}else if(e>=224&&e<=239&&n+2<this.end){let t=this.bytes[n+1]&255;if((t&192)!==128)return e<<3|1;let r=this.bytes[n+2]&255;return(r&192)!==128?e<<3|1:((e&15)<<12|(t&63)<<6|r&63)<<3|3}else if(e>=240&&e<=244&&n+3<this.end){let t=this.bytes[n+1]&255;if((t&192)!==128)return e<<3|1;let r=this.bytes[n+2]&255;if((r&192)!==128)return e<<3|1;let s=this.bytes[n+3]&255;return(s&192)!==128?e<<3|1:((e&7)<<18|(t&63)<<12|(r&63)<<6|s&63)<<3|4}else return e<<3|1}index(n,e){e+=this.start;let t=this.indexOf(this.bytes,n.prefixUTF8,e);return t<0?t:t-e}context(n){n+=this.start;let e=-1;if(n>this.start&&n<=this.end){let r=n-1;if(e=this.bytes[r--],e>=128){let s=n-4;for(s<this.start&&(s=this.start);r>=s&&(this.bytes[r]&192)===128;)r--;r<this.start&&(r=this.start),e=this.step(r-this.start)>>3}}let t=n<this.end?this.step(n-this.start)>>3:-1;return W.emptyOpContext(e,t)}indexOf(n,e,t=0){let r=e.length;if(r===0)return t<=this.end?t:-1;let s=e[0],i=this.end-r,a=typeof n.indexOf=="function",u=t;for(;u<=i;){if(a){if(u=n.indexOf(s,u),u===-1||u>i)return-1}else{for(;u<=i&&n[u]!==s;)u++;if(u>i)return-1}let c=!0;for(let l=1;l<r;l++)if(n[u+l]!==e[l]){c=!1;break}if(c)return u;u++}return-1}prefixLength(n){return n.prefixUTF8.length}},nw=class extends Xe{constructor(n,e=0,t=n.length){super(),this.charSequence=n,this.start=e,this.end=t}hasString(n,e){let t=this.charSequence.indexOf(n.str,this.start+e);return t!==-1&&t<=this.end-n.str.length}hasAnyString(n,e){return n.ac16?n.ac16.searchUTF16(this.charSequence,this.start+e,this.end):!1}step(n){if(n+=this.start,n>=this.end)return Xe.EOF();let e=this.charSequence.charCodeAt(n);if(e<J.MIN_HIGH_SURROGATE||e>J.MAX_HIGH_SURROGATE||n+1>=this.end)return e<<3|1;let t=this.charSequence.charCodeAt(n+1);return t>=J.MIN_LOW_SURROGATE&&t<=J.MAX_LOW_SURROGATE?(e-J.MIN_HIGH_SURROGATE)*1024+(t-J.MIN_LOW_SURROGATE)+J.MIN_SUPPLEMENTARY_CODE_POINT<<3|2:e<<3|1}index(n,e){e+=this.start;let t=this.charSequence.indexOf(n.prefix,e);return t<0||t>this.end-n.prefix.length?-1:t-e}context(n){n+=this.start;let e=n>this.start&&n<=this.end?this.charSequence.charCodeAt(n-1):-1,t=n<this.end?this.charSequence.charCodeAt(n):-1;return W.emptyOpContext(e,t)}prefixLength(n){return n.prefix.length}},fe=class{static fromUTF8(n,e=0,t=n.length){return new tw(n,e,t)}static fromUTF16(n,e=0,t=n.length){return new nw(n,e,t)}},di=class extends Error{constructor(n){super(n),this.name="RE2JSException"}},ge=class extends di{constructor(n,e=null){let t=`error parsing regexp: ${n}`;e&&(t+=`: \`${e}\``),super(t),this.name="RE2JSSyntaxException",this.message=t,this.error=n,this.input=e}getDescription(){return this.error}getPattern(){return this.input}},OC=class extends di{constructor(n){super(n),this.name="RE2JSCompileException"}},rt=class extends di{constructor(n){super(n),this.name="RE2JSGroupException"}},rw=class extends di{constructor(n){super(n),this.name="RE2JSFlagsException"}},Bi=class extends di{constructor(n){super(n),this.name="RE2JSInternalException"}},nr,sC=(nr=class{static quoteReplacement(e,t=!1){return t?e.indexOf("\\")<0&&e.indexOf("$")<0?e:e.split("").map(r=>{let s=r.codePointAt(0);return s===N.CODES.get("\\")||s===N.CODES.get("$")?`\\${r}`:r}).join(""):e.indexOf("$")<0?e:e.split("").map(r=>r.codePointAt(0)===N.CODES.get("$")?"$$":r).join("")}constructor(e,t){if(e===null)throw new Error("pattern is null");this.patternInput=e;let r=this.patternInput.re2();this.patternGroupCount=r.numberOfCapturingGroups(),this.groups=[],this.namedGroups=r.namedGroups,this.numberOfInstructions=r.numberOfInstructions(),t instanceof rr?this.resetMatcherInput(t):W.isByteArray(t)?this.resetMatcherInput(tr.utf8(t)):this.resetMatcherInput(tr.utf16(t))}pattern(){return this.patternInput}reset(){return this.matcherInputLength=this.matcherInput.length(),this.appendPos=0,this.hasMatch=!1,this.hasGroups=!1,this.anchorFlag=0,this}resetMatcherInput(e){if(e===null)throw new Error("input is null");return e instanceof rr||(W.isByteArray(e)?e=tr.utf8(e):e=tr.utf16(e)),this.matcherInput=e,this.reset(),this}start(e=0){if(typeof e=="string"){let t=this.namedGroups[e];if(!Number.isFinite(t))throw new rt(`group '${e}' not found`);e=t}return this.loadGroup(e),this.groups[2*e]}end(e=0){if(typeof e=="string"){let t=this.namedGroups[e];if(!Number.isFinite(t))throw new rt(`group '${e}' not found`);e=t}return this.loadGroup(e),this.groups[2*e+1]}programSize(){return this.numberOfInstructions}group(e=0){if(typeof e=="string"){let s=this.namedGroups[e];if(!Number.isFinite(s))throw new rt(`group '${e}' not found`);e=s}let t=this.start(e),r=this.end(e);return t<0&&r<0?null:this.substring(t,r)}getNamedGroups(){if(!this.hasMatch)throw new rt("perhaps no match attempted");let e=Object.create(null);for(let t of Object.keys(this.namedGroups))e[t]=this.group(t);return e}groupCount(){return this.patternGroupCount}loadGroup(e){if(e<0||e>this.patternGroupCount)throw new rt(`Group index out of bounds: ${e}`);if(!this.hasMatch)throw new rt("perhaps no match attempted");if(e===0||this.hasGroups)return;let t=this.matcherInputLength,r=this.patternInput.re2().matchMachineInput(this.matcherInput,this.groups[0],t,this.anchorFlag,1+this.patternGroupCount);if(!r[0])throw new rt("inconsistency in matching group data");this.groups=r[1],this.hasGroups=!0}matches(){return this.genMatch(0,L.ANCHOR_BOTH)}lookingAt(){return this.genMatch(0,L.ANCHOR_START)}find(e=null){if(e!==null){if(e<0||e>this.matcherInputLength)throw new rt(`start index out of bounds: ${e}`);return this.reset(),this.genMatch(e,0)}if(e=0,this.hasMatch&&(e=this.groups[1],this.groups[0]===this.groups[1])){let t=(this.matcherInput.isUTF16Encoding()?fe.fromUTF16(this.matcherInput.asCharSequence(),0,this.matcherInputLength):fe.fromUTF8(this.matcherInput.asBytes(),0,this.matcherInputLength)).step(e);t<0?e++:e+=t&7}return this.genMatch(e,L.UNANCHORED)}genMatch(e,t){let r=this.patternInput.re2().matchMachineInput(this.matcherInput,e,this.matcherInputLength,t,1);return r[0]?(this.groups=r[1],this.hasMatch=!0,this.hasGroups=this.patternGroupCount===0,this.anchorFlag=t,!0):(this.hasMatch=!1,!1)}substring(e,t){return this.matcherInput.isUTF8Encoding()?W.utf8ByteArrayToString(this.matcherInput.asBytes().slice(e,t)):this.matcherInput.asCharSequence().substring(e,t).toString()}inputLength(){return this.matcherInputLength}appendReplacement(e,t=!1){let r="",s=this.start(),i=this.end();return this.appendPos<s&&(r+=this.substring(this.appendPos,s)),this.appendPos=i,r+=t?this.appendReplacementInternalJava(e):this.appendReplacementInternalJs(e),r}appendReplacementInternalJava(e){let t="",r=0,s=e.length,i=0;for(;i<s;){let a=e.codePointAt(i);if(a===N.CODES.get("\\")){if(r<i&&(t+=e.substring(r,i)),i++,i>=s)throw new rt("character to be escaped is missing");r=i,i++;continue}if(a===N.CODES.get("$")){if(r<i&&(t+=e.substring(r,i)),i+1>=s)throw new rt("Illegal group reference: group index is missing");let u=e.codePointAt(i+1);if(N.CODES.get("0")<=u&&u<=N.CODES.get("9")){let c=u-N.CODES.get("0"),l=i+2;for(;l<s;l++){let f=e.codePointAt(l);if(f<N.CODES.get("0")||f>N.CODES.get("9")||c*10+f-N.CODES.get("0")>this.patternGroupCount)break;c=c*10+f-N.CODES.get("0")}if(c>this.patternGroupCount)throw new rt(`n > number of groups: ${c}`);let d=this.group(c);d!==null&&(t+=d),i=l,r=i}else if(u===N.CODES.get("{")){let c=i+2;for(;c<s&&e.codePointAt(c)!==N.CODES.get("}");)c++;if(c>=s)throw new rt("named capture group is missing trailing '}'");let l=e.substring(i+2,c),d=this.group(l);d!==null&&(t+=d),i=c+1,r=i}else throw new rt("Illegal group reference");continue}i++}return r<s&&(t+=e.substring(r,s)),t}appendReplacementInternalJs(e){let t="",r=0,s=e.length;for(let i=0;i<s-1;i++)if(e.codePointAt(i)===N.CODES.get("$")){let a=e.codePointAt(i+1);if(N.CODES.get("$")===a){r<i&&(t+=e.substring(r,i)),t+="$",i++,r=i+1;continue}else if(N.CODES.get("&")===a){r<i&&(t+=e.substring(r,i));let u=this.group(0);u!==null?t+=u:t+="$&",i++,r=i+1;continue}else if(N.CODES.get("`")===a){r<i&&(t+=e.substring(r,i)),t+=this.substring(0,this.start(0)),i++,r=i+1;continue}else if(N.CODES.get("'")===a){r<i&&(t+=e.substring(r,i)),t+=this.substring(this.end(0),this.matcherInputLength),i++,r=i+1;continue}else if(N.CODES.get("1")<=a&&a<=N.CODES.get("9")){let u=a-N.CODES.get("0");for(r<i&&(t+=e.substring(r,i)),i+=2;i<s&&(a=e.codePointAt(i),!(a<N.CODES.get("0")||a>N.CODES.get("9")||u*10+a-N.CODES.get("0")>this.patternGroupCount));i++)u=u*10+a-N.CODES.get("0");if(u>this.patternGroupCount){t+=`$${u}`,r=i,i--;continue}let c=this.group(u);c!==null&&(t+=c),r=i,i--;continue}else if(a===N.CODES.get("<")){r<i&&(t+=e.substring(r,i)),i++;let u=i+1;for(;u<e.length&&e.codePointAt(u)!==N.CODES.get(">")&&e.codePointAt(u)!==N.CODES.get(" ");)u++;if(u===e.length||e.codePointAt(u)!==N.CODES.get(">")){t+=e.substring(i-1,u+1),r=u+1,i=u;continue}let c=e.substring(i+1,u);if(Object.prototype.hasOwnProperty.call(this.namedGroups,c)){let l=this.group(c);l!==null&&(t+=l)}else t+=`$<${c}>`;r=u+1,i=u;continue}}return r<s&&(t+=e.substring(r,s)),t}appendTail(){return this.substring(this.appendPos,this.matcherInputLength)}replaceAll(e,t=!1){return this.replace(e,!0,t)}replaceFirst(e,t=!1){return this.replace(e,!1,t)}replace(e,t=!0,r=!1){let s="";this.reset();let i=typeof e=="function",a=Object.keys(this.namedGroups).length>0,u=null;if(i){if(this.groupCount()>=nr.MAX_REPLACER_ARGS)throw new rt("Too many capture groups to safely invoke replacer function");u=this.matcherInput.isUTF8Encoding()?this.matcherInput.asBytes():this.matcherInput.asCharSequence()}for(;this.find()&&(s+=i?this.appendReplacementFunc(e,a,u):this.appendReplacement(e,r),!!t););return s+=this.appendTail(),s}appendReplacementFunc(e,t,r){let s="",i=this.start(),a=this.end();this.appendPos<i&&(s+=this.substring(this.appendPos,i)),this.appendPos=a;let u=this.buildReplacerArgs(i,t,r);return s+=String(e(...u)),s}buildReplacerArgs(e,t,r){let s=[this.group(0)],i=this.groupCount();for(let a=1;a<=i;a++){let u=this.start(a);u<0?s.push(void 0):s.push(this.substring(u,this.end(a)))}if(s.push(e),s.push(r),t){let a=this.getNamedGroups();for(let u in a)a[u]===null&&(a[u]=void 0);s.push(a)}return s}},M(nr,"MAX_REPLACER_ARGS",65535),nr),ae,O=(ae=class{static isRuneOp(e){return ae.RUNE<=e&&e<=ae.RUNE_ANY_NOT_NL}static escapeRunes(e){let t='"';for(let r of e)t+=W.escapeRune(r);return t+='"',t}constructor(e){this.op=e,this.out=0,this.arg=0,this.runes=[],this.next=null}matchRune(e){if(this.runes.length===1){let a=this.runes[0];return(this.arg&L.FOLD_CASE)!==0?J.equalsIgnoreCase(a,e):e===a}let t=this.runes.length;if(t===0)return!1;if(t===2||t===4||t===6||t===8){for(let a=0;a<t;a+=2){if(e<this.runes[a])return!1;if(e<=this.runes[a+1])return!0}return!1}let r=0,s=t>>1;for(;s>1;){let a=s>>1;r+=this.runes[r+a<<1]<=e?a:0,s-=a}r+=this.runes[r<<1]<=e?1:0;let i=r-1;return i>=0&&e<=this.runes[i<<1|1]}matchRunePos(e){if(this.runes.length===1){let a=this.runes[0];return(this.arg&L.FOLD_CASE)!==0?J.equalsIgnoreCase(a,e)?0:-1:e===a?0:-1}let t=this.runes.length;if(t===0)return-1;if(t===2||t===4||t===6||t===8){for(let a=0;a<t;a+=2){if(e<this.runes[a])return-1;if(e<=this.runes[a+1])return Math.floor(a/2)}return-1}let r=0,s=t>>1;for(;s>1;){let a=s>>1;r+=this.runes[r+a<<1]<=e?a:0,s-=a}r+=this.runes[r<<1]<=e?1:0;let i=r-1;return i>=0&&e<=this.runes[i<<1|1]?i:-1}toString(){switch(this.op){case ae.ALT:return`alt -> ${this.out}, ${this.arg}`;case ae.ALT_MATCH:return`altmatch -> ${this.out}, ${this.arg}`;case ae.CAPTURE:return`cap ${this.arg} -> ${this.out}`;case ae.EMPTY_WIDTH:return`empty ${this.arg} -> ${this.out}`;case ae.MATCH:return`match${this.arg!==0?` ${this.arg}`:""}`;case ae.FAIL:return"fail";case ae.NOP:return`nop -> ${this.out}`;case ae.LB_WRITE:return`lbwrite ${this.arg} -> ${this.out}`;case ae.LB_CHECK:return`lbcheck ${this.arg} -> ${this.out}`;case ae.RUNE:return this.runes===null?"rune <null>":["rune ",ae.escapeRunes(this.runes),(this.arg&L.FOLD_CASE)!==0?"/i":""," -> ",this.out].join("");case ae.RUNE1:return`rune1 ${ae.escapeRunes(this.runes)} -> ${this.out}`;case ae.RUNE_ANY:return`any -> ${this.out}`;case ae.RUNE_ANY_NOT_NL:return`anynotnl -> ${this.out}`;default:throw new Error("unhandled case in Inst.toString")}}},M(ae,"ALT",1),M(ae,"ALT_MATCH",2),M(ae,"CAPTURE",3),M(ae,"EMPTY_WIDTH",4),M(ae,"FAIL",5),M(ae,"MATCH",6),M(ae,"NOP",7),M(ae,"RUNE",8),M(ae,"RUNE1",9),M(ae,"RUNE_ANY",10),M(ae,"RUNE_ANY_NOT_NL",11),M(ae,"LB_WRITE",12),M(ae,"LB_CHECK",13),ae),iC=class{constructor(n){this.sparse=new Int32Array(n),this.densePcs=new Int32Array(n),this.denseCaps=null,this.size=0,this.ncap=0}init(n){this.ncap=n;let e=this.densePcs.length*n;(!this.denseCaps||this.denseCaps.length<e)&&(this.denseCaps=new Int32Array(e))}contains(n){let e=this.sparse[n];return e<this.size&&this.densePcs[e]===n}isEmpty(){return this.size===0}add(n){let e=this.size++;return this.sparse[n]=e,this.densePcs[e]=n,e}clear(){this.size=0}toString(){let n="{";for(let e=0;e<this.size;e++)e!==0&&(n+=", "),n+=this.densePcs[e];return n+="}",n}},FC=class Zc{static fromRE2(e){let t=new Zc;return t.prog=e.prog,t.re2=e,t.q0=new iC(t.prog.numInst()),t.q1=new iC(t.prog.numInst()),t.matched=!1,t.matchcap=new Int32Array(t.prog.numCap<2?2:t.prog.numCap),t.ncap=0,t}static fromMachine(e){return Zc.fromRE2(e.re2)}constructor(){this.prog=null,this.re2=null,this.q0=null,this.q1=null,this.matched=!1,this.matchcap=null,this.ncap=0,this.lbTable=null}init(e){this.ncap=e,e>this.matchcap.length?this.matchcap=new Int32Array(e).fill(-1):this.matchcap.fill(-1),this.q0.init(e),this.q1.init(e),this.prog.numLb>0&&((!this.lbTable||this.lbTable.length<this.prog.numLb+1)&&(this.lbTable=new Int32Array(this.prog.numLb+1)),this.lbTable.fill(-1))}submatches(){return this.ncap===0?W.emptyInts():W.toArray(this.matchcap.subarray(0,this.ncap))}match(e,t,r){let s=this.re2.cond;if(s===W.EMPTY_ALL||(r===L.ANCHOR_START||r===L.ANCHOR_BOTH)&&t!==0)return!1;this.matched=!1,this.matchcap.fill(-1);let i=this.prog.numLb>0?0:t,a=t,u=this.q0,c=this.q1,l=e.step(i),d=l>>3,f=l&7,m=-1,v=0;l!==Xe.EOF()&&(l=e.step(i+f),m=l>>3,v=l&7);let R;for(i===0?R=W.emptyOpContext(-1,d):R=e.context(i);;){if(u.isEmpty()){if((s&W.EMPTY_BEGIN_TEXT)!==0&&i!==0||(r===L.ANCHOR_START||r===L.ANCHOR_BOTH)&&i!==0||this.matched)break;if(this.prog.numLb===0&&this.re2.prefix.length!==0&&m!==this.re2.prefixRune&&e.canCheckPrefix()){let z=e.index(this.re2,i);if(z<0)break;i+=z,l=e.step(i),d=l>>3,f=l&7,l=e.step(i+f),m=l>>3,v=l&7,R=e.context(i)}}if(i===0&&this.prog.numLb>0)for(let z=0;z<this.prog.lbStarts.length;z++)this.add(u,this.prog.lbStarts[z],i,this.matchcap,0,R);!this.matched&&(i===0||r===L.UNANCHORED)&&i>=a&&(this.ncap>0&&(this.matchcap[0]=i),this.add(u,this.prog.start,i,this.matchcap,0,R));let V=i+f;if(R=e.context(V),this.step(u,c,i,V,d,R,r,i===e.endPos()),f===0||this.ncap===0&&this.matched)break;i+=f,d=m,f=v,d!==-1&&(l=e.step(i+f),m=l>>3,v=l&7);let H=u;u=c,c=H}return c.clear(),this.matched}matchSet(e,t,r){let s=this.re2.cond;if(s===W.EMPTY_ALL)return[];if((r===L.ANCHOR_START||r===L.ANCHOR_BOTH)&&t!==0)return[];let i=this.prog.numLb>0?0:t,a=t,u=this.q0,c=this.q1,l=e.step(i),d=l>>3,f=l&7,m=-1,v=0;l!==Xe.EOF()&&(l=e.step(i+f),m=l>>3,v=l&7);let R=i===0?W.emptyOpContext(-1,d):e.context(i),V=new Set;for(;!(u.isEmpty()&&((s&W.EMPTY_BEGIN_TEXT)!==0&&i!==0||(r===L.ANCHOR_START||r===L.ANCHOR_BOTH)&&i!==0));){if(i===0&&this.prog.numLb>0)for(let Be=0;Be<this.prog.lbStarts.length;Be++)this.add(u,this.prog.lbStarts[Be],i,this.matchcap,0,R);(i===0||r===L.UNANCHORED)&&i>=a&&this.add(u,this.prog.start,i,this.matchcap,0,R);let H=i+f;R=e.context(H);for(let Be=0;Be<u.size;Be++){let Ae=u.densePcs[Be],ve=this.prog.inst[Ae],ut=Be*this.ncap,ye=!1;switch(ve.op){case O.MATCH:if(r===L.ANCHOR_BOTH&&i!==e.endPos())break;V.add(ve.arg);break;case O.RUNE:ye=ve.matchRune(d);break;case O.RUNE1:ye=d===ve.runes[0];break;case O.RUNE_ANY:ye=!0;break;case O.RUNE_ANY_NOT_NL:ye=d!==10;break;default:continue}ye&&this.add(c,ve.out,H,u.denseCaps,ut,R)}if(u.clear(),f===0)break;i+=f,d=m,f=v,d!==-1&&(l=e.step(i+f),m=l>>3,v=l&7);let z=u;u=c,c=z}return c.clear(),Array.from(V).sort((H,z)=>H-z)}step(e,t,r,s,i,a,u,c){let l=this.re2.longest;for(let d=0;d<e.size;d++){let f=e.densePcs[d],m=d*this.ncap;if(l&&this.matched&&this.ncap>0&&this.matchcap[0]<e.denseCaps[m])continue;let v=this.prog.inst[f],R=!1;switch(v.op){case O.MATCH:if(u===L.ANCHOR_BOTH&&!c)break;if(this.ncap>0&&(!l||!this.matched||this.matchcap[1]<r)){e.denseCaps[m+1]=r;for(let V=0;V<this.ncap;V++)this.matchcap[V]=e.denseCaps[m+V]}l||(e.size=0),this.matched=!0;break;case O.RUNE:R=v.matchRune(i);break;case O.RUNE1:R=i===v.runes[0];break;case O.RUNE_ANY:R=!0;break;case O.RUNE_ANY_NOT_NL:R=i!==10;break;default:continue}R&&this.add(t,v.out,s,e.denseCaps,m,a)}e.clear()}add(e,t,r,s,i,a){for(;;){if(t===0||e.contains(t))return;let u=e.add(t),c=this.prog.inst[t];switch(c.op){case O.FAIL:return;case O.ALT:case O.ALT_MATCH:this.add(e,c.out,r,s,i,a),t=c.arg;continue;case O.EMPTY_WIDTH:if((c.arg&~a)===0){t=c.out;continue}return;case O.NOP:t=c.out;continue;case O.CAPTURE:if(c.arg<this.ncap){let l=s[i+c.arg];s[i+c.arg]=r,this.add(e,c.out,r,s,i,a),s[i+c.arg]=l;return}else{t=c.out;continue}case O.LB_WRITE:this.lbTable[Math.abs(c.arg)]=r,t=c.out;continue;case O.LB_CHECK:if(c.arg>0){if(this.lbTable[c.arg]===r){t=c.out;continue}}else if(this.lbTable[-c.arg]!==r){t=c.out;continue}return;case O.MATCH:case O.RUNE:case O.RUNE1:case O.RUNE_ANY:case O.RUNE_ANY_NOT_NL:if(this.ncap>0){let l=u*this.ncap;for(let d=0;d<this.ncap;d++)e.denseCaps[l+d]=s[i+d]}return;default:throw new Bi("unhandled")}}}},aC=n=>{let e=-2128831035;for(let t=0;t<n.length;t++)e^=n[t],e=Math.imul(e,16777619);return e},sw=(n,e)=>{if(n.length!==e.length)return!1;for(let t=0;t<n.length;t++)if(n[t]!==e[t])return!1;return!0},iw=class{constructor(n,e,t=[]){this.nfaStates=n,this.isMatch=e,this.matchIDs=t,this.nextLatin1=new Array(J.MAX_LATIN1+1).fill(null),this.nextLatin1Anchored=new Array(J.MAX_LATIN1+1).fill(null),this.transKeys=[],this.transVals=[],this.lastSeen=0}},Xt,LC=(Xt=class{constructor(e,t=8388608){this.prog=e,this.stateCache=new Map,this.stateCount=0,this.startState=null,this.stateLimit=Math.max(1,Math.floor(t/Xt.STATE_MEMORY_ESTIMATE)),this.cacheClears=0,this.failed=!1,this.clock=0}computeClosure(e){let t=new Set,r=[...e],s=!1,i=[];for(;r.length>0;){let u=r.pop();if(t.has(u))continue;t.add(u);let c=this.prog.getInst(u);switch(c.op){case O.MATCH:s=!0,i.includes(c.arg)||i.push(c.arg);break;case O.ALT:case O.ALT_MATCH:r.push(c.out),r.push(c.arg);break;case O.NOP:case O.CAPTURE:r.push(c.out);break;case O.EMPTY_WIDTH:case O.LB_WRITE:case O.LB_CHECK:return null}}let a=Int32Array.from(t).sort();return i.sort((u,c)=>u-c),{pcs:a,isMatch:s,matchIDs:i}}getState(e){let t=this.computeClosure(e);if(!t)return null;let r=t.pcs,s=aC(r),i=this.stateCache.get(s);if(i)for(let u=0;u<i.length;u++){let c=i[u];if(sw(c.nfaStates,r))return c.lastSeen=++this.clock,c}else i=[],this.stateCache.set(s,i);if(this.failed)return null;if(this.stateCount>=this.stateLimit){if(this.cacheClears++,this.cacheClears>=Xt.MAX_CACHE_CLEARS)return this.failed=!0,this.stateCache.clear(),this.stateCount=0,this.startState=null,null;this.evictCache(),i=this.stateCache.get(s),i||(i=[],this.stateCache.set(s,i))}let a=new iw(r,t.isMatch,t.matchIDs);return a.lastSeen=++this.clock,i.push(a),this.stateCount++,a}evictCache(){let e=[];for(let a of this.stateCache.values())for(let u=0;u<a.length;u++)e.push(a[u]);e.sort((a,u)=>a.lastSeen-u.lastSeen);let t=Math.max(1,Math.floor(this.stateLimit/2)),r=e.length-t,s=e.slice(r),i=new Set(s);this.stateCache.clear(),this.stateCount=0;for(let a=0;a<s.length;a++){let u=s[a];u.nextLatin1.fill(null),u.nextLatin1Anchored.fill(null),u.transKeys.length=0,u.transVals.length=0;let c=aC(u.nfaStates),l=this.stateCache.get(c);l||(l=[],this.stateCache.set(c,l)),l.push(u),this.stateCount++}this.startState&&!i.has(this.startState)&&(this.startState=null)}step(e,t,r){if(t<=J.MAX_LATIN1)if(r===L.UNANCHORED){let a=e.nextLatin1[t];if(a!==null)return a}else{let a=e.nextLatin1Anchored[t];if(a!==null)return a}else{let a=t+(r===L.UNANCHORED?0:J.MAX_RUNE+1),u=e.transKeys,c=u.length;for(let l=0;l<c;l++)if(u[l]===a)return e.transVals[l]}let s=[];for(let a=0;a<e.nfaStates.length;a++){let u=e.nfaStates[a],c=this.prog.getInst(u);O.isRuneOp(c.op)&&c.matchRune(t)&&s.push(c.out)}r===L.UNANCHORED&&s.push(this.prog.start);let i=this.getState(s);if(t<=J.MAX_LATIN1)r===L.UNANCHORED?e.nextLatin1[t]=i:e.nextLatin1Anchored[t]=i;else{let a=t+(r===L.UNANCHORED?0:J.MAX_RUNE+1);e.transKeys.push(a),e.transVals.push(i)}return i}match(e,t,r){if((r===L.ANCHOR_START||r===L.ANCHOR_BOTH)&&t!==0)return!1;if(!this.startState&&(this.startState=this.getState([this.prog.start]),!this.startState))return null;let s=e.endPos(),i=this.startState;if(i.isMatch)if(r===L.ANCHOR_BOTH){if(t===s)return!0}else return!0;let a=t;for(;a<s;){let u=e.step(a),c=u>>3,l=u&7;if(l===0)break;if(i=r===L.UNANCHORED&&c<=J.MAX_LATIN1&&i.nextLatin1[c]||this.step(i,c,r),i===null)return null;if(i.lastSeen=++this.clock,i.isMatch)if(r===L.ANCHOR_BOTH){if(a+l===s)return!0}else return!0;if(i.nfaStates.length===0&&r!==L.UNANCHORED)return!1;a+=l}return!1}matchSet(e,t,r){if((r===L.ANCHOR_START||r===L.ANCHOR_BOTH)&&t!==0)return[];if(!this.startState&&(this.startState=this.getState([this.prog.start]),!this.startState))return null;let s=e.endPos(),i=this.startState,a=new Set,u=(l,d)=>{l.isMatch&&(r===L.ANCHOR_BOTH?d===s&&l.matchIDs.forEach(f=>a.add(f)):l.matchIDs.forEach(f=>a.add(f)))};u(i,t);let c=t;for(;c<s;){let l=e.step(c),d=l>>3,f=l&7;if(f===0)break;if(i=r===L.UNANCHORED&&d<=J.MAX_LATIN1&&i.nextLatin1[d]||this.step(i,d,r),i===null)return null;if(i.lastSeen=++this.clock,c+=f,u(i,c),i.nfaStates.length===0&&r!==L.UNANCHORED)break}return Array.from(a).sort((l,d)=>l-d)}},M(Xt,"MAX_CACHE_CLEARS",5),M(Xt,"STATE_MEMORY_ESTIMATE",838),Xt),aw=32,ow=500,Qc=256,uw=256*1024,cw=class{constructor(){this.end=0,this.cap=new Int32Array(0),this.matchcap=new Int32Array(0),this.ncap=0,this.jobPc=new Int32Array(Qc),this.jobArg=new Uint8Array(Qc),this.jobPos=new Int32Array(Qc),this.jobLen=0,this.visited=new Uint32Array(0)}reset(n,e,t){this.end=e,this.jobLen=0,this.ncap=t;let r=n.numInst()*(e+1)+aw-1>>>5;this.visited.length<r?this.visited=new Uint32Array(r):this.visited.fill(0,0,r),this.cap.length<t?this.cap=new Int32Array(t).fill(-1):this.cap.fill(-1,0,t),this.matchcap.length<t?this.matchcap=new Int32Array(t).fill(-1):this.matchcap.fill(-1,0,t)}shouldVisit(n,e){let t=n*(this.end+1)+e,r=t>>>5,s=1<<(t&31);return(this.visited[r]&s)!==0?!1:(this.visited[r]|=s,!0)}push(n,e,t,r){if(n.prog.getInst(e).op!==O.FAIL&&(r||this.shouldVisit(e,t))){if(this.jobLen>=this.jobPc.length){let s=this.jobPc.length*2,i=new Int32Array(s);i.set(this.jobPc),this.jobPc=i;let a=new Uint8Array(s);a.set(this.jobArg),this.jobArg=a;let u=new Int32Array(s);u.set(this.jobPos),this.jobPos=u}this.jobPc[this.jobLen]=e,this.jobArg[this.jobLen]=r?1:0,this.jobPos[this.jobLen]=t,this.jobLen++}}tryBacktrack(n,e,t,r,s){let i=n.longest;for(this.push(n,t,r,!1);this.jobLen>0;){this.jobLen--;let a=this.jobPc[this.jobLen],u=this.jobArg[this.jobLen]===1,c=this.jobPos[this.jobLen],l=!0;for(;!(!l&&!this.shouldVisit(a,c));){l=!1;let d=n.prog.getInst(a);switch(d.op){case O.FAIL:throw new Bi("unexpected InstFail");case O.ALT:if(u){u=!1,a=d.arg;continue}else{this.push(n,a,c,!0),a=d.out;continue}case O.ALT_MATCH:{let f=n.prog.getInst(d.out);if(O.isRuneOp(f.op)){this.push(n,d.arg,c,!1),a=d.arg,c=this.end;continue}this.push(n,d.out,this.end,!1),a=d.out;continue}case O.RUNE:{let f=e.step(c);if(f===Xe.EOF()||!d.matchRune(f>>3))break;c+=f&7,a=d.out;continue}case O.RUNE1:{let f=e.step(c);if(f===Xe.EOF()||f>>3!==d.runes[0])break;c+=f&7,a=d.out;continue}case O.RUNE_ANY_NOT_NL:{let f=e.step(c);if(f===Xe.EOF()||f>>3===10)break;c+=f&7,a=d.out;continue}case O.RUNE_ANY:{let f=e.step(c);if(f===Xe.EOF())break;c+=f&7,a=d.out;continue}case O.CAPTURE:if(u){this.cap[d.arg]=c;break}else{d.arg<this.ncap&&(this.push(n,a,this.cap[d.arg],!0),this.cap[d.arg]=c),a=d.out;continue}case O.EMPTY_WIDTH:{let f=e.context(c);if((d.arg&~f)!==0)break;a=d.out;continue}case O.NOP:a=d.out;continue;case O.MATCH:{if(s===L.ANCHOR_BOTH&&c!==this.end)break;if(this.ncap===0)return!0;this.ncap>1&&(this.cap[1]=c);let f=this.matchcap[1];if((f===-1||i&&c>0&&c>f)&&this.matchcap.set(this.cap),!i||c===this.end)return!0;break}case O.LB_WRITE:case O.LB_CHECK:throw new Bi("Backtracker cannot evaluate Lookbehind instructions");default:throw new Bi("bad inst")}break}}return i&&this.matchcap.length>1&&this.matchcap[1]>=0}},co=[],lo=class xC{static shouldBacktrack(e){return e.numInst()<=ow}static maxBitStateLen(e){return xC.shouldBacktrack(e)?Math.floor(uw/e.numInst()):0}static execute(e,t,r,s,i){let a=e.cond;if(a===W.EMPTY_ALL||(s===L.ANCHOR_START||s===L.ANCHOR_BOTH)&&r!==0||(a&W.EMPTY_BEGIN_TEXT)!==0&&r!==0)return null;let u=co.length>0?co.pop():new cw,c=t.endPos();u.reset(e.prog,c,i);let l=!1;if((a&W.EMPTY_BEGIN_TEXT)!==0||s===L.ANCHOR_START||s===L.ANCHOR_BOTH)u.ncap>0&&(u.cap[0]=r),u.tryBacktrack(e,t,e.prog.start,r,s)&&(l=!0);else{let f=-1;for(;r<=c&&f!==0;r+=f){if(e.prefix.length>0){let v=t.index(e,r);if(v<0)break;r+=v}if(u.ncap>0&&(u.cap[0]=r),u.tryBacktrack(e,t,e.prog.start,r,s)){l=!0;break}let m=t.step(r);f=m===Xe.EOF()?0:m&7}}if(!l)return co.push(u),null;let d=i===0?[]:W.toArray(u.matchcap.subarray(0,i));return co.push(u),d}},oC=class{constructor(n){this.sparse=new Uint32Array(n),this.dense=new Uint32Array(n),this.size=0,this.nextIndex=0}empty(){return this.nextIndex>=this.size}next(){return this.dense[this.nextIndex++]}clear(){this.size=0,this.nextIndex=0}contains(n){return n<this.sparse.length&&this.sparse[n]<this.size&&this.dense[this.sparse[n]]===n}insert(n){this.contains(n)||this.insertNew(n)}insertNew(n){n>=this.sparse.length||(this.sparse[n]=this.size,this.dense[this.size]=n,this.size++)}},lw=(n,e,t,r)=>{let s=n.length,i=e.length,a=0,u=0,c=[],l=[],d=!0,f=-1,m=v=>{let R=v?n:e,V=v?a:u,H=v?t:r;return f>0&&R[V]<=c[f]?!1:(c.push(R[V],R[V+1]),v?a+=2:u+=2,f+=2,l.push(H),!0)};for(;a<s||u<i;)if(u>=i?d=m(!0):a>=s||e[u]<n[a]?d=m(!1):d=m(!0),!d)return null;return{merged:c,next:l}},Bw=class{constructor(n){this.start=n.start,this.numCap=n.numCap,this.inst=new Array(n.inst.length);for(let e=0;e<n.inst.length;e++){let t=n.inst[e],r=new O(t.op);r.out=t.out,r.arg=t.arg,r.runes=t.runes?t.runes.slice():[],r.next=null,this.inst[e]=r}}},hw=n=>{let e=new Bw(n);for(let t=0;t<e.inst.length;t++){let r=e.inst[t];if(r.op!==O.ALT&&r.op!==O.ALT_MATCH)continue;let s="out",i="arg",a=e.inst[r[i]];if(a.op!==O.ALT&&a.op!==O.ALT_MATCH&&(s="arg",i="out",a=e.inst[r[i]],a.op!==O.ALT&&a.op!==O.ALT_MATCH))continue;let u=e.inst[r[s]];if(u.op===O.ALT||u.op===O.ALT_MATCH)continue;let c="out",l="arg",d=!1;a.out===t?d=!0:a.arg===t&&(d=!0,c="arg",l="out"),d&&(a[c]=r[s]),r[s]===a[c]&&(r[i]=a[l])}return e},dw=n=>{if(n.inst.length>=1e3)return null;let e=new oC(n.inst.length),t=new oC(n.inst.length),r=new Array(n.inst.length),s=new Array(n.inst.length).fill(!1),i=a=>{let u=!0,c=n.inst[a];if(t.contains(a))return!0;switch(t.insert(a),c.op){case O.ALT:case O.ALT_MATCH:{u=i(c.out)&&i(c.arg);let l=s[c.out],d=s[c.arg];if(l&&d)return!1;if(d){let R=c.out;c.out=c.arg,c.arg=R;let V=l;l=d,d=V}l&&(s[a]=!0,c.op=O.ALT_MATCH);let f=r[c.out]||[],m=r[c.arg]||[],v=lw(f,m,c.out,c.arg);if(!v)return!1;r[a]=v.merged,c.next=new Uint32Array(v.next);break}case O.CAPTURE:case O.EMPTY_WIDTH:case O.NOP:u=i(c.out),s[a]=s[c.out],r[a]=r[c.out]?r[c.out].slice():[],c.next=new Uint32Array(Math.floor(r[a].length/2)+1).fill(c.out);break;case O.MATCH:case O.FAIL:s[a]=c.op===O.MATCH;break;case O.RUNE:{if(s[a]=!1,c.next&&c.next.length>0)break;if(e.insert(c.out),!c.runes||c.runes.length===0){r[a]=[],c.next=new Uint32Array([c.out]);break}let l=[];if(c.runes.length===1&&(c.arg&L.FOLD_CASE)!==0){let d=c.runes[0];l.push(d,d);for(let f=J.simpleFold(d);f!==d;f=J.simpleFold(f))l.push(f,f);l.sort((f,m)=>f-m)}else for(let d=0;d<c.runes.length;d++)l.push(c.runes[d]);r[a]=l,c.next=new Uint32Array(Math.floor(l.length/2)+1).fill(c.out),c.op=O.RUNE;break}case O.RUNE1:{if(s[a]=!1,c.next&&c.next.length>0)break;e.insert(c.out);let l=[];if((c.arg&L.FOLD_CASE)!==0){let d=c.runes[0];l.push(d,d);for(let f=J.simpleFold(d);f!==d;f=J.simpleFold(f))l.push(f,f);l.sort((f,m)=>f-m)}else l.push(c.runes[0],c.runes[0]);r[a]=l,c.next=new Uint32Array(Math.floor(l.length/2)+1).fill(c.out),c.op=O.RUNE;break}case O.RUNE_ANY:if(s[a]=!1,c.next&&c.next.length>0)break;e.insert(c.out),r[a]=[0,J.MAX_RUNE],c.next=new Uint32Array([c.out]);break;case O.RUNE_ANY_NOT_NL:if(s[a]=!1,c.next&&c.next.length>0)break;e.insert(c.out),r[a]=[0,9,11,J.MAX_RUNE],c.next=new Uint32Array(Math.floor(r[a].length/2)+1).fill(c.out);break}return u};for(e.clear(),e.insert(n.start);!e.empty();)if(t.clear(),!i(e.next()))return null;for(let a=0;a<n.inst.length;a++)r[a]&&(n.inst[a].runes=r[a]);return n},fw=(n,e)=>{for(let t=0;t<e.inst.length;t++){let r=e.inst[t];switch(r.op){case O.ALT:case O.ALT_MATCH:case O.RUNE:break;case O.CAPTURE:case O.EMPTY_WIDTH:case O.NOP:case O.MATCH:case O.FAIL:n.inst[t].next=null;break;case O.RUNE1:case O.RUNE_ANY:case O.RUNE_ANY_NOT_NL:n.inst[t].next=null,n.inst[t].op=r.op,n.inst[t].runes=r.runes?r.runes.slice():[];break}}},uC=class kC{static compile(e){if(e.start===0||e.numLb>0)return null;let t=e.inst[e.start];if(t.op!==O.EMPTY_WIDTH||(t.arg&W.EMPTY_BEGIN_TEXT)===0)return null;let r=!1;for(let i=0;i<e.inst.length;i++)if(e.inst[i].op===O.ALT||e.inst[i].op===O.ALT_MATCH){r=!0;break}for(let i=0;i<e.inst.length;i++){let a=e.inst[i],u=e.inst[a.out].op;switch(a.op){case O.ALT:case O.ALT_MATCH:if(u===O.MATCH||e.inst[a.arg].op===O.MATCH)return null;break;case O.EMPTY_WIDTH:if(u===O.MATCH){if((a.arg&W.EMPTY_END_TEXT)===W.EMPTY_END_TEXT)continue;return null}break;default:if(u===O.MATCH&&r)return null;break}}let s=hw(e);return s=dw(s),s!==null&&fw(s,e),s}static next(e,t){let r=e.matchRunePos(t);return r>=0?e.next[r]:e.op===O.ALT_MATCH?e.out:0}static execute(e,t,r,s,i){let a=e.onepass;if(!a)return null;let u=new Int32Array(i).fill(-1),c=!1,l=t.step(r),d=l>>3,f=l&7,m=Xe.EOF(),v=-1,R=0;l!==Xe.EOF()&&(m=t.step(r+f),m!==Xe.EOF()&&(v=m>>3,R=m&7));let V=r===0?W.emptyOpContext(-1,d):t.context(r),H=a.start,z;for(;;){switch(z=a.inst[H],H=z.out,z.op){case O.MATCH:return s===L.ANCHOR_BOTH&&r!==t.endPos()?null:(c=!0,u.length>0&&(u[0]=0,u[1]=r),i===0?[]:W.toArray(u));case O.RUNE:if(!z.matchRune(d))return null;break;case O.RUNE1:if(d!==z.runes[0])return null;break;case O.RUNE_ANY:break;case O.RUNE_ANY_NOT_NL:if(d===10)return null;break;case O.ALT:case O.ALT_MATCH:H=kC.next(z,d);continue;case O.FAIL:return null;case O.NOP:continue;case O.EMPTY_WIDTH:if((z.arg&~V)!==0)return null;continue;case O.CAPTURE:z.arg<u.length&&(u[z.arg]=r);continue;default:throw new Bi("bad inst")}if(f===0)break;V=W.emptyOpContext(d,v),r+=f,d=v,f=R,d!==-1&&(m=t.step(r+f),m!==Xe.EOF()?(v=m>>3,R=m&7):(v=-1,R=0))}return c?i===0?[]:W.toArray(u):null}},X,y=(X=class{static isPseudoOp(e){return e>=X.Op.LEFT_PAREN}static emptySubs(){return[]}static quoteIfHyphen(e){return e===N.CODES.get("-")?"\\":""}static fromRegexp(e){let t=new X(e.op);return t.flags=e.flags,t.subs=e.subs,t.runes=e.runes,t.cap=e.cap,t.min=e.min,t.max=e.max,t.name=e.name,t.namedGroups=e.namedGroups,t.lb=e.lb,t}constructor(e){this.op=e,this.flags=0,this.subs=X.emptySubs(),this.runes=[],this.min=0,this.max=0,this.cap=0,this.name=null,this.namedGroups=Object.create(null),this.lb=0}reinit(){this.flags=0,this.subs=X.emptySubs(),this.runes=[],this.cap=0,this.min=0,this.max=0,this.name=null,this.namedGroups=Object.create(null),this.lb=0}toString(){return this.appendTo()}appendTo(){let e="";switch(this.op){case X.Op.NO_MATCH:e+="[^\\x00-\\x{10FFFF}]";break;case X.Op.EMPTY_MATCH:e+="(?:)";break;case X.Op.STAR:case X.Op.PLUS:case X.Op.QUEST:case X.Op.REPEAT:{let t=this.subs[0];switch(t.op>X.Op.CAPTURE||t.op===X.Op.LITERAL&&t.runes.length>1?e+=`(?:${t.appendTo()})`:e+=t.appendTo(),this.op){case X.Op.STAR:e+="*";break;case X.Op.PLUS:e+="+";break;case X.Op.QUEST:e+="?";break;case X.Op.REPEAT:e+=`{${this.min}`,this.min!==this.max&&(e+=",",this.max>=0&&(e+=this.max)),e+="}";break}(this.flags&L.NON_GREEDY)!==0&&(e+="?");break}case X.Op.CONCAT:for(let t of this.subs)t.op===X.Op.ALTERNATE?e+=`(?:${t.appendTo()})`:e+=t.appendTo();break;case X.Op.ALTERNATE:{let t="";for(let r of this.subs)e+=t,t="|",e+=r.appendTo();break}case X.Op.LITERAL:(this.flags&L.FOLD_CASE)!==0&&(e+="(?i:");for(let t of this.runes)e+=W.escapeRune(t);(this.flags&L.FOLD_CASE)!==0&&(e+=")");break;case X.Op.ANY_CHAR_NOT_NL:e+="(?-s:.)";break;case X.Op.ANY_CHAR:e+="(?s:.)";break;case X.Op.PLB:e+=`(?<=${this.subs[0].appendTo()})`;break;case X.Op.NLB:e+=`(?<!${this.subs[0].appendTo()})`;break;case X.Op.CAPTURE:this.name===null||this.name.length===0?e+="(":e+=`(?P<${this.name}>`,this.subs[0].op!==X.Op.EMPTY_MATCH&&(e+=this.subs[0].appendTo()),e+=")";break;case X.Op.BEGIN_TEXT:e+="\\A";break;case X.Op.END_TEXT:(this.flags&L.WAS_DOLLAR)!==0?e+="(?-m:$)":e+="\\z";break;case X.Op.BEGIN_LINE:e+="^";break;case X.Op.END_LINE:e+="$";break;case X.Op.WORD_BOUNDARY:e+="\\b";break;case X.Op.NO_WORD_BOUNDARY:e+="\\B";break;case X.Op.CHAR_CLASS:if(this.runes.length%2!==0){e+="[invalid char class]";break}if(e+="[",this.runes.length===0)e+="^\\x00-\\x{10FFFF}";else if(this.runes[0]===0&&this.runes[this.runes.length-1]===J.MAX_RUNE){e+="^";for(let t=1;t<this.runes.length-1;t+=2){let r=this.runes[t]+1,s=this.runes[t+1]-1;e+=X.quoteIfHyphen(r),e+=W.escapeRune(r),r!==s&&(e+="-",e+=X.quoteIfHyphen(s),e+=W.escapeRune(s))}}else for(let t=0;t<this.runes.length;t+=2){let r=this.runes[t],s=this.runes[t+1];e+=X.quoteIfHyphen(r),e+=W.escapeRune(r),r!==s&&(e+="-",e+=X.quoteIfHyphen(s),e+=W.escapeRune(s))}e+="]";break;default:e+=this.op;break}return e}maxCap(){let e=0;if(this.op===X.Op.CAPTURE&&(e=this.cap),this.subs!==null)for(let t of this.subs){let r=t.maxCap();e<r&&(e=r)}return e}equals(e){if(!(e!==null&&e instanceof X)||this.op!==e.op)return!1;switch(this.op){case X.Op.END_TEXT:if((this.flags&L.WAS_DOLLAR)!==(e.flags&L.WAS_DOLLAR))return!1;break;case X.Op.LITERAL:case X.Op.CHAR_CLASS:if(this.runes===null&&e.runes===null)break;if(this.runes===null||e.runes===null||this.runes.length!==e.runes.length)return!1;for(let t=0;t<this.runes.length;t++)if(this.runes[t]!==e.runes[t])return!1;break;case X.Op.ALTERNATE:case X.Op.CONCAT:if(this.subs.length!==e.subs.length)return!1;for(let t=0;t<this.subs.length;++t)if(!this.subs[t].equals(e.subs[t]))return!1;break;case X.Op.STAR:case X.Op.PLUS:case X.Op.QUEST:if((this.flags&L.NON_GREEDY)!==(e.flags&L.NON_GREEDY)||!this.subs[0].equals(e.subs[0]))return!1;break;case X.Op.REPEAT:if((this.flags&L.NON_GREEDY)!==(e.flags&L.NON_GREEDY)||this.min!==e.min||this.max!==e.max||!this.subs[0].equals(e.subs[0]))return!1;break;case X.Op.CAPTURE:if(this.cap!==e.cap||(this.name===null?e.name!==null:this.name!==e.name)||!this.subs[0].equals(e.subs[0]))return!1;break;case X.Op.PLB:case X.Op.NLB:if(this.lb!==e.lb||!this.subs[0].equals(e.subs[0]))return!1;break}return!0}},M(X,"Op",NC(["NO_MATCH","EMPTY_MATCH","LITERAL","CHAR_CLASS","ANY_CHAR_NOT_NL","ANY_CHAR","BEGIN_LINE","END_LINE","BEGIN_TEXT","END_TEXT","WORD_BOUNDARY","NO_WORD_BOUNDARY","CAPTURE","STAR","PLUS","QUEST","REPEAT","CONCAT","ALTERNATE","PLB","NLB","LEFT_PAREN","VERTICAL_BAR"])),X),cC=class{constructor(n){this.next=[Object.create(null)],this.fail=[0],this.match=[!1];for(let t of n){let r=0;for(let s=0;s<t.length;s++){let i=t[s];i in this.next[r]||(this.next.push(Object.create(null)),this.fail.push(0),this.match.push(!1),this.next[r][i]=this.next.length-1),r=this.next[r][i]}this.match[r]=!0}let e=[];for(let t in this.next[0])if(Object.prototype.hasOwnProperty.call(this.next[0],t)){let r=this.next[0][t];this.fail[r]=0,e.push(r)}for(;e.length>0;){let t=e.shift();for(let r in this.next[t])if(Object.prototype.hasOwnProperty.call(this.next[t],r)){let s=this.next[t][r],i=this.fail[t];for(;i!==0&&!(r in this.next[i]);)i=this.fail[i];r in this.next[i]?this.fail[s]=this.next[i][r]:this.fail[s]=0,this.match[s]=this.match[s]||this.match[this.fail[s]],e.push(s)}}}searchUTF16(n,e,t){let r=0;for(let s=e;s<t;s++){let i=n.charCodeAt(s);for(;r!==0&&!(i in this.next[r]);)r=this.fail[r];if(i in this.next[r]&&(r=this.next[r][i]),this.match[r])return!0}return!1}searchUTF8(n,e,t){let r=0;for(let s=e;s<t;s++){let i=n[s];for(;r!==0&&!(i in this.next[r]);)r=this.fail[r];if(i in this.next[r]&&(r=this.next[r][i]),this.match[r])return!0}return!1}},kt,le=(kt=class{constructor(e){this.type=e,this.subs=[],this.str="",this.bytes=null,this.ac16=null,this.ac8=null}eval(e,t){switch(this.type){case kt.Type.NONE:return!0;case kt.Type.EXACT:return e.hasString(this,t);case kt.Type.AND:for(let r=0;r<this.subs.length;r++)if(!this.subs[r].eval(e,t))return!1;return!0;case kt.Type.OR:if(this.ac16&&this.ac8)return e.hasAnyString(this,t);for(let r=0;r<this.subs.length;r++)if(this.subs[r].eval(e,t))return!0;return!1;default:return!0}}},M(kt,"Type",{NONE:0,EXACT:1,AND:2,OR:3}),kt),pw=class Yt{static build(e){let t=Yt.fromRegexp(e);return Yt.simplify(t)}static fromRegexp(e){if(!e)return new le(le.Type.NONE);switch(e.op){case y.Op.PLB:case y.Op.NLB:case y.Op.NO_MATCH:case y.Op.EMPTY_MATCH:case y.Op.BEGIN_LINE:case y.Op.END_LINE:case y.Op.BEGIN_TEXT:case y.Op.END_TEXT:case y.Op.WORD_BOUNDARY:case y.Op.NO_WORD_BOUNDARY:case y.Op.CHAR_CLASS:case y.Op.ANY_CHAR_NOT_NL:case y.Op.ANY_CHAR:return new le(le.Type.NONE);case y.Op.LITERAL:{if(e.runes.length===0||(e.flags&L.FOLD_CASE)!==0)return new le(le.Type.NONE);let t=new le(le.Type.EXACT),r="";for(let s=0;s<e.runes.length;s++)r+=String.fromCodePoint(e.runes[s]);return t.str=r,t.bytes=W.stringToUtf8ByteArray(t.str),t}case y.Op.CAPTURE:case y.Op.PLUS:return Yt.fromRegexp(e.subs[0]);case y.Op.REPEAT:return e.min>=1?Yt.fromRegexp(e.subs[0]):new le(le.Type.NONE);case y.Op.CONCAT:{let t=new le(le.Type.AND);for(let r of e.subs)t.subs.push(Yt.fromRegexp(r));return t}case y.Op.ALTERNATE:{let t=new le(le.Type.OR);for(let r of e.subs)t.subs.push(Yt.fromRegexp(r));return t}default:return new le(le.Type.NONE)}}static simplify(e){if(e.type===le.Type.EXACT||e.type===le.Type.NONE)return e;if(e.type===le.Type.AND){let t=[];for(let r of e.subs){let s=Yt.simplify(r);if(s.type!==le.Type.NONE)if(s.type===le.Type.AND)for(let i=0;i<s.subs.length;i++)t.push(s.subs[i]);else t.push(s)}return t.length===0?new le(le.Type.NONE):t.length===1?t[0]:(e.subs=t,e)}if(e.type===le.Type.OR){let t=[];for(let a of e.subs){let u=Yt.simplify(a);if(u.type===le.Type.NONE)return new le(le.Type.NONE);if(u.type===le.Type.OR)for(let c=0;c<u.subs.length;c++)t.push(u.subs[c]);else t.push(u)}if(t.length===0)return new le(le.Type.NONE);if(t.length===1)return t[0];let r=new Set,s=[];for(let a of t)a.type===le.Type.EXACT?r.has(a.str)||(r.add(a.str),s.push(a)):s.push(a);e.subs=s;let i=!0;for(let a of s)if(a.type!==le.Type.EXACT){i=!1;break}return i&&s.length>1&&(e.ac16=new cC(s.map(a=>{let u=[];for(let c=0;c<a.str.length;c++)u.push(a.str.charCodeAt(c));return u})),e.ac8=new cC(s.map(a=>a.bytes))),e}return e}},_t=class{constructor(n=0,e=0){this.head=n,this.tail=e}},Cw=class{constructor(){this.inst=[],this.start=0,this.numCap=2,this.lbStarts=[],this.numLb=0}getInst(n){return this.inst[n]}numInst(){return this.inst.length}addInst(n){this.inst.push(new O(n))}skipNop(n){let e=this.inst[n];for(;e.op===O.NOP||e.op===O.CAPTURE;)e=this.inst[n],n=e.out;return e}prefix(){let n="",e=this.skipNop(this.start);if(!O.isRuneOp(e.op)||e.runes.length!==1)return[e.op===O.MATCH,n];for(;O.isRuneOp(e.op)&&e.runes.length===1&&(e.arg&L.FOLD_CASE)===0;)n+=String.fromCodePoint(e.runes[0]),e=this.skipNop(e.out);return[e.op===O.MATCH,n]}startCond(){let n=0,e=this.start;e:for(;;){let t=this.inst[e];switch(t.op){case O.EMPTY_WIDTH:n|=t.arg;break;case O.FAIL:return-1;case O.CAPTURE:case O.NOP:break;default:break e}e=t.out}return n}patch(n,e){let t=n.head;for(;t!==0;){let r=this.inst[t>>1];(t&1)===0?(t=r.out,r.out=e):(t=r.arg,r.arg=e)}}append(n,e){if(n.head===0)return e;if(e.head===0)return n;let t=this.inst[n.tail>>1];return(n.tail&1)===0?t.out=e.head:t.arg=e.head,new _t(n.head,e.tail)}toString(){let n="";for(let e=0;e<this.inst.length;e++){let t=n.length;n+=e,e===this.start&&(n+="*"),n+="        ".substring(n.length-t),n+=this.inst[e],n+=`
`}return n}},Bo=class{constructor(n=0,e=new _t,t=!1){this.i=n,this.out=e,this.nullable=t}},VC=class Ur{static ANY_RUNE_NOT_NL(){return[0,N.CODES.get(`
`)-1,N.CODES.get(`
`)+1,J.MAX_RUNE]}static ANY_RUNE(){return[0,J.MAX_RUNE]}static compileRegexp(e){let t=new Ur,r=t.compile(e);return t.prog.patch(r.out,t.newInst(O.MATCH).i),t.prog.start=r.i,t.prog}static compileSet(e){let t=new Ur;if(e.length===0)return t.prog.start=t.newInst(O.FAIL).i,t.prog;let r=[];for(let i=0;i<e.length;i++){let a=t.compile(e[i]),u=t.newInst(O.MATCH);t.prog.getInst(u.i).arg=i,t.prog.patch(a.out,u.i),r.push(a.i)}let s=r[0];for(let i=1;i<r.length;i++){let a=t.newInst(O.ALT),u=t.prog.getInst(a.i);u.out=s,u.arg=r[i],s=a.i}return t.prog.start=s,t.prog}constructor(){this.prog=new Cw,this.newInst(O.FAIL)}newInst(e){return this.prog.addInst(e),new Bo(this.prog.numInst()-1,new _t,!0)}nop(){let e=this.newInst(O.NOP);return e.out=new _t(e.i<<1,e.i<<1),e}fail(){return new Bo}cap(e){let t=this.newInst(O.CAPTURE);return t.out=new _t(t.i<<1,t.i<<1),this.prog.getInst(t.i).arg=e,this.prog.numCap<e+1&&(this.prog.numCap=e+1),t}cat(e,t){return e.i===0||t.i===0?this.fail():(this.prog.patch(e.out,t.i),new Bo(e.i,t.out,e.nullable&&t.nullable))}alt(e,t){if(e.i===0)return t;if(t.i===0)return e;let r=this.newInst(O.ALT),s=this.prog.getInst(r.i);return s.out=e.i,s.arg=t.i,r.out=this.prog.append(e.out,t.out),r.nullable=e.nullable||t.nullable,r}loop(e,t){let r=this.newInst(O.ALT),s=this.prog.getInst(r.i);return t?(s.arg=e.i,r.out=new _t(r.i<<1,r.i<<1)):(s.out=e.i,r.out=new _t(r.i<<1|1,r.i<<1|1)),this.prog.patch(e.out,r.i),r}quest(e,t){let r=this.newInst(O.ALT),s=this.prog.getInst(r.i);return t?(s.arg=e.i,r.out=new _t(r.i<<1,r.i<<1)):(s.out=e.i,r.out=new _t(r.i<<1|1,r.i<<1|1)),r.out=this.prog.append(r.out,e.out),r}star(e,t){return e.nullable?this.quest(this.plus(e,t),t):this.loop(e,t)}plus(e,t){return new Bo(e.i,this.loop(e,t).out,e.nullable)}empty(e){let t=this.newInst(O.EMPTY_WIDTH);return this.prog.getInst(t.i).arg=e,t.out=new _t(t.i<<1,t.i<<1),t}rune(e,t){let r=this.newInst(O.RUNE);r.nullable=!1;let s=this.prog.getInst(r.i);return s.runes=e,t&=L.FOLD_CASE,(e.length!==1||J.simpleFold(e[0])===e[0])&&(t&=~L.FOLD_CASE),s.arg=t,r.out=new _t(r.i<<1,r.i<<1),(t&L.FOLD_CASE)===0&&e.length===1||e.length===2&&e[0]===e[1]?s.op=O.RUNE1:e.length===2&&e[0]===0&&e[1]===J.MAX_RUNE?s.op=O.RUNE_ANY:e.length===4&&e[0]===0&&e[1]===N.CODES.get(`
`)-1&&e[2]===N.CODES.get(`
`)+1&&e[3]===J.MAX_RUNE&&(s.op=O.RUNE_ANY_NOT_NL),r}lookBehind(e,t){let r=this.newInst(O.LB_WRITE);this.prog.getInst(r.i).arg=t;let s=this.rune(Ur.ANY_RUNE(),0),i=this.star(s,!0),a=this.cat(i,e);this.prog.patch(a.out,r.i);let u=this.newInst(O.LB_CHECK);return this.prog.getInst(u.i).arg=t,this.prog.lbStarts.push(a.i),Math.abs(t)>this.prog.numLb&&(this.prog.numLb=Math.abs(t)),u.out=new _t(u.i<<1,u.i<<1),u}compile(e){switch(e.op){case y.Op.NO_MATCH:return this.fail();case y.Op.EMPTY_MATCH:return this.nop();case y.Op.LITERAL:if(e.runes.length===0)return this.nop();{let t=null;for(let r of e.runes){let s=this.rune([r],e.flags);t=t===null?s:this.cat(t,s)}return t}case y.Op.CHAR_CLASS:return this.rune(e.runes,e.flags);case y.Op.ANY_CHAR_NOT_NL:return this.rune(Ur.ANY_RUNE_NOT_NL(),0);case y.Op.ANY_CHAR:return this.rune(Ur.ANY_RUNE(),0);case y.Op.BEGIN_LINE:return this.empty(W.EMPTY_BEGIN_LINE);case y.Op.END_LINE:return this.empty(W.EMPTY_END_LINE);case y.Op.BEGIN_TEXT:return this.empty(W.EMPTY_BEGIN_TEXT);case y.Op.END_TEXT:return this.empty(W.EMPTY_END_TEXT);case y.Op.WORD_BOUNDARY:return this.empty(W.EMPTY_WORD_BOUNDARY);case y.Op.NO_WORD_BOUNDARY:return this.empty(W.EMPTY_NO_WORD_BOUNDARY);case y.Op.PLB:case y.Op.NLB:return this.lookBehind(this.compile(e.subs[0]),e.lb);case y.Op.CAPTURE:{let t=this.cap(e.cap<<1),r=this.compile(e.subs[0]),s=this.cap(e.cap<<1|1);return this.cat(this.cat(t,r),s)}case y.Op.STAR:return this.star(this.compile(e.subs[0]),(e.flags&L.NON_GREEDY)!==0);case y.Op.PLUS:return this.plus(this.compile(e.subs[0]),(e.flags&L.NON_GREEDY)!==0);case y.Op.QUEST:return this.quest(this.compile(e.subs[0]),(e.flags&L.NON_GREEDY)!==0);case y.Op.CONCAT:if(e.subs.length===0)return this.nop();{let t=null;for(let r of e.subs){let s=this.compile(r);t=t===null?s:this.cat(t,s)}return t}case y.Op.ALTERNATE:if(e.subs.length===0)return this.nop();{let t=null;for(let r of e.subs){let s=this.compile(r);t=t===null?s:this.alt(t,s)}return t}default:throw new OC("regexp: unhandled case in compile")}}},MC=class Bt{static simplify(e){if(e===null)return null;switch(e.op){case y.Op.PLB:case y.Op.NLB:case y.Op.CAPTURE:{let t=Bt.simplify(e.subs[0]);if(t!==e.subs[0]){let r=y.fromRegexp(e);return r.runes=[],r.subs=[t],r}return e}case y.Op.CONCAT:case y.Op.ALTERNATE:{let t=[],r=!1;for(let s=0;s<e.subs.length;s++){let i=e.subs[s],a=Bt.simplify(i);if(a!==i&&(r=!0),e.op===y.Op.CONCAT){if(a.op===y.Op.NO_MATCH)return new y(y.Op.NO_MATCH);if(a.op===y.Op.EMPTY_MATCH){r=!0;continue}if(a.op===y.Op.CONCAT){r=!0;for(let u=0;u<a.subs.length;u++)t.push(a.subs[u]);continue}}else if(e.op===y.Op.ALTERNATE){if(a.op===y.Op.NO_MATCH){r=!0;continue}if(a.op===y.Op.ALTERNATE){r=!0;for(let u=0;u<a.subs.length;u++)t.push(a.subs[u]);continue}}t.push(a)}if(r){if(t.length===0)return new y(e.op===y.Op.CONCAT?y.Op.EMPTY_MATCH:y.Op.NO_MATCH);if(t.length===1)return t[0];let s=y.fromRegexp(e);return s.runes=[],s.subs=t,s}return e}case y.Op.CHAR_CLASS:return e.runes===null?e:e.runes.length===0?new y(y.Op.NO_MATCH):e.runes.length===2&&e.runes[0]===0&&e.runes[1]===J.MAX_RUNE?new y(y.Op.ANY_CHAR):e.runes.length===4&&e.runes[0]===0&&e.runes[1]===N.CODES.get(`
`)-1&&e.runes[2]===N.CODES.get(`
`)+1&&e.runes[3]===J.MAX_RUNE?new y(y.Op.ANY_CHAR_NOT_NL):e;case y.Op.STAR:case y.Op.PLUS:case y.Op.QUEST:{let t=Bt.simplify(e.subs[0]);return Bt.simplify1(e.op,e.flags,t,e)}case y.Op.REPEAT:{if(e.min===0&&e.max===0)return new y(y.Op.EMPTY_MATCH);let t=Bt.simplify(e.subs[0]);if(e.max===-1){if(e.min===0)return Bt.simplify1(y.Op.STAR,e.flags,t,null);if(e.min===1)return Bt.simplify1(y.Op.PLUS,e.flags,t,null);let s=new y(y.Op.CONCAT),i=[];for(let a=0;a<e.min-1;a++)i.push(t);return i.push(Bt.simplify1(y.Op.PLUS,e.flags,t,null)),s.subs=i.slice(0),Bt.simplify(s)}if(e.min===1&&e.max===1)return t;let r=null;if(e.min>0){r=[];for(let s=0;s<e.min;s++)r.push(t)}if(e.max>e.min){let s=Bt.simplify1(y.Op.QUEST,e.flags,t,null);for(let i=e.min+1;i<e.max;i++){let a=new y(y.Op.CONCAT);a.subs=[t,s],s=Bt.simplify1(y.Op.QUEST,e.flags,a,null)}if(r===null)return s;r.push(s)}if(r!==null){let s=new y(y.Op.CONCAT);return s.subs=r.slice(0),Bt.simplify(s)}return new y(y.Op.NO_MATCH)}}return e}static simplify1(e,t,r,s){if(r.op===y.Op.EMPTY_MATCH)return r;if(r.op===y.Op.NO_MATCH)return e===y.Op.PLUS?r:new y(y.Op.EMPTY_MATCH);if(e===r.op&&(t&L.NON_GREEDY)===(r.flags&L.NON_GREEDY))return r;if(s!==null&&s.op===e&&(s.flags&L.NON_GREEDY)===(t&L.NON_GREEDY)&&r===s.subs[0])return s;let i=new y(e);return i.flags=t,i.subs=[r],i}},ue=class{constructor(n,e){this.sign=n,this.cls=e}},lC=[48,57],BC=[9,10,12,13,32,32],hC=[48,57,65,90,95,95,97,122],dC=new Map([["\\d",new ue(1,lC)],["\\D",new ue(-1,lC)],["\\s",new ue(1,BC)],["\\S",new ue(-1,BC)],["\\w",new ue(1,hC)],["\\W",new ue(-1,hC)]]),fC=[48,57,65,90,97,122],pC=[65,90,97,122],CC=[0,127],gC=[9,9,32,32],mC=[0,31,127,127],EC=[48,57],_C=[33,126],DC=[97,122],yC=[32,126],wC=[33,47,58,64,91,96,123,126],IC=[9,13,32,32],TC=[65,90],AC=[48,57,65,90,95,95,97,122],vC=[48,57,65,70,97,102],bC=new Map([["[:alnum:]",new ue(1,fC)],["[:^alnum:]",new ue(-1,fC)],["[:alpha:]",new ue(1,pC)],["[:^alpha:]",new ue(-1,pC)],["[:ascii:]",new ue(1,CC)],["[:^ascii:]",new ue(-1,CC)],["[:blank:]",new ue(1,gC)],["[:^blank:]",new ue(-1,gC)],["[:cntrl:]",new ue(1,mC)],["[:^cntrl:]",new ue(-1,mC)],["[:digit:]",new ue(1,EC)],["[:^digit:]",new ue(-1,EC)],["[:graph:]",new ue(1,_C)],["[:^graph:]",new ue(-1,_C)],["[:lower:]",new ue(1,DC)],["[:^lower:]",new ue(-1,DC)],["[:print:]",new ue(1,yC)],["[:^print:]",new ue(-1,yC)],["[:punct:]",new ue(1,wC)],["[:^punct:]",new ue(-1,wC)],["[:space:]",new ue(1,IC)],["[:^space:]",new ue(-1,IC)],["[:upper:]",new ue(1,TC)],["[:^upper:]",new ue(-1,TC)],["[:word:]",new ue(1,AC)],["[:^word:]",new ue(-1,AC)],["[:xdigit:]",new ue(1,vC)],["[:^xdigit:]",new ue(-1,vC)]]),vn=class Sn{static charClassToString(e,t){let r="[";for(let s=0;s<t;s+=2){s>0&&(r+=" ");let i=e[s],a=e[s+1];i===a?r+=`0x${i.toString(16)}`:r+=`0x${i.toString(16)}-0x${a.toString(16)}`}return r+="]",r}static cmp(e,t,r,s){let i=e[t]-r;return i!==0?i:s-e[t+1]}static qsortIntPair(e,t,r){let s=((t+r)/2|0)&-2,i=e[s],a=e[s+1],u=t,c=r;for(;u<=c;){for(;u<r&&Sn.cmp(e,u,i,a)<0;)u+=2;for(;c>t&&Sn.cmp(e,c,i,a)>0;)c-=2;if(u<=c){if(u!==c){let l=e[u];e[u]=e[c],e[c]=l,l=e[u+1],e[u+1]=e[c+1],e[c+1]=l}u+=2,c-=2}}t<c&&Sn.qsortIntPair(e,t,c),u<r&&Sn.qsortIntPair(e,u,r)}constructor(e=W.emptyInts()){this.r=e,this.len=e.length}toArray(){return this.len===this.r.length?this.r:this.r.slice(0,this.len)}cleanClass(){if(this.len<4)return this;Sn.qsortIntPair(this.r,0,this.len-2);let e=2;for(let t=2;t<this.len;t+=2){let r=this.r[t],s=this.r[t+1];if(r<=this.r[e-1]+1){s>this.r[e-1]&&(this.r[e-1]=s);continue}this.r[e]=r,this.r[e+1]=s,e+=2}return this.len=e,this}appendLiteral(e,t){return(t&L.FOLD_CASE)!==0?this.appendFoldedRange(e,e):this.appendRange(e,e)}appendRange(e,t){if(this.len>0){for(let r=2;r<=4;r+=2)if(this.len>=r){let s=this.r[this.len-r],i=this.r[this.len-r+1];if(e<=i+1&&s<=t+1)return e<s&&(this.r[this.len-r]=e),t>i&&(this.r[this.len-r+1]=t),this}}return this.r[this.len++]=e,this.r[this.len++]=t,this}appendFoldedRange(e,t){if(e<=J.MIN_FOLD&&t>=J.MAX_FOLD)return this.appendRange(e,t);if(t<J.MIN_FOLD||e>J.MAX_FOLD)return this.appendRange(e,t);e<J.MIN_FOLD&&(this.appendRange(e,J.MIN_FOLD-1),e=J.MIN_FOLD),t>J.MAX_FOLD&&(this.appendRange(J.MAX_FOLD+1,t),t=J.MAX_FOLD);for(let r=e;r<=t;r++){this.appendRange(r,r);for(let s=J.simpleFold(r);s!==r;s=J.simpleFold(s))this.appendRange(s,s)}return this}appendClass(e){for(let t=0;t<e.length;t+=2)this.appendRange(e[t],e[t+1]);return this}appendFoldedClass(e){for(let t=0;t<e.length;t+=2)this.appendFoldedRange(e[t],e[t+1]);return this}appendNegatedClass(e){let t=0;for(let r=0;r<e.length;r+=2){let s=e[r],i=e[r+1];t<=s-1&&this.appendRange(t,s-1),t=i+1}return t<=J.MAX_RUNE&&this.appendRange(t,J.MAX_RUNE),this}appendTable(e){for(let t=0;t<e.length;++t){let r=e.getLo(t),s=e.getHi(t),i=e.getStride(t);if(i===1){this.appendRange(r,s);continue}for(let a=r;a<=s;a+=i)this.appendRange(a,a)}return this}appendNegatedTable(e){let t=0;for(let r=0;r<e.length;++r){let s=e.getLo(r),i=e.getHi(r),a=e.getStride(r);if(a===1){t<=s-1&&this.appendRange(t,s-1),t=i+1;continue}for(let u=s;u<=i;u+=a)t<=u-1&&this.appendRange(t,u-1),t=u+1}return t<=J.MAX_RUNE&&this.appendRange(t,J.MAX_RUNE),this}appendTableWithSign(e,t){return t<0?this.appendNegatedTable(e):this.appendTable(e)}negateClass(){let e=0,t=0;for(let r=0;r<this.len;r+=2){let s=this.r[r],i=this.r[r+1];e<=s-1&&(this.r[t]=e,this.r[t+1]=s-1,t+=2),e=i+1}return this.len=t,e<=J.MAX_RUNE&&(this.r[this.len++]=e,this.r[this.len++]=J.MAX_RUNE),this}appendClassWithSign(e,t){return t<0?this.appendNegatedClass(e):this.appendClass(e)}appendGroup(e,t){let r=e.cls;return t&&(r=new Sn().appendFoldedClass(r).cleanClass().toArray()),this.appendClassWithSign(r,e.sign)}toString(){return Sn.charClassToString(this.r,this.len)}},gw=class{constructor(n){this.str=n,this.position=0}pos(){return this.position}rewindTo(n){this.position=n}more(){return this.position<this.str.length}peek(){return this.str.codePointAt(this.position)}skip(n){this.position+=n}skipString(n){this.position+=n.length}pop(){let n=this.str.codePointAt(this.position);return this.position+=W.charCount(n),n}lookingAt(n){return this.str.startsWith(n,this.position)}rest(){return this.str.substring(this.position)}from(n){return this.str.substring(n,this.position)}toString(){return this.rest()}},G,GC=(G=class{static unicodeTable(e){return e==="Any"?{tab:G.ANY_TABLE,fold:G.ANY_TABLE,sign:1}:e==="Ascii"?{tab:G.ASCII_TABLE,fold:G.ASCII_FOLD_TABLE,sign:1}:e==="Assigned"?{tab:st.CATEGORIES.get("Cn"),fold:st.CATEGORIES.get("Cn"),sign:-1}:e==="Lc"?{tab:st.CATEGORIES.get("LC"),fold:st.FOLD_CATEGORIES.get("LC"),sign:1}:st.CATEGORIES.has(e)?{tab:st.CATEGORIES.get(e),fold:st.FOLD_CATEGORIES.get(e),sign:1}:st.SCRIPTS.has(e)?{tab:st.SCRIPTS.get(e),fold:st.FOLD_SCRIPT.get(e),sign:1}:null}static minFoldRune(e){if(e<J.MIN_FOLD||e>J.MAX_FOLD)return e;let t=e,r=e;for(e=J.simpleFold(e);e!==r;e=J.simpleFold(e))t>e&&(t=e);return t}static leadingRegexp(e){if(e.op===y.Op.EMPTY_MATCH)return null;if(e.op===y.Op.CONCAT&&e.subs.length>0){let t=e.subs[0];return t.op===y.Op.EMPTY_MATCH?null:t}return e}static literalRegexp(e,t){let r=new y(y.Op.LITERAL);return r.flags=t,r.runes=W.stringToRunes(e),r}static parse(e,t){return new G(e,t).parseInternal()}static parseRepeat(e){let t=e.pos();if(!e.more()||!e.lookingAt("{"))return-1;e.skip(1);let r=G.parseInt(e);if(r===-1||!e.more())return-1;let s;if(!e.lookingAt(","))s=r;else{if(e.skip(1),!e.more())return-1;if(e.lookingAt("}"))s=-1;else if((s=G.parseInt(e))===-1)return-1}if(!e.more()||!e.lookingAt("}"))return-1;if(e.skip(1),r<0||r>1e3||s===-2||s>1e3||s>=0&&r>s)throw new ge(G.ERR_INVALID_REPEAT_SIZE,e.from(t));return r<<16|s&J.MAX_BMP}static isValidCaptureName(e){if(e.length===0)return!1;for(let t=0;t<e.length;t++){let r=e.codePointAt(t);if(r!==N.CODES.get("_")&&!W.isalnum(r))return!1}return!0}static parseInt(e){let t=e.pos();for(;e.more()&&e.peek()>=N.CODES.get("0")&&e.peek()<=N.CODES.get("9");)e.skip(1);let r=e.from(t);return r.length===0||r.length>1&&r.codePointAt(0)===N.CODES.get("0")?-1:r.length>8?-2:parseInt(r,10)}static isCharClass(e){return e.op===y.Op.LITERAL&&e.runes.length===1||e.op===y.Op.CHAR_CLASS||e.op===y.Op.ANY_CHAR_NOT_NL||e.op===y.Op.ANY_CHAR}static matchRune(e,t){switch(e.op){case y.Op.LITERAL:return e.runes.length===1&&e.runes[0]===t;case y.Op.CHAR_CLASS:for(let r=0;r<e.runes.length;r+=2)if(e.runes[r]<=t&&t<=e.runes[r+1])return!0;return!1;case y.Op.ANY_CHAR_NOT_NL:return t!==N.CODES.get(`
`);case y.Op.ANY_CHAR:return!0}return!1}static mergeCharClass(e,t){switch(e.op){case y.Op.ANY_CHAR:break;case y.Op.ANY_CHAR_NOT_NL:G.matchRune(t,N.CODES.get(`
`))&&(e.op=y.Op.ANY_CHAR);break;case y.Op.CHAR_CLASS:t.op===y.Op.LITERAL?e.runes=new vn(e.runes).appendLiteral(t.runes[0],t.flags).toArray():e.runes=new vn(e.runes).appendClass(t.runes).toArray();break;case y.Op.LITERAL:if(t.runes[0]===e.runes[0]&&t.flags===e.flags)break;e.op=y.Op.CHAR_CLASS,e.runes=new vn().appendLiteral(e.runes[0],e.flags).appendLiteral(t.runes[0],t.flags).toArray();break}}static parseEscape(e){let t=e.pos();if(e.skip(1),!e.more())throw new ge(G.ERR_TRAILING_BACKSLASH);let r=e.pop();e:switch(r){case N.CODES.get("1"):case N.CODES.get("2"):case N.CODES.get("3"):case N.CODES.get("4"):case N.CODES.get("5"):case N.CODES.get("6"):case N.CODES.get("7"):if(!e.more()||e.peek()<N.CODES.get("0")||e.peek()>N.CODES.get("7"))break;case N.CODES.get("0"):{let s=r-N.CODES.get("0");for(let i=1;i<3&&!(!e.more()||e.peek()<N.CODES.get("0")||e.peek()>N.CODES.get("7"));i++)s=s*8+e.peek()-N.CODES.get("0"),e.skip(1);return s}case N.CODES.get("x"):{if(!e.more())break;if(r=e.pop(),r===N.CODES.get("{")){let a=0,u=0;for(;;){if(!e.more())break e;if(r=e.pop(),r===N.CODES.get("}"))break;let c=W.unhex(r);if(c<0||(u=u*16+c,u>J.MAX_RUNE))break e;a++}if(a===0)break e;return u}let s=W.unhex(r);if(!e.more())break;r=e.pop();let i=W.unhex(r);if(s<0||i<0)break;return s*16+i}case N.CODES.get("a"):return N.CODES.get("\x07");case N.CODES.get("f"):return N.CODES.get("\f");case N.CODES.get("n"):return N.CODES.get(`
`);case N.CODES.get("r"):return N.CODES.get("\r");case N.CODES.get("t"):return N.CODES.get("	");case N.CODES.get("v"):return N.CODES.get("\v");default:if(r<=J.MAX_ASCII&&!W.isalnum(r))return r;break}throw new ge(G.ERR_INVALID_ESCAPE,e.from(t))}static parseClassChar(e,t){if(!e.more())throw new ge(G.ERR_MISSING_BRACKET,e.from(t));return e.lookingAt("\\")?G.parseEscape(e):e.pop()}static concatRunes(e,t){for(let r=0;r<t.length;r++)e.push(t[r]);return e}static hasCapture(e){if(e===null)return!1;if(e.op===y.Op.CAPTURE)return!0;if(e.subs){for(let t of e.subs)if(G.hasCapture(t))return!0}return!1}constructor(e,t=0){this.wholeRegexp=e,this.flags=t,this.numCap=0,this.namedGroups=Object.create(null),this.stack=[],this.free=null,this.numRegexp=0,this.numRunes=0,this.repeats=0,this.height=null,this.size=null,this.nlb=0}newRegexp(e){let t=this.free;return t!==null&&t.subs!==null&&t.subs.length>0?(this.free=t.subs[0],t.reinit(),t.op=e):(t=new y(e),this.numRegexp+=1),t}reuse(e){this.height!==null&&this.height.has(e)&&this.height.delete(e),e.subs!==null&&e.subs.length>0&&(e.subs[0]=this.free),this.free=e}checkLimits(e){if(this.numRunes>G.MAX_RUNES)throw new ge(G.ERR_LARGE);this.checkSize(e),this.checkHeight(e)}checkSize(e){if(this.size===null){if(this.repeats===0&&(this.repeats=1),e.op===y.Op.REPEAT){let t=e.max;t===-1&&(t=e.min),t<=0&&(t=1),t>Math.floor(G.MAX_SIZE/this.repeats)?this.repeats=G.MAX_SIZE:this.repeats*=t}if(this.numRegexp<Math.floor(G.MAX_SIZE/this.repeats))return;this.size=new Map;for(let t of this.stack)this.checkSize(t)}if(this.calcSize(e,!0)>G.MAX_SIZE)throw new ge(G.ERR_LARGE)}calcSize(e,t=!1){if(!t&&this.size!==null&&this.size.has(e))return this.size.get(e);let r=0;switch(e.op){case y.Op.LITERAL:r=e.runes.length;break;case y.Op.PLB:case y.Op.NLB:case y.Op.CAPTURE:case y.Op.STAR:r=2+this.calcSize(e.subs[0]);break;case y.Op.PLUS:case y.Op.QUEST:r=1+this.calcSize(e.subs[0]);break;case y.Op.CONCAT:for(let s of e.subs)r=r+this.calcSize(s);break;case y.Op.ALTERNATE:for(let s of e.subs)r=r+this.calcSize(s);e.subs.length>1&&(r=r+e.subs.length-1);break;case y.Op.REPEAT:{let s=this.calcSize(e.subs[0]);if(e.max===-1){e.min===0?r=2+s:r=1+e.min*s;break}r=e.max*s+(e.max-e.min);break}}return r=Math.max(1,r),this.size===null&&(this.size=new Map),this.size.set(e,r),r}checkHeight(e){if(!(this.numRegexp<G.MAX_HEIGHT)){if(this.height===null){this.height=new Map;for(let t of this.stack)this.checkHeight(t)}if(this.calcHeight(e,!0)>G.MAX_HEIGHT)throw new ge(G.ERR_NESTING_DEPTH)}}calcHeight(e,t=!1){if(!t&&this.height!==null&&this.height.has(e))return this.height.get(e);let r=1;for(let s of e.subs){let i=this.calcHeight(s);r<1+i&&(r=1+i)}return this.height===null&&(this.height=new Map),this.height.set(e,r),r}pop(){return this.stack.pop()}popToPseudo(){let e=this.stack.length,t=e;for(;t>0&&!y.isPseudoOp(this.stack[t-1].op);)t--;let r=this.stack.slice(t,e);return this.stack=this.stack.slice(0,t),r}push(e){if(this.numRunes+=e.runes.length,e.op===y.Op.CHAR_CLASS&&e.runes.length===2&&e.runes[0]===e.runes[1]){if(this.maybeConcat(e.runes[0],this.flags&~L.FOLD_CASE))return null;e.op=y.Op.LITERAL,e.runes=[e.runes[0]],e.flags=this.flags&~L.FOLD_CASE}else if(e.op===y.Op.CHAR_CLASS&&e.runes.length===4&&e.runes[0]===e.runes[1]&&e.runes[2]===e.runes[3]&&J.simpleFold(e.runes[0])===e.runes[2]&&J.simpleFold(e.runes[2])===e.runes[0]||e.op===y.Op.CHAR_CLASS&&e.runes.length===2&&e.runes[0]+1===e.runes[1]&&J.simpleFold(e.runes[0])===e.runes[1]&&J.simpleFold(e.runes[1])===e.runes[0]){if(this.maybeConcat(e.runes[0],this.flags|L.FOLD_CASE))return null;e.op=y.Op.LITERAL,e.runes=[e.runes[0]],e.flags=this.flags|L.FOLD_CASE}else this.maybeConcat(-1,0);return this.stack.push(e),this.checkLimits(e),e}maybeConcat(e,t){let r=this.stack.length;if(r<2)return!1;let s=this.stack[r-1],i=this.stack[r-2];return s.op!==y.Op.LITERAL||i.op!==y.Op.LITERAL||(s.flags&L.FOLD_CASE)!==(i.flags&L.FOLD_CASE)?!1:(i.runes=G.concatRunes(i.runes,s.runes),e>=0?(s.runes=[e],s.flags=t,!0):(this.pop(),this.reuse(s),!1))}newLiteral(e,t){let r=this.newRegexp(y.Op.LITERAL);return r.flags=t,(t&L.FOLD_CASE)!==0&&(e=G.minFoldRune(e)),r.runes=[e],r}literal(e){this.push(this.newLiteral(e,this.flags))}op(e){let t=this.newRegexp(e);return t.flags=this.flags,this.push(t)}repeat(e,t,r,s,i,a){let u=this.flags;if((u&L.PERL_X)!==0&&(i.more()&&i.lookingAt("?")&&(i.skip(1),u^=L.NON_GREEDY),a!==-1))throw new ge(G.ERR_INVALID_REPEAT_OP,i.from(a));let c=this.stack.length;if(c===0)throw new ge(G.ERR_MISSING_REPEAT_ARGUMENT,i.from(s));let l=this.stack[c-1];if(y.isPseudoOp(l.op))throw new ge(G.ERR_MISSING_REPEAT_ARGUMENT,i.from(s));let d=this.newRegexp(e);if(d.min=t,d.max=r,d.flags=u,d.subs=[l],this.stack[c-1]=d,this.checkLimits(d),e===y.Op.REPEAT&&(t>=2||r>=2)&&!this.repeatIsValid(d,1e3))throw new ge(G.ERR_INVALID_REPEAT_SIZE,i.from(s))}repeatIsValid(e,t){if(e.op===y.Op.REPEAT){let r=e.max;if(r===0)return!0;if(r<0&&(r=e.min),r>t)return!1;r>0&&(t=Math.trunc(t/r))}for(let r of e.subs)if(!this.repeatIsValid(r,t))return!1;return!0}concat(){this.maybeConcat(-1,0);let e=this.popToPseudo();return e.length===0?this.push(this.newRegexp(y.Op.EMPTY_MATCH)):this.push(this.collapse(e,y.Op.CONCAT))}alternate(){let e=this.popToPseudo();return e.length>0&&this.cleanAlt(e[e.length-1]),e.length===0?this.push(this.newRegexp(y.Op.NO_MATCH)):this.push(this.collapse(e,y.Op.ALTERNATE))}cleanAlt(e){e.op===y.Op.CHAR_CLASS&&(e.runes=new vn(e.runes).cleanClass().toArray(),e.runes.length===2&&e.runes[0]===0&&e.runes[1]===J.MAX_RUNE?(e.runes=[],e.op=y.Op.ANY_CHAR):e.runes.length===4&&e.runes[0]===0&&e.runes[1]===N.CODES.get(`
`)-1&&e.runes[2]===N.CODES.get(`
`)+1&&e.runes[3]===J.MAX_RUNE&&(e.runes=[],e.op=y.Op.ANY_CHAR_NOT_NL))}collapse(e,t){if(e.length===1)return e[0];let r=0;for(let u of e)r+=u.op===t?u.subs.length:1;let s=new Array(r).fill(null),i=0;for(let u of e)if(u.op===t){for(let c=0;c<u.subs.length;c++)s[i++]=u.subs[c];this.reuse(u)}else s[i++]=u;let a=this.newRegexp(t);if(a.subs=s,t===y.Op.ALTERNATE&&(a.subs=this.factor(a.subs),a.subs.length===1)){let u=a;a=a.subs[0],this.reuse(u)}return a}factor(e){if(e.length<2)return e;let t=0,r=e.length,s=0,i=null,a=0,u=0,c=0;for(let d=0;d<=r;d++){let f=null,m=0,v=0;if(d<r){let R=e[t+d];if(R.op===y.Op.CONCAT&&R.subs.length>0&&(R=R.subs[0]),R.op===y.Op.LITERAL&&(f=R.runes,m=R.runes.length,v=R.flags&L.FOLD_CASE),v===u){let V=0;for(;V<a&&V<m&&i[V]===f[V];)V++;if(V>0){a=V;continue}}}if(d!==c)if(d===c+1)e[s++]=e[t+c];else{let R=this.newRegexp(y.Op.LITERAL);R.flags=u,R.runes=i.slice(0,a);for(let z=c;z<d;z++)e[t+z]=this.removeLeadingString(e[t+z],a),this.checkLimits(e[t+z]);let V=this.collapse(e.slice(t+c,t+d),y.Op.ALTERNATE),H=this.newRegexp(y.Op.CONCAT);H.subs=[R,V],e[s++]=H}c=d,i=f,a=m,u=v}r=s,t=0,c=0,s=0;let l=null;for(let d=0;d<=r;d++){let f=null;if(!(d<r&&(f=G.leadingRegexp(e[t+d]),l!==null&&l.equals(f)&&(G.isCharClass(l)||l.op===y.Op.REPEAT&&l.min===l.max&&G.isCharClass(l.subs[0]))))){if(d!==c)if(d===c+1)e[s++]=e[t+c];else{let m=l;for(let V=c;V<d;V++){let H=V!==c;e[t+V]=this.removeLeadingRegexp(e[t+V],H),this.checkLimits(e[t+V])}let v=this.collapse(e.slice(t+c,t+d),y.Op.ALTERNATE),R=this.newRegexp(y.Op.CONCAT);R.subs=[m,v],e[s++]=R}c=d,l=f}}r=s,t=0,c=0,s=0;for(let d=0;d<=r;d++)if(!(d<r&&G.isCharClass(e[t+d]))){if(d!==c)if(d===c+1)e[s++]=e[t+c];else{let f=c;for(let v=c+1;v<d;v++){let R=e[t+f],V=e[t+v];(R.op<V.op||R.op===V.op&&(R.runes!==null?R.runes.length:0)<(V.runes!==null?V.runes.length:0))&&(f=v)}let m=e[t+c];e[t+c]=e[t+f],e[t+f]=m;for(let v=c+1;v<d;v++)G.mergeCharClass(e[t+c],e[t+v]),this.reuse(e[t+v]);this.cleanAlt(e[t+c]),e[s++]=e[t+c]}d<r&&(e[s++]=e[t+d]),c=d+1}r=s,t=0,c=0,s=0;for(let d=0;d<r;++d)d+1<r&&e[t+d].op===y.Op.EMPTY_MATCH&&e[t+d+1].op===y.Op.EMPTY_MATCH||(e[s++]=e[t+d]);return r=s,t=0,e.slice(t,r)}removeLeadingString(e,t){if(e.op===y.Op.CONCAT&&e.subs.length>0){let r=this.removeLeadingString(e.subs[0],t);if(e.subs[0]=r,r.op===y.Op.EMPTY_MATCH)switch(this.reuse(r),e.subs.length){case 0:case 1:e.op=y.Op.EMPTY_MATCH,e.subs=y.emptySubs();break;case 2:{let s=e;e=e.subs[1],this.reuse(s);break}default:e.subs=e.subs.slice(1,e.subs.length);break}return e}return e.op===y.Op.LITERAL&&(e.runes=e.runes.slice(t,e.runes.length),e.runes.length===0&&(e.op=y.Op.EMPTY_MATCH)),e}removeLeadingRegexp(e,t){if(e.op===y.Op.CONCAT&&e.subs.length>0){switch(t&&this.reuse(e.subs[0]),e.subs=e.subs.slice(1,e.subs.length),e.subs.length){case 0:e.op=y.Op.EMPTY_MATCH,e.subs=y.emptySubs();break;case 1:{let r=e;e=e.subs[0],this.reuse(r);break}}return e}return t&&this.reuse(e),this.newRegexp(y.Op.EMPTY_MATCH)}parseInternal(){if((this.flags&L.LITERAL)!==0)return G.literalRegexp(this.wholeRegexp,this.flags);let e=-1,t=-1,r=-1,s=new gw(this.wholeRegexp);for(;s.more();){let i=-1;e:switch(s.peek()){case N.CODES.get("("):if((this.flags&L.LOOKBEHIND)!==0){if(s.lookingAt("(?<=")){this.parsePosLookBehind(),s.skip(4);break}if(s.lookingAt("(?<!")){this.parseNegLookBehind(),s.skip(4);break}}if((this.flags&L.PERL_X)!==0&&s.lookingAt("(?")){this.parsePerlFlags(s);break}this.op(y.Op.LEFT_PAREN).cap=++this.numCap,s.skip(1);break;case N.CODES.get("|"):this.parseVerticalBar(),s.skip(1);break;case N.CODES.get(")"):this.parseRightParen(),s.skip(1);break;case N.CODES.get("^"):(this.flags&L.ONE_LINE)!==0?this.op(y.Op.BEGIN_TEXT):this.op(y.Op.BEGIN_LINE),s.skip(1);break;case N.CODES.get("$"):(this.flags&L.ONE_LINE)!==0?this.op(y.Op.END_TEXT).flags|=L.WAS_DOLLAR:this.op(y.Op.END_LINE),s.skip(1);break;case N.CODES.get("."):(this.flags&L.DOT_NL)!==0?this.op(y.Op.ANY_CHAR):this.op(y.Op.ANY_CHAR_NOT_NL),s.skip(1);break;case N.CODES.get("["):this.parseClass(s);break;case N.CODES.get("*"):case N.CODES.get("+"):case N.CODES.get("?"):{i=s.pos();let a=null;switch(s.pop()){case N.CODES.get("*"):a=y.Op.STAR;break;case N.CODES.get("+"):a=y.Op.PLUS;break;case N.CODES.get("?"):a=y.Op.QUEST;break}this.repeat(a,t,r,i,s,e);break}case N.CODES.get("{"):{i=s.pos();let a=G.parseRepeat(s);if(a<0){s.rewindTo(i),this.literal(s.pop());break}t=a>>16,r=(a&J.MAX_BMP)<<16>>16,this.repeat(y.Op.REPEAT,t,r,i,s,e);break}case N.CODES.get("\\"):{let a=s.pos();if(s.skip(1),(this.flags&L.PERL_X)!==0&&s.more())switch(s.pop()){case N.CODES.get("A"):this.op(y.Op.BEGIN_TEXT);break e;case N.CODES.get("b"):this.op(y.Op.WORD_BOUNDARY);break e;case N.CODES.get("B"):this.op(y.Op.NO_WORD_BOUNDARY);break e;case N.CODES.get("C"):throw new ge(G.ERR_INVALID_ESCAPE,"\\C");case N.CODES.get("Q"):{let l=s.rest(),d=l.indexOf("\\E");d>=0?(l=l.substring(0,d),s.skipString(l),s.skipString("\\E")):s.skipString(l);let f=0;for(;f<l.length;){let m=l.codePointAt(f);this.literal(m),f+=W.charCount(m)}break e}case N.CODES.get("z"):this.op(y.Op.END_TEXT);break e;default:s.rewindTo(a);break}else s.rewindTo(a);let u=this.newRegexp(y.Op.CHAR_CLASS);if(u.flags=this.flags,s.lookingAt("\\p")||s.lookingAt("\\P")){let l=new vn;if(this.parseUnicodeClass(s,l)){u.runes=l.toArray(),this.push(u);break e}}let c=new vn;if(this.parsePerlClassEscape(s,c)){u.runes=c.toArray(),this.push(u);break e}s.rewindTo(a),this.reuse(u),this.literal(G.parseEscape(s));break}default:this.literal(s.pop());break}e=i}if(this.concat(),this.swapVerticalBar()&&this.pop(),this.alternate(),this.stack.length!==1)throw new ge(G.ERR_MISSING_PAREN,this.wholeRegexp);return this.stack[0].namedGroups=this.namedGroups,this.stack[0]}parsePerlFlags(e){let t=e.pos(),r=e.rest();if(r.startsWith("(?P<")||r.startsWith("(?<")){let u=r.charAt(2)==="P"?4:3,c=r.indexOf(">");if(c<0)throw new ge(G.ERR_INVALID_NAMED_CAPTURE,r);let l=r.substring(u,c);if(e.skipString(l),e.skip(u+1),!G.isValidCaptureName(l))throw new ge(G.ERR_INVALID_NAMED_CAPTURE,r.substring(0,c+1));let d=this.op(y.Op.LEFT_PAREN);if(d.cap=++this.numCap,this.namedGroups[l])throw new ge(G.ERR_DUPLICATE_NAMED_CAPTURE,l);this.namedGroups[l]=this.numCap,d.name=l;return}e.skip(2);let s=this.flags,i=1,a=!1;e:for(;e.more();){let u=e.pop();switch(u){case N.CODES.get("i"):s|=L.FOLD_CASE,a=!0;break;case N.CODES.get("m"):s&=~L.ONE_LINE,a=!0;break;case N.CODES.get("s"):s|=L.DOT_NL,a=!0;break;case N.CODES.get("U"):s|=L.NON_GREEDY,a=!0;break;case N.CODES.get("-"):if(i<0)break e;i=-1,s=~s,a=!1;break;case N.CODES.get(":"):case N.CODES.get(")"):if(i<0){if(!a)break e;s=~s}u===N.CODES.get(":")&&this.op(y.Op.LEFT_PAREN),this.flags=s;return;default:break e}}throw new ge(G.ERR_INVALID_PERL_OP,e.from(t))}parsePosLookBehind(){let e=this.newRegexp(y.Op.LEFT_PAREN);return e.flags=this.flags,e.lb=++this.nlb,this.push(e)}parseNegLookBehind(){let e=this.newRegexp(y.Op.LEFT_PAREN);return e.flags=this.flags,e.lb=-++this.nlb,this.push(e)}parseVerticalBar(){this.concat(),this.swapVerticalBar()||this.op(y.Op.VERTICAL_BAR)}swapVerticalBar(){let e=this.stack.length;if(e>=3&&this.stack[e-2].op===y.Op.VERTICAL_BAR&&G.isCharClass(this.stack[e-1])&&G.isCharClass(this.stack[e-3])){let t=this.stack[e-1],r=this.stack[e-3];if(t.op>r.op){let s=r;r=t,t=s,this.stack[e-3]=r}return G.mergeCharClass(r,t),this.reuse(t),this.pop(),!0}if(e>=2){let t=this.stack[e-1],r=this.stack[e-2];if(r.op===y.Op.VERTICAL_BAR)return e>=3&&this.cleanAlt(this.stack[e-3]),this.stack[e-2]=t,this.stack[e-1]=r,!0}return!1}parseRightParen(){if(this.concat(),this.swapVerticalBar()&&this.pop(),this.alternate(),this.stack.length<2)throw new ge(G.ERR_UNEXPECTED_PAREN,this.wholeRegexp);let e=this.pop(),t=this.pop();if(t.op!==y.Op.LEFT_PAREN)throw new ge(G.ERR_UNEXPECTED_PAREN,this.wholeRegexp);if(this.flags=t.flags,t.lb!==0){if(G.hasCapture(e))throw new ge(G.ERR_INVALID_CAPTURE_IN_LOOKBEHIND,this.wholeRegexp);t.lb>0?t.op=y.Op.PLB:t.op=y.Op.NLB,t.subs=[e],this.push(t);return}t.cap===0?this.push(e):(t.op=y.Op.CAPTURE,t.subs=[e],this.push(t))}parsePerlClassEscape(e,t){let r=e.pos();if((this.flags&L.PERL_X)===0||!e.more()||e.pop()!==N.CODES.get("\\")||!e.more())return!1;e.pop();let s=e.from(r),i=dC.has(s)?dC.get(s):null;return i===null?!1:(t.appendGroup(i,(this.flags&L.FOLD_CASE)!==0),!0)}parseNamedClass(e,t){let r=e.rest(),s=r.indexOf(":]");if(s<0)return!1;let i=r.substring(0,s+2);e.skipString(i);let a=bC.has(i)?bC.get(i):null;if(a===null)throw new ge(G.ERR_INVALID_CHAR_RANGE,i);return t.appendGroup(a,(this.flags&L.FOLD_CASE)!==0),!0}parseUnicodeClass(e,t){let r=e.pos();if((this.flags&L.UNICODE_GROUPS)===0||!e.lookingAt("\\p")&&!e.lookingAt("\\P"))return!1;e.skip(1);let s=1,i=e.pop();if(i===N.CODES.get("P")&&(s=-1),!e.more())throw e.rewindTo(r),new ge(G.ERR_INVALID_CHAR_RANGE,e.rest());i=e.pop();let a;if(i!==N.CODES.get("{"))a=W.runeToString(i);else{let d=e.rest(),f=d.indexOf("}");if(f<0)throw e.rewindTo(r),new ge(G.ERR_INVALID_CHAR_RANGE,e.rest());a=d.substring(0,f),e.skipString(a),e.skip(1)}a.length!==0&&a.codePointAt(0)===N.CODES.get("^")&&(s=0-s,a=a.substring(1));let u=G.unicodeTable(a);if(u===null)throw new ge(G.ERR_INVALID_CHAR_RANGE,e.from(r));u.sign<0&&(s=0-s);let c=u.tab,l=u.fold;if((this.flags&L.FOLD_CASE)===0||l===null)t.appendTableWithSign(c,s);else{let d=new vn().appendTable(c).appendTable(l).cleanClass().toArray();t.appendClassWithSign(d,s)}return!0}parseClass(e){let t=e.pos();e.skip(1);let r=this.newRegexp(y.Op.CHAR_CLASS);r.flags=this.flags;let s=new vn,i=1;e.more()&&e.lookingAt("^")&&(i=-1,e.skip(1),(this.flags&L.CLASS_NL)===0&&s.appendRange(N.CODES.get(`
`),N.CODES.get(`
`)));let a=!0;for(;!e.more()||e.peek()!==N.CODES.get("]")||a;){if(e.more()&&e.lookingAt("-")&&(this.flags&L.PERL_X)===0&&!a){let d=e.rest();if(d==="-"||!d.startsWith("-]"))throw e.rewindTo(t),new ge(G.ERR_INVALID_CHAR_RANGE,e.rest())}a=!1;let u=e.pos();if(e.lookingAt("[:")){if(this.parseNamedClass(e,s))continue;e.rewindTo(u)}if(this.parseUnicodeClass(e,s)||this.parsePerlClassEscape(e,s))continue;e.rewindTo(u);let c=G.parseClassChar(e,t),l=c;if(e.more()&&e.lookingAt("-")){if(e.skip(1),e.more()&&e.lookingAt("]"))e.skip(-1);else if(l=G.parseClassChar(e,t),l<c)throw new ge(G.ERR_INVALID_CHAR_RANGE,e.from(u))}(this.flags&L.FOLD_CASE)===0?s.appendRange(c,l):s.appendFoldedRange(c,l)}e.skip(1),s.cleanClass(),i<0&&s.negateClass(),r.runes=s.toArray(),this.push(r)}},M(G,"ERR_INTERNAL_ERROR","regexp/syntax: internal error"),M(G,"ERR_INVALID_CHAR_RANGE","invalid character class range"),M(G,"ERR_INVALID_ESCAPE","invalid escape sequence"),M(G,"ERR_INVALID_NAMED_CAPTURE","invalid named capture"),M(G,"ERR_INVALID_PERL_OP","invalid or unsupported Perl syntax"),M(G,"ERR_INVALID_REPEAT_OP","invalid nested repetition operator"),M(G,"ERR_INVALID_REPEAT_SIZE","invalid repeat count"),M(G,"ERR_MISSING_BRACKET","missing closing ]"),M(G,"ERR_MISSING_PAREN","missing closing )"),M(G,"ERR_MISSING_REPEAT_ARGUMENT","missing argument to repetition operator"),M(G,"ERR_TRAILING_BACKSLASH","trailing backslash at end of expression"),M(G,"ERR_DUPLICATE_NAMED_CAPTURE","duplicate capture group name"),M(G,"ERR_UNEXPECTED_PAREN","unexpected )"),M(G,"ERR_NESTING_DEPTH","expression nests too deeply"),M(G,"ERR_LARGE","expression too large"),M(G,"ERR_INVALID_CAPTURE_IN_LOOKBEHIND","invalid capture in lookbehind"),M(G,"MAX_HEIGHT",1e3),M(G,"MAX_SIZE",3355443),M(G,"MAX_RUNES",33554432),M(G,"ANY_TABLE",new C(new Uint32Array([0,J.MAX_RUNE,1]))),M(G,"ASCII_TABLE",new C(new Uint32Array([0,127,1]))),M(G,"ASCII_FOLD_TABLE",new C(new Uint32Array([0,127,1,383,383,1,8490,8490,1]))),G),mw=class er{static initTest(e){let t=er.compile(e),r=new er(t.expr,t.prog,t.numSubexp,t.longest);return r.cond=t.cond,r.prefix=t.prefix,r.prefixUTF8=t.prefixUTF8,r.prefixComplete=t.prefixComplete,r.prefixRune=t.prefixRune,r.prefilter=t.prefilter,r}static compile(e){return er.compileImpl(e,L.PERL,!1)}static compilePOSIX(e){return er.compileImpl(e,L.POSIX,!0)}static compileImpl(e,t,r){let s=GC.parse(e,t),i=s.maxCap();s=MC.simplify(s);let a=pw.build(s),u=VC.compileRegexp(s),c=new er(e,u,i,r);c.prefilter=a.type===le.Type.NONE?null:a;let[l,d]=u.prefix();return c.prefixComplete=l,c.prefix=d,c.prefixUTF8=W.stringToUtf8ByteArray(c.prefix),c.prefix.length>0&&(c.prefixRune=c.prefix.codePointAt(0)),c.namedGroups=s.namedGroups,c}static match(e,t){return er.compile(e).match(t)}constructor(e,t,r=0,s=0){this.expr=e,this.prog=t,this.numSubexp=r,this.longest=s,this.cond=t.startCond(),this.prefix=null,this.prefixUTF8=null,this.prefixComplete=!1,this.prefixRune=0,this.machinePool=[],this.dfa=new LC(this.prog),this.onepass=uC.compile(this.prog),this.prefilter=null}matchPrefixComplete(e,t,r,s){if((r===L.ANCHOR_START||r===L.ANCHOR_BOTH)&&t!==0)return null;let i=-1,a=-1,u=e.prefixLength(this);if(r===L.UNANCHORED){let c=e.index(this,t);if(c<0)return null;i=t+c,a=i+u}else if(r===L.ANCHOR_BOTH){if(e.endPos()!==u||e.index(this,0)!==0)return null;i=0,a=u}else if(r===L.ANCHOR_START){if(e.index(this,0)!==0)return null;i=0,a=u}if(i<0)return null;if(s>0){let c=new Int32Array(s).fill(-1);return c[0]=i,c[1]=a,Array.from(c)}return[]}executeEngine(e,t,r,s){if(this.prefixComplete&&(s===0||this.numSubexp===0))return this.matchPrefixComplete(e,t,r,s);if(this.prefilter!==null&&r===L.UNANCHORED&&!this.prefilter.eval(e,t))return null;if(this.onepass!==null)return uC.execute(this,e,t,r,s);if(s>0)return this.prog.numLb===0&&e.endPos()<=lo.maxBitStateLen(this.prog)?lo.execute(this,e,t,r,s):this.doExecuteNFA(e,t,r,s);if(this.prog.numLb===0){let i=this.dfa.match(e,t,r);if(i!==null)return i?[]:null;if(e.endPos()<=lo.maxBitStateLen(this.prog))return lo.execute(this,e,t,r,s)}return this.doExecuteNFA(e,t,r,s)}numberOfCapturingGroups(){return this.numSubexp}numberOfInstructions(){return this.prog.numInst()}get(){return this.machinePool.length>0?this.machinePool.pop():null}reset(){this.machinePool.length=0}put(e){this.machinePool.push(e)}toString(){return this.expr}doExecuteNFA(e,t,r,s){let i=this.get();i||(i=FC.fromRE2(this)),i.init(s);let a=i.match(e,t,r)?i.submatches():null;return this.put(i),a}match(e){return this.executeEngine(fe.fromUTF16(e),0,L.UNANCHORED,0)!==null}matchWithGroup(e,t,r,s,i){return e instanceof rr||(W.isByteArray(e)?e=tr.utf8(e):e=tr.utf16(e)),this.matchMachineInput(e,t,r,s,i)}matchMachineInput(e,t,r,s,i){if(t>r)return[!1,null];let a=e.isUTF16Encoding()?fe.fromUTF16(e.asCharSequence(),0,r):fe.fromUTF8(e.asBytes(),0,r),u=this.executeEngine(a,t,s,2*i);return u===null?[!1,null]:[!0,u]}matchUTF8(e){return this.executeEngine(fe.fromUTF8(e),0,L.UNANCHORED,0)!==null}replaceAll(e,t){return this.replaceAllFunc(e,()=>t,2*e.length+1)}replaceFirst(e,t){return this.replaceAllFunc(e,()=>t,1)}replaceAllFunc(e,t,r){let s=0,i=0,a="",u=fe.fromUTF16(e),c=0;for(;i<=e.length;){let l=this.executeEngine(u,i,L.UNANCHORED,2);if(l===null||l.length===0)break;a+=e.substring(s,l[0]),(l[1]>s||l[0]===0)&&(a+=t(e.substring(l[0],l[1])),c++),s=l[1];let d=u.step(i)&7;if(i+d>l[1]?i+=d:i+1>l[1]?i++:i=l[1],c>=r)break}return a+=e.substring(s),a}pad(e){if(e===null)return null;let t=(1+this.numSubexp)*2;if(e.length<t){let r=new Array(t).fill(-1);for(let s=0;s<e.length;s++)r[s]=e[s];e=r}return e}allMatches(e,t,r=s=>s){let s=[],i=e.endPos();t<0&&(t=i+1);let a=0,u=0,c=-1;for(;u<t&&a<=i;){let l=this.executeEngine(e,a,L.UNANCHORED,this.prog.numCap);if(l===null||l.length===0)break;let d=!0;if(l[1]===a){l[0]===c&&(d=!1);let f=e.step(a);f<0?a=i+1:a+=f&7}else a=l[1];c=l[1],d&&(s.push(r(this.pad(l))),u++)}return s}findUTF8(e){let t=this.executeEngine(fe.fromUTF8(e),0,L.UNANCHORED,2);return t===null?null:e.slice(t[0],t[1])}findUTF8Index(e){let t=this.executeEngine(fe.fromUTF8(e),0,L.UNANCHORED,2);return t===null?null:t.slice(0,2)}find(e){let t=this.executeEngine(fe.fromUTF16(e),0,L.UNANCHORED,2);return t===null?"":e.substring(t[0],t[1])}findIndex(e){return this.executeEngine(fe.fromUTF16(e),0,L.UNANCHORED,2)}findUTF8Submatch(e){let t=this.executeEngine(fe.fromUTF8(e),0,L.UNANCHORED,this.prog.numCap);if(t===null)return null;let r=new Array(1+this.numSubexp).fill(null);for(let s=0;s<r.length;s++)2*s<t.length&&t[2*s]>=0&&(r[s]=e.slice(t[2*s],t[2*s+1]));return r}findUTF8SubmatchIndex(e){return this.pad(this.executeEngine(fe.fromUTF8(e),0,L.UNANCHORED,this.prog.numCap))}findSubmatch(e){let t=this.executeEngine(fe.fromUTF16(e),0,L.UNANCHORED,this.prog.numCap);if(t===null)return null;let r=new Array(1+this.numSubexp).fill(null);for(let s=0;s<r.length;s++)2*s<t.length&&t[2*s]>=0&&(r[s]=e.substring(t[2*s],t[2*s+1]));return r}findSubmatchIndex(e){return this.pad(this.executeEngine(fe.fromUTF16(e),0,L.UNANCHORED,this.prog.numCap))}findAllUTF8(e,t){let r=this.allMatches(fe.fromUTF8(e),t,s=>e.slice(s[0],s[1]));return r.length===0?null:r}findAllUTF8Index(e,t){let r=this.allMatches(fe.fromUTF8(e),t,s=>s.slice(0,2));return r.length===0?null:r}findAll(e,t){let r=this.allMatches(fe.fromUTF16(e),t,s=>e.substring(s[0],s[1]));return r.length===0?null:r}findAllIndex(e,t){let r=this.allMatches(fe.fromUTF16(e),t,s=>s.slice(0,2));return r.length===0?null:r}findAllUTF8Submatch(e,t){let r=this.allMatches(fe.fromUTF8(e),t,s=>{let i=new Array(s.length/2|0).fill(null);for(let a=0;a<i.length;a++)s[2*a]>=0&&(i[a]=e.slice(s[2*a],s[2*a+1]));return i});return r.length===0?null:r}findAllUTF8SubmatchIndex(e,t){let r=this.allMatches(fe.fromUTF8(e),t);return r.length===0?null:r}findAllSubmatch(e,t){let r=this.allMatches(fe.fromUTF16(e),t,s=>{let i=new Array(s.length/2|0).fill(null);for(let a=0;a<i.length;a++)s[2*a]>=0&&(i[a]=e.substring(s[2*a],s[2*a+1]));return i});return r.length===0?null:r}findAllSubmatchIndex(e,t){let r=this.allMatches(fe.fromUTF16(e),t);return r.length===0?null:r}},bt,Rv=(bt=class{constructor(e=bt.UNANCHORED,t=0,r=8388608){this.anchor=e,this.jsFlags=t,this.maxMem=r;let s=L.PERL;(t&vt.DISABLE_UNICODE_GROUPS)!==0&&(s&=~L.UNICODE_GROUPS),(t&vt.LOOKBEHINDS)!==0&&(s|=L.LOOKBEHIND),this.re2Flags=s,this.regexps=[],this.prog=null,this.dfa=null,this.dummyRe2=null}add(e){if(this.prog)throw new OC("Cannot add patterns after compile");let t=e;(this.jsFlags&vt.CASE_INSENSITIVE)!==0&&(t=`(?i)${t}`),(this.jsFlags&vt.DOTALL)!==0&&(t=`(?s)${t}`),(this.jsFlags&vt.MULTILINE)!==0&&(t=`(?m)${t}`);let r=GC.parse(t,this.re2Flags);return this.regexps.push(MC.simplify(r)),this.regexps.length-1}compile(){this.prog||(this.prog=VC.compileSet(this.regexps),this.dfa=new LC(this.prog,this.maxMem),this.dummyRe2={prog:this.prog,cond:this.prog.startCond(),prefix:"",prefixRune:0,longest:!1})}match(e){this.prog||this.compile();let t=W.isByteArray(e)?fe.fromUTF8(e):fe.fromUTF16(e),r=L.UNANCHORED;this.anchor===bt.ANCHOR_START?r=L.ANCHOR_START:this.anchor===bt.ANCHOR_BOTH&&(r=L.ANCHOR_BOTH);let s=this.dfa.matchSet(t,0,r);if(s!==null)return s;let i=FC.fromRE2(this.dummyRe2);return i.init(0),i.matchSet(t,0,r)}},M(bt,"UNANCHORED",L.UNANCHORED),M(bt,"ANCHOR_START",L.ANCHOR_START),M(bt,"ANCHOR_BOTH",L.ANCHOR_BOTH),bt),Ew=class Hr{static isHexadecimal(e){return"0"<=e&&e<="9"||"A"<=e&&e<="F"||"a"<=e&&e<="f"}static translate(e){let t="";if(e instanceof RegExp&&(e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e=e.source),typeof e!="string")return e;let r="",s=!1,i=e.length;i===0&&(r="(?:)",s=!0);let a=!1,u=0;for(;u<i;){let l=e[u];if(l==="\\"){if(u+1<i)switch(l=e[u+1],l){case"\\":r+="\\\\",u+=2;continue;case"c":if(u+2<i){let m=e[u+2].charCodeAt(0);if(m>=65&&m<=90||m>=97&&m<=122){let v=m%32;r+="\\x",r+=(v>>4).toString(16).toUpperCase(),r+=(v&15).toString(16).toUpperCase(),u+=3,s=!0;continue}}r+="c",u+=2,s=!0;continue;case"u":if(u+2<i){if(e[u+2]==="{"){let m=u+3,v=!1,R=!1;for(;m<i;){let V=e[m];if(V==="}"){R=!0;break}if(!Hr.isHexadecimal(V))break;v=!0,m++}if(R&&v){r+="\\x",u+=2,s=!0;continue}}else if(u+5<i){let m=!0;for(let v=0;v<4;v++)if(!Hr.isHexadecimal(e[u+2+v])){m=!1;break}if(m){r+="\\x{"+e.substring(u+2,u+6)+"}",u+=6,s=!0;continue}}}r+="u",u+=2,s=!0;continue;case"x":{let m=!1;if(u+2<i&&e[u+2]==="{"){let v=u+3,R=!1,V=!1;for(;v<i;){let H=e[v];if(H==="}"){V=!0;break}if(!Hr.isHexadecimal(H))break;R=!0,v++}V&&R&&(m=!0)}else u+3<i&&Hr.isHexadecimal(e[u+2])&&Hr.isHexadecimal(e[u+3])&&(m=!0);m?(r+="\\x",u+=2):(r+="x",u+=2,s=!0);continue}case"n":case"r":case"t":case"a":case"f":case"v":case"d":case"D":case"s":case"S":case"w":case"W":case"b":case"B":case"p":case"P":case"A":case"z":case"Q":case"E":case"0":case"1":case"2":case"3":case"4":case"5":case"6":case"7":r+="\\"+l,u+=2;continue;default:{let m=e.codePointAt(u+1);if(m>=48&&m<=57||m>=65&&m<=90||m>=97&&m<=122){let v=W.charCount(m);r+=e.substring(u+1,u+1+v),u+=v+1,s=!0}else{r+="\\";let v=W.charCount(m);r+=e.substring(u+1,u+1+v),u+=v+1}continue}}}else if(l==="/"){r+="\\/",u+=1,s=!0;continue}else if(l==="[")a=!0;else if(l==="]")a=!1;else if(!a&&l==="("&&u+2<i&&e[u+1]==="?"&&e[u+2]==="<"&&u+3<i&&!"=!>)".includes(e[u+3])){r+="(?P<",u+=3,s=!0;continue}let d=e.codePointAt(u),f=W.charCount(d);r+=e.substring(u,u+f),u+=f}let c=s?r:e;return t.length>0?`(?${t})${c}`:c}},me,ho=(me=class{static quote(e){return W.quoteMeta(e)}static quoteReplacement(e,t=!1){return sC.quoteReplacement(e,t)}static translateRegExp(e){return Ew.translate(e)}static compile(e,t=0){let r=e;if((t&me.CASE_INSENSITIVE)!==0&&(r=`(?i)${r}`),(t&me.DOTALL)!==0&&(r=`(?s)${r}`),(t&me.MULTILINE)!==0&&(r=`(?m)${r}`),(t&~(me.MULTILINE|me.DOTALL|me.CASE_INSENSITIVE|me.DISABLE_UNICODE_GROUPS|me.LONGEST_MATCH|me.LOOKBEHINDS))!==0)throw new rw("Flags should only be a combination of MULTILINE, DOTALL, CASE_INSENSITIVE, DISABLE_UNICODE_GROUPS, LONGEST_MATCH, LOOKBEHINDS");let s=L.PERL;(t&me.DISABLE_UNICODE_GROUPS)!==0&&(s&=~L.UNICODE_GROUPS),(t&me.LOOKBEHINDS)!==0&&(s|=L.LOOKBEHIND);let i=new me(e,t);return i.re2Input=mw.compileImpl(r,s,(t&me.LONGEST_MATCH)!==0),i}static matches(e,t){return me.compile(e).testExact(t)}static initTest(e,t,r){if(e==null)throw new Error("pattern is null");if(r==null)throw new Error("re2 is null");let s=new me(e,t);return s.re2Input=r,s}constructor(e,t){this.patternInput=e,this.flagsInput=t,this.re2Input=null}reset(){this.re2Input.reset()}flags(){return this.flagsInput}pattern(){return this.patternInput}re2(){return this.re2Input}matches(e){return this.testExact(e)}matcher(e){return W.isByteArray(e)&&(e=tr.utf8(e)),new sC(this,e)}test(e){return W.isByteArray(e)?this.re2Input.matchUTF8(e):this.re2Input.match(e)}testExact(e){let t=W.isByteArray(e)?fe.fromUTF8(e):fe.fromUTF16(e);return this.re2Input.executeEngine(t,0,L.ANCHOR_BOTH,0)!==null}exec(e){let t=this.matcher(e);if(!t.find())return null;let r=[t.group(0)];for(let i=1;i<=t.groupCount();i++){let a=t.group(i);r.push(a===null?void 0:a)}r.index=t.start(0),r.input=e;let s=this.namedGroups();if(Object.keys(s).length>0){let i=t.getNamedGroups();for(let a in i)i[a]===null&&(i[a]=void 0);r.groups=i}else r.groups=void 0;return r}split(e,t=0){let r=this.matcher(e),s=[],i=0,a=0;for(;r.find();){if(a===0&&r.end()===0){a=r.end();continue}if(t>0&&s.length===t-1)break;if(a===r.start()){if(t===0){i+=1,a=r.end();continue}}else for(;i>0;)s.push(""),i-=1;s.push(r.substring(a,r.start())),a=r.end()}if(t===0&&a!==r.inputLength()){for(;i>0;)s.push(""),i-=1;s.push(r.substring(a,r.inputLength()))}return(t!==0||s.length===0&&!(a===r.inputLength()&&a>0))&&s.push(r.substring(a,r.inputLength())),s}*matchAll(e){let t=this.matcher(e);for(;t.find();){let r=[t.group(0)];for(let i=1;i<=t.groupCount();i++){let a=t.group(i);r.push(a===null?void 0:a)}r.index=t.start(0),r.input=e;let s=this.namedGroups();if(Object.keys(s).length>0){let i=t.getNamedGroups();for(let a in i)i[a]===null&&(i[a]=void 0);r.groups=i}else r.groups=void 0;yield r}}toString(){return this.patternInput}programSize(){return this.re2Input.numberOfInstructions()}groupCount(){return this.re2Input.numberOfCapturingGroups()}namedGroups(){return this.re2Input.namedGroups}equals(e){return this===e?!0:e===null||this.constructor!==e.constructor?!1:this.flagsInput===e.flagsInput&&this.patternInput===e.patternInput}},M(me,"CASE_INSENSITIVE",vt.CASE_INSENSITIVE),M(me,"DOTALL",vt.DOTALL),M(me,"MULTILINE",vt.MULTILINE),M(me,"DISABLE_UNICODE_GROUPS",vt.DISABLE_UNICODE_GROUPS),M(me,"LONGEST_MATCH",vt.LONGEST_MATCH),M(me,"LOOKBEHINDS",vt.LOOKBEHINDS),me);/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ws="12.19.0";function wg(n){ws=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var cr=new En("@firebase/firestore");function qr(){return cr.logLevel}function j(n,...e){if(cr.logLevel<=re.DEBUG){let t=e.map(zh);cr.debug(`Firestore (${ws}): ${n}`,...t)}}function sn(n,...e){if(cr.logLevel<=re.ERROR){let t=e.map(zh);cr.error(`Firestore (${ws}): ${n}`,...t)}}function yt(n,...e){if(cr.logLevel<=re.WARN){let t=e.map(zh);cr.warn(`Firestore (${ws}): ${n}`,...t)}}function zh(n){if(typeof n=="string")return n;try{return(function(t){return JSON.stringify(t)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Q(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,Ig(n,r,t)}function Ig(n,e,t){let r=`FIRESTORE (${ws}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw sn(r),new Error(r)}function Y(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||Ig(e,s,r)}function ie(n,e){return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _w(n){let e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Zr=class{static newId(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516),r="";for(;r.length<20;){let s=_w(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}};function se(n,e){return n<e?-1:n>e?1:0}function ol(n,e){let t=Math.min(n.length,e.length);for(let r=0;r<t;r++){let s=n.charAt(r),i=e.charAt(r);if(s!==i)return tl(s)===tl(i)?se(s,i):tl(s)?1:-1}return se(n.length,e.length)}var Dw=55296,yw=57343;function tl(n){let e=n.charCodeAt(0);return e>=Dw&&e<=yw}function es(n,e,t){return n.length===e.length&&n.every(((r,s)=>t(r,e[s])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Te=class n{constructor(e,t){this.comparator=e,this.root=t||Mt.EMPTY}insert(e,t){return new n(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Mt.BLACK,null,null))}remove(e){return new n(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Mt.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){let s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,r)=>(e(t,r),!1)))}toString(){let e=[];return this.inorderTraversal(((t,r)=>(e.push(`${t}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Wr(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Wr(this.root,e,this.comparator,!1)}getReverseIterator(){return new Wr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Wr(this.root,e,this.comparator,!0)}},Wr=class{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},Mt=class n{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??n.RED,this.left=s??n.EMPTY,this.right=i??n.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new n(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this,i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return n.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return n.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){let e=this.copy(null,null,n.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,n.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){let e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw Q(43730,{key:this.key,value:this.value});if(this.right.isRed())throw Q(14113,{key:this.key,value:this.value});let e=this.left.check();if(e!==this.right.check())throw Q(27949);return e+(this.isRed()?0:1)}};Mt.EMPTY=null,Mt.RED=!0,Mt.BLACK=!1;Mt.EMPTY=new class{constructor(){this.size=0}get key(){throw Q(57766)}get value(){throw Q(16141)}get color(){throw Q(16727)}get left(){throw Q(29726)}get right(){throw Q(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new Mt(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ve=class n{constructor(e){this.comparator=e,this.data=new Te(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,r)=>(e(t),!1)))}forEachInRange(e,t){let r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){let s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Do(this.data.getIterator())}getIteratorFrom(e){return new Do(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((r=>{t=t.add(r)})),t}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){let s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){let e=[];return this.forEach((t=>{e.push(t)})),e}toString(){let e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){let t=new n(this.comparator);return t.data=e,t}},Do=class{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var x={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},K=class extends lt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ts="__name__",yo=class n{constructor(e,t,r){t===void 0?t=0:t>e.length&&Q(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&Q(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return n.comparator(this,e)===0}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof n?e.forEach((r=>{t.push(r)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let r=Math.min(e.length,t.length);for(let s=0;s<r;s++){let i=n.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return se(e.length,t.length)}static compareSegments(e,t){let r=n.isNumericId(e),s=n.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?n.extractNumericId(e).compare(n.extractNumericId(t)):ol(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Qt.fromString(e.substring(4,e.length-2))}},he=class n extends yo{construct(e,t,r){return new n(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toStringWithLeadingSlash(){return`/${this.canonicalString()}`}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){let t=[];for(let r of e){if(r.indexOf("//")>=0)throw new K(x.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter((s=>s.length>0)))}return new n(t)}static emptyPath(){return new n([])}},ww=/^[_a-zA-Z][_a-zA-Z0-9]*$/,pt=class jr extends yo{construct(e,t,r){return new jr(e,t,r)}static isValidIdentifier(e){return ww.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),jr.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===ts}static keyField(){return new jr([ts])}static fromServerFormat(e){let t=[],r="",s=0,i=()=>{if(r.length===0)throw new K(x.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""},a=!1;for(;s<e.length;){let u=e[s];if(u==="\\"){if(s+1===e.length)throw new K(x.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let c=e[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new K(x.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=c,s+=2}else u==="`"?(a=!a,s++):u!=="."||a?(r+=u,s++):(i(),s++)}if(i(),a)throw new K(x.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new jr(t)}static emptyPath(){return new jr([])}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Rt=class n{constructor(e){this.fields=e,e.sort(pt.comparator)}static empty(){return new n([])}unionWith(e){let t=new Ve(pt.comparator);for(let r of this.fields)t=t.add(r);for(let r of e)t=t.add(r);return new n(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return es(this.fields,e.fields,((t,r)=>t.isEqual(r)))}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wo(n){let e=0;for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function br(n,e){for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Tg(n,e){let t=[];for(let r in n)Object.prototype.hasOwnProperty.call(n,r)&&t.push(e(n[r],r,n));return t}function Ag(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Z=class n{constructor(e){this.path=e}static fromPath(e){return new n(he.fromString(e))}static fromName(e){return new n(he.fromString(e).popFirst(5))}static empty(){return new n(he.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&he.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return he.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new n(new he(e.slice()))}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Iw(n,e,t){if(!t)throw new K(x.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function vg(n,e,t,r){if(e===!0&&r===!0)throw new K(x.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function UC(n){if(!Z.isDocumentKey(n))throw new K(x.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Qi(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function hu(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{let e=(function(r){return r.constructor?r.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":Q(12329,{type:typeof n})}function $i(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new K(x.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let t=hu(n);throw new K(x.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pe(n,e){let t={typeString:n};return e&&(t.value=e),t}function Yi(n,e){if(!Qi(n))throw new K(x.INVALID_ARGUMENT,"JSON must be an object");let t;for(let r in e)if(e[r]){let s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}let a=n[r];if(s&&typeof a!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new K(x.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var HC=-62135596800,qC=1e6,Ie=class n{static now(){return n.fromMillis(Date.now())}static fromDate(e){return n.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*qC);return new n(t,r)}static fromInstant(e){if(!e||typeof e.t!="bigint")throw new K(x.INVALID_ARGUMENT,"Invalid Temporal.Instant object provided.");return n._fromEpochNanoseconds(e.t)}static _fromEpochNanoseconds(e){let t,r;if(e>=0n)t=Number(e/1000000000n),r=Number(e%1000000000n);else{let s=e%1000000000n;s===0n?(t=Number(e/1000000000n),r=0):(t=Number(e/1000000000n-1n),r=Number(s+1000000000n))}return new n(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new K(x.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new K(x.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<HC)throw new K(x.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new K(x.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/qC}toInstant(){if(typeof Temporal>"u"||!Temporal.Instant)throw new K(x.FAILED_PRECONDITION,"The Temporal object is not available in the current environment.");let e=1000000000n*BigInt(this.seconds)+BigInt(this.nanoseconds);return Temporal.Instant.__PRIVATE_fromEpochNanoseconds(e)}_compareTo(e){return this.seconds===e.seconds?se(this.nanoseconds,e.nanoseconds):se(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:n._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Yi(e,n._jsonSchema))return new n(e.seconds,e.nanoseconds)}valueOf(){let e=this.seconds-HC;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}};Ie._jsonSchemaVersion="firestore/timestamp/1.0",Ie._jsonSchema={type:Pe("string",Ie._jsonSchemaVersion),seconds:Pe("number"),nanoseconds:Pe("number")};/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Io=class extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ne=class n{constructor(e){this.binaryString=e}static fromBase64String(e){let t=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Io("Invalid base64 string: "+i):i}})(e);return new n(t)}static fromUint8Array(e){let t=(function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i})(e);return new n(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){let r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return se(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}};Ne.EMPTY_BYTE_STRING=new Ne("");var Tw=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function an(n){if(Y(!!n,39018),typeof n=="string"){let e=0,t=Tw.exec(n);if(Y(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}let r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Ee(n.seconds),nanos:Ee(n.nanos)}}function Ee(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function on(n){return typeof n=="string"?Ne.fromBase64String(n):Ne.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var bg="server_timestamp",Sg="__type__",Rg="__previous_value__",Pg="__local_write_time__";function Xi(n){return(n?.mapValue?.fields||{})[Sg]?.stringValue===bg}function Zi(n){let e=n.mapValue.fields[Rg];return Xi(e)?Zi(e):e}function ns(n){let e=an(n.mapValue.fields[Pg].timestampValue);return new Ie(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ul=class{constructor(e,t,r,s,i,a,u,c,l,d,f,m,v){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=u,this.longPollingOptions=c,this.useFetchStreams=l,this.isUsingEmulator=d,this.apiKey=f,this._customHeaders=m,this.grpcFlowControlWindow=v}},To="(default)",wi=class n{constructor(e,t){this.projectId=e,this.database=t||To}static empty(){return new n("","")}get isDefaultDatabase(){return this.database===To}isEqual(e){return e instanceof n&&e.projectId===this.projectId&&e.database===this.database}};function Ng(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new K(x.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new wi(n.options.projectId,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Aw=-1;function ea(n){return n==null}function rs(n){return n===0&&1/n==-1/0}function vw(n){return typeof n=="number"&&Number.isInteger(n)&&!rs(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}function bw(n){return typeof n=="string"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Wh="__type__",Og="__max__",fo={mapValue:{fields:{__type__:{stringValue:Og}}}},Qh="__vector__",lr="value",ss={nullValue:"NULL_VALUE"},it={booleanValue:!0},He={booleanValue:!1};function Oe(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Xi(n)?4:Fg(n)?9007199254740991:Ti(n)?10:11:Q(28295,{value:n})}function wt(n,e,t){if(n===e)return!0;let r=Oe(n);if(r!==Oe(e))return!1;switch(r){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return ns(n).isEqual(ns(e));case 3:return(function(i,a){if(typeof i.timestampValue=="string"&&typeof a.timestampValue=="string"&&i.timestampValue.length===a.timestampValue.length)return i.timestampValue===a.timestampValue;let u=an(i.timestampValue),c=an(a.timestampValue);return u.seconds===c.seconds&&u.nanos===c.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(i,a){return on(i.bytesValue).isEqual(on(a.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(i,a){return Ee(i.geoPointValue.latitude)===Ee(a.geoPointValue.latitude)&&Ee(i.geoPointValue.longitude)===Ee(a.geoPointValue.longitude)})(n,e);case 2:return(function(i,a,u){if("integerValue"in i&&"integerValue"in a)return Ee(i.integerValue)===Ee(a.integerValue);let c,l;if("doubleValue"in i&&"doubleValue"in a)c=Ee(i.doubleValue),l=Ee(a.doubleValue);else{if(!u?.i)return!1;c=Ee(i.integerValue??i.doubleValue),l=Ee(a.integerValue??a.doubleValue)}return c===l?!!u?.o||rs(c)===rs(l):!!(u===void 0||u.u)&&isNaN(c)&&isNaN(l)})(n,e,t);case 9:return es(n.arrayValue.values||[],e.arrayValue.values||[],((s,i)=>wt(s,i,t)));case 10:case 11:return(function(i,a,u){let c=i.mapValue.fields||{},l=a.mapValue.fields||{};if(wo(c)!==wo(l))return!1;for(let d in c)if(c.hasOwnProperty(d)&&(l[d]===void 0||!wt(c[d],l[d],u)))return!1;return!0})(n,e,t);default:return Q(52216,{left:n})}}function Ii(n,e){return(n.values||[]).find((t=>wt(t,e)))!==void 0}function at(n,e){if(n===e)return 0;let t=Oe(n),r=Oe(e);if(t!==r)return se(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return se(n.booleanValue,e.booleanValue);case 2:return(function(i,a){let u=Ee(i.integerValue||i.doubleValue),c=Ee(a.integerValue||a.doubleValue);return u<c?-1:u>c?1:u===c?0:isNaN(u)?isNaN(c)?0:-1:1})(n,e);case 3:return jC(n.timestampValue,e.timestampValue);case 4:return jC(ns(n),ns(e));case 5:return ol(n.stringValue,e.stringValue);case 6:return(function(i,a){let u=on(i),c=on(a);return u.compareTo(c)})(n.bytesValue,e.bytesValue);case 7:return(function(i,a){let u=i.split("/"),c=a.split("/");for(let l=0;l<u.length&&l<c.length;l++){let d=se(u[l],c[l]);if(d!==0)return d}return se(u.length,c.length)})(n.referenceValue,e.referenceValue);case 8:return(function(i,a){let u=se(Ee(i.latitude),Ee(a.latitude));return u!==0?u:se(Ee(i.longitude),Ee(a.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return KC(n.arrayValue,e.arrayValue);case 10:return(function(i,a){let u=i.fields||{},c=a.fields||{},l=u[lr]?.arrayValue,d=c[lr]?.arrayValue,f=se(l?.values?.length||0,d?.values?.length||0);return f!==0?f:KC(l,d)})(n.mapValue,e.mapValue);case 11:return(function(i,a){if(i===fo.mapValue&&a===fo.mapValue)return 0;if(i===fo.mapValue)return 1;if(a===fo.mapValue)return-1;let u=i.fields||{},c=Object.keys(u),l=a.fields||{},d=Object.keys(l);c.sort(),d.sort();for(let f=0;f<c.length&&f<d.length;++f){let m=ol(c[f],d[f]);if(m!==0)return m;let v=at(u[c[f]],l[d[f]]);if(v!==0)return v}return se(c.length,d.length)})(n.mapValue,e.mapValue);default:throw Q(23264,{l:t})}}function jC(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return se(n,e);let t=an(n),r=an(e),s=se(t.seconds,r.seconds);return s!==0?s:se(t.nanos,r.nanos)}function KC(n,e){let t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){let i=at(t[s],r[s]);if(i!==void 0&&i!==0)return i}return se(t.length,r.length)}function is(n){return cl(n)}function cl(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){let r=an(t);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return on(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return Z.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let r="[",s=!0;for(let i of t.values||[])s?s=!1:r+=",",r+=cl(i);return r+"]"})(n.arrayValue):"mapValue"in n?(function(t){let r=Object.keys(t.fields||{}).sort(),s="{",i=!0;for(let a of r)i?i=!1:s+=",",s+=`${a}:${cl(t.fields[a])}`;return s+"}"})(n.mapValue):Q(61005,{value:n})}function mo(n){switch(Oe(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:let e=Zi(n);return e?16+mo(e):16;case 5:return 2*n.stringValue.length;case 6:return on(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,i)=>s+mo(i)),0)})(n.arrayValue);case 10:case 11:return(function(r){let s=0;return br(r.fields,((i,a)=>{s+=i.length+mo(a)})),s})(n.mapValue);default:throw Q(13486,{value:n})}}function Vt(n){return!!n&&"integerValue"in n}function ir(n){return!!n&&"doubleValue"in n}function Fn(n){return Vt(n)||ir(n)}function as(n){return!!n&&"arrayValue"in n}function dt(n){return!!n&&"nullValue"in n}function ot(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Qr(n){return!!n&&"mapValue"in n}function Ti(n){return(n?.mapValue?.fields||{})[Wh]?.stringValue===Qh}function ll(n){return(n?.mapValue?.fields||{})[lr]?.arrayValue}function Ci(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){let e={mapValue:{fields:{}}};return br(n.mapValue.fields,((t,r)=>e.mapValue.fields[t]=Ci(r))),e}if(n.arrayValue){let e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Ci(n.arrayValue.values[t]);return e}return{...n}}function Fg(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Og}var Cb={mapValue:{fields:{[Wh]:{stringValue:Qh},[lr]:{arrayValue:{}}}}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ze=class n{constructor(e){this.value=e}static empty(){return new n({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Qr(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ci(t)}setAll(e){let t=pt.emptyPath(),r={},s=[];e.forEach(((a,u)=>{if(!t.isImmediateParentOf(u)){let c=this.getFieldsMap(t);this.applyChanges(c,r,s),r={},s=[],t=u.popLast()}a?r[u.lastSegment()]=Ci(a):s.push(u.lastSegment())}));let i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){let t=this.field(e.popLast());Qr(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return wt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];Qr(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){br(t,((s,i)=>e[s]=i));for(let s of r)delete e[s]}clone(){return new n(Ci(this.value))}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function du(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:rs(e)?"-0":e}}function $h(n){return{integerValue:""+n}}function Yh(n,e,t){return vw(e)?$h(e):du(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var os=class{constructor(){this._=void 0}};function Sw(n,e,t){return n instanceof Br?(function(s,i){let a={fields:{[Sg]:{stringValue:bg},[Pg]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Xi(i)&&(i=Zi(i)),i&&(a.fields[Rg]=i),{mapValue:a}})(t,e):n instanceof hr?Lg(n,e):n instanceof dr?xg(n,e):n instanceof fr?(function(s,i){let a=Pw(s,i),u=Ao(a)+Ao(s.h);return Vt(a)&&Vt(s.h)?$h(u):du(s.serializer,u)})(n,e):n instanceof us?(function(s,i){return JC(s,i,Math.min)})(n,e):n instanceof cs?(function(s,i){return JC(s,i,Math.max)})(n,e):void 0}function Rw(n,e,t){return n instanceof hr?Lg(n,e):n instanceof dr?xg(n,e):t}function Pw(n,e){return n instanceof fr?Fn(e)?e:{integerValue:0}:null}var Br=class extends os{},hr=class extends os{constructor(e){super(),this.elements=e}};function Lg(n,e){let t=kg(e);for(let r of n.elements)t.some((s=>wt(s,r)))||t.push(r);return{arrayValue:{values:t}}}var dr=class extends os{constructor(e){super(),this.elements=e}};function xg(n,e){let t=kg(e);for(let r of n.elements)t=t.filter((s=>!wt(s,r)));return{arrayValue:{values:t}}}var Ai=class extends os{constructor(e,t){super(),this.serializer=e,this.h=t}},fr=class extends Ai{},us=class extends Ai{},cs=class extends Ai{};function JC(n,e,t){if(!Fn(e))return n.h;let r=t(Ao(e),Ao(n.h));return Vt(e)&&Vt(n.h)?$h(r):du(n.serializer,r)}function Ao(n){return Ee(n.integerValue||n.doubleValue)}function kg(n){return as(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Bl=class{constructor(e,t){this.field=e,this.transform=t}};function Nw(n,e){return n.field.isEqual(e.field)&&(function(r,s){return r instanceof hr&&s instanceof hr||r instanceof dr&&s instanceof dr?es(r.elements,s.elements,wt):r instanceof fr&&s instanceof fr||r instanceof us&&s instanceof us||r instanceof cs&&s instanceof cs?wt(r.h,s.h):r instanceof Br&&s instanceof Br})(n.transform,e.transform)}var St=class n{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new n}static exists(e){return new n(void 0,e)}static updateTime(e){return new n(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}};function Eo(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}var ls=class{};function Vg(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Bs(n.key,St.none()):new pr(n.key,n.data,St.none());{let t=n.data,r=Ze.empty(),s=new Ve(pt.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new un(n.key,r,new Rt(s.toArray()),St.none())}}function Ow(n,e,t){n instanceof pr?(function(s,i,a){let u=s.value.clone(),c=WC(s.fieldTransforms,i,a.transformResults);u.setAll(c),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()})(n,e,t):n instanceof un?(function(s,i,a){if(!Eo(s.precondition,i))return void i.convertToUnknownDocument(a.version);let u=WC(s.fieldTransforms,i,a.transformResults),c=i.data;c.setAll(Mg(s)),c.setAll(u),i.convertToFoundDocument(a.version,c).setHasCommittedMutations()})(n,e,t):(function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()})(0,e,t)}function gi(n,e,t,r){return n instanceof pr?(function(i,a,u,c){if(!Eo(i.precondition,a))return u;let l=i.value.clone(),d=QC(i.fieldTransforms,c,a);return l.setAll(d),a.convertToFoundDocument(a.version,l).setHasLocalMutations(),null})(n,e,t,r):n instanceof un?(function(i,a,u,c){if(!Eo(i.precondition,a))return u;let l=QC(i.fieldTransforms,c,a),d=a.data;return d.setAll(Mg(i)),d.setAll(l),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),u===null?null:u.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((f=>f.field)))})(n,e,t,r):(function(i,a,u){return Eo(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):u})(n,e,t)}function zC(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&es(r,s,((i,a)=>Nw(i,a)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}var pr=class extends ls{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}},un=class extends ls{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}};function Mg(n){let e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){let r=n.data.field(t);e.set(t,r)}})),e}function WC(n,e,t){let r=new Map;Y(n.length===t.length,32656,{T:t.length,P:n.length});for(let s=0;s<t.length;s++){let i=n[s],a=i.transform,u=e.data.field(i.field);r.set(i.field,Rw(a,u,t[s]))}return r}function QC(n,e,t){let r=new Map;for(let s of n){let i=s.transform,a=t.data.field(s.field);r.set(s.field,Sw(i,a,e))}return r}var Bs=class extends ls{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}},vo=class extends ls{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Cr=class{constructor(e,t){this.position=e,this.inclusive=t}};function $C(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){let i=e[s],a=n.position[s];if(i.field.isKeyField()?r=Z.comparator(Z.fromName(a.referenceValue),t.key):r=at(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function YC(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!wt(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var bo=class{},Re=class n extends bo{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new dl(e,t,r):t==="array-contains"?new Cl(e,r):t==="in"?new gl(e,r):t==="not-in"?new ml(e,r):t==="array-contains-any"?new El(e,r):new n(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new fl(e,r):new pl(e,r)}matches(e){let t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(at(t,this.value)):t!==null&&Oe(this.value)===Oe(t)&&this.matchesComparison(at(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return Q(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}},Pt=class n extends bo{constructor(e,t){super(),this.filters=e,this.op=t,this.I=null}static create(e,t){return new n(e,t)}matches(e){return Gg(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.I!==null||(this.I=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.I}getFilters(){return Object.assign([],this.filters)}};function Gg(n){return n.op==="and"}function Ug(n){return Fw(n)&&Gg(n)}function Fw(n){for(let e of n.filters)if(e instanceof Pt)return!1;return!0}function hl(n){if(n instanceof Re)return n.field.canonicalString()+n.op.toString()+is(n.value);if(Ug(n))return n.filters.map((e=>hl(e))).join(",");{let e=n.filters.map((t=>hl(t))).join(",");return`${n.op}(${e})`}}function Hg(n,e){return n instanceof Re?(function(r,s){return s instanceof Re&&r.op===s.op&&r.field.isEqual(s.field)&&wt(r.value,s.value)})(n,e):n instanceof Pt?(function(r,s){return s instanceof Pt&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((i,a,u)=>i&&Hg(a,s.filters[u])),!0):!1})(n,e):void Q(19439)}function qg(n){return n instanceof Re?(function(t){return`${t.field.canonicalString()} ${t.op} ${is(t.value)}`})(n):n instanceof Pt?(function(t){return t.op.toString()+" {"+t.getFilters().map(qg).join(" ,")+"}"})(n):"Filter"}var dl=class extends Re{constructor(e,t,r){super(e,t,r),this.key=Z.fromName(r.referenceValue)}matches(e){let t=Z.comparator(e.key,this.key);return this.matchesComparison(t)}},fl=class extends Re{constructor(e,t){super(e,"in",t),this.keys=jg("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}},pl=class extends Re{constructor(e,t){super(e,"not-in",t),this.keys=jg("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}};function jg(n,e){return(e.arrayValue?.values||[]).map((t=>Z.fromName(t.referenceValue)))}var Cl=class extends Re{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return as(t)&&Ii(t.arrayValue,this.value)}},gl=class extends Re{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return t!==null&&Ii(this.value.arrayValue,t)}},ml=class extends Re{constructor(e,t){super(e,"not-in",t)}matches(e){if(Ii(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Ii(this.value.arrayValue,t)}},El=class extends Re{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!as(t)||!t.arrayValue.values)&&t.arrayValue.values.some((r=>Ii(this.value.arrayValue,r)))}};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var gr=class{constructor(e,t="asc"){this.field=e,this.dir=t}};function Lw(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var te=class n{static fromTimestamp(e){return new n(e)}static min(){return new n(new Ie(0,0))}static max(){return new n(new Ie(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var gt=class n{constructor(e,t,r,s,i,a,u){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=u}static newInvalidDocument(e){return new n(e,0,te.min(),te.min(),te.min(),Ze.empty(),0)}static newFoundDocument(e,t,r,s){return new n(e,1,t,te.min(),r,s,0)}static newNoDocument(e,t){return new n(e,2,t,te.min(),te.min(),Ze.empty(),0)}static newUnknownDocument(e,t){return new n(e,3,t,te.min(),te.min(),Ze.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(te.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Ze.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Ze.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=te.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof n&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new n(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var vi=-1,So=class{constructor(e,t,r,s){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=s}};So.UNKNOWN_ID=-1;function xw(n,e){let t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=te.fromTimestamp(r===1e9?new Ie(t+1,0):new Ie(t,r));return new mr(s,Z.empty(),e)}function kw(n){return new mr(n.readTime,n.key,vi)}var mr=class n{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new n(te.min(),Z.empty(),vi)}static max(){return new n(te.max(),Z.empty(),vi)}};function Vw(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=Z.comparator(n.documentKey,e.documentKey),t!==0?t:se(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var _l=class{constructor(e,t=null,r=[],s=[],i=null,a=null,u=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=u,this.R=null}};function XC(n,e=null,t=[],r=[],s=null,i=null,a=null){return new _l(n,e,t,r,s,i,a)}function Kg(n){let e=ie(n);if(e.R===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((r=>hl(r))).join(","),t+="|ob:",t+=e.orderBy.map((r=>(function(i){return i.field.canonicalString()+i.dir})(r))).join(","),ea(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((r=>is(r))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((r=>is(r))).join(",")),e.R=t}return e.R}function Jg(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Lw(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Hg(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!YC(n.startAt,e.startAt)&&YC(n.endAt,e.endAt)}function sr(n){return!!n.isCorePipeline}function zg(n){return!!n.path&&Z.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var hs=class{constructor(e,t=null,r=[],s=[],i=null,a="F",u=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=u,this.endAt=c,this.A=null,this.V=null,this.m=null,this.startAt,this.endAt}};function Mw(n,e,t,r,s,i,a,u){return new hs(n,e,t,r,s,i,a,u)}function fu(n){return new hs(n)}function ZC(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Gw(n){return Z.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Wg(n){return n.collectionGroup!==null}function $r(n){let e=ie(n);if(e.A===null){e.A=[];let t=new Set;for(let i of e.explicitOrderBy)e.A.push(i),t.add(i.field.canonicalString());let r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let u=new Ve(pt.comparator);return a.filters.forEach((c=>{c.getFlattenedFilters().forEach((l=>{l.isInequality()&&(u=u.add(l.field))}))})),u})(e).forEach((i=>{t.has(i.canonicalString())||i.isKeyField()||e.A.push(new gr(i,r))})),t.has(pt.keyField().canonicalString())||e.A.push(new gr(pt.keyField(),r))}return e.A}function Gt(n){let e=ie(n);return e.V||(e.V=Uw(e,$r(n))),e.V}function Uw(n,e){if(n.limitType==="F")return XC(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((s=>{let i=s.dir==="desc"?"asc":"desc";return new gr(s.field,i)}));let t=n.endAt?new Cr(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Cr(n.startAt.position,n.startAt.inclusive):null;return XC(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Ro(n,e,t){return new hs(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Hw(n,e){return Jg(Gt(n),Gt(e))&&n.limitType===e.limitType}function mi(n){return`Query(target=${(function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map((s=>qg(s))).join(", ")}]`),ea(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map((s=>(function(a){return`${a.field.canonicalString()} (${a.dir})`})(s))).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map((s=>is(s))).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map((s=>is(s))).join(",")),`Target(${r})`})(Gt(n))}; limitType=${n.limitType})`}function pu(n,e){return e.isFoundDocument()&&(function(r,s){let i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):Z.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)})(n,e)&&(function(r,s){for(let i of $r(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(n,e)&&(function(r,s){for(let i of r.filters)if(!i.matches(s))return!1;return!0})(n,e)&&(function(r,s){return!(r.startAt&&!(function(a,u,c){let l=$C(a,u,c);return a.inclusive?l<=0:l<0})(r.startAt,$r(r),s)||r.endAt&&!(function(a,u,c){let l=$C(a,u,c);return a.inclusive?l>=0:l>0})(r.endAt,$r(r),s))})(n,e)}function Xh(n){return(e,t)=>{let r=!1;for(let s of $r(n)){let i=qw(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function qw(n,e,t){let r=n.field.isKeyField()?Z.comparator(e.key,t.key):(function(i,a,u){let c=a.data.field(i),l=u.data.field(i);return c!==null&&l!==null?at(c,l):Q(42886)})(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return Q(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Dl=class{constructor(e,t){this.count=e,this.unchangedNames=t}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var be,ce;function jw(n){switch(n){case x.OK:return Q(64938);case x.CANCELLED:case x.UNKNOWN:case x.DEADLINE_EXCEEDED:case x.RESOURCE_EXHAUSTED:case x.INTERNAL:case x.UNAVAILABLE:case x.UNAUTHENTICATED:return!1;case x.INVALID_ARGUMENT:case x.NOT_FOUND:case x.ALREADY_EXISTS:case x.PERMISSION_DENIED:case x.FAILED_PRECONDITION:case x.ABORTED:case x.OUT_OF_RANGE:case x.UNIMPLEMENTED:case x.DATA_LOSS:return!0;default:return Q(15467,{code:n})}}function Qg(n){if(n===void 0)return sn("GRPC error has no .code"),x.UNKNOWN;switch(n){case be.OK:return x.OK;case be.CANCELLED:return x.CANCELLED;case be.UNKNOWN:return x.UNKNOWN;case be.DEADLINE_EXCEEDED:return x.DEADLINE_EXCEEDED;case be.RESOURCE_EXHAUSTED:return x.RESOURCE_EXHAUSTED;case be.INTERNAL:return x.INTERNAL;case be.UNAVAILABLE:return x.UNAVAILABLE;case be.UNAUTHENTICATED:return x.UNAUTHENTICATED;case be.INVALID_ARGUMENT:return x.INVALID_ARGUMENT;case be.NOT_FOUND:return x.NOT_FOUND;case be.ALREADY_EXISTS:return x.ALREADY_EXISTS;case be.PERMISSION_DENIED:return x.PERMISSION_DENIED;case be.FAILED_PRECONDITION:return x.FAILED_PRECONDITION;case be.ABORTED:return x.ABORTED;case be.OUT_OF_RANGE:return x.OUT_OF_RANGE;case be.UNIMPLEMENTED:return x.UNIMPLEMENTED;case be.DATA_LOSS:return x.DATA_LOSS;default:return Q(39323,{code:n})}}(ce=be||(be={}))[ce.OK=0]="OK",ce[ce.CANCELLED=1]="CANCELLED",ce[ce.UNKNOWN=2]="UNKNOWN",ce[ce.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ce[ce.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ce[ce.NOT_FOUND=5]="NOT_FOUND",ce[ce.ALREADY_EXISTS=6]="ALREADY_EXISTS",ce[ce.PERMISSION_DENIED=7]="PERMISSION_DENIED",ce[ce.UNAUTHENTICATED=16]="UNAUTHENTICATED",ce[ce.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ce[ce.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ce[ce.ABORTED=10]="ABORTED",ce[ce.OUT_OF_RANGE=11]="OUT_OF_RANGE",ce[ce.UNIMPLEMENTED=12]="UNIMPLEMENTED",ce[ce.INTERNAL=13]="INTERNAL",ce[ce.UNAVAILABLE=14]="UNAVAILABLE",ce[ce.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var cn=class{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(let[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){let r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){br(this.inner,((t,r)=>{for(let[s,i]of r)e(s,i)}))}isEmpty(){return Ag(this.inner)}size(){return this.innerSize}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Kw=new Te(Z.comparator);function ft(){return Kw}var $g=new Te(Z.comparator);function Kr(...n){let e=$g;for(let t of n)e=e.insert(t.key,t);return e}function Jw(n){let e=$g;return n.forEach(((t,r)=>e=e.insert(t,r.overlayedDocument))),e}function Pn(){return Ei()}function Yg(){return Ei()}function Ei(){return new cn((n=>n.toString()),((n,e)=>n.isEqual(e)))}var gb=new Te(Z.comparator),zw=new Ve(Z.comparator);function oe(...n){let e=zw;for(let t of n)e=e.add(t);return e}var Ww=new Ve(se);function Qw(){return Ww}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var $w=null;/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yw(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Xw=new Qt([4294967295,4294967295],0);function eg(n){let e=Yw().encode(n),t=new Uc;return t.update(e),new Uint8Array(t.digest())}function tg(n){let e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Qt([t,r],0),new Qt([s,i],0)]}var yl=class n{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new ar(`Invalid padding: ${t}`);if(r<0)throw new ar(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new ar(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new ar(`Invalid padding when bitmap length is 0: ${t}`);this.p=8*e.length-t,this.S=Qt.fromNumber(this.p)}v(e,t,r){let s=e.add(t.multiply(Qt.fromNumber(r)));return s.compare(Xw)===1&&(s=new Qt([s.getBits(0),s.getBits(1)],0)),s.modulo(this.S).toNumber()}D(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.p===0)return!1;let t=eg(e),[r,s]=tg(t);for(let i=0;i<this.hashCount;i++){let a=this.v(r,s,i);if(!this.D(a))return!1}return!0}static create(e,t,r){let s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new n(i,s,t);return r.forEach((u=>a.insert(u))),a}insert(e){if(this.p===0)return;let t=eg(e),[r,s]=tg(t);for(let i=0;i<this.hashCount;i++){let a=this.v(r,s,i);this.C(a)}}C(e){let t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}},ar=class extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var bi=class n{constructor(e,t,r,s,i,a){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.augmentedDocumentUpdates=i,this.resolvedLimboDocuments=a}static createSynthesizedRemoteEventForCurrentChange(e,t,r){let s=new Map;return s.set(e,Si.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new n(te.min(),s,new Te(se),ft(),ft(),oe())}},Si=class n{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new n(r,t,oe(),oe(),oe())}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Yr=class{constructor(e,t,r,s){this.F=e,this.removedTargetIds=t,this.key=r,this.O=s}},Po=class{constructor(e,t){this.targetId=e,this.M=t}},No=class{constructor(e,t,r=Ne.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}},Oo=class{constructor(e){this.targetId=e,this.N=0,this.L=ng(),this.B=Ne.EMPTY_BYTE_STRING,this.U=!1,this.k=!0}get current(){return this.U}get resumeToken(){return this.B}get q(){return this.N!==0}get $(){return this.k}K(e){e.approximateByteSize()>0&&(this.k=!0,this.B=e)}W(){let e=oe(),t=oe(),r=oe();return this.L.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:Q(38017,{changeType:i})}})),new Si(this.B,this.U,e,t,r)}G(){this.k=!1,this.L=ng()}j(e,t){this.k=!0,this.L=this.L.insert(e,t)}H(e){this.k=!0,this.L=this.L.remove(e)}J(){this.N+=1}Y(){this.N-=1,Y(this.N>=0,3241,{N:this.N,targetId:this.targetId})}Z(){this.k=!0,this.U=!0}},fi="WatchChangeAggregator",wl=class{constructor(e){this.X=e,this.ee=new Map,this.te=ft(),this.ne=po(),this.re=ft(),this.ie=po(),this.se=new Te(se)}_e(e){for(let t of e.F)e.O&&e.O.isFoundDocument()?this.oe(t,e.O):this.ae(t,e.key,e.O);for(let t of e.removedTargetIds)this.ae(t,e.key,e.O)}ue(e){this.forEachTarget(e,(t=>{let r=this.ee.get(t);if(r)switch(e.state){case 0:this.ce(t)&&r.K(e.resumeToken);break;case 1:r.Y(),r.q||r.G(),r.K(e.resumeToken);break;case 2:r.Y(),r.q||this.removeTarget(t);break;case 3:this.ce(t)&&(r.Z(),r.K(e.resumeToken));break;case 4:this.ce(t)&&(this.le(t),r.K(e.resumeToken));break;default:Q(56790,{state:e.state})}else j(fi,`handleTargetChange received targetChange for untracked target ID (${t}) with state (${e.state})`)}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ee.forEach(((r,s)=>{this.ce(s)&&t(s)}))}Ee(e){return sr(e)?e.getPipelineSourceType()==="documents"&&e.getPipelineDocuments()?.length===1:zg(e)}he(e){let t=e.targetId,r=e.M.count,s=this.Te(t);if(s){let i=s.target;if(this.Ee(i))if(r===0){let a=new Z(sr(i)?he.fromString(i.getPipelineDocuments()[0]):i.path);this.ae(t,a,gt.newNoDocument(a,te.min()))}else Y(r===1,20013,"Single document existence filter with count: "+r);else{let a=this.Pe(t);if(a!==r){let u=this.Ie(e),c=u?this.Re(u,e,a):1;if(c!==0){this.le(t);let l=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.se=this.se.insert(t,l)}$w?.Ae((function(d,f,m,v,R){let V={localCacheCount:d,existenceFilterCount:f.count,databaseId:m.database,projectId:m.projectId},H=f.unchangedNames;return H&&(V.bloomFilter={applied:R===0,hashCount:H?.hashCount??0,bitmapLength:H?.bits?.bitmap?.length??0,padding:H?.bits?.padding??0,mightContain:z=>v?.mightContain(z)??!1}),V})(a,e.M,this.X.Ve(),u,c))}}}}Ie(e){let t=e.M.unchangedNames;if(!t||!t.bits)return null;let{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t,a,u;try{a=on(r).toUint8Array()}catch(c){if(c instanceof Io)return yt("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{u=new yl(a,s,i)}catch(c){return yt(c instanceof ar?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return u.p===0?null:u}Re(e,t,r){return t.M.count===r-this.de(e,t.targetId)?0:2}de(e,t){let r=this.X.getRemoteKeysForTarget(t),s=0;return r.forEach((i=>{let a=this.X.Ve(),u=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(u)||(this.ae(t,i,null),s++)})),s}fe(e){let t=new Map;this.ee.forEach(((i,a)=>{let u=this.Te(a);if(u){if(i.current&&this.Ee(u.target)){let c=sr(u.target)?he.fromString(u.target.getPipelineDocuments()[0]):u.target.path,l=new Z(c);this.me(l).has(a)||this.pe(a,l)||this.ae(a,l,gt.newNoDocument(l,e))}i.$&&(t.set(a,i.W()),i.G())}}));let r=oe();this.ie.forEach(((i,a)=>{let u=!0;a.forEachWhile((c=>{let l=this.Te(c);return!l||l.purpose==="TargetPurposeLimboResolution"||(u=!1,!1)})),u&&(r=r.add(i))})),this.te.forEach(((i,a)=>a.setReadTime(e))),this.re.forEach(((i,a)=>a.setReadTime(e)));let s=new bi(e,t,this.se,this.te,this.re,r);return this.te=ft(),this.ne=po(),this.re=ft(),this.ie=po(),this.se=new Te(se),s}oe(e,t){let r=this.ee.get(e);if(!r||!this.ce(e))return void j(fi,`addDocumentToTarget received document for unknown inactive target (${e})`);let s=this.pe(e,t.key)?2:0;r.j(t.key,s),sr(this.Te(e).target)&&this.Te(e).target.getPipelineFlavor()!=="exact"?this.re=this.re.insert(t.key,t):this.te=this.te.insert(t.key,t),this.ne=this.ne.insert(t.key,this.me(t.key).add(e)),this.ie=this.ie.insert(t.key,this.ge(t.key).add(e))}ae(e,t,r){let s=this.ee.get(e);s&&this.ce(e)?(this.pe(e,t)?s.j(t,1):s.H(t),this.ie=this.ie.insert(t,this.ge(t).delete(e)),this.ie=this.ie.insert(t,this.ge(t).add(e)),r&&(sr(this.Te(e).target)&&this.Te(e).target.getPipelineFlavor()!=="exact"?this.re=this.re.insert(t,r):this.te=this.te.insert(t,r))):j(fi,`removeDocumentFromTarget received document for unknown or inactive target (${e})`)}removeTarget(e){this.ee.delete(e)}Pe(e){let t=this.ee.get(e);if(!t)return 0;let r=t.W();return this.X.getRemoteKeysForTarget(e).size+r.addedDocuments.size-r.removedDocuments.size}J(e){let t=this.ee.get(e);t||(j(fi,`recordPendingTargetRequest set up tracking for target ID ${e}`),t=new Oo(e),this.ee.set(e,t)),t.J()}ge(e){let t=this.ie.get(e);return t||(t=new Ve(se),this.ie=this.ie.insert(e,t)),t}me(e){let t=this.ne.get(e);return t||(t=new Ve(se),this.ne=this.ne.insert(e,t)),t}ce(e){let t=this.Te(e)!==null;return t||j(fi,"Detected inactive target",e),t}Te(e){let t=this.ee.get(e);return t===void 0||t.q?null:this.X.ye(e)}le(e){this.ee.set(e,new Oo(e)),this.X.getRemoteKeysForTarget(e).forEach((t=>{this.ae(e,t,null)}))}pe(e,t){return this.X.getRemoteKeysForTarget(e).has(t)}};function po(){return new Te(Z.comparator)}function ng(){return new Te(Z.comparator)}var Zw={asc:"ASCENDING",desc:"DESCENDING"},eI={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},tI={and:"AND",or:"OR"},Il=class{constructor(e,t){this.databaseId=e,this.useProto3Json=t}};function Tl(n,e){return n.useProto3Json||ea(e)?e:{value:e}}function _i(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Zh(n){let e=an(n);return new Ie(e.seconds,e.nanos)}function Xg(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function _o(n,e){return _i(n,e.toTimestamp())}function en(n){return Y(!!n,49232),te.fromTimestamp(Zh(n))}function ed(n,e){return Al(n,e).canonicalString()}function Al(n,e){let t=(function(s){return new he(["projects",s.projectId,"databases",s.database])})(n).child("documents");return e===void 0?t:t.child(e)}function Zg(n){let e=he.fromString(n);return Y(sm(e),10190,{key:e.toString()}),e}function Ri(n,e){return ed(n.databaseId,e.path)}function Di(n,e){let t=Zg(e);if(t.get(1)!==n.databaseId.projectId)throw new K(x.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new K(x.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new Z(tm(t))}function em(n,e){return ed(n.databaseId,e)}function nI(n){let e=Zg(n);return e.length===4?he.emptyPath():tm(e)}function rg(n){return new he(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function tm(n){return Y(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function sg(n,e,t){return{name:Ri(n,e),fields:t.value.mapValue.fields}}function rI(n,e){return"found"in e?(function(r,s){Y(!!s.found,43571),s.found.name,s.found.updateTime;let i=Di(r,s.found.name),a=en(s.found.updateTime),u=s.found.createTime?en(s.found.createTime):te.min(),c=new Ze({mapValue:{fields:s.found.fields}});return gt.newFoundDocument(i,a,u,c)})(n,e):"missing"in e?(function(r,s){Y(!!s.missing,3894),Y(!!s.readTime,22933);let i=Di(r,s.missing),a=en(s.readTime);return gt.newNoDocument(i,a)})(n,e):Q(7234,{result:e})}function sI(n,e){let t;if("targetChange"in e){e.targetChange;let r=(function(l){return l==="NO_CHANGE"?0:l==="ADD"?1:l==="REMOVE"?2:l==="CURRENT"?3:l==="RESET"?4:Q(39313,{state:l})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(l,d){return l.useProto3Json?(Y(d===void 0||typeof d=="string",58123),Ne.fromBase64String(d||"")):(Y(d===void 0||d instanceof Buffer||d instanceof Uint8Array,16193),Ne.fromUint8Array(d||new Uint8Array))})(n,e.targetChange.resumeToken),a=e.targetChange.cause,u=a&&(function(l){let d=l.code===void 0?x.UNKNOWN:Qg(l.code);return new K(d,l.message||"")})(a);t=new No(r,s,i,u||null)}else if("documentChange"in e){e.documentChange;let r=e.documentChange;r.document,r.document.name,r.document.updateTime;let s=Di(n,r.document.name),i=en(r.document.updateTime),a=r.document.createTime?en(r.document.createTime):te.min(),u=new Ze({mapValue:{fields:r.document.fields}}),c=gt.newFoundDocument(s,i,a,u),l=r.targetIds||[],d=r.removedTargetIds||[];t=new Yr(l,d,c.key,c)}else if("documentDelete"in e){e.documentDelete;let r=e.documentDelete;r.document;let s=Di(n,r.document),i=r.readTime?en(r.readTime):te.min(),a=gt.newNoDocument(s,i),u=r.removedTargetIds||[];t=new Yr([],u,a.key,a)}else if("documentRemove"in e){e.documentRemove;let r=e.documentRemove;r.document;let s=Di(n,r.document),i=r.removedTargetIds||[];t=new Yr([],i,s,null)}else{if(!("filter"in e))return Q(11601,{we:e});{e.filter;let r=e.filter;r.targetId;let{count:s=0,unchangedNames:i}=r,a=new Dl(s,i),u=r.targetId;t=new Po(u,a)}}return t}function iI(n,e){let t;if(e instanceof pr)t={update:sg(n,e.key,e.value)};else if(e instanceof Bs)t={delete:Ri(n,e.key)};else if(e instanceof un)t={update:sg(n,e.key,e.data),updateMask:fI(e.fieldMask)};else{if(!(e instanceof vo))return Q(16599,{be:e.type});t={verify:Ri(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((r=>(function(i,a){let u=a.transform;if(u instanceof Br)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof hr)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof dr)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof fr)return{fieldPath:a.field.canonicalString(),increment:u.h};if(u instanceof us)return{fieldPath:a.field.canonicalString(),minimum:u.h};if(u instanceof cs)return{fieldPath:a.field.canonicalString(),maximum:u.h};throw Q(20930,{transform:a.transform})})(0,r)))),e.precondition.isNone||(t.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:_o(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:Q(27497)})(n,e.precondition)),t}function aI(n,e){return{documents:[em(n,e.path)]}}function oI(n,e){let t={structuredQuery:{}},r=e.path,s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=em(n,s);let i=(function(l){if(l.length!==0)return rm(Pt.create(l,"and"))})(e.filters);i&&(t.structuredQuery.where=i);let a=(function(l){if(l.length!==0)return l.map((d=>(function(m){return{field:Jr(m.field),direction:BI(m.dir)}})(d)))})(e.orderBy);a&&(t.structuredQuery.orderBy=a);let u=Tl(n,e.limit);return u!==null&&(t.structuredQuery.limit=u),e.startAt&&(t.structuredQuery.startAt=(function(l){return{before:l.inclusive,values:l.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(l){return{before:!l.inclusive,values:l.position}})(e.endAt)),{Se:t,parent:s}}function uI(n){let e=nI(n.parent),t=n.structuredQuery,r=t.from?t.from.length:0,s=null;if(r>0){Y(r===1,65062);let d=t.from[0];d.allDescendants?s=d.collectionId:e=e.child(d.collectionId)}let i=[];t.where&&(i=(function(f){let m=nm(f);return m instanceof Pt&&Ug(m)?m.getFilters():[m]})(t.where));let a=[];t.orderBy&&(a=(function(f){return f.map((m=>(function(R){return new gr(zr(R.field),(function(H){switch(H){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(R.direction))})(m)))})(t.orderBy));let u=null;t.limit&&(u=(function(f){let m;return m=typeof f=="object"?f.value:f,ea(m)?null:m})(t.limit));let c=null;t.startAt&&(c=(function(f){let m=!!f.before,v=f.values||[];return new Cr(v,m)})(t.startAt));let l=null;return t.endAt&&(l=(function(f){let m=!f.before,v=f.values||[];return new Cr(v,m)})(t.endAt)),Mw(e,s,a,i,u,"F",c,l)}function cI(n,e){let t=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return Q(28987,{purpose:s})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function lI(n,e){return{structuredPipeline:{pipeline:{stages:e.stages.map((t=>t._toProto(n)))}}}}function nm(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":let r=zr(t.unaryFilter.field);return Re.create(r,"==",{doubleValue:NaN});case"IS_NULL":let s=zr(t.unaryFilter.field);return Re.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let i=zr(t.unaryFilter.field);return Re.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let a=zr(t.unaryFilter.field);return Re.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return Q(61313);default:return Q(60726)}})(n):n.fieldFilter!==void 0?(function(t){return Re.create(zr(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return Q(58110);default:return Q(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return Pt.create(t.compositeFilter.filters.map((r=>nm(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return Q(1026)}})(t.compositeFilter.op))})(n):Q(30097,{filter:n})}function BI(n){return Zw[n]}function hI(n){return eI[n]}function dI(n){return tI[n]}function Jr(n){return{fieldPath:n.canonicalString()}}function zr(n){return pt.fromServerFormat(n.fieldPath)}function rm(n){return n instanceof Re?(function(t){if(t.op==="=="){if(ot(t.value))return{unaryFilter:{field:Jr(t.field),op:"IS_NAN"}};if(dt(t.value))return{unaryFilter:{field:Jr(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(ot(t.value))return{unaryFilter:{field:Jr(t.field),op:"IS_NOT_NAN"}};if(dt(t.value))return{unaryFilter:{field:Jr(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Jr(t.field),op:hI(t.op),value:t.value}}})(n):n instanceof Pt?(function(t){let r=t.getFilters().map((s=>rm(s)));return r.length===1?r[0]:{compositeFilter:{op:dI(t.op),filters:r}}})(n):Q(54877,{filter:n})}function fI(n){let e=[];return n.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function sm(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function im(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}function Pi(n,e){let t={fields:{}};return e.forEach(((r,s)=>{if(typeof s!="string")throw new Error(`Cannot encode map with non-string key: ${s}`);t.fields[s]=r._toProto(n)})),{mapValue:t}}function am(n){return{stringValue:n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cu(n){return new Il(n,!0)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ut=class n{constructor(e){this._byteString=e}static fromBase64String(e){try{return new n(Ne.fromBase64String(e))}catch(t){throw new K(x.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new n(Ne.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:n._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Yi(e,n._jsonSchema))return n.fromBase64String(e.bytes)}};Ut._jsonSchemaVersion="firestore/bytes/1.0",Ut._jsonSchema={type:Pe("string",Ut._jsonSchemaVersion),bytes:Pe("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Er=class{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new K(x.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new pt(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}};function om(){return new Er(ts)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var _r=class{constructor(e){this._methodName=e}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var tn=class n{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new K(x.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new K(x.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return se(this._lat,e._lat)||se(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:n._jsonSchemaVersion}}static fromJSON(e){if(Yi(e,n._jsonSchema))return new n(e.latitude,e.longitude)}};tn._jsonSchemaVersion="firestore/geoPoint/1.0",tn._jsonSchema={type:Pe("string",tn._jsonSchemaVersion),latitude:Pe("number"),longitude:Pe("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ue=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};Ue.UNAUTHENTICATED=new Ue(null),Ue.GOOGLE_CREDENTIALS=new Ue("google-credentials-uid"),Ue.FIRST_PARTY=new Ue("first-party-uid"),Ue.MOCK_USER=new Ue("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ht=class{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Fo=class{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}},Lo=class{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(Ue.UNAUTHENTICATED)))}shutdown(){}},vl=class{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}},xo=class{constructor(e){this.De=e,this.currentUser=Ue.UNAUTHENTICATED,this.xe=0,this.forceRefresh=!1,this.auth=null}start(e,t){Y(this.Ce===void 0,42304);let r=this.xe,s=c=>this.xe!==r?(r=this.xe,t(c)):Promise.resolve(),i=new Ht;this.Ce=()=>{this.xe++,this.currentUser=this.Fe(),i.resolve(),i=new Ht,e.enqueueRetryable((()=>s(this.currentUser)))};let a=()=>{let c=i;e.enqueueRetryable((async()=>{await c.promise,await s(this.currentUser)}))},u=c=>{j("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.Ce&&(this.auth.addAuthTokenListener(this.Ce),a())};this.De.onInit((c=>u(c))),setTimeout((()=>{if(!this.auth){let c=this.De.getImmediate({optional:!0});c?u(c):(j("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Ht)}}),0),a()}getToken(){let e=this.xe,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((r=>this.xe!==e?(j("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Y(typeof r.accessToken=="string",31837,{Oe:r}),new Fo(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.Ce&&this.auth.removeAuthTokenListener(this.Ce),this.Ce=void 0}Fe(){let e=this.auth&&this.auth.getUid();return Y(e===null||typeof e=="string",2055,{Me:e}),new Ue(e)}},bl=class{constructor(e,t,r){this.Ne=e,this.Le=t,this.Be=r,this.type="FirstParty",this.user=Ue.FIRST_PARTY,this.Ue=new Map}ke(){return this.Be?this.Be():null}get headers(){this.Ue.set("X-Goog-AuthUser",this.Ne);let e=this.ke();return e&&this.Ue.set("Authorization",e),this.Le&&this.Ue.set("X-Goog-Iam-Authorization-Token",this.Le),this.Ue}},Sl=class{constructor(e,t,r){this.Ne=e,this.Le=t,this.Be=r}getToken(){return Promise.resolve(new bl(this.Ne,this.Le,this.Be))}start(e,t){e.enqueueRetryable((()=>t(Ue.FIRST_PARTY)))}shutdown(){}invalidateToken(){}},ko=class{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}},Vo=class{constructor(e,t){this.qe=t,this.forceRefresh=!1,this.appCheck=null,this.$e=null,this.Ke=null,nt(e)&&e.settings.appCheckToken&&(this.Ke=e.settings.appCheckToken)}start(e,t){Y(this.Ce===void 0,3512);let r=i=>{i.error!=null&&j("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);let a=i.token!==this.$e;return this.$e=i.token,j("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.Ce=i=>{e.enqueueRetryable((()=>r(i)))};let s=i=>{j("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.Ce&&this.appCheck.addTokenListener(this.Ce)};this.qe.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){let i=this.qe.getImmediate({optional:!0});i?s(i):j("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.Ke)return Promise.resolve(new ko(this.Ke));let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(Y(typeof t.token=="string",44558,{tokenResult:t}),this.$e=t.token,new ko(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.Ce&&this.appCheck.removeTokenListener(this.Ce),this.Ce=void 0}};function um(n){let e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Rl=class{Qe(e){}shutdown(){}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ig="ConnectivityMonitor",Mo=class{constructor(){this.We=()=>this.Ge(),this.ze=()=>this.je(),this.He=[],this.Je()}Qe(e){this.He.push(e)}shutdown(){window.removeEventListener("online",this.We),window.removeEventListener("offline",this.ze)}Je(){window.addEventListener("online",this.We),window.addEventListener("offline",this.ze)}Ge(){j(ig,"Network connectivity changed: AVAILABLE");for(let e of this.He)e(0)}je(){j(ig,"Network connectivity changed: UNAVAILABLE");for(let e of this.He)e(1)}static Ye(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}};/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Co=null;function Pl(){return Co===null?Co=(function(){return 268435456+Math.round(2147483648*Math.random())})():Co++,"0x"+Co.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var nl="RestConnection",pI={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"},Nl=class{get Ze(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;let t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Xe=t+"://"+e.host,this.et=`projects/${r}/databases/${s}`,this.tt=this.databaseId.database===To?`project_id=${r}`:`project_id=${r}&database_id=${s}`}nt(e,t,r,s,i){let a=Pl(),u=this.rt(e,t.toUriEncodedString());j(nl,`Sending RPC '${e}' ${a}:`,u,r);let c={"google-cloud-resource-prefix":this.et,"x-goog-request-params":this.tt};this.it(c,s,i);let{host:l}=new URL(u),d=Jn(l);return this.st(e,u,c,r,d).then((f=>(j(nl,`Received RPC '${e}' ${a}: `,f),f)),(f=>{throw yt(nl,`RPC '${e}' ${a} failed with error: `,f,"url: ",u,"request:",r),f}))}_t(e,t,r,s,i,a){return this.nt(e,t,r,s,i)}it(e,t,r){if(e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+ws})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((s,i)=>e[i]=s)),r&&r.headers.forEach(((s,i)=>e[i]=s)),this.databaseInfo._customHeaders)for(let s of Object.keys(this.databaseInfo._customHeaders))e[s]=this.databaseInfo._customHeaders[s]}rt(e,t){let r=pI[e],s=`${this.Xe}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ol=class{constructor(e){this.ot=e.ot,this.ut=e.ut}ct(e){this.lt=e}Et(e){this.ht=e}Tt(e){this.Pt=e}onMessage(e){this.It=e}close(){this.ut()}send(e){this.ot(e)}Rt(){this.lt()}At(){this.ht()}Vt(e){this.Pt(e)}dt(e){this.It(e)}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ze="WebChannelConnection",pi=(n,e,t)=>{n.listen(e,(r=>{try{t(r)}catch(s){setTimeout((()=>{throw s}),0)}}))},Go=class n extends Nl{constructor(e){super(e),this.ft=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static gt(){if(!n.yt){let e=Kc();pi(e,jc.STAT_EVENT,(t=>{t.stat===ao.PROXY?j(ze,"STAT_EVENT: detected buffering proxy"):t.stat===ao.NOPROXY&&j(ze,"STAT_EVENT: detected no buffering proxy")})),n.yt=!0}}st(e,t,r,s,i){let a=Pl();return new Promise(((u,c)=>{let l=new Hc;l.setWithCredentials(!0),l.listenOnce(qc.COMPLETE,(()=>{try{switch(l.getLastErrorCode()){case li.NO_ERROR:let f=l.getResponseJson();j(ze,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(f)),u(f);break;case li.TIMEOUT:j(ze,`RPC '${e}' ${a} timed out`),c(new K(x.DEADLINE_EXCEEDED,"Request time out"));break;case li.HTTP_ERROR:let m=l.getStatus();if(j(ze,`RPC '${e}' ${a} failed with status:`,m,"response text:",l.getResponseText()),m>0){let v=l.getResponseJson();Array.isArray(v)&&(v=v[0]);let R=v?.error;if(R&&R.status&&R.message){let V=(function(z){let Be=z.toLowerCase().replace(/_/g,"-");return Object.values(x).indexOf(Be)>=0?Be:x.UNKNOWN})(R.status);c(new K(V,R.message))}else c(new K(x.UNKNOWN,"Server responded with status "+l.getStatus()))}else c(new K(x.UNAVAILABLE,"Connection failed."));break;default:Q(9055,{wt:e,streamId:a,bt:l.getLastErrorCode(),St:l.getLastError()})}}finally{j(ze,`RPC '${e}' ${a} completed.`)}}));let d=JSON.stringify(s);j(ze,`RPC '${e}' ${a} sending request:`,s),l.send(t,"POST",d,r,15)}))}vt(e,t,r){let s=Pl(),i=[this.Xe,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=this.createWebChannelTransport(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;c!==void 0&&(u.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(u.useFetchStreams=!0),this.it(u.initMessageHeaders,t,r),u.encodeInitMessageHeaders=!0;let l=i.join("");j(ze,`Creating RPC '${e}' stream ${s}: ${l}`,u);let d=a.createWebChannel(l,u);this.Dt(d);let f=!1,m=!1,v=new Ol({ot:R=>{m?j(ze,`Not sending because RPC '${e}' stream ${s} is closed:`,R):(f||(j(ze,`Opening RPC '${e}' stream ${s} transport.`),d.open(),f=!0),j(ze,`RPC '${e}' stream ${s} sending:`,R),d.send(R))},ut:()=>d.close()});return pi(d,Gr.EventType.OPEN,(()=>{m||(j(ze,`RPC '${e}' stream ${s} transport opened.`),v.Rt())})),pi(d,Gr.EventType.CLOSE,(()=>{m||(m=!0,j(ze,`RPC '${e}' stream ${s} transport closed`),v.Vt(),this.xt(d))})),pi(d,Gr.EventType.ERROR,(R=>{m||(m=!0,yt(ze,`RPC '${e}' stream ${s} transport errored. Name:`,R.name,"Message:",R.message),v.Vt(new K(x.UNAVAILABLE,"The operation could not be completed")))})),pi(d,Gr.EventType.MESSAGE,(R=>{if(!m){let V=R.data[0];Y(!!V,16349);let H=V,z=H?.error||H[0]?.error;if(z){j(ze,`RPC '${e}' stream ${s} received error:`,z);let Be=z.status,Ae=(function(ye){let I=be[ye];if(I!==void 0)return Qg(I)})(Be),ve=z.message;Be==="NOT_FOUND"&&ve.includes("database")&&ve.includes("does not exist")&&ve.includes(this.databaseId.database)&&yt(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),Ae===void 0&&(Ae=x.INTERNAL,ve="Unknown error status: "+Be+" with message "+z.message),m=!0,v.Vt(new K(Ae,ve)),d.close()}else j(ze,`RPC '${e}' stream ${s} received:`,V),v.dt(V)}})),n.gt(),setTimeout((()=>{v.At()}),0),v}terminate(){this.ft.forEach((e=>e.close())),this.ft=[]}Dt(e){this.ft.push(e)}xt(e){this.ft=this.ft.filter((t=>t===e))}it(e,t,r){super.it(e,t,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Jc()}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function CI(n){return new Go(n)}Go.yt=!1;var Ni=class{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Ct=e,this.timerId=t,this.Ft=r,this.Ot=s,this.Mt=i,this.Nt=0,this.Lt=null,this.Bt=Date.now(),this.reset()}reset(){this.Nt=0}Ut(){this.Nt=this.Mt}kt(e){this.cancel();let t=Math.floor(this.Nt+this.qt()),r=Math.max(0,Date.now()-this.Bt),s=Math.max(0,t-r);s>0&&j("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Nt} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.Lt=this.Ct.enqueueAfterDelay(this.timerId,s,(()=>(this.Bt=Date.now(),e()))),this.Nt*=this.Ot,this.Nt<this.Ft&&(this.Nt=this.Ft),this.Nt>this.Mt&&(this.Nt=this.Mt)}$t(){this.Lt!==null&&(this.Lt.skipDelay(),this.Lt=null)}cancel(){this.Lt!==null&&(this.Lt.cancel(),this.Lt=null)}qt(){return(Math.random()-.5)*this.Nt}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ag="PersistentStream",Fl=class{constructor(e,t,r,s,i,a,u,c){this.Ct=e,this.Kt=r,this.Qt=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=u,this.listener=c,this.state=0,this.Wt=0,this.Gt=null,this.zt=null,this.stream=null,this.jt=0,this.Ht=new Ni(e,t)}Jt(){return this.state===1||this.state===5||this.Yt()}Yt(){return this.state===2||this.state===3}start(){this.jt=0,this.state!==4?this.auth():this.Zt()}async stop(){this.Jt()&&await this.close(0)}Xt(){this.state=0,this.Ht.reset()}en(){this.Yt()&&this.Gt===null&&(this.Gt=this.Ct.enqueueAfterDelay(this.Kt,6e4,(()=>this.tn())))}nn(e){this.rn(),this.stream.send(e)}async tn(){if(this.Yt())return this.close(0)}rn(){this.Gt&&(this.Gt.cancel(),this.Gt=null)}sn(){this.zt&&(this.zt.cancel(),this.zt=null)}async close(e,t){this.rn(),this.sn(),this.Ht.cancel(),this.Wt++,e!==4?this.Ht.reset():t&&t.code===x.RESOURCE_EXHAUSTED?(sn(t.toString()),sn("Using maximum backoff delay to prevent overloading the backend."),this.Ht.Ut()):t&&t.code===x.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this._n(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Tt(t)}_n(){}auth(){this.state=1;let e=this.an(this.Wt),t=this.Wt;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.Wt===t&&this.un(r,s)}),(r=>{e((()=>{let s=new K(x.UNKNOWN,"Fetching auth token failed: "+r.message);return this.cn(s)}))}))}un(e,t){let r=this.an(this.Wt);this.stream=this.En(e,t),this.stream.ct((()=>{r((()=>this.listener.ct()))})),this.stream.Et((()=>{r((()=>(this.state=2,this.zt=this.Ct.enqueueAfterDelay(this.Qt,1e4,(()=>(this.Yt()&&(this.state=3),Promise.resolve()))),this.listener.Et())))})),this.stream.Tt((s=>{r((()=>this.cn(s)))})),this.stream.onMessage((s=>{r((()=>++this.jt==1?this.hn(s):this.onNext(s)))}))}Zt(){this.state=5,this.Ht.kt((async()=>{this.state=0,this.start()}))}cn(e){return j(ag,`close with error: ${e}`),this.stream=null,this.close(4,e)}an(e){return t=>{this.Ct.enqueueAndForget((()=>this.Wt===e?t():(j(ag,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}},Ll=class extends Fl{constructor(e,t,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}En(e,t){return this.connection.vt("Listen",e,t)}hn(e){return this.onNext(e)}onNext(e){this.Ht.reset();let t=sI(this.serializer,e),r=(function(i){if(!("targetChange"in i))return te.min();let a=i.targetChange;return a.targetIds&&a.targetIds.length?te.min():a.readTime?en(a.readTime):te.min()})(e);return this.listener.Tn(t,r)}Pn(e){let t={};t.database=rg(this.serializer),t.addTarget=(function(i,a){let u,c=a.target;if(u=sr(c)?{pipelineQuery:lI(i,c)}:zg(c)?{documents:aI(i,c)}:{query:oI(i,c).Se},u.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){u.resumeToken=Xg(i,a.resumeToken);let l=Tl(i,a.expectedCount);l!==null&&(u.expectedCount=l)}else if(a.snapshotVersion.compareTo(te.min())>0){u.readTime=_i(i,a.snapshotVersion.toTimestamp());let l=Tl(i,a.expectedCount);l!==null&&(u.expectedCount=l)}return u})(this.serializer,e);let r=cI(this.serializer,e);r&&(t.labels=r),this.nn(t)}In(e){let t={};t.database=rg(this.serializer),t.removeTarget=e,this.nn(t)}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var xl=class{},kl=class extends xl{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.mn=!1}pn(){if(this.mn)throw new K(x.FAILED_PRECONDITION,"The client has already been terminated.")}nt(e,t,r,s){return this.pn(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,a])=>this.connection.nt(e,Al(t,r),s,i,a))).catch((i=>{throw i.name==="FirebaseError"?(i.code===x.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new K(x.UNKNOWN,i.toString())}))}_t(e,t,r,s,i){return this.pn(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([a,u])=>this.connection._t(e,Al(t,r),s,a,u,i))).catch((a=>{throw a.name==="FirebaseError"?(a.code===x.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new K(x.UNKNOWN,a.toString())}))}terminate(){this.mn=!0,this.connection.terminate()}};function gI(n,e,t,r){return new kl(n,e,t,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var mI="ComponentProvider",og=new Map;function EI(n,e,t,r,s){return new ul(n,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,um(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r,s._customHeaders,s.grpcFlowControlWindow)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ug={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},cm=41943040,Dt=class n{static withCacheSize(e){return new n(e,n.DEFAULT_COLLECTION_PERCENTILE,n.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}};Dt.DEFAULT_COLLECTION_PERCENTILE=10,Dt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Dt.DEFAULT=new Dt(cm,Dt.DEFAULT_COLLECTION_PERCENTILE,Dt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Dt.DISABLED=new Dt(-1,0,0);/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ds=class{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.gn(r),this.yn=r=>t.writeSequenceNumber(r))}gn(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.yn&&this.yn(e),e}};ds.wn=-1;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var _I="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.",Vl=class{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gu(n){if(n.code!==x.FAILED_PRECONDITION||n.message!==_I)throw n;j("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var k=class n{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&Q(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new n(((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{let t=e();return t instanceof n?t:n.resolve(t)}catch(t){return n.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):n.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):n.reject(t)}static resolve(e){return new n(((t,r)=>{t(e)}))}static reject(e){return new n(((t,r)=>{r(e)}))}static waitFor(e){return new n(((t,r)=>{let s=0,i=0,a=!1;e.forEach((u=>{++s,u.next((()=>{++i,a&&i===s&&t()}),(c=>r(c)))})),a=!0,i===s&&t()}))}static or(e){let t=n.resolve(!1);for(let r of e)t=t.next((s=>s?n.resolve(s):r()));return t}static forEach(e,t){let r=[];return e.forEach(((s,i)=>{r.push(t.call(this,s,i))})),this.waitFor(r)}static mapArray(e,t){return new n(((r,s)=>{let i=e.length,a=new Array(i),u=0;for(let c=0;c<i;c++){let l=c;t(e[l]).next((d=>{a[l]=d,++u,u===i&&r(a)}),(d=>s(d)))}}))}static doWhile(e,t){return new n(((r,s)=>{let i=()=>{e()===!0?t().next((()=>{i()}),s):r()};i()}))}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function DI(n){let e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Is(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var cg="LruGarbageCollector",yI=1048576;function lg([n,e],[t,r]){let s=se(n,t);return s===0?se(e,r):s}var Ml=class{constructor(e){this.Yn=e,this.buffer=new Ve(lg),this.Zn=0}Xn(){return++this.Zn}er(e){let t=[e,this.Xn()];if(this.buffer.size<this.Yn)this.buffer=this.buffer.add(t);else{let r=this.buffer.last();lg(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}},Gl=class{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.tr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.nr(6e4)}stop(){this.tr&&(this.tr.cancel(),this.tr=null)}get started(){return this.tr!==null}nr(e){j(cg,`Garbage collection scheduled in ${e}ms`),this.tr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.tr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Is(t)?j(cg,"Ignoring IndexedDB error during garbage collection: ",t):await gu(t)}await this.nr(3e5)}))}},Ul=class{constructor(e,t){this.rr=e,this.params=t}calculateTargetCount(e,t){return this.rr.ir(e).next((r=>Math.floor(t/100*r)))}nthSequenceNumber(e,t){if(t===0)return k.resolve(ds.wn);let r=new Ml(t);return this.rr.forEachTarget(e,(s=>r.er(s.sequenceNumber))).next((()=>this.rr.sr(e,(s=>r.er(s))))).next((()=>r.maxValue))}removeTargets(e,t,r){return this.rr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.rr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(j("LruGarbageCollector","Garbage collection skipped; disabled"),k.resolve(ug)):this.getCacheSize(e).next((r=>r<this.params.cacheSizeCollectionThreshold?(j("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),ug):this._r(e,t)))}getCacheSize(e){return this.rr.getCacheSize(e)}_r(e,t){let r,s,i,a,u,c,l,d=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((f=>(f>this.params.maximumSequenceNumbersToCollect?(j("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${f}`),s=this.params.maximumSequenceNumbersToCollect):s=f,a=Date.now(),this.nthSequenceNumber(e,s)))).next((f=>(r=f,u=Date.now(),this.removeTargets(e,r,t)))).next((f=>(i=f,c=Date.now(),this.removeOrphanedDocuments(e,r)))).next((f=>(l=Date.now(),qr()<=re.DEBUG&&j("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-d}ms
	Determined least recently used ${s} in `+(u-a)+`ms
	Removed ${i} targets in `+(c-u)+`ms
	Removed ${f} documents in `+(l-c)+`ms
Total Duration: ${l-d}ms`),k.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:f}))))}};function wI(n,e){return new Ul(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var lm="firestore.googleapis.com",Bg=!0,Uo=class{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new K(x.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=lm,this.ssl=Bg}else this.host=e.host,this.ssl=e.ssl??Bg;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e._customHeaders&&(this._customHeaders={...e._customHeaders}),e.cacheSizeBytes===void 0)this.cacheSizeBytes=cm;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<yI)throw new K(x.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}if(vg("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=um(e.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new K(x.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new K(x.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new K(x.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams,e.grpcFlowControlWindow!==void 0){if(typeof e.grpcFlowControlWindow!="number"||e.grpcFlowControlWindow<=0||e.grpcFlowControlWindow>2147483647||!Number.isInteger(e.grpcFlowControlWindow))throw new K(x.INVALID_ARGUMENT,"grpcFlowControlWindow must be a positive integer and cannot exceed 2147483647");this.grpcFlowControlWindow=e.grpcFlowControlWindow}}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams&&this.grpcFlowControlWindow===e.grpcFlowControlWindow&&(function(r,s){if(r===s)return!0;if(!r||!s)return!1;let i=Object.keys(r),a=Object.keys(s);if(i.length!==a.length)return!1;for(let u of i)if(r[u]!==s[u])return!1;return!0})(this._customHeaders,e._customHeaders)}},td=class{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Uo({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new K(x.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new K(x.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Uo(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new Lo;switch(r.type){case"firstParty":return new Sl(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new K(x.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){let r=og.get(t);r&&(j(mI,"Removing Datastore"),og.delete(t),r.terminate())})(this),Promise.resolve()}};function Bm(n,e,t,r={}){n=$i(n,td);let s=Jn(e),i=n._getSettings(),a={...i,emulatorOptions:n._getEmulatorOptions()},u=`${e}:${t}`;s&&wa(`https://${u}`),i.host!==lm&&i.host!==u&&yt("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");let c={...i,host:u,ssl:s,emulatorOptions:r};if(!It(c,a)&&(n._setSettings(c),r.mockUserToken)){let l,d;if(typeof r.mockUserToken=="string")l=r.mockUserToken,d=Ue.MOCK_USER;else{l=Af(r.mockUserToken,n._app?.options.projectId);let f=r.mockUserToken.sub||r.mockUserToken.user_id;if(!f)throw new K(x.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");d=new Ue(f)}n._authCredentials=new vl(new Fo(l,d))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ho=class n{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new n(this.firestore,e,this._query)}},qe=class n{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new fs(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new n(this.firestore,e,this._key)}toJSON(){return{type:n._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(Yi(t,n._jsonSchema))return new n(e,r||null,new Z(he.fromString(t.referencePath)))}};qe._jsonSchemaVersion="firestore/documentReference/1.0",qe._jsonSchema={type:Pe("string",qe._jsonSchemaVersion),referencePath:Pe("string")};var fs=class n extends Ho{constructor(e,t,r){super(e,t,fu(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new qe(this.firestore,null,new Z(e))}withConverter(e){return new n(this.firestore,e,this._path)}};function hm(n,e,...t){if(n=Le(n),arguments.length===1&&(e=Zr.newId()),Iw("doc","path",e),n instanceof td){let r=he.fromString(e,...t);return UC(r),new qe(n,null,new Z(r))}{if(!(n instanceof qe||n instanceof fs))throw new K(x.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(he.fromString(e,...t));return UC(r),new qe(n.firestore,n instanceof fs?n.converter:null,new Z(r))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ct=class n{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:n._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Yi(e,n._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new n(e.vectorValues);throw new K(x.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}};Ct._jsonSchemaVersion="firestore/vectorValue/1.0",Ct._jsonSchema={type:Pe("string",Ct._jsonSchemaVersion),vectorValues:Pe("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var II=/^__.*__$/,Hl=class{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new un(e,this.data,this.fieldMask,t,this.fieldTransforms):new pr(e,this.data,t,this.fieldTransforms)}},qo=class{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new un(e,this.data,this.fieldMask,t,this.fieldTransforms)}};function dm(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw Q(40011,{dataSource:n})}}var ql=class n{constructor(e,t,r,s,i,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.validatePath(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new n({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){let t=this.path?.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePathSegment(e),r}childContextForFieldPath(e){let t=this.path?.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePath(),r}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return Ko(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(e.length===0)throw this.createError("Document fields must not be empty");if(dm(this.dataSource)&&II.test(e))throw this.createError('Document fields cannot begin and end with "__"')}},jl=class{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Cu(e)}createContext(e,t,r,s=!1){return new ql({dataSource:e,methodName:t,targetDoc:r,path:pt.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}};function fm(n){let e=n._freezeSettings(),t=Cu(n._databaseId);return new jl(n._databaseId,!!e.ignoreUndefinedProperties,t)}function pm(n,e,t,r,s,i={}){let a=n.createContext(i.merge||i.mergeFields?2:0,e,t,s);nd("Data must be an object, but it was:",a,r);let u=mm(r,a),c,l;if(i.merge)c=new Rt(a.fieldMask),l=a.fieldTransforms;else if(i.mergeFields){let d=[];for(let f of i.mergeFields){let m=yr(e,f,t);if(!a.contains(m))throw new K(x.INVALID_ARGUMENT,`Field '${m}' is specified in your field mask but missing from your input data.`);Dm(d,m)||d.push(m)}c=new Rt(d),l=a.fieldTransforms.filter((f=>c.covers(f.field)))}else c=null,l=a.fieldTransforms;return new Hl(new Ze(u),c,l)}var jo=class n extends _r{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.createError(`${this._methodName}() can only appear at the top level of your update data`):e.createError(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof n}};var Kl=class n extends _r{_toFieldTransform(e){return new Bl(e.path,new Br)}isEqual(e){return e instanceof n}};function Cm(n,e,t,r){let s=n.createContext(1,e,t);nd("Data must be an object, but it was:",s,r);let i=[],a=Ze.empty();br(r,((c,l)=>{let d=rd(e,c,t);l=Le(l);let f=s.childContextForFieldPath(d);if(l instanceof jo)i.push(d);else{let m=Dr(l,f);m!=null&&(i.push(d),a.set(d,m))}}));let u=new Rt(i);return new qo(a,u,s.fieldTransforms)}function gm(n,e,t,r,s,i){let a=n.createContext(1,e,t),u=[yr(e,r,t)],c=[s];if(i.length%2!=0)throw new K(x.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let m=0;m<i.length;m+=2)u.push(yr(e,i[m])),c.push(i[m+1]);let l=[],d=Ze.empty();for(let m=u.length-1;m>=0;--m)if(!Dm(l,u[m])){let v=u[m],R=c[m];R=Le(R);let V=a.childContextForFieldPath(v);if(R instanceof jo)l.push(v);else{let H=Dr(R,V);H!=null&&(l.push(v),d.set(v,H))}}let f=new Rt(l);return new qo(d,f,a.fieldTransforms)}function Dr(n,e,t){if(_m(n=Le(n)))return nd("Unsupported field value:",e,n),mm(n,e);if(n instanceof _r)return(function(s,i){if(!dm(i.dataSource))throw i.createError(`${s._methodName}() can only be used with update() and set()`);if(!i.path)throw i.createError(`${s._methodName}() is not currently supported inside arrays`);let a=s._toFieldTransform(i);a&&i.fieldTransforms.push(a)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.createError("Nested arrays are not supported");return(function(s,i){let a=[],u=0;for(let c of s){let l=Dr(c,i.childContextForArray(u));l==null&&(l={nullValue:"NULL_VALUE"}),a.push(l),u++}return{arrayValue:{values:a}}})(n,e)}return(function(s,i,a){if((s=Le(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return Yh(i.serializer,s);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){let u=Ie.fromDate(s);return{timestampValue:_i(i.serializer,u)}}if(s instanceof Ie){let u=new Ie(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:_i(i.serializer,u)}}if(Em(s)){let u=Ie.fromInstant(s),c=new Ie(u.seconds,1e3*Math.floor(u.nanoseconds/1e3));return{timestampValue:_i(i.serializer,c)}}if(s instanceof tn)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof Ut)return{bytesValue:Xg(i.serializer,s._byteString)};if(s instanceof qe){let u=i.databaseId,c=s.firestore._databaseId;if(!c.isEqual(u))throw i.createError(`Document reference is for database ${c.projectId}/${c.database} but should be for database ${u.projectId}/${u.database}`);return{referenceValue:ed(s.firestore._databaseId||i.databaseId,s._key.path)}}if(s instanceof Ct)return(function(c,l){let d=c instanceof Ct?c.toArray():c;return{mapValue:{fields:{[Wh]:{stringValue:Qh},[lr]:{arrayValue:{values:d.map((m=>{if(typeof m!="number")throw l.createError("VectorValues must only contain numeric values.");return du(l.serializer,m)}))}}}}}})(s,i);if(im(s))return s._toProto(i.serializer);throw i.createError(`Unsupported field value: ${hu(s)}`)})(n,e)}function mm(n,e){let t={};return Ag(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):br(n,((r,s)=>{let i=Dr(s,e.childContextForField(r));i!=null&&(t[r]=i)})),{mapValue:{fields:t}}}function Em(n){if(typeof n!="object"||n===null)return!1;if(typeof Temporal<"u"&&typeof Temporal.Instant=="function"&&n instanceof Temporal.Instant)return!0;let e=n;return e[Symbol.toStringTag]==="Temporal.Instant"&&typeof e.t=="bigint"}function _m(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Ie||n instanceof tn||n instanceof Ut||n instanceof qe||n instanceof _r||n instanceof Ct||Em(n)||im(n))}function nd(n,e,t){if(!_m(t)||!Qi(t)){let r=hu(t);throw r==="an object"?e.createError(n+" a custom object"):e.createError(n+" "+r)}}function yr(n,e,t){if((e=Le(e))instanceof Er)return e._internalPath;if(typeof e=="string")return rd(n,e);throw Ko("Field path arguments must be of type string or ",n,!1,void 0,t)}var TI=new RegExp("[~\\*/\\[\\]]");function rd(n,e,t){if(e.search(TI)>=0)throw Ko(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Er(...e.split("."))._internalPath}catch{throw Ko(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Ko(n,e,t,r,s){let i=r&&!r.isEmpty(),a=s!==void 0,u=`Function ${e}() called with invalid data`;t&&(u+=" (via `toFirestore()`)"),u+=". ";let c="";return(i||a)&&(c+=" (found",i&&(c+=` in field ${r}`),a&&(c+=` in document ${s}`),c+=")"),new K(x.INVALID_ARGUMENT,u+n+c)}function Dm(n,e){return n.some((t=>t.isEqual(e)))}function AI(n){return typeof n._readUserData=="function"}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Qe=class n{constructor(e){this.optionDefinitions=e}_getKnownOptions(e,t){let r=Ze.empty();for(let s in this.optionDefinitions)if(this.optionDefinitions.hasOwnProperty(s)){let i=this.optionDefinitions[s];if(s in e){let a=e[s],u;i.nestedOptions&&Qi(a)?u={mapValue:{fields:new n(i.nestedOptions).getOptionsProto(t,a)}}:a&&(u=Dr(a,t)??void 0),u&&r.set(pt.fromServerFormat(i.serverName),u)}}return r}getOptionsProto(e,t,r){let s=this._getKnownOptions(t,e);if(r){let i=new Map(Tg(r,((a,u)=>[pt.fromServerFormat(u),a!==void 0?Dr(a,e):null])));s.setAll(i)}return s.value.mapValue.fields??{}}};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vI(n){return typeof n=="object"&&n!==null&&!!("nullValue"in n&&(n.nullValue===null||n.nullValue==="NULL_VALUE")||"booleanValue"in n&&(n.booleanValue===null||typeof n.booleanValue=="boolean")||"integerValue"in n&&(n.integerValue===null||typeof n.integerValue=="number"||typeof n.integerValue=="string")||"doubleValue"in n&&(n.doubleValue===null||typeof n.doubleValue=="number")||"timestampValue"in n&&(n.timestampValue===null||(function(t){return typeof t=="object"&&t!==null&&"seconds"in t&&(t.seconds===null||typeof t.seconds=="number"||typeof t.seconds=="string")&&"nanos"in t&&(t.nanos===null||typeof t.nanos=="number")})(n.timestampValue))||"stringValue"in n&&(n.stringValue===null||typeof n.stringValue=="string")||"bytesValue"in n&&(n.bytesValue===null||n.bytesValue instanceof Uint8Array)||"referenceValue"in n&&(n.referenceValue===null||typeof n.referenceValue=="string")||"geoPointValue"in n&&(n.geoPointValue===null||(function(t){return typeof t=="object"&&t!==null&&"latitude"in t&&(t.latitude===null||typeof t.latitude=="number")&&"longitude"in t&&(t.longitude===null||typeof t.longitude=="number")})(n.geoPointValue))||"arrayValue"in n&&(n.arrayValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("values"in t)||t.values!==null&&!Array.isArray(t.values))})(n.arrayValue))||"mapValue"in n&&(n.mapValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("fields"in t)||t.fields!==null&&!Qi(t.fields))})(n.mapValue))||"fieldReferenceValue"in n&&(n.fieldReferenceValue===null||typeof n.fieldReferenceValue=="string")||"functionValue"in n&&(n.functionValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("name"in t)||t.name!==null&&typeof t.name!="string"||!("args"in t)||t.args!==null&&!Array.isArray(t.args))})(n.functionValue))||"pipelineValue"in n&&(n.pipelineValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("stages"in t)||t.stages!==null&&!Array.isArray(t.stages))})(n.pipelineValue)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ym(){return new Kl("serverTimestamp")}function wm(n){return new Ct(n)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U(n){let e;return n instanceof ln?n:(e=Qi(n)?RI(n):n instanceof Array?PI(n):Im(n,void 0),e)}function rl(n){if(n instanceof ln)return n;if(n instanceof Ct)return Oi(n);if(Array.isArray(n))return Oi(wm(n));throw new Error("Unsupported value: "+typeof n)}function sd(n){return bw(n)?bI(n):U(n)}var ln=class{constructor(){this._protoValueType="ProtoValue"}add(e){return new F("add",[this,U(e)],"add")}asBoolean(){if(this instanceof Ln)return this;if(this instanceof ps)return new zo(this);if(this instanceof wr)return new Wl(this);if(this instanceof F)return new Jo(this);throw new K("invalid-argument",`Conversion of type ${typeof this} to BooleanExpression not supported.`)}subtract(e){return new F("subtract",[this,U(e)],"subtract")}multiply(e){return new F("multiply",[this,U(e)],"multiply")}divide(e){return new F("divide",[this,U(e)],"divide")}mod(e){return new F("mod",[this,U(e)],"mod")}equal(e){return new F("equal",[this,U(e)],"equal").asBoolean()}notEqual(e){return new F("not_equal",[this,U(e)],"notEqual").asBoolean()}lessThan(e){return new F("less_than",[this,U(e)],"lessThan").asBoolean()}lessThanOrEqual(e){return new F("less_than_or_equal",[this,U(e)],"lessThanOrEqual").asBoolean()}greaterThan(e){return new F("greater_than",[this,U(e)],"greaterThan").asBoolean()}greaterThanOrEqual(e){return new F("greater_than_or_equal",[this,U(e)],"greaterThanOrEqual").asBoolean()}arrayConcat(e,...t){let r=[e,...t].map((s=>U(s)));return new F("array_concat",[this,...r],"arrayConcat")}arrayContains(e){return new F("array_contains",[this,U(e)],"arrayContains").asBoolean()}arrayContainsAll(e){let t=Array.isArray(e)?new or(e.map(U),"arrayContainsAll"):e;return new F("array_contains_all",[this,t],"arrayContainsAll").asBoolean()}arrayContainsAny(e){let t=Array.isArray(e)?new or(e.map(U),"arrayContainsAny"):e;return new F("array_contains_any",[this,t],"arrayContainsAny").asBoolean()}arrayReverse(){return new F("array_reverse",[this])}arrayLength(){return new F("array_length",[this],"arrayLength")}equalAny(e){let t=Array.isArray(e)?new or(e.map(U),"equalAny"):e;return new F("equal_any",[this,t],"equalAny").asBoolean()}notEqualAny(e){let t=Array.isArray(e)?new or(e.map(U),"notEqualAny"):e;return new F("not_equal_any",[this,t],"notEqualAny").asBoolean()}exists(){return new F("exists",[this],"exists").asBoolean()}charLength(){return new F("char_length",[this],"charLength")}like(e){return new F("like",[this,U(e)],"like").asBoolean()}regexContains(e){return new F("regex_contains",[this,U(e)],"regexContains").asBoolean()}regexFind(e){return new F("regex_find",[this,U(e)],"regexFind")}regexFindAll(e){return new F("regex_find_all",[this,U(e)],"regexFindAll")}regexMatch(e){return new F("regex_match",[this,U(e)],"regexMatch").asBoolean()}stringContains(e){return new F("string_contains",[this,U(e)],"stringContains").asBoolean()}startsWith(e){return new F("starts_with",[this,U(e)],"startsWith").asBoolean()}endsWith(e){return new F("ends_with",[this,U(e)],"endsWith").asBoolean()}toLower(){return new F("to_lower",[this],"toLower")}toUpper(){return new F("to_upper",[this],"toUpper")}trim(e){let t=[this];return e&&t.push(U(e)),new F("trim",t,"trim")}ltrim(e){let t=[this];return e&&t.push(U(e)),new F("ltrim",t,"ltrim")}rtrim(e){let t=[this];return e&&t.push(U(e)),new F("rtrim",t,"rtrim")}type(){return new F("type",[this])}isType(e){return new F("is_type",[this,Oi(e)],"isType").asBoolean()}stringConcat(e,...t){let r=[e,...t].map(U);return new F("string_concat",[this,...r],"stringConcat")}stringIndexOf(e){return new F("string_index_of",[this,U(e)],"stringIndexOf")}stringRepeat(e){return new F("string_repeat",[this,U(e)],"stringRepeat")}stringReplaceAll(e,t){return new F("string_replace_all",[this,U(e),U(t)],"stringReplaceAll")}stringReplaceOne(e,t){return new F("string_replace_one",[this,U(e),U(t)],"stringReplaceOne")}concat(e,...t){let r=[e,...t].map(U);return new F("concat",[this,...r],"concat")}reverse(){return new F("reverse",[this],"reverse")}arrayFilter(e,t){return new F("array_filter",[this,U(e),t],"arrayFilter")}arrayTransform(e,t){return new F("array_transform",[this,U(e),t],"arrayTransform")}arrayTransformWithIndex(e,t,r){return new F("array_transform",[this,U(e),U(t),r],"arrayTransformWithIndex")}arraySlice(e,t){let r=[this,U(e)];return t!==void 0&&r.push(U(t)),new F("array_slice",r,"arraySlice")}arrayFirst(){return new F("array_first",[this],"arrayFirst")}arrayFirstN(e){return new F("array_first_n",[this,U(e)],"arrayFirstN")}arrayLast(){return new F("array_last",[this],"arrayLast")}arrayLastN(e){return new F("array_last_n",[this,U(e)],"arrayLastN")}arrayMaximum(){return new F("maximum",[this],"arrayMaximum")}arrayMaximumN(e){return new F("maximum_n",[this,U(e)],"arrayMaximumN")}arrayMinimum(){return new F("minimum",[this],"arrayMinimum")}arrayMinimumN(e){return new F("minimum_n",[this,U(e)],"arrayMinimumN")}arrayIndexOf(e){return new F("array_index_of",[this,U(e),U("first")],"arrayIndexOf")}arrayLastIndexOf(e){return new F("array_index_of",[this,U(e),U("last")],"arrayLastIndexOf")}arrayIndexOfAll(e){return new F("array_index_of_all",[this,U(e)],"arrayIndexOfAll")}byteLength(){return new F("byte_length",[this],"byteLength")}ceil(){return new F("ceil",[this])}floor(){return new F("floor",[this])}abs(){return new F("abs",[this])}exp(){return new F("exp",[this])}mapGet(e){return new F("map_get",[this,Oi(e)],"mapGet")}mapSet(e,t,...r){let s=[this,U(e),U(t),...r.map(U)];return new F("map_set",s,"mapSet")}mapKeys(){return new F("map_keys",[this],"mapKeys")}mapValues(){return new F("map_values",[this],"mapValues")}mapEntries(){return new F("map_entries",[this],"mapEntries")}getField(e){return new F("get_field",[this,U(e)],"get_field")}count(){return ht._create("count",[this],"count")}sum(){return ht._create("sum",[this],"sum")}average(){return ht._create("average",[this],"average")}minimum(){return ht._create("minimum",[this],"minimum")}maximum(){return ht._create("maximum",[this],"maximum")}first(){return ht._create("first",[this],"first")}last(){return ht._create("last",[this],"last")}arrayAgg(){return ht._create("array_agg",[this],"arrayAgg")}arrayAggDistinct(){return ht._create("array_agg_distinct",[this],"arrayAggDistinct")}countDistinct(){return ht._create("count_distinct",[this],"countDistinct")}logicalMaximum(e,...t){let r=[e,...t];return new F("maximum",[this,...r.map(U)],"logicalMaximum")}logicalMinimum(e,...t){let r=[e,...t];return new F("minimum",[this,...r.map(U)],"minimum")}vectorLength(){return new F("vector_length",[this],"vectorLength")}cosineDistance(e){return new F("cosine_distance",[this,rl(e)],"cosineDistance")}dotProduct(e){return new F("dot_product",[this,rl(e)],"dotProduct")}euclideanDistance(e){return new F("euclidean_distance",[this,rl(e)],"euclideanDistance")}unixMicrosToTimestamp(){return new F("unix_micros_to_timestamp",[this],"unixMicrosToTimestamp")}timestampToUnixMicros(){return new F("timestamp_to_unix_micros",[this],"timestampToUnixMicros")}unixMillisToTimestamp(){return new F("unix_millis_to_timestamp",[this],"unixMillisToTimestamp")}timestampToUnixMillis(){return new F("timestamp_to_unix_millis",[this],"timestampToUnixMillis")}unixSecondsToTimestamp(){return new F("unix_seconds_to_timestamp",[this],"unixSecondsToTimestamp")}timestampToUnixSeconds(){return new F("timestamp_to_unix_seconds",[this],"timestampToUnixSeconds")}timestampAdd(e,t){return new F("timestamp_add",[this,U(e),U(t)],"timestampAdd")}timestampSubtract(e,t){return new F("timestamp_subtract",[this,U(e),U(t)],"timestampSubtract")}timestampDiff(e,t){return new F("timestamp_diff",[this,sd(e),U(t)],"timestampDiff")}timestampExtract(e,t){let r=[this,U(e)];return t&&r.push(U(t)),new F("timestamp_extract",r,"timestampExtract")}documentId(){return new F("document_id",[this],"documentId")}parent(){return new F("parent",[this],"parent")}substring(e,t){let r=U(e);return new F("substring",t===void 0?[this,r]:[this,r,U(t)],"substring")}arrayGet(e){return new F("array_get",[this,U(e)],"arrayGet")}isError(){return new F("is_error",[this],"isError").asBoolean()}ifError(e){let t=new F("if_error",[this,U(e)],"ifError");return e instanceof Ln?t.asBoolean():t}isAbsent(){return new F("is_absent",[this],"isAbsent").asBoolean()}mapRemove(e){return new F("map_remove",[this,U(e)],"mapRemove")}mapMerge(e,...t){let r=U(e),s=t.map(U);return new F("map_merge",[this,r,...s],"mapMerge")}pow(e){return new F("pow",[this,U(e)])}trunc(e){return e===void 0?new F("trunc",[this]):new F("trunc",[this,U(e)],"trunc")}round(e){return e===void 0?new F("round",[this]):new F("round",[this,U(e)],"round")}collectionId(){return new F("collection_id",[this])}length(){return new F("length",[this])}ln(){return new F("ln",[this])}sqrt(){return new F("sqrt",[this])}stringReverse(){return new F("string_reverse",[this])}ifAbsent(e){return new F("if_absent",[this,U(e)],"ifAbsent")}ifNull(e){return new F("if_null",[this,U(e)],"ifNull")}coalesce(e,...t){return new F("coalesce",[this,U(e),...t.map(U)],"coalesce")}join(e){return new F("join",[this,U(e)],"join")}log10(){return new F("log10",[this])}arraySum(){return new F("sum",[this])}split(e){return new F("split",[this,U(e)])}timestampTruncate(e,t){let r=[this,U(e)];return t&&r.push(U(t)),new F("timestamp_trunc",r)}ascending(){return NI(this)}descending(){return OI(this)}as(e){return new zl(this,e,"as")}},ht=class n{constructor(e,t){this.name=e,this.params=t,this.exprType="AggregateFunction",this._protoValueType="ProtoValue"}static _create(e,t,r){let s=new n(e,t);return s._methodName=r,s}as(e){return new Jl(this,e,"as")}_toProto(e){return{functionValue:{name:this.name,args:this.params.map((t=>t._toProto(e)))}}}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach((t=>t._readUserData(e)))}},Jl=class{constructor(e,t,r){this.aggregate=e,this.alias=t,this._methodName=r}_readUserData(e){this.aggregate._readUserData(e)}},zl=class{constructor(e,t,r){this.expr=e,this.alias=t,this._methodName=r,this.exprType="AliasedExpression",this.selectable=!0}_readUserData(e){this.expr._readUserData(e)}},or=class extends ln{constructor(e,t){super(),this.cr=e,this._methodName=t,this.expressionType="ListOfExpressions"}_toProto(e){return{arrayValue:{values:this.cr.map((t=>t._toProto(e)))}}}_readUserData(e){this.cr.forEach((t=>t._readUserData(e)))}},wr=class extends ln{constructor(e,t){super(),this.fieldPath=e,this._methodName=t,this.expressionType="Field",this.selectable=!0}get _fieldPath(){return this.fieldPath}get fieldName(){return this.fieldPath.canonicalString()}get alias(){return this.fieldName}get expr(){return this}geoDistance(e){return new F("geo_distance",[this,U(e)],"geoDistance")}_toProto(e){return{fieldReferenceValue:this.fieldPath.canonicalString()}}_readUserData(e){}};function bI(n){return SI(n,"field")}function SI(n,e){return new wr(typeof n=="string"?ts===n?om()._internalPath:yr("field",n):n._internalPath,e)}var ps=class n extends ln{constructor(e,t){super(),this.value=e,this._methodName=t,this.expressionType="Constant"}static _fromProto(e){let t=new n(e,void 0);return t._protoValue=e,t}_toProto(e){return Y(this._protoValue!==void 0,237),this._protoValue}_getValue(){return this._protoValue}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,vI(this._protoValue)||(this._protoValue=Dr(this.value,e))}};function Oi(n,e){return Im(n,"constant")}function Im(n,e){let t=new ps(n,e);return typeof n=="boolean"?new zo(t):t}var F=class extends ln{constructor(e,t,r,s){super(),this.name=e,this.params=t,this.expressionType="Function",this._optionsProto=void 0,r!==void 0&&(this._methodName=r),s!==void 0&&(this._options=s)}get _optionsUtil(){return new Qe({})}_toProto(e){let t={functionValue:{name:this.name,args:this.params.map((r=>r._toProto(e)))}};return this._optionsProto&&(t.functionValue.options=this._optionsProto),t}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach((t=>t._readUserData(e))),this._options&&(this._optionsProto=this._optionsUtil.getOptionsProto(e,this._options))}},Ln=class n extends ln{get _methodName(){return this._expr._methodName}countIf(){return ht._create("count_if",[this],"countIf")}not(){return new F("not",[this],"not").asBoolean()}conditional(e,t){return new F("conditional",[this,e,t],"conditional")}ifError(e){let t=U(e),r=new F("if_error",[this,t],"ifError");return t instanceof n?r.asBoolean():r}_toProto(e){return this._expr._toProto(e)}_readUserData(e){this._expr._readUserData(e)}},Jo=class extends Ln{constructor(e){super(),this._expr=e,this.expressionType="Function"}},zo=class extends Ln{constructor(e){super(),this._expr=e,this.expressionType="Constant"}_getValue(){return this._expr._getValue()}},Wl=class extends Ln{constructor(e){super(),this._expr=e,this.expressionType="Field"}};function RI(n,e){let t=[];for(let r in n)if(Object.prototype.hasOwnProperty.call(n,r)){let s=n[r];t.push(Oi(r)),t.push(U(s))}return new F("map",t,"map")}function PI(n){return(function(t,r){return new F("array",t.map((s=>U(s))),r)})(n,"array")}function NI(n){return new Wo(sd(n),"ascending","ascending")}function OI(n){return new Wo(sd(n),"descending","descending")}var Wo=class{constructor(e,t,r){this.expr=e,this.direction=t,this._methodName=r,this._protoValueType="ProtoValue"}_toProto(e){return{mapValue:{fields:{direction:am(this.direction),expression:this.expr._toProto(e)}}}}_readUserData(e){this.expr._readUserData(e)}};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var et=class{constructor(e){this.optionsProto=void 0,{rawOptions:this.rawOptions,...this.knownOptions}=e}_readUserData(e){this.optionsProto=this._optionsUtil.getOptionsProto(e,this.knownOptions,this.rawOptions)}_toProto(e){return{name:this._name,options:this.optionsProto}}},Qo=class extends et{get _name(){return"add_fields"}get _optionsUtil(){return new Qe({})}constructor(e,t){super(t),this.fields=e}_toProto(e){return{...super._toProto(e),args:[Pi(e,this.fields)]}}_readUserData(e){super._readUserData(e),xn(this.fields,e)}};var $o=class extends et{get _name(){return"aggregate"}get _optionsUtil(){return new Qe({})}constructor(e,t,r){super(r),this.groups=e,this.accumulators=t}_toProto(e){return{...super._toProto(e),args:[Pi(e,this.accumulators),Pi(e,this.groups)]}}_readUserData(e){super._readUserData(e),xn(this.groups,e),xn(this.accumulators,e)}},Yo=class extends et{get _name(){return"distinct"}get _optionsUtil(){return new Qe({})}constructor(e,t){super(t),this.groups=e}_toProto(e){return{...super._toProto(e),args:[Pi(e,this.groups)]}}_readUserData(e){super._readUserData(e),xn(this.groups,e)}},Cs=class extends et{get _name(){return"collection"}get _optionsUtil(){return new Qe({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.hr=e.startsWith("/")?e:"/"+e}_toProto(e){return{...super._toProto(e),args:[{referenceValue:this.hr}]}}_readUserData(e){super._readUserData(e)}},gs=class extends et{get _name(){return"collection_group"}get _optionsUtil(){return new Qe({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.collectionId=e}_toProto(e){return{...super._toProto(e),args:[{referenceValue:""},{stringValue:this.collectionId}]}}_readUserData(e){super._readUserData(e)}};var Fi=class extends et{get _name(){return"database"}get _optionsUtil(){return new Qe({})}_toProto(e){return{...super._toProto(e)}}_readUserData(e){super._readUserData(e)}},Li=class extends et{get _name(){return"documents"}get _optionsUtil(){return new Qe({})}constructor(e,t){if(super(t),!e||e.length===0)throw new K(x.INVALID_ARGUMENT,"Empty document paths are not allowed in DocumentsSource");let r=e.map((i=>i.startsWith("/")?i:"/"+i)),s=new Set(r);if(s.size!==r.length)throw new K(x.INVALID_ARGUMENT,"Duplicate document paths are not allowed in DocumentsSource");this.Tr=r,this.Pr=s}_toProto(e){return{...super._toProto(e),args:this.Tr.map((t=>({referenceValue:t})))}}_readUserData(e){super._readUserData(e)}},xi=class extends et{get _name(){return"where"}get _optionsUtil(){return new Qe({})}constructor(e,t){super(t),this.condition=e}_toProto(e){return{...super._toProto(e),args:[this.condition._toProto(e)]}}_readUserData(e){super._readUserData(e),xn(this.condition,e)}};var Ir=class extends et{get _name(){return"limit"}get _optionsUtil(){return new Qe({})}constructor(e,t){Y(!isNaN(e)&&e!==1/0&&e!==-1/0,34860),super(t),this.limit=e}_toProto(e){return{...super._toProto(e),args:[Yh(e,this.limit)]}}},Xo=class extends et{get _name(){return"offset"}get _optionsUtil(){return new Qe({})}constructor(e,t){super(t),this.offset=e}_toProto(e){return{...super._toProto(e),args:[Yh(e,this.offset)]}}},Ql=class extends et{get _name(){return"select"}get _optionsUtil(){return new Qe({})}constructor(e,t){super(t),this.selections=e}_toProto(e){return{...super._toProto(e),args:[Pi(e,this.selections)]}}_readUserData(e){super._readUserData(e),xn(this.selections,e)}},ki=class extends et{get _name(){return"sort"}get _optionsUtil(){return new Qe({})}constructor(e,t){super(t),this.orderings=e}_toProto(e){return{...super._toProto(e),args:this.orderings.map((t=>t._toProto(e)))}}_readUserData(e){super._readUserData(e),xn(this.orderings,e)}};var $l=class n extends et{get _name(){return"replace_with"}get _optionsUtil(){return new Qe({})}constructor(e,t){super(t),this.map=e}_toProto(e){return{...super._toProto(e),args:[this.map._toProto(e),am(n.Ir)]}}_readUserData(e){super._readUserData(e),xn(this.map,e)}};$l.Ir="full_replace";function xn(n,e){return AI(n)?n._readUserData(e):Array.isArray(n)?n.forEach((t=>t._readUserData(e))):n instanceof Map?n.forEach((t=>t._readUserData(e))):Object.values(n).forEach((t=>t._readUserData(e))),n}/**
 * @license
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */// Copyright 2024 Google LLC* @license
var We=class{constructor(e,t,r){this.serializer=e,this.stages=t,this.listenOptions=r,this.isCorePipeline=!0}getPipelineCollection(){return mu(this)}getPipelineCollectionGroup(){return id(this)}getPipelineCollectionId(){return FI(this)}getPipelineDocuments(){return Yl(this)}getPipelineFlavor(){return(function(t){let r="exact";return t.stages.forEach(((s,i)=>{s._name!==Yo.name&&s._name!==$o.name||(r="keyless"),s._name===Ql.name&&r==="exact"&&(r="augmented"),s._name===Qo.name&&i<t.stages.length-1&&r==="exact"&&(r="augmented")})),r})(this)}getPipelineSourceType(){return Nn(this)}};function Nn(n){let e=n.stages[0];return e instanceof Cs||e instanceof gs||e instanceof Fi||e instanceof Li?e._name:"unknown"}function mu(n){if(Nn(n)==="collection")return n.stages[0].hr}function id(n){if(Nn(n)==="collection_group")return n.stages[0].collectionId}function FI(n){switch(Nn(n)){case"collection":return he.fromString(mu(n)).lastSegment();case"collection_group":return id(n);default:return}}function Yl(n){if(Nn(n)==="documents")return n.stages[0].Tr}var T=class n{constructor(e,t){this.type=e,this.value=t}static mr(){return new n("ERROR",void 0)}static pr(){return new n("UNSET",void 0)}static gr(){return new n("NULL",ss)}static newValue(e){return dt(e)?new n("NULL",ss):(function(r){return!!r&&"booleanValue"in r})(e)?new n("BOOLEAN",e):Vt(e)?new n("INT",e):ir(e)?new n("DOUBLE",e):(function(r){return!!r&&"timestampValue"in r&&!!r.timestampValue})(e)?new n("TIMESTAMP",e):(function(r){return!!r&&"stringValue"in r})(e)?new n("STRING",e):(function(r){return!!r&&"bytesValue"in r})(e)?new n("BYTES",e):e.referenceValue?new n("REFERENCE",e):e.geoPointValue?new n("GEO_POINT",e):as(e)?new n("ARRAY",e):Ti(e)?new n("VECTOR",e):Qr(e)?new n("MAP",e):new n("ERROR",void 0)}yr(){return this.type==="ERROR"||this.type==="UNSET"}wr(){return this.type==="NULL"}};function yi(n){if(!n.yr())return n.value}function Tm(n){return n instanceof Ln?n._expr:n}function ee(n){if((n=Tm(n))instanceof wr)return new Xl(n);if(n instanceof ps)return new Zl(n);if(n instanceof or)return new eB(n);if(n instanceof F){if(n.name==="add")return new tB(n);if(n.name==="subtract")return new nB(n);if(n.name==="multiply")return new rB(n);if(n.name==="divide")return new sB(n);if(n.name==="mod")return new iB(n);if(n.name==="and")return new aB(n);if(n.name==="equal")return new EB(n);if(n.name==="not_equal")return new _B(n);if(n.name==="less_than")return new DB(n);if(n.name==="less_than_or_equal")return new yB(n);if(n.name==="greater_than")return new wB(n);if(n.name==="greater_than_or_equal")return new IB(n);if(n.name==="array_concat")return new TB(n);if(n.name==="array_reverse")return new AB(n);if(n.name==="array_contains")return new vB(n);if(n.name==="array_contains_all")return new bB(n);if(n.name==="array_contains_any")return new SB(n);if(n.name==="array_length")return new RB(n);if(n.name==="array_element")return new PB(n);if(n.name==="equal_any")return new Zo(n);if(n.name==="not_equal_any")return new cB(n);if(n.name==="is_nan")return new lB(n);if(n.name==="is_not_nan")return new BB(n);if(n.name==="is_null")return new hB(n);if(n.name==="is_not_null")return new dB(n);if(n.name==="is_error")return new fB(n);if(n.name==="exists")return new pB(n);if(n.name==="not")return new ms(n);if(n.name==="or")return new oB(n);if(n.name==="xor")return new uB(n);if(n.name==="conditional")return new CB(n);if(n.name==="maximum")return new gB(n);if(n.name==="minimum")return new mB(n);if(n.name==="reverse")return new NB(n);if(n.name==="replace_first")return new OB(n);if(n.name==="replace_all")return new FB(n);if(n.name==="char_length")return new LB(n);if(n.name==="byte_length")return new xB(n);if(n.name==="like")return new kB(n);if(n.name==="regex_contains")return new VB(n);if(n.name==="regex_match")return new MB(n);if(n.name==="string_contains")return new GB(n);if(n.name==="starts_with")return new UB(n);if(n.name==="ends_with")return new HB(n);if(n.name==="to_lower")return new qB(n);if(n.name==="to_upper")return new jB(n);if(n.name==="trim")return new KB(n);if(n.name==="string_concat")return new JB(n);if(n.name==="map_get")return new zB(n);if(n.name==="cosine_distance")return new WB(n);if(n.name==="dot_product")return new QB(n);if(n.name==="euclidean_distance")return new $B(n);if(n.name==="vector_length")return new YB(n);if(n.name==="unix_micros_to_timestamp")return new XB(n);if(n.name==="timestamp_to_unix_micros")return new th(n);if(n.name==="unix_millis_to_timestamp")return new ZB(n);if(n.name==="timestamp_to_unix_millis")return new nh(n);if(n.name==="unix_seconds_to_timestamp")return new eh(n);if(n.name==="timestamp_to_unix_seconds")return new rh(n);if(n.name==="timestamp_add")return new sh(n);if(n.name==="timestamp_subtract")return new ih(n)}throw new Error(`Unknown Expr : ${n}`)}var Xl=class{constructor(e){this.expr=e}evaluate(e,t){if(this.expr.fieldName===ts)return T.newValue({referenceValue:Ri(e.serializer,t.key)});if(this.expr.fieldName==="__update_time__")return T.newValue({timestampValue:_o(e.serializer,t.version)});if(this.expr.fieldName==="__create_time__")return T.newValue({timestampValue:_o(e.serializer,t.createTime)});let r=t.data.field(this.expr._fieldPath);return r?Xi(r)?T.newValue((function(i,a){if(i.serverTimestampBehavior==="estimate")return{timestampValue:_o(i.serializer,te.fromTimestamp(ns(a)))};if(i.serverTimestampBehavior==="previous"){let u=Zi(a);if(u)return u}return{nullValue:"NULL_VALUE"}})(e,r)):T.newValue(r):T.pr()}},Zl=class{constructor(e){this.expr=e}evaluate(e,t){return T.newValue(this.expr._getValue())}},eB=class{constructor(e){this.expr=e}evaluate(e,t){let r=this.expr.cr.map((s=>ee(s).evaluate(e,t)));return r.some((s=>s.yr()))?T.mr():T.newValue({arrayValue:{values:r.map((s=>s.value))}})}};function je(n){return ir(n)?Number(n.doubleValue):Number(n.integerValue)}function qt(n){return BigInt(n.integerValue)}var LI=BigInt("0x7fffffffffffffff"),xI=-BigInt("0x8000000000000000"),Tr=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length>=2,24778);let r=ee(this.expr.params[0]).evaluate(e,t),s=ee(this.expr.params[1]).evaluate(e,t),i=this.br(r,s);for(let a of this.expr.params.slice(2)){let u=ee(a).evaluate(e,t);i=this.br(i,u)}return i}br(e,t){if(e.yr()||t.yr())return T.mr();if(e.wr()||t.wr())return T.gr();let r=e.value,s=t.value;if(!ir(r)&&!Vt(r)||!ir(s)&&!Vt(s))return T.mr();if(ir(r)||ir(s)){let i=this.Sr(r,s);return i?T.newValue(i):T.mr()}if(Vt(r)&&Vt(s)){let i=this.vr(r,s);return i===void 0?T.mr():typeof i=="number"?T.newValue({doubleValue:i}):i<xI||i>LI?T.mr():T.newValue({integerValue:`${i}`})}return T.mr()}};function Bn(n,e){return Oe(n)!==Oe(e)?"TYPE_MISMATCH":ot(n)||ot(e)?"NOT_EQ":dt(n)&&dt(e)?"EQ":dt(n)||dt(e)?"NULL":as(n)&&as(e)?(function(r,s){if(r.values?.length!==s.values?.length)return"NOT_EQ";let i=!1;for(let a=0;a<(r.values?.length??0);a++){let u=r.values[a],c=s.values[a];switch(Bn(u,c)){case"EQ":break;case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":i=!0;break;default:Q(44609,{Dr:u,Cr:c})}}return i?"NULL":"EQ"})(n.arrayValue,e.arrayValue):Ti(n)&&Ti(e)||Qr(n)&&Qr(e)?(function(r,s){let i=r.fields||{},a=s.fields||{};if(wo(i)!==wo(a))return"NOT_EQ";let u=!1;for(let c in i)if(i.hasOwnProperty(c)){if(a[c]===void 0)return"NOT_EQ";switch(Bn(i[c],a[c])){case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":u=!0}}return u?"NULL":"EQ"})(n.mapValue,e.mapValue):(function(r,s){return wt(r,s,{u:!1,i:!0,o:!0})})(n,e)?"EQ":"NOT_EQ"}var tB=class extends Tr{vr(e,t){return qt(e)+qt(t)}Sr(e,t){return{doubleValue:je(e)+je(t)}}},nB=class extends Tr{constructor(e){super(e),this.expr=e}vr(e,t){return qt(e)-qt(t)}Sr(e,t){return{doubleValue:je(e)-je(t)}}},rB=class extends Tr{constructor(e){super(e),this.expr=e}vr(e,t){return qt(e)*qt(t)}Sr(e,t){return{doubleValue:je(e)*je(t)}}},sB=class extends Tr{constructor(e){super(e),this.expr=e}vr(e,t){let r=qt(t);if(r!==BigInt(0))return qt(e)/r}Sr(e,t){let r=je(t);return r===0?{doubleValue:rs(r)?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY}:{doubleValue:je(e)/r}}},iB=class extends Tr{constructor(e){super(e),this.expr=e}vr(e,t){let r=qt(t);if(r!==BigInt(0))return qt(e)%r}Sr(e,t){let r=je(t);if(r!==0)return{doubleValue:je(e)%r}}},aB=class{constructor(e){this.expr=e}evaluate(e,t){let r=!1,s=!1;for(let i of this.expr.params){let a=ee(i).evaluate(e,t);switch(a.type){case"BOOLEAN":if(!a.value?.booleanValue)return T.newValue(He);break;case"NULL":s=!0;break;default:r=!0}}return r?T.mr():s?T.gr():T.newValue(it)}},ms=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===1,9634);let r=ee(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BOOLEAN":return T.newValue({booleanValue:!r.value?.booleanValue});case"NULL":return T.gr();default:return T.mr()}}},oB=class{constructor(e){this.expr=e}evaluate(e,t){let r=!1,s=!1;for(let i of this.expr.params){let a=ee(i).evaluate(e,t);switch(a.type){case"BOOLEAN":if(a.value?.booleanValue)return T.newValue(it);break;case"NULL":s=!0;break;default:r=!0}}return r?T.mr():s?T.gr():T.newValue(He)}},uB=class n{constructor(e){this.expr=e}evaluate(e,t){let r=!1,s=!1;for(let i of this.expr.params){let a=ee(i).evaluate(e,t);switch(a.type){case"BOOLEAN":r=n.xor(r,!!a.value?.booleanValue);break;case"NULL":s=!0;break;default:return T.mr()}}return s?T.gr():T.newValue({booleanValue:r})}static xor(e,t){return(e||t)&&!(e&&t)}},Zo=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===2,55094);let r=!1,s=ee(this.expr.params[0]).evaluate(e,t);switch(s.type){case"NULL":r=!0;break;case"ERROR":case"UNSET":return T.mr()}let i=ee(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return T.mr()}if(r)return T.gr();for(let a of i.value?.arrayValue?.values??[])switch(dt(s.value)&&dt(a)?"EQ":Bn(s.value,a)){case"EQ":return T.newValue(it);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:Q(44608,{value:s.value,candidate:a})}return r?T.gr():T.newValue(He)}},cB=class{constructor(e){this.expr=e}evaluate(e,t){return new ms(new F("not",[new F("equal_any",this.expr.params)])).evaluate(e,t)}},lB=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===1,23322);let r=ee(this.expr.params[0]).evaluate(e,t);switch(r.type){case"INT":return T.newValue(He);case"DOUBLE":return T.newValue({booleanValue:isNaN(je(r.value))});case"NULL":return T.gr();default:return T.mr()}}},BB=class{constructor(e){this.expr=e}evaluate(e,t){return Y(this.expr.params.length===1,50406),new ms(new F("not",[new F("is_nan",this.expr.params)])).evaluate(e,t)}},hB=class{constructor(e){this.expr=e}evaluate(e,t){switch(Y(this.expr.params.length===1,23123),ee(this.expr.params[0]).evaluate(e,t).type){case"NULL":return T.newValue(it);case"UNSET":case"ERROR":return T.mr();default:return T.newValue(He)}}},dB=class{constructor(e){this.expr=e}evaluate(e,t){return Y(this.expr.params.length===1,23167),new ms(new F("not",[new F("is_null",this.expr.params)])).evaluate(e,t)}},fB=class{constructor(e){this.expr=e}evaluate(e,t){return Y(this.expr.params.length===1,5228),ee(this.expr.params[0]).evaluate(e,t).type==="ERROR"?T.newValue(it):T.newValue(He)}},pB=class{constructor(e){this.expr=e}evaluate(e,t){switch(Y(this.expr.params.length===1,6877),ee(this.expr.params[0]).evaluate(e,t).type){case"ERROR":return T.mr();case"UNSET":return T.newValue(He);default:return T.newValue(it)}}},CB=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===3,11706);let r=ee(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BOOLEAN":return r.value?.booleanValue?ee(this.expr.params[1]).evaluate(e,t):ee(this.expr.params[2]).evaluate(e,t);case"NULL":return ee(this.expr.params[2]).evaluate(e,t);default:return T.mr()}}},gB=class{constructor(e){this.expr=e}evaluate(e,t){let r=this.expr.params.map((i=>ee(i).evaluate(e,t))),s;for(let i of r)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||at(i.value,s.value)>0?i:s}return s===void 0?T.gr():s}},mB=class{constructor(e){this.expr=e}evaluate(e,t){let r=this.expr.params.map((i=>ee(i).evaluate(e,t))),s;for(let i of r)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||at(i.value,s.value)<0?i:s}return s===void 0?T.gr():s}},kn=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===2,31033,`${this.expr.name}() function should have exactly 2 params`);let r=ee(this.expr.params[0]).evaluate(e,t);switch(r.type){case"ERROR":case"UNSET":return T.mr()}let s=ee(this.expr.params[1]).evaluate(e,t);switch(s.type){case"ERROR":case"UNSET":return T.mr()}return this.Fr(r,s)}},EB=class extends kn{constructor(e){super(e),this.expr=e}Fr(e,t){if(e.wr()&&t.wr())return T.newValue(it);if(e.wr()||t.wr()||ot(e.value)||ot(t.value)||Oe(e.value)!==Oe(t.value))return T.newValue(He);switch(Bn(e.value,t.value)){case"EQ":return T.newValue(it);case"NOT_EQ":return T.newValue(He);case"NULL":return T.gr();default:Q(44615,{left:e,right:t})}}},_B=class extends kn{constructor(e){super(e),this.expr=e}Fr(e,t){switch(Bn(e.value,t.value)){case"EQ":return T.newValue(He);case"NOT_EQ":case"TYPE_MISMATCH":return T.newValue(it);case"NULL":return T.gr();default:Q(44614,{left:e,right:t})}}},DB=class extends kn{constructor(e){super(e),this.expr=e}Fr(e,t){return Oe(e.value)!==Oe(t.value)||ot(e.value)||ot(t.value)?T.newValue(He):T.newValue({booleanValue:at(e.value,t.value)<0})}},yB=class extends kn{constructor(e){super(e),this.expr=e}Fr(e,t){return Oe(e.value)!==Oe(t.value)||ot(e.value)||ot(t.value)?T.newValue(He):Bn(e.value,t.value)==="EQ"?T.newValue(it):T.newValue({booleanValue:at(e.value,t.value)<0})}},wB=class extends kn{constructor(e){super(e),this.expr=e}Fr(e,t){return Oe(e.value)!==Oe(t.value)||ot(e.value)||ot(t.value)?T.newValue(He):T.newValue({booleanValue:at(e.value,t.value)>0})}},IB=class extends kn{constructor(e){super(e),this.expr=e}Fr(e,t){return Oe(e.value)!==Oe(t.value)||ot(e.value)||ot(t.value)?T.newValue(He):Bn(e.value,t.value)==="EQ"?T.newValue(it):T.newValue({booleanValue:at(e.value,t.value)>0})}},TB=class{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}},AB=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===1,216);let r=ee(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return T.gr();case"ARRAY":{let s=r.value.arrayValue?.values??[];return T.newValue({arrayValue:{values:[...s].reverse()}})}default:return T.mr()}}},vB=class{constructor(e){this.expr=e}evaluate(e,t){return Y(this.expr.params.length===2,52884),new Zo(new F("eq_any",[this.expr.params[1],this.expr.params[0]])).evaluate(e,t)}},bB=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===2,1392);let r=!1,s=ee(this.expr.params[0]).evaluate(e,t);switch(s.type){case"ARRAY":break;case"NULL":r=!0;break;default:return T.mr()}let i=ee(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return T.mr()}if(r)return T.gr();let a=i.value?.arrayValue?.values??[],u=s.value?.arrayValue?.values??[];for(let c of a){let l=!1;r=!1;for(let d of u){switch(dt(c)&&dt(d)?"EQ":Bn(c,d)){case"EQ":l=!0;break;case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:Q(44613,{value:d,search:c})}if(l)break}if(!l)return T.newValue(He)}return T.newValue(it)}},SB=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===2,2680);let r=!1,s=ee(this.expr.params[0]).evaluate(e,t);switch(s.type){case"ARRAY":break;case"NULL":r=!0;break;default:return T.mr()}let i=ee(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return T.mr()}if(r)return T.gr();let a=i.value?.arrayValue?.values??[],u=s.value?.arrayValue?.values??[];for(let c of u)for(let l of a)switch(dt(c)&&dt(l)?"EQ":Bn(c,l)){case"EQ":return T.newValue(it);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:Q(60403,{value:c,search:l})}return r?T.gr():T.newValue(He)}},RB=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===1,38605);let r=ee(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return T.gr();case"ARRAY":return T.newValue({integerValue:`${r.value?.arrayValue?.values?.length??0}`});default:return T.mr()}}},PB=class{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}},NB=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===1,1508);let r=ee(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return T.gr();case"BYTES":{let s=r.value?.bytesValue;if(typeof s=="string"){let i=Ne.fromBase64String(s).toUint8Array();return i.reverse(),T.newValue({bytesValue:Ne.fromUint8Array(i).toBase64()})}return T.newValue({bytesValue:new Uint8Array(s).reverse()})}case"STRING":{let s=r.value?.stringValue,i=new Intl.__PRIVATE_Segmenter(void 0,{granularity:"grapheme"}).segment(s),a=Array.from(i,(u=>u.segment)).reverse();return T.newValue({stringValue:a.join("")})}default:return T.mr()}}},OB=class{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}},FB=class{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}},LB=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===1,19400);let r=ee(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return T.gr();case"STRING":{let s=(function(a){let u=0;for(let c=0;c<a.length;c++){let l=a.codePointAt(c);if(l===void 0)return;if(l<=65535)if(l>=55296&&l<=57343)if(l<=56319){let d=a.codePointAt(c+1);d!==void 0&&d>=56320&&d<=57343?(u+=1,c++):u+=1}else u+=1;else u+=1;else{if(!(l<=1114111))return;u+=1,c++}}return u})(r.value.stringValue);return s===void 0?T.mr():T.newValue({integerValue:s})}default:return T.mr()}}},xB=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===1,8486);let r=ee(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BYTES":{let s=r.value?.bytesValue;return typeof s=="string"?T.newValue({integerValue:Ne.fromBase64String(s).toUint8Array().length}):T.newValue({integerValue:new Uint8Array(s).length})}case"STRING":{let s=(function(a){let u=0;for(let c=0;c<a.length;c++){let l=a.codePointAt(c);if(l===void 0)return;if(l>=55296&&l<=57343){if(!(l<=56319))return;{let d=a.codePointAt(c+1);if(d===void 0||!(d>=56320&&d<=57343))return;u+=4,c++}}else if(l<=127)u+=1;else if(l<=2047)u+=2;else if(l<=65535)u+=3;else{if(!(l<=1114111))return;u+=4,c++}}return u})(r.value?.stringValue);return s===void 0?T.mr():T.newValue({integerValue:s})}case"NULL":return T.gr();default:return T.mr()}}},Vn=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===2,39773,`${this.expr.name}() function should have exactly two parameters`);let r=!1,s=ee(this.expr.params[0]).evaluate(e,t);switch(s.type){case"STRING":break;case"NULL":r=!0;break;default:return T.mr()}let i=ee(this.expr.params[1]).evaluate(e,t);switch(i.type){case"STRING":break;case"NULL":r=!0;break;default:return T.mr()}return r?T.gr():this.Or(s.value?.stringValue,i.value?.stringValue)}},kB=class extends Vn{Or(e,t){try{let r=(function(a){let u="";for(let c=0;c<a.length;c++){let l=a.charAt(c);switch(l){case"_":u+=".";break;case"%":u+=".*";break;case"\\":case".":case"*":case"?":case"+":case"^":case"$":case"|":case"(":case")":case"[":case"]":case"{":case"}":u+="\\"+l;break;default:u+=l}}return"^"+u+"$"})(t),s=ho.compile(r);return T.newValue({booleanValue:s.matches(e)})}catch(r){return yt(`Invalid LIKE pattern converted to regex: ${t}, returning error. Error: ${r}`),T.mr()}}},VB=class extends Vn{Or(e,t){try{let r=ho.compile(t);return T.newValue({booleanValue:r.test(e)})}catch{return yt(`Invalid regex pattern found in regex_contains: ${t}, returning error`),T.mr()}}},MB=class extends Vn{Or(e,t){try{return T.newValue({booleanValue:ho.compile(t).matches(e)})}catch{return yt(`Invalid regex pattern found in regex_match: ${t}, returning error`),T.mr()}}},GB=class extends Vn{Or(e,t){return T.newValue({booleanValue:e.includes(t)})}},UB=class extends Vn{Or(e,t){return T.newValue({booleanValue:e.startsWith(t)})}},HB=class extends Vn{Or(e,t){return T.newValue({booleanValue:e.endsWith(t)})}},qB=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===1,29079);let r=ee(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":return T.newValue({stringValue:r.value?.stringValue?.toLowerCase()});case"NULL":return T.gr();default:return T.mr()}}},jB=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===1,60487);let r=ee(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":return T.newValue({stringValue:r.value?.stringValue?.toUpperCase()});case"NULL":return T.gr();default:return T.mr()}}},KB=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===1,28544);let r=ee(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":return T.newValue({stringValue:r.value?.stringValue?.trim()});case"NULL":return T.gr();default:return T.mr()}}},JB=class{constructor(e){this.expr=e}evaluate(e,t){let r=this.expr.params.map((a=>ee(a).evaluate(e,t))),s="",i=!1;for(let a of r)switch(a.type){case"STRING":s+=a.value.stringValue;break;case"NULL":i=!0;break;default:return T.mr()}return i?T.gr():T.newValue({stringValue:s})}},zB=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===2,4483);let r=ee(this.expr.params[0]).evaluate(e,t);switch(r.type){case"UNSET":return T.pr();case"MAP":break;default:return T.mr()}let s=ee(this.expr.params[1]).evaluate(e,t);if(s.type!=="STRING")return T.mr();let i=r.value?.mapValue?.fields?.[s.value?.stringValue];return i===void 0?T.pr():T.newValue(i)}},Vi=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===2,25231,`${this.expr.name}() function should have exactly 2 params`);let r=!1,s=ee(this.expr.params[0]).evaluate(e,t);switch(s.type){case"VECTOR":break;case"NULL":r=!0;break;default:return T.mr()}let i=ee(this.expr.params[1]).evaluate(e,t);switch(i.type){case"VECTOR":break;case"NULL":r=!0;break;default:return T.mr()}if(r)return T.gr();let a=ll(s.value),u=ll(i.value);if(a===void 0||u===void 0||a.values?.length!==u.values?.length)return T.mr();let c=this.Mr(a,u);return c===void 0||isNaN(c)?T.mr():T.newValue({doubleValue:c})}},WB=class extends Vi{Mr(e,t){let r=e?.values??[],s=t?.values??[];if(r.length===0)return;let i=0,a=0,u=0;for(let l=0;l<r.length;l++){if(!Fn(r[l])||!Fn(s[l]))return;let d=je(r[l]),f=je(s[l]);i+=d*f,a+=d*d,u+=f*f}let c=Math.sqrt(a)*Math.sqrt(u);if(c!==0)return 1-Math.max(-1,Math.min(1,i/c))}},QB=class extends Vi{Mr(e,t){let r=e?.values??[],s=t?.values??[];if(r.length===0)return 0;let i=0;for(let a=0;a<r.length;a++){if(!Fn(r[a])||!Fn(s[a]))return;i+=je(r[a])*je(s[a])}return i}},$B=class extends Vi{Mr(e,t){let r=e?.values??[],s=t?.values??[];if(r.length===0)return 0;let i=0;for(let a=0;a<r.length;a++){if(!Fn(r[a])||!Fn(s[a]))return;let u=je(r[a]),c=je(s[a]);i+=Math.pow(u-c,2)}return Math.sqrt(i)}},YB=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===1,39044);let r=ee(this.expr.params[0]).evaluate(e,t);switch(r.type){case"VECTOR":{let s=ll(r.value);return T.newValue({integerValue:s?.values?.length??0})}case"NULL":return T.gr();default:return T.mr()}}},Mi=BigInt(-62135596800),Gi=BigInt(253402300799),eu=BigInt(1e3),On=BigInt(1e6),kI=Mi*eu,VI=Gi*eu+BigInt(999),MI=Mi*On,GI=Gi*On+BigInt(999999);function ad(n){return n>=MI&&n<=GI}function Am(n){return n>=Mi&&n<=Gi}function Ui(n,e){let t=BigInt(n);return!(t<Mi||t>Gi)&&!(e<0||e>=1e9)&&(t!==Mi||e===0)&&!(t===Gi&&e>999999999)}function vm(n,e){return e<0?{seconds:n-1,nanos:e+1e9}:{seconds:n,nanos:e}}function od(n){return BigInt(n.seconds)*On+BigInt(Math.trunc(n.nanoseconds/1e3))}var Hi=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===1,49262,`${this.expr.name}() function should have exactly one parameter`);let r=ee(this.expr.params[0]).evaluate(e,t);switch(r.type){case"INT":return this.toTimestamp(BigInt(r.value.integerValue));case"NULL":return T.gr();default:return T.mr()}}},XB=class extends Hi{toTimestamp(e){if(!ad(e))return T.mr();let t=Number(e/On),r=Number(e%On*BigInt(1e3)),s=vm(t,r);return t=s.seconds,r=s.nanos,Ui(t,r)?T.newValue({timestampValue:{seconds:t,nanos:r}}):T.mr()}},ZB=class extends Hi{toTimestamp(e){if(!(function(a){return a>=kI&&a<=VI})(e))return T.mr();let t=Number(e/eu),r=Number(e%eu*BigInt(1e6)),s=vm(t,r);return t=s.seconds,r=s.nanos,Ui(t,r)?T.newValue({timestampValue:{seconds:t,nanos:r}}):T.mr()}},eh=class extends Hi{toTimestamp(e){if(!Am(e))return T.mr();let t=Number(e);return T.newValue({timestampValue:{seconds:t,nanos:0}})}},qi=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===1,1265,`${this.expr.name}() function should have exactly one parameter`);let r=ee(this.expr.params[0]).evaluate(e,t);switch(r.type){case"TIMESTAMP":break;case"NULL":return T.gr();default:return T.mr()}let s=Zh(r.value.timestampValue);return Ui(s.seconds,s.nanoseconds)?this.Nr(s):T.mr()}},th=class extends qi{Nr(e){let t=od(e);return ad(t)?T.newValue({integerValue:`${t.toString()}`}):T.mr()}},nh=class extends qi{Nr(e){let t=od(e),r=t/BigInt(1e3),s=t%BigInt(1e3);return r>BigInt(0)||s===BigInt(0)?T.newValue({integerValue:r.toString()}):T.newValue({integerValue:(r-BigInt(1)).toString()})}},rh=class extends qi{Nr(e){let t=BigInt(e.seconds);return Am(t)?T.newValue({integerValue:t.toString()}):T.mr()}},tu=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===3,2775,`${this.expr.name}() function should have exactly 3 parameters`);let r=!1,s=ee(this.expr.params[0]).evaluate(e,t);switch(s.type){case"TIMESTAMP":break;case"NULL":r=!0;break;default:return T.mr()}let i=ee(this.expr.params[1]).evaluate(e,t),a;switch(i.type){case"STRING":if(a=(function(Be){switch(Be){case"microsecond":return"microsecond";case"millisecond":return"millisecond";case"second":return"second";case"minute":return"minute";case"hour":return"hour";case"day":return"day";default:return}})(i.value.stringValue),a===void 0)return T.mr();break;case"NULL":r=!0;break;default:return T.mr()}let u=ee(this.expr.params[2]).evaluate(e,t);switch(u.type){case"INT":break;case"NULL":r=!0;break;default:return T.mr()}if(r)return T.gr();let c=BigInt(u.value.integerValue),l;try{switch(a){case"microsecond":l=c;break;case"millisecond":l=c*BigInt(1e3);break;case"second":l=c*BigInt(1e6);break;case"minute":l=c*BigInt(6e7);break;case"hour":l=c*BigInt(36e8);break;case"day":l=c*BigInt(864e8);break;default:return T.mr()}if(a!=="microsecond"&&c!==BigInt(0)&&l/c!==BigInt(this.Lr(a)))return T.mr()}catch(z){return yt(`Error during timestamp arithmetic: ${z}`),T.mr()}let d=Zh(s.value.timestampValue);if(!Ui(d.seconds,d.nanoseconds))return T.mr();let f=od(d),m=this.Br(f,l);if(!ad(m))return T.mr();let v=Number(m/On),R=m%On,V=Number((R<0?R+On:R)*BigInt(1e3)),H=R<0?v-1:v;return Ui(H,V)?T.newValue({timestampValue:{seconds:H,nanos:V}}):T.mr()}Lr(e){switch(e){case"millisecond":return 1e3;case"second":return 1e6;case"minute":return 6e7;case"hour":return 36e8;case"day":return 864e8;default:return 1}}},sh=class extends tu{Br(e,t){return e+t}},ih=class extends tu{Br(e,t){return e-t}};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ji(n){if((n=Tm(n))instanceof wr)return`fld(${n.fieldName})`;if(n instanceof ps)return`cst(${(function(t){return t===null?"null":typeof t=="number"?t.toString():typeof t=="string"?`"${t}"`:t instanceof qe?`ref(${t.path})`:t instanceof Ct?`vec(${JSON.stringify(t)})`:JSON.stringify(t)})(n.value)})`;if(n instanceof F)return`fn(${n.name},[${n.params.map(ji).join(",")}])`;if(n.expressionType==="ListOfExpressions")return`list([${n.cr.map(ji).join(",")}])`;throw new Error(`Unrecognized expr ${JSON.stringify(n,null,2)}`)}function UI(n){if(n instanceof Qo)return`${n._name}(${go(n.fields)})`;if(n instanceof $o){let e=`${n._name}(${go(n.accumulators)})`;return n.groups.size>0&&(e+=`grouping(${go(n.groups)})`),e}if(n instanceof Yo)return`${n._name}(${go(n.groups)})`;if(n instanceof Cs)return`${n._name}(${n.hr})`;if(n instanceof gs)return`${n._name}(${n.collectionId})`;if(n instanceof Fi)return`${n._name}()`;if(n instanceof Li)return`${n._name}(${n.Tr.sort()})`;if(n instanceof xi)return`${n._name}(${ji(n.condition)})`;if(n instanceof Ir)return`${n._name}(${n.limit})`;if(n instanceof ki)return`${n._name}(${(function(t){return t.map((r=>`${ji(r.expr)}${r.direction}`)).join(",")})(n.orderings)})`;throw new Error(`Unrecognized stage ${n._name}`)}function go(n){return`${Array.from(n.entries()).sort().map((([e,t])=>`${e}=${ji(t)}`)).join(",")}`}function nn(n){return n.stages.map((e=>UI(e))).join("|")}function bm(n,e){return nn(n)===nn(e)}function ke(n){return n instanceof We}function hg(n){return ke(n)?nn(n):mi(n)}function Sm(n){return ke(n)?nn(n):(function(t){return`${Kg(Gt(t))}|lt:${t.limitType}`})(n)}function Eu(n,e){return n instanceof We&&e instanceof We?bm(n,e):!(n instanceof We&&!(e instanceof We)||!(n instanceof We)&&e instanceof We)&&Hw(n,e)}function Rm(n){return sr(n)?nn(n):Kg(n)}function Pm(n,e){return n instanceof We&&e instanceof We?bm(n,e):!(n instanceof We&&!(e instanceof We)||!(n instanceof We)&&e instanceof We)&&Jg(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ah=class{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){let r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){let i=this.mutations[s];i.key.isEqual(e.key)&&Ow(i,e,r[s])}}applyToLocalView(e,t){for(let r of this.baseMutations)r.key.isEqual(e.key)&&(t=gi(r,e,t,this.localWriteTime));for(let r of this.mutations)r.key.isEqual(e.key)&&(t=gi(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let r=Yg();return this.mutations.forEach((s=>{let i=e.get(s.key),a=i.overlayedDocument,u=this.applyToLocalView(a,i.mutatedFields);u=t.has(s.key)?null:u;let c=Vg(a,u);c!==null&&r.set(s.key,c),a.isValidDocument()||a.convertToNoDocument(te.min())})),r}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),oe())}isEqual(e){return this.batchId===e.batchId&&es(this.mutations,e.mutations,((t,r)=>zC(t,r)))&&es(this.baseMutations,e.baseMutations,((t,r)=>zC(t,r)))}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Nm="";function HI(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=dg(e)),e=qI(n.get(t),e);return dg(e)}function qI(n,e){let t=e,r=n.length;for(let s=0;s<r;s++){let i=n.charAt(s);switch(i){case"\0":t+="";break;case Nm:t+="";break;default:t+=i}}return t}function dg(n){return n+Nm+""}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var jI="remoteDocuments",Om="owner";var Fm="mutationQueues";var Lm="mutations";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var xm="documentMutations",KI="remoteDocumentsV14";var km="remoteDocumentGlobal";var Vm="targets";var Mm="targetDocuments";var Gm="targetGlobal",Um="collectionParents";var Hm="clientMetadata";var qm="bundles";var jm="namedQueries";var JI="indexConfiguration";var zI="indexState";var WI="indexEntries";var Km="documentOverlays";var QI="globals";var $I=[Fm,Lm,xm,jI,Vm,Om,Gm,Mm,Hm,km,Um,qm,jm],Eb=[...$I,Km],YI=[Fm,Lm,xm,KI,Vm,Om,Gm,Mm,Hm,km,Um,qm,jm,Km],XI=YI,ZI=[...XI,JI,zI,WI];var _b=[...ZI,QI];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var oh=class{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Es=class n{constructor(e,t,r,s,i=te.min(),a=te.min(),u=Ne.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=u,this.expectedCount=c}withSequenceNumber(e){return new n(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var uh=class{constructor(e){this.$r=e}};function eT(n){let e=uI({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Ro(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var nu=class{constructor(){}ei(e,t){this.ti(e,t),t.ni()}ti(e,t){if("nullValue"in e)this.ri(t,5);else if("booleanValue"in e)this.ri(t,10),t.ii(e.booleanValue?1:0);else if("integerValue"in e)this.ri(t,15),t.ii(Ee(e.integerValue));else if("doubleValue"in e){let r=Ee(e.doubleValue);isNaN(r)?this.ri(t,13):(this.ri(t,15),rs(r)?t.ii(0):t.ii(r))}else if("timestampValue"in e){let r=e.timestampValue;this.ri(t,20),typeof r=="string"&&(r=an(r)),t.si(`${r.seconds||""}`),t.ii(r.nanos||0)}else if("stringValue"in e)this._i(e.stringValue,t),this.oi(t);else if("bytesValue"in e)this.ri(t,30),t.ai(on(e.bytesValue)),this.oi(t);else if("referenceValue"in e)this.ui(e.referenceValue,t);else if("geoPointValue"in e){let r=e.geoPointValue;this.ri(t,45),t.ii(r.latitude||0),t.ii(r.longitude||0)}else"mapValue"in e?Fg(e)?this.ri(t,Number.MAX_SAFE_INTEGER):Ti(e)?this.ci(e.mapValue,t):(this.li(e.mapValue,t),this.oi(t)):"arrayValue"in e?(this.Ei(e.arrayValue,t),this.oi(t)):Q(19022,{hi:e})}_i(e,t){this.ri(t,25),this.Ti(e,t)}Ti(e,t){t.si(e)}li(e,t){let r=e.fields||{};this.ri(t,55);for(let s of Object.keys(r))this._i(s,t),this.ti(r[s],t)}ci(e,t){let r=e.fields||{};this.ri(t,53);let s=lr,i=r[s].arrayValue?.values?.length||0;this.ri(t,15),t.ii(Ee(i)),this._i(s,t),this.ti(r[s],t)}Ei(e,t){let r=e.values||[];this.ri(t,50);for(let s of r)this.ti(s,t)}ui(e,t){this.ri(t,37),Z.fromName(e).path.forEach((r=>{this.ri(t,60),this.Ti(r,t)}))}ri(e,t){e.ii(t)}oi(e){e.ii(2)}};nu.Pi=new nu;/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law | agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ch=class{constructor(){this.Zi=new lh}addToCollectionParentIndex(e,t){return this.Zi.add(t),k.resolve()}getCollectionParents(e,t){return k.resolve(this.Zi.getEntries(t))}addFieldIndex(e,t){return k.resolve()}deleteFieldIndex(e,t){return k.resolve()}deleteAllFieldIndexes(e){return k.resolve()}createTargetIndexes(e,t){return k.resolve()}getDocumentsMatchingTarget(e,t){return k.resolve(null)}getIndexType(e,t){return k.resolve(0)}getFieldIndexes(e,t){return k.resolve([])}getNextCollectionGroupToUpdate(e){return k.resolve(null)}getMinOffset(e,t){return k.resolve(mr.min())}getMinOffsetFromCollectionGroup(e,t){return k.resolve(mr.min())}updateCollectionGroup(e,t,r){return k.resolve()}updateIndexEntries(e,t){return k.resolve()}},lh=class{constructor(){this.index={}}add(e){let t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new Ve(he.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){let t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new Ve(he.comparator)).toArray()}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Db=new Uint8Array(0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ar=class n{constructor(e){this.ys=e}next(){return this.ys+=2,this.ys}static ws(){return new n(0)}static bs(){return new n(-1)}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */// Copyright 2024 Google LLC* @license
function Jm(n,e){let t=e;for(let r of n.stages)t=nT({serializer:n.serializer,serverTimestampBehavior:n.listenOptions?.serverTimestampBehavior},r,t);return t}function _u(n,e){return Jm(n,[e]).length>0}function tT(n,e){return ke(n)?_u(n,e):pu(n,e)}function nT(n,e,t){if(e instanceof Cs)return(function(s,i,a){return a.filter((u=>u.isFoundDocument()&&`/${u.key.getCollectionPath().canonicalString()}`===i.hr))})(0,e,t);if(e instanceof xi)return(function(s,i,a){return a.filter((u=>{let c=yi(ee(i.condition).evaluate(s,u));return c!==void 0&&wt(c,it)}))})(n,e,t);if(e instanceof gs)return(function(s,i,a){return a.filter((u=>u.isFoundDocument()&&u.key.getCollectionPath().lastSegment()===i.collectionId))})(0,e,t);if(e instanceof Fi)return(function(s,i,a){return a.filter((u=>u.isFoundDocument()))})(0,0,t);if(e instanceof Li)return(function(s,i,a){return a.filter((u=>u.isFoundDocument()&&i.Pr.has(u.key.path.toStringWithLeadingSlash())))})(0,e,t);if(e instanceof Ir)return(function(s,i,a){return a.slice(0,i.limit)})(0,e,t);if(e instanceof ki)return(function(s,i,a){let u=i.orderings.map((c=>({Ms:ee(c.expr),direction:c.direction})));return[...a].sort(((c,l)=>{for(let{Ms:d,direction:f}of u){let m=yi(d.evaluate(s,c)),v=yi(d.evaluate(s,l)),R=at(m??ss,v??ss);if(R!==0)return f==="ascending"?R:-R}return 0}))})(n,e,t);throw new Error(`Unknown stage: ${e._name}`)}function Bh(n){let e=(function(r){for(let s=r.stages.length-1;s>=0;s--){let i=r.stages[s];if(i instanceof ki)return i.orderings}throw new Error("Pipeline must contain at least one Sort stage")})(n);return(t,r)=>{for(let s of e){let i=yi(ee(s.expr).evaluate({serializer:n.serializer},t)),a=yi(ee(s.expr).evaluate({serializer:n.serializer},r)),u=at(i||ss,a||ss);if(u!==0)return s.direction==="ascending"?u:-u}return 0}}function sl(n){for(let e=n.stages.length-1;e>=0;e--){let t=n.stages[e];if(t instanceof Ir)return{limit:t.limit}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var hh=class{constructor(){this.changes=new cn((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,gt.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let r=this.changes.get(t);return r!==void 0?k.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var dh=class{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var fh=class{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(r=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(r!==null&&gi(r.mutation,s,Rt.empty(),Ie.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.getLocalViewOfDocuments(e,r,oe()).next((()=>r))))}getLocalViewOfDocuments(e,t,r=oe()){let s=Pn();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,r).next((i=>{let a=Kr();return i.forEach(((u,c)=>{a=a.insert(u,c.overlayedDocument)})),a}))))}getOverlayedDocuments(e,t){let r=Pn();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,oe())))}populateOverlays(e,t,r){let s=[];return r.forEach((i=>{t.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((a,u)=>{t.set(a,u)}))}))}computeViews(e,t,r,s){let i=ft(),a=Ei(),u=(function(){return Ei()})();return t.forEach(((c,l)=>{let d=r.get(l.key);s.has(l.key)&&(d===void 0||d.mutation instanceof un)?i=i.insert(l.key,l):d!==void 0?(a.set(l.key,d.mutation.getFieldMask()),gi(d.mutation,l,d.mutation.getFieldMask(),Ie.now())):a.set(l.key,Rt.empty())})),this.recalculateAndSaveOverlays(e,i).next((c=>(c.forEach(((l,d)=>a.set(l,d))),t.forEach(((l,d)=>u.set(l,new dh(d,a.get(l)??null)))),u)))}recalculateAndSaveOverlays(e,t){let r=Ei(),s=new Te(((a,u)=>a-u)),i=oe();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((a=>{for(let u of a)u.keys().forEach((c=>{let l=t.get(c);if(l===null)return;let d=r.get(c)||Rt.empty();d=u.applyToLocalView(l,d),r.set(c,d);let f=(s.get(u.batchId)||oe()).add(c);s=s.insert(u.batchId,f)}))})).next((()=>{let a=[],u=s.getReverseIterator();for(;u.hasNext();){let c=u.getNext(),l=c.key,d=c.value,f=Yg();d.forEach((m=>{if(!i.has(m)){let v=Vg(t.get(m),r.get(m));v!==null&&f.set(m,v),i=i.add(m)}})),a.push(this.documentOverlayCache.saveOverlays(e,l,f))}return k.waitFor(a)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,t,r,s){return ke(t)?this.getDocumentsMatchingPipeline(e,t,r,s):Gw(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Wg(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next((i=>{let a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):k.resolve(Pn()),u=vi,c=i;return a.next((l=>k.forEach(l,((d,f)=>(u<f.largestBatchId&&(u=f.largestBatchId),i.get(d)?k.resolve():this.remoteDocumentCache.getEntry(e,d).next((m=>{c=c.insert(d,m)}))))).next((()=>this.populateOverlays(e,l,i))).next((()=>this.computeViews(e,c,l,oe()))).next((d=>({batchId:u,changes:Jw(d)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new Z(t)).next((r=>{let s=Kr();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){let i=t.collectionGroup,a=Kr();return this.indexManager.getCollectionParents(e,i).next((u=>k.forEach(u,(c=>{let l=(function(f,m){return new hs(m,null,f.explicitOrderBy.slice(),f.filters.slice(),f.limit,f.limitType,f.startAt,f.endAt)})(t,c.child(i));return this.getDocumentsMatchingCollectionQuery(e,l,r,s).next((d=>{d.forEach(((f,m)=>{a=a.insert(f,m)}))}))})).next((()=>a))))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next((a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s)))).next((a=>this.retrieveMatchingLocalDocuments(i,a,(u=>pu(t,u)))))}getDocumentsMatchingPipeline(e,t,r,s){if(Nn(t)==="collection_group"){let i=id(t),a=Kr();return this.indexManager.getCollectionParents(e,i).next((u=>k.forEach(u,(c=>{let l=(function(f,m){let v=f.stages.map((R=>R instanceof gs?new Cs(m.canonicalString(),{}):R));return new We(f.serializer,v)})(t,c.child(i));return this.getDocumentsMatchingPipeline(e,l,r,s).next((d=>{d.forEach(((f,m)=>{a=a.insert(f,m)}))}))})).next((()=>a))))}{let i;return this.getOverlaysForPipeline(e,t,r.largestBatchId).next((a=>{switch(i=a,Nn(t)){case"collection":return this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s);case"documents":let u=oe();for(let c of Yl(t))u=u.add(Z.fromPath(c));return this.remoteDocumentCache.getEntries(e,u);case"database":return this.remoteDocumentCache.getAllEntries(e);default:throw new K("invalid-argument",`Invalid pipeline source to execute offline: ${nn(t)}`)}})).next((a=>this.retrieveMatchingLocalDocuments(i,a,(u=>_u(t,u)))))}}retrieveMatchingLocalDocuments(e,t,r){e.forEach(((i,a)=>{let u=a.getKey();t.get(u)===null&&(t=t.insert(u,gt.newInvalidDocument(u)))}));let s=Kr();return t.forEach(((i,a)=>{let u=e.get(i);u!==void 0&&gi(u.mutation,a,Rt.empty(),Ie.now()),r(a)&&(s=s.insert(i,a))})),s}getOverlaysForPipeline(e,t,r){switch(Nn(t)){case"collection":return this.documentOverlayCache.getOverlaysForCollection(e,he.fromString(mu(t)),r);case"collection_group":throw new K("invalid-argument",`Unexpected collection group pipeline: ${nn(t)}`);case"documents":return this.documentOverlayCache.getOverlays(e,Yl(t).map((s=>Z.fromPath(s))));case"database":return this.documentOverlayCache.getAllOverlays(e,r);default:throw new K("invalid-argument",`Failed to get overlays for pipeline: ${nn(t)}`)}}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ph=class{constructor(e){this.serializer=e,this.Qs=new Map,this.Ws=new Map}getBundleMetadata(e,t){return k.resolve(this.Qs.get(t))}saveBundleMetadata(e,t){return this.Qs.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:en(s.createTime)}})(t)),k.resolve()}getNamedQuery(e,t){return k.resolve(this.Ws.get(t))}saveNamedQuery(e,t){return this.Ws.set(t.name,(function(s){return{name:s.name,query:eT(s.bundledQuery),readTime:en(s.readTime)}})(t)),k.resolve()}};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ch=class{constructor(){this.overlays=new Te(Z.comparator),this.Gs=new Map}getOverlay(e,t){return k.resolve(this.overlays.get(t))}getOverlays(e,t){let r=Pn();return k.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}getAllOverlays(e,t){let r=Pn();return this.overlays.forEach(((s,i)=>{i.largestBatchId>t&&r.set(s,i)})),k.resolve(r)}saveOverlays(e,t,r){return r.forEach(((s,i)=>{this.Zr(e,t,i)})),k.resolve()}removeOverlaysForBatchId(e,t,r){let s=this.Gs.get(r);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.Gs.delete(r)),k.resolve()}getOverlaysForCollection(e,t,r){let s=Pn(),i=t.length+1,a=new Z(t.child("")),u=this.overlays.getIteratorFrom(a);for(;u.hasNext();){let c=u.getNext().value,l=c.getKey();if(!t.isPrefixOf(l.path))break;l.path.length===i&&c.largestBatchId>r&&s.set(c.getKey(),c)}return k.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new Te(((l,d)=>l-d)),a=this.overlays.getIterator();for(;a.hasNext();){let l=a.getNext().value;if(l.getKey().getCollectionGroup()===t&&l.largestBatchId>r){let d=i.get(l.largestBatchId);d===null&&(d=Pn(),i=i.insert(l.largestBatchId,d)),d.set(l.getKey(),l)}}let u=Pn(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach(((l,d)=>u.set(l,d))),!(u.size()>=s)););return k.resolve(u)}Zr(e,t,r){let s=this.overlays.get(r.key);if(s!==null){let a=this.Gs.get(s.largestBatchId).delete(r.key);this.Gs.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new oh(t,r));let i=this.Gs.get(t);i===void 0&&(i=oe(),this.Gs.set(t,i)),this.Gs.set(t,i.add(r.key))}};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var gh=class{constructor(){this.sessionToken=Ne.EMPTY_BYTE_STRING}getSessionToken(e){return k.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,k.resolve()}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ki=class{constructor(){this.zs=new Ve(Se.js),this.Hs=new Ve(Se.Js)}isEmpty(){return this.zs.isEmpty()}addReference(e,t){let r=new Se(e,t);this.zs=this.zs.add(r),this.Hs=this.Hs.add(r)}Ys(e,t){e.forEach((r=>this.addReference(r,t)))}removeReference(e,t){this.Zs(new Se(e,t))}Xs(e,t){e.forEach((r=>this.removeReference(r,t)))}e_(e){let t=new Z(new he([])),r=new Se(t,e),s=new Se(t,e+1),i=[];return this.Hs.forEachInRange([r,s],(a=>{this.Zs(a),i.push(a.key)})),i}t_(){this.zs.forEach((e=>this.Zs(e)))}Zs(e){this.zs=this.zs.delete(e),this.Hs=this.Hs.delete(e)}n_(e){let t=new Z(new he([])),r=new Se(t,e),s=new Se(t,e+1),i=oe();return this.Hs.forEachInRange([r,s],(a=>{i=i.add(a.key)})),i}containsKey(e){let t=new Se(e,0),r=this.zs.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}},Se=class{constructor(e,t){this.key=e,this.r_=t}static js(e,t){return Z.comparator(e.key,t.key)||se(e.r_,t.r_)}static Js(e,t){return se(e.r_,t.r_)||Z.comparator(e.key,t.key)}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var mh=class{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Gr=1,this.i_=new Ve(Se.js)}checkEmpty(e){return k.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){let i=this.Gr;this.Gr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let a=new ah(i,t,r,s);this.mutationQueue.push(a);for(let u of s)this.i_=this.i_.add(new Se(u.key,i)),this.indexManager.addToCollectionParentIndex(e,u.key.path.popLast());return k.resolve(a)}lookupMutationBatch(e,t){return k.resolve(this.s_(t))}getNextMutationBatchAfterBatchId(e,t){let r=t+1,s=this.__(r),i=s<0?0:s;return k.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return k.resolve(this.mutationQueue.length===0?Aw:this.Gr-1)}getAllMutationBatches(e){return k.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let r=new Se(t,0),s=new Se(t,Number.POSITIVE_INFINITY),i=[];return this.i_.forEachInRange([r,s],(a=>{let u=this.s_(a.r_);i.push(u)})),k.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Ve(se);return t.forEach((s=>{let i=new Se(s,0),a=new Se(s,Number.POSITIVE_INFINITY);this.i_.forEachInRange([i,a],(u=>{r=r.add(u.r_)}))})),k.resolve(this.o_(r))}getAllMutationBatchesAffectingQuery(e,t){let r=t.path,s=r.length+1,i=r;Z.isDocumentKey(i)||(i=i.child(""));let a=new Se(new Z(i),0),u=new Ve(se);return this.i_.forEachWhile((c=>{let l=c.key.path;return!!r.isPrefixOf(l)&&(l.length===s&&(u=u.add(c.r_)),!0)}),a),k.resolve(this.o_(u))}o_(e){let t=[];return e.forEach((r=>{let s=this.s_(r);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){Y(this.a_(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.i_;return k.forEach(t.mutations,(s=>{let i=new Se(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.i_=r}))}Hr(e){}containsKey(e,t){let r=new Se(t,0),s=this.i_.firstAfterOrEqual(r);return k.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,k.resolve()}a_(e,t){return this.__(e)}__(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}s_(e){let t=this.__(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Eh=class{constructor(e){this.u_=e,this.docs=(function(){return new Te(Z.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.u_(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let r=this.docs.get(t);return k.resolve(r?r.document.mutableCopy():gt.newInvalidDocument(t))}getEntries(e,t){let r=ft();return t.forEach((s=>{let i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():gt.newInvalidDocument(s))})),k.resolve(r)}getAllEntries(e){let t=ft();return this.docs.forEach(((r,s)=>{t=t.insert(r,s.document)})),k.resolve(t)}getDocumentsMatchingQuery(e,t,r,s){let i,a;ke(t)?(i=he.fromString(mu(t)),a=d=>_u(t,d)):(i=t.path,a=d=>pu(t,d));let u=ft(),c=new Z(i.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){let{key:d,value:{document:f}}=l.getNext();if(!i.isPrefixOf(d.path))break;d.path.length>i.length+1||Vw(kw(f),r)<=0||(s.has(f.key)||a(f))&&(u=u.insert(f.key,f.mutableCopy()))}return k.resolve(u)}getAllFromCollectionGroup(e,t,r,s){Q(9500)}c_(e,t){return k.forEach(this.docs,(r=>t(r)))}newChangeBuffer(e){return new _h(this)}getSize(e){return k.resolve(this.size)}},_h=class extends hh{constructor(e){super(),this.$s=e}applyChanges(e){let t=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?t.push(this.$s.addEntry(e,s)):this.$s.removeEntry(r)})),k.waitFor(t)}getFromCache(e,t){return this.$s.getEntry(e,t)}getAllFromCache(e,t){return this.$s.getEntries(e,t)}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Dh=class{constructor(e){this.persistence=e,this.l_=new cn((t=>Rm(t)),Pm),this.lastRemoteSnapshotVersion=te.min(),this.highestTargetId=0,this.E_=0,this.h_=new Ki,this.targetCount=0,this.T_=Ar.ws()}forEachTarget(e,t){return this.l_.forEach(((r,s)=>t(s))),k.resolve()}getLastRemoteSnapshotVersion(e){return k.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return k.resolve(this.E_)}allocateTargetId(e){return this.highestTargetId=this.T_.next(),k.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.E_&&(this.E_=t),k.resolve()}Ds(e){this.l_.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this.T_=new Ar(t),this.highestTargetId=t),e.sequenceNumber>this.E_&&(this.E_=e.sequenceNumber)}addTargetData(e,t){return this.Ds(t),this.targetCount+=1,k.resolve()}updateTargetData(e,t){return this.Ds(t),k.resolve()}removeTargetData(e,t){return this.l_.delete(t.target),this.h_.e_(t.targetId),this.targetCount-=1,k.resolve()}removeTargets(e,t,r){let s=0,i=[];return this.l_.forEach(((a,u)=>{u.sequenceNumber<=t&&r.get(u.targetId)===null&&(this.l_.delete(a),i.push(this.removeMatchingKeysForTargetId(e,u.targetId)),s++)})),k.waitFor(i).next((()=>s))}getTargetCount(e){return k.resolve(this.targetCount)}getTargetData(e,t){let r=this.l_.get(t)||null;return k.resolve(r)}addMatchingKeys(e,t,r){return this.h_.Ys(t,r),k.resolve()}removeMatchingKeys(e,t,r){this.h_.Xs(t,r);let s=this.persistence.referenceDelegate,i=[];return s&&t.forEach((a=>{i.push(s.markPotentiallyOrphaned(e,a))})),k.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.h_.e_(t),k.resolve()}getMatchingKeysForTargetId(e,t){let r=this.h_.n_(t);return k.resolve(r)}containsKey(e,t){return k.resolve(this.h_.containsKey(t))}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ru=class{constructor(e,t){this.P_={},this.overlays={},this.I_=new ds(0),this.R_=!1,this.R_=!0,this.A_=new gh,this.referenceDelegate=e(this),this.V_=new Dh(this),this.indexManager=new ch,this.remoteDocumentCache=(function(s){return new Eh(s)})((r=>this.referenceDelegate.d_(r))),this.serializer=new uh(t),this.f_=new ph(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.R_=!1,Promise.resolve()}get started(){return this.R_}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Ch,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.P_[e.toKey()];return r||(r=new mh(t,this.referenceDelegate),this.P_[e.toKey()]=r),r}getGlobalsCache(){return this.A_}getTargetCache(){return this.V_}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.f_}runTransaction(e,t,r){j("MemoryPersistence","Starting transaction:",e);let s=new yh(this.I_.next());return this.referenceDelegate.m_(),r(s).next((i=>this.referenceDelegate.p_(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}g_(e,t){return k.or(Object.values(this.P_).map((r=>()=>r.containsKey(e,t))))}},yh=class extends Vl{constructor(e){super(),this.currentSequenceNumber=e}},wh=class n{constructor(e){this.persistence=e,this.y_=new Ki,this.w_=null}static b_(e){return new n(e)}get S_(){if(this.w_)return this.w_;throw Q(60996)}addReference(e,t,r){return this.y_.addReference(r,t),this.S_.delete(r.toString()),k.resolve()}removeReference(e,t,r){return this.y_.removeReference(r,t),this.S_.add(r.toString()),k.resolve()}markPotentiallyOrphaned(e,t){return this.S_.add(t.toString()),k.resolve()}removeTarget(e,t){this.y_.e_(t.targetId).forEach((s=>this.S_.add(s.toString())));let r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((i=>this.S_.add(i.toString())))})).next((()=>r.removeTargetData(e,t)))}m_(){this.w_=new Set}p_(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return k.forEach(this.S_,(r=>{let s=Z.fromPath(r);return this.v_(e,s).next((i=>{i||t.removeEntry(s,te.min())}))})).next((()=>(this.w_=null,t.apply(e))))}updateLimboDocument(e,t){return this.v_(e,t).next((r=>{r?this.S_.delete(t.toString()):this.S_.add(t.toString())}))}d_(e){return 0}v_(e,t){return k.or([()=>k.resolve(this.y_.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.g_(e,t)])}},su=class n{constructor(e,t){this.persistence=e,this.D_=new cn((r=>HI(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=wI(this,t)}static b_(e,t){return new n(e,t)}m_(){}p_(e){return k.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}ir(e){let t=this.Cs(e);return this.persistence.getTargetCache().getTargetCount(e).next((r=>t.next((s=>r+s))))}Cs(e){let t=0;return this.sr(e,(r=>{t++})).next((()=>t))}sr(e,t){return k.forEach(this.D_,((r,s)=>this.Os(e,r,s).next((i=>i?k.resolve():t(s)))))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0,s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.c_(e,(a=>this.Os(e,a,t).next((u=>{u||(r++,i.removeEntry(a,te.min()))})))).next((()=>i.apply(e))).next((()=>r))}markPotentiallyOrphaned(e,t){return this.D_.set(t,e.currentSequenceNumber),k.resolve()}removeTarget(e,t){let r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.D_.set(r,e.currentSequenceNumber),k.resolve()}removeReference(e,t,r){return this.D_.set(r,e.currentSequenceNumber),k.resolve()}updateLimboDocument(e,t){return this.D_.set(t,e.currentSequenceNumber),k.resolve()}d_(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=mo(e.data.value)),t}Os(e,t,r){return k.or([()=>this.persistence.g_(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{let s=this.D_.get(t);return k.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ih=class n{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Vo=r,this.fo=s}static mo(e,t){let r=oe(),s=oe();for(let i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new n(e,t.fromCache,r,s)}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rT(n,e){return Z.comparator(n.key,e.key)}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Th=class{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ah=class{constructor(){this.po=!1,this.yo=!1,this.wo=100,this.bo=(function(){return Nf()?8:DI(Ge())>0?6:4})()}initialize(e,t){this.So=e,this.indexManager=t,this.po=!0}getDocumentsMatchingQuery(e,t,r,s){let i={result:null};return this.vo(e,t).next((a=>{i.result=a})).next((()=>{if(!i.result)return this.Do(e,t,s,r).next((a=>{i.result=a}))})).next((()=>{if(i.result)return;let a=new Th;return this.xo(e,t,a).next((u=>{if(i.result=u,this.yo)return this.Co(e,t,a,u.size)}))})).next((()=>i.result))}Co(e,t,r,s){return ke(t)?k.resolve():r.documentReadCount<this.wo?(qr()<=re.DEBUG&&j("QueryEngine","SDK will not create cache indexes for query:",mi(t),"since it only creates cache indexes for collection contains","more than or equal to",this.wo,"documents"),k.resolve()):(qr()<=re.DEBUG&&j("QueryEngine","Query:",mi(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.bo*s?(qr()<=re.DEBUG&&j("QueryEngine","The SDK decides to create cache indexes for query:",mi(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Gt(t))):k.resolve())}vo(e,t){if(ke(t))return k.resolve(null);let r=t;if(ZC(r))return k.resolve(null);let s=Gt(r);return this.indexManager.getIndexType(e,s).next((i=>i===0?null:(r.limit!==null&&i===1&&(r=Ro(r,null,"F"),s=Gt(r)),this.indexManager.getDocumentsMatchingTarget(e,s).next((a=>{let u=oe(...a);return this.So.getDocuments(e,u).next((c=>this.indexManager.getMinOffset(e,s).next((l=>{let d=this.Fo(r,c);return this.Oo(r,d,u,l.readTime)?this.vo(e,Ro(r,null,"F")):this.Mo(e,d,r,l)}))))})))))}Do(e,t,r,s){return(ke(t)?(function(a){for(let u of a.stages){if(u instanceof Ir||u instanceof Xo)return!1;if(u instanceof xi){if(u.condition instanceof Jo&&u.condition._expr.name==="exists"&&u.condition._expr.params[0]instanceof wr&&u.condition._expr.params[0].fieldName===ts)continue;return!1}}return!0})(t):ZC(t))||s.isEqual(te.min())?k.resolve(null):this.So.getDocuments(e,r).next((i=>{let a=this.Fo(t,i);return this.Oo(t,a,r,s)?k.resolve(null):(qr()<=re.DEBUG&&j("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),hg(t)),this.Mo(e,a,t,xw(s,vi)).next((u=>u)))}))}Fo(e,t){let r,s;return ke(e)?(r=new Ve(rT),s=i=>_u(e,i)):(r=new Ve(Xh(e)),s=i=>pu(e,i)),t.forEach(((i,a)=>{s(a)&&(r=r.add(a))})),r}Oo(e,t,r,s){if(ke(e))return(function(u){return u.stages.some((c=>c instanceof Ir||c instanceof Xo))})(e);if(e.limit===null)return!1;if(r.size!==t.size)return!0;let i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}xo(e,t,r){return qr()<=re.DEBUG&&j("QueryEngine","Using full collection scan to execute query:",hg(t)),this.So.getDocumentsMatchingQuery(e,t,mr.min(),r)}Mo(e,t,r,s){return this.So.getDocumentsMatchingQuery(e,r,s).next((i=>(t.forEach((a=>{i=i.insert(a.key,a)})),i)))}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ud="LocalStore",sT=3e8,vh=class{constructor(e,t,r,s){this.persistence=e,this.No=t,this.serializer=s,this.Lo=new Te(se),this.Bo=new cn((i=>Rm(i)),Pm),this.Uo=new Map,this.ko=e.getRemoteDocumentCache(),this.V_=e.getTargetCache(),this.f_=e.getBundleCache(),this.qo(r)}qo(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new fh(this.ko,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.ko.setIndexManager(this.indexManager),this.No.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.Lo)))}};function iT(n,e,t,r){return new vh(n,e,t,r)}async function zm(n,e){let t=ie(n);return await t.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next((i=>(s=i,t.qo(e),t.mutationQueue.getAllMutationBatches(r)))).next((i=>{let a=[],u=[],c=oe();for(let l of s){a.push(l.batchId);for(let d of l.mutations)c=c.add(d.key)}for(let l of i){u.push(l.batchId);for(let d of l.mutations)c=c.add(d.key)}return t.localDocuments.getDocuments(r,c).next((l=>({$o:l,removedBatchIds:a,addedBatchIds:u})))}))}))}function Wm(n){let e=ie(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.V_.getLastRemoteSnapshotVersion(t)))}function aT(n,e){let t=ie(n),r=e.snapshotVersion,s=t.Lo;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{let a=t.ko.newChangeBuffer({trackRemovals:!0});s=t.Lo;let u=[];e.targetChanges.forEach(((d,f)=>{let m=s.get(f);if(!m)return;u.push(t.V_.removeMatchingKeys(i,d.removedDocuments,f).next((()=>t.V_.addMatchingKeys(i,d.addedDocuments,f))));let v=m.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(f)!==null?v=v.withResumeToken(Ne.EMPTY_BYTE_STRING,te.min()).withLastLimboFreeSnapshotVersion(te.min()):d.resumeToken.approximateByteSize()>0&&(v=v.withResumeToken(d.resumeToken,r)),s=s.insert(f,v),(function(V,H,z){return V.resumeToken.approximateByteSize()===0||H.snapshotVersion.toMicroseconds()-V.snapshotVersion.toMicroseconds()>=sT?!0:z.addedDocuments.size+z.modifiedDocuments.size+z.removedDocuments.size>0})(m,v,d)&&u.push(t.V_.updateTargetData(i,v))}));let c=ft(),l=oe();if(e.documentUpdates.forEach((d=>{e.resolvedLimboDocuments.has(d)&&u.push(t.persistence.referenceDelegate.updateLimboDocument(i,d))})),u.push(oT(i,a,e.documentUpdates).next((d=>{c=d.Ko,l=d.Qo}))),!r.isEqual(te.min())){let d=t.V_.getLastRemoteSnapshotVersion(i).next((f=>t.V_.setTargetsMetadata(i,i.currentSequenceNumber,r)));u.push(d)}return k.waitFor(u).next((()=>a.apply(i))).next((()=>t.localDocuments.getLocalViewOfDocuments(i,c,l))).next((()=>c))})).then((i=>(t.Lo=s,i)))}function oT(n,e,t){let r=oe(),s=oe();return t.forEach((i=>r=r.add(i))),e.getEntries(n,r).next((i=>{let a=ft();return t.forEach(((u,c)=>{let l=i.get(u);c.isFoundDocument()!==l.isFoundDocument()&&(s=s.add(u)),c.isNoDocument()&&c.version.isEqual(te.min())?(e.removeEntry(u,c.readTime),a=a.insert(u,c)):!l.isValidDocument()||c.version.compareTo(l.version)>0||c.version.compareTo(l.version)===0&&l.hasPendingWrites?(e.addEntry(c),a=a.insert(u,c)):j(ud,"Ignoring outdated watch update for ",u,". Current version:",l.version," Watch version:",c.version)})),{Ko:a,Qo:s}}))}function uT(n,e){let t=ie(n);return t.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return t.V_.getTargetData(r,e).next((i=>i?(s=i,k.resolve(s)):t.V_.allocateTargetId(r).next((a=>(s=new Es(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.V_.addTargetData(r,s).next((()=>s)))))))})).then((r=>{let s=t.Lo.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Lo=t.Lo.insert(r.targetId,r),t.Bo.set(e,r.targetId)),r}))}async function bh(n,e,t){let r=ie(n),s=r.Lo.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,(a=>r.persistence.referenceDelegate.removeTarget(a,s)))}catch(a){if(!Is(a))throw a;j(ud,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Lo=r.Lo.remove(e),r.Bo.delete(s.target)}function fg(n,e,t){let r=ie(n),s=te.min(),i=oe();return r.persistence.runTransaction("Execute query","readwrite",(a=>(function(c,l,d){let f=ie(c),m=f.Bo.get(d);return m!==void 0?k.resolve(f.Lo.get(m)):f.V_.getTargetData(l,d)})(r,a,ke(e)?e:Gt(e)).next((u=>{if(u)return s=u.lastLimboFreeSnapshotVersion,r.V_.getMatchingKeysForTargetId(a,u.targetId).next((c=>{i=c}))})).next((()=>r.No.getDocumentsMatchingQuery(a,e,t?s:te.min(),t?i:oe()))).next((u=>(cT(r,u),{documents:u,Wo:i})))))}function cT(n,e){e.forEach(((t,r)=>{let s=r.key.getCollectionGroup(),i=n.Uo.get(s)||te.min();r.readTime.compareTo(i)>0&&n.Uo.set(s,r.readTime)}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Sh=class{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.Yo=0,this.Zo=null,this.Xo=!0}ea(){this.Yo===0&&(this.ta("Unknown"),this.Zo=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.Zo=null,this.na("Backend didn't respond within 10 seconds."),this.ta("Offline"),Promise.resolve()))))}ra(e){this.state==="Online"?this.ta("Unknown"):(this.Yo++,this.Yo>=1&&(this.ia(),this.na(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ta("Offline")))}set(e){this.ia(),this.Yo=0,e==="Online"&&(this.Xo=!1),this.ta(e)}ta(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}na(e){let t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.Xo?(sn(t),this.Xo=!1):j("OnlineStateTracker",t)}ia(){this.Zo!==null&&(this.Zo.cancel(),this.Zo=null)}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var hn="RemoteStore",Rh=class{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.sa=[],this._a=new Map,this.oa=new Map,this.aa=new Map,this.ua=new Ar(1e3),this.ca=new Ar(1001),this.la=new Set,this.Ea=[],this.ha=i,this.ha.Qe((a=>{r.enqueueAndForget((async()=>{na(this)&&(j(hn,"Restarting streams for network reachability change."),await(async function(c){let l=ie(c);l.la.add(4),await ta(l),l.Ta.set("Unknown"),l.la.delete(4),await Du(l)})(this))}))})),this.Ta=new Sh(r,s)}};async function Du(n){if(na(n))for(let e of n.Ea)await e(!0)}async function ta(n){for(let e of n.Ea)await e(!1)}function Ph(n,e){return n.oa.get(e)||void 0}function Qm(n,e){let t=ie(n),r=Ph(t,e.targetId);if(r!==void 0&&t._a.has(r))return;let s=(function(u,c){let l=Ph(u,c);l!==void 0&&u.aa.delete(l);let d=(function(m,v){return v%2!=0?m.ca.next():m.ua.next()})(u,c);return u.oa.set(c,d),u.aa.set(d,c),d})(t,e.targetId);j(hn,"remoteStoreListen mapping SDK target ID to remote",e.targetId,s);let i=new Es(e.target,s,e.purpose,e.sequenceNumber,e.snapshotVersion,e.lastLimboFreeSnapshotVersion,e.resumeToken);t._a.set(s,i),hd(t)?Bd(t):Ts(t).Yt()&&ld(t,i)}function cd(n,e){let t=ie(n),r=Ts(t),s=Ph(t,e);j(hn,"remoteStoreUnlisten removing mapping of SDK target ID to remote",e,s),t._a.delete(s),t.oa.delete(e),t.aa.delete(s),r.Yt()&&$m(t,s),t._a.size===0&&(r.Yt()?r.en():na(t)&&t.Ta.set("Unknown"))}function ld(n,e){if(n.Pa.J(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(te.min())>0){let t=n.aa.get(e.targetId);if(t===void 0)return void j(hn,"SDK target ID not found for remote ID: "+e.targetId);let r=n.remoteSyncer.getRemoteKeysForTarget(t).size;e=e.withExpectedCount(r)}Ts(n).Pn(e)}function $m(n,e){n.Pa.J(e),Ts(n).In(e)}function Bd(n){n.Pa=new wl({getRemoteKeysForTarget:e=>{let t=n.aa.get(e);return t!==void 0?n.remoteSyncer.getRemoteKeysForTarget(t):oe()},ye:e=>n._a.get(e)||null,Ve:()=>n.datastore.serializer.databaseId}),Ts(n).start(),n.Ta.ea()}function hd(n){return na(n)&&!Ts(n).Jt()&&n._a.size>0}function na(n){return ie(n).la.size===0}function Ym(n){n.Pa=void 0}async function lT(n){n.Ta.set("Online")}async function BT(n){n._a.forEach(((e,t)=>{ld(n,e)}))}async function hT(n,e){Ym(n),hd(n)?(n.Ta.ra(e),Bd(n)):n.Ta.set("Unknown")}async function dT(n,e,t){if(n.Ta.set("Online"),e instanceof No&&e.state===2&&e.cause)try{await(async function(s,i){let a=i.cause;for(let u of i.targetIds){if(s._a.has(u)){let c=s.aa.get(u);c!==void 0&&(await s.remoteSyncer.rejectListen(c,a),s.oa.delete(c),s.aa.delete(u)),s._a.delete(u)}s.Pa.removeTarget(u)}})(n,e)}catch(r){j(hn,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await pg(n,r)}else if(e instanceof Yr?n.Pa._e(e):e instanceof Po?n.Pa.he(e):n.Pa.ue(e),!t.isEqual(te.min()))try{let r=await Wm(n.localStore);t.compareTo(r)>=0&&await(function(i,a){let u=i.Pa.fe(a);u.targetChanges.forEach(((l,d)=>{if(l.resumeToken.approximateByteSize()>0){let f=i._a.get(d);f&&i._a.set(d,f.withResumeToken(l.resumeToken,a))}})),u.targetMismatches.forEach(((l,d)=>{let f=i._a.get(l);if(!f)return;i._a.set(l,f.withResumeToken(Ne.EMPTY_BYTE_STRING,f.snapshotVersion)),$m(i,l);let m=new Es(f.target,l,d,f.sequenceNumber);ld(i,m)}));let c=(function(d,f){let m=new Map;f.targetChanges.forEach(((R,V)=>{let H=d.aa.get(V);H!==void 0&&m.set(H,R)}));let v=new Te(se);return f.targetMismatches.forEach(((R,V)=>{let H=d.aa.get(R);H!==void 0&&(v=v.insert(H,V))})),new bi(f.snapshotVersion,m,v,f.documentUpdates,f.augmentedDocumentUpdates,f.resolvedLimboDocuments)})(i,u);return i.remoteSyncer.applyRemoteEvent(c)})(n,t)}catch(r){j(hn,"Failed to raise snapshot:",r),await pg(n,r)}}async function pg(n,e,t){if(!Is(e))throw e;n.la.add(1),await ta(n),n.Ta.set("Offline"),t||(t=()=>Wm(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{j(hn,"Retrying IndexedDB access"),await t(),n.la.delete(1),await Du(n)}))}async function Cg(n,e){let t=ie(n);t.asyncQueue.verifyOperationInProgress(),j(hn,"RemoteStore received new credentials");let r=na(t);t.la.add(3),await ta(t),r&&t.Ta.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.la.delete(3),await Du(t)}async function fT(n,e){let t=ie(n);e?(t.la.delete(2),await Du(t)):e||(t.la.add(2),await ta(t),t.Ta.set("Unknown"))}function Ts(n){return n.Ia||(n.Ia=(function(t,r,s){let i=ie(t);return i.pn(),new Ll(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{ct:lT.bind(null,n),Et:BT.bind(null,n),Tt:hT.bind(null,n),Tn:dT.bind(null,n)}),n.Ea.push((async e=>{e?(n.Ia.Xt(),hd(n)?Bd(n):n.Ta.set("Unknown")):(await n.Ia.stop(),Ym(n))}))),n.Ia}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Nh=class{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Aa(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Aa(this.observer.error,e):sn("Uncaught Error in snapshot listener:",e.toString()))}Va(){this.muted=!0}Aa(e,t){setTimeout((()=>{this.muted||e(t)}),0)}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Oh=class n{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Ht,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){let a=Date.now()+r,u=new n(e,t,a,s,i);return u.start(r),u}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new K(x.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}};function Xm(n,e){if(sn("AsyncQueue",`${e}: ${n}`),Is(n))return new K(x.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var iu=class{constructor(){this.activeTargetIds=Qw()}Ba(e){this.activeTargetIds=this.activeTargetIds.add(e)}Ua(e){this.activeTargetIds=this.activeTargetIds.delete(e)}La(){let e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}};var Fh=class{constructor(){this.fu=new iu,this.mu={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.fu.Ba(e),this.mu[e]||"not-current"}updateQueryState(e,t,r){this.mu[e]=t}removeLocalQueryTarget(e){this.fu.Ua(e)}isLocalQueryTarget(e){return this.fu.activeTargetIds.has(e)}clearQueryState(e){delete this.mu[e]}getAllActiveQueryTargets(){return this.fu.activeTargetIds}isActiveQueryTarget(e){return this.fu.activeTargetIds.has(e)}start(){return this.fu=new iu,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function il(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ji=class n{static emptySet(e){return new n(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||Z.comparator(t.key,r.key):(t,r)=>Z.comparator(t.key,r.key),this.keyedMap=Kr(),this.sortedSet=new Te(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){let t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,r)=>(e(t),!1)))}add(e){let t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){let t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){let s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){let e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){let r=new n;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var au=class{constructor(){this.pu=new Te(Z.comparator)}track(e){let t=e.doc.key,r=this.pu.get(t);r?e.type!==0&&r.type===3?this.pu=this.pu.insert(t,e):e.type===3&&r.type!==1?this.pu=this.pu.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.pu=this.pu.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.pu=this.pu.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.pu=this.pu.remove(t):e.type===1&&r.type===2?this.pu=this.pu.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.pu=this.pu.insert(t,{type:2,doc:e.doc}):Q(63341,{we:e,gu:r}):this.pu=this.pu.insert(t,e)}yu(){let e=[];return this.pu.inorderTraversal(((t,r)=>{e.push(r)})),e}},_s=class n{constructor(e,t,r,s,i,a,u,c,l){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=u,this.excludesMetadataChanges=c,this.hasCachedResults=l}static fromInitialDocuments(e,t,r,s,i){let a=[];return t.forEach((u=>{a.push({type:0,doc:u})})),new n(e,t,Ji.emptySet(t),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Eu(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;let t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Lh=class{constructor(){this.wu=void 0,this.bu=[]}Su(){return this.bu.some((e=>e.vu()))}},xh=class{constructor(){this.queries=gg(),this.onlineState="Unknown",this.Du=new Set}terminate(){(function(t,r){let s=ie(t),i=s.queries;s.queries=gg(),i.forEach(((a,u)=>{for(let c of u.bu)c.onError(r)}))})(this,new K(x.ABORTED,"Firestore shutting down"))}};function gg(){return new cn((n=>Sm(n)),Eu)}async function pT(n,e){let t=ie(n),r=3,s=e.query,i=t.queries.get(s);i?!i.Su()&&e.vu()&&(r=2):(i=new Lh,r=e.vu()?0:1);try{switch(r){case 0:i.wu=await t.onListen(s,!0);break;case 1:i.wu=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){let u=Xm(a,`Initialization of query '${ke(e.query)?nn(e.query):mi(e.query)}' failed`);return void e.onError(u)}t.queries.set(s,i),i.bu.push(e),e.xu(t.onlineState),i.wu&&e.Cu(i.wu)&&dd(t)}async function CT(n,e){let t=ie(n),r=e.query,s=3,i=t.queries.get(r);if(i){let a=i.bu.indexOf(e);a>=0&&(i.bu.splice(a,1),i.bu.length===0?s=e.vu()?0:1:!i.Su()&&e.vu()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function gT(n,e){let t=ie(n),r=!1;for(let s of e){let i=s.query,a=t.queries.get(i);if(a){for(let u of a.bu)u.Cu(s)&&(r=!0);a.wu=s}}r&&dd(t)}function mT(n,e,t){let r=ie(n),s=r.queries.get(e);if(s)for(let i of s.bu)i.onError(t);r.queries.delete(e)}function dd(n){n.Du.forEach((e=>{e.next()}))}var kh;(function(n){n.Default="default",n.Cache="cache"})(kh||(kh={}));var Vh=class{constructor(e,t,r){this.query=e,this.Fu=t,this.Ou=!1,this.Mu=null,this.onlineState="Unknown",this.options=r||{}}Cu(e){if(!this.options.includeMetadataChanges){let r=[];for(let s of e.docChanges)s.type!==3&&r.push(s);e=new _s(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Ou?this.Nu(e)&&(this.Fu.next(e),t=!0):this.Lu(e,this.onlineState)&&(this.Bu(e),t=!0),this.Mu=e,t}onError(e){this.Fu.error(e)}xu(e){this.onlineState=e;let t=!1;return this.Mu&&!this.Ou&&this.Lu(this.Mu,e)&&(this.Bu(this.Mu),t=!0),t}Lu(e,t){if(!e.fromCache||!this.vu())return!0;let r=t!=="Offline";return(!this.options.waitForSyncWhenOnline||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Nu(e){if(e.docChanges.length>0)return!0;let t=this.Mu&&this.Mu.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}Bu(e){e=_s.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Ou=!0,this.Fu.next(e)}vu(){return this.options.source!==kh.Cache}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ou=class{constructor(e){this.key=e}},uu=class{constructor(e){this.key=e}},Mh=class{constructor(e,t){this.query=e,this.zu=t,this.ju=null,this.hasCachedResults=!1,this.current=!1,this.Hu=oe(),this.mutatedKeys=oe(),this.Ju=ke(e)?Bh(e):Xh(e),this.Yu=new Ji(this.Ju)}get Zu(){return this.zu}Xu(e,t){let r=t?t.ec:new au,s=t?t.Yu:this.Yu,i=t?t.mutatedKeys:this.mutatedKeys,a=s,u=!1,[c,l]=this.tc(this.query,s);e.inorderTraversal(((f,m)=>{let v=s.get(f),R=tT(this.query,m)?m:null,V=!!v&&this.mutatedKeys.has(v.key),H=!!R&&(R.hasLocalMutations||this.mutatedKeys.has(R.key)&&R.hasCommittedMutations),z=!1;v&&R?v.data.isEqual(R.data)?V!==H&&(r.track({type:3,doc:R}),z=!0):this.nc(v,R)||(r.track({type:2,doc:R}),z=!0,(c&&this.Ju(R,c)>0||l&&this.Ju(R,l)<0)&&(u=!0)):!v&&R?(r.track({type:0,doc:R}),z=!0):v&&!R&&(r.track({type:1,doc:v}),z=!0,(c||l)&&(u=!0)),z&&(R?(a=a.add(R),i=H?i.add(f):i.delete(f)):(a=a.delete(f),i=i.delete(f)))}));let d=this.rc(this.query);if(d)if(ke(this.query)){let f=[];a.forEach((R=>f.push(R)));let m=Jm(this.query,f),v=new Ji(Bh(this.query));for(let R of m)v=v.add(R);a.forEach((R=>{v.has(R.key)||(i=i.delete(R.key),r.track({type:1,doc:R}))})),a=v}else{let f=this.sc(this.query);for(;a.size>d;){let m=f==="F"?a.last():a.first();a=a.delete(m.key),i=i.delete(m.key),r.track({type:1,doc:m})}}return{Yu:a,ec:r,Oo:u,mutatedKeys:i}}rc(e){return ke(e)?sl(e)?.limit:e.limit||void 0}sc(e){if(ke(e)){let t=sl(e);return t&&t.limit<0?"L":"F"}return e.limitType}tc(e,t){if(ke(e)){let r=sl(e)?.limit;return[t.size===r?t.last():null,null]}return[e.limitType==="F"&&t.size===this.rc(this.query)?t.last():null,e.limitType==="L"&&t.size===this.rc(this.query)?t.first():null]}nc(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){let i=this.Yu;this.Yu=e.Yu,this.mutatedKeys=e.mutatedKeys;let a=e.ec.yu();a.sort(((d,f)=>(function(v,R){let V=H=>{switch(H){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return Q(20277,{we:H})}};return V(v)-V(R)})(d.type,f.type)||this.Ju(d.doc,f.doc))),this._c(r),s=s??!1;let u=t&&!s?this.oc():[],c=this.Hu.size===0&&this.current&&!s?1:0,l=c!==this.ju;return this.ju=c,a.length!==0||l?{snapshot:new _s(this.query,e.Yu,i,a,e.mutatedKeys,c===0,l,!1,!!r&&r.resumeToken.approximateByteSize()>0),ac:u}:{ac:u}}xu(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Yu:this.Yu,ec:new au,mutatedKeys:this.mutatedKeys,Oo:!1},!1)):{ac:[]}}uc(e){return!this.zu.has(e)&&!!this.Yu.has(e)&&!this.Yu.get(e).hasLocalMutations}_c(e){e&&(e.addedDocuments.forEach((t=>this.zu=this.zu.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.zu=this.zu.delete(t))),this.current=e.current)}oc(){if(!this.current)return[];let e=this.Hu;this.Hu=oe(),this.Yu.forEach((r=>{this.uc(r.key)&&(this.Hu=this.Hu.add(r.key))}));let t=[];return e.forEach((r=>{this.Hu.has(r)||t.push(new uu(r))})),this.Hu.forEach((r=>{e.has(r)||t.push(new ou(r))})),t}cc(e){this.zu=e.Wo,this.Hu=oe();let t=this.Xu(e.documents);return this.applyChanges(t,!0)}lc(){return _s.fromInitialDocuments(this.query,this.Yu,this.mutatedKeys,this.ju===0,this.hasCachedResults)}},fd="SyncEngine",Gh=class{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}},Uh=class{constructor(e){this.key=e,this.Ec=!1}},Hh=class{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.hc={},this.Tc=new cn((u=>Sm(u)),Eu),this.Pc=new Map,this.Ic=new Set,this.Rc=new Te(Z.comparator),this.Ac=new Map,this.Vc=new Ki,this.dc={},this.fc=new Map,this.mc=Ar.bs(),this.onlineState="Unknown",this.gc=void 0}get isPrimaryClient(){return this.gc===!0}};async function ET(n,e,t=!0){let r=rE(n),s,i=r.Tc.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lc()):s=await Zm(r,e,t,!0),s}async function _T(n,e){let t=rE(n);await Zm(t,e,!0,!1)}async function Zm(n,e,t,r){let s=await uT(n.localStore,ke(e)?e:Gt(e)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t),u;return r&&(u=await DT(n,e,i,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&Qm(n.remoteStore,s),u}async function DT(n,e,t,r,s){n.yc=(f,m,v)=>(async function(V,H,z,Be){let Ae=H.view.Xu(z);Ae.Oo&&(Ae=await fg(V.localStore,H.query,!1).then((({documents:I})=>H.view.Xu(I,Ae))));let ve=Be&&Be.targetChanges.get(H.targetId),ut=Be&&Be.targetMismatches.get(H.targetId)!=null,ye=H.view.applyChanges(Ae,V.isPrimaryClient,ve,ut);return Eg(V,H.targetId,ye.ac),ye.snapshot})(n,f,m,v);let i=await fg(n.localStore,e,!0),a=new Mh(e,i.Wo),u=a.Xu(i.documents),c=Si.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),l=a.applyChanges(u,n.isPrimaryClient,c);Eg(n,t,l.ac);let d=new Gh(e,t,a);return n.Tc.set(e,d),n.Pc.has(t)?n.Pc.get(t).push(e):n.Pc.set(t,[e]),l.snapshot}async function yT(n,e,t){let r=ie(n),s=r.Tc.get(e),i=r.Pc.get(s.targetId);if(i.length>1)return r.Pc.set(s.targetId,i.filter((a=>!Eu(a,e)))),void r.Tc.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await bh(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),t&&cd(r.remoteStore,s.targetId),qh(r,s.targetId)})).catch(gu)):(qh(r,s.targetId),await bh(r.localStore,s.targetId,!0))}async function wT(n,e){let t=ie(n),r=t.Tc.get(e),s=t.Pc.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),cd(t.remoteStore,r.targetId))}async function eE(n,e){let t=ie(n);try{let r=await aT(t.localStore,e);e.targetChanges.forEach(((s,i)=>{let a=t.Ac.get(i);a&&(Y(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.Ec=!0:s.modifiedDocuments.size>0?Y(a.Ec,14607):s.removedDocuments.size>0&&(Y(a.Ec,42227),a.Ec=!1))})),await nE(t,r,e)}catch(r){await gu(r)}}function mg(n,e,t){let r=ie(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){let s=[];r.Tc.forEach(((i,a)=>{let u=a.view.xu(e);u.snapshot&&s.push(u.snapshot)})),(function(a,u){let c=ie(a);c.onlineState=u;let l=!1;c.queries.forEach(((d,f)=>{for(let m of f.bu)m.xu(u)&&(l=!0)})),l&&dd(c)})(r.eventManager,e),s.length&&r.hc.Tn(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function IT(n,e,t){let r=ie(n);r.sharedClientState.updateQueryState(e,"rejected",t);let s=r.Ac.get(e),i=s&&s.key;if(i){let a=new Te(Z.comparator);a=a.insert(i,gt.newNoDocument(i,te.min()));let u=oe().add(i),c=new bi(te.min(),new Map,new Te(se),a,ft(),u);await eE(r,c),r.Rc=r.Rc.remove(i),r.Ac.delete(e),pd(r)}else await bh(r.localStore,e,!1).then((()=>qh(r,e,t))).catch(gu)}function qh(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(let r of n.Pc.get(e))n.Tc.delete(r),t&&n.hc.wc(r,t);n.Pc.delete(e),n.isPrimaryClient&&n.Vc.e_(e).forEach((r=>{n.Vc.containsKey(r)||tE(n,r)}))}function tE(n,e){n.Ic.delete(e.path.canonicalString());let t=n.Rc.get(e);t!==null&&(cd(n.remoteStore,t),n.Rc=n.Rc.remove(e),n.Ac.delete(t),pd(n))}function Eg(n,e,t){for(let r of t)r instanceof ou?(n.Vc.addReference(r.key,e),TT(n,r)):r instanceof uu?(j(fd,"Document no longer in limbo: "+r.key),n.Vc.removeReference(r.key,e),n.Vc.containsKey(r.key)||tE(n,r.key)):Q(19791,{bc:r})}function TT(n,e){let t=e.key,r=t.path.canonicalString();n.Rc.get(t)||n.Ic.has(r)||(j(fd,"New document in limbo: "+t),n.Ic.add(r),pd(n))}function pd(n){for(;n.Ic.size>0&&n.Rc.size<n.maxConcurrentLimboResolutions;){let e=n.Ic.values().next().value;n.Ic.delete(e);let t=new Z(he.fromString(e)),r=n.mc.next();n.Ac.set(r,new Uh(t)),n.Rc=n.Rc.insert(t,r),Qm(n.remoteStore,new Es(Gt(fu(t.path)),r,"TargetPurposeLimboResolution",ds.wn))}}async function nE(n,e,t){let r=ie(n),s=[],i=[],a=[];r.Tc.isEmpty()||(r.Tc.forEach(((u,c)=>{a.push(r.yc(c,e,t).then((l=>{if((l||t)&&r.isPrimaryClient){let d=l?!l.fromCache:t?.targetChanges.get(c.targetId)?.current;r.sharedClientState.updateQueryState(c.targetId,d?"current":"not-current")}if(l){s.push(l);let d=Ih.mo(c.targetId,l);i.push(d)}})))})),await Promise.all(a),r.hc.Tn(s),await(async function(c,l){let d=ie(c);try{await d.persistence.runTransaction("notifyLocalViewChanges","readwrite",(f=>k.forEach(l,(m=>k.forEach(m.Vo,(v=>d.persistence.referenceDelegate.addReference(f,m.targetId,v))).next((()=>k.forEach(m.fo,(v=>d.persistence.referenceDelegate.removeReference(f,m.targetId,v)))))))))}catch(f){if(!Is(f))throw f;j(ud,"Failed to update sequence numbers: "+f)}for(let f of l){let m=f.targetId;if(!f.fromCache){let v=d.Lo.get(m),R=v.snapshotVersion,V=v.withLastLimboFreeSnapshotVersion(R);d.Lo=d.Lo.insert(m,V)}}})(r.localStore,i))}async function AT(n,e){let t=ie(n);if(!t.currentUser.isEqual(e)){j(fd,"User change. New user:",e.toKey());let r=await zm(t.localStore,e);t.currentUser=e,(function(i,a){i.fc.forEach((u=>{u.forEach((c=>{c.reject(new K(x.CANCELLED,a))}))})),i.fc.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await nE(t,r.$o)}}function vT(n,e){let t=ie(n),r=t.Ac.get(e);if(r&&r.Ec)return oe().add(r.key);{let s=oe(),i=t.Pc.get(e);if(!i)return s;for(let a of i??[]){let u=t.Tc.get(a);s=s.unionWith(u.view.Zu)}return s}}function rE(n){let e=ie(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=eE.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=vT.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=IT.bind(null,e),e.hc.Tn=gT.bind(null,e.eventManager),e.hc.wc=mT.bind(null,e.eventManager),e}var vr=class{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Cu(e.databaseInfo.databaseId),this.sharedClientState=this.vc(e),this.persistence=this.Dc(e),await this.persistence.start(),this.localStore=this.xc(e),this.gcScheduler=this.Cc(e,this.localStore),this.indexBackfillerScheduler=this.Fc(e,this.localStore)}Cc(e,t){return null}Fc(e,t){return null}xc(e){return iT(this.persistence,new Ah,e.initialUser,this.serializer)}Dc(e){return new ru(wh.b_,this.serializer)}vc(e){return new Fh}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}};vr.provider={build:()=>new vr};var cu=class extends vr{constructor(e){super(),this.cacheSizeBytes=e}Cc(e,t){Y(this.persistence.referenceDelegate instanceof su,46915);let r=this.persistence.referenceDelegate.garbageCollector;return new Gl(r,e.asyncQueue,t)}Dc(e){let t=this.cacheSizeBytes!==void 0?Dt.withCacheSize(this.cacheSizeBytes):Dt.DEFAULT;return new ru((r=>su.b_(r,t)),this.serializer)}};var Ds=class{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>mg(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=AT.bind(null,this.syncEngine),await fT(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new xh})()}createDatastore(e){let t=Cu(e.databaseInfo.databaseId),r=CI(e.databaseInfo);return gI(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return(function(r,s,i,a,u){return new Rh(r,s,i,a,u)})(this.localStore,this.datastore,e.asyncQueue,(t=>mg(this.syncEngine,t,0)),(function(){return Mo.Ye()?new Mo:new Rl})())}createSyncEngine(e,t){return(function(s,i,a,u,c,l,d){let f=new Hh(s,i,a,u,c,l);return d&&(f.gc=!0),f})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await(async function(t){let r=ie(t);j(hn,"RemoteStore shutting down."),r.la.add(5),await ta(r),r.ha.shutdown(),r.Ta.set("Unknown")})(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}};Ds.provider={build:()=>new Ds};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var jh=class{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new K(x.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;let t=await(async function(s,i){let a=ie(s),u={documents:i.map((f=>Ri(a.serializer,f)))},c=await a._t("BatchGetDocuments",a.serializer.databaseId,he.emptyPath(),u,i.length),l=new Map;c.forEach((f=>{let m=rI(a.serializer,f);l.set(m.key.toString(),m)}));let d=[];return i.forEach((f=>{let m=l.get(f.toString());Y(!!m,55234,{key:f}),d.push(m)})),d})(this.datastore,e);return t.forEach((r=>this.recordVersion(r))),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(e.toString())}delete(e){this.write(new Bs(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;let e=this.readVersions;this.mutations.forEach((t=>{e.delete(t.key.toString())})),e.forEach(((t,r)=>{let s=Z.fromPath(r);this.mutations.push(new vo(s,this.precondition(s)))})),await(async function(r,s){let i=ie(r),a={writes:s.map((u=>iI(i.serializer,u)))};await i.nt("Commit",i.serializer.databaseId,he.emptyPath(),a)})(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw Q(50498,{Mc:e.constructor.name});t=te.min()}let r=this.readVersions.get(e.key.toString());if(r){if(!t.isEqual(r))throw new K(x.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){let t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(te.min())?St.exists(!1):St.updateTime(t):St.none()}preconditionForUpdate(e){let t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(te.min()))throw new K(x.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return St.updateTime(t)}return St.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Kh=class{constructor(e,t,r,s,i){this.asyncQueue=e,this.datastore=t,this.options=r,this.updateFunction=s,this.deferred=i,this.Nc=r.maxAttempts,this.Ht=new Ni(this.asyncQueue,"transaction_retry")}Lc(){this.Nc-=1,this.Bc()}Bc(){this.Ht.kt((async()=>{let e=new jh(this.datastore),t=this.Uc(e);t&&t.then((r=>{this.asyncQueue.enqueueAndForget((()=>e.commit().then((()=>{this.deferred.resolve(r)})).catch((s=>{this.kc(s)}))))})).catch((r=>{this.kc(r)}))}))}Uc(e){try{let t=this.updateFunction(e);return!ea(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}kc(e){this.Nc>0&&this.qc(e)?(this.Nc-=1,this.asyncQueue.enqueueAndForget((()=>(this.Bc(),Promise.resolve())))):this.deferred.reject(e)}qc(e){if(e?.name==="FirebaseError"){let t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!jw(t)}return!1}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Mn="FirestoreClient",Jh=class{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this._databaseInfo=s,this.user=Ue.UNAUTHENTICATED,this.clientId=Zr.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,(async a=>{j(Mn,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a})),this.appCheckCredentials.start(r,(a=>(j(Mn,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();let e=new Ht;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){let r=Xm(t,"Failed to shutdown persistence");e.reject(r)}})),e.promise}};async function al(n,e){n.asyncQueue.verifyOperationInProgress(),j(Mn,"Initializing OfflineComponentProvider");let t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await zm(e.localStore,s),r=s)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function _g(n,e){n.asyncQueue.verifyOperationInProgress();let t=await bT(n);j(Mn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((r=>Cg(e.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>Cg(e.remoteStore,s))),n._onlineComponents=e}async function bT(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){j(Mn,"Using user provided OfflineComponentProvider");try{await al(n,n._uninitializedComponentsProvider._offline)}catch(e){let t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===x.FAILED_PRECONDITION||s.code===x.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;yt("Error using user provided cache. Falling back to memory cache: "+t),await al(n,new vr)}}else j(Mn,"Using default OfflineComponentProvider"),await al(n,new cu(void 0));return n._offlineComponents}async function sE(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(j(Mn,"Using user provided OnlineComponentProvider"),await _g(n,n._uninitializedComponentsProvider._online)):(j(Mn,"Using default OnlineComponentProvider"),await _g(n,new Ds))),n._onlineComponents}function ST(n){return sE(n).then((e=>e.datastore))}async function RT(n){let e=await sE(n),t=e.eventManager;return t.onListen=ET.bind(null,e.syncEngine),t.onUnlisten=yT.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=_T.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=wT.bind(null,e.syncEngine),t}function iE(n,e,t={}){let r=new Ht;return n.asyncQueue.enqueueAndForget((async()=>(function(i,a,u,c,l){let d=new Nh({next:m=>{d.Va(),a.enqueueAndForget((()=>CT(i,f)));let v=m.docs.has(u);!v&&m.fromCache?l.reject(new K(x.UNAVAILABLE,"Failed to get document because the client is offline.")):v&&m.fromCache&&c&&c.source==="server"?l.reject(new K(x.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):l.resolve(m)},error:m=>l.reject(m)}),f=new Vh(fu(u.path),d,{includeMetadataChanges:!0,waitForSyncWhenOnline:!0});return pT(i,f)})(await RT(n),n.asyncQueue,e,t,r))),r.promise}function aE(n,e,t){let r=new Ht;return n.asyncQueue.enqueueAndForget((async()=>{let s=await ST(n);new Kh(n.asyncQueue,s,t,e,r).Lc()})),r.promise}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ra=class{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new qe(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){let e=new PT(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){return this._document?.data.clone().value.mapValue.fields??void 0}get(e){if(this._document){let t=this._document.data.field(yr("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}},PT=class extends ra{data(){return super.data()}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var zi=class{convertValue(e,t="none"){switch(Oe(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Ee(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(on(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw Q(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){let r={};return br(e,((s,i)=>{r[s]=this.convertValue(i,t)})),r}convertVectorValue(e){let t=e.fields?.[lr].arrayValue?.values?.map((r=>Ee(r.doubleValue)));return new Ct(t)}convertGeoPoint(e){return new tn(Ee(e.latitude),Ee(e.longitude))}convertArray(e,t){return(e.values||[]).map((r=>this.convertValue(r,t)))}convertServerTimestamp(e,t){switch(t){case"previous":let r=Zi(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(ns(e));default:return null}}convertTimestamp(e){let t=an(e);return new Ie(t.seconds,t.nanos)}convertDocumentKey(e,t){let r=he.fromString(e);Y(sm(r),9688,{name:e});let s=new wi(r.get(1),r.get(3)),i=new Z(r.popFirst(5));return s.isEqual(t)||sn(`A document reference to ${i} refers to a different database (${s.projectId}/${s.database}), which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oE(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}var lu=class extends zi{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ut(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new qe(this.firestore,null,t)}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Dg="AsyncQueue",Bu=class{constructor(e=Promise.resolve()){this.$c=[],this.Kc=!1,this.Qc=[],this.Wc=null,this.Gc=!1,this.zc=!1,this.jc=[],this.Ht=new Ni(this,"async_queue_retry"),this.Hc=()=>{let r=il();r&&j(Dg,"Visibility state changed to "+r.visibilityState),this.Ht.$t()},this.Jc=e;let t=il();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Hc)}get isShuttingDown(){return this.Kc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Yc(),this.Zc(e)}enterRestrictedMode(e){if(!this.Kc){this.Kc=!0,this.zc=e||!1;let t=il();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Hc)}}enqueue(e){if(this.Yc(),this.Kc)return new Promise((()=>{}));let t=new Ht;return this.Zc((()=>this.Kc&&this.zc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.$c.push(e),this.Xc())))}async Xc(){if(this.$c.length!==0){try{await this.$c[0](),this.$c.shift(),this.Ht.reset()}catch(e){if(!Is(e))throw e;j(Dg,"Operation failed with retryable error: "+e)}this.$c.length>0&&this.Ht.kt((()=>this.Xc()))}}Zc(e){let t=this.Jc.then((()=>(this.Gc=!0,e().catch((r=>{throw this.Wc=r,this.Gc=!1,sn("INTERNAL UNHANDLED ERROR: ",yg(r)),r})).then((r=>(this.Gc=!1,r))))));return this.Jc=t,t}enqueueAfterDelay(e,t,r){this.Yc(),this.jc.indexOf(e)>-1&&(t=0);let s=Oh.createAndSchedule(this,e,t,r,(i=>this.el(i)));return this.Qc.push(s),s}Yc(){this.Wc&&Q(47125,{tl:yg(this.Wc)})}verifyOperationInProgress(){}async nl(){let e;do e=this.Jc,await e;while(e!==this.Jc)}rl(e){for(let t of this.Qc)if(t.timerId===e)return!0;return!1}il(e){return this.nl().then((()=>{this.Qc.sort(((t,r)=>t.targetTimeMs-r.targetTimeMs));for(let t of this.Qc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.nl()}))}sl(e){this.jc.push(e)}el(e){let t=this.Qc.indexOf(e);this.Qc.splice(t,1)}};function yg(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ys=class extends td{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new Bu,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){let e=this._firestoreClient.terminate();this._queue=new Bu(e),this._firestoreClient=void 0,await e}}};function uE(n,e){let t=typeof n=="object"?n:Aa(),r=typeof n=="string"?n:e||To,s=Ks(t,"firestore").getImmediate({identifier:r});if(!s._initialized){let i=Tf("firestore");i&&Bm(s,...i)}return s}function Cd(n){if(n._terminated)throw new K(x.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||NT(n),n._firestoreClient}function NT(n){let e=n._freezeSettings(),t=EI(n._databaseId,n._app?.options.appId||"",n._persistenceKey,n._app?.options.apiKey,e);n._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new Jh(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&(function(s){let i=s?._online.build();return{_offline:s?._offline.build(i),_online:i}})(n._componentsProvider))}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Wi=class extends zi{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ut(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new qe(this.firestore,null,t)}};/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Zt=class{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}},rn=class n extends ra{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){let t=new ur(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){let r=this._document.data.field(yr("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new K(x.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");let e=this._document,t={};return t.type=n._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}};rn._jsonSchemaVersion="firestore/documentSnapshot/1.0",rn._jsonSchema={type:Pe("string",rn._jsonSchemaVersion),bundleSource:Pe("string","DocumentSnapshot"),bundleName:Pe("string"),bundle:Pe("string")};var ur=class extends rn{data(e={}){return super.data(e)}},Xr=class n{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Zt(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){let e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((r=>{e.call(t,new ur(this._firestore,this._userDataWriter,r.key,r,new Zt(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){let t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new K(x.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map((u=>{ke(s._snapshot.query)?Bh(s._snapshot.query):Xh(s.query._query);let c=new ur(s._firestore,s._userDataWriter,u.doc.key,u.doc,new Zt(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);return u.doc,{type:"added",doc:c,oldIndex:-1,newIndex:a++}}))}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((u=>i||u.type!==3)).map((u=>{let c=new ur(s._firestore,s._userDataWriter,u.doc.key,u.doc,new Zt(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter),l=-1,d=-1;return u.type!==0&&(l=a.indexOf(u.doc.key),a=a.delete(u.doc.key)),u.type!==1&&(a=a.add(u.doc),d=a.indexOf(u.doc.key)),{type:OT(u.type),doc:c,oldIndex:l,newIndex:d}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new K(x.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");let e={};e.type=n._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Zr.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;let t=[],r=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}};function OT(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return Q(61501,{type:n})}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Xr._jsonSchemaVersion="firestore/querySnapshot/1.0",Xr._jsonSchema={type:Pe("string",Xr._jsonSchemaVersion),bundleSource:Pe("string","QuerySnapshot"),bundleName:Pe("string"),bundle:Pe("string")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var FT={maxAttempts:5};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sa(n,e){if((n=Le(n)).firestore!==e)throw new K(x.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var LT=class{constructor(e,t){this._firestore=e,this._transaction=t,this._dataReader=fm(e)}get(e){let t=sa(e,this._firestore),r=new lu(this._firestore);return this._transaction.lookup([t._key]).then((s=>{if(!s||s.length!==1)return Q(24041);let i=s[0];if(i.isFoundDocument())return new ra(this._firestore,r,i.key,i,t.converter);if(i.isNoDocument())return new ra(this._firestore,r,t._key,null,t.converter);throw Q(18433,{doc:i})}))}set(e,t,r){let s=sa(e,this._firestore),i=oE(s.converter,t,r),a=pm(this._dataReader,"Transaction.set",s._key,i,s.converter!==null,r);return this._transaction.set(s._key,a),this}update(e,t,r,...s){let i=sa(e,this._firestore),a;return a=typeof(t=Le(t))=="string"||t instanceof Er?gm(this._dataReader,"Transaction.update",i._key,t,r,s):Cm(this._dataReader,"Transaction.update",i._key,t),this._transaction.update(i._key,a),this}delete(e){let t=sa(e,this._firestore);return this._transaction.delete(t._key),this}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var gd=class extends LT{constructor(e,t){super(e,t),this._firestore=e}get(e){let t=sa(e,this._firestore),r=new Wi(this._firestore);return super.get(e).then((s=>new rn(this._firestore,r,t._key,s._document,new Zt(!1,!1),t.converter)))}};function xT(n,e,t){n=$i(n,ys);let r={...FT,...t};(function(a){if(a.maxAttempts<1)throw new K(x.INVALID_ARGUMENT,"Max attempts must be at least 1")})(r);let s=Cd(n);return aE(s,(i=>e(new gd(n,i))),r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kT(n){n=$i(n,qe);let e=$i(n.firestore,ys),t=Cd(e);return iE(t,n._key,{source:"server"}).then((r=>VT(e,n,r)))}function VT(n,e,t){let r=t.docs.get(e._key),s=new Wi(n);return new rn(n,s,e._key,r,new Zt(t.hasPendingWrites,t.fromCache),e.converter)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var cE="@firebase/firestore",lE="4.17.2";(function(e,t=!0){wg(Dn),_n(new mt("firestore",((r,{instanceIdentifier:s,options:i})=>{let a=r.getProvider("app").getImmediate(),u=new ys(new xo(r.getProvider("auth-internal")),new Vo(a,r.getProvider("app-check-internal")),Ng(a,s),a);return i={useFetchStreams:t,...i},u._setSettings(i),u}),"PUBLIC").setMultipleInstances(!0)),Tt(cE,lE,e),Tt(cE,lE,"esm2020")})();export{Mr as GoogleAuthProvider,hm as doc,z_ as getApps,eC as getAuth,kT as getDocFromServer,uE as getFirestore,Wf as initializeApp,Yp as linkWithPopup,xT as runTransaction,ym as serverTimestamp,Gp as signInAnonymously,$p as signInWithPopup};
