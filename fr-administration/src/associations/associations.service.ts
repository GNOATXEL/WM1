import { Injectable } from '@nestjs/common';
import {User} from "../users/user.entity";
import {Association} from "./association.entity";
import {UsersService} from "../users/users.service";
import { InjectRepository } from '@nestjs/typeorm';
import {Equal, getRepository, Repository} from 'typeorm';
import {UsersController} from "../users/users.controller";

@Injectable()
export class AssociationsService {

    constructor(

        private service: UsersService,
        @InjectRepository(Association)
        private associationRepository: Repository<Association>
    ) {}

    async create(idUsers: number[], name: string): Promise<Association> {
        let users: Repository<User> = getRepository(User);
        for(let i: number;i<idUsers.length;i++){
            let userToPush: User;
            userToPush =  await this.service.getById(idUsers[i]);
            await users.save(userToPush);
        }
        const a= new Association(users, name);
        await this.associationRepository.save(a);
        return a;
    }

    async getById(id:number):Promise<Association> {
        return this.associationRepository.findOne({where:{id:Equal(id)}})

            }

    async update(id:number, users: Repository<User> , name: string): Promise<boolean> {
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
       return (await this.getById(id)).users.find();
}

    public async getAllAssociations(): Promise<Association[]> {
        return this.associationRepository.find();
    }

}
