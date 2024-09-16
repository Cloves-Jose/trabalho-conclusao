import { Controller, ValidationPipe, Body, Post, UseGuards, Get, Put, Delete, Query } from '@nestjs/common';
import { ThreatService } from '../service/threat.service';
import { ThreatDto } from '../dto/threatCreate.dto';
import { Threat } from '../interface/threat.interface';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { ThreatListDto } from '../dto/threatListDto.dto';
import { ThreatUpdateDto } from '../dto/threatUpdate.dto';
import { ThreatDeleteDto } from '../dto/threatDelete.dto';
import { AuthMobileGuard } from '../../auth/guard/auth.mobile.guard';

@ApiTags('Rotas para regras do crud de ameaças que serão exibidas no sistema mobile/web')
@Controller('threat')
export class ThreatController {

    constructor(private readonly threatService: ThreatService) {}

    @UseGuards(AuthGuard)
    @ApiBody({ type: [ThreatDto] })
    @ApiOperation({ summary: 'Efetua a criação de uma nova ameça que será exibida na listagem do app' })
    @ApiResponse({ status: 200, description: 'Success.' })
    @Post()
    async createThreat(@Body(new ValidationPipe()) threat: ThreatDto): Promise<Threat> {
        return this.threatService.createThreat(threat)
    }

    @UseGuards(AuthGuard)
    @ApiBody({ type: [ThreatListDto] })
    @ApiOperation({ summary: 'Exibe a listagem de ameaças paginada' })
    @ApiResponse({ status: 200, description: 'Success.' })
    @Get()
    async listThreat(@Body(new ValidationPipe()) threat: ThreatListDto) {
        return this.threatService.findThreats(threat)
    }  
    
    // @UseGuards(AuthMobileGuard)
    @ApiBody({ type: [ThreatListDto] })
    @ApiOperation({ summary: 'Exibe a listagem de ameaças para o aplicativo mobile' })
    @ApiResponse({ status: 200, description: 'Success.' })
    @Get('mobile')
    async listThreatMobile(@Body(new ValidationPipe()) threat: ThreatListDto) {
        return this.threatService.findThreats(threat)
    }

    // Essa função está quebrada aparentemente
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Retorna as informações da ameaça de acordo com o id' })
    @ApiResponse({ status: 200, description: 'Success.' })
    @Get('id')
    async findThreatById(@Body(new ValidationPipe()) threat: { id: string }): Promise<Threat> {
        return this.threatService.findThreatById(threat)
    }

    @UseGuards(AuthGuard)
    @ApiBody({ type: [ThreatDeleteDto] })
    @ApiOperation({ summary: 'Deleta uma ameaça de acordo com o id' })
    @ApiResponse({ status: 200, description: 'Success.' })
    @Delete()
    async deleteThreat(@Body(new ValidationPipe()) threat: ThreatDeleteDto) {
        return this.threatService.deleteThreat(threat)
    }

    @UseGuards(AuthGuard)
    @ApiBody({ type: [ThreatUpdateDto] })
    @ApiOperation({ summary: 'Exibe os dados da ameaça pesquisada' })
    @ApiResponse({ status: 200, description: 'Success.' })
    @Put()
    async updateThreat(@Body(new ValidationPipe()) threat: ThreatUpdateDto) {
        return this.threatService.updateThreat(threat)
    }
}
