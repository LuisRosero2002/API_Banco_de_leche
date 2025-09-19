import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "visita_seguimiento_friam_038" })
export class VisitaSeguimientoMadresEntity {
    @PrimaryGeneratedColumn("increment", { name: "id_visita_seguimiento" })
    id!: number;
    @Column({ name: "fecha", type: "date", nullable: false })
    fecha!: Date;
    @Column({ name: "observaciones", type: "text", nullable: true })
    observaciones!: string;
    @Column({ name: "recomendaciones", type: "text", nullable: true })
    recomendaciones!: string;
    @Column({ name: "firma_usuario", type: "text", nullable: true })
    firmaUsuario!: string;
    @Column({ name: "firma_evaluador", type: "text", nullable: true })
    firmaEvaluador!: string;

} 