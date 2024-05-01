const setEventListeners = () => {
    for(let button of document.querySelectorAll("button")){
        if(button.getAttribute("id") in numbers){
            button.addEventListener("click",clickNumber);
        }   
        else{
            switch(button.getAttribute("id")){
                case "reset":
                    button.addEventListener("click",resetCalculator);
                    break;
                case "delete":
                    button.addEventListener("click",deleteCharacter);
                    break;
                case "negate":
                    button.addEventListener("click",negateNumber);
                    break;
                case "evaluate":
                    button.addEventListener("click",computeResult);
                    break;
                case "decimal-point":
                    button.addEventListener("click",addDecimalPoint);
                    break;
                default: 
                    button.addEventListener("click",addOperator);
            }
        }
    }
}

const resetCalculator = () => {
    currentCalculation.textContent = "";
    currentResult.textContent = "0";
    operatorFlag = false;
    operatorJustPressed = false;
    decimalJustPressed = false;
    chainCompute = false;
    justComputed = false;
    flag = false;
}

const clickNumber = (event) => {
    const number = numbers[event.target.id].toString();
    if(decimalJustPressed) decimalJustPressed = false;
    if(operatorJustPressed){
        currentResult.textContent = number;
        operatorJustPressed = false;
        flag = false;
        return;
    }
    if(flag && justComputed){
        currentCalculation.textContent = "";
        currentResult.textContent = number;
        justComputed = false;
    }
    else if((currentResult.textContent).length>=10) return;
    else if(currentResult.textContent==="0") {
        currentResult.textContent = number;
    }
    else {
        currentResult.textContent += number;
    }
}

const deleteCharacter = () => {
    if((currentResult.textContent).length===1) {
        currentResult.textContent = "0";
    }
    else {
        currentResult.textContent = (currentResult.textContent).slice(0,-1);
    }
}

const negateNumber = () => {
    if(currentResult.textContent ==="0"){
        return;
    }
    else if(currentResult.textContent[0]!=="-"){
        currentResult.textContent = "-" + currentResult.textContent;
    }
    else{
        currentResult.textContent = (currentResult.textContent).slice(1);
    }
}

const addOperator = (event) => {
    if(operatorJustPressed){
        currentCalculation.textContent = currentResult.textContent + operators[event.target.id];
        return;
    }
    if(!operatorFlag){
        if(decimalJustPressed){
            decimalJustPressed = false;
            currentResult.textContent+="0";
        }
        currentCalculation.textContent = currentResult.textContent + operators[event.target.id];
        operatorFlag = true;
        operatorJustPressed = true;
    }
    else{
        chainCompute = true;
        computeResult(event);
        chainCompute = false;
    }
}

const addDecimalPoint = () => {
    decimalJustPressed = true;
    if(operatorJustPressed){
        currentResult.textContent = "0.";
        operatorJustPressed = false;
        return;
    }
    if(!(currentResult.textContent).includes(".")){
        currentResult.textContent+=".";
    }
}

const calculate = (operator,num1,num2) => {
    if(operator==="x"){
        return `${calculator.multiply(num1,num2)}`;
    }
    else if(operator==="+"){
        return `${calculator.add(num1,num2)}`;
    }
    else if(operator==="-"){
        return `${calculator.subtract(num1,num2)}`;
    }
    else{
        return `${calculator.divide(num1,num2)}`;
    }
}

const computeResult = (event) => {
    let num1,num2,operator;
    if(currentCalculation.textContent==="") return;
    if(chainCompute){
        num1 = parseFloat((currentCalculation.textContent).split(" ")[0]);
        num2 = parseFloat(currentResult.textContent);
        operator = (currentCalculation.textContent).split(" ")[1];
    }
    else if((currentCalculation.textContent).includes("=")){
        num2 = parseFloat((currentCalculation.textContent).split(" ")[2]);
        num1 = parseFloat(currentResult.textContent);
        operator = (currentCalculation.textContent).split(" ")[1];
        currentCalculation.textContent = `${num1} ${operator} ${num2} = `;
    }
    else{
        num1 = parseFloat((currentCalculation.textContent).split(" ")[0]);
        num2 = parseFloat(currentResult.textContent);
        operator = (currentCalculation.textContent).split(" ")[1];
        currentCalculation.textContent += currentResult.textContent;
        currentCalculation.textContent += " = ";
    }

    const result = calculate(operator,num1,num2);
    if(result.length>=10){
        currentResult.textContent = (parseFloat(result).toExponential(5)).toString();
    }
    else{
        currentResult.textContent = result;
    }

    operatorFlag = false;
    justComputed = true;
    flag = true;

    if(chainCompute){
        currentCalculation.textContent = currentResult.textContent + `${operators[event.target.id]}`;
        operatorFlag = true;
        flag = false;
        operatorJustPressed = true;
    }
}

const numbers = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
};
const operators = {
    add: " + ",
    subtract: " - ",
    multiply: " x ",
    divide: " / ",
}
const calculator = {
    add(num1,num2){
        return num1 + num2;
    },
    subtract(num1,num2){
        return num1-num2;
    },
    divide(num1,num2){
        return num1/num2;
    },
    multiply(num1,num2){
        return num1*num2;
    },
}
const currentCalculation = document.querySelector(".calculation");
const currentResult = document.querySelector(".result");
let operatorFlag = false;
let operatorJustPressed = false;
let decimalJustPressed = false;
let chainCompute = false;
let justComputed = false;
let flag = true;

setEventListeners();
