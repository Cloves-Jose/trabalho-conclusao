import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { UserModule } from '../user/user.module';
import { ClientModule } from '../client/client.module';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthController } from './controller/auth.controller';

@Module({
    imports: [
        forwardRef(() => UserModule),
        forwardRef(() => ClientModule),
        PrismaModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '10h' }
        })
    ],
    providers: [AuthService],
    exports: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {}
