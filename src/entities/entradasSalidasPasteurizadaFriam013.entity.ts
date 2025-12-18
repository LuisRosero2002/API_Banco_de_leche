import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EmpleadosEntity } from "./empleados.entity";
import { FrascosPasteurizadosEntity } from "./frascosPasteurizados.entity";

@Entity({ name: "entradas_salidas_pasteurizada_friam_013" })
export class EntradasSalidasPasteurizadaFriam013Entity {
    @PrimaryGeneratedColumn("increment", { name: "id_entradas_salidas" })
    id!: number;

    @Column({ name: "gaveta", type: "int", nullable: true })
    gaveta!: number;

    @Column({ name: "fecha_salida", type: "date", nullable: true })
    fechaSalida!: Date;

    @ManyToOne(() => EmpleadosEntity, empleado => empleado.entradasSalidasPasteurizadaEntrada, { nullable: true })
    @JoinColumn({ name: "id_responsable_entrada" })
    responsableEntrada!: EmpleadosEntity;

    @ManyToOne(() => EmpleadosEntity, empleado => empleado.entradasSalidasPasteurizadaSalida, { nullable: true })
    @JoinColumn({ name: "id_responsable_salida" })
    responsableSalida!: EmpleadosEntity;

    @OneToOne(() => FrascosPasteurizadosEntity, frasco => frasco.entradasSalidasPasteurizada)
    @JoinColumn({ name: "id_frasco_pasteurizado" })
    frascoPasteurizado!: FrascosPasteurizadosEntity;
}
