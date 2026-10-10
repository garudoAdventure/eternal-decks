import { Color, CardGroup, CardType, StateData, GameOverReason } from "@shared/types";
import { PlayerState } from "./PlayerState";
import { SelectPlayerState } from "./SelectPlayerState";
import { SelectEternalState } from "./SelectEternalState";
import { Card } from "../entities/Card";
import { AbilityCard } from "../entities/Abilities/ability-card";

export class MainState extends PlayerState {
  private selectedCardFlag: boolean[] = [];
  private draggingCard: Card = null;

  override init() {
    if (this.player.hand.length === 0) {
      this.game.gameOver(GameOverReason.DECK_EXHAUSTED);
    }

    this.player.hand.forEach(() => {
      this.selectedCardFlag.push(false);
      this.stateData.validHandCard.push(false);
    });
  }

  override selectCard(cardIdx: number): void {
    this.selectedCardFlag[cardIdx] = !this.selectedCardFlag[cardIdx];
    this.game.emitAvailableMove();
  }

  override dragCard(cardIdx: number): void {
    this.draggingCard = this.player.hand[cardIdx];
    this.game.emitAvailableMove();
  }

  override playCardToField(fieldIdx: number, cardIdx: number): void {
    const card: Card = this.player.playCard(cardIdx);
    this.game.fields[fieldIdx].setCard(card);

    this.game.movedItemId.push('card-' + card.id);

    if (card.type === CardType.RULE) {
      this.game.fields[fieldIdx].isTransToCamp = true;
    }
    
    this.game.fields[fieldIdx].handleFieldComplete(this.player, fieldIdx);
    this.game.emitGameData();
    this.game.emitAvailableMove();
  }

  override playCardToRiver(cardIdx: number): void {
    const card: Card = this.player.playCard(cardIdx);
    this.game.river.setCard(this.player, [card]);

    this.player.turnEnd();
    this.game.emitGameData();
    this.game.emitAvailableMove();
  }

  override selectHeart(heartIdx: number): void {
    this.game.setHeart(heartIdx, true);
    this.player.changeState(new SelectPlayerState());
    this.game.emitGameData();
    this.game.emitAvailableMove();
  }

  override selectJewel(jewelIdx: number): void {
    if (jewelIdx == 5) { this.game.getStar(3); }

    let playCard: Card[] = [];
    for (let i = this.selectedCardFlag.length - 1; i >= 0; i--) {
      if (this.selectedCardFlag[i]) {
        playCard.push(this.player.playCard(i));
      }
    }
    this.game.river.setCard(this.player, playCard);

    this.player.changeState(new SelectEternalState(jewelIdx));
    this.game.emitGameData();
    this.game.emitAvailableMove();
  }

  override useAbilityCard(cardIdx: number) {
    let card: Card = this.player.hand[cardIdx]!;
    if (card.group != CardGroup.MINOTAUR) {
      card = this.player.playCard(cardIdx);
      if (
        card.group != CardGroup.PHOENIX &&
        card.group != CardGroup.MERMAID &&
        card.group != CardGroup.KING
      ) {
        this.game.discard.push(card);
      }
    }
    if (card instanceof AbilityCard) {
      card.play(this.player);
    }
    this.game.movedItemId.push('card-' + card.id);
    this.game.emitGameData();
    this.game.emitAvailableMove();
  }

  override getAvailableMove(): StateData {
    this.stateData.message = '請打出一張牌，或是使用愛心，或是生成水晶。';
    this.stateData.validField = this.getValidField();
    this.stateData.validJewel = this.getValidJewel();
    this.stateData.validHeart = this.game.Hearts.map((used) => !used);
    this.stateData.selectedCard = this.selectedCardFlag;
    this.stateData.validHandCard = this.getValidHandCard();
    return this.stateData;
  }

  private getValidField(): boolean[] {
    let validField: boolean[] = [false, false, false];

    if (this.draggingCard === null || this.draggingCard.type === CardType.ABILITY) {
      return validField;
    }

    if (this.draggingCard.type === CardType.RULE) {
      return [true, true, true];
    }
    
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
    let validJewel: boolean[] = [false, false, false, false, false, false, false, false];

    if (this.game.eternals.filter((eternal) => eternal.isCurse).length === 0) {
      return validJewel;
    }
    
    let selectedCard: Card[] = [];
    let rareCardNum = 0;
    let colorCount: number[] = [0, 0, 0, 0, 0];
    let colorFlag: boolean[] = [false, false, false, false, false];
    let doubleColorNum: number[] = [0, 0]; // RED/GREEN, BLUE/YELLOW
    let oneFiveNineFlag: boolean[] = [false, false, false];
    
    for (let i = 0; i < this.selectedCardFlag.length; i++) {
      if (!this.selectedCardFlag[i]) { continue; }
      
      let card: Card = this.player.hand[i]!;
      if (card.type === CardType.ABILITY || card.type === CardType.RULE) { return validJewel; }
      if (card.type === CardType.RARE) {
        rareCardNum++;
      } else {
        if (card.number == 1) { oneFiveNineFlag[0] = true; }
        if (card.number == 5) { oneFiveNineFlag[1] = true; }
        if (card.number == 9) { oneFiveNineFlag[2] = true; }

        if (!card.isDoubleColor) {
          colorCount[card.cardColor[0]]!++;
          colorFlag[card.cardColor[0]] = true;
        } else {
          colorCount[card.cardColor[0]]!++;
          colorCount[card.cardColor[1]]!++;
          if (card.cardColor[0] == Color.RED || card.cardColor[1] == Color.RED) {
            doubleColorNum[0]++;
          }
          if (card.cardColor[0] == Color.BLUE || card.cardColor[1] == Color.BLUE) {
            doubleColorNum[1]++;
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
    
    if (selectedCard.length === 1) {
      if (rareCardNum > 0 ||
        selectedCard[0].number == 1 || selectedCard[0].number == 9
      ) {
        validJewel[0] = true;
        return validJewel;
      }
    }

    if (selectedCard.length == 2) {
      validJewel[6] = true;

      if (rareCardNum != 0 || selectedCard[0].number == selectedCard[1].number) {
        validJewel[1] = true;
        return validJewel;
      }
    }

    if (selectedCard.length == 3) {
      validJewel[7] = true;

      if (
        rareCardNum == 2 ||
        rareCardNum == 1 && selectedCard[1].number == selectedCard[2].number ||
        selectedCard[0].number == selectedCard[2].number
      ) {
        validJewel[3] = true;
      }

      if (rareCardNum + oneFiveNineFlag.filter((flag) => flag).length == 3) {
        validJewel[5] = true;
      }

      if (
        rareCardNum == 2 ||
        rareCardNum == 1 && colorCount.find(count => count == 2) ||
        colorCount.find(count => count == 3)
      ) {
        validJewel[2] = true;
      }

      if (
        rareCardNum == 2 ||
        rareCardNum == 1 && colorFlag.filter((flag) => flag).length == 2 ||
        colorFlag.filter((flag) => flag).length == 3
      ) {
        validJewel[4] = true;
      }
    }
    return validJewel;
  }

  private getValidHandCard() {
    let validHandCard = [];
    this.player.hand.forEach((card) => {
      let isValid = true;
      this.game.eternals.forEach(eternal => {
        if (!eternal.isCurse) return; 
        isValid = isValid && eternal.isValid(card);
      });
      validHandCard.push(isValid);
    });
    return validHandCard;
  }
}