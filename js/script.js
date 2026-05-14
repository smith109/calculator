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
  const result = operate(operator, previousOperand, currentOperand);

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

function handleKeypadClick(e) {
  const target = e.target;
  if (target.tagName !== 'BUTTON') return;

  if (target.classList.contains('number')) {
    const number = target.textContent;
    appendDigit(number);
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
}

keypad.addEventListener('click', handleKeypadClick);