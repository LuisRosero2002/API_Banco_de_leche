import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MadresDonantesEntity } from "./madresDonantes.entity";
import { DatosVisitaSeguimientoEntity } from "./datos_visita_seguimiento.entity";
import { RespuestasFriam038Entity } from "./respuestasFriam038.entity";

@Entity({ name: "visita_seguimiento_friam_038" })
export class VisitaSeguimientoMadresEntity {
    @PrimaryGeneratedColumn("increment", { name: "id_visita_seguimiento" })
    id!: number;
    @Column({ name: "fecha", type: "date", nullable: false })
    fecha!: Date;

    @ManyToOne(() => MadresDonantesEntity, madreDonante => madreDonante.visitaSeguimiento)
    @JoinColumn({ name: "id_madre_donante" })
    madreDonante!: MadresDonantesEntity;
    @OneToOne(() => DatosVisitaSeguimientoEntity, datosVisitaSeguimiento => datosVisitaSeguimiento.visitaSeguimiento)
    datosVisitaSeguimiento!: DatosVisitaSeguimientoEntity;
    @OneToMany(() => RespuestasFriam038Entity, respuesta => respuesta.visitaSeguimiento)
    respuestas!: RespuestasFriam038Entity[];
} 