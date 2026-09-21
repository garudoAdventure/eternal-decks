import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationOverlayService } from '../animation-overlay.service';
import { Card } from '../../Card/card';
import { SocketService } from '../../../core/socket.service';
import { BoardRefRegistryService } from '../../Board-ref/board-ref-registry.service';
import { PlayCardAnimationEvent, CardData } from '@shared/types';
import { BoardRefType } from '../../Board-ref/board-ref.enum';

export interface AnimationCardData {
  id: number;
  card: CardData;
  fromRect: DOMRect;
  toRect: DOMRect;
}

@Component({
  selector: 'app-card-animation-overlay',
  imports: [CommonModule, Card],
  templateUrl: './card-animation-overlay.html',
  styleUrls: ['./card-animation-overlay.scss']
})
export class CardAnimationOverlay implements OnInit{
  animation = inject(AnimationOverlayService);

  socketService = inject(SocketService);
  registry = inject(BoardRefRegistryService);

  private nextId = 0;
  readonly animationCards = signal<AnimationCardData[]>([]);

  ngOnInit(): void {
    this.socketService.on<PlayCardAnimationEvent>('playCardAnimation').subscribe((event) => {
      const fromRect = this.registry.getRect({ type: BoardRefType.HAND, playerId: event.playerId, cardIdx: event.cardIdx });
      
      const fieldEle = this.registry.getElement({ type: BoardRefType.FIELD, fieldIdx: event.fieldIdx })
      const toRect = fieldEle?.querySelector('.empty-slot-card')?.getBoundingClientRect();

      if (!fromRect || !toRect) return;

      const id = this.nextId++;
      this.animationCards.update((list) => [...list, { id, card: event.card, fromRect, toRect }]);

      setTimeout(() => {
        this.animationCards.update((list) => list.filter((f) => f.id !== id));
      }, 500); // 動畫時長,跟 CSS transition 秒數一致
    });
  }
}