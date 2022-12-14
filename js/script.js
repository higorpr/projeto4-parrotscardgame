// Global Constants
const gifList = ['gifs/bobrossparrot.gif', 'gifs/explodyparrot.gif',
    'gifs/fiestaparrot.gif', 'gifs/metalparrot.gif',
    'gifs/revertitparrot.gif', 'gifs/tripletsparrot.gif',
    'gifs/unicornparrot.gif']; // List of all availabe gifs

// Global Variables
let n_cards; // Number of cards in the game (picked by user)
let cardObjs = []; // List of card Objects
let cards_array = []; // List to hold index of gifs on each card (to be scrambled)
let playsCount = 0; // Number of Plays
let nTurned = 0; // Number of current turned cards (gif side showing)
let tagTurned = []; // Array for storing the gif tag for each turned card.
let idxTurned = []; // Array for storing the turned cards index in the array of card Objects.
let nTrues = 0; // Number of accumulated turned cards+
let timer;
let time = 0;

// Functions
function cardDisplay() {
    /**
     * This function gets the number of cards the user wants to play with,
     * sets this number of cards in 2 rows and creates an array of card
     * Objects.
     */

    n_cards = Number(prompt('Memory Game - You would like to play with how many cards (4-14 cards)?'));
    while (n_cards % 2 !== 0 || n_cards === undefined || n_cards < 4 || n_cards > 14) {
        n_cards = Number(prompt(
            `Rules for number of cards:
        - There must be an even number of cards;
        - The number of cards in a game must be between 4 and 14.

        Please pick a number of cards within these conditions:`));
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

    // Showing cards before game start:
    showBegin();

    // Start the timer
    timer = setInterval(updateCounter, 10);
}

function showBegin() {
    /**
     * This function turns all cards and then flips them back.
     */

    nTurned = 2; // To avoid clicks

    for (i = 0; i < cardObjs.length; i++) {
        const card = document.querySelector(`.${cardObjs[i].cardClass}`);
        card.innerHTML =
            `<figure>
                <img src="${gifList[cardObjs[i].cardTag]}" alt="">
            </figure>`;
    }

    const myTimeout = setTimeout(hideAllBegin, 2000);
    nTurned = 0;
}

function hideAllBegin() {    
    for (i = 0; i < cardObjs.length; i++) {
        const card = document.querySelector(`.${cardObjs[i].cardClass}`);
        card.innerHTML =
            `<figure>
                <img src="images/front.png" alt="">
            </figure>`;
    }
}

function rotateCard(card) {
    /**
     * This function rotates the clicked cards, checks if the rotated cards form a pair,
     * responds accordingly to this check and updates the number of plays the user has made.
     * 
     * INPUTS:
     *  - card: HTML object containing the list entry <li> of the clicked card.
     */

    // Get idx of clicked card
    const cardNum = card.classList[1];
    idx = cardNum.slice(6);
    // Check if there are already 2 turned cards
    if (nTurned < 2) {
        // Check if the clicked card is already turned
        if (cardObjs[idx].turned === false) {
            cardObjs[idx].turned = true;
            card.classList.add('card_transition'); // Rotates the card
            tagTurned.push(cardObjs[idx].cardTag); // Saves the tag of turned cards (temporary)
            idxTurned.push(idx); // Saves the index for turned cards (temporary)
            nTurned++;
            card.innerHTML =
                `<figure>
                <img src="${gifList[cardObjs[idx].cardTag]}" alt="">
            </figure>`;
        }
        // Check if turned cards are a pair
        if (nTurned === 2) {

            if (tagTurned[0] !== tagTurned[1]) { // Case cards are NOT a match
                const timeOut = setTimeout(unturnCards, 2000);

            } else { // Case cards ARE a match
                const timeOut = setTimeout(matchingCards, 0)
            }
        }
    }
}

function unturnCards() {
    /**
     * This function unturns cards,
     * erases the arrays tagTurned and idxTurned,
     * sets nTurned back to 0 and
     * changes the "turned" Object property of turned cards back to false. */

    for (i = 0; i < idxTurned.length; i++) { // Change Obj. properties and unturn cards
        cardObjs[idxTurned[i]].turned = false;

        const targetCard = document.querySelector(`.${cardObjs[idxTurned[i]].cardClass}`)
        const figElement = targetCard.children;

        targetCard.classList.remove('card_transition');
        figElement[0].innerHTML = `<img src="images/front.png" alt=""></img>`;
    }
    tagTurned = [];
    idxTurned = [];
    nTurned = 0;
    playsCount++;
}

function matchingCards() {
    /**
     * This function checks if the game ended when 2 matching cards are turned and
     * ends the game when all pairs are found.
     */

    tagTurned = [];
    idxTurned = [];
    nTurned = 0;
    playsCount++;
    nTrues = nTrues + 2;
    if (n_cards === nTrues) {
        const myTimeOut = setTimeout(resetAll, 1000);
        clearInterval(timer);
    }
}

function resetAll() {
    /**
     * Function that resets the game, clearing the card rows and all variables.
     */

    alert(`You won in ${2 * playsCount} plays and in ${time.toFixed(2)} seconds!`);

    const reset = confirm('Would you like to play again?');
    if (reset === true) {
        // Reset global variables
        cardObjs = [];
        cards_array = [];
        playsCount = 0;
        nTurned = 0;
        tagTurned = [];
        idxTurned = [];
        nTrues = 0;
        time = 0;
        timer = undefined;

        // Clear page
        const rows = document.querySelectorAll('.card_holder');
        for (i = 0; i < rows.length; i++) {
            rows[i].innerHTML = '';
        }

        // Reset timer
        const counter = document.querySelector('.timer');
        counter.innerHTML = time.toFixed(2);

        // Reset the game
        cardDisplay();
    }

}

function updateCounter() {
    /**
     * Function that updates the counter on the main game page.
     */

    const counter = document.querySelector('.timer')
    time += 0.01;
    counter.innerHTML = time.toFixed(2);
}

function randomizer() {
    /**
     * This function serves as the randomizer function
     * to be used in Array.sort() methods.
     */

    return Math.random() - 0.5;
}