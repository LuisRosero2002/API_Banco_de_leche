import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { VisitaSeguimientoMadresEntity } from "./visitaSeguimientoMadres.entity";

@Entity({ name: "datos_visita_seguimiento" })
export class DatosVisitaSeguimientoEntity {
    @PrimaryGeneratedColumn("increment", { name: "id_datos_visita" })
    id!: number;
    @Column({ name: "observaciones", type: "text", nullable: true })
    observaciones!: string;
    @Column({ name: "recomendaciones", type: "text", nullable: true })
    recomendaciones!: string;
    @Column({ name: "firma_usuario", type: "text", nullable: true })
    firmaUsuario!: string;
    @Column({ name: "firma_evaluador", type: "text", nullable: true })
    firmaEvaluador!: string;

    @OneToOne(() => VisitaSeguimientoMadresEntity, visitaSeguimiento => visitaSeguimiento.datosVisitaSeguimiento)
    @JoinColumn({ name: "id_visita_seguimiento" })
    visitaSeguimiento!: VisitaSeguimientoMadresEntity;

}