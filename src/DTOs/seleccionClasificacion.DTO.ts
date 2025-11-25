import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

class EmpleadoIdDTO {
    @IsInt()
    @IsNotEmpty()
    id!: number;
}

export class InfoSeleccionClasificacionUpdateDTO {
    @IsInt()
    @IsOptional()
    id!: number;

    @IsOptional()
    @IsInt()
    numeroFrascosPasteurizados?: number;

    @IsOptional()
    @IsNumber()
    volumen?: number;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    fechaVencimiento?: Date;

    @IsOptional()
    @IsString()
    observaciones?: string;

    @IsOptional()
    @IsString()
    loteCultivos?: string;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    fechaVencimientoCultivos?: Date;

    @IsOptional()
    @IsObject()
    profesional?: EmpleadoIdDTO;

    @IsOptional()
    @IsObject()
    auxiliar?: EmpleadoIdDTO;
}

export class UpdateSeleccionClasificacionDTO {
    @IsInt()
    @IsNotEmpty()
    id!: number;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    fecha?: Date;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => InfoSeleccionClasificacionUpdateDTO)
    infoSeleccionClasificacion!: InfoSeleccionClasificacionUpdateDTO;
}
