import {Controller, Get, Post, Body, Param, Delete, Put} from "@nestjs/common";
import {PerfisService} from "./perfis.service";
import ModeloCadastroPerfilPermissao from "./entities/perfil-permissao";

@Controller("perfis")
export class PerfisController {
    constructor(private readonly perfisService: PerfisService) {}

    @Post()
    create(@Body() modelo: ModeloCadastroPerfilPermissao) {
        return this.perfisService.create(modelo);
    }

    @Get()
    findAll() {
        return this.perfisService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.perfisService.findOne(+id);
    }

    @Put(":id")
    update(
        @Param("id") id: number,
        @Body() modelo: ModeloCadastroPerfilPermissao
    ) {
        return this.perfisService.update(+id, modelo);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.perfisService.remove(+id);
    }
}
