import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { MatDialog, MatDialogRef, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { Room } from "@shared/types";
import { RoomList } from "../room-list";
import { SocketService } from "../../core/socket.service";
import { LeaveRoomConfirmDialog } from "../leave-room-confirm-dialog/leave-room-confirm-dialog";

@Component({
  selector: 'room-waiting-dialog',
  templateUrl: './room-waiting-dialog.html',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  styleUrl: './room-waiting-dialog.scss'
})
export class RoomWaitingDialog implements OnInit {
  readonly dialogRef = inject(MatDialogRef<RoomList>);
  private dialog = inject(MatDialog);
  private roomData = inject(MAT_DIALOG_DATA);
  private socketService = inject(SocketService);

  room = signal<Room>(this.roomData);
  emptyPlayerSlot = computed(() => {
    const r = this.room;
    const emptyCount = r().maxPlayer - r().players.length;
    return Array(emptyCount);
  });

  ngOnInit(): void {
    this.socketService.on<Room>('roomUpdated').subscribe((room) => {
      this.room.set(room);
    });
  }

  get isHost(): boolean {
    return this.room().players.length > 0 &&
      this.socketService.id == this.room().players[0].socketId;
  }

  leaveRoom() {
    this.dialog.open(LeaveRoomConfirmDialog, {
      width: '300px',
      disableClose: true,
    }).afterClosed().subscribe((result) => {
      if (result.confirm) {
        this.socketService.emit('leaveRoom', { roomId: this.room().id });
        this.dialogRef.close();
      }
    });
  }

  startGame() {

  }
}