import { IsNotEmpty, IsOptional } from "class-validator";

export class EntradasSalidasPasteurizadaDTO {

    @IsOptional()
    id!: number;
    @IsNotEmpty()
    gaveta!: number;
    @IsNotEmpty()
    responsableEntrada!: { id: number };
    @IsNotEmpty()
    responsableSalida!: { id: number };
    @IsNotEmpty()
    fechaSalida!: Date;

}
