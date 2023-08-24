import {
    ConflictException,
    BadRequestException,
    Injectable,
} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";
import {Usuario} from "./entities/usuario.entity";
import {UsuarioPermissao} from "src/usuario-permissao/entities/usuario-permissao.entity";
import {ModeloCadastroUsuarioPerfil} from "./entities/usuario-perfil";
import {Perfil} from "src/perfis/entities/perfil.entity";

@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(Usuario)
        private usuariosRepository: Repository<Usuario>,
        @InjectRepository(UsuarioPermissao)
        private usuarioPermissaoRepository: Repository<UsuarioPermissao>,
        @InjectRepository(Perfil)
        private perfilRepository: Repository<Perfil>,
        private dataSource: DataSource
    ) {}

    async create(modelo: ModeloCadastroUsuarioPerfil) {
        const usuarioExistente = await this.usuariosRepository.find({
            where: [{nomeUser: modelo.usuario.nomeUser}],
        });

        if (usuarioExistente.length > 0) {
            throw new ConflictException("Usuário já existe no banco de dados");
        }

        const usuarioNovo = modelo.usuario;
        this.usuariosRepository.save(usuarioNovo);

        // Vou forçar o front a enviar apenas o ID de cada perfil, portanto essa busca aqui é válida
        const perfisId = modelo.perfisUsuario.map((perfil) => perfil.id);

        for (let i = 0; i < perfisId.length; i++) {
            const perfil = await this.perfilRepository.findOne({
                where: {id: perfisId[i]},
            });
            const usuarioPermissao = new UsuarioPermissao();
            usuarioPermissao.usuario = usuarioNovo;
            usuarioPermissao.dataHora = new Date();
            usuarioPermissao.perfil = perfil;
            this.usuarioPermissaoRepository.save(usuarioPermissao);
        }

        return modelo;
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

    async update(id: number, modelo: ModeloCadastroUsuarioPerfil) {
        modelo.usuario.id = id;
        const novoUsuario = await this.usuariosRepository.save(modelo.usuario);
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
