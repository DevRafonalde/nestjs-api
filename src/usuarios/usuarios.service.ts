import {
    ConflictException,
    BadRequestException,
    Injectable,
} from "@nestjs/common";
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

    async update(id: number, usuario: Usuario) {
        usuario.id = id;
        const novoUsuario = await this.usuariosRepository.save(usuario);
        return novoUsuario;
    }

    async remove(id: number) {
        const usuarioBanco = await this.usuariosRepository.findOne({
            where: {
                id,
            },
        });

        if (!usuarioBanco) {
            throw new BadRequestException(
                "Usuário não encontrado no banco de dados"
            );
        }

        return this.usuariosRepository.delete(id);
    }
}
