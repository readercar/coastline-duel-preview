(() => {
  const root = document.getElementById('pastel-ui');
  if (!root) return;
  const query = new URLSearchParams(location.search);
  const tabs = ['guardian','heroes','equipment','spirits','relics','shop'];
  const state = {locale:query.get('locale') === 'en' ? 'en':'ko',view:query.get('tab') ? 'single':'gallery',tab:tabs.includes(query.get('tab')) ? query.get('tab'):'heroes',slot:'sword',shop:0,modal:null,modalTab:null,audio:true,levels:{guardian:150,rowen:80,kael:50,sera:25,bram:10},points:25,talents:[0,0,0,0],hp:77};
  if(root.classList.contains('pu-inline')) {
    state.view='single';
    const saved=window.openai?.widgetState?.privateContent;
    if(saved && tabs.includes(saved.tab)) state.tab=saved.tab;
    if(saved?.locale==='en') state.locale='en';
  }
  if(query.has('capture')) root.classList.add('pu-capture');
  const injectedAssets=typeof PASTEL_ASSETS === 'undefined' ? null:PASTEL_ASSETS;
  const asset=(id) => injectedAssets?.[id] || (id==='battle' ? 'assets/battle-preview.webp':id==='ci' ? '../../../assets/resources/branding/tt-softs-ci.png':`../../../assets/resources/ui/crumble/${id}.png`);
  const t=(key,vars={}) => {
    const value=PASTEL_COPY[state.locale][key];
    if(value===undefined) throw new Error(`Missing translation: ${state.locale}/${key}`);
    return value.replace(/\{(\w+)\}/g,(_,name)=>{if(vars[name]===undefined)throw new Error(`Missing placeholder: ${key}/${name}`);return String(vars[name]);});
  };
  const img=(id,cls='') => `<img class="${cls}" src="${asset(id)}" alt="" draggable="false">`;
  const icon=(id,cls='') => img(`icons/${id}`,cls);
  const face=(id,cls='pu-portrait') => img(`faces/${id}`,cls);
  const action=(label,cost,kind='',data='') => `<button class="pu-action ${kind} cursor-interaction" type="button" ${data}>${cost||t(label)}${cost?`<small>${t(label)}</small>`:''}</button>`;
  const row=(art,name,sub,label='action.details',cost=null,kind='',data='data-modal="item"',cls='') => `<div class="pu-row ${cls}">${art}<div class="pu-words"><div class="pu-name">${name}</div><div class="pu-sub">${sub}</div></div>${action(label,cost,kind,data)}</div>`;
  const header=(title,sub,button='') => `<div class="pu-panel-head"><div><div class="pu-title">${t(title)}</div>${sub?`<div class="pu-meta">${sub}</div>`:''}</div>${button}</div>`;
  const small=(label,attrs,cls='') => `<button class="pu-small-action ${cls} cursor-interaction" type="button" ${attrs}>${label}</button>`;
  function panel(tab) {
    if(tab==='guardian') return `<div class="pu-guardian">${row(face('guardian'),t('master.name'),t('master.level',{level:state.levels.guardian}),'action.upgrade','2.4K','','data-upgrade="guardian"','pu-guard-main')}<div class="pu-rebirth">${icon('rebirth','pu-portrait')}<div class="pu-words"><div class="pu-name">${t('master.prestige')}</div><div class="pu-sub">${t('master.prestigeDesc')}</div></div><button class="pu-action pu-secondary cursor-interaction" type="button" data-modal="rebirth">${t('master.rewardButton',{count:24})}</button></div><div class="pu-section-label">${t('master.spells')}</div>${row(icon('sword','pu-portrait pu-pixel'),t('spell.meteor'),t('spell.meteorDesc'),'action.details',null,'pu-secondary','data-modal="skills"','pu-spell-row')}${row(icon('lightning','pu-portrait pu-pixel'),t('spell.sight'),t('spell.sightDesc'),'action.details',null,'pu-secondary','data-modal="skills"','pu-spell-row')}</div>`;
    if(tab==='heroes') return `${header('hero.title','',small(t('hero.buyMode',{count:1}),'data-buy-mode'))}<div class="pu-list">${[['rowen','12.4K','1.8K'],['kael','24.6K','3.2K'],['sera','38.1K','6.4K'],['bram','48.9K','12.8K']].map(([id,dps,cost])=>row(face(id==='bram'?'guardian':id),t(`hero.${id}`),t('hero.stats',{level:state.levels[id],damage:dps}),'action.upgrade',cost,'',`data-upgrade="${id}"`)).join('')}</div>`;
    if(tab==='equipment') {
      const slots=['sword','helmet','armor','aura','seal'],portrait={sword:'blade',helmet:'helmet',armor:'breastplate',aura:'aura',seal:'compass'};
      return `<div class="pu-equipment">${header('equipment.title',t('equipment.summary',{shards:120,count:24,max:100}),small(t('equipment.craft'),'data-modal="craft"','pu-green'))}<div class="pu-filters">${slots.map(id=>`<button type="button" class="pu-filter cursor-interaction" aria-pressed="${state.slot===id}" data-slot="${id}">${t(`equipment.${id}`)}</button>`).join('')}</div><div class="pu-list">${[['legendary',12,'4.80'],['rare',8,'3.20'],['common',5,'1.85']].map(([rarity,level,power],i)=>row(face(portrait[state.slot]),t('equipment.item',{slot:t(`equipment.${state.slot}`),rarity:t(`rarity.${rarity}`),level}),t('equipment.power',{power}),i===0?'action.equipped':'action.details',null,i===0?'pu-equipped':'pu-secondary',`data-modal="item" data-item-level="${level}"`)).join('')}</div></div>`;
    }
    if(tab==='spirits') return `${header('pet.title','',small(t('pet.hatch'),'data-modal="hatch"','pu-green'))}<div class="pu-list">${[['ember-fox','fox',12,'allDamage'],['stone-hawk','hawk',8,'tapDamage'],['shade-wolf','wolf',5,'heroDamage']].map(([art,name,level,bonus],i)=>row(face(art),t(`pet.${name}`),t('pet.stats',{level,bonus:t(`pet.${bonus}`)}),i===0?'action.equipped':'action.equip',null,i===0?'pu-equipped':'pu-secondary',`data-equip="${name}"`)).join('')}${row(icon('lock','pu-portrait pu-pixel'),t('action.locked'),t('pet.waiting'),'action.locked',null,'','disabled')}</div>`;
    if(tab==='relics') return `${header('relic.title',t('relic.balance',{count:248}),small(t('relic.discover'),'data-modal="discover"','pu-green'))}<div class="pu-list">${[['blade','sword',15,'damage'],['crown','crown',10,'tap'],['compass','compass',8,'heroes'],['laurel','laurel',5,'gold']].map(([art,name,level,effect])=>row(face(art),t(`relic.${name}`),t('relic.stats',{level,effect:t(`effect.${effect}`)}),'action.details',null,'pu-secondary','data-modal="discover"')).join('')}</div>`;
    const filters=['regular','progress','limited'];
    let rows;
    if(state.shop===0) rows=row(face('gems'),t('shop.gems'),t('shop.balance',{count:320}),'action.open',null,'pu-secondary','data-modal="shop.gems"')+row(icon('chest','pu-portrait pu-pixel'),t('shop.supply'),t('shop.supplyDesc'),'action.watch',null,'pu-equipped','data-modal="shop.supply"')+row(face('gems'),t('shop.free'),t('shop.freeDesc',{count:25}),'action.claim',null,'pu-equipped','data-claim')+row(face('ember-fox'),t('shop.spirit'),t('shop.spiritDesc',{count:30}),'action.buy',null,'','data-modal="shop.spirit"');
    else if(state.shop===1) rows=[60,100,500].map((stage,i)=>row(icon('trophy','pu-portrait pu-pixel'),t('shop.milestone',{stage}),t('shop.milestoneDesc'),i===0?'action.claim':'action.locked',null,i===0?'pu-equipped':'',i===0?'data-claim':'disabled')).join('');
    else rows=row(icon('scroll','pu-portrait pu-pixel'),t('shop.pass'),t('shop.passDesc'),'action.open',null,'pu-secondary','data-modal="shop.pass"');
    return `<div class="pu-shop"><div class="pu-filters">${filters.map((key,i)=>`<button class="pu-filter cursor-interaction" type="button" aria-pressed="${state.shop===i}" data-shop="${i}">${t(`shop.${key}`)}</button>`).join('')}</div><div class="pu-list">${rows}</div></div>`;
  }
  function modalMarkup(modal) {
    if(!modal)return '';
    let title,body;
    if(modal==='settings') {
      title=t('settings.title');body=`<div class="pu-setting-label">${t('settings.language')}</div><div class="pu-language">${['ko','en'].map(id=>`<button type="button" class="cursor-interaction" aria-pressed="${state.locale===id}" data-locale="${id}">${t(`settings.${id}`)}</button>`).join('')}</div><div class="pu-setting-row"><span>${t('settings.audio')}</span><button type="button" class="cursor-interaction" data-audio>${t(state.audio?'settings.on':'settings.off')}</button></div><button type="button" class="pu-dialog-main-action cursor-interaction" data-save>${t('settings.save')}</button><div class="pu-company">${t('settings.about')}${img('ci')}</div>`;
    } else if(modal==='item') {
      title=t('modal.item');body=`${face('blade','pu-item-art')}<div class="pu-dialog-body pu-title">${t('equipment.item',{slot:t(`equipment.${state.slot}`),rarity:t('rarity.legendary'),level:12})}</div><div class="pu-item-effect">${t('equipment.compare',{current:'3.20',next:'4.80'})}</div><button type="button" class="pu-dialog-main-action cursor-interaction" data-modal-equip>${t('action.equip')}</button>`;
    } else if(modal==='skills') {
      title=t('skills.title');body=`<div class="pu-dialog-body">${t('skills.points',{points:state.points})}</div><div class="pu-talent-grid">${['knight','mage','rogue','warlord'].map((id,i)=>`<div class="pu-talent">${icon(['sword','lightning','adventurer','flag'][i])}<b>${t(`skills.${id}`)}</b><button type="button" class="cursor-interaction" data-talent="${i}" ${state.points===0?'disabled':''}>${t('skills.level',{level:state.talents[i]})} ＋</button></div>`).join('')}</div><button type="button" class="pu-dialog-main-action cursor-interaction" data-close>${t('skills.apply')}</button>`;
    } else {
      const simple={inbox:['notice.title','notice.body','mail'],achievements:['achievement.title','achievement.body','trophy'],cards:['cards.title','cards.body','cards'],hatch:['hatch.title','hatch.body','egg'],craft:['craft.title','craft.body','armor'],discover:['discover.title','discover.body','scroll'],rebirth:['modal.rebirth','modal.rebirthDesc','rebirth'],'shop.gems':['shop.gems','shop.balance','heart'],'shop.supply':['shop.supply','shop.supplyDesc','chest'],'shop.spirit':['shop.spirit','shop.spiritDesc','fox'],'shop.pass':['shop.pass','shop.passDesc','scroll']};
      const [titleKey,bodyKey,art]=simple[modal]||['modal.preview','hud.gift','chest'];
      title=t(titleKey);body=`${icon(art,'pu-item-art')}<div class="pu-dialog-body">${t(bodyKey,{count:modal==='shop.gems'?320:30})}</div>${modal==='rebirth'?`<div class="pu-item-effect">${t('master.reward',{count:24})}</div>`:''}<button type="button" class="pu-dialog-main-action cursor-interaction" data-close>${t('action.confirm')}</button>`;
    }
    return `<div class="pu-modal-backdrop"><section class="pu-dialog" role="dialog" aria-modal="true" aria-label="${title}"><div class="pu-dialog-head"><h2 class="pu-dialog-title">${title}</h2><button type="button" class="pu-close cursor-interaction" aria-label="${t('action.close')}" data-close>×</button></div>${body}</section></div>`;
  }
  function screen(tab) {
    return `<div class="pu-screen" data-tab="${tab}" aria-label="${t(`nav.${tab}`)}"><div class="pu-resourcebar"><span class="pu-brand">${t('hud.zone')}</span><span class="pu-currency" aria-label="${t('hud.gold')}"><span class="pu-symbol" aria-hidden="true">✦</span>8.1K</span><span class="pu-currency" aria-label="${t('hud.gems')}">${face('gems','')}320</span></div><div class="pu-arena">${img('battle','pu-battle-art')}<button type="button" class="pu-arena-hit cursor-interaction" data-attack aria-label="${t('hud.attack')}"></button><div class="pu-stage-head"><button type="button" class="pu-settings cursor-interaction" data-modal="settings" aria-label="${t('settings.title')}">${icon('settings')}</button><div class="pu-stage">${t('hud.stage',{stage:63})}<small>62 · 63 · 64</small></div><button type="button" class="pu-boss cursor-interaction" data-attack>${t('hud.boss')}</button></div><div class="pu-enemy"><div class="pu-health-label"><span>${t('hud.enemy')}</span><span>284K</span></div><div class="pu-health-track" role="progressbar" aria-label="${t('hud.enemy')}" aria-valuenow="${state.hp}" aria-valuemin="0" aria-valuemax="100"><div class="pu-health-fill" style="width:${state.hp}%"></div></div><div class="pu-progress">${t('hud.progress',{count:5,total:5})}</div></div><button type="button" class="pu-floating cursor-interaction" data-modal="gift" aria-label="${t('hud.gift')}">${icon('egg')}</button><button type="button" class="pu-floating pu-drop cursor-interaction" data-modal="item" aria-label="${t('hud.drop',{count:3})}">${icon('chest')}<span class="pu-drop-count">3</span></button></div><div class="pu-ledger"><span><b>94.2K</b>${t('hud.tapDamage')}</span><span class="pu-dps"><b>124.8K</b>${t('hud.dps')}</span></div><div class="pu-shortcuts">${[['cards','cards'],['lightning','skills'],['trophy','achievements'],['mail','inbox']].map(([art,name])=>`<button type="button" class="pu-shortcut cursor-interaction" data-modal="${name}">${icon(art)}<span>${t(`shortcut.${name}`)}</span>${name==='inbox'?'<span class="pu-mail-dot"></span>':''}</button>`).join('')}</div><section class="pu-panel" aria-label="${t(`nav.${tab}`)}">${panel(tab)}</section><nav class="pu-navigation" aria-label="${t('nav.label')}">${tabs.map((id,i)=>`<button type="button" class="pu-nav-item cursor-interaction" data-target="${id}" aria-pressed="${id===tab}">${icon(['sword','adventurer','armor','fox','scroll','chest'][i])}<span>${t(`nav.${id}`)}</span></button>`).join('')}</nav><div class="pu-live" aria-live="polite"></div>${modalMarkup(state.modalTab===tab?state.modal:null)}</div>`;
  }
  function persist() {
    window.openai?.setWidgetState?.({modelContent:{design:'pastel-flat-v2',tab:state.tab,locale:state.locale},privateContent:{tab:state.tab,locale:state.locale}})?.catch(()=>{});
  }
  function render() {
    root.querySelectorAll('[data-copy]').forEach(el=>el.textContent=t(el.dataset.copy));
    const gallery=root.querySelector('.pu-gallery');gallery.classList.toggle('pu-single',state.view==='single');
    const shown=state.view==='single'?[state.tab]:tabs;
    gallery.innerHTML=shown.map(id=>`<article class="pu-study"><h2 class="pu-caption">${t(`nav.${id}`)}</h2>${screen(id)}</article>`).join('');
  }
  let toastTimer;
  function toast(text,screenEl) {
    screenEl.querySelector('.pu-toast')?.remove();
    const el=document.createElement('div');el.className='pu-toast';el.setAttribute('role','status');el.textContent=text;screenEl.append(el);
    clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.remove(),2200);
  }
  root.addEventListener('click',e=>{
    const button=e.target.closest('button');if(!button)return;
    const current=button.closest('.pu-screen');
    if(button.hasAttribute('data-locale')){state.locale=button.dataset.locale;render();persist();return;}
    if(button.hasAttribute('data-review')){state.view=button.dataset.review;state.modal=null;render();return;}
    if(button.hasAttribute('data-target')){state.tab=button.dataset.target;state.modal=null;if(state.view==='single')render();else current.outerHTML=screen(state.tab);persist();return;}
    if(button.hasAttribute('data-slot')){state.slot=button.dataset.slot;current.querySelector('.pu-panel').innerHTML=panel('equipment');return;}
    if(button.hasAttribute('data-shop')){state.shop=Number(button.dataset.shop);current.querySelector('.pu-panel').innerHTML=panel('shop');return;}
    if(button.hasAttribute('data-close')){state.modal=null;current.querySelector('.pu-modal-backdrop')?.remove();return;}
    if(button.hasAttribute('data-modal')){state.modal=button.dataset.modal;state.modalTab=current.dataset.tab;current.querySelector('.pu-modal-backdrop')?.remove();current.insertAdjacentHTML('beforeend',modalMarkup(state.modal));current.querySelector('[data-close]')?.focus();return;}
    if(button.hasAttribute('data-audio')){state.audio=!state.audio;button.textContent=t(state.audio?'settings.on':'settings.off');return;}
    if(button.hasAttribute('data-save')){toast(t('modal.saved'),current);return;}
    if(button.hasAttribute('data-talent')){if(state.points>0){state.points--;state.talents[Number(button.dataset.talent)]++;current.querySelector('.pu-modal-backdrop').outerHTML=modalMarkup('skills');}return;}
    if(button.hasAttribute('data-upgrade')){const id=button.dataset.upgrade;state.levels[id]++;current.querySelector('.pu-panel').innerHTML=panel(current.dataset.tab);return;}
    if(button.hasAttribute('data-buy-mode')){const n=button.textContent.includes('×1')?10:1;button.textContent=t('hero.buyMode',{count:n});return;}
    if(button.hasAttribute('data-equip')){current.querySelectorAll('[data-equip]').forEach(el=>{el.textContent=t('action.equip');el.classList.remove('pu-equipped');el.classList.add('pu-secondary');});button.textContent=t('action.equipped');button.classList.add('pu-equipped');button.classList.remove('pu-secondary');return;}
    if(button.hasAttribute('data-claim')){toast(t('mockup.claimed'),current);return;}
    if(button.hasAttribute('data-modal-equip')){state.modal=null;current.querySelector('.pu-modal-backdrop').remove();toast(t('action.equipped'),current);return;}
    if(button.hasAttribute('data-attack')){state.hp=Math.max(1,state.hp-7);current.querySelector('.pu-health-fill').style.width=`${state.hp}%`;current.querySelector('[role="progressbar"]').setAttribute('aria-valuenow',String(state.hp));}
  });
  root.addEventListener('keydown',e=>{if(e.key==='Escape'&&state.modal){state.modal=null;root.querySelectorAll('.pu-modal-backdrop').forEach(el=>el.remove());}});
  render();
  window.addEventListener('openai:set_globals',event=>{
    const saved=event.detail?.globals?.widgetState?.privateContent;
    if(!saved)return;
    let changed=false;
    if(tabs.includes(saved.tab)&&saved.tab!==state.tab){state.tab=saved.tab;changed=true;}
    if(['ko','en'].includes(saved.locale)&&saved.locale!==state.locale){state.locale=saved.locale;changed=true;}
    if(changed)render();
  });
  if(globalThis.Tweak){const colors={mint:'#deeee7',lilac:'#e4dcf0',peach:'#f8d5bc'};const tweak=new Tweak({container:root,onChange:()=>{for(const [key,value]of Object.entries(colors))root.style.setProperty(`--pu-${key}`,value);}});tweak.addColorPicker(colors,'mint',{label:t('nav.heroes'),reference:'--pu-mint'});tweak.addColorPicker(colors,'lilac',{label:t('nav.relics'),reference:'--pu-lilac'});tweak.addColorPicker(colors,'peach',{label:t('action.upgrade'),reference:'--pu-peach'});}
})();
