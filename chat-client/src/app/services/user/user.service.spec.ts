import { User } from 'src/app/classes/user';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    service = new UserService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const name = 'user 1';
  const user = service.connectAs(name);

  it('#connectAs user should set name and id and be connected', () => {
    expect(user.name).toEqual(name);
    expect(user.connected).toBe(true);
    expect(user.id).toBeDefined();
  });

  it('#getConnectedUserId user should be the one just connected', () => {
    expect(service.getConnectedUserId()).toEqual(user.id);
  });

  it('#isConnected should return true', () => {
    expect(service.isConnected()).toBe(true);
  });

  const users = [user, new User('user 2'), new User('user 3')];
  service.setUsers(users);

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
