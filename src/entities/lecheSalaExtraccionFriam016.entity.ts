import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ExtraccionFriam016Entity } from "./extraccionFriam016.entity";
import { MadresPotencialesEntity } from "./madresPotenciales.entity";

@Entity('leche_sala_extraccion_friam_016')
export class LecheSalaExtraccionFriam016Entity {
    @PrimaryGeneratedColumn("increment", { name: "id_leche_sala_extraccion" })
    id!: number;
    @Column({ type: "text", nullable: true, name: "procedencia" })
    procedencia!: string;
    @Column({ type: "int", nullable: true, name: "consejeria" })
    consejeria!: number;
    @Column({ type: "text", nullable: true, name: "motivo_consulta" })
    motivoConsulta!: string;
    @Column({ type: "date", nullable: true, name: "fecha_registro" })
    fechaRegistro!: Date;
    @Column({ type: "text", nullable: true, name: "observaciones" })
    observaciones!: string;

    @OneToMany(() => ExtraccionFriam016Entity, extraccion => extraccion.lecheSalaExtraccion)
    extracciones!: ExtraccionFriam016Entity[];
    @OneToOne(() => MadresPotencialesEntity, MadrePotencial => MadrePotencial.lecheSalaExtraccion)
    @JoinColumn({ name: "id_madre_potencial" })
    madrePotencial!: MadresPotencialesEntity;
}