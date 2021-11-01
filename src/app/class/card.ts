export class Card {

    //constructor <----
    constructor(private cardSymbol: String, private cardNum: String) {}

    //method <----
    //method 1: get CardSymbol
    public get CardSymbol(): String{
        return this.cardSymbol;
    }

    /**
     * method 2: get CardNum
     */
    public get CardNum(): String{
        return this.cardNum;
    }

    /**
     * method 3: set CardSymbol
     */
    public set CardSymbol(cardSym: String){
        this.cardSymbol = cardSym;
    }

    //method 4: set CardNum
    public set CardNum(cardNum: String){
        this.cardNum = cardNum;
    }
    
}