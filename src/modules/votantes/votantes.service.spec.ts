import { Test, TestingModule } from '@nestjs/testing';
import { VotanteService } from './votantes.service';

describe('VotanteService', () => {
  let service: VotanteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VotanteService],
    }).compile();

    service = module.get<VotanteService>(VotanteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
