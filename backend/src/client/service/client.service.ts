import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ClientDto } from '../dto/clientCreateDto.dto';
import * as bcrypt from 'bcrypt'
import { Client } from '../interface/client.interface';
import { AuthDto } from '../../auth/dto/auth.dto';

@Injectable()
export class ClientService {

    // private deleted_at = new Date();

    constructor(private prisma: PrismaService) {}

    async createUserMobile(data: ClientDto): Promise<Client> {
        try {
            const name = data.name.normalize("NFD").toUpperCase();

            const date = data.birth_date
            const [day, month, year] = date.split("/")

            const birth_date = new Date(parseInt(year), (parseInt(month) - 1), parseInt(day)).toISOString()

            const saltOrRounds = 10
            const hash = await bcrypt.hash(data.password, saltOrRounds)

            return await this.prisma.tb_client.create({
                data: {
                    name: name,
                    email: data.email,
                    gender: data.gender,
                    municipality_id: data.municipality_id,
                    birth_date: birth_date,
                    password: hash
                }
            })

        } catch(error) {
            console.log("Erro durante a criação do agente: ", error);
            throw new Error("Erro durante a criação do agente")
        }
    }

    async findUserByEmail(data: AuthDto): Promise<Client> {
        try {
            return this.prisma.tb_client.findUnique({
                where: {
                    email: data.email,
                    deleted_at: null
                }
            })
        } catch(error) {
            console.log("Erro ao buscar por agente: ", error)
            throw new Error("Erro ao buscar por cliente")
        }
    }
}
