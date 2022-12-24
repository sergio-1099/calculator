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
        if (checkForSecondOperators(expression)) {
            calcScreen.textContent = solveOperation(expression);
        }
        expression += operatorButtons[i].textContent;
        calcScreen.textContent += operatorButtons[i].textContent;
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
    let operatorArray = ['+', '-', 'x', '/'];
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
        /*
        if (i < operatorIndex.length - 1) {
            expressionArray = [expression.substring(0, operatorIndex[i].Index), operatorIndex[i].Operator, 
                expression.substring(operatorIndex[i].Index + 1, operatorIndex[i+1].Index)]
        }
        else {
            expressionArray = [expression.substring(0, operatorIndex[i].Index), operatorIndex[i].Operator, 
                expression.substring(operatorIndex[i].Index + 1)];
        }
        */
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

        //expressionArray[i+1] = number;
        //console.log(expressionArray);
        //expression = number.toString() + expression.substring(operatorIndex[i+1].Index);
        //console.log(expression);
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
    return firstOperand / secondOperand;
}