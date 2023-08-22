/* eslint-disable indent */
import {Sistema} from "src/sistemas/entities/sistema.entity";
import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    PrimaryColumn,
    OneToMany,
} from "typeorm";
import {PerfilPermissao} from "src/perfil-permissao/entities/perfil-permissao.entity";
import {UsuarioPermissao} from "src/usuario-permissao/entities/usuario-permissao.entity";

@Entity({name: "tbl_Permissao"})
export class Permissao {
    @PrimaryColumn({name: "ID"})
    id: number;

    @ManyToOne(() => Sistema, (sistemas) => sistemas.perfis)
    @JoinColumn({name: "ID_Sistema"})
    @Column({name: "ID_Sistema"})
    sistema: Sistema;

    @Column({name: "Nome"})
    nome: string;

    @Column({name: "Descricao"})
    descricao: string;

    @Column({name: "GerarLog", default: false})
    gerarLog: boolean;

    @Column({name: "ID_Permissao_Superior"})
    idPermissaoSuperior: number;

    @Column({name: "Desabilitado", default: false})
    desabilitado: boolean;

    @Column({name: "Mnemonico"})
    mnemonico: string;

    @OneToMany(
        () => PerfilPermissao,
        (perfilPermissao) => perfilPermissao.permissao
    )
    perfisPermissao: PerfilPermissao[];

    @OneToMany(
        () => UsuarioPermissao,
        (usuarioPermissao) => usuarioPermissao.permissao
    )
    usuarioPermissoes: UsuarioPermissao[];
}
