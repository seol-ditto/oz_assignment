function start() {
  const input = prompt("계산식을 입력하세요.(예: 1 + 1 * 4)");
  if (input === null) return;            // 취소를 누른 경우

  if (input.trim() === "") {             // 아무것도 안 쓰고 확인을 누른 경우
    alert("내용이 없습니다.");
    return;
  }

  // 1. 공백을 지우고 연산자 기준으로 쪼개기 (연산자도 배열에 남김)
  // "1234 * 586" -> ["1234", "*", "586"]
  const tokens = input.replace(/\s+/g, "").split(/([+\-*/])/);
  // replace는 문자열에서 패턴을 찾아서 다른 문자열로 바꿈
  // / ... /는 정규표현식을 쓰는 표시. 슬래시가 패턴을 감쌈
  // \s는 공백 문자 하나
  // +는 바로 앞의 것이 1개 이상 연속된다
  // g는 global = 전부 찾아라
  // .split은 기준이 나오는 자리마다 문자열을 자름
  // [대괄호]는 이 안에 있는 글자 중 아무거나 하나라는 의미
  // ([]) 소괄호로 감싼 이유는 잘라낸 기준 문자도 배열에 같이 남겨두기 위해
  
  // 자른 직후 짝수 칸은 무조건 숫자여야 함
  for (let i = 0; i < tokens.length; i += 2) {
    if (tokens[i] === "" || isNaN(tokens[i])) {
      alert("계산식이 올바르지 않습니다.");
      return;
    }
  }

  // 2. 곱셈/나눗셈 먼저 계산
  const numbers = [Number(tokens[0])];   // 숫자 보관
  const operators = [];                  // + 와 - 보관

  for (let i = 1; i < tokens.length; i += 2) {
    const op = tokens[i];                // 연산자
    const next = Number(tokens[i + 1]);  // 연산자 뒤의 숫자

    if (op === "*") {
      const last = numbers.pop();        // 마지막 숫자를 꺼내서
      numbers.push(last * next);         // 곱한 결과로 다시 넣기
    } else if (op === "/") {
      if (next === 0) {
        alert("0으로 나눌 수 없습니다.");
        return;
      }
      const last = numbers.pop();
      numbers.push(last / next);
    } else {
      operators.push(op);                // + 와 - 는 일단 보관
      numbers.push(next);
    }
  }

  // 3. 남은 덧셈/뺄셈을 왼쪽부터 계산
  let result = numbers[0];
  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === "+") {
      result = result + numbers[i + 1];
    } else {
      result = result - numbers[i + 1];
    }
  }

  console.log(`${input} = ${Number(result.toFixed(10))}`);
}