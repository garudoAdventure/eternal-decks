import { Injectable } from '@angular/core';
import { BoardRefType } from './board-ref.enum';
import { BoardRef } from './board-ref.interface';

@Injectable({ providedIn: 'root' })
export class BoardRefRegistryService {
  private elements = new Map<string, HTMLElement>();

  register(boardRef: BoardRef, el: HTMLElement) {
    this.elements.set(this.serializeKey(boardRef), el);
  }

  unregister(boardRef: BoardRef) {
    this.elements.delete(this.serializeKey(boardRef));
  }

  getRect(boardRef: BoardRef): DOMRect | null {
    return this.elements.get(this.serializeKey(boardRef))?.getBoundingClientRect() ?? null;
  }

  private serializeKey(boardRef: BoardRef): string {
    switch (boardRef.type) {
      case BoardRefType.HAND:
        return `hand-${boardRef.index}`;
      case BoardRefType.FIELD:
        return `field-${boardRef.index}`;
      case BoardRefType.RIVER:
        return `river`;
      default:
        return '';
    }
  }
}