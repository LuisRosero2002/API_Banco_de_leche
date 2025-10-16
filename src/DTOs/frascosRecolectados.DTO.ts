import { IsNotEmpty, IsOptional } from "class-validator";
import { CongeladorEntity } from "../entities/congelador.entity";
import { CasasVisitasEntity } from "../entities/casasVisitas.entity";
import { MadresDonantesEntity } from "../entities/madresDonantes.entity";

export class FrascosRecolectadosDTO {
    @IsOptional()
    id!: number;
    @IsNotEmpty()
    volumen!: number;
    @IsNotEmpty()
    fechaDeExtraccion!: Date;
    @IsNotEmpty()
    termo!: number;
    @IsNotEmpty()
    gaveta!: number;
    @IsOptional()
    recoleccion!: number;
    @IsOptional()
    extraccion!: number;
    @IsNotEmpty()
    congelador!: CongeladorEntity;
    @IsNotEmpty()
    casaVisita!: CasasVisitasEntity;
    @IsNotEmpty()
    madreDonante!: MadresDonantesEntity;
}