import { IsNotEmpty, IsOptional } from "class-validator";
import { FrascosPasteurizadosEntity } from "../entities/frascosPasteurizados.entity";
import { MadresDonantesEntity } from "../entities/madresDonantes.entity";
import { LactarioEntity } from "../entities/lactario.entity";

export class IngresoLechePasteurizadaFriam013DTO {
    @IsOptional()
    id!: number;

    @IsNotEmpty()
    fechaDispensacion!: Date;

    @IsOptional()
    tipo!: string;

    @IsNotEmpty()
    frascoPasteurizado!: FrascosPasteurizadosEntity;

    @IsNotEmpty()
    madreDonante!: MadresDonantesEntity;
}