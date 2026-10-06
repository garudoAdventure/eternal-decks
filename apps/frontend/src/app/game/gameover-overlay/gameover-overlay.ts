import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketService } from '../../core/socket.service';
import { GameOverReason } from '@shared/types';

const REASON_TEXT: Record<GameOverReason, string> = {
  [GameOverReason.DECK_EXHAUSTED]: '有玩家無手牌可以打出，全員敗北。',
  [GameOverReason.RIVER_EXHAUSTED]: '河流區無稀有卡可以獲得，因拿取遊戲結束卡而敗北。',
};

@Component({
  selector: 'app-gameover-overlay',
  imports: [CommonModule],
  templateUrl: './gameover-overlay.html',
  styleUrl: './gameover-overlay.scss',
})
export class GameOverOverlay implements OnInit {
  private socketService = inject(SocketService);

  isVisible = signal(false);
  reasonText = signal('');

  ngOnInit() {
    this.socketService.on<{ reason: GameOverReason }>('gameOver').subscribe((payload) => {
      this.reasonText.set(REASON_TEXT[payload.reason] ?? '');
      this.isVisible.set(true);
    });
  }
}