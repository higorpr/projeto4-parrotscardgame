//Global Variables
let n_cards;

// Functions
function cardsNumber() {
    n_cards = prompt('Memory Game - You would like to play with how many cards (4-14 cards)?')
    while (n_cards % 2 !==0 || n_cards === undefined || n_cards < 4 || n_cards > 14) {
        n_cards = prompt(
        `Rules for number of cards:
        - There must be an even number of cards;
        - The number of cards in a game must be between 4 and 14.
        
        Please pick a number of cards within these conditions:`)
    }
}