import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {UsuariosModule} from "./usuarios/usuarios.module";
import {Usuario} from "./usuarios/entities/usuario.entity";

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
            entities: [Usuario],
            synchronize: false,
            options: {
                encrypt: false,
                trustServerCertificate: true,
            },
        }),
        UsuariosModule,
    ],
    // nest generate controller NOMECONTROLLER
    // Esse comando acima cria automaticamente um controller que pedirmos e já insere ele no funcionamento da aplicação
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
