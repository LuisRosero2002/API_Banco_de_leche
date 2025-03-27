import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class EmpleadosDTO {
    @IsOptional()
    id!:number
    @IsNotEmpty()
    nombre!:string
    @IsNotEmpty()
    cargo!:string
    @IsNotEmpty()
    telefono!:number
    @IsOptional()
    @IsString()
    correo!:string
}