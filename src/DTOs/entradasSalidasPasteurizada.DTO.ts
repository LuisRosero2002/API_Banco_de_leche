import { IsNotEmpty, IsOptional } from "class-validator";

export class EntradasSalidasPasteurizadaDTO {

    @IsOptional()
    id!: number;
    @IsNotEmpty()
    gaveta!: number;
    @IsNotEmpty()
    responsableEntrada!: { id: number };
    @IsOptional()
    responsableSalida!: { id: number };
    @IsOptional()
    fechaSalida!: Date;

}
