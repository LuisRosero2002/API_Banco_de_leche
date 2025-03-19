import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MadresPotencialesEntity } from "./madresPotenciales.entity";

@Entity({name:"info_madres"})
export class InfoMadresEntity {
    @PrimaryGeneratedColumn("increment",{name:"id_info_madre"})
    id!: number;
    @Column({name:"nombre_completo",type:"varchar"})
    nombreCompleto!:string
    @Column({name:"documento",type:"varchar"})
    documento!:string
    @Column({name:"fecha_nacimiento",type:"date"})
    fechaNacimiento!:Date
    @Column({name:"fecha_parto",type:"date"})
    fechaParto!:Date
    @Column({name:"telefono",type:"varchar"})
    telefono!:string
    @Column({name:"departamento",type:"varchar"})
    departamento!:string
    @Column({name:"ciudad",type:"varchar"})
    ciudad!:string
    @Column({name:"barrio",type:"varchar"})
    barrio!:string
    @Column({name:"direccion",type:"varchar"})
    direccion!:string
    @Column({name:"profesion",type:"varchar"})
    profesion!:string
    @Column({name:"eps",type:"varchar"})
    eps!:string

    @OneToOne(() => MadresPotencialesEntity, madrePotencial => madrePotencial.infoMadre)
    madrePotencial!:MadresPotencialesEntity
}