import {BadRequestException, Injectable} from "@nestjs/common";
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

    async remove(id: number) {
        const perfilBanco = await this.perfisRepository.findOne({
            where: {
                id,
            },
        });

        if (!perfilBanco) {
            throw new BadRequestException(
                "Perfil não encontrado no banco de dados"
            );
        }

        return this.perfisRepository.delete(id);
    }
}
