import {
    ConflictException,
    BadRequestException,
    Injectable,
} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";
import {Usuario} from "./entities/usuario.entity";
import {UsuarioPermissao} from "src/usuario-permissao/entities/usuario-permissao.entity";
import {Perfil} from "src/perfis/entities/perfil.entity";
import ModeloCadastroUsuarioPerfil from "./entities/usuario-perfil";

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
        const usuarioExistente = await this.usuariosRepository.findOne({
            where: [{nomeUser: modelo.usuario.nomeUser}],
        });

        if (usuarioExistente) {
            throw new ConflictException("Usuário já existe no banco de dados");
        }

        const usuarioNovo = modelo.usuario;
        await this.usuariosRepository.save(usuarioNovo);

        // Vou forçar o front a enviar apenas o ID de cada perfil, portanto essa busca aqui é necessária
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

    async findAll() {
        const usuarios = await this.usuariosRepository.find({
            relations: {
                usuarioPermissoes: true,
            },
        });

        const resultados = [];

        for (let i = 0; i < usuarios.length; i++) {
            const modelo = new ModeloCadastroUsuarioPerfil();
            modelo.usuario = usuarios[i];
            modelo.perfisUsuario = [];
            const usuarioPermissao = await this.usuarioPermissaoRepository.find(
                {
                    relations: {
                        usuario: true,
                        perfil: true,
                    },
                    where: {
                        usuario: {
                            id: usuarios[i].id,
                        },
                    },
                }
            );

            for (let j = 0; j < usuarioPermissao.length; j++) {
                // Vou forçar o front a enviar apenas o ID de cada perfil, portanto essa busca aqui é necessária
                const perfil = await this.perfilRepository.findOne({
                    where: {
                        id: usuarioPermissao[j].perfil.id,
                    },
                });
                modelo.perfisUsuario.push(perfil);
            }

            const {
                id,
                nomeCompleto,
                nomeAmigavel,
                nomeUser,
                senhaUser,
                observacao,
            } = modelo.usuario;
            const perfisUsuario = modelo.perfisUsuario;

            const usuario = {
                id,
                nomeCompleto,
                nomeAmigavel,
                nomeUser,
                senhaUser,
                observacao,
                perfisUsuario,
            };

            resultados.push({usuario});
        }

        return resultados;
    }

    async findOne(idUsuario: number) {
        const modelo = new ModeloCadastroUsuarioPerfil();
        const usuarioBanco = await this.usuariosRepository.findOne({
            relations: {
                usuarioPermissoes: true,
            },
            where: {
                id: idUsuario,
            },
        });

        if (!usuarioBanco) {
            throw new BadRequestException(
                "Usuário não encontrado no banco de dados"
            );
        }

        modelo.usuario = usuarioBanco;
        modelo.perfisUsuario = [];

        const usuarioPermissao = await this.usuarioPermissaoRepository.find({
            relations: {
                usuario: true,
                perfil: true,
            },
            where: {
                usuario: {
                    id: usuarioBanco.id,
                },
            },
        });

        for (let i = 0; i < usuarioPermissao.length; i++) {
            const perfil = await this.perfilRepository.findOne({
                where: {
                    id: usuarioPermissao[i].perfil.id,
                },
            });
            modelo.perfisUsuario.push(perfil);
        }

        const {
            id,
            nomeCompleto,
            nomeAmigavel,
            nomeUser,
            senhaUser,
            observacao,
        } = modelo.usuario;
        const perfisUsuario = modelo.perfisUsuario;

        const usuarioRetorno = {
            id,
            nomeCompleto,
            nomeAmigavel,
            nomeUser,
            senhaUser,
            observacao,
            perfisUsuario,
        };

        return usuarioRetorno;
    }

    async update(id: number, modelo: ModeloCadastroUsuarioPerfil) {
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

        modelo.usuario.id = id;
        const usuarioNovo = modelo.usuario;

        const usuarioExistente = await this.usuariosRepository.findOne({
            where: [{nomeUser: modelo.usuario.nomeUser}],
        });

        if (
            usuarioExistente &&
            usuarioExistente.nomeUser !== usuarioBanco.nomeUser
        ) {
            throw new ConflictException(
                "Esse nome de usuário já está sendo utilizado!"
            );
        }

        for (let i = 0; i < usuarioBanco.usuarioPermissoes.length; i++) {
            this.usuarioPermissaoRepository.delete(
                usuarioBanco.usuarioPermissoes[i].id
            );
        }

        await this.usuariosRepository.save(usuarioNovo);

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
