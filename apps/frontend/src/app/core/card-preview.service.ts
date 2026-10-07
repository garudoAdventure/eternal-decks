import { Injectable, signal } from '@angular/core';

export interface CardPreviewState {
  isShow: boolean;
  cardImg: string;
  x: number;
  y: number;
}

const PREVIEW_WIDTH = 225;
const PREVIEW_HEIGHT = 325;
const OFFSET = 20; // 預覽框跟滑鼠游標之間的間距
const EDGE_MARGIN = 16; // 預覽框離視窗邊緣至少保留的距離

@Injectable({ providedIn: 'root' })
export class CardPreviewService {
  private readonly state = signal<CardPreviewState>({
    isShow: false,
    cardImg: '',
    x: 0,
    y: 0,
  });

  readonly preview = this.state.asReadonly();

  show(cardImg: string) {
    this.state.update((s) => ({ ...s, isShow: true, cardImg }));
  }

  updatePosition(mouseX: number, mouseY: number) {
    const {x, y} = this.calculatePosition(mouseX, mouseY);
    this.state.update((s) => ({ ...s, x, y }));
  }

  hide() {
    this.state.update((s) => ({ ...s, isShow: false }));
  }

  private calculatePosition(mouseX: number, mouseY: number): { x: number; y: number } {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // 預設:往右下偏移
    let x = mouseX + OFFSET;
    let y = mouseY + OFFSET;

    // 右側空間不夠 → 改成往左偏移(顯示在滑鼠左邊)
    if (x + PREVIEW_WIDTH + EDGE_MARGIN > viewportWidth) {
      x = mouseX - PREVIEW_WIDTH - OFFSET;
    }

    // 下方空間不夠 → 改成往上偏移(顯示在滑鼠上方)
    if (y + PREVIEW_HEIGHT + EDGE_MARGIN > viewportHeight) {
      y = mouseY - PREVIEW_HEIGHT - OFFSET;
    }

    // 保險:避免往左/往上偏移後,反而超出左側/上方邊界(螢幕太小或滑鼠太靠角落的情況)
    x = Math.max(EDGE_MARGIN, x);
    y = Math.max(EDGE_MARGIN, y);

    return { x, y };
  }
}