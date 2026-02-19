import { IsNotEmpty, IsOptional } from "class-validator";

export class EntradasSalidasPasteurizadaDTO {

    @IsOptional()
    id!: number;

    @IsNotEmpty()
    gaveta!: number;

    @IsNotEmpty()
    responsableEntrada!: number;

    @IsOptional()
    responsableSalida!: number | null;

    @IsOptional()
    fechaSalida!: Date | null;

}
