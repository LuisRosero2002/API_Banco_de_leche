import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { SeleccionClasificacionFriam015Entity } from "./seleccionClasificacionFriam015.entity";

@Entity({ name: "analisis_sensorial" })
export class AnalisisSensorialEntity {
    @PrimaryGeneratedColumn("increment", { name: "id_analisis" })
    id!: number;
    @Column({ name: "embalaje", type: "int" })
    embalaje!: number;
    @Column({ name: "suciedad", type: "int" })
    suciedad!: number;
    @Column({ name: "color", type: "int" })
    color!: number;
    @Column({ name: "flavor", type: "int" })
    flavor!: number;

    @OneToOne(() => SeleccionClasificacionFriam015Entity, seleccionClasificacion => seleccionClasificacion.analisisSensorial)
    @JoinColumn({ name: "id_seleccion_clasificacion" })
    seleccionClasificacion!: SeleccionClasificacionFriam015Entity;
}