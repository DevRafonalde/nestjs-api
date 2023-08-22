import {
    ConflictException,
    BadRequestException,
    Injectable,
} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";
import {Usuario} from "./entities/usuario.entity";
import {UsuarioPermissao} from "src/usuario-permissao/entities/usuario-permissao.entity";

@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(Usuario)
        private usuariosRepository: Repository<Usuario>,
        @InjectRepository(UsuarioPermissao)
        private usuarioPermissaoRepository: Repository<UsuarioPermissao>,
        private dataSource: DataSource
    ) {}

    async create(usuario: Usuario) {
        const usuarioExistente = await this.usuariosRepository.find({
            where: [{nomeUser: usuario.nomeUser}],
        });

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
            relations: {
                usuarioPermissoes: true,
            },
            where: {
                id,
            },
        });

        if (!usuarioBanco) {
            throw new BadRequestException(
                "Usuário não encontrado no banco de dados"
            );
        }

        for (let i = 0; i < usuarioBanco.usuarioPermissoes.length; i++) {
            this.usuarioPermissaoRepository.delete(
                usuarioBanco.usuarioPermissoes[i].id
            );
        }

        return this.usuariosRepository.delete(id);
    }
}
