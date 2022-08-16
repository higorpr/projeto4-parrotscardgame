//Global Variables
let n_cards;

// Functions
function cardsNumber() {
    n_cards = prompt('Memory Game - You would like to play with how many cards (4-14 cards)?')
    while (n_cards % 2 !==0) {
        n_cards = prompt('You cannot pick an odd number of cards in a memory game. Please pick an even number between between 4 and 14:')
    }
}