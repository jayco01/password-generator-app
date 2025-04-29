const psOutput = document.getElementById("ps-output");

const lengthDisplay = document.querySelector(".length__display");
const lengthSetter = document.getElementById("length-setter");

const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox =  document.getElementById("symbols");
const optionsList = document.querySelectorAll(".option__checkbox");

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

lengthSetter.addEventListener('input', function() {
  lengthDisplay.textContent = Number(lengthSetter.value);
  diplayPassword();
})


// generate the part of the password that meets the requirements
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

// default character when checkbox is not checked
function getDefault() {
  let dafaultChar = '';
  if (uppercaseCheckbox.checked) {
    dafaultChar += String.fromCharCode(Math.floor(Math.random()*(90-65+1)) + 65);
  } 
  else if (lowercaseCheckbox.checked) {
    dafaultChar += String.fromCharCode(Math.floor(Math.random()*(122-97+1)) + 97);
  }
  else if (numbersCheckbox.checked) {
    dafaultChar += String.fromCharCode(Math.floor(Math.random()*(57-48+1)) + 48);
  }
  else if (symbolsCheckbox.checked) {
    dafaultChar += String.fromCharCode(Math.floor(Math.random()*(47-33+1)) + 33);
  }
  return dafaultChar
}

// generate the entire password
function generatePassword() {
  let outputPassword = generateRequiredOptions();
  let numLeftOver = lengthValue - Number(outputPassword.length)
  
  for(let i = 0; i <= numLeftOver - 1; i++) {
    let randomSelected = Math.floor(Math.random() * 10);
    if (randomSelected >= 0 && randomSelected <= 2) {
      if (uppercaseCheckbox.checked){ 
        outputPassword += uppercaseChar;
      } else {
        outputPassword += getDefault();
      }
    } 
    else if (randomSelected >= 3 && randomSelected <= 5) {
      if (lowercaseCheckbox.checked) {
        outputPassword += lowercaseChar;
      } else {
        outputPassword += getDefault();
      }
    } 
    else if (randomSelected == 6 || randomSelected == 7) {
      if (numbersCheckbox.checked) {
      outputPassword += numbersChar
      } else {
        outputPassword += getDefault();
      }
    } 
    else if (randomSelected == 8 || randomSelected == 9) {
      if (symbolsCheckbox.checked) {
        outputPassword += symbolsChar
        } else {
          outputPassword += getDefault();
        }
    } 
    else {
      console.log("Error: Randon Selected Number is out of Range")
    }
  }
  return outputPassword;
};

// shuffle the order of each letter in the password
function reshufflePassword(strPassword) {
  let passwordArray = strPassword.split('');

  passwordArray.sort( function(a,b) {
    let ramdomNumber = Math.random();
    return ramdomNumber - 0.5
  })

  let newPassword = passwordArray.join(''); 

  return newPassword;
}

// display password
function diplayPassword() {
  let outputPassword = generatePassword();
  psOutput.textContent = reshufflePassword(outputPassword);
}
generateBtn.addEventListener("click", diplayPassword);