
import { Dealer } from "./dealer";
import { DeckCard } from "./deckCard";
import { Player } from "./player";

export class BlcakjackGame {
    //properties
    private deckcard!: DeckCard;
    private player: Player[] = [];
    private dealer!: Dealer;
    private currentTurn: number = 0;
    private confirmBetAll: boolean = false;
    private allPlayerEndTurn: boolean = false;
    private gameStarted: boolean = false;
    private canPlayAgain: boolean = false;


    //constructor
    constructor(deck: DeckCard, dealer: Dealer) {
        this.deckcard = deck;
        this.dealer = dealer;
    }

    //method
    //method 1: add player in to the game
    public addPlayer(player: Player): void {
        this.player.push(player);
    }

    //method 2: add dealer in to the game
    public addDealer(dealer: Dealer): void {
        this.dealer = dealer;
    }

    //method 3: deal out card for each player and dealer
    public dealOutCard(): void {
        //loop players
        this.player.forEach((playerObj) => {
            for (let i = 0; i < 2; i++) {
                playerObj.drawCard(this.deckcard);

            }
        });
        this.dealer.drawCard(this.deckcard);
        this.dealer.drawCard(this.deckcard);
    }

    //method 4: get player in game
    public get PlayerInGame(): Player[] {
        return this.player;
    }

    //method 5: get allPlayerEndTurn
    public get AllPlayerEndTurn(): boolean {
        return this.allPlayerEndTurn;
    }

    //method 6: get GameStarted
    public get GameStarted(): boolean {
        return this.gameStarted;
    }

    //method 7: set GameStarted
    public set GameStarted(gameStarted: boolean) {
        this.gameStarted = gameStarted;
    }

    //method 8: set AllPlayerEndTurn
    public set AllPlayerEndTurn(allEndTurn: boolean) {
        this.allPlayerEndTurn = allEndTurn;
    }

    //method 9: set deck 
    public set Deckcard(deckcard: DeckCard) {
        this.deckcard = deckcard;
    }

    //method 10: get deck ConfirmBetAll
    public get ConfirmBetAll(): boolean {
        return this.confirmBetAll;
    }
    //method 11: get dealer
    public get Dealer(): Dealer {
        return this.dealer;
    }

    //method 12: check bet confirm for each player
    public checkBetConfirm(): void {
        console.log("Check confirm bet")
        let numPlayerConBet = 0;// count player confirm bet
        // loop for check confirm bet 
        this.PlayerInGame.forEach((player) => {
            if (player.BetConfirm === true) {
                numPlayerConBet += 1;
            }
        });

        //player confirm bet = player in game
        if (this.player.length === numPlayerConBet) {
            this.confirmBetAll = true;
            console.log("Confirm bet")
            this.PlayerInGame[this.currentTurn].MyTurn = true;//Player index 0, Start game   
            this.dealOutCard();
            this.checkTurn(false);
        } else {
            console.log("Not confirm bet");
        }
    }

    //method 13: next turn
    public nextTurn(): void {
        console.log("Curent turn : " + this.currentTurn);
        console.log("Number of player: " + this.PlayerInGame.length);

        //check lasted player?
        // if (this.checkLastedPlayerTurn()) {//lasted player || this.currentTurn + 1 === this.PlayerInGame.length
        //     console.log("++++++ Lasted turn : " + this.currentTurn);
        //     this.PlayerInGame[this.currentTurn].MyTurn = false;
        //     this.PlayerInGame[this.currentTurn].EndTurn = true;
        // } else {//not lasted player
            console.log("Next turn " + this.currentTurn);
            this.PlayerInGame[this.currentTurn].MyTurn = false;// current player set turn = false
            this.PlayerInGame[this.currentTurn].EndTurn = true;// current player set endtrun = true
            this.currentTurn += 1;//next index in PlayerInGame
            this.PlayerInGame[this.currentTurn].MyTurn = true;// Next player set turn = true
        // }
        this.checkTurn(false);
        this.checkAllTurnPlayer();
    }

    //method 14: Check all turn of player
    private checkAllTurnPlayer(): void {
        console.log("Check player turn");
        let countPlayerEndTurn: number = 0;
        this.PlayerInGame.forEach((player) => {
            if (player.EndTurn) {
                console.log("player : " + player.Name + " end game");
                countPlayerEndTurn += 1;
            }
        });

        if (countPlayerEndTurn === this.player.length) {
            this.allPlayerEndTurn = true;
            console.log("all player end turn");
            this.turnDealer();
        }
    }

    //method 15: Compare player point and daeler point
    public calComparePoint(): void {
        if (this.dealer.CardPoint > 21) {
            //dealer lose
            console.log("Dealer lose");
            this.PlayerInGame.forEach((player) => {
                if (player.CardPoint < 21) {
                    let betReward = player.Bet * 2;// player get bet
                    console.log("Bet reward : " + betReward);
                    player.Money += betReward;
                    this.dealer.Money -= betReward;

                } else if (player.CardPoint === 21) {
                    let betReward = player.Bet * 3;// player get bet
                    console.log("Bet reward : " + betReward);
                    player.Money += betReward;
                    this.dealer.Money -= betReward;
                }
            });
        } else {
            //compare card
            this.PlayerInGame.forEach((player) => {
                //1. Player win when point = 21
                if (player.CardPoint === 21 && player.CardOnHand.length != 5) {
                    console.log("Player : " + player.Name + " Win Blackjack");
                    let betReward = player.Bet + (player.Bet * 2);// player get bet
                    console.log("Bet reward : " + betReward);
                    player.Money += betReward;
                    player.Bet = 1000;//set bet default
                    this.dealer.Money -= betReward;
                }
                //2. Player win when card on hand is not eaqual 5 and point less than 21
                else if (player.CardPoint <= 21 && player.CardOnHand.length === 5) {
                    console.log("Player : " + player.Name + " When card on hand = 5");
                    let betReward = player.Bet + (player.Bet * 1.5);// player get bet
                    console.log("Bet reward : " + betReward);
                    player.Money += betReward;
                    player.Bet = 1000;//set bet default
                    this.dealer.Money -= betReward;
                }
                //3. Player win 
                else if (player.CardPoint > this.dealer.CardPoint && player.CardPoint < 21) {
                    console.log("Player : " + player.Name + " Win -> player card point more than dealer");
                    let betReward = player.Bet * 2;// player get bet

                    player.Money += betReward;
                    console.log("total Money : " + player.Money);
                    player.Bet = 1000;//set bet default
                    this.dealer.Money -= betReward;
                }
                //4. Draw
                else if (player.CardPoint === this.dealer.CardPoint) {
                    console.log("Player : " + player.Name + " and Dealer Draw");
                    player.Money += player.Bet;
                    player.Bet = 1000;//set bet default
                }
                //5. Player lose
                else if (player.CardPoint < this.dealer.CardPoint || player.CardPoint > 21) {
                    console.log("Player : " + player.Name + " lose");
                    player.Bet = 1000;//set bet default
                    this.dealer.Money += player.Bet;
                }
            });
        }

    }

    //method 16: turn dealer
    public turnDealer(): void {
        console.log("::::: Turn Dealer :::::");
        this.dealer.OpenHiddenCard = true;
        while (this.dealer.CardPoint < 16) {
            this.dealer.drawCard(this.deckcard);
        }
        this.calComparePoint();
        console.log(this.PlayerInGame);
        // this.gameStarted = false;
        this.canPlayAgain = true;
    }

    //method 17: get canPlayAgain
    public get CanPlayAgain(): boolean {
        return this.canPlayAgain;
    }

    //method 18: set canPlayAgain
    public set CanPlayAgain(canPlayAgain: boolean) {
        this.canPlayAgain = canPlayAgain;
    }

    //method 19: play game
    public playGame(): void {
        console.log("::::: New game :::::")
        this.removePlayer();
        if (this.player.length === 0) {
            console.log("No player in game");
            this.gameStarted = false;
            this.canPlayAgain = false;
            this.AllPlayerEndTurn = false;
            this.confirmBetAll = false;
        } else {
            console.log(this.player)
            this.deckcard.addCardList();
            this.GameStarted = true;
            this.resetProperties();
        }
    }

    //method 20: Reset properties
    private resetProperties(): void {
        //reset properties
        this.AllPlayerEndTurn = false;
        this.currentTurn = 0;
        this.confirmBetAll = false;

        //reset dealer properties 
        this.dealer.CardOnHand = [];
        this.dealer.OpenHiddenCard = false;

        //reset player properties 
        this.PlayerInGame.forEach((player) => {
            player.Bet = 1000;
            player.BetConfirm = false;
            player.CardOnHand = [];
            player.EndTurn = false;
            player.MyTurn = false;
        });
        console.log(this.dealer);
    }

    //method 21: check turn player, player click stand or draw card
    public checkTurn(stand: boolean): void {
        //check card point if player card point = 21, player end turn 
        console.log("check turn");
        let curPlayer = this.PlayerInGame[this.currentTurn];
        let nextPlayer = this.PlayerInGame[this.currentTurn + 1];

        // player no stand
        if (!stand) {
            console.log("no stand");
            if (curPlayer.CardPoint >= 21 || (curPlayer.CardPoint < 21 && curPlayer.CardOnHand.length === 5)) {
                if (!this.checkLastedPlayerTurn()) {
                    if (nextPlayer.CardPoint != 21) {//next player don't have 21 card point
                        console.log("No last turn and player over 21");
                        this.nextTurn();
                    }
                    else {
                        console.log("Next player has 21");
                        this.PlayerInGame[this.currentTurn].MyTurn = false;
                        this.PlayerInGame[this.currentTurn].EndTurn = true;
                        this.currentTurn += 1
                        this.nextTurn();
                    }
                } else {
                    console.log("last turn no stand");
                    this.PlayerInGame[this.currentTurn].MyTurn = false;
                    this.PlayerInGame[this.currentTurn].EndTurn = true;
                    this.checkAllTurnPlayer();
                }
            }
        } else if (stand) {// player  stand
            console.log("stand");
            if (!this.checkLastedPlayerTurn()) {//No lasted turn
                if (nextPlayer.CardPoint != 21) {//next player don't have 21 card point
                    console.log("No last turn and player no 21");
                    this.nextTurn();
                } else { //next player have 21 card point
                    console.log("Next player has 21");
                    this.PlayerInGame[this.currentTurn].MyTurn = false;
                    this.PlayerInGame[this.currentTurn].EndTurn = true;
                    this.currentTurn += 1
                    this.nextTurn();
                }
            } else {// lasted player
                console.log("last turn stand");
                this.PlayerInGame[this.currentTurn].MyTurn = false;
                this.PlayerInGame[this.currentTurn].EndTurn = true;
                this.checkAllTurnPlayer();
            }
        }

    }

    //method 22: check lasted turn
    private checkLastedPlayerTurn(): boolean {
        let lastedPlayer: boolean = false;
        if (this.currentTurn + 1 === this.player.length) {
            lastedPlayer = true;
        }
        return lastedPlayer;
    }

    //method 23: End game, reset properties
    public endGame() {
        console.log("End game");
        this.player = [];

        console.log(this.PlayerInGame);
        console.log(this.dealer);

        //reset properties
        this.AllPlayerEndTurn = false;
        this.currentTurn = 0;
        this.confirmBetAll = false;
        this.gameStarted = false;
        this.canPlayAgain = false;

        //reset dealer properties 
        this.dealer.CardOnHand = [];
        this.dealer.OpenHiddenCard = false;
    }

    //method 24: set ConfirmBetAll
    public set ConfirmBetAll(con: boolean) {
        this.confirmBetAll = con;
    }

    //method 25: remove player who don't have enough money
    public removePlayer(): void{
        let loop = true;
        while (loop){
            let count: number = 0;
            this.player.forEach((player, index)=>{
                if (player.Money < 1000) {
                    count++;
                    this.player.splice(index, 1);
                }
            });

            if(count === 0){
                loop = false;
            }
        }
    }
}