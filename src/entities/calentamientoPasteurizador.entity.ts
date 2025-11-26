import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { TemperaturaPasteurizadorFriam036Entity } from "./temperaturaPasteurizadorFriam036.entity";

@Entity('calentamiento_pasteurizador')
export class CalentamientoPasteurizadorEntity {

    @PrimaryGeneratedColumn('increment', { name: 'id_calentamiento' })
    id!: number;
    @Column({ type: 'varchar' })
    minuto!: string;
    @Column({ type: 'float' })
    valor!: number;

    @ManyToOne(() => TemperaturaPasteurizadorFriam036Entity, temperaturaPasteurizador => temperaturaPasteurizador.calentamientos,{ cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_temperatura_pasteurizador' })
    temperaturaPasteurizador!: TemperaturaPasteurizadorFriam036Entity;
}