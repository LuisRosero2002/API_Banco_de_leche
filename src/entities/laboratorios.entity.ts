import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TipoLaboratorioEntity } from "./tipoLaboratorio.entity";
import { MadresDonantesEntity } from "./madresDonantes.entity";
import { MadresPotencialesEntity } from "./madresPotenciales.entity";

@Entity({ name: "laboratorios" })
export class LaboratoriosEntity {
    @PrimaryGeneratedColumn("increment", { name: "id_laboratorios" })
    id!: number;
    @Column({ name: "resultado", type: "int" })
    resultado!: number;
    @Column({ name: "fecha_vencimiento", type: "date" })
    fechaVencimiento!: Date;
    @Column({ name: "documento", type: "text" })
    documento!: string;
    @CreateDateColumn({
        name: "fecha_registro",
        type: "timestamp",
    })
    fechaRegistro!: Date;

    @ManyToOne(() => TipoLaboratorioEntity, tipoLaboratorio => tipoLaboratorio.laboratorio)
    @JoinColumn({ name: "id_tipo_laboratorio" })
    tipoLaboratorio!: TipoLaboratorioEntity;
    @ManyToOne(() => MadresPotencialesEntity, madrePotencial => madrePotencial.laboratorio)
    @JoinColumn({ name: "id_madre_potencial" })
    madrePotencial!: MadresPotencialesEntity;

}