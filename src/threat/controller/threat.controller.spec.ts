import { Test, TestingModule } from '@nestjs/testing';
import { ThreatController } from './threat.controller';
import { ThreatService } from '../service/threat.service';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthService } from '../../auth/service/auth.service';
import { UserService } from '../../user/service/user.service';
import { ClientService } from '../../client/service/client.service';
import { JwtService } from '@nestjs/jwt';

describe('ThreatController', () => {
  let controller: ThreatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThreatController, ThreatService],
      providers: [ThreatService, PrismaService, AuthService, UserService, ClientService, {
        provide: JwtService,
        useValue: {
          sign: jest.fn().mockReturnValue(process.env.FAKE_TOKEN),
          verify: jest.fn().mockReturnValue({})
        }
      }]
    }).compile();

    controller = module.get<ThreatController>(ThreatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
