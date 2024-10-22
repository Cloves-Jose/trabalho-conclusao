import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../service/auth.service';
import { UserService } from '../../user/service/user.service';
import { AuthDto } from '../dto/auth.dto';
import { AuthGuard } from '../guard/auth.guard';
import { UserDto } from '../../user/dto/user.dto';
import { ClientService } from '../../client/service/client.service';
import { ClientDto } from '../../client/dto/clientCreateDto.dto';

@ApiTags('Rotas de autenticação na plataforma web e mobile')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UserService, private clientService: ClientService) {}

    @ApiOperation({ summary: 'Efetua o login na plataforma web' })
    @ApiResponse({ status: 200, description: 'Success.' })
    @HttpCode(HttpStatus.OK)
    @Post('login/web')
    signInWeb(@Body() data:AuthDto) {
        return this.authService.singInWeb(data)
    }

    @ApiOperation({ summary: 'Efetua o login na plataforma mobile' })
    @ApiResponse({ status: 200, description: 'Success.' })
    @HttpCode(HttpStatus.OK)
    @Post('login/app')
    signInApp(@Body() data:AuthDto) {
        return this.authService.singInApp(data)
    }

    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Retorna informações do cliente logado a partir do token gerado web ou app' })
    @ApiResponse({ status: 200, description: 'Success.' })
    @Post('/me')
    getProfile(@Body() {token}) {
        return this.authService.checkToken(token)
    }

    @ApiOperation({ summary: 'Realiza o cadastro de um novo cliente mobile' })
    @ApiResponse({ status: 200, description: 'Success.' })
    @HttpCode(HttpStatus.OK)
    @Post('/create/client/app')
    async registerApp(@Body() data: ClientDto) {
        return this.clientService.createUserMobile(data)
    }

    @ApiOperation({ summary: 'Realiza o cadastro de um novo usuário no sistema web' })
    @ApiResponse({ status: 200, description: 'Success.' })
    @HttpCode(HttpStatus.OK)
    @Post('/create/user/web')
    async register(@Body() data: UserDto) {
        return this.userService.createUserWeb(data)
    }
}
