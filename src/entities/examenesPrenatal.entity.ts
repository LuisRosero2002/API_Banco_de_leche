import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MadresDonantesEntity } from "./madresDonantes.entity";

@Entity({name:"examenes_prenatal"})
export class ExamenesPrenatalEntity {
    @PrimaryGeneratedColumn("increment", { name: "id_examenes_prenatal" })
    id!: number;  
    @Column({name:"hemoglobina",type:"int"})
    hemoglobina!:number;
    @Column({name:"hematocrito",type:"int"})
    hematocrito!:number;
    @Column({name:"transfuciones",type:"int"})
    transfuciones!:number;
    @Column({name:"enfermedades_gestacion",type:"text"})
    enfermedadesGestacion!:string;
    @Column({name:"fuma",type:"int"})
    fuma!:number;
    @Column({name:"alcohol",type:"int"})
    alcohol!:number;

    @OneToOne(() => MadresDonantesEntity, madreDonante => madreDonante.examenesPrenatal)
    @JoinColumn({name:"id_madre_donante"})
    madreDonante!:MadresDonantesEntity
}