import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { AuthController } from '../../auth/controller/auth.controller';
import { CategoryService } from '../../category/service/category.service';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthService } from '../../auth/service/auth.service';
import { UserService } from '../service/user.service';
import { ClientService } from '../../client/service/client.service';
import { JwtService } from '@nestjs/jwt';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController, AuthController],
      providers: [
        CategoryService,
        PrismaService,
        AuthService,
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

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
