import { BaseService } from "../config/base.service";
import { AppDataSource } from "../config/data-source";
import { VisitaSeguimientoMadresEntity } from "../entities/visitaSeguimientoMadres.entity";
import { MadresDonantesEntity } from "../entities/madresDonantes.entity";
import { DatosVisitaSeguimientoEntity } from "../entities/datos_visita_seguimiento.entity";
import { PreguntasFriam038Entity } from "../entities/preguntasFriam038.entity";
import { RespuestasFriam038Entity } from "../entities/respuestasFriam038.entity";

export class SeguimientoMadreService extends BaseService<VisitaSeguimientoMadresEntity> {
    constructor() {
        super(VisitaSeguimientoMadresEntity);
    }

    /**
     * Obtener madres donantes aptas para seguimiento
     */
    async getMadresDonantesPaticas(): Promise<MadresDonantesEntity[]> {
        const repository = AppDataSource.getRepository(MadresDonantesEntity);
        return repository.find({
            where: {
                donanteApta: 1,
                activo: 1
            },
            relations: {
                madrePotencial: {
                    infoMadre: true
                }
            }
        });
    }

    /**
     * Obtener visitas de seguimiento de una madre específica
     */
    async getVisitasPorMadre(idMadreDonante: number): Promise<VisitaSeguimientoMadresEntity[]> {
        const repository = await this.execRepository;
        return repository.find({
            where: {
                madreDonante: { id: idMadreDonante }
            },
            relations: {
                madreDonante: {
                    madrePotencial: true
                }
            },
            order: { fecha: 'ASC' }
        });
    }

    /**
     * Crear nueva visita de seguimiento
     */
    async crearVisitaSeguimiento(idMadreDonante: number, fecha: Date): Promise<VisitaSeguimientoMadresEntity> {
        const repository = await this.execRepository;

        const nuevaVisita = repository.create({
            fecha: fecha,
            madreDonante: { id: idMadreDonante }
        });

        return await repository.save(nuevaVisita);
    }

    /**
     * Actualizar fecha de una visita existente
     */
    async actualizarFechaVisita(idVisita: number, nuevaFecha: Date): Promise<VisitaSeguimientoMadresEntity | null> {
        const repository = await this.execRepository;

        await repository.update(idVisita, { fecha: nuevaFecha });

        return repository.findOne({
            where: { id: idVisita },
            relations: {
                madreDonante: {
                    madrePotencial: true
                }
            }
        });
    }

    /**
     * Obtener preguntas del formulario FRIAM-038
     */
    async getPreguntasFriam038(): Promise<PreguntasFriam038Entity[]> {
        const repository = AppDataSource.getRepository(PreguntasFriam038Entity);
        return repository.find({
            order: { id: 'ASC' }
        });
    }

    /**
     * Guardar respuestas y datos completos de una visita
     */
    async guardarRespuestasYDatos(data: {
        idVisitaSeguimiento: number,
        observaciones?: string,
        recomendaciones?: string,
        firmaUsuario?: string,
        firmaEvaluador?: string,
        respuestas: Array<{
            idPregunta: number,
            respuesta: number | null
        }>
    }): Promise<any> {
        const repositoryDatos = AppDataSource.getRepository(DatosVisitaSeguimientoEntity);
        const repositoryRespuestas = AppDataSource.getRepository(RespuestasFriam038Entity);

        try {
            // Guardar datos de la visita
            const datosVisita = repositoryDatos.create({
                observaciones: data.observaciones,
                recomendaciones: data.recomendaciones,
                firmaUsuario: data.firmaUsuario,
                firmaEvaluador: data.firmaEvaluador,
                visitaSeguimiento: { id: data.idVisitaSeguimiento }
            });

            const datosSaved = await repositoryDatos.save(datosVisita);

            // Limpiar respuestas anteriores
            await repositoryRespuestas.delete({
                visitaSeguimiento: { id: data.idVisitaSeguimiento }
            });

            // Guardar nuevas respuestas
            const respuestasEntities = data.respuestas.map(resp =>
                repositoryRespuestas.create({
                    respuesta: resp.respuesta || undefined,
                    pregunta: { id: resp.idPregunta },
                    visitaSeguimiento: { id: data.idVisitaSeguimiento }
                })
            );

            const respuestasSaved = await repositoryRespuestas.save(respuestasEntities);

            return {
                datosVisita: datosSaved,
                respuestas: respuestasSaved
            };

        } catch (error) {
            throw error;
        }
    }

    /**
     * Obtener detalles completos de una visita específica
     */
    async getDetallesVisita(idVisita: number): Promise<VisitaSeguimientoMadresEntity | null> {
        const repository = await this.execRepository;

        return await repository.findOne({
            where: { id: idVisita },
            relations: {
                madreDonante: {
                    madrePotencial: true
                },
                datosVisitaSeguimiento: true,
                respuestas: {
                    pregunta: true
                }
            }
        });
    }
}