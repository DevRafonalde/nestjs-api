/* eslint-disable indent */
import {Perfil} from "src/perfis/entities/perfil.entity";
import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";

@Entity({name: "tbl_Sistema"})
export class Sistema {
    @PrimaryGeneratedColumn({name: "ID"})
    id: number;

    @Column({name: "Nome"})
    nome: string;

    @Column({name: "Prefixo"})
    prefixo: string;

    @Column({name: "Descricao"})
    descricao: string;

    @Column({name: "VersaoBanco"})
    versaoBanco: string;

    @OneToMany(() => Perfil, (perfil) => perfil.sistema)
    perfis: Perfil[];
}
