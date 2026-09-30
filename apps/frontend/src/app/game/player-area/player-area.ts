import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CdkDrag, CdkDragEnd, CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop'
import { Color, GameEvent, CardSize, CardType } from '@shared/types';
import { Card } from '../Card/card';
import { SocketService } from '../../core/socket.service';
import { GameBoardStateService } from '../gameBoardState.service';
import { GameActionStateService } from '../gameActionState.service';
import { FieldDropZoneService } from '../field/field-drop-zone.service';
import { AnimationService } from '../animation.service';

@Component({
  selector: 'app-player-area',
  imports: [CommonModule, MatCardModule, MatIconModule, Card, CdkDrag],
  templateUrl: './player-area.html',
  styleUrl: './player-area.scss',
})
export class PlayerArea {
  get CardType() { return CardType; }
  get CardSize() { return CardSize; }

  private socketService = inject(SocketService);
  private gameBoardState = inject(GameBoardStateService);
  private gameActionState = inject(GameActionStateService);
  private animationService = inject(AnimationService);
  private dropZone = inject(FieldDropZoneService);

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

  resetCardDragDistance() {
    this.cardDragDistance = 0;
  }

  onDragStarted(event: CdkDragStart, idx: number) {
    this.draggingCardIdx = idx;
    this.dropZone.startDrag();

    this.socketService.emit(GameEvent.DRAG_CARD, {
      roomId: sessionStorage.getItem('roomId'),
      cardIdx: idx
    });
  }

  onDragMoved(event: CdkDragMove) {
    this.dropZone.updateDragPos(event.pointerPosition);

    const x = event.distance.x;
    const y = event.distance.y;
    this.cardDragDistance = Math.sqrt(x * x + y * y);
  }

  onDragEnded(event: CdkDragEnd, cardId: string) {
    const cardIdx = this.draggingCardIdx;
    this.draggingCardIdx = null;

    const target = this.dropZone.endDrag();
    event.source.reset();

    if (target === null) return;

    if (target === 'river') {
      this.socketService.emit(GameEvent.PLAY_CARD_TO_RIVER, {
        roomId: sessionStorage.getItem('roomId'),
        cardIdx
      });
    } else {
      const fieldIdx = target;
      if (this.validField()[fieldIdx]) {
        this.animationService.addState(cardId);
        this.socketService.emit(GameEvent.PLAY_CARD_TO_FIELD, {
          roomId: sessionStorage.getItem('roomId'),
          fieldIdx,
          cardIdx
        });
      }
    }
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
