import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { SeleccionClasificacionFriam015Entity } from "./seleccionClasificacionFriam015.entity";

@Entity({ name: "acidez_dornic" })
export class AcidezDornicEntity {
    @PrimaryGeneratedColumn("increment", { name: "id_acidez_dornic" })
    id!: number;
    
    @Column({ name: "primera", type: "float", nullable: true })
    primera!: number | null;
    
    @Column({ name: "segunda", type: "float", nullable: true })
    segunda!: number | null;
    
    @Column({ name: "tercera", type: "float", nullable: true })
    tercera!: number | null;
    
    @Column({ name: "resultado", type: "float", nullable: true })
    resultado!: number | null;

    @OneToOne(() => SeleccionClasificacionFriam015Entity, seleccionClasificacion => seleccionClasificacion.acidezDornic)
    @JoinColumn({ name: "id_seleccion_clasificacion" })
    seleccionClasificacion!: SeleccionClasificacionFriam015Entity;
}