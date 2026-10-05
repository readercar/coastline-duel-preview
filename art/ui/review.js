/* Local developer review page. It loads the unchanged shipping build in an iframe.
 * Every screen uses the production renderers. Account and commerce responses below
 * are deterministic fixtures; no test action reaches a real service or purchase. */
'use strict';
const frame=document.querySelector('#game'),select=document.querySelector('#screen');
let app,cc,locale='ko',flows=[],history=[];
const labels=['수호자','영웅','장비','정령','유물','상점'];
const tick=()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
const until=async condition=>{for(let i=0;i<600;i++){if(condition())return;await tick();}throw Error('Game did not load');};
const notice={id:'art-review',title:'가을 업데이트 안내',body:'새로운 모험이 시작됩니다.\n장비와 정령을 준비하고 더 높은 층에 도전하세요.\n\n'+Array(16).fill('모든 보상은 우편함에서 확인할 수 있습니다. 긴 안내도 스크롤해서 읽을 수 있습니다.').join('\n'),localizations:{en:{title:'Autumn update',body:'A new adventure begins.\nPrepare your equipment and spirits for the next stage.\n\n'+Array(16).fill('Rewards are delivered to your inbox. Scroll to read the complete announcement.').join('\n')}}};
const guild={guild:{name:'새벽의 수호단',raid_hp:1200000},role:'leader',members:[{id:'review',name:'검수 수호자',role:'leader'},{id:'other',name:'숲의 궁수',role:'member'}],messages:[{id:'m1',account:'other',name:'숲의 궁수',body:'함께 다음 층으로 출발해요!'}]};
function seed(){
  app.update=()=>{};
  app.game.storage={getItem:()=>null,setItem:()=>{}};
  app.game.s=app.game.fresh();const s=app.game.s;
  s.locale=locale;s.audio=false;s.maxStage=180000;s.run.stage=63;s.run.master=550;s.run.gold=18;s.run.heroes[0]=80;s.run.heroes[1]=50;s.run.heroes[2]=25;
  s.run.hp=app.game.maxHP();s.sp=40;s.shards=500;s.relics=8;s.gems=7200;s.souls=1000;s.dust=1000;s.eventTokens=1000;s.geodes=5;s.mementos=8;s.pets[0]=25;s.pets[1]=6;s.pets[2]=2;s.monuments[0]=1;s.stones[0]=3;s.titans[0]=3;s.cards.fill(100);s.fragments.fill(300);s.artifacts[0]=3;s.artifacts[1]=1;s.salvaged=[3];s.totalKills=180;s.totalTaps=940;s.dayTaps=150;s.portal=5;s.extra.unlocked=[8,15,60,100,1000,100000,180000];
  s.equipment=[{id:1,slot:0,rarity:3,level:63,power:2.5,locked:false,set:0},{id:2,slot:1,rarity:2,level:60,power:1.6,locked:true,set:0},{id:3,slot:2,rarity:1,level:55,power:1.2,locked:false,set:1}];s.equipped[0]=1;s.nextItem=4;s.extra.unseenEquipment=[2,3];
  app.game.unlock();app.game.notice='';app.draft=[...s.skills];app.onlineService.accountId='review';app.onlineService.base='';
  app.cloud.connect=async()=> 'review-anonymous-account';app.cloud.load=async()=>({version:2,state:null});
  app.onlineService.connect=async()=>({profile:{id:'review',name:'검수 수호자'},membership:true,regular:{id:-1},tournament:{id:1}});
  app.onlineService.request=async path=>{
    if(path==='/guild')return guild;
    if(path.startsWith('/guilds'))return [{id:'forest',name:'새벽의 수호단',members:12}];
    if(path==='/guild/info')return {settings:{description:'함께 성장하는 수호자들의 길드',badge:1},vault:8000,logs:[{name:'숲의 궁수',damage:4000}]};
    if(path.startsWith('/guild/member'))return {name:'숲의 궁수',role:'member',damage:4000};
    if(path==='/blocks')return [{id:'example',name:'검수 플레이어'}];
    if(path==='/health')return {maintenance:false,version:'0.1.0'};
    if(path==='/account/save')return {version:2,state:null};
    if(path==='/raid/cards')return {dust:1000,cards:s.cards,fragments:s.fragments};
    if(path==='/competition/history')return [];
    if(path.startsWith('/competition?'))return {serverNow:Date.now(),tournament:{end:Date.now()+86400000},leaderboard:[{name:'검수 수호자',score:163},{name:'숲의 궁수',score:151}],state:null,claimed:false};
    if(path==='/commerce/status')return {tier:3,vipPoints:1500,passUntil:Date.now()+86400000};
    throw Error('Review fixture missing: '+path);
  };
  app.onlineService.command=async()=>{throw Error('Transactions are disabled in UI review');};
  app.liveOps.policy={notices:[notice],minimumVersion:{web:'0.1.0',ios:'0.1.0',android:'0.1.0'},storeUrls:{web:'https://example.com',ios:'https://example.com',android:'https://example.com'}};
}
function add(key,title,show){flows.push({key,title,show});}
function defineFlows(){
  labels.forEach((title,i)=>add('tab-'+i,title,()=>{app.tab=i;app.draw();}));
  add('shop-1','상점 · 보급',()=>{app.tab=5;app.shopTab=1;app.draw();});add('shop-2','상점 · 혜택',()=>{app.tab=5;app.shopTab=2;app.draw();});
  add('folded','접힌 전투 HUD',()=>{app.folded=true;app.draw();});
  ['menu','prestige','skills','perks','daily','milestones','cards','events','board','meta','souls','stones','research','monuments','profile','settings','spells','salvaged','equipmentTools','transmog','achievements','craft','sets','mastery','offline','online'].forEach(key=>add(key,'기본 · '+key,()=>app[key]()));
  add('item','장비 비교',()=>app.item(app.game.s.equipment[0]));add('artifactDetail','유물 상세',()=>app.artifactDetail(0));add('cardDetail','카드 상세',()=>app.cardDetail(0));add('skillNode','스킬 상세',()=>app.skillNode(0));
  add('raid','솔로 레이드 전투',()=>{app.game.startRaid();app.raidView();});
  ['hub','build','talents','perks','perk','hero','petDetail','petPuzzle','petMilestones','dustShop','crystal','souls','titan','gems','gem','mystic','monuments','monument','collectibles','inbox','cosmetics','notifications','eventHub','eventShop','alchemy','drop','tower','limited','guildTools','guildSearch','stickers','solo','portals','presets','displaySettings','support','account','renameAccount','balance','heroMastery','equipmentSets','equipmentSet','equipmentDrops'].forEach(key=>add('extra-'+key,'확장 · '+key,()=>app.extensions[key](0)));
  add('extra-mailDetail','우편 상세',()=>app.extensions.mailDetail(app.game.s.extra.mails[0].id));
  add('extra-summonConfirm','소환 확인',()=>app.extensions.summonConfirm(10));
  ['guildEdit','guildInfo','guildLogs','vault','moderation','blocked','serviceStatus'].forEach(key=>add('online-'+key,'온라인 · '+key,()=>app.extensions[key]()));
  add('guild','길드 채팅',()=>app.guild());add('guildMembers','길드원 목록',()=>app.guildMembers(guild));add('guildRaid','길드 레이드 입장',()=>app.guildRaid(guild));add('member','길드원 상세',()=>app.extensions.member('other'));add('retire','길드 은퇴 확인',()=>app.extensions.retire());
  add('tournaments','대회 목록',()=>app.extensions.tournaments());add('tournament','대회 순위',()=>app.extensions.tournament(1,'abyss'));add('competitionBattle','대회 전투',()=>{app.competitionId=1;app.competitionBattle({run:app.game.s.run});});
  add('serverCards','서버 카드',()=>app.extensions.serverCards());
  add('store','실물 상품 상점',()=>app.payments.store());add('product','젬 상품',()=>app.payments.product('diamonds_500'));add('pass','시즌 패스',()=>app.payments.product('season_pass'));add('vip','VIP',()=>app.payments.vip());add('fairy','요정 보상',()=>app.payments.fairy());add('ads','광고 보상 목록',()=>app.payments.ads());add('ad','광고 보상 상세',()=>app.payments.ad('shop_chest'));
  add('live-hub','운영 메뉴',()=>app.liveOps.hub());add('live-notices','공지 목록',()=>app.liveOps.notices());add('live-notice','긴 공지',()=>app.liveOps.notice(notice));add('live-update','업데이트 안내',()=>app.liveOps.updatePanel());
  add('confirm','확인 팝업',()=>app.confirm(app.tr('action.confirm'),'다음 단계로 진행할까요?',()=>{}));add('info','정보 팝업',()=>app.info(app.tr('complete.support'),'검수용 정보 화면입니다.'));add('toast','토스트',()=>app.toast(app.tr('complete.applied')));
  add('cosmetic-frame','팝업 테두리 꾸미기',()=>{app.game.s.extra.cosmetics[1]=3;app.info(app.tr('extra.cosmetics'),'팝업 색상 선택도 새 아트에 적용됩니다.');});
}
function report(flow){
 const nodes=[];const walk=n=>{if(!n.activeInHierarchy)return;nodes.push(n);n.children.forEach(walk);};walk(app.root);
 const ls=nodes.map(n=>n.getComponent(cc.Label)).filter(Boolean),sprites=nodes.map(n=>n.getComponent(cc.Sprite)).filter(Boolean),panel=app.modal?.getChildByName('modal-panel');
 const zeroSizedLabels=ls.filter(l=>l.string&&(!l.node.getComponent(cc.UITransform).width||!l.node.getComponent(cc.UITransform).height)).map(l=>l.string);
 const hudBounds={stage:app.stageLabel.node.getComponent(cc.UITransform).width,gold:app.goldLabel.node.getComponent(cc.UITransform).width,hp:app.hpLabel.node.getComponent(cc.UITransform).width};
 const popupButtons=nodes.filter(n=>n.name==='ui-button'&&app.ui.inPopup(n));
 const buttonSiblingOverlaps=[];
 for(let i=0;i<popupButtons.length;i++)for(let j=i+1;j<popupButtons.length;j++){const a=popupButtons[i],b=popupButtons[j];if(a.parent!==b.parent)continue;const at=a.getComponent(cc.UITransform),bt=b.getComponent(cc.UITransform);if(Math.abs(a.position.x-b.position.x)<(at.width+bt.width)/2-1&&Math.abs(a.position.y-b.position.y)<(at.height+bt.height)/2-1)buttonSiblingOverlaps.push([a.children.find(n=>n.name==='button-label')?.getComponent(cc.Label)?.string,b.children.find(n=>n.name==='button-label')?.getComponent(cc.Label)?.string]);}
 const buttonArt=popupButtons.filter(n=>[...app.ui.frames].some(([key,frame])=>key.startsWith('popup/')&&n.getComponent(cc.Sprite)?.spriteFrame===frame)).length;
 const result={screen:flow.key,locale,font:app.ui.font?.name,frames:app.ui.frames.size,missing:app.ui.missing,fontLabels:ls.filter(l=>l.font===app.ui.font&&!l.useSystemFont).length,labels:ls.length,zeroSizedLabels,hudBounds,sprites:sprites.length,dim:app.modal?.getChildByName('shape')?.getComponent(cc.Graphics)?.fillColor.a??null,panelWidth:panel?.getComponent(cc.UITransform)?.width??null,cosmeticAccent:!!panel?.getChildByName('modal-color-accent'),master:app.game.s.run.master,tab:app.tab,popupButtons:popupButtons.length,buttonArt,buttonSiblingOverlaps,draft:app.draft,modalTitle:panel?.children.map(n=>n.getComponent(cc.Label)).find(Boolean)?.string??null};
 result.passed=result.frames===45&&buttonArt===popupButtons.length&&!buttonSiblingOverlaps.length&&!result.missing.length&&!!app.ui.font&&result.fontLabels===result.labels&&!zeroSizedLabels.length&&hudBounds.stage===42&&hudBounds.gold===180&&hudBounds.hp===74&&(!panel||(result.dim===128&&result.panelWidth===432))&&(flow.key!=='cosmetic-frame'||result.cosmeticAccent);
 document.querySelector('#current-report').textContent=JSON.stringify(result,null,2);return result;
}
async function show(index){
 const flow=flows[index];select.value=String(index);app.liveOps.blocked=false;app.close();app.folded=false;app.shopTab=0;app.tab=0;app.game.s.locale=locale;app.game.s.extra.cosmetics[1]=0;app.draw();document.querySelector('#screen-label').textContent=flow.title;
 try{await flow.show();await until(()=>!app.remoteBusy);await tick();return report(flow);}catch(e){const result={screen:flow.key,locale,passed:false,error:e.message};document.querySelector('#current-report').textContent=JSON.stringify(result,null,2);return result;}
}
async function start(){
 await until(()=>frame.contentWindow.System);cc=await frame.contentWindow.System.import('cc');
 await until(()=>cc.director.getScene()?.getChildByName('Canvas')?.getComponent('GameApp')?.root);
 app=cc.director.getScene().getChildByName('Canvas').getComponent('GameApp');seed();defineFlows();
 flows.forEach((f,i)=>select.add(new Option(f.title,String(i))));select.disabled=false;document.querySelector('#audit').disabled=false;
 select.onchange=()=>show(+select.value);document.querySelector('#next').onclick=()=>show((+select.value+1)%flows.length);document.querySelector('#previous').onclick=()=>show((+select.value+flows.length-1)%flows.length);
 ['ko','en'].forEach(lang=>document.querySelector('#'+lang).onclick=()=>{locale=lang;show(+select.value);});
 document.querySelector('#probe').onclick=()=>report(flows[+select.value]);
 document.querySelector('#audit').onclick=async()=>{
   history=[];select.disabled=true;document.querySelector('#audit').disabled=true;
   for(const lang of ['ko','en']){locale=lang;for(let i=0;i<flows.length;i++){history.push(await show(i));document.querySelector('#all-report').textContent=`검사 중 ${history.length}/${flows.length*2}`;}}
   const summary={passed:history.every(r=>r.passed),screens:flows.length,checks:history.length,locales:['ko','en'],failures:history.filter(r=>!r.passed),results:history};document.querySelector('#all-report').textContent=JSON.stringify(summary,null,2);select.disabled=false;document.querySelector('#audit').disabled=false;locale='ko';await show(0);
 };
 const initial=new URLSearchParams(location.search).get('screen');await show(Math.max(0,flows.findIndex(f=>f.key===initial)));
}
start().catch(e=>{document.querySelector('#current-report').textContent=e.stack;});
