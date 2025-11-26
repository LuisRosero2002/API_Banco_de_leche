import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { LoteEntity } from "../entities/lote.entity";
import { CicloEntity } from "../entities/ciclo.entity";
import { EmpleadosEntity } from "../entities/empleados.entity";

export class TemperaturaPasteurizadorDTO {
    @IsDateString() @IsNotEmpty() fecha!: Date;
    @IsNotEmpty() loteId!: LoteEntity;
    @IsNotEmpty() cicloId!: CicloEntity;
    @IsString() @IsNotEmpty() hora_inicio!: string;
    @IsString() @IsNotEmpty() hora_finalizacio!: string;
    @IsNotEmpty() responsableId!: EmpleadosEntity;
    @IsString() @IsOptional() observaciones?: string;
}