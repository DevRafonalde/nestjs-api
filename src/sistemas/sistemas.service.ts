import {Injectable} from "@nestjs/common";
import {Sistema} from "./entities/sistema.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";

@Injectable()
export class SistemasService {
    constructor(
        @InjectRepository(Sistema)
        private sistemasRepository: Repository<Sistema>,
        private dataSource: DataSource
    ) {}
    findAll() {
        return this.sistemasRepository.find();
    }

    findOne(id: number) {
        return this.sistemasRepository.findOne({
            where: {
                id,
            },
        });
    }
}
