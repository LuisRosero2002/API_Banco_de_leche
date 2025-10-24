import { IsNotEmpty, IsOptional } from "class-validator";

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
    congelador!: { id: number };
    @IsNotEmpty()
    lecheSalaExtraccion!: { id: number };
    @IsOptional()
    motivoConsulta!: string;
    @IsOptional()
    observaciones!: string;
}