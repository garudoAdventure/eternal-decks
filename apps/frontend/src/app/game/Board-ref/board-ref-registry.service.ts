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

  getElement(boardRef: BoardRef): HTMLElement | null {
    return this.elements.get(this.serializeKey(boardRef)) ?? null;
  }

 private serializeKey(ref: BoardRef): string {
  switch (ref.type) {
    case BoardRefType.HAND:
      return `hand-${ref.playerId}-${ref.cardIdx}`;
    case BoardRefType.FIELD:
      return `field-${ref.fieldIdx}`;
    case BoardRefType.RIVER:
      return 'river';
    case BoardRefType.DISCARD:
      return 'discard';
    default: {
      const exhaustiveCheck: never = ref;
      throw new Error(`未處理的 BoardRef type: ${JSON.stringify(exhaustiveCheck)}`);
    }
  }
}
}