import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MadresDonantesEntity } from "./madresDonantes.entity";
import { EmpleadosEntity } from "./empleados.entity";
import { FrascosPasteurizadosEntity } from "./frascosPasteurizados.entity";

@Entity('control_reenvase_friam_032')
export class ControlReenvaseFriam032Entity {
    @PrimaryGeneratedColumn("increment", { name: "id_control_reenvase" })
    id!: number;
    @Column({ type: "date", nullable: false, name: "fecha" })
    fecha!: Date;
    @Column({ type: "float", nullable: false, name: "frasco_crudo" })
    frascoCrudo!: number;

    @ManyToOne(() => MadresDonantesEntity, madreDonante => madreDonante.controlReenvase)
    @JoinColumn({ name: "id_madre_donante" })
    madreDonante!: MadresDonantesEntity;
    @ManyToOne(() => EmpleadosEntity, empleado => empleado.controlReenvase)
    @JoinColumn({ name: "id_empleado" })
    empleado!: EmpleadosEntity;
    @OneToMany(() => FrascosPasteurizadosEntity, frascoPasteurizado => frascoPasteurizado.controlReenvase)
    frascosPasteurizados!: FrascosPasteurizadosEntity[];

}