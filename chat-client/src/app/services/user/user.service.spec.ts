import { User } from 'src/app/classes/user';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  const name = 'user 1';
  let user: User;
  let users: Array<User>;

  beforeEach(() => {
    service = new UserService();
    user = service.connectAs(name);
    users = [user, new User('user 2'), new User('user 3')];
    service.setUsers(users);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('#connectAs user should set name and id and be connected', () => {
    expect(user.name).toEqual(name);
    expect(user.connected).toBe(true);
    expect(user.id).toBeDefined();
    expect(service.getConnectedUserId()).toEqual(user.id);
    expect(service.isConnected()).toBe(true);
  });


  it('#getUsers should return array of 3 elements', () => {
    expect(service.getUsers()?.length).toBe(3);
  });

  it('#getOtherUsers should return array of 2 elements', () => {
    expect(service.getOtherUsers()?.length).toBe(2);
  });

  it('#getConnectedUser should return user 1', () => {
    expect(service.getConnectedUser().name).toEqual(name);
    expect(service.getConnectedUser().id).toBe(user.id);
    expect(service.getConnectedUser().connected).toBe(true);
  });



});
