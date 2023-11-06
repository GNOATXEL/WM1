// users.controller.ts
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { Association } from './association.entity';
import { AssociationsService } from './associations.service';
import {User} from "../users/user.entity";

@Controller('users')
export class UsersController {
    constructor(private service: UsersService) {
    }

    @Post()
    create(@Body() input: any): Association {
        return this.service.create(input.idUsers, input.name);
    }

    @Get()
    getAllUser(): Association[] {
        return this.service.associations;
    }

    @Get(':id')
    getById(@Param() parameter): Association {
        const a = this.service.getById(parameter.id);
        if (a != undefined) {
            return a;
        } else {
            throw new HttpException(
                `Could not find an association with the id ${parameter.id}`,
                HttpStatus.NOT_FOUND,
            );
        }
    }

    @Put(':id')
    update(@Param() parameter, @Body() input: any): void {
        if (!this.service.update(parseFloat(parameter.id),input.idUsers, input.name)) {
            throw new HttpException(
                `Could not find an association with the id ${parameter.id}`,
                HttpStatus.NOT_FOUND,
            );
        }
    }

    @Delete(':id')
    deleteAssociation(@Param() parameter): boolean {
        if (this.service.deleteAssociation(parameter.id)) {
            return true;
        } else {
            throw new HttpException(
                `Could not find an association with the id ${parameter.id}`,
                HttpStatus.NOT_FOUND,);
        }
    }

    @Get(':id/members')
    getMembers(@Param() parameter): User[] {
        return this.service.getMembers(parameter.id);
    }
}


