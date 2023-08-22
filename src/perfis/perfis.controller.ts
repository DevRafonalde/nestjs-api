import {Controller, Get, Post, Body, Param, Delete, Put} from "@nestjs/common";
import {PerfisService} from "./perfis.service";
import {Perfil} from "./entities/perfil.entity";

@Controller("perfis")
export class PerfisController {
    constructor(private readonly perfisService: PerfisService) {}

    @Post()
    create(@Body() perfil: Perfil) {
        return this.perfisService.create(perfil);
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
    update(@Param("id") id: number, @Body() perfil: Perfil) {
        return this.perfisService.update(+id, perfil);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.perfisService.remove(+id);
    }
}
