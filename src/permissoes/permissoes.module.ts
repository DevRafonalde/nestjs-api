import {Module} from "@nestjs/common";
import {PermissoesService} from "./permissoes.service";
import {PermissoesController} from "./permissoes.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Permissao} from "./entities/permissao.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Permissao])],
    controllers: [PermissoesController],
    providers: [PermissoesService],
})
export class PermissoesModule {}
