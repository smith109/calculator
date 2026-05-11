const display = document.querySelector('.display');
const keypad = document.querySelector('.keypad');
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
  return operationFunc(previousOperand, currentOperand);
}

function appendDigit(number) {
  if (currentOperand === '0') {
    currentOperand = number;
  } else {
    currentOperand += number;
  }

  updateDisplay(currentOperand);
}

function handleKeypadClick(e) {
  const target = e.target;
  if (target.tagName !== 'BUTTON') return;

  if (target.classList.contains('number')) {
    const number = target.textContent;
    appendDigit(number);
  }
}

keypad.addEventListener('click', handleKeypadClick);