import { User } from 'src/app/classes/user';
import { MessageService } from '../message/message.service';
import { UserService } from '../user/user.service';

import { ChatService } from './chat.service';

describe('ChatService', () => {
  let service: ChatService;
  let messageService: MessageService;
  let userService: UserService;

  beforeEach(() => {
    messageService = new MessageService();
    userService = new UserService();
    service = new ChatService(messageService, userService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const user = new User('user 1');
  service.setupSocketConnection(user);

  it('should receive a welcome message', () => {
    expect(messageService.getMessages().length).toBe(1);
    expect(messageService.getMessages()[1].type).toEqual('welcome');
  });

  const text_msg = 'my text message';
  service.sendMessage(text_msg);
  it('message should be added into message list', () => {
    expect(messageService.getMessages().length).toBe(2);
    expect(messageService.getMessages()[1].text).toEqual(text_msg);
    expect(messageService.getMessages()[1].type).toEqual('msg');
  });

});
