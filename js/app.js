// shuffle function

// checkmatch function

// keep score

//reset game

// star rating

// timer 

//move counter

/**list of 16 cards / 8 pairs / 8 types
 - make list 
 - 2 of each type 
 
 class card
 - has a type

 - [ array of types ]
 for each type, make 2 cards 'generateCards()'
 - [ array of cards in order ]
 - shuffleCards() will shuffle the cards
 - [ shuffled cards ]
 - attach cards to i elements via class

 if card is clicked, add open show class
 */
(function () {


    class CardManager {
        constructor(types, cards) {
            this.types = [
                'fa-diamond',
                'fa-paper-plane-o',
                'fa-anchor',
                'fa-bolt',
                'fa-cube',
                'fa-leaf',
                'fa-bicycle',
                'fa-bomb'
            ]
        }

        generateCards() {
            //get copy of types, push types and copy to cards
            const copy = this.types.slice();
            this.cards = [...this.types, ...copy]
        }

        shuffleCards() {
            let counter = this.cards.length;

            while (counter > 0) {
                // pick random idx
                let index = Math.floor(Math.random() * counter);

                // decrement counter
                counter--;

                // swap last element with it
                let temp = this.cards[counter];
                this.cards[counter] = this.cards[index];
                this.cards[index] = temp;
            }
        }

        attachClassToCard() {
            const deck = document.querySelector('.deck').querySelectorAll('i');

            let length = deck.length;
            let className;

            for (let i = 0; i < length; i++) {
                className = this.cards[i];
                deck[i].classList.add(className);
            }
        }
    }

    class Game {
        constructor(previousId, cardClickCount) {
            this.cardClickCount = 0;
            this.seconds = 0;
            this.timer;
            this.moves = 0;
            this.wrongMoves = 0;
            this.starIdx = 5;
        }

        init() {
            const cardManager = new CardManager();
            cardManager.generateCards();
            cardManager.shuffleCards();
            cardManager.attachClassToCard();
            this.startTimer();
            this.showMoves();
        }

        onClick() {
            const deck = document.querySelector('.deck');

            deck.addEventListener('click', (event) => {
                if (event.target.className === 'card') {
                    event.target.classList.add('show', 'open');
                    this.cardClickCount++;

                    if (this.cardClickCount % 2 === 0) {
                        this.checkMatch(this.previousId, event.target.id);
                    } else {
                        this.previousId = event.target.id;
                    }

                }
                // event.target.classList.add('show', 'open');
            });
        }

        checkMatch(prevId, currId) {
            const choice1Card = document.getElementById(prevId);
            const choice2Card = document.getElementById(currId);
            const choice1Class = document.getElementById(prevId).getElementsByClassName('fa')[0].classList[1];
            const choice2Class = document.getElementById(currId).getElementsByClassName('fa')[0].classList[1];
            this.trackMoves();

            if (choice1Class === choice2Class) {
                return;
            } else {
                this.wrongMoves++;
                this.showMoves();
                this.determineStars();
                setTimeout(() => {
                    choice1Card.classList.remove('open', 'show');
                    choice2Card.classList.remove('open', 'show');
                }, 500);

            }
        }

        trackMoves() {
            this.moves++;
        }

        showMoves() {
            const moves = document.querySelector(".moves");

            moves.innerHTML = this.moves;
        }

        startTimer() {
            const timer = document.querySelector(".timer");
            this.timer = setInterval(() => {
                this.seconds++
                timer.innerHTML = this.seconds;
            }, 1000);
        }

        determineStars() {
            let stars;
            
            switch (this.moves) {

                case 3:

                    document.querySelectorAll(`.stars li:nth-child(${this.starIdx})`)[0].style.visibility = 'hidden';
                    break;
                case 6:
                    this.starIdx--;
                    document.querySelectorAll(`.stars li:nth-child(${this.starIdx})`)[0].style.visibility = 'hidden';
                    break;
                case 9:
                    this.starIdx--;
                    document.querySelectorAll(`.stars li:nth-child(${this.starIdx})`)[0].style.visibility = 'hidden';
                    break;
                case 12:
                    this.starIdx--;
                    document.querySelectorAll(`.stars li:nth-child(${this.starIdx})`)[0].style.visibility = 'hidden';
                    break;
                case 15:
                    this.starIdx--;
                    document.querySelectorAll(`.stars li:nth-child(${this.starIdx})`)[0].style.visibility = 'hidden';
                    break;
                case 18:
                    this.starIdx--;
                    document.querySelectorAll(`.stars li:nth-child(${this.starIdx})`)[0].style.visibility = 'hidden';
                    break;
            }
        }
    }

    const game = new Game();
    game.init();
    game.onClick();

})();