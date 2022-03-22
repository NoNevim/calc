
// finish rounding to display dimensions
// dividing zero issue


let displayNums = [];
let firstEnteredNum = null;
let currentOperation = null;
let result = null;
const display = document.getElementById('display');

function add (num1, num2) {
    return num1 + num2;
}

function substract (num1, num2) {
    return num1 - num2;
}

function multiply (num1, num2) {
    return num1 * num2;
}

function divide (num1, num2) {
    if ( num2 === 0 ) return 0

    return num1 / num2;
}

function operate (operator, num1, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2);            
        case "-":
            return substract(num1, num2);            
        case "*":
            return multiply(num1, num2);            
        case "/":
            return divide(num1, num2);  
        case "":
            return num2;     
        default: 
            return "err";      
       }
}

function addNumTodisplay(num) {
    displayNums.push(num);
    display.textContent = displayNums.join('');
}


const nums = document.querySelectorAll(".nums");
// default numeric settings - i store value to displayNums
nums.forEach( item => item.addEventListener('click', () => addNumTodisplay(item.value)));



const operations = document.querySelectorAll(".operations");
operations.forEach( item => item.addEventListener('click', () => {

    
    if ( result !== null ) {        
        if ( result !== Number(display.textContent)) {
            // case when there is a result and user just presses some number after it (means that wants perform new calculation independent of result)
            // and then presses operator - then i have to start from begining                      
            firstEnteredNum = Number(displayNums.join(''));            
            currentOperation = item.value;
            displayNums = [];
            result = null;
        } else {
            // case where there is already some result and i want to perform operation with it
            firstEnteredNum = result;
            currentOperation = item.value;
        }
        
    } else if ((result === null) && (firstEnteredNum !== null )) {
        // case where user entered number, then clicked on operator, then entered second number and then clicked again on operator ...
        secondEnteredNum = Number(displayNums.join(''));
        firstEnteredNum = operate(currentOperation, firstEnteredNum, secondEnteredNum);
        display.textContent = firstEnteredNum;
        displayNums = [];
        currentOperation = item.value;
    } else {   
        // case where user entered number (for the first time) and then clicked on operator
        firstEnteredNum = Number(displayNums.join(''));
        currentOperation = item.value;
        displayNums = [];
    }
}));


const evaluate = document.querySelector('.evaluate');
evaluate.addEventListener('click', evaluation);

function evaluation() {
    if ( firstEnteredNum !== null ) {
        if ( displayNums.length > 0 ) {
            // case where user entered number, then clicked on operator, then entered second number and then clicked on evaluate
            let secondEnteredNum = Number(displayNums.join(''));
            result = operate(currentOperation, firstEnteredNum, secondEnteredNum);
            firstEnteredNum = null;
            display.textContent = result;
            displayNums = [];
            currentOperation = "";
        } else {
            // case where user entered number, then clicked on operator and then clicked on evaluate (=)
            let secondEnteredNum = firstEnteredNum;
            result = operate(currentOperation, firstEnteredNum, secondEnteredNum);
            display.textContent = result;
            firstEnteredNum = null;
            displayNums = [];
            currentOperation = "";
        }
    }
}

const clear = document.querySelector('.clear');
clear.addEventListener('click', cleanup);

function cleanup() {
    display.textContent = 0;
    displayNums = [];
    firstEnteredNum = null;
    currentOperation = "";
    result = null;
}





