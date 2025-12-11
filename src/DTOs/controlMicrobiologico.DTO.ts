import { IsNotEmpty, IsOptional, IsNumber, IsString, IsArray, IsDateString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { InfoControlMicrobiologicoDTO } from './infoControlMicrobiologico.DTO';
import { FrascosPasteurizadosEntity } from '../entities/frascosPasteurizados.entity';

/**
 * Sub-DTO para cada registro individual de ControlMicrobilogicoFriam014Entity
 */
export class ControlMicrobiologicoItemDTO {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsNotEmpty()
    @IsNumber()
    idFrascoPasteurizado!: number;

    @IsNotEmpty()
    @IsDateString()
    fecha!: string;

    @IsOptional()
    @IsNumber()
    coliformes?: number;

    @IsOptional()
    @IsNumber()
    conformidad?: number;

    @IsOptional()
    @IsNumber()
    pruebaConfirmatoria?: number;

    @IsOptional()
    @IsNumber()
    liberacion?: number;

    @IsOptional()
    @IsString()
    observaciones?: string;
}

/**
 * DTO General que contiene la información compartida y el array de registros
 */
export class ControlMicrobiologicoDTO {
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => InfoControlMicrobiologicoDTO)
    infoControl!: InfoControlMicrobiologicoDTO;

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ControlMicrobiologicoItemDTO)
    controles!: ControlMicrobiologicoItemDTO[];

    @IsOptional()
    @IsArray()
    frascos!: FrascosPasteurizadosEntity[]
}
