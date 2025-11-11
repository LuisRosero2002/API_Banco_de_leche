import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { SeleccionClasificacionFriam015Entity } from "./seleccionClasificacionFriam015.entity";
import { EmpleadosEntity } from "./empleados.entity";

@Entity({ name: "info_seleccion_clasificacion" })
export class InfoSeleccionClasificacionEntity {
    @PrimaryGeneratedColumn("increment", { name: "id_info_seleccion_clasificacion" })
    id!: number;
    @Column({ name: "fecha", type: "date" })
    fecha!: Date;
    @Column({ name: "numero_frascos_pasteurizados", type: "int" })
    numeroFrascosPasteurizados!: number;
    @Column({ name: "volumen", type: "float" })
    volumen!: number;
    @Column({ name: "fecha_vencimiento", type: "date" })
    fechaVencimiento!: Date;
    @Column({ name: "observaciones", type: "text" })
    observaciones!: string;
    @Column({ name: "ciclo", type: "int" })
    ciclo!: number;
    @Column({ name: "lote", type: "int" })
    lote!: number;
    @Column({ name: "fecha_vencimiento_cultivos", type: "date" })
    fechaVencimientoCultivos!: Date;

    @OneToOne(() => SeleccionClasificacionFriam015Entity, seleccionClasificacion => seleccionClasificacion.infoSeleccionClasificacion)
    @JoinColumn({ name: "id_seleccion_clasificacion" })
    seleccionClasificacion!: SeleccionClasificacionFriam015Entity;
    @ManyToOne(() => EmpleadosEntity, (empleado) => empleado.infoSeleccionClasificacion)
    @JoinColumn({ name: "id_empleado" })
    profesional!: EmpleadosEntity
    @ManyToOne(() => EmpleadosEntity, (empleado) => empleado.infoSeleccionClasificacionAuxiliar)
    @JoinColumn({ name: "id_empleado" })
    auxiliar!: EmpleadosEntity

}