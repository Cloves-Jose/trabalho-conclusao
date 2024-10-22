import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserDto } from '../dto/user.dto';
import { User } from '../interface/user.interface';
import { AuthDto } from '../../auth/dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { UserDeleteDto } from '../dto/userDelete.dto';
import { UserListDto } from '../dto/userListDto.dto';
import { UserUpdateDto } from '../dto/userUpdate.dto';
import { RolePlatform } from '../../enum/roles.enum';

@Injectable()
export class UserService {

    private deleted_at = new Date();

    constructor(private prisma: PrismaService) {}

    async createUserWeb(data: UserDto): Promise<User> {
        try {
            const name = data.name.normalize("NFD").toUpperCase()

            const date = data.birth_date
            const [day, month, year] = date.split("/")
    
            const birth_date = new Date(parseInt(year), (parseInt(month) - 1), parseInt(day)).toISOString();

            const saltOrRounds = 10
            const hash = await bcrypt.hash(data.password, saltOrRounds);

            return await this.prisma.tb_agent.create({
                data: {
                    name: name,
                    email: data.email,
                    role_users: data.role_users,
                    role_platform: RolePlatform.WEB,
                    birth_date: birth_date,
                    municipality_id: data.municipality_id,
                    password: hash
                }
            })
        } catch(error) {
            console.error("Erro durante a criação do agente: ", error);
            throw new Error("Erro durante a criação do agente");
        }  
    }

    async updateUser(data: UserUpdateDto): Promise<User> {
        try {
            const name = data.name.normalize("NFD").toUpperCase()
    
            const date = data.birth_date
            const [day, month, year] = date.split("/")
    
            const birth_date = new Date(parseInt(year), (parseInt(month) - 1), parseInt(day)).toISOString()
    
            return this.prisma.tb_agent.update({
                where: {
                    id: data.id
                },
                data: {
                    name: name,
                    birth_date: birth_date,
                    email: data.email,
                    role_users: data.role_users,
                    role_platform: RolePlatform.WEB
                }
            })
        } catch(error) {
            console.error("Error durante a atualização dos dados do agente: ", error);
            throw new Error("Error durante a atualização dos dados do agente");
        }
    }

    async findUsers(data: UserListDto): Promise<Array<User>> {
        try {
            return this.prisma.tb_agent.findMany({
                where: {
                    deleted_at: null
                },
                skip: data.skip,
                take: data.take,
                cursor: {
                    id: data.cursor
                },
                orderBy: {
                    created_at: data.order
                }
            })
        } catch(error) {
            console.error("Erro ao consultar usuários", error);
            throw new Error("Erro ao consultar usuários");
        }
    }

    async deleteUser(data: UserDeleteDto): Promise<User> {
        try {
            return this.prisma.tb_agent.update({
                where: {
                    id: data.id
                },
                data: {
                    deleted_at: this.deleted_at.toISOString()
                }
            })
        } catch(error) {
            console.error("Erro ao deletar usuário", error)
            throw new Error("Erro ao deletar usuário")
        }
    }

    async findUserByEmail(data: AuthDto): Promise<User> {
        try {
            return this.prisma.tb_agent.findUnique({
                where: {
                    email: data.email,
                    deleted_at: null
                }
            })
        } catch(error) {
            console.log("Erro ao buscar por agente: ", error)
            throw new Error("Erro ao buscar por agente")
        }
        
    }
}
