import { Test, TestingModule } from '@nestjs/testing';
import { MunicipalityController } from './municipality.controller';
import { MunicipalityService } from '../service/municipality.service';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthService } from '../../auth/service/auth.service';
import { UserService } from '../../user/service/user.service';
import { ClientService } from '../../client/service/client.service';
import { JwtService } from '@nestjs/jwt';

describe('MunicipalityController', () => {
  let controller: MunicipalityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MunicipalityController, MunicipalityService],
      providers: [MunicipalityService, PrismaService, AuthService, UserService, ClientService, {
        provide: JwtService,
        useValue: {
          sign: jest.fn().mockResolvedValue(process.env.FAKE_TOKEN),
          verify: jest.fn().mockReturnValue({})
        }
      }]
    }).compile();

    controller = module.get<MunicipalityController>(MunicipalityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
