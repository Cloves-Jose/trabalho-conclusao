import { Test, TestingModule } from '@nestjs/testing';
import { MunicipalityService } from './municipality.service';
import { PrismaService } from '../../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

describe('Cenários de teste das funções de municípios', () => {
  let service: MunicipalityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MunicipalityService, PrismaService],
    }).compile();

    service = module.get<MunicipalityService>(MunicipalityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Cadastrando um município com dados incorretos', async () => {
    const municipality = {
      municipality_name: "",
      cnpj: "",
      state_name: ""
    }

    const errorResponse = {
      message: [
        "municipality_name should not be empty",
        "cnpj should not be empty",
        "state_name not be empty"
      ],
      error: "Bad Request",
      statusCode: 400
    }

    service.createMunicipality = jest.fn().mockImplementationOnce(() => { throw new BadRequestException(errorResponse) })

    try {
      // Tenta criar a ameaça com dados inválidos
      await service.createMunicipality(municipality)
    } catch (error) {
      // Verifica se a exceção lançada é a que esperamos
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.response).toEqual(errorResponse)
    }
  })

  it('Cadastrando um município no banco de dados', async () => {
    const municipality = {
      municipality_name: "Garanhuns",
      cnpj: "10565000000192",
      state_name: "Pernambuco"
    }

    const id: string = "c0002d78-495a-4dd9-9070-75d1de017909"

    service.createMunicipality = jest.fn().mockReturnValueOnce({ id, ...municipality })

    const result = await service.createMunicipality(municipality)

    expect(result.id).toEqual(id);

  })
  
});
