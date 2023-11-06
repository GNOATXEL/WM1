import {Body, Delete, Get, HttpException, HttpStatus, Injectable, Param} from '@nestjs/common';
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
     const u= new User(lastname, firstname, age);
    this.repository.save(u);
    return u;
  }

  async getById(id: number): Promise<User> {
    return await this.repository.findOne({where: {id: id}});
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
  getAllUsers(): User[] {
    return this.users;
  }
}
