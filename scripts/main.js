const lengthSetter = document.getElementById('length-setter');

function updateSliderBackground() {
  const min = lengthSetter.min;
  const max = lengthSetter.max;
  const val = lengthSetter.value;

  const percentage = ((val - min) * 100) / (max - min);

  lengthSetter.style.background = `linear-gradient(to right, var(--clr-green200) ${percentage}%, var(--clr-grey700) ${percentage}%)`;
}


updateSliderBackground();


lengthSetter.addEventListener('input', updateSliderBackground);
