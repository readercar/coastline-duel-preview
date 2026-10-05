# OutRun 운영 및 프로토타입 가이드

기준일: 2026-10-04. Cocos Creator 3.8.8 / TypeScript. 시작 씬은 `assets/scenes/Main.scene`, 웹 산출물은 `build/web-mobile`, Android 패키지는 `com.ttsofts.tapwar`다. 이 작업은 실제 게임 적용 프로토타입이며 스토어 출시 작업은 아니다.

## 적용한 기준

인마이포켓의 `in-my-pocket-slots/OPERATIONS_GUIDE.md`, `docs/notice-mail-separation.md`, 공지·우편·푸시·저장·오류 수신 구현을 확인했다. 최신 기준인 **공지와 보상 우편 분리**를 적용했다. 과거 `giftId` 공지 보상 방식은 신규 구현에 사용하지 않는다.

슬롯 목록 큐레이션·주간 무료 스핀 캠페인은 단일 RPG에 대응하는 상품이 없으므로 복제하지 않는다. OutRun의 기존 시즌 보상과 이벤트는 유지하며 운영 보상은 보석·기억 조각·분진·정령 레벨로 지급한다. 기존 경쟁·길드·커머스 서버와 AdMob SSV 경계는 유지한다. 개인 저장을 서버에 보관한다는 이유로 모든 전투 결과가 서버 권위 계산이라고 표현하지 않는다.

## 실행과 연결 대상

```sh
npm install
npm --prefix firebase/functions install
npm test
npm run build
npm run server
```

일반 서버 실행은 `server/main.ts`의 기본 포트와 `config/operations.json`을 사용한다. 기존 아트 검수는 `PORT=8848`, `EMBER_DATA_DIR=.prototype-server`를 사용했다. 타이틀·첫 플레이 검수는 별도 `PORT=8850`, `EMBER_DATA_DIR=.prototype-entry-qa`, `EMBER_OPERATIONS_FILE=docs/qa/pastel/operations.json`을 사용한다. localhost/127.0.0.1의 게스트는 같은 출처의 `/api`와 SQLite를 사용하고 Google 선택은 실제 Firebase를 사용한다. 그 밖의 웹 및 Android는 두 로그인 방식 모두 Firebase 운영 API를 사용한다.

| 구분 | OutRun 값 |
| --- | --- |
| Firebase 프로젝트 | `ttsofts-tapwar` |
| Firebase 프로젝트 번호 / FCM sender | `721865585447` |
| 운영 API | `https://asia-northeast3-ttsofts-tapwar.cloudfunctions.net/operations` |
| 정책 | `operations/live` |
| 계정 저장 | `players/{uid}/backups/main` |
| 읽음 / 수령 기록 | `players/{uid}/messageReads`, `players/{uid}/mailReceipts` |
| 운영 우편 / 오류 / 푸시 영수증 | `mailRewards`, `clientErrors`, `pushBroadcasts` |
| Android 알림 채널 | `tapwar_notices` |
| 알림 주제 | `tapwar_notices_ko`, `tapwar_notices_en` |
| 웹 개발 버전 / 모바일 스토어 버전 | `0.1.0` / `1.0` |

위 프로젝트의 운영 Functions와 Firestore 규칙을 실제 배포하고 API를 검증했다. 운영 정책은 공지 없음, 최소 버전 `0`, 필수 일치 버전 없음이다. 실제 공지 방송이나 푸시는 발송하지 않았다. 원본 인마이포켓의 Firebase·FCM·OAuth 식별자는 가져오지 않았다.

## 관리자

```sh
# 로컬 개발 서버와 같은 데이터 폴더/정책 파일을 지정한다.
EMBER_DATA_DIR=.prototype-server EMBER_OPERATIONS_FILE=docs/qa/pastel/operations.json npm run admin

# 실제 OutRun Firebase. 기존 firebase login 또는 ADC 권한을 사용한다.
TT_OPS_TARGET=firebase TT_FIREBASE_PROJECT=ttsofts-tapwar npm run admin
```

`http://127.0.0.1:9040/`에서 공지·버전·우편·오류를 관리한다. `TT_ADMIN_PORT`로 포트를 바꿀 수 있다. 로컬 검수와 실제 서버 화면을 동시에 쓸 때 실제 서버는 9041을 사용했다. 화면 상단의 연결 대상을 확인한다.

도구는 loopback에만 바인딩한다. Host·Origin 및 실행마다 생성한 요청 토큰을 검증한다. 관리자 키와 토큰을 클라이언트 게임, 로그, Git에 저장하지 않는다. Firebase 로그인은 기존 CLI의 권한을 재사용하며 새 서비스 계정 키를 만들지 않는다. 로그인 갱신이 필요하면 `npx firebase login`을 수행한다. Firebase 프로젝트는 명시적으로 `ttsofts-tapwar`를 지정해야 한다.

정책 저장 후 서버를 다시 읽어 결과를 표시한다. 우편 ID는 내용을 고정하며 같은 ID의 동일 내용 재시도만 허용한다. 미수령 회수는 `revoked`로 표시한다. 회수는 이미 지급한 보상을 차감하지 않는다.

## 저장과 계정

`OperationsClient`의 한 작업 큐가 서버 복원·저장·우편 수령을 직렬화한다. 로그인 직후 서버 저장을 먼저 복원하고 게임 진행을 시작한다. 저장 요청은 현재 상태 스냅샷과 서버 버전을 함께 보낸다. 다른 기기가 먼저 저장한 경우 오래된 버전은 거절하며 진행을 멈추고 서버 복원을 안내한다. 저장 결과가 불명확한 통신 실패도 재조회 전까지 진행을 멈춘다.

자동 서버 저장은 10초 간격이며 설정의 저장 버튼도 같은 큐를 사용한다. 튜토리얼 단계 변경은 즉시 같은 큐로 저장한다. 수령·복원 작업 중에는 전투와 변경 버튼 입력을 막는다. 개인 저장 복원은 기존 로컬 상태를 복구용 백업으로 남긴다. 다른 UID로 전환했는데 서버 저장이 없으면 이전 계정 상태를 임의로 옮기지 않는다.

Android 운영 API는 `TapWarOperations`의 HTTPS 통신을 사용한다. Firebase SDK에서 ID 토큰을 갱신하고 연결·읽기 시간 제한과 계정 변경 검사를 수행한다. Cocos JSB에 없는 브라우저 `AbortController`를 운영 통신에 요구하지 않는다. 정책으로 접속이 차단된 동안에는 자동 저장도 멈춘다. 서버 복원은 게임의 기존 재개 처리를 거쳐 오프라인 보상·일일 초기화·레이드 경과를 반영한다.

Firebase 익명 계정 생성과 UID별 저장은 실제 서버에서 검증했다. 타이틀의 Google 진입은 웹 `signInWithPopup`, Android Credential Manager의 `signInWithCredential`로 구현했다. 이미 익명 계정인 경우 `linkWithPopup` / `linkWithCredential`로 UID를 보존한다. 다른 Google 계정과 충돌하면 저장을 자동 병합하지 않으며 명시적 계정 전환 안내를 제공한다.

**2026-10-04 Google 설정 완료:** 미정 Chrome 프로필의 `admin.ttsoft@gmail.com`으로 `ttsofts-tapwar`의 Google 제공자를 활성화했다. 기존 Firebase CLI 배포 계정도 동일하다. 이미지 생성용 덕하 Chrome 계정과 구분한다. 지원 이메일은 위 미정 계정, 공개 프로젝트 이름은 `tapWar`다. 기존 `localhost`와 프로젝트 Firebase 도메인을 유지하고 개발 검수용 `127.0.0.1`을 추가했다.

Android 앱 `com.ttsofts.tapwar`의 현재 디버그 APK 인증서 SHA-1·SHA-256을 등록했다. 프로젝트가 발급한 Android·Web OAuth 항목을 포함하는 SDK 설정을 `config/google-services.json`으로 내려받고 Web client ID를 `native/engine/android/res/values/strings.xml`의 `google_web_client_id`에 연결했다. 다른 게임의 OAuth client ID를 가져오지 않았다. Google 로그인 후 실제 인게임·튜토리얼 진입과 Firebase의 `google.com` 계정·서버 저장을 확인했다. 브라우저 재시작 후 Google 재로그인도 같은 UID를 유지하며 용사 레벨 2와 튜토리얼 3단계를 복원했다. 세부 증거는 `docs/qa/firebase-google/verification.json`에 기록한다. 정식 배포 인증서 및 물리 Android의 Credential Manager 로그인은 아직 검수하지 않았다.

## 공지와 버전 제한

- 공지는 최대 30개, 제목 60자·본문 3,000자, 안전한 고유 ID를 사용한다. 현재 언어 → 영문 → 기본 문구 순으로 표시한다.
- ID별 읽음 상태를 서버에 계정별로 기록한다. 동일 ID의 문구 수정은 확인한 계정에 자동 재안내하지 않는다. 다시 안내하려면 새 ID를 사용한다.
- 공지 확인은 재화를 지급하지 않는다. 보상은 별도 운영 우편으로 발송한다.
- 로그인 화면 위에 50% 검정 딤과 여백 있는 각진 패널을 띄운다. 긴 본문은 스크롤한다.
- 정책 조회 실패는 온라인 진입을 막으며 재연결 버튼을 제공한다. 실행 중에는 60초마다 정책을 갱신한다.

`minimumVersion.{web,android,ios}`는 기준보다 낮은 버전을 막는다. `requiredVersion`의 양수 값은 최소 버전보다 우선하며 목표와 다른 모든 버전(상위 버전 포함)을 막는다. `1.15`와 `1.15.0`은 동일하다. `requiredVersion=0`은 필수 일치 제한만 해제하므로 전체 해제 시 최소 버전도 `0`인지 확인한다. 제한이 있으면 해당 플랫폼의 실제 설치 가능한 HTTPS 주소가 필수다. 모바일은 `STORE_VERSION`, 웹은 `APP_VERSION`을 비교한다.

## 우편과 오류 수신

우편 대상은 전체 `all` 또는 단일 UID다. 보상 없는 편지도 지원한다. 유효기간은 최대 발송 후 30일이며 만료·회수·다른 수신 계정은 수령할 수 없다. 서버 트랜잭션이 보상 가산, 저장 버전 증가, 수령 영수증을 함께 기록한다. 동시에 수령하거나 응답을 잃고 재시도해도 이미 수령한 보상을 다시 가산하지 않는다. 재시도는 과거 수령 시점의 상태 대신 최신 저장을 반환한다. 수령 후 삭제는 해당 계정의 영수증만 숨기며 다른 계정의 원본은 삭제하지 않는다.

오류 보고는 코드·짧은 메시지·버전·플랫폼만 수집한다. URL·이메일·Bearer·긴 토큰은 제거하며 게임 저장이나 결제 영수증을 붙이지 않는다. 인증 전 오류는 로컬에 최대 20개 대기하고 계정 준비 후 재전송한다. API는 계정별 시간당 20개로 제한하고 ID 재전송을 중복 기록하지 않는다. 일반 계정은 타 UID 오류 조회와 전체 목록 조회·수정·삭제를 할 수 없다.

## Android 알림

타이틀에서 필수 문서 동의를 마친 뒤, 로그인 전에 별도로 알림 수신 여부를 선택한다. 광고 UMP와 알림 동의는 별개다. 거절 상태를 유지하며 허용한 경우에만 FCM 자동 초기화와 언어 주제 구독을 켠다. Android 13 이상 OS 권한 요청은 한 번 진행한다. 설정 OFF는 두 언어 주제를 해제하고 자동 초기화를 끈다. 앱에서 ON이어도 OS 또는 채널이 차단했으면 비활성 상태를 표시하고 기기 설정 이동을 제공한다. 언어를 바꾸면 구독 언어도 바꾼다. 웹 검수에서는 선택만 저장하며 브라우저 알림 권한이나 웹 Push를 요청하지 않는다.

전경 메시지는 `TapWarMessagingService`, 배경 메시지는 FCM 시스템 알림으로 표시한다. 알림 클릭의 `noticeId`를 앱에 전달해 서버에서 해당 미확인 공지를 찾는다. 없거나 이미 읽은 공지는 재수령 같은 효과를 만들지 않는다. iOS APNs·웹 Push·개인 토큰 발송·예약 방송은 이 Android 공지 시스템의 지원 범위가 아니다.

`res/values/firebase-config.xml`은 이 프로젝트의 `config/google-services.json`에서 추출한 공개 SDK 설정이다. FirebaseInitProvider가 Activity가 열리기 전이나 메시징 서비스가 배경에서 시작할 때도 같은 프로젝트를 초기화하도록 연결했다. 알림 자동 초기화와 Analytics의 기본 OFF 설정은 Manifest에서 별도로 유지한다.

관리자는 **저장된 공지**를 선택해 언어별로 1–60자 제목과 1–500자 본문을 발송한다. TTL은 24시간이다. 공지 ID+언어+문구 해시의 영수증에서 `sent`는 재발송을 건너뛰고 `sending`은 재시도를 막으며 `failed`만 재시도한다. FCM 접수 후 영수증 저장 실패 같은 상황에서 기기 전달의 정확히 한 번을 보장하지 않는다. 실제 방송은 발송 요청을 받은 작업에서만 실행한다.

Android 코드와 APK 빌드는 통과했다. 물리 기기의 OS 권한·FCM 전경/배경 수신·클릭은 이번 검수에서 실행하지 않았다. 운영 구현, 전송 접수, 실제 기기 수신을 구분한다. 광고·IAP의 기존 서버 검증을 유지했으며 이번 작업에서 실광고/실결제를 요청하지 않았다.

## 검증 기록

- `npm test`: 코어 81개, 서버 28개 통과.
- `npm run build:operations`, Cocos 웹 빌드, Android debug APK 빌드 통과.
- `scripts/operations-integration.cjs`: 로컬 HTTP 정책·인증·읽음·저장 충돌·오류 검증.
- `scripts/operations-firebase-smoke.cjs`: 실제 Firebase에서 익명 계정, UID 접근 차단, 공지 읽음, 동시 우편 수령 1회, 최신 상태 재시도, 개인 삭제, 오류 제거 검증. 자체 생성한 비공개 QA 데이터와 계정은 종료 후 정리한다.
- `docs/qa/pastel/firebase-verification.json`: 실제 서버 검증 일시와 정책.
- `docs/qa/pastel/screens`: 실제 Chrome Cocos 실행 검수 캡처. 게임 아트 원본으로 사용하지 않는다.
- `docs/qa/pastel/verification.json`: 320px 화면, 주요 팝업, 한글·영어 전 탭, 빠른 전환 중 런타임 오류·경고 및 최종 APK 해시 기록. 모든 후반 콘텐츠 팝업을 개별 실행한 것으로 확대 해석하지 않는다.
- `art/pastel/provenance.json`, `art/pastel/import-manifest.json`: 실제 ChatGPT 다운로드와 적용 자산 출처.

관련 공식 문서: [Firestore 트랜잭션](https://firebase.google.com/docs/firestore/manage-data/transactions), [Android FCM](https://firebase.google.com/docs/cloud-messaging/android/client), [Firebase CLI 배포](https://firebase.google.com/docs/cli).

## 타이틀과 첫 플레이

타이틀은 기존 원본 숲·수호자·로웬·정령 아트와 회사 CI로 구성했다. 진입 순서는 **타이틀 → 필수 동의 → 선택 알림 → Google/게스트 → 로딩 → 인게임**이다. 계정 생성과 전투는 앞선 선택이 끝난 뒤 시작한다. 로딩은 인증, 접속 버전 정책, 서버 저장 복원, 운영 메시지 준비 단계에 대응한다. 실패하면 재로그인 화면을 표시하며 정책 차단 상태로 플레이하지 않는다.

인마이포켓의 `ConsentPolicy.ts`와 초기 진입 UI를 참고했다. 이용약관·개인정보 문서를 각각 끝까지 읽은 뒤 필수 동의를 받는다. 영수증은 `tapwar-consent-v2`에 문서 버전 `2026-10-04`, 시각과 필수 선택을 저장한다. 오래된 단일 앱 정보 동의 값은 이 영수증으로 인정하지 않는다. 운영 화면의 문서 다시 보기는 원래 인게임 위에 50% 딤과 스크롤 패널을 표시하며 기존 동의를 변경하지 않는다. 본문은 KO/EN으로 작성한 **프로토타입용 초안**이며 출시용 최종 법률 문서로 검증한 것은 아니다.

첫 플레이 안내는 ① 전장 3회 탭 ② 용사 1단계 강화 ③ 동료 탭 열기 ④ 로웬 고용 ⑤ 메뉴 접기 ⑥ 메뉴 펼치기다. 실제 행동으로 다음 단계로 진행하고 서버 저장에 `tutorial` 상태를 포함한다. 중간 재시작은 이어서 진행한다. 기존 진행 저장은 갑자기 첫 플레이로 되돌리지 않는다. 설정의 다시 보기에서는 현재 수치를 기준으로 새 행동을 요구한다. 건너뛰기와 첫 보스의 제한 시간·재도전 안내도 제공한다.

| 하단 탭 | 최고 구역 조건 |
| --- | --- |
| 수호자 / 동료 | 1 |
| 상점 | 3 |
| 정령 | 8 |
| 장비 | 15 |
| 유물 | 60 |

잠긴 탭은 흐리게 표시하고 자물쇠와 해금 조건을 제공한다. 동료·주문 목록은 열린 항목과 다음 잠긴 항목만 보여준다. 클랜·레이드·카드·시즌 등 먼 기능은 초기 메뉴에서 숨긴다. 최고 구역으로 판정해 환생 후 열린 탭을 유지한다. 이 수치는 원작의 단계적 노출을 참고한 프로토타입 설정이며 전 항목을 현행 원작과 동일하다고 주장하지 않는다. 첫 정령 구역 8은 [Game Hive 공식 설명](https://gamehive.helpshift.com/hc/en/3-tap-titans-2/faq/88-what-are-pets-and-how-do-i-level-them-up/)을 참고했다.

원작 화면의 상단 전장·하단 관리 구조를 참고해 관리 면 300, 탭 56 디자인 단위를 유지한다. 세로 화면은 너비 480 기준 높이 854–1120에 맞추고 추가 높이는 전장에 배정한다. 접기 손잡이는 관리 메뉴를 내려 전장을 넓히며 다시 펼칠 수 있다. 정지 아트의 비율, 버튼 터치 경계와 네이티브 안전 여백을 보존한다. 360×640, 320×640, 390×844를 실제 브라우저에서 검수한다.

`docs/qa/entry/screens`는 실제 Cocos 실행 캡처이며 게임 아트가 아니다. `docs/qa/entry/verification.json`은 진입·튜토리얼·비율·저장 및 빌드 검증 기록이다. Google 제공자 활성화와 실제 웹 Google 진입 후속 검수는 `docs/qa/firebase-google/verification.json`에 기록한다. 물리 Android의 Google/알림/안전 영역 검수는 아직 수행하지 않았다. Firebase 흐름은 [Google 로그인](https://firebase.google.com/docs/auth/web/google-signin), [익명 로그인](https://firebase.google.com/docs/auth/web/anonymous-auth), [계정 연결](https://firebase.google.com/docs/auth/web/account-linking)을 참고했다.

## GitHub Pages 웹 공유

웹 빌드 공유는 상위 지침에 따라 실제 Pages 배포까지 진행한다. `npm run build` → `node scripts/prepare-pages.cjs`로 `docs/web`을 갱신한다. 준비 스크립트는 공개 배포에서 `.map` 파일과 소스맵 참조를 제거하고 `build-info.json`에 버전·빌드 시각을 기록한다.

기존 배포 저장소 `readercar/coastline-duel-preview`의 `main` 브랜치 루트를 유지한다. 플레이 주소는 `https://readercar.github.io/coastline-duel-preview/docs/web/`이며 루트 주소도 이 경로로 이동한다. 이 호스트의 게스트와 Google 계정 저장·정책·운영 메시지는 OutRun Firebase를 사용한다. Google OAuth를 위해 `readercar.github.io`를 `ttsofts-tapwar`의 승인 도메인에 등록했다.

배포 커밋, GitHub Pages `built` 상태, 공개 `build-info.json` 일치 및 브라우저 실행 검수를 확인한다. 배포 검수 기록은 `docs/qa/pages/verification.json`을 사용한다.

## 2026-10-05 내부 주소 연결 보강

`npm run share:lan`은 `build/web-mobile`을 8880 포트에서 제공한다. LAN 게스트도 OutRun Firebase UID와 서버 저장을 사용한다. HTML에 주입하는 동일 출처 `/firebase-operations` 브리지를 통해 정책과 저장·운영 API를 함께 조회하므로 휴대폰에서 정책만 Firestore 스트리밍으로 별도 연결하지 않는다. 고정 Firebase upstream, ID 토큰 검증, 저장 버전 검증은 유지한다. 브리지 upstream은 15초, 클라이언트는 20초의 시간 제한을 사용한다. 임의 외부 브리지 주소는 인정하지 않는다.

같은 와이파이에서는 `http://192.168.45.201:8880/`의 게스트 진입을 사용한다. 이 주소는 현재 LAN IP이며 IP가 변경되면 서버 출력의 주소를 확인한다. Mac과 미리보기 서버가 켜져 있어야 하며 실제 다른 기기의 접속 결과는 Mac Chrome 검수와 구분한다.
