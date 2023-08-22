import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuariosService} from "./usuarios.service";
import {UsuariosController} from "./usuarios.controller";
import {Usuario} from "./entities/usuario.entity";
import {UsuarioPermissao} from "src/usuario-permissao/entities/usuario-permissao.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Usuario, UsuarioPermissao])],
    providers: [UsuariosService],
    controllers: [UsuariosController],
})
export class UsuariosModule {}
