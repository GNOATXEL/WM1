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

@Controller('associations')
export class AssociationsController {
    constructor(private service: AssociationsService) {
    }

    @Post()
    async create(@Body() input: any): Promise<Association> {
        return this.service.create(input.idUsers, input.name);
    }

    @Get()
    async getAllAssociations(): Promise<Association[]> {
        return this.service.getAllAssociations();
    }

    @Get(':id')
    async getById(@Param() parameter): Promise<Association> {
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
    async update(@Param() parameter, @Body() input: any): Promise<void> {
        if (!this.service.update(parseFloat(parameter.id),input.idUsers, input.name)) {
            throw new HttpException(
                `Could not find an association with the id ${parameter.id}`,
                HttpStatus.NOT_FOUND,
            );
        }
    }

    @Delete(':id')
   async deleteAssociation(@Param() parameter): Promise <boolean> {
        if (this.service.deleteAssociation(parameter.id)) {
            return true;
        } else {
            throw new HttpException(
                `Could not find an association with the id ${parameter.id}`,
                HttpStatus.NOT_FOUND,);
        }
    }

    @Get(':id/members')
    async getMembers(@Param() parameter): Promise<User[]> {
        return this.service.getMembers(parameter.id);
    }
}

