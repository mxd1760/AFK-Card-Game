// global constants
const CARD_SOURCE = 'assets/deck.png';
const CARD_ALT = 'card';
// global element handles
const playerHand = document.querySelector('footer');
const gameField = document.querySelector('main');
const opponentField = document.querySelector("#opponentField")
const playerField = document.querySelector("#playerField")
const heroDeck = document.querySelector('#hero_deck');


// global variables
const cards = {
    oHand:[],
    oField:[],
    pField:[],
    pHand:[]
}
let currentCard = null;
let mousePosX = null;
let mousePosY = null;

class HeroCard {
    constructor(/**ID */) {
        this.health = 99;
        this.defence = 99;
        this.attack = 99;
    }
}


// functions
function displayInfo(e) {
    this.cardInfo = document.createElement('div');
    document.body.append(this.cardInfo);
    let health = document.createElement('h2');
    let defence = document.createElement('h2');
    let attack = document.createElement('h2');
    this.cardInfo.append(health, defence, attack);
    health.innerText = `HP : ${this.cardInstance.health}`;
    defence.innerText = `DEF: ${this.cardInstance.defence}`;
    attack.innerText = `ATK: ${this.cardInstance.attack}`;
    this.cardInfo.classList.add('info');
    this.cardInfo.style.top = this.getBoundingClientRect().top + 'px';
    this.cardInfo.style.left = (this.getBoundingClientRect().left - this.cardInfo.offsetWidth) + 'px';
    /** *
    console.log("mouseenter event");
    /** */
}
function hideInfo(e) {
    if (this.cardInfo) {
        this.cardInfo.remove();
    }
    /** *
    console.log("mouseleave event");
    /** */
}
function directHideInfo(card) {
    if (card.cardInfo) {
        card.cardInfo.remove();
    }
}
function makeCard(e) {
    if (e.button === 0) {
        currentCard = document.createElement('img');
        currentCard.setAttribute('src', CARD_SOURCE);
        currentCard.setAttribute('alt', CARD_ALT);
        // might want to generate an id here too
        currentCard.classList.add('card', 'held');
        document.body.append(currentCard);
        currentCard.style.left = heroDeck.offsetLeft + 'px';
        currentCard.style.top = heroDeck.offsetTop + 'px';
        mousePosX = e.cleintX;
        mousePosY = e.clientY;
        currentCard.cardInstance = new HeroCard(/*Card ID */);
        /**
        console.log('card');
        /**/
    }
}
function pickupCard(e) {
    if (e.button === 0) {
        let rect = this.getBoundingClientRect();
        currentCard = this;
        directHideInfo(currentCard);
        currentCard.classList.add('held');
        currentCard.style.top = rect.top + 'px';
        currentCard.style.left = rect.left + 'px';
        mousePosX = e.clientX;
        mousePosY = e.clientY;
        currentCard.removeEventListener('mousedown', pickupCard);
        if(cards.pField.includes(currentCard)){
            cards.pField.splice(cards.pField.indexOf(currentCard),1);
        } else if(cards.pHand.includes(currentCard)){
            cards.pHand.splice(cards.pHand.indexOf(currentCard),1);
        } else{
            /**debug */
            console.log("held card not found in cards");
            /** */
        }
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
function attackOpponentCard(e){
    if (currentCard && e.button === 0){
        /**debug */
        opponentField.append(currentCard);// add card to field for now
        cards.oField.push(currentCard);
        console.log("DEBUG: Card Placed in opponent Field");
        /** */
    }
}
function dropCardOnField(e) {
    if (currentCard && e.button === 0) {
        playerField.append(currentCard); // play card on field
        currentCard.addEventListener('mousedown',pickupCard);
        cards.pField.push(currentCard);

        /**
        console.log('dropped card (on field)');
        /**/
    }
}
function dropCardInHand(e) {
    if (currentCard && e.button === 0) {
        playerHand.append(currentCard);
        cards.pHand.push(currentCard);
        currentCard.style.top = null;
        currentCard.style.bottom = 0;
        currentCard.addEventListener('mousedown', pickupCard);
        /**
        console.log('dropped card (in hand)');
        /**/
    }
}
function drop(e) {
    if (currentCard && e.button === 0) {
        let rect = playerField.getBoundingClientRect();
        let rect2 = opponentField.getBoundingClientRect();
        if (e.clientY > rect.top && e.clientY < rect.bottom) {
            dropCardOnField(e);
        } else if (e.clientY > rect2.top && e.clientY < rect2.bottom){
            attackOpponentCard(e); 
        } else {
            dropCardInHand(e);
        }
        // Attatch hover event
        currentCard.addEventListener('mouseenter', displayInfo);
        currentCard.addEventListener('mouseleave', hideInfo);
        currentCard.classList.remove('held');
        currentCard = null;
    }
}

// event bindings
heroDeck.addEventListener('mousedown', makeCard);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', drop);