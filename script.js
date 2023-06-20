let text = '';
let input = document.getElementById('text');
let yourTime = document.getElementById('your-time');
let words = document.getElementById('words');
let countingWords = 0;
let bestTime = document.getElementById('record')
let seconds = 60;
let index = 0;
let increaseIndex = false;
let indexForText = 0;
let timer = false;
let wrongLetter = true;

async function getInfo () {
    const url = `https://api.quotable.io/quotes/random?limit=1`;
    const response = await fetch(url);
    const quotes = await response.json();
    addText(quotes)
}

const init = () => {
    getInfo()
    if (localStorage.getItem('record') === null) {
        localStorage.setItem('record', 0)
    }
    input.addEventListener('input', checkWords)
    yourTime.innerHTML = 'Left time: ' + seconds + ' seconds'
    words.innerHTML = 'Words: ' + countingWords
    bestTime.innerHTML = 'Record: ' + localStorage.getItem('record') + ' words'
 }

 const addText = (quotes) => {
    console.log(quotes)
    let quote = quotes[0].content
    const textField = document.getElementById('initial-text')
    textField.textContent += quote
    text += quote
    if (text.length > 129) {
        textField.style.height = '120px'
    }
    if (text.length > 300) {
        textField.style.height = '170px'
    }
 }

const startTimer = setInterval(() => {
    if (timer === true) {
        --seconds;
        if (seconds === 1) {
            yourTime.innerHTML = 'Your time: ' + seconds + ' second'
        } else {
            yourTime.innerHTML = 'Your time: ' + seconds + ' seconds'
        }
    }
    if (seconds === 0) {
        clearInterval(startTimer)     
        input.disabled = true  
        showRestartButton = document.getElementById('restart')
        showRestartButton.style.visibility = 'visible'      
    }
}, 1000)
 
 
 const checkWords = (e) => {
    timer = true
    let yourLetter = e.target.value.at(-1) 
    let textLetter = text[indexForText] 
    let yourTextSize = e.target.value.length - 1

    if (yourLetter === textLetter && yourTextSize === indexForText) {
        e.target.style.color = 'green'
        ++indexForText
        wrongLetter = false
    } else {
        e.target.style.color = 'red'
        wrongLetter = true
    }


    if (yourTextSize < indexForText) {
        e.target.style.color = 'green'
    }

    if (yourLetter === ' ' && wrongLetter === false) {
        ++countingWords
        words.innerHTML = 'Words: ' + countingWords 
    }

    endCheck(text, yourTextSize)
 }

 const endCheck = (text, yourTextSize) => {
    if (text.length === yourTextSize + 1 && wrongLetter === false) {
        ++countingWords
        words.innerHTML = 'Words: ' + countingWords
        getInfo()
    }

    if (localStorage.getItem("record") === null || countingWords > localStorage.getItem("record")) {
        localStorage.setItem("record", countingWords)
        bestTime.innerHTML = 'Record: ' + localStorage.getItem("record") + ' words'
        words.innerHTML = 'Words: ' + countingWords
        bestTime.style.backgroundColor = 'green'
    }
 }

 const restart = () => {
    location.reload()
 }

window.onload = init
