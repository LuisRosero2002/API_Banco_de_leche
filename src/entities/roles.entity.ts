import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { RolesUsuarioEntity } from "./roles-usuario.entity"

@Entity("roles")
export class RolesEntity{
    @PrimaryGeneratedColumn("increment",{name:"id_rol"})
    id!:number
    @Column({type:"varchar",length: 255})
    descripcion!:string
    @Column({type:"bit"})
    activo!:number
    @OneToMany(()=> RolesUsuarioEntity, (rolesUsuario) => rolesUsuario.rol)
    rolUsuario!:RolesUsuarioEntity[]
}