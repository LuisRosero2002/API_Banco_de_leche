import { InfoControlMicrobiologicoEntity } from "../entities/infoControlMicrobilogico.entity";
import { FrascosPasteurizadosEntity } from "../entities/frascosPasteurizados.entity";

/**
 * DTO para cada frasco con sus datos de control microbiológico
 */
export interface FrascoControlMicrobiologicoDTO {
    frascoPasteurizado: FrascosPasteurizadosEntity;
    controlMicrobiologico: {
        id: number;
        fecha: Date;
        coliformes: number | null;
        conformidad: number | null;
        pruebaConfirmatoria: number | null;
        liberacion: number | null;
        observaciones: string | null;
    } | null;
}

/**
 * DTO de respuesta que agrupa la información compartida y los frascos
 */
export interface ControlMicrobiologicoResponseDTO {
    infoControl: InfoControlMicrobiologicoEntity | null;
    frascos: FrascoControlMicrobiologicoDTO[];
}
