import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardType, GameEvent } from '@shared/types';
import { Card } from '../Card/card';
import { SocketService } from '../../core/socket.service';
import { GameBoardStateService } from '../gameBoardState.service';
import { GameActionStateService } from '../gameActionState.service';
import { FieldDropZoneDirective } from './field-drop-zone.directive';
import { FieldDropZoneService } from './field-drop-zone.service';

@Component({
  selector: 'app-field',
  imports: [CommonModule, Card, FieldDropZoneDirective],
  templateUrl: './field.html',
  styleUrl: './field.scss',
})
export class Field {
  get CardType() { return CardType; }

  private socketService = inject(SocketService);
  private gameBoardState = inject(GameBoardStateService);
  private gameActionState = inject(GameActionStateService);
  private dropZone = inject(FieldDropZoneService);

  fields = this.gameBoardState.fields;
  stars = this.gameBoardState.stars;
  campBonus = this.gameBoardState.campBonus;
  validField = this.gameActionState.validField;
  validFieldCard = this.gameActionState.validFieldCard;
  validFieldEternal = this.gameActionState.validFieldEternal;
                  
  constructor() {
  }

  isValidTarget(fieldIdx: number): boolean {
    return this.dropZone.isDragging() && this.validField()[fieldIdx];
  }

  isHovered(fieldIdx: number): boolean {
    return this.dropZone.isHovered(fieldIdx);
  }

  onSelectFieldCard(fieldIdx: number, cardIdx: number) {
    this.socketService.emit(GameEvent.SELECT_FIELD_CARD, {
      roomId: sessionStorage.getItem('roomId'),
      fieldIdx: fieldIdx,
      cardIdx: cardIdx
    });
  }

  onSelectFieldEternal(index: number, fieldIdx: number, cardId: string) {
    this.socketService.emit(GameEvent.SELECT_FIELD_ETERNAL, {
      roomId: sessionStorage.getItem('roomId'),
      eternalIdx: index,
    });
  }
}
