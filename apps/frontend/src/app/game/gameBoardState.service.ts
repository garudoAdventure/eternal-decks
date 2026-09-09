import { computed, inject, Injectable, signal } from "@angular/core";
import { GameBoard } from "@shared/types";
import { SocketService } from "../core/socket.service";

@Injectable({
  providedIn: 'root'
})
export class GameBoardStateService {
  private socket = inject(SocketService);

  private readonly boardState = signal<GameBoard | null>(null);

  constructor() {
    this.socket.on<GameBoard>('updateGameData').subscribe((data) => {
      this.boardState.set(data);
    });
  }

  readonly players = computed(() => this.boardState()?.players ?? []);
  readonly hearts = computed(() => this.boardState()?.usedHeart ?? []);
  readonly jewels = computed(() => this.boardState()?.genJewel ?? []);
  readonly stars = computed(() => this.boardState()?.getStar ?? []);
  readonly river = computed(() => this.boardState()?.river ?? {cards: [], rareCards: [] });
  readonly fields = computed(() => this.boardState()?.fields ?? []);
  readonly eternals = computed(() => this.boardState()?.eternals ?? []);
  readonly starCard = computed(() => this.boardState()?.starCard ?? []);
  readonly discard = computed(() => this.boardState()?.discard ?? []);
  readonly getCampBonus = computed(() => this.boardState()?.getCampBonus ?? false);
}