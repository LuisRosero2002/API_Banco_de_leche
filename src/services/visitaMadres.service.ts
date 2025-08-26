import { BaseService } from "../config/base.service";
import { AppDataSource } from "../config/data-source";
import { In } from "typeorm";
import { RespuestaVisitaDTO } from "../DTOs/respuestasVisitaDTO";
import { VisitaMadresDTO } from "../DTOs/visitaMadresDTO";
import { ClasificacionPreguntasEntity } from "../entities/clasificacionPreguntas.entity";
import { EvaluacionLactanciaEntity } from "../entities/evaluacionLactancia.entity";
import { PreguntasFriam037Entity } from "../entities/preguntasFriam037.entity";
import { RespuestasFriam037Entity } from "../entities/respuestasFriam037.entity";
import { VisitaMadresEntity } from "../entities/visitaMadres.entity";

export class VisitaMadresServices extends BaseService<VisitaMadresEntity> {
    constructor() {
        super(VisitaMadresEntity);
    }

    async createVisitaMadre(body: VisitaMadresDTO): Promise<VisitaMadresEntity> {
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            let newVisita: VisitaMadresDTO = body;
            const repoMain = await this.execRepository;
            const evaluacionLactancia = AppDataSource.getRepository(EvaluacionLactanciaEntity);
            // Save EvaluacionLactancia
            newVisita.evaluacionLactancia = await evaluacionLactancia.save(newVisita.evaluacionLactancia);
            // Save VisitaMadre
            let visitaMadre = await repoMain.save(newVisita);
            await queryRunner.commitTransaction();
            return visitaMadre;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async getVisitaMadres(id:number):Promise<VisitaMadresEntity | null>{
        const repository = await this.execRepository;
        return repository.findOne({
            where: { madrePotencial: { id } },
            relations: {
                evaluacionLactancia: true,
                madrePotencial: true,
                respuestas: true
            }
        })
    }

    async saveRespuestasVisitaMadre(body: RespuestaVisitaDTO[]): Promise<RespuestasFriam037Entity[]> {
        const repository = AppDataSource.getRepository(RespuestasFriam037Entity);

        try {
            if (body.length > 0) {
                await repository
                    .createQueryBuilder()
                    .delete()
                    .from(RespuestasFriam037Entity)
                    .where("id_visita_domiciliario = :visitaId", { visitaId: body[0].visitaMadre })
                    .execute();
            }

            const entities = body.map(dto => {
                return repository.create({
                    respuesta: dto.respuesta,
                    pregunta: { id: dto.pregunta },
                    visitaMadres: { id: dto.visitaMadre },
                });
            });

            const result = await repository.insert(entities);

            const insertedIds = result.identifiers.map(identifier => identifier.id);
            const savedData = await repository.find({
                where: { id: In(insertedIds) },
                loadRelationIds: {
                    relations: ["pregunta", "visitaMadres"]
                }
            });

            return savedData;
        } catch (error) {
            throw error;
        }
    }

    async getRespuestasVisitaMadre(id: number): Promise<RespuestasFriam037Entity[]> {
        const repository = await AppDataSource.getRepository(RespuestasFriam037Entity);
        return repository.find({
            where: { visitaMadres: { id } },
            loadRelationIds: {
                relations : ['pregunta', 'visitaMadres']
            }
        });
    }

    async getPreguntasVisitaMadre(): Promise<PreguntasFriam037Entity[]> {
        const repository = AppDataSource.getRepository(PreguntasFriam037Entity);
        return repository.find({
            loadRelationIds: {
                relations: ["clasificacion"]
            }
        });
    }

    async getCategoriasVisitaMadre(): Promise<ClasificacionPreguntasEntity[]> {
        const repository = await AppDataSource.getRepository(ClasificacionPreguntasEntity);
        return repository.find();
    }
}