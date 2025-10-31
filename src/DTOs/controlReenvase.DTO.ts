import { IsNotEmpty, IsString, IsNumber, IsDate, IsOptional } from 'class-validator';
import { MadresDonantesEntity } from '../entities/madresDonantes.entity';
import { EmpleadosEntity } from '../entities/empleados.entity';

export class ControlReenvaseDTO {
    @IsOptional()
    @IsNumber()
    id!: number;
    @IsNotEmpty()
    @IsDate()
    fecha!: Date;
    @IsOptional()
    volumen!: number;
    @IsNotEmpty()
    @IsNumber()
    frascoCrudo!: number;
    @IsNotEmpty()
    madreDonante!: MadresDonantesEntity;
    @IsNotEmpty()
    empleado!: EmpleadosEntity;
    @IsOptional()
    extraccion!: number;
    @IsOptional()
    frascoRecolectado!: number;
}
