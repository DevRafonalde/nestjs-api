import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuariosService} from "./usuarios.service";
import {UsuariosController} from "./usuarios.controller";
import {Usuario} from "./entities/usuario.entity";
import {UsuarioPermissao} from "src/usuario-permissao/entities/usuario-permissao.entity";
import {Perfil} from "src/perfis/entities/perfil.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Usuario, UsuarioPermissao, Perfil])],
    providers: [UsuariosService],
    controllers: [UsuariosController],
})
export class UsuariosModule {}
