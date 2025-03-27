import { IsNotEmpty, IsOptional } from "class-validator";
import { EntidadesEntity } from "../entities/entidades.entity";
import { EmpleadosEntity } from "../entities/empleados.entity";
import { InfoMadresEntity } from "../entities/infoMadres.entity";
import { llamadaType } from "../entities/madresPotenciales.entity";

export class MadresPotencialesDTO {
    @IsOptional()
    id!:number 
    @IsOptional()
    educacion_presencial!: number;
    @IsOptional()
    fecha_llamada!: Date;
    @IsOptional()
    llamada!: llamadaType;
    @IsOptional()
    asesoria!: number;
    @IsOptional()
    donante_efectiva!: number;
    @IsOptional()
    fecha_visita!: Date;
    @IsOptional()
    observacion!: number;
    @IsNotEmpty()
    fecha_registro!: Date;
    @IsNotEmpty()
    entidad!: EntidadesEntity;
    @IsNotEmpty()
    empleado!: EmpleadosEntity;
    @IsOptional()
    infoMadre?: InfoMadresEntity;
}