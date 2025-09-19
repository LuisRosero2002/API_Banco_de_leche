import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "respuestas_friam_038" })
export class RespuestasFriam038Entity {
    @PrimaryGeneratedColumn("increment", { name: "id_respuesta" })
    id!: number;
    @Column({ name: "respuesta", type: "text", nullable: false })
    respuesta!: string;     

}