import { IsNotEmpty, IsOptional } from "class-validator";
import { RutasRecoleccionEntity } from "../entities/rutasRecoleccion.entity";
import { TemperaturaCasasEntity } from "../entities/temperaturaCasas.entity";

export class TemperaturasRutasDTO {
    @IsOptional()
    id!: number;
    @IsNotEmpty()
    ruta!: RutasRecoleccionEntity;
    @IsNotEmpty()
    numeroCaja!: number;
    @IsNotEmpty()
    temperaturaLlegada!: number;
    @IsNotEmpty()
    temperaturaSalida!: number;
    @IsOptional()
    opt?: number;
}
