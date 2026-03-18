# Ralph Loop — 프로덕트 디자이너를 위한 활용 가이드

> "야, 해줘" → "야, **끝까지** 해줘"
> Ralph Loop는 코딩 전용이 아니다. **문서화, 분석, 리서치, 감사** — 완료 조건이 명확한 모든 작업에 쓸 수 있다.

---

## 왜 디자이너에게도 유용한가?

Ralph Loop가 잘 작동하는 조건:
- ✅ 완료 조건이 **명확**한 작업
- ✅ **반복·대량 처리**가 필요한 작업
- ✅ 결과물을 **자동 검증** 가능한 작업

디자이너의 업무 중 상당 부분이 이 조건에 해당한다:

| 디자이너 업무 | Ralph Loop 적합도 | 이유 |
|---|---|---|
| 디자인 시스템 문서화 | ⭐⭐⭐ | 컴포넌트 수 = 완료 기준, 반복 작업 |
| UX 라이팅 정리 | ⭐⭐⭐ | 메시지 수 = 완료 기준, 일관성 검증 가능 |
| 접근성 감사 | ⭐⭐⭐ | WCAG 기준 = 명확한 체크리스트 |
| 경쟁사 분석 | ⭐⭐⭐ | 분석 항목 수 = 완료 기준 |
| 유저 플로우 문서화 | ⭐⭐ | 구조화된 결과물, 엣지케이스 발견 |
| 디자인 QA 체크리스트 | ⭐⭐⭐ | 항목별 체크 = 자동 검증 |
| 비주얼 디자인 | ⭐ (부적합) | 주관적 판단 필요, 사람이 봐야 함 |

---

## 카테고리별 활용 예시

---

### 📚 카테고리 1: 디자인 시스템 & 문서화

디자이너가 가장 미루는 일 = 문서화. Ralph Loop에 맡기면 밤새 컴포넌트 20개 문서가 완성된다.

#### 예시 1-1. 디자인 시스템 컴포넌트 문서 일괄 생성

> **실제 사례**: MC Dean이라는 디자이너가 Claude용 [63개 디자인 스킬을 8개 플러그인으로 만들어 공개](https://marieclairedean.substack.com/p/i-built-63-design-skills-for-claude)했다. 디자인 시스템 감사 시 토큰 커버리지, 네이밍 일관성, 접근성 준수, 테마 지원을 자동으로 검사한다.

```
/ralph-wiggum:ralph-loop "
디자인 시스템의 모든 컴포넌트 문서를 작성해줘.

대상 컴포넌트: Button, Input, Modal, Toast, Card, Badge, Avatar, Tooltip, Dropdown, Tab

각 컴포넌트마다 포함할 것:
- 용도 설명 (언제 쓰는지 / 언제 쓰면 안 되는지)
- Props 정리 (variant, size, state 등)
- Do / Don't 가이드라인 3개 이상
- 접근성(a11y) 체크리스트
- 사용 예시 코드 스니펫

완료 조건:
- 10개 컴포넌트 모두 문서화 완료
- 각 컴포넌트에 Do/Don't가 3개 이상
- 접근성 항목이 WCAG 2.1 AA 기준 포함
- 모든 문서가 동일한 포맷

완료하면 <promise>DONE</promise> 출력.
" --completion-promise "DONE" --max-iterations 20
```

#### 예시 1-2. 디자인 토큰 감사 & 정리

> **실제 사례**: Ralph의 [Iterative Audit Loop 패턴](https://gist.github.com/ledbetterljoshua/e4cfefda69fa600bbe5bbe3f3c205634)은 audit.json으로 항목을 추적하고, 매 반복마다 하나씩 감사하며, 새로운 이슈를 발견하면 자동으로 목록에 추가한다.

```
/ralph-wiggum:ralph-loop "
우리 디자인 토큰 파일(tokens.json)을 감사해줘.

검사 항목:
- 미사용 토큰 찾기
- 네이밍 컨벤션 불일치 (camelCase vs kebab-case 혼용)
- 중복 값을 가진 토큰 (예: gray-100과 grey-100)
- 시맨틱 토큰과 프리미티브 토큰 매핑 누락
- 다크모드 대응 누락 토큰

출력: audit-report.md에 심각도별(Critical/Major/Minor) 분류
완료 조건:
- 모든 토큰 카테고리(color, spacing, typography, shadow) 검사 완료
- 각 이슈에 수정 제안 포함
- 요약 통계 (총 토큰 수, 이슈 수, 카테고리별 분포)

완료하면 <promise>DONE</promise> 출력.
" --completion-promise "DONE" --max-iterations 15
```

#### 예시 1-3. 개발 핸드오프 문서 자동 생성

> **실제 사례**: 63개 디자인 스킬 중 `/handoff` 커맨드는 "developer handoff package with measurements, behaviours, edge cases"를 자동 생성한다.

```
/ralph-wiggum:ralph-loop "
디자인 → 개발 핸드오프 문서를 만들어줘.

대상 화면: 상품 상세 페이지
포함할 것:
- 섹션별 간격/정렬 명세 (디자인 토큰 기준)
- 인터랙션 명세 (탭, 스와이프, 스크롤, 애니메이션)
- 상태별 UI 변화 (로딩, 에러, 빈 상태, 데이터 있음)
- 반응형 대응 (360px, 390px, 428px)
- 엣지 케이스 (긴 텍스트, 이미지 없음, 재고 부족)

완료 조건:
- 모든 섹션(헤더, 이미지, 상품정보, 리뷰, CTA)에 대한 명세 존재
- 각 섹션에 상태별 UI 3개 이상
- 엣지 케이스 10개 이상

완료하면 <promise>DONE</promise> 출력.
" --completion-promise "DONE" --max-iterations 15
```

---

### 🔍 카테고리 2: 리서치 & 분석

인터뷰 정리, 경쟁사 분석, 벤치마킹 — 시간은 많이 들지만 구조가 명확한 작업들.

#### 예시 2-1. 유저 인터뷰 분석 & 인사이트 도출

> **실제 사례**: [UX Planet의 Claude Skills for Product Designers](https://uxplanet.org/claude-skills-for-product-designers-a453a7a8faa7) 기사에서 "유저 인터뷰 트랜스크립트 분석"을 디자이너의 핵심 자동화 워크플로우로 소개. Claude가 페르소나를 만들 때 demographics, goals, frustrations, behavioural patterns, context of use 프레임워크를 자동으로 적용한다고 설명.

```
/ralph-wiggum:ralph-loop "
interviews/ 폴더에 있는 유저 인터뷰 트랜스크립트 10개를 분석해줘.

분석 방법:
1. 각 인터뷰에서 핵심 발언(quote) 추출
2. 어피니티 다이어그램 방식으로 테마 분류
3. 테마별 빈도수와 대표 발언 정리
4. 페르소나 초안 도출 (demographics, goals, frustrations, behaviors)
5. 디자인 임플리케이션 정리

출력 파일:
- research-synthesis.md (종합 분석)
- personas.md (페르소나 2~3개)
- design-implications.md (디자인 제안)

완료 조건:
- 10개 인터뷰 모두 분석
- 테마 5개 이상 도출
- 각 테마에 인터뷰이 발언 원문 2개 이상 인용
- 페르소나 2개 이상 완성

완료하면 <promise>DONE</promise> 출력.
" --completion-promise "DONE" --max-iterations 20
```

#### 예시 2-2. 경쟁사 UX 벤치마킹 리포트

```
/ralph-wiggum:ralph-loop "
인테리어 커머스 앱 5개의 UX 패턴을 비교 분석해줘.
대상: 쿠팡, 이케아, 무인양품, 집꾸미기, 하우스

분석 항목 (화면별):
[홈] 개인화 방식, 카테고리 구조, 프로모션 배치
[검색] 필터 UX, 정렬 옵션, 검색 결과 레이아웃
[상품 상세] 이미지 뷰어, CTA 위치, 리뷰 표시, 배송 정보
[장바구니] 수량 변경 UX, 품절 처리, 추천 상품
[결제] 단계 수, 입력 필드, 에러 처리

출력:
- comparison-table.md (5개 앱 × 5개 화면 비교표)
- insights.md (패턴별 인사이트)
- recommendations.md (우리 서비스에 적용할 제안 5개 이상)

완료 조건:
- 5개 앱 × 5개 화면 = 25개 셀 모두 채워짐
- 각 화면에 스크린샷 설명 또는 UI 패턴 묘사 포함
- 제안이 구체적이고 실행 가능한 수준

완료하면 <promise>DONE</promise> 출력.
" --completion-promise "DONE" --max-iterations 20
```

#### 예시 2-3. 서베이 설계 & 분석

```
/ralph-wiggum:ralph-loop "
리뷰 기능 개선을 위한 유저 서베이를 설계하고,
기존 서베이 결과(survey-results.csv)를 분석해줘.

Phase 1 - 서베이 설계:
- 연구 질문 3개 정의
- 질문 15개 이내 (5점 리커트 + 객관식 + 개방형 혼합)
- 예상 소요 시간 5분 이내
- 편향 방지 검토 (유도질문 없는지)

Phase 2 - 기존 데이터 분석:
- 응답자 프로필 분포
- 주요 문항 교차분석
- 개방형 응답 코딩 & 테마 분류
- 핵심 인사이트 도출

완료 조건:
- 서베이 질문지 완성 (survey-design.md)
- 분석 리포트 완성 (survey-analysis.md)
- 인사이트 기반 디자인 제안 3개 이상

완료하면 <promise>DONE</promise> 출력.
" --completion-promise "DONE" --max-iterations 15
```

---

### ♿ 카테고리 3: 접근성(a11y) & QA 감사

가장 Ralph Loop에 적합한 영역. 기준이 명확하고(WCAG), 항목이 많고, 빠짐없이 체크해야 한다.

#### 예시 3-1. WCAG 접근성 전수 감사

> **실제 사례**: [Builder.io의 Claude Code for Designers](https://www.builder.io/blog/claude-code-for-designers)에서 디자이너가 Claude로 "WCAG 가이드라인 기준 페이지 감사, 접근 가능한 컴포넌트 변형 자동 생성, 다크모드 자동 변환"을 수행하는 워크플로우를 소개.

```
/ralph-wiggum:ralph-loop "
앱의 주요 화면 8개에 대해 WCAG 2.1 AA 기준 접근성 감사를 해줘.

대상: 홈, 검색, 카테고리, 상품 상세, 리뷰 작성, 장바구니, 결제, 마이페이지

화면별 검사 항목:
- 색상 대비 (텍스트 4.5:1, 대형 텍스트 3:1)
- 터치 타겟 크기 (최소 44×44dp)
- 포커스 순서 & 키보드 접근
- 스크린리더 레이블 (의미 있는 대체 텍스트)
- 모션/애니메이션 (reduced-motion 대응)
- 에러 메시지 접근성 (시각 외 전달 수단)

출력: a11y-audit-report.md
- 화면별 이슈 목록
- 심각도 분류: Critical (법적 리스크) / Major (사용 불가) / Minor (불편)
- 각 이슈에 스크린샷 위치 설명 + 수정 제안
- 요약 대시보드 (화면별 점수)

완료 조건:
- 8개 화면 모두 감사 완료
- Critical 이슈 0개 누락 (전수 조사)
- 각 이슈에 구체적 수정 방법 포함

완료하면 <promise>DONE</promise> 출력.
" --completion-promise "DONE" --max-iterations 25
```

#### 예시 3-2. 디자인 QA 체크리스트 (개발 전 셀프 체크)

```
/ralph-wiggum:ralph-loop "
개발 전 디자인 QA 체크리스트를 만들어줘.
우리 팀이 디자인 리뷰 때 사용할 표준 체크리스트야.

카테고리별 항목:
[레이아웃] 그리드 정합성, 간격 일관성, 정렬
[타이포그래피] 폰트 시스템 준수, 행간, 최대 줄 수
[컬러] 토큰 사용 여부, 대비, 의미적 컬러 사용
[인터랙션] 모든 상태 정의(default, hover, pressed, disabled, focused)
[반응형] 브레이크포인트별 대응
[콘텐츠] 최소/최대 텍스트, 빈 상태, 에러 상태
[접근성] 터치 타겟, 대비, 대체 텍스트

출력 형식: 체크리스트 마크다운 (체크박스 포함)

완료 조건:
- 7개 카테고리 모두 포함
- 카테고리당 체크 항목 5개 이상 (총 35개+)
- 각 항목에 "왜 중요한지" 한줄 설명 포함
- 실제 사례 (좋은 예 / 나쁜 예) 포함

완료하면 <promise>DONE</promise> 출력.
" --completion-promise "DONE" --max-iterations 15
```

#### 예시 3-3. 휴리스틱 평가 리포트

> **실제 사례**: 63개 디자인 스킬 중 `/evaluate` 커맨드는 "heuristic evaluation of user flows"를 자동으로 수행한다.

```
/ralph-wiggum:ralph-loop "
닐슨의 10가지 휴리스틱을 기준으로 우리 앱의 '상품 구매 플로우'를 평가해줘.
(홈 → 검색 → 상품 상세 → 장바구니 → 결제 → 완료)

10가지 휴리스틱:
1. 시스템 상태의 가시성
2. 시스템과 현실 세계의 일치
3. 사용자 제어와 자유
4. 일관성과 표준
5. 오류 예방
6. 기억보다 인식
7. 유연성과 효율성
8. 미적이고 미니멀한 디자인
9. 오류 인식, 진단, 복구
10. 도움말과 문서

각 휴리스틱별로:
- 점수 (1~5)
- 좋은 점
- 문제점 (구체적 위치와 상황)
- 개선 제안

완료 조건:
- 10개 휴리스틱 × 6개 화면 = 60개 셀 모두 평가
- 전체 요약 점수
- Top 5 개선 우선순위 도출

완료하면 <promise>DONE</promise> 출력.
" --completion-promise "DONE" --max-iterations 20
```

---

### ✍️ 카테고리 4: UX 라이팅 & 콘텐츠

> **실제 사례**: [Clinton Halpin](https://clintonhalpin.com/blog/using-claude-code-for-product-design/)은 프로덕트 디자이너로서 Claude Code의 가장 효과적인 사용처로 **UX Copywriting**을 꼽았다. "디자인 스크린샷이나 Figma 링크를 붙여넣고 카피 수정을 요청"하는 워크플로우가 가장 잘 작동했다고 말한다.

#### 예시 4-1. 앱 전체 에러 메시지 재작성

```
/ralph-wiggum:ralph-loop "
앱의 모든 에러 메시지를 UX 라이팅 원칙에 맞게 재작성해줘.
소스: errors/ 폴더의 JSON 파일들

UX 라이팅 원칙:
- 사용자 탓하지 않기 ('잘못된 입력' → '다시 확인해 주세요')
- 구체적 해결책 제시 ('오류 발생' → '네트워크 연결을 확인해 주세요')
- 브랜드 톤앤매너 (친근하지만 신뢰감)
- 이모지 사용 가이드라인 준수
- 한국어 경어체 통일

출력:
- error-messages-rewrite.md (Before/After 비교표)
- tone-consistency-check.md (톤앤매너 일관성 검토)

완료 조건:
- 모든 에러 메시지 재작성 (누락 0)
- 각 메시지에 before/after 비교
- 톤앤매너 일관성 점수 90% 이상
- 카테고리별 분류 (네트워크, 인증, 입력, 서버, 결제)

완료하면 <promise>DONE</promise> 출력.
" --completion-promise "DONE" --max-iterations 20
```

#### 예시 4-2. 온보딩 UX 카피 A/B 테스트 안 작성

```
/ralph-wiggum:ralph-loop "
앱 온보딩 플로우의 UX 카피 A/B 테스트 안을 만들어줘.

온보딩 단계: 웰컴 → 관심사 선택 → 알림 허용 → 완료
각 단계별로:
- 현재 카피 (current.md 참고)
- 변형 A: 기능 중심 (what you can do)
- 변형 B: 감정 중심 (how you'll feel)
- 변형 C: 사회적 증거 (what others do)

각 변형에 포함할 것:
- 헤드라인
- 서브카피
- CTA 버튼 텍스트
- 예상 효과와 근거

완료 조건:
- 4단계 × 3변형 = 12개 카피셋 완성
- 각 변형에 심리학적 근거 설명
- A/B 테스트 설계 (성공 지표, 표본 크기, 기간)

완료하면 <promise>DONE</promise> 출력.
" --completion-promise "DONE" --max-iterations 15
```

#### 예시 4-3. 빈 상태(Empty State) 메시지 전수 작성

```
/ralph-wiggum:ralph-loop "
앱의 모든 빈 상태(Empty State) 메시지를 작성해줘.

대상 화면:
검색 결과 없음, 장바구니 비어있음, 찜 목록 비어있음,
리뷰 없음, 알림 없음, 주문 내역 없음, 쿠폰 없음,
팔로잉 없음, 스크랩 없음, 최근 본 상품 없음

각 빈 상태에 포함:
- 일러스트 설명 (어떤 그림이 적절한지)
- 메인 메시지
- 서브 메시지
- CTA 버튼 텍스트 + 연결 화면
- 톤앤매너 (친근, 격려, 유머 중 택1)

완료 조건:
- 10개 화면 모두 작성
- 톤앤매너 일관성 유지
- CTA가 실제 존재하는 화면으로 연결

완료하면 <promise>DONE</promise> 출력.
" --completion-promise "DONE" --max-iterations 15
```

---

### 🗺️ 카테고리 5: 유저 플로우 & 정보 구조(IA)

#### 예시 5-1. 전체 유저 플로우 문서화

```
/ralph-wiggum:ralph-loop "
앱의 핵심 유저 플로우 5개를 문서화해줘.

대상 플로우:
1. 신규 가입 → 온보딩 → 첫 구매
2. 홈 → 검색 → 상품 상세 → 구매
3. 콘텐츠 발견 → 스크랩 → 상품 연결 → 구매
4. 리뷰 작성 플로우 (사진 포함)
5. 교환/반품 플로우

각 플로우에 포함:
- Mermaid 다이어그램
- 단계별 상세 표 (화면명, 사용자 액션, 시스템 응답)
- 분기점(decision point)
- 이탈 가능 지점 + 이탈 방지 전략
- 엣지 케이스 5개 이상
- 예상 소요 시간

완료 조건:
- 5개 플로우 모두 문서화
- Mermaid 문법 에러 없음
- 각 플로우에 분기 3개 이상
- 전체 엣지 케이스 25개 이상

완료하면 <promise>DONE</promise> 출력.
" --completion-promise "DONE" --max-iterations 20
```

#### 예시 5-2. 정보 구조(IA) 감사 & 재설계 제안

```
/ralph-wiggum:ralph-loop "
앱의 네비게이션과 정보 구조를 감사하고 개선안을 만들어줘.

분석 대상:
- 탭바 구조
- 각 탭의 하위 메뉴 깊이
- 카테고리 분류 체계
- 설정 메뉴 구조

감사 기준:
- 3-클릭 규칙 위반 여부
- 메뉴 레이블의 명확성
- 카테고리 간 중복/누락
- 사용자 멘탈 모델과의 일치도

출력:
- ia-audit.md (현재 구조 분석)
- ia-redesign.md (개선 제안)
- ia-tree-test.md (트리 테스트 설계안)

완료 조건:
- 현재 IA 전체 맵 완성
- 문제점 10개 이상 도출
- 개선안에 before/after 비교
- 트리 테스트 태스크 10개 이상 설계

완료하면 <promise>DONE</promise> 출력.
" --completion-promise "DONE" --max-iterations 15
```

---

### 🎨 카테고리 6: 프로토타이핑 & 디자인-코드 브릿지

> **실제 사례**: [Clinton Halpin](https://clintonhalpin.com/blog/using-claude-code-for-product-design/)은 Ralph Loop 기반 `/prototype-loop` 플러그인을 만들어 자율 프로토타이핑을 시도했다. "일부 프로토타입은 완전히 방향이 틀어지기도 했지만" 가능성 있는 방향이라고 평가. Figma MCP 연동으로 디자인 파일에서 직접 정보를 추출해 코드로 변환하는 워크플로우를 사용한다.

#### 예시 6-1. Figma → HTML 프로토타입 자동 변환

```
/ralph-wiggum:ralph-loop "
Figma 디자인 파일을 기반으로 인터랙티브 HTML 프로토타입을 만들어줘.

대상: 상품 상세 페이지
요구사항:
- Figma 디자인 토큰(색상, 간격, 폰트) 그대로 반영
- 이미지 갤러리 스와이프 동작
- 탭 전환 (상품정보 / 리뷰 / 문의)
- 하단 CTA 스티키 바
- 실제 디바이스에서 테스트 가능한 반응형

기술 스택: HTML + TailwindCSS + Alpine.js (경량)

완료 조건:
- 브라우저에서 정상 렌더링
- 콘솔 에러 없음
- 3가지 인터랙션 모두 동작
- 모바일 뷰포트(390px)에서 정상 표시

완료하면 <promise>DONE</promise> 출력.
" --completion-promise "DONE" --max-iterations 20
```

#### 예시 6-2. 디자인 시스템 → Storybook 자동 생성

```
/ralph-wiggum:ralph-loop "
디자인 시스템의 Figma 컴포넌트를 기반으로 Storybook 스토리를 만들어줘.

대상 컴포넌트: Button, Input, Card, Modal, Toast
각 컴포넌트별:
- 모든 variant 스토리
- 모든 size 스토리
- 모든 state 스토리 (default, hover, active, disabled, error)
- Controls(knobs) 설정
- 디자인 토큰 매핑 확인

완료 조건:
- 5개 컴포넌트 × 모든 변형 스토리 생성
- Storybook 빌드 에러 없음
- 각 스토리에 설명 문서 포함

완료하면 <promise>DONE</promise> 출력.
" --completion-promise "DONE" --max-iterations 20
```

---

### 📊 카테고리 7: 디자인 전략 & 기획 문서

#### 예시 7-1. PRD(제품 요구사항 문서) 초안 작성

> **실제 사례**: [snarktank/ralph](https://github.com/snarktank/ralph)의 핵심 워크플로우가 바로 PRD 생성 → JSON 변환 → 자율 실행이다. `/prd` 스킬로 질문에 답하면 구조화된 PRD가 자동 생성된다.

```
/ralph-wiggum:ralph-loop "
'리뷰 시스템 개선' 프로젝트의 PRD 초안을 작성해줘.

포함 섹션:
- 배경 & 문제 정의
- 목표 & 성공 지표 (KPI)
- 유저 스토리 (As a... I want... So that...)
- 기능 요구사항 (Must have / Should have / Nice to have)
- 유저 플로우 (Mermaid 다이어그램)
- 와이어프레임 설명 (텍스트 기반)
- 엣지 케이스
- 기술 고려사항
- 타임라인 제안

완료 조건:
- 모든 섹션 작성 완료
- 유저 스토리 10개 이상
- Must have 기능 5개 이상
- 엣지 케이스 10개 이상
- Mermaid 다이어그램 에러 없음

완료하면 <promise>DONE</promise> 출력.
" --completion-promise "DONE" --max-iterations 15
```

#### 예시 7-2. 디자인 케이스 스터디 작성

> **실제 사례**: 63개 디자인 스킬 중 `/write-case-study`는 포트폴리오용 케이스 스터디를 자동 생성한다.

```
/ralph-wiggum:ralph-loop "
포트폴리오용 디자인 케이스 스터디를 작성해줘.

프로젝트: 오늘의집 상품 상세 페이지 리디자인
참고 자료: project-notes/ 폴더

구조:
1. 프로젝트 개요 (역할, 기간, 팀 구성)
2. 문제 정의 (데이터 기반)
3. 리서치 (방법론, 핵심 발견)
4. 디자인 프로세스 (아이데이션 → 와이어프레임 → 프로토타입)
5. 솔루션 상세 (주요 디자인 결정과 근거)
6. 결과 & 임팩트 (지표 변화)
7. 회고 & 러닝

완료 조건:
- 7개 섹션 모두 작성
- 각 디자인 결정에 근거 포함
- 2000~3000단어 범위
- STAR 프레임워크 적용

완료하면 <promise>DONE</promise> 출력.
" --completion-promise "DONE" --max-iterations 15
```

---

### 🔄 카테고리 8: 디자인 운영(DesignOps) & 팀 프로세스

#### 예시 8-1. 디자인 리뷰 프로세스 표준화

```
/ralph-wiggum:ralph-loop "
디자인팀의 디자인 리뷰 프로세스를 표준화하는 문서를 만들어줘.

포함할 것:
- 리뷰 요청 템플릿 (컨텍스트, 피드백 요청 사항, 단계)
- 리뷰어 체크리스트 (UX, UI, 접근성, 일관성, 기술적 실현가능성)
- 피드백 작성 가이드 (구체적이고 건설적인 피드백 예시 20개)
- 리뷰 단계별 기준 (Exploration → Refinement → Final)
- 커뮤니케이션 템플릿 (Slack, Figma 코멘트)

완료 조건:
- 5개 문서 모두 작성
- 피드백 예시 20개 이상 (좋은 피드백 vs 나쁜 피드백 비교)
- 실제 바로 사용 가능한 템플릿 형태

완료하면 <promise>DONE</promise> 출력.
" --completion-promise "DONE" --max-iterations 15
```

#### 예시 8-2. 디자인 팀 온보딩 가이드

```
/ralph-wiggum:ralph-loop "
신규 프로덕트 디자이너의 온보딩 가이드를 만들어줘.

포함할 것:
[1주차] 팀/제품 이해
- 제품 구조, 핵심 유저, 비즈니스 모델
- 디자인 원칙, 브랜드 가이드라인
- 툴 세팅 (Figma, Slack, Jira, 분석 도구)

[2주차] 디자인 시스템 익히기
- 컴포넌트 라이브러리 투어
- 토큰 & 스타일 가이드
- Do/Don't 퀴즈 10문제

[3주차] 프로세스 체험
- 디자인 리뷰 참관 → 리뷰 참여
- 개발팀과 핸드오프 실습
- 첫 번째 작은 태스크

[4주차] 독립 업무 시작
- 멘토와 1:1 체크리스트
- 30/60/90일 목표 설정

완료 조건:
- 4주 프로그램 완성
- 주차별 체크리스트 포함
- 퀴즈/실습 과제 포함
- 참고 링크/자료 목록

완료하면 <promise>DONE</promise> 출력.
" --completion-promise "DONE" --max-iterations 15
```

---

## 한눈에 보는 요약

| 카테고리 | 추천 작업 | 반복 횟수 | 밤새 돌리기 |
|---|---|---|---|
| 📚 디자인 시스템 문서화 | 컴포넌트 문서, 토큰 감사, 핸드오프 | 15~20 | ✅ 강추 |
| 🔍 리서치 & 분석 | 인터뷰 분석, 경쟁사 벤치마킹, 서베이 | 15~20 | ✅ 강추 |
| ♿ 접근성 & QA | WCAG 감사, 휴리스틱 평가, QA 체크리스트 | 15~25 | ✅ 강추 |
| ✍️ UX 라이팅 | 에러 메시지, 빈 상태, A/B 카피 | 15~20 | ✅ 강추 |
| 🗺️ 플로우 & IA | 유저 플로우, 정보 구조 감사 | 15~20 | ✅ 적합 |
| 🎨 프로토타이핑 | HTML 프로토타입, Storybook | 20 | ⚠️ 확인 필요 |
| 📊 전략 & 기획 | PRD, 케이스 스터디 | 10~15 | ✅ 적합 |
| 🔄 DesignOps | 리뷰 프로세스, 온보딩 가이드 | 10~15 | ✅ 적합 |

---

## 참고 자료

- [I Built 63 Design Skills For Claude — MC Dean](https://marieclairedean.substack.com/p/i-built-63-design-skills-for-claude) — 디자이너가 만든 8개 플러그인, 63개 스킬
- [Claude Skills for Product Designers — UX Planet](https://uxplanet.org/claude-skills-for-product-designers-a453a7a8faa7) — 프로덕트 디자이너용 Claude 스킬 소개
- [Using Claude Code for Product Design — Clinton Halpin](https://clintonhalpin.com/blog/using-claude-code-for-product-design/) — 프로덕트 디자이너의 실제 사용 후기 (prototype-loop 포함)
- [Claude Code for Designers — Builder.io](https://www.builder.io/blog/claude-code-for-designers) — 디자이너용 Claude Code 워크플로우
- [Ralph: Iterative Audit Loop Pattern — GitHub Gist](https://gist.github.com/ledbetterljoshua/e4cfefda69fa600bbe5bbe3f3c205634) — 감사 루프 패턴 (audit.json + progress.md)
- [snarktank/ralph — GitHub](https://github.com/snarktank/ralph) — Ralph 오리지널 구현 (PRD → 자율 실행)
- [Everything is a Ralph Loop — Geoffrey Huntley](https://ghuntley.com/loop/) — Ralph Loop 창시자의 철학
- [Ralph Loop 다시보기 — 네이버 프리미엄](https://contents.premium.naver.com/lazygenius/thelazygenius/contents/260105143723237bt) — 한국어 아티클
