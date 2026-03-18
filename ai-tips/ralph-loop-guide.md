# Ralph Loop (Ralph Wiggum) 가이드

> Claude Code가 **"이 정도면 됐겠지"에서 멈추는 게으름을 허용하지 않고**, 진짜 끝날 때까지 반복 실행시키는 플러그인

---

## 핵심 개념

Claude Code는 똑똑하지만, 중간에 **"이 정도면 됐겠지"하고 멈추는 습관**이 있다.
Ralph Loop는 Claude가 스스로 "끝났다"고 할 때, **진짜 끝난 게 맞는지 확인하고 아니면 다시 돌린다**.

### 작동 원리

1. Claude가 종료하려 하면 → Ralph가 가로챔 (exit code 2로 차단)
2. 원래 프롬프트를 **다시 주입**해서 새로운 반복 시작
3. Claude가 `<promise>DONE</promise>` 같은 **완료 신호**를 출력해야만 진짜 종료
4. 매 반복마다 **새로운 컨텍스트**로 시작 (컨텍스트 누적 문제 해결)

---

## 명령어 총정리

| 명령어 | 설명 |
|---|---|
| `/plugin install ralph-wiggum@claude-plugins-official` | 플러그인 설치 |
| `/ralph-wiggum:ralph-loop "프롬프트"` | 루프 시작 |
| `/ralph-wiggum:cancel-ralph` | 루프 중단 |
| `/ralph-wiggum:help` | 도움말 |

## 주요 옵션

| 옵션 | 설명 | 기본값 |
|---|---|---|
| `--max-iterations <n>` | 최대 반복 횟수 | 무제한 (위험!) |
| `--completion-promise "텍스트"` | 완료 신호 문구 | 없음 |

### 사용 예시

```bash
# 1. 설치
/plugin install ralph-wiggum@claude-plugins-official

# 2. 첫 번째 루프 실행
/ralph-wiggum:ralph-loop "Hello World API 만들어줘. 테스트 포함. 완료하면 <promise>DONE</promise> 출력." --completion-promise "DONE" --max-iterations 15
```

---

## 언제 쓰면 좋을까?

### Ralph Loop가 빛나는 상황 ✅

| 상황 | 이유 |
|---|---|
| 복잡한 프로젝트 | 기능이 많고 연결점이 복잡할 때 |
| 품질이 중요할 때 | 테스트, 에러 처리 꼼꼼히 해야 할 때 |
| 밤새 돌려놓을 때 | 자고 일어나면 완성되어 있음 |
| 자동 검증 가능한 작업 | 테스트, 린터로 성공 여부 판단 가능할 때 |

### 굳이 안 써도 되는 상황 ❌

| 상황 | 이유 |
|---|---|
| 간단한 작업 | 함수 하나 짜는 정도면 과잉 |
| 빠른 프로토타입 | 일단 돌아가는지만 보고 싶을 때 |
| 주관적 판단 필요 | 디자인, UX 같은 건 사람이 봐야 함 |
| 토큰 예산 빡빡할 때 | 루프 돌리면 비용 증가 |

---

## 프롬프트 잘 쓰는 법

Ralph Loop의 성공은 **프롬프트 품질**에 달려있다.

### 좋은 프롬프트의 3요소

1. **명확한 요구사항** — 뭘 만들어야 하는지
2. **구체적인 완료 조건** — 언제 끝났다고 볼 수 있는지
3. **막혔을 때 행동** — N번 시도해도 안 되면 어떻게 할지

### ❌ 나쁜 프롬프트

```
"좋은 앱 만들어줘"
```

- "좋은"이 뭔지 모호함
- 언제 끝났는지 판단 불가
- Claude가 무한 루프에 빠질 수 있음

### ✅ 좋은 프롬프트

```
"투두리스트 앱 만들어줘. 기능:
- 할 일 추가/삭제/수정
- 완료 체크
- 로컬 스토리지 저장
완료 조건:
- 모든 기능 동작
- 콘솔 에러 없음
- 테스트 통과
완료하면 <promise>DONE</promise> 출력."
```

---

## 실제 성과 사례

| 사례 | 결과 |
|---|---|
| **$50,000짜리 프로젝트** | Ralph Loop으로 $300 이하에 완성 (167배 차이) |
| **프로그래밍 언어 CURSED** | 3개월 걸릴 작업, 사람 안 붙이고 Ralph만 돌려서 완성 |
| **YC 해커톤** | 밤새 돌렸더니 6개 레포지토리 완성, 비용 $297 |

---

## 자주 묻는 질문

### Q: 토큰 비용이 많이 나오지 않나요?
루프를 돌리니까 당연히 일반 사용보다 많이 나온다.
그래서 `--max-iterations`가 중요하다. **처음엔 10~20회로 시작**해서, 작업 규모에 맞게 조절하자.

### Q: 무한 루프에 빠지면 어떡하나요?
두 가지 안전장치가 있다:
- `--max-iterations`: 지정한 횟수 넘으면 자동 종료
- `/ralph-wiggum:cancel-ralph`: 수동으로 즉시 중단

### Q: completion-promise는 꼭 넣어야 하나요?
권장한다. 안 넣으면 `--max-iterations`에만 의존하게 되는데,
Claude가 실제로 완료했는지 판단하기 어려워진다.

### Q: 영어로 프롬프트 써야 하나요?
한국어도 잘 된다. 다만 **completion-promise 부분은 영어 단어로 쓰는 게 안전**하다.

```bash
/ralph-wiggum:ralph-loop "한국어로 작업 설명... 완료하면 <promise>DONE</promise> 출력해." --completion-promise "DONE"
```

---

## 결론

> "야, 해줘" → "야, **끝까지** 해줘"

바이브 코딩의 다음 단계. Ralph Loop의 결과:
- 더 완성도 높은 코드
- 더 적은 수동 수정
- 더 적은 "에러 나는데요?" 대화

---

## 참고 링크

- [Ralph Wiggum - snarktank/ralph (GitHub)](https://github.com/snarktank/ralph)
- [The Ralph Loop Made Easy (Reddit)](https://www.reddit.com/r/ClaudeAI/comments/1qd5ell/the_ralph_loop_made_easy/)
- ['Ralph Wiggum' loop prompts Claude (The Register)](https://www.theregister.com/2026/01/27/ralph_wiggum_claude_loops/)
- [Ralph Loop 다시보기 (네이버 프리미엄)](https://contents.premium.naver.com/lazygenius/thelazygenius/contents/260105143723237bt)
