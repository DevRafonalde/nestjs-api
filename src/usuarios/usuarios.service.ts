import {Injectable} from "@nestjs/common";
import {CreateUsuarioDto} from "./dto/create-usuario.dto";
import {UpdateUsuarioDto} from "./dto/update-usuario.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Usuario} from "./entities/usuario.entity";

@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(Usuario)
        private usuariosRepository: Repository<Usuario>
    ) {}

    create(createUsuarioDto: CreateUsuarioDto) {
        return "This action adds a new usuario";
    }

    findAll(): Promise<Usuario[]> {
        return this.usuariosRepository.find();
    }

    findOne(id: number): Promise<Usuario | null> {
        return this.usuariosRepository.findOne({
            where: {
                id,
            },
        });
    }

    update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
        return `This action updates a #${id} usuario`;
    }

    async remove(id: number): Promise<void> {
        await this.usuariosRepository.delete(id);
    }
}
