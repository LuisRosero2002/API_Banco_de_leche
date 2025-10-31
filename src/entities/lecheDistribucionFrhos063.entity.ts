import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MadresPotencialesEntity } from "./madresPotenciales.entity";
import { EmpleadosEntity } from "./empleados.entity";

@Entity('leche_distribucion_frhos_063')
export class LecheDistribucionFrhos063Entity {
    @PrimaryGeneratedColumn("increment", { name: "id_leche_distribucion" })
    id!: number;
    @Column({ type: "date", nullable: false, name: "fecha" })
    fecha!: Date;
    @Column({ type: "float", nullable: true, name: "volumen_manana" })
    volumenManana!: number;
    @Column({ type: "float", nullable: true, name: "volumen_tarde" })
    volumenTarde!: number;
    @Column({ type: "float", nullable: true, name: "perdidas" })
    perdidas!: number;

    @ManyToOne(() => MadresPotencialesEntity, MadrePotencial => MadrePotencial.lecheDistribucion)
    @JoinColumn({ name: "id_madre_potencial" })
    madrePotencial!: MadresPotencialesEntity;
    @ManyToOne(() => EmpleadosEntity, (empleado) => empleado.lecheDistribucion)
    @JoinColumn({ name: "id_empleado" })
    empleado!: EmpleadosEntity
}