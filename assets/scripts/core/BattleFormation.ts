/** Compact formations in the 480-wide battlefield. All coordinates denote feet. */
export const SOLDIER_SIZE=96;
/** Feet higher in the field recede towards the horizon, equally for both factions. */
export function depthScale(y:number):number{return Math.max(.64,1-Math.max(0,y-65)*.0015);}
export function soldierSize(y:number,male=false):number{return SOLDIER_SIZE*depthScale(y)*(male?1.08:1);}
export function allyPosition(index:number){
 const feet=[[-142,65],[-85,88],[-28,110],[-146,148],[-88,168],[-32,190],[-152,227],[-91,246],[-36,269]];
 const [x,y]=feet[Math.min(index,feet.length-1)];return {x:Math.max(x,-190+soldierSize(y)/2),y};
}
export function waveSize(stage:number,boss=false):number {
 if(boss)return 1;
 return stage>=400?30:stage>=200?20:stage>=100?15:stage>=60?10:stage>=30?6:stage>=15?4:stage>=5?2:1;
}
export function enemyPosition(index:number,count:number){
 const columns=Math.min(5,count),row=Math.floor(index/columns),col=index%columns;
 const y=65+row*39+(col%2)*13;
 const right=210-soldierSize(y,true)/2;
 return {x:count===1?right:right-(columns-1-col)*29,y};
}
export function survivingEnemies(count:number,healthRatio:number):number{return Math.max(0,Math.min(count,Math.ceil(count*Math.max(0,Math.min(1,healthRatio)))));}
