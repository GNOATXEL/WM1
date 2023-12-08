import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import {UsersModule} from "../users/users.module";
import {AssociationsModule} from "../associations/associations.module";
import {Role} from "./role.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/user.entity";
import {Association} from "../associations/association.entity";
import {UsersService} from "../users/users.service";


@Module({
    providers: [RolesService],
    imports: [TypeOrmModule.forFeature([Role, User, Association]),UsersModule, AssociationsModule, RolesModule] ,
    controllers: [RolesController],
    exports: [RolesService]
})
export class RolesModule {}
