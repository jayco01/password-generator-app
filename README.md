# Password Generator App

A fully responsive password generator built using pure **HTML**, **CSS**, and **JavaScript** — no frameworks, no libraries, just fundamentals.  
This project was developed as part of my personal portfolio to deepen my understanding of **DOM manipulation**, **responsive design without media queries**, and **vanilla JavaScript logic design**.

![Screenshot of the app](images/website.screenshot.PNG)  
🔗 [Live Demo](https://jayco01.github.io/password-generator-app/)

---

## 🔐 Features

- Generate strong passwords using selected criteria
- Password strength indicator based on length and character variety
- Custom slider UI with live value display and track color fill
- Copy-to-clipboard functionality
- Fully responsive layout using **CSS `clamp()`** — no media queries

---

## 🧠 What I Learned

I pushed myself to build this without any tutorials or pre-made code. The goal was to struggle through design and logic challenges.

Some of the things I struggled with most were:
- Dynamically syncing UI with DOM values (like slider length and checkbox states)
- Understanding how to attach event listeners to NodeLists
- Writing logic that felt readable while still doing what I needed
- Making a password generation algorithm that satisfies all checkbox conditions, even when some are unchecked

But by sticking through the frustrations, I learned:
- How to use `.forEach()` correctly on NodeLists
- How to manage component state using DOM elements like `.checked` and `.value`
- The importance of breaking JS into modular, testable functions
- How to avoid media queries by using `clamp()` with custom spacing and typography tokens

---

## 📈 Password Strength Algorithm

Two key functions drive the strength indicator: `calculateStrength()` and `displayStrength()`.

### `calculateStrength()`

```js
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
  } else if (charLength > 5 && charLength <= 10) {
    strengthNum += 4;
  } else if (charLength > 10 && charLength <= 15) {
    strengthNum += 6;
  } else if (charLength > 15 && charLength <= 20) {
    strengthNum += 8;
  }

  return strengthNum;
}
```

### `displayStrength()`

```js
function displayStrength() {
  let strengthNum = Number(calculateStrength());
  strengthNum -= 4; // Calibration offset
  resetSrengthBar();

  if (strengthNum <= 5) {
    strengthText.textContent = "TOO WEAK!";
    updateSrengthBar(0, "var(--clr-red500)");
  } else if (strengthNum <= 10) {
    strengthText.textContent = "WEAK";
    updateSrengthBar(1, "var(--clr-orange400)");
  } else if (strengthNum <= 15) {
    strengthText.textContent = "MODERATE";
    updateSrengthBar(2, "var(--clr-yellow300)");
  } else {
    strengthText.textContent = "STRONG";
    updateSrengthBar(3, "var(--clr-green200)");
  }
}
```

These functions work together to provide real-time feedback based on user-selected options and character length, a small but effective algorithm I’m proud of.

---

## 🔁 About `generatePassword()`

```js
function generatePassword() {
  // Generate based on required checkbox conditions and fallback logic
}
```

Is this function efficient? No.  
Is it DRY? Not really.  
Is it refactored? Definitely not.

But am I proud of it? **Absolutely.**

I wrote every line myself, debugged every edge case, and learned the hard way how to juggle logic paths and string generation, and that’s what matters most to me.

---

## 💅 CSS Notes

This project is **fully responsive without media queries**.  
I used `clamp()` along with custom spacing/typography variables to create a layout that scales smoothly across screen sizes:

```css
--font-size-fluid-1: clamp(1rem, 3vw, 1.5rem);
--spacing-32px: 2rem;

body {
  gap: clamp(var(--spacing-16px), 4vw, var(--spacing-32px));
}
```

No breakpoints, no extra headaches, just clean math and well-named design tokens.

---

## 📁 Tech Stack

- HTML5
- Pure CSS3 (no frameworks, no media queries!)
- Vanilla JavaScript (ES6+)

---

## 🧠 Takeaway

This was a deep dive into core front-end skills.  
It taught me the value of writing logic from scratch, debugging my own design decisions, and finding creative ways to make a UI work on every screen size.

---

## 🚀 Live Demo

[🔗 View it live](https://jayco01.github.io/password-generator-app/)

---

## 📸 Screenshot

![Screenshot of the app](images/website.screenshot.PNG)

