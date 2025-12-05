import { IsNumber, IsOptional, IsNotEmpty } from "class-validator";
import { SeleccionClasificacionFriam015Entity } from "../entities/seleccionClasificacionFriam015.entity";

export class CrematocritoDTO {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsOptional()
    @IsNumber()
    ct1?: number;

    @IsOptional()
    @IsNumber()
    ct2?: number;

    @IsOptional()
    @IsNumber()
    ct3?: number;

    @IsOptional()
    @IsNumber()
    cc1?: number;

    @IsOptional()
    @IsNumber()
    cc2?: number;

    @IsOptional()
    @IsNumber()
    cc3?: number;

    @IsNotEmpty()
    @IsNumber()
    kcal!: number;

    @IsNotEmpty()
    seleccionClasificacion!: SeleccionClasificacionFriam015Entity;
}