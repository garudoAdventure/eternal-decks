import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardData, CardGroup, CardType } from '@shared/types';
import { CardPreviewService } from '../../core/card-preview.service';
import { FieldDropZoneService } from '../field/field-drop-zone.service';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  @Input() card!: CardData;

  private cardPreview = inject(CardPreviewService);
  private dropZone = inject(FieldDropZoneService);
  private timeoutId!: NodeJS.Timeout;

  onMouseEnter(event: MouseEvent) {
    if (this.card.group === CardGroup.NONE && this.card.type === CardType.NONE) return;
    this.timeoutId = setTimeout(() => {
      if (this.dropZone.isDragging()) return;
      if (!this.card.isBack) {
        this.cardPreview.show(this.getCardImg(this.card));
      } else {
        this.cardPreview.show(this.getCardBackImg(this.card));
      }
      this.cardPreview.updatePosition(event.clientX, event.clientY);
    }, 800); 
  }

  onMouseMove() {
    if (this.dropZone.isDragging()) {
      clearTimeout(this.timeoutId);
      this.cardPreview.hide();
    }
  }

  onMouseLeave() {
    clearTimeout(this.timeoutId);
    this.cardPreview.hide();
  }

  getCardImg(card: CardData): string {
    let imgUrl: string = '';
    switch(card.type) {
      case CardType.GAME_OVER:
        imgUrl = './asset/card/gameOver/0.jpg';
        break;
      case CardType.RARE:
        imgUrl = './asset/card/rare/0.jpg';
        break;
      case CardType.RULE:
        imgUrl = './asset/card/rule/' + card.subID + '.jpg';
        break;
      case CardType.ETERNAL:
        imgUrl = './asset/card/' + this.getGroupStr(card.group) + '/front.jpg';
        break;
      default:
        imgUrl = './asset/card/' + this.getGroupStr(card.group) + '/deck/' + card.subID + '.jpg';
    }
    return 'url(' + imgUrl + ')';
  }

  getCardBackImg(card: CardData): string {
    let imgUrl: string = '';
    switch(card.type) {
      case CardType.GAME_OVER:
        imgUrl = './asset/card/gameOver/back.jpg';
        break;
      case CardType.RARE:
        imgUrl = './asset/card/rare/0.jpg';
        break;
      case CardType.RULE:
        imgUrl = './asset/card/rule/back.jpg';
        break;
      case CardType.ETERNAL:
        imgUrl = './asset/card/' + this.getGroupStr(card.group) + '/back.jpg';
        break;
      default:
        imgUrl = './asset/card/' + this.getGroupStr(card.group) + '/deck/back.jpg';
    }

    return 'url(' + imgUrl + ')';
  }

  private getGroupStr(group: CardGroup) {
    switch(group) {
      case CardGroup.INIT_RED:
        return 'init_red';
      case CardGroup.INIT_BLUE:
        return 'init_blue';
      case CardGroup.INIT_GREEN:
        return 'init_green';
      case CardGroup.INIT_YELLOW:
        return 'init_yellow';
      case CardGroup.PHOENIX:
        return 'phoenix';
      case CardGroup.MERMAID:
        return 'mermaid';
      case CardGroup.KING:
        return 'king';
      case CardGroup.FAIRY:
        return 'fairy';
      case CardGroup.GHOST:
        return 'ghost';
      case CardGroup.SKELETON:
        return 'skeleton';
      case CardGroup.WITCH:
        return 'witch';
      case CardGroup.VAMPIRE:
        return 'vampire';
      case CardGroup.MEDUSA:
        return 'medusa';
      case CardGroup.MINOTAUR:
        return 'minotaur';
      case CardGroup.KRAKEN:
        return 'kraken';
      case CardGroup.MUMMY:
        return 'mummy';
      default:
        return '';
    }
  };
}
