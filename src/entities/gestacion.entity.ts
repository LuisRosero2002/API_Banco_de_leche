import { text } from "express";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MadresDonantesEntity } from "./madresDonantes.entity";

@Entity({ name: "gestacion" })
export class GestacionEntity {
    @PrimaryGeneratedColumn("increment", { name: "id_gestacion" })
    id!: number;
    @Column({name:"lugar_control_prenatal",type:"text"})
    lugarControlPrenatal!: string
    @Column({name:"asistio_control_prenatal",type:"int"})
    asistioControlPrenatal!:number;
    @Column({name:"tipo_ips", type:"int"})
    tipoIps!:number;
    @Column({name:"peso_gestacion_inicial", type:"double"})
    pesoGestacionInicial!:number;
    @Column({name:"peso_gestacion_final", type:"double"})
    pesoGestacionFinal!:number;
    @Column({name:"talla",type:"float"})
    talla!:number;
    @Column({name:"parto_a_termino", type:"int"})
    partoTermino!:number;
    @Column({name:"pre_termino",type:"int"})
    preTermino!:number;
    @Column({name:"semanas", type:"int"})
    semanas!:number;
    @Column({name:"fecha_parto",type:"date"})
    fechaParto!:Date;

    @OneToOne(() => MadresDonantesEntity, madreDonante => madreDonante.gestacion)
    @JoinColumn({name:"id_madre_donante"})
    madreDonante!:MadresDonantesEntity;

    
}