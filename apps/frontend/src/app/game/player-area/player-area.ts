import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Color, GameEvent, CardSize, CardType } from '@shared/types';
import { Card } from '../Card/card';
import { SocketService } from '../../core/socket.service';
import { GameBoardStateService } from '../gameBoardState.service';
import { GameActionStateService } from '../gameActionState.service';

import { CdkDrag, CdkDragEnd, CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop'
import { DragStateService } from '../../core/drag-state.service';
import { BoardRefRegistryService } from '../Board-ref/board-ref-registry.service';
import { BoardRefDirective } from '../Board-ref/board-ref.directive';
import { BoardRefType } from '../Board-ref/board-ref.enum';
import { BoardRef } from '../Board-ref/board-ref.interface';

@Component({
  selector: 'app-player-area',
  imports: [CommonModule, MatCardModule, MatIconModule, Card, BoardRefDirective, CdkDrag],
  templateUrl: './player-area.html',
  styleUrl: './player-area.scss',
})
export class PlayerArea {
  get CardType() { return CardType; }
  get CardSize() { return CardSize; }

  private socketService = inject(SocketService);
  private gameBoardState = inject(GameBoardStateService);
  private gameActionState = inject(GameActionStateService);

  private registry = inject(BoardRefRegistryService);
  private dragState = inject(DragStateService);

  players = this.gameBoardState.players;
  selectedCard = this.gameActionState.selectedCard;
  validField = this.gameActionState.validField;

  cardDragDistance = 0;

  private draggingCardIdx: number | null = null;

  onSelectPlayer(id: string) {
    this.socketService.emit(GameEvent.SELECT_PLAYER, {
      roomId: sessionStorage.getItem('roomId'),
      playerId: id
    });
  }

  onSelectCard(idx: number) {
    if (this.cardDragDistance > 10) return;
    this.socketService.emit(GameEvent.SELECT_CARD, {
      roomId: sessionStorage.getItem('roomId'),
      cardIdx: idx
    });
  }

  useCard(idx: number) {
    this.socketService.emit(GameEvent.USE_CARD, {
      roomId: sessionStorage.getItem('roomId'),
      cardIdx: idx
    });
  }

  rotateCard(idx: number) {
    this.socketService.emit(GameEvent.ROTATE_CARD, {
      roomId: sessionStorage.getItem('roomId'),
      cardIdx: idx
    });
  }

  getHandKey(playerId: string, cardIdx: number): BoardRef {
    return { type: BoardRefType.HAND, playerId, cardIdx };
  }

  resetCardDragDistance() {
    this.cardDragDistance = 0;
  }

  onDragStarted(event: CdkDragStart, idx: number) {
    this.draggingCardIdx = idx;
    this.dragState.startDrag();
    this.socketService.emit(GameEvent.DRAG_CARD, {
      roomId: sessionStorage.getItem('roomId'),
      cardIdx: idx
    });
  }

  onDragMoved(event: CdkDragMove) {
    const point = event.pointerPosition;
    const target = this.detectDropTarget(point);
    this.dragState.updateHover(target);

    const x = event.distance.x;
    const y = event.distance.y;
    this.cardDragDistance = Math.sqrt(x * x + y * y);
  }

  onDragEnded(event: CdkDragEnd) {
    const cardIdx = this.draggingCardIdx;
    this.draggingCardIdx = null;

    const target = this.dragState.hoveredTarget();
    this.dragState.endDrag();

    // 不論成功失敗,先把拖曳元素視覺歸位(實際卡片是否還在,交給資料更新決定)
    event.source.reset();

    if (cardIdx === null || target === null) return;

    if (target.type == BoardRefType.RIVER) {
      this.socketService.emit(GameEvent.PLAY_CARD_TO_RIVER, {
        roomId: sessionStorage.getItem('roomId'),
        cardIdx
      });
    } else if (target.type == BoardRefType.FIELD) {
      const fieldIdx = target.fieldIdx;
      if (this.validField()[fieldIdx]) {
        this.socketService.emit(GameEvent.PLAY_CARD_TO_FIELD, {
          roomId: sessionStorage.getItem('roomId'),
          fieldIdx,
          cardIdx
        });
      }
    }    
  }

  private detectDropTarget(point: { x: number; y: number }): BoardRef | null {
    for (let i = 0; i < 3; i++) {
      const rect = this.registry.getRect({ type: BoardRefType.FIELD, fieldIdx: i });
      if (rect && this.isPointInRect(point, rect)) {
        return { type: BoardRefType.FIELD, fieldIdx: i };
      }
    }
    const riverRect = this.registry.getRect({ type: BoardRefType.RIVER });
    if (riverRect && this.isPointInRect(point, riverRect)) return { type: BoardRefType.RIVER };
    return null;
  }

  private isPointInRect(point: { x: number; y: number }, rect: DOMRect): boolean {
    return point.x >= rect.left &&
      point.x <= rect.right &&
      point.y >= rect.top &&
      point.y <= rect.bottom;
  }

  getColorStr(color: Color) {
    switch(color) {
      case Color.RED:
        return 'red';
      case Color.GREEN:
        return 'green';
      case Color.BLUE:
        return 'blue';
      case Color.YELLOW:
        return 'yellow';
      default:
        return '';
    }
  }
}
