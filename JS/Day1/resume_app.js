// ===== 이력서 JavaScript =====
// HTML : 구조 / CSS : 디자인 / JS : 동작
// JS는 HTML 파일을 직접 고치는 게 아니라, 브라우저가 만든 DOM을 바꿔서 화면을 바꾼다.
//
// [1] 프로젝트 카드·모달 만들기   : 배열 · 객체 · for...of · 함수 · createElement · appendChild
// [2] 다크 모드                  : click 이벤트 · if/else · localStorage(스토리지)
// [3] 스크롤 따라 메뉴 표시       : scroll 이벤트 · 반복문 · 조건문
// [4] GitHub 저장소 불러오기      : fetch · .then (비동기) · slice · Sliding Window
// [5] 연락하기 폼                 : input 이벤트 · 입력 검사 · Early Return · setTimeout


// =====================================================================
// [1] 프로젝트 데이터 : 배열(Array) 안에 객체(Object)를 넣어서 관리
//     → 프로젝트를 추가하고 싶으면 HTML을 복사할 필요 없이 여기에 객체 하나만 추가하면 됨
// =====================================================================
const projects = [
    {
        id: "xray",
        title: "흉부 X-ray 폐렴 분류 모델",
        label: "2026.10 · DACON 해커톤 · 개인 2위",
        summary: [
            "검증 0.99와 리더보드 0.85의 격차를 추적해, 학습 이미지에만 있던 검은 띠가 교란 특징임을 발견",
            "폐 영역만 잘라 학습하도록 입력을 바꿔 리더보드 0.71 → 0.96 달성 (CNN 3종 앙상블, Grad-CAM 검증)",
        ],
        details: [
            "리더보드 0.7099 → 0.9647 달성 (공식 Baseline 대비 +25.5%p, 테스트 624장 중 602장 정답)",
            "검증 정확도 0.99와 리더보드 0.85의 격차를 추적해, 학습 이미지에만 있던 검은 띠 두께가 정답 단서(교란 특징)로 쓰이고 있음을 발견",
            "검은 띠 제거와 폐 영역 분할(PSPNet)로 모델이 폐만 보도록 입력을 바꾸고, 검증과 리더보드의 격차를 14.7%p에서 1.4%p로 축소",
            "폐 영역 이미지로 학습한 ResNet18·ConvNeXt-Tiny·ResNet50 앙상블, Grad-CAM 직접 구현으로 판단 근거 검증",
            "민감도 우선의 3단계 위험도 기준 설계: 0.5 기준으로 놓친 폐렴 14장 중 13장을 '주의' 등급으로 분류해 전문의 확인으로 연결",
        ],
        tech: "PyTorch · torchvision · torchxrayvision · scikit-learn",
    },
    {
        id: "ulcer",
        title: "욕창 멀티모달 관리 서비스",
        label: "2026.10 · 부트캠프 미니 프로젝트 · 6인 팀장",
        summary: [
            "사진·체크항목·기록을 결합한 욕창 조기 선별 및 기록 보조 서비스 기획, 프로토타입 구현",
            "특성요인도·데이터 수집성 평가·변수 정의서 작성, 팀원별 초안을 취합해 보고서와 발표 완성",
        ],
        details: [
            "가이드 촬영 사진과 체크항목, 기록을 결합해 재택·요양시설·의료기관의 욕창 조기 선별과 기록 부담 감소를 돕는 서비스 기획 및 프로토타입 구현",
            "특성요인도로 욕창 발견·기록 문제의 원인 30개를 도출하고, 데이터 수집성 평가로 우선 분석 인자 11개 선정 및 변수 정의서 작성",
            "팀원별 PPT·대본 초안을 취합·편집해 최종 보고서와 발표 자료(39장)를 하나의 흐름으로 완성하고 발표",
            "팀 성과: ResNet50 전이학습으로 단계 분류 F1 0.60→0.72, 조기·진행군 구분 정확도 93.3%",
        ],
        tech: "",
    },
    {
        id: "screen",
        title: "임상시험 프리스크리닝 자동화",
        label: "2026.09 · 원티드 AI 해커톤 · AI builder 배지",
        summary: [
            "CRC 실무에서 환자당 3~10분 걸리던 EMR 수기 선별을 자동화하는 프로토타입 개발",
            "수치 기준은 규칙 기반 조건식으로, 판독문·메모는 LLM으로 판정하고 애매하면 '보류'로 넘기는 구조 설계",
        ],
        details: [
            "CRC 실무에서 환자 1명당 3~10분 걸리던 EMR 수기 대상자 선별 과정을 자동화하는 프로토타입 기획 및 개발",
            "나이·eGFR 등 수치 기준은 규칙 기반 조건식으로, ECHO·EKG 판독문과 CRC 메모는 LLM으로 판정하는 하이브리드 구조 설계",
            "정보가 부족하거나 애매하면 '보류'로 분류해 사람이 재확인하도록 하고, 추측을 금지하는 프롬프트로 오판정 방지",
            "EMR 텍스트 붙여넣기, 판독지 PDF, 외래예약·검사수치 엑셀(환자번호 자동 매칭) 등 실무 입력 방식 지원",
        ],
        tech: "Python · Streamlit · Claude API · Upstage Solar API · pandas",
    },
    {
        id: "ivf",
        title: "난임 데이터 기반 임신 성공 예측 모델",
        label: "2026.09 · DACON 해커톤 · 팀 3위",
        summary: [
            "시술 과정 변수 전처리 담당, 직접 설계한 파생변수 2개가 SHAP 핵심 변수 상위 5개에 포함",
            "성능 정체 원인이 통합 코드의 담당 파트 누락임을 찾아 복원 및 파생변수 보강",
        ],
        details: [
            "시술 과정·타임라인 변수 전처리 담당: 조건부 결측치 대체, 시술 유형 텍스트 파싱, 배아 이식 경과일·배반포 이식·고령 단일 배아 이식 등 의학적 근거 기반 파생변수 설계",
            "설계한 파생변수 2개가 SHAP 분석 핵심 변수 상위 5개에 포함",
            "파생변수 적용 후 성능이 정체된 원인이 통합 코드에서 본인 파트 전처리가 누락된 것임을 찾아 복원하고, 신규 파생변수 3개를 추가해 성능 개선",
            "XGBoost·LightGBM·CatBoost Rank Averaging 앙상블 (Stratified 5-Fold)",
        ],
        tech: "Python · pandas · scikit-learn · XGBoost · LightGBM · CatBoost · SHAP",
    },
    {
        id: "smoke",
        title: "흡연 여부 데이터 분석을 통한 건강 인사이트 도출",
        label: "2026.08 · 부트캠프 미니 프로젝트 · 4인 팀장",
        summary: [
            "건강검진 데이터로 흡연 여부에 따른 건강 지표 차이 분석, 단변량·이변량 분석 담당",
        ],
        details: [
            "건강검진 데이터를 활용해 흡연 여부에 따른 건강 지표 차이 분석",
            "단변량·이변량 분석 담당",
            "파트별 업무 분담과 일정 관리, 팀원별 PPT 취합·편집 후 최종 보고서 작성 및 발표",
        ],
        tech: "",
    },
];


// 문장 배열을 받아서 <ul><li>...</li></ul> 을 만들어 돌려주는 함수
function makeList(items) {
    const ul = document.createElement("ul");
    for (const text of items) {
        const li = document.createElement("li");
        li.textContent = text;
        ul.appendChild(li);
    }
    return ul;          // return을 꼭 써야 만든 ul을 밖에서 쓸 수 있음 (안 쓰면 undefined)
}

// 프로젝트 객체 하나 → 카드(article) 하나
function createCard(project) {
    const card = document.createElement("article");
    card.className = "card p-" + project.id;      // p-xray 처럼 CSS grid-area 이름과 연결

    const title = document.createElement("p");
    title.className = "card-title";
    title.textContent = project.title;

    const label = document.createElement("p");
    label.className = "card-label";
    label.textContent = project.label;

    const button = document.createElement("button");
    button.className = "card-btn";
    button.textContent = "자세히 보기";
    button.setAttribute("popovertarget", "modal-" + project.id);   // 누르면 아래에서 만든 모달이 열림

    card.appendChild(title);
    card.appendChild(label);
    card.appendChild(makeList(project.summary));
    card.appendChild(button);
    return card;
}

// 프로젝트 객체 하나 → 상세 모달(popover) 하나
function createModal(project) {
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.id = "modal-" + project.id;
    modal.setAttribute("popover", "");

    // 머리 부분 : 제목 + 라벨 + 닫기 버튼
    const head = document.createElement("div");
    head.className = "modal-head";

    const textBox = document.createElement("div");
    const title = document.createElement("h3");
    title.className = "modal-title";
    title.textContent = project.title;
    const label = document.createElement("p");
    label.className = "modal-label";
    label.textContent = project.label;
    textBox.appendChild(title);
    textBox.appendChild(label);

    const closeBtn = document.createElement("button");
    closeBtn.className = "modal-close";
    closeBtn.setAttribute("popovertarget", modal.id);
    closeBtn.setAttribute("popovertargetaction", "hide");
    closeBtn.setAttribute("aria-label", "닫기");
    const icon = document.createElement("i");
    icon.className = "fa-solid fa-xmark";
    closeBtn.appendChild(icon);

    head.appendChild(textBox);
    head.appendChild(closeBtn);
    modal.appendChild(head);
    modal.appendChild(makeList(project.details));

    // 기술 스택이 비어 있는 프로젝트는 그 줄을 만들지 않음 (빈 문자열 "" 은 false 취급)
    if (project.tech) {
        const tech = document.createElement("p");
        tech.className = "modal-tech";
        tech.textContent = project.tech;
        modal.appendChild(tech);
    }
    return modal;
}

// 배열을 돌면서 카드와 모달을 화면(DOM)에 붙이기
const projectGrid = document.querySelector("#project-grid");
for (const project of projects) {
    projectGrid.appendChild(createCard(project));
    document.body.appendChild(createModal(project));
}


// =====================================================================
// [2] 다크 모드 : 버튼을 누르면 body에 "dark" 클래스를 붙였다 뗐다 함
//     선택한 모드는 localStorage에 저장 → 새로고침해도 유지
// =====================================================================
const themeBtn = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector("#theme-toggle i");

function applyTheme(theme) {
    if (theme === "dark") {
        document.body.classList.add("dark");
        themeIcon.className = "fa-solid fa-sun";      // 다크 모드일 때는 해 아이콘(밝게 바꾸기)
    } else {
        document.body.classList.remove("dark");
        themeIcon.className = "fa-solid fa-moon";     // 라이트 모드일 때는 달 아이콘(어둡게 바꾸기)
    }
}

// 처음 열었을 때 : 저장된 값이 있으면 그걸로, 없으면(null) 라이트 모드
applyTheme(localStorage.getItem("theme"));

themeBtn.addEventListener("click", () => {
    // 지금 다크 모드면 라이트로, 아니면 다크로
    let nextTheme = "dark";
    if (document.body.classList.contains("dark")) {
        nextTheme = "light";
    }
    applyTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);         // 브라우저 저장소에 기억
});


// =====================================================================
// [3] 스크롤 : 지금 보고 있는 섹션의 메뉴를 강조 + 조금 내려가면 "맨 위로" 버튼 보이기
// =====================================================================
const sections = document.querySelectorAll("main section");
const menuLinks = document.querySelectorAll("#navbar__menu a");
const toTopBtn = document.querySelector("#to-top");

function onScroll() {
    // 1) 현재 섹션 찾기 : 위에서부터 보면서, 이미 지나간 섹션 중 가장 마지막 것
    let current = "";
    for (const section of sections) {
        if (window.scrollY >= section.offsetTop - 120) {
            current = section.id;
        }
    }

    // 2) 메뉴 강조 : href가 "#현재섹션"인 링크에만 active 클래스
    for (const link of menuLinks) {
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    }

    // 3) 300px 이상 내려갔을 때만 맨 위로 버튼 보이기
    if (window.scrollY > 300) {
        toTopBtn.classList.add("show");
    } else {
        toTopBtn.classList.remove("show");
    }
}

window.addEventListener("scroll", onScroll);
onScroll();     // 처음 한 번 실행해서 시작 상태 맞추기


// =====================================================================
// [4] GitHub 저장소 불러오기 : fetch (비동기)
//     서버 응답이 언제 올지 모르니 .then으로 "응답이 오면 그 다음에" 처리
// =====================================================================
const GITHUB_USER = "seol-ditto";
const repoList = document.querySelector("#repo-list");
const repoMoreBtn = document.querySelector("#repo-more");
const repoStatus = document.querySelector("#repo-status");

let repos = [];     // 불러온 저장소 목록을 담아둘 배열
let start = 0;      // Sliding Window : 보여줄 범위의 시작과 끝
let end = 3;

// 저장소 객체 하나 → li 하나
function createRepoItem(repo) {
    const li = document.createElement("li");
    li.className = "repo";

    const link = document.createElement("a");
    link.href = repo["html_url"];
    link.target = "_blank";                // 새 탭에서 열기
    link.className = "repo-name";
    link.textContent = repo["name"];

    const desc = document.createElement("p");
    desc.className = "repo-desc";
    desc.textContent = repo["description"] || "설명이 없는 저장소입니다.";   // null이면 뒤의 문장 사용

    const meta = document.createElement("p");
    meta.className = "repo-meta";
    const language = repo["language"] || "기타";
    const updated = repo["updated_at"].slice(0, 10);     // "2026-10-20T12:34:56Z" → "2026-10-20"
    meta.textContent = language + " · 최근 수정 " + updated;

    li.appendChild(link);
    li.appendChild(desc);
    li.appendChild(meta);
    return li;
}

// 지금 범위(start ~ end)의 저장소만 화면에 추가
function showNextRepos() {
    for (const repo of repos.slice(start, end)) {
        repoList.appendChild(createRepoItem(repo));
    }
    start += 3;
    end += 3;           // 다음에 누르면 그 다음 3개

    // 더 보여줄 게 없으면 버튼 비활성화 (중복 클릭 방지)
    if (start >= repos.length) {
        repoMoreBtn.disabled = true;
        repoMoreBtn.textContent = "모두 불러왔어요";
    }
}

// 페이지가 열릴 때 한 번만 서버에 요청 → 이후 "더 보기"는 받아둔 배열에서 꺼내 씀 (요청 낭비 X)
fetch("https://api.github.com/users/" + GITHUB_USER + "/repos?sort=updated&per_page=100")
    .then(response => response.json())
    .then(data => {
        // Early Return : 저장소가 없거나 응답이 배열이 아니면(요청 제한 등) 안내만 하고 끝
        if (!Array.isArray(data) || data.length === 0) {
            repoStatus.textContent = "공개 저장소를 불러오지 못했습니다. GitHub에서 직접 확인해 주세요.";
            repoMoreBtn.hidden = true;
            return;
        }
        repos = data;
        repoStatus.textContent = "공개 저장소 " + repos.length + "개 · 최근 수정 순";
        repoMoreBtn.hidden = false;
        showNextRepos();
    })
    .catch(() => {
        // 인터넷이 끊겼을 때 등 요청 자체가 실패한 경우
        repoStatus.textContent = "네트워크 문제로 저장소를 불러오지 못했습니다.";
        repoMoreBtn.hidden = true;
    });

repoMoreBtn.addEventListener("click", showNextRepos);   // showNextRepos() 처럼 ()를 붙이면 안 됨!


// =====================================================================
// [5] 연락하기 폼 : 입력할 때마다 검사 → 통과하면 메일 앱으로 내용 넘기기
// =====================================================================
const nameInput = document.querySelector("#contact-name");
const messageInput = document.querySelector("#contact-message");
const contactHelp = document.querySelector("#contact-help");
const contactBtn = document.querySelector("#contact-send");
const toast = document.querySelector("#toast");

// 입력값 검사 : 문제가 있으면 안내 문구를, 없으면 빈 문자열("")을 돌려줌
function checkContact() {
    if (nameInput.value.trim() === "") {
        return "이름을 입력해 주세요.";
    }
    if (messageInput.value.trim().length < 10) {
        return "메시지를 10자 이상 입력해 주세요. (현재 " + messageInput.value.trim().length + "자)";
    }
    return "";
}

// password.html처럼 입력할 때마다(input 이벤트) 바로 안내 문구 바꾸기
function updateHelp() {
    const problem = checkContact();
    if (problem) {
        contactHelp.textContent = problem;
        contactHelp.className = "help-error";
    } else {
        contactHelp.textContent = "보낼 준비가 되었습니다.";
        contactHelp.className = "help-ok";
    }
}

nameInput.addEventListener("input", updateHelp);
messageInput.addEventListener("input", updateHelp);

// 잠깐 떴다가 3초 뒤 사라지는 알림 (setTimeout)
function showToast(text) {
    toast.textContent = text;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
}

contactBtn.addEventListener("click", () => {
    // Early Return : 검사를 통과하지 못하면 안내만 하고 여기서 끝
    const problem = checkContact();
    if (problem) {
        updateHelp();
        messageInput.focus();
        return;
    }

    // 메일 제목과 본문을 채운 mailto 주소 만들기
    // encodeURIComponent : 한글·띄어쓰기·줄바꿈을 주소에 넣을 수 있는 형태로 바꿔줌
    const subject = encodeURIComponent("[이력서 문의] " + nameInput.value.trim() + "님의 메시지");
    const body = encodeURIComponent(messageInput.value.trim());
    window.location.href = "mailto:seol.ditto@gmail.com?subject=" + subject + "&body=" + body;

    showToast("메일 앱을 여는 중입니다.");
    nameInput.value = "";
    messageInput.value = "";
    contactHelp.textContent = "";
});
