import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MunicipalityDto } from '../dto/municipalityCreateDto.dto';
import { Municipality } from '../interface/municipality.interface';

@Injectable()
export class MunicipalityService {

    constructor(private prisma: PrismaService) {}

    async createMunicipality(data: MunicipalityDto): Promise<Municipality> {
        return this.prisma.tb_municipality.create({data})
    }
}
