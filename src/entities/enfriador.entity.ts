import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CurvaPenetracionEntity } from "./curvaPenetracion.entity";

@Entity({ name: "enfriador" })
export class EnfriadorEntity {
    @PrimaryGeneratedColumn("increment", { name: "id_enfriador" })
    id!: number;

    @Column({ type: "int" })
    tiempo!: number;

    @Column({ type: "float", name: "frasco_testigo" })
    frascoTestigo!: number;

    @Column({ type: "int" })
    agua!: number;

    @Column({ type: "int" })
    muestra!: number;

    @ManyToOne(() => CurvaPenetracionEntity, curvaPenetracion => curvaPenetracion.enfriadores)
    @JoinColumn({ name: "id_curva" })
    curva!: CurvaPenetracionEntity;
}
