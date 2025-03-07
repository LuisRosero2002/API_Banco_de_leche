import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { UsuariosEntity } from "./usuarios.entity"

@Entity({name:"empleados"})
export class EmpleadosEntity{
    @PrimaryGeneratedColumn("increment",{name:"id_empleado"})
    id!: number;
    @Column()
    nombre!:string
    @Column()
    cargo!:string
    @Column()
    telefono!:number
    @Column({nullable:true})
    correo!:string
    @OneToOne(()=> UsuariosEntity,(usuario) => usuario.empleado)
    usuario!:UsuariosEntity
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