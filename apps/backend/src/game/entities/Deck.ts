import { Card } from "./Card";

export class Deck {
  private cards : Card[] = [];

  constructor(cards : Card[]) {
    this.cards = cards;
  }

  get cardNum() {
    return this.cards.length;
  }

  draw(num : number) : Card[] {
    let drawCards : Card[] = [];
    for (let i = 0; i < num; i++) {
      let drawCard = this.cards.shift();
      if (!drawCard) {
        break;
      }
      drawCards[i] = drawCard;
    }
    return drawCards;
  }

  addCard(card: Card) {
    this.cards.push(card);
  }

  addCards(cards: Card[]) {
    this.cards.push(...cards);
  }

  addDeck(deck: Deck) {
    this.cards.push(...deck.cards);
  }

  shuffle() {
    for (let i = 0; i < this.cards.length; i++) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j]!, this.cards[i]!];
    }
  }
}