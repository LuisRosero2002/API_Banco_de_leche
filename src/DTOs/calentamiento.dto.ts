import { IsNotEmpty, IsString, IsNumber, IsInt, IsArray, ArrayNotEmpty, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CalentamientoDTO {
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    id?: number;

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