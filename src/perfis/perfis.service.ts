import {Injectable} from "@nestjs/common";
import {Perfil} from "./entities/perfil.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";

@Injectable()
export class PerfisService {
    constructor(
        @InjectRepository(Perfil)
        private perfisRepository: Repository<Perfil>,
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
            },
        });

        return perfis;
    }

    async findOne(id: number) {
        const perfil = await this.perfisRepository.findOne({
            relations: {
                sistema: true,
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

    remove(id: number) {
        return this.perfisRepository.delete(id);
    }
}
