import { IsNotEmpty } from "class-validator";

export class EmpleadosDTO {
    @IsNotEmpty()
    id!: number;
    @IsNotEmpty()
    nombre!:string
    @IsNotEmpty()
    cargo!:string
    @IsNotEmpty()
    telefono!:number
    @IsNotEmpty()
    correo!:string
}