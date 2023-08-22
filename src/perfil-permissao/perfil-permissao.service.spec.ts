import { Test, TestingModule } from '@nestjs/testing';
import { PerfilPermissaoService } from './perfil-permissao.service';

describe('PerfilPermissaoService', () => {
  let service: PerfilPermissaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PerfilPermissaoService],
    }).compile();

    service = module.get<PerfilPermissaoService>(PerfilPermissaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
