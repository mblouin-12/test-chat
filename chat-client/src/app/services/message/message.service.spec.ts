import { Message } from 'src/app/classes/message';
import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    service = new MessageService();
  });

  it('#getMessages should return array of 0 element', () => {
    expect(service.getMessages().length).toBe(0);
  });

  const text_msg = 'my message';
  service.addMessage(new Message(text_msg, 'user_id'));

  it('#getMessages should return array of 1 element', () => {
    expect(service.getMessages().length).toBe(1);
    expect(service.getMessages()[0].text).toBe(text_msg);
    expect(service.getMessages()[0].type).toBe('msg');
    expect(service.getMessages()[0].date).toBeDefined();
  });

  service.addMessage(new Message(text_msg + '2', 'user_id', 'welcome'));

  it('#getMessages should return array of 2 element', () => {
    expect(service.getMessages().length).toBe(2);
    expect(service.getMessages()[1].text).toBe(text_msg + '2');
    expect(service.getMessages()[1].type).toBe('welcome');
    expect(service.getMessages()[1].date).toBeDefined();
  });
});
