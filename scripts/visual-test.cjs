const {chromium}=require('/Users/dhlee/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs');const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'chrome',args:['--enable-webgl','--ignore-gpu-blocklist']});
 const page=await browser.newPage({viewport:{width:480,height:900},deviceScaleFactor:1});const errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='warning'&&m.text().includes('renderable'))errors.push(m.text());});
 await page.goto('http://127.0.0.1:8765');await page.waitForFunction(async()=>{try{const cc=await System.import('cc');return !!cc.director.getScene()?.getChildByName('Canvas')?.getComponent('GameApp');}catch{return false;}});await page.waitForTimeout(3000);
 await page.evaluate(async()=>{const cc=await System.import('cc');window.testApp=cc.director.getScene().getChildByName('Canvas').getComponent('GameApp');});
 await page.screenshot({path:'.reference/main-ko.png'});
 const hp=await page.evaluate(()=>testApp.game.s.run.hp);await page.mouse.click(308,320);assert.ok((await page.evaluate(()=>testApp.game.s.run.hp))<hp,'Battle tap must cause damage');
 await page.mouse.click(394,610);assert.equal(await page.evaluate(()=>testApp.game.s.run.master),2,'Upgrade button works');
 await page.mouse.click(128,878);await page.waitForTimeout(100);assert.equal(await page.evaluate(()=>testApp.tab),1);await page.screenshot({path:'.reference/heroes-ko.png'});
 await page.mouse.click(381,660);assert.equal(await page.evaluate(()=>testApp.game.s.run.heroes[0]),1);await page.waitForTimeout(80);assert.ok(await page.evaluate(()=>!!testApp.allies.getChildByName('hero-0')),'Hired Rowen is visible');
 await page.mouse.click(43,27);await page.waitForTimeout(100);await page.screenshot({path:'.reference/settings-ko.png'});
 await page.mouse.click(328,324);assert.equal(await page.evaluate(()=>testApp.game.s.locale),'en');await page.screenshot({path:'.reference/settings-en.png'});
 await page.evaluate(()=>{testApp.close();testApp.game.s.maxStage=120;testApp.game.s.run.stage=100;testApp.game.s.run.master=550;testApp.game.s.run.hp=testApp.game.maxHP();testApp.game.s.sp=25;testApp.game.s.shards=200;testApp.game.s.relics=4;testApp.game.s.geodes=2;testApp.game.s.eventTokens=1000;testApp.game.unlock();testApp.game.craft('qa-craft');testApp.game.discover('qa-discover');testApp.game.hatch('qa-egg');testApp.drawPanel();});
 for(let i=0;i<6;i++){await page.mouse.click(52.5+i*75,878);await page.waitForTimeout(80);assert.equal(await page.evaluate(()=>testApp.tab),i);await page.screenshot({path:`.reference/tab-${i}-en.png`});}
 for(const name of ['prestige','skills','perks','daily','milestones','raidLobby','cards','events','board','meta','souls','stones','research','monuments','profile','settings','spells','salvaged','equipmentTools','transmog','achievements']){
  await page.evaluate(name=>testApp[name](),name);await page.waitForTimeout(60);await page.screenshot({path:`.reference/modal-${name}-en.png`});
  const a=await page.evaluate(()=>{const n=testApp.modal.getChildByName('shape');return n.getComponent('cc.Graphics').fillColor.a;});assert.equal(a,128,`${name}: 50% dim`);
 }
 await page.evaluate(()=>{testApp.close();testApp.game.startRaid();testApp.raidView();});await page.mouse.click(151,283);assert.ok(await page.evaluate(()=>testApp.game.raid.damage>0));await page.screenshot({path:'.reference/raid-en.png'});
 await page.evaluate(()=>{testApp.close();testApp.game.s.locale='ko';testApp.draw();});
 for(const name of ['spells','skills','equipmentTools','achievements','daily']){await page.evaluate(name=>testApp[name](),name);await page.waitForTimeout(60);await page.screenshot({path:`.reference/final-${name}-ko.png`});}
 await page.evaluate(()=>testApp.artifactDetail(testApp.game.s.artifacts.findIndex(Boolean)));await page.screenshot({path:'.reference/final-artifact-ko.png'});
 await page.evaluate(()=>{testApp.close();testApp.tab=0;testApp.game.s.locale='ko';testApp.draw();});await page.setViewportSize({width:360,height:640});await page.waitForTimeout(200);await page.screenshot({path:'.reference/short-ko.png'});
 assert.deepEqual(errors,[]);fs.writeFileSync('.reference/visual-test.json',JSON.stringify({passed:true,screenshots:34,locales:['ko','en'],viewports:['480x900','360x640'],errors},null,2));console.log('PASS: battle, upgrade, hire, 6 tabs, language switch, 21 modals, dim opacity, raid, short screen; no runtime errors.');await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
