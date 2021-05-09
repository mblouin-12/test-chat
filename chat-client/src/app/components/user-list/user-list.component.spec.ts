/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserListComponent } from './user-list.component';
import { UserService } from 'src/app/services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ChatService } from 'src/app/services/chat/chat.service';
import { User } from 'src/app/classes/user';
import { SortByFieldPipe } from 'src/app/pipes/sort-by-field.pipe';

class MockUserService {
  private connected_user = new User('connected user');
  private other_users = [new User('user 2'), new User('user 3')];
  getConnectedUser() {
    return this.connected_user;
  }
  getOtherUsers() {
    return this.other_users;
  }
  setUsers(users: Array<User>) {
  }
}

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  const spyMatDialog = jasmine.createSpyObj('MatDialog', ['open']);
  const spychatService = jasmine.createSpyObj('chatService', ['updateUser']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserListComponent, SortByFieldPipe],
      providers: [
        UserListComponent,
        { provide: UserService, useClass: MockUserService },
        { provide: MatDialog, useValue: spyMatDialog },
        { provide: ChatService, useValue: spychatService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display connected user', () => {
    expect(fixture.debugElement.query(By.css('.my-profile .name')).nativeElement.textContent).toEqual('connected user');
  });

  it('should have all user displayed', () => {
    const otherUsersNames = fixture.debugElement.queryAll(By.css('.user-row .name'))
    expect(otherUsersNames.length).toBe(2);
    expect(otherUsersNames[0].nativeElement.textContent).toBe('user 2');
    expect(otherUsersNames[1].nativeElement.textContent).toBe('user 3');
  });

});
