import { Injectable, signal } from '@angular/core';
import { BoardRef } from '../game/Board-ref/board-ref.interface';

@Injectable({ providedIn: 'root' })
export class DragStateService {
  readonly isDragging = signal(false);
  readonly hoveredTarget = signal<BoardRef | null>(null);

  startDrag() {
    this.isDragging.set(true);
    this.hoveredTarget.set(null);
  }

  updateHover(target: BoardRef | null) {
    this.hoveredTarget.set(target);
  }

  endDrag() {
    this.isDragging.set(false);
    this.hoveredTarget.set(null);
  }
}