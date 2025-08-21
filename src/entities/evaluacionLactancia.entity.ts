import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { VisitaMadresEntity } from "./visitaMadres.entity";

@Entity({ name: "evaluacion_lactancia" })
export class EvaluacionLactanciaEntity {
    @PrimaryGeneratedColumn("increment", { name: "id_evaluacion_lactancia" })
    id!: number;
    @Column({ type: "text" })
    madre!: string;
    @Column({ type: "text" })
    bebe!: string;
    @Column({ type: "text" })
    pechos!: string;
    @Column({ type: "text" })
    posicionBebe!: string;
    @Column({ type: "text" })
    agarrePecho!: string;
    @Column({ type: "text" })
    succion!: string;
    @Column({ type: "text" })
    deglucion!: string;
    @OneToOne(() => VisitaMadresEntity, visita => visita.evaluacionLactancia)
    visitaMadres!: VisitaMadresEntity;
}