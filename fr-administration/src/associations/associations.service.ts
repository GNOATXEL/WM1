import { Injectable } from '@nestjs/common';
import {User} from "../users/user.entity";
import {Association} from "./association.entity";
import {UsersService} from "../users/users.service";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {UsersController} from "../users/users.controller";

@Injectable()
export class AssociationsService {

    constructor(

        private service: UsersService; //sert à quoicoubeh????
        @InjectRepository(Association)
        private associationRepository: Repository<Association>
    ) {}

    async create(idUsers: number[], name: string): Promise<Association> {
        var users1: Repository<User>;
        for(let i: number;i<idUsers.length;i++){
            var userToPush: User;
            userToPush =  await this.service.getById(idUsers[i]);
            users1.save(userToPush);
        }
        const a= new Association(users1, name);
        this.associationRepository.save(a);
        return a;
    }

    getById(id:number):Association {
        for (let i = 0; i < this.associations.length; i++) {
            if (id == this.associations[i].id) {
                return this.associations[i];

            }
        }
    }

    update(id:number, users: User[], name: string): boolean {
        for (let i = 0; i < this.associations.length; i++){
            if(this.associations[i].id === id) {
                if(users!==undefined) {
                    this.associations[id].users = users;
                }
                if(name!==undefined) {
                    this.associations[id].name = name;
                }
                return true;
            }
        }
        return false
    }

    deleteAssociation(id:number): boolean {
        for (let i = 0; i < this.associations.length; i++) {
            if (id == this.associations[i].id) {
                this.associations.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    getMembers(id:number):User[]{
       return this.getById(id).users;
}

    public async getAllAssociations(): Promise<Association[]> {
        return this.associationRepository.find();
    }

}
