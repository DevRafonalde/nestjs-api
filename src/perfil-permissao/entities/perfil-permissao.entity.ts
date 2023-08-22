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

@Entity({name: "tbl_PerfilPermissao"})
export class PerfilPermissao {
    @PrimaryGeneratedColumn({name: "ID"})
    id: number;

    @ManyToOne(() => Perfil, (perfis) => perfis.perfisPermissao, {
        cascade: ["update"],
    })
    @JoinColumn({name: "ID_Perfil"})
    // @Column({name: "ID_Perfil"})
    perfil: Perfil;

    @ManyToOne(() => Permissao, (permissoes) => permissoes.perfisPermissao, {
        cascade: ["update"],
    })
    @JoinColumn({name: "ID_Permissao"})
    // @Column({name: "ID_Permissao"})
    permissao: Permissao;

    @Column({name: "DataHora"})
    nome: Date;

    @Column({name: "Excluido", default: false})
    excluido: boolean;
}
