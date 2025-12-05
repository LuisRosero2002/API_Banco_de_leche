import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { LoteEntity } from "./lote.entity";
import { CicloEntity } from "./ciclo.entity";
import { EmpleadosEntity } from "./empleados.entity";
import { EnfriamientoTemperaturaEntity } from "./enfriamientoTemperatura.entity";
import { CalentamientoPasteurizadorEntity } from "./calentamientoPasteurizador.entity";


@Entity('temperatura_pasteurizador_friam_036')
export class TemperaturaPasteurizadorFriam036Entity {

    @PrimaryGeneratedColumn('increment', { name: 'id_temperatura_pasteurizador' })
    id!: number;

    @Column({ type: 'date' })
    fecha!: Date;

    @OneToOne(() => LoteEntity, lote => lote.temperaturaPasteurizador)
    @JoinColumn({ name: 'id_lote' })
    lote!: LoteEntity;

    @OneToOne(() => CicloEntity, ciclo => ciclo.temperaturaPasteurizador)
    @JoinColumn({ name: 'id_ciclo' })
    ciclo!: CicloEntity;

    @Column({ type: 'varchar' })
    hora_inicio!: string;

    @Column({ type: 'varchar' })
    hora_finalizacio!: string;

    @ManyToOne(() => EmpleadosEntity, empleado => empleado.temperaturaPasteurizador)
    @JoinColumn({ name: 'responsable' })
    responsable!: EmpleadosEntity;

    @Column({ type: 'text', nullable: true })
    observaciones?: string;

    @OneToMany(() => CalentamientoPasteurizadorEntity, calentamiento => calentamiento.temperaturaPasteurizador)
    calentamientos!: CalentamientoPasteurizadorEntity[];

    @OneToMany(() => EnfriamientoTemperaturaEntity, enfriamiento => enfriamiento.temperaturaPasteurizador)
    enfriamientos!: EnfriamientoTemperaturaEntity[];
}