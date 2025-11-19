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
import { LoteEntity } from "../entities/lote.entity";
import { CicloEntity } from "../entities/ciclo.entity";

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
            where: [
                {
                    madreDonante: { id: idMadreDonante },
                    extraccion: { activo: 1 }
                },
                {
                    madreDonante: { id: idMadreDonante },
                    frascoRecolectado: { activo: 1 }
                }
            ]
        });

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
                lote: {
                    ciclo: true
                },
                empleado: true,
            }
        })
    }

    async postControlReenvase(data: ControlReenvaseDTO): Promise<ControlReenvaseFriam032Entity> {
        const repository = await this.execRepository;
        let res:ControlReenvaseFriam032Entity;
        try {
            const repositoryLote = await AppDataSource.getRepository(LoteEntity);
            const repositoryCiclo = await AppDataSource.getRepository(CicloEntity);

            const resAux = await repository.save({
                fecha: data.fecha,
                frascoCrudo: data.frascoCrudo,
                empleado: { id: data.empleado.id },
                madreDonante: { id: data.madreDonante.id },
            });
            res = resAux;

            const resCiclo = await repositoryCiclo.save({
                numeroCiclo: data.ciclo.id
            })

            await repositoryLote.save({
                ciclo: resCiclo,
                numeroLote: data.lote.id,
                frascoCrudo: data.frascoCrudo,
                controlReenvase: resAux
            })

            if (data.extraccion != null) {
                const repositoryExtraccion = await AppDataSource.getRepository(ExtraccionFriam016Entity);
                await repositoryExtraccion.update(data.extraccion, {
                    activo: 0
                })
            } else if(data.frascoRecolectado != null) {
                const repositoryFrascoRecolectado = await AppDataSource.getRepository(FrascosRecolectadosEntity);
                await repositoryFrascoRecolectado.update(data.frascoRecolectado, {
                    activo: 0
                })
            }
        } catch (error) {
            throw error;
        };
        return res
    }

    async putControlReenvase(data: ControlReenvaseDTO): Promise<UpdateResult> {
        const repository = await this.execRepository;
        const repositoryLote = await AppDataSource.getRepository(LoteEntity);
        const repositoryCiclo = await AppDataSource.getRepository(CicloEntity);

        await repository.update(data.id, {
            empleado: { id: data.empleado.id }
        });

        await repositoryCiclo.update(data.ciclo.id, {
            numeroCiclo: data.ciclo.numeroCiclo
        })

        await repositoryLote.update(data.lote.id, {
            numeroLote: data.lote.numeroLote,
        })

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