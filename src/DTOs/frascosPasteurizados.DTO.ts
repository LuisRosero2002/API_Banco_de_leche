import { IsNotEmpty, IsOptional, IsNumber, IsString } from "class-validator";
import { ControlReenvaseFriam032Entity } from "../entities/controlReenvaseFriam032.entity";

export class FrascosPasteurizadosDTO {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsOptional()
    @IsNumber()
    volumen?: number | null;

    @IsOptional()
    @IsNumber()
    numeroFrasco?: number | null;

    @IsOptional()
    @IsString()
    observaciones?: string | null;

    @IsNotEmpty()
    controlReenvase!: ControlReenvaseFriam032Entity;
}