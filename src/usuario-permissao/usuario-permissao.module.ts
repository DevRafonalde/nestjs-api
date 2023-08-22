import {Module} from "@nestjs/common";
import {UsuarioPermissaoService} from "./usuario-permissao.service";
import {UsuarioPermissaoController} from "./usuario-permissao.controller";
import {UsuarioPermissao} from "./entities/usuario-permissao.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([UsuarioPermissao])],
    controllers: [UsuarioPermissaoController],
    providers: [UsuarioPermissaoService],
})
export class UsuarioPermissaoModule {}
