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
    desc: '다중 사용자 GPU 인프라에서 계정·스토리지·접속 경로·자원 회수를 하나의 control-plane으로 묶었다. 단순 자동화보다, 장애 이후에도 실제 상태를 기준으로 다시 맞춰지는 운영-safe 설계에 집중했다.',
    listSignal: '읽을 포인트 · DB 기록보다 실제 클러스터 상태를 더 신뢰하도록 설계한 control-plane 경험',
    oneLiner: '80+ GPU · 15대 서버 규모 AI 인프라에서 계정, NAS 홈, NodePort, Pod 수명 주기를 하나의 config-server로 묶은 운영 control-plane',
    summaryIntro: '이 프로젝트의 핵심은 Kubernetes를 썼다는 사실이 아니라, 사람이 손으로 이어 붙이던 계정 발급·NAS 준비·외부 접속·자원 회수를 실패 복구 가능한 control-plane으로 바꾼 것이다. 특히 DB 기록과 실제 클러스터 상태가 어긋나는 순간을 기본 전제로 두고 설계했다.',
    summaryCards: [
      { label: 'scale', value: '80+ GPU · 15 servers', note: '다수 연구원이 동시에 쓰는 GPU 연구 인프라' },
      { label: 'owned', value: '계정 · NAS 홈 · Pod · NodePort', note: '사용자 생성부터 접속 준비, 회수까지 담당' },
      { label: 'hard part', value: '기록과 실제 상태의 drift', note: 'DB, Kubernetes Service, UID/GID, Kerberos 상태가 어긋나는 문제' },
      { label: 'outcome', value: '승인 → 접속 준비 → 만료 회수 자동화', note: '관리자 수작업을 control-plane 흐름으로 전환' },
    ],
    summaryBullets: [
      '계정 생성, 홈 디렉터리 준비, Pod 배치, SSH·Jupyter 접속 준비가 한 번의 요청 흐름으로 이어지도록 진입점을 단일화했다.',
      '실패를 예외가 아니라 기본 흐름으로 보고, NodePort·UID/GID·Kerberos 상태를 실제 시스템 기준으로 다시 맞추는 구조를 설계했다.',
      '관리자가 어디서 왜 멈췄는지 바로 파악할 수 있도록 단계별 상태, 롤백, 운영 체크리스트를 코드와 함께 남겼다.',
    ],
    problem: '동국대 AI 연구실 GPU 서버실은 여러 사용자가 동시에 학습과 실험을 돌리는 환경이라, 계정 생성·외부 SSH/Jupyter 접속 정보 배정·NAS 홈 디렉터리 준비·Pod 배치가 한 단계라도 꼬이면 전체 흐름이 막혔다. 이전에는 관리자가 SSH로 각 서버에 들어가 순서대로 처리했기 때문에 요청이 몰리면 그대로 병목이 됐고, DB에 남은 기록과 실제 Kubernetes Service·계정 파일 상태가 어긋나면 새 사용자 생성이 막히거나 회수가 누락될 수 있었다. 결국 이 프로젝트의 문제는 자동화 자체보다, 실패와 drift가 생겨도 다시 운영 가능한 상태로 복원되는 control-plane이 필요하다는 점이었다.',
    designIntent: '설계의 출발점은 config-server의 기록보다 실제 시스템 상태를 더 신뢰하는 것이었다. 그래서 NodePort를 배정하기 직전에는 클러스터 전체 Service 목록과 infra-mysql 기록을 다시 대조하고, 계정 생성 단계에서도 상위 요청값을 그대로 믿지 않고 passwd/group 상태를 재확인했다. 또 계정·스토리지·접속은 서로 의존하므로 한 단계가 실패했을 때 어디까지 성공했고 무엇을 되돌려야 하는지 명확해야 했다. 그래서 생성 흐름을 NAS 홈 준비 → 포트 할당 → Pod/Service 생성 → 접속 검증처럼 단계화하고, 단계별 상태·에러 코드·롤백 경로를 분리해 happy path보다 failure path가 더 잘 보이도록 만들었다.',
    bullets: [
      'NFS 위의 passwd/group/shadow 파일은 flock 기반 락이 불안정하다는 점을 확인하고, 로컬 락 파일로 동시 쓰기를 막는 방식으로 계정 파일 갱신 경합을 제어했다. sudoers 반영도 임시 파일 작성 뒤 교체하는 원자적 방식으로 바꿨다.',
      'NodePort 할당은 DB 숫자만 증가시키는 방식 대신, 클러스터 전체 Service 목록을 먼저 스캔하고 infra-mysql 트랜잭션 안에서 반영하도록 설계했다. 이 구조로 중복 배정과 유령 포트 누적을 줄였다.',
      '삭제 실패나 수동 조작 때문에 포트 기록이 어긋나는 상황을 대비해 reconcile 절차를 별도로 두고, 실제 Service가 없는 포트는 재수거하도록 했다.',
      '기존 PVC API 기반 홈 디렉터리 관리 경로를 제거하고, NAS에 SSH로 직접 접속해 유저 홈을 준비하는 방식으로 단순화했다. 이 전환으로 스토리지 경계를 더 명확히 설명할 수 있게 됐다.',
      '접속 경로는 forced-command SSH와 AD failover를 결합해, 인증 서버 일부가 불안정해도 사용자가 고정된 진입점으로 접속하도록 만들었다.',
      '노드 선택은 Prometheus 기반 GPU 지표를 조합해 가장 여유 있는 서버를 우선 선택하도록 했고, 생성 API는 Redis 기반 상태 조회를 통해 진행 상황을 외부에서 확인할 수 있게 했다.',
      '사용자 환경 보존이 필요한 경우를 위해 컨테이너 스냅샷 기능을 넣어, Pod가 재생성되어도 필요한 패키지와 설정을 이어갈 수 있도록 했다.',
    ],
    troubleshooting: [
      {
        problem: 'Pod 생성 요청이 몰리는 시간대에 config-server API가 지연되며 SSH 연결까지 타임아웃되고, 사용자는 생성이 실패했는지 진행 중인지 구분할 수 없었다.',
        solution: 'gunicorn worker 수와 timeout, 컨테이너 리소스 한도를 조정하고, 생성 진행 상황을 Redis로 추적하는 비동기 상태 조회 API를 추가했다. 이후 사용자는 요청이 멈춘 것처럼 보이는 대신 어느 단계에서 진행 중인지 확인할 수 있게 됐다.',
      },
      {
        problem: 'DB에는 사용 중이라고 남아 있지만 실제 Kubernetes Service는 사라진 NodePort가 누적되면, 비어 있는 포트가 있어도 새 Pod 생성이 막히는 정합성 문제가 발생했다.',
        solution: 'NodePort 할당 직전에 실제 Service 목록과 infra-mysql 기록을 다시 맞추는 reconcile 단계를 추가하고, 삭제 경로에서도 Pod·Service·포트 배정 기록·Kerberos 정리 순서를 검증하도록 보강했다. 이 변경으로 기록 drift가 누적되어 신규 생성이 막히는 상황을 줄였다.',
      },
    ],
    results: [
      '계정 발급, NAS 홈 준비, Pod·접속 경로 배정, 만료 회수까지 하나의 흐름으로 묶인 운영 파이프라인을 만들었다.',
      'NodePort·UID/GID·계정 기록이 틀어져도 실제 시스템 기준으로 복구하는 구조를 넣어, 기록 drift 때문에 생성이 막히는 리스크를 낮췄다.',
      'PVC 공유 경로 대신 권한 기반 NFS 홈 디렉터리 구조로 전환해 데이터 혼재 위험과 스토리지 관리 복잡도를 줄였다.',
      'GitHub Actions와 commit-hash 태깅을 사용해 배포 버전과 변경 이력을 코드 수준에서 추적 가능한 운영 방식으로 정리했다.',
    ],
    stack: ['Kubernetes', 'Helm', 'Docker', 'ContainerSSH', 'GitHub Actions', 'Ansible', 'Kerberos · AD', 'Redis', 'Prometheus · Grafana', 'Python'],
  },
  {
    id: 'ops', num: '02', tag: 'operations · monitoring',
    name: 'GPU 서버실 통합 운영 시스템',
    period: '2024.12 — 현재', role: '서버 관리자 · 운영 자동화',
    repo: 'CSID-DGU/admin_infra_server', url: 'https://github.com/CSID-DGU/admin_infra_server',
    desc: '실제 장애를 기준으로 GPU 런타임, Kerberos/NFS, 원격 부팅, 헬스체크를 표준화한 운영 프로젝트다. 흩어진 스크립트를 모으는 데서 끝나지 않고, 서버가 어떻게 죽고 다시 살아나는지까지 코드와 절차로 정리했다.',
    listSignal: '읽을 포인트 · 실제 장애를 기준으로 GPU 런타임 표준, 헬스체크, 원격 복구 체계를 세운 운영 시스템 경험',
    oneLiner: 'DECS 서버 운영의 통합 레포 — GPU 런타임 표준화, 모니터링, 원격 부팅, 사용자 수명 주기, Kerberos/NFS 운영을 재현 가능한 절차로 만든 프로젝트',
    summaryIntro: '이 프로젝트는 운영 스크립트를 한 저장소에 모아두는 작업이 아니라, 서버가 어떤 순서로 망가지고 어떤 조건에서만 자동 복구를 허용해야 하는지를 표준 절차로 바꾸는 작업이었다. 모니터링도 단순 관측이 아니라, 잘못된 자동 복구가 더 큰 장애를 만들지 않도록 제약까지 포함해 설계했다.',
    summaryCards: [
      { label: 'scale', value: '80+ GPU · 15 servers', note: '공용 연구용 GPU 서버실 운영 기준 정리' },
      { label: 'owned', value: '모니터링 · 원격 부팅 · Kerberos/NFS', note: '런타임, 접속, 스토리지, 복구 자동화 담당' },
      { label: 'hard part', value: '자동 복구의 안전성', note: '복구가 다른 사용자의 세션과 스토리지를 망치지 않아야 함' },
      { label: 'outcome', value: '부팅 → 점검 → 복구 → 알림 자동화', note: '사용자 신고 전 감지와 제한적 self-healing 체계 구축' },
    ],
    summaryBullets: [
      '관리자 개인 홈 디렉터리에 흩어져 있던 운영 지식과 스크립트를 단일 레포, systemd, Ansible 기준으로 정리했다.',
      'GPU 런타임, Kerberos/NFS, SSH 경로, 원격 부팅 순서를 서버 공통 기준값으로 표준화했다.',
      '관제에서 끝내지 않고 제한된 자동 복구와 Slack 알림까지 연결하되, 위험한 조치는 기본 비활성화해 안전장치를 뒀다.',
    ],
    problem: '서버실 운영 지식이 관리자 개인 홈 디렉터리(~/decs, ~/k8s, ~/uid, ~/krb 등)에 흩어져 있으면, 같은 증상도 누가 대응하느냐에 따라 복구 방식이 달라진다. 특히 GPU 드라이버, Docker runtime, NFS mount, SSH 접속 경로, 전원 복구 절차가 서버마다 다르면 장애 재현과 원인 규명이 어려워지고, 자동화는 오히려 더 위험해질 수 있다. 이 프로젝트의 문제는 단순히 스크립트를 모으는 것이 아니라, 실제 장애를 기준으로 운영 표준과 복구 경계를 다시 정하는 일이었다.',
    designIntent: '핵심 원칙은 모니터링과 자동 복구가 장애를 더 키우지 않아야 한다는 것이었다. 예를 들어 NAS 인증 데몬을 성급히 재시작하면 다른 사용자 세션까지 끊길 수 있으므로, 위험한 복구 명령은 기본적으로 비활성화하고 명시적으로만 실행되도록 제한했다. 헬스체크도 프로세스가 살아 있는지만 보는 방식에서 벗어나, D-state처럼 응답 없이 멈춘 상태와 외부 SSH 접속 실패, NFS 버전 이상 같은 실제 운영 영향을 더 직접적으로 보게 확장했다. 결국 목표는 "스크립트 모음"이 아니라, 관리자가 바뀌어도 같은 기준으로 부팅·점검·복구할 수 있는 운영 시스템을 만드는 것이었다.',
    bullets: [
      'gpu-user-exporter와 cluster-monitor-exporter를 Go로 직접 구현해, 어떤 사용자가 어떤 GPU를 쓰는지와 노드별 마운트·GPU·Docker·컨테이너 상태를 메트릭으로 수집했다.',
      'Ubuntu 22.04 재설치 이후 반복되던 `Failed to initialize NVML: Unknown Error`를 운영 이슈로 추적해, Docker `nvidia` runtime 등록, cgroup driver `cgroupfs`, `nvidia-persistenced` 활성화를 서버 공통 기준값으로 문서화했다.',
      'Wake-on-LAN 기반 원격 부팅 자동화는 우선순위 높은 서버부터 단계적으로 켜고, 상태 확인 후 다음 서버를 켜는 방식으로 설계해 대규모 동시 기동 리스크를 줄였다.',
      '부팅 직후 임시 GPU 테스트 컨테이너, 중단 컨테이너 재기동, SSH·GPU 사후 점검, 실패 시 Slack 알림까지 이어지는 점검 흐름을 구성했다.',
      'NFS mount 상태와 버전, 외부 SSH 가용성, GPU 이상, 컨테이너 상태를 Prometheus alert와 체크 스크립트로 연결해 사용자 신고 전에 장애를 감지하도록 만들었다.',
      '계정 생성부터 만료 회수, 백업, 만료 알림, 인증 처리까지 user-lifecycle 모듈로 묶어 사람이 따라다니는 운영 작업을 줄였다.',
      'Ansible로 Docker 버전, systemd 서비스, 운영 패키지를 코드화하고 예외 서버와 점검 체크리스트까지 함께 남겨 왜 특정 서버만 다른지 추적 가능하게 정리했다.',
    ],
    troubleshooting: [
      {
        problem: '사용자 홈 디렉터리 접근이 느려지고 컨테이너 SSH 접속이 전반적으로 막히는 장애가 발생했는데, 단순 프로세스 alive 체크로는 원인을 찾기 어려웠다.',
        solution: '부팅 중 인증 서비스(rpc-gssd)가 비정상 종료된 뒤 암호화된 파일 접근이 걸리면서 D-state가 발생했고, SSH 로그인마다 홈 디렉터리 조회 프로세스가 쌓여 MaxStartups를 넘기는 연쇄 장애였음을 규명했다. 이후 부팅·복구 순서 점검, 상태 이상 감지, 재현 테스트 기반 검증 절차를 추가했다.',
      },
      {
        problem: 'OS 재설치 이후 여러 서버에서 컨테이너 내부 `nvidia-smi`가 간헐적으로 실패하고 장시간 미사용 뒤 `Failed to initialize NVML: Unknown Error`가 반복됐다.',
        solution: 'Docker runtime, cgroup 설정, NVIDIA toolkit/CUDA 버전, `nvidia-persistenced` 상태를 함께 비교해 공통 원인을 좁혔다. 이후 공통 daemon 설정, 서비스 자동 시작, 점검 순서를 문서와 서버 표준 설정으로 반영했다.',
      },
      {
        problem: '특정 서버에서 컨테이너 접속 지연과 패킷 유실이 반복되었고, 조사 결과 NIC의 `rx_missed_errors`가 꾸준히 증가하고 있었다.',
        solution: 'NIC ring buffer 초과 가능성을 보고 RX descriptor queue를 512에서 4096으로 늘리고, 컨테이너 생성 시 `--init` 옵션을 적용해 zombie process 누적도 함께 줄였다. 이후 `rx_missed_errors: 0` 상태를 모니터링하며 재발 여부를 확인했다.',
      },
    ],
    results: [
      '흩어져 있던 운영 자산을 단일 레포와 표준 절차로 통합해, 관리자가 바뀌어도 이어질 수 있는 운영 기반을 만들었다.',
      '서버 기동, 점검, 제한적 복구, 알림까지 이어지는 자동화 흐름을 마련해 사용자 신고 이전 감지 비중을 높였다.',
      'GPU 런타임, NFS mount, SSH 접속 경로, systemd 서비스 버전을 공통 기준값으로 정리해 서버별 설정 drift를 줄일 기반을 마련했다.',
      'Prometheus·Grafana·Slack 기반 관제로 GPU·스토리지·접속 이상을 더 빠르게 파악하고, 실사용자 단위 GPU 가시성을 확보했다.',
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
    title: '시스템 운영', sub: 'system administration',
    items: ['systemd', 'SSH', 'NFS · Kerberos', 'Ansible', 'NodePort · pfSense', 'Wake-on-LAN · IPMI'],
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
    desc: '80+ GPU, 15대 서버 AI 인프라 운영. GPU 런타임 표준화, NodePort·SSH 접속 경로 관리, Kerberos/NFS 스토리지 운영, Wake-on-LAN/IPMI 원격 부팅, Prometheus·Grafana·Slack 기반 장애 감지·복구 자동화를 구축했다. admin_infra · admin_infra_server · admin_be · DECS 모두 서버 관리자로서 수행한 작업.',
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
