import { IsNotEmpty, IsNumber } from "class-validator";

export class ConsultaPorIdDTO {
    @IsNotEmpty({ message: "El ID es obligatorio" })
    @IsNumber({}, { message: "El ID debe ser un número" })
    id!: number;
}