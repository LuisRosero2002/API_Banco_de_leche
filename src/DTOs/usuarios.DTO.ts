import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { EmpleadosEntity } from "../entities/empleados.entity";

export class UsuariosDTO {
    @IsOptional()
    id!:number
    @IsNotEmpty()
    usuario!:string
    @IsNotEmpty()
    password!:string
    @IsNotEmpty()
    @IsOptional()
    activo?:number
    @IsNotEmpty()
    empleado!:EmpleadosEntity
}