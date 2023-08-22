import {Module} from "@nestjs/common";
import {PermissoesService} from "./permissoes.service";
import {PermissoesController} from "./permissoes.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Permissao} from "./entities/permissao.entity";
import {PerfilPermissao} from "src/perfil-permissao/entities/perfil-permissao.entity";
import {UsuarioPermissao} from "src/usuario-permissao/entities/usuario-permissao.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Permissao,
            PerfilPermissao,
            UsuarioPermissao,
        ]),
    ],
    controllers: [PermissoesController],
    providers: [PermissoesService],
})
export class PermissoesModule {}
