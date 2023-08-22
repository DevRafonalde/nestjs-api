import {Injectable, BadRequestException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Permissao} from "./entities/permissao.entity";
import {DataSource, Repository} from "typeorm";

@Injectable()
export class PermissoesService {
    constructor(
        @InjectRepository(Permissao)
        private permissaoRepository: Repository<Permissao>,
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
            where: {
                id,
            },
        });

        if (!permissaoBanco) {
            throw new BadRequestException(
                "Permissão não encontrada no banco de dados"
            );
        }

        return this.permissaoRepository.delete(id);
    }
}
