import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardData, CardGroup, CardSize, CardType } from '@shared/types';
import { GameService } from '../game.service';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  @Input() card!: CardData;
  @Input() size: CardSize = CardSize.M;

  // gameService = inject(GameService);

  cardImg: string = '';

  // showCardPreview($event: any) {
  //   if (this.card.group == CardGroup.NONE && this.card.type == CardType.NONE) {
  //     return;
  //   }
  //   let rect = $event.target.getBoundingClientRect();
  //   this.gameService.cardPreview = {
  //     isShow: true,
  //     cardImg: this.cardImg,
  //     top: rect.top + window.pageYOffset,
  //     left: rect.left + window.pageXOffset + rect.width
  //   };
  // }

  // closeCardPreview() {
  //   this.gameService.cardPreview.isShow = false;
  //   this.gameService.cardPreview.top = 0;
  //   this.gameService.cardPreview.left = 0;
  // }

  getCardImg(card: CardData): string {
    let imgUrl: string = '';
    switch(card.type) {
      case CardType.RARE:
        imgUrl = './asset/card/rare/0.jpg';
        break;
      case CardType.RULE:
        imgUrl = './asset/card/rule/' + card.id + '.jpg';
        break;
      default:
        imgUrl = './asset/card/' + this.getGroupStr(card.group) + '/' + card.id + '.jpg';
    }
    this.cardImg = imgUrl;
    return 'url(' + imgUrl + ')';
  }

  getCardSize() {
    let width = 0;
    let height = 0;
    switch(this.size) {
      case CardSize.M:
        width = 90;
        height= 130;
        break;
      case CardSize.L:
        width = 108;
        height= 156;
        break;
      case CardSize.XL:
        width = 90;
        height= 130;
        break;
    }
    return { 'width': width + 'px', 'height': height + 'px' };
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
