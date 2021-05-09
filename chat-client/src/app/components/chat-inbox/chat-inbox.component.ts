import { ChatService } from 'src/app/services/chat/chat.service';
import { Component, ElementRef, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { Message } from 'src/app/classes/message';
import { UserService } from 'src/app/services/user/user.service';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.scss']
})
export class ChatInboxComponent implements AfterViewInit {

  public text_message: string;
  public show_advanced_editor = false;
  public quill_modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered'}, { list: 'bullet' }],
      [{ color: [] }],
      ['link', 'image', 'video']
    ]
  };

  @ViewChildren('message') messageElements: QueryList<ElementRef>;

  constructor(
    private chatService: ChatService,
    public userService: UserService,
    public messageService: MessageService,
    ) { }

  async ngAfterViewInit() {
    this.messageElements.changes.subscribe(async () => {
      if (this.messageElements && this.messageElements.last) {
        await this.sleep(50);
        this.messageElements.last.nativeElement.scrollIntoView(false);
      }
    });
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  sendMessage() {
    if (this.text_message.trim() !== '') {
      this.chatService.sendMessage(this.text_message.trim());
      this.text_message = '';
    }
  }

  isFromUser(m: Message) {
    return m.user_id === this.userService.getConnectedUserId();
  }

  getMessageUser(m: Message) {
    return this.userService.getUsers().find(user => user.id === m.user_id)?.name;
  }

  getExpandEditorTooltip() {
    if (this.show_advanced_editor) {
      return 'Hide advanced options';
    }
    return 'Show advanced options';
  }

  expandEditor() {
    this.show_advanced_editor = !this.show_advanced_editor;
  }
}
