// -------- 요소 선택하기 --------
// 결과창
const display = document.querySelector("#display");
// on/off 버튼
const powerButton = document.querySelector(".on-off");

// -------- 상태 --------
// 전원 상태 (켜진 채로 시작)
let isOn = true;
// enter로 계산을 마쳤는지
let isCalculated = false;

// 켜진 채로 시작하니까 버튼도 초록색으로 맞춰두기
powerButton.classList.add("on");


// -------- 계산 로직(2일차 과제 재활동) --------
// 계산에 성공하면 숫자를 보여주고 실패하면 에러 문장을 보여주기
function calculate(expression) {
    // 결과가 음수라서 "-"로 시작하면 앞에 0 붙이기
    if (expression.startsWith("-")) {
        expression = "0" + expression;
    }

    // 연산자 기준으로 분할(연산자도 배열에 남겨야 함)
    const tokens = expression.split(/([+\-*/])/);

    // 짝수 칸은 무조건 숫자여야 함
    for (let i = 0; i < tokens.length; i += 2) {
        if (!/^\d+(\.\d*)?$/.test(tokens[i])) {
            return "계산식이 올바르지 않습니다.";
        }
    }

    // 곱셉/나눗셈 먼저 계산하기
    const numbers = [Number(tokens[0])];
    const operators = [];

    for (let i = 1; i < tokens.length; i += 2) {
        const op = tokens[i];
        const next = Number(tokens[i + 1]);

        if (op === "*") {
            numbers.push(numbers.pop() * next);
        } else if (op === "/") {
            if (next === 0) {
                return "0으로 나눌 수 없습니다."
            }
            numbers.push(numbers.pop() / next);
        } else {
            operators.push(op);
            numbers.push(next);
        }
    }

    // 나머지 덧셈/뺄셈 순서대로 계산
    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === "+") {
            result = result + numbers[i + 1];
        } else {
            result = result - numbers[i + 1];
        }
    }

    // 0.1 + 0.2 = 0.3000... 같은 소수 오차 정리하기
    return Number(result.toFixed(10));
}


// -------- 버튼 함수 --------
// 숫자 또는 소수점
function appendNumber(num) {
    if (!isOn) return;

    // 계산 직후거나 Error 상태면 새로 시작하기
    if (isCalculated || display.value === "Error") {
        display.value = "0";
        isCalculated = false;
    }

    // 지금 입력 중인 숫자 (마지막 연산자 뒤의 부분)
    const currentNumber = display.value.split(/[+\-*/]/).at(-1);

    if (num === ".") {
        if (currentNumber.includes(".")) return;
        if (currentNumber === "") {
            display.value += "0.";
            return;
        }
        display.value += ".";
        return;
    }

    if (currentNumber === "0") {
        display.value = display.value.slice(0, -1) + num;
    } else {
        display.value += num;
    }
}

function appendOperator(op) {
    if (!isOn) return;

    if (display.value === "Error") {
        display.value = "0";
    }
    isCalculated = false;

    const lastChar = display.value.at(-1);

    if ("+-*/".includes(lastChar)) {
        display.value = display.value.slice(0, -1) + op;
    } else {
        display.value += op;
    }
}


// Enter
function performCalculate() {
    if (!isOn || display.value === "Error") return;

    if ("+-*/".includes(display.value.at(-1))) return;

    const result = calculate(display.value);

    if (typeof result === "string") {
        console.log(`에러 발생: ${result}`);
        display.value = "Error";
    } else {
        display.value = result;
    }
    isCalculated = true;
}

// C 버튼
function clearDisplay() {
    if (!isOn) return;
    display.value = "0";
    isCalculated = false;
}

// on/off
function togglePower() {
    isOn = !isOn;
    powerButton.classList.toggle("on");
    display.value = isOn ? "0" : "";
    isCalculated = false;
}

// addEventListner -> 키보드 입력 인식
document.addEventListener("keydown", (event) => {
    const key = event.key;

    if ("0123456789.".includes(key)) {
        appendNumber(key);
    } else if ("+-*/".includes(key)) {
        event.preventDefault();             // 브라우저에서 "/" 키가 페이지 검색창을 여는 단축키일 수 있어서
        appendOperator(key);
    } else if (key === "Enter" || key === "=") {
        event.preventDefault();
        performCalculate();
    } else if (key === "Escape") {
        clearDisplay();
    }
});