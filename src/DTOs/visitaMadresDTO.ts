import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { MadresPotencialesEntity } from "../entities/madresPotenciales.entity";
import { EvaluacionLactanciaEntity } from "../entities/evaluacionLactancia.entity";

export class VisitaMadresDTO {
    @IsOptional()
    @IsString()
    observaciones?: string;
    @IsOptional()
    @IsString()
    recomendaciones?: string;
    @IsOptional()
    @IsInt()
    donante_efectiva?: number;
    @IsOptional()
    @IsString()
    firmaUsuario?: string;
    @IsOptional()
    @IsString()
    firmaEvaluador?: string;
    @IsNotEmpty()
    madrePotencial!: MadresPotencialesEntity;
    @IsNotEmpty()
    evaluacionLactancia!: EvaluacionLactanciaEntity;
}
