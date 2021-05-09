import { UserService } from 'src/app/services/user/user.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserEditDialogComponent } from 'src/app/components/user-edit-dialog/user-edit-dialog.component';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  constructor(
    public userService: UserService,
    public dialog: MatDialog,
    public chatService: ChatService) { }

  editUser() {
    this.dialog.open(UserEditDialogComponent, {
      width: '30%',
      data: this.userService.getConnectedUser()
    }).afterClosed().subscribe(res => {
      if (res) {
        this.userService.getConnectedUser().name = res;
        this.chatService.updateUser();
      }
    });
  }

}
