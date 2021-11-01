import { Component } from '@angular/core';
import { Dealer } from './class/dealer';
import { DeckCard } from './class/deckCard';
import { BlcakjackGame } from './class/blackjack.Game';
import { Player } from './class/player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  playerName: String = "";
  playGame: boolean = false;

  //create object
  deckCard = new DeckCard();
  dealer: Dealer =  new Dealer("Mr. Z");
  blackjack = new BlcakjackGame(this.deckCard, this.dealer);
  
  
  public addPlayer(): void{
    let player = new Player(this.playerName);
    console.log("Add player : " + player);
    // console.log(player);
    this.blackjack.addPlayer(player);
    // this.blackjack.GameStarted = false;
  }

  public playerDrawCard(player: Player){
    player.drawCard(this.deckCard);
    this.blackjack.checkTurn(false);
  }

  public playerStand(){
    this.blackjack.checkTurn(true);

  }
}
