const calcDisplay = document.querySelector('.display');
const calcButtons = document.querySelector('.btn-container');
let storage = [];
let operator = '';
let displayValue = '0';
let resultDisplayed = false;

document.addEventListener('keydown', handleKeyboard);
calcButtons.addEventListener('click', handleButtonClick);

const operations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => b === 0 ? 'Error' : a / b
};

function operate(storage, operator) {
  if (storage.length < 2) return displayValue;
  return storage.map(Number).reduce(operations[operator]);
}

function updateDisplay() {
  calcDisplay.textContent = displayValue;
}

function inputNumber(number) {
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

function inputOperator(op) {
  if (operator) {
    storage.push(displayValue);
    displayValue = operate(storage, operator);
    storage = [];
    updateDisplay();
  }
  operator = op;
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

function getPercentage() {
  displayValue = (Number(displayValue) / 100).toString();
  updateDisplay();
}

function deleteCharacter() {
  if (displayValue === '0' ||
    displayValue === 'Error' ||
    typeof (displayValue) === 'number') {
    return
  };

  let newString = displayValue.slice(0, -1)
  displayValue = newString === '' ? '0' : newString;
  updateDisplay();
}

function handleButtonClick(event) {
  const target = event.target;
  const classList = target.classList;
  if (target.tagName !== 'BUTTON') return;

  switch (true) {
    case classList.contains('number'):
      inputNumber(target.textContent);
      break;
    case classList.contains('operator'):
      inputOperator(classList[1]);
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
    case classList.contains('percent'):
      getPercentage();
      break;
    case classList.contains('backspace'):
      deleteCharacter();
      break;
  }
}

function handleKeyboard(event) {
  event.preventDefault();
  const keyName = event.key;
  const numberKeys =
    [
      '0', '1', '2',
      '3', '4', '5',
      '6', '7', '8',
      '9', '0', '.'
    ]

  switch (keyName) {
    case numberKeys.find(key => key === keyName):
      inputNumber(keyName);
      break;
    case '!':
      negateNumber();
      break;
    case '%':
      getPercentage();
      break;
    case '+':
      inputOperator('add');
      break;
    case '-':
      inputOperator('subtract');
      break;
    case '*':
      inputOperator('multiply');
      break;
    case '/':
      inputOperator('divide');
      break;
    case 'Backspace':
      deleteCharacter();
      break;
    case ('Escape'):
      clearCalculator();
      break;
    case 'Enter':
      calculate();
      break;
  }
}