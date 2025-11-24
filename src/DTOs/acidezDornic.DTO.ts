import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { SeleccionClasificacionFriam015Entity } from "../entities/seleccionClasificacionFriam015.entity";

export class AcidezDornicDTO {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsOptional()
    @IsNumber()
    primera?: number;

    @IsOptional()
    @IsNumber()
    segunda?: number;

    @IsOptional()
    @IsNumber()
    tercera?: number;

    @IsOptional()
    @IsNumber()
    resultado?: number;

    @IsNotEmpty()
    seleccionClasificacion!: SeleccionClasificacionFriam015Entity;
}