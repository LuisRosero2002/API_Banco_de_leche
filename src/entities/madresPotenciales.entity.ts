import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EmpleadosEntity } from "./empleados.entity";
import { EntidadesEntity } from "./entidades.entity";
import { InfoMadresEntity } from "./infoMadres.entity";
import { MadresDonantesEntity } from "./madresDonantes.entity";
import { LaboratoriosEntity } from "./laboratorios.entity";
import { VisitaMadresEntity } from "./visitaMadres.entity";
import { LecheSalaExtraccionFriam016Entity } from "./lecheSalaExtraccionFriam016.entity";
import { LecheDistribucionFrhos063Entity } from "./lecheDistribucionFrhos063.entity";

export enum llamadaType {
    saliente = 'saliente',
    entrante = 'entrante',
}

@Entity({ name: "madres_potenciales" })
export class MadresPotencialesEntity {
    @PrimaryGeneratedColumn("increment", { name: "id_madre_potencial" })
    id!: number;
    @Column({ type: "int", nullable: true })
    educacion_presencial!: number;
    @Column({ type: "date", nullable: true })
    fecha_llamada!: Date;
    @Column({ type: "enum", enum: llamadaType, nullable: true })
    llamada!: string;
    @Column({ type: "int", nullable: true })
    asesoria!: number;
    @Column({ type: "int", nullable: true })
    donante_efectiva!: number;
    @Column({ type: "date", nullable: true })
    fecha_visita!: Date;
    @Column({ type: "text", nullable: true })
    observacion!: number;
    @CreateDateColumn({
        name: "fecha_registro",
        type: "timestamp",
    })
    fecha_registro!: Date;

    @ManyToOne(() => EntidadesEntity, entidad => entidad.madrePotencial)
    @JoinColumn({ name: "id_entidad" })
    entidad!: EntidadesEntity
    @ManyToOne(() => EmpleadosEntity, (empleado) => empleado.madresPotenciales)
    @JoinColumn({ name: "id_empleado" })
    empleado!: EmpleadosEntity
    @OneToOne(() => InfoMadresEntity, infoMadre => infoMadre.madrePotencial)
    @JoinColumn({ name: "id_info_madre" })
    infoMadre!: InfoMadresEntity
    @OneToMany(() => LaboratoriosEntity, laboratorio => laboratorio.madrePotencial)
    laboratorio!: LaboratoriosEntity[];
    @OneToOne(() => MadresDonantesEntity, MadreDonante => MadreDonante.madrePotencial)
    MadreDonante!: MadresDonantesEntity
    @OneToOne(() => VisitaMadresEntity, visitaMadre => visitaMadre.madrePotencial)
    visitaMadre!: VisitaMadresEntity;
    @OneToOne(() => LecheSalaExtraccionFriam016Entity, lecheSalaExtraccion => lecheSalaExtraccion.madrePotencial)
    lecheSalaExtraccion!: LecheSalaExtraccionFriam016Entity;
    @OneToMany(() => LecheDistribucionFrhos063Entity, lecheDistribucion => lecheDistribucion.madrePotencial)
    lecheDistribucion!: LecheDistribucionFrhos063Entity[]


}