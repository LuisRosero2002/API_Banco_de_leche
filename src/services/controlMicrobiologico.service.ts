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
        frascos: FrascosPasteurizadosEntity[];
    }> {
        const repositoryFrascos = AppDataSource.getRepository(FrascosPasteurizadosEntity);
        const repositoryInfoControl = AppDataSource.getRepository(InfoControlMicrobiologicoEntity);

        const frascos = await repositoryFrascos.find({
            relations: {
                controlReenvase: {
                    lote: {
                        ciclo: true
                    }
                },
                controlMicrobiologico: true
            },
            where: {
                controlReenvase: {
                    lote: {
                        numeroLote: idLote,
                        ciclo: {
                            numeroCiclo: idCiclo
                        }
                    }
                }
            },
            order: {
                id: 'ASC'
            }
        });

        if (frascos.length === 0) {
            return {
                infoControl: null,
                frascos: []
            };
        }

        let sharedInfoControl: InfoControlMicrobiologicoEntity | null = null;
        const infoControlId = frascos.find(f => f.controlMicrobiologico?.infoControl?.id)?.controlMicrobiologico?.infoControl?.id;

        if (infoControlId) {
            sharedInfoControl = await repositoryInfoControl.findOne({
                relations: {
                    responsableSiembre: true,
                    responsableLectura: true,
                    responsableProcesamiento: true,
                    coordinador: true
                },
                where: {
                    id: infoControlId
                }
            });
        }

        return {
            infoControl: sharedInfoControl,
            frascos: frascos
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
            const infoControl = await repositoryInfo.save({
                ...data.infoControl,
                responsableSiembre: { id: data.infoControl.responsableSiembre.id },
                responsableLectura: { id: data.infoControl.responsableLectura.id },
                responsableProcesamiento: { id: data.infoControl.responsableProcesamiento.id },
                coordinador: { id: data.infoControl.coordinador.id }
            });
            const controlRecords: ControlMicrobilogicoFriam014Entity[] = [];

            for (const controlItem of data.controles) {
                const control = await repository.save({
                    ...controlItem,
                    fecha: new Date(controlItem.fecha),
                    frascoPasteurizado: { id: controlItem.idFrascoPasteurizado },
                    infoControl: { id: infoControl.id }
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

            const controlUpdateResults: UpdateResult[] = [];

            for (const controlItem of data.controles) {
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
