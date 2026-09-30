import { Injectable, signal } from '@angular/core';

export type DropZoneKey = number | 'river';

@Injectable({ providedIn: 'root' })
export class FieldDropZoneService {
  private elements = new Map<DropZoneKey, HTMLElement>();
  private readonly keys: DropZoneKey[] = [0, 1, 2, 'river'];

  readonly isDragging = signal(false);
  readonly hoveredZone = signal<DropZoneKey | null>(null);

  register(key: DropZoneKey, el: HTMLElement) {
    this.elements.set(key, el);
  }

  unregister(key: DropZoneKey) {
    this.elements.delete(key);
  }

  startDrag() {
    this.isDragging.set(true);
    this.hoveredZone.set(null);
  }

  updateDragPos(point: { x: number; y: number }) {
    for (const key of this.keys) {
      const rect = this.getRect(key);
      if (rect && this.isPointInRect(point, rect)) {
        this.hoveredZone.set(key);
        return;
      }
    }
    this.hoveredZone.set(null);
  }

  endDrag(): DropZoneKey | null {
    const result = this.hoveredZone();
    this.isDragging.set(false);
    this.hoveredZone.set(null);
    return result;
  }

  isHovered(key: DropZoneKey): boolean {
    return this.hoveredZone() === key;
  }

  private getRect(key: DropZoneKey): DOMRect | null {
    return this.elements.get(key)?.getBoundingClientRect() ?? null;
  }

  private isPointInRect(point: { x: number; y: number }, rect: DOMRect): boolean {
    return point.x >= rect.left &&
      point.x <= rect.right &&
      point.y >= rect.top &&
      point.y <= rect.bottom;
  }
}