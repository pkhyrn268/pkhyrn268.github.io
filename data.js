// ============================================================
// All portfolio content lives here. Edit this file to change
// projects, skills, experience, etc. — no HTML/JS knowledge needed
// for text/data changes.
// ============================================================

const FEATURED_PROJECTS = [
  {
    id: 'infra', num: '01', tag: 'infra · devops',
    name: 'GPU 서버 관리 자동화 시스템',
    period: '2024.12 — 현재', role: '서버 관리자 · 인프라 설계',
    repo: 'CSID-DGU/admin_infra', url: 'https://github.com/CSID-DGU/admin_infra',
    desc: '80+ GPU · 15대 서버에서 다수 연구자가 동시에 학습을 돌리는 환경. 수동으로 하던 계정 발급·자원 회수를 Kubernetes 위에서 수명 주기 전체로 자동화했다.',
    oneLiner: '80+ GPU · 15대 서버 규모 AI 인프라에서 계정 발급부터 자원 회수까지의 수명 주기를 자동화한 인프라 서버',
    problem: '동국대 AI 연구실 GPU 서버실은 다수 사용자가 동시에 학습·실험을 돌리는 환경이다. 계정 생성·삭제와 자원 할당을 관리자가 손으로 처리하다 보니 요청이 밀리면 그대로 병목이 됐고, GPU·네트워크·storage 계층 장애가 나면 원인을 찾는 데도 시간이 걸렸다.',
    designIntent: 'config-server가 계정·Pod·port·storage를 전부 관리하는 단일 진입점이다. 이 서버를 설계할 때 지킨 원칙은 하나였다. config-server 자신이 들고 있는 기록보다, 지금 실제로 무슨 일이 벌어지고 있는지를 항상 더 믿는다는 것이다. 예를 들어 유저마다 뜨는 Pod는 SSH나 Jupyter로 외부에서 접속할 수 있어야 하는데, Pod는 재시작되거나 다른 서버로 옮겨질 때마다 내부 주소가 계속 바뀐다. 그래서 서버 노드마다 고정된 port(NodePort)를 하나씩 배정해서 항상 같은 주소로 접속할 수 있게 했다. 문제는 이 port를 누가 쓰고 있는지 DB에만 기록해두면, config-server가 갑자기 죽거나 누군가 쿠버네티스에서 직접 port를 지워버렸을 때도 DB에는 여전히 사용 중이라고 남는다는 점이다. 이런 기록이 쌓이면 실제로는 비어있는 port인데도 새로 배정할 수 있는 port가 점점 줄어들다가, 결국 새 Pod를 만들 port가 없어 생성 자체가 막힌다. 그래서 port를 새로 내주기 직전마다 실제 클러스터에 지금 떠 있는 서비스가 뭔지 다시 확인해서 DB를 맞춘다. 계정의 uid/gid를 상위 서버가 넘겨준 값 그대로 믿지 않고 매번 계정 파일에서 다시 읽는 것, 자체 구축해 유지보수 부담이 컸던 인증 서버(KDC) 대신 이미 안정적으로 운영되던 조직의 Active Directory로 인증을 옮긴 것, 유저·그룹마다 별도 저장공간을 만들지 않고 NFS 하나를 통째로 마운트해 권한만으로 접근을 나눈 것도 모두 같은 원칙에서 나온 결정이다.',
    bullets: [
      'passwd/group/shadow 같은 리눅스 계정 파일이 NFS(네트워크로 공유하는 파일 시스템) 위에서는 flock 같은 파일 락이 불안정하게 동작하는 걸 확인하고, 대신 로컬 락 파일로 동시 쓰기를 막았다. sudoers 파일은 임시 파일에 먼저 쓴 뒤 통째로 교체하는 방식(tmp + os.replace)으로 원자적으로 반영했다',
      '접속하면 지정된 명령 하나만 실행되도록 제한한 SSH(forced-command)로, 이중화된 인증 서버(FARM AD) 중 장애 난 곳은 자동으로 건너뛰고 접속하는 계정 관리 워크플로 구현',
      'NAS(파일 저장 전용 서버)에 SSH(paramiko)로 직접 접속해 유저별 홈 디렉토리를 만드는 방식으로 전환하고, 기존에 쓰던 PVC 생성·삭제 API는 전부 제거',
      '유저가 컨테이너에 설치한 패키지·설정을 pod 재생성 후에도 유지할 수 있도록, 컨테이너를 이미지로 저장(docker commit)하고 다음 pod 생성 시 그 이미지를 불러오는 스냅샷 기능 구현',
      'Prometheus로 수집한 GPU 지표(DCGM 기반 사용률·메모리·온도)를 조합한 점수로 15대 서버 중 가장 여유 있는 GPU 노드를 자동 선택',
      'WAS 조회 → 노드 선택 → NodePort 할당 → Pod/Service 생성으로 이어지는 여러 단계 중 어디서 실패했는지 구조화된 에러 코드로 정확히 알려주고, 그 시점까지 성공한 리소스만 되돌리는 롤백 로직 구현. Redis 기반 비동기 상태 조회 API로 생성 진행 상황도 실시간 확인 가능',
      'PR 머지만으로 커밋 해시 태그 이미지가 자동 배포되는 GitHub Actions CI/CD 구축 — 배포 버전 추적과 롤백을 코드 레벨에서 보장',
      'Ansible로 15대 서버 설정을 코드화하고, Prometheus·Grafana 기반 자원 사용량 모니터링 체계 구축',
    ],
    troubleshooting: [
      {
        problem: 'Pod 생성 요청이 몰리는 시간대에 config-server가 쓰는 API 서버(gunicorn)가 요청을 제때 처리하지 못하고 밀리면서 SSH 연결 자체가 타임아웃되는 문제 발생',
        solution: 'gunicorn의 worker 수·타임아웃과 컨테이너 리소스 한도를 재조정하고, 생성 진행 상황을 Redis로 추적하는 비동기 상태 조회 API를 추가해 클라이언트가 타임아웃 대신 진행률을 확인하도록 바꿨다.',
      },
    ],
    results: [
      '계정 발급 → 만료 회수까지 관리자 개입 없이 동작하는 자동화 파이프라인 완성',
      'PVC 경로 공유로 인한 데이터 혼재 위험을 구조적으로 제거하고, Active Directory 기반 인증 전환으로 다수 사용자 환경의 안정성 향상',
      'PR 머지 즉시 커밋 해시 태그로 배포되는 CI/CD — 배포 버전 추적과 롤백이 가능한 운영 체계',
    ],
    stack: ['Kubernetes', 'Helm', 'Docker', 'ContainerSSH', 'GitHub Actions', 'Ansible', 'Kerberos · AD', 'Redis', 'Prometheus · Grafana', 'Python'],
  },
  {
    id: 'ops', num: '02', tag: 'operations · monitoring',
    name: 'GPU 서버실 통합 운영 시스템',
    period: '2024.12 — 현재', role: '서버 관리자 · 운영 자동화',
    repo: 'CSID-DGU/admin_infra_server', url: 'https://github.com/CSID-DGU/admin_infra_server',
    desc: '컨테이너 이미지, 모니터링, 원격 부팅, 사용자 수명 주기, Kerberos/NFS 운영까지 — 관리자 홈 디렉토리에 흩어져 있던 서버실 운영 자산 전체를 하나의 레포로 통합하고 자동화했다.',
    oneLiner: 'DECS 서버 운영의 통합 레포 — 이미지 빌드 · 모니터링 · 원격 부팅 · 사용자 수명 주기 · Kerberos/NFS 운영을 코드로 관리',
    problem: '서버실 운영 지식이 관리자 개인 홈 디렉토리(~/decs, ~/k8s, ~/uid, ~/krb …)에 흩어져 있으면 장애 대응이 특정 사람의 기억에 의존하게 된다. 운영 스크립트와 설정을 subtree 히스토리째 하나의 레포로 모았다.',
    designIntent: '모니터링과 복구 자동화가 오히려 장애를 키우면 안 된다는 원칙을 세웠다. 공유 파일 서버(NAS)의 인증 데몬을 재시작하면 다른 사용자의 파일 접속 세션까지 전부 끊긴다는 걸 확인한 뒤로는, 복구 자동화가 이 데몬을 무분별하게 재시작하지 못하도록 기본값을 끄고 필요할 때만 켜도록 제한했다. 헬스체크도 마찬가지 이유로 넓혔다. 인증 프로세스가 죽지는 않고 응답만 없는 상태(D-state)로 멈춰있는 경우를 기존 체크가 놓치고 있다는 걸 발견한 뒤에야, 이런 상태까지 주기적으로 확인하도록 범위를 넓혔다.',
    bullets: [
      'GPU를 쓰는 Docker 프로세스가 실제로 어떤 사용자인지 매핑해주는 gpu-user-exporter, 노드의 마운트·GPU·Docker·컨테이너 상태를 검사하고 제한적으로 자동 복구까지 수행하는 cluster-monitor-exporter를 Go로 직접 구현 — 이후 파일 서버 인증 상태와 응답 없이 멈춘 프로세스까지 주기적으로 확인하는 헬스체크와 복구 API로 확장',
      'Wake-on-LAN(네트워크로 원격 전원 켜기) 기반 원격 부팅 자동화: 우선순위 높은 서버부터 기동 → 상태 확인을 통과한 뒤 나머지 기동, 부팅 시 임시 GPU 테스트 컨테이너로 한 번 더 점검, 중단된 컨테이너 자동 재기동과 SSH/GPU 사후 점검, 실패 시 Slack 알림 — 실제 조치 없이 시뮬레이션만 해보는 모드로 안전하게 검증',
      'GPU 세대·드라이버 버전마다 요구하는 CUDA/cuDNN 조합이 달라 이미지 하나로는 호환이 안 되는 문제를 조합별 매트릭스 빌드로 해결, 실행 시 드라이버 호환성을 확인해 안 맞으면 시작을 막는 안전장치까지 포함',
      '계정 생성부터 만료 회수까지 사람이 따라다니지 않아도 되도록 UID/GID·컨테이너 수명 주기·인증 처리를 user-lifecycle 모듈로 통합하고, 백업·만료 알림·정리를 매일 자동 실행',
      '전용 인증 계정으로 파일 서버 접근 키를 분리하고, 이 키(키탭)를 주기적으로 교체하는 과정에서 자격 증명이 깨지지 않도록 원자적으로 처리하는 감시 체계 구축 — 50GiB 무결성 테스트로 검증한 뒤 암호화된 파일 접근 방식(Kerberos 기반 NFS)을 운영 기준값으로 채택',
    ],
    troubleshooting: [
      {
        problem: '사용자 홈 디렉토리 응답 지연과 컨테이너 SSH 접속 불가 장애 발생',
        solution: '부팅 중 인증 관련 서비스(rpc-gssd)가 비정상 종료된 시점에 암호화된 파일 접속이 실행되면서 인증 처리가 응답 없이 멈추고, SSH 로그인마다 홈 디렉토리를 조회하는 프로세스가 계속 쌓여 동시 접속 제한(MaxStartups)을 넘기며 컨테이너 SSH 전체가 막히는 연쇄 장애였음을 규명했다. 부팅·복구 시 서비스 기동 순서를 점검하고 상태 이상을 자동 감지·복구하는 절차를 추가하고, 장애를 의도적으로 재현하는 테스트로 복구 절차를 검증했다.',
      },
    ],
    results: [
      '흩어져 있던 운영 자산 전체를 단일 레포로 통합 — 관리자가 바뀌어도 이어지는 운영 체계',
      '서버 기동 → 헬스체크 → 컨테이너 복구 → 알림까지 부팅 전 과정 무인 자동화',
      'GPU 사용량을 실사용자 단위로 가시화한 Grafana 대시보드 — 자원 경합 추적 가능',
    ],
    stack: ['Kubernetes', 'Prometheus · Grafana', 'Go', 'Ansible', 'Bash', 'Wake-on-LAN', 'Kerberos · NFS', 'Docker'],
  },
  {
    id: 'deepgu', num: '03', tag: 'ai systems · video',
    name: '영상 이상행동 탐지 시스템',
    period: '2025.09 — 2026.06', role: '기업연계 캡스톤 프로젝트(MHNCity 연계) · Keyframe Selection 모델 설계·학습, 데이터셋 구축',
    repo: 'CSID-DGU/2026-1-CECD2-1-Deepgu-06', url: 'https://github.com/CSID-DGU/2026-1-CECD2-1-Deepgu-06',
    codeLinks: [
      { label: 'Keyframe Selection 코드 (main/AI/keyframe)', url: 'https://github.com/CSID-DGU/2026-1-CECD2-1-Deepgu-06/tree/main/AI/keyframe' },
      { label: 'VLM 연동 작업 브랜치 (feat/keyframe-vlm-integration)', url: 'https://github.com/CSID-DGU/2026-1-CECD2-1-Deepgu-06/tree/feat/keyframe-vlm-integration' },
    ],
    desc: '실제 CCTV 스트림에서 폭행 등 이상행동을 실시간 탐지하는 3인 팀 프로젝트. 경량 3D 모델로 후보를 거른 뒤, 제가 설계한 BiGRU 기반 Keyframe Selection으로 VLM에 넘길 핵심 프레임만 골라 정확도와 GPU 비용을 동시에 잡았다.',
    oneLiner: 'CCTV 실시간 스트림에서 폭행을 탐지하는 2단계(경량 모델 → VLM) 영상 분석 파이프라인 — Keyframe Selection·데이터셋 구축 담당',
    problem: '국내에서만 140만 대 이상(2023년 기준) 운영 중인 CCTV를 소수의 관제 인력이 실시간으로 감시하는 것은 현실적으로 불가능하다. 행동 인식 모델만 쓰면 동작 패턴만 보고 판단해 오탐이 잦고 근거를 설명하지 못하며, VLM만 쓰면 상황을 잘 이해하지만 모든 프레임에 적용하기엔 연산 비용이 너무 크다. 실시간 스트림이라는 제약 위에서 탐지 정확도와 연산 효율을 동시에 만족하는 파이프라인이 필요했다.',
    designIntent: '경량 3D CNN(X3D-S)으로 먼저 후보 구간을 빠르게 걸러내고, 그중 정말 애매한 이벤트만 VLM(Qwen3-VL)이 정밀 검증하는 2단계 구조로 설계했다. 이때 VLM에 이벤트 전체 프레임을 그대로 넘기면 입력이 길어지고 판단에 필요 없는 정보까지 섞여 들어가므로, 이벤트 내에서 폭행 판단에 실제로 기여하는 프레임만 선별하는 Keyframe Selection 모듈을 별도로 설계했다. 또한 VLM이 근거 없이 즉흥적으로 결론부터 내리는 것을 막기 위해 "먼저 관찰 → 이후 판단(Observe-then-Judge)" 순서로 프롬프트를 구성해, 오탐을 줄이면서도 판단 근거(자연어 설명)를 함께 남기도록 했다.',
    architectureImage: 'assets/deepgu/architecture.png',
    architectureImageNote: '[Figure 2] Overall System Structure — CCTV/OBS → RTMP(1935) → MediaMTX(Media Server EC2) → ① WHEP/WebRTC(8889)로 Frontend(React) 직접 재생, ② RTSP(8554)로 AI Worker(GPU EC2)에 전달 → X3D-S 후보 탐지 → Event Builder → BiGRU Keyframe Selection → Qwen3-VL 검증(AWS Bedrock) → 이벤트 payload를 Backend(FastAPI)로 전송 → MySQL RDS(메타데이터)·S3(클립/썸네일) 저장 → SSE로 Frontend에 실시간 알림.',
    features: [
      'RTMP → WebRTC(WHEP) 초저지연 실시간 스트리밍 — 다중 카메라 등록/전환, 카메라별 상태(INACTIVE·STARTING·RUNNING) 표시',
      '2단계 AI 이상행동 탐지: X3D-S 후보 탐지 → Event Builder(이벤트 단위 병합) → BiGRU Keyframe Selection → Qwen3-VL 의미 검증',
      'SSE 기반 실시간 알림 — 카메라 ID·이상행동 유형·confidence·자연어 상황 설명을 이벤트 발생 즉시 전송',
      '이벤트 로그·클립·썸네일 조회(S3 + MySQL RDS), 상세 페이지에서 판단 근거(reasoning)까지 확인 가능',
      'JWT 인증 + ADMIN/USER 역할 기반 카메라 접근 제어, 관리자 카메라 등록·할당 화면',
    ],
    bullets: [
      'BiGRU 기반 Keyframe Selection 모듈을 직접 설계·학습 — ResNet-50으로 프레임별 시각 특징을 뽑고 BiGRU로 시계열 중요도를 학습해, 이상행동 판단에 실제로 기여하는 프레임만 VLM 입력으로 선별',
      'VLM pseudo-label 방식으로 41,416개 클립 학습 데이터를 구성, train/val loss 발산 시점을 근거로 best epoch(28, val acc 89.2%)을 최종 체크포인트로 채택 — 과적합 없이 일반화 확인',
      'Uniform·Adaptive·BiGRU 3가지 프레임 선별 방식과 입력 프레임 수(4/8/12/16)를 모두 비교 실험해 최적 조합(BiGRU, 12프레임)을 도출',
      'UCF-Crime·Kaggle Video Fights 데이터셋 수집·라벨링을 팀원과 공동 수행, 오탐/미탐 케이스를 원인별로 분류(군중 밀집, 저해상도, 이벤트 병합 오류 등)해 성능 개선 방향을 정리',
      'Fast Detection(X3D-S) → Event Builder → Keyframe Selection → VLM 검증으로 이어지는 전체 AI 파이프라인 아키텍처 설계에 팀원과 함께 참여',
    ],
    troubleshooting: [
      {
        problem: '균일 간격(Uniform Sampling)으로 프레임을 뽑으면 실제 폭행이 벌어지는 결정적 순간을 놓치는 경우가 많았음',
        solution: 'ResNet-50 특징 추출 + BiGRU 시계열 학습으로 프레임별 중요도를 예측하는 Keyframe Selection 모델을 별도로 설계·학습. Uniform(F1 0.502) → Adaptive(0.521) → BiGRU(0.525)로 순차 개선을 확인했고, 파이프라인 전체 성능도 F1 0.711 → 0.730으로 향상시켰다.',
      },
      {
        problem: 'BiGRU 모델이 학습 후반(epoch 25 이후) train loss는 계속 낮아지는데 val loss는 정체·발산하며 과적합 조짐을 보임',
        solution: 'Train/Val loss curve를 비교해 val accuracy가 가장 높았던 epoch을 기준으로 체크포인트를 선택하도록 학습 파이프라인을 구성 — 41,416개 클립 학습 기준 epoch 28(val acc 89.2%)을 최종 모델로 채택했다.',
      },
      {
        problem: '입력 프레임 수를 늘릴수록 정보가 많아질 줄 알았지만, 16프레임에서 오히려 F1이 0.516으로 떨어짐 — 판단에 불필요한 프레임까지 섞여 들어간 것으로 추정',
        solution: '4/8/12/16 프레임 조합을 모두 실험(F1 0.51 / 0.523 / 0.525 / 0.516)해 12프레임이 최적임을 확인하고, VLM 입력 프레임 수를 12로 고정했다.',
      },
      {
        problem: '클립 단위로 3초마다 VLM을 호출하면 영상 1편당 최대 2,205회까지 호출이 발생해 GPU 비용 부담이 컸음',
        solution: 'Event Builder로 연속된 후보 클립을 하나의 이벤트로 묶고, 이벤트당 Keyframe Selection으로 추린 프레임만 VLM에 전달하도록 파이프라인을 재구성 — 영상 1편 기준 VLM 호출량을 307회로, 약 86% 줄였다.',
      },
    ],
    results: [
      '최종 파이프라인 성능 Precision 70.4% · Recall 75.8% · F1 73.0% (Kaggle Video Fights 테스트셋 70편, GT 이벤트 182개 기준)',
      'Keyframe Selection 도입으로 선별 단계 F1 0.502(Uniform) → 0.525(BiGRU), 파이프라인 전체 F1 0.711 → 0.730으로 향상',
      '이벤트 단위 검증 구조로 VLM 호출량 86% 감소(2,205회 → 307회/영상), Qwen3-VL 채택으로 InternVL2·Claude Haiku 4.5 대비 최고 F1(0.73) 달성',
      'WebRTC 전환으로 스트리밍 지연 5~15초 → 약 125ms(최대 120배) 개선, SSE 알림 지연 50ms 이내, 부하테스트(Locust) 기준 오류율 0.25%',
    ],
    stack: ['Python', 'PyTorch', 'OpenCV', 'X3D-S', 'ResNet-50 · BiGRU', 'Qwen3-VL (AWS Bedrock)', 'FastAPI', 'React', 'AWS (EC2 · RDS · S3)', 'Docker · GitHub Actions'],
    resultImages: [
      { image: 'assets/deepgu/table6-final-pipeline-performance.png', note: '[Table 6] 최종 AI 파이프라인 성능 표 — Fast-only / Fast+VLM(Uniform Sampling) / Fast+VLM(Keyframe Selection) 3가지 조합의 TP·FP·FN·Precision·Recall·F1 비교표' },
      { image: 'assets/deepgu/violence-scores.png', note: '[Figure 10] Violence Detection Scores 그래프 — X3D-S 클립별 점수, Event Builder가 묶은 후보 구간, VLM accept/reject 결과를 시간축으로 시각화한 예시' },
      { image: 'assets/deepgu/training-curve.png', note: '[Figure 11] BiGRU Frame Selector 학습 곡선 — Train/Val Loss와 Val Accuracy(best epoch 28, 89.2%) 그래프' },
      { image: 'assets/deepgu/table4-vlm-comparison.png', note: '[Table 4] VLM 모델별 비교표 — Claude Haiku 4.5 · InternVL2 · Qwen3-VL의 TP/FP/FN/Precision/Recall/F1' },
      { image: 'assets/deepgu/ui-login.png', note: '[Figure 5] 로그인 화면 — JWT 기반 인증' },
      { image: 'assets/deepgu/ui-streaming.png', note: '[Figure 6] 실시간 스트리밍 화면' },
      { image: 'assets/deepgu/ui-alert.png', note: '[Figure 7] 실시간 알림 화면 — SSE 기반' },
      { image: 'assets/deepgu/ui-event-detail.png', note: '[Figure 8] 이벤트 상세·리뷰 화면' },
    ],
  },
  {
    id: 'ascp', num: '04', tag: 'rl · optimization',
    name: '강화학습 기반 Crew Pairing 최적화',
    statusLabel: '연구 진행중 · 세부 내용 추후 추가 예정',
    period: '2025.12 — 현재', role: '학부생 연구참여 · RL 환경·학습 구조 설계',
    repo: 'CSID-DGU/ASCP-2026', url: 'https://github.com/CSID-DGU/ASCP-2026',
    desc: '실제 항공 운항 데이터로 승무원 페어링을 최적화하는 진행중인 연구. FAA 규정을 action masking으로 인코딩하고, 제약이 바뀌어도 재학습 없이 적응하는 정책을 FiLM conditioning으로 학습시키고 있다.',
    oneLiner: '항공 승무원 스케줄링(Crew Pairing)을 제약 적응형 강화학습으로 푸는 연구 — Delta·Alaska·JetBlue·Turkish 실데이터 기반',
    problem: '승무원 페어링은 FAA Part 117 duty 시간표, 항공사별 CBA(최소 연결·휴식 시간, duty당 leg 수, pairing 기간) 같은 복잡한 제약 아래 비용을 최소화하는 NP-hard 문제다. 전통적 정수계획법은 항공사·제약이 바뀔 때마다 다시 풀어야 하고, 단순 RL은 제약 위반 해를 만들기 쉽다.',
    bullets: [
      'FAA 규정과 항공사별 제약을 action masking으로 인코딩해, 제약을 위반하는 행동 자체가 나오지 않는 RL 환경 설계',
      '제약 조건을 정책망에 직접 주입하는 FiLM conditioning으로, 제약이 바뀌어도 재학습 없이 적응하는 정책 학습',
      'Column Generation(선형계획 기반 최적화 기법)과 RL을 결합한 하이브리드 학습 구조 연구 진행 중',
    ],
    results: [
      '제약 값이 바뀌어도 재학습 없이 동작하는 정책 구조를 확보하고, 여러 항공사 실데이터로 검증 진행 중',
    ],
    stack: ['Python', 'PyTorch', 'Transformer · Attention', 'FiLM', 'Column Generation (LP)', 'CBC Solver', 'NumPy'],
  },
];

const OTHER_PROJECTS = [
  { name: 'DECS', desc: 'CUDA variant별 연구용 GPU 컨테이너 플랫폼, Kerberized NFS·noVNC 지원', meta: 'Docker · CUDA', url: 'https://github.com/DGU-AILab/DECS' },
  { name: 'Alsumddak', desc: '사람들이 LLM에 개인정보를 그대로 입력했다가 유출되는 걸 막기 위해, 정규표현식 + KoELECTRA NER로 프롬프트 속 개인정보를 탐지해 문맥은 유지한 채 마스킹', meta: 'Node.js · NER', url: 'https://github.com/pkhyrn268/2025-OpenSource-AiSumDdat' },
  { name: 'ML 기반 접근 제어', desc: 'PCAP·Suricata IDS 로그로 의심 흐름을 감지해 즉시 차단하는 건 기존에도 가능하지만, 이 차단을 언제 해제해도 안전한지 ML로 학습해 판단하는 연구', meta: 'ML · Security' },
  { name: 'FarmSystem 커뮤니티 플랫폼', desc: '동아리 커뮤니티 및 공식 홈페이지 제작 참여, REST API 설계·AWS 배포·WebGL 콘텐츠 통합', meta: 'Spring · AWS', url: 'https://www.farmsystem.kr/' },
];

const SKILL_GROUPS = [
  {
    title: 'AI · 머신러닝', sub: 'ai / ml',
    items: ['PyTorch', 'OpenCV', 'Computer Vision', 'Vision-Language Models'],
  },
  {
    title: '인프라 · DevOps', sub: 'infra / devops',
    items: ['Docker', 'Kubernetes', 'Linux', 'Prometheus', 'Grafana'],
  },
  {
    title: '백엔드', sub: 'backend',
    items: ['FastAPI', 'Spring Boot', 'REST API Design'],
  },
  {
    title: '프로그래밍', sub: 'programming',
    items: ['Python', 'Java', 'C', 'C++'],
  },
  {
    title: '클라우드 · 데이터', sub: 'cloud / data',
    items: ['AWS (EC2, RDS, S3, Route53)', 'MySQL'],
  },
  {
    title: '네트워크 · 보안', sub: 'networking & security',
    items: ['Suricata', 'Wireshark', 'Mininet'],
  },
];

const EXPERIENCE = [
  {
    period: '2024.12 — 현재', title: '동국대학교 AI 연구실 서버 관리자로 근무',
    desc: '80+ GPU, 15대 서버 AI 인프라 운영. GPU·네트워크·storage 장애를 로그 분석으로 해결하고, K8s 자원 스케줄링·Ansible 자동화·모니터링 체계를 구축. admin_infra · admin_infra_server · admin_be · DECS 모두 서버 관리자로서 수행한 작업.',
  },
  {
    period: '2025.05 — 현재', title: '학부생 연구참여',
    desc: '영상 분석, 네트워크 보안, 강화학습 최적화 등 실데이터 기반 AI 연구 프로젝트 수행. WE-MEET 프로그램 참여.',
  },
  {
    period: '2025.03 — 12', title: 'Farm System 4기 · 백엔드 개발자 & 운영진',
    desc: '동국대 SW 인재 양성 프로그램. 커뮤니티 플랫폼 백엔드 개발(Spring Boot·AWS)과 기수 운영을 병행.',
  },
];
