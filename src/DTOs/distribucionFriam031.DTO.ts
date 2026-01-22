import { IsNotEmpty, IsOptional } from "class-validator";
import { FrascosRecolectadosEntity } from "../entities/frascosRecolectados.entity";
import { EmpleadosEntity } from "../entities/empleados.entity";

export class DistribucionFriam031DTO {
    // Info Distribucion fields
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

    // Distribucion Friam 031 fields
    @IsOptional()
    responsable!: string;

    @IsOptional()
    nombreBeneficiario!: string;

    @IsOptional()
    identificacion!: number;

    @IsOptional()
    semanasGestacion!: number;

    @IsOptional()
    eps!: string;
}
