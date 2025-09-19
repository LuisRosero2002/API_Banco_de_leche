import { Column, CreateDateColumn, Double, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EmpleadosEntity } from "./empleados.entity";
import { TemperaturaCasasEntity } from "./temperaturaCasas.entity";
import { CasasVisitasEntity } from "./casasVisitas.entity";
import { TemperaturasRutasEntity } from "./temperaturasRutas.entity";

@Entity({ name: "rutas_recoleccion_friam_011" })
export class RutasRecoleccionEntity {
    @PrimaryGeneratedColumn("increment", { name: "id_ruta" })
    id!: number;
    @CreateDateColumn({
        name: "fecha_registro",
        type: "timestamp",
    })
    fecha_registro!: Date;
    @Column({ type: "text", nullable: false, name: "jornada" })
    jornada!: string;
    @Column({ type: "text", nullable: false })
    nombreConductor!: string;
    @Column({ type: "varchar", nullable: false, name: "placa_vehiculo" })
    placa!: string;
    @Column({ type: "double", nullable: false, name: "kilometraje_inicial" })
    kilometrajeInicial!: number;
    @Column({ type: "double", nullable: true, name: "kilometraje_final" })
    kilometrajeFinal!: number;
    @Column({ type: "varchar", nullable: true, name: "hora_salida" })
    horaSalida!: string;
    @Column({ type: "varchar", nullable: true, name: "hora_llegada" })
    horaLlegada!: string;
    @Column({ type: "int", nullable: true, name: "total_visitas" })
    totalVisitas!: number
    @Column({ type: "double", nullable: true, name: "volumen_total" })
    volumenTotal!: number;
    @ManyToOne(() => EmpleadosEntity, empleado => empleado.ruta)
    @JoinColumn({ name: "id_empleado" })
    empleado!: EmpleadosEntity;
    @OneToMany(() => TemperaturaCasasEntity, casasVisitas => casasVisitas.ruta)
    temperaturaCasas!: TemperaturaCasasEntity[];
    @OneToMany(() => CasasVisitasEntity, casasVisitas => casasVisitas.ruta)
    casa_visita!: CasasVisitasEntity[];
    @OneToMany(() => TemperaturasRutasEntity, inscripcion => inscripcion.ruta)
    temperaturaRuta!: TemperaturasRutasEntity[];
}