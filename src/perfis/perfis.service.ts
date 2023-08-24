import {BadRequestException, Injectable} from "@nestjs/common";
import {Perfil} from "./entities/perfil.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";
import {UsuarioPermissao} from "src/usuario-permissao/entities/usuario-permissao.entity";
import {PerfilPermissao} from "src/perfil-permissao/entities/perfil-permissao.entity";
import {Permissao} from "src/permissoes/entities/permissao.entity";

@Injectable()
export class PerfisService {
    constructor(
        @InjectRepository(Perfil)
        private perfisRepository: Repository<Perfil>,
        @InjectRepository(UsuarioPermissao)
        private usuarioPermissaoRepository: Repository<UsuarioPermissao>,
        @InjectRepository(PerfilPermissao)
        private perfilPermissaoRepository: Repository<PerfilPermissao>,
        @InjectRepository(Permissao)
        private permissaoRepository: Repository<Permissao>,
        private dataSource: DataSource
    ) {}

    async create(perfil: Perfil) {
        const novoPerfil = await this.perfisRepository.save(perfil);
        return novoPerfil;
    }

    async findAll() {
        const perfis = await this.perfisRepository.find({
            relations: {
                sistema: true,
                perfisPermissao: true,
            },
        });

        return perfis;
    }

    async findOne(id: number) {
        const perfil = await this.perfisRepository.findOne({
            relations: {
                sistema: true,
                perfisPermissao: true,
            },
            where: {
                id,
            },
        });
        return perfil;
    }

    async update(id: number, perfil: Perfil) {
        perfil.id = id;
        const novoPerfil = await this.perfisRepository.save(perfil);
        return novoPerfil;
    }

    async remove(id: number) {
        const perfilBanco = await this.perfisRepository.findOne({
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

        return this.perfisRepository.delete(id);
    }
}
