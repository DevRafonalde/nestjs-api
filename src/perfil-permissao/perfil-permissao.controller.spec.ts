import { Test, TestingModule } from '@nestjs/testing';
import { PerfilPermissaoController } from './perfil-permissao.controller';
import { PerfilPermissaoService } from './perfil-permissao.service';

describe('PerfilPermissaoController', () => {
  let controller: PerfilPermissaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerfilPermissaoController],
      providers: [PerfilPermissaoService],
    }).compile();

    controller = module.get<PerfilPermissaoController>(PerfilPermissaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
