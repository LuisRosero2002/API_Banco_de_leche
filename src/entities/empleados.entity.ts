import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { UsuariosEntity } from "./usuarios.entity"
import { MadresPotencialesEntity } from "./madresPotenciales.entity";
import { RutasRecoleccionEntity } from "./rutasRecoleccion.entity";
import { MadresDonantesEntity } from "./madresDonantes.entity";
import { EntradasSalidasFriam012Entity } from "./entradasSalidasFriam012.entity";
import { LecheDistribucionFrhos063Entity } from "./lecheDistribucionFrhos063.entity";
import { ControlReenvaseFriam032Entity } from "./controlReenvaseFriam032.entity";
import { InfoSeleccionClasificacionEntity } from "./infoSeleccionClasificacion.entity";
import { TemperaturaPasteurizadorFriam036Entity } from "./temperaturaPasteurizadorFriam036.entity";


@Entity({ name: "empleados" })
export class EmpleadosEntity {
    @PrimaryGeneratedColumn("increment", { name: "id_empleado" })
    id!: number;
    @Column()
    nombre!: string
    @Column()
    cargo!: string
    @Column()
    telefono!: number
    @Column({ nullable: true })
    correo!: string

    @CreateDateColumn({
        name: "created_at",
        type: "timestamp",
    })
    createdAt!: Date;
    @UpdateDateColumn({
        name: "update_at",
        type: "timestamp",
    })
    updatedAt!: Date;

    @OneToOne(() => UsuariosEntity, usuario => usuario.empleado)
    usuario!: UsuariosEntity
    @OneToMany(() => MadresPotencialesEntity, madresPotenciales => madresPotenciales.empleado)
    madresPotenciales!: MadresPotencialesEntity[]
    @OneToMany(() => MadresDonantesEntity, madresDonantes => madresDonantes.empleado)
    madreDonantes!: MadresDonantesEntity[]
    @OneToMany(() => RutasRecoleccionEntity, rutasRecoleccion => rutasRecoleccion.empleado)
    ruta!: RutasRecoleccionEntity[]
    @OneToMany(() => EntradasSalidasFriam012Entity, entradasSalidas => entradasSalidas.empleadoEntrada)
    entradasSalidas!: EntradasSalidasFriam012Entity[]
    @OneToMany(() => LecheDistribucionFrhos063Entity, lecheDistribucion => lecheDistribucion.empleado)
    lecheDistribucion!: LecheDistribucionFrhos063Entity[]
    @OneToMany(() => ControlReenvaseFriam032Entity, controlReenvase => controlReenvase.empleado)
    controlReenvase!: ControlReenvaseFriam032Entity[]
    @OneToMany(() => InfoSeleccionClasificacionEntity, info => info.profesional)
    infoSeleccionClasificacion!: InfoSeleccionClasificacionEntity[]
    @OneToMany(() => InfoSeleccionClasificacionEntity, info => info.auxiliar)
    infoSeleccionClasificacionAuxiliar!: InfoSeleccionClasificacionEntity[]
    @OneToMany(() => TemperaturaPasteurizadorFriam036Entity, temperaturaPasteurizador => temperaturaPasteurizador.responsable)
    temperaturaPasteurizador!: TemperaturaPasteurizadorFriam036Entity[];
}