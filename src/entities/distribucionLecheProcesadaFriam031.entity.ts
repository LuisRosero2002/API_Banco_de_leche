import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { InfoDistribucionLecheProcesadaEntity } from "./infoDistribucionLecheProcesada.entity";
import { EmpleadosEntity } from "./empleados.entity";
import { EntidadesEntity } from "./entidades.entity";

@Entity({ name: "distribucion_leche_procesada_friam_031" })
export class DistribucionLecheProcesadaFriam031Entity {
    @PrimaryGeneratedColumn("increment", { name: "id_distribucion" })
    id!: number;

    @Column({ name: "nombre_beneficiario", type: "varchar", length: 255, nullable: true })
    nombreBeneficiario!: string;

    @Column({ name: "identificacion", type: "int", nullable: true })
    identificacion!: number;

    @Column({ name: "semanas_gestacion", type: "int", nullable: true })
    semanasGestacion!: number;

    @ManyToOne(() => EntidadesEntity, { nullable: true })
    @JoinColumn({ name: "eps" })
    eps!: EntidadesEntity;

    @Column({ name: "responsable", type: "varchar", length: 255, nullable: true })
    responsable!: string;

    @OneToMany(() => InfoDistribucionLecheProcesadaEntity, info => info.distribucion)
    infoDistribucion!: InfoDistribucionLecheProcesadaEntity[];
}
