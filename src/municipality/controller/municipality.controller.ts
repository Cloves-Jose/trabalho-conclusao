import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MunicipalityService } from '../service/municipality.service';
import { MunicipalityDto } from '../dto/municipalityCreateDto.dto';
import { Municipality } from '../interface/municipality.interface';

@ApiTags('Rotas para o cadastro de municípios')
@Controller('municipality')
export class MunicipalityController {

    constructor(private readonly municipalityService: MunicipalityService) {}

    @ApiBody({ type: [MunicipalityDto] })
    @ApiOperation({ summary: 'Efetua o cadastro de um novo município' })
    @ApiResponse({ status: 201, description: 'Success.' })
    @Post()
    async createMunicipality(@Body(new ValidationPipe()) municipality: MunicipalityDto): Promise<Municipality> {
        return this.municipalityService.createMunicipality(municipality)
    }
}
