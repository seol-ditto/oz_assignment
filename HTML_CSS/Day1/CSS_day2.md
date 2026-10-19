# CSS Day 2 — 레이아웃 (Normal Flow, Flexbox, Position, Media Query)

> Day 1에서 정리한 박스 모델, Block / Inline에 이어서 "여러 박스를 화면에 어떻게 배치할 것인가?"를 다룬다.

---
### Normal Flow
- CSS에서 아무 레이아웃 속성도 적용하지 않았을 때의 기본 배치 규칙
- 브라우저가 요소를 자동으로 배치하는 방식

기본 규칙
1. Inline 요소 : 왼쪽에서 오른쪽으로, 줄이 차면 다음 줄로 이동
2. Block-level 요소 : 위에서 아래로, 한 줄씩 차지하며 배치

- Normal Flow에서는 가로 정렬, 가운데 정렬, 간격 맞추기가 어려움 → Flexbox, Grid가 필요한 이유
- Block 요소는 `width`를 줄여도 옆으로 나란히 서지 않고 계속 세로로 쌓임 (한 줄을 통째로 차지하는 성질은 그대로)

```html
<div class="item">A</div>
<div class="item">B</div>
<div class="item">C</div>
<!-- width: 40px을 줘도 A, B, C는 세로로 쌓임 -->
```

#### Normal Flow의 특징 : margin 겹침(margin collapsing)
- 세로로 쌓인 블록끼리는 위아래 margin이 더해지지 않고 **큰 쪽 하나만** 적용됨
- 위 박스 `margin-bottom: 20px` + 아래 박스 `margin-top: 30px` → 간격은 50px이 아니라 30px

#### Normal Flow를 벗어나는 방법
- `display: flex` / `grid` : 자식들의 배치 규칙 자체를 바꿈
- `position: absolute` / `fixed` : 요소를 흐름에서 빼서 원하는 위치에 띄움

---
### Flex Box
- 여러 박스를 한 방향으로 유연하게 배치하기 위한 레이아웃 시스템
- Normal Flow를 벗어나 의도적으로 배치

#### 특징
- 1차원 레이아웃 : 가로 한 줄 또는 세로 한 줄, 한 방향으로만 배치
    - 가로와 세로를 동시에 격자로 배치하는 2차원 레이아웃은 Grid
- 부모가 자식의 배치와 정렬을 제어
- 정렬과 간격 설정이 직관적
- 부모에 `display: flex`를 주면 **자식들**의 배치가 바뀜
    - Flex Container : `display: flex`를 준 부모
    - Flex Item : 그 바로 아래 자식들

```html
<div class="container">          <!-- Flex Container -->
    <div class="item">A</div>    <!-- Flex Item -->
    <div class="item">B</div>
    <div class="item">C</div>
</div>
```
```css
.container {
    display: flex;
}
```
- `display: flex`만 줘도 Block 요소인 A, B, C가 가로로 나란히 섬

#### 주축과 교차축
- 주축(Main Axis) : 아이템이 나열되는 방향. `flex-direction`으로 정함
- 교차축(Cross Axis) : 주축과 수직인 방향

| flex-direction | 주축 | 교차축 |
| --- | --- | --- |
| `row` (기본값) | 가로 → | 세로 ↓ |
| `column` | 세로 ↓ | 가로 → |
| `row-reverse` | 가로 ← | 세로 ↓ |
| `column-reverse` | 세로 ↑ | 가로 → |

- `justify-content`는 **주축**, `align-items`는 **교차축** 정렬
- 그래서 `flex-direction: column`으로 바꾸면 justify-content가 세로 정렬, align-items가 가로 정렬로 역할이 바뀜

#### Flexbox 정렬 이해하기 (3단계)
1. 주축 결정 → 기본값 `flex-direction: row;`
2. 주축 정렬 결정 → 기본값 `justify-content: flex-start;`
3. 교차축 정렬 결정 → 기본값 `align-items: stretch;`

아무것도 안 정하면 "가로로, 왼쪽부터, 세로는 꽉 채워서" 배치됨

#### 박스 안 글자 정가운데 놓기
```css
.item {
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;   /* 가로 가운데 */
    align-items: center;       /* 세로 가운데 */
}
```
- item도 flex container가 되어, 안의 글자가 정가운데로 옴
- flex는 중첩 가능 : 바깥 container의 item이면서 동시에 안쪽의 container가 될 수 있음
- 가로·세로 가운데 정렬은 Normal Flow로는 어려워서 이 패턴을 매우 자주 씀

Flexbox 연습 사이트 : Flexbox Froggy (https://flexboxfroggy.com/#ko)

#### Container에 주는 속성

`flex-direction` : 아이템을 나열할 방향
```css
flex-direction: row;       /* 기본값, 가로 */
flex-direction: column;    /* 세로 */
```

`justify-content` : 주축 방향 정렬 (아이템을 그룹으로 묶어서 어디에 둘지, 사이 공간을 어떻게 나눌지)
- `flex-start` / `start` : 시작점에 모음 (기본값)
- `flex-end` / `end` : 끝점에 모음
- `center` : 가운데 모음
- `space-between` : 양 끝 아이템은 벽에 붙이고, 사이 간격을 똑같이
- `space-around` : 아이템마다 양옆에 같은 여백. 그래서 벽 쪽 여백은 아이템 사이 간격의 절반
- `space-evenly` : 벽 쪽 여백까지 포함해서 모든 간격을 똑같이

```
space-between   |A    B    C|
space-around    | A   B   C |
space-evenly    |  A  B  C  |
```

`align-items` : 교차축 방향 정렬
- `stretch` : 교차축 방향으로 꽉 채워 늘림 (기본값)
    - row일 때 아이템 높이를 지정하지 않으면 컨테이너 높이만큼 늘어나는 이유
- `flex-start` / `start` : 교차축 시작점
- `flex-end` / `end` : 교차축 끝점
- `center` : 교차축 가운데

`gap` : 아이템 사이 간격
```css
gap: 20px;
```
- 아이템마다 margin을 따로 주지 않고 한 번에 동일한 간격 설정 가능
- 벽 쪽에는 간격이 생기지 않고 **아이템 사이에만** 생김
- `gap`은 간격 크기를 직접 정하는 것이고, `space-between` / `space-around`는 남는 공간을 어떻게 나눌지 정하는 것 (서로 다른 속성)

`flex-wrap` : 줄바꿈 여부
- `nowrap` (기본값) : 공간이 부족해도 한 줄을 유지하며 아이템이 줄어듦
- `wrap` : 공간이 부족하면 다음 줄로 넘김

#### Item에 주는 속성

`flex` : 남는 공간을 얼마나 차지할지 (비율)
```css
.box {
    flex: 1;
}
```
- 컨테이너에서 다른 아이템이 쓰고 **남는 공간**을 차지하는 비율
- 아이템 하나만 `flex: 1`이면 남는 공간을 그 아이템이 전부 차지
- 여러 아이템이 모두 `flex: 1`이면 남는 공간을 똑같이 나눠 가짐 → 메뉴 칸 5개가 같은 너비가 됨
- `flex: 2`인 아이템은 `flex: 1`인 아이템의 두 배를 차지

`align-self` : 이 아이템만 교차축 정렬을 따로 지정
```css
#navbar__logo {
    align-self: start;    /* 다른 아이템은 center여도 로고만 시작점에 */
}
```

#### 실습 : 이력서 페이지 레이아웃
footer를 항상 화면 맨 아래에 붙이기
```css
#contents {
    min-height: 100vh;        /* 최소 높이를 화면 높이만큼 */
    display: flex;
    flex-direction: column;   /* header, 연락처, main, footer를 세로로 */
}

main {
    flex: 1;                  /* 남는 세로 공간을 main이 전부 차지 */
}
```
- main이 남는 공간을 다 먹으니 footer가 자연스럽게 화면 맨 아래로 밀려남
- 내용이 적어도 footer가 중간에 떠 있지 않는 레이아웃 (Sticky Footer)

- 수업자료에서는 `#contents` 대신 `body`에 같은 설정을 줌. 어느 요소든 "세로 flex + 최소 높이 화면만큼 + main만 flex: 1" 조합이면 됨

연락처를 한 줄로 가운데 정렬
```html
<div id="contact-row">
    <span>seol.ditto@gmail.com</span>
    <span class="divider">|</span>
    <span>010-1111-2222</span>
    <span class="divider">|</span>
    <a href="https://github.com/seol-ditto" id="github">
        <i class="fa-brands fa-github"></i>GitHub
    </a>
</div>
```
```css
#contact-row {
    display: flex;
    justify-content: center;
    gap: 20px;
}

#contact-row a {
    color: inherit;
    text-decoration: none;
}

#contact-row a:hover {
    text-decoration: underline;
}
```
- 수업자료처럼 `|` 구분선을 span으로 넣으면 항목 구분이 더 잘 보임
- `#contact-row a` : 자손 선택자. contact-row 안의 a만 골라서 스타일 적용

---
### CSS 단위

| 단위 | 기준 | 예시 |
| --- | --- | --- |
| `px` | 고정 크기 | `20px` |
| `rem` | 최상위(html)의 글자 크기. 브라우저 기본값 16px | `1.5rem` = 24px |
| `em` | 부모(자기 자신)의 글자 크기 | 부모가 20px이면 `1.5em` = 30px |
| `%` | 부모 크기 대비 비율 | `width: 50%` |
| `vh` | 화면(뷰포트) 높이의 1% | `100vh` = 화면 높이 전체 |
| `vw` | 화면(뷰포트) 너비의 1% | `100vw` = 화면 너비 전체 |

- `rem`은 사용자가 브라우저 글자 크기를 키우면 같이 커져서, 글자 크기와 여백에 많이 씀
- `em`은 부모를 따라 계속 곱해져서 중첩되면 계산이 복잡해짐 → 보통 `rem`을 더 선호
- **숫자에는 단위를 꼭 붙여야 함** (0만 예외)
    - `padding: 0.2 0.5rem;` → `0.2`에 단위가 없어서 이 줄 전체가 무시됨
    - `padding: 0.2rem 0.5rem;`으로 써야 적용됨

---
### Position
요소를 어디에, 무엇을 기준으로 배치할지 정하는 속성
- 기본 배치 방식인 Normal Flow를 조정하거나 벗어날 수 있음
- 레이아웃, 오버레이(겹쳐 띄우기), 고정 UI 구현에 필수
- `top`, `bottom`, `left`, `right` 속성과 함께 사용
- 기본값 `static`
    - Normal Flow 유지
    - 위치 조정 불가 (top, left를 줘도 적용 안 됨)
- position은 요소 하나의 위치를 조정하는 도구이지, 페이지 전체 레이아웃용은 아님 → 레이아웃은 Flexbox, Grid

| position | 흐름에서 빠지는지 | 위치 기준 | 스크롤 |
| --- | --- | --- | --- |
| `static` (기본값) | X | 위치 이동 불가 | 같이 움직임 |
| `relative` | X (원래 자리 유지) | 자기 원래 위치 | 같이 움직임 |
| `absolute` | O | 가장 가까운 position이 지정된 조상 (없으면 페이지) | 같이 움직임 |
| `fixed` | O | 화면(뷰포트) | **고정** (안 따라 움직임) |
| `sticky` | X | 스크롤하다 지정한 위치에 닿으면 붙음 | 붙은 뒤엔 고정 |

#### relative (상대 포지션)
```css
.box1 {
    position: relative;
    top: 30px;
    left: 20px;
}
```
- 원래 위치에서 위쪽 30px, 왼쪽 20px 만큼 떨어진 곳으로 박스를 들어서 옮김
    - `top: 30px`은 위에서 30px 밀려 내려간다는 뜻 → 실제로는 아래로 이동
- 원래 자리는 그대로 비워둠 → 다른 요소들에게 영향을 주지 않음 (box1이 옮겨졌다고 box2가 위로 올라가지 않음)
- margin과의 차이
    - `margin-top: 30px`으로 내리면 → 자리 자체가 커져서 아래 요소들도 같이 밀려 내려감
    - `position: relative; top: 30px;`으로 내리면 → 보이는 위치만 바뀌고 다른 요소 배치는 그대로

#### absolute (절대 포지션)
```css
#english {
    position: absolute;
    top: 10px;
    right: 10px;
}
```
- Normal Flow에서 빠져나와 한 층 위 레이어에 떠 있게 됨
    - 원래 자리가 사라져서 아래 요소들이 그 자리로 올라옴
    - 다른 요소들보다 앞에 보임
- Block 요소여도 가로 한 줄을 차지하지 않고 **내용 크기만큼** 줄어듦
- 위치 기준 : 가장 가까운 조상 중 `position`이 static이 아닌 요소
    - 그런 조상이 없으면 viewport(화면) 기준처럼 동작
- 사용 예 : 아이콘, 배지(알림 숫자), 모달 내부 요소
- 실습 : 이력서 오른쪽 위 "영문 이력서" 링크

부모를 기준으로 배치하기 (수업 실습)
```html
<div class="container">
    <div class="box">BOX</div>
</div>
```
```css
.container {
    width: 200px;
    height: 200px;
    border: 3px solid #333;
    position: relative;    /* 이게 있어야 box가 container 기준으로 움직임 */
}

.box {
    width: 100px;
    height: 100px;
    background: #4caf50;
    position: absolute;
    top: 0px;
    left: 0px;             /* container의 왼쪽 위 모서리에 붙음 */
}
```
- container에 `position: relative`가 없으면 box는 화면 왼쪽 위로 날아감
- "부모 relative + 자식 absolute"는 매우 자주 쓰는 조합

#### fixed (고정 포지션)
```css
.box1 {
    position: fixed;
    bottom: 20px;
    right: 20px;
}
```
- 화면(뷰포트)을 기준으로 위치가 고정되어 스크롤해도 따라옴
- absolute처럼 흐름에서 빠지고, 내용 크기만큼 줄어듦
- 예 : 오른쪽 아래 상담 버튼(플로팅 버튼), [할인 코드 생성] 버튼, 고정 헤더
- 실습에서 `body { min-height: 20000px; }`처럼 페이지를 길게 만든 이유 : 스크롤이 생겨야 고정되는 걸 확인할 수 있어서

#### sticky
- 평소엔 Normal Flow대로 있다가, 스크롤해서 지정한 위치(`top: 0` 등)에 닿으면 그 자리에 붙음
- 예 : 스크롤 내리면 상단에 붙는 표 제목, 메뉴바

#### z-index
- 요소가 겹칠 때 앞뒤 순서. 숫자가 클수록 앞에 보임
- position이 static이 아닌 요소에만 적용됨

---
### 반응형 디자인(Responsive Design)
화면 크기와 환경에 따라 레이아웃과 스타일이 자연스럽게 변하는 디자인 방식
- 하나의 화면 크기만으로는 모든 사용자를 만족시킬 수 없음
- 다양한 사용자 환경 : 데스크톱(큰 화면), 태블릿, 모바일(작은 화면), 가로/세로 회전

핵심 요소 3가지
1. 유연한 레이아웃 : Flexbox, Grid
2. 유연한 크기 단위 : %, vw, vh, rem
3. 조건부 스타일 : Media Query

글씨 크기를 rem으로 바꾸기 (수업 예시)
- header : `2.4rem`
- main : `1.2rem`
- 연락처 : `0.9rem`
- footer : `0.6rem`

개발자 도구로 반응형 확인하기
- 크롬에서 `Cmd + Option + I` → 왼쪽 위 휴대폰/태블릿 아이콘(Toggle device toolbar) 클릭
- 화면 너비를 바꾸거나 기기(iPhone 등)를 골라서 레이아웃이 어떻게 변하는지 확인

---
### Media Query
Media Query = "화면이 이 조건이면, 이 스타일을 써라"

```css
.container {
    display: flex;               /* 기본 : 가로 메뉴 */
}

@media (max-width: 300px) {
    .container {
        flex-direction: column;  /* 화면 너비가 300px 이하일 때 세로 메뉴 */
    }
}
```

- `max-width: 300px` : 화면 너비가 300px **이하**일 때 적용
- `min-width: 768px` : 화면 너비가 768px **이상**일 때 적용
- media query 안의 규칙은 같은 선택자라도 **나중에** 작성되어야 기본 스타일을 덮어씀 → 보통 CSS 맨 아래에 작성
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">`가 있어야 모바일에서 제대로 동작함

자주 쓰는 기준 너비(breakpoint) 예시
- 모바일 : ~ 767px
- 태블릿 : 768px ~ 1023px
- 데스크톱 : 1024px ~

모바일 퍼스트(Mobile First)
- 모바일 화면 스타일을 기본으로 먼저 작성하고, `min-width`로 큰 화면 스타일을 추가하는 방식
- 실무에서 많이 쓰는 방식

메뉴가 많으면 작은 화면에서 햄버거 메뉴(☰)가 좋지만, 열고 닫는 동작은 CSS만으로 만들기 어려워서 보통 JavaScript를 함께 씀

---
### 실습 : Navbar(내비게이션 바) 만들기

```html
<nav id="navbar">
    <div id="navbar__logo">
        <i class="fa-brands fa-dev"></i>
        <a href="#">seol.ditto</a>
    </div>
    <ul id="navbar__menu">
        <li><a href="">내 소개</a></li>
        <li><a href="./resume_with_external_css.html">이력서</a></li>
        <li><a href="">사진첩</a></li>
    </ul>
</nav>
```

```css
#navbar {
    display: flex;
    justify-content: space-between;  /* 로고는 왼쪽 끝, 메뉴는 오른쪽 끝 */
    align-items: center;             /* 세로 가운데 */
}

#navbar__menu {
    display: flex;                   /* 메뉴 li들을 가로로 */
    list-style: none;                /* 앞의 점 없애기 */
    padding: 0;                      /* ul 기본 들여쓰기 없애기 */
}

#navbar__menu li:hover {
    background-color: white;
    border-radius: 0.4rem;           /* 모서리 둥글게 */
}
```

작은 화면에서 세로 메뉴로 바꾸기
```css
@media (max-width: 300px) {
    #navbar {
        flex-direction: column;
    }

    #navbar__logo {
        align-self: start;    /* 로고만 왼쪽 시작점에 */
        padding-top: 0.2rem;
    }
}
```

수업자료 버전 (아이콘 메뉴 추가, 400px 기준)
```html
<ul class="navbar__icons">
    <li><i class="fa-brands fa-github"></i></li>
    <li><i class="fa-brands fa-x-twitter"></i></li>
</ul>
```
```css
.navbar__icons {
    list-style: none;
    display: flex;
    padding: 0;
}

@media (max-width: 400px) {
    .navbar {
        flex-direction: column;
        align-items: flex-start;   /* 전체를 왼쪽 정렬 */
        padding: 16px;
    }

    .navbar__menu {
        flex-direction: column;    /* 메뉴도 세로로 */
        width: 100%;
        text-align: center;
    }

    .navbar__icons {
        justify-content: center;
        width: 100%;
    }
}
```
- 수업자료는 `.navbar`(class), 내 실습은 `#navbar`(id)로 만듦. 둘 다 동작은 같지만, 재사용하려면 class가 더 일반적
- 수업자료는 CSS를 `navbar_style.css` 외부 파일로 분리하고 `<link>`로 연결
- 작은 화면에서 `.navbar__menu`에 `width: 100%`를 줘야 메뉴가 가로 전체를 쓰면서 가운데 정렬됨
    - flex item은 기본적으로 내용 크기만큼만 차지하기 때문

포인트
- **Flex 중첩** : `#navbar`(로고 + 메뉴)도 flex, 그 안의 `#navbar__menu`(메뉴 항목들)도 flex
- `<nav>` : 메뉴 영역을 뜻하는 시맨틱 태그
- 메뉴는 `<ul>` + `<li>`로 만드는 게 일반적. 기본 스타일(점, 들여쓰기)은 CSS로 제거
- `body { margin: 0; }` : 브라우저가 body에 기본으로 주는 여백(약 8px)을 없애서 navbar가 화면 끝까지 붙게 함
- `navbar__logo`처럼 `블록__요소` 형태로 이름 짓는 방식을 BEM이라고 함. 어느 영역의 무엇인지 이름만 보고 알 수 있음

#### a 태그 기본 스타일 지우기
```css
a {
    text-decoration: none;   /* 밑줄 제거 */
    color: inherit;          /* 파란색/보라색 대신 부모 글자색 따라가기 */
}
```
- `inherit` : 이 속성 값을 부모에게서 그대로 물려받으라는 뜻
    - Day 1에서 정리한 것처럼 상속값은 직접 지정값을 못 이기는데, `inherit`을 **직접 지정**하면 부모 값을 확실하게 가져올 수 있음
- `href="#"` : 현재 페이지 맨 위로 이동. 링크 자리만 만들어둘 때 사용
- `href=""` : 현재 페이지를 다시 불러옴
- 수업자료는 `color: black;`으로 고정했고, 내 실습은 `color: inherit;`으로 부모 색을 따르게 함. inherit을 쓰면 나중에 부모 색만 바꿔도 링크 색이 같이 바뀜

---
### 다음 시간 미리보기 : Grid
- 2차원 레이아웃 시스템 : 행(row)과 열(column)을 동시에 제어
- 화면 전체 구조(layout)를 만들기 위한 도구

| 도구 | 역할 |
| --- | --- |
| position | 요소 하나의 위치 제어. 레이아웃용은 아님 |
| Flexbox | 한 방향(1차원) 정렬에 최적 |
| Grid | 페이지 구조 자체를 설계 (2차원) |

- 이후 Bootstrap(미리 만들어진 CSS/JS UI 프레임워크)까지 이어짐

---
### 정리
- Normal Flow는 아무 설정 없을 때의 기본 배치로, Block은 세로로 쌓이고 Inline은 가로로 흐른다. 정렬과 간격 맞추기가 어려워 Flexbox가 필요하다.
- Flexbox는 부모에 `display: flex`를 줘서 자식들을 한 방향(1차원)으로 배치하는 레이아웃 시스템이다.
- `justify-content`는 주축, `align-items`는 교차축 정렬이며, `flex-direction`에 따라 주축이 바뀐다.
- `gap`은 아이템 사이 간격을 직접 정하고, `flex: 1`은 남는 공간을 비율로 나눠 갖게 한다.
- `min-height: 100vh` + `flex-direction: column` + `main { flex: 1; }`로 footer를 화면 아래에 붙일 수 있다.
- 박스 안을 정가운데 정렬하려면 `display: flex` + `justify-content: center` + `align-items: center`를 쓴다.
- position은 relative(원래 자리 유지), absolute(흐름에서 빠져 조상 기준), fixed(화면 기준 고정)로 요소를 옮기며, "부모 relative + 자식 absolute" 조합을 자주 쓴다.
- 반응형 디자인은 유연한 레이아웃(Flex, Grid), 유연한 단위(%, vw, vh, rem), Media Query 세 가지로 만든다.
- CSS에서 숫자에는 단위를 꼭 붙여야 하며, 단위가 없으면 그 줄 전체가 무시된다.
