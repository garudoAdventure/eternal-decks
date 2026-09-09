import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameEvent } from '@shared/types';
import { Card } from '../Card/card';
import { SocketService } from '../../core/socket.service';
import { GameBoardStateService } from '../gameBoardState.service';
import { GameActionStateService } from '../gameActionState.service';

@Component({
  selector: 'app-field',
  imports: [CommonModule, Card],
  templateUrl: './field.html',
  styleUrl: './field.scss',
})
export class Field {
  private socketService = inject(SocketService);
  private gameBoardState = inject(GameBoardStateService);
  private gameActionState = inject(GameActionStateService);

  fields = this.gameBoardState.fields;
  validField = this.gameActionState.validField;
  validFieldEternal = this.gameActionState.validFieldEternal;

  onSelectField(index: number) {
    this.socketService.emit(GameEvent.SELECT_FIELD, {
      roomId: sessionStorage.getItem('roomId'),
      fieldIdx: index
    });
  }

  onSelectFieldCard(fieldIdx: number, cardIdx: number) {
    this.socketService.emit(GameEvent.SELECT_FIELD_CARD, {
      roomId: sessionStorage.getItem('roomId'),
      fieldIdx: fieldIdx,
      cardIdx: cardIdx
    });
  }

  onSelectFieldEternal(index: number) {
    this.socketService.emit(GameEvent.SELECT_FIELD_ETERNAL, {
      roomId: sessionStorage.getItem('roomId'),
      eternalIdx: index,
    });
  }
}
