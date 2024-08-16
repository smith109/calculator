const calcDisplay = document.querySelector('.display');
const calcButtons = document.querySelector('.btn-container');
let storage = [];
let operator = '';
let displayValue = '0';

calcButtons.addEventListener('click', handleButtonClick);

const operations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => b === 0 ? 'Error' : a / b
};

function operate(storage, operator) {
  return storage.map(num => Number(num))
    .reduce(operations[operator]);
}

function updateDisplay() {
  calcDisplay.textContent = displayValue;
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
  }
}

function inputNumber(target) {
  if (displayValue === '0') {
    displayValue = '';
  }
  displayValue += target.textContent;
  updateDisplay();
}

function inputOperator(classList) {
  storage.push(displayValue);
  operator = classList[1];
  displayValue = '0';
}

function calculate() {
  storage.push(displayValue);
  let result = operate(storage, operator);
  displayValue = result;
  storage = [];
  operator = '';
  updateDisplay();
}