import {Controller, Get, Post, Body, Param, Delete, Put} from "@nestjs/common";
import {PermissoesService} from "./permissoes.service";
import {Permissao} from "./entities/permissao.entity";

@Controller("permissoes")
export class PermissoesController {
    constructor(private readonly permissoesService: PermissoesService) {}

    @Post()
    create(@Body() permissao: Permissao) {
        return this.permissoesService.create(permissao);
    }

    @Get()
    findAll() {
        return this.permissoesService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.permissoesService.findOne(+id);
    }

    @Put(":id")
    update(@Param("id") id: number, @Body() permissao: Permissao) {
        return this.permissoesService.update(+id, permissao);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.permissoesService.remove(+id);
    }
}
