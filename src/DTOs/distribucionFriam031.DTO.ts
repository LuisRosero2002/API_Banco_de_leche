import { IsNotEmpty, IsOptional } from "class-validator";
import { FrascosRecolectadosEntity } from "../entities/frascosRecolectados.entity";
import { EmpleadosEntity } from "../entities/empleados.entity";
import { EntidadesEntity } from "../entities/entidades.entity";

export class DistribucionFriam031DTO {
    @IsOptional()
    idInfoDistribucion!: number;

    @IsOptional()
    fecha!: Date;

    @IsOptional()
    volumenDistribuido!: number;

    @IsOptional()
    frascoPasteurizado!: FrascosRecolectadosEntity;

    @IsOptional()
    tipo!: string;

    @IsOptional()
    exclusiva!: number;

    @IsOptional()
    responsable!: string;

    @IsOptional()
    nombreBeneficiario!: string;

    @IsOptional()
    identificacion!: string;

    @IsOptional()
    semanasGestacion!: number;

    @IsOptional()
    eps!: EntidadesEntity;
}
