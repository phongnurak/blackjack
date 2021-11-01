import { Card } from './card';
export class DeckCard {
    /*
    Clubs : ดอกจิก 
    Diamond : ข้าวหลามตัด 
    Heart : โพแดง 
    spades : โพดำ
  */

    //properties
    private cardSymbolsArray: String[] = ["Clubs", "Diamond", "Heart", "spades"];
    private cardNumArray: String[] = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];
    private cardList: Card[] = [new Card("a", "a")];

    //constructor <----
    constructor() {
        this.addCardList();
        this.shuffleCard();
    };


    //method <----
    //method 1: add Card in deck
    public addCardList(): void {
        this.cardList = [];
        this.cardSymbolsArray.forEach((cardSymbol) => {
            this.cardNumArray.forEach((cardNum) => {
                let card = new Card(cardSymbol, cardNum);
                this.cardList.push(card);
            });
        });
        this.shuffleCard();
    }

    //method 2: remove Card in list
    public removeCardInList(): Card {
        let cardRm: Card | any = this.cardList.pop();
        return cardRm;
    }

    //method 3: shuffle
    private shuffleCard() {
        let currentIndex = this.cardList.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = this.cardList[currentIndex];
            this.cardList[currentIndex] = this.cardList[randomIndex];
            this.cardList[randomIndex] = temporaryValue;
        }
    }

    //method 4: get card in deck
    public get CardList(): Card[] {
        return this.cardList;
    }

    
}