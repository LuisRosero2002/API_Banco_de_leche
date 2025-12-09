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
     * Get frascos pasteurizados by lote and ciclo with their control microbiologico data
     * Returns InfoControlMicrobiologico once (shared for all records) and frascos with their control data
     * @param idLote - ID of the lote
     * @param idCiclo - ID of the ciclo
     * @returns Object with shared infoControl and array of frascos with their control data (or null)
     */
    async getControlMicrobiologicoByLoteAndCiclo(idLote: number, idCiclo: number): Promise<{
        infoControl: InfoControlMicrobiologicoEntity | null;
        frascos: Array<{
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
        }>;
    }> {
        const repositoryFrascos = AppDataSource.getRepository(FrascosPasteurizadosEntity);

        const frascos = await repositoryFrascos.find({
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

        let sharedInfoControl: InfoControlMicrobiologicoEntity | null = null;
        for (const frasco of frascos) {
            if (frasco.controlMicrobiologico?.infoControl) {
                sharedInfoControl = frasco.controlMicrobiologico.infoControl;
                break;
            }
        }
        const frascosResponse = frascos.map(frasco => ({
            frascoPasteurizado: frasco,
            controlMicrobiologico: frasco.controlMicrobiologico ? {
                id: frasco.controlMicrobiologico.id,
                fecha: frasco.controlMicrobiologico.fecha,
                coliformes: frasco.controlMicrobiologico.coliformes ?? null,
                conformidad: frasco.controlMicrobiologico.conformidad ?? null,
                pruebaConfirmatoria: frasco.controlMicrobiologico.pruebaConfirmatoria ?? null,
                liberacion: frasco.controlMicrobiologico.liberacion ?? null,
                observaciones: frasco.controlMicrobiologico.observaciones ?? null
            } : null
        }));

        return {
            infoControl: sharedInfoControl,
            frascos: frascosResponse
        };
    }

    /**
     * Create control microbiologico records for multiple frascos pasteurizados
     * @param data - ControlMicrobiologicoDTO with array of control records and shared info
     * @returns Array of created control microbiologico records
     */
    async postControlMicrobiologico(data: ControlMicrobiologicoDTO): Promise<ControlMicrobilogicoFriam014Entity[]> {
        const repository: Repository<ControlMicrobilogicoFriam014Entity> = await this.execRepository;
        const repositoryInfo = AppDataSource.getRepository(InfoControlMicrobiologicoEntity);

        try {
            // First, save the InfoControlMicrobiologico (información compartida)
            const infoControl = await repositoryInfo.save({
                fechaSiembre: data.infoControl.fechaSiembre,
                primeraLectura: data.infoControl.primeraLectura,
                responsableSiembre: { id: data.infoControl.responsableSiembre.id },
                responsableLectura: { id: data.infoControl.responsableLectura.id },
                responsableProcesamiento: { id: data.infoControl.responsableProcesamiento.id },
                coordinador: { id: data.infoControl.coordinador.id }
            });

            // Then, create control microbiologico records for each item in the array
            const controlRecords: ControlMicrobilogicoFriam014Entity[] = [];

            for (const controlItem of data.controles) {
                const control = await repository.save({
                    fecha: new Date(controlItem.fecha),
                    coliformes: controlItem.coliformes,
                    conformidad: controlItem.conformidad,
                    pruebaConfirmatoria: controlItem.pruebaConfirmatoria,
                    liberacion: controlItem.liberacion,
                    observaciones: controlItem.observaciones,
                    frascoPasteurizado: { id: controlItem.idFrascoPasteurizado } as any,
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
     * @param data - ControlMicrobiologicoDTO with array of control records and updated info
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

            // Update control microbiologico records for each item in the array
            const controlUpdateResults: UpdateResult[] = [];

            for (const controlItem of data.controles) {
                // If the item has an ID, update it; otherwise, find by frasco pasteurizado
                let controlId: number | undefined = controlItem.id;

                if (!controlId) {
                    const existingControl = await repository.findOne({
                        where: {
                            frascoPasteurizado: { id: controlItem.idFrascoPasteurizado }
                        }
                    });
                    controlId = existingControl?.id;
                }

                if (controlId) {
                    const updateData: any = {
                        fecha: controlItem.fecha
                    };

                    // Only include properties if they are defined
                    if (controlItem.coliformes !== undefined) updateData.coliformes = controlItem.coliformes;
                    if (controlItem.conformidad !== undefined) updateData.conformidad = controlItem.conformidad;
                    if (controlItem.pruebaConfirmatoria !== undefined) updateData.pruebaConfirmatoria = controlItem.pruebaConfirmatoria;
                    if (controlItem.liberacion !== undefined) updateData.liberacion = controlItem.liberacion;
                    if (controlItem.observaciones !== undefined) updateData.observaciones = controlItem.observaciones;

                    const updateResult = await repository.update(controlId, updateData);

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



}
