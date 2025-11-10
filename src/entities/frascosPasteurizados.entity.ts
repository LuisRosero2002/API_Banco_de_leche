import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ControlReenvaseFriam032Entity } from "./controlReenvaseFriam032.entity";

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

    @ManyToOne(() => ControlReenvaseFriam032Entity, controlReenvase => controlReenvase.frascosPasteurizados)
    @JoinColumn({ name: "id_control_reenvase" })
    controlReenvase!: ControlReenvaseFriam032Entity;
}