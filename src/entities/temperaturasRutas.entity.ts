import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RutasRecoleccionEntity } from "./rutasRecoleccion.entity";

@Entity({ name: "temperaturas_rutas" })
export class TemperaturasRutasEntity {
    @PrimaryGeneratedColumn("increment", { name: "id_temperatura_ruta" })
    id!: number;

    @Column({ type: "int", nullable: false, name: "numero_caja" })
    numeroCaja!: number; 
    
    @Column({ type: "double", nullable: false, name: "temperatura_salida" })
    temperaturaSalida!: number;
    
    @Column({ type: "double", nullable: true, name: "temperatura_llegada" })
    temperaturaLlegada!: number;
   
    @ManyToOne(() => RutasRecoleccionEntity, ruta => ruta.temperaturaRuta, { onDelete: "CASCADE" })
    @JoinColumn({ name: "id_ruta" })
    ruta!: RutasRecoleccionEntity;
}
