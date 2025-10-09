import { Request, Response } from "express";
import { SeguimientoMadreService } from "../services/seguimientoMadre.service";
import { HttpResponse } from "../shared/responses/http.response";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { VisitaSeguimientoDTO } from "../DTOs/visitaSeguimiento.DTO";
import { FechaSeguimientoDTO } from "../DTOs/fechaSeguimiento.DTO";
import { RespuestaSeguimientoDTO } from "../DTOs/respuestaSeguimiento.DTO";
import { ConsultaPorIdDTO } from "../DTOs/consultaSeguimiento.DTO";

export class SeguimientoMadreController {
    constructor(
        private readonly seguimientoMadreService: SeguimientoMadreService = new SeguimientoMadreService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) { }

    /**
     * Obtener madres donantes aptas para seguimiento
     */
    async getMadresDonantesAptas(req: Request, res: Response) {
        try {
            const data = await this.seguimientoMadreService.getMadresDonantesPaticas();

            if (data.length === 0) {
                return this.httpResponse.NotFound(res, "No se encontraron madres donantes aptas");
            }

            return this.httpResponse.Ok(res, data);
        } catch (error) {
            console.error("Error al obtener madres donantes aptas:", error);
            return this.httpResponse.Error(res, error);
        }
    }

    /**
     * Obtener visitas de una madre específica
     */
    async getVisitasPorMadre(req: Request, res: Response) {
        try {
            const consultaDTO = plainToClass(ConsultaPorIdDTO, { id: parseInt(req.params.idMadre) });
            const errors = await validate(consultaDTO);

            if (errors.length > 0) {
                return this.httpResponse.Error(res, errors);
            }

            const data = await this.seguimientoMadreService.getVisitasPorMadre(consultaDTO.id);
            return this.httpResponse.Ok(res, data);

        } catch (error) {
            console.error("Error al obtener visitas por madre:", error);
            return this.httpResponse.Error(res, error);
        }
    }

    /**
     * Crear nueva visita de seguimiento
     */
    async crearVisitaSeguimiento(req: Request, res: Response) {
        try {
            const visitaDTO = plainToClass(VisitaSeguimientoDTO, req.body);
            const errors = await validate(visitaDTO);

            if (errors.length > 0) {
                return this.httpResponse.Error(res, errors);
            }

            const fechaParts = visitaDTO.fecha.split('-');
            const fecha = new Date(
                parseInt(fechaParts[0]),
                parseInt(fechaParts[1]) - 1,
                parseInt(fechaParts[2])
            );

            const data = await this.seguimientoMadreService.crearVisitaSeguimiento(
                visitaDTO.idMadreDonante,
                fecha
            );

            return this.httpResponse.Ok(res, data);
        } catch (error) {
            console.error("Error al crear visita de seguimiento:", error);
            return this.httpResponse.Error(res, error);
        }
    }

    /**
     * Actualizar fecha de visita existente
     */
    async actualizarFechaVisita(req: Request, res: Response) {
        try {
            const fechaDTO = plainToClass(FechaSeguimientoDTO, req.body);
            const errors = await validate(fechaDTO);

            if (errors.length > 0) {
                return this.httpResponse.Error(res, errors);
            }

            const fechaParts = fechaDTO.nuevaFecha.split('-');
            const nuevaFecha = new Date(
                parseInt(fechaParts[0]),
                parseInt(fechaParts[1]) - 1,
                parseInt(fechaParts[2])
            );

            const data = await this.seguimientoMadreService.actualizarFechaVisita(
                fechaDTO.idVisita,
                nuevaFecha
            );

            if (!data) {
                return this.httpResponse.NotFound(res, "Visita no encontrada");
            }

            return this.httpResponse.Ok(res, data);
        } catch (error) {
            console.error("Error al actualizar fecha de visita:", error);
            return this.httpResponse.Error(res, error);
        }
    }

    /**
     * Obtener preguntas del formulario FRIAM-038
     */
    async getPreguntasFriam038(req: Request, res: Response) {
        try {
            const data = await this.seguimientoMadreService.getPreguntasFriam038();

            if (data.length === 0) {
                return this.httpResponse.NotFound(res, "No se encontraron preguntas");
            }

            return this.httpResponse.Ok(res, data);
        } catch (error) {
            console.error("Error al obtener preguntas:", error);
            return this.httpResponse.Error(res, error);
        }
    }

    /**
     * Guardar respuestas y datos de visita
     */
    async guardarRespuestasYDatos(req: Request, res: Response) {
        try {
            const respuestaDTO = plainToClass(RespuestaSeguimientoDTO, req.body);
            const errors = await validate(respuestaDTO);

            if (errors.length > 0) {
                return this.httpResponse.Error(res, errors);
            }

            const data = await this.seguimientoMadreService.guardarRespuestasYDatos({
                idVisitaSeguimiento: respuestaDTO.idVisitaSeguimiento,
                observaciones: respuestaDTO.observaciones,
                recomendaciones: respuestaDTO.recomendaciones,
                firmaUsuario: respuestaDTO.firmaUsuario,
                firmaEvaluador: respuestaDTO.firmaEvaluador,
                respuestas: respuestaDTO.respuestas
            });

            return this.httpResponse.Ok(res, data);
        } catch (error) {
            console.error("Error al guardar respuestas y datos:", error);
            return this.httpResponse.Error(res, error);
        }
    }

    /**
     * Obtener detalles completos de una visita
     */
    async getDetallesVisita(req: Request, res: Response) {
        try {
            const consultaDTO = plainToClass(ConsultaPorIdDTO, { id: parseInt(req.params.idVisita) });
            const errors = await validate(consultaDTO);

            if (errors.length > 0) {
                return this.httpResponse.Error(res, errors);
            }

            const data = await this.seguimientoMadreService.getDetallesVisita(consultaDTO.id);

            if (!data) {
                return this.httpResponse.NotFound(res, "Visita no encontrada");
            }

            return this.httpResponse.Ok(res, data);
        } catch (error) {
            console.error("Error al obtener detalles de visita:", error);
            return this.httpResponse.Error(res, error);
        }
    }
}