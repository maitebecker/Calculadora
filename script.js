const previousOperationText = document.querySelector('#previous_operation');
const currentOperationText = document.querySelector('#current_operation');
const buttons = document.querySelectorAll('#buttons_container');
let currentOperation;

function addDigit(digit) {
    if (digit == "." && currentOperationText.innerText.includes(".")) {
        return;
    }
    currentOperation = digit;
    updateScreen();
}

function calculate(operation) {
    if (currentOperationText.innerText === "" && operation != "C") {
        if (previousOperationText != "") {
            changeOperation(operation);
        }
        return;
    }
    let operationValue = ""; //resultado
    let current = +currentOperationText.innerText;
    let previous = +previousOperationText.innerText.split(" ")[0];

    switch (operation) {
        case "+":
            operationValue = previous + current;
            updateScreen(operationValue, operation, current, previous)
            break;
        case "-":
            operationValue = previous - current;
            updateScreen(operationValue, operation, current, previous)
            break;
        case "X":
            operationValue = previous * current;
            updateScreen(operationValue, operation, current, previous)
            break;
        case "/":
            operationValue = previous / current;
            updateScreen(operationValue, operation, current, previous)
            break;
        case "%":
            if (previous != "") {
                operationValue = (previous / 100) * current;
            } else {
                operationValue = (previous / 100);
            }
            updateScreen(operationValue, operation, current, previous)
            break;
        case "del":
            deleteDigit();
            break;
        case "C":
            cleanScreen(operationValue);
            break;
        case "=":
           equal();
            break;
        default:
            return;
    }
    return operationValue;
}


function updateScreen(
    operationValue = null, //resultado da operação
    operation = null, //operação
    current = null,
    previous = null) {

    if (operation == null) {
        currentOperationText.innerText += currentOperation;
        return;
    }
    if (previous === 0) {
        operationValue = current;
    }
    if(operation == "%"){
        previousOperationText.innerText = `${operationValue} ${operation} X`;
    }else{
         previousOperationText.innerText = `${operationValue} ${operation}`;
    }
   
    currentOperationText.innerText = " ";

}

function changeOperation(operation) {
    const mathOperations = ["+", "-", "X", "/"];

    if (!mathOperations.includes(operation)) {
        return;
    }
    previousOperationText.innerText = previousOperationText.innerText.slice(0, -1) + operation; //retira ultimo caractere e concatena nova operação
}

function deleteDigit() {
    if (currentOperationText != "") {
        currentOperationText.innerText = currentOperationText.innerText.slice(0, -1);
    }
}

function cleanScreen() {
    currentOperationText.innerText = "";
    previousOperationText.innerText = "";
}

function equal(){
    const operation = previousOperationText.innerText.split(" ")[1];
    operationValue = calculate(operation);
    currentOperationText.innerText = operationValue;
    previousOperationText.innerText = "";
}


buttons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        const value = e.target.value;

        if (+value >= 0 || value === ".") {
            addDigit(value);
        }
        else {
            calculate(value);
        }
    })
});