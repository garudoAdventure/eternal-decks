import { Injectable, inject, signal } from '@angular/core';
import { SocketService } from '../../core/socket.service';
import { BoardRefRegistryService } from '../Board-ref/board-ref-registry.service';
import { CardData } from '@shared/types';

export interface AnimationObject {
  id: number;
  type: 'card' | 'jewel' | 'star';
  data: CardData | { index: number }
  fromRect: DOMRect;
  toRect: DOMRect;
}

@Injectable({ providedIn: 'root' })
export class AnimationOverlayService {
  private socket = inject(SocketService);
  private registry = inject(BoardRefRegistryService);

  private nextId = 0;
  readonly aniObj = signal<AnimationObject[]>([]);

  constructor() {
    // this.socket.on<GameAnimationEvent>('gameAnimation').subscribe((event) => {
    //   this.handleAnimation(event);
    // });
  }
}