import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { SeleccionClasificacionFriam015Entity } from "../entities/seleccionClasificacionFriam015.entity";

export class CrematocritoDTO {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsNotEmpty()
    @IsNumber()
    ct1!: number;

    @IsNotEmpty()
    @IsNumber()
    ct2!: number;

    @IsNotEmpty()
    @IsNumber()
    ct3!: number;

    @IsNotEmpty()
    @IsNumber()
    cc1!: number;

    @IsNotEmpty()
    @IsNumber()
    cc2!: number;

    @IsNotEmpty()
    @IsNumber()
    cc3!: number;

    @IsNotEmpty()
    @IsNumber()
    kcal!: number;

    @IsNotEmpty()
    seleccionClasificacion!: SeleccionClasificacionFriam015Entity;
}