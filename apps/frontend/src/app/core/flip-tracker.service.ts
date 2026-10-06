import { Injectable } from '@angular/core';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);

@Injectable({ providedIn: 'root' })
export class FlipTrackerService {
  private pendingState: Flip.FlipState[] = [];
  private timeline = gsap.timeline();

  capture(movedItemIds: string[]) {
    movedItemIds.forEach(id => {
      const elements = document.querySelectorAll<HTMLElement>('[data-flip-id="' + id + '"]');
      this.pendingState.push(Flip.getState(elements, { props: 'opacity' }));
    });
  }

  play(options: { duration?: number; ease?: string } = {}) {
    if (!this.pendingState) return;

    this.pendingState.forEach(state => {
      const target = '[data-flip-id="' + state.elementStates[0].id +'"]';
      this.timeline.add(
        Flip.from(state, {
          targets: target,
          duration: options.duration ?? 0.5,
          ease: options.ease ?? 'power2.out',
          // onEnter: (elements) => {
          //   gsap.fromTo(elements, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.3 });
          // },
          // onLeave: (elements) => {
          //   gsap.to(elements, { opacity: 0, duration: 0.3 });
          // },
          onComplete: () => {
            gsap.set(target, { clearProps: 'all' });
          },
        })
      );
    });

    this.pendingState = [];
  }
}