import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CongeladorEntity } from "./congelador.entity";
import { LecheSalaExtraccionFriam016Entity } from "./lecheSalaExtraccionFriam016.entity";
import { EntradasSalidasFriam012Entity } from "./entradasSalidasFriam012.entity";

@Entity('extraccion_friam_016')
export class ExtraccionFriam016Entity {
    @PrimaryGeneratedColumn("increment", { name: "id_extraccion" })
    id!: number;
    @Column({ type: "float", nullable: true, name: "cantidad" })
    cantidad!: number;
    @Column({ type: "varchar", nullable: true, name: "hora" })
    hora!: string;
    @Column({ type: "int", nullable: true, name: "gaveta" })
    gaveta!: number;
    @Column({ type: "date", nullable: true, name: "fecha_extraccion" })
    fechaExtraccion!: Date;
    @Column({ type: "text", nullable: true, name: "motivo_consulta" })
    motivoConsulta!: string;
    @Column({ type: "text", nullable: true, name: "observaciones" })
    observaciones!: string;
    @Column({ type: "int", nullable: false, name: "activo",default:1 })
    activo!: number;

    @ManyToOne(() => CongeladorEntity, congelador => congelador.extracciones)
    @JoinColumn({ name: "id_congelador" })
    congelador!: CongeladorEntity
    @ManyToOne(() => LecheSalaExtraccionFriam016Entity, lecheSalaExtraccion => lecheSalaExtraccion.extracciones)
    @JoinColumn({ name: "id_leche_sala_extraccion" })
    lecheSalaExtraccion!: LecheSalaExtraccionFriam016Entity
    @OneToMany(() => EntradasSalidasFriam012Entity, entrada => entrada.extraccion)
    entradasSalidas!: EntradasSalidasFriam012Entity[];

}