import { BaseService } from "../config/base.service";
import { AppDataSource } from "../config/data-source";
import { IngresoLechePasteurizadaFriam013DTO } from "../DTOs/ingresoLechePasteurizadaFriam013.DTO";
import { LactarioDTO } from "../DTOs/Lactario.DTO";
import { IngresoLechePasteurizadaFriam013Entity } from "../entities/ingresoLechePasteurizadaFriam013.entity";
import { LactarioEntity } from "../entities/lactario.entity";

export class IngresoLechePasteurizadaFrnut013Service extends BaseService<IngresoLechePasteurizadaFriam013Entity> {
    constructor() {
        super(IngresoLechePasteurizadaFriam013Entity)
    }

    async getIngresoLechePasteurizadaFrnut013() {
        const repository = await this.execRepository;
        return await repository.find({
            relations: {
                frascoPasteurizado: {
                    entradasSalidasPasteurizada: true,
                    controlReenvase: {
                        seleccionClasificacion: {
                            acidezDornic: true,
                            crematocrito: true
                        }
                    }
                },
                lactarios: true,
                madreDonante: true
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
        return await repository.update(id, {
            fechaDispensacion: ingresoLechePasteurizada.fechaDispensacion,
            tipo: ingresoLechePasteurizada.tipo,
            frascoPasteurizado: { id: ingresoLechePasteurizada.frascoPasteurizado.id },
            madreDonante: { id: ingresoLechePasteurizada.madreDonante.id }
        });
    }

    async getLactariosByIngresoLechePasteurizada(id: number) {
        const repository = AppDataSource.getRepository(LactarioEntity);
        return await repository.find({
            where: {
                id: id
            }
        });
    }

    async postLactarioByIngresoLechePasteurizada(id: number, lactario: LactarioDTO) {
        const repository = AppDataSource.getRepository(LactarioEntity);
        return await repository.save({
            nombre: lactario.nombre,
            cama: lactario.cama,
            volumenDosificado: lactario.volumenDosificado,
            medico: lactario.medico,
            dosificador: lactario.dosificador
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
}