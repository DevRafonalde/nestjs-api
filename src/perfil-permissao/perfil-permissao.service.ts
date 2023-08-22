import {Injectable} from "@nestjs/common";
import {PerfilPermissao} from "./entities/perfil-permissao.entity";
import {DataSource, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Permissao} from "src/permissoes/entities/permissao.entity";

@Injectable()
export class PerfilPermissaoService {
    constructor(
        @InjectRepository(PerfilPermissao)
        private perfilPermissaoRepository: Repository<PerfilPermissao>,
        @InjectRepository(Permissao)
        private permissaoRepository: Repository<Permissao>,
        private dataSource: DataSource
    ) {}

    async create(perfilPermissao: PerfilPermissao) {
        const permissao = perfilPermissao.permissao;
        const permissoes = await this.permissaoRepository.find();

        if (permissao.id === undefined) {
            const ultimoId = permissoes[permissoes.length - 1];

            if (ultimoId) {
                permissao.id = ultimoId.id + 1;
            } else {
                permissao.id = 1;
            }
        }
        const novoPerfilPermissao =
            await this.perfilPermissaoRepository.save(perfilPermissao);
        return novoPerfilPermissao;
    }

    async findAll() {
        const perfis = await this.perfilPermissaoRepository.find({
            relations: {
                perfil: true,
                permissao: true,
            },
        });

        return perfis;
    }

    async findOne(id: number) {
        const perfil = await this.perfilPermissaoRepository.findOne({
            relations: {
                perfil: true,
                permissao: true,
            },
            where: {
                id,
            },
        });
        return perfil;
    }

    async update(id: number, perfil: PerfilPermissao) {
        perfil.id = id;
        const novoPerfil = await this.perfilPermissaoRepository.save(perfil);
        return novoPerfil;
    }

    async remove(id: number) {
        return this.perfilPermissaoRepository.delete(id);
    }
}
