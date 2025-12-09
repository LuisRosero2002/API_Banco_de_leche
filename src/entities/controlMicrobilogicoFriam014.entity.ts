import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { FrascosPasteurizadosEntity } from "./frascosPasteurizados.entity";
import { InfoControlMicrobiologicoEntity } from "./infoControlMicrobilogico.entity";

@Entity({ name: "control_microbiologico_friam_014" })
export class ControlMicrobilogicoFriam014Entity {
    @PrimaryGeneratedColumn("increment", { name: "id_control_microbiologico" })
    id!: number;

    @Column({ name: "fecha", type: "date" })
    fecha!: Date;

    @Column({ name: "coliformes", type: "int", nullable: true })
    coliformes!: number;

    @Column({ name: "conformidad", type: "int", nullable: true })
    conformidad!: number;

    @Column({ name: "prueba_confirmatoria", type: "int", nullable: true })
    pruebaConfirmatoria!: number;

    @Column({ name: "liberacion", type: "int", nullable: true })
    liberacion!: number;

    @Column({ name: "observaciones", type: "text", nullable: true })
    observaciones!: string;

    @OneToOne(() => FrascosPasteurizadosEntity, frasco => frasco.controlMicrobiologico)
    @JoinColumn({ name: "id_frasco_pasteurizado" })
    frascoPasteurizado!: FrascosPasteurizadosEntity;

    @OneToOne(() => InfoControlMicrobiologicoEntity, infoControl => infoControl.controlMicrobiologico)
    @JoinColumn({ name: "id_info_control" })
    infoControl!: InfoControlMicrobiologicoEntity;
}
