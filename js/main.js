let quotes = [
  {
    author: "Oscar Wilde",
    quote: "Be yourself; everyone else is already taken.",
  },
  { author: "Frank Zappa", quote: "So many books, so little time." },
  {
    author: "Mae West",
    quote: "You only live once, but if you do it right, once is enough.",
  },
  {
    author: "Mahatma Gandhi",
    quote: "Be the change that you wish to see in the world.",
  },
  {
    author: "Robert Frost",
    quote:
      "In three words I can sum up everything I've learned about life: it goes on.",
  },
  {
    author: "Elbert Hubbard",
    quote: "A friend is someone who knows all about you and still loves you.",
  },
  {
    author: "Oscar Wilde",
    quote:
      "To live is the rarest thing in the world. Most people exist, that is all.",
  },
  {
    author: "Stephen Chbosky",
    quote: "We accept the love we think we deserve.",
  },
  {
    author: "Friedrich Nietzsche",
    quote: "Without music, life would be a mistake.",
  },
];

let cloneQuotes = quotes.slice();

const numMainQuotes = quotes.length;

if (localStorage.getItem("Quotes")) {
  quotes = JSON.parse(localStorage.getItem("Quotes"));
  displayAllQuote();
} else {
  displayAllQuote();
}

let newQuote = document.querySelector(".content .new-quote"),
  quote = document.querySelector(".content .quote p"),
  author = document.querySelector(".content .quote h5");

let cloneRadom = 0;
function handleRandomNumber() {
  let random = Math.trunc(Math.random() * quotes.length);
  if (random === cloneRadom) {
    let isRandomEqualQuotesLength =
      random === quotes.length - 1 ? random - 1 : random + 1;
    cloneRadom = isRandomEqualQuotesLength;
    return isRandomEqualQuotesLength;
  } else {
    cloneRadom = random;
    return random;
  }
}

function displayQuote(index) {
  let quoteContent = quotes[index];
  quote.textContent = `"${quoteContent.quote}"`;
  author.textContent = `--${quoteContent.author}`;
}

newQuote.addEventListener("click", () => {
  let number = handleRandomNumber();
  displayQuote(number);
});

let addQuote = document.getElementById("addQuote"),
  authorQuote = document.getElementById("author"),
  addBtn = document.getElementById("add");

addBtn.addEventListener("click", () => {
  if (!addQuote.value || !authorQuote.value) {
    return alert("You Must Add Quote And Your Name");
  }

  receiveQuote();
  clearInput();
  displayAllQuote();

  document.getElementById("close").click();
});

function receiveQuote() {
  let newQuote = {
    author: authorQuote.value,
    quote: addQuote.value,
  };
  quotes.unshift(newQuote);
}

function clearInput() {
  addQuote.value = "";
  authorQuote.value = "";
}

function displayAllQuote(arr = quotes) {
  let sliderContainer = document.getElementById("sliderContainer");

  let box = "";

  for (let i = 0; i < arr.length; i++) {
    box += `
  <div class="px-2 position-relative box">
    <div class="item w-100 h-100" onclick="displayQuote(${i})">
      <div class="info shadow-sm rounded bg-white p-2 h-100 d-grid">
        <h4>${arr[i].author}</h4>
        <p class="text-break overflow-hidden">
        ${arr[i].quote}
        </p>
        </div>
        </div>
      <i class="fa-solid fa-close fs-5 position-absolute" onclick="removeQuote(${i})"></i>
  </div>`;
  }

  sliderContainer.innerHTML = box;
  localStorage.setItem("Quotes", JSON.stringify(arr));
}

function removeQuote(index) {
  quotes.splice(index, 1);
  displayAllQuote();
}

let restoreQuotes = document.getElementById("restoreQuotes");

restoreQuotes.addEventListener("click", restoreMainQuotes);

function restoreMainQuotes() {
  localStorage.setItem("Quotes", JSON.stringify(cloneQuotes));
  quotes = cloneQuotes.slice();
  displayAllQuote();
}
