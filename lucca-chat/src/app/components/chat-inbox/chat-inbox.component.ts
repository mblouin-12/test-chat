import { Component, OnInit } from '@angular/core';

const SOCKET_ENDPOINT = 'localhost:3000';

@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.scss']
})
export class ChatInboxComponent implements OnInit {



  public message: string = 'my first message';
  constructor() { }
  ngOnInit() {
    this.setupSocketConnection();
  }

  setupSocketConnection() {
  //   this.socket.on('message-broadcast', (data: string) => {
  //     if (data) {
  //       console.log("data received", data);
  //     }
  //  });
  }

  sendMessage() {
    // this.socket.emit('message', this.message);
    // this.message = '';
  }




}
