import { EventEmitter } from 'events';
import { Color, GameBoard, GameOverReason, PlayerData } from '@shared/types'
import { Field } from './Field';
import { River } from './River';
import { Player } from './Player';
import { Card } from './Card';
import { CampBonus, HeartBonus, StarBonus } from './Bonus';
import { Camp, Cave, Forest, GrassLand, Lake, Mountain, RiverSide } from './Rule';
import { Eternal, Fairy, Ghost, King, Kraken, Medusa, Mermaid, Minotaur, Mummy, Phoenix, Skeleton, Vampire, Witch } from './Eternal';
import { createInitDeck } from '../Card/cards.db';
import { IdleState } from '../PlayerState/PlayerState';
import { MainState } from '../PlayerState/MainState';
import { GameOverState } from '../PlayerState/GameOverState';
import { StageClearState } from '../PlayerState/StageClearState';
import { Deck } from './Deck';

export class Game extends EventEmitter {
  id: string;
  players: Player[] = [];
  currentPlayerIdx: number = 0;

  fields: Field[] = [];
  river: River = new River(this);
  eternals: Eternal[] = [];
  discard: Card[] = [];
  private jewels: boolean[] = new Array(8).fill(false);
  private hearts: boolean[] = new Array(3).fill(false);
  private stars: boolean[] = new Array(6).fill(false);
  private starCards: Card[] = [];
  private getStars: number[] = [];
  campBonusCard: Card | null = new Camp().card;

  movedItemId: string[] = [];

  get Jewels() { return this.jewels; }
  get Hearts() { return this.hearts; }
  get Stars() { return this.stars; }

  constructor(id: string) {
    super();
    this.id = id;

    let eternalsA = [new Phoenix(), new Mermaid(), new King(), new Fairy()];
    let eternalsB = [new Ghost(), new Skeleton(), new Witch(), new Vampire()];
    let eternalsC = [new Medusa(), new Minotaur(), new Kraken(), new Mummy()];

    eternalsA.splice(Math.floor(Math.random() * 4), 1);
    eternalsB.splice(Math.floor(Math.random() * 4), 1);
    eternalsC.splice(Math.floor(Math.random() * 4), 1);

    this.fields.push(new Field(this,
      [new Mountain()],
      eternalsA,
      new CampBonus(), true
    ));
    this.fields.push(new Field(this,
      [new Cave()],
      eternalsB,
      new HeartBonus(), true
    ));
    this.fields.push(new Field(this,
      [new Forest(), new Lake(), new GrassLand(), new RiverSide()],
      eternalsC,
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

  getStar(starIdx: number) {
    this.stars[starIdx] = true;
    this.getStars.push(starIdx);
    this.movedItemId.push('star-' + starIdx);
    
    if (this.getStars.length >= 4) {
      this.stageClear();
    }
  }

  getJewel(jewelIdx: number) {
    this.jewels[jewelIdx] = true;
    this.movedItemId.push('jewel-' + jewelIdx);
  }

  setHeart(heartIdx: number, isUse: boolean) {
    this.hearts[heartIdx] = isUse;
  }

  resetHeart() {
    this.hearts = [false, false, false];
  }

  playStarAbility(starCard: Card) {
    this.starCards.push(starCard);
    if (this.starCards.length == 3) {
      this.getStar(4);
    }
  }

  addPlayer(player: Player) {
    this.players.push(player);
  }

  changeToNextPlayer() {
    this.players[this.currentPlayerIdx]!.changeState(new IdleState());
    
    this.currentPlayerIdx = (this.currentPlayerIdx + 1) % this.players.length;
    this.players[this.currentPlayerIdx]!.changeState(new MainState());
  }

  initPlayers() {
    this.currentPlayerIdx = 0;

    const blueDeck = new Deck(createInitDeck(Color.BLUE));
    const yellowDeck = new Deck(createInitDeck(Color.YELLOW));
    const deckForTwoPlayer = [blueDeck, yellowDeck];

    this.players.forEach((player, idx) => {
      player.deck.addCards(createInitDeck(player.color));
      if (this.players.length === 2) {
        deckForTwoPlayer[idx].shuffle();
        player.deck.addCards(deckForTwoPlayer[idx].draw(2));
      }
      player.deck.shuffle();
      player.hand = player.deck.draw(3);
      player.changeState(new IdleState());
    });

    this.players.sort((a: any, b: any) => a.color - b.color);
    this.players[this.currentPlayerIdx]!.changeState(new MainState());

    if (this.players.length === 3){
      this.jewels.splice(0, 2);
    }
  }

  stageClear() {
    this.players.forEach((player: Player) => {
      player.changeState(new StageClearState());
    });
    this.emit('stageClear');
  }

  gameOver(reason: GameOverReason) {
    this.players.forEach((player: Player) => {
      player.changeState(new GameOverState());
    });
    this.emit('gameOver', { reason });
  }

  getPlayersData(id: string, hidePlayerHand: boolean = true) {
    // 傳給前端的玩家順序讓當前玩家永遠排在第一個
    let playersData: PlayerData[] = [];
    const orderedPlayerArr: PlayerData[] = [];
    let isFindCurrentPlayer: boolean = false;
    this.players.forEach(player => {
      isFindCurrentPlayer = isFindCurrentPlayer || id === player.id;
      if (!isFindCurrentPlayer) {
        if (!hidePlayerHand) {
          orderedPlayerArr.push(player.getRawData());
        } else {
          orderedPlayerArr.push(player.getHiddenData());
        }
      } else {
        if (id === player.id || !hidePlayerHand) {
          playersData.push(player.getRawData());
        } else {
          playersData.push(player.getHiddenData());
        }
      }
    });
    
    playersData = [...playersData, ...orderedPlayerArr];
    return playersData;
  }

  getGameData(id: string, hidePlayerHand: boolean = true): GameBoard {
    return {
      stars: this.stars,
      hearts: this.hearts,
      jewels: this.jewels,
      players: this.getPlayersData(id, hidePlayerHand),
      fields: this.fields.map((field) => field.getData()),
      river: this.river.getData(),
      eternals: this.eternals.map((eternal) => eternal.getData()),
      discard: this.discard.map((card) => card.getData()),
      starCard: this.starCards.map((card) => card.getData()),
      getStars: this.getStars,
      campBonus: this.campBonusCard?.getData() ?? null,
      movedItemId: this.movedItemId
    };
  }

  emitGameData() {
    this.emit('updateGameData');
  }

  emitAvailableMove() {
    this.emit('getAvailableMove');
  }
}