// CalentamientoDTO

import { IsNotEmpty, IsString, IsNumber, IsInt, IsArray, ArrayNotEmpty, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer'; // Necesario para asegurar que el ID sea un número/entero

export class CalentamientoDTO {
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    id!: number;

    @IsNotEmpty()
    @IsString()
    minuto!: string;

    @IsNotEmpty()
    @IsNumber()
    valor!: number;

    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    temperaturaPasteurizadorId!: number;
}

export class CalentamientoArrayDTO {
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CalentamientoDTO) 
    items!: CalentamientoDTO[]; 
}