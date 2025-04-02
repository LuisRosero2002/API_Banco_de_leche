import { IsNotEmpty, IsOptional } from "class-validator";
import { RutasRecoleccionEntity } from "../entities/rutasRecoleccion.entity";

export class CasasVisitasDTO {
    @IsOptional()
    id!: number;
    @IsOptional()
    observacion!: string;
    @IsOptional()
    madreDonante!: number;
    @IsNotEmpty()
    ruta!: RutasRecoleccionEntity;
}