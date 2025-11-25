import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { SeleccionClasificacionFriam015Entity } from "./seleccionClasificacionFriam015.entity";
import { EmpleadosEntity } from "./empleados.entity";

@Entity({ name: "info_seleccion_clasificacion" })
export class InfoSeleccionClasificacionEntity {
    @PrimaryGeneratedColumn("increment", { name: "id_info_seleccion_clasificacion" })
    id!: number;
    @Column({ name: "numero_frascos_pasteurizados", type: "int", nullable:true })
    numeroFrascosPasteurizados!: number;
    @Column({ name: "volumen", type: "float",nullable:true })
    volumen!: number;
    @Column({ name: "fecha_vencimiento", type: "date", nullable:true })
    fechaVencimiento!: Date;
    @Column({ name: "observaciones", type: "text", nullable:true })
    observaciones!: string;
    @Column({ name: "lote_cultivos", type: "varchar", nullable:true })
    loteCultivos!: string;
    @Column({ name: "fecha_vencimiento_cultivos", type: "date", nullable:true })
    fechaVencimientoCultivos!: Date;

    @OneToOne(() => SeleccionClasificacionFriam015Entity, seleccionClasificacion => seleccionClasificacion.infoSeleccionClasificacion)
    @JoinColumn({ name: "id_seleccion_clasificacion" })
    seleccionClasificacion!: SeleccionClasificacionFriam015Entity;
    @ManyToOne(() => EmpleadosEntity, (empleado) => empleado.infoSeleccionClasificacion)
    @JoinColumn({ name: "id_profesional" })
    profesional!: EmpleadosEntity
    @ManyToOne(() => EmpleadosEntity, (empleado) => empleado.infoSeleccionClasificacionAuxiliar)
    @JoinColumn({ name: "id_auxiliar" })
    auxiliar!: EmpleadosEntity

}