import {BadRequestException, Injectable} from "@nestjs/common";
import {Perfil} from "./entities/perfil.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";
import {UsuarioPermissao} from "src/usuario-permissao/entities/usuario-permissao.entity";
import {PerfilPermissao} from "src/perfil-permissao/entities/perfil-permissao.entity";
import {Permissao} from "src/permissoes/entities/permissao.entity";
import ModeloCadastroPerfilPermissao from "./entities/perfil-permissao";

@Injectable()
export class PerfisService {
    constructor(
        @InjectRepository(Perfil)
        private perfilRepository: Repository<Perfil>,
        @InjectRepository(UsuarioPermissao)
        private usuarioPermissaoRepository: Repository<UsuarioPermissao>,
        @InjectRepository(PerfilPermissao)
        private perfilPermissaoRepository: Repository<PerfilPermissao>,
        @InjectRepository(Permissao)
        private permissaoRepository: Repository<Permissao>,
        private dataSource: DataSource
    ) {}

    async create(modelo: ModeloCadastroPerfilPermissao) {
        const novoPerfil = modelo.perfil;
        await this.perfilRepository.save(novoPerfil);

        // Vou forçar o front a enviar apenas o ID de cada perfil, portanto essa busca aqui é necessária
        const permissoesId = modelo.permissoesPerfil.map(
            (permissao) => permissao.id
        );

        for (let i = 0; i < permissoesId.length; i++) {
            const permissao = await this.permissaoRepository.findOne({
                where: {
                    id: permissoesId[i],
                },
            });
            const perfilPermissao = new PerfilPermissao();
            perfilPermissao.perfil = novoPerfil;
            perfilPermissao.dataHora = new Date();
            perfilPermissao.permissao = permissao;
            this.perfilPermissaoRepository.save(perfilPermissao);
        }

        const {id, sistema, nome, descricao} = modelo.perfil;
        const permissoesPerfil = modelo.permissoesPerfil;

        const perfil = {id, sistema, nome, descricao, permissoesPerfil};

        return {perfil};
    }

    async findAll() {
        const perfis = await this.perfilRepository.find({
            relations: {
                sistema: true,
                perfisPermissao: true,
            },
        });

        const resultados = [];

        for (let i = 0; i < perfis.length; i++) {
            const modelo = new ModeloCadastroPerfilPermissao();
            modelo.perfil = perfis[i];
            modelo.permissoesPerfil = [];
            const perfilPermissao = await this.perfilPermissaoRepository.find({
                relations: {
                    perfil: true,
                    permissao: true,
                },
                where: {
                    perfil: {
                        id: perfis[i].id,
                    },
                },
            });

            for (let j = 0; j < perfilPermissao.length; j++) {
                // Vou forçar o front a enviar apenas o ID de cada perfil, portanto essa busca aqui é necessária
                const permissao = await this.permissaoRepository.findOne({
                    where: {
                        id: perfilPermissao[j].perfil.id,
                    },
                });
                modelo.permissoesPerfil.push(permissao);
            }

            const {id, sistema, nome, descricao} = modelo.perfil;
            const permissoesPerfil = modelo.permissoesPerfil;
            const perfil = {id, sistema, nome, descricao, permissoesPerfil};

            resultados.push({perfil});
        }

        return resultados;
    }

    async findOne(idPerfil: number) {
        const modelo = new ModeloCadastroPerfilPermissao();
        const perfilBanco = await this.perfilRepository.findOne({
            relations: {
                sistema: true,
                perfisPermissao: true,
            },
            where: {
                id: idPerfil,
            },
        });

        if (!perfilBanco) {
            throw new BadRequestException(
                "Usuário não encontrado no banco de dados"
            );
        }

        modelo.perfil = perfilBanco;
        modelo.permissoesPerfil = [];

        const perfilPermissao = await this.perfilPermissaoRepository.find({
            relations: {
                perfil: true,
                permissao: true,
            },
            where: {
                perfil: {
                    id: perfilBanco.id,
                },
            },
        });

        for (let i = 0; i < perfilPermissao.length; i++) {
            const permissao = await this.permissaoRepository.findOne({
                where: {
                    id: perfilPermissao[i].permissao.id,
                },
            });
            modelo.permissoesPerfil.push(permissao);
        }

        const {id, sistema, nome, descricao} = modelo.perfil;
        const permissoesPerfil = modelo.permissoesPerfil;
        const perfil = {id, sistema, nome, descricao, permissoesPerfil};

        return {perfil};
    }

    async update(idPerfil: number, modelo: ModeloCadastroPerfilPermissao) {
        const perfilBanco = await this.perfilRepository.findOne({
            relations: {
                sistema: true,
                perfisPermissao: true,
            },
            where: {
                id: idPerfil,
            },
        });

        if (!perfilBanco) {
            throw new BadRequestException(
                "Usuário não encontrado no banco de dados"
            );
        }

        modelo.perfil.id = idPerfil;
        const perfilNovo = modelo.perfil;
        // perfil.id = id;
        // const novoPerfil = await this.perfilRepository.save(perfil);
        // return novoPerfil;
    }

    async remove(id: number) {
        const perfilBanco = await this.perfilRepository.findOne({
            relations: {
                perfisPermissao: true,
                usuarioPermissoes: true,
            },
            where: {
                id,
            },
        });

        if (!perfilBanco) {
            throw new BadRequestException(
                "Perfil não encontrado no banco de dados"
            );
        }

        for (let i = 0; i < perfilBanco.perfisPermissao.length; i++) {
            this.perfilPermissaoRepository.delete(
                perfilBanco.perfisPermissao[i].id
            );
        }

        for (let i = 0; i < perfilBanco.usuarioPermissoes.length; i++) {
            this.usuarioPermissaoRepository.delete(
                perfilBanco.usuarioPermissoes[i].id
            );
        }

        return this.perfilRepository.delete(id);
    }
}
