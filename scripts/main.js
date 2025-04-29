const psOutput = document.getElementById("ps-output");

const lengthDisplay = document.querySelector(".length__display");
const lengthSetter = document.getElementById("length-setter");

const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox =  document.getElementById("symbols");

const generateBtn = document.getElementById("generate");


let lengthValue = Number(lengthDisplay.textContent);

let uppercaseChar = String.fromCharCode(Math.floor(Math.random()*(90-65+1)) + 65);
let lowercaseChar = String.fromCharCode(Math.floor(Math.random()*(122-97+1)) + 97);
let numbersChar = String.fromCharCode(Math.floor(Math.random()*(57-48+1)) + 48);
let symbolsChar = String.fromCharCode(Math.floor(Math.random()*(47-33+1)) + 33);


// calculating how much of the slider will be colored with green
function setSliderColor() {
  const min = Number(lengthSetter.min);
  const max = Number(lengthSetter.max);
  const currentValue = Number(lengthSetter.value);

  let percentage = ((currentValue - min) * 100)/(max - min);

  lengthSetter.style.background = `linear-gradient(to right, var(--clr-green200) ${percentage}%, var(--clr-grey850) ${percentage}%`;
}
setSliderColor();
lengthSetter.addEventListener('input', setSliderColor);


function generatePassword() {
  let outputPassword = generateRequiredOptions();
  let numLeftOver = lengthValue - Number(outputPassword.length)
  
  for(let i = 0; i <= numLeftOver - 1; i++) {
    let randomSelected = Math.floor(Math.random() * 10);
    if (randomSelected >= 0 && randomSelected <= 2) {
      outputPassword += uppercaseChar;
    } else if (randomSelected >= 3 && randomSelected <= 5) {
      outputPassword += lowercaseChar;
    } else if (randomSelected == 6 || randomSelected == 7) {
      outputPassword += numbersChar;
    } else if (randomSelected == 8 || randomSelected == 9) {
      outputPassword += symbolsChar;
    } else {
      console.log("Error: Randon Selected Number is out of Range")
    }
  }
  return outputPassword;
};

function generateRequiredOptions() {
  let requiredOptions = '';
  if (uppercaseCheckbox.checked) {
    requiredOptions += String.fromCharCode(Math.floor(Math.random()*(90-65+1)) + 65);
  } 
  if (lowercaseCheckbox.checked) {
    requiredOptions += String.fromCharCode(Math.floor(Math.random()*(122-97+1)) + 97);
  }
  if (numbersCheckbox.checked) {
    requiredOptions += String.fromCharCode(Math.floor(Math.random()*(57-48+1)) + 48);
  }
  if (symbolsCheckbox.checked) {
    requiredOptions += String.fromCharCode(Math.floor(Math.random()*(47-33+1)) + 33);
  }
  return requiredOptions
}

generateBtn.addEventListener("click", function() {
  let outputPassword = generatePassword();
  psOutput.textContent = outputPassword;
});