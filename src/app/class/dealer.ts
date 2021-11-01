
import { Player } from "./player";

export class Dealer extends Player{
    private openHiddenCard: boolean = false;
    
    // method
    //method 11: get openHiddenCard
    public get OpenHiddenCard(): boolean{
        return this.openHiddenCard;
    }

    //method 12: set openHiddenCard
    public set OpenHiddenCard(openCard: boolean){
        this.openHiddenCard = openCard;
    }

   
}