# Ohouse PRODUCT Designer

프로덕트 디자이너 협업을 위한 기본 깃 구조와 작업 자산을 관리하는 저장소입니다.

## 폴더 구조

```text
.
├── ai-tips/                 # AI 활용 팁/실험 노트
├── docs/
│   ├── guides/              # 디자인/협업 가이드 문서
│   ├── workflows/           # Git/작업 프로세스 문서
│   └── meeting-notes/       # 회의록
├── design/
│   ├── figma/               # Figma 링크/핸드오프 정리
│   ├── wireframes/          # 와이어프레임 산출물
│   ├── ui/                  # 시안/최종 UI 산출물
│   └── prototypes/          # 프로토타입 관련 자료
├── research/
│   ├── insights/            # 리서치 인사이트
│   ├── personas/            # 페르소나 문서
│   └── journey-maps/        # 저니맵
├── assets/
│   ├── images/              # 이미지 에셋
│   ├── icons/               # 아이콘 에셋
│   └── fonts/               # 폰트 파일 (라이선스 확인 필수)
└── templates/               # 문서/디자인 템플릿
```

## Git 기본 운영 규칙

- 기본 브랜치: `main`
- 기능/작업 브랜치 네이밍:
  - `feature/<작업명>`
  - `fix/<수정명>`
  - `docs/<문서명>`
- 권장 커밋 메시지:
  - `feat: 새로운 디자인 워크플로우 문서 추가`
  - `fix: 아이콘 가이드 오타 수정`
  - `docs: 회의록 템플릿 업데이트`

자세한 협업 흐름은 `docs/workflows/git-workflow.md`를 참고하세요.
