import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class ConformidadesFriam017DTO {
    @IsOptional()
    @IsNumber()
    id!: number;

    @IsNotEmpty()
    @IsString()
    fecha!: string;

    @IsOptional()
    @IsNumber()
    envase!: number;

    @IsOptional()
    @IsNumber()
    suciedad!: number;

    @IsOptional()
    @IsNumber()
    color!: number;

    @IsOptional()
    @IsNumber()
    flavor!: number;

    @IsNotEmpty()
    @IsNumber()
    muestrasTesteadas!: number;

    @IsNotEmpty()
    @IsNumber()
    muestrasReprobadas!: number;

    @IsOptional()
    @IsNumber()
    acidez!: number;

    @IsNotEmpty()
    @IsNumber()
    lote!: number;
}
