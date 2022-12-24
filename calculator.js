const numberButtons = document.querySelectorAll('.operand');
let expression = '';


for (let i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', () => {
        expression += numberButtons[i].textContent;
        console.log(expression);
    });
}

