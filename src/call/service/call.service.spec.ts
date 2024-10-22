import { Test, TestingModule } from '@nestjs/testing';
import { CallService } from './call.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('CallService', () => {
  let service: CallService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CallService, PrismaService],
    }).compile();

    service = module.get<CallService>(CallService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
