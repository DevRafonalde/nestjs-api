import {Module} from "@nestjs/common";
import {PerfisService} from "./perfis.service";
import {PerfisController} from "./perfis.controller";
import {Perfil} from "./entities/perfil.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioPermissao} from "src/usuario-permissao/entities/usuario-permissao.entity";
import {PerfilPermissao} from "src/perfil-permissao/entities/perfil-permissao.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Perfil, UsuarioPermissao, PerfilPermissao]),
    ],
    providers: [PerfisService],
    controllers: [PerfisController],
})
export class PerfisModule {}
