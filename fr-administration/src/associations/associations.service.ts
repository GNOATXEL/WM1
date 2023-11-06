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
        private repository: Repository<Association>
    ) {}

    create(idUsers: number[], name: string): Association {
        var users: User[] = [];
        for(let i: number;i<idUsers.length;i++){
            users.push(this.service.getById(idUsers[i]))
        }
        const a= new Association(this.associations.length,users, name);
        this.associations.push(a);
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

}
