import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameEvent } from '@shared/types';
import { SocketService } from '../../core/socket.service';
import { GameBoardStateService } from '../gameBoardState.service';
import { GameActionStateService } from '../gameActionState.service';

@Component({
  selector: 'app-jewel-area',
  imports: [CommonModule],
  templateUrl: './jewel-area.html',
  styleUrl: './jewel-area.scss',
})
export class JewelArea {
  private socketService = inject(SocketService);
  private gameBoardState = inject(GameBoardStateService);
  private gameActionState = inject(GameActionStateService);
    
  jewels = this.gameBoardState.jewels;
  stars = this.gameBoardState.stars;
  validJewel = this.gameActionState.validJewel;

  onSelectJewel(index: number) {
    this.socketService.emit(GameEvent.SELECT_JEWEL, {
      roomId: sessionStorage.getItem('roomId'),
      jewelIdx: index,
    });
  }
}
