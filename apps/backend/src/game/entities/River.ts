import { CardGroup, CardType, GameOverReason, RiverData } from "@shared/types";
import { Player } from "./Player";
import { Card } from "./Card";
import { Game } from "./Game";

export class River {
  constructor(
    private readonly game: Game
  ){}

  cards: Card[] = [];
  gameOverCard: Card = new Card(0, CardGroup.NONE, CardType.GAME_OVER);
  rareCards: Card[] = [
    new Card(0, CardGroup.NONE, CardType.RARE),
    new Card(1, CardGroup.NONE, CardType.RARE),
    new Card(2, CardGroup.NONE, CardType.RARE),
  ];

  setCard(player: Player, cards: Card[]) {
    cards.forEach(card => {
      this.cards.push(card);
      this.game.movedItemId.push('card-' + card.id);
    });
    this.game.emitGameData();

    if (this.cards.length >= 5) {
      if (this.rareCards.length === 0) {
        this.game.gameOver(GameOverReason.RIVER_EXHAUSTED);
        return;
      }
      const rareCard = this.rareCards.pop();
      player.hand.push(rareCard);
      this.game.movedItemId.push('card-' + rareCard.id);

      this.cards.forEach(card => {
        this.game.discard.push(card);
        this.game.movedItemId.push('card-' + card.id);
      });
      this.cards = [];
    }
  }

  getData(): RiverData {
    let cardsData = [];
    this.cards.forEach(card => {
      cardsData.push(card.getData());
    });

    let rareCardsData = [];
    this.rareCards.forEach(card => {
      rareCardsData.push(card.getData());
    })

    return {
      cards: cardsData,
      rareCards: rareCardsData,
      gameOverCard: this.gameOverCard.getData()
    };
  }
}