import { IsNotEmpty, IsString, IsNumber, IsDate, IsOptional } from 'class-validator';
import { MadresDonantesEntity } from '../entities/madresDonantes.entity';
import { EmpleadosEntity } from '../entities/empleados.entity';
import { CicloEntity } from '../entities/ciclo.entity';
import { LoteEntity } from '../entities/lote.entity';

export class ControlReenvaseDTO {
    @IsOptional()
    @IsNumber()
    id!: number;
    @IsNotEmpty()
    fecha!: string;
    @IsOptional()
    volumen!: number;
    @IsNotEmpty()
    @IsNumber()
    frascoCrudo!: number;
    @IsNotEmpty()
    ciclo!: CicloEntity;
    @IsNotEmpty()
    lote!: LoteEntity;
    @IsNotEmpty()
    madreDonante!: MadresDonantesEntity;
    @IsNotEmpty()
    empleado!: EmpleadosEntity;
    @IsOptional()
    extraccion!: number;
    @IsOptional()
    frascoRecolectado!: number;
}
