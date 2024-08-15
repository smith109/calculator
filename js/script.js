const calcDisplay = document.querySelector('.display');
const storage = [];
let operator = '';

const operations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => b === 0 ? 'Error' : a / b
};

function operate(storage, operator) {
  console.log(storage.reduce(operations[operator]));
}

function updateDisplay(displayValue) {
  calcDisplay.textContent = displayValue;
}