import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameEvent } from '@shared/types';
import { Card } from '../Card/card';
import { SocketService } from '../../core/socket.service';
import { GameBoardStateService } from '../gameBoardState.service';
import { GameActionStateService } from '../gameActionState.service';
import { BoardRefDirective } from '../Board-ref/board-ref.directive';
import { DragStateService } from '../../core/drag-state.service';
import { BoardRefType } from '../Board-ref/board-ref.enum';
import { BoardRef } from '../Board-ref/board-ref.interface';

@Component({
  selector: 'app-field',
  imports: [CommonModule, Card, BoardRefDirective],
  templateUrl: './field.html',
  styleUrl: './field.scss',
})
export class Field {
  private socketService = inject(SocketService);
  private gameBoardState = inject(GameBoardStateService);
  private gameActionState = inject(GameActionStateService);
  private dragState = inject(DragStateService);

  fields = this.gameBoardState.fields;
  validField = this.gameActionState.validField;
  validFieldEternal = this.gameActionState.validFieldEternal;

  isValidTarget(fieldIdx: number): boolean {
    return this.dragState.isDragging() && this.validField()[fieldIdx];
  }

  isHovered(fieldIdx: number): boolean {
    const hoveredTarget = this.dragState.hoveredTarget();
    return hoveredTarget?.type == BoardRefType.FIELD && hoveredTarget.fieldIdx == fieldIdx;
  }

  getFieldKey(fieldIdx: number): BoardRef {
    return { type: BoardRefType.FIELD, fieldIdx };
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
