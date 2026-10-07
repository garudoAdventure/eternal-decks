import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPreviewService } from '../../core/card-preview.service';

@Component({
  selector: 'app-card-preview-overlay',
  imports: [CommonModule],
  templateUrl: './card-preview-overlay.html',
  styleUrl: './card-preview-overlay.scss',
})
export class CardPreviewOverlay {
  cardPreview = inject(CardPreviewService);
}