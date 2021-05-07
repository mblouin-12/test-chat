import { User } from 'src/app/classes/user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private current_user_id: string;
  private users: Array<User> = [];

  constructor() { }

  getUsers() {
    return this.users;
  }

  setUsers(users: Array<User>) {
    this.users = users;
  }

  getOtherUsers() {
    return this.users.filter(u => u.id !== this.current_user_id);
  }

  getConnectedUserId(){
    return this.current_user_id;
  }

  getConnectedUser(){
    return this.users.find(u => u.id === this.current_user_id);
  }

  connectAs(name: string) {
    const user = new User(name);
    this.current_user_id = user.id;
    return user;
  }

  isConnected() {
    return !!this.getConnectedUserId();
  }
}
