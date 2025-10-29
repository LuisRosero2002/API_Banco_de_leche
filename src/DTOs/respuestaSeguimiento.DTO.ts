import { IsNotEmpty, IsNumber, IsOptional, IsString, IsArray, ValidateNested, IsIn } from "class-validator";
import { Type } from "class-transformer";

// Clase auxiliar para validar cada respuesta individual
export class RespuestaDTO {
    @IsNotEmpty({ message: "El ID de la pregunta es obligatorio" })
    @IsNumber({}, { message: "El ID de la pregunta debe ser un número" })
    idPregunta!: number;

    // Permite null para N/A, 0 para NO, 1 para SÍ
    @IsOptional()
    @IsIn([0, 1, null], { message: "La respuesta debe ser 0 (NO), 1 (SÍ) o null (N/A)" })
    respuesta!: number | null;
}

export class RespuestaSeguimientoDTO {
    @IsNotEmpty({ message: "El ID de la visita de seguimiento es obligatorio" })
    @IsNumber({}, { message: "El ID de la visita de seguimiento debe ser un número" })
    idVisitaSeguimiento!: number;

    @IsOptional()
    @IsString({ message: "Las observaciones deben ser texto" })
    observaciones?: string;

    @IsOptional()
    @IsString({ message: "Las recomendaciones deben ser texto" })
    recomendaciones?: string;

    @IsOptional()
    @IsString({ message: "La firma del usuario debe ser texto" })
    firmaUsuario?: string;

    @IsOptional()
    @IsString({ message: "La firma del evaluador debe ser texto" })
    firmaEvaluador?: string;

    @IsNotEmpty({ message: "Las respuestas son obligatorias" })
    @IsArray({ message: "Las respuestas deben ser un array" })
    @ValidateNested({ each: true })
    @Type(() => RespuestaDTO)
    respuestas!: RespuestaDTO[];
}