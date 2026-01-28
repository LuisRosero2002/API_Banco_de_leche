import { BaseService } from "../config/base.service";
import { DistribucionLecheProcesadaFriam031Entity } from "../entities/distribucionLecheProcesadaFriam031.entity";
import { UpdateResult } from "typeorm";
import { DistribucionFriam031DTO } from "../DTOs/distribucionFriam031.DTO";
import { AppDataSource } from "../config/data-source";
import { InfoDistribucionLecheProcesadaEntity } from "../entities/infoDistribucionLecheProcesada.entity";

export class DistribucionFriam031Service extends BaseService<DistribucionLecheProcesadaFriam031Entity> {

    constructor() {
        super(DistribucionLecheProcesadaFriam031Entity);
    }

    async getDistribucionPorMes(mes: number, anio: number): Promise<DistribucionLecheProcesadaFriam031Entity[]> {
        const repository = await this.execRepository;
        
        const resultados = await repository
            .createQueryBuilder("d")
            .innerJoin("d.infoDistribucion", "i")
            .select([
                "d.id",
                "d.nombreBeneficiario",
                "d.identificacion"
            ])
            .where("MONTH(i.fecha) = :mes", { mes })
            .andWhere("YEAR(i.fecha) = :anio", { anio })
            .groupBy("d.id")
            .getMany();

        return resultados;
    }

    async getDistribucionById(id: number): Promise<DistribucionLecheProcesadaFriam031Entity | null> {
        const repository = await this.execRepository;
        return await repository.findOne({
            where: { id: id },
            relations: {
                infoDistribucion: {
                    frascoPasteurizado: {
                        entradasSalidasPasteurizada: true,
                        controlReenvase: {
                            seleccionClasificacion: {
                                acidezDornic: true,
                                crematocrito: true
                            }
                        }
                    },

                },
            }
        });
    }

    async putDistribucion(id: number, body: DistribucionFriam031DTO): Promise<UpdateResult> {
        const repository = await this.execRepository;

        if (body.idInfoDistribucion) {
            const infoRepository = AppDataSource.getRepository(InfoDistribucionLecheProcesadaEntity);
            await infoRepository.update(body.idInfoDistribucion, {
                fecha: body.fecha,
                volumenDistribuido: body.volumenDistribuido,
                frascoPasteurizado: body.frascoPasteurizado ? { id: body.frascoPasteurizado.id } : undefined,
                tipo: body.tipo,
                exclusiva: body.exclusiva
            });
        }

        return await repository.update(id, {
            responsable: body.responsable,
            nombreBeneficiario: body.nombreBeneficiario,
            identificacion: body.identificacion,
            semanasGestacion: body.semanasGestacion,
            eps: body.eps
        });
    }

    async createDistribucion(body: DistribucionFriam031DTO): Promise<DistribucionLecheProcesadaFriam031Entity> {
        const repository = await this.execRepository;
        const infoRepository = AppDataSource.getRepository(InfoDistribucionLecheProcesadaEntity);

        try {
            let distribucion = await repository.findOne({
                where: {
                    identificacion: body.identificacion
                }
            });

            if (!distribucion) {
                const newDistribucion = repository.create({
                    responsable: body.responsable,
                    nombreBeneficiario: body.nombreBeneficiario,
                    identificacion: body.identificacion,
                    semanasGestacion: body.semanasGestacion,
                    eps: body.eps
                });
                distribucion = await repository.save(newDistribucion);
            }

            const newInfo = infoRepository.create({
                fecha: body.fecha,
                volumenDistribuido: body.volumenDistribuido,
                frascoPasteurizado: body.frascoPasteurizado ? { id: body.frascoPasteurizado.id } : undefined,
                tipo: body.tipo,
                exclusiva: body.exclusiva,
                distribucion: distribucion
            });
            await infoRepository.save(newInfo);

            return distribucion;
        } catch (error) {
            throw new Error("Error creating distribution: " + (error as Error).message);
        }
    }
}
