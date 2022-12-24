const numberButtons = document.querySelectorAll('.operand');
const operatorButtons = document.querySelectorAll('.operator');
let calcScreen = document.querySelector('.screen');
const clearButton = document.querySelector('.calc-clear');
const equalsButton = document.querySelector('.calc-equals');
let expression = '';

clearButton.addEventListener('click', () => {
    calcScreen.textContent = ''
    expression = '';
});

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

equalsButton.addEventListener('click', function () {calcScreen.textContent = solveOperation(expression)});

function checkOperator(expression) {
    let operatorArray = ['+', '-', 'X', '/'];
    for (const element of operatorArray) {
        if (expression.charAt(expression.length - 1) == element) return true;
    }
}

function solveOperation(expression) {
    let operatorArray = ['+', '-', 'X', '/'];
    let expressionArray = [];
    let number;
    for (let operator of operatorArray) {
        for (let i = 0; i < expression.length; i++) {
            if (operator == expression.charAt(i)) {
                expressionArray = [expression.substring(0, i), operator, expression.substring(i+1)];
                if (operator == '+') number = sumExp(expressionArray);
                else if (operator == '-') number = subtractExp(expressionArray);
                else if (operator == 'X') number = multiplyExp(expressionArray);
                else if (operator == '/') number = divideExp(expressionArray);
            }
        }
    }
    return number;
}

function sumExp(expressionArray) {
    let firstOperand = +expressionArray[0];
    let secondOperand = +expressionArray[2];
    return firstOperand + secondOperand;
}

function subtractExp(expressionArray) {
    let firstOperand = +expressionArray[0];
    let secondOperand = +expressionArray[2];
    return firstOperand - secondOperand;
}

function multiplyExp(expressionArray) {
    let firstOperand = +expressionArray[0];
    let secondOperand = +expressionArray[2];
    return firstOperand * secondOperand;
}

function divideExp(expressionArray) {
    let firstOperand = +expressionArray[0];
    let secondOperand = +expressionArray[2];
    return firstOperand / secondOperand;
}