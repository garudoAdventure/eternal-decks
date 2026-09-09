import { Component, inject } from '@angular/core';
import { GameEvent } from '@shared/types';
import { Card } from '../Card/card';
import { SocketService } from '../../core/socket.service';
import { GameBoardStateService } from '../gameBoardState.service';
import { GameActionStateService } from '../gameActionState.service';

@Component({
  selector: 'app-river',
  imports: [Card],
  templateUrl: './river.html',
  styleUrl: './river.scss',
})
export class River {
  private socketService = inject(SocketService);
  private gamebBoardState = inject(GameBoardStateService);
  private gameActionState = inject(GameActionStateService);

  river = this.gamebBoardState.river;
  validField = this.gameActionState.validField;
  validRiverCard = this.gameActionState.validRiverCard;

  onSelectCard(index: number) {
    this.socketService.emit(GameEvent.SELECT_CARD, {
      roomId: sessionStorage.getItem('roomId'),
      cardIdx: index,
    });
  }

  onSelectField(index: number) {
    this.socketService.emit(GameEvent.SELECT_FIELD, {
      roomId: sessionStorage.getItem('roomId'),
      fieldIdx: index,
    });
  }
}
