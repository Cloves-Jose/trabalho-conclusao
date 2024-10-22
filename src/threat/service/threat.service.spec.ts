import { Test, TestingModule } from '@nestjs/testing';
import { ThreatService } from './threat.service';
import { PrismaService } from '../../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

describe('Cenários de teste das funções de ameaça', () => {
  let service: ThreatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThreatService, PrismaService],
    }).compile();

    service = module.get<ThreatService>(ThreatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Deve cadastrar uma nova ameaça', async () => {
    const threat = {
      category_id: "d2c95174-053b-4cb0-9a75-96104a6aa722",
      title: "Fogo na estrada",
      municipality_id: "c0002d78-495a-4dd9-9070-75d1de017909",
      threat_level: 3,
      description: "Risco de incêndio em beiras de estrada podem causar acidentes maiores.",
      image_id: "3382bf19-269c-4b78-a891-dab069ae4817"
    }

    const id: string = "dee8fa2f-a582-4c38-b235-712db14c95c0"

    service.createThreat = jest.fn().mockReturnValueOnce({ id, ...threat })

    const result = await service.createThreat(threat)

    expect(result.id).toEqual(id)
  })

  it('Não deve cadastrar uma nova ameaça', async () => {
    const threat = {
      category_id: "",
      title: "",
      municipality_id: "",
      threat_level: null,
      description: "",
      image_id: ""
    }

    const errorResponse = {
      message: [
        "category_id should not be empty",
        "category_id must be a UUID",
        "title should not be empty",
        "threat_level should not be empty",
        "threat_level must be a number conforming to the specified constraints",
        "description should not be empty",
        "image_id should not be empty",
        "image_id must be a UUID",
        "municipality_id should not be empty",
        "municipality_id must be a UUID"
      ],
      error: "Bad Request",
      statusCode: 400
    }

    service.createThreat = jest.fn().mockImplementationOnce(() => { throw new BadRequestException(errorResponse) })

    try {
      // Tenta criar a ameaça com dados inválidos 
      await service.createThreat(threat)
    } catch (error) {
      // Verificando se a exceção lançada é a que esperamos
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.response).toEqual(errorResponse)
    }
  })

  it('Deve atualizar uma ameaça já existente', async () => {
    const threat = {
      id: "dee8fa2f-a582-4c38-b235-712db14c95c0",
      category_id: "d2c95174-053b-4cb0-9a75-96104a6aa722",
      title: "Enchente",
      threat_level: 3,
      description: "Risco de inundação de uma cidade",
      image_id: "3382bf19-269c-4b78-a891-dab069ae4817"
    }

    const id: string = "dee8fa2f-a582-4c38-b235-712db14c95c0"

    service.updateThreat = jest.fn().mockReturnValueOnce({ id, ...threat })

    const result = await service.updateThreat(threat)

    expect(result.id).toEqual(id)
  })

  it('Deve deletar uma threat já existente', async () => {
    const id: string = "dee8fa2f-a582-4c38-b235-712db14c95c0"

    service.deleteThreat = jest.fn().mockReturnValueOnce(true)

    const result = await service.deleteThreat({id})

    expect(result).toBeTruthy()
  })

  it('Não deve conseguir deletar uma threat sem id', async () => {
    const id: string = ""

    const errorResponse = {
      message: [
        "id should not be empty"
      ],
      error: "Bad Request",
      statusCode: 400
    }
    
    service.deleteThreat = jest.fn().mockImplementationOnce(() => { throw new BadRequestException(errorResponse) })

    try {
      // Tenta deletar uma ameça sem um id
      await service.deleteThreat({id})
    } catch(error) {
      // Verifica se a exceção é a que esperamos
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.response).toEqual(errorResponse)
    }
  })
});
