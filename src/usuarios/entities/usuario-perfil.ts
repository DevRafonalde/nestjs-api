import {Perfil} from "src/perfis/entities/perfil.entity";
import {Usuario} from "./usuario.entity";

export type ModeloCadastroUsuarioPerfil = {
    usuario: Usuario;
    perfisUsuario: Perfil[];
};
