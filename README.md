# 박혜린 포트폴리오 — 소스 코드

VS Code 등 로컬 에디터에서 바로 열어 수정 가능한 순수 HTML/CSS/JS 프로젝트입니다.
빌드 도구, npm, 프레임워크 없음 — `index.html`을 브라우저로 열면 바로 동작합니다.

## 파일 구성

- **index.html** — 페이지 구조 (마크업만, 텍스트는 대부분 data.js에서 채워짐)
- **style.css** — 모든 스타일. 상단 `:root` 변수(`--acc`, `--bg` 등)만 바꿔도 전체 톤 변경 가능
- **data.js** — 모든 콘텐츠 데이터 (프로젝트, 스킬, 경력 등). **텍스트만 고치고 싶다면 이 파일만 편집하면 됩니다.**
- **app.js** — data.js를 읽어 화면을 그리고, 목록↔상세 화면 전환을 처리하는 로직

## 로컬에서 열어보기

폴더를 그대로 더블클릭 → `index.html`을 브라우저로 열면 됩니다.
VS Code의 Live Server 확장을 쓰면 저장할 때마다 자동 새로고침됩니다.

## 자주 하는 수정

- **프로젝트 내용 수정**: `data.js`의 `FEATURED_PROJECTS` / `OTHER_PROJECTS` 배열 값을 바꾸세요.
- **색상 변경**: `style.css` 최상단 `:root { --acc: #7ee787; ... }`의 값을 바꾸세요.
- **경력/학력/스킬 수정**: `data.js`의 `EXPERIENCE` / `SKILL_GROUPS`, `index.html`의 Education 섹션.
- **새 프로젝트 카드 추가**: `FEATURED_PROJECTS` 또는 `OTHER_PROJECTS` 배열에 객체를 하나 더 추가하면 자동으로 렌더링됩니다.

## 배포

정적 파일이라 GitHub Pages, Netlify, Vercel 등 아무 정적 호스팅에 폴더째 올리면 그대로 동작합니다.
