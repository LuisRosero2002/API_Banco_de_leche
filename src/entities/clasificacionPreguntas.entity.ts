import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PreguntasFriam037Entity } from "./preguntasFriam037.entity";

@Entity({ name: "clasificacion_preguntas" })
export class ClasificacionPreguntasEntity {
    @PrimaryGeneratedColumn("increment", { name: "id_clasificacion_preguntas" })
    id!: number;
    @Column({ type: "text" })
    descripcion!: string;
    @OneToMany(() => PreguntasFriam037Entity, pregunta => pregunta.clasificacion)
    preguntas!: PreguntasFriam037Entity[];
}