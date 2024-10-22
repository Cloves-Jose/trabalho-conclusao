import { Test, TestingModule } from '@nestjs/testing';
import { CallController } from './call.controller';
import { AuthController } from '../../auth/controller/auth.controller';
import { CallService } from '../service/call.service';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthService } from '../../auth/service/auth.service';
import { UserService } from '../../user/service/user.service';
import { ClientService } from '../../client/service/client.service';
import { JwtService } from '@nestjs/jwt';

describe('CallController', () => {
  let controller: CallController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CallController, AuthController],
      providers: [CallService, PrismaService, AuthService, UserService, ClientService, {
        provide: JwtService,
        useValue: {
          sign: jest.fn().mockReturnValue(process.env.FAKE_TOKEN),
          verify: jest.fn().mockReturnValue({})
        }
      }]
    }).compile();

    controller = module.get<CallController>(CallController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
