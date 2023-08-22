import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {UsuariosModule} from "./usuarios/usuarios.module";
import {Usuario} from "./usuarios/entities/usuario.entity";
import {PerfisModule} from "./perfis/perfis.module";
import {SistemasModule} from "./sistemas/sistemas.module";
import {Sistema} from "./sistemas/entities/sistema.entity";
import {Perfil} from "./perfis/entities/perfil.entity";
import {PermissoesModule} from "./permissoes/permissoes.module";
import {Permissao} from "./permissoes/entities/permissao.entity";
import {PerfilPermissaoModule} from "./perfil-permissao/perfil-permissao.module";
import {PerfilPermissao} from "./perfil-permissao/entities/perfil-permissao.entity";
import {UsuarioPermissaoModule} from "./usuario-permissao/usuario-permissao.module";
import {UsuarioPermissao} from "./usuario-permissao/entities/usuario-permissao.entity";

@Module({
    // nest generate module NOMECONTROLLER
    // Esse comando acima cria automaticamente um módulo que pedirmos e já insere ele no funcionamento da aplicação
    imports: [
        TypeOrmModule.forRoot({
            type: "mssql",
            host: "v-serv06-1risjc",
            port: 1433,
            username: "rafael.albuquerque",
            password: "albuquerque@desenvolvimento?.,",
            database: "Intranet",
            entities: [
                Usuario,
                Sistema,
                Perfil,
                Permissao,
                PerfilPermissao,
                UsuarioPermissao,
            ],
            synchronize: false,
            options: {
                encrypt: false,
                trustServerCertificate: true,
            },
        }),
        UsuariosModule,
        PerfisModule,
        SistemasModule,
        PermissoesModule,
        PerfilPermissaoModule,
        UsuarioPermissaoModule,
    ],
    // nest generate controller NOMECONTROLLER
    // Esse comando acima cria automaticamente um controller que pedirmos e já insere ele no funcionamento da aplicação
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
