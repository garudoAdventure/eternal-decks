import { computed, inject, Injectable, signal } from "@angular/core";
import { StateData } from "@shared/types";
import { SocketService } from "../core/socket.service";

@Injectable({
  providedIn: 'root'
})
export class GameActionStateService {
  private socket = inject(SocketService);

  private readonly interactionState = signal<StateData | null>(null);

  constructor() {
    this.socket.on<StateData>('getAvailableMove').subscribe((data) => {
      this.interactionState.set(data);
    });
  }

  readonly message = computed(() => this.interactionState()?.message ?? '');
  readonly button = computed(() => this.interactionState()?.button ?? {show: false, string: ''});
  readonly validField = computed(() => this.interactionState()?.validField ?? []);
  readonly validJewel = computed(() => this.interactionState()?.validJewel ?? []);
  readonly validHeart = computed(() => this.interactionState()?.validHeart ?? []);
  readonly validEternal = computed(() => this.interactionState()?.validEternal ?? []);
  readonly validFieldEternal = computed(() => this.interactionState()?.validFieldEternal ?? []);
  readonly selectedCard = computed(() => this.interactionState()?.selectedCard ?? []);
  readonly validPlayer = computed(() => this.interactionState()?.validPlayer ?? false);
  readonly validRiverCard = computed(() => this.interactionState()?.validRiverCard ?? false);
  readonly validFieldCard = computed(() => this.interactionState()?.validFieldCard ?? false);
}