import { Component, inject } from '@angular/core';
import { GameEvent } from '@shared/types';
import { Card } from '../Card/card';
import { SocketService } from '../../core/socket.service';
import { GameBoardStateService } from '../gameBoardState.service';
import { GameActionStateService } from '../gameActionState.service';
import { BoardRefDirective } from '../Board-ref/board-ref.directive';
import { DragStateService } from '../../core/drag-state.service';
import { BoardRef } from '../Board-ref/board-ref.interface';
import { BoardRefType } from '../Board-ref/board-ref.enum';

@Component({
  selector: 'app-river',
  imports: [Card, BoardRefDirective],
  templateUrl: './river.html',
  styleUrl: './river.scss',
})
export class River {
  private socketService = inject(SocketService);
  private gamebBoardState = inject(GameBoardStateService);
  private gameActionState = inject(GameActionStateService);
  private dragState = inject(DragStateService);

  river = this.gamebBoardState.river;
  validRiverCard = this.gameActionState.validRiverCard;

  isValidTarget(): boolean {
    return this.dragState.isDragging();
  }

  isHovered(): boolean {
    const hoveredTarget = this.dragState.hoveredTarget();
    return hoveredTarget?.type == BoardRefType.RIVER;
  }

  getFieldKey(): BoardRef {
    return { type: BoardRefType.RIVER, index: 0 };
  }

  onSelectCard(index: number) {
    this.socketService.emit(GameEvent.SELECT_CARD, {
      roomId: sessionStorage.getItem('roomId'),
      cardIdx: index,
    });
  }
}
