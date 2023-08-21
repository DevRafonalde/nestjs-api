import {Module} from "@nestjs/common";
import {PerfisService} from "./perfis.service";
import {PerfisController} from "./perfis.controller";
import {Perfil} from "./entities/perfil.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Perfil])],
    providers: [PerfisService],
    controllers: [PerfisController],
})
export class PerfisModule {}
