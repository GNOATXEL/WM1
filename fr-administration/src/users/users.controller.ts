// users.controller.ts
import {Controller, Get, Body, Post, Param, Put, HttpException, HttpStatus, Delete} from '@nestjs/common';
import { User } from './user.entity';
import {isUndefined} from "@nestjs/common/utils/shared.utils";
import {UsersService} from "./users.service"; // Assurez-vous que le chemin d'importation est correct

const users: User[] = [
    {
        id: 0,
        lastname: 'Doe',
        firstname: 'John',
        age: 23
    },

];

@Controller('users')
export class UsersController {
    constructor(private service: UsersService) {
    }

    @Post()
    create(@Body() input: any): User {
        if (this.service.create(input.lastname, input.firstname, input.age) != undefined) {
            return this.service.create(input.lastname, input.firstname, input.age);
        } else {
            throw new HttpException(
                `Incorrect parameters`,
                HttpStatus.NOT_FOUND,
            );
        }
    }

    @Get()
    async getAllUsers(): Promise<User[]> {
        return await this.service.getAllUsers();
    }

    @Get(':id')
    async getById(@Param() parameter): Promise<User> {
        const a = this.service.getById(parameter.id);
        if (a != undefined) {
            return a;
        } else {
            throw new HttpException(
                `Could not find a user with the id ${parameter.id}`,
                HttpStatus.NOT_FOUND,
            );
        }
    }

    @Put(':id')
    async update(@Param() parameter, @Body() input: any): Promise<void> {
        if (!this.service.update(parseFloat(parameter.id),input.lastname, input.firstname, input.age)) {
            throw new HttpException(
                `Could not find a user with the id ${parameter.id}`,
                HttpStatus.NOT_FOUND,
            );
        }
    }

    @Delete(':id')
    async deleteUser(@Param() parameter): Promise<boolean> {
        if (this.service.deleteUser(parameter.id)) {
            return true;
        } else {
            throw new HttpException(
                `Could not find a user with the id ${parameter.id}`,
                HttpStatus.NOT_FOUND,);
        }
    }
}


