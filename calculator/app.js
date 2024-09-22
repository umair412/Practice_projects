let numPad = document.querySelectorAll(".num-btn");
let dataField = document.querySelector("#current-screen");
let aC = document.querySelector(".clear");
let arthimatic = document.querySelectorAll(".arthimatic");
let backspace = document.querySelector(".backspace");
let equal = document.querySelector(".equal");

let valueArr = [];
let value1 = 0;
let finalValue = 0;
let opr;
numPad.forEach(button => {

    button.addEventListener('click', () => {
        if(button.innerText == "+" || button.innerText == "-" || button.innerText == "*" || button.innerText == "/"){
            value1 = valueArr;
            opr = button.innerText;
        }
        valueArr += button.innerText;
        dataField.value = valueArr;
    });
});
aC.addEventListener('click',() => {
    dataField.value = "0";
    valueArr = [];
});
let removeEl = () => {
    dataField.value = valueArr.substring(0,valueArr.length-1);
    valueArr = valueArr.substring(0,valueArr.length-1);
}
backspace.addEventListener("click", removeEl);
let calculate = () => {
    let value2Arr = valueArr.slice(value1.length+1);
    let value2Str = value2Arr.toString();
    let value2Int = parseFloat(value2Str);
    let value1Int = parseFloat(value1);
    if(opr == "+"){
    finalValue = value1Int + value2Int;
    }
    else if(opr == "-"){
        finalValue = value1Int - value2Int;
    }
    else if(opr == "*"){
            finalValue = value1Int * value2Int;
    }
    else if(opr == "/"){
        finalValue = value1Int / value2Int;
    }
    console.log(finalValue);
    dataField.value = finalValue;
}
equal.addEventListener("click", calculate);