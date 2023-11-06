import { Module } from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { AssociationsController } from './associations.controller';
import {UsersModule} from "../users/users.module";
import {Association} from "./association.entity";


@Module({
  providers: [AssociationsService],
  imports: [UsersModule],[TypeOrmModule.forFeature(Association)] ,
  controllers: [AssociationsController]
})
export class AssociationsModule {}
