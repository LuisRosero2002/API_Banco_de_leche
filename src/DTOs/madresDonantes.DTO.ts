import { IsNotEmpty, IsOptional } from "class-validator";
import { donanteType } from "../entities/madresDonantes.entity";
import { MadresPotencialesEntity } from "../entities/madresPotenciales.entity";
import { GestacionEntity } from "../entities/gestacion.entity";
import { ExamenesPrenatalEntity } from "../entities/examenesPrenatal.entity";
import { LaboratoriosEntity } from "../entities/laboratorios.entity";
import { MedicamentosEntity } from "../entities/medicamentos.entity";
import { HijosMadresEntity } from "../entities/hijosMadres.entity";
import { EmpleadosEntity } from "../entities/empleados.entity";

export class MadreDonanteDTO {
    @IsOptional()
    id!: number
    @IsNotEmpty()
    donanteExclusivo!: number;
    @IsNotEmpty()
    tipoDonante!: donanteType;
    @IsNotEmpty()
    recoleccionDomicilio!: number;
    @IsNotEmpty()
    capacitado!: string;
    @IsNotEmpty()
    recibioEducacion!: string;
    @IsOptional()
    donanteApta!: number;
    @IsOptional()
    firmaDonante!: string;
    @IsOptional()
    firmaProfesional!: string;
    @IsNotEmpty()
    madrePotencial!: MadresPotencialesEntity;
    @IsNotEmpty()
    hijosMadre!: HijosMadresEntity[];
    @IsNotEmpty()
    gestacion!: GestacionEntity;
    @IsNotEmpty()
    examenPrenatal!: ExamenesPrenatalEntity;
    @IsOptional()
    laboratorio!: LaboratoriosEntity[];
    @IsNotEmpty()
    medicamento!: MedicamentosEntity;
    @IsOptional()
    empleado!: EmpleadosEntity;
}