// users.controller.ts
import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {User} from './user.entity';

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
        const nuser = new User(users.length, input.lastname, input.firstname)
        users.push(nuser);
        return nuser;

    }

    @Get()
    getAllUser(): User[] {
        return users;
    }

    @Get(':id')
    getById(@Param() parameter): User {
        for (let i = 0; i < users.length; i++) {
            if (parameter.id == users[i].id) {
                return users[i];
            }
        }
        throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND)
    }

    @Put(':id')
    update(@Param() parameter, @Body() input: any): void {
        if (input.firstname !== undefined) {
            users[parameter.id].firstname = input.firstname
        }
        if (input.lastname !== undefined) {
            users[parameter.id].lastname = input.lastname
        }

    }

    @Delete(':id')
    deleteUser(@Param() parameter): boolean {

        for (let i = 0; i < users.length; i++) {
            if (parameter.id == users[i].id) {
                users.splice(i, 1);
                return true;
            }

        }
        throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
    }


}

/* CHANGER COMMENT QUE LES ID ILS MARCHENT*/
/* CHANGER COMMENT QUE LES ID ILS MARCHENT*/
/* CHANGER COMMENT QUE LES ID ILS MARCHENT*/
/* CHANGER COMMENT QUE LES ID ILS MARCHENT*/
/* CHANGER COMMENT QUE LES ID ILS MARCHENT*/
