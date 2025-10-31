import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MadresPotencialesEntity } from "./madresPotenciales.entity";
import { EvaluacionLactanciaEntity } from "./evaluacionLactancia.entity";
import { RespuestasFriam037Entity } from "./respuestasFriam037.entity";

@Entity({ name: "visita_domiciliaria_friam_037" })
export class VisitaMadresEntity {
    @PrimaryGeneratedColumn("increment", { name: "id_visita" })
    id!: number;
    @Column({ name: "observaciones", type: "text", nullable: true })
    observaciones!: string;
    @Column({ name: "recomendaciones", type: "text", nullable: true })
    recomendaciones!: string;
    @Column({ name: "donante_efectiva", type: "int", nullable: true })
    donante_efectiva!: number;
    @Column({ name: "firma_usuario", type: "text", nullable: true })
    firmaUsuario!: string;
    @Column({ name: "firma_evaluador", type: "text", nullable: true })
    firmaEvaluador!: string;
    @OneToOne(() => MadresPotencialesEntity, madrePotencial => madrePotencial.madreDonante)
    @JoinColumn({ name: "id_madre_potencial" })
    madrePotencial!: MadresPotencialesEntity;
    @OneToOne(() => EvaluacionLactanciaEntity, evaluacionLactancia => evaluacionLactancia.visitaMadres)
    @JoinColumn({ name: "id_evaluacion_lactancia" })
    evaluacionLactancia!: EvaluacionLactanciaEntity;
    @OneToMany(() => RespuestasFriam037Entity, respuesta => respuesta.visitaMadres)
    respuestas!: RespuestasFriam037Entity[];
}