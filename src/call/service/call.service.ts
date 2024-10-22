import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CallDto } from '../dto/call.dto';
import { Call } from '../interface/call.interface';
import { CallDeleteDto } from '../dto/callDelete.dto';
import { CallListDto } from '../dto/callList.dto';

@Injectable()
export class CallService {

    private deleted_at = new Date();

    constructor(private prisma: PrismaService) {}

    async createCall(data: CallDto): Promise<Call> {
        return this.prisma.tb_call.create({
            data
        })
    }

    async deleteCall(data: CallDeleteDto): Promise<Call> {
        return this.prisma.tb_call.update({
            where: {
                id: data.id
            },
            data: {
                deleted_at: this.deleted_at.toISOString()
            }
        })
    }

    async findAllCalls(): Promise<Array<Call>> {
        return this.prisma.tb_call.findMany({
            include: {
                image: {
                    select: {
                        url: true
                    }
                }
            },
            where: {
                deleted_at: null
            }
        })
    }

    async findCalls(data: CallListDto): Promise<Array<Call>> {
        return this.prisma.tb_call.findMany({
            include: {
                image: {
                    select: {
                        url: true
                    }
                }
            },where: {
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
    }
}
