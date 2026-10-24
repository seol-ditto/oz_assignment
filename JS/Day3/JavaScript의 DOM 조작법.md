# JavaScript의 DOM 조작법 정리
## 1. DOM(Document Object Model)이란?

**DOM**은 HTML 문서를 JavaScript가 다룰 수 있도록 **객체(Object)의 나무 구조(Tree)** 로 바꿔놓은 것이다.

브라우저는 HTML 파일을 읽으면서 태그 하나하나를 **노드(Node)** 라는 객체로 만들고, 부모-자식 관계에 따라 나무 모양으로 연결한다. JavaScript는 이 나무에 접근해서 내용을 읽고, 바꾸고, 추가하고, 지울 수 있다.

```html
<html>
  <body>
    <h1>계산기</h1>
    <div class="calculator">
      <input id="display" value="0">
      <button>7</button>
    </div>
  </body>
</html>
```

위 HTML은 브라우저 안에서 아래처럼 나무 구조가 된다.

```
document
 └─ html
     └─ body
         ├─ h1  ("계산기")
         └─ div.calculator
             ├─ input#display
             └─ button ("7")
```

### 핵심 포인트

- **HTML 파일 자체 ≠ DOM**
  - HTML은 글자로 된 설계도이고, DOM은 브라우저가 그 설계도로 만든 "살아있는 객체"다.
  - JS로 DOM을 바꾸면 화면은 바뀌지만 HTML 파일은 그대로다.
- **`document`** 객체가 DOM 나무의 맨 꼭대기(시작점)다. 모든 요소는 `document`에서부터 찾아 들어간다.
- DOM 덕분에 **새로고침 없이** 화면 내용을 바꿀 수 있다. (예: 계산기 버튼을 누르면 결과창 숫자만 바뀜)

### DOM으로 할 수 있는 일

| 하는 일 | 예시 |
| --- | --- |
| 요소 찾기 | `document.querySelector("#display")` |
| 내용 바꾸기 | `display.value = "0"` |
| 스타일 바꾸기 | `button.style.color = "red"` |
| 클래스 넣고 빼기 | `button.classList.toggle("on")` |
| 요소 만들기/지우기 | `document.createElement("li")`, `item.remove()` |
| 사용자 행동에 반응하기 | `button.addEventListener("click", ...)` |

---

## 2. Selector(선택자)로 DOM 요소 가져오기

DOM을 조작하려면 먼저 **어떤 요소를 바꿀지 찾아서 변수에 담아야** 한다.

### 2-1. `querySelector`

CSS 선택자 문법(`#id`, `.class`, `태그`)을 그대로 쓸 수 있다.

```js
// 조건에 맞는 "첫 번째" 요소 1개
const display = document.querySelector("#display");     // id
const powerBtn = document.querySelector(".on-off");     // class
const firstBtn = document.querySelector("button");      // 태그

// 조건에 맞는 요소 "전부" (NodeList) -> All을 붙이면 됨
const numberBtns = document.querySelectorAll(".number");

// CSS처럼 조합도 가능
const operatorInCalc = document.querySelectorAll(".calculator .operator");
```

> **주의**: `querySelector`는 여러 개가 있어도 **첫 번째 하나만** 가져온다. 여러 개가 필요하면 `querySelectorAll`을 쓴다.

### 2-2. 가져온 요소 조작하기

```js
const display = document.querySelector("#display");
const title = document.querySelector("h1");
const powerBtn = document.querySelector(".on-off");

// 내용 바꾸기
title.textContent = "새 제목";          // 글자만 (태그는 글자로 취급)
title.innerHTML = "<b>굵은 제목</b>";   // 태그까지 해석
display.value = "123";                  // <input>은 value로 읽고 씀

// 스타일 바꾸기
title.style.color = "blue";
title.style.fontSize = "30px";          // CSS의 font-size → fontSize (카멜 표기)

// 클래스 다루기 (CSS에 미리 만들어둔 스타일을 켜고 끌 때 편함)
powerBtn.classList.add("on");           // 추가
powerBtn.classList.remove("on");        // 제거
powerBtn.classList.toggle("on");        // 있으면 빼고 없으면 넣기
powerBtn.classList.contains("on");      // 있는지 true/false

// 속성 다루기
display.setAttribute("placeholder", "숫자 입력");
display.getAttribute("id");             // "display"

// 요소 만들어서 넣기 / 지우기
const li = document.createElement("li");
li.textContent = "새 항목";
document.querySelector("ul").append(li);
li.remove();
```

---

## 3. Event란?

**Event(이벤트)** 는 웹 페이지에서 **일어나는 일(사건)** 이다. 사용자가 클릭하거나, 키보드를 누르거나, 페이지가 다 로딩되는 것 모두 이벤트다.

브라우저는 이런 일이 생길 때마다 "지금 click이 일어났어!"라고 신호를 보내고, JavaScript는 그 신호를 받아서 원하는 동작을 실행할 수 있다.

### 자주 쓰는 이벤트

| 분류 | 이벤트 | 언제 일어나나 |
| --- | --- | --- |
| 마우스 | `click` | 클릭했을 때 |
| | `dblclick` | 더블 클릭했을 때 |
| | `mouseover` / `mouseout` | 마우스가 요소 위로 올라갔을 때 / 벗어났을 때 |
| | `mousemove` | 마우스가 움직일 때 |
| 키보드 | `keydown` / `keyup` | 키를 눌렀을 때 / 뗐을 때 |
| 입력·폼 | `input` | 입력창 값이 바뀔 때마다 |
| | `change` | 입력이 끝나고 값이 확정됐을 때 |
| | `submit` | 폼을 제출할 때 |
| 문서·창 | `DOMContentLoaded` | HTML을 다 읽어 DOM이 준비됐을 때 |
| | `load` | 이미지 등 모든 자원까지 다 로딩됐을 때 |
| | `scroll` / `resize` | 스크롤할 때 / 창 크기가 바뀔 때 |

---

## 4. EventListener(이벤트 리스너)

### 4-1. EventListener란?

**EventListener(이벤트 리스너)** 는 특정 요소에서 특정 이벤트가 일어나는지 **귀 기울이고(listen) 있다가**, 일어나면 **정해둔 함수를 실행**하는 장치다.

> "이 버튼에서(**요소**) 클릭이 일어나면(**이벤트**) 이 함수를 실행해(**함수**)"

여기서 실행되는 함수를 **이벤트 핸들러(Event Handler)** 또는 **콜백 함수**라고 부른다.

### 4-2. EventListener를 사용하는 목적, 이유

이벤트에 반응하는 방법은 크게 세 가지가 있다.

```html
<!-- ① HTML 속성에 직접 쓰기 -->
<button onclick="appendNumber('7')">7</button>
```

```js
// ② 요소의 속성에 함수 넣기
button.onclick = function () { ... };

// ③ addEventListener 쓰기
button.addEventListener("click", function () { ... });
```

`addEventListener`(③)를 쓰는 이유는 다음과 같다.

1. **HTML과 JS를 분리할 수 있다**
   ①번처럼 HTML 안에 JS 코드를 섞지 않아도 된다. 구조(HTML), 모양(CSS), 동작(JS)이 각자 파일에 있어서 고치고 관리하기 쉽다.
2. **한 요소에 여러 개를 붙일 수 있다**
   ②번은 새로 넣으면 이전 함수를 덮어써 버리지만, `addEventListener`는 여러 개를 등록하면 전부 실행된다.
3. **나중에 뗄 수 있다**
   `removeEventListener`로 등록한 리스너를 제거할 수 있다.
4. **세부 옵션을 줄 수 있다**
   `{ once: true }`(한 번만 실행) 같은 옵션을 쓸 수 있다.
5. **여러 요소에 반복문으로 한 번에 붙일 수 있다**
   `querySelectorAll` + `forEach`와 함께 쓰면 버튼 20개에 일일이 `onclick`을 적지 않아도 된다.

### 4-3. EventListener 정의하기

```js
요소.addEventListener("이벤트 이름", 실행할 함수);
```

| 부분 | 설명 | 예시 |
| --- | --- | --- |
| 요소 | 어디서 일어나는 이벤트를 들을지 | `button`, `document` |
| 이벤트 이름 | 어떤 일을 들을지 (`on` 없이 씀) | `"click"`, `"keydown"` |
| 실행할 함수 | 그 일이 일어나면 무엇을 할지 | `togglePower`, `() => {...}` |

#### 방법 ① 미리 만든 함수 이름을 넘기기

```js
const powerBtn = document.querySelector(".on-off");

function togglePower() {
  powerBtn.classList.toggle("on");
}

powerBtn.addEventListener("click", togglePower);     // ✅ 이름만 넘김
// powerBtn.addEventListener("click", togglePower()); // ❌ 괄호를 쓰면 바로 실행돼 버림
```

> **괄호 주의**: `togglePower()`처럼 괄호를 붙이면 "클릭될 때 실행해"가 아니라 "**지금 당장** 실행하고 그 결과를 넘겨"가 된다. 함수는 페이지가 열리자마자 한 번 실행되고, 정작 클릭하면 아무 일도 안 일어난다.

#### 방법 ② 그 자리에서 함수 만들기 (익명 함수 / 화살표 함수)

```js
powerBtn.addEventListener("click", function () {
  powerBtn.classList.toggle("on");
});

powerBtn.addEventListener("click", () => {
  powerBtn.classList.toggle("on");
});
```

#### 방법 ③ 인자가 필요한 함수는 감싸서 넘기기

```js
// appendNumber("7")처럼 값을 넘겨야 할 때 → 함수로 한 번 감싼다
sevenBtn.addEventListener("click", () => appendNumber("7"));
```

### 4-4. EventListener 응용

#### ① 이벤트 객체(`event`) 활용하기

리스너 함수는 첫 번째 매개변수로 **이벤트에 대한 정보가 담긴 객체**를 받는다. 보통 `event` 또는 `e`라고 이름 붙인다.

```js
button.addEventListener("click", (event) => {
  console.log(event.type);    // "click" (무슨 이벤트인지)
  console.log(event.target);  // 실제로 클릭된 요소
});

document.addEventListener("keydown", (event) => {
  console.log(event.key);     // 누른 키 이름 ("7", "Enter", "Escape" ...)
});
```

#### ② 여러 버튼에 한 번에 붙이기 (`querySelectorAll` + `forEach`)

```js
const numberBtns = document.querySelectorAll(".number");

numberBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    appendNumber(btn.textContent);   // 버튼에 적힌 글자("7")를 그대로 사용
  });
});
```

#### ③ 브라우저 기본 동작 막기 (`preventDefault`)

```js
// 폼 제출 시 페이지가 새로고침되는 것 막기
form.addEventListener("submit", (event) => {
  event.preventDefault();
});

// 버튼에 포커스가 있을 때 Enter를 누르면 그 버튼이 한 번 더 눌리는 것 막기
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    performCalculate();
  }
});
```

#### ④ 키보드로 계산기 조작하기

```js
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if ("0123456789.".includes(key)) {
    appendNumber(key);
  } else if ("+-*/".includes(key)) {
    event.preventDefault();
    appendOperator(key);
  } else if (key === "Enter" || key === "=") {
    event.preventDefault();
    performCalculate();
  } else if (key === "Escape") {
    clearDisplay();
  }
});
```

#### ⑤ 이벤트 위임 (Event Delegation)

버튼마다 리스너를 붙이는 대신 **부모에 하나만** 붙이고, `event.target`으로 어떤 자식이 눌렸는지 구분하는 방법이다. 이벤트는 클릭된 요소에서 부모 쪽으로 차례차례 전달되기(**버블링**) 때문에 가능하다.

```js
const buttonsBox = document.querySelector(".buttons");

buttonsBox.addEventListener("click", (event) => {
  const btn = event.target;
  if (btn.tagName !== "BUTTON") return;   // 버튼 사이 빈 공간 클릭은 무시

  if (btn.classList.contains("number")) {
    appendNumber(btn.textContent);
  } else if (btn.classList.contains("operator")) {
    appendOperator(btn.textContent);
  }
});
```

> 리스너가 1개뿐이라 가볍고, 나중에 버튼이 새로 추가돼도 따로 붙일 필요가 없다.

#### ⑥ 리스너 제거하기 / 한 번만 실행하기

```js
function sayHi() {
  console.log("안녕!");
}

button.addEventListener("click", sayHi);
button.removeEventListener("click", sayHi);   // 같은 함수 "이름"을 넘겨야 제거됨

// 한 번 실행되고 나면 자동으로 제거
button.addEventListener("click", sayHi, { once: true });
```

> 익명 함수나 화살표 함수로 바로 등록한 리스너는 이름이 없어서 `removeEventListener`로 지울 수 없다. 나중에 지울 리스너라면 함수를 따로 만들어 이름으로 등록한다.

---

## 5. 마우스 감지란?

**마우스 감지**는 마우스 이벤트를 이용해서 사용자가 마우스로 **무엇을, 어디서** 하는지 알아내는 것이다. 클릭 여부뿐 아니라 마우스가 요소 위에 올라왔는지, 지금 화면의 어느 좌표에 있는지까지 알 수 있다.

### 마우스 이벤트 종류

| 이벤트 | 언제 일어나나 |
| --- | --- |
| `click` | 누르고 뗐을 때 (한 번 클릭) |
| `dblclick` | 더블 클릭 |
| `mousedown` / `mouseup` | 버튼을 누르는 순간 / 떼는 순간 |
| `mouseover` / `mouseout` | 요소 위로 들어옴 / 나감 (자식 요소에서도 일어남) |
| `mouseenter` / `mouseleave` | 요소 위로 들어옴 / 나감 (자식 요소에서는 안 일어남) |
| `mousemove` | 요소 위에서 움직일 때마다 계속 |
| `contextmenu` | 오른쪽 클릭 (메뉴가 뜨기 직전) |

### 이벤트 객체로 알 수 있는 정보

| 속성 | 뜻 |
| --- | --- |
| `event.clientX`, `event.clientY` | 지금 보이는 **브라우저 창 기준** 좌표 |
| `event.pageX`, `event.pageY` | 스크롤까지 포함한 **문서 전체 기준** 좌표 |
| `event.offsetX`, `event.offsetY` | 이벤트가 일어난 **요소 기준** 좌표 |
| `event.button` | 어떤 버튼인지 (0: 왼쪽, 1: 가운데, 2: 오른쪽) |

### 마우스 감지 사용

#### ① 마우스를 올리면 색 바꾸기

```js
const title = document.querySelector("h1");

title.addEventListener("mouseenter", () => {
  title.style.color = "tomato";
});

title.addEventListener("mouseleave", () => {
  title.style.color = "";      // 원래 CSS 색으로 돌아감
});
```

> 단순히 색만 바꾸는 거라면 CSS의 `:hover`로도 충분하다. JS 마우스 감지는 **색 말고 다른 동작**(글자 바꾸기, 데이터 불러오기, 카운트 등)이 필요할 때 쓴다.

#### ② 마우스 좌표 실시간으로 보여주기

```js
const info = document.querySelector("#info");

document.addEventListener("mousemove", (event) => {
  info.textContent = `X: ${event.clientX}, Y: ${event.clientY}`;
});
```

#### ③ 오른쪽 클릭 감지하기

```js
document.addEventListener("contextmenu", (event) => {
  event.preventDefault();       // 브라우저 기본 메뉴 막기
  console.log("오른쪽 클릭!", event.clientX, event.clientY);
});
```

#### ④ 클릭한 횟수 세기

```js
const button = document.querySelector("button");
let count = 0;

button.addEventListener("click", () => {
  count++;
  button.textContent = `${count}번 클릭`;
});
```

---

## 6. 화살표 함수란?

**화살표 함수(Arrow Function)** 는 `function` 키워드 대신 **`=>`(화살표)** 로 함수를 더 짧게 쓰는 문법이다.

### 기본 형태 비교

```js
// 일반 함수 선언
function add(a, b) {
  return a + b;
}

// 함수 표현식
const add2 = function (a, b) {
  return a + b;
};

// 화살표 함수
const add3 = (a, b) => {
  return a + b;
};
```

### 더 짧게 줄이는 규칙

```js
// ① 실행할 문장이 return 한 줄뿐이면 → { }와 return 생략 가능
const add = (a, b) => a + b;

// ② 매개변수가 딱 1개면 → ( ) 생략 가능
const double = n => n * 2;

// ③ 매개변수가 없으면 → ( ) 꼭 써야 함
const sayHi = () => console.log("안녕!");

// ④ 객체를 바로 return할 때는 → ( )로 감싸야 함 ({ }를 함수 몸통으로 착각하기 때문)
const makeUser = (name) => ({ name: name, age: 20 });
```

### 일반 함수와 다른 점

| | 일반 함수 (`function`) | 화살표 함수 (`=>`) |
| --- | --- | --- |
| 문법 | 길다 | 짧다 |
| `this` | 호출한 대상에 따라 달라짐 | **자기만의 `this`가 없음** (바깥의 `this`를 그대로 씀) |
| 선언 전에 호출 | 함수 선언문은 가능 (호이스팅) | 불가능 (변수에 담기 때문) |
| `arguments` 객체 | 있음 | 없음 |

> **이벤트 리스너에서 주의할 점**: 일반 함수로 쓴 리스너 안의 `this`는 이벤트가 붙은 요소를 가리키지만, 화살표 함수에서는 그렇지 않다. 화살표 함수에서 요소가 필요하면 `this` 대신 `event.currentTarget`(리스너를 붙인 요소)이나 바깥 변수를 쓴다.

```js
button.addEventListener("click", function () {
  console.log(this);                  // button
});

button.addEventListener("click", (event) => {
  console.log(this);                  // button이 아님 (바깥의 this)
  console.log(event.currentTarget);   // button ✅
});
```

### 화살표 함수 사용

#### ① 이벤트 리스너

```js
powerBtn.addEventListener("click", () => {
  powerBtn.classList.toggle("on");
});
```

#### ② 인자를 넘겨야 하는 함수 감싸기

```js
sevenBtn.addEventListener("click", () => appendNumber("7"));
```

#### ③ 배열 메서드 (`forEach`, `map`, `filter`)

```js
const numberBtns = document.querySelectorAll(".number");
numberBtns.forEach((btn) => {
  btn.addEventListener("click", () => appendNumber(btn.textContent));
});

const nums = [1, 2, 3, 4, 5];
const doubled = nums.map((n) => n * 2);         // [2, 4, 6, 8, 10]
const evens = nums.filter((n) => n % 2 === 0);  // [2, 4]
```

#### ④ 짧은 계산 함수

```js
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

console.log(add(3, 5));   // 8
```

---

## 정리

1. **DOM**은 HTML을 JS가 다룰 수 있게 만든 객체 나무이고, `document`가 그 시작점이다.
2. **선택자**로 요소를 찾아 변수에 담고(`querySelector`, `querySelectorAll`), `textContent`, `value`, `style`, `classList` 등으로 조작한다.
3. **이벤트**는 페이지에서 일어나는 일(클릭, 키 입력 등)이고, **이벤트 리스너**는 그 일이 생기면 정해둔 함수를 실행한다.
4. `addEventListener`를 쓰면 HTML과 JS를 분리할 수 있고, 여러 개 등록·제거·옵션 설정이 가능하다. 함수를 넘길 때는 **괄호 없이 이름만**, 인자가 필요하면 **화살표 함수로 감싼다**.
5. **마우스 감지**는 마우스 이벤트와 이벤트 객체(`clientX`, `button` 등)로 사용자의 마우스 동작과 위치를 알아내는 것이다.
6. **화살표 함수**는 함수를 짧게 쓰는 문법이며, 자기만의 `this`가 없다는 점이 일반 함수와 가장 크게 다르다.
