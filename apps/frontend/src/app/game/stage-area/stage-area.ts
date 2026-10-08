import { Component, inject, computed } from '@angular/core';
import { GameBoardStateService } from '../gameBoardState.service';
import { Card } from '../Card/card';

@Component({
  selector: 'app-stage-area',
  imports: [Card],
  templateUrl: './stage-area.html',
  styleUrl: './stage-area.scss',
})
export class StageArea {
  private gameBoardState = inject(GameBoardStateService);

  starCard = this.gameBoardState.starCard;
  getStars = this.gameBoardState.getStars;
}
