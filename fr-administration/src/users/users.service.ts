import {Body, Delete, Get, HttpException, HttpStatus, Injectable, Param} from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>
) {}

  create(lastname: string, firstname: string, age: number): User {
     const u= new User(lastname, firstname, age);
    this.repository.save(u);
    return u;
  }

  public async getById(idToFind: number): Promise<User> {
  return await this.repository.findOne({where: {id: idToFind}});
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
