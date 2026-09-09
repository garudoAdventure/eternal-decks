import { Component, inject } from '@angular/core';
import { GameEvent } from '@shared/types';
import { GameBoardStateService } from '../gameBoardState.service';
import { GameActionStateService } from '../gameActionState.service';
import { SocketService } from '../../core/socket.service';

@Component({
  selector: 'app-heart-area',
  imports: [],
  templateUrl: './heart-area.html',
  styleUrl: './heart-area.scss',
})
export class HeartArea {
  private socketService = inject(SocketService);
  private gamebBoardState = inject(GameBoardStateService);
  private gameActionState = inject(GameActionStateService);

  hearts = this.gamebBoardState.hearts;
  validHeart = this.gameActionState.validHeart;

  onSelectHeart(idx: number) {
    this.socketService.emit(GameEvent.SELECT_HEART, {
      roomId: sessionStorage.getItem('roomId'),
      heartIdx: idx,
    });
  }
}
