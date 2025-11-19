import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { LoteEntity } from "./lote.entity";

@Entity({name: "ciclo"})
export class CicloEntity {
    @PrimaryGeneratedColumn("increment", { name: "id_ciclo" })
    id!: number;
    @Column({ name: "numero_ciclo", type: "int" })
    numeroCiclo!: number;
    
    @OneToOne(() => LoteEntity, lote => lote.ciclo)
    lote!: LoteEntity;
}