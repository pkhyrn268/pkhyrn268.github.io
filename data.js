// ============================================================
// Portfolio content
// Focus: infrastructure operations, reliability, automation,
// service operation, and measurable system improvement.
// ============================================================

const FEATURED_PROJECTS = [
  {
    id: 'ops', num: '01', tag: 'infra operations · reliability',
    name: 'AI 연구 인프라 운영 및 표준화',
    period: '2024.12 — 현재',
    role: '서버 관리자 · 장애 분석 · 운영 표준화',
    repo: 'CSID-DGU/admin_infra_server',
    url: 'https://github.com/CSID-DGU/admin_infra_server',

    desc: '16대 서버·85 GPU 규모의 연구 인프라를 운영하며, 사용자 신고 이후 대응하던 방식을 GPU·NFS·SSH·NIC 상태를 먼저 확인하는 관제와 공통 복구 절차로 바꿨다.',
    listSignal: '장애를 한 번 해결하는 데서 끝내지 않고, 다음 운영 기준과 모니터링 항목으로 남긴 경험',
    oneLiner: 'Linux 서버·NFS 스토리지·네트워크·GPU 실행환경을 함께 운영하며 장애 분석 결과를 관제와 표준화로 연결한 프로젝트',

    summaryIntro: '처음에는 접속 장애나 GPU 오류가 발생하면 사용자 신고를 받은 뒤 개별적으로 원인을 찾았다. 운영 경험이 쌓이면서 같은 증상도 관리자와 서버에 따라 확인 순서가 달라지는 것이 더 큰 문제라고 판단했고, 실제 장애 사례를 기준으로 정상 상태·경고 신호·복구 범위를 공통 운영 기준으로 정리했다.',

    summaryCards: [
      { label: 'scale', value: '16 servers · 85 GPUs', note: '다수 연구원이 동시에 사용하는 온프레미스 AI 연구 인프라' },
      { label: 'owned', value: 'Server · Storage · Network', note: 'Linux, GPU runtime, NFS, SSH, NIC, 모니터링과 복구 기준 담당' },
      { label: 'incident metric', value: '345,747 → 0', note: 'NIC rx_missed_errors 조치 전후' },
      { label: 'outcome', value: '신고 대응 → 사전 관제', note: 'GPU·SSH·NFS·NIC 신호를 Prometheus/Grafana/Slack에 연결' },
    ],

    summaryBullets: [
      'GPU 사용 가능 여부, 외부 SSH, NFS mount/version, NIC 오류처럼 사용자가 실제로 체감하는 상태를 헬스체크 기준으로 정의했다.',
      '장애 해결 후 확인 순서와 복구 후 검증 항목을 공통 체크리스트와 운영 문서에 반영했다.',
      '자동 조치의 영향 범위를 구분해 컨테이너 재시작·원격 부팅은 자동화하고, 인증·권한·스토리지는 관리자 확인 후 처리하도록 경계를 정했다.',
    ],

    problem: '16대 서버의 GPU runtime, NFS mount, SSH 접속 경로, 네트워크 상태와 복구 절차가 완전히 동일하지 않아 같은 장애도 서버와 관리자에 따라 대응 방식이 달랐다. 사용자는 "접속이 느리다", "GPU가 안 잡힌다"처럼 결과만 경험하기 때문에 CPU·메모리와 같은 일반 지표만으로는 원인을 설명하기 어려웠다. 따라서 개별 장애를 고치는 것보다 실제 사용 가능 상태를 정의하고, 어떤 신호에서 어느 계층을 먼저 확인할지 운영 기준을 만드는 것이 필요했다.',

    designIntent: '프로세스 alive 여부가 아니라 "사용자가 실제로 접속하고 파일을 읽고 GPU를 사용할 수 있는가"를 정상 상태의 기준으로 잡았다. Prometheus/Grafana와 Alertmanager가 이 기준을 관측하도록 구성하고, 복구는 영향도가 작은 작업과 관리자 판단이 필요한 작업으로 나눴다. 해결한 장애는 다시 체크리스트·알림 규칙·재설치 후 검증 순서로 반영해 운영 지식이 개인 경험에만 남지 않도록 했다.',

    bullets: [
      'Prometheus·Grafana·Alertmanager로 GPU/NVML, 외부 SSH, NFS mount/version, 컨테이너, NIC 상태를 수집하고 Slack 알림에 연결했다.',
      'LAB7 접속 무한 로딩을 파일 접근 단계의 지연으로 좁혀 NFSv4.2 마운트 상태에서 버전 협상 지연과 패킷 드롭을 확인했다. 장애 시 `vers=3`으로 재마운트하고 `/etc/fstab` 반영·컨테이너 재시작으로 정상화한 뒤, 재부팅 후 v4.2 자동 협상이 정상임을 확인해 임시 옵션은 롤백했다.',
      'LAB9 접속 지연에서 `rx_missed_errors: 345747`을 확인하고 RX descriptor queue를 512에서 4096으로 확장했다. 조치 후 `rx_missed_errors: 0`을 확인하고 상시 관제 항목으로 추가했다.',
      'Ubuntu 재설치 후 반복된 NVML 오류를 Docker runtime, cgroup driver, `nvidia-persistenced` 상태를 비교해 재현했고, `cgroupfs`와 NVIDIA runtime/daemon 설정을 서버 공통 검증 기준으로 정리했다.',
      'Ansible로 Docker 버전, systemd 서비스와 운영 패키지를 표준화하고, 재설치·재부팅 후 같은 순서로 상태를 확인하도록 점검 절차를 코드와 문서로 남겼다.',
    ],

    troubleshooting: [
      {
        problem: 'VSCode와 터미널이 무한 로딩되고 일부 컨테이너 SSH가 정상적으로 시작되지 않았지만 프로세스 자체는 살아 있어 애플리케이션 로그만으로 원인을 찾기 어려웠다.',
        solution: '지연이 홈 디렉터리 접근 시점에 집중되는 것을 확인해 NFS 계층으로 범위를 좁혔다. NFSv4.2 상태에서 협상 지연과 패킷 드롭을 확인하고 `vers=3` 재마운트, `/etc/fstab` 반영, 컨테이너 재시작으로 정상화했다. 이후 재부팅 후 v4.2 자동 협상이 정상임을 재확인해 임시 설정은 롤백하고, mount/version 점검을 운영 항목으로 남겼다.',
      },
      {
        problem: 'CPU·메모리·GPU에는 병목이 없지만 SSH와 파일 작업이 지속적으로 느렸고 `rx_missed_errors`가 345,747까지 누적됐다.',
        solution: 'RX descriptor queue를 512 → 4096으로 조정하고 컨테이너 생성 시 `--init`을 적용했다. 이후 `rx_missed_errors: 0`을 확인했으며 해당 지표를 상시 수집하도록 모니터링 기준을 보강했다.',
      },
      {
        problem: 'OS 재설치 이후 여러 서버에서 컨테이너는 실행되지만 GPU 초기화가 간헐적으로 실패했다.',
        solution: '서버별 Docker runtime·cgroup·NVIDIA daemon 상태를 비교해 공통 조건을 좁혔다. cgroup driver를 `cgroupfs`로 조정한 대조 테스트에서 정상화를 확인하고 NVIDIA runtime 등록과 `nvidia-persistenced` 자동 시작을 재설치 후 필수 검증 항목으로 정리했다.',
      },
    ],

    results: [
      '16대 서버의 GPU runtime, NFS mount, systemd 기동과 사용자 접속 상태를 같은 체크리스트로 검증하는 운영 기준을 정리했다.',
      'GPU·SSH·NFS·NIC 상태를 Prometheus·Grafana·Slack으로 연결해 사용자 신고 이전에 이상 신호를 확인할 수 있는 관제 흐름을 만들었다.',
      'NIC 장애에서 `rx_missed_errors 345,747 → 0`, RX descriptor queue `512 → 4096`의 조치 결과를 확인하고 운영 기준에 반영했다.',
      '장애 처리 결과를 점검 순서·자동 복구 경계·재설치 후 검증 절차로 축적해 다른 관리자도 동일한 흐름으로 대응할 수 있도록 했다.',
    ],

    stack: ['Linux', 'Docker', 'Prometheus · Grafana', 'Ansible', 'Bash', 'systemd', 'NFS · Kerberos', 'pfSense', 'Kubernetes'],
  },

  {
    id: 'infra', num: '02', tag: 'platform automation · research',
    name: 'GPU 서버 관리 자동화 연구',
    statusLabel: '연구·검증 단계 · 실험 설계·논문 작성 진행',
    period: '2026.08 — 현재',
    role: 'Infra 설계·구현 · 상태 검증/복구 실험 설계 · 논문 작성',
    repo: 'CSID-DGU/admin_infra-proposed',
    url: 'https://github.com/CSID-DGU/admin_infra-proposed',

    desc: '계정·NAS 홈·접속 포트·Kubernetes 실행환경이 어긋나지 않도록 실제 상태를 재검증하는 control-plane을 설계했다. 현재는 구현 경험을 바탕으로 상태 검증과 복구 특성을 정량적으로 평가하는 실험과 논문 작성에 참여하고 있다.',
    listSignal: '수작업 provisioning을 자동화하는 데서 끝내지 않고, 실패와 drift 이후에도 운영 가능한 상태로 돌아오는지를 검증하는 연구',
    oneLiner: '사용자 신청부터 계정·스토리지·접속·Pod 생성과 회수까지 실제 상태 기반으로 검증·복구하는 GPU 연구환경 control-plane',

    summaryIntro: '사용자 환경은 계정 하나만 생성한다고 끝나지 않았다. NAS 홈, 접속 포트, Kubernetes Service/Pod와 인증 상태 중 한 단계라도 어긋나면 신규 사용자가 접속할 수 없거나 삭제된 자원이 계속 사용 중으로 남을 수 있었다. 그래서 빠른 생성보다 기록과 실제 상태가 일치하는 생성·복구 흐름을 만드는 데 집중했다.',

    summaryCards: [
      { label: 'scope', value: 'Account → Storage → Port → Pod', note: '사용자 신청 이후 인프라 생명주기 전체' },
      { label: 'owned', value: 'Infra control-plane', note: '실제 상태 검증, 생성/삭제 흐름, Backend 데이터 구조 공동 설계' },
      { label: 'design', value: 'verify · rollback · reconcile', note: '중간 실패와 수동 변경 이후 상태 복구' },
      { label: 'current', value: 'experiment · paper', note: '상태 검증/복구 실험 설계 및 논문 작성' },
    ],

    summaryBullets: [
      '홈 준비 → 포트 할당 → 실행환경 생성 → 접속 검증의 4단계로 사용자 환경 생성 흐름을 구조화했다.',
      'DB 기록보다 실제 계정·NAS·Kubernetes Service/Pod 상태를 다시 확인하고 불일치를 먼저 정리하도록 설계했다.',
      '초기 구현 이후에는 자동화의 상태 검증·복구 특성을 실험으로 평가하기 위해 시나리오와 측정 기준을 설계하고 논문 작성에 참여하고 있다.',
    ],

    problem: '기존에는 관리자가 여러 시스템에 직접 접속해 계정, 홈 디렉터리, 외부 접속 정보와 실행환경을 순서대로 만들었다. 요청이 몰리면 병목이 생겼고, 삭제 실패나 수동 변경이 섞이면 내부 DB와 실제 Kubernetes Service, 계정·권한, NAS 상태가 어긋나 신규 생성이 막히거나 회수 누락이 발생할 수 있었다. 자동화를 붙이는 것만으로는 이 불일치가 더 빠르게 누적될 위험이 있었다.',

    designIntent: '첫 원칙을 "기록보다 실제 상태를 다시 확인한다"로 정했다. 포트 할당 전에는 실제 Service와 DB 기록을 대조하고, 사용자 생성은 홈 준비 → 포트 할당 → Pod/Service 생성 → 접속 검증으로 나눴다. 단계별 상태와 rollback/reconcile 경로를 분리해 중간 실패 이후에도 현재 상태를 기준으로 필요한 단계부터 복구할 수 있도록 했다. 프로젝트가 연구 단계로 확장된 뒤에는 이러한 설계가 실제 장애와 상태 변화에서 얼마나 일관되게 동작하는지를 검증하는 실험을 설계하고 있다.',

    bullets: [
      '사용자 신청 이후 계정·권한, NAS 홈, NodePort, Kubernetes Pod/Service와 접속 검증이 이어지는 Infra 흐름을 설계·구현했다.',
      'NodePort 할당 직전에 실제 Kubernetes Service와 내부 할당 기록을 대조하고, 사라진 Service의 포트를 재수거하는 reconcile 절차를 구성했다.',
      '동시 요청에서 UID/GID·sudoers·홈 권한이 반쯤 적용되는 것을 막기 위해 계정 파일 갱신과 설정 반영 순서를 검증했다.',
      'Frontend·Backend·Infra가 서로 다른 사용자 상태 모델을 가지고 개발하던 문제를 해결하기 위해 개발을 잠시 중단하고 Backend 담당자와 사용자 생명주기와 DB 구조를 공동 설계했다.',
      '별도 PM이 없던 구조에서 순환 PM과 Daily Scrum을 도입해 변경사항과 파트 간 영향도를 같은 주기로 공유하도록 개발 방식을 조정했다.',
      '현재는 시스템의 상태 검증·복구 모듈을 대상으로 장애 주입과 상태 전이 시나리오, 측정 지표를 설계하고 논문 작성 및 후속 코드 검증을 진행하고 있다.',
    ],

    troubleshooting: [
      {
        problem: 'DB에는 사용 중인 포트로 남아 있지만 실제 Kubernetes Service는 이미 사라져, 비어 있는 자원이 있어도 신규 환경 생성이 막혔다.',
        solution: '할당 직전에 전체 Service와 내부 기록을 다시 대조하고 실제 Service가 없는 포트를 회수하는 reconcile 단계를 넣었다. 삭제 경로에서도 Pod·Service·포트·인증 정보가 순서대로 정리되는지 검증하도록 보강했다.',
      },
      {
        problem: 'Backend와 Infra가 같은 "사용자 생성"을 서로 다른 상태 흐름으로 이해해, 인프라 설계 변경 때마다 DB와 기능을 반복 수정해야 했다.',
        solution: '개발을 잠시 중단하고 사용자 신청부터 생성·종료까지의 상태 흐름과 DB를 공동 설계했다. 이후 Daily Scrum과 순환 PM을 적용해 한 파트의 변경이 다른 영역에 미치는 영향을 개발 전에 공유하도록 바꿨다.',
      },
      {
        problem: '구현이 진행된 뒤에는 "자동화가 된다"는 설명만으로 상태 검증과 복구의 신뢰성을 객관적으로 보여주기 어려웠다.',
        solution: '운영에서 실제로 발생하는 상태 변화와 장애를 실험 시나리오로 구조화하고, 수렴 여부·복구 결과·상태 불일치 여부를 평가하는 연구 설계와 논문 작성으로 역할을 확장했다.',
      },
    ],

    results: [
      '수작업 사용자 환경 준비를 4단계 생성 흐름으로 구조화하고 각 단계의 검증·rollback/reconcile 경로를 분리했다.',
      '실제 Kubernetes Service와 내부 기록의 drift를 재확인해 신규 환경 생성을 막는 유령 자원을 정리할 수 있는 흐름을 만들었다.',
      'Backend와 Infra가 동일한 사용자 생명주기와 DB 구조를 기준으로 개발하도록 협업 방식을 재정비했다.',
      '현재는 구현 결과를 운영 자동화 연구로 확장해 상태 검증·복구 시나리오와 평가 기준을 설계하고 논문 작성 및 후속 실험을 진행하고 있다.',
    ],

    stack: ['Kubernetes', 'Helm', 'Docker', 'Python', 'MySQL', 'Redis', 'NFS · Kerberos', 'Prometheus · Grafana', 'GitHub Actions'],
  },

  {
    id: 'farm', num: '03', tag: 'service development · operations',
    name: 'Farm System 커뮤니티 플랫폼',
    period: '2025.03 — 2025.12',
    role: '4기 운영진 · Backend 개발 · AWS 배포/QA',
    repo: 'Farm System',
    url: 'https://www.farmsystem.kr/',

    desc: '동아리 커뮤니티 플랫폼의 Backend를 개발하고 AWS에 배포했다. 게임 개발팀의 WebGL 콘텐츠를 웹 서비스와 연결하면서 데이터 구조·API·QA를 조율해 개발부터 실제 서비스 통합까지 경험했다.',
    listSignal: 'Backend 구현뿐 아니라 다른 개발팀과 인터페이스를 맞추고 배포·QA까지 이어간 서비스 운영 경험',
    oneLiner: 'Spring Boot/MySQL 기반 커뮤니티 플랫폼 개발과 AWS 배포, WebGL 게임 콘텐츠 통합 및 개발 서버 QA',

    summaryIntro: '동아리 활동 이력과 프로젝트 공유를 위한 커뮤니티 플랫폼을 개발했고, 사이트 접속과 참여를 높이기 위해 게임 개발팀과 웹 개발팀이 하나의 서비스를 함께 만들었다. 저는 운영진과 Backend 개발자를 병행하며 웹 서비스 데이터 구조, API, 배포와 QA를 담당했다.',

    summaryCards: [
      { label: 'role', value: 'Backend · Operations', note: '운영진과 Backend 개발 병행' },
      { label: 'cloud', value: 'EC2 · RDS · S3 · Route53', note: 'AWS 기반 서비스 배포·운영' },
      { label: 'integration', value: 'WebGL ↔ Web Service', note: '게임팀과 데이터/API 연결' },
      { label: 'delivery', value: 'develop → deploy → QA', note: '개발 서버 배포와 통합 테스트까지 수행' },
    ],

    summaryBullets: [
      'Spring Boot·JPA·MySQL 기반 REST API와 데이터 구조를 설계·구현했다.',
      'AWS EC2, RDS, S3, Route53을 사용해 개발 결과물을 실제 서비스 환경에 배포하고 운영했다.',
      '게임팀 ERD/기능명세를 웹 회원·활동 구조에 맞게 함께 조정하고 API 명세, Backend 리뷰, 개발 서버 QA, Unity API 연동까지 진행했다.',
    ],

    problem: '게임 개발팀과 웹 개발팀이 서로 다른 기술과 데이터 구조를 사용하면서, 게임 콘텐츠를 사이트의 회원·활동 데이터와 자연스럽게 연결해야 했다. 각 팀이 자신의 기능만 완성하면 실제 서비스에서는 데이터 흐름과 API가 맞지 않을 수 있었기 때문에 구현 전에 인터페이스를 합의하고 통합 과정에서 검증하는 작업이 필요했다.',

    designIntent: '게임팀의 기능명세와 ERD를 그대로 받아 구현하기보다 기존 회원·활동 구조와 함께 검토해 공통 데이터 모델과 API를 먼저 맞췄다. 이후 기능 개발 → Backend 리뷰 → 개발 서버 배포 → 통합 QA → Unity API 연결 순서로 실제 동작을 확인했다.',

    bullets: [
      'Spring Boot/JPA/MySQL 기반 커뮤니티 API와 데이터 처리 로직을 개발했다.',
      'AWS EC2·RDS·S3·Route53을 사용해 웹 서비스를 배포하고 개발/운영 환경을 관리했다.',
      '게임팀과 ERD·기능명세를 검토해 API 계약을 정리하고, WebGL 콘텐츠가 웹 회원/활동 데이터와 연결되도록 Backend를 구현했다.',
      '개발 서버에서 웹팀·게임팀과 함께 QA를 진행하고 Unity API 연결 과정에서 확인된 수정사항을 반영했다.',
      '운영진으로 행사와 동아리 활동 운영에도 참여하며 개발 요구사항을 실제 사용자·운영 관점에서 확인했다.',
    ],

    troubleshooting: [
      {
        problem: '게임팀과 웹팀이 각자 기능을 개발하면 데이터 구조와 API 기대값이 어긋나 통합 단계에서 수정이 반복될 수 있었다.',
        solution: 'ERD와 기능명세를 먼저 공동 검토하고 API 명세를 합의한 뒤 기능 개발과 리뷰를 진행했다. 개발 서버 QA와 Unity API 연결을 별도 단계로 두어 실제 통합 상태에서 오류를 확인하고 수정했다.',
      },
    ],

    results: [
      '커뮤니티 플랫폼 Backend를 개발하고 AWS 기반 서비스 환경에 배포했다.',
      '게임 콘텐츠를 단순 삽입하는 것이 아니라 회원·활동 데이터와 연동해 하나의 서비스 흐름으로 통합했다.',
      '설계 합의부터 개발·배포·통합 QA까지 경험하며 기능 구현 이후의 운영·검증 과정까지 책임 범위를 넓혔다.',
    ],

    stack: ['Java', 'Spring Boot', 'JPA', 'MySQL', 'AWS EC2 · RDS · S3 · Route53', 'Git', 'REST API', 'WebGL Integration'],
  },

  {
    id: 'deepgu', num: '04', tag: 'ai systems · optimization',
    name: 'VLM 기반 실시간 이상행동 탐지 시스템',
    period: '2025.09 — 2026.06',
    role: 'AI 개발 · Clip Selection · Keyframe Selection · Dataset',
    repo: 'CSID-DGU/2026-1-CECD2-1-Deepgu-06',
    url: 'https://github.com/CSID-DGU/2026-1-CECD2-1-Deepgu-06',

    codeLinks: [
      { label: 'Keyframe Selection', url: 'https://github.com/CSID-DGU/2026-1-CECD2-1-Deepgu-06/tree/main/AI/keyframe' },
    ],

    desc: '실시간 CCTV에서 모든 프레임을 VLM으로 처리하지 않고 X3D-S로 후보 clip을 먼저 선별한 뒤 핵심 frame만 VLM이 검증하도록 파이프라인을 최적화했다. VLM 호출량을 86% 줄이면서 전체 F1을 0.711에서 0.730으로 높였다.',
    listSignal: '모델 하나의 정확도가 아니라 전체 파이프라인의 연산량과 최종 성능을 함께 개선한 경험',
    oneLiner: 'X3D-S clip selection → event grouping → BiGRU keyframe selection → VLM 검증으로 연산량과 탐지 성능을 함께 개선한 실시간 영상 분석 시스템',

    problem: '실시간 CCTV 전체를 VLM으로 분석하면 호출량과 처리 비용이 지나치게 커지고, 모든 프레임을 입력할수록 판단에 불필요한 정보도 섞였다. 반대로 경량 행동 인식 모델만 사용하면 상황 맥락을 충분히 검증하기 어려웠다. 따라서 빠른 후보 선별과 정밀 검증을 분리해 연산량과 정확도를 함께 조정해야 했다.',

    designIntent: 'X3D-S가 긴 영상에서 이상행동 가능성이 높은 clip을 먼저 선별하고, 연속 후보를 이벤트 단위로 묶은 뒤 BiGRU 기반 Keyframe Selection이 핵심 프레임을 선택하도록 구성했다. 최종 단계에서만 VLM이 이벤트를 정밀 검증하도록 해 불필요한 호출을 줄였다.',

    summaryCards: [
      { label: 'VLM calls', value: '2,205 → 307', note: '영상 1편 기준 약 86% 감소' },
      { label: 'pipeline F1', value: '0.711 → 0.730', note: '전체 탐지 파이프라인 개선' },
      { label: 'selector F1', value: '0.502 → 0.525', note: 'Uniform → BiGRU keyframe selection' },
      { label: 'dataset', value: '41,416 clips', note: 'VLM pseudo-label 기반 학습 데이터 구성' },
    ],

    summaryBullets: [
      'X3D-S 기반 clip selection과 Event Builder를 이용해 VLM이 확인해야 할 구간 자체를 먼저 줄였다.',
      'ResNet-50 + BiGRU 기반 Keyframe Selection을 설계·학습해 이벤트 안에서도 판단에 필요한 프레임만 VLM에 전달했다.',
      'Uniform/Adaptive/BiGRU와 입력 프레임 수 4/8/12/16을 비교 실험해 최적 조합을 결정했다.',
    ],

    bullets: [
      'X3D-S를 활용한 후보 clip selection 실험과 전체 AI 파이프라인 개선에 참여했다.',
      'ResNet-50 특징 + BiGRU 기반 Keyframe Selection 모듈을 직접 설계·학습했다.',
      'VLM pseudo-label 기반 41,416개 clip 학습 데이터를 구성하고 train/val curve를 기준으로 best checkpoint를 선택했다.',
      '입력 프레임 수 4/8/12/16과 Uniform·Adaptive·BiGRU 방식을 비교해 12프레임 BiGRU 조합을 최종 선택했다.',
    ],

    troubleshooting: [
      {
        problem: '3초 단위 clip마다 VLM을 호출하면 영상 1편에서 최대 2,205회의 호출이 발생했다.',
        solution: 'X3D-S 후보 clip을 Event Builder로 병합하고 이벤트마다 선택한 keyframe만 VLM에 전달하도록 바꿔 호출을 307회로 줄였다.',
      },
      {
        problem: 'Uniform sampling은 폭행이 발생하는 결정적 순간을 놓치는 경우가 있었다.',
        solution: 'BiGRU로 프레임별 중요도를 학습해 선별 F1을 0.502 → 0.525로 높였고, 전체 파이프라인 F1도 0.711 → 0.730으로 개선했다.',
      },
    ],

    results: [
      'VLM 호출량 2,205회 → 307회/영상, 약 86% 감소',
      '전체 탐지 F1 0.711 → 0.730',
      'Keyframe Selection F1 0.502(Uniform) → 0.525(BiGRU)',
      '최종 파이프라인 Precision 70.4% · Recall 75.8% · F1 73.0%',
    ],

    stack: ['Python', 'PyTorch', 'OpenCV', 'X3D-S', 'ResNet-50 · BiGRU', 'VLM', 'AWS', 'Docker'],

    resultImages: [
      { image: 'assets/deepgu/table6-final-pipeline-performance.png', note: '최종 AI 파이프라인 성능 비교' },
      { image: 'assets/deepgu/violence-scores.png', note: 'X3D-S 후보 구간과 VLM 검증 결과' },
      { image: 'assets/deepgu/training-curve.png', note: 'BiGRU Frame Selector 학습 곡선' },
      { image: 'assets/deepgu/table4-vlm-comparison.png', note: 'VLM 모델별 성능 비교' },
    ],
  },
];

const OTHER_PROJECTS = [
  {
    name: '강화학습 기반 Crew Pairing 최적화',
    desc: '실제 항공 운항 데이터와 FAA/항공사별 제약을 반영해 승무원 페어링을 최적화하는 강화학습 연구. 제약을 위반하는 행동을 action masking으로 제한하고 제약 변화에 적응하는 정책 구조를 실험하고 있다.',
    meta: 'Python · PyTorch · RL',
    url: 'https://github.com/CSID-DGU/ASCP-2026'
  },
  {
    name: 'ML 기반 동적 접근 제어',
    desc: 'PCAP 트래픽과 Suricata IDS 로그를 flow·timestamp 기준으로 연결해 공격 탐지 이후 접근 재허용 시점을 판단하는 ML 기반 정책을 연구했다.',
    meta: 'Python · Suricata · Network Security'
  },
  {
    name: 'LLM 개인정보 입력 필터링',
    desc: '정규표현식과 KoELECTRA NER을 결합해 LLM 입력의 개인정보를 탐지·마스킹하고, FastAPI와 브라우저 확장 프로그램 형태로 사용할 수 있도록 구현했다.',
    meta: 'FastAPI · KoELECTRA · NER',
    url: 'https://github.com/pkhyrn268/2025-OpenSource-AiSumDdat'
  },
  {
    name: 'DECS',
    desc: 'CUDA 버전별 연구용 GPU 컨테이너 환경과 사용자 접속 구조를 운영하며 연구실 실행환경 관리 기반으로 활용했다.',
    meta: 'Docker · CUDA',
    url: 'https://github.com/DGU-AILab/DECS'
  },
];

const SKILL_GROUPS = [
  {
    title: '인프라 · 시스템', sub: 'infra / systems',
    items: ['Linux', 'Docker', 'Kubernetes', 'systemd', 'NFS · Kerberos', 'Ansible'],
  },
  {
    title: '관제 · 운영', sub: 'observability / operations',
    items: ['Prometheus', 'Grafana', 'Alertmanager', 'Slack', 'Wake-on-LAN · IPMI'],
  },
  {
    title: '네트워크 · 보안', sub: 'networking / security',
    items: ['pfSense', 'VLAN · ACL', 'Wireshark', 'Suricata', 'Mininet'],
  },
  {
    title: '클라우드 · 백엔드', sub: 'cloud / backend',
    items: ['AWS (EC2, RDS, S3, Route53)', 'Spring Boot', 'FastAPI', 'MySQL'],
  },
  {
    title: 'AI · 머신러닝', sub: 'ai / ml',
    items: ['PyTorch', 'Computer Vision', 'Vision-Language Models', 'Reinforcement Learning'],
  },
  {
    title: '프로그래밍', sub: 'programming',
    items: ['Python', 'Java', 'C', 'C++'],
  },
];

const EXPERIENCE = [
  {
    period: '2024.12 — 현재',
    title: '동국대학교 AI 연구실 · 서버 관리자',
    desc: '16대 서버·85 GPU 규모의 연구 인프라를 운영하며 Linux, NFS, 네트워크, GPU 실행환경의 장애를 분석하고 Prometheus/Grafana 기반 관제와 Ansible/systemd 기반 운영 표준화를 수행했다.',
  },
  {
    period: '2026.08 — 현재',
    title: 'AI 연구 인프라 운영 자동화 연구',
    desc: 'Kubernetes 기반 사용자 환경 control-plane의 Infra 설계·구현 경험을 바탕으로 상태 검증·복구 실험 설계와 논문 작성에 참여하고 있으며, 실험 결과에 따른 후속 코드 검증을 진행하고 있다.',
  },
  {
    period: '2025.03 — 2025.12',
    title: 'Farm System 4기 · 운영진 & Backend 개발자',
    desc: 'Spring Boot/MySQL 기반 커뮤니티 플랫폼 개발, AWS 배포, 게임팀 WebGL 콘텐츠 연동과 개발 서버 QA를 수행했다.',
  },
  {
    period: '2025.05 — 현재',
    title: '학부 연구참여',
    desc: 'VLM 영상 분석, 네트워크 보안, 강화학습 최적화 등 실제 데이터와 제약을 다루는 연구 프로젝트를 수행하고 있다.',
  },
];
