import { IsNotEmpty, IsOptional } from "class-validator";

export class LactarioDTO {
    @IsOptional()
    id!: number;
    @IsNotEmpty()
    nombre!: string;
    @IsNotEmpty()
    cama!: number;
    @IsNotEmpty()
    volumenDosificado!: number;
    @IsNotEmpty()
    medico!: string;
    @IsNotEmpty()
    dosificador!: string;
}