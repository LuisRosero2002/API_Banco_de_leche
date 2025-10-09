import { IsNotEmpty, IsNumber, IsDateString } from "class-validator";

export class FechaSeguimientoDTO {
    @IsNotEmpty({ message: "El ID de la visita es obligatorio" })
    @IsNumber({}, { message: "El ID de la visita debe ser un número" })
    idVisita!: number;

    @IsNotEmpty({ message: "La nueva fecha es obligatoria" })
    @IsDateString({}, { message: "La fecha debe tener formato válido (YYYY-MM-DD)" })
    nuevaFecha!: string;
}