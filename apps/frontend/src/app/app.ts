import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SocketService } from './core/socket.service';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private socket = inject(SocketService);

  ngOnInit() {
    this.socket.connect();
    let name = 'Developer-' + Math.round(Math.random() * 100);
    localStorage.setItem('playerName', name);
  }
}
