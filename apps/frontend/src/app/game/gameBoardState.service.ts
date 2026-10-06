import { computed, inject, Injectable, signal } from "@angular/core";
import { CardData, GameBoard } from "@shared/types";
import { SocketService } from "../core/socket.service";
import { FlipTrackerService } from "../core/flip-tracker.service";

@Injectable({
  providedIn: 'root'
})
export class GameBoardStateService {
  private socket = inject(SocketService);
  private flipTracker = inject(FlipTrackerService);

  private readonly boardState = signal<GameBoard | null>(null);

  constructor() {
    this.socket.on<GameBoard>('updateGameData').subscribe((data) => {
      this.flipTracker.capture(data.movedItemId);

      console.log(data);
      this.boardState.set(data);
        
      requestAnimationFrame(() => {
        this.flipTracker.play();
      });
    });
  }

  private readonly emptyCardData: CardData = {
    id: '0',
    subID: 0,
    group: 0,
    type: 0,
    number: 0,
    color: [],
    isRotate: false,
    isBack: false
  };

  readonly players = computed(() => this.boardState()?.players ?? []);
  readonly hearts = computed(() => this.boardState()?.hearts ?? []);
  readonly jewels = computed(() => this.boardState()?.genJewel ?? []);
  readonly stars = computed(() => this.boardState()?.getStar ?? []);
  readonly river = computed(() => this.boardState()?.river ?? { cards: [], rareCards: [], gameOverCard: this.emptyCardData });
  readonly fields = computed(() => this.boardState()?.fields ?? []);
  readonly eternals = computed(() => this.boardState()?.eternals ?? []);
  readonly starCard = computed(() => this.boardState()?.starCard ?? []);
  readonly discard = computed(() => this.boardState()?.discard ?? []);
  readonly campBonus = computed(() => this.boardState()?.campBonus ?? null);
}