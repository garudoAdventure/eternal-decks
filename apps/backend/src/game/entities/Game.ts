import { EventEmitter } from 'events';
import { GameBoard, PlayerData } from '@shared/types'
import { Field } from './Field';
import { River } from './River';
import { Player } from './Player';
import { Card } from './Card';
import { CampBonus, HeartBonus, StarBonus } from './Bonus';
import { Cave, Forest, GrassLand, Lake, Mountain, RiverSide } from './Rule';
import { DummyEternal, Eternal, Ghost, King, Kraken, Medusa, Mermaid, Minotaur, Phoenix, Skeleton, Witch } from './Eternal';
import { createInitDeck } from '../Card/cards.db';
import { IdleState } from '../PlayerState/PlayerState';
import { MainState } from '../PlayerState/MainState';

export class Game extends EventEmitter {
  id: string;
  players: Player[] = [];
  currentPlayerIdx: number = 0;

  fields: Field[] = [];
  river: River = new River(this);
  eternals: Eternal[] = [];
  genJewels: boolean[] = new Array(6).fill(false);
  usedHeart: boolean[] = new Array(3).fill(false);
  getStar: boolean[] = new Array(6).fill(false);
  starCard: Card[] = new Array(3).fill(new Card());
  discard: Card[] = [];
  getCampBonus: boolean = false;

  constructor(id: string) {
    super();
    this.id = id;

    this.fields.push(new Field(this,
      [new Mountain()],
      [new Phoenix(), new Mermaid(), new King()],
      new CampBonus(), true
    ));
    this.fields.push(new Field(this,
      [new Cave()],
      [new Ghost(), new Skeleton(), new Witch()],
      new HeartBonus(), true
    ));
    this.fields.push(new Field(this,
      [new Forest(), new Lake(), new GrassLand(), new RiverSide()],
      [new Medusa(), new Minotaur(), new Kraken()],
      new StarBonus()
    ));
  }

  selectCard(id: string, cardIdx: number) {
    this.players.find((p: Player) => p.id == id)!.state.selectCard(cardIdx);
  }

  dragCard(id: string, cardIdx: number) {
    this.players.find((p: Player) => p.id == id)!.state.dragCard(cardIdx);
  }

  selectFieldCard(id: string, fieldIdx: number, cardIdx: number) {
    this.players.find((p: Player) => p.id == id)!.state.selectFieldCard(fieldIdx, cardIdx);
  }

  useAbilityCard(id: string, cardIdx: number) {
    this.players.find((p: Player) => p.id == id)!.state.useAbilityCard(cardIdx);
  }

  playCardToField(id: string, fieldIdx: number, cardIdx: number) {
    this.players.find((p: Player) => p.id == id)!.state.playCardToField(fieldIdx, cardIdx);
  }

  playCardToRiver(id: string, cardIdx: number) {
    this.players.find((p: Player) => p.id == id)!.state.playCardToRiver(cardIdx);
  }

  selectFieldEternal(id: string, eternalIdx: number) {
    this.players.find((p: Player) => p.id == id)!.state.selectFieldEternal(eternalIdx);
  }

  selectEternal(id: string, eternalIdx: number) {
    this.players.find((p: Player) => p.id == id)!.state.selectEternal(eternalIdx);
  }

  selectJewel(id: string, jewelIdx: number) {
    this.players.find((p: Player) => p.id == id)!.state.selectJewel(jewelIdx);
  }

  selectHeart(id: string, heartIdx: number) {
    this.players.find((p: Player) => p.id == id)!.state.selectHeart(heartIdx);
  }

  selectPlayer(id: string, playerId: string) {
    this.players.find((p: Player) => p.id == id)!.state.selectPlayer(playerId);
  }

  confirmAction(id: string) {
    this.players.find((p: Player) => p.id == id)!.state.confirmAction();
  }

  rotateCard(id: string, cardIdx: number) {
    this.players.find((p: Player) => p.id == id)!.state.rotateCard(cardIdx);
  }

  gameOver() {
    this.players.forEach((player: Player) => {
      player.changeState(new IdleState());
    });
    this.emit('gameOver');
    // for (let player of this.players) {
    //   this.playerSocket.get(player.id)!.emit('updateGameData', this.getGameData(player.id));
    //   this.playerSocket.get(player.id)!.emit('getAvailableMove', player.state.getAvailableMove());
    //   this.playerSocket.get(player.id)!.emit('gameOver');
    // }
  }

  changeToNextPlayer() {
    this.players[this.currentPlayerIdx]!.changeState(new IdleState());
    
    this.currentPlayerIdx = (this.currentPlayerIdx + 1) % this.players.length;
    this.players[this.currentPlayerIdx]!.changeState(new MainState());
  }

  addPlayer(player: Player) {
    this.players.push(player);
    // this.playerSocket.set(player.id, socket);
  }

  initPlayers() {
    for(let player of this.players) {
      player.deck.addCards(createInitDeck(player.color));
      player.deck.shuffle();
      player.hand = player.deck.draw(3);
    }
    this.players.sort((a: any, b: any) => a.color - b.color);
    this.players[this.currentPlayerIdx]!.changeState(new MainState());
  }

  getPlayersData(id: string, hidePlayerHand: boolean = true) {
    let playersData: PlayerData[] = [];
    const playerArrForOrder: PlayerData[] = [];
    let flag: boolean = false;
    for (let player of this.players) {
      flag = flag || id == player.id;
      if (!flag) {
        if (!hidePlayerHand) {
          playerArrForOrder.push(player.getRawData());
        } else {
          playerArrForOrder.push(player.getHiddenData());
        }
      } else {
        if (id == player.id || !hidePlayerHand) {
          playersData.push(player.getRawData());
        } else {
          playersData.push(player.getHiddenData());
        }
      }
    }
    playersData = [...playersData, ...playerArrForOrder];
    return playersData;
  }

  getGameData(id: string, hidePlayerHand: boolean = true): GameBoard {
    return {
      getStar: this.getStar,
      usedHeart: this.usedHeart,
      genJewel: this.genJewels,
      players: this.getPlayersData(id, hidePlayerHand),
      fields: this.fields.map((field) => field.getData()),
      river: this.river.getData(),
      eternals: this.eternals.map((eternal) => eternal.getData()),
      discard: this.discard.map((card) => card.getData()),
      starCard: this.starCard.map((card) => card.getData()),
      getCampBonus: this.getCampBonus
    };
  }

  emitGameData() {
    this.emit('stateChanged');
  }
}