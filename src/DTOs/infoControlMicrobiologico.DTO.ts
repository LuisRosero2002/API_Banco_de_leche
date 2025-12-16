import { IsNotEmpty, IsOptional, IsDateString } from 'class-validator';
import { EmpleadosEntity } from '../entities/empleados.entity';

export class InfoControlMicrobiologicoDTO {
    @IsOptional()
    id?: number;

    @IsNotEmpty()
    @IsDateString()
    fechaSiembre!: string;

    @IsNotEmpty()
    @IsDateString()
    primeraLectura!: string;

    @IsNotEmpty()
    responsableSiembre!: EmpleadosEntity;

    @IsNotEmpty()
    responsableLectura!: EmpleadosEntity;

    @IsNotEmpty()
    responsableProcesamiento!: EmpleadosEntity;

    @IsNotEmpty()
    coordinador!: EmpleadosEntity;
}
