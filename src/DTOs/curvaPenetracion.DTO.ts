import { Type } from "class-transformer";
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class PasteurizadorDTO {
    @IsOptional()
    @IsNumber()
    id!: number;

    @IsNumber()
    @IsNotEmpty()
    tiempo!: number;

    @IsNumber()
    @IsNotEmpty()
    frascoTestigo!: number;

    @IsNumber()
    @IsNotEmpty()
    agua!: number;

    @IsNumber()
    @IsNotEmpty()
    muestra!: number;

    @IsNumber()
    @IsOptional()
    curvaPenetracion!: number;
}

export class EnfriadorDTO {
    @IsOptional()
    @IsNumber()
    id!: number;

    @IsNumber()
    @IsNotEmpty()
    tiempo!: number;

    @IsNumber()
    @IsNotEmpty()
    frascoTestigo!: number;

    @IsNumber()
    @IsNotEmpty()
    agua!: number;

    @IsNumber()
    @IsNotEmpty()
    muestra!: number;

    @IsNumber()
    @IsOptional()
    curvaPenetracion!: number;
}

export class CurvaPenetracionDTO {
    @IsOptional()
    @IsNumber()
    id!: number;

    @IsNumber()
    @IsNotEmpty()
    numeroFrasco!: number;

    @IsString()
    @IsNotEmpty()
    tipoFrasco!: string;

    @IsString()
    @IsNotEmpty()
    tipoTermometro!: string;

    @IsString()
    @IsNotEmpty()
    marca!: string;

    @IsString()
    @IsNotEmpty()
    certificado!: string;

    @IsNumber()
    @IsNotEmpty()
    aguaPasteurizador!: number

    @IsNumber()
    @IsNotEmpty()
    temperaturaEquipo!: number;

    @IsNumber()
    @IsNotEmpty()
    volumen!: number;

    @IsNumber()
    @IsNotEmpty()
    aguaEnfriador!: number;

    @IsNumber()
    @IsNotEmpty()
    temperaturaAgua!: number;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    fecha!: Date;

    @IsNumber()
    @IsNotEmpty()
    promedioPasteurizador!: number;

    @IsNumber()
    @IsNotEmpty()
    minutosPasteurizador!: number;

    @IsNumber()
    @IsNotEmpty()
    promedioEnfriador!: number;

    @IsNumber()
    @IsNotEmpty()
    minutosEnfriador!: number;

    @IsNumber()
    @IsNotEmpty()
    responsableOne!: number;

    @IsNumber()
    @IsNotEmpty()
    responsableTwo!: number;

    @IsArray()
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => PasteurizadorDTO)
    pasteurizadores!: PasteurizadorDTO[];

    @IsArray()
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => EnfriadorDTO)
    enfriadores!: EnfriadorDTO[];
}