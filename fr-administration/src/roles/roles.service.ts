import {Body, Delete, Get, HttpException, HttpStatus, Injectable, NotFoundException, Param} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {Role} from "./role.entity";


@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private roleRepository: Repository<Role>
    ) {}

    async create(name: string, idUser: number, idAssociation: number): Promise<Role> {
        if(name!=undefined && idUser!=undefined && idAssociation!=undefined) {
            const roel = new Role(name, idUser, idAssociation);
            this.roleRepository.save(roel);
            return roel;
        }
        else{
            throw new HttpException(
                `Incorrect parameters`,
                HttpStatus.NOT_FOUND,
            );}
    }

    public async getById(idToFind: number): Promise<Role> {
        return await this.roleRepository.findOne({where: {id: idToFind}});
    }


    public async update(id:number,name:string, idUser: number, idAssociation: number): Promise<boolean> {
        const temp = await this.roleRepository.findOne({ where:{id: id}});
        if(!!temp){
            if(name!==undefined) {
                temp.name = name;
            }
            if(idUser!==undefined) {
                temp.idUser = idUser;
            }
            if(idAssociation!==undefined) {
                temp.idAssociation = idAssociation;
            }


            await this.roleRepository.save(temp);
            return true;

        }

        return false
    }

    public async deleteRole(id:number): Promise<boolean> {
        const role = await this.roleRepository.findOne({where:{id}});

        if (!role) {
            return false
        }

        await this.roleRepository.delete(role);
        return true;
    }

    public async getAllRoles(): Promise<Role[]> {
        return this.roleRepository.find();
    }
}
