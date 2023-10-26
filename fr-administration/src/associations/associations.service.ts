import { Injectable } from '@nestjs/common';
import {User} from "../users/user.entity";
import {Association} from "./association.entity";

@Injectable()
export class AssociationsService {associations :Association[] = [
];
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

    deleteUser(id:number): boolean {
        for (let i = 0; i < this.associations.length; i++) {
            if (id == this.associations[i].id) {
                this.associations.splice(i, 1);
                return true;
            }
        }
        return false;
    }}