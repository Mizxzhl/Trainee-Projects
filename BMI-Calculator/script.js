function calculatorBMI(){

let weightInput = prompt("Enter Your Weight")
let heightInput = prompt("Enter Your Height")

let weight = parseFloat(weightInput);
let heightCm = parseFloat(heightInput);

//meter a convert
let height = heightCm / 100;

// BMI formular
let bmi = weight / (height * height);

//If you don’t want to use backticks, you can do string concatenation +++
document.getElementById("result")
.innerHTML = `Your BMI is : ${bmi.toFixed(2)} `;


}