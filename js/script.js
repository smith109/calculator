const display = document.querySelector('.display');
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
