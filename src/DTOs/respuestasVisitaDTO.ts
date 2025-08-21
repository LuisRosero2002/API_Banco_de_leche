import { IsInt, IsNotEmpty, IsOptional } from "class-validator";
import { PreguntasFriam037Entity } from "../entities/preguntasFriam037.entity";
import { VisitaMadresEntity } from "../entities/visitaMadres.entity";

export class RespuestaVisitaDTO {
  @IsOptional()
  @IsInt()
  respuesta?: number;

  @IsNotEmpty()
  @IsInt()
  pregunta!: number; 

  @IsNotEmpty()
  @IsInt()
  visitaMadre!: number;
}

