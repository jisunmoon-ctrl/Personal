# 📐 SYSTEM — Design System

**Version**: 1.4.0

**Last Updated**: 2026-04-17

**Scope**: 본 프로젝트 내 모든 UI (builder.html, admin.html)

---

## 0. 준수 원칙

이 문서는 프로젝트의 **UI Single Source of Truth** 입니다.

### 0-1. 반드시 지킨다

- 모든 색상·radius·폰트 크기·spacing은 본 문서의 **디자인 토큰만** 사용
- 모든 인풋·버튼은 본 문서의 **Base Elements (§3)** 스펙을 재사용
- 모든 폼 검증은 본 문서의 **Validators (§4)** 를 재사용
- 모든 에러 메시지는 본 문서의 **Error Dictionary (§4-3)** 에서 참조
- SPEC 변경 전에 [SYSTEM.md](http://SYSTEM.md)에서 제공 가능한지 먼저 확인

### 0-2. 금지

- [SPEC.md](http://SPEC.md)나 구현 파일에서 **magic number** (색상 hex, px 값 직접 기재) 사용
- 같은 인풋을 재정의하거나 다른 스타일로 변형
- 에러 메시지 문구를 코드 내에 하드코딩 (본 문서 참조 원칙)
- 본 문서 외부에서 새로운 토큰·컴포넌트 선언

### 0-3. 확장 절차

새 토큰이나 컴포넌트가 필요하면:

1. 본 문서에 먼저 추가 (PR로 별도 리뷰)
2. 기존 토큰으로 해결 가능한지 재검토
3. 승인 후 [SPEC.md](http://SPEC.md) 및 구현 파일에서 참조

---

## 0-4. HTML 화면 구성 원칙 (UX / Layout / Input / Button)

### UX 목적

- 사용자는 핵심 행동(Primary CTA)까지 가능한 짧은 경로로 도달해야 한다.
- 입력 → 확인 → 오류 처리 → 보조 행동이 한 흐름에서 자연스럽게 이어져야 한다.
- 화면 내 가장 중요한 행동은 시각적으로 가장 먼저 인지되어야 한다.

### 레이아웃 원칙

- 화면 좌우 여백은 Breakpoint별 정의된 패딩 값(`§2-5`)을 사용한다.
- 주요 콘텐츠 영역은 화면 중앙 정렬을 기본으로 한다.
- 핵심 CTA는 첫 화면(above the fold)에서 확인 가능해야 한다.
- 보조 행동 요소는 주요 CTA 아래에 배치한다.
- 주요 CTA와 보조 행동 요소 간 간격은 `16px`(`--space-4`)을 유지한다.

### 인풋 필드 원칙

- 입력창 높이는 `§3-2 Text Input`의 정의(`.input--32`, `.input--40`)를 따른다.
- 입력창(또는 필드) 사이 간격은 `12px ~ 16px`(`--space-3` ~ `--space-4`) 범위에서 유지한다.

### 버튼 원칙

- 버튼 컬러는 디자인 시스템 토큰(`§2-1`)만 사용한다.
- `Primary` 컬러는 핵심 CTA에 우선 배정한다.
- 핵심 CTA를 제외한 요소에서 `Primary` 컬러 사용을 지양한다.

## 1. 폰트 스택

```css
font-family: 'Pretendard', -apple-system, BlinkMacSystemFont,
             'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
```

- 외부 CDN 로드 금지 (system font fallback만)
- `letter-spacing: -0.3px` 기본 (ODS typography frame 기준)
- `-webkit-font-smoothing: antialiased`

---

## 2. Design Tokens

### 2-0. Figma Source of Truth

- Color Alias: `node-id=58024:4643`
- Typography: `node-id=47320:24250`
- Grid / Layout: `node-id=47320:24799`
- Shadow: `node-id=47320:24758`

모든 신규 토큰 추가/수정은 위 4개 프레임 기준으로만 수행한다.

### 2-1. Color

```css
:root {
  /* Neutral (Alias) */
  --ods-bg:                   #FFFFFF; /* BG/Neutral/background (light) */
  --ods-bg-inverse:           #141414; /* BG/Neutral/background-inverse (light) */
  --ods-bg-weak:              #F5F5F5; /* BG/Neutral/background-weak (light) */
  --ods-fg:                   #141414; /* FG/Neutral/foreground (light) */
  --ods-fg-weak:              #8C8C8C; /* FG/Neutral/foreground-weak (light) */
  --ods-border:               #E0E0E0; /* Border/Neutral/border (light) */

  /* Brand (Alias) */
  --ods-brand:                #00A1FF; /* Brand/BG/background-brand */
  --ods-brand-weak:           #F0F8FC; /* Brand/BG/background-brand-weak (light) */

  /* Semantic (Alias / light 기준) */
  --ods-fg-attention:         #B27800; /* Semantic/FG/foreground-attention */
  --ods-fg-critical:          #F05656; /* Semantic/FG/foreground-critical */
  --ods-fg-emphasis:          #00A1FF; /* Semantic/FG/foreground-emphasis */

  /* Overlay / alpha */
  --ods-overlay:              rgba(0, 0, 0, 0.05);  /* BG/Dim/background-overlay (light) */
  --ods-overlay-dark:         rgba(255, 255, 255, 0.05); /* BG/Dim/background-overlay (dark) */

  /* Project semantic mapping (builder/admin 공통) */
  --color-primary:            var(--ods-brand);
  --color-primary-dark:       #008DE0; /* brand hover 용 */
  --color-primary-soft:       var(--ods-brand-weak);
  --color-bg:                 var(--ods-bg);
  --color-surface:            var(--ods-bg-weak);
  --color-surface-2:          #EEF1F4;
  --color-text:               var(--ods-fg);
  --color-text-sub:           var(--ods-fg-weak);
  --color-text-muted:         #ACACAC; /* FG/Neutral/foreground-weak (dark alias) */
  --color-border:             var(--ods-border);
  --color-border-strong:      var(--ods-fg);
  --color-success:            #00A1FF; /* ODS emphasis 계열 사용 */
  --color-error:              var(--ods-fg-critical);
  --color-error-soft:         #FEE2E2; /* 기존 UX 가독성 보정용 */
}
```

### 2-2. Radius

```css
--radius-sm: 4px;    /* 작은 뱃지, checkbox */
--radius-md: 8px;    /* 인풋, 버튼 기본 */
--radius-lg: 12px;   /* 카드, 이미지 */
--radius-xl: 16px;   /* 큰 모달 */
```

### 2-3. Typography

```css
/* ODS size scale */
--font-10: 10px;
--font-11: 11px;
--font-12: 12px;
--font-13: 13px;
--font-14: 14px;
--font-15: 15px;
--font-16: 16px;
--font-17: 17px;
--font-18: 18px;
--font-20: 20px;
--font-24: 24px;
--font-32: 32px;
```

**Figma Typography token 기준**

- Heading: `32/24/20/18/17` (weight `400/500/600/700`)
- Body: `16` (`line-height: 28|24|20`), `15` (`line-height: 24`), `14` (`line-height: 20|18`)
- Detail: `13` (`line-height: 18`), `12` (`line-height: 20|16`), `11` (`line-height: 14`), `10` (`line-height: 14`)
- letter-spacing: `-0.3px` (ODS frame 기준)

**Weight 규칙**: `400` 일반, `500` 라벨, `600` 버튼·CTA, `700` 타이틀

### 2-4. Spacing

```css
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;
--space-4:  16px;
--space-5:  20px;
--space-6:  24px;
--space-8:  32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
```

### 2-5. Layout

```css
--container-max: 1256px; /* ODS desktop grid width (margin 포함) */
--content-max: 1136px;   /* ODS desktop content width */
--header-height: 56px;
```

**Breakpoints (ODS Grid frame 기준)**

- 고정 기준점: `768`, `1024`, `1256`

| Viewport | Margin | Container | Notes |
| --- | --- | --- | --- |
| `< 768` | `16px` | `calc(100vw - 32px)` | mobile 단일 컬럼 |
| `768 – 1023` | `40px` | `calc(100vw - 80px)` | tablet, mobile flow 유지 |
| `1024 – 1255` | `60px` | `904px` at 1024 | desktop compact |
| `>= 1256` | `60px` | `1136px` fixed | desktop 12-column |

**Desktop 12-column 세부값**

- total width: `1256px`
- outer margin: `60px x 2`
- container: `1136px`
- column: `76.3333px` x 12
- gutter: `20px` x 11

### 2-6. Shadow

```css
--shadow-depth-10: 0 2px 5px rgba(63, 71, 77, 0.05);
--shadow-depth-20: 0 2px 5px rgba(63, 71, 77, 0.15);
--shadow-depth-30: 0 2px 10px rgba(63, 71, 77, 0.25);
```

**Dark mode 규칙**: ODS `47320:24758` 기준, 다크 모드에서는 drop shadow를 사용하지 않는다.

### 2-7. Transition

```css
--transition-fast: 0.15s ease;
--transition-base: 0.2s ease;
```

---

## 3. Base Elements

### 3-1. Button

Figma 기준: `3739:69767` (`🌀 Box Button`)

| Variant | 사용처 |
| --- | --- |
| `.btn--normal` | 기본 중립 버튼 |
| `.btn--solid` | 중립 채움 버튼 |
| `.btn--outlined` | 중립 외곽선 버튼 |
| `.btn--brand-solid` | 브랜드 주요 CTA |
| `.btn--brand-outlined` | 브랜드 보조 CTA |
| `.btn--ghost` | 텍스트 액션 |
| `.btn--danger` | 파괴 액션 |

```css
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2);
  height: 40px;
  min-width: 95px;
  padding: 0 14px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  font-size: var(--font-14);
  font-weight: 500;
  cursor: pointer;
  transition: background var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast);
}

.btn--xs { height: 28px; min-width: 76px; padding: 0 12px; font-size: var(--font-12); }
.btn--sm { height: 32px; min-width: 85px; padding: 0 12px; font-size: var(--font-13); }
.btn--md { height: 40px; min-width: 95px; padding: 0 14px; font-size: var(--font-14); }
.btn--lg { height: 44px; min-width: 106px; padding: 0 16px; font-size: var(--font-15); }
.btn--xl { height: 48px; min-width: 117px; padding: 0 18px; font-size: var(--font-16); }

.btn--normal { background: #fff; color: var(--color-text); border-color: var(--color-border); }
.btn--normal:hover:not(:disabled) { background: var(--color-surface); }
.btn--solid { background: var(--color-text); color: #fff; border-color: var(--color-text); }
.btn--solid:hover:not(:disabled) { filter: brightness(0.95); }
.btn--outlined { background: #fff; color: var(--color-text); border-color: var(--color-text); }
.btn--outlined:hover:not(:disabled) { background: var(--color-surface); }
.btn--brand-solid { background: var(--color-primary); color: #fff; border-color: var(--color-primary); }
.btn--brand-solid:hover:not(:disabled) { background: var(--color-primary-dark); border-color: var(--color-primary-dark); }
.btn--brand-outlined { background: #fff; color: var(--color-primary); border-color: var(--color-primary); }
.btn--brand-outlined:hover:not(:disabled) { background: var(--color-primary-soft); }

.btn--ghost { background: transparent; color: var(--color-text-sub); }
.btn--ghost:hover { background: var(--color-surface); color: var(--color-text); }

.btn--danger { background: transparent; color: var(--color-error); border-color: rgba(239, 68, 68, 0.3); }
.btn--danger:hover { background: var(--color-error-soft); }

.btn:disabled { opacity: 0.45; cursor: not-allowed; }
.btn.is-loading { pointer-events: none; }
.btn.is-loading::before {
  content: '';
  width: 12px; height: 12px; border-radius: 50%;
  border: 2px solid currentColor; border-right-color: transparent;
  animation: btn-spin 0.7s linear infinite;
}
@keyframes btn-spin { to { transform: rotate(360deg); } }

.btn--submit {
  height: 52px;
  width: 100%;
  font-size: var(--font-17);
  border-radius: var(--radius-md);
}

/* backward compatibility */
.btn--primary { background: var(--color-primary); color: #fff; border-color: var(--color-primary); }
.btn--primary:hover:not(:disabled) { background: var(--color-primary-dark); border-color: var(--color-primary-dark); }
.btn--secondary { background: #fff; color: var(--color-text); border-color: var(--color-border); }
.btn--secondary:hover:not(:disabled) { background: var(--color-surface); }
```

### 3-2. Text Input

Figma 기준: `47047:72484` (`🌀 Input Field`)

```html
<div class="input-field">
  <label class="input-field__title">Title</label> <!-- optional -->
  <div class="input-field__control">
    <input
      class="input input--32|input--40"
      type="text|tel|email|url"
      name="..." id="f-..."
      placeholder="..."
      autocomplete="..."
      inputmode="..."
      aria-invalid="false"
      aria-describedby="f-...-help f-...-error"
      required aria-required="true"
    />
    <button class="input-field__text-btn">버튼</button> <!-- optional -->
    <button class="input-field__clear">×</button>       <!-- typing/complete 시 -->
  </div>
  <div class="input-field__help" id="f-...-help">Help text</div> <!-- optional -->
</div>
```

```css
.input {
  width: 100%;
  height: 40px;
  padding: 0 var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg);
  font-size: var(--font-14);
  color: var(--color-text);
  transition: border-color var(--transition-fast);
}

.input--32 { height: 32px; font-size: var(--font-14); line-height: 20px; }
.input--40 { height: 40px; font-size: var(--font-16); line-height: 24px; }

.input::placeholder { color: var(--color-text-muted); }
.input:hover:not(:focus):not(.is-error) { border-color: var(--color-border); }
.input:focus { outline: none; border-color: var(--color-primary); }
.input.is-error { border-color: var(--color-error); }
.input:disabled { background: var(--color-surface-2); color: var(--color-text-muted); cursor: not-allowed; }
```

**상태 정의 (Figma Size/State)**

| Error | State | 시각 규칙 | 동작 규칙 |
| --- | --- | --- | --- |
| false | Inactive | 기본 border | 포커스 없음 |
| false | Pressed | primary border | focus 진입 직후 |
| false | Typing | primary border + clear 노출 | 입력 중 |
| false | Complete | 기본 border + clear 노출 가능 | blur 후 값 유지 |
| false | Disabled | disabled 배경/텍스트 | 입력 불가 |
| true | Inactive | error border | 검증 실패, 포커스 없음 |
| true | Completed | error border + 값 표시 | 검증 실패 상태에서 값 존재 |

**옵션 조합 규칙 (Figma Title/Help/Text/Clear)**

- `title`: 선택, 상단 설명 레이블
- `help text`: 선택, 하단 설명/가이드
- `text button`: 선택, 우측 보조 액션
- `clear button`: 선택, 타이핑/완료 시 노출
- `help text`와 `counter`는 동시에 사용하지 않는다

**inputmode 매핑 (모바일 키패드)**

| `type` | `inputmode` |
| --- | --- |
| text | `text` |
| tel | `tel` |
| email | `email` |
| number | `numeric` |

### 3-3. Textarea

```css
.textarea {
  /* .input 과 동일 + */
  min-height: 80px;
  padding: var(--space-3) var(--space-4);
  line-height: 1.5;
  resize: vertical;
  font-family: inherit;
}
```

### 3-4. Checkbox

```html
<label class="checkbox">
  <input type="checkbox" required aria-required="true" />
  <span class="checkbox__label">동의 문구</span>
</label>
```

```css
.checkbox {
  display: flex; align-items: flex-start; gap: var(--space-2);
  cursor: pointer;
  font-size: var(--font-12);
  color: var(--color-text-sub);
  line-height: 1.5;
}
.checkbox input {
  width: 16px; height: 16px;
  margin-top: 2px;
  flex-shrink: 0;
  accent-color: var(--color-primary);
  cursor: pointer;
}
```

### 3-5. Form Field (label + input + error)

**모든 폼 인풋은 반드시 이 구조로**:

```html
<div class="field">
  <label class="field__label" for="f-{name}">
    {label}
    <span class="field__required" aria-hidden="true">*</span>
  </label>
  <input class="input" id="f-{name}" name="{name}" ... />
  <div class="field__error"
       id="f-{name}-error"
       data-error-for="{name}"
       role="alert"
       aria-live="polite"></div>
</div>
```

```css
.field { display: flex; flex-direction: column; gap: var(--space-2); }
.field__label { font-size: var(--font-14); font-weight: 500; color: var(--color-text); }
.field__required { color: var(--color-error); margin-left: 2px; }
.field__error {
  font-size: var(--font-12);
  color: var(--color-error);
  min-height: 16px;        /* 레이아웃 흔들림 방지 — 절대 제거 금지 */
  line-height: 1.4;
}
```

**에러 영역 규칙**

- **`min-height: 16px` 고정**: 에러 유무와 관계없이 공간 예약
- **`role="alert"` + `aria-live="polite"`**: 에러 발생 시 스크린리더 자동 낭독
- **`aria-describedby`로 input과 연결**

### 3-6. Form Status (필드 외 에러)

```html
<div class="form-status" id="form-status" role="status" aria-live="polite"></div>
```

```css
.form-status {
  text-align: center;
  margin-top: var(--space-3);
  min-height: 20px;
  font-size: var(--font-14);
}
.form-status.is-success { color: var(--color-success); }
.form-status.is-error   { color: var(--color-error); }
```

---

## 4. Input Validation

### 4-1. Validators

```jsx
// 이름: 한글/영문/공백 1~50자
function validateName(raw) {
  const v = (raw || '').trim();
  if (!v) return ERROR.NAME_EMPTY;
  if (v.length > 50) return ERROR.NAME_TOO_LONG;
  if (!/^[가-힣a-zA-Z\s]+$/.test(v)) return ERROR.NAME_INVALID_CHAR;
  return null;
}

// 연락처: 01X로 시작하는 10~11자리 숫자 (하이픈/공백 자동 제거)
function validatePhone(raw) {
  const v = (raw || '').replace(/[-\s]/g, '');
  if (!v) return ERROR.PHONE_EMPTY;
  if (!/^01[0-9]{8,9}$/.test(v)) return ERROR.PHONE_INVALID;
  return null;
}

// 개인정보 수집 동의
function validateConsent(checked) {
  return checked ? null : ERROR.CONSENT_REQUIRED;
}
```

**반환 규칙**: 에러 시 `ERROR` 사전의 문자열, 유효 시 `null`.

### 4-2. Validation Timing

| 시점 | 동작 |
| --- | --- |
| 초기 로드 | 에러 표시 없음 |
| `blur` | `fieldTouched[name] = true` → 검증 → 에러 표시 |
| `input` | `fieldTouched[name] === true`일 때만 실시간 재검증 → 유효 시 즉시 해제 |
| `submit` | 전 필드 검증 → 첫 invalid 필드로 `.focus()` |
| 동의 체크 | 체크 즉시 상단 `.form-status` 에러 해제 |

**UX 원칙**: 첫 타이핑 중에는 침묵, 한 번 에러가 뜨면 실시간으로 회복 신호.

### 4-3. Error Dictionary

```jsx
const ERROR = {
  NAME_EMPTY:        '이름을 입력해주세요.',
  NAME_TOO_LONG:     '이름은 50자 이내로 입력해주세요.',
  NAME_INVALID_CHAR: '한글 또는 영문만 입력해주세요.',

  PHONE_EMPTY:       '연락처를 입력해주세요.',
  PHONE_INVALID:     '올바른 휴대폰 번호를 입력해주세요. (예: 010-1234-5678)',

  CONSENT_REQUIRED:  '개인정보 수집·이용 동의가 필요해요.',

  NETWORK_FAIL:      '전송에 실패했어요. 잠시 후 다시 시도해주세요.',
  WEBHOOK_MISSING:   'webhookUrl이 설정되지 않았어요.',
};

const SUCCESS = {
  SUBMITTED:         '✓ 신청이 접수되었어요. 곧 연락드릴게요.',
};
```

### 4-4. setFieldError Helper

```jsx
function setFieldError(name, msg) {
  const input = document.querySelector(`[name="${name}"]`);
  const err   = document.querySelector(`[data-error-for="${name}"]`);
  if (input) {
    input.classList.toggle('is-error', !!msg);
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
  }
  if (err) err.textContent = msg || '';
}
```

---

## 5. Accessibility Rules

| 요소 | 필수 속성 |
| --- | --- |
| Text Input | `aria-invalid`, `aria-describedby`, `aria-required` (required 시), `autocomplete` |
| Checkbox | `aria-required` (필수 시), 반드시 `<label>` 래핑 |
| Button (icon-only) | `aria-label` 또는 `title` |
| Radio group | 컨테이너에 `role="radiogroup"`, 각 옵션에 `role="radio"`, `aria-checked` |
| 에러 메시지 영역 | `role="alert"`, `aria-live="polite"` |
| 폼 상태 메시지 | `role="status"`, `aria-live="polite"` |
| 이미지 | `alt` 필수 (장식 이미지는 `alt=""`) |

**키보드 접근성**: 모든 버튼 Tab 포커스 · Radio는 Space/Enter · 폼 제출은 Enter · Focus indicator 제거 금지.

---

## 6. UX Writing Tone

### 6-1. 원칙

| 금지 | 권장 |
| --- | --- |
| ~이 잘못되었습니다 | ~해주세요 |
| 오류 발생 | ~을 확인해주세요 |
| 필수 항목입니다 | ~이 필요해요 |
| 실패 | 전송에 실패했어요 |
| 반말 / 딱딱한 공지 | 부드러운 존댓말 (~해요, ~드릴게요) |

### 6-2. 상태별 톤

- **에러**: 요청형 ("~해주세요" / "~이 필요해요")
- **성공**: 안내형 ("✓ 접수되었어요. 곧 연락드릴게요")
- **진행 중**: 현재형 ("접수 중…" / "전송 중…")
- **힌트**: 정보형 ("~할 수 있어요" / "예: ~")

### 6-3. 이모지 사용

- 성공 메시지 앞에 `✓` 허용
- 체크리스트·혜택 나열에 `✨` 허용
- 에러 메시지에는 이모지 금지
- 과도한 이모지(🙏 등) 문서/공식 UI에서 제외

---

## 7. 변경 이력

| Version | Date | Change |
| --- | --- | --- |
| 1.4.0 | 2026-04-17 | HTML 화면 구성 원칙(UX/레이아웃/인풋/버튼) 추가 및 검수 기준 명문화 |
| 1.3.0 | 2026-04-17 | Button 컴포넌트 정의 확장 (variant/size/loading/disabled) 및 html 동기화 기준 추가 |
| 1.2.0 | 2026-04-17 | Input 컴포넌트 정의 확장 (size/state/error/title/help/text/clear) 및 html 동기화 기준 추가 |
| 1.1.0 | 2026-04-17 | Figma 4개 프레임 기준 토큰 동기화 (color alias, typography scale, grid, shadow) |
| 1.0.0 | 2026-04-17 | Initial release — 토큰, 인풋, 검증, 에러 사전 확정 |