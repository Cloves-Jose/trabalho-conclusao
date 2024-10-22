import { Test, TestingModule } from '@nestjs/testing';
import { ImageController } from './image.controller';
import { AuthController } from '../../auth/controller/auth.controller';
import { JwtService } from '@nestjs/jwt';
import { ImageService } from '../service/image.service';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthService } from '../../auth/service/auth.service';
import { UserService } from '../../user/service/user.service';
import { ClientService } from '../../client/service/client.service';

describe('ImageController', () => {
  let controller: ImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageController, AuthController],
      providers: [
        AuthService,
        PrismaService,
        ImageService,
        UserService,
        ClientService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue(process.env.FAKE_TOKEN),
            verify: jest.fn().mockReturnValue({})
          }
        }
      ]
    }).compile();

    controller = module.get<ImageController>(ImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
