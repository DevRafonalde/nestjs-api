/* eslint-disable indent */
import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn({name: "ID"})
    id: number;

    @Column({name: "NomeCompleto"})
    nomeCompleto: string;

    @Column({name: "NomeAmigavel"})
    NomeAmigavel: string;

    @Column({name: "NomeUser"})
    nomeUser: string;

    @Column({name: "SenhaUser"})
    senhaUser: string;

    @Column({name: "ID_WebRI"})
    idWebRi: number;

    @Column({name: "ID_WebTD"})
    idWebTd: number;

    @Column({name: "ID_WebRI_Caixa"})
    idWebRiCaixa: number;

    @Column({name: "ID_WebTD_Caixa"})
    idWebTdCaixa: number;

    @Column({name: "Ativo", default: true})
    ativo: boolean;

    @Column({name: "CaixaVirtual", default: false})
    caixaVirtual: boolean;

    @Column({name: "Observacao"})
    observacao: string;
}
