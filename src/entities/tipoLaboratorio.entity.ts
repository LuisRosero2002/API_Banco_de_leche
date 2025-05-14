import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LaboratoriosEntity } from "./laboratorios.entity";

@Entity({ name: "tipo_laboratorio" })
export class TipoLaboratorioEntity {
    @PrimaryGeneratedColumn("increment", { name: "id_tipo_laboratorio" })
    id!: number;
    @Column({name:"nombre", type:"varchar"})
    nombre!: string;

    @OneToMany(() => LaboratoriosEntity, laboratorio => laboratorio.tipoLaboratorio)
    laboratorio!:LaboratoriosEntity[];
}