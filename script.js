const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

    let firstValue = 0;
    let operatorValue = '';
    let awaitingNextValue = false;



function sendNumberValue(number) {
    // Replace the current display value if the first value is entered
    if(awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        // if the current display value is 0, replace it with a number, if not add a number
        displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === 0 ? number : displayValue + number;
    }
    
}
    
function addDecimal (){
    // if no decimal, add one
    if(!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}
// Calculate first and second value depending on the operator
const calculate = {
    '/': (firstNumber, secondNumber)=> firstNumber / secondNumber,
    '*': (firstNumber, secondNumber)=> firstNumber * secondNumber,
    '-': (firstNumber, secondNumber)=> firstNumber - secondNumber,
    '+': (firstNumber, secondNumber)=> firstNumber + secondNumber,
    '=': (firstNumber)=> firstNumber
};
function useOperator(operator){
    const currentValue = Number(calculatorDisplay.textContent);
    // Prevent multiple operators
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    // Assign firstValue if no value
    if (!firstValue){
        firstValue = currentValue;
    }else{
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
       
    }
    // Ready for next value, store operator
    awaitingNextValue = true;
    operatorValue = operator;
    
}
console.log(operatorValue);

// Add Event Listeners for Numbers, Decimals and Operators buttons

inputBtns.forEach((inputBtn)=>{
    if (!inputBtn.classList.length) {
        inputBtn.addEventListener('click', ()=> sendNumberValue(inputBtn.value))
    }
    else if(inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click', ()=> useOperator(inputBtn.value))
    }
    else if(inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click', ()=> addDecimal())
    }
})
// Add Keypress Event Listener for Numbers, Decimals and Operators
document.addEventListener("keypress", (event) => {
    const keyPressed = event.key;
  
    // Check if key pressed is a number or decimal
    if (!isNaN(keyPressed) || keyPressed === ".") {
      sendNumberValue(keyPressed);
    } else if (keyPressed in calculate) {
      useOperator(keyPressed);
    }
  });

// Reset display

function resetAll(){
     firstValue = 0;
     operatorValue = '';
     awaitingNextValue = false;

    calculatorDisplay.textContent = '';
}

// Event listener
clearBtn.addEventListener('click', ()=> resetAll());
