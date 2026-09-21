import { CardGroup, CardType, RiverData } from "@shared/types";
import { Player } from "./Player";
import { Card } from "./Card";
import { Game } from "./Game";

export class River {
  constructor(
    private readonly game: Game
  ){}

  cards: Card[] = [];
  rareCards: Card[] = [
    new Card(0, CardGroup.NONE, CardType.RARE),
    new Card(0, CardGroup.NONE, CardType.RARE),
    new Card(0, CardGroup.NONE, CardType.RARE),
  ];

  setCard(player: Player, cards: Card[]) {
    this.cards.push(...cards);
    if (this.cards.length >= 5) {
      if (this.rareCards.length == 0) {
        this.game.gameOver();
        return;
      }
      player.hand.push(this.rareCards.pop()!);
      this.game.discard.push(...this.cards);
      this.cards = [];
    }
  }

  getData(): RiverData {
    return {
      cards: this.cards,
      rareCards: this.rareCards
    };
  }
}