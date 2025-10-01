import { IsNotEmpty, IsNumber, IsDateString } from "class-validator";

export class VisitaSeguimientoDTO {
    @IsNotEmpty({ message: "El ID de la madre donante es obligatorio" })
    @IsNumber({}, { message: "El ID de la madre donante debe ser un número" })
    idMadreDonante!: number;

    @IsNotEmpty({ message: "La fecha es obligatoria" })
    @IsDateString({}, { message: "La fecha debe tener formato válido (YYYY-MM-DD)" })
    fecha!: string;
}