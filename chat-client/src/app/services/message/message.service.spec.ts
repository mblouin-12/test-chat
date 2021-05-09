import { Message, WelcomeMessage } from 'src/app/classes/message';
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

  it('#getMessages should return array of 1 element', () => {
    service.addMessage(new Message(text_msg, 'user_id'));
    expect(service.getMessages().length).toBe(1);
    expect(service.getMessages()[0].text).toBe(text_msg);
    expect(service.getMessages()[0].type).toBe('msg');
    expect(service.getMessages()[0].date).toBeDefined();
  });


  it('#getMessages should return array of 1 element', () => {
    service.addMessage(new WelcomeMessage());
    expect(service.getMessages().length).toBe(1);
    expect(service.getMessages()[0].text).toBe('');
    expect(service.getMessages()[0].type).toBe('welcome');
    expect(service.getMessages()[0].date).toBeDefined();
  });
});
