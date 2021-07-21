const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let quotes = [];

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function completed() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

function newQuote(){
    loading();
    const numberRandom = Math.floor(Math.random() * quotes.length)
    const quote = quotes[numberRandom];
    
    if(!quote.author){
        quoteAuthor.textContent = "Unknow";
    }else{
        quoteAuthor.textContent = quote.author;
    }

    if(quote.text.length > 50){
        quoteText.classList.add("long-quote");    
    }else{
        quoteText.classList.remove("long-quote");
    }
    quoteText.textContent = quote.text;
    completed();
}

async function getQuotes() {
    loading();
    const api_url = "https://type.fit/api/quotes";
    try {
        const response = await fetch(api_url);
        quotes = await response.json();
        newQuote();
    } catch (err) {
        console.log("[quotes]", err)
    }
}

function tweetQuote() {
    const twitter_url = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitter_url, "_blank");
}

twitterBtn.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", newQuote);

getQuotes();