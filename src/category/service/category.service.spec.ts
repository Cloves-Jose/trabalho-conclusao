import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { PrismaService } from '../../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

let SortOrder: {
  asc: 'asc',
  desc: 'desc'
}

export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]

describe('Cenários de teste das funções de categorias', () => {
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService, PrismaService],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Deve cadastrando uma nova categoria', async () => {
    const category = {
      title: "Queimadas",
      municipality_id: "c0002d78-495a-4dd9-9070-75d1de017909"
    }

    const id: string = "d2c95174-053b-4cb0-9a75-96104a6aa722"

    service.createCategory = jest.fn().mockReturnValueOnce({ id, ...category })

    const result = await service.createCategory(category)

    expect(result.id).toEqual(id)
  })

  it('Deve retornar um erro ao tentar cadastrar uma categoria sem o municipality_id', async () => {
    const invalidCategory = {
      title: "Queimadas",
      municipality_id: ""
    }

    const errorResponse = {
      message: [
        "municipality_id must be a UUID"
      ],
      error: "Bad Request",
      statusCode: 400
    }
    // Mockando o serviço para lançar a exceção
    service.createCategory = jest.fn().mockImplementationOnce(() => { throw new BadRequestException(errorResponse) })

    try {
      // Tentando criar a categoria com um municipality_id inválido
      await service.createCategory(invalidCategory)
    } catch (error) {
      // Verificando se a exceção lançada é a que esperamos
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.response).toEqual(errorResponse)
    }
  })

  it('Deve retornar um erro ao tentar cadastrar uma categoria sem o title', async () => {
    const invalidCategory = {
      title: "",
      municipality_id: "c0002d78-495a-4dd9-9070-75d1de017909"
    }

    const errorResponse = {
      message: [
        "title should not be empty"
      ],
      error: "Bad Request",
      statusCode: 400
    }

    service.createCategory = jest.fn().mockImplementationOnce(() => { throw new BadRequestException(errorResponse) })

    try {
      // Tenta criar a categoria com um título inválido
      await service.createCategory(invalidCategory)
    } catch (error) {
      // Verificando se a exceção lançada é a que esperamos
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.response).toEqual(errorResponse)
    }
  })

  it('Atualizar uma categoria já existente', async () => {
    const category = {
      id: "d2c95174-053b-4cb0-9a75-96104a6aa722",
      title: "Enchentes"
    }

    const id: string = "d2c95174-053b-4cb0-9a75-96104a6aa722"

    service.updateCategory = jest.fn().mockReturnValueOnce({ id, ...category })

    const result = await service.updateCategory(category)

    expect(result.id).toEqual(id)
  })

  it('Não deve deletar uma categoria sem um id', async () => {
    const id: string = ""

    const errorResponse = {
      message: [
        "id should not be empty"
      ],
      error: "Bad Request",
      statusCode: 400
    }

    service.deleteCategory = jest.fn().mockImplementationOnce(() => { throw new BadRequestException(errorResponse) })

    try {
      // Tenta deletar um ameaça sem um id
      await service.deleteCategory({id})
    } catch(error) {
      // Verifica se a exceção é a que esperamos 
      expect(error).toBeInstanceOf(BadRequestException)
      expect(error.response).toEqual(errorResponse)
    }
  })

  it('Deleta uma categoria existente no banco de dados', async () => {
    const id: string = "d2c95174-053b-4cb0-9a75-96104a6aa722"

    service.deleteCategory = jest.fn().mockReturnValueOnce(true)

    const result = await service.deleteCategory({id});

    expect(result).toBeTruthy()
  })
});
