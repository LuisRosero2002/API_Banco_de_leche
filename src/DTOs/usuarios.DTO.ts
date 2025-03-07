import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UsuariosDTO {
    @IsNotEmpty()
    usuario!:string
    @IsNotEmpty()
    password!:string
    @IsNotEmpty()
    @IsOptional()
    activo?:number
    @IsNotEmpty()
    @IsNumber()
    id_empleado!:number
}