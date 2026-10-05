/** Compact formations in the 480-wide battlefield. All coordinates denote feet. */
export const SOLDIER_SIZE=64;
export function allyPosition(index:number){return {x:-64-(index%3)*72,y:12+Math.floor(index/3)*82};}
export function waveSize(stage:number,boss=false):number {
 if(boss)return 1;
 return stage>=400?30:stage>=200?20:stage>=100?15:stage>=60?10:stage>=30?6:stage>=15?4:stage>=5?2:1;
}
export function enemyPosition(index:number,count:number){
 const columns=Math.min(5,count),rows=Math.ceil(count/columns);
 return {x:count===1?138:48+(index%columns)*37,y:24+Math.floor(index/columns)*47+(6-rows)*9};
}
export function survivingEnemies(count:number,healthRatio:number):number{return Math.max(0,Math.min(count,Math.ceil(count*Math.max(0,Math.min(1,healthRatio)))));}
