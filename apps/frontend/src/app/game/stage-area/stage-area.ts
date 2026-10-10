import { Component, inject } from '@angular/core';
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

  stars = this.gameBoardState.stars;
  starCard = this.gameBoardState.starCard;
  getStars = this.gameBoardState.getStars;
}
