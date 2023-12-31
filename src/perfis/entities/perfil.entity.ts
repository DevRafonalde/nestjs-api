/* eslint-disable indent */
import {Sistema} from "src/sistemas/entities/sistema.entity";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from "typeorm";
import {PerfilPermissao} from "src/perfil-permissao/entities/perfil-permissao.entity";
import {UsuarioPermissao} from "src/usuario-permissao/entities/usuario-permissao.entity";

@Entity({name: "tbl_Perfil"})
export class Perfil {
    @PrimaryGeneratedColumn({name: "ID"})
    id: number;

    @ManyToOne(() => Sistema, (sistemas) => sistemas.perfis)
    @JoinColumn({name: "ID_Sistema"})
    @Column({name: "ID_Sistema"})
    sistema: Sistema;

    @Column({name: "Nome"})
    nome: string;

    @Column({name: "Descricao"})
    descricao: string;

    @Column({name: "Excluido", default: false})
    excluido: boolean;

    @OneToMany(
        () => PerfilPermissao,
        (perfilPermissao) => perfilPermissao.perfil
    )
    perfisPermissao: PerfilPermissao[];

    @OneToMany(
        () => UsuarioPermissao,
        (usuarioPermissao) => usuarioPermissao.perfil
    )
    usuarioPermissoes: UsuarioPermissao[];
}
