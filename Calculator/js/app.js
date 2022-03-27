let numbersArea = document.getElementById("current-numbers");
let prevNumbersArea = document.getElementById("previous-numbers");
let operation = false;
let calculated = false;
let operator = "";
let firstNumber = 0;
let secondNumber = null;
let result = null;
let printed = true;

const clearAll = () => {
  numbersArea.innerHTML = "0";
  prevNumbersArea.innerHTML = "";
  firstNumber = 0;
  secondNumber = 0;
  operation = false;
  calculated = false;
  operator = "";
  result = 0;
  printed = true;
};

const clearEntry = () => {
  numbersArea.innerHTML = "0";
};

const printNumbers = (_string) => {
  let onlyNumbersLength = 0;
  let numbersArr = numbersArea.innerHTML.split("");
  for (let i = 0; i < numbersArr.length; i++) {
    if (Number.isInteger(parseInt(numbersArr[i]))) {
      onlyNumbersLength++;
    } else if (numbersArr[i] == ",") {
      onlyNumbersLength--;
    }
  }
  if (onlyNumbersLength < 16) {
    if (!numbersArea.innerHTML.includes(",") && _string == ",") {
      numbersArea.insertAdjacentHTML("beforeend", ",");
    } else if (_string != ",") {
      if (numbersArea.innerHTML == "0") {
        numbersArea.innerHTML = _string;
      } else {
        if (printed == false) {
          numbersArea.innerHTML = "";
          printed = true;
          numbersArea.insertAdjacentHTML("beforeend", _string);
        } else if (printed == true) {
          numbersArea.insertAdjacentHTML("beforeend", _string);
        }
      }
      if (!numbersArea.innerHTML.includes(",")) {
        numbersArea.innerHTML = addDot(numbersArea.innerHTML, -3);
      }
    }
  }
};

const addDot = (_string = "", _index = 0) => {
  let stringArray = _string.split("");
  stringArray = stringArray.filter((el) => {
    return el != ".";
  });

  let multipleDots = Math.floor((stringArray.length - 1) / (_index * -1));

  let dotQTY = 0;
  for (i = 1; i <= multipleDots; i++) {
    stringArray.splice(_index * i - dotQTY, 0, ".");
    dotQTY++;
  }
  let newString = stringArray.join("");
  return newString;
};

const writeComma = () => {
  printNumbers(",");
};

const getNumber = (_clickedId) => {
  let number = parseInt(_clickedId.split("-")[1]);
  printNumbers(number);
};

const deleteLast = () => {
  let numbers = numbersArea.innerHTML.split("");
  numbers.splice(-1);
  numbersArea.innerHTML = numbers.join("");
  if (numbersArea.innerHTML == "") {
    numbersArea.innerHTML = "0";
  }
};

const filterNumber = (_string) => {
  let stringArr = _string.split("");
  stringArr = stringArr.filter((el) => {
    return el != ".";
  });
  let stringNumbers = stringArr.join("");
  stringNumbers = stringNumbers.replace(/,/g, ".");
  let number = parseFloat(stringNumbers);
  return number;
};

const writeNumbers = (_string) => {
  numberString = _string;
  printed = true;
  prevNumbersArea.innerHTML = numberString;
  printed = false;
  if (operation == false) {
    firstNumber = filterNumber(numberString);
  } else if (operation == true && calculated == false){
    secondNumber = firstNumber;
    firstNumber = filterNumber(numberString);
    calculateResult();
    printed = true;
    printEquation();
    printed = false;
  } else if (operation == true && calculated == true) {
    secondNumber = result;
    firstNumber = filterNumber(numberString);
    calculateResult();
    printed = true;
    printEquation();
    printed = false;
  }
  operation = true;
}

const addNumber = () => {
  let numbersArr = numbersArea.innerHTML.split("");
  numbersArr = numbersArr.filter((el) => {
    return el != ".";
  });
  numbersArr.push(" + ");
  let numberString = numbersArr.join("");
  operator = "+";
  writeNumbers(numberString);
};


const substractNumber = () => {
  let numbersArr = numbersArea.innerHTML.split("");
  numbersArr = numbersArr.filter((el) => {
    return el != ".";
  });
  numbersArr.push(" - ");
  let numberString = numbersArr.join("");
  prevNumbersArea.innerHTML = numberString;
  operator = "-";
  writeNumbers(numberString);
};

const multiplyNumber = () => {
  let numbersArr = numbersArea.innerHTML.split("");
  numbersArr = numbersArr.filter((el) => {
    return el != ".";
  });
  numbersArr.push(" x ");
  let numberString = numbersArr.join("");
  prevNumbersArea.innerHTML = numberString;
  operator = "*";
  writeNumbers(numberString);
};

const divideNumber = () => {
  let numbersArr = numbersArea.innerHTML.split("");
  numbersArr = numbersArr.filter((el) => {
    return el != ".";
  });
  numbersArr.push(" ÷ ");
  let numberString = numbersArr.join("");
  prevNumbersArea.innerHTML = numberString;
  operator = "÷";
  writeNumbers(numberString);
};

const switchNumbers = () => {
  if (calculated == false) {
    secondNumber = filterNumber(numbersArea.innerHTML);
  } else if (calculated == true && operation == true) {
    firstNumber = result;
    secondNumber = filterNumber(numbersArea.innerHTML);
  } else if (calculated == true && operation == false && printed == false) {
    firstNumber = result;
  } else if (calculated == true && operation == false && printed && true) {
    secondNumber = result;
    firstNumber = filterNumber(numbersArea.innerHTML);
  }
};

const calculateResult = () => {
  switch (operator) {
    case "+":
      result = firstNumber + secondNumber;
      break;
    case "-":
      result = firstNumber - secondNumber;
      break;
    case "*":
      result = firstNumber * secondNumber;
      break;
    case "÷":
      result = firstNumber / secondNumber;
      break;
  }
  calculated = true;
  operation = false;
};

const printEquation = () => {
  let equationArr = [];
  equationArr.push(firstNumber.toString().replace(".", ","));
  equationArr.push(" " + operator + " ");
  equationArr.push(secondNumber.toString().replace(".", ","));
  equationArr.push(" " + "=" + " ");
  prevNumbersArea.innerHTML = equationArr.join("");
  if (result == Infinity) {
    numbersArea.innerHTML = "Infinity"
  }
  else {
    let resultString = result.toString().replace(".", ",");
    printed = false;
    for (let i = 0; i < resultString.length; i++) {
      printNumbers(resultString[i]);
    }
  }
  printed = false;
};

const equalButton = () => {
  switchNumbers();
  calculateResult();
  printEquation();
};

const toggleMenu = () => {
  let menuHtmlEl = document.getElementById("menu");
  if (menuHtmlEl.style.display == "flex") {
    menuHtmlEl.style.display = "none";
  } else {
    menuHtmlEl.style.display = "flex";
  }
};

function logging() {
  console.clear();
  console.log("First Number :" + firstNumber);
  console.log("Second Number :" + secondNumber);
  console.log("Result :" + result);
  console.log("Operation : " + operation);
  console.log("Calculated : " + calculated);
  console.log("Printed :" + printed);
}

function logKey(e) {
  //  console.log(e);
  if (e.isTrusted == true) {
    if (e.code.includes("Numpad")) {
      if (Number.isInteger(parseInt(e.key)) == true) {
        printNumbers(e.key);
      } else if (e.key == ",") {
        printNumbers(",");
      } else {
        switch (e.key) {
          case "+":
            addNumber();
            break;
          case "-":
            substractNumber();
            break;
          case "*":
            multiplyNumber();
            break;
          case "/":
            divideNumber();
            break;
          case "Enter":
            equalButton();
            break;
        }
      }
    } else {
      switch (e.key) {
        case "Backspace":
          deleteLast();
          break;
        case "Delete":
          clearEntry();
          break;
        case "Escape":
          clearAll();
          break;
        case "Enter":
          equalButton();
          break;
      }
    }
  }
}



document.addEventListener("keydown", logKey);

window.addEventListener("load", (event) => {
  document.getElementById("menu").style.display = "none";
//  setInterval(logging, 250);
});
