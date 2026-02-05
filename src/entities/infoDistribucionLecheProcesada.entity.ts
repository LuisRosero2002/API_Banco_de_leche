import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FrascosRecolectadosEntity } from "./frascosRecolectados.entity";
import { DistribucionLecheProcesadaFriam031Entity } from "./distribucionLecheProcesadaFriam031.entity";
import { FrascosPasteurizadosEntity } from "./frascosPasteurizados.entity";

@Entity({ name: "info_distribucion_leche_procesada" })
export class InfoDistribucionLecheProcesadaEntity {
    @PrimaryGeneratedColumn("increment", { name: "id_info_distribucion" })
    id!: number;

    @Column({ name: "fecha", type: "date", nullable: true })
    fecha!: Date;

    @Column({ name: "volumen_distribuido", type: "float", nullable: true })
    volumenDistribuido!: number;

    @Column({ name: "tipo", type: "varchar", length: 255, nullable: true })
    tipo!: string;

    @Column({ name: "exclusiva", type: "int", nullable: true })
    exclusiva!: number;

    @ManyToOne(() => FrascosPasteurizadosEntity, frasco => frasco.infoDistribucion)
    @JoinColumn({ name: "id_frasco_pasteurizado" })
    frascoPasteurizado!: FrascosPasteurizadosEntity;

    @ManyToOne(() => DistribucionLecheProcesadaFriam031Entity, distribucion => distribucion.infoDistribucion)
    @JoinColumn({ name: "id_distribucion" })
    distribucion!: DistribucionLecheProcesadaFriam031Entity;
}
