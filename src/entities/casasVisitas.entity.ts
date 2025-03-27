import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RutasRecoleccionEntity } from "./rutasRecoleccion.entity";
import { FrascosRecolectadosEntity } from "./frascosRecolectados.entity";

@Entity('casas_visitas')
export class CasasVisitasEntity {
    @PrimaryGeneratedColumn("increment", { name: "id_casa_visita" })
    id!: number;
    @Column({ type: "text", nullable: true, name: "observacion" })
    observacion!: string;

    @ManyToOne(() => RutasRecoleccionEntity, ruta => ruta.casa_visita)
    @JoinColumn({ name: "id_ruta" })
    ruta!: RutasRecoleccionEntity;
    // @OneToOne(() => MadresDonantesEntity, madreDonante => madreDonante.temperaturaSalida)
    // @JoinColumn({name:"id_madre_donante"})
    // madreDonante!: MadresDonantesEntity;
    @OneToMany(() => FrascosRecolectadosEntity, frascoRecolectado => frascoRecolectado.casaVisita)
    frascoRecolectado!: FrascosRecolectadosEntity[];
    
}