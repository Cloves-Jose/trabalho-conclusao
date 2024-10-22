import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from '../service/category.service';
import { categoryMock, categoryServiceMock } from './category.service.mock';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthController } from '../../auth/controller/auth.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../../auth/service/auth.service';
import { UserService } from '../../user/service/user.service';
import { ClientService } from '../../client/service/client.service';

describe('CategoryController', () => {
  let controller: CategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController, AuthController],
      providers: [CategoryService, PrismaService, AuthService, UserService, ClientService, {
        provide: JwtService,
        useValue: {
          sign: jest.fn().mockReturnValue(process.env.FAKE_TOKEN),
          verify: jest.fn().mockReturnValue({})
        }
      }],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
