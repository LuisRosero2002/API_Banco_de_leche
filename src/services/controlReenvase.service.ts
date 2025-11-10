import { UpdateResult } from "typeorm";
import { BaseService } from "../config/base.service";
import { AppDataSource } from "../config/data-source";
import { ControlReenvaseDTO } from "../DTOs/controlReenvase.DTO";
import { FrascosPasteurizadosDTO } from "../DTOs/frascosPasteurizados.DTO";
import { ControlReenvaseFriam032Entity } from "../entities/controlReenvaseFriam032.entity";
import { EntradasSalidasFriam012Entity } from "../entities/entradasSalidasFriam012.entity";
import { FrascosPasteurizadosEntity } from "../entities/frascosPasteurizados.entity";
import { FrascosRecolectadosEntity } from "../entities/frascosRecolectados.entity";
import { ExtraccionFriam016Entity } from "../entities/extraccionFriam016.entity";

export class ControlReenvaseServices extends BaseService<ControlReenvaseFriam032Entity> {
    constructor() {
        super(ControlReenvaseFriam032Entity);
    }

    async getFrascosByMadreDonante(idMadreDonante: number): Promise<EntradasSalidasFriam012Entity[]> {
        const repositoryEntradasSalidas = AppDataSource.getRepository(EntradasSalidasFriam012Entity);
        return await repositoryEntradasSalidas.find({
            relations: {
                extraccion: true,
                frascoRecolectado: true
            },
            where: { madreDonante: { id: idMadreDonante } }
        })
    }

    async getAllControlReenvase(): Promise<ControlReenvaseFriam032Entity[]> {
        const repository = await this.execRepository;
        return await repository.find({
            relations: {
                madreDonante: {
                    casaVisita: {
                        frascoRecolectado: true
                    },
                    madrePotencial: {
                        lecheSalaExtraccion: {
                            extracciones: true
                        }
                    }
                },
                empleado: true,
            }
        })
    }

    async postControlReenvase(data: ControlReenvaseDTO): Promise<ControlReenvaseFriam032Entity> {
        const repository = await this.execRepository;
        return await repository.save(data);
    }

    async putControlReenvase(data: ControlReenvaseDTO): Promise<UpdateResult> {
        const repository = await this.execRepository;

        await repository.update(data.id, {
            empleado: { id: data.empleado.id }
        });

        if (data.madreDonante.tipoDonante === "externa") {
            const repositoryFrascosExterna = AppDataSource.getRepository(FrascosRecolectadosEntity);
            return await repositoryFrascosExterna.update(data.frascoRecolectado, {
                volumen: data.volumen,
            })
        }
        else {
            const repositoryFrascosInterna = AppDataSource.getRepository(ExtraccionFriam016Entity);
            return await repositoryFrascosInterna.update(data.extraccion, {
                cantidad: data.volumen,
            })
        }
    }

    async postFrascoPasteurizado(data: FrascosPasteurizadosDTO): Promise<FrascosPasteurizadosEntity> {
        const repository = AppDataSource.getRepository(FrascosPasteurizadosEntity);

        const frascoData = repository.create({
            volumen: data.volumen ?? null,
            numeroFrasco: data.numeroFrasco ?? null,
            observaciones: data.observaciones ?? null,
            controlReenvase: data.controlReenvase
        });

        return await repository.save(frascoData);
    }

    async putFrascoPasteurizado(id: number, data: FrascosPasteurizadosDTO): Promise<UpdateResult> {
        const repository = AppDataSource.getRepository(FrascosPasteurizadosEntity);

        const updateData: Partial<FrascosPasteurizadosEntity> = {};

        if (data.volumen !== undefined) {
            updateData.volumen = data.volumen ?? null;
        }
        if (data.numeroFrasco !== undefined) {
            updateData.numeroFrasco = data.numeroFrasco ?? null;
        }
        if (data.observaciones !== undefined) {
            updateData.observaciones = data.observaciones ?? null;
        }
        if (data.controlReenvase !== undefined) {
            updateData.controlReenvase = data.controlReenvase;
        }

        return await repository.update(id, updateData);
    }

    async getFrascoPasteurizadoByControlReenvase(idControlReenvase: number): Promise<FrascosPasteurizadosEntity[]> {
        const repository = AppDataSource.getRepository(FrascosPasteurizadosEntity);
        return await repository.find({
            relations: {
                controlReenvase: true
            },
            where: {
                controlReenvase: {
                    id: idControlReenvase
                }
            }
        })
    }

    async getAllFrascosPasteurizados(): Promise<FrascosPasteurizadosEntity[]> {
        const repository = AppDataSource.getRepository(FrascosPasteurizadosEntity);
        return await repository.find({
            relations: {
                controlReenvase: true
            },
            order: {
                id: 'ASC'
            }
        });
    }

}