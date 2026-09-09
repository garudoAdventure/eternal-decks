import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { SocketService } from '../core/socket.service';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './main-menu.html',
  styleUrl: './main-menu.scss',
})
export class MainMenu {
  private router = inject(Router);
  private httpService = inject(HttpClient);
  private socketService = inject(SocketService);

  showNameInput = false;
  nameForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  constructor() {
    let name = 'Player-' + Math.round(Math.random() * 100);
    this.nameForm.get('name')?.setValue(name);
  }

  enterLobby() {
    if (sessionStorage.getItem('playerName')) {
      this.router.navigate(['/rooms']);
      return;
    }
    this.showNameInput = true;
  }

  confirm() {
    if (this.nameForm.invalid) {
      return;
    }
    const name = this.nameForm.get('name')?.value!;
    this.httpService.post('http://localhost:3000/api/auth/regist', { name }).subscribe({
      next: (data: any) => {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('playerName', name);
        this.socketService.connect();
        this.router.navigate(['/rooms']);
      }
    });
  }
}
