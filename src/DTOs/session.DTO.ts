import { IsNotEmpty, IsOptional } from "class-validator"
import { UsuariosEntity } from "../entities/usuarios.entity"

export class SessionDTO {
    @IsOptional()
    id?:number
    @IsNotEmpty()
    usuario!:UsuariosEntity
    @IsNotEmpty()
    token!:string
}