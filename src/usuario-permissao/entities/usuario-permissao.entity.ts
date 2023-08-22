/* eslint-disable indent */
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import {Perfil} from "src/perfis/entities/perfil.entity";
import {Permissao} from "src/permissoes/entities/permissao.entity";
import {Type} from "class-transformer";
import {IsDate} from "class-validator";
import {Usuario} from "src/usuarios/entities/usuario.entity";

@Entity({name: "tbl_UsuarioPermissao"})
export class UsuarioPermissao {
    @PrimaryGeneratedColumn({name: "ID"})
    id: number;

    @ManyToOne(() => Usuario, (usuarios) => usuarios.usuarioPermissoes, {
        cascade: ["update", "insert"],
    })
    @JoinColumn({name: "ID_Usuario"})
    usuario: Usuario;

    @ManyToOne(() => Perfil, (perfis) => perfis.usuarioPermissoes, {
        cascade: ["update", "insert"],
    })
    @JoinColumn({name: "ID_Perfil"})
    perfil: Perfil;

    @ManyToOne(() => Permissao, (permissoes) => permissoes.usuarioPermissoes, {
        cascade: ["update", "insert"],
    })
    @JoinColumn({name: "ID_Permissao"})
    permissao: Permissao;

    @Column({name: "Negacao", default: false})
    negacao: boolean;

    @Type(() => Date)
    @IsDate()
    @Column({name: "DataHora"})
    dataHora: Date;

    @Column({name: "Excluido", default: false})
    excluido: boolean;
}
