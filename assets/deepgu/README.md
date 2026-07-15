# deepgu(영상 이상행동 탐지 시스템) — 이미지 첨부 가이드

이 폴더에 아래 파일들을 이 이름 그대로 넣으면 `data.js`가 자동으로 인식한다. 파일만 넣고 `data.js`의 해당 필드에 경로 한 줄만 채우면 끝이다.

## 1. 구성도 (아키텍처 다이어그램) — 1장

| 파일명 | 내용 | 원본 출처 |
|---|---|---|
| `architecture.png` | 시스템 아키텍처 다이어그램. 구성: CCTV/OBS → RTMP(1935) → MediaMTX(Media Server EC2) → ① WHEP/WebRTC(8889)로 Frontend 직접 재생, ② RTSP(8554)로 AI Worker(GPU EC2) 전달 → X3D-S 후보 탐지 → Event Builder → BiGRU Keyframe Selection → Qwen3-VL 검증(AWS Bedrock) → 이벤트 payload를 Backend(FastAPI)로 전송 → MySQL RDS·S3 저장 → SSE로 Frontend 알림 | 결과보고서 [Figure 2] Overall System Structure (p.20), 발표자료 "02 통합 아키텍처" 슬라이드 |

넣은 뒤 `data.js`에서:
```js
architectureImage: 'assets/deepgu/architecture.png',
```
이 줄을 `architectureImageNote` 바로 아래에 추가한다. (`architectureImageNote`는 지워도 되고 남겨둬도 되지만, `architectureImage`가 있으면 그쪽이 우선 렌더링된다.)

## 2. 결과 자료 (표 · 그래프 · 스크린샷) — 5장

`resultImages` 배열의 각 항목은 순서대로 아래 파일에 대응한다. 파일을 넣고 각 항목에 `image: '...'` 한 줄씩만 추가하면 된다.

| 순서 | 파일명 | 내용 | 원본 출처 |
|---|---|---|---|
| 1 | `table6-final-pipeline-performance.png` | Fast-only / Fast+VLM(Uniform) / Fast+VLM(Keyframe) 3가지 조합의 TP·FP·FN·Precision·Recall·F1 비교표 | 결과보고서 [Table 6] (p.41) |
| 2 | `figure10-violence-scores.png` | X3D-S 클립별 점수, Event Builder 후보 구간, VLM accept/reject 결과를 시간축으로 시각화한 그래프 | 결과보고서 [Figure 10] (p.31) |
| 3 | `figure11-bigru-training-curve.png` | BiGRU Frame Selector의 Train/Val Loss·Val Accuracy 학습 곡선 (best epoch 28, 89.2%) | 결과보고서 [Figure 11] (p.32~33) |
| 4 | `table4-vlm-comparison.png` | Claude Haiku 4.5 · InternVL2 · Qwen3-VL의 TP/FP/FN/Precision/Recall/F1 비교표 | 결과보고서 [Table 4] (p.40) |
| 5 | `ui-screenshots.png` | 로그인 / 실시간 스트리밍 / 실시간 알림 / 이벤트 상세 화면 스크린샷 (한 장에 모아서 편집하거나, 가장 대표적인 한 화면만 사용해도 됨) | 결과보고서 [Figure 5]~[Figure 8] (p.28~30) |

`data.js`에서 각 항목에 `image` 필드를 추가:
```js
resultImages: [
  { image: 'assets/deepgu/table6-final-pipeline-performance.png', note: '[Table 6] ...' },
  { image: 'assets/deepgu/figure10-violence-scores.png', note: '[Figure 10] ...' },
  { image: 'assets/deepgu/figure11-bigru-training-curve.png', note: '[Figure 11] ...' },
  { image: 'assets/deepgu/table4-vlm-comparison.png', note: '[Table 4] ...' },
  { image: 'assets/deepgu/ui-screenshots.png', note: '실시간 모니터링 화면 스크린샷 ...' },
],
```

## 이미지를 뽑는 가장 쉬운 방법

PDF에서 해당 페이지를 캡처(스크린샷)하거나, 아래처럼 `pdftoppm`으로 바로 뽑을 수 있다 (원본 PDF는 `/home/hyrn/[CS양식10] 결과보고서_Capstone Design II Project Report.pdf`):

```bash
# 예: 41페이지(Table 6)를 PNG로 추출
pdftoppm -png -f 41 -l 41 -r 200 "/home/hyrn/[CS양식10] 결과보고서_Capstone Design II Project Report.pdf" table6
# table6-41.png 같은 파일이 생성됨 — 필요한 표/그래프 영역만 크롭해서 위 파일명으로 저장
```

넣지 않아도 사이트는 깨지지 않는다 — 이미지가 없는 동안은 점선 박스 안에 "어떤 이미지를 넣어야 하는지" 캡션만 표시된다.
