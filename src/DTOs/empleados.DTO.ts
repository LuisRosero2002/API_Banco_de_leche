import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class EmpleadosDTO {
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