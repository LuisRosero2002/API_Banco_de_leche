import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ControlReenvaseFriam032Entity } from "./controlReenvaseFriam032.entity";
import { ControlMicrobilogicoFriam014Entity } from "./controlMicrobilogicoFriam014.entity";
import { EntradasSalidasPasteurizadaFriam013Entity } from "./entradasSalidasPasteurizadaFriam013.entity";
import { IngresoLechePasteurizadaFriam013Entity } from "./ingresoLechePasteurizadaFriam013.entity";

@Entity('frascos_pasteurizados')
export class FrascosPasteurizadosEntity {
    @PrimaryGeneratedColumn("increment", { name: "id_frasco_pasteurizado" })
    id!: number;

    @Column({ type: "float", nullable: true, name: "volumen" })
    volumen!: number | null;

    @Column({ type: "int", nullable: true, name: "numero_frasco" })
    numeroFrasco!: number | null;

    @Column({ type: "text", nullable: true, name: "observaciones" })
    observaciones!: string | null;

    @Column({ type: "boolean", default: true, name: "activo" })
    activo!: boolean;

    @ManyToOne(() => ControlReenvaseFriam032Entity, controlReenvase => controlReenvase.frascosPasteurizados)
    @JoinColumn({ name: "id_control_reenvase" })
    controlReenvase!: ControlReenvaseFriam032Entity;

    @OneToOne(() => ControlMicrobilogicoFriam014Entity, controlMicrobiologico => controlMicrobiologico.frascoPasteurizado)
    controlMicrobiologico!: ControlMicrobilogicoFriam014Entity;

    @OneToOne(() => EntradasSalidasPasteurizadaFriam013Entity, entradasSalidas => entradasSalidas.frascoPasteurizado)
    entradasSalidasPasteurizada!: EntradasSalidasPasteurizadaFriam013Entity;

    @OneToMany(() => IngresoLechePasteurizadaFriam013Entity, ingreso => ingreso.frascoPasteurizado)
    ingresoLechePasteurizada!: IngresoLechePasteurizadaFriam013Entity[];
}