import { UserService } from '../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { MatDialog } from '@angular/material/dialog';
import { UserEditDialogComponent } from '../user-edit-dialog/user-edit-dialog.component';
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
