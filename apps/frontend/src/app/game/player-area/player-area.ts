import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Color, GameEvent, CardSize, CardType } from '@shared/types';
import { Card } from '../Card/card';
import { SocketService } from '../../core/socket.service';
import { GameBoardStateService } from '../gameBoardState.service';
import { GameActionStateService } from '../gameActionState.service';

@Component({
  selector: 'app-player-area',
  imports: [CommonModule, MatCardModule, MatIconModule, Card],
  templateUrl: './player-area.html',
  styleUrl: './player-area.scss',
})
export class PlayerArea {
  get CardType() { return CardType; }
  get CardSize() { return CardSize; }

  private socketService = inject(SocketService);
  private gameBoardState = inject(GameBoardStateService);
  private gameActionState = inject(GameActionStateService);

  players = this.gameBoardState.players;
  selectedCard = this.gameActionState.selectedCard;

  onSelectPlayer(id: string) {
    this.socketService.emit(GameEvent.SELECT_PLAYER, {
      roomId: sessionStorage.getItem('roomId'),
      playerId: id
    });
  }

  onSelectCard(idx: number) {
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
