import { Component, inject } from "@angular/core";
import { MatDialogRef, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { RoomWaitingDialog } from "../room-waiting-dialog/room-waiting-dialog";

@Component({
  selector: 'leave-room-confirm-dialog',
  templateUrl: './leave-room-confirm-dialog.html',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export class LeaveRoomConfirmDialog {
  readonly dialogRef = inject(MatDialogRef<RoomWaitingDialog>);

  confirm() {
    this.dialogRef.close({ confirm: true });
  }
}