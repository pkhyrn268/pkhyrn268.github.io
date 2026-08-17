// ============================================================
// All portfolio content lives here. Edit this file to change
// projects, skills, experience, etc. — no HTML/JS knowledge needed
// for text/data changes.
// ============================================================

const FEATURED_PROJECTS = [
  {
    id: 'ops', num: '01', tag: 'operations · reliability',
    name: 'GPU 서버실 통합 운영 시스템',
    period: '2024.12 — 현재', role: '서버 관리자 · 운영 표준화',
    repo: 'CSID-DGU/admin_infra_server', url: 'https://github.com/CSID-DGU/admin_infra_server',
    desc: '15대 서버, 80+ GPU 환경에서 GPU·NFS·SSH·네트워크 장애를 어떤 신호로 감지하고 어디까지 자동 복구할지 기준을 세운 운영 프로젝트다. 자동화보다 먼저 정상 상태, 경고 신호, 사람 개입 경계를 정의했다.',
    listSignal: '읽을 포인트 · 장애 신호와 자동 복구 경계를 먼저 정의한 뒤 운영을 표준화한 경험',
    oneLiner: 'GPU 런타임, 스토리지, 접속, 부팅, 복구 절차를 서버 공통 운영 규칙으로 재정의한 운영 표준화 프로젝트',
    summaryIntro: '이 프로젝트에서 먼저 한 일은 자동화가 아니었다. 15대 서버, 80+ GPU 환경에서 GPU/NFS/SSH/네트워크 장애를 어떤 신호로 감지해야 사용자 신고보다 먼저 알 수 있는지, 그리고 그 신호가 왔을 때 어디까지를 시스템이 자동 복구해도 안전한지 운영 기준부터 세웠다.',
    summaryCards: [
      { label: 'scale', value: '80+ GPU · 15 servers', note: '공용 연구용 GPU 서버실 전체 운영 기준 정리' },
      { label: 'owned', value: '장애 신호 · 복구 경계 · 운영 표준', note: 'GPU runtime, Kerberos/NFS, SSH 경로, 원격 부팅, 관제 담당' },
      { label: 'hard part', value: '자동 복구의 blast radius 제어', note: '잘못 복구하면 다른 사용자의 세션과 파일 접근까지 끊을 수 있는 환경' },
      { label: 'outcome', value: '신고 기반 대응 → 신호 기반 감지·제한 복구', note: '운영 지식이 사람 기억이 아니라 절차와 코드에 남는 구조로 전환' },
    ],
    summaryBullets: [
      'GPU/NFS/SSH/네트워크 장애를 사용자 체감 이전에 감지할 수 있도록 실제 장애 신호를 다시 정의했다.',
      '재설치와 재부팅 뒤에도 15대 서버를 같은 체크리스트로 검증하도록 runtime, mount, boot 순서를 공통 운영 기준으로 표준화했다.',
      '자동 복구는 blast radius가 작은 조치만 허용하고, 위험한 영역은 알림 후 수동 대응으로 남기는 기준을 세웠다.',
    ],
    problem: '2025년 NAS 해킹 대응, Ubuntu 22.04 재설치, LAB7 NFS 지연, GPU runtime 오류를 겪으면서 서버실 운영의 가장 큰 문제가 드러났다. 같은 증상도 누가 대응하느냐에 따라 원인 추적과 복구 방식이 달랐고, GPU 드라이버, Docker runtime, NFS mount, SSH 접속 경로, 전원 복구 절차가 서버마다 조금씩 달라 장애 재현과 운영 인수인계가 어려웠다. 이 프로젝트의 문제는 스크립트를 모으는 것이 아니라, 실제 장애를 기준으로 무엇을 정상 상태로 보고 어떤 신호를 위험으로 판단할지부터 다시 정하는 일이었다.',
    designIntent: '운영 프로젝트의 핵심 질문은 두 가지였다. 첫째, GPU/NFS/SSH/네트워크 장애를 어떤 신호로 감지해야 사용자 불편보다 먼저 알 수 있는가. 둘째, 그 신호가 왔을 때 어디까지를 시스템이 자동 복구해도 안전한가. 그래서 헬스체크를 단순 프로세스 alive 여부가 아니라 GPU 사용 가능 여부, 외부 SSH 가용성, NFS mount 상태와 버전, NIC 오류, 컨테이너 기동 후 실제 접속 가능 여부처럼 사용자 체감과 직접 연결된 신호 중심으로 설계했다. 복구도 같은 기준으로 나눴다. 모듈 reload, 컨테이너 재시작, 원격 부팅처럼 blast radius가 제한된 조치만 자동화하고, NAS 인증 데몬이나 파일 접근 경계처럼 잘못 건드리면 다른 사용자의 세션과 홈 디렉터리 접근까지 끊을 수 있는 영역은 기본 자동 재시작 대상에서 제외했다. 즉 이 프로젝트는 운영을 자동화했다기보다, 자동화가 깨뜨리면 안 되는 운영 기준과 복구 경계를 먼저 설계한 프로젝트였다.',
    bullets: [
      'gpu-user-exporter와 cluster-monitor-exporter를 Go로 직접 구현해, 어떤 사용자가 어떤 GPU를 쓰는지와 노드별 NFS mount, GPU, Docker, 컨테이너 상태를 메트릭으로 수집했다.',
      '외부 SSH 가용성, NFS mount 상태와 버전, GPU runtime/NVML 상태, 컨테이너 재기동 여부, NIC `rx_missed_errors`를 운영 신호로 삼아 Prometheus alert와 Slack 알림에 연결했다.',
      'Ubuntu 22.04 재설치 이후 반복되던 `Failed to initialize NVML: Unknown Error`를 추적해 Docker `nvidia` runtime 등록, cgroup driver `cgroupfs`, `nvidia-persistenced` 활성화를 서버 공통 기준값으로 문서화했다.',
      'LAB7 무한 로딩 이슈를 NFSv4.2 협상 문제로 좁혀, NFSv3 전환, `/etc/fstab` 고정, 컨테이너 재기동 절차를 운영 표준으로 정리했다.',
      'Wake-on-LAN 기반 원격 부팅 자동화는 우선순위 높은 서버부터 단계적으로 켜고, 상태 확인 후 다음 서버를 켜는 방식으로 설계해 대규모 동시 기동 리스크를 줄였다.',
      '부팅 직후 임시 GPU 테스트 컨테이너, 중단 컨테이너 재기동, SSH·GPU 사후 점검, 실패 시 Slack 알림까지 이어지는 복구 흐름을 구성했다.',
      'Ansible로 Docker 버전, systemd 서비스, 운영 패키지, 예외 서버 설정을 코드화해 왜 특정 서버만 다른지 추적 가능한 운영 상태를 만들었다.',
    ],
    troubleshooting: [
      {
        problem: 'LAB7에서 VSCode와 터미널 접속이 무한 로딩에 빠지고 일부 컨테이너는 SSH 접속이 되지 않았는데, 단순 프로세스 alive 체크만으로는 원인을 찾을 수 없었다.',
        solution: '장애를 conda 문제로 보지 않고 NFS 계층까지 내려가 조사해, STORAGE를 NFSv4.2로 마운트한 상태에서 버전 협상 지연과 패킷 드롭이 반복된다는 점을 확인했다. 이후 LAB7을 NFSv3로 다시 마운트하고 `/etc/fstab`을 고정했으며, 컨테이너 재시작과 점검 절차를 표준화해 같은 유형의 접속 지연을 운영 관점에서 설명 가능한 문제로 바꿨다.',
      },
      {
        problem: 'OS 재설치 이후 여러 서버에서 컨테이너 내부 `nvidia-smi`가 간헐적으로 실패하고 장시간 미사용 뒤 `Failed to initialize NVML: Unknown Error`가 반복됐다.',
        solution: 'Docker runtime, cgroup 설정, NVIDIA toolkit/CUDA 버전, `nvidia-persistenced` 상태를 함께 비교해 공통 원인을 좁혔다. 이후 공통 daemon 설정, 서비스 자동 시작, 재설치 후 검증 순서를 운영 표준에 반영해 GPU 장애를 서버별 개별 이슈가 아니라 재현 가능한 운영 문제로 다루게 됐다.',
      },
      {
        problem: '특정 서버에서 컨테이너 접속 지연과 패킷 유실이 반복되었고, 표면상 CPU·메모리는 여유가 있었지만 체감 성능은 계속 나빠졌다.',
        solution: '네트워크 계층까지 확인해 NIC의 `rx_missed_errors` 증가를 신호로 잡고 RX descriptor queue를 512에서 4096으로 늘렸다. 동시에 컨테이너 생성 시 `--init` 옵션을 적용해 zombie process 누적도 줄였고, 이후 `rx_missed_errors: 0` 상태를 지속적으로 모니터링하도록 관제 기준에 포함했다.',
      },
    ],
    results: [
      '15대 서버의 GPU runtime, NFS mount, systemd 기동 순서를 공통 기준으로 정리해 재설치와 재부팅 이후에도 같은 체크리스트로 점검하는 운영 기반을 만들었다.',
      'GPU runtime, 외부 SSH, NFS mount, 컨테이너 상태, NIC 이상을 Prometheus·Grafana·Slack으로 사용자 신고 전에 감지하는 관제 체계를 구축했다.',
      '자동 복구 범위를 모듈 reload, 컨테이너 재시작, 원격 부팅처럼 안전한 조치로 제한하고 위험한 영역은 수동 대응으로 남겨, 자동화가 장애 반경을 키우지 않도록 운영 경계를 명시했다.',
      '정전 이후 우선순위 부팅, 단계별 헬스체크, 제한적 복구, 알림을 연결해 야간과 무인 시간대에도 1차 대응 가능한 운영 범위를 넓혔다.',
    ],
    stack: ['Kubernetes', 'Prometheus · Grafana', 'Go', 'Ansible', 'Bash', 'Wake-on-LAN', 'Kerberos · NFS', 'Docker'],
  },
  {
    id: 'infra', num: '02', tag: 'control plane · infra',
    name: 'GPU 서버 관리 자동화 시스템',
    period: '2024.12 — 현재', role: '서버 관리자 · Control-Plane 설계',
    repo: 'CSID-DGU/admin_infra', url: 'https://github.com/CSID-DGU/admin_infra',
    desc: '계정, 홈 디렉터리, Kerberos, NodePort, Pod, 배정 상태를 하나의 control-plane에서 reconcile하도록 만든 운영 자동화 프로젝트다. 빠른 생성보다 틀린 상태를 만들지 않는 생성 흐름에 더 무게를 뒀다.',
    listSignal: '읽을 포인트 · 계정·스토리지·접속·배정 상태를 하나의 control-plane으로 묶고 reconcile한 경험',
    oneLiner: '80+ GPU · 15대 서버 AI 인프라에서 계정, NAS 홈, 접속 포트, Pod 배정 상태를 reconcile하는 운영 control-plane',
    summaryIntro: '이 프로젝트의 핵심은 업무 효율화 자체보다 정합성이었다. 계정, NAS 홈, 포트, Pod 상태가 한 단계라도 어긋나면 신규 사용자 생성이 막히거나 잘못된 접근이 생길 수 있었기 때문에, 요청을 빨리 처리하는 것보다 실제 상태를 다시 맞추는 control-plane을 만드는 데 집중했다.',
    summaryCards: [
      { label: 'scale', value: '80+ GPU · 15 servers', note: '다수 연구원이 동시에 쓰는 GPU 연구 인프라' },
      { label: 'owned', value: '계정 · NAS 홈 · NodePort · Pod · Kerberos', note: '사용자 생성부터 접속 준비, 만료 회수까지 담당' },
      { label: 'hard part', value: '기록과 실제 상태의 drift', note: 'DB, Kubernetes Service, UID/GID, Kerberos, NAS 상태가 어긋나는 문제' },
      { label: 'outcome', value: '수작업 배정 → reconcile 가능한 control-plane', note: '승인 이후 흐름을 단계별 검증·rollback 구조로 전환' },
    ],
    summaryBullets: [
      '승인 이후 NAS 홈 준비 → 포트 할당 → Pod/Service 생성 → 접속 검증 → 만료 회수 흐름을 하나로 묶었다.',
      'DB보다 실제 passwd/group, Kubernetes Service, NAS 상태를 더 신뢰하고 단계마다 재검증하도록 설계했다.',
      '생성 실패, 삭제 실패, 수동 수정이 있어도 다음 요청에서 상태를 다시 맞추는 reconcile 경로를 별도로 뒀다.',
    ],
    problem: '동국대 AI 연구실 GPU 서버실은 여러 사용자가 동시에 학습과 실험을 돌리는 환경이라, 계정 생성, 외부 SSH/Jupyter 접속 정보 배정, NAS 홈 디렉터리 준비, Pod 배치 중 한 단계라도 꼬이면 전체 흐름이 멈췄다. 이전에는 관리자가 여러 서버에 직접 SSH로 들어가 순서대로 처리했기 때문에 요청이 몰리면 그대로 병목이 됐고, DB에 남은 기록과 실제 Kubernetes Service, passwd/group, Kerberos 상태가 어긋나면 새 사용자 생성이 막히거나 회수가 누락될 수 있었다. 결국 이 프로젝트의 문제는 자동화를 많이 붙이는 것이 아니라, 실패와 drift가 생겨도 계정·홈 디렉터리·포트·Pod·배정 상태를 다시 운영 가능한 상태로 복원하는 control-plane이 필요하다는 점이었다.',
    designIntent: '설계 의도는 업무 효율화보다 계정·홈 디렉터리·포트·Pod·배정 상태의 정합성을 맞추는 control-plane을 만드는 데 있었다. 자동화 쪽 이야기를 "요청을 더 빨리 처리했다"로 끝내면 이 프로젝트의 핵심이 빠진다. 실제로 중요한 것은 승인 정보가 들어왔을 때 config-server의 내부 기록을 그대로 믿지 않고, 계정 파일, NAS 홈 디렉터리, Kubernetes Service, Kerberos 상태를 다시 확인해 잘못된 상태를 만들지 않는 흐름을 만드는 일이었다. 그래서 첫 원칙을 내부 DB보다 실제 시스템 상태를 더 신뢰하는 것으로 잡았다. NodePort를 배정하기 직전에는 클러스터 전체 Service 목록과 infra-mysql 기록을 다시 대조했고, 계정 생성 단계에서도 상위 요청값을 그대로 반영하지 않고 passwd/group 상태를 재확인했다. 또 계정, NAS 홈, 접속 포트, Pod 상태는 서로 강하게 결합되어 있어 한 단계만 틀어져도 신규 사용자 생성이 막히거나 잘못된 접근이 생길 수 있었다. 그래서 생성 흐름을 NAS 홈 준비 → 포트 할당 → Pod/Service 생성 → 접속 검증처럼 단계화하고, 단계별 상태, 검증, rollback, reconcile 경로를 분리해 빠른 provisioning보다 잘못 자동화하지 않는 쪽에 더 무게를 뒀다.',
    bullets: [
      'NFS 위의 passwd/group/shadow 파일은 flock 기반 락이 불안정하다는 점을 확인하고, 로컬 락 파일로 동시 쓰기를 막는 방식으로 계정 파일 갱신 경합을 제어했다. sudoers 반영도 임시 파일 작성 뒤 교체하는 원자적 방식으로 바꿨다.',
      'NodePort 할당은 DB 숫자만 증가시키는 방식 대신, 클러스터 전체 Service 목록을 먼저 스캔하고 infra-mysql 트랜잭션 안에서 반영하도록 설계했다. 이 구조로 중복 배정과 유령 포트 누적을 줄였다.',
      '삭제 실패나 수동 조작 때문에 포트 기록이 어긋나는 상황을 대비해 reconcile 절차를 별도로 두고, 실제 Service가 없는 포트는 재수거하도록 했다.',
      '기존 PVC API 기반 홈 디렉터리 관리 경로를 제거하고, NAS에 SSH로 직접 접속해 유저 홈을 준비하는 방식으로 단순화했다. 이 전환으로 스토리지 책임 경계와 권한 흐름을 더 명확히 설명할 수 있게 됐다.',
      '접속 경로는 forced-command SSH와 AD failover를 결합해, 인증 서버 일부가 불안정해도 사용자가 고정된 진입점으로 접속하도록 만들었다.',
      '노드 선택은 Prometheus 기반 GPU 지표를 조합해 가장 여유 있는 서버를 우선 선택하도록 했고, 생성 API는 Redis 기반 상태 조회를 통해 진행 상황을 외부에서 확인할 수 있게 했다.',
      '사용자 환경 보존이 필요한 경우를 위해 컨테이너 스냅샷 기능을 넣어, Pod가 재생성되어도 필요한 패키지와 설정을 이어갈 수 있도록 했다.',
    ],
    troubleshooting: [
      {
        problem: 'Pod 생성 요청이 몰리는 시간대에 config-server API가 지연되며 SSH 연결까지 타임아웃되고, 사용자는 생성이 실패했는지 진행 중인지 구분할 수 없었다.',
        solution: 'gunicorn worker 수와 timeout, 컨테이너 리소스 한도를 조정하고, 생성 진행 상황을 Redis로 추적하는 비동기 상태 조회 API를 추가했다. 이후 사용자는 요청이 멈춘 것처럼 보이는 대신 어느 단계에서 진행 중인지 확인할 수 있게 됐고, 운영자도 어느 단계에서 병목이 생겼는지 설명할 수 있게 됐다.',
      },
      {
        problem: 'DB에는 사용 중이라고 남아 있지만 실제 Kubernetes Service는 사라진 NodePort가 누적되면, 비어 있는 포트가 있어도 새 Pod 생성이 막히는 정합성 문제가 발생했다.',
        solution: 'NodePort 할당 직전에 실제 Service 목록과 infra-mysql 기록을 다시 맞추는 reconcile 단계를 추가하고, 삭제 경로에서도 Pod, Service, 포트 배정 기록, Kerberos 정리 순서를 검증하도록 보강했다. 이 변경으로 기록 drift가 누적되어 신규 생성이 막히는 상황을 줄였다.',
      },
      {
        problem: '동시 생성 요청이 들어오면 NFS 위 계정 파일 갱신이 엉켜 UID/GID, sudoers, 홈 디렉터리 권한 상태가 어긋날 위험이 있었다.',
        solution: '계정 파일 갱신을 로컬 락 파일 기반 임계 구역으로 감싸고, sudoers와 관련 설정은 임시 파일 작성 후 원자적으로 교체하도록 바꿨다. 그 결과 동시 요청 상황에서도 반쯤 생성된 계정 상태가 남는 리스크를 낮췄다.',
      },
    ],
    results: [
      '관리자가 여러 서버에 직접 SSH로 들어가 순차 처리하던 흐름을, 승인 이후 NAS 홈 준비, 포트 할당, Pod 생성, 접속 검증, 만료 회수까지 이어지는 control-plane 흐름으로 전환했다.',
      '계정, 홈 디렉터리, 포트, Pod, Kerberos 상태를 단계별 검증과 rollback으로 묶어 잘못 배정되거나 반쯤 생성된 사용자 상태가 남는 운영 리스크를 낮췄다.',
      'NodePort reconcile과 실제 상태 재검증을 넣어 DB drift 누적으로 신규 생성이 막히는 상황을 줄였고, 운영자가 장애 원인을 설명하고 복구할 수 있는 상태 조회 경로를 마련했다.',
      'PVC API 제거 후 권한 기반 NFS 홈 디렉터리 구조로 전환해 저장공간 책임 경계와 데이터 관리 흐름을 단순화했고, 이후 접근 제어 강화와도 자연스럽게 연결되는 구조를 만들었다.',
    ],
    stack: ['Kubernetes', 'Helm', 'Docker', 'ContainerSSH', 'GitHub Actions', 'Ansible', 'Kerberos · AD', 'Redis', 'Prometheus · Grafana', 'Python'],
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
    desc: '80+ GPU, 15대 서버 AI 인프라 운영. 먼저 GPU runtime, NFS/Kerberos, 외부 SSH, 네트워크 장애를 어떤 신호로 감지하고 어디까지 자동 복구할지 운영 기준을 세웠고, 이후 계정·홈 디렉터리·NodePort·Pod 배정을 control-plane으로 묶어 정합성을 관리했다. admin_infra · admin_infra_server · admin_be · DECS 모두 서버 관리자로서 수행한 작업.',
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
