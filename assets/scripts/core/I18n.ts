export type Locale = 'ko' | 'en';
export const translations: Record<Locale, Record<string, string>> = {
    ko: {
        'locale.ko': '한국어', 'locale.en': 'English', 'game.name': '잿불의 탑', 'game.subtitle': '끝없는 원정', 'game.local': '오프라인 원정',
        'nav.master': '수호자', 'nav.heroes': '동료', 'nav.equipment': '장비', 'nav.pets': '정령', 'nav.artifacts': '유물', 'nav.shop': '상점',
        'hud.stage': '구역 {stage}', 'hud.zone': '{zone} · 잿빛 능선', 'hud.gold': '골드 {value}', 'hud.gems': '보석 {value}',
        'hud.damage': '탭 {tap}  /  초당 {dps}', 'hud.mana': '마나 {value} / 120', 'hud.enemy': '황혼의 파수병', 'hud.boss': '거대 수문장',
        'hud.progress': '처치 {count} / 5', 'hud.timer': '보스 {seconds}초', 'hud.tap': '화면을 탭하여 공격', 'hud.max': '최고 구역 {stage}',
        'action.close': '닫기', 'action.cancel': '취소', 'action.confirm': '확인', 'action.buy': '구매', 'action.upgrade': '강화', 'action.equip': '장착',
        'action.equipped': '장착 중', 'action.sell': '판매', 'action.lock': '잠금 전환', 'action.claim': '수령', 'action.claimed': '수령 완료', 'action.open': '열기',
        'action.apply': '적용', 'action.revert': '되돌리기', 'action.reset': '초기화', 'action.next': '다음', 'action.previous': '이전', 'action.back': '뒤로',
        'action.ready': '준비 완료', 'action.max': '최대', 'action.level': '레벨 {level}', 'action.cost': '비용 {cost}', 'action.buyLevel': '+{count} · {cost}',
        'action.details': '상세', 'action.remaining': '{seconds}초 남음', 'action.selected': '선택됨', 'action.select': '선택', 'action.attack': '공격',
        'master.title': '잿불 수호자', 'master.desc': '검을 강화하고 더 높은 구역에 도전하세요.', 'master.level': '레벨 {level} · 탭 피해 {damage}',
        'master.buyMode': '구매 단위 ×{count}', 'master.skills': '특성', 'master.perks': '축복', 'master.prestige': '환생',
        'prestige.title': '불씨를 이어받다', 'prestige.desc': '현재 구역, 골드, 수호자와 동료 레벨이 초기화됩니다. 장비·정령·유물·특성은 유지됩니다.',
        'prestige.reward': '기억 조각 +{value}', 'prestige.start': '다음 원정 시작 구역 {stage}', 'prestige.locked': '구역 60에서 환생 해금',
        'prestige.done': '환생 완료. 새로운 원정을 시작합니다.', 'hero.stats': '레벨 {level} · 초당 {damage}', 'hero.locked': '구역 {stage}에서 해금',
        'hero.title': '원정대', 'hero.mastery': '무기와 두루마리', 'hero.masteryInfo': '무기 {weapons} · 두루마리 {scrolls}\n동료의 영구 피해 배율을 높입니다.',
        'equipment.title': '장비 보관함', 'equipment.summary': '조각 {shards} · 보관 {count}/100', 'equipment.craft': '세트 제작', 'equipment.sets': '수집 세트',
        'equipment.item': '{slot} · {rarity} +{level}', 'equipment.power': '모든 피해 ×{power}', 'equipment.compare': '현재 ×{current} → 선택 ×{next}',
        'equipment.sellConfirm': '이 장비를 판매하고 보석을 받습니다. 판매한 장비는 되돌릴 수 없습니다.',
        'equipment.craftDesc': '아직 제작하지 않은 다음 부위를 획득합니다.\n필요 조각 {cost} · 현재 {shards}',
        'equipment.setInfo': '수집 {count}개 · 완성 {sets}세트\n누적 제작 소비 {spent}\n세트 획득 이력은 판매해도 유지됩니다.',
        'equipment.empty': '구역 15부터 장비가 드롭됩니다.', 'equipment.protected': '잠금 또는 장착 중',
        'pet.title': '정령의 쉼터', 'pet.hatch': '알 부화', 'pet.bonus': '레벨 {level} · {bonus} 보너스', 'pet.locked': '구역 8에서 정령 해금',
        'pet.info': '장착한 정령은 효과 100% 적용. 비장착 정령은 레벨에 따라 최대 100% 적용됩니다.',
        'artifact.title': '잊힌 유물', 'artifact.balance': '기억 조각 {value}', 'artifact.discover': '유물 발견 · {cost}', 'artifact.stats': '레벨 {level} · {effect}',
        'artifact.empty': '환생으로 기억 조각을 얻어 유물을 발견하세요.', 'artifact.cost': '강화 · {cost}',
        'shop.regular': '일반', 'shop.progression': '성장', 'shop.limited': '기간 한정', 'shop.pet': '정령 3레벨', 'shop.shards': '제작 조각 10개', 'shop.chest': '원정 보급함',
        'shop.chestInfo': '제작 조각 10개, 보석 원석 1개, 무기 1개를 받습니다.', 'shop.confirm': '보석 {cost}개를 사용합니다.', 'shop.free': '일일 무료 보석',
        'shop.unavailable': '결제 상품은 스토어 연결 후 이용할 수 있습니다.', 'shop.locked': '조건 달성 후 수령할 수 있습니다.',
        'skills.title': '특성 수련', 'skills.points': '남은 포인트 {points} · 임시 비용 {cost}', 'skills.node': '{branch} {tier} · Lv {level}',
        'skills.info': '다음 단계는 앞 노드 3레벨 필요. 레벨별 비용은 1, 2, 3…이며 적용 전까지 전투에 반영되지 않습니다.',
        'skills.resetConfirm': '모든 특성을 초기화하고 사용한 포인트를 돌려받습니다.',
        'perks.title': '원정의 축복', 'perks.row': '{name} · 보유 {count}', 'perks.info': '5분 동안 관련 성장 배율을 높입니다.',
        'daily.title': '일일 임무', 'daily.progress': '{current} / {goal}', 'daily.0': '오늘의 출석', 'daily.1': '100회 탭하기', 'daily.2': '적 50마리 처치', 'daily.3': '한 번 환생하기',
        'daily.reward': '보석 +{gems}', 'milestone.title': '원정 이정표', 'milestone.row': '최고 구역 {stage} · 보석 25 / 조각 5',
        'inbox.title': '보관 우편', 'inbox.empty': '새로운 우편이 없습니다.', 'offline.title': '다시 돌아온 원정대', 'offline.reward': '비접속 골드 {gold}', 'offline.info': '최대 8시간의 비접속 보상을 수령하세요.',
        'menu.title': '원정 기록', 'menu.daily': '일일 임무', 'menu.milestones': '이정표', 'menu.raid': '솔로 레이드', 'menu.cards': '레이드 카드', 'menu.event': '잿불 축제', 'menu.meta': '심화 성장',
        'menu.clan': '길드', 'menu.tournament': '대회', 'menu.profile': '프로필', 'menu.settings': '설정', 'menu.inbox': '우편',
        'online.title': '온라인 서비스', 'online.unavailable': '이 빌드는 로컬 저장으로 플레이합니다. 실제 길드·채팅·대회 매칭은 서버 연결이 필요합니다.',
        'profile.stats': '최고 구역 {stage}\n환생 {prestiges}회\n누적 처치 {kills}\n누적 탭 {taps}\n유물 {artifacts}개\n정령 총레벨 {pets}',
        'settings.language': '언어', 'settings.audio': '효과음 {state}', 'settings.on': '켜짐', 'settings.off': '꺼짐', 'settings.about': 'Cocos Creator 3.8.8 · v0.1.0\nTTSofts · 독립 레트로 방치형 RPG',
        'settings.save': '저장 완료', 'settings.saveButton': '지금 저장', 'settings.export': '저장 데이터 내보내기',
        'raid.title': '균열 레이드', 'raid.portal': '관문 {portal}', 'raid.desc': '카드 3장을 선택하고 30초 동안 부위를 탭하세요. 파괴한 부위는 다시 공격할 수 없습니다.',
        'raid.locked': '최고 구역 100에서 레이드 해금', 'raid.damage': '총 피해 {damage} · {seconds}초', 'raid.result': '레이드 결과', 'raid.reward': '피해 {damage}\n정수 +{dust}\n사용한 카드 조각 각 1개',
        'raid.part': '부위 {part}', 'raid.deck': '카드 덱 {a} / {b} / {c}', 'raid.upgrade': '강화 · 정수 {cost}', 'raid.card': '레벨 {level} · 조각 {fragments}',
        'raid.dust': '정수 {dust}', 'event.title': '잿불 축제', 'event.balance': '축제 토큰 {tokens}', 'event.path': '보상 여정', 'event.board': '유적 탐사', 'event.rule': '적을 처치해 토큰을 얻으세요. 보상 여정은 시즌 누적 획득량 조건이며, 탐사는 칸마다 토큰 20개를 사용합니다.',
        'event.reward': '토큰 {tokens} · 보석 15 / 조각 5', 'event.tile': '탐사 {index}', 'event.found': '보석 +{gems}',
        'meta.title': '심화 성장', 'meta.souls': '영혼 수집', 'meta.gems': '별빛 보석', 'meta.monuments': '기념비', 'meta.research': '영혼 연구',
        'meta.soulInfo': '영혼 {souls} · 수집 {count}/120\n최고 구역 100,000 또는 계정 30일에 해금.',
        'meta.summon': '소환 · 영혼 10', 'meta.gemInfo': '보석 원석 {geodes} · 수집 {count}/24', 'meta.crack': '원석 열기', 'meta.stone': '별빛 보석 {index} · Lv {level}',
        'meta.monumentInfo': '최고 구역 180,000에서 해금\n시즌 기억 {value}', 'meta.monument': '기념비 {index} · Lv {level}', 'meta.researchNode': '연구 {index} · Lv {level}',
        'error.currency': '재화가 부족합니다.', 'error.locked': '아직 해금되지 않았습니다.', 'error.mana': '마나가 부족하거나 재사용 대기 중입니다.',
        'error.full': '장비 보관함이 가득 찼습니다.', 'error.complete': '모두 수집했습니다.', 'error.invalid': '유효하지 않은 요청입니다.', 'error.prerequisite': '선행 특성을 먼저 올려주세요.',
        'error.protected': '잠금 또는 장착 중인 장비는 판매할 수 없습니다.', 'error.timer': '아직 준비되지 않았습니다.', 'error.claimed': '이미 수령했거나 조건을 충족하지 못했습니다.',
        'error.save': '저장 데이터를 읽지 못했습니다. 원본 데이터는 보관해 주세요.', 'error.storage': '저장 공간에 접근할 수 없습니다.', 'battle.failed': '시간 초과. 강화 후 보스에 다시 도전하세요.',
        'battle.fight': '보스 도전', 'battle.leave': '보스 이탈', 'unlock.pet': '정령 동행이 해금되었습니다.', 'reward.done': '보상을 받았습니다.',
        'fairy.title': '길잡이의 선물', 'fairy.reward': '원정 골드를 받았습니다.', 'empty': '아직 획득한 항목이 없습니다.',
    }, en: {
        'locale.ko': '한국어', 'locale.en': 'English', 'game.name': 'EMBER ASCENT', 'game.subtitle': 'THE ENDLESS EXPEDITION', 'game.local': 'OFFLINE EXPEDITION',
        'nav.master': 'Guardian', 'nav.heroes': 'Heroes', 'nav.equipment': 'Gear', 'nav.pets': 'Spirits', 'nav.artifacts': 'Relics', 'nav.shop': 'Shop',
        'hud.stage': 'STAGE {stage}', 'hud.zone': '{zone} · ASHEN RIDGE', 'hud.gold': 'Gold {value}', 'hud.gems': 'Gems {value}',
        'hud.damage': 'Tap {tap}  /  DPS {dps}', 'hud.mana': 'Mana {value} / 120', 'hud.enemy': 'Dusk Sentinel', 'hud.boss': 'Great Gatekeeper',
        'hud.progress': 'Defeated {count} / 5', 'hud.timer': 'Boss {seconds}s', 'hud.tap': 'TAP THE FIELD TO ATTACK', 'hud.max': 'Best stage {stage}',
        'action.close': 'Close', 'action.cancel': 'Cancel', 'action.confirm': 'Confirm', 'action.buy': 'Buy', 'action.upgrade': 'Upgrade', 'action.equip': 'Equip',
        'action.equipped': 'Equipped', 'action.sell': 'Sell', 'action.lock': 'Toggle lock', 'action.claim': 'Claim', 'action.claimed': 'Claimed', 'action.open': 'Open',
        'action.apply': 'Apply', 'action.revert': 'Revert', 'action.reset': 'Reset', 'action.next': 'Next', 'action.previous': 'Previous', 'action.back': 'Back',
        'action.ready': 'Ready', 'action.max': 'MAX', 'action.level': 'Level {level}', 'action.cost': 'Cost {cost}', 'action.buyLevel': '+{count} · {cost}',
        'action.details': 'Details', 'action.remaining': '{seconds}s left', 'action.selected': 'Selected', 'action.select': 'Select', 'action.attack': 'Attack',
        'master.title': 'Ember Guardian', 'master.desc': 'Strengthen your blade. Climb beyond the ridge.', 'master.level': 'Level {level} · Tap damage {damage}',
        'master.buyMode': 'Buy ×{count}', 'master.skills': 'Talents', 'master.perks': 'Blessings', 'master.prestige': 'Rebirth',
        'prestige.title': 'Carry the ember forward', 'prestige.desc': 'Your stage, gold, guardian and hero levels reset. Gear, spirits, relics and talents remain.',
        'prestige.reward': 'Memory shards +{value}', 'prestige.start': 'Next expedition begins at stage {stage}', 'prestige.locked': 'Rebirth unlocks at stage 60',
        'prestige.done': 'Rebirth complete. A new expedition begins.', 'hero.stats': 'Level {level} · DPS {damage}', 'hero.locked': 'Unlocks at stage {stage}',
        'hero.title': 'The Expedition', 'hero.mastery': 'Weapons & scrolls', 'hero.masteryInfo': 'Weapons {weapons} · Scrolls {scrolls}\nPermanently increase your heroes’ damage.',
        'equipment.title': 'Equipment Vault', 'equipment.summary': 'Shards {shards} · Inventory {count}/100', 'equipment.craft': 'Craft set', 'equipment.sets': 'Sets',
        'equipment.item': '{slot} · {rarity} +{level}', 'equipment.power': 'All damage ×{power}', 'equipment.compare': 'Current ×{current} → Selected ×{next}',
        'equipment.sellConfirm': 'Sell this item for gems. Sold equipment cannot be recovered.',
        'equipment.craftDesc': 'Receive the next uncrafted piece.\nRequired shards {cost} · Owned {shards}',
        'equipment.setInfo': 'Collected {count} · Complete sets {sets}\nTotal crafting spend {spent}\nCollection history remains after selling.',
        'equipment.empty': 'Equipment starts dropping at stage 15.', 'equipment.protected': 'Locked or equipped',
        'pet.title': 'Spirit Sanctuary', 'pet.hatch': 'Hatch egg', 'pet.bonus': 'Level {level} · {bonus} bonus', 'pet.locked': 'Spirits unlock at stage 8',
        'pet.info': 'The active spirit grants 100% power. Other spirits grant up to 100% as their level increases.',
        'artifact.title': 'Forgotten Relics', 'artifact.balance': 'Memory shards {value}', 'artifact.discover': 'Discover · {cost}', 'artifact.stats': 'Level {level} · {effect}',
        'artifact.empty': 'Rebirth to earn memory shards and discover relics.', 'artifact.cost': 'Upgrade · {cost}',
        'shop.regular': 'Regular', 'shop.progression': 'Progress', 'shop.limited': 'Limited', 'shop.pet': '3 spirit levels', 'shop.shards': '10 crafting shards', 'shop.chest': 'Expedition chest',
        'shop.chestInfo': 'Receive 10 crafting shards, 1 geode and 1 hero weapon.', 'shop.confirm': 'Spend {cost} gems.', 'shop.free': 'Daily free gems',
        'shop.unavailable': 'Payment offers require a connected store.', 'shop.locked': 'Claim after reaching the required milestone.',
        'skills.title': 'Talent Training', 'skills.points': 'Available {points} · Draft cost {cost}', 'skills.node': '{branch} {tier} · Lv {level}',
        'skills.info': 'Each next tier requires the previous node at level 3. Levels cost 1, 2, 3… points. Drafts take effect only after Apply.',
        'skills.resetConfirm': 'Reset all talents and refund spent points.',
        'perks.title': 'Expedition Blessings', 'perks.row': '{name} · Owned {count}', 'perks.info': 'Boost the related progression multiplier for five minutes.',
        'daily.title': 'Daily Tasks', 'daily.progress': '{current} / {goal}', 'daily.0': 'Daily attendance', 'daily.1': 'Tap 100 times', 'daily.2': 'Defeat 50 enemies', 'daily.3': 'Rebirth once',
        'daily.reward': 'Gems +{gems}', 'milestone.title': 'Expedition Milestones', 'milestone.row': 'Best stage {stage} · 25 gems / 5 shards',
        'inbox.title': 'Inbox', 'inbox.empty': 'No new messages.', 'offline.title': 'Welcome Back', 'offline.reward': 'Offline gold {gold}', 'offline.info': 'Collect up to eight hours of offline earnings.',
        'menu.title': 'Expedition Journal', 'menu.daily': 'Daily tasks', 'menu.milestones': 'Milestones', 'menu.raid': 'Solo raid', 'menu.cards': 'Raid cards', 'menu.event': 'Ember festival', 'menu.meta': 'Advanced growth',
        'menu.clan': 'Guild', 'menu.tournament': 'Tournament', 'menu.profile': 'Profile', 'menu.settings': 'Settings', 'menu.inbox': 'Inbox',
        'online.title': 'Online Services', 'online.unavailable': 'This build uses local saves. Real guilds, chat and tournament matchmaking require a connected server.',
        'profile.stats': 'Best stage {stage}\nRebirths {prestiges}\nEnemies defeated {kills}\nTotal taps {taps}\nRelics {artifacts}\nTotal spirit levels {pets}',
        'settings.language': 'Language', 'settings.audio': 'Sound {state}', 'settings.on': 'On', 'settings.off': 'Off', 'settings.about': 'Cocos Creator 3.8.8 · v0.1.0\nTTSofts · Independent retro idle RPG',
        'settings.save': 'Progress saved', 'settings.saveButton': 'Save now', 'settings.export': 'Export save data',
        'raid.title': 'Rift Raid', 'raid.portal': 'Portal {portal}', 'raid.desc': 'Choose three cards, then tap body parts for 30 seconds. Destroyed parts cannot be attacked.',
        'raid.locked': 'Raids unlock at best stage 100', 'raid.damage': 'Damage {damage} · {seconds}s', 'raid.result': 'Raid Results', 'raid.reward': 'Damage {damage}\nEssence +{dust}\n1 fragment for each used card',
        'raid.part': 'Part {part}', 'raid.deck': 'Deck {a} / {b} / {c}', 'raid.upgrade': 'Upgrade · {cost} essence', 'raid.card': 'Level {level} · Fragments {fragments}',
        'raid.dust': 'Essence {dust}', 'event.title': 'Ember Festival', 'event.balance': 'Festival tokens {tokens}', 'event.path': 'Reward path', 'event.board': 'Ruin exploration', 'event.rule': 'Defeat enemies for tokens. The reward path requires a token balance; exploration costs 20 tokens per tile.',
        'event.reward': '{tokens} tokens · 15 gems / 5 shards', 'event.tile': 'Explore {index}', 'event.found': 'Gems +{gems}',
        'meta.title': 'Advanced Growth', 'meta.souls': 'Soul collection', 'meta.gems': 'Star stones', 'meta.monuments': 'Monuments', 'meta.research': 'Soul research',
        'meta.soulInfo': 'Souls {souls} · Collected {count}/120\nUnlock at stage 100,000 or account age 30 days.',
        'meta.summon': 'Summon · 10 souls', 'meta.gemInfo': 'Geodes {geodes} · Collected {count}/24', 'meta.crack': 'Open geode', 'meta.stone': 'Star stone {index} · Lv {level}',
        'meta.monumentInfo': 'Unlock at stage 180,000\nSeason memories {value}', 'meta.monument': 'Monument {index} · Lv {level}', 'meta.researchNode': 'Research {index} · Lv {level}',
        'error.currency': 'Not enough currency.', 'error.locked': 'Not unlocked yet.', 'error.mana': 'Not enough mana or still on cooldown.',
        'error.full': 'The equipment vault is full.', 'error.complete': 'Collection complete.', 'error.invalid': 'Invalid request.', 'error.prerequisite': 'Upgrade the prerequisite talent first.',
        'error.protected': 'Locked or equipped items cannot be sold.', 'error.timer': 'Not ready yet.', 'error.claimed': 'Already claimed or requirements not met.',
        'error.save': 'Unable to read the save. Please preserve the original data.', 'error.storage': 'Unable to access save storage.', 'battle.failed': 'Time is up. Upgrade and challenge the boss again.',
        'battle.fight': 'Fight boss', 'battle.leave': 'Leave boss', 'unlock.pet': 'Spirit companions unlocked.', 'reward.done': 'Rewards received.',
        'fairy.title': 'A Guide’s Gift', 'fairy.reward': 'Expedition gold received.', 'empty': 'Nothing collected yet.',
    }
};
const pairs: Record<string, [
    string[],
    string[]
]> = {
    hero: [['로웬', '카엘', '세라', '브람', '이리스', '단테', '미라', '오린', '베라', '녹스', '리아', '에단', '실바', '카인', '루나', '레온', '아샤', '에코', '레이븐', '솔', '린', '아르곤', '제이드', '엘리온'], ['Rowen', 'Kael', 'Sera', 'Bram', 'Iris', 'Dante', 'Mira', 'Orin', 'Vera', 'Nox', 'Ria', 'Ethan', 'Silva', 'Kain', 'Luna', 'Leon', 'Asha', 'Echo', 'Raven', 'Sol', 'Lyn', 'Argon', 'Jade', 'Elion']],
    pet: [['불씨 여우', '바위 매', '그늘 늑대', '서리 사슴', '구리 뱀', '별빛 까마귀', '폭풍 표범', '청동 거북', '숲의 용', '황혼 독수리', '수정 도마뱀', '새벽 호랑이'], ['Ember Fox', 'Stone Hawk', 'Shade Wolf', 'Frost Stag', 'Copper Serpent', 'Star Raven', 'Storm Panther', 'Bronze Turtle', 'Grove Drake', 'Dusk Eagle', 'Crystal Lizard', 'Dawn Tiger']],
    spell: [['유성검', '날카로운 눈', '황금 손길', '불꽃검', '전장의 함성', '그림자 분신'], ['Meteor Blade', 'Keen Sight', 'Golden Touch', 'Flame Blade', 'Battle Cry', 'Shadow Echo']],
    branch: [['검술', '소환', '지휘', '비전', '암습', '연금'], ['Blade', 'Summon', 'Command', 'Arcane', 'Shadow', 'Alchemy']],
    slot: [['검', '투구', '갑옷', '오라', '문장'], ['Sword', 'Helm', 'Armor', 'Aura', 'Sigil']],
    rarity: [['일반', '희귀', '전설', '신화', '고유', '축제'], ['Common', 'Rare', 'Legendary', 'Mythic', 'Unique', 'Festival']],
    effect: [['모든 피해', '탭 피해', '동료 피해', '골드 획득'], ['All damage', 'Tap damage', 'Hero damage', 'Gold gain']],
};
for (const [prefix, [ko, en]] of Object.entries(pairs))
    ko.forEach((value, i) => { translations.ko[`${prefix}.${i}`] = value; translations.en[`${prefix}.${i}`] = en[i]; });
const relicKO = ['새벽의 검', '재의 왕관', '별의 나침반', '황금 잎', '용의 인장', '달의 수정', '바람의 서', '고대 동전', '붉은 랜턴', '철의 심장', '심연의 눈', '왕의 잔', '여명의 종', '운명의 바늘', '서리 거울', '영원의 불씨', '고대 망치', '까마귀 깃털', '균열 열쇠', '은빛 모래', '수호자의 약속', '파수꾼의 반지', '부서진 별', '흑요석 꽃', '정령의 뿔', '잊힌 악보', '태양의 파편', '황혼의 가면', '잿빛 모래시계', '마지막 봉화'];
const relicEN = ['Dawnblade', 'Ashen Crown', 'Star Compass', 'Golden Leaf', 'Drake Seal', 'Moon Crystal', 'Wind Codex', 'Ancient Coin', 'Red Lantern', 'Iron Heart', 'Abyssal Eye', 'Royal Chalice', 'Daybreak Bell', 'Fate Needle', 'Frost Mirror', 'Eternal Ember', 'Ancient Hammer', 'Raven Feather', 'Rift Key', 'Silver Sand', 'Guardian Oath', 'Warden Ring', 'Broken Star', 'Obsidian Bloom', 'Spirit Horn', 'Lost Score', 'Sun Fragment', 'Twilight Mask', 'Ash Hourglass', 'Last Beacon'];
relicKO.forEach((s, i) => { translations.ko[`artifact.${i}`] = s; translations.en[`artifact.${i}`] = relicEN[i]; });
for (let i = 0; i < 18; i++) {
    translations.ko[`card.${i}`] = ['폭발', '침식', '수호'][i % 3] + ' ' + String(Math.floor(i / 3) + 1);
    translations.en[`card.${i}`] = ['Burst', 'Affliction', 'Support'][i % 3] + ' ' + String(Math.floor(i / 3) + 1);
}
Object.assign(translations.ko, {
    "online.defaultName": "원정자", "online.guildName": "길드 이름 입력", "online.create": "길드 생성", "online.members": "길드원 {count}명", "online.join": "참가", "online.roster": "길드원", "online.guildRaid": "협동 레이드", "online.message": "메시지 입력", "online.send": "전송", "online.refresh": "새로고침", "online.leave": "길드 탈퇴", "online.leaveConfirm": "이 길드에서 탈퇴합니다. 길드장은 먼저 권한을 넘겨야 합니다.", "online.leader": "길드장", "online.member": "길드원", "online.transfer": "길드장 위임", "online.kick": "내보내기", "online.guildHP": "공동 보스 HP {hp}", "online.guildRaidInfo": "개발 서버 협동 공격: 12시간마다 3회.\n공격당 고정 피해 500이 서버에 반영됩니다.", "online.competitionInfo": "개발 대회는 하루마다 독립 원정으로 진행됩니다. 메인 월드 성장과 분리되며 순위는 서버에서 계산합니다.", "online.enter": "독립 원정 입장", "online.rank": "{rank}위 · {name}", "online.abyss": "심연의 원정", "online.upgradeMaster": "수호자 강화 · 현재 {level}레벨", "online.backMain": "메인 원정으로", "online.auth": "온라인 계정 인증이 필요합니다.", "online.noGuild": "가입한 길드가 없습니다.", "online.alreadyGuild": "이미 길드에 가입되어 있습니다.", "online.notFound": "대상을 찾을 수 없습니다.", "online.full": "길드 정원이 가득 찼습니다.", "online.transferFirst": "다른 길드원에게 길드장을 먼저 위임하세요.", "online.permission": "권한이 없습니다.", "online.noAttacks": "다음 주기까지 공격 횟수를 모두 사용했습니다.", "online.raidComplete": "공동 보스를 처치했습니다.", "online.notJoined": "대회에 먼저 참가하세요.", "online.ended": "대회가 종료되었습니다.", "online.notEnded": "아직 대회가 진행 중입니다.", "online.rateLimit": "잠시 후 다시 시도하세요.", "online.serverError": "서버 요청을 처리하지 못했습니다.", "online.unreachable": "개발 서버에 연결할 수 없습니다. 서버 실행 상태를 확인하세요."
});
Object.assign(translations.en, {
    "online.defaultName": "Wanderer", "online.guildName": "Enter guild name", "online.create": "Create guild", "online.members": "{count} members", "online.join": "Join", "online.roster": "Members", "online.guildRaid": "Guild raid", "online.message": "Enter message", "online.send": "Send", "online.refresh": "Refresh", "online.leave": "Leave guild", "online.leaveConfirm": "Leave this guild. Leaders must transfer ownership first.", "online.leader": "Leader", "online.member": "Member", "online.transfer": "Transfer leadership", "online.kick": "Remove member", "online.guildHP": "Shared boss HP {hp}", "online.guildRaidInfo": "Development co-op: 3 attacks every 12 hours.\nEach attack applies 500 server-confirmed damage.", "online.competitionInfo": "Development tournaments run daily in an independent expedition. Progress is separate from the main world and ranked by the server.", "online.enter": "Enter expedition", "online.rank": "#{rank} · {name}", "online.abyss": "Abyss Expedition", "online.upgradeMaster": "Upgrade guardian · Level {level}", "online.backMain": "Return to main", "online.auth": "Online account authentication required.", "online.noGuild": "You have not joined a guild.", "online.alreadyGuild": "Already a guild member.", "online.notFound": "Not found.", "online.full": "Guild is full.", "online.transferFirst": "Transfer leadership to another member first.", "online.permission": "Permission denied.", "online.noAttacks": "No attacks left until the next cycle.", "online.raidComplete": "The shared boss has been defeated.", "online.notJoined": "Join the tournament first.", "online.ended": "The tournament has ended.", "online.notEnded": "The tournament is still active.", "online.rateLimit": "Please try again shortly.", "online.serverError": "The server could not process the request.", "online.unreachable": "Cannot connect to the development server. Check that it is running."
});
Object.assign(translations.ko, {
    "menu.achievements": "업적", "achievement.title": "원정 업적", "achievement.0": "누적 탭", "achievement.1": "누적 처치", "achievement.2": "최고 구역", "achievement.3": "누적 환생", "spell.title": "주문", "spell.detail": "레벨 {level} · 수호자 {unlock}레벨 해금 · 마나 {mana}", "spell.multicast": "수호자 500레벨부터 활성 주문을 최대 3회 중첩할 수 있습니다.", "spell.swap": "이 슬롯의 주문을 교체합니다. 기존 주문의 활성 효과는 종료됩니다.", "spell.6": "쌍둥이 정령", "spell.7": "검의 폭풍", "spell.8": "천둥 포격", "spell.9": "황혼의 선물", "artifact.salvage": "유물 분해", "artifact.salvageInfo": "보석 20개를 사용하여 분해하고 강화에 투자한 조각의 80%를 돌려받습니다. 발견 비용은 환급하지 않습니다.", "artifact.enchant": "각성 · 조각 1,000", "artifact.enchantInfo": "30개 유물을 모두 보유해야 합니다. 각성한 유물은 분해할 수 없습니다.", "artifact.salvaged": "분해한 유물", "artifact.rebuyInfo": "보석 25개 · 1레벨로 복원", "equipment.bulk": "일괄 판매", "equipment.bulkInfo": "잠금·장착 장비를 제외한 모든 장비를 판매합니다.", "equipment.transmog": "외형 적용"
});
Object.assign(translations.en, {
    "menu.achievements": "Achievements", "achievement.title": "Expedition Achievements", "achievement.0": "Lifetime taps", "achievement.1": "Lifetime kills", "achievement.2": "Highest stage", "achievement.3": "Lifetime rebirths", "spell.title": "Spells", "spell.detail": "Level {level} · Guardian level {unlock} required · Mana {mana}", "spell.multicast": "At guardian level 500, active spells can stack up to three times.", "spell.swap": "Replace the spell in this slot. Its current active effect will end.", "spell.6": "Twin Spirits", "spell.7": "Blade Storm", "spell.8": "Thunder Volley", "spell.9": "Twilight Gift", "artifact.salvage": "Salvage relic", "artifact.salvageInfo": "Spend 20 gems to salvage and recover 80% of invested upgrade shards. Discovery costs are not refunded.", "artifact.enchant": "Enchant · 1,000 shards", "artifact.enchantInfo": "Requires all 30 relics. Enchanted relics cannot be salvaged.", "artifact.salvaged": "Salvaged Relics", "artifact.rebuyInfo": "25 gems · Restore at level 1", "equipment.bulk": "Bulk sell", "equipment.bulkInfo": "Sell all unequipped, unlocked equipment.", "equipment.transmog": "Appearance"
});
Object.assign(translations.ko, {
  "extra.hub": "성장과 축제",
  "extra.build": "빌드 개요",
  "extra.talents": "영구 성장 기록",
  "extra.perks": "선택 축복",
  "extra.petPuzzle": "정령 짝 맞추기",
  "extra.petMilestones": "정령 이정표",
  "extra.dustShop": "정수 상점",
  "extra.crystal": "카드 공명",
  "extra.souls": "영혼 소환",
  "extra.gems": "별빛 보석",
  "extra.monuments": "시즌 기념비",
  "extra.collectibles": "일일 수집 보상",
  "extra.cosmetics": "프로필 외형",
  "extra.notifications": "알림 설정",
  "extra.export": "저장 파일 내보내기",
  "extra.eventModes": "축제 모드",
  "extra.limited": "일일 특가",
  "extra.buildRow": "노드 레벨 {levels}\n현재 탭 피해 {damage}",
  "extra.mastery": "무기·두루마리 수집",
  "extra.crafting": "제작 누적",
  "extra.ascensions": "현재 동료 승천",
  "extra.talentValue": "누적 {value}",
  "extra.perk": "축복 {id}",
  "extra.owned": "보유 {count}",
  "extra.replace": "교체",
  "extra.perkWarning": "기존 축복의 활성 효과를 종료하고 선택을 교체합니다.",
  "extra.heroStats": "레벨 {level} · 승천 {ascensions}\n스킬 {skills} · 무기 {weapons} · 두루마리 {scrolls}",
  "extra.heroSkill": "동료 스킬 강화",
  "extra.ascend": "승천",
  "extra.ascendInfo": "동료 1,000레벨 필요. 레벨을 1로 되돌리고 피해 배율을 높입니다.",
  "extra.heroInfo": "스킬 해금: 레벨 10/25/50/100/200/400/800\n승천과 스킬은 환생 시 초기화됩니다.",
  "extra.puzzleInfo": "남은 시도 {energy} · 완성 {matches}/8\n같은 숫자 두 장을 찾으세요.",
  "extra.puzzleReward": "짝 완성: 정령 레벨 +1 · 모두 완성: 조각 +5",
  "extra.petTarget": "정령 총레벨 {target}",
  "extra.dustOffer": "조각 5개 · 비용 정수 20\n현재 정수 {dust}",
  "extra.crystalSlot": "공명 슬롯 {slot}",
  "extra.crystalRule": "카드 총레벨 {level}/1,000\n전투 중 변경 불가",
  "extra.cardBoost": "기본 {base} · 적용 {effective}",
  "extra.soulSummary": "영혼 {souls} · 소환 등급 {level}\n누적 연구 포인트 {points} · 배너 {banner}",
  "extra.banner": "배너 변경",
  "extra.summon": "{count}회 소환",
  "extra.levelAll": "전체 레벨업",
  "extra.titan": "영혼 {id}",
  "extra.titanStats": "레벨 {level} · 보유 {copies}\n다음 레벨 필요 {cost}",
  "extra.rarity": "희귀도 {rarity}",
  "extra.gemInfo": "희귀도 {rarity} · 효과 단계 {bonus}",
  "extra.mysticResearch": "신비 연구",
  "extra.researchPoints": "남은 연구 포인트 {points}",
  "extra.enchanted": "각성 상태 {value}",
  "extra.monumentRefund": "투자한 시즌 기억의 80%를 돌려받습니다. 각성한 기념비는 분해할 수 없습니다.",
  "extra.enchantChoices": "각성 후보",
  "extra.seasonRewards": "시즌 보상 우편",
  "extra.collectible.0": "길잡이 선물 3회",
  "extra.collectible.1": "장비 3개 획득",
  "extra.collectible.2": "알 1개 부화",
  "extra.mailReward": "보석 {gems} · 조각 {shards}",
  "extra.mail.welcome": "원정 지원품",
  "extra.mail.season": "기념비 시즌 종료 보상",
  "extra.mail.event": "축제 종료 보상",
  "extra.delete": "삭제",
  "extra.cosmetic.0": "망토",
  "extra.cosmetic.1": "테두리",
  "extra.cosmetic.2": "배경",
  "extra.style": "외형 {id}",
  "extra.browserOnly": "웹 빌드에서 사용할 수 있습니다.",
  "extra.notice.0": "알 부화",
  "extra.notice.1": "일일 보상",
  "extra.notice.2": "레이드",
  "extra.notice.3": "대회",
  "extra.notice.4": "축제",
  "extra.notice.5": "우편",
  "extra.eventShop": "축제 상점",
  "extra.alchemy": "연금술",
  "extra.drop": "행운 낙하",
  "extra.tower": "탐험의 탑",
  "extra.globalRaid": "공동 토벌",
  "extra.eventRanks": "토벌 기여 순위",
  "extra.contribution": "누적 피해 {value}",
  "extra.tokenCost": "축제 토큰 {count}개",
  "extra.alchemyInfo": "발견한 조합 {count}/10 · 토큰 {tokens}\n조합당 토큰 30개",
  "extra.ingredient": "재료 {id}",
  "extra.combine": "조합",
  "extra.dropBall": "구슬 떨어뜨리기",
  "extra.towerInfo": "{floor}층 · 열쇠 {keys}\n문 하나를 선택하세요.",
  "extra.door": "문 {id}",
  "extra.limitedOffer": "제작·카드 보급함",
  "extra.limitedInfo": "보석 100개 → 조각 20개 + 카드 조각 10개\n하루 한 번 구매"
});
Object.assign(translations.en, {
  "extra.hub": "Progression & Events",
  "extra.build": "Build Overview",
  "extra.talents": "Permanent Progression",
  "extra.perks": "Selected Blessings",
  "extra.petPuzzle": "Spirit Memory",
  "extra.petMilestones": "Spirit Milestones",
  "extra.dustShop": "Dust Shop",
  "extra.crystal": "Card Resonance",
  "extra.souls": "Soul Summoning",
  "extra.gems": "Starlight Gems",
  "extra.monuments": "Season Monuments",
  "extra.collectibles": "Daily Collections",
  "extra.cosmetics": "Profile Appearance",
  "extra.notifications": "Notifications",
  "extra.export": "Export Save",
  "extra.eventModes": "Festival Modes",
  "extra.limited": "Daily Offer",
  "extra.buildRow": "Node levels {levels}\nCurrent tap damage {damage}",
  "extra.mastery": "Weapons & Scrolls",
  "extra.crafting": "Lifetime Crafting",
  "extra.ascensions": "Current Hero Ascensions",
  "extra.talentValue": "Total {value}",
  "extra.perk": "Blessing {id}",
  "extra.owned": "Owned {count}",
  "extra.replace": "Replace",
  "extra.perkWarning": "Replace this blessing and end its active effect.",
  "extra.heroStats": "Level {level} · Ascensions {ascensions}\nSkills {skills} · Weapons {weapons} · Scrolls {scrolls}",
  "extra.heroSkill": "Upgrade Hero Skill",
  "extra.ascend": "Ascend",
  "extra.ascendInfo": "Requires hero level 1,000. Reset to level 1 and increase damage.",
  "extra.heroInfo": "Skill tiers: 10/25/50/100/200/400/800\nAscensions and skills reset on rebirth.",
  "extra.puzzleInfo": "Attempts {energy} · Matches {matches}/8\nFind two matching numbers.",
  "extra.puzzleReward": "Each pair: spirit level +1 · Complete: shards +5",
  "extra.petTarget": "Total spirit level {target}",
  "extra.dustOffer": "5 fragments · 20 dust\nOwned dust {dust}",
  "extra.crystalSlot": "Resonance Slot {slot}",
  "extra.crystalRule": "Total card level {level}/1,000\nCannot change during battle",
  "extra.cardBoost": "Base {base} · Effective {effective}",
  "extra.soulSummary": "Souls {souls} · Summon tier {level}\nLifetime research points {points} · Banner {banner}",
  "extra.banner": "Change Banner",
  "extra.summon": "Summon ×{count}",
  "extra.levelAll": "Level All",
  "extra.titan": "Soul {id}",
  "extra.titanStats": "Level {level} · Copies {copies}\nNext level costs {cost}",
  "extra.rarity": "Rarity {rarity}",
  "extra.gemInfo": "Rarity {rarity} · Effect tier {bonus}",
  "extra.mysticResearch": "Mystic Research",
  "extra.researchPoints": "Research points {points}",
  "extra.enchanted": "Enchantment {value}",
  "extra.monumentRefund": "Recover 80% of invested mementos. Enchanted monuments cannot be salvaged.",
  "extra.enchantChoices": "Enchantment Choices",
  "extra.seasonRewards": "Season Reward Mail",
  "extra.collectible.0": "Claim 3 Fairy Gifts",
  "extra.collectible.1": "Collect 3 Equipment",
  "extra.collectible.2": "Hatch 1 Egg",
  "extra.mailReward": "Gems {gems} · Shards {shards}",
  "extra.mail.welcome": "Expedition Supplies",
  "extra.mail.season": "Monument Season Rewards",
  "extra.mail.event": "Festival Rewards",
  "extra.delete": "Delete",
  "extra.cosmetic.0": "Cape",
  "extra.cosmetic.1": "Frame",
  "extra.cosmetic.2": "Background",
  "extra.style": "Style {id}",
  "extra.browserOnly": "Available in the web build.",
  "extra.notice.0": "Egg Ready",
  "extra.notice.1": "Daily Rewards",
  "extra.notice.2": "Raid",
  "extra.notice.3": "Tournament",
  "extra.notice.4": "Festival",
  "extra.notice.5": "Mail",
  "extra.eventShop": "Festival Shop",
  "extra.alchemy": "Alchemy",
  "extra.drop": "Fortune Drop",
  "extra.tower": "Exploration Tower",
  "extra.globalRaid": "Global Raid",
  "extra.eventRanks": "Raid Rankings",
  "extra.contribution": "Total damage {value}",
  "extra.tokenCost": "Festival tokens {count}",
  "extra.alchemyInfo": "Recipes {count}/10 · Tokens {tokens}\n30 tokens per combination",
  "extra.ingredient": "Ingredient {id}",
  "extra.combine": "Combine",
  "extra.dropBall": "Drop Ball",
  "extra.towerInfo": "Floor {floor} · Keys {keys}\nChoose a door.",
  "extra.door": "Door {id}",
  "extra.limitedOffer": "Crafting & Card Bundle",
  "extra.limitedInfo": "100 gems → 20 shards + 10 card fragments\nOnce per day"
});
Object.assign(translations.ko, {"extra.guildTools": "길드 관리·활동", "extra.guildSearch": "길드 검색", "extra.guildEdit": "길드 정보 편집", "extra.stickers": "스티커", "extra.guildLogs": "토벌 기록", "extra.guildVault": "길드 금고", "extra.retire": "토벌 재시작", "extra.search": "검색", "extra.description": "소개 입력", "extra.vaultInfo": "누적 기여 {damage}\n현재 12시간 주기 피해 1,000 달성 시\n보석 20개·조각 5개, 주기당 1회 수령", "extra.retireInfo": "길드장만 보스 체력을 초기화할 수 있습니다. 사용한 공격 횟수는 돌아오지 않습니다.", "extra.abyssShop": "독립 상점 · 보석 100", "extra.sticker.0": "좋아요!", "extra.sticker.1": "준비 완료!", "extra.sticker.2": "감사합니다!", "extra.sticker.3": "공격!", "extra.sticker.4": "잠시만요!", "extra.sticker.5": "축하합니다!"});
Object.assign(translations.en, {"extra.guildTools": "Guild Activities", "extra.guildSearch": "Find Guild", "extra.guildEdit": "Edit Guild", "extra.stickers": "Stickers", "extra.guildLogs": "Raid Log", "extra.guildVault": "Guild Vault", "extra.retire": "Restart Raid", "extra.search": "Search", "extra.description": "Enter Description", "extra.vaultInfo": "Total contribution {damage}\nReach 1,000 damage this 12-hour cycle\n20 gems + 5 shards, once per cycle", "extra.retireInfo": "Only the leader can reset boss health. Used attacks are not restored.", "extra.abyssShop": "Expedition Shop · 100 Gems", "extra.sticker.0": "Great!", "extra.sticker.1": "Ready!", "extra.sticker.2": "Thank you!", "extra.sticker.3": "Attack!", "extra.sticker.4": "One moment!", "extra.sticker.5": "Congratulations!"});
Object.assign(translations.ko, {'extra.serviceStatus':'서비스 상태','extra.serviceReady':'서비스 정상 · 버전 {version}','extra.maintenance':'서비스 점검 중입니다. 잠시 후 다시 연결하세요.','online.maintenance':'서버 점검 중입니다. 로컬 원정은 계속 플레이할 수 있습니다.'});
Object.assign(translations.en, {'extra.serviceStatus':'Service Status','extra.serviceReady':'Service available · Version {version}','extra.maintenance':'Service maintenance. Please reconnect later.','online.maintenance':'Server maintenance. Your local expedition remains available.'});
Object.assign(translations.ko, {'online.guildRaidInfo':'12시간마다 3회 · 30초 부위 전투\n서버에서 카드 발동과 피해를 계산합니다.','extra.raidPending':'진행 중인 토벌의 결과를 먼저 제출하세요.','extra.guildDeckInfo':'현재 선택 덱 · 서버 공용 카드 1레벨\n로컬 카드 강화는 솔로 레이드에 적용됩니다.','extra.raidSubmit':'토벌 결과 제출','extra.raidSummary':'피해 {damage} · 보스 HP {hp}\n카드별 기여: {cards}'});
Object.assign(translations.en, {'online.guildRaidInfo':'3 attempts per 12 hours · 30-second part battle\nCard triggers and damage are computed by the server.','extra.raidPending':'Submit your active raid result first.','extra.guildDeckInfo':'Selected deck · Server cards are level 1\nLocal card upgrades apply to solo raids.','extra.raidSubmit':'Submit Raid Result','extra.raidSummary':'Damage {damage} · Boss HP {hp}\nCard contribution: {cards}'});
Object.assign(translations.ko, {'extra.eventShards':'제작 조각 5개'});
Object.assign(translations.en, {'extra.eventShards':'5 Crafting Shards'});
Object.assign(translations.ko, {"extra.retry": "다시 연결", "extra.weapons": "동료 무기", "extra.scrolls": "두루마리", "extra.masterySets": "완성한 전체 세트 {sets}", "extra.craftPower": "누적 제작 조각 {spent}\n제작 피해 배율 ×{power}", "extra.set": "장비 세트 {id}", "extra.setDetails": "세트 부위", "extra.collected": "수집 완료", "extra.missing": "미수집", "extra.summonCost": "영혼 {count}개를 사용해 소환합니다.", "extra.summonResult": "소환 결과"});
Object.assign(translations.en, {"extra.retry": "Reconnect", "extra.weapons": "Hero Weapons", "extra.scrolls": "Scrolls", "extra.masterySets": "Complete full sets {sets}", "extra.craftPower": "Lifetime crafting shards {spent}\nCrafting damage ×{power}", "extra.set": "Equipment Set {id}", "extra.setDetails": "Set Pieces", "extra.collected": "Collected", "extra.missing": "Missing", "extra.summonCost": "Spend {count} souls to summon.", "extra.summonResult": "Summon Results"});
Object.assign(translations.ko, {'battle.defeated':'처치!'});
Object.assign(translations.en, {'battle.defeated':'Defeated!'});
Object.assign(translations.ko, {'layout.levelUp':'{cost}\n레벨 업','layout.prestigeDesc':'환생\n원정을 다시 시작하고\n기억 조각을 획득합니다.','layout.tapDamage':'{value} 탭 피해'});
Object.assign(translations.en, {'layout.levelUp':'{cost}\nLevel Up','layout.prestigeDesc':'Prestige\nRestart your adventure\nfor precious relics.','layout.tapDamage':'{value} Tap Damage'});
Object.assign(translations.ko, {'layout.masterName':'소드 마스터','layout.upgrade':'레벨 업','master.skills':'스킬 트리'});
Object.assign(translations.en, {'layout.masterName':'Sword Master','layout.upgrade':'Level Up','master.skills':'Skill Tree','master.prestige':'Prestige'});
Object.assign(translations.ko, {"complete.portals": "포털 선택", "complete.presets": "덱 프리셋", "complete.preset": "저장 덱 {slot}", "complete.saveDeck": "현재 덱 저장", "complete.dailyPortal": "일일 포털 보상", "complete.dailyPortalInfo": "서로 다른 포털 {count}/3 클리어\n먼지 50개 + 카드 조각 10개", "complete.portalReplay": "이전 포털에 재도전할 수 있습니다.", "complete.next": "다음", "complete.display": "화면 설정", "complete.scientific": "과학적 숫자 표기", "complete.effects": "전투 이펙트", "complete.support": "지원·저장 복구", "complete.supportInfo": "Cocos Creator 3.8.8 · 개발 빌드\n저장 파일을 내보내거나 복원할 수 있습니다. 복원 전 현재 진행을 백업합니다.\n온라인 기능은 로컬 개발 서버에 연결됩니다.", "complete.import": "저장 파일 가져오기", "complete.replaceSave": "선택한 저장으로 현재 진행을 교체합니다. 현재 진행은 복원 전 백업에 보관합니다.", "complete.account": "계정·클라우드 저장", "complete.rename": "이름 변경", "complete.cloudSave": "서버에 진행 저장", "complete.cloudLoad": "서버 진행 불러오기", "complete.cloudInfo": "서버 저장 버전 {version}", "complete.recoveryExport": "계정 복구 파일 내보내기", "complete.recoveryImport": "계정 복구 파일 가져오기", "complete.privateKey": "이 파일로 계정에 접근할 수 있습니다. 비공개로 보관하세요.", "complete.switchAccount": "복구 파일의 계정으로 전환합니다. 게임 진행은 자동 교체되지 않습니다.", "complete.serverCards": "길드 레이드 카드", "complete.serverCardInfo": "서버 저장 카드 · 먼지 {dust}\n길드 전투 제출 시 먼지·조각을 획득합니다.", "complete.cardProc.0": "4회 타격마다 카드 레벨 ×30 추가 피해", "complete.cardProc.1": "연속 타격 수(최대 20) × 카드 레벨 추가 피해", "complete.cardProc.2": "매 타격 카드 레벨 ×5 추가 피해", "online.saveConflict": "서버 저장이 변경되었습니다. 계정 화면을 다시 열어 확인하세요.", "extra.guildDeckInfo": "서버에 저장된 카드 레벨로 전투합니다.\n카드 레벨은 전투 시작 시 확정됩니다."});
Object.assign(translations.en, {"complete.portals": "Select Portal", "complete.presets": "Deck Presets", "complete.preset": "Saved Deck {slot}", "complete.saveDeck": "Save Current Deck", "complete.dailyPortal": "Daily Portal Reward", "complete.dailyPortalInfo": "Clear 3 different portals: {count}/3\n50 dust + 10 card fragments", "complete.portalReplay": "Replay an unlocked portal.", "complete.next": "Next", "complete.display": "Display Settings", "complete.scientific": "Scientific Notation", "complete.effects": "Combat Effects", "complete.support": "Support & Save Recovery", "complete.supportInfo": "Cocos Creator 3.8.8 · Development build\nExport or restore a save file. Current progress is backed up before restoration.\nOnline features use the local development server.", "complete.import": "Import Save File", "complete.replaceSave": "Replace current progress with this save. Your current progress is backed up first.", "complete.account": "Account & Cloud Save", "complete.rename": "Change Name", "complete.cloudSave": "Save Progress to Server", "complete.cloudLoad": "Load Server Progress", "complete.cloudInfo": "Server save revision {version}", "complete.recoveryExport": "Export Account Recovery", "complete.recoveryImport": "Import Account Recovery", "complete.privateKey": "This file grants account access. Keep it private.", "complete.switchAccount": "Switch to the account in this recovery file. Game progress is not replaced automatically.", "complete.serverCards": "Guild Raid Cards", "complete.serverCardInfo": "Server cards · Dust {dust}\nSubmit guild battles to earn dust and fragments.", "complete.cardProc.0": "Every fourth hit: card level ×30 bonus damage", "complete.cardProc.1": "Bonus damage: hit count (up to 20) × card level", "complete.cardProc.2": "Every hit: card level ×5 bonus damage", "online.saveConflict": "The server save changed. Reopen Account to review the latest revision.", "extra.guildDeckInfo": "Battles use your server card levels.\nLevels are locked when an attack begins."});
Object.assign(translations.ko, {'complete.craftPart':'조각 {cost}개로 선택한 세트 부위를 제작합니다.','complete.regular':'일반 토너먼트','complete.regularRule':'2일 주기 · 이전 일반 대회 성장을 이어갑니다.\n서버 원정 최고 스테이지로 순위를 계산합니다.\n개발 규칙이며 원작 매칭 규칙과 다릅니다.','complete.tournamentEnd':'종료: {time}','complete.rankInfo':'순위 {rank} · 최고 스테이지 {stage}\n현재 순위 기준 보석 {reward}개 + 조각 10개'});
Object.assign(translations.en, {'complete.craftPart':'Craft this set piece for {cost} shards.','complete.regular':'Regular Tournament','complete.regularRule':'2-day cycle · Continue your previous regular entry.\nRanked by highest server expedition stage.\nDevelopment rules differ from the source game.','complete.tournamentEnd':'Ends: {time}','complete.rankInfo':'Rank {rank} · Best stage {stage}\nAt this rank: {reward} gems + 10 shards'});
Object.assign(translations.ko, {'complete.history':'최고 스테이지 {stage} · {date}'});
Object.assign(translations.en, {'complete.history':'Best stage {stage} · {date}'});
Object.assign(translations.ko, {"complete.pile": "장비 {count}", "complete.drops": "획득 장비", "complete.unlocked": "새 기능 해금", "complete.unlock.8": "펫을 얻었습니다. 펫 탭에서 동료를 선택하고 알을 부화하세요.", "complete.unlock.15": "장비 드롭이 해금되었습니다. 장비 더미에서 획득한 장비를 확인하세요.", "complete.unlock.60": "환생이 해금되었습니다. 기억 조각으로 영구 성장을 시작하세요.", "complete.unlock.100": "솔로 레이드와 길드가 해금되었습니다.", "complete.unlock.1000": "독립 월드 대회가 해금되었습니다.", "complete.unlock.100000": "영혼 소환이 해금되었습니다.", "complete.unlock.180000": "기념물 성장이 해금되었습니다.", "complete.discoverMonument": "기념물 발견", "complete.monumentCost": "기억 {cost}개 · 미보유 기념물 무작위 발견", "complete.petDetail": "레벨 {level}\n장착 시 해당 피해 ×{active}\n미장착 시 해당 피해 ×{passive}\n레벨 100에 패시브 효율 100%", "complete.heroSkillInfo": "현재 DPS {damage}\n스킬 해금 요구 레벨 {level} · 단계별 피해 ×1.5"});
Object.assign(translations.en, {"complete.pile": "Gear {count}", "complete.drops": "Equipment Drops", "complete.unlocked": "Feature Unlocked", "complete.unlock.8": "Pets unlocked. Choose your companion and hatch eggs in the Pets tab.", "complete.unlock.15": "Equipment drops unlocked. Open the equipment pile to inspect your loot.", "complete.unlock.60": "Prestige unlocked. Use relics for permanent growth.", "complete.unlock.100": "Solo raids and guilds unlocked.", "complete.unlock.1000": "Independent world competitions unlocked.", "complete.unlock.100000": "Soul summoning unlocked.", "complete.unlock.180000": "Monument progression unlocked.", "complete.discoverMonument": "Discover Monument", "complete.monumentCost": "{cost} mementos · Discover a random unowned monument", "complete.petDetail": "Level {level}\nEquipped damage ×{active}\nPassive damage ×{passive}\nFull passive efficiency at level 100", "complete.heroSkillInfo": "Current DPS {damage}\nSkill unlock level {level} · ×1.5 damage per tier"});
Object.assign(translations.ko, {'complete.applied':'적용했습니다.'});
Object.assign(translations.en, {'complete.applied':'Applied successfully.'});
Object.assign(translations.ko, {"complete.reward.milestone": "최고 스테이지 {value} 달성!\n스킬 포인트 {count}개 획득", "complete.reward.weapon": "{hero}의 무기 획득!", "complete.reward.scroll": "{hero}의 두루마리 획득!", "complete.reward.weaponSet": "무기 전체 세트 {value}단계 완성!", "complete.reward.equipmentSet": "장비 세트 {value} 완성!\n모든 부위 수집 효과가 적용됩니다.", "complete.guildInfo": "길드 정보", "complete.joinGuild": "{name} 길드에 가입하시겠습니까?", "complete.guildInfoBody": "길드원 {count}/50\n{description}\n누적 피해 기여 {damage}", "complete.noDescription": "등록된 소개가 없습니다.", "complete.eventRules": "이벤트 규칙", "complete.eventRulesBody": "시즌 종료: {time}\n누적 획득 토큰 {tokens}\n보상 경로는 누적 획득량을 사용합니다. 상점에서 토큰을 써도 경로 진행은 유지됩니다.\n종료 후 남은 토큰 100개당 보석 1개를 우편으로 받습니다."});
Object.assign(translations.en, {"complete.reward.milestone": "Reached stage {value}!\nEarned {count} skill points", "complete.reward.weapon": "Weapon acquired for {hero}!", "complete.reward.scroll": "Scroll acquired for {hero}!", "complete.reward.weaponSet": "Full weapon set level {value} completed!", "complete.reward.equipmentSet": "Equipment set {value} completed!\nThe full-set bonus is now active.", "complete.guildInfo": "Guild Information", "complete.joinGuild": "Join {name}?", "complete.guildInfoBody": "Members {count}/50\n{description}\nTotal contributed damage {damage}", "complete.noDescription": "No description yet.", "complete.eventRules": "Event Rules", "complete.eventRulesBody": "Season ends: {time}\nLifetime season tokens: {tokens}\nThe reward path uses earned tokens. Spending tokens in shops does not reduce path progress.\nAt season end, every 100 remaining tokens become 1 gem sent by mail."});
Object.assign(translations.ko, {'complete.restoreBackup':'복원 전 백업으로 되돌리기'});
Object.assign(translations.en, {'complete.restoreBackup':'Undo Last Save Restoration'});
Object.assign(translations.ko, {'complete.exportFile':'내보내기'});
Object.assign(translations.en, {'complete.exportFile':'Export'});
Object.assign(translations.ko, {"money.store": "다이아 상점", "money.diamonds": "다이아 {count}개", "money.packInfo": "다이아 {count}개 지급", "money.balance": "보유 다이아 {count}개", "money.priceRegion": "한국 iOS 공개 가격 기준입니다. 실제 결제 전 스토어에서 최종 가격을 확인합니다.", "money.actualPrice": "연결된 스토어가 제공한 현재 가격입니다.", "money.pass": "시즌 패스", "money.passInfo": "현재 이벤트 종료까지 모든 광고 건너뛰기.\n추가 프리미엄 보상 구성은 아직 확정되지 않았습니다.", "money.starter": "스타터 번들", "money.special": "스페셜 번들", "money.bundleUnknown": "공개 가격은 확인했습니다. 계정·기간별 구성품을 확인한 뒤 구매할 수 있습니다.", "money.vip": "VIP · 광고 건너뛰기", "money.vipStatus": "VIP {tier} · {points} 포인트", "money.vipTier": "VIP {tier} · {points} 포인트", "money.vipBenefit.1": "환생 후 영웅 자동 해금·강화", "money.vipBenefit.2": "모든 유물 강화 버튼", "money.vipBenefit.3": "요정 광고 건너뛰기", "money.vipBenefit.4": "알 슬롯 2개 추가", "money.vipBenefit.5": "모든 광고 건너뛰기", "money.vipPass": "패스 만료: {time}", "money.noPass": "활성 패스 없음", "money.restore": "구매 복원", "money.retry": "미지급 구매·보상 다시 확인", "money.result": "구매·광고 결과", "money.confirm": "구매 확인", "money.confirmBody": "{name}\n{price}\n스토어 결제창에서 최종 승인합니다.", "money.purchased": "구매가 검증되어 보상을 지급했습니다.", "money.pending": "결제 승인을 기다리고 있습니다. 완료 후 미지급 확인에서 다시 연결하세요.", "money.cancelled": "구매를 취소했습니다. 비용이 청구되지 않았습니다.", "money.restored": "스토어 구매 내역을 확인했습니다. 이미 지급한 소모품은 중복 지급하지 않습니다.", "money.delivered": "확정된 미지급 보상을 확인했습니다.", "money.busy": "진행 중인 구매 또는 광고가 끝난 뒤 다시 시도하세요.", "money.storeUnavailable": "이 빌드에는 결제 스토어가 연결되지 않았습니다. 실제 청구와 상품 지급은 이루어지지 않았습니다.", "money.adsUnavailable": "광고 서비스가 연결되지 않았습니다. 시청 완료 보상은 지급되지 않았습니다.", "money.verification": "구매 또는 광고 완료를 검증하지 못했습니다. 다시 확인하세요.", "money.expired": "광고 요청이 만료되었습니다. 새로 요청하세요.", "money.limit": "이번 주기의 광고 보상 한도를 모두 사용했습니다.", "money.limitShort": "수령 완료", "money.disabled": "요정 광고 제안을 꺼 두었습니다. 요정 창에서 다시 켤 수 있습니다.", "money.fairy": "요정 선물", "money.fairyInfo": "기본 골드를 받거나 광고 보상을 확인하세요. 광고는 선택 사항입니다.", "money.fairyBonus": "요정 광고 보상", "money.adsOn": "요정 광고 제안 켜짐", "money.adsOff": "요정 광고 제안 꺼짐", "money.adPoints": "보상형 광고", "money.watch": "광고 보기", "money.adRule": "이번 주기 {used}/{limit}회\n다음 보상까지 {seconds}초", "money.optIn": "시청을 완료해야 보상을 받습니다. 취소·재고 없음·검증 실패 시 횟수를 소비하지 않습니다.", "money.adStatus.completed": "광고 보상을 지급했습니다.", "money.adStatus.cancelled": "시청을 취소했습니다. 보상 횟수는 그대로입니다.", "money.adStatus.no-fill": "현재 재생 가능한 광고가 없습니다. 잠시 후 다시 시도하세요.", "money.ad.fairy_diamond": "다이아 요정", "money.adReward.fairy_diamond": "다이아 10개 + 이벤트 토큰 15개\n하루 최대 5회", "money.ad.fairy_mana": "마나 요정", "money.adReward.fairy_mana": "최대 마나의 25% 회복", "money.ad.fairy_gold": "골드 요정", "money.adReward.fairy_gold": "현재 몬스터 골드 보상의 50배 획득", "money.ad.fairy_discount": "할인 요정", "money.adReward.fairy_discount": "60초 동안 마스터·영웅 골드 비용 90% 감소", "money.ad.fairy_skills": "주문 요정", "money.adReward.fairy_skills": "선택한 해금 주문을 마나 소모 없이 활성화", "money.ad.mega_boost": "메가 부스트", "money.adReward.mega_boost": "4시간 동안 모든 피해 2배", "money.ad.shop_chest": "광고 상자", "money.adReward.shop_chest": "장비 1개 보장 · 12시간마다 3회"});
Object.assign(translations.en, {"money.store": "Diamond Shop", "money.diamonds": "{count} Diamonds", "money.packInfo": "Receive {count} diamonds", "money.balance": "Balance: {count} diamonds", "money.priceRegion": "Reference: Korean iOS prices. Confirm the final price in the store before paying.", "money.actualPrice": "Current price provided by the connected store.", "money.pass": "Season Pass", "money.passInfo": "Skip all ads until the current event ends.\nAdditional premium reward contents are not yet confirmed.", "money.starter": "Starter Bundle", "money.special": "Special Bundle", "money.bundleUnknown": "The public price is confirmed. Purchase requires the account-specific offer contents to be confirmed.", "money.vip": "VIP & Ad Skip", "money.vipStatus": "VIP {tier} · {points} points", "money.vipTier": "VIP {tier} · {points} points", "money.vipBenefit.1": "Automatically unlock and upgrade heroes after prestige", "money.vipBenefit.2": "Upgrade all artifacts button", "money.vipBenefit.3": "Skip fairy ads", "money.vipBenefit.4": "Two additional egg slots", "money.vipBenefit.5": "Skip all ads", "money.vipPass": "Pass expires: {time}", "money.noPass": "No active pass", "money.restore": "Restore Purchases", "money.retry": "Retry Pending Purchases & Rewards", "money.result": "Purchase & Ad Result", "money.confirm": "Confirm Purchase", "money.confirmBody": "{name}\n{price}\nFinal approval happens in the store payment sheet.", "money.purchased": "Purchase verified and rewards delivered.", "money.pending": "Payment approval is pending. Use Retry Pending Purchases after approval.", "money.cancelled": "Purchase cancelled. You have not been charged.", "money.restored": "Store purchases checked. Previously delivered consumables are not granted twice.", "money.delivered": "Checked for verified undelivered rewards.", "money.busy": "Wait for the current purchase or ad to finish.", "money.storeUnavailable": "No payment store is connected to this build. No charge or product grant occurred.", "money.adsUnavailable": "The ad service is not connected. No ad-completion reward was granted.", "money.verification": "The purchase or ad completion could not be verified. Please retry.", "money.expired": "This ad request expired. Start a new request.", "money.limit": "You have reached this cycle’s ad reward limit.", "money.limitShort": "Limit Reached", "money.disabled": "Fairy ad offers are disabled. Enable them in the fairy panel.", "money.fairy": "Fairy Gift", "money.fairyInfo": "Claim basic gold or view an ad reward. Watching an ad is optional.", "money.fairyBonus": "Fairy Ad Rewards", "money.adsOn": "Fairy Ad Offers On", "money.adsOff": "Fairy Ad Offers Off", "money.adPoints": "Rewarded Ads", "money.watch": "Watch Ad", "money.adRule": "This cycle: {used}/{limit}\nNext reward in {seconds}s", "money.optIn": "Complete the ad to earn the reward. Cancellation, no fill, or verification failure does not consume a claim.", "money.adStatus.completed": "Ad reward delivered.", "money.adStatus.cancelled": "Ad cancelled. Your reward allowance is unchanged.", "money.adStatus.no-fill": "No ad is available right now. Try again later.", "money.ad.fairy_diamond": "Diamond Fairy", "money.adReward.fairy_diamond": "10 diamonds + 15 event tokens\nUp to 5 per day", "money.ad.fairy_mana": "Mana Fairy", "money.adReward.fairy_mana": "Restore 25% of maximum mana", "money.ad.fairy_gold": "Gold Fairy", "money.adReward.fairy_gold": "Receive 50× the current titan gold reward", "money.ad.fairy_discount": "Discount Fairy", "money.adReward.fairy_discount": "90% off master and hero gold costs for 60 seconds", "money.ad.fairy_skills": "Spell Fairy", "money.adReward.fairy_skills": "Activate selected unlocked spells without spending mana", "money.ad.mega_boost": "Mega Boost", "money.adReward.mega_boost": "2× all damage for 4 hours", "money.ad.shop_chest": "Video Ad Chest", "money.adReward.shop_chest": "1 guaranteed equipment · 3 claims per 12 hours"});
Object.assign(translations.ko, {"money.ad.fairy_gold_spree": "골드 러시 요정", "money.adReward.fairy_gold_spree": "5분 동안 획득 골드 10배", "money.ad.fairy_damage_spree": "피해 러시 요정", "money.adReward.fairy_damage_spree": "5분 동안 모든 피해 10배", "money.ad.fairy_equipment": "대장장이 요정", "money.adReward.fairy_equipment": "현재 장비보다 강한 희귀 장비 1개\n최고 스테이지 5,000 미만", "money.diamondStage": "다이아 요정은 최고 스테이지의 99% 미만 구간에서 보상을 받을 수 있습니다. 환생 후 다시 확인하세요.", "money.adReward.shop_chest": "장비 1개 보장 · 12시간마다 3회\n다음 상자는 5분 후", "money.adReward.fairy_diamond": "다이아 10개 + 이벤트 토큰 15개\n하루 5회 · 최고 스테이지 99% 미만"});
Object.assign(translations.en, {"money.ad.fairy_gold_spree": "Gold Spree Fairy", "money.adReward.fairy_gold_spree": "10× gold earned for 5 minutes", "money.ad.fairy_damage_spree": "Damage Spree Fairy", "money.adReward.fairy_damage_spree": "10× all damage for 5 minutes", "money.ad.fairy_equipment": "Blacksmith Fairy", "money.adReward.fairy_equipment": "1 rare equipment stronger than your equipped piece\nAvailable below maximum stage 5,000", "money.diamondStage": "Diamond fairy rewards require a stage below 99% of your maximum. Check again after prestige.", "money.adReward.shop_chest": "1 guaranteed equipment · 3 per 12 hours\n5 minutes between chests", "money.adReward.fairy_diamond": "10 diamonds + 15 event tokens\n5 per day · Below 99% of maximum stage"});
export function t(locale: Locale, key: string, args: Record<string, string | number> = {}): string {
    const template = translations[locale][key];
    if (template === undefined)
        throw Error(`Missing localization: ${locale}/${key}`);
    return template.replace(/\{(\w+)\}/g, (_, k) => { if (args[k] === undefined)
        throw Error(`Missing placeholder: ${key}/${k}`); return String(args[k]); });
}

Object.assign(translations.ko,{"balance.title": "성장 효과 분석", "balance.scope": "보석·영혼·연구·기념물", "balance.scopeInfo": "이 화면은 해당 성장 계층만 표시합니다. 효과 배율은 독립 구현 수치입니다.", "balance.factor": "적용 배율 ×{value}", "balance.stat.tap": "탭 피해", "balance.stat.hero": "동료 피해", "balance.stat.gold": "골드", "balance.source.stones": "보석", "balance.source.monuments": "기념물", "balance.source.titans": "영혼 레벨", "balance.source.mystic": "신비 연구", "balance.source.research": "금지된 연구"});
Object.assign(translations.en,{"balance.title": "Growth Effects", "balance.scope": "Gems, Souls, Research & Monuments", "balance.scopeInfo": "Only these growth layers are shown. Effect values use independent balance.", "balance.factor": "Applied multiplier \u00d7{value}", "balance.stat.tap": "Tap damage", "balance.stat.hero": "Hero damage", "balance.stat.gold": "Gold", "balance.source.stones": "Gemstones", "balance.source.monuments": "Monuments", "balance.source.titans": "Soul levels", "balance.source.mystic": "Mystic research", "balance.source.research": "Forbidden research"});

Object.assign(translations.ko,{"art.enemy.0": "뿔 달린 파수병", "art.enemy.1": "철갑 거인", "art.enemy.2": "외눈 수호자"});
Object.assign(translations.en,{"art.enemy.0": "Horned Sentinel", "art.enemy.1": "Ironclad Titan", "art.enemy.2": "Cyclops Guardian"});

Object.assign(translations.ko,{"online.unconfigured": "이 웹 미리보기에는 온라인 서버가 연결되지 않았습니다. 기본 전투와 로컬 성장은 이용할 수 있습니다.", "online.configInvalid": "서버 연결 주소 설정이 올바르지 않습니다.", "ops.recoverRewards": "미수령 서버 보상 복구", "ops.moderation": "채팅 차단·신고", "ops.blocks": "차단 목록", "ops.block": "이 사용자 차단", "ops.unblock": "차단 해제", "ops.report": "이 메시지 신고", "ops.reportConfirm": "이 길드 메시지를 신고 기록으로 제출합니다.", "ops.reported": "신고가 접수되었습니다.", "ops.group": "성장 등급별 최대 50명 그룹 · 동점은 먼저 도달한 순서"});

Object.assign(translations.en,{"online.unconfigured": "This web preview has no online server connected. Combat and local progression remain available.", "online.configInvalid": "The server endpoint configuration is invalid.", "ops.recoverRewards": "Recover Pending Server Rewards", "ops.moderation": "Block or Report Chat", "ops.blocks": "Blocked Players", "ops.block": "Block This Player", "ops.unblock": "Unblock", "ops.report": "Report This Message", "ops.reportConfirm": "Submit this guild message as a report.", "ops.reported": "Report recorded.", "ops.group": "Up to 50 players per progression bracket. Earlier scores win ties."});
