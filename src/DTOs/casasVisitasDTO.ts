import { IsNotEmpty, IsOptional } from "class-validator";
import { RutasRecoleccionEntity } from "../entities/rutasRecoleccion.entity";
import { MadresDonantesEntity } from "../entities/madresDonantes.entity";

export class CasasVisitasDTO {
    @IsOptional()
    id!: number;
    @IsOptional()
    observacion!: string;
    @IsOptional()
    numeroCasa!: number;
    @IsOptional()
    madreDonante!: MadresDonantesEntity;
    @IsNotEmpty()
    ruta!: RutasRecoleccionEntity;
}