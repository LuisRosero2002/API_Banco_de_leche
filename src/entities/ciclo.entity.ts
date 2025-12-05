import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { LoteEntity } from "./lote.entity";
import { TemperaturaPasteurizadorFriam036Entity } from "./temperaturaPasteurizadorFriam036.entity";


@Entity({name: "ciclo"})
export class CicloEntity {
    @PrimaryGeneratedColumn('increment', { name: 'id_ciclo' })
    id!: number;
    @Column({ name: 'numero_ciclo', type: "int" })
    numeroCiclo!: number;
    
    @OneToMany(() => LoteEntity, lote => lote.ciclo)
    lotes!: LoteEntity[];

    @OneToOne(() => TemperaturaPasteurizadorFriam036Entity, temperaturaPasteurizador => temperaturaPasteurizador.ciclo)
    temperaturaPasteurizador!: TemperaturaPasteurizadorFriam036Entity;
}