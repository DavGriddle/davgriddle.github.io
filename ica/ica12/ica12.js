let newbtn = document.querySelector("#js-new-quote");
let answerBtn = document.querySelector("#js-tweet");
newbtn.addEventListener("click", getQuote);

const endpoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion";

let current = {
  question: "",
  answer: "",
};

async function getQuote() {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const json = await response.json();
    console.log(json);

    displayQuote(json.question);
    current.question = json.question;
    current.answer = json.answer;
    console.log(current.answer);
  } catch (err) {
    console.log(err);
    alert("Failed to fetch new quote");
  }
}
const answerText = document.querySelector("#js-answer-text");

function displayQuote(quote) {
  answerText.textContent = "";
  const quoteText = document.querySelector("#js-quote-text");
  quoteText.textContent = quote;
}

getQuote();

function showAnswer() {
  answerText.textContent = current.answer;
}

answerBtn.addEventListener("click", showAnswer);
