const lengthSetter = document.getElementById("length-setter");

function calculateSetterPct() {
  const min = Number(lengthSetter.min);
  const max = Number(lengthSetter.max);
  const currentValue = Number(lengthSetter.value);

  let percentage = ((currentValue - min) * 100)/(max - min);

  lengthSetter.style.background = `linear-gradient(to right, var(--clr-green200) ${percentage}%, var(--clr-grey850) ${percentage}%`;
}

calculateSetterPct();

lengthSetter.addEventListener('input', calculateSetterPct);