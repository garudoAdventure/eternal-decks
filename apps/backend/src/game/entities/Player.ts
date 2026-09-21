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
    let card: Card = this.hand[cardIdx]!;
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
  }

  getRawData(): PlayerData {
    return {
      id: this.id,
      name: this.name,
      color: this.color,
      hand: this.hand,
      deckNum: this.deck.cardNum
    };
  }

  getHiddenData(): PlayerData {
    let handData: CardData[] = [];
    for (let i = 0; i < this.hand.length; i++) {
      handData.push({
        id: this.hand[i]!.id,
        subID: 0,
        group: this.hand[i]!.group,
        type: this.hand[i]!.type,
        isRotate: this.hand[i]!.isRotate
      });
    }
    return {
      id: this.id,
      name: this.name,
      color: this.color,
      hand: handData,
      deckNum: this.deck.cardNum
    };
  }
}