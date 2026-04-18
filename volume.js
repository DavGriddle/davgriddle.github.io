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
});

function checkRules(text) {
  const results = [
    text.match(/[A-Z]/g) !== null,
    (text.match(/[A-Z]/g) || []).length <= 3,
    text.length > 12,
    text.match(/[^a-zA-Z0-9]/) !== null,
    !text.toLowerCase().includes("password"),
    text.match(/[0-9]/) !== null,
    text.toLowerCase().includes("e"),
    !text.toLowerCase().includes("a"),
    text.match(/^[a-zA-Z]/) !== null,
    text.match(/[0-9]$/) !== null,
    text.toLowerCase().includes("vol"),
    !text.includes(" "),
    (text.match(/[aeiouAEIOU]/g) || []).length >= 2,
    (text.match(/[^aeiouAEIOU\W\d]/g) || []).length >= 3,
    text.match(/[a-z]/) !== null,
    text.toLowerCase().includes("loud"),
    text.includes("5"),
    !text.includes("7"),
    !text.toLowerCase().includes("zzz"),
    text.match(/(.)\1/) !== null,
  ];

  return results; // This will return an array of true or false matching the order of validations above!
}

function updateUI(results) {
  const passed = results.filter(r => r === true).length;

  ruleItems.forEach(function (item, index) {
    if (results[index]) {
      item.className = "valid";
    } else {
      item.className = "invalid";
    }
  });

  rulesCount.textContent = passed + " / 20 passed";

  currentVolume = passed * 5; //Each pass is 5%
  volumeFill.style.width = currentVolume + "%"; //Just updates the width
  volumeValue.textContent = currentVolume + "%"; //Updates the text that shows the %
}