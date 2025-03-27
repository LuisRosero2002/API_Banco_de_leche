import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CongeladorEntity } from "./congelador.entity";
import { CasasVisitasEntity } from "./casasVisitas.entity";

@Entity({ name: "frascos_recolectados" })
export class FrascosRecolectadosEntity {
    @PrimaryGeneratedColumn("increment", { name: "id_frascos_recolectados" })
    id!: number;
    @Column({type:"double", nullable:false, name:"volumen"})
    volumen!: number;
    @Column({type:"date", nullable:false, name:"fecha_de_extraccion"})
    fechaDeExtraccion!: Date;
    @Column({type:"int", nullable:false, name:"termo"})
    termo!: number;
    @Column({type:"int", nullable:false, name:"gaveta"})
    gaveta!: number;

    @ManyToOne(() => CongeladorEntity, congelador => congelador.frascoRecolectado)
    @JoinColumn({name:"id_congelador"})
    congelador!: CongeladorEntity;
    @ManyToOne(() => CasasVisitasEntity, casaVisita => casaVisita.frascoRecolectado)
    @JoinColumn({name:"id_casa_visita"})
    casaVisita!: CasasVisitasEntity;
}