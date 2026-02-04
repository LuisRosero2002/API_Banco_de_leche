import { IsNotEmpty, IsOptional } from "class-validator";
import { RutasRecoleccionEntity } from "../entities/rutasRecoleccion.entity";

export class TemperaturaCasasDTO {
    @IsOptional()
    id!: number;
    @IsNotEmpty()
    numeroCasa!: number;
    @IsOptional()
    temperatura!: number;
    @IsNotEmpty()
    horaSalida!: string;
    @IsOptional()
    horaLlegada!: string;
    @IsNotEmpty()
    caja!: number;
    @IsNotEmpty()
    ruta!: RutasRecoleccionEntity;
}