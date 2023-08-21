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

    async create(usuario: Usuario) {
        const usuarioExistente = await this.usuariosRepository.find({
            where: [{nomeUser: usuario.nomeUser}],
        });

        console.log(usuarioExistente);

        if (usuarioExistente.length > 0) {
            throw new ConflictException("Usuário já existe no banco de dados");
        }

        return this.usuariosRepository.save(usuario);
    }

    findAll() {
        return this.usuariosRepository.find();
    }

    findOne(id: number) {
        return this.usuariosRepository.findOne({
            where: {
                id,
            },
        });
    }

    update(id: number, usuario: Usuario) {
        usuario.id = id;
        // Arrumar o update
        return this.usuariosRepository.save(usuario);
    }

    remove(id: number) {
        return this.usuariosRepository.delete(id);
    }
}
