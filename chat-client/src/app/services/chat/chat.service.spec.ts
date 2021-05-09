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

    const userServiceSpy =
      jasmine.createSpyObj('UserService', ['getConnectedUser', 'getConnectedUserId', 'getUsers']);

    const stub_user = new User('user 1');
    const stub_users = [stub_user,  new User('user 2'),  new User('user 3')];
    userServiceSpy.getConnectedUser.and.returnValue(stub_user);
    userServiceSpy.getConnectedUserId.and.returnValue(stub_user.id);
    userServiceSpy.getUsers.and.returnValue(stub_users);


    service = new ChatService(messageService, userServiceSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const user = new User('user 1');

  it('should receive a welcome message', () => {
    service.setupSocketConnection(user);
    expect(messageService.getMessages().length).toBe(1);
    expect(messageService.getMessages()[0].type).toEqual('welcome');
  });

  const text_msg = 'my text message';
  it('message should be added into message list', () => {
    service.sendMessage(text_msg);
    expect(messageService.getMessages().length).toBe(1);
    expect(messageService.getMessages()[0].text).toEqual(text_msg);
    expect(messageService.getMessages()[0].type).toEqual('msg');
  });

});
