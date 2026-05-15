const display = document.querySelector('.display');
const keypad = document.querySelector('.keypad');
let isResultDisplayed = false;
let previousOperand = '';
let currentOperand = '0';
let operator = null;

const operations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => b === 0 ? 'Error' : a / b,
};

function updateDisplay(value) {
  display.textContent = value;
}

function operate(operator, previousOperand, currentOperand) {
  const operationFunc = operations[operator];
  const a = Number(previousOperand);
  const b = Number(currentOperand);

  return operationFunc(a, b);
}

function appendDigit(number) {
  if (currentOperand.length >= 18) return;

  if (isResultDisplayed) {
    currentOperand = number;
    isResultDisplayed = false;
  } else if (currentOperand === '0') {
    currentOperand = number;
  } else {
    currentOperand += number;
  }

  updateDisplay(currentOperand);
}

function appendDecimal() {
  if (currentOperand.length >= 18) return;

  if (isResultDisplayed) {
    currentOperand = '0.';
    isResultDisplayed = false;
  } 
  
  if (currentOperand.includes('.')) {
    updateDisplay(currentOperand);
    return;
  } 
  
  if (currentOperand === '0' || currentOperand === '') {
    currentOperand = '0.';
  } else {
    currentOperand += '.';
  }

  updateDisplay(currentOperand);
}

function storeCurrentOperand() {
  previousOperand = currentOperand;
  currentOperand = '';
}

function setOperator(selectedOperator) {
  if (currentOperand !== '' && operator) {
    calculate();
  }
  
  if (previousOperand === '') {
    storeCurrentOperand();
  }

  operator = selectedOperator;
}

function calculate() {
  if (currentOperand === '' || operator === null) return; 
  let result = operate(operator, previousOperand, currentOperand);

  if (result === 'Error') {
    updateDisplay(result);
    clear();
    return;
  }

  result = Math.round(result * 100) / 100;
  currentOperand = result.toString();
  isResultDisplayed = true;
  previousOperand = '';
  operator = null;

  updateDisplay(currentOperand);
}

function clear() {
  isResultDisplayed = false;
  previousOperand = '';
  currentOperand = '0';
  operator = null;
}

function deleteCharacter() {
  currentOperand = currentOperand.slice(0, -1);

  if (currentOperand === '' || currentOperand === '-') {
    currentOperand = '0';
  }

  updateDisplay(currentOperand);
}

function negateNumber() {
  const invertedOperand = Number(currentOperand) * -1;
  currentOperand = invertedOperand.toString();
  updateDisplay(currentOperand);
}

function getPercentage() {
  const percentage = Number(currentOperand) / 100;
  currentOperand = percentage.toString();
  updateDisplay(currentOperand);
}

function handleKeypadClick(e) {
  const target = e.target;
  if (target.tagName !== 'BUTTON') return;

  if (target.classList.contains('number')) {
    const number = target.textContent;
    appendDigit(number);
  }

  if (target.classList.contains('decimal')) {
    appendDecimal();
  }

  if (target.classList.contains('operator')) {
    const selectedOperator = target.classList[1];
    setOperator(selectedOperator);
  }

  if (target.classList.contains('equals')) {
    calculate();
  }

  if (target.classList.contains('clear')) {
    clear();
    updateDisplay(currentOperand);
  }

  if (target.classList.contains('backspace')) {
    deleteCharacter();
  }

  if (target.classList.contains('negate')) {
    negateNumber();
  }

  if (target.classList.contains('percent')) {
    getPercentage();
  }
}

keypad.addEventListener('click', handleKeypadClick);