import { Color, CardGroup, CardType } from "@shared/types";
import { Card } from "../entities/Card";
import { PhoenixAbility, MermaidAbility, KingAbility, FairyAbility } from "../entities/Abilities/star-card-ability";
import { GhostAbility } from "../entities/Abilities/ghost-ability";
import { SkeletonAbility } from "../entities/Abilities/skeleton-ability";
import { WitchAbility } from "../entities/Abilities/witch-ability";
import { MedusaAbility } from "../entities/Abilities/medusa-ability";
import { MinotaurAbility } from "../entities/Abilities/minotaur-ability";
import { KrakenAbility } from "../entities/Abilities/kraken-ability";

export function createInitDeck(color: Color) {
  let cardGroup: CardGroup = CardGroup.INIT_RED;
  let cardColor: Color = Color.RED;
  switch (color) {
    case Color.RED:
      break;
    case Color.BLUE:
      cardGroup = CardGroup.INIT_BLUE;
      cardColor = Color.BLUE;
      break;
    case Color.GREEN:
      cardGroup = CardGroup.INIT_GREEN;
      cardColor = Color.GREEN;
      break;
    case Color.YELLOW:
      cardGroup = CardGroup.INIT_YELLOW;
      cardColor = Color.YELLOW;
      break;
  }
  return [
    new Card(1, cardGroup, CardType.NUMBER, 1, [cardColor, cardColor]),
    new Card(2, cardGroup, CardType.NUMBER, 2, [cardColor, cardColor]),
    new Card(3, cardGroup, CardType.NUMBER, 3, [cardColor, cardColor]),
    new Card(4, cardGroup, CardType.NUMBER, 4, [cardColor, cardColor]),
    new Card(5, cardGroup, CardType.NUMBER, 5, [cardColor, cardColor]),
  ];

}

export function createPhoenixDeck(): Card[] {
  return [
    new Card(1, CardGroup.PHOENIX, CardType.NUMBER, 3, [Color.GREEN, Color.GREEN]),
    new Card(2, CardGroup.PHOENIX, CardType.NUMBER, 6, [Color.RED, Color.RED]),
    new Card(3, CardGroup.PHOENIX, CardType.NUMBER, 6, [Color.YELLOW, Color.YELLOW]),
    new Card(4, CardGroup.PHOENIX, CardType.NUMBER, 7, [Color.RED, Color.RED]),
    new Card(5, CardGroup.PHOENIX, CardType.NUMBER, 8, [Color.RED, Color.RED]),
    new Card(6, CardGroup.PHOENIX, CardType.NUMBER, 8, [Color.RED, Color.RED]),
    new Card(7, CardGroup.PHOENIX, CardType.NUMBER, 9, [Color.RED, Color.RED]),
    new PhoenixAbility(),
  ];
}

export function createMermaidDeck(): Card[] {
  return [
    new Card(1, CardGroup.MERMAID, CardType.NUMBER, 1, [Color.BLUE, Color.BLUE]),
    new Card(2, CardGroup.MERMAID, CardType.NUMBER, 2, [Color.GREEN, Color.GREEN]),
    new Card(3, CardGroup.MERMAID, CardType.NUMBER, 5, [Color.BLUE, Color.BLUE]),
    new Card(4, CardGroup.MERMAID, CardType.NUMBER, 5, [Color.RED, Color.RED]),
    new Card(5, CardGroup.MERMAID, CardType.NUMBER, 6, [Color.BLUE, Color.BLUE]),
    new Card(6, CardGroup.MERMAID, CardType.NUMBER, 7, [Color.BLUE, Color.BLUE]),
    new Card(7, CardGroup.MERMAID, CardType.NUMBER, 7, [Color.BLUE, Color.BLUE]),
    new MermaidAbility(),
  ];
}

export function createKingDeck(): Card[] {
  return [
    new Card(1, CardGroup.KING, CardType.NUMBER, 1, [Color.YELLOW, Color.YELLOW]),
    new Card(2, CardGroup.KING, CardType.NUMBER, 3, [Color.RED, Color.RED]),
    new Card(3, CardGroup.KING, CardType.NUMBER, 4, [Color.GREEN, Color.GREEN]),
    new Card(4, CardGroup.KING, CardType.NUMBER, 5, [Color.YELLOW, Color.YELLOW]),
    new Card(5, CardGroup.KING, CardType.NUMBER, 8, [Color.YELLOW, Color.YELLOW]),
    new Card(6, CardGroup.KING, CardType.NUMBER, 9, [Color.YELLOW, Color.YELLOW]),
    new Card(7, CardGroup.KING, CardType.NUMBER, 9, [Color.YELLOW, Color.YELLOW]),
    new KingAbility(),
  ];
}

export function createFairyDeck(): Card[] {
  return [
    new Card(1, CardGroup.FAIRY, CardType.NUMBER, 1, [Color.GREEN, Color.GREEN]),
    new Card(2, CardGroup.FAIRY, CardType.NUMBER, 1, [Color.GREEN, Color.GREEN]),
    new Card(3, CardGroup.FAIRY, CardType.NUMBER, 2, [Color.BLUE, Color.BLUE]),
    new Card(4, CardGroup.FAIRY, CardType.NUMBER, 3, [Color.YELLOW, Color.YELLOW]),
    new Card(5, CardGroup.FAIRY, CardType.NUMBER, 6, [Color.GREEN, Color.GREEN]),
    new Card(6, CardGroup.FAIRY, CardType.NUMBER, 7, [Color.GREEN, Color.GREEN]),
    new Card(7, CardGroup.FAIRY, CardType.NUMBER, 8, [Color.GREEN, Color.GREEN]),
    new FairyAbility(),
  ];
}

export function createGhostDeck(): Card[] {
  return [
    new Card(1, CardGroup.GHOST, CardType.NUMBER, 2, [Color.GREEN, Color.GREEN]),
    new Card(2, CardGroup.GHOST, CardType.NUMBER, 2, [Color.PURPLE, Color.PURPLE]),
    new Card(3, CardGroup.GHOST, CardType.NUMBER, 3, [Color.PURPLE, Color.PURPLE]),
    new Card(4, CardGroup.GHOST, CardType.NUMBER, 6, [Color.GREEN, Color.GREEN]),
    new Card(5, CardGroup.GHOST, CardType.NUMBER, 8, [Color.GREEN, Color.GREEN]),
    new Card(6, CardGroup.GHOST, CardType.NUMBER, 9, [Color.PURPLE, Color.PURPLE]),
    new Card(7, CardGroup.GHOST, CardType.RARE, 0),
    new GhostAbility(),
  ];
}

export function createSkeletonDeck(): Card[] {
  return [
    new Card(1, CardGroup.SKELETON, CardType.NUMBER, 1, [Color.PURPLE, Color.PURPLE]),
    new Card(2, CardGroup.SKELETON, CardType.NUMBER, 3, [Color.YELLOW, Color.YELLOW]),
    new Card(3, CardGroup.SKELETON, CardType.NUMBER, 4, [Color.YELLOW, Color.YELLOW]),
    new Card(4, CardGroup.SKELETON, CardType.NUMBER, 4, [Color.PURPLE, Color.PURPLE]),
    new Card(5, CardGroup.SKELETON, CardType.NUMBER, 7, [Color.PURPLE, Color.PURPLE]),
    new Card(6, CardGroup.SKELETON, CardType.NUMBER, 9, [Color.YELLOW, Color.YELLOW]),
    new Card(7, CardGroup.SKELETON, CardType.RARE, 0),
    new SkeletonAbility(),
  ];
}

export function createWitchDeck(): Card[] {
  return [
    new Card(1, CardGroup.WITCH, CardType.NUMBER, 2, [Color.BLUE, Color.BLUE]),
    new Card(2, CardGroup.WITCH, CardType.NUMBER, 3, [Color.PURPLE, Color.PURPLE]),
    new Card(3, CardGroup.WITCH, CardType.NUMBER, 4, [Color.BLUE, Color.BLUE]),
    new Card(4, CardGroup.WITCH, CardType.NUMBER, 5, [Color.PURPLE, Color.PURPLE]),
    new Card(5, CardGroup.WITCH, CardType.NUMBER, 6, [Color.PURPLE, Color.PURPLE]),
    new Card(6, CardGroup.WITCH, CardType.NUMBER, 7, [Color.BLUE, Color.BLUE]),
    new Card(7, CardGroup.WITCH, CardType.NUMBER, 8, [Color.PURPLE, Color.PURPLE]),
    new WitchAbility(),
  ];
}

export function createVampireDeck(): Card[] {
  return [
    new Card(1, CardGroup.VAMPIRE, CardType.NUMBER, 1, [Color.RED, Color.RED]),
    new Card(2, CardGroup.VAMPIRE, CardType.NUMBER, 3, [Color.BLUE, Color.BLUE]),
    new Card(3, CardGroup.VAMPIRE, CardType.NUMBER, 3, [Color.GREEN, Color.GREEN]),
    new Card(4, CardGroup.VAMPIRE, CardType.NUMBER, 3, [Color.YELLOW, Color.YELLOW]),
    new Card(5, CardGroup.VAMPIRE, CardType.NUMBER, 5, [Color.RED, Color.RED]),
    new Card(6, CardGroup.VAMPIRE, CardType.NUMBER, 8, [Color.RED, Color.RED]),
    new Card(7, CardGroup.VAMPIRE, CardType.RARE, 0),
    new Card(8, CardGroup.VAMPIRE, CardType.RARE, 0),
  ];
}

export function createMedusaDeck(): Card[] {
  return [
    new Card(1, CardGroup.MEDUSA, CardType.NUMBER, 1, [Color.BLUE, Color.YELLOW]),
    new Card(2, CardGroup.MEDUSA, CardType.NUMBER, 2, [Color.GREEN, Color.GREEN]),
    new Card(3, CardGroup.MEDUSA, CardType.NUMBER, 3, [Color.BLUE, Color.YELLOW]),
    new Card(4, CardGroup.MEDUSA, CardType.NUMBER, 4, [Color.BLUE, Color.YELLOW]),
    new Card(5, CardGroup.MEDUSA, CardType.NUMBER, 6, [Color.BLUE, Color.YELLOW]),
    new Card(6, CardGroup.MEDUSA, CardType.NUMBER, 8, [Color.BLUE, Color.YELLOW]),
    new Card(7, CardGroup.MEDUSA, CardType.NUMBER, 8, [Color.GREEN, Color.GREEN]),
    new MedusaAbility(),
  ];
}

export function createMinotaurDeck(): Card[] {
  return [
    new Card(1, CardGroup.MINOTAUR, CardType.NUMBER, 1, [Color.RED, Color.RED]),
    new Card(2, CardGroup.MINOTAUR, CardType.NUMBER, 2, [Color.RED, Color.GREEN]),
    new Card(3, CardGroup.MINOTAUR, CardType.NUMBER, 4, [Color.RED, Color.RED]),
    new Card(4, CardGroup.MINOTAUR, CardType.NUMBER, 4, [Color.RED, Color.GREEN]),
    new Card(5, CardGroup.MINOTAUR, CardType.NUMBER, 5, [Color.RED, Color.GREEN]),
    new Card(6, CardGroup.MINOTAUR, CardType.NUMBER, 9, [Color.RED, Color.RED]),
    new Card(7, CardGroup.MINOTAUR, CardType.NUMBER, 9, [Color.RED, Color.GREEN]),
    new MinotaurAbility(),
  ];
}

export function createKrakenDeck(): Card[] {
  return [
    new Card(1, CardGroup.KRAKEN, CardType.NUMBER, 2, [Color.BLUE, Color.YELLOW]),
    new Card(2, CardGroup.KRAKEN, CardType.NUMBER, 4, [Color.BLUE, Color.BLUE]),
    new Card(3, CardGroup.KRAKEN, CardType.NUMBER, 5, [Color.YELLOW, Color.YELLOW]),
    new Card(4, CardGroup.KRAKEN, CardType.NUMBER, 5, [Color.BLUE, Color.YELLOW]),
    new Card(5, CardGroup.KRAKEN, CardType.NUMBER, 7, [Color.YELLOW, Color.YELLOW]),
    new Card(6, CardGroup.KRAKEN, CardType.NUMBER, 7, [Color.BLUE, Color.YELLOW]),
    new Card(7, CardGroup.KRAKEN, CardType.NUMBER, 9, [Color.BLUE, Color.YELLOW]),
    new KrakenAbility(),
  ];
}

export function createMummyDeck(): Card[] {
  return [
    new Card(1, CardGroup.MUMMY, CardType.NUMBER, 1, [Color.RED, Color.GREEN]),
    new Card(2, CardGroup.MUMMY, CardType.NUMBER, 1, [Color.BLUE, Color.BLUE]),
    new Card(3, CardGroup.MUMMY, CardType.NUMBER, 3, [Color.RED, Color.GREEN]),
    new Card(4, CardGroup.MUMMY, CardType.NUMBER, 5, [Color.BLUE, Color.BLUE]),
    new Card(5, CardGroup.MUMMY, CardType.NUMBER, 6, [Color.RED, Color.GREEN]),
    new Card(6, CardGroup.MUMMY, CardType.NUMBER, 7, [Color.RED, Color.GREEN]),
    new Card(7, CardGroup.MUMMY, CardType.NUMBER, 8, [Color.RED, Color.GREEN]),
    new Card(8, CardGroup.MUMMY, CardType.ABILITY),
  ];
}