import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from "@nestjs/common";
import {UsuariosService} from "./usuarios.service";
import {Usuario} from "./entities/usuario.entity";

@Controller("usuarios")
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) {}

    @Post()
    create(@Body() usuario: Usuario) {
        console.log(usuario);

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

    @Patch(":id")
    update(@Body() usuario: Usuario) {
        return this.usuariosService.update(usuario);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.usuariosService.remove(+id);
    }
}
