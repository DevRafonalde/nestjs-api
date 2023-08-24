import {Controller, Get, Post, Body, Put, Param, Delete} from "@nestjs/common";
import {UsuariosService} from "./usuarios.service";
import ModeloCadastroUsuarioPerfil from "./entities/usuario-perfil";

@Controller("usuarios")
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) {}

    @Post()
    create(@Body() modelo: ModeloCadastroUsuarioPerfil) {
        return this.usuariosService.create(modelo);
    }

    @Get()
    findAll() {
        return this.usuariosService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.usuariosService.findOne(+id);
    }

    @Put(":id")
    update(
        @Param("id") id: number,
        @Body() modelo: ModeloCadastroUsuarioPerfil
    ) {
        return this.usuariosService.update(+id, modelo);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.usuariosService.remove(+id);
    }
}
