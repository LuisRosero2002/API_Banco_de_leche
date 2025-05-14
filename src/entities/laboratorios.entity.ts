import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TipoLaboratorioEntity } from "./tipoLaboratorio.entity";
import { MadresDonantesEntity } from "./madresDonantes.entity";

@Entity({name:"laboratorios"})
export class LaboratoriosEntity {
    @PrimaryGeneratedColumn("increment", { name: "id_laboratorios" })
    id!: number; 
    @Column({name:"resultado",type:"int"})
    resultado!:number;
    @Column({name:"fecha_vencimiento", type:"date"})
    fechaVencimiento!:Date;
    @Column({name:"documento", type:"text"})
    documento!:string;

    @ManyToOne(() => TipoLaboratorioEntity, tipoLaboratorio => tipoLaboratorio.laboratorio )
    @JoinColumn({name:"id_tipo_laboratorio"})
    tipoLaboratorio!:TipoLaboratorioEntity;
    @ManyToOne(() => MadresDonantesEntity, madreDonante => madreDonante.laboratorio)
    @JoinColumn({name:"id_madres_donantes"})
    madreDonante!: MadresDonantesEntity;

}