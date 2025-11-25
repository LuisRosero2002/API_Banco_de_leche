import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { SeleccionClasificacionFriam015Entity } from "../entities/seleccionClasificacionFriam015.entity";

export class AnalisisSensorialDTO {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsNotEmpty()
    @IsNumber()
    embalaje!: number;

    @IsNotEmpty()
    @IsNumber()
    suciedad!: number;

    @IsNotEmpty()
    @IsNumber()
    color!: number;

    @IsNotEmpty()
    @IsNumber()
    flavor!: number;

    @IsNotEmpty()
    seleccionClasificacion!: SeleccionClasificacionFriam015Entity;
}