import { IsNotEmpty, IsOptional } from "class-validator";
import { MadresDonantesEntity } from "../entities/madresDonantes.entity";
import { EmpleadosEntity } from "../entities/empleados.entity";
import { ExtraccionFriam016Entity } from "../entities/extraccionFriam016.entity";

export class EntradasSalidasLecheCrudaDTO {
    @IsOptional()
    id!: number;
    @IsNotEmpty()
    fechaVencimiento!: Date;
    @IsOptional()
    procedencia!: string;
    @IsOptional()
    fechaEntrada!: Date;
    @IsOptional()
    fechaSalida!: Date;
    @IsNotEmpty()
    madreDonante!: MadresDonantesEntity;
    @IsOptional()
    empleadoEntrada!: EmpleadosEntity;
    @IsOptional()
    empleadoSalida!: EmpleadosEntity;
    @IsOptional()
    extraccion!: ExtraccionFriam016Entity;
    @IsOptional()
    tipoDonante!: string;
    @IsNotEmpty()
    idFrascoLecheCruda!: number;
    @IsOptional()
    gaveta?: number;
    @IsOptional()
    congelador?: number;
}