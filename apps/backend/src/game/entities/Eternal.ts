import { Color, CardGroup, CardType, EternalData } from "@shared/types";
import { Deck } from "./Deck";
import { Card } from "./Card";
import { createFairyDeck, createGhostDeck, createKingDeck, createKrakenDeck, createMedusaDeck, createMermaidDeck, createMinotaurDeck, createMummyDeck, createPhoenixDeck, createSkeletonDeck, createVampireDeck, createWitchDeck } from "../Card/cards.db";

export class Eternal {
  card: Card = new Card(0, CardGroup.NONE, CardType.ETERNAL);
  deck: Deck = new Deck([]);
  isRelease: boolean = false;
  isCurse: boolean = true;
  useJewel: number = -1;

  isValid(card : Card): boolean { return true; }
  release() {
    this.isRelease = true;
    this.card.isBack = true;
    this.card.subID = 10;
  }
  getData(): EternalData {
    return {
      card: this.card.getData(),
      isRelease: this.isRelease,
      isCurse: this.isCurse,
      useJewel: this.useJewel
    };
  }
}

export class Phoenix extends Eternal {
  card: Card = new Card(9, CardGroup.PHOENIX, CardType.ETERNAL);
  deck: Deck = new Deck(createPhoenixDeck());

  isValid(card: Card): boolean {
    return card.type == CardType.RARE ||
      card.number != 1;
  }
}

export class Mermaid extends Eternal {
  card: Card = new Card(9, CardGroup.MERMAID, CardType.ETERNAL);
  deck: Deck = new Deck(createMermaidDeck());

  isValid(card: Card): boolean {
    return card.type == CardType.RARE ||
      card.number != 4;
  }
}

export class King extends Eternal {
  card: Card = new Card(9, CardGroup.KING, CardType.ETERNAL);
  deck: Deck = new Deck(createKingDeck());
  
  isValid(card: Card): boolean {
    return card.type == CardType.RARE ||
      card.number != 6;
  }
}

export class Fairy extends Eternal {
  card: Card = new Card(9, CardGroup.FAIRY, CardType.ETERNAL);
  deck: Deck = new Deck(createFairyDeck());

  isValid(card: Card): boolean {
    return card.type == CardType.RARE ||
      card.number != 9;
  }
}

export class Ghost extends Eternal {
  card: Card = new Card(9, CardGroup.GHOST, CardType.ETERNAL);
  deck: Deck = new Deck(createGhostDeck());

  isValid(card: Card): boolean {
    return card.type == CardType.RARE ||
      card.number != 5 && card.number != 7;
  }
}

export class Skeleton extends Eternal {
  card: Card = new Card(9, CardGroup.SKELETON, CardType.ETERNAL);
  deck: Deck = new Deck(createSkeletonDeck());

  isValid(card: Card): boolean {
    return card.type == CardType.RARE ||
      card.number != 2 && card.number != 8;
  }
}

export class Witch extends Eternal {
  card: Card = new Card(9, CardGroup.WITCH, CardType.ETERNAL);
  deck: Deck = new Deck(createWitchDeck());

  isValid(card: Card): boolean {
    return card.type != CardType.RARE;
  }
}

export class Vampire extends Eternal {
  card: Card = new Card(9, CardGroup.VAMPIRE, CardType.ETERNAL);
  deck: Deck = new Deck(createVampireDeck());

  isValid(card: Card): boolean {
    return card.type == CardType.RARE ||
      card.cardColor[0] != Color.PURPLE && card.cardColor[1] != Color.PURPLE;
  }
}

export class Medusa extends Eternal {
  card: Card = new Card(9, CardGroup.MEDUSA, CardType.ETERNAL);
  deck: Deck = new Deck(createMedusaDeck());

  isValid(card: Card): boolean {
    return card.type == CardType.RARE ||
      card.cardColor[0] != Color.RED && card.cardColor[1] != Color.RED;
  }
}

export class Minotaur extends Eternal {
  card: Card = new Card(9, CardGroup.MINOTAUR, CardType.ETERNAL);
  deck: Deck = new Deck(createMinotaurDeck());

  isValid(card: Card): boolean {
    return card.type == CardType.RARE ||
      card.cardColor[0] != Color.BLUE && card.cardColor[1] != Color.BLUE;
  }
}

export class Kraken extends Eternal {
  card: Card = new Card(9, CardGroup.KRAKEN, CardType.ETERNAL);
  deck: Deck = new Deck(createKrakenDeck());

  isValid(card: Card): boolean {
    return card.type == CardType.RARE ||
      card.cardColor[0] != Color.GREEN && card.cardColor[1] != Color.GREEN;
  }
}

export class Mummy extends Eternal {
  card: Card = new Card(9, CardGroup.MUMMY, CardType.ETERNAL);
  deck: Deck = new Deck(createMummyDeck());

  isValid(card: Card): boolean {
    return card.type == CardType.RARE ||
      card.cardColor[0] != Color.YELLOW && card.cardColor[1] != Color.YELLOW;
  }
}