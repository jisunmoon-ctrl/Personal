# ⚙️ .cursorrules — Cursor 운영 규칙

> 이 페이지의 내용을 프로젝트 루트의 `.cursorrules` 파일로 저장하면 Cursor가 자동으로 본 규칙을 컨텍스트로 사용합니다.
> 

```
# 프로젝트: 마케팅 LP 빌더

## 절대 규칙

### 1. SYSTEM.md가 UI의 Single Source of Truth
- 모든 색상·radius·폰트·spacing·breakpoint는 SYSTEM.md §2 토큰만 사용
- 모든 인풋·버튼·폼 필드는 SYSTEM.md §3 Base Elements 재사용
- 모든 폼 검증은 SYSTEM.md §4 Validators 재사용
- 모든 에러 메시지는 SYSTEM.md §4-3 ERROR 사전 참조
- magic number (hex 색상, px 값 직접 기재) 사용 금지
- SYSTEM.md에 없는 새 UI가 필요하면 SYSTEM.md부터 PR로 확장

### 2. SPEC.md는 기능만 정의
- UI 세부를 SPEC.md에 직접 기재 금지 (SYSTEM.md 참조로 대체)
- Config 스키마, 동작, AC만 정의

### 3. 금기
- 외부 CDN / npm 패키지 추가 금지 (system font 제외)
- 단일 HTML 구조 유지 (번들러 도입 금지)
- TypeScript 도입 금지 (Phase 1)
- 개인정보(이름·전화번호) 로그 출력 금지
- contact form의 name/phone 필드 제거 금지
- localStorage key 변경 금지 (lp-builder-admin-config-v1 고정)

## 컨벤션

- 파일명: kebab-case
- CSS 클래스: BEM (block__element--modifier)
- JS 함수/변수: camelCase
- config 필드: camelCase
- sheet 컬럼: camelCase
- slug: {PascalCase}_{NN}_{YYMMDD}_{담당자} (예: InternetRental_01_260417_ally)
- 단일 HTML 내부는 §A, §B, §1, §2 주석으로 섹션 구분

## 작업 순서

1. UI 수정 요청 시 SYSTEM.md에서 해당 토큰/컴포넌트 확인
2. 없으면 SYSTEM.md 먼저 업데이트 (별도 PR 권장)
3. 있으면 SPEC.md 기능 변경 후 구현
4. 구현 후 SYSTEM.md/SPEC.md AC 체크리스트로 검증

## 검증 체크리스트 (매 커밋 전)

- [ ] CSS에 magic number가 있는가? (있으면 → 토큰으로 교체)
- [ ] 새 인풋/버튼이 SYSTEM.md §3 재사용하는가?
- [ ] 에러 메시지가 ERROR 사전에서 왔는가?
- [ ] 접근성 속성(aria-*, role) 누락 없는가?
- [ ] 개인정보가 console.log에 찍히지 않는가?
```

---

## Cursor에서 사용하는 방법

1. Cursor 프로젝트 루트에 `.cursorrules` 파일 생성
2. 위 코드 블록 내용 붙여넣기 (앞뒤 ` 제외)
3. Cursor 재시작 (또는 프로젝트 다시 열기)
4. 모든 AI 작업 시 이 규칙이 자동 적용됨

## 사용 예시 프롬프트

**새 컴포넌트 추가**:

```
새 빌더 컴포넌트 추가해줘.
@SYSTEM.md 의 토큰과 인풋 규칙을 따르고,
@SPEC.md 의 컴포넌트 스키마에 맞춰서.
```

**UI 수정**:

```
배너 타이틀 크기 조정 필요.
@SYSTEM.md §2-3 Typography 토큰 범위 내에서 제안해줘.
새 크기가 필요하면 SYSTEM.md 업데이트 먼저.
```

**기능 추가**:

```
serviceToggle에 다중 선택 지원 기능 추가해줘.
@SPEC.md 컴포넌트 스키마 먼저 확장 후 구현.
```