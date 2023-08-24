import {Perfil} from "src/perfis/entities/perfil.entity";
import {Usuario} from "./usuario.entity";

export default class ModeloCadastroUsuarioPerfil {
    usuario: Usuario;
    perfisUsuario: Perfil[];
}
