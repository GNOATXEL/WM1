import { Injectable } from '@nestjs/common';
import {User} from "../users/user.entity";
import {Association} from "./association.entity";
import {UsersService} from "../users/users.service";
import {UsersController} from "../users/users.controller";

@Injectable()
export class AssociationsService {
    associations :Association[] = [
        {
            id: 0,
            idUsers: [0],
            name: "association1"
        },
];
    constructor(
        private service: UsersService
    ) {}
    create(idUsers: number[], name: string): Association {
        const a= new Association(this.associations.length,idUsers, name);
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

    update(id:number, idUsers: number[], name: string): boolean {
        for (let i = 0; i < this.associations.length; i++){
            if(this.associations[i].id === id) {
                if(idUsers!==undefined) {
                    this.associations[id].idUsers = idUsers;
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
       const a= this.getById(id);
       var tab: User[]=[];
        for(let i=0;i<this.getById(id).idUsers.length;i++) {
           tab.push(this.service.getById(a.idUsers[i]));
        }
        return tab;


}

}
