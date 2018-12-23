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
            this.correct = 0;
            this.wrongMoves = 0;
            this.starIdx = 5;
            this.stars = 5;
            this.ended = false;
            this.cardManager = new CardManager();
        }

        init() {

            this.cardManager.generateCards();
            this.cardManager.shuffleCards();
            this.cardManager.attachClassToCard();
            this.startTimer();
            this.showMoves();
            this.onRestart();
            this.onClick();
        }

        onClick() {
            const deck = document.querySelector('.deck');

            deck.addEventListener('click', (event) => {
                if (event.target.className.includes('card')) {
                    event.target.classList.add('show', 'open');
                    this.cardClickCount++;

                    if (this.cardClickCount % 2 === 0) {
                        this.checkMatch(this.previousId, event.target.id);
                    } else {
                        this.previousId = event.target.id;
                    }

                }
            });
        }

        onRestart() {
            const button = document.querySelector('.restart');

            button.addEventListener('click', () => this.restart());
        }

        checkMatch(prevId, currId) {
            const choice1Card = document.getElementById(prevId);
            const choice2Card = document.getElementById(currId);
            const choice1Class = document.getElementById(prevId).getElementsByClassName('fa')[0].classList[1];
            const choice2Class = document.getElementById(currId).getElementsByClassName('fa')[0].classList[1];
            this.trackMoves();

            if (choice1Class === choice2Class) {
                this.correct++;
                this.showScore();
                this.showMoves();
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

        startTimer(status) {

            const timer = document.querySelector(".timer");
            this.timer = setInterval(() => {

                this.seconds++
                timer.innerHTML = this.seconds;
            }, 1000);
        }

        restart() {

            this.stars = 5;
            this.seconds = 0;
            this.moves = 0;
            this.correct = 0;
            this.starIdx = 5;
            this.cardClickCount = 0;
            this.showMoves();
            this.previousId = null;
            $('#winModal').modal('hide');

            const cardList = document.querySelector('.deck').getElementsByTagName('div');
            const starList = document.querySelector('.stars').getElementsByTagName('li');

            for (let card of cardList) {
                card.classList.remove('show', 'open');
            }

            for (let star of starList) {
                star.style.display = 'inline';
            }
        }

        determineStars() {

            switch (this.moves) {

                case 3:
                    this.stars = 4;
                    document.querySelectorAll(`.stars li:nth-child(${this.starIdx})`)[0].style.display = 'none';
                    break;
                case 6:
                    this.starIdx--;
                    this.stars = 3;
                    document.querySelectorAll(`.stars li:nth-child(${this.starIdx})`)[0].style.display = 'none';
                    break;
                case 9:
                    this.starIdx--;
                    this.stars = 2;
                    document.querySelectorAll(`.stars li:nth-child(${this.starIdx})`)[0].style.display = 'none';
                    break;
                case 12:
                    this.starIdx--;
                    this.stars = 1;
                    document.querySelectorAll(`.stars li:nth-child(${this.starIdx})`)[0].style.display = 'none';
                    break;

            }
        }

        showScore() {
            if (this.correct === 8) {
                setTimeout(() => {
                    const winString = `You win. Star rating: ${this.stars}. You took ${this.seconds} seconds. 
                    Would you like to play again?`

                    const modalBody = document.querySelector('.modal-body');
                    modalBody.innerHTML = winString;
                    this.promptReplay();

                    $('#winModal').modal('show');
                }, 500);

            }
        }

        promptReplay() {
            const playAgain = document.querySelector('.play-again');

            playAgain.addEventListener('click', () => {
                this.restart();
            })
        }


    }

    const game = new Game();
    game.init();

})();