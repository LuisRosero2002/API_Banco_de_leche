import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CurvaPenetracionEntity } from "./curvaPenetracion.entity";

@Entity({ name: "pasteurizador" })
export class PasteurizadorEntity {
    @PrimaryGeneratedColumn("increment", { name: "id_pasteurizador" })
    id!: number;

    @Column({ type: "int" })
    tiempo!: number;

    @Column({ type: "float", name: "frasco_testigo" })
    frascoTestigo!: number;

    @Column({ type: "float" })
    agua!: number;

    @Column({ type: "int" })
    muestra!: number;

    @ManyToOne(() => CurvaPenetracionEntity, curvaPenetracion => curvaPenetracion.pasteurizadores)
    @JoinColumn({ name: "id_curva" })
    curva!: CurvaPenetracionEntity;
}
