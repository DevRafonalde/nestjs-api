import {Perfil} from "src/perfis/entities/perfil.entity";
import {Permissao} from "src/permissoes/entities/permissao.entity";

export default class ModeloCadastroPerfilPermissao {
    perfil: Perfil;
    permissoesPerfil: Permissao[];
}
