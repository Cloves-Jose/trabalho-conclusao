import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';

describe('Cenários de teste das funções de categorias', () => {
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
