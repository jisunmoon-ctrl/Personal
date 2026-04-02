# Sun Moon 개인 작업 공간

Claude에서 만든 스킬 파일을 이 디렉토리에 업로드해 관리합니다.

## 권장 구조

```text
Sun Moon/
├── skills/      # 사용 중인 스킬
└── archive/     # 이전 버전/백업
```

## 업로드 방법

1. Claude에서 생성한 스킬 폴더(예: `my-skill/`)를 `Sun Moon/skills/` 아래로 이동
2. 스킬 필수 파일 확인
   - `SKILL.md`
3. 버전 교체 시 기존 파일은 `Sun Moon/archive/`로 이동

## 권장 네이밍

- 폴더명: `kebab-case` (예: `user-research-assistant`)
- 문서명: `SKILL.md` 고정
