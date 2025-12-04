import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class EnfriamientoDTO {
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    id!: number;

    @IsString()
    @IsNotEmpty()
    minuto!: string;

    @IsNumber()
    @IsNotEmpty()
    valor!: number;

    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    temperaturaPasteurizadorId!: number;
}

export class EnfriamientoArrayDTO {
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => EnfriamientoDTO) 
    items!: EnfriamientoDTO[]; 
}
