import { BaseService } from "../config/base.service";
import { EntradasSalidasPasteurizadaDTO } from "../DTOs/entradasSalidasPasteurizada.DTO";
import { EntradasSalidasPasteurizadaFriam013Entity } from "../entities/entradasSalidasPasteurizadaFriam013.entity";

export class EntradasSalidasLechePasteurizadaService extends BaseService<EntradasSalidasPasteurizadaFriam013Entity> {
    constructor() {
        super(EntradasSalidasPasteurizadaFriam013Entity)
    }

    async getEntradasSalidasLechePasteurizada(lote: number) {
        const repository = await this.execRepository;
        return await repository.find({
            relations: {
                frascoPasteurizado: {
                    controlReenvase: {
                        lote: true,
                        frascoCrudo: {
                            madreDonante: {
                                gestacion: true
                            },
                            extraccion: true,
                            frascoRecolectado: true
                        },
                        seleccionClasificacion: {
                            acidezDornic: true,
                            crematocrito: true
                        }
                    }
                },
                responsableEntrada: true,
                responsableSalida: true
            },
            where: {
                frascoPasteurizado: {
                    controlReenvase: {
                        lote: {
                            numeroLote: lote
                        }
                    }
                }
            }
        });
    }


    async putEntradaSalidaLechePasteurizada(id: number, entradaSalida: EntradasSalidasPasteurizadaDTO) {
        const repository = await this.execRepository;
        return await repository.update(id, {
            gaveta: entradaSalida.gaveta,
            fechaSalida: entradaSalida.fechaSalida,
            responsableEntrada: entradaSalida.responsableEntrada,
            responsableSalida: entradaSalida.responsableSalida
        });
    }
}   