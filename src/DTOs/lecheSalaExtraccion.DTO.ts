import { IsNotEmpty, IsOptional } from "class-validator";

export class lecheSalaExtraccionDTO {
    @IsOptional()
    id!: number;
    @IsOptional()
    procedencia!: string;
    @IsNotEmpty()
    consejeria!: number;
    @IsOptional()
    municipio!: string
    @IsNotEmpty()
    fechaRegistro!: Date
    @IsNotEmpty()
    nombre!: string
    @IsNotEmpty()
    apellido!: string
    @IsNotEmpty()
    fechaNacimiento!: Date
    @IsNotEmpty()
    documento!: string
    @IsOptional()
    telefono!: string
    @IsOptional()
    eps!: string
}