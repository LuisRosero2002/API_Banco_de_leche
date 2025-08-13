import { IsNotEmpty, IsOptional } from "class-validator";
import { donanteType, MadresDonantesEntity } from "../entities/madresDonantes.entity";
import { MadresPotencialesEntity } from "../entities/madresPotenciales.entity";
import { GestacionEntity } from "../entities/gestacion.entity";
import { ExamenesPrenatalEntity } from "../entities/examenesPrenatal.entity";
import { LaboratoriosEntity } from "../entities/laboratorios.entity";
import { MedicamentosEntity } from "../entities/medicamentos.entity";
import { HijosMadresEntity } from "../entities/hijosMadres.entity";
import { EmpleadosEntity } from "../entities/empleados.entity";
import { InfoMadresEntity } from "../entities/infoMadres.entity";

export class MadreDonanteDTO {
    @IsNotEmpty()
    madreDonante!: MadresDonantesEntity;
    @IsNotEmpty()
    infoMadre!: InfoMadresEntity;
    @IsNotEmpty()
    hijosMadre!: HijosMadresEntity[];
    @IsNotEmpty()
    gestacion!: GestacionEntity;
    @IsNotEmpty()
    examenPrenatal!: ExamenesPrenatalEntity;
    @IsNotEmpty()
    medicamento!: MedicamentosEntity;
    @IsNotEmpty()
    empleado!: EmpleadosEntity;

}