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
  private socketService = inject(SocketService);
  
  ngOnInit(): void {
    if (sessionStorage.getItem('token')) {
      this.socketService.connect();
    }
  }
}
