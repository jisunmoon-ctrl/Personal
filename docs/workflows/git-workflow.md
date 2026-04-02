# Git Workflow Guide

Ohouse PRODUCT Designer 팀의 기본 협업 흐름입니다.

## 1) 작업 시작

1. `main` 최신화
2. 작업 브랜치 생성
   - `feature/<작업명>`
   - `fix/<수정명>`
   - `docs/<문서명>`

예시:

```bash
git checkout main
git pull origin main
git checkout -b docs/research-template
```

## 2) 커밋 규칙

- 커밋은 작은 단위로 자주 수행
- 메시지는 목적 중심으로 작성

권장 Prefix:

- `feat`: 새로운 산출물/구조 추가
- `fix`: 오류/누락 수정
- `docs`: 문서 내용 변경
- `chore`: 운영성 작업

예시:

```bash
git commit -m "docs: add interview note template"
```

## 3) Pull Request 규칙

- PR 제목: `[type] 작업 요약`
- 본문 포함 항목:
  - 변경 목적
  - 변경 파일/폴더
  - 리뷰 포인트
  - 확인 방법(스크린샷/링크)

## 4) 머지 기준

- 최소 1명 리뷰 승인
- 충돌 해결 후 최신 `main` 기준으로 동기화
- 머지 후 브랜치 정리

## 5) 금지/주의 사항

- `main` 직접 커밋 지양
- 대용량 원본 파일은 가능하면 외부 스토리지 링크로 관리
- 라이선스 확인되지 않은 폰트/에셋 커밋 금지
