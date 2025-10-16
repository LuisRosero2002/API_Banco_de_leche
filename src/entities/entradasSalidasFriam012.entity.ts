import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CongeladorEntity } from "./congelador.entity";
import { MadresDonantesEntity } from "./madresDonantes.entity";
import { EmpleadosEntity } from "./empleados.entity";
import { ExtraccionFriam016Entity } from "./extraccionFriam016.entity";
import { FrascosRecolectadosEntity } from "./frascosRecolectados.entity";

@Entity('entradas_salidas_friam_012')
export class EntradasSalidasFriam012Entity {
    @PrimaryGeneratedColumn("increment", { name: "id_entradas_salidas" })
    id!: number;
    @Column({ type: "date", nullable: true, name: "fecha_vencimiento" })
    fechaVencimiento!: Date;
    @Column({ type: "text", nullable: true, name: "procedencia" })
    procedencia!: string;
    @Column({ type: "date", nullable: true, name: "fecha_entrada" })
    fechaEntrada!: Date;
    @Column({ type: "date", nullable: true, name: "fecha_salida" })
    fechaSalida!: Date;

    @ManyToOne(() => MadresDonantesEntity, madreDonante => madreDonante.entradasSalidas)
    @JoinColumn({ name: "id_madre_donante" })
    madreDonante!: MadresDonantesEntity;
    @ManyToOne(() => EmpleadosEntity, empleado => empleado.entradasSalidas, { nullable: true })
    @JoinColumn({ name: "responsable_entrada" })
    empleadoEntrada!: EmpleadosEntity;
    @ManyToOne(() => EmpleadosEntity, empleado => empleado.entradasSalidas, { nullable: true })
    @JoinColumn({ name: "responsable_salida" })
    empleadoSalida!: EmpleadosEntity;
    @ManyToOne(() => ExtraccionFriam016Entity, extraccion => extraccion.entradasSalidas, { nullable: true })
    @JoinColumn({ name: 'id_extraccion' })
    extraccion!: ExtraccionFriam016Entity;
    @ManyToOne(() => FrascosRecolectadosEntity, frasco => frasco.entradasSalidas, { nullable: true })
    @JoinColumn({ name: 'id_frasco_recolectado' })
    frascoRecolectado!: FrascosRecolectadosEntity;

}