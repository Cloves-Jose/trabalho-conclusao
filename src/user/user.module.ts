import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UserService } from './service/user.service';

@Module({
    imports: [PrismaModule],
    providers: [UserService],
    exports: [UserService],
    controllers: []
})
export class UserModule {}
