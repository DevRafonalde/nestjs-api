import {Injectable} from "@nestjs/common";

@Injectable()
export class AppService {
    getHello(): string {
        return "Bem vindo à API da aplicação do SI-Admin para controle de permissões dos sistemas e aplicações do cartório.";
    }
}
