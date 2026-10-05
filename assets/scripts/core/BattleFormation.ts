/** Compact formations in the 480-wide battlefield. All coordinates denote feet. */
export const SOLDIER_SIZE=96;
/** Feet higher in the field recede towards the horizon, equally for both factions. */
export function depthScale(y:number):number{return Math.max(.64,1-Math.max(0,y-65)*.0015);}
export function soldierSize(y:number,male=false):number{return SOLDIER_SIZE*depthScale(y)*(male?1.08:1);}
export function allyPosition(index:number){return {x:-85-(index%3)*61,y:65+Math.floor(index/3)*75};}
export function waveSize(stage:number,boss=false):number {
 if(boss)return 1;
 return stage>=400?30:stage>=200?20:stage>=100?15:stage>=60?10:stage>=30?6:stage>=15?4:stage>=5?2:1;
}
export function enemyPosition(index:number,count:number){
 const columns=Math.min(5,count),rows=Math.ceil(count/columns);
 const row=Math.floor(index/columns);
 return {x:count===1?108:42+(index%columns)*36.5+(row%2)*7,y:65+row*41};
}
export function survivingEnemies(count:number,healthRatio:number):number{return Math.max(0,Math.min(count,Math.ceil(count*Math.max(0,Math.min(1,healthRatio)))));}
