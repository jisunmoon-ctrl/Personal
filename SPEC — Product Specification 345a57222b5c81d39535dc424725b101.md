# 📄 SPEC — Product Specification

**Version**: 1.0.0

**Companion**: SYSTEM (디자인 토큰·인풋·검증 규칙)

> ⚠️ 본 문서는 기능 스펙만 정의합니다. UI 세부(색상·폰트·인풋 스타일·에러 메시지)는 **반드시 SYSTEM 페이지를 참조**하세요. SPEC에서 UI 세부를 직접 정의하는 것은 금지입니다.
> 

---

## 1. 프로덕트 정의

| 항목 | 내용 |
| --- | --- |
| 목표 | 외부 고객용 마케팅 LP를 config 하나로 재생성하고, 폼 데이터를 사내 Google Sheets로 자동 적재 |
| 사용자 | 마케터/운영자(어드민) · 개발자(배포) · 외부 고객(LP) |
| Non-goals | 사용자 인증, A/B 테스트, CRM 직접 연동, 이미지 호스팅 |
| 선행 사례 | UT Slack 워크플로우 봇 (단일 HTML + Apps Script + Sheets) |

---

## 2. 기술 스택 & 제약

- Vanilla HTML + CSS + JavaScript (ES2020+)
- Google Apps Script (.gs)
- 외부 의존성 금지 (CDN, npm 패키지 X)
- 번들러 없음 (단일 HTML 파일)
- 브라우저 지원: 최신 Chrome · Safari · Edge · Samsung Internet
- `localStorage` 사용 (어드민)
- `fetch` `mode: 'no-cors'` (Apps Script)

---

## 3. 파일 구조

```
landing-page-builder/
├── SYSTEM.md
├── SPEC.md
├── .cursorrules
├── README.md
└── src/
    ├── builder.html
    ├── admin.html
    └── apps-script-webhook.gs
```

---

## 4. Config 스키마

> config 객체는 LP의 Single Source of Truth. 이 객체만 바꾸면 새 LP 생성.
> 

### 4-1. 전체 구조

```jsx
{
  meta: { title, slug },
  header: { logo, ctaText, ctaHref },
  components: [ { type, visible, props } ],
  footer: { text }
}
```

### 4-2. 컴포넌트 타입별 props

**banner**

```jsx
{
  backgroundImage: string | null,
  eyebrow: string,
  title: string,         // HTML 허용, <em class="hl"> 강조
  subtitle: string
}
```

**serviceToggle**

```jsx
{
  title: string,
  services: [{ value, label, icon, enabled: boolean }],
  defaultValue: string,
  addon: null | { key, label }
}
```

**contactForm**

```jsx
{
  title: string,
  fields: [{ name, label, placeholder, required, type }],
  consentText: string,
  consentHref: string | null,
  submitText: string,
  webhookUrl: string
}
```

**contentImage**

```jsx
{ src: string, alt: string, caption: string }
```

### 4-3. slug 네이밍 규약

```
{캠페인명}_{회차}_{YYMMDD}_{담당자}
예: InternetRental_01_260417_ally
```

- 허용 문자: `[A-Za-z0-9_]`, 최대 30자
- 사내 공식 개인정보 수집툴의 `purpose` 규약과 통일

---

## 5. 빌더 (`builder.html`) 기능 스펙

> UI 스타일(토큰, 인풋, 버튼, 에러)은 전부 **SYSTEM §2~5**를 사용한다. 본 섹션은 구조·동작·렌더 규칙만 정의한다.
> 

### 5-1. 컴포넌트별 렌더 규칙

**Banner**

- `backgroundImage` 있음 → `background-image` + 어두운 오버레이 50% + 흰 텍스트
- `backgroundImage` 없음 → primary-soft gradient + 어두운 텍스트
- 높이: 모바일 320px / 768+ 400px / 1026+ 480px
- 타이틀 `<em class="hl">` → `color: var(--color-primary)`

**ServiceToggle**

- **`services.filter(s => s.enabled)`만 렌더** (disabled는 그리드에서 제외)
- 활성 서비스 0개면 섹션 전체 숨김
- 그리드: 모바일 2열, 768+ 3열
- 각 카드: `<button role="radio" aria-checked="...">`
- 선택 1개만 유지, 키보드 Tab/Space/Enter 지원
- 초기값: `state.service = defaultValue` (enabled 항목이 아니면 첫 enabled로 fallback)

**ContactForm** (anchor: `id="contact"`)

- **모든 인풋은 SYSTEM §3-5 `.field` 구조 사용**
- **모든 검증은 SYSTEM §4 Validators 사용**
- **모든 에러 메시지는 SYSTEM §4-3 ERROR 사전 참조**
- 제출 버튼: SYSTEM §3-1 `.btn--primary.btn--submit`
- 제출 중: `disabled=true` + 텍스트 "접수 중…"
- 성공 후: `form.reset()` + `fieldTouched` 리셋

**ContentImage**

- `visible: false` 또는 전체 0개 → 섹션 자체 DOM 제거
- **0개여도 footer가 뷰포트 바닥에 자연 정렬** (스크롤 fit)
- aspect-ratio: 16/9, max-width: 720px

### 5-2. 스크롤 fit 규칙

```css
.page { min-height: 100vh; display: flex; flex-direction: column; }
main  { flex: 1 0 auto; }
.footer { margin-top: auto; }
```

### 5-3. 상태 관리

```jsx
const state = {
  service: null,
  addons: {},
  fieldTouched: { name: false, phone: false },
  submitting: false
};
```

### 5-4. 제출 Payload

```jsx
{
  submittedAt:   ISOString,
  pageSlug:      config.meta.slug,
  name:          string (trimmed),
  phone:         string (hyphen-removed),
  service:       string,
  addons:        string[],
  consentAgreed: true,
  userAgent:     string,
  referrer:      string
}
```

### 5-5. Preview 모드

`?mode=preview`

- `body.is-preview` 클래스 추가
- `.sticky-cta` 숨김, `.header` sticky 해제
- `window.parent.postMessage({ type: 'preview-ready' }, '*')` 송신
- `{ type: 'config', payload }` 수신 시 `renderPage(payload)`

---

## 6. 어드민 (`admin.html`) 기능 스펙

### 6-1. 레이아웃

| 영역 | 사양 |
| --- | --- |
| Topbar | height 56px, 좌 타이틀 + 우 액션 4개 |
| Panel (좌) | width 440px, 회색 배경, 세로 스크롤 |
| Preview (우) | flex:1, iframe 100% |
| `< 1026` | 세로 스택 (panel 55vh 상단) |

### 6-2. Topbar 액션

| 버튼 | variant | 동작 |
| --- | --- | --- |
| 초기화 | `.btn--ghost` | confirm 후 defaultConfig 복원 |
| 가져오기 | `.btn--secondary` | file input → JSON.parse → state.config 교체 |
| 코드 복사 | `.btn--secondary` | `const pageConfig = {...}` 클립보드 |
| JSON 내보내기 | `.btn--primary` | `config-{slug}.json` 다운로드 |

### 6-3. 섹션 구성

1. **페이지 메타** — title, slug (slug 입력 시 §4-3 규약 검증)
2. **공통 헤더** — logo, ctaText, ctaHref
3. **컴포넌트 리스트** — 아코디언 카드
4. **풋터** — text

### 6-4. 컴포넌트 카드 액션

| 액션 | 아이콘 | 동작 |
| --- | --- | --- |
| 표시/숨김 | 👁 / 🙈 | `c.visible` 토글 |
| 위로 | ↑ | swap with `i-1` |
| 아래로 | ↓ | swap with `i+1` |
| 복제 | ⎘ | `splice(i+1, 0, clone(c))` |
| 삭제 | ✕ | confirm 후 splice |

### 6-5. 컴포넌트 에디터 필수 필드

| 타입 | 필드 |
| --- | --- |
| banner | backgroundImage, eyebrow, title (textarea), subtitle |
| serviceToggle | title (textarea), services[] (icon/label/value/**enabled**), defaultValue (select), addon on/off |
| contactForm | title, fields[] (name/label/placeholder/type), consentText, consentHref, submitText, webhookUrl |
| contentImage | src, alt, caption |

> serviceToggle 에디터의 **defaultValue select**는 `enabled: true` 항목만 옵션으로 표시.
> 

### 6-6. 영속성

- `localStorage` key: `lp-builder-admin-config-v1`
- 모든 input 변경 시 debounce 150ms 자동 저장
- 초기 로드: `loadLocal() ?? defaultConfig`

---

## 7. Apps Script (`apps-script-webhook.gs`)

### 7-1. 시트 구성

| 탭 | 용도 |
| --- | --- |
| `submissions` | 리드 적재 (헤더 10개) |
| `errors` | 실패 로그 (at, error, rawBody) |

### 7-2. `submissions` 컬럼

```
submittedAt · pageSlug · name · phone · service · addons ·
consentAgreed · userAgent · referrer · receivedAt
```

### 7-3. 서버 검증 (클라이언트 우회 방어)

```jsx
// SYSTEM §4-1 validators와 동일 규칙 서버에서도 적용
if (!/^[가-힣a-zA-Z\s]{1,50}$/.test(name))   return respond({ ok: false, error: 'invalid_name' });
if (!/^01[0-9]{8,9}$/.test(phone))            return respond({ ok: false, error: 'invalid_phone' });
if (payload.consentAgreed !== true)           return respond({ ok: false, error: 'consent_required' });
```

### 7-4. 배포 설정

| 항목 | 값 |
| --- | --- |
| 실행 계정 | 시트 소유자 본인 |
| 액세스 권한 | 모든 사용자 |
| 시트 위치 | 사내 Drive / Confidential 폴더 |
| 시트 공유 | 초대된 사용자만 (3명 이내) |

---

## 8. 보안 & 개인정보

| 항목 | 정책 |
| --- | --- |
| 시트 | "초대된 사용자만", 가상화 PC 열람 권장 |
| Append-only | 수정·삭제 금지 (사내 공식 수집툴 정책 준수) |
| 보유 기간 | 90일 내 CRM 이관 또는 삭제 |
| 동의 증빙 | `consentAgreed: true`만 appendRow |
| 엑셀 다운로드 | 비밀번호 설정 필수 |

---

## 9. Acceptance Criteria

### 9-1. 빌더

- [ ]  모든 CSS 값이 SYSTEM 토큰으로만 표현됨 (magic number 0)
- [ ]  모든 폼 인풋이 SYSTEM §3-5 `.field` 구조 사용
- [ ]  모든 에러 메시지가 SYSTEM §4-3 ERROR 사전에서 옴
- [ ]  `visible: false` 컴포넌트 DOM 제외
- [ ]  contentImage 0개일 때 footer 뷰포트 바닥 정렬
- [ ]  banner backgroundImage 유무에 따라 텍스트 색 자동 전환
- [ ]  serviceToggle `enabled: false` 서비스 그리드에서 제외
- [ ]  이름/연락처 blur 후 에러 표시 → input으로 유효해지면 즉시 해제
- [ ]  연락처 "010-1234-5678" 허용, "0101234" 거부
- [ ]  동의 미체크 제출 시 consent로 포커스 이동
- [ ]  `?mode=preview`에서 sticky-cta 숨김 + postMessage 수신
- [ ]  VoiceOver에서 에러 자동 낭독

### 9-2. 어드민

- [ ]  모든 UI가 SYSTEM §2~3 토큰/컴포넌트 재사용
- [ ]  150ms debounce 후 프리뷰 반영
- [ ]  컴포넌트 액션 5종(표시/↑/↓/⎘/✕) 동작
- [ ]  serviceToggle enabled 체크 시 defaultValue select 옵션 업데이트
- [ ]  JSON 가져오기 스키마 검증 실패 시 alert + state 유지
- [ ]  `< 1026` 세로 스택 레이아웃

### 9-3. Apps Script

- [ ]  첫 POST 시 submissions 탭 자동 생성
- [ ]  `consentAgreed: true`만 appendRow
- [ ]  검증 실패 시 errors 탭 로깅
- [ ]  `doGet` 헬스체크 응답

---

## 부록 A. 기본 defaultConfig

```jsx
const defaultConfig = {
  meta: { title: '아정당 · 내 최대 지원금 확인', slug: 'InternetRental_01_260417_ally' },
  header: { logo: '아정당', ctaText: '상담하기', ctaHref: '#contact' },
  components: [
    { type: 'banner', visible: true, props: {
        backgroundImage: null,
        eyebrow: '이번 달 혜택',
        title: '가입만 해도 <em class="hl">상품권 최대 50만원</em><br>+ 매월 할인까지',
        subtitle: '조건 입력 5초 → 전문 상담원이 직접 연락드려요'
    }},
    { type: 'serviceToggle', visible: true, props: {
        title: '놓치고 있던 <em class="hl">내 최대 지원금</em><br>아정당이 알려드릴게요!',
        services: [
          { value: 'internet', label: '인터넷', icon: '📶', enabled: true },
          { value: 'rental',   label: '렌탈',   icon: '💧', enabled: true },
          { value: 'moving',   label: '이사',   icon: '📦', enabled: true }
        ],
        defaultValue: 'internet',
        addon: { key: 'carrier_change', label: '휴대폰 통신사 바꾸고 추가 현금사은품 받기' }
    }},
    { type: 'contactForm', visible: true, props: {
        title: '상담 신청하기',
        fields: [
          { name: 'name',  label: '이름',   placeholder: '홍길동', required: true, type: 'text' },
          { name: 'phone', label: '연락처', placeholder: "'-' 없이 숫자만 입력", required: true, type: 'tel' }
        ],
        consentText: '개인정보 수집·이용에 동의합니다. (항목: 이름, 연락처 / 목적: 상담 연락 / 보유기간: 90일)',
        consentHref: 'https://www.ohou.se/policy/privacy',
        submitText: '신청하기',
        webhookUrl: 'PASTE_YOUR_APPS_SCRIPT_URL_HERE'
    }},
    { type: 'contentImage', visible: true, props: { src: '', alt: '혜택 안내 이미지', caption: '✨ 가입 시 상품권 최대 50만원 + 월 할인 2만원' }},
    { type: 'contentImage', visible: true, props: { src: '', alt: '설치 프로세스', caption: '설치기사 무료 방문 · 최대 3일 내 설치 완료' }}
  ],
  footer: { text: '© 2026 아정당 · 고객센터 1544-0000 · 사업자등록번호 000-00-00000' }
};
```