import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/classes/user';


@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.scss']
})
export class UserEditDialogComponent {

  public nameFormControl = new FormControl('', [Validators.required]);
  constructor(
    public dialogRef: MatDialogRef<UserEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User) {
      this.nameFormControl.setValue(user?.name);
    }

  validate() {
    if (this.nameFormControl.invalid || this.nameFormControl.value.trim().length === 0) {
      this.nameFormControl.markAsTouched();
    } else {
      this.dialogRef.close(this.nameFormControl.value);
    }
  }
}
