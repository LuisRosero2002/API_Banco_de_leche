import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { UsuariosEntity } from "./usuarios.entity"
import { RolesEntity } from "./roles.entity"

@Entity("roles_usuario")
export class RolesUsuarioEntity{
    @PrimaryGeneratedColumn("increment",{name:"id_rol_usuario"})
    id!: number;
    @ManyToOne(() => UsuariosEntity, (usuario) => usuario.rolUsuario)
    @JoinColumn({name:"id_usuario"})
    usuario!:UsuariosEntity
    @ManyToOne(() => RolesEntity, (rol) => rol.rolUsuario)
    @JoinColumn({name:"id_rol"})
    rol!:RolesEntity

}