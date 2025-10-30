import { IsNotEmpty, IsOptional } from "class-validator";
import { ControlReenvaseFriam032Entity } from "../entities/controlReenvaseFriam032.entity";

export class FrascosPasteurizadosDTO {
    @IsOptional()
    id!: number;
    @IsNotEmpty()
    volumen!: number;
    @IsNotEmpty()
    controlReenvase!: ControlReenvaseFriam032Entity;
}
