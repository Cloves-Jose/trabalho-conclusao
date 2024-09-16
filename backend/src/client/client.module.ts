import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ClientService } from './service/client.service';

@Module({
    imports: [PrismaModule],
    providers: [ClientService],
    exports: [ClientService],
    controllers: []
})
export class ClientModule {}
