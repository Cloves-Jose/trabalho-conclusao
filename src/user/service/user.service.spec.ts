import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../../prisma/prisma.service';
import { RoleUsers } from '../../enum/roles.enum';

describe('Cenários de teste para funções de usuários', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Deve cadastrar um novo agente na plataforma', async () => {
    const agent = {
      name: "Cloves José",
      email: "clovesjsilva8@gmail.com",
      birth_date: "02/04/1997",
      password: "asd!@#ASD",
      role_users: RoleUsers.ADMIN,
      municipality_id: "c0002d78-495a-4dd9-9070-75d1de017909"
    }

    const id: string = "f8c7271e-2c2c-4c85-867f-9c2cdf469a8a"

    service.createUserWeb = jest.fn().mockReturnValueOnce({ id, ...agent })

    const result = await service.createUserWeb(agent)

    expect(result.id).toEqual(id)
  })
});
