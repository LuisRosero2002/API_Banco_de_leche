import { BaseService } from "../config/base.service";
import { AppDataSource } from "../config/data-source";
import { CurvaPenetracionDTO } from "../DTOs/curvaPenetracion.DTO";
import { CurvaPenetracionEntity } from "../entities/curvaPenetracion.entity";
import { EnfriadorEntity } from "../entities/enfriador.entity";
import { PasteurizadorEntity } from "../entities/pasteurizador.entity";

export class CurvaPenetracionService extends BaseService<CurvaPenetracionEntity> {
    constructor() {
        super(CurvaPenetracionEntity)
    }


    async createCurvaPenetracion(data: CurvaPenetracionDTO): Promise<CurvaPenetracionEntity> {
        const repository = await this.execRepository;
        const repositoryPasteurizador = AppDataSource.getRepository(PasteurizadorEntity);
        const repositoryEnfriador = AppDataSource.getRepository(EnfriadorEntity);

        const responsePasteurizador: PasteurizadorEntity[] = [];
        const responseEnfriador: EnfriadorEntity[] = [];

        const { pasteurizadores, enfriadores, numeroFrasco, ...curveData } = data;

        const response = await repository.save({
            ...curveData,
            numeroFrascos: numeroFrasco,
            responsableOne: {
                id: data.responsableOne
            },
            responsableTwo: {
                id: data.responsableTwo
            },
        });

        for (const item of pasteurizadores) {
            const savedItem = await repositoryPasteurizador.save({
                ...item,
                curva: {
                    id: response.id
                }
            });
            responsePasteurizador.push(savedItem);
        }

        for (const item of enfriadores) {
            const savedItem = await repositoryEnfriador.save({
                ...item,
                curva: {
                    id: response.id
                }
            });
            responseEnfriador.push(savedItem);
        }

        return {
            ...response,
            pasteurizadores: responsePasteurizador,
            enfriadores: responseEnfriador
        }
    }

    async getCurvaPenetracion(volumen: number): Promise<CurvaPenetracionEntity[]> {
        const repository = await this.execRepository;
        return await repository.find({
            select: {
                id: true,
                fecha: true,
                volumen: true
            },
            where: {
                volumen: volumen
            }
        });
    }

    async getCurvaPenetracionById(id: number): Promise<CurvaPenetracionEntity[]> {
        const repository = await this.execRepository;
        return await repository.find({
            relations: {
                pasteurizadores: true,
                enfriadores: true,
                responsableOne: true,
                responsableTwo: true
            },
            where: {
                id: id
            }
        });
    }


    async updateCurvaPenetracion(id: number, data: CurvaPenetracionDTO): Promise<CurvaPenetracionEntity> {
        const repository = await this.execRepository;
        const repositoryPasteurizador = AppDataSource.getRepository(PasteurizadorEntity);
        const repositoryEnfriador = AppDataSource.getRepository(EnfriadorEntity);

        const responsePasteurizador: PasteurizadorEntity[] = [];
        const responseEnfriador: EnfriadorEntity[] = [];

        const { pasteurizadores, enfriadores, numeroFrasco, ...curveData } = data;

        const response = await repository.save({
            ...curveData,
            id: id,
            numeroFrascos: numeroFrasco,
            responsableOne: {
                id: data.responsableOne
            },
            responsableTwo: {
                id: data.responsableTwo
            },
        });

        for (const item of pasteurizadores) {
            const savedItem = await repositoryPasteurizador.save({
                ...item,
                curva: {
                    id: response.id
                }
            });
            responsePasteurizador.push(savedItem);
        }

        for (const item of enfriadores) {
            const savedItem = await repositoryEnfriador.save({
                ...item,
                curva: {
                    id: response.id
                }
            });
            responseEnfriador.push(savedItem);
        }

        return {
            ...response,
            pasteurizadores: responsePasteurizador,
            enfriadores: responseEnfriador
        }
    }
}