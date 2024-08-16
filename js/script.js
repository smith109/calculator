const calcDisplay = document.querySelector('.display');
const calcButtons = document.querySelector('.btn-container');
const storage = [];
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
  console.log(storage.reduce(operations[operator]));
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
      console.log(`${target.textContent} was clicked`);
      break;
    case classList.contains('equals'):
      console.log(`${target.textContent} was clicked`);
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