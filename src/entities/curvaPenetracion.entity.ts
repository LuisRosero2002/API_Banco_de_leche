import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { EmpleadosEntity } from "./empleados.entity";
import { PasteurizadorEntity } from "./pasteurizador.entity";
import { EnfriadorEntity } from "./enfriador.entity";

@Entity({ name: "curva_de_penetracion" })
export class CurvaPenetracionEntity {
    @PrimaryGeneratedColumn("increment", { name: "id_curva" })
    id!: number;

    @Column({ type: "int", name: "numero_frascos" })
    numeroFrascos!: number;

    @Column({ type: "varchar", length: 100, name: "tipo_frasco" })
    tipoFrasco!: string;

    @Column({ type: "varchar", length: 100, name: "tipo_termometro" })
    tipoTermometro!: string;

    @Column({ type: "varchar", length: 100 })
    marca!: string;

    @Column({ type: "varchar", length: 100 })
    certificado!: string;

    @Column({ type: "int", name: "agua_pasteurizador" })
    aguaPasteurizador!: number;

    @Column({ type: "float", name: "temperatura_equipo" })
    temperaturaEquipo!: number;

    @Column({ type: "float" })
    volumen!: number;

    @Column({ type: "float", name: "agua_enfriador" })
    aguaEnfriador!: number;

    @Column({ type: "float", name: "temperatura_agua" })
    temperaturaAgua!: number;

    @Column({ type: "date" })
    fecha!: Date;

    @Column({ type: "float", name: "promedio_pasteurizador" })
    promedioPasteurizador!: number;

    @Column({ type: "float", name: "minutos_pasteurizador" })
    minutosPasteurizador!: number;

    @Column({ type: "float", name: "promedio_enfriador" })
    promedioEnfriador!: number;

    @Column({ type: "float", name: "minutos_enfriador" })
    minutosEnfriador!: number;

    @ManyToOne(() => EmpleadosEntity, empleado => empleado.curvaPenetracionResponsableOne)
    @JoinColumn({ name: "id_responsable_one" })
    responsableOne!: EmpleadosEntity;

    @ManyToOne(() => EmpleadosEntity, empleado => empleado.curvaPenetracionResponsableTwo, { nullable: true })
    @JoinColumn({ name: "id_responsable_two" })
    responsableTwo!: EmpleadosEntity | null;

    @OneToMany(() => PasteurizadorEntity, pasteurizador => pasteurizador.curva)
    pasteurizadores!: PasteurizadorEntity[];

    @OneToMany(() => EnfriadorEntity, enfriador => enfriador.curva)
    enfriadores!: EnfriadorEntity[];
}
