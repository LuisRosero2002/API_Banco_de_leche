import { IsNotEmpty, IsOptional } from "class-validator";

export class ExtraccionFriam016DTO {
    @IsOptional()
    id!: number;
    @IsNotEmpty()
    cantidad!: number;
    @IsNotEmpty()
    hora!: string;
    @IsOptional()
    gaveta!: number;
    @IsNotEmpty()
    fechaExtraccion!: Date;
    @IsNotEmpty()
    congelador!: { id: number };
    @IsNotEmpty()
    lecheSalaExtraccion!: { id: number };
    @IsOptional()
    motivoConsulta!: string;
    @IsOptional()
    observaciones!: string;
    @IsOptional()
    madrePotencial!: number;
    @IsOptional()
    procedencia!: string;
}

export class Extraccion1 {
    @IsOptional()
    id!: number;
    @IsNotEmpty()
    am!: string;
    @IsNotEmpty()
    ml!: number;
    @IsNotEmpty()
    am_aux!: Date;
}

export class Extraccion2 {
    @IsOptional()
    id!: number;
    @IsNotEmpty()
    pm!: string;
    @IsNotEmpty()
    ml!: number;
    @IsNotEmpty()
    pm_aux!: Date;
}

export class FrascosExtraccionPutDTO {
    @IsNotEmpty()
    id_registro_extraccion!: number;
    @IsNotEmpty()
    fecha!: Date;
    @IsNotEmpty()
    fecha_display!: string;
    @IsNotEmpty()
    extraccion_1!: Extraccion1;
    @IsNotEmpty()
    extraccion_2!: Extraccion2;
    @IsNotEmpty()
    motivo_consulta!: string;
    @IsNotEmpty()
    observaciones!: string;
    @IsNotEmpty()
    fecha_aux!: Date;
    @IsOptional()
    madrePotencial!: number;
    @IsOptional()
    procedencia!: string;
}


