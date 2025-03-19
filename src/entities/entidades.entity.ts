import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MadresPotencialesEntity } from "./madresPotenciales.entity";

@Entity({name:"entidades"})
export class EntidadesEntity {
    @PrimaryGeneratedColumn("increment",{name:"id_entidad"})
    id!:number
    @Column({type:"varchar"})
    nombre!:string

    @OneToMany(() => MadresPotencialesEntity, madrePotencial => madrePotencial.entidad)
    madrePotencial!:MadresPotencialesEntity[]
}