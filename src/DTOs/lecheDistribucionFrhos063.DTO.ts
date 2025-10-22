import { IsNotEmpty, IsOptional } from "class-validator";
import { MadresPotencialesEntity } from "../entities/madresPotenciales.entity";
import { EmpleadosEntity } from "../entities/empleados.entity";

export class LecheDistribucionFrhos063DTO {
    @IsOptional()
    id!: number;
    @IsNotEmpty()
    fecha!: Date
    @IsOptional()
    volumenManana!: number;
    @IsOptional()
    volumenTarde!: number;
    @IsOptional()
    perdidas!: number;
    @IsNotEmpty()
    madrePotencial!: MadresPotencialesEntity;
    @IsNotEmpty()
    empleado!: EmpleadosEntity;
}