import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FrascosRecolectadosEntity } from "./frascosRecolectados.entity";
import { EntradasSalidasFriam012Entity } from "./entradasSalidasFriam012.entity";
import { ExtraccionFriam016Entity } from "./extraccionFriam016.entity";

@Entity({ name: "congelador" })
export class CongeladorEntity {
    @PrimaryGeneratedColumn("increment", { name: "id_congelador" })
    id!: number;
    @Column({type:"varchar",nullable:false,name:"descripcion"})
    descripcion!: string;

    @OneToMany(() => FrascosRecolectadosEntity, frascosRecolectados => frascosRecolectados.congelador)
    frascoRecolectado!: FrascosRecolectadosEntity[];
    @OneToMany(() => ExtraccionFriam016Entity, extracciones => extracciones.congelador)
    extracciones!: ExtraccionFriam016Entity[];
}