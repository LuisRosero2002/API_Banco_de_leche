import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CrematocritoEntity } from "./crematocrito.entity";
import { AnalisisSensorialEntity } from "./analisisSensorial.entity";
import { AcidezDornicEntity } from "./acidezDornic.entity";
import { InfoSeleccionClasificacionEntity } from "./infoSeleccionClasificacion.entity";
import { ControlReenvaseFriam032Entity } from "./controlReenvaseFriam032.entity";

@Entity({ name: "seleccion_clasificacion_friam_015" })
export class SeleccionClasificacionFriam015Entity {
    @PrimaryGeneratedColumn("increment", { name: "id_seleccion_clasificacion" })
    id!: number;
    @Column({ name: "fecha", type: "date", nullable: true})
    fecha!: Date;

    @OneToOne(() => ControlReenvaseFriam032Entity, controlReenvase => controlReenvase.seleccionClasificacion)
    @JoinColumn({ name: "id_control_reenvase" })
    controlReenvase!: ControlReenvaseFriam032Entity;
    @OneToOne(() => CrematocritoEntity, crematocrito => crematocrito.seleccionClasificacion)
    crematocrito!: CrematocritoEntity;
    @OneToOne(() => AnalisisSensorialEntity, analisisSensorial => analisisSensorial.seleccionClasificacion)
    analisisSensorial!: AnalisisSensorialEntity;
    @OneToOne(() => AcidezDornicEntity, acidezDornic => acidezDornic.seleccionClasificacion)
    acidezDornic!: AcidezDornicEntity;
    @OneToOne(() => InfoSeleccionClasificacionEntity, infoSeleccionClasificacion => infoSeleccionClasificacion.seleccionClasificacion)
    infoSeleccionClasificacion!: InfoSeleccionClasificacionEntity;
}