class CardGame {

    constructor(cards, scores, indOfDeletedCards, indOfExistCards, cardsImage) {
        this.cards = cards;
        this.scores = scores;
        this.indOfDeletedCards = indOfDeletedCards;
        this.indOfExistCards = indOfExistCards;
        this.cardsImage = cardsImage;
    }

    HideCards(cardIndex) {
        document.getElementById(cardIndex).removeAttribute("src");
        document.getElementById(cardIndex).removeAttribute("class");
    }

    CloseCards(cardIndex) {
        document.getElementById(cardIndex).setAttribute("src", "card.png");
        document.getElementById(cardIndex).setAttribute("class", "back");
    }

    HideElement(elemAttr) {
        document.querySelector(elemAttr).style.display = "none";
    }

    ShowBlockElement(elemAttr) {
        document.querySelector(elemAttr).style.display = "block";
    }

    ShowGridElement(elemAttr) {
        document.querySelector(elemAttr).style.display = "grid";
    }

    ShowCards() {
        for (var i = 1; i <= 18; i++) {
            document.getElementById(i).setAttribute("src", "card.png");
        }
    }

    StartButton(btnAttribute) {
            console.log(btnAttribute);
            this.HideElement("#startGameBtn");
            this.HideElement("#memoryGameHeader");
            this.HideElement(".imageOnStartScreen");
            this.HideElement(".imageOnEndScreen");
            this.HideElement("#memoryGameEndHeader");
            this.HideElement("#endGameBtn");
            this.ShowGridElement(".wrapper");
            this.ShowGridElement(".toolBar");
    }

    CardDesk() {
        for (var i = 1; i <= 18; i++) {
            this.cardsImage[i] = {isCardClosed:true, image:this.cards[i - 1] + ".png"};
        }
    }

    GetRandomCards() {
        this.cards = this.cards.sort(() => 0.5 - Math.random());
        this.cards = this.cards.slice(0, 9).concat(this.cards.slice(0, 9)).sort(() => 0.5 - Math.random());
    }

    FillIndexes() {
        for (var i = 0; i < 18; i++) {
            this.indOfExistCards[i] = i + 1;
        }
    }

    RestartGame(btnAttribute) {
            console.log("y");
            document.querySelector("#scores").innerHTML = "Очки: 0"
            for (var i = 1; i <= 18; i++) {
                document.getElementById(i).removeAttribute("src");
                document.getElementById(i).setAttribute("class", "back");
            }
            this.cards = [
                "2C", "2D", "2H", "2S",
                "3C", "3D", "3H", "3S",
                "4C", "4D", "4H", "4S",
                "5C", "5D", "5H", "5S",
                "6C", "6D", "6H", "6S",
                "7C", "7D", "7H", "7S",
                "8C", "8D", "8H", "8S",
                "9C", "9D", "9H", "9S",
                "0C", "0D", "0H", "0S",
                "JC", "JD", "JH", "JS",
                "QC", "QD", "QH", "QS",
                "KC", "KD", "KH", "KS",
                "AC", "AD", "AH", "AS",
            ];
            this.scores = 0;
            this.indOfExistCards = [];
            this.indOfDeletedCards = [];
            this.cardsImage = [];
            this.StartButton(btnAttribute);
            this.FillIndexes();
            this.GetRandomCards();
            this.CardDesk();
            this.ShowCards();
            this.CardFront();
    }

    CardFront() {
        var openCards = [];
        for (var i = 1; i <= 18; i++) {
            document.getElementById(i).onclick = ((i) => {
                return () => {
                    if (openCards.length < 2 && this.cardsImage[i]["isCardClosed"] && document.getElementById(i).getAttribute("class") != "front" && this.cardsImage[i]["isCardClosed"] != "off") {
                        document.getElementById(i).setAttribute("src", this.cardsImage[i]["image"]);
                        document.getElementById(i).setAttribute("class", "front");
                        this.cardsImage[i]["isCardClosed"] = false;
                        openCards.push(this.cardsImage[i]["image"]);
                    } 
                    if (openCards.length == 2 && openCards[0] == openCards[1]) {
                        for (var j of this.indOfExistCards) {
                            if (!this.cardsImage[j]["isCardClosed"] && this.cardsImage[j]["isCardClosed"] != "off") {
                                setTimeout(this.HideCards, 500, j);
                                this.cardsImage[j]["isCardClosed"] = "off";
                                this.indOfDeletedCards.push(j);
                                this.scores += this.indOfExistCards.length * 42;
                                document.querySelector("#scores").innerHTML = "Очки: " + this.scores;
                            }
                        }
                        openCards = [];
                    } 
                    if (openCards.length == 2 && openCards[0] != openCards[1]) {
                        for (var j of this.indOfExistCards) {
                            if (this.cardsImage[j]["isCardClosed"] != "off" && !this.cardsImage[j]["isCardClosed"]) {
                                setTimeout(this.CloseCards, 500, j);
                                this.cardsImage[j]["isCardClosed"] = true;
                                this.scores -= this.indOfDeletedCards.length * 42;
                                document.querySelector("#scores").innerHTML = "Очки: " + this.scores;
                            }
                        }
                        openCards = [];
                    }
                    for (var element of this.indOfDeletedCards){
                        var index = this.indOfExistCards.indexOf(element);
                        if (index != -1) this.indOfExistCards.splice(index, 1);
                    } 
                    if (this.indOfExistCards.length == 0) {
                        this.HideElement(".wrapper");
                        this.HideElement(".toolBar");
                        this.ShowBlockElement(".imageOnEndScreen");
                        this.ShowBlockElement("#memoryGameEndHeader");
                        this.ShowBlockElement("#endGameBtn");
                        document.querySelector("#memoryGameEndHeader").innerHTML = "Поздравляем!<br>Ваш итоговый счет: " + this.scores;
                    }
                    console.log(this.indOfExistCards.length);
                }
            })(i);
        }
    }
}

document.querySelector("#startGameBtn").onclick = function() {
    var game = new CardGame();
    game.RestartGame("#startGameBtn");
    console.log("!" );
}

document.querySelector("#restartGameBtn").onclick = function() {
    var game = new CardGame();
    game.RestartGame("#restartGameBtn");
    console.log("!!");
}

document.querySelector("#endGameBtn").onclick = function() {
    var game = new CardGame();
    game.RestartGame("#endGameBtn");
    console.log("!!!");
}
