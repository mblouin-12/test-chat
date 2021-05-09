import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatService } from 'src/app/services/chat/chat.service';
import { UserService } from 'src/app/services/user/user.service';

import { UserConnectComponent } from './user-connect.component';

describe('UserConnectComponent', () => {
  let component: UserConnectComponent;
  let fixture: ComponentFixture<UserConnectComponent>;
  const spyUserService = jasmine.createSpyObj('UserService', ['connectAs', 'setUsers']);
  const spyChatService = jasmine.createSpyObj('ChatService', ['setupSocketConnection']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        UserConnectComponent,
        { provide: UserService, useValue: spyUserService },
        { provide: ChatService, useValue: spyChatService },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyUserService.connectAs.calls.reset();
    spyChatService.setupSocketConnection.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not connect with empty name', () => {
    component.nameFormControl.setValue('');
    fixture.detectChanges();
    component.connect();
    expect(spyUserService.connectAs).not.toHaveBeenCalled();
    expect(spyChatService.setupSocketConnection).not.toHaveBeenCalled();
  });

  it('should not connect with a name with only spaces', () => {
    component.nameFormControl.setValue('  ');
    fixture.detectChanges();
    component.connect();
    expect(spyUserService.connectAs).not.toHaveBeenCalled();
    expect(spyChatService.setupSocketConnection).not.toHaveBeenCalled();
  });

  it('should connect with a right name', () => {
    component.nameFormControl.setValue('my name');
    fixture.detectChanges();
    component.connect();
    expect(spyUserService.connectAs).toHaveBeenCalledWith('my name');
    expect(spyChatService.setupSocketConnection).toHaveBeenCalled();
  });
});
