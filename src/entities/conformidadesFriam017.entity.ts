import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { LoteEntity } from "./lote.entity";

@Entity({ name: "conformidades_friam_017" })
export class ConformidadesFriam017Entity {
    @PrimaryGeneratedColumn("increment", { name: "id_conformidades" })
    id!: number;
    @Column({ name: "fecha", type: "date",nullable:true })
    fecha!: Date;
    @Column({ name: "envase", type: "int",nullable:true })
    envase!: number
    @Column({ name: "suciedad", type: "int",nullable:true })
    suciedad!: number
    @Column({ name: "color", type: "int",nullable:true })
    color!: number
    @Column({ name: "flavor", type: "int",nullable:true })
    flavor!: number
    @Column({ name: "muestras_testeadas", type: "int" })
    muestrasTesteadas!: number
    @Column({ name: "muestras_reprobadas", type: "int" })
    muestrasReprobadas!: number

    @OneToOne(() => LoteEntity, lote => lote.conformidades)
    @JoinColumn({ name: "id_lote" })
    lote!: LoteEntity;
}