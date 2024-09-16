import { Controller, ValidationPipe, Body, Post, UseGuards, Get, Delete, Put } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserDto } from '../dto/user.dto';
import { User } from '../interface/user.interface';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { UserListDto } from '../dto/userListDto.dto';
import { UserDeleteDto } from '../dto/userDelete.dto';
import { UserUpdateDto } from '../dto/userUpdate.dto';

@ApiTags('Rotas para regras do crud de usuários')
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Realiza o cadastro de um novo usuário no sistema' })
    @ApiResponse({ status: 200, description: 'Success.' })
    @Post()
    async createUser(@Body(new ValidationPipe()) user: UserDto): Promise<User> {
        return this.userService.createUserWeb(user)
    }

    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Atualiza os dados do usuário selecionado' })
    @ApiResponse({ status: 200, description: 'Success.' })
    @Put()
    async updateUser(@Body(new ValidationPipe()) user: UserUpdateDto): Promise<User> {
        return this.userService.updateUser(user)
    }

    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Deleta o usuário selecionado' })
    @ApiResponse({ status: 200, description: 'Success.' })
    @Delete()
    async deleteUser(@Body(new ValidationPipe()) user: UserDeleteDto): Promise<User> {
        return this.userService.deleteUser(user)
    }

    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Retorna a listagem de usuários cadastrados na plataforma web' })
    @ApiResponse({ status: 200, description: 'Success.' })
    @Get()
    async listUser(@Body(new ValidationPipe()) user: UserListDto) {
        return this.userService.findUsers(user)
    }
}
