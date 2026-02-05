import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IngresoLechePasteurizadaFriam013Entity } from "./ingresoLechePasteurizadaFriam013.entity";

@Entity({ name: "lactario" })
export class LactarioEntity {
    @PrimaryGeneratedColumn("increment", { name: "id_lactario" })
    id!: number;

    @Column({ name: "nombre", type: "varchar", length: 255, nullable: true })
    nombre!: string;

    @Column({ name: "cama", type: "int", nullable: true })
    cama!: number;

    @Column({ name: "volumen_dosificado", type: "float", nullable: true })
    volumenDosificado!: number;

    @Column({ name: "medico", type: "varchar", length: 255, nullable: true })
    medico!: string;

    @Column({ name: "dosificador", type: "varchar", length: 255, nullable: true })
    dosificador!: string;

    @ManyToOne(() => IngresoLechePasteurizadaFriam013Entity, ingreso => ingreso.lactarios)
    @JoinColumn({ name: "id_ingreso_leche" })
    ingresoLeche!: IngresoLechePasteurizadaFriam013Entity;
}
