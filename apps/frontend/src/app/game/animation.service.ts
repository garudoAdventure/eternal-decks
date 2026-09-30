import { Injectable } from "@angular/core";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private stateQueue: Flip.FlipState[] = [];

  private timelime = gsap.timeline();

  constructor() {
  }

  addState(cardId: string) {
    this.stateQueue.push(Flip.getState(`[data-flip-id="card-${cardId}"]`));
  }

  playCardAnim() {
    this.stateQueue.forEach(state => {
      const cardId: string = state.elementStates[0].id;
      const target: string = '[data-flip-id="' + cardId + '"]';
      this.timelime.add(
        Flip.from(state, {
          targets: target,
          duration: 0.5,
          onComplete: () => {
            gsap.set(target, { clearProps: 'all' })
          }
        })
      );
    });
    this.stateQueue = [];
  }
}