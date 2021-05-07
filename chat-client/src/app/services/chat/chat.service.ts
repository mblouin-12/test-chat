import { UserService } from './../user/user.service';
import { MessageService } from './../message/message.service';
import { Injectable } from '@angular/core';
import {io, Socket} from 'socket.io-client';
import { Message } from 'src/app/classes/message';
import { User } from 'src/app/classes/user';

const SOCKET_ENDPOINT = 'localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket: Socket;

  constructor(private messageService: MessageService, private userService: UserService) { }


  setupSocketConnection(user: User) {
    this.socket = io(SOCKET_ENDPOINT);

    this.socket.emit('new-user', user);
    this.messageService.addMessage(new Message('', '', 'welcome'));

    this.socket.on('message-broadcast', (data: Message) => {
      if (data) {
        this.messageService.addMessage(data);
      }
    });
    this.socket.on('users-broadcast', (users: Array<User>) => {
      if (this.userService.getUsers()?.length > 0 ) {
        users.map(u => {
          const prev_usuer = this.userService.getUsers().find(prev_u => prev_u.id === u.id);
          if (!prev_usuer) {
            this.messageService.addMessage(new Message(u.name, '', 'new'));
          } else if (prev_usuer.connected && !u.connected) {
            this.messageService.addMessage(new Message(u.name, '', 'disconnected'));
          }
        });
      }
      this.userService.setUsers(users);
    });
  }

  sendMessage(text_message: string) {
    const message = new Message(text_message, this.userService.getConnectedUser().id);
    this.socket.emit('message', message);
    this.messageService.addMessage(message);
  }

  updateUser() {
    this.socket.emit('user-update', this.userService.getConnectedUser());
  }

  disconnect() {
    if (this.socket) {
      this.socket.emit('user-disconnect', this.userService.getConnectedUserId());
    }
  }
}
