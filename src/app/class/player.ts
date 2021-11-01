import { Card } from "./card";
import { DeckCard } from "./deckCard";
export class Player {

    //properties
    private name!: String;
    private money: number = 1000000;
    private bet: number = 1000;
    private betConfirm: boolean = false;
    private cardsOnHand: Card[] = [];
    private cardPoints: number = 0;
    private myTurn: boolean = false;
    private endTurn: boolean = false;

    //constructor
    constructor(name: String) { 
        this.name = name;
    }

    //method
    //method 1: Place bet with money
    public placeBet(bet: number): void {
        this.money -= bet;
        this.bet = bet;
        this.BetConfirm = true;
    }

    //method 2: Draw card
    public drawCard(deckcard: DeckCard ): void {
        this.cardsOnHand.push(deckcard.removeCardInList());
    }

    //method 3: set name
    set Name(name: String) {
        this.name = name;
    }

    //method 4: get name
    get Name(): String {
        return this.name;
    }

    //method 5: Calculate card point
    private calCardPoint(cardlist: Card[]){
        this.cardPoints = 0;
        let numAceCard: number = 0;
        cardlist.forEach( card => {
            if (card.CardNum === "King" || card.CardNum === "Queen" || card.CardNum === "Jack") {//King, Queen, jack
                this.cardPoints += 10;
            } else if(card.CardNum === "Ace"){//Ace card
                this.cardPoints += 11;
                numAceCard += 1;
            } else {//other card( 1 to 10)
                this.cardPoints += Number(card.CardNum);
            }
        });

        //loop when player have card "Ace"
        for (let i = 0; i < numAceCard; i++) {
            //change point card "Ace" when total point is over 21
            if (this.cardPoints > 21) {
                this.cardPoints -= 10;
            }
            
        }

    }

    //method 6: get card point
    public get CardPoint(): number{
        this.calCardPoint(this.cardsOnHand);
        return this.cardPoints;
    }

    //method 7: get card on hand
    public get CardOnHand(): Card[]{
        return this.cardsOnHand;
    }

    //method 8: get money
    public get Money(): number{
        return this.money;
    }

    //method 9: get my turn
    public get MyTurn(): boolean{
        return this.myTurn;
    }

    //method 10: get bet
    public get Bet(): number{
        return this.bet;
    }

    //method 11: get bet confirm
    public get BetConfirm(): boolean{
        return this.betConfirm;
    }

    //method 12: get end turn
    public get EndTurn(): boolean{
        return this.endTurn;
    }

    //method 13: set end turn
    public set EndTurn(endTurn: boolean){
        this.endTurn = endTurn;
    }

    //method 14: set money
    public set Money(money: number){
        this.money = money;
    }

    //method 15: set bet confirm
    public set BetConfirm(confirm: boolean){
        this.betConfirm = confirm;
    }

    //method 16: set bet
    public set Bet(bet: number){
        this.bet = bet;
    }

    //method 17: set my turn
    public set MyTurn(turnEnd: boolean){
        this.myTurn = turnEnd;
    }

    
    public set CardOnHand(cardlist: Card[]){
        this.cardsOnHand = cardlist;
    }
}