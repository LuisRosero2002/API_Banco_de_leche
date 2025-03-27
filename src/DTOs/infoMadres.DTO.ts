import { IsNotEmpty, IsOptional } from "class-validator";
import { MadresPotencialesEntity } from "../entities/madresPotenciales.entity";

export class InfoMadresDTO {
    @IsOptional()
    id!:number
    @IsNotEmpty()
    nombre!: string
    @IsNotEmpty()
    apellido!: string
    @IsNotEmpty()
    documento!: string
    @IsNotEmpty()
    fechaNacimiento!: Date
    @IsNotEmpty()
    fechaParto!: Date
    @IsOptional()
    telefono!: string
    @IsOptional()
    celular!:string
    @IsOptional()
    departamento!: string
    @IsOptional()
    ciudad!: string
    @IsNotEmpty()
    barrio!: string
    @IsNotEmpty()
    direccion!: string
    @IsOptional()
    profesion!: string
    @IsOptional()
    eps!: string
    @IsOptional()
    madrePotencial?: MadresPotencialesEntity;
}