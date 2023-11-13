import { Module } from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { AssociationsController } from './associations.controller';
import {UsersModule} from "../users/users.module";
import {Association} from "./association.entity";
import {TypeOrmModule} from "@nestjs/typeorm";


@Module({
  providers: [AssociationsService],
  imports: [TypeOrmModule.forFeature([Association]),UsersModule] ,
  controllers: [AssociationsController]
})
export class AssociationsModule {}
