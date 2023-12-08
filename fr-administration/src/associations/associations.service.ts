import { Injectable } from '@nestjs/common';
import {User} from "../users/user.entity";
import {Association} from "./association.entity";
import {UsersService} from "../users/users.service";
import { InjectRepository } from '@nestjs/typeorm';
import {Equal, getRepository, Repository} from 'typeorm';
import {UsersController} from "../users/users.controller";
import * as console from "console";

@Injectable()
export class AssociationsService {

    constructor(

        private _service: UsersService,
        @InjectRepository(Association)
        private associationRepository: Repository<Association>
    ) {}

    async create(idUsers: number[], name: string): Promise<Association> {
        let users: User[] = [];
        if(idUsers.length!=0){
            for(let i = 0;i<idUsers.length;i++){
            let userToPush: User;
            userToPush =  await this._service.getById(idUsers[i]);
            users.push(userToPush);
        }
        }
        console.log('après if');
        const a= new Association(users, name);
        await this.associationRepository.save(a);
        return a;
    }

    async getById(id:number):Promise<Association> {
        return this.associationRepository.findOne({where:{id:Equal(id)}})

            }

    async update(id:number, users: User[] , name: string): Promise<boolean> {
        const temp = await this.associationRepository.findOne({ where:{id: id}});
        if(!!temp){
            if(users!==undefined) {
                temp.users = users;
            }
            if(name!==undefined) {
                temp.name = name;
            }
            await this.associationRepository.save(temp);
            return true;

        }

        return false
    }

    async deleteAssociation(id:number): Promise <boolean> {

        const associationtemp = await this.associationRepository.findOne({where:{id}});

        if (!associationtemp) {
            return false
        }

        await this.associationRepository.remove(associationtemp);
        return true;
    }


    async getMembers(id:number):Promise<User[]>{
        console.log("getmembers");
       return (await this.getById(id)).users;
}

    public async getAllAssociations(): Promise<Association[]> {
        return this.associationRepository.find();
    }

}
