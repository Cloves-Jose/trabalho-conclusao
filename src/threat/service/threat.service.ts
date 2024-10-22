import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ThreatDto } from '../dto/threatCreate.dto';
import { Threat } from '../interface/threat.interface';
import { ThreatListDto } from '../dto/threatListDto.dto';
import { ThreatUpdateDto } from '../dto/threatUpdate.dto';
import { ThreatDeleteDto } from '../dto/threatDelete.dto';

@Injectable()
export class ThreatService {

    private deleted_at = new Date();

    constructor(private prisma: PrismaService) {}

    async createThreat(data: ThreatDto): Promise<Threat> {
        return this.prisma.tb_threat.create({
            include: {
                image: {
                    select: {
                        fileName: true,
                        contentLength: true,
                        contentType: true,
                        url: true
                    }
                },
                category: {
                    select: {
                        title: true
                    }
                }
            },
            data
        })
    }

    async findThreatById(data: {id: string}): Promise<Threat> {
        return this.prisma.tb_threat.findUnique({
            include: {
                image: {
                    select: {
                        fileName: true,
                        contentLength: true,
                        contentType: true,
                        url: true
                    }
                },
                category: {
                    select: {
                        id: true,
                        title: true
                    }
                },
                municipality: true
            },
            where: {
                id: data.id
            }
        })
    }

    async updateThreat(data: ThreatUpdateDto): Promise<Threat> {
        return this.prisma.tb_threat.update({
            include: {
                image: {
                    select: {
                        url: true
                    }
                },
                category: {
                    select: {
                        title: true
                    }
                }
            },
            where: {
                id: data.id
            },
            data: {
                category_id: data.category_id,
                title: data.title,
                threat_level: data.threat_level,
                description: data.description,
                image_id: data.image_id
            }
        })
    }

    async deleteThreat(data: ThreatDeleteDto): Promise<Threat> {
        return this.prisma.tb_threat.update({
            where: {
                id: data.id
            },
            data: {
                deleted_at: this.deleted_at.toISOString()
            }
        })
    }

    async findThreats(data: ThreatListDto): Promise<Array<Threat>> {
        return this.prisma.tb_threat.findMany({
            include: {
                image: {
                    select: {
                        fileName: true,
                        contentLength: true,
                        contentType: true,
                        url: true
                    }
                },
                category: {
                    select: {
                        id: true,
                        title: true
                    }
                }
            },
            where: {
                municipality_id: data.municipality_id,
                deleted_at: null
            },
            skip: data.skip,
            take: data.take,
            orderBy: {
                created_at: data.order
            }
        })
    }

}
