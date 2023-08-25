import {Test, TestingModule} from "@nestjs/testing";
import {UsuarioPermissaoController} from "./usuario-permissao.controller";
import {UsuarioPermissaoService} from "./usuario-permissao.service";

describe("UsuarioPermissaoController", () => {
    let controller: UsuarioPermissaoController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsuarioPermissaoController],
            providers: [UsuarioPermissaoService],
        }).compile();

        controller = module.get<UsuarioPermissaoController>(
            UsuarioPermissaoController
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
