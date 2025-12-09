import { IsNotEmpty, IsOptional, IsNumber, IsString, IsArray, IsDateString } from 'class-validator';
import { InfoControlMicrobiologicoDTO } from './infoControlMicrobiologico.DTO';

export class ControlMicrobiologicoDTO {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsNotEmpty()
    @IsArray()
    @IsNumber({}, { each: true })
    frascosPasteurizados!: number[];

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

    @IsNotEmpty()
    infoControl!: InfoControlMicrobiologicoDTO;
}
