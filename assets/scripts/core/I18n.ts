import { applyMilitaryTheme } from './MilitaryTheme';
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
        'action.locked': '미해금', 'action.ready': '준비 완료', 'action.max': '최대', 'action.level': '레벨 {level}', 'action.cost': '비용 {cost}', 'action.buyLevel': '+{count} · {cost}',
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
        'action.locked': 'Locked', 'action.ready': 'Ready', 'action.max': 'MAX', 'action.level': 'Level {level}', 'action.cost': 'Cost {cost}', 'action.buyLevel': '+{count} · {cost}',
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
    hero: [["능선검사 로웬", "바람궁수 카엘", "수정술사 세라", "돌길지기 브람", "안개등불 이리스", "잔불창 단테", "샘물지기 미라", "절벽추적자 오린", "이끼약사 베라", "밤길정찰 녹스", "달빛채집가 리아", "구름대장장이 에단", "수풀창 실바", "파편검사 카인", "설원길잡이 루나", "봉화지기 레온", "바람무희 아샤", "메아리술사 에코", "깃털척후 레이븐", "햇살수도사 솔", "물안개검 린", "유적방패 아르곤", "옥빛연금사 제이드", "별길수호 엘리온"], ["Rowen of the Ridge", "Kael Windbow", "Sera Crystalweaver", "Bram Stonepath", "Iris Mistlamp", "Dante Emberspear", "Mira Springkeeper", "Orin Clifftracker", "Vera Mossmender", "Nox Nighttrail", "Ria Moongatherer", "Ethan Cloudsmith", "Silva Grovepike", "Kain Shardblade", "Luna Snowguide", "Leon Beaconkeeper", "Asha Winddancer", "Echo Valechanter", "Raven Featherscout", "Sol Sunmender", "Lyn Mistblade", "Argon Ruinshield", "Jade Mossalchemist", "Elion Starwarden"]],
    'hero.short': [["로웬", "카엘", "세라", "브람", "이리스", "단테", "미라", "오린", "베라", "녹스", "리아", "에단", "실바", "카인", "루나", "레온", "아샤", "에코", "레이븐", "솔", "린", "아르곤", "제이드", "엘리온"], ["Rowen", "Kael", "Sera", "Bram", "Iris", "Dante", "Mira", "Orin", "Vera", "Nox", "Ria", "Ethan", "Silva", "Kain", "Luna", "Leon", "Asha", "Echo", "Raven", "Sol", "Lyn", "Argon", "Jade", "Elion"]],
    pet: [["잔불꼬리 여우", "능선날개 매", "안개발 늑대", "빙화뿔 사슴", "녹빛고리 뱀", "별조각 까마귀", "바람점박이 표범", "이끼등 거북", "샘비늘 용", "노을깃 독수리", "유리등 도마뱀", "구름줄 호랑이"], ["Cindertail Fox", "Ridgewing Hawk", "Mistpaw Wolf", "Icebloom Stag", "Verdigris Coil", "Starshard Raven", "Galespot Panther", "Mossback Turtle", "Springscale Drake", "Roseplume Eagle", "Glassback Lizard", "Cloudstripe Tiger"]],
    spell: [['능선 유성', '결정의 눈', '샘의 공명', '잔불 칼날', '원정의 북소리', '안개 잔상'], ['Ridgefall', 'Crystal Sight', 'Spring Resonance', 'Cinder Edge', 'Expedition Drums', 'Mist Echo']],
    branch: [['검술', '소환', '지휘', '비전', '암습', '연금'], ['Blade', 'Summon', 'Command', 'Arcane', 'Shadow', 'Alchemy']],
    slot: [['검', '투구', '갑옷', '오라', '문장'], ['Sword', 'Helm', 'Armor', 'Aura', 'Sigil']],
    rarity: [['일반', '희귀', '전설', '신화', '고유', '축제'], ['Common', 'Rare', 'Legendary', 'Mythic', 'Unique', 'Festival']],
    effect: [['모든 피해', '탭 피해', '동료 피해', '골드 획득'], ['All damage', 'Tap damage', 'Hero damage', 'Gold gain']],
};
for (const [prefix, [ko, en]] of Object.entries(pairs))
    ko.forEach((value, i) => { translations.ko[`${prefix}.${i}`] = value; translations.en[`${prefix}.${i}`] = en[i]; });
const relicKO = ["능선의 첫 칼날", "잔불지기의 관", "별길 나침반", "샘가의 금빛 잎", "용샘 봉인", "달샘 수정", "바람골 기록", "잃어버린 원정화", "안개길 등불", "돌심장 핵", "깊은샘 렌즈", "구름봉 잔", "능선의 울림종", "별길 재봉침", "빙화 거울", "봉화의 씨앗", "유적장이 망치", "안개까마귀 깃", "샘문 열쇠", "달골 은모래", "첫 원정의 맹세", "능선지기 고리", "길잃은 별조각", "검은유리 꽃", "샘울림 뿔", "바람골 악보", "아침빛 운모", "노을지기 가면", "안개알 모래시계", "돌길의 마지막 등"];
const relicEN = ["First Ridgeblade", "Cinderkeeper Crown", "Startrail Compass", "Springbank Goldleaf", "Drakespring Seal", "Moonwell Crystal", "Windvale Chronicle", "Lost Expedition Coin", "Mistpath Lantern", "Stoneheart Core", "Deepwell Lens", "Cloudpeak Chalice", "Ridgechime Bell", "Startrail Needle", "Icebloom Mirror", "Beacon Seed", "Ruinsmith Hammer", "Mistraven Feather", "Springgate Key", "Moonvale Silver Sand", "First Expedition Oath", "Ridgekeeper Ring", "Wayward Starshard", "Blackglass Bloom", "Springecho Horn", "Windvale Score", "Morning Mica", "Rosewatch Mask", "Mistegg Hourglass", "Last Stonepath Lamp"];
relicKO.forEach((s, i) => { translations.ko[`artifact.${i}`] = s; translations.en[`artifact.${i}`] = relicEN[i]; });
for (let i = 0; i < 18; i++) {
    translations.ko[`card.${i}`] = ['폭발', '침식', '수호'][i % 3] + ' ' + String(Math.floor(i / 3) + 1);
    translations.en[`card.${i}`] = ['Burst', 'Affliction', 'Support'][i % 3] + ' ' + String(Math.floor(i / 3) + 1);
}
Object.assign(translations.ko, {
    "online.defaultName": "원정자", "online.guildName": "길드 이름 입력", "online.create": "길드 생성", "online.members": "길드원 {count}명", "online.join": "참가", "online.roster": "길드원", "online.guildRaid": "협동 레이드", "online.message": "메시지 입력", "online.send": "전송", "online.refresh": "새로고침", "online.leave": "길드 탈퇴", "online.leaveConfirm": "이 길드에서 탈퇴합니다. 길드장은 먼저 권한을 넘겨야 합니다.", "online.leader": "길드장", "online.member": "길드원", "online.transfer": "길드장 위임", "online.kick": "내보내기", "online.guildHP": "공동 보스 HP {hp}", "online.guildRaidInfo": "개발 서버 협동 공격: 12시간마다 3회.\n공격당 고정 피해 500이 서버에 반영됩니다.", "online.competitionInfo": "개발 대회는 하루마다 독립 원정으로 진행됩니다. 메인 월드 성장과 분리되며 순위는 서버에서 계산합니다.", "online.enter": "독립 원정 입장", "online.rank": "{rank}위 · {name}", "online.abyss": "심연의 원정", "online.upgradeMaster": "수호자 강화 · 현재 {level}레벨", "online.backMain": "메인 원정으로", "online.auth": "온라인 계정 인증이 필요합니다.", "online.noGuild": "가입한 길드가 없습니다.", "online.alreadyGuild": "이미 길드에 가입되어 있습니다.", "online.notFound": "대상을 찾을 수 없습니다.", "online.full": "길드 정원이 가득 찼습니다.", "online.transferFirst": "다른 길드원에게 길드장을 먼저 위임하세요.", "online.permission": "권한이 없습니다.", "online.noAttacks": "다음 주기까지 공격 횟수를 모두 사용했습니다.", "online.raidComplete": "공동 보스를 처치했습니다.", "online.notJoined": "대회에 먼저 참가하세요.", "online.ended": "대회가 종료되었습니다.", "online.notEnded": "아직 대회가 진행 중입니다.", "online.rateLimit": "잠시 후 다시 시도하세요.", "online.serverError": "서버 요청을 처리하지 못했습니다.", "online.unreachable": "게임 서버에 연결할 수 없습니다. 네트워크를 확인하고 다시 시도하세요."
});
Object.assign(translations.en, {
    "online.defaultName": "Wanderer", "online.guildName": "Enter guild name", "online.create": "Create guild", "online.members": "{count} members", "online.join": "Join", "online.roster": "Members", "online.guildRaid": "Guild raid", "online.message": "Enter message", "online.send": "Send", "online.refresh": "Refresh", "online.leave": "Leave guild", "online.leaveConfirm": "Leave this guild. Leaders must transfer ownership first.", "online.leader": "Leader", "online.member": "Member", "online.transfer": "Transfer leadership", "online.kick": "Remove member", "online.guildHP": "Shared boss HP {hp}", "online.guildRaidInfo": "Development co-op: 3 attacks every 12 hours.\nEach attack applies 500 server-confirmed damage.", "online.competitionInfo": "Development tournaments run daily in an independent expedition. Progress is separate from the main world and ranked by the server.", "online.enter": "Enter expedition", "online.rank": "#{rank} · {name}", "online.abyss": "Abyss Expedition", "online.upgradeMaster": "Upgrade guardian · Level {level}", "online.backMain": "Return to main", "online.auth": "Online account authentication required.", "online.noGuild": "You have not joined a guild.", "online.alreadyGuild": "Already a guild member.", "online.notFound": "Not found.", "online.full": "Guild is full.", "online.transferFirst": "Transfer leadership to another member first.", "online.permission": "Permission denied.", "online.noAttacks": "No attacks left until the next cycle.", "online.raidComplete": "The shared boss has been defeated.", "online.notJoined": "Join the tournament first.", "online.ended": "The tournament has ended.", "online.notEnded": "The tournament is still active.", "online.rateLimit": "Please try again shortly.", "online.serverError": "The server could not process the request.", "online.unreachable": "Cannot connect to the game server. Check your network and try again."
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
  "extra.cardType.0":"폭발", "extra.cardType.1":"지속", "extra.cardType.2":"지원",
  "extra.crystalSlot": "공명 슬롯 {slot}",
  "extra.crystalRule": "{type} · {card}\n총레벨 {level}/{required} · 기준 Lv.{base}",
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
  "extra.cardType.0":"Burst", "extra.cardType.1":"Affliction", "extra.cardType.2":"Support",
  "extra.crystalSlot": "Resonance Slot {slot}",
  "extra.crystalRule": "{type} · {card}\nTotal {level}/{required} · Reference Lv.{base}",
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
Object.assign(translations.ko, {'layout.masterName':'능선 수호자','layout.upgrade':'레벨 업','master.skills':'스킬 트리'});
Object.assign(translations.en, {'layout.masterName':'Ridge Guardian','layout.upgrade':'Level Up','master.skills':'Skill Tree','master.prestige':'Prestige'});
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

Object.assign(translations.ko,{"live.0": "공지", "live.1": "등록된 공지가 없습니다.", "live.2": "앱 업데이트 필요", "live.3": "새 버전으로 업데이트한 후 계속할 수 있습니다.", "live.4": "업데이트", "live.5": "다시 확인", "live.6": "소식과 알림", "live.7": "공지", "live.8": "업데이트 확인", "live.9": "앱 업데이트", "live.10": "현재 버전: ", "live.11": "최신 운영 설정을 확인했습니다.", "live.12": "확인함", "live.13": "받은함", "live.14": "우편이 없습니다.", "live.15": "이 우편을 삭제할까요?", "live.16": "브라우저 설정에서 알림 권한을 확인하세요.", "live.17": "소식·공지·업데이트"});
Object.assign(translations.en,{"live.0": "Notices", "live.1": "No notices available.", "live.2": "App Update Required", "live.3": "Update the app to continue.", "live.4": "Update", "live.5": "Check Again", "live.6": "News & Notifications", "live.7": "Notices", "live.8": "Check for Updates", "live.9": "App Update", "live.10": "Current version: ", "live.11": "Latest policy checked.", "live.12": "Confirmed", "live.13": "Inbox", "live.14": "No mail.", "live.15": "Delete this mail?", "live.16": "Check notification permission in browser settings.", "live.17": "News \u00b7 Notices \u00b7 Updates"});

Object.assign(translations.ko,{"game.name":"tapWar"});
Object.assign(translations.en,{"game.name":"tapWar"});

Object.assign(translations.ko,{'firebase.guest':'Firebase 게스트 계정','firebase.guestInfo':'이 기기의 게스트 계정입니다. 앱·사이트 데이터 삭제 시 접근할 수 없습니다.','online.saveConflict':'다른 저장이 먼저 변경되었습니다. 계정 화면을 다시 열어 확인하세요.'});
Object.assign(translations.en,{'firebase.guest':'Firebase guest account','firebase.guestInfo':'Guest account belongs to this device. Clearing app or site data loses access.','online.saveConflict':'Another save changed first. Reopen the account screen to review it.'});
Object.assign(translations.ko,{
 'ops.privacyTitle':'온라인 저장 안내','ops.privacyBody':'온라인 기능은 계정 ID와 게임 진행을 서버에 저장합니다. 오류 보고에는 인증 정보나 전체 저장 파일을 포함하지 않습니다. 공지 알림 동의는 별도로 선택합니다.','ops.onlineContinue':'확인하고 시작','ops.connectTitle':'운영 서버 연결 필요','ops.connectBody':'최신 운영 설정과 계정 저장을 확인하지 못했습니다. 연결을 확인한 뒤 다시 시도하세요.','ops.conflictTitle':'다른 기기의 저장 확인','ops.pushTitle':'공지 알림을 받을까요?','ops.pushBody':'새 공지를 Android 알림으로 알려드립니다. 게임 설정에서 언제든 끌 수 있습니다.','ops.pushDecline':'받지 않기','ops.pushAllow':'알림 켜기','ops.pushUnsupported':'공지 푸시는 Android에서 사용할 수 있습니다. 이 프로토타입의 웹·iOS에서는 앱 안의 공지를 확인하세요.','ops.pushEnabled':'앱 알림과 기기 권한이 켜져 있습니다.','ops.pushDisabled':'앱 알림 선택과 기기 알림 권한을 각각 확인하세요.','ops.osSettings':'기기 알림 설정 열기','ops.mailRewards':'보석 {gems} · 조각 {shards}\n가루 {dust} · 정령 레벨 {petLevels}','ops.googleUnconfigured':'이 프로젝트의 Google 계정 연결 설정이 아직 준비되지 않았습니다. 현재 계정의 서버 저장은 계속 사용할 수 있습니다.','ops.versionChange':'{current} → {target}','ops.currentVersion':'현재 버전: {version}\n{status}','ops.inboxCount':'{title} · {count}','ops.messageRewards':'{body}\n\n{rewards}','ops.googleLink':'Google 계정 연결','ops.googleLinked':'Google 계정이 연결되었습니다.','ops.googleCollision':'이미 다른 게임 계정에 연결된 Google 계정입니다. 자동으로 병합하지 않습니다.'
});
Object.assign(translations.en,{
 'ops.privacyTitle':'Online Save Information','ops.privacyBody':'Online features store your account ID and game progress on the server. Error reports exclude credentials and full saves. Notice notifications require a separate choice.','ops.onlineContinue':'Confirm and Start','ops.connectTitle':'Operations Server Required','ops.connectBody':'The latest policy and account save could not be checked. Check your connection and retry.','ops.conflictTitle':'Review Another Device Save','ops.pushTitle':'Receive Notice Notifications?','ops.pushBody':'Get new notices as Android notifications. You can disable them in game settings at any time.','ops.pushDecline':'No Thanks','ops.pushAllow':'Enable Notifications','ops.pushUnsupported':'Notice push is available on Android. In this web or iOS prototype, read notices inside the app.','ops.pushEnabled':'App notifications and device permission are enabled.','ops.pushDisabled':'Check both your app choice and device notification permission.','ops.osSettings':'Open Device Notification Settings','ops.mailRewards':'Gems {gems} · Shards {shards}\nDust {dust} · Pet levels {petLevels}','ops.googleUnconfigured':'Google account linking is not configured for this project yet. Your current account can still use server saves.','ops.versionChange':'{current} → {target}','ops.currentVersion':'Current version: {version}\n{status}','ops.inboxCount':'{title} · {count}','ops.messageRewards':'{body}\n\n{rewards}','ops.googleLink':'Link Google Account','ops.googleLinked':'Google account linked.','ops.googleCollision':'This Google account belongs to another game account. Accounts are not merged automatically.'
});
Object.assign(translations.ko,{'art.enemy.golem':'고대 석판 골렘','art.enemy.forest-wolf':'민트 숲 늑대','art.enemy.spectral-knight':'유령 기사','art.enemy.flame-spirit':'화염 정령','art.enemy.skeleton':'해골 전사','art.enemy.tree-boss':'고목 수문장','art.enemy.ice-boss':'빙하 골렘','art.enemy.crystal-boss':'수정 골렘'});
Object.assign(translations.en,{'art.enemy.golem':'Ancient Stone Golem','art.enemy.forest-wolf':'Forest Wolf','art.enemy.spectral-knight':'Spectral Knight','art.enemy.flame-spirit':'Flame Spirit','art.enemy.skeleton':'Skeleton Warrior','art.enemy.tree-boss':'Ancient Treant','art.enemy.ice-boss':'Ice Golem','art.enemy.crystal-boss':'Crystal Golem'});

Object.assign(translations.ko,{
 "entry.subtitle": "작은 불씨에서 시작되는 끝없는 원정",
 "entry.start": "게임 시작",
 "entry.logout": "로그아웃",
 "entry.logoutBody": "진행을 저장하고 타이틀로 돌아갑니다. Google에 연결하지 않은 게스트 계정은 로그아웃 후 다시 접속할 수 없습니다. 계속할까요?",
 "entry.titleHint": "용사를 키우고, 동료와 함께 탑을 오르세요.",
 "entry.version": "TT Softs · v{version}",
 "entry.consentTitle": "게임 이용 동의",
 "entry.consentIntro": "로그인 전에 이용약관과 개인정보 수집·이용 내용을 확인해 주세요.",
 "entry.required": "{mark} [필수] {title}",
 "entry.agree": "동의하고 계속",
 "entry.readBoth": "두 문서를 모두 확인해 주세요",
 "entry.readHint": "각 문서를 끝까지 읽고 동의할 수 있습니다.",
 "entry.readToEnd": "끝까지 읽어 주세요",
 "entry.documentAgree": "내용을 확인하고 동의",
 "entry.pushTitle": "공지 알림 선택",
 "entry.pushBody": "새 공지와 원정 소식을 알림으로 받을 수 있습니다.\n\n알림은 선택 사항입니다. 받지 않아도 플레이할 수 있고, 설정에서 언제든 변경할 수 있습니다.\n\n이 프로토타입의 푸시 수신은 Android에서 지원합니다.",
 "entry.loginTitle": "원정 계정 선택",
 "entry.loginBody": "계정을 선택하면 저장된 원정을 불러옵니다.",
 "entry.google": "Google로 로그인",
 "entry.guest": "게스트로 시작 / 계속",
 "entry.guestWarning": "게스트 계정은 이 기기에 저장됩니다. 앱이나 사이트 데이터를 지우면 복구가 어려우므로 계정 화면에서 Google 연결을 권장합니다.",
 "entry.loadingTitle": "원정 준비 중",
 "entry.loadAuth": "계정을 확인하고 있습니다.",
 "entry.loadPolicy": "운영 설정과 버전을 확인하고 있습니다.",
 "entry.loadSave": "저장된 원정을 불러오고 있습니다.",
 "entry.loadReady": "공지와 우편을 정리하고 있습니다.",
 "entry.percent": "{value}%",
 "entry.errorTitle": "원정을 시작하지 못했습니다.",
 "entry.backLogin": "로그인 화면으로",
 "entry.cancelled": "Google 로그인이 취소되었습니다. 계정을 다시 선택해 주세요.",
 "entry.popupBlocked": "로그인 팝업이 차단되었습니다. 이 사이트의 팝업을 허용한 뒤 다시 시도해 주세요.",
 "entry.domainBlocked": "이 실행 주소의 Google 로그인이 아직 등록되지 않았습니다.",
 "entry.switchTitle": "다른 Google 계정으로 이동",
 "entry.switchBody": "선택한 Google 계정에 이미 다른 원정이 있습니다. 그 계정의 저장을 불러옵니다. 현재 게스트 원정은 자동으로 합쳐지지 않습니다. 계속할까요?",
 "consent.terms.title": "서비스 이용약관",
 "consent.terms.summary": "계정, 게임 데이터와 서비스 이용 조건",
 "consent.privacy.title": "개인정보 수집·이용",
 "consent.privacy.summary": "수집 항목, 목적, 보유 기간과 이용자 권리",
 "consent.terms.body": "tapWar 서비스 이용약관\n시행일: 2026년 10월 4일\n운영자: TT Softs\n\n1. 서비스와 이용 조건\n이 약관은 TT Softs가 제공하는 tapWar 게임과 계정·저장 서비스를 이용하는 조건을 설명합니다. 약관과 개인정보 수집·이용 내용에 동의한 후 로그인할 수 있습니다. 만 14세 미만은 이용할 수 없습니다.\n\n2. 계정과 보안\n게스트 또는 Google 계정을 사용할 수 있습니다. 게스트는 앱 삭제·기기 변경·사이트 데이터 삭제 시 접근 수단을 잃을 수 있습니다. Google 연결을 권장하며, 다른 계정의 게임 데이터는 자동으로 병합하지 않습니다. 타인의 계정을 도용하거나 양도해서는 안 됩니다.\n\n3. 게임 진행과 가상 항목\n골드, 보석, 장비와 보상은 게임 안에서 사용하는 가상 항목이며 현금으로 교환할 수 없습니다. 서버에서 마지막으로 확인한 저장을 기준으로 복원합니다. 여러 기기에서 동시에 플레이하면 저장 충돌이 발생할 수 있으며 최신 데이터를 확인한 후 다시 시작해야 합니다.\n\n4. 보상·광고·결제\n공지, 이벤트와 무료 보상은 운영 설정에 따라 제공됩니다. 광고 보상은 선택한 광고를 완료하고 서버 검증을 통과해야 지급됩니다. 광고 개인정보 선택은 최초 이용 동의와 별도로 관리합니다. 결제가 제공되는 경우 가격, 구성과 환불은 구매 화면 및 앱 마켓 정책을 따릅니다. 테스트로 표시된 기능은 실제 구매가 아닙니다.\n\n5. 금지 행위와 서비스 변경\n데이터 변조, 취약점 악용, 부정 보상 획득, 계정 도용과 운영을 방해하는 행위는 금지됩니다. 확인된 부정 이용은 제한될 수 있습니다. 점검·장애·서비스 변경은 가능한 범위에서 공지로 안내합니다.\n\n6. 탈퇴와 문의\n계정 이용 중단, 개인정보 확인·삭제와 동의 철회는 아래 연락처로 요청할 수 있습니다. 본인 확인 후 처리하며 법정 보관 의무가 있는 정보는 해당 기간 동안 분리 보관할 수 있습니다.\n고객 문의: admin.ttsoft@gmail.com\n\n현재 프로토타입의 서비스 구성을 설명하는 문서입니다. 정식 출시 전 실제 운영·결제·개인정보 처리 내용을 기준으로 확정합니다.",
 "consent.privacy.body": "tapWar 개인정보 수집·이용 안내\n시행일: 2026년 10월 4일\n운영자 및 개인정보 문의: TT Softs\nadmin.ttsoft@gmail.com\n\n1. 필수 수집 항목\nFirebase 사용자 식별자(UID), 로그인 제공자 구분, Google 로그인에서 전달하는 최소 계정 정보, 닉네임과 프로필 설정, 게임 진행·재화·아이템·해금 상태, 공지 확인·우편 보상 기록을 처리합니다.\n앱 버전, 운영체제, 접속 시각, 오류·보안 로그 및 서버 접속 과정에서 생성되는 IP 주소 등 기술 정보가 처리될 수 있습니다. 오류 보고에는 인증 토큰이나 전체 저장 파일을 포함하지 않습니다.\n\n2. 수집·이용 목적\n로그인과 계정 식별, 게임 진행 저장과 다른 기기의 복원, 보상 중복 수령 방지, 공지·우편 제공, 보안·오류 분석과 고객 문의 처리를 위해 사용합니다.\n필수 정보 수집·이용 동의를 거부할 수 있습니다. 거부하면 계정 식별과 서버 저장을 제공할 수 없어 로그인 및 게임 서비스를 이용할 수 없습니다.\n\n3. 수집 방법과 처리 위탁\n이용자가 입력한 정보와 게임 이용 중 생성되는 정보를 Firebase Authentication, Cloud Firestore, Cloud Functions 및 서버 통신을 통해 처리합니다. Google LLC의 국내외 인프라에서 처리될 수 있습니다. 전송에는 암호화된 연결을 사용합니다. 정식 출시 전 실제 수탁자·이전 국가·방법·시점과 보관 기간을 운영 형태에 맞춰 고지합니다.\n\n4. 보유 및 이용 기간\n회원 탈퇴, 삭제 요청 또는 처리 목적 달성 시 삭제합니다. 다만 관련 법령이 보관을 요구하거나 부정 이용·분쟁 처리에 필요한 최소 정보는 해당 목적과 기간 동안 분리 보관할 수 있습니다. 게스트 접근 수단을 잃으면 본인 확인과 복원이 어려울 수 있습니다.\n\n5. 선택 알림과 광고\n공지 알림 동의는 별도로 선택합니다. 알림을 켜면 기기 알림 토큰과 언어별 공지 구독 설정을 Firebase Cloud Messaging으로 처리합니다. 설정에서 끌 수 있으며 동의하지 않아도 플레이할 수 있습니다.\n광고 식별자·맞춤형 광고 선택은 이 필수 동의에 포함하지 않습니다. 모바일 광고가 활성화되는 경우 Google User Messaging Platform의 별도 화면에서 선택·변경할 수 있습니다.\n\n6. 이용자의 권리와 보호 조치\n이용자는 개인정보 열람, 정정, 삭제, 처리정지와 동의 철회를 요청할 수 있습니다. 본인 확인 후 처리합니다. 인증·접근 권한·서버 보안 규칙·암호화 전송을 적용합니다. 법령상 근거 또는 별도 동의 없이 개인정보를 판매하거나 제3자에게 제공하지 않습니다.\n\n7. 문의와 변경\n개인정보 문의: admin.ttsoft@gmail.com\n중요한 변경은 앱 공지로 안내합니다. 이 문서는 현재 프로토타입 구성을 반영하며, 정식 출시 전 사업자 정보와 실제 처리 현황을 확정합니다.",
 "layout.collapse": "메뉴 접기 ▾",
 "layout.expand": "메뉴 펼치기 ▴",
 "unlock.title": "조금 더 원정해 주세요",
 "unlock.stage": "{name}은 최고 구역 {stage}에서 열립니다.",
 "unlock.view": "새 기능 확인",
 "tutorial.welcomeTitle": "첫 원정을 시작해 볼까요?",
 "tutorial.welcomeBody": "전장을 탭해 적을 처치하고 골드를 얻으세요.\n용사를 강화하고 첫 동료를 고용하는 방법을 차례로 알려드릴게요.",
 "tutorial.begin": "따라 해 보기",
 "tutorial.step": "첫 원정 안내 · {step} / {total}",
 "tutorial.skip": "건너뛰기",
 "tutorial.skipTitle": "안내를 마칠까요?",
 "tutorial.skipBody": "설정에서 첫 원정 안내를 다시 볼 수 있습니다. 기능은 구역 진행에 따라 열립니다.",
 "tutorial.step1": "빛나는 전장을 3번 탭해 보세요.\n적을 공격하면 골드를 얻습니다.",
 "tutorial.step2": "아래의 레벨업 버튼을 눌러\n용사를 한 단계 강화하세요.",
 "tutorial.step3": "하단의 동료 탭을 열어 보세요.\n동료는 자동으로 공격합니다.",
 "tutorial.step4": "첫 동료 능선검사 로웬을 고용하세요.\n골드가 모자라면 전장을 더 탭하세요.",
 "tutorial.step5": "메뉴 접기를 눌러 보세요.\n전장이 넓어집니다.",
 "tutorial.step6": "메뉴 펼치기를 눌러 돌아오세요.\n계속 탑을 오르면 새 기능이 열립니다.",
 "tutorial.replay": "첫 원정 안내 다시 보기",
 "tutorial.replayBody": "게임 진행을 유지하고 기본 조작 안내를 처음부터 다시 표시합니다.",
 "tutorial.complete": "원정 준비 완료! 탭과 강화를 이어가세요."
});

Object.assign(translations.en,{
 "entry.subtitle": "An endless expedition starts with one ember",
 "entry.start": "Start Game",
 "entry.logout": "Log out",
 "entry.logoutBody": "Save progress and return to the title. A guest account that is not linked to Google cannot be accessed again after logout. Continue?",
 "entry.titleHint": "Grow your guardian. Climb the tower together.",
 "entry.version": "TT Softs · v{version}",
 "entry.consentTitle": "Before You Play",
 "entry.consentIntro": "Read the Terms of Service and Privacy Notice before signing in.",
 "entry.required": "{mark} [Required] {title}",
 "entry.agree": "Agree and Continue",
 "entry.readBoth": "Read both documents first",
 "entry.readHint": "Read each document to the end before agreeing.",
 "entry.readToEnd": "Read to the end",
 "entry.documentAgree": "I have read and agree",
 "entry.pushTitle": "Notice Notifications",
 "entry.pushBody": "Receive new notices and expedition news.\n\nNotifications are optional. You can play without them and change your choice in Settings.\n\nThis prototype supports push delivery on Android.",
 "entry.loginTitle": "Choose Your Account",
 "entry.loginBody": "Choose an account to restore your expedition.",
 "entry.google": "Sign in with Google",
 "entry.guest": "Start / Continue as Guest",
 "entry.guestWarning": "Guest access is stored on this device. Deleting app or site data can lose access. Link Google in Account to protect your progress.",
 "entry.loadingTitle": "Preparing Your Expedition",
 "entry.loadAuth": "Checking your account…",
 "entry.loadPolicy": "Checking policy and app version…",
 "entry.loadSave": "Restoring your expedition…",
 "entry.loadReady": "Checking notices and mail…",
 "entry.percent": "{value}%",
 "entry.errorTitle": "Could Not Start",
 "entry.backLogin": "Return to Sign In",
 "entry.cancelled": "Google sign-in was cancelled. Choose your account again.",
 "entry.popupBlocked": "The sign-in popup was blocked. Allow popups for this site and retry.",
 "entry.domainBlocked": "Google sign-in is not registered for this address yet.",
 "entry.switchTitle": "Switch Google Account",
 "entry.switchBody": "This Google account already has another expedition. Its saved progress will be loaded. Your guest progress will not be merged automatically. Continue?",
 "consent.terms.title": "Terms of Service",
 "consent.terms.summary": "Accounts, game data and service conditions",
 "consent.privacy.title": "Privacy Notice",
 "consent.privacy.summary": "Data, purposes, retention and your rights",
 "consent.terms.body": "tapWar Terms of Service\nEffective: October 4, 2026\nOperator: TT Softs\n\n1. Service and access\nThese terms describe use of tapWar, its accounts and save services. Agree to these terms and the collection and use of required personal data before signing in. Users under 14 may not use the service.\n\n2. Accounts and security\nUse a guest or Google account. A guest may lose access after deleting the app, changing devices or clearing site data. We recommend linking Google. Progress from separate accounts is not merged automatically. Do not impersonate others, transfer accounts or misuse their access.\n\n3. Game progress and virtual items\nGold, gems, gear and rewards are virtual game items and cannot be exchanged for cash. Progress is restored from the latest verified server save. Playing on multiple devices can cause a save conflict; review the latest save before continuing.\n\n4. Rewards, advertising and purchases\nNotices, events and free rewards follow the operating policy. Optional rewarded ads require completion and server verification. Advertising privacy choices are separate from these terms. Where purchases are offered, prices, contents and refunds follow the purchase screen and app marketplace policies. Features labelled as tests are not real purchases.\n\n5. Prohibited conduct and changes\nSave tampering, exploiting vulnerabilities, fraudulent rewards, account theft and disrupting the service are prohibited. Confirmed abuse may result in restrictions. Maintenance, outages and service changes are announced where practical.\n\n6. Leaving and support\nContact us to stop using your account, review or delete personal data, or withdraw consent. Requests require identity verification. Data subject to legal retention duties may be retained separately for the applicable period.\nSupport: admin.ttsoft@gmail.com\n\nThis document describes the current prototype. The final release terms will reflect the actual service, purchases and data processing.",
 "consent.privacy.body": "tapWar Privacy Notice\nEffective: October 4, 2026\nOperator and privacy contact: TT Softs\nadmin.ttsoft@gmail.com\n\n1. Required data\nWe process your Firebase user ID (UID), authentication provider, minimum account details supplied by Google sign-in, nickname and profile choices, game progress, currency, items, unlocks, notice acknowledgements and mail reward records.\nTechnical data may include app version, operating system, access times, error and security logs and IP addresses generated during server access. Error reports exclude authentication tokens and complete save files.\n\n2. Purposes and choice\nData is used for authentication, account identification, saving and restoring progress, preventing duplicate rewards, delivering notices and mail, security, error analysis and support.\nYou may refuse required data collection and use. Without it, account identification and server saves cannot be provided, so sign-in and game services are unavailable.\n\n3. Collection and processors\nInformation you enter and data generated during play are processed through Firebase Authentication, Cloud Firestore, Cloud Functions and server requests. Google LLC may process data on infrastructure inside or outside your country. Network transfers are encrypted. Before release, actual processors, transfer countries, methods, timing and retention will be disclosed for the final service.\n\n4. Retention\nData is deleted after account closure, a deletion request or completion of its purpose. Minimum information required by law or needed for fraud prevention and disputes may be retained separately for the applicable purpose and period. Lost guest access can make identity verification and restoration difficult.\n\n5. Optional notifications and advertising\nNotice notifications require a separate choice. Enabling them processes device notification tokens and language subscriptions through Firebase Cloud Messaging. Disable them in Settings; refusing does not prevent play.\nAdvertising identifiers and personalized advertising are not covered by this required consent. When mobile advertising is enabled, choices can be managed separately through Google User Messaging Platform.\n\n6. Rights and security\nYou may request access, correction, deletion, processing restrictions or withdrawal of consent after identity verification. We use authentication, access controls, server security rules and encrypted transfers. We do not sell or disclose personal data without a legal basis or separate consent.\n\n7. Contact and changes\nPrivacy contact: admin.ttsoft@gmail.com\nImportant changes are announced in the app. This document reflects the prototype; business information and actual processing details will be finalized before release.",
 "layout.collapse": "Hide menu ▾",
 "layout.expand": "Show menu ▴",
 "unlock.title": "Keep Exploring",
 "unlock.stage": "{name} unlocks at best stage {stage}.",
 "unlock.view": "Explore New Feature",
 "tutorial.welcomeTitle": "Begin Your First Expedition",
 "tutorial.welcomeBody": "Tap the field to defeat enemies and earn gold.\nLearn to upgrade your guardian and recruit your first hero, one step at a time.",
 "tutorial.begin": "Show Me How",
 "tutorial.step": "First Expedition · {step} / {total}",
 "tutorial.skip": "Skip",
 "tutorial.skipTitle": "Finish the Guide?",
 "tutorial.skipBody": "Replay this guide in Settings. Features still unlock as you progress through stages.",
 "tutorial.step1": "Tap the highlighted field 3 times.\nAttack enemies to earn gold.",
 "tutorial.step2": "Use Upgrade below to strengthen\nyour guardian by one level.",
 "tutorial.step3": "Open Heroes in the bottom menu.\nHeroes attack automatically.",
 "tutorial.step4": "Recruit Rowen of the Ridge, your first hero.\nTap the field for gold if needed.",
 "tutorial.step5": "Use Hide Menu below.\nThe battlefield expands.",
 "tutorial.step6": "Use Show Menu to return.\nClimb further to unlock new features.",
 "tutorial.replay": "Replay First Expedition Guide",
 "tutorial.replayBody": "Keep your progress and restart the basic controls guide.",
 "tutorial.complete": "Ready to explore! Keep tapping and upgrading."
});

Object.assign(translations.ko,{'unlock.nextTitle':'다음 원정 목표'});
Object.assign(translations.en,{'unlock.nextTitle':'Next Expedition Goal'});

Object.assign(translations.ko,{'tutorial.boss':'첫 보스가 나타났습니다!\n30초 안에 처치해 다음 구역으로 가세요.\n실패하면 강화하고 보스 도전으로 다시 시작하세요.'});
Object.assign(translations.en,{'tutorial.boss':'Your first boss! Defeat it within 30 seconds\nto reach the next stage. If time runs out,\nupgrade and use Fight Boss to retry.'});

Object.assign(translations.en,{'unlock.stage':'Reach best stage {stage} to unlock {name}.','tutorial.step2':'Use Level Up below to strengthen\nyour guardian by one level.'});

Object.assign(translations.ko,{'ui.iconHelp':'아이콘 안내','ui.equipmentHelp':'검: 모든 피해 배율 · 화살표: 현재 → 선택 장비\n초록/빨강 수치: 장착했을 때 피해 변화\n체크: 장착 · 자물쇠: 판매 보호 전환 · 보석: 판매\n방어구: 수집 세트 · 버튼을 길게 눌러 설명을 확인하세요.','ui.enchantCost':'{cost}'});
Object.assign(translations.en,{'ui.iconHelp':'Icon Guide','ui.equipmentHelp':'Sword: all damage multiplier · Arrow: current → selected\nGreen/red number: change after equipping\nCheck: equip · Lock: sell protection · Gem: sell\nArmor: collection sets · Hold a button to see its meaning.','ui.enchantCost':'{cost}'});

Object.assign(translations.ko,{'tutorial.step2':'아래 금색 + 아이콘을 눌러\n수호자를 한 단계 강화하세요.','tutorial.step3':'하단의 동료 얼굴 아이콘을 누르세요.\n동료는 자동으로 적을 공격합니다.','tutorial.step5':'아래 ↓ 아이콘으로 메뉴를 접으세요.\n전장이 더 크게 펼쳐집니다.','tutorial.step6':'↑ 아이콘으로 메뉴를 다시 펼치세요.\n구역을 돌파하면 새 기능이 열립니다.'});
Object.assign(translations.en,{'tutorial.step2':'Tap the gold + icon below\nto level up your guardian.','tutorial.step3':'Tap the hero portrait in the bottom bar.\nHeroes attack automatically.','tutorial.step5':'Tap the ↓ icon to hide the menu.\nThe battlefield expands.','tutorial.step6':'Tap ↑ to bring the menu back.\nClimb further to unlock new features.'});

// Compact first-use captions; all actionable instructions remain localized.
Object.assign(translations.ko,{
 'guide.inspect':'아이콘을 길게 누르면 설명을 볼 수 있어요.',
 'guide.action':'첫 사용 · {action}', 'guide.later':'나중에 보기',
 'guide.boss':'첫 보스! 시간 안에 처치하세요. 실패하면 강화 후 ↻ 재도전.',
 'guide.tab5':'상점이 열렸어요. 상자 아이콘에서 무료 보상을 확인하세요.',
 'guide.tab3':'정령이 열렸어요. 여우 아이콘을 눌러 첫 알을 확인하세요.',
 'guide.tab2':'장비가 열렸어요. 갑옷 아이콘에서 능력치를 비교하세요.',
 'guide.tab4':'유물이 열렸어요. 환생 보상으로 영구 효과를 얻으세요.',
 'guide.free':'무료 보상 줄까지 내려가 수령하세요. 구매는 선택이에요.',
 'guide.egg':'알이 준비되면 부화 버튼! 기다리는 동안 전투를 이어가세요.',
 'guide.pet':'보유한 정령의 장착 아이콘을 눌러 동행시키세요.',
 'guide.gear':'장비를 눌러 능력치를 비교하고 ↑ 장착하세요. 자물쇠는 판매 보호예요.',
 'guide.prestige':'환생으로 유물 재화를 얻어요. 초기화 범위를 읽고 결정하세요.',
 'guide.relics':'수호자 탭의 환생으로 재화를 얻은 뒤 돌아오세요.',
 'guide.discover':'상자 아이콘으로 첫 유물을 발견하세요. 비용이 먼저 표시돼요.',
 'guide.artifact':'보유 유물을 눌러 효과와 강화 비용을 확인하세요.',
 'guide.spell':'스킬을 열어 ▶ 사용하세요. 마나와 재사용 시간을 확인하세요.'
});
Object.assign(translations.en,{
 'guide.inspect':'Hold an icon to read what it does.',
 'guide.action':'First use · {action}', 'guide.later':'Show later',
 'guide.boss':'First boss! Beat the timer. If you lose, upgrade and retry with ↻.',
 'guide.tab5':'Shop unlocked. Open the chest tab to find your free reward.',
 'guide.tab3':'Pets unlocked. Open the fox tab to check your first egg.',
 'guide.tab2':'Equipment unlocked. Open the armor tab to compare stats.',
 'guide.tab4':'Artifacts unlocked. Prestige rewards buy permanent bonuses.',
 'guide.free':'Scroll to the free reward and claim it. Purchases are optional.',
 'guide.egg':'Hatch when the egg is ready. Keep fighting while you wait.',
 'guide.pet':'Use Equip on a pet you own to bring it along.',
 'guide.gear':'Open an item, compare stats, then equip ↑. Lock protects it from sale.',
 'guide.prestige':'Prestige earns artifact currency. Read what resets before deciding.',
 'guide.relics':'Prestige in the Guardian tab to earn currency, then return here.',
 'guide.discover':'Use the chest to discover an artifact. Check the cost first.',
 'guide.artifact':'Open an owned artifact to check its effect and upgrade cost.',
 'guide.spell':'Open a skill and use ▶. Check its mana cost and cooldown.'
});

Object.assign(translations.ko,{'tutorial.step2':'아래 빨간 + 버튼으로\n수호자를 한 단계 강화하세요.','tutorial.step3':'아래 동료 얼굴 아이콘!\n동료는 자동으로 공격해요.','tutorial.step4':'첫 동료 로웬을 고용하세요.\n골드가 부족하면 전장을 탭!'});
Object.assign(translations.en,{'tutorial.step2':'Tap the red + button to level up your guardian.','tutorial.step3':'Tap the hero portrait below. Heroes attack automatically.','tutorial.step4':'Recruit Rowen. Need gold? Keep tapping the field!'});

Object.assign(translations.ko,{'guide.master':'아래 수호자 탭을 열어 강화로 돌아가세요.'});
Object.assign(translations.en,{'guide.master':'Open the Guardian tab below to return to Level Up.'});

Object.assign(translations.ko,{'guide.begin':'첫 원정! ▶ 를 누르면 탭과 강화부터 하나씩 안내할게요.'});
Object.assign(translations.en,{'guide.begin':'First expedition! Press ▶ to learn tapping and upgrades, one step at a time.'});

Object.assign(translations.ko,{
 'guide.feature15':'새 성장 메뉴! 위 가방에서 제작·이벤트·수집 기능을 확인하세요.',
 'guide.feature50':'스킬 트리가 열렸어요. 위 가방에서 빌드를 준비하세요.',
 'guide.feature60':'환생과 대회가 열렸어요. 위 가방에서 새 도전을 확인하세요.',
 'guide.feature100':'레이드·카드·길드가 열렸어요. 위 가방에서 시작하세요.',
 'guide.feature1000':'메타 성장이 열렸어요. 위 가방에서 보석과 연구를 확인하세요.',
 'guide.feature100000':'영혼 소환이 열렸어요. 위 가방의 성장 메뉴를 확인하세요.',
 'guide.feature180000':'기념물 성장이 열렸어요. 위 가방에서 영구 효과를 확인하세요.'
});
Object.assign(translations.en,{
 'guide.feature15':'More growth options! Open the bag for crafting, events and collections.',
 'guide.feature50':'Skill trees unlocked. Open the bag to prepare your build.',
 'guide.feature60':'Prestige and tournaments unlocked. Open the bag for new challenges.',
 'guide.feature100':'Raids, cards and clans unlocked. Start with the bag above.',
 'guide.feature1000':'Meta growth unlocked. Open the bag for gems and research.',
 'guide.feature100000':'Soul summoning unlocked. Check Growth in the bag menu.',
 'guide.feature180000':'Monuments unlocked. Open the bag to find permanent bonuses.'
});

Object.assign(translations.ko,{'guide.spell':'첫 스킬이 준비됐어요! ↓로 메뉴를 접으면 사용 버튼이 나타나요.','guide.spellCast':'빛나는 스킬을 눌러 사용하세요. 마나가 소모되고 재사용 대기가 시작돼요.','guide.relics':'현재 구역 60에 도달해 수호자 탭에서 환생한 뒤 돌아오세요.'});
Object.assign(translations.en,{'guide.spell':'Your first skill is ready! Hide the menu with ↓ to reveal its button.','guide.spellCast':'Tap the highlighted skill. It spends mana and starts a cooldown.','guide.relics':'Reach stage 60 in this run, prestige in Guardian, then return here.'});

Object.assign(translations.ko,{
 'guide.begin':'▶ 로 첫 원정 시작!\n탭과 강화부터\n하나씩 알려드릴게요.',
 'tutorial.step1':'전장을 3번 탭!\n적을 치면 골드를 얻어요.',
 'tutorial.step2':'아래 빨간 + 버튼!\n수호자를 강화하세요.',
 'tutorial.step3':'동료 얼굴 아이콘!\n자동 공격을 맡겨보세요.',
 'tutorial.step4':'로웬을 고용하세요.\n골드가 부족하면 전장 탭!',
 'tutorial.step5':'↓ 로 메뉴를 접으면\n전장이 넓어져요.',
 'tutorial.step6':'↑ 로 메뉴를 펼쳐요.\n구역마다 새 기능 해금!'
});
Object.assign(translations.en,{
 'guide.begin':'Press ▶ to begin.\nLearn one action at a time.',
 'tutorial.step1':'Tap the field 3 times.\nHits earn gold.',
 'tutorial.step2':'Tap the red + below.\nLevel up your guardian.',
 'tutorial.step3':'Tap the hero portrait.\nHeroes attack for you.',
 'tutorial.step4':'Recruit Rowen.\nNeed gold? Tap the field!',
 'tutorial.step5':'Hide the menu with ↓.\nEnjoy a larger battlefield.',
 'tutorial.step6':'Bring it back with ↑.\nClimb to unlock more.'
});

Object.assign(translations.ko,{"feedback.received": "획득!", "feedback.power": "능력 상승!", "feedback.improved": "성장이 적용됐어요!", "feedback.level": "{name}  {before} → {after}", "feedback.tap": "탭 공격력  {before} → {after}", "feedback.dps": "초당 공격력  {before} → {after}", "feedback.gold": "골드", "feedback.gems": "보석", "feedback.shards": "제작 조각", "feedback.dust": "카드 가루", "feedback.sp": "특성 포인트", "feedback.souls": "영혼", "feedback.geodes": "보석 원석", "feedback.eventTokens": "이벤트 토큰", "feedback.relics": "유물 재화", "feedback.mementos": "시즌 기억", "feedback.pets": "정령 {index}", "feedback.artifacts": "유물 {index}", "feedback.cards": "카드 {index}", "feedback.fragments": "카드 조각 {index}", "feedback.titans": "영혼 수집 {index}", "feedback.stones": "별빛 보석 {index}", "feedback.perks": "축복 {index}", "feedback.weapons": "동료 무기 {index}", "feedback.scrolls": "동료 두루마리 {index}", "feedback.skills": "특성 {index}", "feedback.research": "연구 {index}", "feedback.monuments": "기념비 {index}", "feedback.ascensions": "동료 승급 {index}", "feedback.heroSkills": "동료 특성 {index}", "feedback.titanLevels": "영혼 강화 {index}", "feedback.mysticResearch": "신비 연구 {index}", "feedback.monumentEnchanted": "기념비 각성 {index}"});

Object.assign(translations.en,{"feedback.received": "REWARDS!", "feedback.power": "POWER UP!", "feedback.improved": "Growth applied!", "feedback.level": "{name}  {before} → {after}", "feedback.tap": "Tap damage  {before} → {after}", "feedback.dps": "Damage / sec  {before} → {after}", "feedback.gold": "Gold", "feedback.gems": "Gems", "feedback.shards": "Crafting shards", "feedback.dust": "Card dust", "feedback.sp": "Skill points", "feedback.souls": "Souls", "feedback.geodes": "Geodes", "feedback.eventTokens": "Event tokens", "feedback.relics": "Relics", "feedback.mementos": "Season mementos", "feedback.pets": "Pet {index}", "feedback.artifacts": "Artifact {index}", "feedback.cards": "Card {index}", "feedback.fragments": "Card fragments {index}", "feedback.titans": "Soul collection {index}", "feedback.stones": "Star stone {index}", "feedback.perks": "Perk {index}", "feedback.weapons": "Hero weapon {index}", "feedback.scrolls": "Hero scroll {index}", "feedback.skills": "Skill {index}", "feedback.research": "Research {index}", "feedback.monuments": "Monument {index}", "feedback.ascensions": "Hero ascension {index}", "feedback.heroSkills": "Hero skill {index}", "feedback.titanLevels": "Soul level {index}", "feedback.mysticResearch": "Mystic research {index}", "feedback.monumentEnchanted": "Monument enchantment {index}"});

Object.assign(translations.ko,{'action.insufficient':'{currency} 부족 · 보유 {owned} / 필요 {cost}','action.maxReached':'최대 레벨에 도달했어요.','action.needLevel':'수호자 레벨 {level}에 사용할 수 있어요.'});
Object.assign(translations.en,{'action.insufficient':'Not enough {currency} · Have {owned} / Need {cost}','action.maxReached':'Maximum level reached.','action.needLevel':'Requires guardian level {level}.'});

Object.assign(translations.ko,{'action.waitSeconds':'{seconds}초 후에 사용할 수 있어요.','action.mana':'마나'});
Object.assign(translations.en,{'action.waitSeconds':'Available in {seconds} seconds.','action.mana':'Mana'});

Object.assign(translations.ko,{'action.heroLevel':'동료 레벨','action.petTotal':'정령 총 레벨'});
Object.assign(translations.en,{'action.heroLevel':'Hero level','action.petTotal':'Total pet levels'});

Object.assign(translations.ko,{'action.alreadyClaimed':'이미 수령한 보상이에요.','action.alreadyApplied':'이미 적용되어 있어요.'});
Object.assign(translations.en,{'action.alreadyClaimed':'This reward has already been claimed.','action.alreadyApplied':'Already applied.'});

Object.assign(translations.ko,{'action.claimReady':'수령 가능','action.notReady':'미충족','battle.wave':'적 부대 · {count}명'});
Object.assign(translations.en,{'action.claimReady':'Claim now','action.notReady':'Not ready','battle.wave':'Hostiles · {count}'});

Object.assign(translations.ko,{
 'action.recruitCost':'고용\n{cost}','cheat.short':'치트','cheat.title':'프로토타입 치트 패널','cheat.description':'전투와 성장 테스트용입니다.\n변경 사항은 현재 계정에 저장됩니다.',
 'cheat.stage':'구역 {stage}','cheat.funds':'군자금 +1,000,000','cheat.squad':'분대 8명 고용 · 레벨 10',
 'cheat.reset':'전체 초기화','cheat.resetBody':'재화·장비·분대·구역·해금·튜토리얼을 처음 상태로 되돌립니다. 서버 저장도 초기화합니다. 직전 상태는 이 기기에서 복구할 수 있습니다.',
 'cheat.restore':'직전 초기화 복구','cheat.restoreBody':'이 계정의 초기화 직전 진행으로 되돌립니다. 현재 진행은 교체됩니다.',
 'cheat.noBackup':'이 기기에 이 계정의 초기화 백업이 없습니다.','cheat.scope':'계정·약관 동의·운영 우편 수령 기록은 유지됩니다.',
 'guide.daily':'메뉴 → 일일 임무를 열고 노란 수령 가능 버튼을 눌러요. 획득 후 확인으로 닫아요.',
 'tutorial.begin':'시작','guide.begin':'신병 훈련 시작!\n사격 → 강화 → 분대 고용을 차례로 배워요.',
 'tutorial.step1':'오른쪽 전장을 3번 눌러 사격하세요. 적에게 파편이 튀어요.',
 'tutorial.step2':'대장 옆 + 버튼으로 강화하세요. 회색이면 눌러 부족한 재화를 확인해요.',
 'tutorial.step3':'아래 분대 탭을 눌러요. 분대원은 자동으로 사격해요.',
 'tutorial.step4':'레아 옆 고용 버튼을 눌러요. 아군은 같은 크기로 나란히 배치돼요.',
 'tutorial.step5':'↓로 메뉴를 접어요. 전장을 넓게 볼 수 있어요.',
 'tutorial.step6':'↑로 메뉴를 다시 펼쳐요. 다음은 보스와 첫 보상이에요.'
});
Object.assign(translations.en,{
 'action.recruitCost':'Recruit\n{cost}','cheat.short':'Cheat','cheat.title':'Prototype Cheat Panel','cheat.description':'Test combat and progression.\nChanges are saved to the current account.',
 'cheat.stage':'Zone {stage}','cheat.funds':'Funds +1,000,000','cheat.squad':'Recruit 8 soldiers · Level 10',
 'cheat.reset':'Reset all progress','cheat.resetBody':'Reset funds, gear, squad, zones, unlocks and tutorial, including the server save. The previous state can be restored on this device.',
 'cheat.restore':'Undo last reset','cheat.restoreBody':'Restore this account to its state before the last reset. This replaces current progress.',
 'cheat.noBackup':'No reset backup for this account on this device.','cheat.scope':'Account, consent and operational mail receipts are kept.',
 'guide.daily':'Open Menu → Daily tasks. Tap the yellow Claim now button, then Confirm after receiving rewards.',
 'tutorial.begin':'Start','guide.begin':'Boot camp begins!\nLearn firing, upgrades and recruiting.',
 'tutorial.step1':'Tap the right battlefield 3 times. Impacts mark your hits.',
 'tutorial.step2':'Upgrade with + beside the captain. Tap gray buttons to see what you need.',
 'tutorial.step3':'Open the squad tab below. Soldiers fire automatically.',
 'tutorial.step4':'Recruit Rhea using her button. Allies form evenly spaced ranks.',
 'tutorial.step5':'Hide the menu with ↓ to see more of the battlefield.',
 'tutorial.step6':'Show it again with ↑. Next: the boss and your first reward.'
});

applyMilitaryTheme(translations);
