import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CicloEntity } from "./ciclo.entity";
import { ControlReenvaseFriam032Entity } from "./controlReenvaseFriam032.entity";
import { TemperaturaPasteurizadorFriam036Entity } from "./temperaturaPasteurizadorFriam036.entity";
import { ConformidadesFriam017Entity } from "./conformidadesFriam017.entity";

@Entity({ name: "lote" })
export class LoteEntity {
    @PrimaryGeneratedColumn('increment', { name: 'id_lote' })
    id!: number;
    @Column({ name: 'numero_lote', type: "int" })
    numeroLote!: number;

    @ManyToOne(() => CicloEntity, (ciclo) => ciclo.lotes)
    @JoinColumn({ name: 'id_ciclo' })
    ciclo!: CicloEntity;
    @OneToOne(() => ControlReenvaseFriam032Entity, controlReenvase => controlReenvase.lote)
    @JoinColumn({ name: 'id_control_reenvase' })
    controlReenvase!: ControlReenvaseFriam032Entity;
    @OneToOne(() => TemperaturaPasteurizadorFriam036Entity, temperaturaPasteurizador => temperaturaPasteurizador.lote)
    temperaturaPasteurizador!: TemperaturaPasteurizadorFriam036Entity;
    @OneToOne(() => ConformidadesFriam017Entity, conformidades => conformidades.lote)
    conformidades!: ConformidadesFriam017Entity;
}