import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ClasificacionPreguntasEntity } from "./clasificacionPreguntas.entity";
import { RespuestasFriam037Entity } from "./respuestasFriam037.entity";

@Entity({ name: "preguntas_friam_037" })
export class PreguntasFriam037Entity {
    @PrimaryGeneratedColumn("increment", { name: "id_pregunta_friam037" })
    id!: number;
    @Column({ type: "text" })
    descripcion!: string;
    @ManyToOne(() => ClasificacionPreguntasEntity, clasificacion => clasificacion.preguntas)
    @JoinColumn({ name: "id_clasificacion_pregunta" })
    clasificacion!: ClasificacionPreguntasEntity;
    @OneToMany(() => RespuestasFriam037Entity, respuesta => respuesta.pregunta)
    respuestas!: RespuestasFriam037Entity[];
}
