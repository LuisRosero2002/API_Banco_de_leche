import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "preguntas_friam_038" })
export class PreguntasFriam038Entity {
    @PrimaryGeneratedColumn("increment", { name: "id_pregunta" })
    id!: number;
    @Column({ name: "pregunta", type: "text", nullable: false })
    pregunta!: string;
}