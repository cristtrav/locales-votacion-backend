import { Test, TestingModule } from '@nestjs/testing';
import { VotantesController } from './votantes.controller';

describe('VotantesController', () => {
  let controller: VotantesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VotantesController],
    }).compile();

    controller = module.get<VotantesController>(VotantesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
