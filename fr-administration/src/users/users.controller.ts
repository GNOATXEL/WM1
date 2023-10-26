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
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {
  }

  @Post()
  create(@Body() input: any): User {
    return this.service.create(input.lastname, input.firstname, input.age);
  }

  @Get()
  getAllUser(): User[] {
    return this.service.users;
  }

  @Get(':id')
  getById(@Param() parameter): User {
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
  update(@Param() parameter, @Body() input: any): void {
    if (!this.service.update(parseFloat(parameter.id),input.lastname, input.firstname, input.age)) {
      throw new HttpException(
          `Could not find a user with the id ${parameter.id}`,
          HttpStatus.NOT_FOUND,
      );
    }
  }

  @Delete(':id')
  deleteUser(@Param() parameter): boolean {
    if (this.service.deleteUser(parameter.id)) {
      return true;
    } else {
      throw new HttpException(
          `Could not find a user with the id ${parameter.id}`,
          HttpStatus.NOT_FOUND,);
    }
  }
}


