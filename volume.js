const form = document.getElementById("volumeForm");
const input = document.getElementById("volumeInput");
const volumeFill = document.querySelector(".volume-fill");
const volumeValue = document.querySelector(".volume-value");
const rulesCount = document.querySelector(".rules-count");
const ruleItems = document.querySelectorAll(".rules-list li");

let currentVolume = 0;

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const text = input.value;
  const results = checkRules(text);
  updateUI(results);
  alert("Volume Changed to " + currentVolume + "%");
});

form.addEventListener("keyup", function (e) {
  const text = input.value;
  const results = checkRules(text);
  updateUI(results);
});
form.addEventListener("keydown", function (e) {
  const text = input.value;
  const results = checkRules(text);
  updateUI(results);
});

function checkRules(text) {
  const upper = text.split("").filter((c) => c >= "A" && c <= "Z"); //Separates uppercase letters for the result below
  const vowels = text.split("").filter((c) => "aeiouAEIOU".includes(c)); // Separates vowels for the results also
  const lower = text.split("").filter((c) => c >= "a" && c <= "z"); //Separates lowercase letters for the result below
  const digits = text.split("").filter((c) => c >= "0" && c <= "9"); // sperates the digits for the results below.
  const constonants = text
    .split("")
    .filter((c) => "dfjhklrstvwxDFJHKLRSTVWX".includes(c)); // Separates vowels for the results also

  const results = [
    upper.length >= 1, //Validation for [0] is there at least 1 uppercase letter? (RETURNS A TRUE OR FALSE VALUE)
    upper.length > 3, //At space [1] is there at least 3 uppercase letters? (RETURNS A TRUE OR FALSE VALUE)
    text.length < 21, // space [2] (ruleItems[2] / results[2]) - Is there more than 12 letters?
    text.includes("!") ||
      text.includes("@") ||
      text.includes("#") ||
      text.includes("$") ||
      text.includes("%"), // Is there a special character
    text.toLowerCase().includes("password"), // Is the word password in it? It first tho will say like NOT (changes text to lowercase so that we dont need to test each single variation of upper and lowercase letter)
    digits.length >= 1, // Are there more than 1 numbers
    text.toLowerCase().includes("e"), // Does it include E or e? This is the same as password but only for the letter e
    text.toLowerCase().includes("a"), // Password but A/a
    lower.includes(text[0]) || upper.includes(text[0]), //At place number 1 does it have a upper or lowercase letter (STARTS WITH LETTER)
    digits.includes(text[text.length - 1]), // Checks the last item in the input to see if it is a number
    text.toLowerCase().includes("vol"), //does it inlcude VOL vol Vol VOl vOl vOL voL (only did it to proove the ease of converting it to lowercase)
    !text.includes(" "), //It DOESNT have a space
    vowels.length >= 2, // More than 2 vowels
    constonants.length >= 3, // More than 3 constonants
    lower.length >= 1, //At least 1 lowercase
    text.toLowerCase().includes("loud"), //contains loud
    text.includes("5"), // includes the number 5
    text.includes("7"), //doesnt include 7
    !text.includes("*"), //doesnt include *
    text.match(/(.)\1/) !== null, //includes a double (i dont understand this as well but i got it from the internet!)
  ];

  return results;
}

function updateUI(results) {
  const passed = results.filter((r) => r === true).length; // This filters out the results that are true so it can display the #/20 and so it can calculate the volume %

  for (let index = 0; index < ruleItems.length; index++) {
    const item = ruleItems[index];
    const rulePassed = results[index]; //It says true or false based on if the INDEX result has that tag check below for the THEN

    if (rulePassed === true) {
      // For the current item, if it is passed (TRUE) then we update its class to say valid,
      item.className = "valid";
    } else {
      // If its anything but true, so false or null, then we say its invalid.
      item.className = "invalid";
    }

    //Done, loop again until we finish the list.
  }

  rulesCount.textContent = passed + " / 20 passed"; //Displays the text of how many passed
  currentVolume = passed * 5 ;

  if (!(currentVolume >= 100)) {
    // do nothing
  } else {
    currentVolume = 100; // If the volume is already at 100% then it stays at 100%
  }

  volumeFill.style.width = currentVolume + "%"; //Just updates the width
  volumeValue.textContent = currentVolume + "%"; //Updates the text that shows the %
}

// Show/Hide Password code:
const toggleBtn = document.getElementById("togglePassword");
const toggleIcon = document.getElementById("toggleIcon");

toggleBtn.addEventListener("click", function () {
  if (volumeInput.type === "password") {
    volumeInput.type = "text";
    toggleIcon.textContent = "visibility";
    togglePassword.textContent = "Hide";
  } else {
    volumeInput.type = "password";
    toggleIcon.textContent = "visibility_off";
    togglePassword.textContent = "Show";
  }
});

// const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
// const safariNote = document.getElementById("note");
// safariNote.style.display = "none";
// if (isSafari) {
// safariNote.style.display = "block";

//   document.getElementById("browserWarning").textContent = "Sorry you are on Safari: I have done my best to hide the password suggestions in Safari but they apparently ignore the autocorrect off suggestion in HTML, you may get a prompt to save password, sorry about that.";
// }

let captchaPassed = false;

function onCaptchaSuccess() {
  captchaPassed = true;
  document.getElementById("submitVolume").disabled = false;
}

function onCaptchaExpired() {
  captchaPassed = false;
  document.getElementById("submitVolume").disabled = true;
}

document.getElementById("top").scrollIntoView();
