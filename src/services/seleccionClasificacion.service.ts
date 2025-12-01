import { BaseService } from "../config/base.service";
import { SeleccionClasificacionFriam015Entity } from "../entities/seleccionClasificacionFriam015.entity";
import { Between, UpdateResult } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { AcidezDornicEntity } from "../entities/acidezDornic.entity";
import { AnalisisSensorialEntity } from "../entities/analisisSensorial.entity";
import { CrematocritoEntity } from "../entities/crematocrito.entity";
import { AcidezDornicDTO } from "../DTOs/acidezDornic.DTO";
import { AnalisisSensorialDTO } from "../DTOs/analisisSensorial.DTO";
import { CrematocritoDTO } from "../DTOs/crematocrito.DTO";
import { UpdateSeleccionClasificacionDTO } from "../DTOs/seleccionClasificacion.DTO";
import { InfoSeleccionClasificacionEntity } from "../entities/infoSeleccionClasificacion.entity";


export class SeleccionClasificacionServices extends BaseService<SeleccionClasificacionFriam015Entity> {
    constructor() {
        super(SeleccionClasificacionFriam015Entity);
    }

    async getSeleccionClasificacionPorMesYAnio(mes: number, anio: number): Promise<SeleccionClasificacionFriam015Entity[]> {
        const repository = await this.execRepository;

        const startDate = new Date(anio, mes - 1, 1);
        const endDate = new Date(anio, mes, 0);

        return await repository.find({
            relations: {
                controlReenvase:{
                    madreDonante: {
                        entradasSalidas:{
                            frascoRecolectado: true,
                            extraccion: true
                        },
                        gestacion: true
                    },
                    lote: {
                        ciclo: true
                    },
                    frascosPasteurizados: true
                },
                infoSeleccionClasificacion: {
                    profesional: true,
                    auxiliar: true
                },
            },
            where: {
                fecha: Between(startDate, endDate)
            },
            order: {
                id: 'ASC'
            }
        });
    }

    async getAcidezDornicPorSeleccionId(idSeleccionClasificacion: number): Promise<AcidezDornicEntity | null> {
        const repository = AppDataSource.getRepository(AcidezDornicEntity);
        const entity = await repository.findOne({
            where: { seleccionClasificacion: { id: idSeleccionClasificacion } },
            select: { id: true, primera: true, segunda: true, tercera: true, resultado: true }
        });
        return entity;
    }

    async getAnalisisSensorialPorSeleccionId(idSeleccionClasificacion: number): Promise<AnalisisSensorialEntity | null> {
        const repository = AppDataSource.getRepository(AnalisisSensorialEntity);
        const entity = await repository.findOne({
            where: { seleccionClasificacion: { id: idSeleccionClasificacion } },
            select: { id: true, embalaje: true, suciedad: true, color: true, flavor: true }
        });
        return entity;
    }

    async getCrematocritoPorSeleccionId(idSeleccionClasificacion: number): Promise<CrematocritoEntity | null> {
        const repository = AppDataSource.getRepository(CrematocritoEntity);
        const entity = await repository.findOne({
            where: { seleccionClasificacion: { id: idSeleccionClasificacion } },
            select: { id: true, ct1: true, ct2: true, ct3: true, cc1: true, cc2: true, cc3: true, kcal: true }
        });
        return entity;
    }

    async postAcidezDornic(data: AcidezDornicDTO): Promise<AcidezDornicEntity> {
        const repository = AppDataSource.getRepository(AcidezDornicEntity);
        return await repository.save({
            primera: data.primera,
            segunda: data.segunda,
            tercera: data.tercera,
            resultado: data.resultado,
            seleccionClasificacion: { id: data.seleccionClasificacion.id }
        })
    }

    async postAnalisisSensorial(data: AnalisisSensorialDTO): Promise<AnalisisSensorialEntity> {
        const repository = AppDataSource.getRepository(AnalisisSensorialEntity);
        const entity = repository.create({
            embalaje: data.embalaje,
            suciedad: data.suciedad,
            color: data.color,
            flavor: data.flavor,
            seleccionClasificacion: { id: data.seleccionClasificacion.id }
        });
        return await repository.save(entity);
    }

    async postCrematocrito(data: CrematocritoDTO): Promise<CrematocritoEntity> {
        const repository = AppDataSource.getRepository(CrematocritoEntity);
        const entity = repository.create({
            ct1: data.ct1,
            ct2: data.ct2,
            ct3: data.ct3,
            cc1: data.cc1,
            cc2: data.cc2,
            cc3: data.cc3,
            kcal: data.kcal,
            seleccionClasificacion: { id: data.seleccionClasificacion.id }
        });
        return await repository.save(entity);
    }

    async updateSeleccionClasificacion(id: number, data: UpdateSeleccionClasificacionDTO): Promise<UpdateResult> {
        const seleccionRepository = await this.execRepository;
        const infoRepository = AppDataSource.getRepository(InfoSeleccionClasificacionEntity);
        const infoData = data.infoSeleccionClasificacion;

        // Se actualiza la fecha en la entidad principal 'SeleccionClasificacionFriam015Entity'
        if (data.fecha) {
            await seleccionRepository.update(id, { fecha: data.fecha });
        }

        if (infoData.id) {
            // Si se manda el ID, se actualiza la entidad existente
            return await infoRepository.update(infoData.id, {
                numeroFrascosPasteurizados: infoData.numeroFrascosPasteurizados,
                volumen: infoData.volumen,
                fechaVencimiento: infoData.fechaVencimiento,
                observaciones: infoData.observaciones,
                loteCultivos: infoData.loteCultivos,
                fechaVencimientoCultivos: infoData.fechaVencimientoCultivos,
                profesional: infoData.profesional ? { id: infoData.profesional.id } : undefined,
                auxiliar: infoData.auxiliar ? { id: infoData.auxiliar.id } : undefined,
            });
        } else {
            // Si no se manda el ID, se crea una nueva entidad
            const newInfo = infoRepository.create({
                ...infoData,
                seleccionClasificacion: { id: id },
                profesional: infoData.profesional ? { id: infoData.profesional.id } : undefined,
                auxiliar: infoData.auxiliar ? { id: infoData.auxiliar.id } : undefined,
            });
            const savedInfo = await infoRepository.save(newInfo);
            return { generatedMaps: [], raw: savedInfo, affected: 1 };
        }
    }

    async updateAcidezDornic(id: number, data: AcidezDornicDTO): Promise<UpdateResult> {
        const repository = AppDataSource.getRepository(AcidezDornicEntity);
        return await repository.update(id, data);
    }

    async updateAnalisisSensorial(id: number, data: AnalisisSensorialDTO): Promise<UpdateResult> {
        const repository = AppDataSource.getRepository(AnalisisSensorialEntity);
        return await repository.update(id, data);
    }

    async updateCrematocrito(id: number, data: CrematocritoDTO): Promise<UpdateResult> {
        const repository = AppDataSource.getRepository(CrematocritoEntity);
        return await repository.update(id, data);
    }


}