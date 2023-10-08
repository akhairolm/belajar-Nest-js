import { Body, Controller, Get, Delete, Param, Post, Query, Patch } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    findAllUser(@Query('email') email: string) {
        return this.usersService.find(email);
    }

    @Post()
    createUser(@Body() body: CreateUserDto){
        return this.usersService.create(body.name, body.email, body.password);
    }

    @Get('/:id')
    findUser(@Param('id') id:string) {
        return this.usersService.findOneBy(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.update(parseInt(id), body);

    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id));
    }
}