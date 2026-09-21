import { Color, CardGroup, CardType, StateData } from "@shared/types";
import { PlayerState } from "./PlayerState";
import { SelectPlayerState } from "./SelectPlayerState";
import { SelectEternalState } from "./SelectEternalState";
import { Card } from "../entities/Card";
import { AbilityCard } from "../entities/Abilities/ability-card";

export class MainState extends PlayerState {
  private selectedCardFlag: boolean[] = [];
  private draggingCard: Card = null;

  constructor() {
    super();
    for (let i = 0; i < 10; i++) {
      this.selectedCardFlag.push(false);
    }
  }

  override selectCard(cardIdx: number): void {
    this.selectedCardFlag[cardIdx] = !this.selectedCardFlag[cardIdx];
    this.game.emitGameData();
  }

  override dragCard(cardIdx: number): void {
    this.draggingCard = this.player.hand[cardIdx];
    this.game.emitGameData();
  }

  override playCardToField(fieldIdx: number, cardIdx: number): void {
    const card: Card = this.player.playCard(cardIdx);
    this.game.fields[fieldIdx]!.setCard(card);

    if (card.type == CardType.RULE) {
      this.game.fields[fieldIdx]!.isTransToCamp = true;
    }

    this.game.emit('playCardAnimation', {
      playerId: this.player.id,
      cardIdx: cardIdx,
      card: card.getData(),
      fieldIdx: fieldIdx
    });
    
    this.game.fields[fieldIdx]!.handleFieldComplete(this.player, fieldIdx);
    this.game.emitGameData();
  }

  override playCardToRiver(cardIdx: number): void {
    const card: Card = this.player.playCard(cardIdx);
    this.game.river.setCard(this.player, [card]);
    this.player.turnEnd();
    this.game.emitGameData();
  }

  override selectHeart(heartIdx: number): void {
    this.game.usedHeart[heartIdx] = true;
    this.player.changeState(new SelectPlayerState());
    this.game.emitGameData();
  }

  override selectJewel(jewelIdx: number): void {
    if (jewelIdx == 5) { this.game.getStar[3] = true; }

    let playCard: Card[] = [];
    for (let i = this.selectedCardFlag.length - 1; i >= 0; i--) {
      if (this.selectedCardFlag[i]) {
        playCard.push(this.player.playCard(i));
      }
    }
    this.game.river.setCard(this.player, playCard);

    this.player.changeState(new SelectEternalState(jewelIdx));
    this.game.emitGameData();
  }

  override useAbilityCard(cardIdx: number) {
    let card: Card = this.player.hand[cardIdx]!;
    if (card.group != CardGroup.MINOTAUR) {
      card = this.player.playCard(cardIdx);
      this.game.discard.push(card);
    }
    if (card instanceof AbilityCard) {
      card.play(this.player);
    }
    this.game.emitGameData();
  }

  override getAvailableMove(): StateData {
    this.stateData.message = '請打出一張牌，或是使用愛心，或是生成水晶。';
    this.stateData.validField = this.getValidField();
    this.stateData.validJewel = this.getValidJewel();
    this.stateData.validHeart = this.game.usedHeart.map((used) => !used);;
    this.stateData.selectedCard = this.selectedCardFlag;
    return this.stateData;
  }

  private getValidField(): boolean[] {
    let validField: boolean[] = [false, false, false];

    if (this.draggingCard === null) { return validField; }
    
    let cardValid = true;
    for (let eternal of this.game.eternals) {
      let eternalValid = !eternal.isCurse || eternal.isValid(this.draggingCard);
      cardValid = cardValid && eternalValid;
    }
    if (!cardValid) { return validField; }
    
    // Field Rule
    let idx: number = 0;
    for (let field of this.game.fields) {
      if (field.checkRule(this.draggingCard)) {
        validField[idx] = true;
      }
      idx++;
    }
    return validField;
  }

  private getValidJewel() {
    let validJewel: boolean[] = [false, false, false, false, false, false];
    let hasCurseEternal: boolean = false;
    for (let curseEternal of this.game.eternals) {
      hasCurseEternal = hasCurseEternal || curseEternal.isCurse;
    }
    if (!hasCurseEternal) { return validJewel; }
    
    let selectedCard: Card[] = [];
    let rareCardNum = 0;
    let colorCount: number[] = [0, 0, 0, 0, 0];
    let colorFlag: boolean[] = [false, false, false, false, false];
    let doubleColorNum: number[] = [0, 0]; // RED/GREEN, BLUE/YELLOW
    let oneFiveNineFlag: boolean[] = [false, false, false];
    for (let i = 0; i < this.selectedCardFlag.length; i++) {
      if (!this.selectedCardFlag[i]) { continue; }
      
      let card: Card = this.player.hand[i]!;
      if (card.type == CardType.ABILITY) {
        return validJewel;
      }
      if (card.type == CardType.RARE) {
        rareCardNum++;
      } else {
        if (card.number == 1) { oneFiveNineFlag[0] = true; }
        if (card.number == 5) { oneFiveNineFlag[1] = true; }
        if (card.number == 9) { oneFiveNineFlag[2] = true; }

        if (!card.isDoubleColor) {
          colorCount[card.color![0]!]!++;
          colorFlag[card.color![0]!] = true;
        } else {
          colorCount[card.color![0]!]!++;
          colorCount[card.color![1]!]!++;
          if (card.color![0] == Color.RED || card.color![1] == Color.RED) {
            doubleColorNum[0]!++;
          }
          if (card.color![0] == Color.BLUE || card.color![1] == Color.BLUE) {
            doubleColorNum[1]!++;
          }
        }
      }
      selectedCard.push(card);
    }
    while(doubleColorNum[0]! > 0) {
      if (!colorFlag[Color.RED]) {
        colorFlag[Color.RED] = true;
      } else if (!colorFlag[Color.GREEN]) {
        colorFlag[Color.GREEN] = true;
      }
      doubleColorNum[0]!--;
    }
    while(doubleColorNum[1]! > 0) {
      if (!colorFlag[Color.BLUE]) {
        colorFlag[Color.BLUE] = true;
      } else if (!colorFlag[Color.YELLOW]) {
        colorFlag[Color.YELLOW] = true;
      }
      doubleColorNum[1]!--;
    }
    if (selectedCard.length == 0 || selectedCard.length > 3) { return validJewel; }

    selectedCard = selectedCard.sort((a: Card, b: Card) => { return a.number! - b.number!; });
    
    if (selectedCard.length == 1) {
      if (rareCardNum != 0 ||
        selectedCard[0]!.number == 1 || selectedCard[0]!.number == 9
      ) {
        validJewel[0] = !this.game.genJewels[0];
        return validJewel;
      }
    }

    if (selectedCard.length == 2) {
      if (rareCardNum != 0 || selectedCard[0]!.number == selectedCard[1]!.number) {
        validJewel[1] = !this.game.genJewels[1];
        return validJewel;
      }
    }

    if (selectedCard.length == 3) {
      if (
        rareCardNum == 2 ||
        rareCardNum == 1 && selectedCard[1]!.number == selectedCard[2]!.number ||
        selectedCard[0]!.number == selectedCard[2]!.number
      ) {
        validJewel[3] = !this.game.genJewels[3];
      }

      if (rareCardNum + oneFiveNineFlag.filter((flag) => flag).length == 3) {
        validJewel[5] = !this.game.genJewels[5];
      }

      if (
        rareCardNum == 2 ||
        rareCardNum == 1 && colorCount.find(count => count == 2) ||
        colorCount.find(count => count == 3)
      ) {
        validJewel[2] = !this.game.genJewels[2];
      }

      if (
        rareCardNum == 2 ||
        rareCardNum == 1 && colorFlag.filter((flag) => flag).length == 2 ||
        colorFlag.filter((flag) => flag).length == 3
      ) {
        validJewel[4] = !this.game.genJewels[4];
      }
    }
    return validJewel;
  }
}