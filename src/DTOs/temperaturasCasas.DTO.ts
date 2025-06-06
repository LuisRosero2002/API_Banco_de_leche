import { IsNotEmpty, IsOptional } from "class-validator";
import { RutasRecoleccionEntity } from "../entities/rutasRecoleccion.entity";

export class TemperaturaCasasDTO {
    @IsOptional()
    id!: number;
    @IsNotEmpty()
    numeroCasa!: number;
    @IsNotEmpty()
    temperatura!: number;
    @IsNotEmpty()
    ruta!: RutasRecoleccionEntity;
}