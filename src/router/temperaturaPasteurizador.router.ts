
import { Request, Response } from "express";
import { TemperaturaPasteurizadorController } from "../controllers/temperaturaPasteurizador.controller";
import { ConfigMiddleware } from "../middlewares/config.middleware";
import { BaseRouter } from "./router";
import { TemperaturaPasteurizadorDTO } from "../DTOs/temperaturaPasteurizador.dto";
import { EnfriamientoArrayDTO, EnfriamientoDTO } from "../DTOs/enfriamiento.dto";
import { CalentamientoArrayDTO, CalentamientoDTO } from "../DTOs/calentamiento.dto";

export class TemperaturaPasteurizadorRouter extends BaseRouter<TemperaturaPasteurizadorController, ConfigMiddleware> {
    constructor() {
        super(TemperaturaPasteurizadorController, ConfigMiddleware);
    }

    routes(): void {

        this.router.get(
            "/temperatura-pasteurizador",
            this.middleware.checkJwtAuth(),
            (req: Request, res: Response) => {
                this.controller.getAllTemperaturas(req, res)
                    .catch(err => res.status(500).send(err.message));
            }
        );

        this.router.post(
            "/temperatura-pasteurizador",
            this.middleware.checkJwtAuth(),
            this.middleware.ValidateDTO(TemperaturaPasteurizadorDTO),
            (req: Request, res: Response) => {
                this.controller.createTemperaturaPasteurizador(req, res)
                    .catch(err => res.status(500).send(err.message));
            }
        );

        this.router.post(
            "/temperatura-pasteurizador/calentamiento",
            this.middleware.checkJwtAuth(),
            this.middleware.ValidateDTO(CalentamientoArrayDTO),
            (req: Request, res: Response) => {
                this.controller.createCalentamiento(req, res)
                    .catch(err => res.status(500).send(err.message));
            }
        );

        this.router.post(
            "/temperatura-pasteurizador/enfriamiento",
            this.middleware.checkJwtAuth(),
            this.middleware.ValidateDTO(EnfriamientoArrayDTO),
            (req: Request, res: Response) => {
                this.controller.createEnfriamiento(req, res)
                    .catch(err => res.status(500).send(err.message));
            }
        );

        this.router.put(
            "/temperatura-pasteurizador/calentamiento",
            this.middleware.checkJwtAuth(),
            this.middleware.ValidateDTO(CalentamientoArrayDTO),
            (req: Request, res: Response) => {
                this.controller.updateCalentamiento(req, res)
                    .catch(err => res.status(500).send(err.message))
            }
        );

        this.router.put(
            "/temperatura-pasteurizador/enfriamiento",
            this.middleware.checkJwtAuth(),
            this.middleware.ValidateDTO(EnfriamientoArrayDTO),
            (req: Request, res: Response) => {
                this.controller.updateEnfriamiento(req, res)
                    .catch(err => res.status(500).send(err.message))
            }
        );

        this.router.put(
            "/temperatura-pasteurizador/:id",
            this.middleware.checkJwtAuth(),
            this.middleware.ValidateDTO(TemperaturaPasteurizadorDTO),
            (req: Request, res: Response) => {
                this.controller.updateTemperatura(req, res)
                    .catch(err => res.status(500).send(err.message));
            }
        );
    }
}
