//Global Variables
let n_cards;

// Functions
function cardsNumber() {

    n_cards = prompt('Memory Game - You would like to play with how many cards (4-14 cards)?');

    while (n_cards % 2 !==0 || n_cards === undefined || n_cards < 4 || n_cards > 14) {
        n_cards = prompt(
        `Rules for number of cards:
        - There must be an even number of cards;
        - The number of cards in a game must be between 4 and 14.

        Please pick a number of cards within these conditions:`);
    }

    let list1 = document.querySelector('.row1');
    let list2 = document.querySelector('.row2');

    let card = 
    `<li onclick="rotateCard(this)" class="card">
        <figure>
            <img src="images/front.png" alt="">
        </figure>
    </li>`

    for (i=0; i < n_cards/2; i++) {
        list1.innerHTML = list1.innerHTML + card;
    }

    for (i=0; i < n_cards/2; i++) {
        list2.innerHTML = list2.innerHTML + card;
    }
}

cardsNumber()

function rotateCard(card) {
    
    card.classList.toggle('card_transition');
}