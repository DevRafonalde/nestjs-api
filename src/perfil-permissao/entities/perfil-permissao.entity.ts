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

@Entity({name: "tbl_PerfilPermissao"})
export class PerfilPermissao {
    @PrimaryGeneratedColumn({name: "ID"})
    id: number;

    @ManyToOne(() => Perfil, (perfis) => perfis.perfisPermissao, {
        cascade: ["update", "insert"],
    })
    @JoinColumn({name: "ID_Perfil"})
    perfil: Perfil;

    @ManyToOne(() => Permissao, (permissoes) => permissoes.perfisPermissao, {
        cascade: ["update", "insert"],
    })
    @JoinColumn({name: "ID_Permissao"})
    permissao: Permissao;

    @Type(() => Date)
    @IsDate()
    @Column({name: "DataHora"})
    dataHora: Date;

    @Column({name: "Excluido", default: false})
    excluido: boolean;
}
