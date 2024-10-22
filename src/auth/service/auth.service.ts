import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/service/user.service';
import { AuthDto } from '../dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ClientService } from '../../client/service/client.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private clientService: ClientService,
        private jwtService: JwtService) {}

    async generateToken(id: string, permission: string) {
        const payload = { sub: id, permission: permission }

        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }

    async singInWeb(data: AuthDto): Promise<any> {
        try {
            const agent = await this.userService.findUserByEmail(data);
    
            const isMath = await bcrypt.compare(data.password, agent.password);
    
            if (isMath == false) {
                throw new UnauthorizedException('E-mail e/ou senha inválidos')
            }
    
            let result = await this.generateToken(agent.id, agent.role_platform);
    
            return { agent_id: agent.id, role_users: agent.role_users, municipality_id: agent.municipality_id, access_token: result.access_token, }
        } catch(error) {
            console.error("Erro ao tentar logar usuário web", error)
            throw new Error("Erro ao tentar logar usuário web")
        }
    }

    async singInApp(data: AuthDto): Promise<any> {
        try {
            const client = await this.clientService.findUserByEmail(data)
    
            const isMath = await bcrypt.compare(data.password, client.password);
    
            if (isMath == false) {
                throw new UnauthorizedException("E-mail e/ou senha inválidos")
            }
    
            let result = await this.generateToken(client.id, client.role_platform)
    
            return { user_id: client.id, municipality_id: client.municipality_id, access_token: result.access_token }
        } catch(error) {
            console.error("Erro ao tentar logar usuário mobile", error)
            throw new Error("Erro ao tentar logar usuário mobile");
        }
    }

    async checkToken(token: string) {
        return this.jwtService.verifyAsync(token)
    }
}
