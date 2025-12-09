import { Repository, UpdateResult } from "typeorm";
import { BaseService } from "../config/base.service";
import { AppDataSource } from "../config/data-source";
import { ControlMicrobiologicoDTO } from "../DTOs/controlMicrobiologico.DTO";
import { ControlMicrobilogicoFriam014Entity } from "../entities/controlMicrobilogicoFriam014.entity";
import { InfoControlMicrobiologicoEntity } from "../entities/infoControlMicrobilogico.entity";
import { FrascosPasteurizadosEntity } from "../entities/frascosPasteurizados.entity";

export class ControlMicrobiologicoService extends BaseService<ControlMicrobilogicoFriam014Entity> {
    constructor() {
        super(ControlMicrobilogicoFriam014Entity);
    }

    /**
     * Get frascos pasteurizados by lote and ciclo with their control microbiologico records
     * @param idLote - ID of the lote
     * @param idCiclo - ID of the ciclo
     * @returns Array of frascos pasteurizados with control microbiologico data
     */
    async getFrascosPasteurizadosByLoteAndCiclo(idLote: number, idCiclo: number): Promise<FrascosPasteurizadosEntity[]> {
        const repositoryFrascos = AppDataSource.getRepository(FrascosPasteurizadosEntity);

        return await repositoryFrascos.find({
            relations: {
                controlReenvase: {
                    lote: {
                        ciclo: true
                    },
                    frascoCrudo: true
                },
                controlMicrobiologico: {
                    infoControl: {
                        responsableSiembre: true,
                        responsableLectura: true,
                        responsableProcesamiento: true,
                        coordinador: true
                    }
                }
            },
            where: {
                controlReenvase: {
                    lote: {
                        id: idLote,
                        ciclo: {
                            id: idCiclo
                        }
                    }
                }
            },
            order: {
                id: 'ASC'
            }
        });
    }

    /**
     * Create control microbiologico records for multiple frascos pasteurizados
     * @param data - ControlMicrobiologicoDTO with array of frasco IDs and shared info
     * @returns Array of created control microbiologico records
     */
    async postControlMicrobiologico(data: ControlMicrobiologicoDTO): Promise<ControlMicrobilogicoFriam014Entity[]> {
        const repository: Repository<ControlMicrobilogicoFriam014Entity> = await this.execRepository;
        const repositoryInfo = AppDataSource.getRepository(InfoControlMicrobiologicoEntity);

        try {
            // First, save the InfoControlMicrobiologico
            const infoControl = await repositoryInfo.save({
                fechaSiembre: data.infoControl.fechaSiembre,
                primeraLectura: data.infoControl.primeraLectura,
                responsableSiembre: { id: data.infoControl.responsableSiembre.id },
                responsableLectura: { id: data.infoControl.responsableLectura.id },
                responsableProcesamiento: { id: data.infoControl.responsableProcesamiento.id },
                coordinador: { id: data.infoControl.coordinador.id }
            });

            // Then, create control microbiologico records for each frasco pasteurizado
            const controlRecords: ControlMicrobilogicoFriam014Entity[] = [];

            for (const idFrasco of data.frascosPasteurizados) {
                const control = await repository.save({
                    fecha: new Date(data.fecha),
                    coliformes: data.coliformes,
                    conformidad: data.conformidad,
                    pruebaConfirmatoria: data.pruebaConfirmatoria,
                    liberacion: data.liberacion,
                    observaciones: data.observaciones,
                    frascoPasteurizado: { id: idFrasco } as any,
                    infoControl: infoControl as any
                });

                controlRecords.push(control);
            }

            return controlRecords;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update control microbiologico records for multiple frascos pasteurizados
     * @param data - ControlMicrobiologicoDTO with array of frasco IDs and updated info
     * @returns Update result
     */
    async putControlMicrobiologico(data: ControlMicrobiologicoDTO): Promise<{ info: UpdateResult, controls: UpdateResult[] }> {
        const repository = await this.execRepository;
        const repositoryInfo = AppDataSource.getRepository(InfoControlMicrobiologicoEntity);

        try {
            // Update InfoControlMicrobiologico if ID is provided
            let infoUpdateResult: UpdateResult | undefined;

            if (data.infoControl.id) {
                infoUpdateResult = await repositoryInfo.update(data.infoControl.id, {
                    fechaSiembre: data.infoControl.fechaSiembre,
                    primeraLectura: data.infoControl.primeraLectura,
                    responsableSiembre: { id: data.infoControl.responsableSiembre.id },
                    responsableLectura: { id: data.infoControl.responsableLectura.id },
                    responsableProcesamiento: { id: data.infoControl.responsableProcesamiento.id },
                    coordinador: { id: data.infoControl.coordinador.id }
                });
            }

            // Update control microbiologico records for each frasco
            const controlUpdateResults: UpdateResult[] = [];

            for (const idFrasco of data.frascosPasteurizados) {
                // Find the control record for this frasco
                const existingControl = await repository.findOne({
                    where: {
                        frascoPasteurizado: { id: idFrasco }
                    }
                });

                if (existingControl) {
                    const updateData: any = {
                        fecha: data.fecha
                    };

                    // Only include properties if they are defined
                    if (data.coliformes !== undefined) updateData.coliformes = data.coliformes;
                    if (data.conformidad !== undefined) updateData.conformidad = data.conformidad;
                    if (data.pruebaConfirmatoria !== undefined) updateData.pruebaConfirmatoria = data.pruebaConfirmatoria;
                    if (data.liberacion !== undefined) updateData.liberacion = data.liberacion;
                    if (data.observaciones !== undefined) updateData.observaciones = data.observaciones;

                    const updateResult = await repository.update(existingControl.id, updateData);

                    controlUpdateResults.push(updateResult);
                }
            }

            return {
                info: infoUpdateResult!,
                controls: controlUpdateResults
            };
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get all control microbiologico records with relations
     * @returns Array of all control microbiologico records
     */
    async getAllControlMicrobiologico(): Promise<ControlMicrobilogicoFriam014Entity[]> {
        const repository = await this.execRepository;

        return await repository.find({
            relations: {
                frascoPasteurizado: {
                    controlReenvase: {
                        lote: {
                            ciclo: true
                        },
                        madreDonante: true
                    }
                },
                infoControl: {
                    responsableSiembre: true,
                    responsableLectura: true,
                    responsableProcesamiento: true,
                    coordinador: true
                }
            },
            order: {
                id: 'ASC'
            }
        });
    }

    /**
     * Get control microbiologico by frasco pasteurizado ID
     * @param idFrasco - ID of the frasco pasteurizado
     * @returns Control microbiologico record or null
     */
    async getControlByFrascoPasteurizado(idFrasco: number): Promise<ControlMicrobilogicoFriam014Entity | null> {
        const repository = await this.execRepository;

        return await repository.findOne({
            where: {
                frascoPasteurizado: { id: idFrasco }
            },
            relations: {
                frascoPasteurizado: true,
                infoControl: {
                    responsableSiembre: true,
                    responsableLectura: true,
                    responsableProcesamiento: true,
                    coordinador: true
                }
            }
        });
    }
}
