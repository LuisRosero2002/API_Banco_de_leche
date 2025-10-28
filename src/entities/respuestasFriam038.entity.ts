import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PreguntasFriam038Entity } from "./preguntasFriam038.entity";
import { VisitaSeguimientoMadresEntity } from "./visitaSeguimientoMadres.entity";

@Entity({ name: "respuestas_friam_038" })
export class RespuestasFriam038Entity {
    @PrimaryGeneratedColumn("increment", { name: "id_respuesta" })
    id!: number;
    @Column({ name: "respuesta", type: "int", nullable: true })
    respuesta!: number | null;
    @ManyToOne(() => PreguntasFriam038Entity, pregunta => pregunta.respuestas)
    @JoinColumn({ name: "id_pregunta" })
    pregunta!: PreguntasFriam038Entity;
    @ManyToOne(() => VisitaSeguimientoMadresEntity, visitaSeguimiento => visitaSeguimiento.respuestas)
    @JoinColumn({ name: "id_visita_seguimiento" })
    visitaSeguimiento!: VisitaSeguimientoMadresEntity;
}