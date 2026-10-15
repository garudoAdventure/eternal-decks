import { Color, CardData, PlayerData } from "@shared/types";
import { Deck } from "./Deck";
import { Card } from "./Card";
import { Game } from "./Game";
import { PlayerState, IdleState } from "../PlayerState/PlayerState";

export class Player {
  id: string;
  socketId: string;
  name: string;
  color: Color;
  hand: Card[] = [];
  deck: Deck = new Deck([]);
  state!: PlayerState;
  
  readonly game: Game;

  constructor(id: string, socketId: string, name: string, color: Color, game: Game) {
    this.id = id;
    this.socketId = socketId;
    this.name = name;
    this.color = color;
    this.game = game;
    this.changeState(new IdleState());
  }

  addHandCardTo3() {
    while(this.hand.length < 3) {
      if (this.deck.cardNum == 0) break;
      this.hand.push(...this.deck.draw(1));
    }
  }

  playCard(cardIdx: number): Card {
    const card: Card = this.hand[cardIdx]!;
    this.hand.splice(cardIdx, 1);
    return card;
  }

  turnEnd() {
    this.addHandCardTo3();
    this.game.changeToNextPlayer();
  }

  changeState(state: PlayerState) {
    this.state = state;
    this.state.player = this;
    this.state.init();
  }

  getRawData(): PlayerData {
    let handData = [];
    this.hand.forEach(card => {
      handData.push(card.getData());
    });

    return {
      id: this.id,
      name: this.name,
      color: this.color,
      hand: handData,
      deckNum: this.deck.cardNum
    };
  }

  getHiddenData(): PlayerData {
    let handData: CardData[] = [];
    this.hand.forEach(card => {
      handData.push({
        id: card.id,
        subID: 0,
        group: card.group,
        type: card.type,
        number: 0,
        color: [Color.NONE, Color.NONE],
        isRotate: false,
        isBack: true
      });
    });
    return {
      id: this.id,
      name: this.name,
      color: this.color,
      hand: handData,
      deckNum: this.deck.cardNum
    };
  }
}