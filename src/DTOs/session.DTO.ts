import { IsNotEmpty } from "class-validator"
import { UsuariosEntity } from "../entities/usuarios.entity"

export class SessionDTO {
    @IsNotEmpty()
    usuario!:UsuariosEntity
    @IsNotEmpty()
    token!:string
}