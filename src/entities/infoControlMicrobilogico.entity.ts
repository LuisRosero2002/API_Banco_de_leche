import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ControlMicrobilogicoFriam014Entity } from "./controlMicrobilogicoFriam014.entity";
import { EmpleadosEntity } from "./empleados.entity";

@Entity({ name: "info_control_microbiologico" })
export class InfoControlMicrobiologicoEntity {
    @PrimaryGeneratedColumn("increment", { name: "id_info_control" })
    id!: number;

    @Column({ name: "fecha_siembre", type: "datetime" })
    fechaSiembre!: Date;

    @Column({ name: "primera_lectura", type: "datetime" })
    primeraLectura!: Date;

    @ManyToOne(() => EmpleadosEntity, empleado => empleado.infoControlMicrobiologicoSiembre)
    @JoinColumn({ name: "responsable_siembre" })
    responsableSiembre!: EmpleadosEntity;

    @ManyToOne(() => EmpleadosEntity, empleado => empleado.infoControlMicrobiologicoLectura)
    @JoinColumn({ name: "responsable_lectura" })
    responsableLectura!: EmpleadosEntity;

    @ManyToOne(() => EmpleadosEntity, empleado => empleado.infoControlMicrobiologicoProcesamiento)
    @JoinColumn({ name: "responsable_procesamiento" })
    responsableProcesamiento!: EmpleadosEntity;

    @ManyToOne(() => EmpleadosEntity, empleado => empleado.infoControlMicrobiologicoCoordinador)
    @JoinColumn({ name: "coordinador" })
    coordinador!: EmpleadosEntity;

    @OneToOne(() => ControlMicrobilogicoFriam014Entity, controlMicrobiologico => controlMicrobiologico.infoControl)
    controlMicrobiologico!: ControlMicrobilogicoFriam014Entity;
}
