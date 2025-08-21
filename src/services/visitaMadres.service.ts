import { BaseService } from "../config/base.service";
import { AppDataSource } from "../config/data-source";
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

    async saveRespuestasVisitaMadre(body: RespuestaVisitaDTO[]): Promise<RespuestasFriam037Entity[]> {
        const repository = AppDataSource.getRepository(RespuestasFriam037Entity);

        const data = body.map(dto => ({
            respuesta: dto.respuesta,
            pregunta: { id: dto.pregunta },
            visitaMadre: { id: dto.visitaMadre },
        }));

        return repository.save(data);
    }

    async getRespuestasVisitaMadre(id: number): Promise<RespuestasFriam037Entity[]> {
        const repository = await AppDataSource.getRepository(RespuestasFriam037Entity);
        const resultado = repository
            .createQueryBuilder("res")
            .innerJoinAndSelect("res.visitaMadres", "visita")
            .innerJoinAndSelect("res.pregunta", "preg")
            .innerJoinAndSelect("preg.clasificacion", "clas")
            .where("res.visitaMadres = :id", { id })
            .getMany();

        return resultado;
    }

    async getPreguntasVisitaMadre(): Promise<PreguntasFriam037Entity[]> {
        const repository = AppDataSource.getRepository(PreguntasFriam037Entity);
        return repository.find({
            loadRelationIds: {
                relations: ["clasificacion"]
            },
        });
    }

    async getCategoriasVisitaMadre(): Promise<ClasificacionPreguntasEntity[]> {
        const repository = await AppDataSource.getRepository(ClasificacionPreguntasEntity);
        return repository.find();
    }
}