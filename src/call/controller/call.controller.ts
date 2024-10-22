import { Controller, ValidationPipe, Body, Post, Delete, Get, UseGuards } from '@nestjs/common';
import { CallService } from '../service/call.service';
import { Call } from '../interface/call.interface';
import { CallDto } from '../dto/call.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CallDeleteDto } from '../dto/callDelete.dto';
import { CallListDto } from '../dto/callList.dto';
import { AuthMobileGuard } from '../../auth/guard/auth.mobile.guard';
import { AuthGuard } from '../../auth/guard/auth.guard';

@ApiTags('Rotas para registro de uma ameça via app')
@Controller('call')
export class CallController {

    constructor(private readonly callService: CallService) {}

    // @UseGuards(AuthMobileGuard)
    @ApiBody({ type: [CallDto] })
    @ApiOperation({ summary: 'Efetura a criação de uma novo chamado de ameaça' })
    @ApiResponse({ status: 200, description: 'Success.' })
    @Post()
    async createCall(@Body(new ValidationPipe()) call: CallDto): Promise<Call> {
        return this.callService.createCall(call)
    }

    @UseGuards(AuthGuard)
    @ApiBody({ type: [CallDeleteDto] })
    @ApiOperation({ summary: 'Deleta um chamado de ameaça já resolvido' })
    @ApiResponse({ status: 200, description: 'Success.' })
    @Delete()
    async deleteCall(@Body(new ValidationPipe()) call: CallDeleteDto): Promise<Call> {
        return this.callService.deleteCall(call)
    }   

    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Lista todas as chamadas de ameaça para o mapa' })
    @ApiResponse({ status: 200, description: 'Success' })
    @Get()
    async listAllCalls(): Promise<Array<Call>> {
        return this.callService.findAllCalls()
    }

    @UseGuards(AuthGuard)
    @ApiBody({ type: [CallListDto] })
    @ApiOperation({ summary: 'Lista paginada de ameaças para listagem' })
    @ApiResponse({ status: 200, description: 'Success' })
    @Get('list')
    async listCalls(@Body( new ValidationPipe()) call: CallListDto): Promise<Array<Call>> {
        return this.callService.findCalls(call)
    }
}
