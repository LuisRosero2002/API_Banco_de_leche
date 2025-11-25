import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { SeleccionClasificacionFriam015Entity } from "./seleccionClasificacionFriam015.entity";

@Entity({ name: "crematocrito" })
export class CrematocritoEntity {
    @PrimaryGeneratedColumn("increment", { name: "id_crematocrito" })
    id!: number;
    @Column({ name: "ct1", type: "float" })
    ct1!: number;
    @Column({ name: "ct2", type: "float" })
    ct2!: number;
    @Column({ name: "ct3", type: "float" })
    ct3!: number;
    @Column({ name: "cc1", type: "float" })
    cc1!: number;
    @Column({ name: "cc2", type: "float" })
    cc2!: number;
    @Column({ name: "cc3", type: "float" })
    cc3!: number;
    @Column({ name: "kcal", type: "float" })
    kcal!: number;

    @OneToOne(() => SeleccionClasificacionFriam015Entity, seleccionClasificacion => seleccionClasificacion.crematocrito)
    @JoinColumn({ name: "id_seleccion_clasificacion" })
    seleccionClasificacion!: SeleccionClasificacionFriam015Entity;
}