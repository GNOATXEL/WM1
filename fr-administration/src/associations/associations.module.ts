import { Module } from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { AssociationsController } from './associations.controller';
import {UsersModule} from "../users/users.module";


@Module({
  providers: [AssociationsService],
  imports: [UsersModule],
  controllers: [AssociationsController]
})
export class AssociationsModule {}
