import { Color, CardType, CardGroup } from "@shared/types";
import { Card } from "./Card";
import { CardVal } from "./Field";

export interface Rule {
  card: Card;
  checkValid(fieldCardCount: number, currentVal: CardVal, card: Card): boolean;
  caclCurrentVal(currentVal: CardVal, card: Card): CardVal;
}

export class Camp implements Rule {
  card: Card = new Card(0, CardGroup.NONE, CardType.RULE);
  checkValid(fieldCardCount: number, currentVal: CardVal, card: Card): boolean {
    return true;
  }

  caclCurrentVal(currentVal: CardVal, card: Card): CardVal {
    return {
      number: card.number,
      color: card.color,
      isRare: card.type == CardType.RARE
    };
  }
}

export class GrassLand implements Rule {
  card: Card = new Card(1, CardGroup.NONE, CardType.RULE);
  checkValid(fieldCardCount: number, currentVal: CardVal, card: Card): boolean {
    return (card.isRare ||
      card.number != 5 && card.number != 6 && card.number != 7);
  }

  caclCurrentVal(currentVal: CardVal, card: Card): CardVal {
    return {
      number: card.number,
      color: card.color,
      isRare: card.type == CardType.RARE
    };
  }
}

export class Mountain implements Rule {
  card: Card = new Card(2, CardGroup.NONE, CardType.RULE);
  checkValid(fieldCardCount: number, currentVal: CardVal, card: Card): boolean {
    return fieldCardCount == 0 || card.isRare ||
      card.number > currentVal.number;
  }

  caclCurrentVal(currentVal: CardVal, card: Card): CardVal {
    let returnVal: CardVal = {
      number: card.number,
      color: card.color,
      isRare: card.type == CardType.RARE
    };
    if (card.type == CardType.RARE) {
      returnVal.number = currentVal.number + 1;
    }
    return returnVal;
  }
}

export class Cave implements Rule {
  card: Card = new Card(3, CardGroup.NONE, CardType.RULE);
  checkValid(fieldCardCount: number, currentVal: CardVal, card: Card): boolean {
    return fieldCardCount == 0 || card.isRare ||
      card.number < currentVal.number;
  }

  caclCurrentVal(currentVal: CardVal, card: Card): CardVal {
    let returnVal: CardVal = {
      number: card.number,
      color: card.color,
      isRare: card.type == CardType.RARE
    };
    if (card.type == CardType.RARE) {
      if (currentVal.number == 0) {
        returnVal.number = 9;
      } else {
        returnVal.number = currentVal.number - 1;
      }
    }
    return returnVal;
  }
}

export class Forest implements Rule {
  card: Card = new Card(4, CardGroup.NONE, CardType.RULE);
  checkValid(fieldCardCount: number, currentVal: CardVal, card: Card): boolean {
    return fieldCardCount == 0 || card.isRare ||
      currentVal.isRare || Math.abs(currentVal.number - card.number) != 1;
  }

  caclCurrentVal(currentVal: CardVal, card: Card): CardVal {
    let returnVal: CardVal = {
      number: card.number,
      color: card.color,
      isRare: card.type == CardType.RARE
    };
    return returnVal;
  }
}

export class RiverSide implements Rule {
  card: Card = new Card(5, CardGroup.NONE, CardType.RULE);
  checkValid(fieldCardCount: number, currentVal: CardVal, card: Card): boolean {
    return card.isRare || card.number % 2 == 1;
  }

  caclCurrentVal(currentVal: CardVal, card: Card): CardVal {
    let returnVal: CardVal = {
      number: card.number,
      color: card.color,
      isRare: card.type == CardType.RARE
    };
    return returnVal;
  }
}

export class Valley implements Rule {
  card: Card = new Card(6, CardGroup.NONE, CardType.RULE);
  checkValid(fieldCardCount: number, currentVal: CardVal, card: Card): boolean {
    return card.isRare || card.number % 2 == 0;
  }

  caclCurrentVal(currentVal: CardVal, card: Card): CardVal {
    let returnVal: CardVal = {
      number: card.number,
      color: card.color,
      isRare: card.type == CardType.RARE
    };
    return returnVal;
  }
}

export class Desert implements Rule {
  card: Card = new Card(7, CardGroup.NONE, CardType.RULE);

  private continuousRareNum: number = 0;

  checkValid(fieldCardCount: number, currentVal: CardVal, card: Card): boolean {
    console.log('========================================');
    console.log('Current Number: ' + currentVal.number);
    
    if (fieldCardCount == 0 || card.isRare || currentVal.number == 0) {
      return true;
    }

    let valid = false;
    for (let i = 0; i < Math.ceil(this.continuousRareNum / 2) + 1; i++) {
      if (this.continuousRareNum % 2 == 1) {
        valid = valid || Math.abs(card.number - currentVal.number) == 2 * i;
      } else {
        valid = valid || Math.abs(card.number - currentVal.number) == 2 * i + 1;
      }
    }
    return valid;
  }

  caclCurrentVal(currentVal: CardVal, card: Card): CardVal {
    let returnVal: CardVal = {
      number: card.number,
      color: card.color,
      isRare: card.type == CardType.RARE
    };
    if (card.isRare) {
      returnVal.number = currentVal.number;
    }
    if (currentVal.isRare && card.isRare) {
      this.continuousRareNum++;
    } else {
      if (card.isRare) {
        this.continuousRareNum = 1;
      } else {
        this.continuousRareNum = 0;
      }
    }
    return returnVal;
  }
}

export class Lake implements Rule {
  card: Card = new Card(8, CardGroup.NONE, CardType.RULE);
  checkValid(fieldCardCount: number, currentVal: CardVal, card: Card): boolean {
    if (fieldCardCount == 0 || this.isRare(card) || currentVal.color[0] == Color.NONE) {
      return true;
    }
    if (
      card.color[0] == this.getNextColor(currentVal.color[0]!) ||
      card.color[0] == this.getNextColor(currentVal.color[1]!) ||
      card.color[1] == this.getNextColor(currentVal.color[0]!) ||
      card.color[1] == this.getNextColor(currentVal.color[1]!)
    ) {
      return true;
    }
    return false;
  }

  caclCurrentVal(currentVal: CardVal, card: Card): CardVal {
    let returnVal: CardVal = {
      number: card.number,
      color: [this.getNextColor(currentVal.color[0]!), this.getNextColor(currentVal.color[1]!)],
      isRare: card.type == CardType.RARE
    };
    if (currentVal.color[0] == Color.NONE && card.color[0] != Color.PURPLE) {
      returnVal.color = card.color;
    }
    
    return returnVal;
  }

  private isRare(card: Card): boolean {
    return card.isRare || card.color![0] == Color.PURPLE;
  }

  private getNextColor(color: Color) : Color {
    switch (color) {
      case Color.RED:
        return Color.BLUE;
      case Color.BLUE:
        return Color.GREEN;
      case Color.GREEN:
        return Color.YELLOW;
      case Color.YELLOW:
        return Color.RED;
      case Color.NONE:
        return Color.NONE;
      default:
        return Color.NONE;
    }
  }
}

export class Swamp extends Lake {
  card: Card = new Card(9, CardGroup.NONE, CardType.RULE);

  override checkValid(fieldCardCount: number, currentVal: CardVal, card: Card): boolean {
    return card.number != 6 && card.number != 7 && card.number != 8 && card.number != 9 &&
      super.checkValid(fieldCardCount, currentVal, card);
  }
}