// 2controller.ts
import {Controller, Get, Body, Post, Param, Put, HttpException, HttpStatus, Delete, UseGuards} from '@nestjs/common';
import { Role } from './role.entity';
import {isUndefined} from "@nestjs/common/utils/shared.utils";
import {RolesService} from "./roles.service";
import {ApiCreatedResponse, ApiTags} from "@nestjs/swagger";
import {RoleInput} from "./role.input";
import {AuthGuard} from "@nestjs/passport"; // Assurez-vous que le chemin d'importation est correct

const roles: Role[] = [
    {
        id: 0,
        name: 'Role1',
        idUser: 0,
        idAssociation: 0
    },

];
@ApiTags('roles')
@Controller('roles')
export class RolesController {
    constructor(private service: RolesService) {
    }

    @Post()
    @ApiCreatedResponse({
        description: 'The role has been successfully created.'
    })
    public async create(@Body() input: RoleInput): Promise<Role> {
        return this.service.create(input.name, input.idUser, input.idAssociation);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    @ApiCreatedResponse({
        description: 'Roles have been successfully returned'
    })
    async getAllRoles(): Promise<Role[]> {
        return await this.service.getAllRoles();
    }

    @Get(':id')
    @ApiCreatedResponse({
        description: 'Role has been successfully returned'
    })
    async getById(@Param() parameter): Promise<Role> {
        const a = this.service.getById(parameter.id);
        if (a != undefined) {
            return a;
        } else {
            throw new HttpException(
                `Could not find a role with the id ${parameter.id}`,
                HttpStatus.NOT_FOUND,
            );
        }
    }

    @Put(':id')
    @ApiCreatedResponse({
        description: 'Role has been successfully modified'
    })
    async update(@Param() parameter, @Body() input: RoleInput): Promise<void> {
        if (!this.service.update(parseFloat(parameter.id),input.name, input.idUser, input.idAssociation)) {
            throw new HttpException(
                `Could not find a role with the id ${parameter.id}`,
                HttpStatus.NOT_FOUND,
            );
        }
    }

    @Delete(':id')
    @ApiCreatedResponse({
        description: 'The role has been successfully deleted.'
    })
    async deleteUser(@Param() parameter): Promise<boolean> {
        if (this.service.deleteRole(parameter.id)) {
            return true;
        } else {
            throw new HttpException(
                `Could not find a role with the id ${parameter.id}`,
                HttpStatus.NOT_FOUND,);
        }
    }
}


