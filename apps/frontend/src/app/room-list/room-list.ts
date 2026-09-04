import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Room } from '@shared/types'
import { SocketService } from '../core/socket.service';
import { CreateRoomDialog } from './create-room-dialog/create-room-dialog';
import { RoomWaitingDialog } from './room-waiting-dialog/room-waiting-dialog';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule],
  templateUrl: './room-list.html',
  styleUrl: './room-list.scss',
})
export class RoomList implements OnInit {
  rooms = signal<Room[]>([]);

  private dialog = inject(MatDialog);
  private socketService = inject(SocketService);
  private httpService = inject(HttpClient);

  ngOnInit(): void {
    this.socketService.emit('getRoomList');
    this.socketService.on<Room[]>('roomListUpdated').subscribe((rooms) => { this.rooms.set(rooms); });
  }

  createRoom() {
    this.dialog.open(CreateRoomDialog, {
      width: '600px',
      disableClose: true
    }).afterClosed().subscribe(result => {
      if (result) {
        this.httpService.post('http://localhost:3000/api/room', result).subscribe({
          next: (room: any) => {
            this.dialog.open(RoomWaitingDialog, {
              width: '600px',
              disableClose: true,
              data: room
            });
            this.socketService.emit('createRoom', {
              roomId: room.id,
              playerName: localStorage.getItem('playerName')
            });
          }, error: () => {
            console.log('no!!!!!');
          }
        });
      }
    });
  }

  joinRoom(room: Room) {
    this.socketService.emit('joinRoom', {
      roomId: room.id,
      name: localStorage.getItem('playerName')
    });
    this.dialog.open(RoomWaitingDialog, {
      width: '600px',
      disableClose: true,
      data: { roomId: room.id }
    });
  }
}
