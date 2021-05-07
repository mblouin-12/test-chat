import { User } from 'src/app/classes/user';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat/chat.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-connect',
  templateUrl: './user-connect.component.html',
  styleUrls: ['./user-connect.component.scss']
})
export class UserConnectComponent implements OnInit {

  public nameFormControl = new FormControl('', [Validators.required]);

  constructor(private userService: UserService, private chatService: ChatService) { }

  ngOnInit(): void {
  }

  connect() {
    if (this.nameFormControl.invalid) {
      this.nameFormControl.markAsTouched();
    } else {
      const user: User = this.userService.connectAs(this.nameFormControl.value);
      this.chatService.setupSocketConnection(user);
    }
  }
}
