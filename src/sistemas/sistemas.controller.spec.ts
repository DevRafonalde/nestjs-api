import { Test, TestingModule } from '@nestjs/testing';
import { SistemasController } from './sistemas.controller';
import { SistemasService } from './sistemas.service';

describe('SistemasController', () => {
  let controller: SistemasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SistemasController],
      providers: [SistemasService],
    }).compile();

    controller = module.get<SistemasController>(SistemasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
