import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { EmpleadosEntity } from "./empleados.entity";
import { RolesUsuarioEntity } from "./roles-usuario.entity";
import { SessionEntity } from "./sessions.entity";
import { Exclude } from "class-transformer";


@Entity({name:"usuarios"})
export class UsuariosEntity {
    @PrimaryGeneratedColumn("increment",{name:"id_usuario"})
    id!: number;
    @Column()
    usuario!:string
    @Exclude()
    @Column()
    password!:string
    @Column({type:"bit"})
    activo!:number
    @OneToOne(() => EmpleadosEntity, (empleado) => empleado.usuario)
    @JoinColumn({name:"id_empleado"})
    empleado!: EmpleadosEntity
    @OneToMany(()=> RolesUsuarioEntity, (rolesUsuario) => rolesUsuario.usuario)
    rolUsuario!:RolesUsuarioEntity[]
    @OneToOne(() => SessionEntity, (session) => session.usuario)
    session!:SessionEntity
    @CreateDateColumn({
        name:"created_at",
        type:"timestamp",
    })
    createdAt!:Date;
    @UpdateDateColumn({
        name:"update_at",
        type:"timestamp",
    })
    updatedAt!:Date;
}