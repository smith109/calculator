const calcDisplay = document.querySelector('.display');
const calcButtons = document.querySelector('.btn-container');
let storage = [];
let operator = '';
let displayValue = '0';
let resultDisplayed = false;

calcButtons.addEventListener('click', handleButtonClick);

const operations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => b === 0 ? 'Error' : a / b
};

function operate(storage, operator) {
  if (storage.length < 2) return;
  return storage.map(Number).reduce(operations[operator]);
}

function updateDisplay() {
  calcDisplay.textContent = displayValue;
}

function inputNumber(target) {
  const number = target.textContent;
  if (number === '.' && displayValue.includes('.')) return;

  if (resultDisplayed) {
    displayValue = '0';
    resultDisplayed = false;
  }
  if (displayValue === '0' || displayValue === 'Error') {
    displayValue = number;
  } else {
    displayValue += number;
  }
  updateDisplay();
}

function inputOperator(classList) {
  if (operator) {
    storage.push(displayValue);
    displayValue = operate(storage, operator);
    storage = [];
    updateDisplay();
  }
  operator = classList[1];
  storage.push(displayValue);
  displayValue = '0';
}

function calculate() {
  storage.push(displayValue);
  displayValue = operate(storage, operator);
  resultDisplayed = true;
  storage = [];
  operator = '';
  updateDisplay();
}

function clearCalculator() {
  storage = [];
  operator = '';
  displayValue = '0';
  resultDisplayed = false;
  updateDisplay();
}

function negateNumber() {
  displayValue = (Number(displayValue) * -1).toString();
  updateDisplay();
}

function handleButtonClick(event) {
  const target = event.target;
  const classList = target.classList;
  if (target.tagName !== 'BUTTON') return;

  switch (true) {
    case classList.contains('number'):
      inputNumber(target);
      break;
    case classList.contains('operator'):
      inputOperator(classList);
      break;
    case classList.contains('equals'):
      calculate();
      break;
    case classList.contains('clear'):
      clearCalculator();
      break;
    case classList.contains('negate'):
      negateNumber();
      break;
  }
}