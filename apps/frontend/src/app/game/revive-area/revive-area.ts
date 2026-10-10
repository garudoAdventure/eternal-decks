import { Component, inject } from '@angular/core';
import { GameEvent } from '@shared/types';
import { Card } from '../Card/card';
import { SocketService } from '../../core/socket.service';
import { GameBoardStateService } from '../gameBoardState.service';
import { GameActionStateService } from '../gameActionState.service';

@Component({
  selector: 'app-revive-area',
  imports: [Card],
  templateUrl: './revive-area.html',
  styleUrl: './revive-area.scss',
})
export class ReviveArea {
  private socketService = inject(SocketService);
  private gameBoardState = inject(GameBoardStateService);
  private gameActionState = inject(GameActionStateService);

  eternals = this.gameBoardState.eternals;
  stars = this.gameBoardState.stars;
  validEternal = this.gameActionState.validEternal;

  onSelectEternal(index: number) {
    this.socketService.emit(GameEvent.SELECT_ETERNAL, {
      roomId: sessionStorage.getItem('roomId'),
      eternalIdx: index,
    });
  }
}