# Remote Preview Guide

원격 서버에서 `index.html` 기반 포트폴리오를 직접 확인할 때 쓰는 가장 안전한 방법은, 미리보기 서버를 `127.0.0.1`에만 바인딩하고 SSH 포트 포워딩으로 로컬 브라우저에 연결하는 방식입니다.

## 1. 원격 서버에서 미리보기 서버 실행
```bash
cd /home/hyrn/portfolio-deploy
python3 -m http.server 4173 --bind 127.0.0.1
```

- `--bind 127.0.0.1`을 넣어야 원격 서버 외부로 저장소가 노출되지 않습니다.
- 실행 후 `Serving HTTP on 127.0.0.1 port 4173`가 보이면 정상입니다.

## 2. 내 로컬 PC에서 SSH 포트 포워딩
```bash
ssh -L 4173:127.0.0.1:4173 <원격서버계정>@<원격서버주소>
```

예시:
```bash
ssh -L 4173:127.0.0.1:4173 hyrn@example.com
```

이 터미널은 포워딩이 유지되는 동안 켜둡니다.

## 3. 로컬 브라우저에서 확인
포워딩이 연결된 상태에서 아래 주소를 엽니다.

```text
http://127.0.0.1:4173
```

이 주소는 로컬 PC의 브라우저에서 열어야 하며, 실제로는 SSH 터널을 통해 원격 서버의 포트폴리오 페이지를 보게 됩니다.

## 4. 종료 방법
- 미리보기 서버 종료: 원격 서버에서 `Ctrl+C`
- 포트 포워딩 종료: 로컬 PC에서 `Ctrl+C`

## 5. 내가 이번에 실제로 사용한 명령어
원격 서버:
```bash
cd /home/hyrn/portfolio-deploy
python3 -m http.server 4173 --bind 127.0.0.1
```

헤드리스 스크린샷 확인용:
```bash
google-chrome --headless --disable-gpu --hide-scrollbars --window-size=1440,2200 --screenshot=/tmp/portfolio-desktop.png http://127.0.0.1:4173/index.html
google-chrome --headless --disable-gpu --hide-scrollbars --window-size=430,2200 --user-agent='Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' --screenshot=/tmp/portfolio-mobile.png http://127.0.0.1:4173/index.html
```

## 6. VS Code Remote-SSH를 쓸 때
1. `Ports` 탭을 엽니다.
2. `Forward a Port`를 누릅니다.
3. `4173`을 입력합니다.
4. 로컬 브라우저에서 열어준 주소로 접속합니다.
