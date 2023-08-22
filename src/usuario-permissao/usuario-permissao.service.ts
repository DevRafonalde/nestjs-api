import {Injectable} from "@nestjs/common";
import {UsuarioPermissao} from "./entities/usuario-permissao.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";

@Injectable()
export class UsuarioPermissaoService {
    constructor(
        @InjectRepository(UsuarioPermissao)
        private usuarioPermissaoRepository: Repository<UsuarioPermissao>,
        private dataSource: DataSource
    ) {}

    async create(perfilPermissao: UsuarioPermissao) {
        const novoPerfilPermissao =
            await this.usuarioPermissaoRepository.save(perfilPermissao);
        return novoPerfilPermissao;
    }

    async findAll() {
        const perfis = await this.usuarioPermissaoRepository.find({
            relations: {
                usuario: true,
                perfil: true,
                permissao: true,
            },
        });

        return perfis;
    }

    async findOne(id: number) {
        const perfil = await this.usuarioPermissaoRepository.findOne({
            relations: {
                usuario: true,
                perfil: true,
                permissao: true,
            },
            where: {
                id,
            },
        });
        return perfil;
    }

    async update(id: number, perfil: UsuarioPermissao) {
        perfil.id = id;
        const novoPerfil = await this.usuarioPermissaoRepository.save(perfil);
        return novoPerfil;
    }

    async remove(id: number) {
        return this.usuarioPermissaoRepository.delete(id);
    }
}
