import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FrascosRecolectadosEntity } from "./frascosRecolectados.entity";

@Entity({ name: "congelador" })
export class CongeladorEntity {
    @PrimaryGeneratedColumn("increment", { name: "id_congelador" })
    id!: number;
    @Column({type:"varchar",nullable:false,name:"descripcion"})
    descripcion!: string;

    @OneToMany(() => FrascosRecolectadosEntity, frascosRecolectados => frascosRecolectados.congelador)
    frascoRecolectado!: FrascosRecolectadosEntity[];
}