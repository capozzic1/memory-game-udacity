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
    }

    const t = new CardManager();
    t.generateCards();
    t.shuffleCards();

})();