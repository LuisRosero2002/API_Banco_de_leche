import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MadresDonantesEntity } from "./madresDonantes.entity";

@Entity({name:"medicamentos"})
export class MedicamentosEntity {
    @PrimaryGeneratedColumn("increment", { name: "id_medicamentos" })
    id!: number;
    @Column({name:"medicamento",type:"text"})
    medicamento!:string;
    @Column({name:"psicoactivos", type:"text"})
    psicoactivos!:string;

    @OneToOne(() => MadresDonantesEntity, madreDonante => madreDonante.medicamento)
    @JoinColumn({name:"id_madre_donante"})
    madreDonante!:MadresDonantesEntity
}