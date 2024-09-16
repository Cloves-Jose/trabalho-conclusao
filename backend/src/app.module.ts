import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { CallService } from './call/service/call.service';
import { CallController } from './call/controller/call.controller';
import { CategoryService } from './category/service/category.service';
import { CategoryController } from './category/controller/category.controller';
import { ThreatService } from './threat/service/threat.service';
import { ThreatController } from './threat/controller/threat.controller';
import { UserService } from './user/service/user.service';
import { AuthService } from './auth/service/auth.service';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/controller/user.controller';
import { UserModule } from './user/user.module';
import { ClientService } from './client/service/client.service';
import { ImageService } from './image/service/image.service';
import { ImageController } from './image/controller/image.controller';
import { ClientController } from './client/controller/client.controller';
import { ClientModule } from './client/client.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MunicipalityService } from './municipality/service/municipality.service';
// import { MunicipalityService } from './municipality/municipality.service';
import { MunicipalityController } from './municipality/controller/municipality.controller';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, ClientModule, ThrottlerModule.forRoot([{ ttl: 10000, limit: 6 }]), ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'upload') })],
  controllers: [CallController, CategoryController, ThreatController, UserController, ImageController, ClientController, MunicipalityController],
  providers: [PrismaService, CallService, CategoryService, ThreatService, UserService, AuthService, ClientService, ImageService, MunicipalityService],
})
export class AppModule {}
