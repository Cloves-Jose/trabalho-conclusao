import { Controller, UploadedFile, Req, Post, UseGuards, Body, UseInterceptors, StreamableFile, ValidationPipe } from '@nestjs/common';
import { ImageService } from '../service/image.service';
import { Request } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from '../config/multer-config';
import { createReadStream } from 'fs';
import { join } from 'path';

@ApiTags('Rota para upload de imagem')
@Controller('image')
export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Efetua o upload de uma nova image' })
    @ApiResponse({ status: 200, description: 'Success.' })
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', multerConfig))
    uploadImage(@Body(new ValidationPipe()) data: { municipality_id: string }, @UploadedFile() file: Express.Multer.File, @Req() req: Request) {
        return this.imageService.uploadImage(file, req, data);
    }
}
