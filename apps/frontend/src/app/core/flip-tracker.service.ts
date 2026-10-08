import { Injectable } from '@angular/core';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);

@Injectable({ providedIn: 'root' })
export class FlipTrackerService {
  private pendingState: Flip.FlipState[] = [];

  capture(movedItemIds: string[]) {
    movedItemIds.forEach(id => {
      const elements = document.querySelectorAll<HTMLElement>('[data-flip-id="' + id + '"]');
      this.pendingState.push(Flip.getState(elements, { props: 'opacity' }));
    });
  }

  play(options: { duration?: number; ease?: string; onAllComplete?: () => void } = {}) {
    if (this.pendingState.length === 0) {
      options.onAllComplete?.();
      return;
    };

    const timeline = gsap.timeline({
      onComplete: () => {
        options.onAllComplete?.();
      }
    });

    this.pendingState.forEach(state => {
      const target = '[data-flip-id="' + state.elementStates[0].id +'"]';
      gsap.set(target, { zIndex: 999 });

      timeline.add(
        Flip.from(state, {
          targets: target,
          duration: options.duration ?? 0.5,
          ease: options.ease ?? 'power2.out',
          absolute: true,
          onComplete: () => {
            gsap.set(target, { clearProps: 'all' });
          },
        })
      );
    });

    this.pendingState = [];
  }
}