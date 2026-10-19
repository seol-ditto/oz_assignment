# CSS(Cascading Style Sheets)
HTML 요소의 모양과 배치를 정하는 언어

- HTML : 웹 페이지의 구조(뼈대)
- CSS : 그 구조를 어떻게 보이게 할지(꾸미기, 배치)

**Cascade** : 폭포, 위에서 아래로 흘러내리는 이미지
- 여러 스타일 규칙이 한 요소에 겹칠 때, 정해진 순서(우선순위, 작성 순서)에 따라 위에서 아래로 흘러내리듯 최종 스타일이 결정된다는 의미

**상속(Inheritance)** : 부모의 어떤 성질/특징을 자식이 물려받는 것
- 부모에게 style을 적용시키면 자식에게도 적용됨 (자식이 별도로 자신의 성질을 설정하지 않는 이상)
- Cascade와 상속은 비슷해 보이지만 다른 개념
    - Cascade : 한 요소에 여러 규칙이 겹칠 때 무엇을 적용할지 정하는 규칙
    - 상속 : 부모의 값을 자식이 물려받는 것

---
### CSS로 할 수 있는 것
- 글자 색, 크기, 폰트
- 여백, 정렬, 위치
- 레이아웃(Flex, Grid) : 화면에 요소를 어떻게 배치할지
- 반응형 디자인 : 화면 크기에 따라 레이아웃이 자동으로 바뀌는 디자인

---
### CSS 기본 문법

```css
선택자 {
    속성: 값;
}

header {
    font-size: x-large;
    font-weight: bold;
}
```

- 선택자(Selector) : 조건에 맞는 태그들을 골라내는 법
- 속성(Property) : 무엇을 바꿀지 (color, font-size 등)
- 값(Value) : 어떻게 바꿀지 (gray, 20px 등)
- 속성과 값은 `:`로 연결, 끝에는 `;`
- 주석 : `/* 주석 */` (HTML 주석 `<!-- -->`과 다름)
    - 주석은 반드시 `*/`로 닫아야 함. 안 닫으면 아래 코드까지 전부 주석이 되어 적용되지 않음

---
### CSS 적용 방법 3가지

1. Inline Style : 태그 안에 `style` 속성으로 직접 작성
```html
<p style="font-size: x-large; text-align: center;">김설아</p>
```
- `style`은 HTML의 Attribute(속성), `font-size`는 CSS의 Property(속성)
- 태그마다 일일이 써야 해서 관리가 어려움

2. Internal CSS(내부 CSS) : `<head>` 안의 `<style>` 태그에 작성
```html
<head>
    <style>
        #contents { text-align: center; }
    </style>
</head>
```
- 그 HTML 파일 안에서만 적용됨

3. External CSS(외부 CSS) : 별도의 `.css` 파일을 만들어 `<link>`로 연결
```html
<link rel="stylesheet" href="./style.css">
```
- 여러 HTML 파일이 같은 CSS를 공유할 수 있어서 실무에서 가장 많이 씀
- `./` : 지금 HTML 파일과 같은 폴더라는 뜻

#### 외부 리소스 가져오기
다른 사람이 만든 CSS도 `<link>`로 가져와 쓸 수 있음

- Font Awesome(아이콘)
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css">

<i class="fa-brands fa-github"></i>
```
- Google Fonts(폰트) : 사이트에서 제공하는 `<link>`를 `<head>`에 넣고, CSS에서 `font-family`로 사용
```css
header {
    font-family: "Bagel Fat One", system-ui;
}
```
- `font-family`에 여러 개를 쓰면 앞의 폰트가 없을 때 다음 폰트로 대체됨

---
### 선택자(Selector) 종류

| 선택자 | 작성법 | 예시 | 특징 |
| --- | --- | --- | --- |
| 전체 선택자 | `*` | `* { }` | 모든 태그 |
| 태그 선택자 | 태그이름 | `header { }` | 해당 태그 전부 |
| class 선택자 | `.` | `.centered { }` | 여러 요소에 같은 class 사용 가능 |
| id 선택자 | `#` | `#github { }` | 페이지에서 하나의 요소에만 사용 |
| 가상 클래스 | `:` | `#github:hover { }` | 특정 상태일 때 (마우스 올렸을 때 등) |
| 속성 선택자 | `[ ]` | `[type="email"] { }` | 특정 속성을 가진 요소 |

```html
<div id="contents">...</div>      <!-- id는 하나만 -->
<p class="centered">...</p>       <!-- class는 여러 곳에 재사용 -->
```

---
### selector의 우선순위
위로 갈수록 강함
- !important
- inline style (style="..")
- id selector (#id)
- class (.class) / attribute (\[type\]) / pseudo-class (:hover)
- tag selector (div, p)
- \* (전체 선택자)

#### 우선순위 보충
- 우선순위가 같으면 **나중에 작성한 규칙**이 이김
```css
header {
    font-weight: 400;
    font-weight: bold;    /* 이게 적용됨 */
}
```
- `#github:hover`는 id + 가상 클래스라 `#github`보다 강함 → 마우스를 올렸을 때 hover 스타일로 바뀜
- `!important`는 모든 우선순위를 무시해서 나중에 수정하기 어려워지므로 가급적 쓰지 않음

#### 주의 : 상속은 우선순위 싸움에 끼지 못함
- 우선순위는 **같은 요소**에 여러 규칙이 직접 걸렸을 때만 비교함
- 부모에게서 물려받은 값(상속)은 그 요소에 **직접 지정된 값**을 절대 이기지 못함. 상대가 `*`라도 마찬가지

실습에서 겪은 상황
```css
* { color: palevioletred; }
#github { color: gray; }
```
```html
<a id="github">
    <i class="fa-brands fa-github"></i>GitHub
</a>
```
- "GitHub" 글자 : `<a>`에 `#github`가 직접 적용 → 회색
- 아이콘 `<i>` : `#github`의 회색은 상속으로만 내려옴. 그런데 `*`가 `<i>`에 직접 분홍색을 지정 → **분홍색**
- id가 *보다 약해서가 아니라, 상속값이 직접 지정값을 못 이겨서 생긴 일

해결 방법
```css
/* 방법 1 : 기본 글자색은 *가 아니라 body에 (추천) */
body { color: palevioletred; }

/* 방법 2 : 자식까지 직접 지정 */
#github,
#github * { color: gray; }
```
- 글자색·폰트 같은 기본값은 보통 `body`에 주고, `*`는 `margin: 0`, `box-sizing` 같은 초기화 용도로 주로 씀

#### 상속되는 속성 / 상속되지 않는 속성
- 상속됨 : `color`, `font-family`, `font-size`, `font-weight`, `text-align` 등 글자 관련
- 상속 안 됨 : `margin`, `padding`, `border`, `background-color`, `width`, `height` 등 박스 관련
    - 부모 div에 border를 줬다고 자식들에게 전부 테두리가 생기면 이상하니까

---
### 자주 쓴 속성 정리

글자
- `color` : 글자 색 (`gray`, `palevioletred` 같은 색 이름 사용 가능)
- `font-size` : 글자 크기
    - 키워드 : `xx-small`, `x-small`, `small`, `medium`(기본값), `large`, `x-large`, `xx-large`
    - 단위 : `20px` 등
- `font-weight` : 글자 굵기 (`bold`, `400` 등)
- `font-family` : 글꼴
- `text-align` : 정렬 (`center`, `left`, `right`)
    - 블록 요소에 주면 그 안의 글자와 인라인 요소들이 정렬됨
- `text-decoration` : 밑줄 등 (`none`, `underline`)
    - `<a>` 링크의 기본 밑줄을 없앨 때 `text-decoration: none;`
    - CSS 키워드는 대소문자를 구분하지 않아 `None`도 동작하지만, 보통 소문자로 씀

HTML 특수문자
- `&#169;` → © (저작권 기호)

---
### CSS 박스 모델
모든 HTML 요소는 박스 형태. 바깥쪽부터 순서대로
- margin : 마진, 박스 **바깥** 여백 (다른 박스와의 거리)
- border : 테두리
- padding : 패딩, 테두리 **안쪽** 여백 (내용과 테두리 사이)
- content : 내용

```
┌──────────── margin ────────────┐
│  ┌───────── border ─────────┐  │
│  │  ┌────── padding ─────┐  │  │
│  │  │      content       │  │  │
│  │  └────────────────────┘  │  │
│  └──────────────────────────┘  │
└────────────────────────────────┘
```

- margin, border, padding은 기본적으로 설정하지 않으면 나타나지 않음 (단, 일부 태그는 브라우저 기본 margin이 있음. 예 : `<p>`, `<body>`)
- `background-color`는 content + padding 영역까지 칠해짐. margin은 투명

#### content 크기
- 블록 요소의 기본 높이 : 안의 내용(글자 크기)만큼
    - 높이를 바꾸고 싶다면 `height` 설정
- 블록 요소의 기본 너비 : 부모(웹사이트) 너비만큼 꽉 차서, 창 크기에 따라 변함
    - 고정하고 싶으면 `width` 설정

#### border
```css
border: 2px solid black;    /* 두께 스타일 색 */
```
- 스타일 : `solid`(실선), `dashed`(점선), `dotted`(점) 등

#### padding / margin 작성법
방향별로 따로 쓰기
```css
padding-top: 10px;
padding-bottom: 10px;
padding-left: 10px;
padding-right: 10px;
```

한 줄로 줄여 쓰기 (값 개수에 따라 의미가 다름, 시계방향 : 위 → 오른쪽 → 아래 → 왼쪽)
```css
padding: 10px;                  /* 네 방향 모두 10px */
padding: 10px 20px;             /* 위아래 10px, 좌우 20px */
padding: 10px 20px 30px;        /* 위 10px, 좌우 20px, 아래 30px */
padding: 10px 20px 30px 40px;   /* 위 오른쪽 아래 왼쪽 */
```
- margin도 똑같은 규칙
- `margin: 0 auto;` + `width` 지정 → 블록 요소를 가로 가운데 정렬

---
### Block / Inline
박스가 차지하는 기본 배치 방식

Block-level 요소
- 가로 한 줄 전체를 차지 → 다음 요소는 무조건 아랫줄로
- `width`, `height`, `margin`, `padding` 모두 적용됨
- 예 : `<div>`, `<p>`, `<h1>`, `<header>`, `<main>`, `<footer>`

Inline 요소
- 내용만큼만 차지 → 옆으로 나란히 이어짐 (글자처럼 흐름)
- `width`, `height`는 적용 안 됨
- 위아래 `margin`도 적용 안 됨 (좌우만 적용)
- 예 : `<a>`, `<span>`, `<strong>`, `<i>`

```html
<div>A</div>
<div>B</div>                          <!-- 줄바꿈되어 세로로 쌓임 -->
<span>Inline</span><span>Inline</span> <!-- 옆으로 나란히 -->
Lorem <div>BLOCK</div> ipsum          <!-- 글 중간에 블록이 오면 앞뒤로 줄이 끊김 -->
```

- `display` 속성으로 바꿀 수 있음
```css
span { display: block; }        /* 인라인을 블록처럼 */
div  { display: inline; }       /* 블록을 인라인처럼 */
a    { display: inline-block; } /* 옆으로 나란히 + width/height 적용 가능 */
```

---
### HTML 태그(Tag) 정리
CSS 선택자로 고르는 대상이 결국 태그이므로 자주 쓰는 태그를 정리

#### 태그 기본
- 대부분 여는 태그 + 닫는 태그 : `<p>내용</p>`
- 닫는 태그가 없는 **빈 태그(void element)** : `<img>`, `<input>`, `<br>`, `<hr>`, `<meta>`, `<link>`
    - 안에 내용을 넣을 일이 없는 태그들
- 속성(Attribute) : 여는 태그 안에 `이름="값"` 형태로 추가 정보를 줌
```html
<a href="https://github.com/seol-ditto" id="github">GitHub</a>
```

#### 문서 구조 태그
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Resume</title>
    <link rel="stylesheet" href="./style.css">
</head>
<body>
    화면에 보이는 내용
</body>
</html>
```
- `<!DOCTYPE html>` : HTML5 문서라고 브라우저에 알림 (태그는 아님)
- `<html>` : 문서 전체를 감싸는 최상위 태그. `lang`으로 언어 지정
- `<head>` : 화면에 직접 보이지 않는 문서 정보
    - `<meta charset="UTF-8">` : 글자 인코딩 (한글 깨짐 방지)
    - `<meta name="viewport" ...>` : 모바일 화면 크기 맞춤
    - `<title>` : 브라우저 탭 제목
    - `<link>` : 외부 CSS 등 연결
    - `<style>` : 내부 CSS 작성
- `<body>` : 실제 화면에 보이는 내용

#### 텍스트 태그
| 태그 | 의미 | Block / Inline |
| --- | --- | --- |
| `<h1>` ~ `<h6>` | 제목 (숫자가 작을수록 큰 제목) | Block |
| `<p>` | 문단(paragraph) | Block |
| `<br>` | 줄바꿈 (빈 태그) | Inline |
| `<hr>` | 가로 구분선 (빈 태그) | Block |
| `<strong>` | 굵게, 중요한 내용 | Inline |
| `<em>` | 기울임, 강조 | Inline |
| `<span>` | 의미 없이 글자 일부를 묶을 때 | Inline |
| `<a>` | 링크 (`href`로 이동할 주소) | Inline |
| `<i>` | 원래 기울임. Font Awesome에서는 아이콘 표시용으로 씀 | Inline |

```html
<a href="https://github.com/seol-ditto" target="_blank">GitHub</a>
```
- `target="_blank"` : 링크를 새 탭에서 열기

#### 목록 태그
- `<ul>` : 순서 없는 목록(unordered list) → 앞에 점(•)
- `<ol>` : 순서 있는 목록(ordered list) → 앞에 1, 2, 3
- `<li>` : 목록의 각 항목(list item). ul, ol 안에 넣어서 사용

```html
<ul>
    <li>HTML</li>
    <li>CSS</li>
</ul>

<ol>
    <li>git add</li>
    <li>git commit</li>
    <li>git push</li>
</ol>
```
- 목록 안에 목록을 넣어 중첩 가능
- 앞의 점을 없애고 싶을 때 CSS : `list-style: none;`

#### 이미지 태그
```html
<img src="./profile.png" alt="프로필 사진" width="200">
```
- `src` : 이미지 경로 (내 폴더 파일 또는 인터넷 주소)
- `alt` : 이미지가 안 뜰 때 대신 보이는 글, 화면 낭독기가 읽어주는 설명 → 꼭 쓰기
- 빈 태그라 닫는 태그 없음
- 인라인처럼 흐르지만 width/height 지정이 가능함 (replaced element)

#### 폼(Form) 태그
사용자 입력을 받아 서버로 보내는 태그
```html
<form action="https://httpbin.org/post" method="post">
    <label for="email">이메일</label>
    <input type="email" id="email" name="newemail" placeholder="이메일">
    <input type="password" name="newpassword" placeholder="비밀번호">
    <button type="submit">회원가입</button>
</form>
```
- `<form>` : 입력칸들을 감싸는 태그
    - `action` : 데이터를 보낼 주소
    - `method` : 보내는 방식
        - `get` : 주소 뒤에 `?newemail=...`처럼 붙여서 보냄 → 보임
        - `post` : 요청 본문에 담아서 보냄 → 주소에 안 보임. 비밀번호 같은 건 post
- `<input>` : 입력칸 (빈 태그)
    - `type` : 입력 종류
        - `text` : 일반 글자
        - `email` : 이메일 형식 검사
        - `password` : 입력값이 ●●●로 가려짐
        - `checkbox` : 여러 개 선택
        - `radio` : 하나만 선택 (같은 name끼리 묶임)
        - `number`, `date` 등
    - `name` : 서버에 보낼 때 붙는 이름표. **name이 없는 input은 전송되지 않음**
    - `placeholder` : 칸이 비어 있을 때 보이는 안내 글자
    - `required` : 필수 입력
- `<label>` : 입력칸 이름표. `for`와 input의 `id`를 맞추면 글자를 눌러도 입력칸이 선택됨
- `<button>` : 버튼. form 안에 있으면 기본으로 제출(submit) 버튼이 됨
- `<textarea>` : 여러 줄 입력, `<select>` + `<option>` : 드롭다운 선택

실습에서 겪은 상황
- httpbin 결과에 `"form": {}`처럼 비어 있으면 → name이 없거나, 저장 안 한 예전 파일이거나, 다른 form의 버튼을 누른 것
- 값이 비어 있어도 name이 있으면 `"newemail": ""`처럼 이름은 전송됨

#### 구역 나누기 태그 (Semantic tag)
- `<div>` : 의미 없이 영역을 묶는 박스 (Block)
- 시맨틱 태그 : 이름 자체가 의미를 가진 구역 태그 (모두 Block)
    - `<header>` : 머리말, 상단 영역
    - `<nav>` : 메뉴(내비게이션)
    - `<main>` : 핵심 본문 (페이지에 하나)
    - `<section>` : 주제별 구역
    - `<article>` : 독립적인 글 하나
    - `<footer>` : 꼬리말, 하단 영역 (저작권 등)
- div로도 똑같이 만들 수 있지만, 시맨틱 태그를 쓰면 코드를 읽기 쉽고 검색엔진·화면 낭독기가 구조를 이해하기 쉬움

---
### 생각해봐야할 것
- 여러 박스를 화면에 어떻게 배치할 것인가?
- 레이아웃을 어떻게 구성할 것인가?

---
### 정리
- CSS는 선택자로 요소를 고르고, 속성과 값으로 모양을 정한다.
- 적용 방법은 inline, internal, external 세 가지이며, 실무에서는 외부 CSS 파일을 주로 쓴다.
- 우선순위는 !important > inline > id > class > tag > * 순이고, 같으면 나중에 쓴 규칙이 이긴다.
- 상속값은 직접 지정값을 이기지 못하므로, 기본 글자색은 `*`보다 `body`에 주는 것이 좋다.
- 모든 요소는 content, padding, border, margin으로 이루어진 박스이다.
- Block 요소는 한 줄을 다 차지하고, Inline 요소는 내용만큼 차지하며 width/height가 적용되지 않는다.
- HTML 태그는 문서 구조(head, body), 텍스트(p, a, span), 목록(ul, ol, li), 이미지(img), 폼(form, input, button), 구역(div, header, main, footer)으로 나눌 수 있다.
- img, input처럼 닫는 태그가 없는 빈 태그가 있고, input은 name이 있어야 서버로 전송된다.
