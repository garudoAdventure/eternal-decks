import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { GameEvent } from '@shared/types';
import { SocketService } from '../core/socket.service';
import { Field } from './field/field';
import { River } from './river/river';
import { Discard } from './discard/discard';
import { PlayerArea } from './player-area/player-area';
import { ReviveArea } from './revive-area/revive-area';
import { JewelArea } from './jewel-area/jewel-area';
import { StageArea } from './stage-area/stage-area';
import { HeartArea } from './heart-area/heart-area';
import { GameBoardStateService } from './gameBoardState.service';
import { GameActionStateService } from './gameActionState.service';
import { CardAnimationOverlay } from './animation-overlay/card-animation-overlay/card-animation-overlay';

@Component({
  selector: 'app-game',
  imports: [
    CommonModule, MatButtonModule,
    ReviveArea, Field, River, Discard, PlayerArea, JewelArea, StageArea, HeartArea,
    CardAnimationOverlay
  ],
  templateUrl: './game.html',
  styleUrl: './game.scss',
})
export class Game implements OnInit {
  private socketService = inject(SocketService);
  private gameBoardState = inject(GameBoardStateService);
  private gameActionState = inject(GameActionStateService);

  stars = this.gameBoardState.stars;
  message = this.gameActionState.message;
  button = this.gameActionState.button;

  ngOnInit() {
    this.socketService.emit('loadGame', { roomId: sessionStorage.getItem('roomId') });
  }

  onClickConfirmButton() {
    this.socketService.emit(GameEvent.CONFIRM_ACTION, {
      roomId: sessionStorage.getItem('roomId'),
    });
  }
}