import {sys} from 'cc';
import {nativeCall} from './NativeServices';
export class PushNotifications {
 get supported(){return sys.isNative&&sys.os===sys.OS.ANDROID;}
 get choice(){return sys.localStorage.getItem('outrun-push-choice');}
 async set(enabled:boolean,locale:string){const state=this.supported?await nativeCall('pushConfigure',{enabled,locale},30000):{status:'unavailable'};sys.localStorage.setItem('outrun-push-choice',enabled?'on':'off');return state;}
 async status(){return this.supported?nativeCall('pushStatus',{},30000):{status:'unavailable'};}
 async settings(){if(this.supported)await nativeCall('pushSettings',{},30000);}
 async opened(){return this.supported?(await nativeCall('pushOpened',{},30000)).noticeId:'';}
}
