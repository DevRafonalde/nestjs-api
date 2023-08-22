import {Controller, Get, Post, Body, Param, Delete, Put} from "@nestjs/common";
import {PerfilPermissaoService} from "./perfil-permissao.service";
import {PerfilPermissao} from "./entities/perfil-permissao.entity";

@Controller("perfil-permissao")
export class PerfilPermissaoController {
    constructor(
        private readonly perfilPermissaoService: PerfilPermissaoService
    ) {}

    @Post()
    create(@Body() perfilPermissao: PerfilPermissao) {
        return this.perfilPermissaoService.create(perfilPermissao);
    }

    @Get()
    findAll() {
        return this.perfilPermissaoService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.perfilPermissaoService.findOne(+id);
    }

    @Put(":id")
    update(@Param("id") id: number, @Body() perfilPermissao: PerfilPermissao) {
        return this.perfilPermissaoService.update(+id, perfilPermissao);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.perfilPermissaoService.remove(+id);
    }
}
