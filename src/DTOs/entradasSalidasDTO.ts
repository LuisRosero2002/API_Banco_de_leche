import { IsOptional } from "class-validator";

export class EntradasSalidasDTO {
    @IsOptional()
    id?: number;
    @IsOptional()
    fechaVencimiento?: Date;
    @IsOptional()
    procedencia?: string;
    @IsOptional()
    fechaEntrada?: Date;
    @IsOptional()
    fechaSalida?: Date;
    @IsOptional()
    empleadoEntrada?: number;
    @IsOptional()
    empleadoSalida?: number;
    @IsOptional()
    congelador?: number;
}