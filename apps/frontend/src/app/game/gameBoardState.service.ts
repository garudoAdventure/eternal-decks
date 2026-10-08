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
  private dataQueue: GameBoard[] = [];
  private isProcessing  = false;

  private readonly boardState = signal<GameBoard | null>(null);

  constructor() {
    this.socket.on<GameBoard>('updateGameData').subscribe((data) => {
      this.dataQueue.push(data);
      this.proccessNext();
    });
  }

  private proccessNext() {
    if (this.isProcessing || this.dataQueue.length === 0) return;

    this.isProcessing = true;
    const data = this.dataQueue.shift()!;
    this.flipTracker.capture(data.movedItemId);

    this.boardState.set(data);
      
    requestAnimationFrame(() => {
      this.flipTracker.play({
        onAllComplete: () => {
          this.isProcessing = false;
          this.proccessNext();
        }
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
  readonly jewels = computed(() => this.boardState()?.jewels ?? []);
  readonly stars = computed(() => this.boardState()?.stars ?? []);
  readonly river = computed(() => this.boardState()?.river ?? { cards: [], rareCards: [], gameOverCard: this.emptyCardData });
  readonly fields = computed(() => this.boardState()?.fields ?? []);
  readonly eternals = computed(() => this.boardState()?.eternals ?? []);
  readonly starCard = computed(() => this.boardState()?.starCard ?? []);
  readonly getStars = computed(() => this.boardState()?.getStars ?? []);
  readonly discard = computed(() => this.boardState()?.discard ?? []);
  readonly campBonus = computed(() => this.boardState()?.campBonus ?? null);
}