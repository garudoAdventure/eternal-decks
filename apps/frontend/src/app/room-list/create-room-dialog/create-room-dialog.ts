import { Component, inject } from "@angular/core";
import { MatDialogRef, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatSelectModule } from "@angular/material/select"
import { MatInputModule } from "@angular/material/input"
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { RoomList } from "../room-list";

@Component({
  selector: 'create-room-dialog',
  templateUrl: './create-room-dialog.html',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  styleUrl: './create-room-dialog.scss'
})
export class CreateRoomDialog {
  readonly dialogRef = inject(MatDialogRef<RoomList>);

  roomForm = new FormGroup({
    name: new FormControl('開心玩桌遊', Validators.required),
    stage: new FormControl(1),
    maxPlayer: new FormControl(2)
  });

  create() {
    if (this.roomForm.invalid) {
      return;
    }
    this.dialogRef.close({
      name: this.roomForm.get('name')?.value,
      stage: this.roomForm.get('stage')?.value,
      maxPlayer: this.roomForm.get('maxPlayer')?.value,
    });
  }
}