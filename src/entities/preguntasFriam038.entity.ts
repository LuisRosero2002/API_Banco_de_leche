import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RespuestasFriam038Entity } from "./respuestasFriam038.entity";

@Entity({ name: "preguntas_friam_038" })
export class PreguntasFriam038Entity {
    @PrimaryGeneratedColumn("increment", { name: "id_pregunta" })
    id!: number;
    @Column({ name: "pregunta", type: "text", nullable: false })
    pregunta!: string;
    @OneToMany(() => RespuestasFriam038Entity, respuesta => respuesta.pregunta)
    respuestas!: RespuestasFriam038Entity[];
}