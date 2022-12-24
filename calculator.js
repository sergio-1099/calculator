const numberButtons = document.querySelectorAll('.operand');
const operatorButtons = document.querySelectorAll('.operator');
let calcScreen = document.querySelector('.screen');
const clearButton = document.querySelector('.calc-clear');
let expression = '';

clearButton.addEventListener('click', () => calcScreen.textContent = '');

for (let i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', () => {
        expression += numberButtons[i].textContent;
        calcScreen.textContent += numberButtons[i].textContent;
    });
}

for (let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener('click', () => {
        if (checkOperator(expression)) return;
        expression += operatorButtons[i].textContent;
        calcScreen.textContent += operatorButtons[i].textContent;
    });
}

function checkOperator(expression) {
    let operatorArray = ['+', '-', 'X', '/'];
    for (const element of operatorArray) {
        if (expression.charAt(expression.length - 1) == element) return true;
    }
}