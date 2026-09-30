import { Component, inject } from '@angular/core';
import { GameEvent } from '@shared/types';
import { Card } from '../Card/card';
import { SocketService } from '../../core/socket.service';
import { GameBoardStateService } from '../gameBoardState.service';
import { GameActionStateService } from '../gameActionState.service';
import { FieldDropZoneDirective } from '../field/field-drop-zone.directive';
import { FieldDropZoneService } from '../field/field-drop-zone.service';

@Component({
  selector: 'app-river',
  imports: [Card, FieldDropZoneDirective],
  templateUrl: './river.html',
  styleUrl: './river.scss',
})
export class River {
  private socketService = inject(SocketService);
  private gamebBoardState = inject(GameBoardStateService);
  private gameActionState = inject(GameActionStateService);
  private dropZone = inject(FieldDropZoneService);

  river = this.gamebBoardState.river;
  validRiverCard = this.gameActionState.validRiverCard;

  isValidTarget(): boolean {
    return this.dropZone.isDragging();
  }

  isHovered(): boolean {
    return this.dropZone.isHovered('river');
  }

  onSelectCard(index: number) {
    this.socketService.emit(GameEvent.SELECT_CARD, {
      roomId: sessionStorage.getItem('roomId'),
      cardIdx: index,
    });
  }
}
