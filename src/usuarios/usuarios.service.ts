import {ConflictException, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";
import {Usuario} from "./entities/usuario.entity";

@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(Usuario)
        private usuariosRepository: Repository<Usuario>,
        private dataSource: DataSource
    ) {}

    create(usuario: Usuario) {
        const usuarioExistente = this.usuariosRepository.find({
            where: [{nomeUser: usuario.nomeUser}],
        });

        if (usuarioExistente) {
            throw new ConflictException("Usuário já existe no banco de dados");
        }

        return this.usuariosRepository.save(usuario);
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

    update(usuario: Usuario) {
        return this.usuariosRepository.save(usuario);
    }

    async remove(id: number): Promise<void> {
        await this.usuariosRepository.delete(id);
    }
}
