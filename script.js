const setEventListeners = () => {
    for(let button of document.querySelectorAll("button")){
        if(button.getAttribute("id") in numbers){
            button.addEventListener("click",clickNumber);
        }
        if(button.getAttribute("id")==="reset"){
            button.addEventListener("click",resetCalculator);
        }
    }
}

const resetCalculator = () => {
    currentCalculation.textContent = "0";
    currentResult.textContent = "0";
}

const clickNumber = (event) => {
    if(currentResult.textContent==="0") currentResult.textContent = numbers[event.target.id].toString();
    else currentResult.textContent += numbers[event.target.id].toString();
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
const currentCalculation = document.querySelector(".calculation");
const currentResult = document.querySelector(".result");

setEventListeners();
