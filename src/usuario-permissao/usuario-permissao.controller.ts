import {Controller, Get, Post, Body, Param, Delete, Put} from "@nestjs/common";
import {UsuarioPermissaoService} from "./usuario-permissao.service";
import {UsuarioPermissao} from "./entities/usuario-permissao.entity";

@Controller("usuario-permissao")
export class UsuarioPermissaoController {
    constructor(
        private readonly usuarioPermissaoService: UsuarioPermissaoService
    ) {}

    @Post()
    create(@Body() usuarioPermissao: UsuarioPermissao) {
        return this.usuarioPermissaoService.create(usuarioPermissao);
    }

    @Get()
    findAll() {
        return this.usuarioPermissaoService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.usuarioPermissaoService.findOne(+id);
    }

    @Put(":id")
    update(
        @Param("id") id: number,
        @Body() usuarioPermissao: UsuarioPermissao
    ) {
        return this.usuarioPermissaoService.update(+id, usuarioPermissao);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.usuarioPermissaoService.remove(+id);
    }
}
