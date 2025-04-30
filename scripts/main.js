const psOutput = document.getElementById("ps-output");
const copied = document.getElementById("copy");
const copyBtn = document.getElementById("copy-btn");

const lengthDisplay = document.querySelector(".length__display");
const lengthSetter = document.getElementById("length-setter");

const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox =  document.getElementById("symbols");
const optionsList = document.querySelectorAll(".option__checkbox");

const strengthText = document.querySelector(".strength__text")
const strengthBarList = document.querySelectorAll(".strength__bar")
const generateBtn = document.getElementById("generate");

let lengthValue = Number(lengthDisplay.textContent);

let uppercaseChar = String.fromCharCode(Math.floor(Math.random()*(90-65+1)) + 65);
let lowercaseChar = String.fromCharCode(Math.floor(Math.random()*(122-97+1)) + 97);
let numbersChar = String.fromCharCode(Math.floor(Math.random()*(57-48+1)) + 48);
let symbolsChar = String.fromCharCode(Math.floor(Math.random()*(47-33+1)) + 33);

let strengthList = ["TOO WEAK!", "WEAK", "MODERATE", "STRONG"]


// copy text to clipboard
copyBtn.addEventListener('click', function() {
  let outputPassword = psOutput.textContent;

  navigator.clipboard.writeText(outputPassword);
  copied.classList.remove("hidden");
});


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

// diplay the slider value
lengthSetter.addEventListener('input', function() {
  lengthDisplay.textContent = Number(lengthSetter.value);
  diplayPassword();
  copied.classList.add("hidden");
})


// calculate the password strength
function calculateStrength() {
  let strengthNum = 0;
  let charLength = Number(lengthDisplay.textContent);

  optionsList.forEach(option => {
    if (option.checked) {
      strengthNum += 3;
    }
  });

  if (charLength <= 5) {
    strengthNum += 2;
  }  else if (charLength > 5 && charLength <= 10) {
    strengthNum += 4;
  } else if (charLength > 10 && charLength <= 15) {
    strengthNum += 6;
  } else if (charLength > 15 && charLength <= 20) {
    strengthNum += 8;
  }
  return strengthNum;
}

// looping through each strength bar to change its color
function updateSrengthBar(num, color) {
  for (let i = 0; i <= num; i++) {
    strengthBarList[i].style.backgroundColor = color;
  }
}

function resetSrengthBar() {
  for (let i = 0; i <= 3; i++) {
    strengthBarList[i].style.backgroundColor = 'transparent';
    }
  }

// display password strength indicator
function displayStrength() {
  let strengthNum = Number(calculateStrength());
  strengthNum -= 2;
  resetSrengthBar();

  if (strengthNum <= 5) {
    strengthText.textContent = strengthList[0];
    updateSrengthBar(0,"var(--clr-red500)");
  }  else if (strengthNum > 5 && strengthNum <= 10) {
    strengthText.textContent = strengthList[1];
    updateSrengthBar(1,"var(--clr-orange400)");
  } else if (strengthNum > 10 && strengthNum <= 15) {
    strengthText.textContent = strengthList[2];
    updateSrengthBar(2,"var(--clr-yellow300)");
  } else if (strengthNum > 15 && strengthNum <= 20) {
    strengthText.textContent = strengthList[3];
    updateSrengthBar(3,"var(--clr-green200)");
  }
}
optionsList.forEach(checkbox => {
  checkbox.addEventListener("click", displayStrength);
});
lengthSetter.addEventListener("change", displayStrength);



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
  if (outputPassword) {
  psOutput.textContent = reshufflePassword(outputPassword);
  } else {
    psOutput.textContent = 'P4$5W0rD!'
  }
  copied.classList.add("hidden");
}
generateBtn.addEventListener("click", diplayPassword);