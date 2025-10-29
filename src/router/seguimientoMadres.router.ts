import { Request, Response } from "express";
import { SeguimientoMadreController } from "../controllers/seguimientoMadres.controller";
import { ConfigMiddleware } from "../middlewares/config.middleware";
import { BaseRouter } from "./router";
import { VisitaSeguimientoDTO } from "../DTOs/visitaSeguimiento.DTO";
import { FechaSeguimientoDTO } from "../DTOs/fechaSeguimiento.DTO";
import { RespuestaSeguimientoDTO } from "../DTOs/respuestaSeguimiento.DTO";

export class SeguimientoMadresRouter extends BaseRouter<SeguimientoMadreController, ConfigMiddleware> {
    constructor() {
        super(SeguimientoMadreController, ConfigMiddleware);
    }

    routes(): void {
        // 1. GET - Obtener madres donantes aptas para tabla principal
        this.router.get('/getMadresDonantesAptas',
            (req: Request, res: Response) => {
                this.controller.getMadresDonantesAptas(req, res)
                    .catch(err => res.status(500).send(err.message));
            }
        );

        // 2. GET - Obtener visitas de una madre específica
        this.router.get('/getVisitasPorMadre/:idMadre',
            (req: Request, res: Response) => {
                this.controller.getVisitasPorMadre(req, res)
                    .catch(err => res.status(500).send(err.message));
            }
        );

        // 3. POST - Crear nueva visita de seguimiento
        this.router.post('/crearVisitaSeguimiento',
            this.middleware.ValidateDTO(VisitaSeguimientoDTO),
            (req: Request, res: Response) => {
                this.controller.crearVisitaSeguimiento(req, res)
                    .catch(err => res.status(500).send(err.message));
            }
        );

        // 4. PUT - Actualizar fecha de visita
        this.router.put('/actualizarFechaVisita',
            this.middleware.ValidateDTO(FechaSeguimientoDTO),
            (req: Request, res: Response) => {
                this.controller.actualizarFechaVisita(req, res)
                    .catch(err => res.status(500).send(err.message));
            }
        );

        // 5. GET - Obtener preguntas del formulario
        this.router.get('/getPreguntasFriam038',
            (req: Request, res: Response) => {
                this.controller.getPreguntasFriam038(req, res)
                    .catch(err => res.status(500).send(err.message));
            }
        );

        // 6. POST - Guardar respuestas y datos de visita
        this.router.post('/guardarRespuestasYDatos',
            this.middleware.ValidateDTO(RespuestaSeguimientoDTO),
            (req: Request, res: Response) => {
                this.controller.guardarRespuestasYDatos(req, res)
                    .catch(err => res.status(500).send(err.message));
            }
        );

        // 7. GET - Obtener detalles completos de una visita
        this.router.get('/getDetallesVisita/:idVisita',
            (req: Request, res: Response) => {
                this.controller.getDetallesVisita(req, res)
                    .catch(err => res.status(500).send(err.message));
            }
        );
    }
}