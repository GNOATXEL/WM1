import {Body, Delete, Get, HttpException, HttpStatus, Injectable, NotFoundException, Param} from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {Association} from "../associations/association.entity";


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
) {}

  async create(lastname: string, firstname: string, age: number, password: string): Promise<User> {
    if(lastname!=undefined && firstname!=undefined && age!=undefined && password!=undefined) {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);

        const u = new User(lastname, firstname, age, hash);
        await this.userRepository.save(u);
        return u;
    }
    else{
      throw new HttpException(
          `Incorrect parameters`,
          HttpStatus.NOT_FOUND,
      );}
  }

  public async getById(idToFind: number): Promise<User> {
  return await this.userRepository.findOne({where: {id: idToFind}});
  }


 public async update(id:number, lastname: string, firstname: string, age: number, password: string): Promise<boolean> {
   const temp = await this.userRepository.findOne({ where:{id: id}});
    if(!!temp){
        if(firstname!==undefined) {
          temp.firstname = firstname;
        }
        if(lastname!==undefined) {
          temp.lastname = lastname;
        }
        if(age!==undefined) {
          temp.age = age;
        }

        if(password!==undefined) {
            const saltOrRounds = 10;
            const hash = await bcrypt.hash(password, saltOrRounds);
            temp.password = hash;
        }
        await this.userRepository.save(temp);
        return true;

      }

    return false
    }

  public async deleteUser(id:number): Promise<boolean> {
    const user = await this.userRepository.findOne({where:{id}});

    if (!user) {
      return false
    }

    await this.userRepository.delete(user);
    return true;
  }

  public async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

}
