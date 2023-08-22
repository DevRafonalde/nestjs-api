import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioPermissaoService } from './usuario-permissao.service';

describe('UsuarioPermissaoService', () => {
  let service: UsuarioPermissaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuarioPermissaoService],
    }).compile();

    service = module.get<UsuarioPermissaoService>(UsuarioPermissaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
