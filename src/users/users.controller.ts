// users.controller.ts
import { Controller, Get, Body, Post, Param , Put} from '@nestjs/common';
import { User } from './user.entity';
import {isUndefined} from "@nestjs/common/utils/shared.utils"; // Assurez-vous que le chemin d'importation est correct

const users: User[] = [
    {
        id: 0,
        lastname: 'Doe',
        firstname: 'John',
    },

];

@Controller('users')
export class UsersController {
    @Post()
    create(@Body() input: any): User {
        const nuser = new User(users.length,input.lastname, input.firstname)
        users.push(nuser);
        return nuser;

    }
    @Get()
    getAllUser(): User[] {
        return users;
    }

    @Get(':id')
    getById(@Param() parameter):User {
        return users[parameter.id]
    }

    @Put(':id')
    update(@Param() parameter, @Body() input: any):void{
        if(input.firstname !== undefined){
        users[parameter.id].firstname=input.firstname }
        if (input.lastname !== undefined){
        users[parameter.id].lastname=input.lastname}
    }


}
/* CHANGER COMMENT QUE LES ID ILS MARCHENT*/
/* CHANGER COMMENT QUE LES ID ILS MARCHENT*/
/* CHANGER COMMENT QUE LES ID ILS MARCHENT*/
/* CHANGER COMMENT QUE LES ID ILS MARCHENT*/
/* CHANGER COMMENT QUE LES ID ILS MARCHENT*/
