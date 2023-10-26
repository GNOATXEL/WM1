import {Body, Delete, HttpException, HttpStatus, Injectable, Param} from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  users: User[] = [
    {
      id: 0,
      lastname: 'Doe',
      firstname: 'John',
      age: 23,
    },
  ];
  create(lastname: string, firstname: string, age: number): User {
     const u= new User(this.users.length,lastname, firstname, age);
    this.users.push(u);
    return u;
  }

  getById(id:number):User {
    for (let i = 0; i < this.users.length; i++) {
      if (id == this.users[i].id) {
        return this.users[i];

      }
    }
  }

  update(id:number, lastname: string, firstname: string, age: number): boolean {
    for (let i = 0; i < this.users.length; i++){
      if(this.users[i].id === id) {
        if(firstname!==undefined) {
          this.users[id].firstname = firstname;
        }
        if(lastname!==undefined) {
          this.users[id].lastname = lastname;
        }
        if(age!==undefined) {
          this.users[id].age = age;
        }
        return true;
        }
      }
    console.log("AMOGUS1")
    return false
    }

  deleteUser(id:number): boolean {
    for (let i = 0; i < this.users.length; i++) {
      if (id == this.users[i].id) {
        this.users.splice(i, 1);
        return true;
      }
    }
    return false;
}
}
