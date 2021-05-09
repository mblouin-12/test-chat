import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DisconnectedUserMessage, Message, NewUserMessage, WelcomeMessage } from 'src/app/classes/message';
import { User } from 'src/app/classes/user';
import { TranslateMockPipe } from 'src/app/pipes/translate-mock.pipe';
import { ChatService } from 'src/app/services/chat/chat.service';
import { MessageService } from 'src/app/services/message/message.service';
import { UserService } from 'src/app/services/user/user.service';
import { By } from '@angular/platform-browser';

import { ChatInboxComponent } from './chat-inbox.component';
import { QuillModule } from 'ngx-quill';

const connected_user = new User('connected user');
class MockUserService {
  private users = [new User('user 2'), new User('user 3')];
  getConnectedUser() {
    return connected_user;
  }
  getConnectedUserId() {
    return connected_user.id;
  }
  setUsers(user_list: Array<User>) {
    this.users = user_list;
  }
  getUsers() {
    return this.users.concat(connected_user);
  }
  getOtherUsers() {
    return this.users;
  }
}

class MockMessageService {
  private messages = [
    new WelcomeMessage(),
    new NewUserMessage('user 4'),
    new DisconnectedUserMessage('user 4'),
    new Message('my text message', connected_user.id)
  ];
  getMessages() {
    return this.messages;
  }
}

describe('ChatInboxComponent', () => {
  let component: ChatInboxComponent;
  let fixture: ComponentFixture<ChatInboxComponent>;
  const spyChatService = jasmine.createSpyObj('ChatService', ['sendMessage']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatInboxComponent , TranslateMockPipe],
      providers: [
        ChatInboxComponent,
        { provide: ChatService, usealue: spyChatService },
        { provide: UserService, useClass: MockUserService },
        { provide: MessageService, useClass: MockMessageService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have all messages displayed', () => {
    const messages = fixture.debugElement.queryAll(By.css('.messages-wrapper>div'));
    expect(messages.length).toBe(4);
    expect(messages[0].query(By.css('.user-info')).nativeElement.textContent).toBe('welcome-user');
    expect(messages[1].query(By.css('.user-info')).nativeElement.textContent).toBe('new-user');
    expect(messages[2].query(By.css('.user-info')).nativeElement.textContent).toBe('disconnected-user');
    expect(messages[3].query(By.css('.message .sender')).nativeElement.textContent).toBe('connected user');
  });
});
