const numberButtons = document.querySelectorAll('.operand');
const operatorButtons = document.querySelectorAll('.operator');
let calcScreen = document.querySelector('.screen');
const clearButton = document.querySelector('.calc-clear');
const equalsButton = document.querySelector('.calc-equals');
const decimal = document.querySelector('.calc-decimal');
const backspace = document.querySelector('.calc-back');
let expression = '';

document.addEventListener('keydown', (e) => {
    if ((e.key >= 48 || e.key <= 57) || e.key == 'x' || e.key == '/' || e.key == '-' || e.key == '+' || e.key == 'Enter' || e.key == 'Backspace' || e.key == '.'){
        if (checkOperator(expression)) {
            if (e.key == '+' || e.key == '-' || e.key == 'x' || e.key == '/') {
                return;
            }
        }
        if (checkForSecondOperators(expression)) {
            if (e.key == '+' || e.key == '-' || e.key == 'x' || e.key == '/') {
                expression = solveOperation(expression);
                calcScreen.textContent = expression;
            }
        }
        if (e.key == 'Shift') return;
        if (e.key == 'Enter') {
            expression = solveOperation(expression).toString();
            calcScreen.textContent = expression;
            return;
        }
        if (e.key == 'Backspace') {
            expression = expression.substring(0, expression.length - 1);
            console.log(expression);
            calcScreen.textContent = expression;
            return;
        }
        expression += e.key;
        calcScreen.textContent = expression;
        console.log(expression);
    }
    else return;
});

backspace.addEventListener('click', () => {
    expression = expression.substring(0, expression.length - 1);
    console.log(expression);
    calcScreen.textContent = expression;
});

clearButton.addEventListener('click', () => {
    calcScreen.textContent = ''
    expression = '';
    decimal.disabled = false;
});

decimal.addEventListener('click', () => {
    expression += decimal.textContent;
    calcScreen.textContent += decimal.textContent;
    decimal.disabled = true;
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
        if (checkForSecondOperators(expression)) {
            expression = solveOperation(expression);
            calcScreen.textContent = expression;
        }
        expression += operatorButtons[i].textContent;
        calcScreen.textContent += operatorButtons[i].textContent;
        decimal.disabled = false;
    });
}

equalsButton.addEventListener('click', function () {
    expression = solveOperation(expression).toString();
    calcScreen.textContent = expression});

function checkOperator(expression) {
    let operatorArray = ['+', '-', 'x', '/'];
    for (const element of operatorArray) {
        if (expression.charAt(expression.length - 1) == element) return true;
    }
}

function checkForSecondOperators(expression) {
    let operatorArray = ['+', '-', 'x', '/'];
    for (let operator of operatorArray) {
        for (let i = 0; i < expression.length; i++) {
            if (expression.charAt(i) == operator) {
                return true;
            }
        }
    }
}

function solveOperation(expression) {
    let number;
    let operatorIndex = findOperators(expression);
    if (operatorIndex.length == 1) {
        expressionArray = [expression.substring(0, operatorIndex[0].Index), operatorIndex[0].Operator, 
        expression.substring(operatorIndex[0].Index + 1)];
        if (operatorIndex[0].Operator == '+') number = sumExp(expressionArray);
        else if (operatorIndex[0].Operator == '-') number = subtractExp(expressionArray);
        else if (operatorIndex[0].Operator == 'x') number = multiplyExp(expressionArray);
        else if (operatorIndex[0].Operator == '/') number = divideExp(expressionArray);
        return number;
    }
    for (let i = 0; i < operatorIndex.length; i++) {
        if (i == 0) {
            expressionArray = [expression.substring(0, operatorIndex[i].Index), operatorIndex[i].Operator, 
                expression.substring(operatorIndex[i].Index + 1, operatorIndex[i+1].Index)]
        }
        else if (i == operatorIndex.length - 1) {
            expressionArray = [number.toString(), operatorIndex[i].Operator, 
                expression.substring(operatorIndex[i].Index + 1)];
        }
        else {
            expressionArray = [number.toString(), operatorIndex[i].Operator, expression.substring(operatorIndex[i].Index + 1, operatorIndex[i+1].Index)];
        }

        console.log(expressionArray);
        
        if (operatorIndex[i].Operator == '+') number = sumExp(expressionArray);
        else if (operatorIndex[i].Operator == '-') number = subtractExp(expressionArray);
        else if (operatorIndex[i].Operator == 'x') number = multiplyExp(expressionArray);
        else if (operatorIndex[i].Operator == '/') number = divideExp(expressionArray);

        console.log(number);
    }
    return number;
}

function findOperators(expression) {
    let operatorArray = ['+', '-', 'x', '/'];
    let operatorIndex = [];
    let index = 0;
    for (let operator of operatorArray) {
        for (let i = 0; i < expression.length; i++) {
            if (operator == expression.charAt(i)) {
                object = {
                    Operator: operator,
                    Index: i,
                };
                operatorIndex.push(object);
                index++;
            }
        }
    }
    console.log(operatorIndex);
    operatorIndex = operatorIndex.sort((a, b) => a.Index > b.Index ? 1 : -1);
    return operatorIndex;
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
    if (secondOperand == 0) return "Can't divide by zero!";
    return firstOperand / secondOperand;
}