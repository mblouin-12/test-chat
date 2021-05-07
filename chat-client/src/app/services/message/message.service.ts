import { Message } from 'src/app/classes/message';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messages: Array<Message> = [];

  constructor() { }

  getMessages(): Array<Message>{
    return this.messages;
  }

  addMessage(m: Message) {
    this.messages.push(m);
  }
}
