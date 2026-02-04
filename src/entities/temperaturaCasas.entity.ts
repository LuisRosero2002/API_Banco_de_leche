import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RutasRecoleccionEntity } from "./rutasRecoleccion.entity";
import { TemperaturasRutasEntity } from "./temperaturasRutas.entity";

@Entity({ name: "temperatura_casas" })
export class TemperaturaCasasEntity {
    @PrimaryGeneratedColumn("increment", { name: "id_temperatura_casas" })
    id!: number;
    @Column({ type: "int", nullable: false, name: "numero_casa" })
    numeroCasa!: number;
    @Column({ type: "double", nullable: true, name: "temperatura" })
    temperatura!: number;
    @Column({ type: "int", nullable: false, name: "caja" })
    caja!: number;
    @ManyToOne(() => RutasRecoleccionEntity, ruta => ruta.temperaturaCasas)
    @JoinColumn({ name: "id_ruta" })
    ruta!: RutasRecoleccionEntity;
}