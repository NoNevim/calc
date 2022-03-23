
// osetrit zadani vice tecek za sebou

let displayNums = [];
let firstEnteredNum = null;
let currentOperation = null;
let result = null;
const digits = 8;
const display = document.getElementById('display');
const nums = document.querySelectorAll(".nums");
const operations = document.querySelectorAll(".operations");
const evaluate = document.querySelector('.evaluate');
const clear = document.querySelector('.clear');

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
    if ( num2 === 0 ) return "Nooo pls"

    return num1 / num2;
}

function operate (operator, num1, num2) {
    let output = 0;
    switch (operator) {
        case "+":
            output = add(num1, num2);    
            break;        
        case "-":
            output = substract(num1, num2); 
            break;           
        case "*":
            output = multiply(num1, num2);
            break;            
        case "/":
            output = divide(num1, num2);  
            break;
        case "":
            output = "err";   
            break;  
        default: 
            output = "err";      
       }
    if ( typeof(output) !== 'string' ) {
        output = round(output);
    }
    return output;
}

function round(number) {
    
    let array = number.toString().split('.')
    if ( array[0].length > digits) {
        // number cant fit in display => show in exponential format
        return number.toExponential(3);  
    } else {
        return parseFloat(number.toPrecision(digits));
    }  
    /*
    } else if ( array[1] !== undefined ) {
        // number can fit in display but have decimals
        let availableDecimals = digits - array[0].length;
        if ( array[1].length >= availableDecimals ) {
            return number.toFixed(availableDecimals)
        } else {
            return number;
        }    
    } else {
        // number can fint in display and has no decimals
        return number;
    }
    */
}

function addNumTodisplay(num) {
    if ( displayNums.length < digits ) {
        if (!(( num === '.' ) && ( displayNums.includes('.')))) {
            displayNums.push(num);
            display.textContent = displayNums.join('');
        }     
    }
}


function evaluation() {
    if ( firstEnteredNum !== null ) {
        if ( displayNums.length > 0 ) {
            // case where user entered number, then clicked on operator, then entered second number and then clicked on evaluate
            let secondEnteredNum = Number(displayNums.join(''));
            result = operate(currentOperation, firstEnteredNum, secondEnteredNum);
            display.textContent = result;
            firstEnteredNum = null;
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

function cleanup() {
    display.textContent = 0;
    displayNums = [];
    firstEnteredNum = null;
    currentOperation = "";
    result = null;
}

// default numeric settings - i store value to displayNums
nums.forEach( item => item.addEventListener('click', () => addNumTodisplay(item.value)));

operations.forEach( item => item.addEventListener('click', () => {    
    if ( result !== null ) {        
        if ( result !== Number(display.textContent)) {
            // case when there is a result and user just presses some number after it (means that wants perform new calculation independent of result)
            // and then presses operator - then i have to start from begining                      
            firstEnteredNum = Number(displayNums.join(''));            
            displayNums = [];
            currentOperation = item.value;            
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
        displayNums = [];
        currentOperation = item.value;        
    }
}));

evaluate.addEventListener('click', evaluation);

clear.addEventListener('click', cleanup);

