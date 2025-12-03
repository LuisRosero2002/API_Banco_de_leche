import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CicloEntity } from "./ciclo.entity";
import { ControlReenvaseFriam032Entity } from "./controlReenvaseFriam032.entity";
import { ConformidadesFriam017Entity } from "./conformidadesFriam017.entity";

@Entity({ name: "lote" })
export class LoteEntity {
    @PrimaryGeneratedColumn("increment", { name: "id_lote" })
    id!: number;
    @Column({ name: "numero_lote", type: "int" })
    numeroLote!: number;


    @OneToOne(() => CicloEntity, ciclo => ciclo.lote)
    @JoinColumn({ name: "id_ciclo" })
    ciclo!: CicloEntity;
    @OneToOne(() => ControlReenvaseFriam032Entity, controlReenvase => controlReenvase.lote)
    @JoinColumn({ name: "id_control_reenvase" })
    controlReenvase!: ControlReenvaseFriam032Entity;
    @OneToOne(() => ConformidadesFriam017Entity, conformidades => conformidades.lote)
    conformidades!: ConformidadesFriam017Entity;
}