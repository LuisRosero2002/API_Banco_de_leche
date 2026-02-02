import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LactarioEntity } from "./lactario.entity";
import { FrascosPasteurizadosEntity } from "./frascosPasteurizados.entity";
import { MadresDonantesEntity } from "./madresDonantes.entity";

@Entity({ name: "ingreso_leche_pasteurizada_friam_013" })
export class IngresoLechePasteurizadaFriam013Entity {
    @PrimaryGeneratedColumn("increment", { name: "id_ingreso_leche" })
    id!: number;

    @Column({ name: "fecha_dispensacion", type: "date", nullable: true })
    fechaDispensacion!: Date;

    @Column({ name: "tipo", type: "varchar", length: 255, nullable: true })
    tipo!: string;

    @ManyToOne(() => FrascosPasteurizadosEntity, frasco => frasco.ingresoLechePasteurizada)
    @JoinColumn({ name: "id_frasco_pasteurizado" })
    frascoPasteurizado!: FrascosPasteurizadosEntity;

    @ManyToOne(() => MadresDonantesEntity, madre => madre.ingresoLechePasteurizada)
    @JoinColumn({ name: "id_madre_donante" })
    madreDonante!: MadresDonantesEntity;

    @OneToMany(() => LactarioEntity, lactario => lactario.ingresoLeche)
    lactarios!: LactarioEntity[];
}
