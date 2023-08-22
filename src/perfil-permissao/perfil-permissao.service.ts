import {Injectable} from "@nestjs/common";
import {PerfilPermissao} from "./entities/perfil-permissao.entity";
import {DataSource, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class PerfilPermissaoService {
    constructor(
        @InjectRepository(PerfilPermissao)
        private perfilPermissaoRepository: Repository<PerfilPermissao>,
        private dataSource: DataSource
    ) {}

    async create(perfil: PerfilPermissao) {
        const novoPerfil = await this.perfilPermissaoRepository.save(perfil);
        return novoPerfil;
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
