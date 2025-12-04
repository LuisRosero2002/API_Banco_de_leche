import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import { TemperaturaPasteurizadorFriam036Entity } from "./temperaturaPasteurizadorFriam036.entity";

@Entity('enfriamiento_temperatura')
export class EnfriamientoTemperaturaEntity {

    @PrimaryGeneratedColumn('increment', { name: 'id_enfriamiento' })
    id!: number;
    @Column({ type: 'varchar' })
    minuto!: string;
    @Column({ type: 'float' })
    valor!: number;

    @ManyToOne(() => TemperaturaPasteurizadorFriam036Entity, temperatura => temperatura.enfriamientos, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_temperatura_pasteurizador' })
    temperaturaPasteurizador!: TemperaturaPasteurizadorFriam036Entity;
}