import {Injectable, BadRequestException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Permissao} from "./entities/permissao.entity";
import {DataSource, Repository} from "typeorm";
import {PerfilPermissao} from "src/perfil-permissao/entities/perfil-permissao.entity";
import {UsuarioPermissao} from "src/usuario-permissao/entities/usuario-permissao.entity";

@Injectable()
export class PermissoesService {
    constructor(
        @InjectRepository(Permissao)
        private permissaoRepository: Repository<Permissao>,
        @InjectRepository(UsuarioPermissao)
        private usuarioPermissaoRepository: Repository<UsuarioPermissao>,
        @InjectRepository(PerfilPermissao)
        private perfilPermissaoRepository: Repository<PerfilPermissao>,
        private dataSource: DataSource
    ) {}
    async create(permissao: Permissao) {
        const permissoes = await this.permissaoRepository.find();
        const ultimoId = permissoes[permissoes.length - 1];

        if (ultimoId) {
            permissao.id = ultimoId.id + 1;
        } else {
            permissao.id = 1;
        }

        const novaPermissao = this.permissaoRepository.save(permissao);
        return novaPermissao;
    }

    async findAll() {
        const permissoes = await this.permissaoRepository.find({
            relations: {
                sistema: true,
            },
        });

        return permissoes;
    }

    async findOne(id: number) {
        const permissao = await this.permissaoRepository.findOne({
            relations: {
                sistema: true,
            },
            where: {
                id,
            },
        });
        return permissao;
    }

    async update(id: number, permissao: Permissao) {
        permissao.id = id;
        const permissaoAtualizada =
            await this.permissaoRepository.save(permissao);
        return permissaoAtualizada;
    }

    async remove(id: number) {
        const permissaoBanco = await this.permissaoRepository.findOne({
            relations: {
                perfisPermissao: true,
                usuarioPermissoes: true,
            },
            where: {
                id,
            },
        });

        if (!permissaoBanco) {
            throw new BadRequestException(
                "Permissão não encontrada no banco de dados"
            );
        }

        for (let i = 0; i < permissaoBanco.perfisPermissao.length; i++) {
            this.perfilPermissaoRepository.delete(
                permissaoBanco.perfisPermissao[i].id
            );
        }

        for (let i = 0; i < permissaoBanco.usuarioPermissoes.length; i++) {
            this.usuarioPermissaoRepository.delete(
                permissaoBanco.usuarioPermissoes[i].id
            );
        }

        return this.permissaoRepository.delete(id);
    }
}
