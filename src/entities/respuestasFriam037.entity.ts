import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PreguntasFriam037Entity } from "./preguntasFriam037.entity";
import { VisitaMadresEntity } from "./visitaMadres.entity";

@Entity({ name: "respuestas_friam_037" })
export class RespuestasFriam037Entity {
    @PrimaryGeneratedColumn("increment", { name: "id_respuesta" })
    id!: number;
    @Column({ type: "int", nullable: true })
    respuesta!: number;
    @ManyToOne(() => PreguntasFriam037Entity, pregunta => pregunta.respuestas)
    @JoinColumn({ name: "id_pregunta" })
    pregunta!: PreguntasFriam037Entity;
    @ManyToOne(() => VisitaMadresEntity, visita => visita.respuestas)
    @JoinColumn({ name: "id_visita_domiciliario" })
    visitaMadres!:VisitaMadresEntity;
}