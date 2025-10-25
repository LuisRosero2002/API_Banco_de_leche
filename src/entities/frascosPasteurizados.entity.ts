import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ControlReenvaseFriam032Entity } from "./controlReenvaseFriam032.entity";

@Entity('frascos_pasteurizados')
export class FrascosPasteurizadosEntity {
    @PrimaryGeneratedColumn("increment", { name: "id_frasco_pasteurizado" })
    id!: number;
    @Column({ type: "float", nullable: true, name: "volumen" })
    volumen!: number;

    @ManyToOne(() => ControlReenvaseFriam032Entity, controlReenvase => controlReenvase.frascosPasteurizados)
    @JoinColumn({ name: "id_control_reenvase" })
    controlReenvase!: ControlReenvaseFriam032Entity;
}