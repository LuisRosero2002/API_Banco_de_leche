import { Between } from "typeorm";
import { BaseService } from "../config/base.service";
import { AppDataSource } from "../config/data-source";
import { IngresoLechePasteurizadaFriam013DTO } from "../DTOs/ingresoLechePasteurizadaFriam013.DTO";
import { LactarioDTO } from "../DTOs/Lactario.DTO";
import { FrascosPasteurizadosEntity } from "../entities/frascosPasteurizados.entity";
import { IngresoLechePasteurizadaFriam013Entity } from "../entities/ingresoLechePasteurizadaFriam013.entity";
import { LactarioEntity } from "../entities/lactario.entity";

export class IngresoLechePasteurizadaFrnut013Service extends BaseService<IngresoLechePasteurizadaFriam013Entity> {
    constructor() {
        super(IngresoLechePasteurizadaFriam013Entity)
    }

    async getIngresoLechePasteurizadaFrnut013(mes: number, anio: number) {
        const repository = await this.execRepository;
        const fechaInicio = new Date(anio, mes - 1, 1, 0, 0, 0);
        const fechaFin = new Date(anio, mes, 0, 23, 59, 59);
        return await repository.find({
            relations: {
                frascoPasteurizado: {
                    entradasSalidasPasteurizada: true,
                    controlReenvase: {
                        seleccionClasificacion: {
                            acidezDornic: true,
                            crematocrito: true
                        },
                        lote: true
                    }
                },
                madreDonante: true
            },
            where: {
                fechaDispensacion: Between(fechaInicio, fechaFin)
            }
        });
    }

    async postIngresoLechePasteurizadaFrnut013(ingresoLechePasteurizada: IngresoLechePasteurizadaFriam013DTO) {
        const repository = await this.execRepository;
        return await repository.save({
            fechaDispensacion: ingresoLechePasteurizada.fechaDispensacion,
            tipo: ingresoLechePasteurizada.tipo,
            frascoPasteurizado: { id: ingresoLechePasteurizada.frascoPasteurizado.id },
            madreDonante: { id: ingresoLechePasteurizada.madreDonante.id }
        });
    }

    async putIngresoLechePasteurizadaFrnut013(id: number, ingresoLechePasteurizada: IngresoLechePasteurizadaFriam013DTO) {
        const repository = await this.execRepository;
        // Verificar si el registro existe
        const existe = await repository.findOne({ where: { id } });
        if (!existe) {
            return { affected: 0 };
        }
        // save() con ID existente hace UPDATE y maneja las relaciones correctamente
        const resultado = await repository.save({
            id: id,
            fechaDispensacion: ingresoLechePasteurizada.fechaDispensacion,
            tipo: ingresoLechePasteurizada.tipo,
            frascoPasteurizado: { id: ingresoLechePasteurizada.frascoPasteurizado.id },
            madreDonante: { id: ingresoLechePasteurizada.madreDonante.id }
        });
        return { affected: 1, data: resultado };
    }

    async getLactariosByIngresoLechePasteurizada(id: number) {
        const repository = AppDataSource.getRepository(LactarioEntity);
        return await repository.find({
            where: {
                ingresoLeche: { id: id }
            }
        });
    }

    async postLactarioByIngresoLechePasteurizada(lactario: LactarioDTO) {
        const repository = AppDataSource.getRepository(LactarioEntity);
        return await repository.save({
            nombre: lactario.nombre,
            cama: lactario.cama,
            volumenDosificado: lactario.volumenDosificado,
            medico: lactario.medico,
            dosificador: lactario.dosificador,
            ingresoLeche: { id: lactario.ingresoLechePasteurizada }
        });
    }

    async putLactarioByIngresoLechePasteurizada(id: number, lactario: LactarioDTO) {
        const repository = AppDataSource.getRepository(LactarioEntity);
        return await repository.update(id, {
            nombre: lactario.nombre,
            cama: lactario.cama,
            volumenDosificado: lactario.volumenDosificado,
            medico: lactario.medico,
            dosificador: lactario.dosificador
        });
    }

    async getAllFrascosPasteurizados(): Promise<FrascosPasteurizadosEntity[]> {
        const repository = AppDataSource.getRepository(FrascosPasteurizadosEntity);
        return await repository.find({
            relations: {
                controlReenvase: {
                    seleccionClasificacion: {
                        acidezDornic: true,
                        crematocrito: true
                    },
                    lote: true,
                    madreDonante: true
                },
                entradasSalidasPasteurizada: true
            },
            where: {
                activo: true
            },
            order: {
                numeroFrasco: 'ASC'
            }
        });
    }

}