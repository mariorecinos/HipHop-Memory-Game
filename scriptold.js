console.log('%c Hip-Hop MC Memory Game ', 'font-weight: bold; font-size: 20px;color: red; text-shadow: 1px 1px 0 rgb(217,31,38) , 3px 3px 0 rgb(226,91,14) , 5px 5px 0 rgb(245,221,8)');

// Helper functions
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // *Decrement* --

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] =
            [array[randomIndex], array[currentIndex]];
    }
    // Swapping the two indexes around.
    return array;
}

// function shuffle(arr) {
//     const shuffledArr = [...arr];
//     for (let i = shuffledArr.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
//     }
//     return shuffledArr;
// }

// Our code
// Array of card objects
let cards = [
    { value: '2', image: './images/Bronson.jpeg', matched: false },
    { value: '3', image: './images/Diddy.jpeg', matched: false },
    { value: '4', image: './images/Jayz.jpeg', matched: false },
    { value: '5', image: './images/Kanye.jpeg', matched: false },
    { value: '6', image: './images/KRS.jpeg', matched: false },
    { value: '7', image: './images/Mos.jpeg', matched: false },
    { value: '8', image: './images/Nicki.jpeg', matched: false },
    { value: '9', image: './images/Ortiz.jpeg', matched: false },
    { value: '10', image:'./images/PUN.jpeg', matched: false },
    { value: '11', image:'./images/Talib.jpeg', matched: false },

    { value: '2', image: './images/Bronson.jpeg', matched: false },
    { value: '3', image: './images/Diddy.jpeg', matched: false },
    { value: '4', image: './images/Jayz.jpeg', matched: false },
    { value: '5', image: './images/Kanye.jpeg', matched: false },
    { value: '6', image: './images/KRS.jpeg', matched: false },
    { value: '7', image: './images/Mos.jpeg', matched: false },
    { value: '8', image: './images/Nicki.jpeg', matched: false },
    { value: '9', image: './images/Ortiz.jpeg', matched: false },
    { value: '10', image:'./images/PUN.jpeg', matched: false },
    { value: '11', image:'./images/Talib.jpeg', matched: false },
]
// The property matched in this object likely represents whether the card has been matched with another card in a memory matching game. By default, when the card is initially created, it has not yet been matched with any other card. Therefore, setting matched: false when creating the card object makes sense.


/* Cached Elements Making a quick change*/
// Selecting the four cards elements
cardEls = document.querySelectorAll('.card')
// This accessing all four of our elements.


/*------STATE VARIABLES------*/
// Grabbing from the class card in the images(HTML)
let firstGuess = null;
let canGuess = true;
let flippedCards = 0;
let guesses = 0;



/*------FUNCTIONS------*/
cardEls.forEach(function (el, index) {
    el.addEventListener('click', function () {
        if (index === firstGuess || cards[index].matched === true || !canGuess) {
            alert('invalid guess')
            return;
            // This if statement isnt allowing you to click on the same card if your first guess and cards[index] match. !canguess also reinforces the same thing.
        }
        let clickedCard = cards[index];
        //The card that is clicked is retrieving the element from the cards array at the specific index
        el.setAttribute('src', clickedCard.image);
        // So for each element that is clicked this function runs.
        if (firstGuess === null) {
            firstGuess = index;
            // if first guess === null then store the guess
        } else {
            guesses++
            document.querySelector('#guesses').textContent = guesses
            if (cards[firstGuess].value === cards[index].value) {
                cards[firstGuess].matched = true;
                cards[index].matched = true;
                // If the firstGuess value from the array matches the seconds guesses index.value then its a match
                // Its a match!
                // Once there is a match then return back to null
                firstGuess = null
                flippedCards += 2
                // Check for win and reset if so
                if (flippedCards === cards.length) {
                    resetGame()
                }

            } else {
                canGuess = false;
                setTimeout(function () {
                    cardEls[firstGuess].setAttribute('src', './images/red2.svg')
                    cardEls[index].setAttribute('src', './images/red2.svg')
                    firstGuess = null;
                    canGuess = true;
                    // no match
                    // Cards will flip back to the other side.
                }, 1500)
            }
        }
    });
});
shuffle(cards);

// For each card elements index, add a click event listener function.

function resetGame() {
    canGuess = false;

    setTimeout(function () {
        firstGuess = null;
        canGuess = true;
        flippedCards = 0;
        guesses = 0;

        document.querySelector('#guesses').textContent = guesses

        cardEls.forEach(function (el, index) {
            el.setAttribute('src', './images/red2.svg')
        })

        cards.forEach(function(card, index){
            card.matched = false;
        })
        // Once the cards are chosen, this function allows everything to shuffle without refreshing the page.
        shuffle(cards)

    }, 2000)




}

document.querySelector('#reset').addEventListener('click', function(){
    resetGame()
})
