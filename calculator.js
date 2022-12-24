const numberButtons = document.querySelectorAll('.operand');
const operatorButtons = document.querySelectorAll('.operator');
let expression = '';


for (let i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', () => {
        expression += numberButtons[i].textContent;
        console.log(expression);
    });
}

for (let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener('click', () => {
        if (checkOperator(expression)) return;
        expression += operatorButtons[i].textContent;
        console.log(expression);
    });
}

function checkOperator(expression) {
    let operatorArray = ['+', '-', 'X', '/'];
    for (const element of operatorArray) {
        if (expression.charAt(expression.length - 1) == element) return true;
    }
}