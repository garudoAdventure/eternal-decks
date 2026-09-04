import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  templateUrl: './main-menu.html',
  styleUrl: './main-menu.scss',
})
export class MainMenu {
  private router = inject(Router);

  enterLobby() {
    this.router.navigate(['/rooms']);
  }
}
