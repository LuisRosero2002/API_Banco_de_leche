import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { SeleccionClasificacionFriam015Entity } from "./seleccionClasificacionFriam015.entity";

@Entity({ name: "crematocrito" })
export class CrematocritoEntity {
    @PrimaryGeneratedColumn("increment", { name: "id_crematocrito" })
    id!: number;
    
    @Column({ name: "ct1", type: "float", nullable: true })
    ct1!: number | null;
    
    @Column({ name: "ct2", type: "float", nullable: true })
    ct2!: number | null;
    
    @Column({ name: "ct3", type: "float", nullable: true })
    ct3!: number | null;
    
    @Column({ name: "cc1", type: "float", nullable: true })
    cc1!: number | null;
    
    @Column({ name: "cc2", type: "float", nullable: true })
    cc2!: number | null;
    
    @Column({ name: "cc3", type: "float", nullable: true })
    cc3!: number | null;
    
    @Column({ name: "kcal", type: "float" })
    kcal!: number;

    @OneToOne(() => SeleccionClasificacionFriam015Entity, seleccionClasificacion => seleccionClasificacion.crematocrito)
    @JoinColumn({ name: "id_seleccion_clasificacion" })
    seleccionClasificacion!: SeleccionClasificacionFriam015Entity;
}