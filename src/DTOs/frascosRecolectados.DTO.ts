import { IsNotEmpty, IsOptional } from "class-validator";
import { CongeladorEntity } from "../entities/congelador.entity";
import { CasasVisitasEntity } from "../entities/casasVisitas.entity";

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
    @IsNotEmpty()
    congelador!: CongeladorEntity;
    @IsNotEmpty()
    casaVisita!: CasasVisitasEntity;
}