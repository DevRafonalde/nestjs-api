import {Module} from "@nestjs/common";
import {PerfilPermissaoService} from "./perfil-permissao.service";
import {PerfilPermissaoController} from "./perfil-permissao.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PerfilPermissao} from "./entities/perfil-permissao.entity";

@Module({
    imports: [TypeOrmModule.forFeature([PerfilPermissao])],
    controllers: [PerfilPermissaoController],
    providers: [PerfilPermissaoService],
})
export class PerfilPermissaoModule {}
