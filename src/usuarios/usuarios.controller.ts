import {Controller, Get, Post, Body, Put, Param, Delete} from "@nestjs/common";
import {UsuariosService} from "./usuarios.service";
import {Usuario} from "./entities/usuario.entity";

@Controller("usuarios")
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) {}

    @Post()
    create(@Body() usuario: Usuario) {
        return this.usuariosService.create(usuario);
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
    update(@Param("id") id: number, @Body() usuario: Usuario) {
        return this.usuariosService.update(+id, usuario);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.usuariosService.remove(+id);
    }
}
