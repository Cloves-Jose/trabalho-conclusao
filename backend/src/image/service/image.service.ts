import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Request } from 'express'
import { Image } from '../interface/image.interface';

@Injectable()
export class ImageService {
    constructor(private prisma: PrismaService) {}

    async uploadImage(file: Express.Multer.File, req: Request, data: { municipality_id: string }): Promise<Image> {
        const files = {
            fileName: file.filename,
            contentLength: file.size,
            contentType: file.mimetype,
            municipality_id: data.municipality_id,
            url: `${req.protocol}://${req.get('host')}/files/${file.filename}`
        }
        return this.prisma.tb_image.create({ data: files })
    }

}
