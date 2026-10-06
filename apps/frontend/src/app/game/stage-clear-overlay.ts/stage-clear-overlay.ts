import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketService } from '../../core/socket.service';

@Component({
  selector: 'app-stage-clear-overlay',
  imports: [CommonModule],
  templateUrl: './stage-clear-overlay.html',
  styleUrl: './stage-clear-overlay.scss',
})
export class StageClearOverlay implements OnInit {
  private socketService = inject(SocketService);

  isVisible = signal(false);
  stageName = signal('Stage A');

  ngOnInit() {
    this.socketService.on<any>('stageClear').subscribe((payload) => {
      // this.stageName.set(payload.stageName);
      this.isVisible.set(true);
    });
  }
}