import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MadresDonantesEntity } from "./madresDonantes.entity";

@Entity({ name: "hijos_madres" })
export class HijosMadresEntity {
    @PrimaryGeneratedColumn("increment", { name: "id_hijos_madres" })
    id!: number;
    @Column({name:"nombre",type:"varchar"})
    nombre!:string;
    @Column({name:"peso", type:"double"})
    peso!:number;

    @ManyToOne(() => MadresDonantesEntity, madreDonante => madreDonante.hijosMadre)
    @JoinColumn({name:"id_madres_donantes"})
    madreDonantes!: MadresDonantesEntity;
}