// global constants
const CARD_SOURCE = 'assets/deck.png';
const CARD_ALT = 'card';
// global element handles
const playerHand = document.querySelector('footer');
const gameField = document.querySelector('main');
const heroDeck = document.querySelector('#hero_deck');

// global variables
let currentCard = null;
let mousePosX = null;
let mousePosY = null;

// functions
function makeCard(e) {
    if (e.button === 0) {
        currentCard = document.createElement('img');
        currentCard.setAttribute('src', CARD_SOURCE);
        currentCard.setAttribute('alt', CARD_ALT);
        // might want to generate an id here too
        currentCard.classList.add('card','held');
        document.body.append(currentCard);
        currentCard.style.left = heroDeck.offsetLeft + 'px';
        currentCard.style.top= heroDeck.offsetTop + 'px';
        mousePosX = e.cleintX;
        mousePosY = e.clientY;
        /**
        console.log('card');
        /**/
    }
}
function drag(e) {
    if (currentCard) {
        currentCard.style.left = currentCard.offsetLeft - (mousePosX - e.clientX) + 'px';
        currentCard.style.top = currentCard.offsetTop - (mousePosY - e.clientY) + 'px';
        mousePosX = e.clientX;
        mousePosY = e.clientY;
        /**
        console.log('drag card');
        /**/
    }
}
function dropCardOnField(e){
    if(currentCard && e.button === 0){
        gameField.append(currentCard);
        /**
        console.log('dropped card (on field)');
        /**/
    }
}
function dropCardInHand(e){
    if(currentCard && e.button === 0){
        playerHand.append(currentCard);
        currentCard.style.top = null;
        currentCard.style.bottom = 0;
        /**
        console.log('dropped card (in hand)');
        /**/
    }
}
function drop(e){
    if(currentCard&& e.button===0){
        let rect = gameField.getBoundingClientRect();
        if(e.clientY > rect.top && e.clientY<rect.bottom ){
            dropCardOnField(e);
        }else{
            dropCardInHand(e);
        }
        currentCard.classList.remove('held');
        currentCard = null;
    }
}

// event bindings
heroDeck.addEventListener('mousedown', makeCard);
document.addEventListener('mousemove',drag);
document.addEventListener('mouseup', drop);