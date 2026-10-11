import { Component, inject } from '@angular/core';
import { Card } from '../Card/card';
import { GameBoardStateService } from '../gameBoardState.service';

@Component({
  selector: 'app-discard',
  imports: [Card],
  templateUrl: './discard.html',
  styleUrl: './discard.scss',
})
export class Discard {
  private gameBoardState = inject(GameBoardStateService);

  discard = this.gameBoardState.discard;
}
