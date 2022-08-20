// Global Constants
const gifList = ['gifs/bobrossparrot.gif', 'gifs/explodyparrot.gif',
    'gifs/fiestaparrot.gif', 'gifs/metalparrot.gif',
    'gifs/revertitparrot.gif', 'gifs/tripletsparrot.gif',
    'gifs/unicornparrot.gif']; // List of all availabe gifs

// Global Variables
let n_cards; // Number of cards in the game (picked by user)
let cardObjs = []; // List of card Objects
let cards_array = []; // List to hold idx of gifs on each card (to be scrambled)
let playsCount = 0; // Number of Plays

// Functions
function cardDisplay() {

    n_cards = prompt('Memory Game - You would like to play with how many cards (4-14 cards)?');
    while (n_cards % 2 !== 0 || n_cards === undefined || n_cards < 4 || n_cards > 14) {
        n_cards = prompt(
            `Rules for number of cards:
        - There must be an even number of cards;
        - The number of cards in a game must be between 4 and 14.

        Please pick a number of cards within these conditions:`);
    }

    const cardsRow = n_cards / 2;

    let list1 = document.querySelector('.row1');
    let list2 = document.querySelector('.row2');

    // Populate first row
    for (i = 0; i < cardsRow; i++) {
        list1.innerHTML = list1.innerHTML +
            `<li onclick="rotateCard(this)" class="card number${i}">
            <figure>
                <img src="images/front.png" alt="">
            </figure>
        </li>`;

        // Define cardTags
        cards_array.push(i);
    }

    // Populate second row
    for (i = 0; i < cardsRow; i++) {
        list2.innerHTML = list2.innerHTML +
            `<li onclick="rotateCard(this)" class="card number${i + n_cards / 2}">
        <figure>
            <img src="images/front.png" alt="">
        </figure>
        </li>`;

        // Define cardTags
        cards_array.push(i);
    }

    // Randomize cardTags
    cards_array.sort(randomizer)


    // Create a card object for each placed card
    for (i = 0; i < n_cards; i++) {
        cardObjs.push({ cardClass: `number${i}`, cardTag: cards_array[i], turned: false });
    }
}

cardDisplay();

console.log(gifList)


function randomizer() {
    return Math.random() - 0.5;
}

function rotateCard(card) {

    // Getting idx of clicked card
    const cardNum = card.classList[1];
    idx = cardNum.slice(6);

    if (cardObjs[idx].turned === false) {
        
        cardObjs[idx].turned = true;
        card.classList.toggle('card_transition');
        

        card.innerHTML =
            `<figure>
                <img src="${gifList[cardObjs[idx].cardTag]}" alt="">
            </figure>`;
        // 
        // const targetClass = card.classList[1];
        // console.log(targetClass);
        // const idx = name_array.indexOf(targetClass);
        // console.log(idx)
        // const tagIdx = cards_array[idx]
        // console.log(tagIdx)
        // const targetGif = gifList[tagIdx]
        // console.log(targetGif)
    }
}
