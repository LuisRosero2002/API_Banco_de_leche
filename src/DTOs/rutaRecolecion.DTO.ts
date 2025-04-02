import { IsNotEmpty, IsOptional } from "class-validator";
import { EmpleadosEntity } from "../entities/empleados.entity";

export class RutaRecoleccionDTO {
    @IsOptional()
    id!: number;
    @IsNotEmpty()
    jornada!: string;
    @IsNotEmpty()
    nombreConductor!: string;
    @IsNotEmpty()
    placa!: string;
    @IsNotEmpty()
    kilometrajeInicial!: number;
    @IsOptional()
    kilometrajeFinal!: number;
    @IsOptional()
    horaSalida!: string;
    @IsOptional()
    horaLlegada!: string;
    @IsOptional()
    temperaturaLlegada!: number;
    @IsOptional()
    temperaturaSalida!: string;
    @IsOptional()
    totalVisitas!: number
    @IsOptional()
    volumenTotal!: number;
    @IsNotEmpty()
    empleado!: EmpleadosEntity;
}