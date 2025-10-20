import { IsNotEmpty, IsOptional } from "class-validator";
import { CongeladorEntity } from "../entities/congelador.entity";
import { LecheSalaExtraccionFriam016Entity } from "../entities/lecheSalaExtraccionFriam016.entity";

export class ExtraccionFriam016DTO {
    @IsOptional()
    id!: number;
    @IsNotEmpty()
    cantidad!: number;
    @IsNotEmpty()
    hora!: string;
    @IsOptional()
    gaveta!: number;
    @IsNotEmpty()
    fechaExtraccion!: Date;
    @IsNotEmpty()
    congelador!: CongeladorEntity;
    @IsNotEmpty()
    lecheSalaExtraccion!: LecheSalaExtraccionFriam016Entity;
    @IsOptional()
    motivoConsulta!: string;
    @IsOptional()
    observaciones!: string;
}